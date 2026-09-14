import { Command } from "commander";
import pc from "picocolors";
import readline from "node:readline";
import {
  UIShelfCore,
  saveProjectConfig,
  saveGlobalConfig,
  loadConfig,
  providerManager,
} from "@uishelf/core";

export function createCli(): Command {
  const program = new Command();

  program
    .name("uishelf")
    .description("Universal React UI Registry, Discovery Engine & MCP Platform")
    .version("0.1.0");

  // 1. init
  program
    .command("init")
    .description("Initialize UIShelf configuration in current project")
    .option("--cwd <dir>", "Project working directory")
    .action(async (opts) => {
      const core = new UIShelfCore({ cwd: opts.cwd });
      const project = core.getProjectContext();

      console.log(pc.bold(pc.cyan("\n▲ UIShelf Initialization")));
      console.log(pc.gray("Scanning project environment..."));

      console.log(`✓ Framework: ${pc.green(project.framework)} ${project.frameworkVersion ? `(${project.frameworkVersion})` : ""}`);
      console.log(`✓ React: ${pc.green(project.reactVersion || "19")}`);
      console.log(`✓ Tailwind: ${project.tailwindVersion ? pc.green(`v${project.tailwindVersion}`) : pc.yellow("None detected")}`);
      console.log(`✓ Package Manager: ${pc.cyan(project.packageManager)}`);
      console.log(`✓ shadcn config: ${project.hasShadcn ? pc.green("Detected") : pc.yellow("components/ui directory")}`);

      const configPath = saveProjectConfig(
        {
          providers: { mode: "all", include: [], exclude: [], custom: {} },
          preferences: {
            componentsDir: project.componentsDir,
            preferTypeScript: project.typescript,
            preferMotion: project.motionEngine !== null,
          },
        },
        project.workspaceDir
      );

      console.log(`\n${pc.green("✔")} Created configuration at ${pc.bold(configPath)}`);
      console.log(pc.gray("Syncing initial registry metadata..."));
      const sync = await core.syncRegistries();
      console.log(`${pc.green("✔")} ${sync.totalProviders} providers ready.`);
      console.log(`\nRun ${pc.cyan("uishelf search <query>")} to explore components.\n`);
    });

  // 2. search (alias: s)
  program
    .command("search [query]")
    .alias("s")
    .description("Search UI components across all registries")
    .option("-p, --provider <provider...>", "Filter by provider ID (e.g. magic-ui, react-bits)")
    .option("-x, --exclude-provider <provider...>", "Exclude specific providers")
    .option("-f, --framework <framework>", "Filter by framework (next, vite, remix)")
    .option("-t, --tailwind <version>", "Filter by Tailwind version (3 or 4)")
    .option("--motion", "Only show components requiring motion")
    .option("--min-score <score>", "Minimum UIShelf score (0-100)")
    .option("--json", "Output machine-readable JSON")
    .option("--cwd <dir>", "Project working directory")
    .action(async (query = "", opts) => {
      const core = new UIShelfCore({ cwd: opts.cwd });
      const results = await core.search({
        query,
        providers: opts.provider,
        excludeProviders: opts.excludeProvider,
        framework: opts.framework,
        tailwind: opts.tailwind,
        motion: opts.motion,
        minScore: opts.minScore ? parseInt(opts.minScore, 10) : undefined,
      });

      if (opts.json) {
        console.log(JSON.stringify(results, null, 2));
        return;
      }

      console.log(pc.bold(`\n▲ UIShelf Search: "${query}" (${results.total} results in ${results.tookMs}ms)\n`));

      if (results.items.length === 0) {
        console.log(pc.yellow("No matching components found. Try broadening your search query or removing filters."));
        return;
      }

      results.items.forEach((item, index) => {
        const comp = item.component;
        const num = pc.gray(`${index + 1}.`);
        const title = pc.bold(pc.white(comp.title));
        const providerBadge = pc.cyan(`[${comp.providerId}]`);
        const scoreBadge = getScoreBadge(item.score);
        const authBadge = comp.auth.required ? pc.yellow(`🔐 ${comp.auth.type}`) : pc.green("✓ free");

        console.log(`${num} ${title} ${providerBadge} ${scoreBadge} ${authBadge}`);
        console.log(`   ${pc.gray(comp.description)}`);

        const compatStr = item.compatibilityMatches.join(" · ");
        if (compatStr) {
          console.log(`   ${pc.dim("Stack:")} ${pc.green(compatStr)}`);
        }
        if (item.scoreBreakdown.reasons.length > 0) {
          console.log(`   ${pc.dim("Why:")} ${pc.dim(item.scoreBreakdown.reasons.slice(0, 2).join(" · "))}`);
        }
        console.log(`   ${pc.dim("Install:")} ${pc.cyan(`uishelf add ${comp.id}`)}\n`);
      });
    });

  // 3. inspect
  program
    .command("inspect <component>")
    .description("Inspect detailed metadata, source code, and dependencies of a component")
    .option("--json", "Output machine-readable JSON")
    .option("--cwd <dir>", "Project working directory")
    .action(async (componentId, opts) => {
      const core = new UIShelfCore({ cwd: opts.cwd });
      const comp = await core.getComponent(componentId);

      if (!comp) {
        console.error(pc.red(`Error: Component '${componentId}' not found.`));
        process.exit(1);
      }

      const plan = await core.plan(comp.id);

      if (opts.json) {
        console.log(JSON.stringify({ component: comp, plan }, null, 2));
        return;
      }

      console.log(pc.bold(pc.cyan(`\n▲ UIShelf Component: ${comp.title} (${comp.id})`)));
      console.log(`Provider: ${pc.bold(comp.providerId)} | Type: ${comp.type} | License: ${comp.license}`);
      console.log(`Score: ${getScoreBadge(comp.quality.overall)}`);
      console.log(`\nDescription:\n  ${comp.description}\n`);

      console.log(pc.bold("Quality Breakdown:"));
      console.log(`  Compatibility: ${comp.quality.breakdown.compatibility}/20`);
      console.log(`  Code Quality:  ${comp.quality.breakdown.codeQuality}/15`);
      console.log(`  Accessibility: ${comp.quality.breakdown.accessibility}/15`);
      console.log(`  Maintenance:   ${comp.quality.breakdown.maintenance}/10`);
      console.log(`  Documentation: ${comp.quality.breakdown.documentation}/10`);
      console.log(`  Performance:   ${comp.quality.breakdown.performance}/10`);

      if (comp.dependencies.length > 0) {
        console.log(`\n${pc.bold("Dependencies:")} ${comp.dependencies.map((d) => pc.yellow(d.name)).join(", ")}`);
      }
      if (comp.registryDependencies.length > 0) {
        console.log(`${pc.bold("Registry Dependencies:")} ${comp.registryDependencies.map((d) => pc.cyan(d)).join(", ")}`);
      }

      if (plan && plan.files.length > 0) {
        console.log(pc.bold("\nFiles:"));
        plan.files.forEach((f) => console.log(`  + ${f.path}`));
      }

      console.log(`\n${pc.bold("Commands:")}`);
      console.log(`  UIShelf:  ${pc.cyan(`uishelf add ${comp.id}`)}`);
      console.log(`  Official: ${pc.gray(comp.install.command || `npx shadcn@latest add ${comp.id}`)}\n`);
    });

  // 4. add (alias: a)
  program
    .command("add <component>")
    .alias("a")
    .description("Install component into the project with dependency & conflict resolution")
    .option("--dry-run", "Simulate installation without modifying any files")
    .option("-y, --yes", "Skip interactive confirmation prompts")
    .option("--api-key <key>", "Provide provider API key / license key directly")
    .option("--json", "Output machine-readable JSON")
    .option("--cwd <dir>", "Project working directory")
    .action(async (componentInput, opts) => {
      const core = new UIShelfCore({ cwd: opts.cwd });

      // Check if natural language or ambiguous query
      let targetId = componentInput;
      let comp = await core.getComponent(targetId);

      if (!comp) {
        // Run search to find best match
        const searchRes = await core.search({ query: componentInput, limit: 3 });
        if (searchRes.items.length === 0) {
          console.error(pc.red(`Error: Could not resolve component '${componentInput}'.`));
          process.exit(1);
        }
        comp = searchRes.items[0].component;
        targetId = comp.id;
        console.log(pc.gray(`Resolved "${componentInput}" to ${pc.bold(comp.title)} (${comp.id})`));
      }

      // Generate plan
      const plan = await core.plan(targetId, { dryRun: opts.dryRun });
      if (!plan) {
        console.error(pc.red(`Error: Could not generate install plan for '${targetId}'.`));
        process.exit(1);
      }

      if (opts.json) {
        const result = await core.install(targetId, {
          dryRun: opts.dryRun,
          apiKey: opts.apiKey,
        });
        console.log(JSON.stringify(result, null, 2));
        return;
      }

      console.log(pc.bold(pc.cyan(`\n▲ Install Plan: ${comp.title} (${comp.id})`)));
      if (opts.dryRun) {
        console.log(pc.yellow("Mode: DRY-RUN (No files will be modified)\n"));
      }

      console.log(pc.bold("Target Files:"));
      for (const f of plan.files) {
        const actionCol = f.action === "conflict" ? pc.red("CONFLICT") : f.action === "skip" ? pc.gray("SKIP") : pc.green("CREATE");
        console.log(`  ${actionCol} ${f.path}`);
      }

      if (plan.npmPackages.length > 0) {
        console.log(pc.bold("\nPackages to Install:"));
        plan.npmPackages.forEach((p) => console.log(`  + ${pc.yellow(p.name)}`));
      }

      if (plan.conflicts.length > 0) {
        console.log(pc.bold(pc.red("\nWarnings & Conflicts:")));
        plan.conflicts.forEach((c) => console.log(`  ⚠ ${c.message}`));
      }

      // Check Auth requirement
      let apiKey = opts.apiKey;
      if (plan.authRequired && !plan.authSatisfied && !apiKey && !opts.dryRun) {
        console.log(pc.bold(pc.yellow(`\n🔐 Authentication Required`)));
        console.log(pc.gray(`${comp.providerId} requires credentials (${plan.authEnvVar})`));
        apiKey = await promptSecret(`Enter ${comp.providerId} API Key: `);
        if (!apiKey) {
          console.error(pc.red("Installation cancelled: missing required API key."));
          process.exit(1);
        }
      }

      if (!opts.dryRun && !opts.yes) {
        const proceed = await promptConfirm("\nProceed with installation? (y/N): ");
        if (!proceed) {
          console.log(pc.gray("Installation cancelled."));
          return;
        }
      }

      const result = await core.install(targetId, {
        dryRun: opts.dryRun,
        apiKey,
      });

      if (result.success) {
        if (opts.dryRun) {
          console.log(`\n${pc.green("✔")} Dry-run succeeded. No changes were made.`);
        } else {
          console.log(`\n${pc.green("✔")} Successfully installed ${pc.bold(comp.title)}!`);
          console.log(pc.gray("Recorded in uishelf.lock\n"));
        }
      } else {
        console.error(`\n${pc.red("✖")} Installation failed: ${result.error}`);
        process.exit(1);
      }
    });

  // 5. remove
  program
    .command("remove <component>")
    .description("Remove installed component and update uishelf.lock")
    .option("--cwd <dir>", "Project working directory")
    .action(async (componentId, opts) => {
      const core = new UIShelfCore({ cwd: opts.cwd });
      const res = core.remove(componentId);
      if (res.success) {
        console.log(`${pc.green("✔")} Removed component '${componentId}' and deleted files:\n  ${res.removedFiles.join("\n  ")}`);
      } else {
        console.error(`${pc.red("✖")} ${res.message}`);
      }
    });

  // 6. installed
  program
    .command("installed")
    .description("List all components installed via UIShelf")
    .option("--json", "Output machine-readable JSON")
    .option("--cwd <dir>", "Project working directory")
    .action(async (opts) => {
      const core = new UIShelfCore({ cwd: opts.cwd });
      const items = core.listInstalled();

      if (opts.json) {
        console.log(JSON.stringify(items, null, 2));
        return;
      }

      console.log(pc.bold(`\n▲ Installed Components (${items.length} total):\n`));
      if (items.length === 0) {
        console.log(pc.gray("No components installed yet. Run 'uishelf search' to discover."));
        return;
      }

      for (const item of items) {
        console.log(`${pc.bold(item.title)} ${pc.cyan(`(${item.id})`)}`);
        console.log(`  Provider: ${item.provider} | Installed: ${new Date(item.installedAt).toLocaleDateString()}`);
        console.log(`  Hash: ${pc.dim(item.sourceHash)}`);
        console.log(`  Files: ${item.files.map((f: any) => f.path).join(", ")}\n`);
      }
    });

  // 7. doctor
  program
    .command("doctor")
    .description("Diagnose project environment, dependencies, and provider health")
    .option("--json", "Output machine-readable JSON")
    .option("--cwd <dir>", "Project working directory")
    .action(async (opts) => {
      const core = new UIShelfCore({ cwd: opts.cwd });
      const report = await core.runDoctor();

      if (opts.json) {
        console.log(JSON.stringify(report, null, 2));
        return;
      }

      console.log(pc.bold(pc.cyan("\n▲ UIShelf Doctor Diagnostic\n")));
      console.log(pc.bold("Project Stack:"));
      console.log(`  Framework: ${pc.green(report.project.framework)} ${report.project.frameworkVersion || ""}`);
      console.log(`  React:     ${pc.green(report.project.reactVersion || "Unknown")}`);
      console.log(`  Tailwind:  ${report.project.tailwindVersion ? pc.green(`v${report.project.tailwindVersion}`) : pc.red("Missing")}`);
      console.log(`  Package:   ${pc.cyan(report.project.packageManager)}`);
      console.log(`  shadcn:    ${report.project.hasShadcn ? pc.green("Configured") : pc.yellow("None")}`);
      console.log(`  Motion:    ${report.project.motionEngine ? pc.green(report.project.motionEngine) : pc.gray("None")}`);

      console.log(pc.bold("\nProvider Ecosystem:"));
      for (const [id, health] of Object.entries(report.providers)) {
        const icon = health.status === "healthy" ? pc.green("✓") : health.status === "auth-required" ? pc.yellow("🔐") : pc.red("✖");
        console.log(`  ${icon} ${pc.bold(id)}: ${health.message || health.status}`);
      }

      if (report.issues.length > 0) {
        console.log(pc.bold(pc.red("\nIssues:")));
        report.issues.forEach((issue) => console.log(`  ✖ ${issue}`));
      }

      if (report.recommendations.length > 0) {
        console.log(pc.bold(pc.yellow("\nRecommendations:")));
        report.recommendations.forEach((rec) => console.log(`  💡 ${rec}`));
      }

      console.log(report.ready ? `\n${pc.green("✔")} Project is healthy and ready for UIShelf components.\n` : `\n${pc.yellow("⚠")} Some warnings found. See above.\n`);
    });

  // 8. providers
  const providersCmd = program.command("providers").description("Manage and inspect providers");

  providersCmd
    .command("list")
    .description("List all active providers")
    .action(async () => {
      const providers = await providerManager.list();
      console.log(pc.bold(`\n▲ Active Providers (${providers.length} registered):\n`));
      for (const p of providers) {
        const meta = await p.discover();
        const auth = meta.authRequired ? pc.yellow("🔐 Auth") : pc.green("✓ Public");
        console.log(`• ${pc.bold(meta.name)} ${pc.cyan(`(${meta.id})`)} - ${meta.type} [${auth}]`);
        console.log(`  ${pc.gray(meta.description)}`);
      }
      console.log();
    });

  providersCmd
    .command("sync")
    .description("Synchronize official shadcn registry index")
    .action(async () => {
      const core = new UIShelfCore();
      console.log(pc.gray("Fetching official registry index from https://ui.shadcn.com/r/registries.json..."));
      const result = await core.syncRegistries();
      console.log(`${pc.green("✔")} Synced ${result.totalProviders} providers (${result.newlyDiscovered} newly discovered).`);
    });

  providersCmd
    .command("add <name> <registryUrl>")
    .description("Add a custom shadcn registry URL")
    .option("--auth-env <env>", "Environment variable containing auth token")
    .action(async (name, registryUrl, opts) => {
      const meta = providerManager.addCustomProvider(name, registryUrl, opts.authEnv);
      console.log(`${pc.green("✔")} Added custom provider '${meta.name}' (${meta.registryUrl})`);
    });

  // 9. verify & audit
  program
    .command("verify")
    .description("Verify local components integrity against uishelf.lock")
    .action(async () => {
      const core = new UIShelfCore();
      const res = core.verify();
      if (res.valid) {
        console.log(`${pc.green("✔")} All installed component source hashes are verified and valid.`);
      } else {
        console.error(`${pc.red("✖")} Integrity verification failed:`);
        res.tamperedFiles.forEach((f) => console.log(`  - Tampered: ${f}`));
        res.missingFiles.forEach((f) => console.log(`  - Missing: ${f}`));
      }
    });

  program
    .command("audit")
    .description("Scan installed components for suspicious patterns and security issues")
    .action(async () => {
      const core = new UIShelfCore();
      const res = await core.audit();
      console.log(pc.bold(pc.cyan("\n▲ UIShelf Security Audit")));
      console.log(`Scanned files: ${res.scannedFiles} | Score: ${res.score}/100`);
      if (res.passed) {
        console.log(`${pc.green("✔")} No suspicious imports or malicious execution patterns detected.\n`);
      } else {
        console.log(`${pc.red("✖")} Issues detected:`);
        res.issues.forEach((i) => console.log(`  - ${i}`));
        console.log();
      }
    });

  // 10. mcp
  program
    .command("mcp")
    .description("Start Model Context Protocol (MCP) server over stdio")
    .action(async () => {
      // Dynamically import MCP server runner
      const { runMcpServer } = await import("./mcp-runner.js");
      await runMcpServer();
    });

  return program;
}

function getScoreBadge(score: number): string {
  if (score >= 95) return pc.green(pc.bold(`★ ${score}`));
  if (score >= 90) return pc.cyan(pc.bold(`★ ${score}`));
  if (score >= 80) return pc.yellow(`★ ${score}`);
  return pc.red(`★ ${score}`);
}

function promptConfirm(question: string): Promise<boolean> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === "y" || answer.trim().toLowerCase() === "yes");
    });
  });
}

function promptSecret(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}
