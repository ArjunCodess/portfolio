import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { DATA } from "../src/data/resume";

dotenv.config({ path: ".env.local", quiet: true });

type Cache = Record<string, { etag?: string; readme: string }>;
const cachePath = ".cache/github-readmes.json";

function projectRepositories(): string[] {
  return DATA.projects.flatMap((project) => {
    const urls = [project.href, ...project.links.map((link) => link.href)];
    const repo = urls
      .map((url) => url.match(/^https:\/\/github\.com\/([^/]+\/[^/#?]+)/)?.[1])
      .find(Boolean);
    return repo ? [repo] : [];
  });
}

async function main() {
  const useCli = process.argv.includes("--github-cli");
  const cliEnvironment = { ...process.env };
  delete cliEnvironment.GITHUB_TOKEN;
  delete cliEnvironment.GH_TOKEN;
  const token = useCli
    ? execFileSync("gh", ["auth", "token"], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        env: cliEnvironment,
      }).trim()
    : process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  if (!token)
    throw new Error(
      "Set GITHUB_TOKEN or GH_TOKEN for authenticated, cache-aware README syncing.",
    );
  const requested = process.argv
    .slice(2)
    .filter((arg) => arg !== "--" && arg !== "--github-cli");
  const repos = [
    ...new Set(
      (requested.length ? requested : projectRepositories()).map((repo) =>
        repo.toLowerCase(),
      ),
    ),
  ];
  if (repos.some((repo) => !/^[a-z0-9_.-]+\/[a-z0-9_.-]+$/i.test(repo)))
    throw new Error("Use repository names in owner/repo format.");
  let cache: Cache = {};
  try {
    cache = JSON.parse(await fs.readFile(cachePath, "utf8"));
  } catch {
    /* First run. */
  }
  await fs.mkdir(".cache", { recursive: true });
  let changed = 0;
  for (const repo of repos) {
    const output = path.join(
      "src/data/rag",
      `github-${repo.replace("/", "-")}.md`,
    );
    const previous = cache[repo];
    const outputExists = await fs.access(output).then(
      () => true,
      () => false,
    );
    const response = await fetch(
      `https://api.github.com/repos/${repo}/readme`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.raw+json",
          "X-GitHub-Api-Version": "2026-03-10",
          "User-Agent": "arjuncodess-portfolio-readme-sync",
          ...(previous?.etag && outputExists
            ? { "If-None-Match": previous.etag }
            : {}),
        },
        signal: AbortSignal.timeout(15_000),
      },
    );
    if (response.status === 403 || response.status === 429) {
      const retry = response.headers.get("retry-after");
      const reset = response.headers.get("x-ratelimit-reset");
      throw new Error(
        `GitHub refused the request (${response.status}); stopped without retrying. Retry-After: ${retry || "not supplied"}; rate-limit reset: ${reset || "not supplied"}. Existing snapshots are preserved.`,
      );
    }
    if (response.status === 304) {
      console.log(`${repo}: unchanged (304)`);
      continue;
    }
    if (response.status === 404) {
      console.log(`${repo}: no accessible README; kept existing snapshot`);
      continue;
    }
    if (response.status === 401)
      throw new Error(
        "GitHub rejected the configured token. Update GH_TOKEN/GITHUB_TOKEN or use --github-cli with an authenticated gh session. Existing snapshots are preserved.",
      );
    if (!response.ok)
      throw new Error(
        `${repo}: GitHub returned ${response.status}; kept existing snapshots`,
      );
    const readme = await response.text();
    if (!readme.trim())
      throw new Error(`${repo}: empty README; kept existing snapshot`);
    if (readme !== previous?.readme || !outputExists) {
      const content = `# GitHub README: ${repo}\n\n> Repository: https://github.com/${repo}\n> Retrieved: ${new Date().toISOString()}\n> Technical reference snapshot. Current personal facts, achievements, and project status are maintained separately.\n\n${readme}\n`;
      await fs.writeFile(`${output}.tmp`, content);
      await fs.rename(`${output}.tmp`, output);
      changed++;
    }
    cache[repo] = { etag: response.headers.get("etag") || undefined, readme };
    // Save after each success so an interrupted run can resume conditionally.
    await fs.writeFile(`${cachePath}.tmp`, JSON.stringify(cache));
    await fs.rename(`${cachePath}.tmp`, cachePath);
    console.log(
      `${repo}: ${readme === previous?.readme ? "unchanged content" : "updated"}; remaining primary requests: ${response.headers.get("x-ratelimit-remaining") || "unknown"}`,
    );
    if (response.headers.get("x-ratelimit-remaining") === "0")
      throw new Error(
        "GitHub primary allowance exhausted; stopped. Rerun after the reset time.",
      );
  }
  console.log(
    `${changed} README snapshots changed. Review the Markdown diff, then run pnpm kb:generate. Personal and legacy knowledge files are never overwritten.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "README sync failed");
  process.exitCode = 1;
});
