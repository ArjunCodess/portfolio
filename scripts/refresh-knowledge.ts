import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const cli = require.resolve("tsx/cli");
const args = process.argv.slice(2).filter((arg) => arg !== "--");
for (const arg of args) {
  if (!["--local-only", "--github-cli", "--force"].includes(arg)) {
    throw new Error(`Unknown option: ${arg}`);
  }
}
if (!args.includes("--local-only")) {
  execFileSync(
    process.execPath,
    [
      cli,
      "scripts/sync-github-readmes.ts",
      ...args.filter((arg) => arg === "--github-cli"),
    ],
    { stdio: "inherit" },
  );
}
// If syncing or generation fails, the existing database index is retained.
execFileSync(
  process.execPath,
  [
    cli,
    "scripts/generate-embeddings.ts",
    ...args.filter((arg) => arg === "--force"),
  ],
  { stdio: "inherit" },
);
