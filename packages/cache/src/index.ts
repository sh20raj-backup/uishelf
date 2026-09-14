import fs from "node:fs";
import path from "node:path";
import os from "node:os";

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttlMs: number;
}

export class FileCache {
  private cacheDir: string;
  private memoryCache: Map<string, CacheEntry<any>> = new Map();

  constructor(customDir?: string) {
    if (customDir) {
      this.cacheDir = customDir;
    } else {
      this.cacheDir = path.join(os.homedir(), ".uishelf", "cache");
    }
  }

  private ensureDir(): void {
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  get<T>(key: string): T | null {
    // 1. Check memory cache
    const mem = this.memoryCache.get(key);
    const now = Date.now();
    if (mem && now - mem.timestamp < mem.ttlMs) {
      return mem.data as T;
    }

    // 2. Check disk cache
    const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, "_");
    const filePath = path.join(this.cacheDir, `${safeKey}.json`);
    if (fs.existsSync(filePath)) {
      try {
        const raw = fs.readFileSync(filePath, "utf-8");
        const parsed: CacheEntry<T> = JSON.parse(raw);
        if (now - parsed.timestamp < parsed.ttlMs) {
          this.memoryCache.set(key, parsed);
          return parsed.data;
        } else {
          // expired
          fs.unlinkSync(filePath);
        }
      } catch {
        // Ignore read/parse error
      }
    }

    return null;
  }

  set<T>(key: string, data: T, ttlMs: number = 1000 * 60 * 60 * 24): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttlMs,
    };

    this.memoryCache.set(key, entry);

    try {
      this.ensureDir();
      const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, "_");
      const filePath = path.join(this.cacheDir, `${safeKey}.json`);
      fs.writeFileSync(filePath, JSON.stringify(entry, null, 2), "utf-8");
    } catch {
      // Ignore write errors in restricted environments
    }
  }

  delete(key: string): void {
    this.memoryCache.delete(key);
    const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, "_");
    const filePath = path.join(this.cacheDir, `${safeKey}.json`);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch {
        // Ignore
      }
    }
  }

  clear(): void {
    this.memoryCache.clear();
    if (fs.existsSync(this.cacheDir)) {
      try {
        const files = fs.readdirSync(this.cacheDir);
        for (const file of files) {
          if (file.endsWith(".json")) {
            fs.unlinkSync(path.join(this.cacheDir, file));
          }
        }
      } catch {
        // Ignore
      }
    }
  }

  stats(): { entryCount: number; cacheDir: string } {
    let count = 0;
    if (fs.existsSync(this.cacheDir)) {
      try {
        count = fs.readdirSync(this.cacheDir).filter((f) => f.endsWith(".json")).length;
      } catch {
        // Ignore
      }
    }
    return {
      entryCount: count,
      cacheDir: this.cacheDir,
    };
  }
}

export const defaultCache = new FileCache();
