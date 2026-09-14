import crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs";

export interface PathValidationResult {
  safe: boolean;
  normalizedPath: string;
  resolvedPath: string;
  reason?: string;
}

export interface SecurityScanResult {
  passed: boolean;
  score: number; // 0-100
  warnings: string[];
  blockers: string[];
}

export function validateSafePath(targetPath: string, rootDir: string): PathValidationResult {
  if (!targetPath || typeof targetPath !== "string") {
    return {
      safe: false,
      normalizedPath: "",
      resolvedPath: "",
      reason: "Path is empty or invalid",
    };
  }

  // Null-byte check
  if (targetPath.indexOf("\0") !== -1) {
    return {
      safe: false,
      normalizedPath: "",
      resolvedPath: "",
      reason: "Path contains null-byte characters",
    };
  }

  const normalized = path.normalize(targetPath).replace(/^(\.\.(\/|\\|$))+/, "");
  const resolved = path.resolve(rootDir, normalized);
  const normalizedRoot = path.resolve(rootDir);

  // Path traversal check
  if (!resolved.startsWith(normalizedRoot)) {
    return {
      safe: false,
      normalizedPath: normalized,
      resolvedPath: resolved,
      reason: `Path traversal detected: resolved path '${resolved}' is outside project root '${normalizedRoot}'`,
    };
  }

  // Symlink check if file exists
  try {
    if (fs.existsSync(resolved)) {
      const lstat = fs.lstatSync(resolved);
      if (lstat.isSymbolicLink()) {
        return {
          safe: false,
          normalizedPath: normalized,
          resolvedPath: resolved,
          reason: `Target path '${resolved}' is a symbolic link`,
        };
      }
    }
  } catch {
    // Ignore read errors
  }

  return {
    safe: true,
    normalizedPath: normalized,
    resolvedPath: resolved,
  };
}

export function computeSourceHash(content: string): string {
  const hash = crypto.createHash("sha256").update(content, "utf8").digest("hex");
  return `sha256:${hash}`;
}

export function verifySourceHash(content: string, expectedHash: string): boolean {
  const actualHash = computeSourceHash(content);
  return actualHash === expectedHash;
}

export function scanSourceSecurity(sourceCode: string): SecurityScanResult {
  const warnings: string[] = [];
  const blockers: string[] = [];
  let score = 100;

  if (!sourceCode) {
    return { passed: true, score: 100, warnings: [], blockers: [] };
  }

  // 1. Check for dynamic execution
  if (/\beval\s*\(/.test(sourceCode)) {
    blockers.push("Dangerous dynamic evaluation via eval() detected");
    score -= 40;
  }
  if (/new\s+Function\s*\(/.test(sourceCode)) {
    warnings.push("Dynamic code evaluation via new Function() detected");
    score -= 25;
  }

  // 2. Check for node process spawning in UI code
  if (/\bchild_process\b/.test(sourceCode) || /\bexecSync\b/.test(sourceCode) || /\bspawnSync\b/.test(sourceCode)) {
    blockers.push("System process execution (child_process) detected in UI component");
    score -= 50;
  }

  // 3. Check for raw IP / suspicious telemetry connections
  if (/https?:\/\/(?:[0-9]{1,3}\.){3}[0-9]{1,3}/.test(sourceCode)) {
    warnings.push("Suspicious hardcoded IP address URL detected");
    score -= 20;
  }

  // 4. Check for arbitrary localStorage/cookie exfiltration patterns
  if (
    /fetch\s*\([^)]*document\.cookie/.test(sourceCode) ||
    /fetch\s*\([^)]*localStorage/.test(sourceCode)
  ) {
    blockers.push("Potential token or cookie exfiltration pattern detected");
    score -= 50;
  }

  return {
    passed: blockers.length === 0,
    score: Math.max(0, score),
    warnings,
    blockers,
  };
}

const VALID_PACKAGE_NAME_REGEX =
  /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

export function validatePackageName(packageName: string): boolean {
  if (!packageName || typeof packageName !== "string") return false;
  return VALID_PACKAGE_NAME_REGEX.test(packageName);
}
