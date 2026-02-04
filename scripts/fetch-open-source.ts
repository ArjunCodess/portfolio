import fs from "fs";
import path from "path";

// PR URLs to fetch - organized by Major and Minor
const MAJOR_PRS = [
  "https://github.com/streetwriters/notesnook/pull/8624",
  "https://github.com/cloudinary-community/next-cloudinary/pull/601",
  "https://github.com/cloudinary-community/next-cloudinary/pull/602",
  "https://github.com/Mail-0/Zero/pull/2013",
];

const MINOR_PRS = [
  "https://github.com/CatacombCrawler/terminal-catacomb-crawler/pull/37",
  "https://github.com/TheDevOpsBlueprint/tix-cli/pull/56",
  "https://github.com/CVImprover/cvimprover-api/pull/31",
  "https://github.com/TheDevOpsBlueprint/tix-cli/pull/60",
];

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

interface PRDetails {
  title: string;
  body: string;
  html_url: string;
  merged_at: string | null;
  state: string;
  user: {
    login: string;
  };
  base: {
    repo: {
      full_name: string;
      html_url: string;
      stargazers_count: number;
      description: string;
    };
  };
  additions: number;
  deletions: number;
  changed_files: number;
  labels: Array<{ name: string }>;
}

const HEADERS: HeadersInit = {
  Accept: "application/vnd.github+json",
  "User-Agent": "Portfolio-Script",
  "X-GitHub-Api-Version": "2022-11-28",
};

if (GITHUB_TOKEN) {
  HEADERS["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
}

function parsePRUrl(
  url: string,
): { owner: string; repo: string; pull_number: string } | null {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2], pull_number: match[3] };
}

async function fetchPRDetails(url: string): Promise<PRDetails | null> {
  const parsed = parsePRUrl(url);
  if (!parsed) {
    console.error(`❌ Invalid PR URL: ${url}`);
    return null;
  }

  const { owner, repo, pull_number } = parsed;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}`;

  console.log(`⏳ Fetching PR #${pull_number} from ${owner}/${repo}...`);

  try {
    const response = await fetch(apiUrl, { headers: HEADERS });

    if (!response.ok) {
      console.error(
        `❌ Error fetching PR: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const data = await response.json();
    return data as PRDetails;
  } catch (error) {
    console.error(`❌ Failed to fetch ${url}:`, error);
    return null;
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function generateMarkdown(
  majorPRs: PRDetails[],
  minorPRs: PRDetails[],
): string {
  const now = new Date().toDateString();

  let md = `# Arjun's Open Source Contributions\n\n`;
  md += `> Auto-generated from GitHub API on ${now}\n\n`;

  // Overview
  md += `## Overview\n\n`;
  md += `Arjun actively contributes to open source projects. He has made ${majorPRs.length + minorPRs.length} merged pull requests to various projects, including ${majorPRs.length} major contributions to well-known repositories.\n\n`;

  // Stats
  const totalAdditions = [...majorPRs, ...minorPRs].reduce(
    (sum, pr) => sum + pr.additions,
    0,
  );
  const totalDeletions = [...majorPRs, ...minorPRs].reduce(
    (sum, pr) => sum + pr.deletions,
    0,
  );
  const totalFiles = [...majorPRs, ...minorPRs].reduce(
    (sum, pr) => sum + pr.changed_files,
    0,
  );

  md += `## Contribution Statistics\n\n`;
  md += `- **Total PRs**: ${majorPRs.length + minorPRs.length} merged pull requests\n`;
  md += `- **Major Contributions**: ${majorPRs.length}\n`;
  md += `- **Minor Contributions**: ${minorPRs.length}\n`;
  md += `- **Lines Added**: ${totalAdditions.toLocaleString()}\n`;
  md += `- **Lines Deleted**: ${totalDeletions.toLocaleString()}\n`;
  md += `- **Files Changed**: ${totalFiles}\n\n`;

  // Major Contributions
  md += `## Major Contributions\n\n`;
  majorPRs.forEach((pr) => {
    const repoName = pr.base.repo.full_name.split("/")[1];
    const stars = pr.base.repo.stargazers_count;

    md += `### ${repoName}${stars >= 1000 ? ` (${(stars / 1000).toFixed(1)}k+ stars)` : ""}\n\n`;
    md += `- **PR**: [#${pr.html_url.split("/").pop()} - ${pr.title}](${pr.html_url})\n`;
    md += `- **Date**: ${formatDate(pr.merged_at)}\n`;
    md += `- **Repository**: [${pr.base.repo.full_name}](${pr.base.repo.html_url})\n`;
    md += `- **Changes**: +${pr.additions} -${pr.deletions} across ${pr.changed_files} files\n`;

    if (pr.body) {
      // Clean up markdown formatting from PR body
      const cleanedBody = pr.body.replace(/[#*`]/g, "").trim();
      md += `- **Description**:\n\n${cleanedBody}\n`;
    }
    md += `\n`;
  });

  // Minor Contributions
  md += `## Minor Contributions\n\n`;
  minorPRs.forEach((pr) => {
    const repoName = pr.base.repo.full_name.split("/")[1];

    md += `### ${repoName}\n\n`;
    md += `- **PR**: [#${pr.html_url.split("/").pop()} - ${pr.title}](${pr.html_url})\n`;
    md += `- **Date**: ${formatDate(pr.merged_at)}\n`;
    md += `- **Repository**: [${pr.base.repo.full_name}](${pr.base.repo.html_url})\n`;
    md += `- **Changes**: +${pr.additions} -${pr.deletions} across ${pr.changed_files} files\n`;

    if (pr.body) {
      const cleanedBody = pr.body.replace(/[#*`]/g, "").trim();
      md += `- **Description**:\n\n${cleanedBody}\n`;
    }
    md += `\n`;
  });

  return md;
}

async function main() {
  console.log("🚀 Fetching Open Source PR data...\n");

  const majorPRData: PRDetails[] = [];
  const minorPRData: PRDetails[] = [];

  // Fetch major PRs
  console.log("📌 Fetching Major PRs...");
  for (const url of MAJOR_PRS) {
    const pr = await fetchPRDetails(url);
    if (pr) majorPRData.push(pr);
  }

  // Fetch minor PRs
  console.log("\n📌 Fetching Minor PRs...");
  for (const url of MINOR_PRS) {
    const pr = await fetchPRDetails(url);
    if (pr) minorPRData.push(pr);
  }

  // Generate markdown
  const markdown = generateMarkdown(majorPRData, minorPRData);

  // Write to file
  const ragDir = path.join(process.cwd(), "src/data/rag");
  if (!fs.existsSync(ragDir)) {
    fs.mkdirSync(ragDir, { recursive: true });
  }

  const outputPath = path.join(ragDir, "open-source.md");
  fs.writeFileSync(outputPath, markdown, "utf-8");

  console.log(`\n✅ Done! Data saved to '${outputPath}'`);
  console.log(`   - Major PRs: ${majorPRData.length}`);
  console.log(`   - Minor PRs: ${minorPRData.length}`);
}

main();
