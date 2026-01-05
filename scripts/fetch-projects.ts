import fs from "fs";
import path from "path";

const USERNAME = "ArjunCodess";

const REPOS_TO_FETCH = [
  "WebCrawlAI",
  "analyzr",
  "storyblok-mcp",
  "men2-predictor",
  "pilot-ops-crm/app", // Org repo example
  "pilot-ops-crm/website", // Org repo example
  "VendX-Admin",
  "VendX-Store",
  "typethelyrics",
  "starfall",
  "astroscope",
  "chemistrycheck",
  "algorithm_visualizer_pygame",
  "FlashReels",
  "tbh",
];

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

interface RepoDetails {
  name: string;
  full_name: string;
  description: string;
  url: string;
  homepage: string;
  stars: number;
  forks: number;
  topics: string[];
  languages: string[];
  readme: string;
}

const HEADERS: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "Portfolio-Script",
};

if (GITHUB_TOKEN) {
  HEADERS["Authorization"] = `token ${GITHUB_TOKEN}`;
}

async function getRepoDetails(repoName: string): Promise<RepoDetails | null> {
  // Handle org/repo format vs just repo name
  const fullName = repoName.includes("/")
    ? repoName
    : `${USERNAME}/${repoName}`;

  console.log(`⏳ Fetching ${fullName}...`);

  try {
    // 1. Get General Metadata
    const repoRes = await fetch(`https://api.github.com/repos/${fullName}`, {
      headers: HEADERS,
    });

    if (!repoRes.ok) {
      console.error(
        `❌ Error fetching ${fullName}: ${repoRes.status} ${repoRes.statusText}`,
      );
      return null;
    }

    const data = await repoRes.json();

    // 2. Get Languages
    const langRes = await fetch(data.languages_url, { headers: HEADERS });
    const languagesData = langRes.ok ? await langRes.json() : {};
    const topLangs = Object.keys(languagesData).slice(0, 3); // Top 3 languages

    // 3. Get README
    let readmeContent = "";
    const readmeRes = await fetch(
      `https://api.github.com/repos/${fullName}/readme`,
      { headers: HEADERS },
    );

    if (readmeRes.ok) {
      const readmeData = await readmeRes.json();
      // Decode base64 content
      readmeContent = Buffer.from(readmeData.content, "base64").toString(
        "utf-8",
      );
    } else {
      console.warn(`⚠️ No README found for ${fullName}`);
    }

    return {
      name: data.name,
      full_name: data.full_name,
      description: data.description || "No description provided.",
      url: data.html_url,
      homepage: data.homepage || "",
      stars: data.stargazers_count,
      forks: data.forks_count,
      topics: data.topics || [],
      languages: topLangs,
      readme: readmeContent,
    };
  } catch (error) {
    console.error(`❌ Failed to fetch ${fullName}:`, error);
    return null;
  }
}

function generateMarkdown(projects: RepoDetails[]): string {
  let mdOutput = `# ${USERNAME} Projects Knowledge Base\n\n`;
  mdOutput += `> Auto-generated from GitHub API on ${new Date().toDateString()}. Use this file to train the RAG model.\n\n`;

  projects.forEach((p) => {
    mdOutput += `## Project: ${p.name}\n\n`;
    mdOutput += `**Description:** ${p.description}\n\n`;
    mdOutput += `**Key Stats:** ⭐ ${p.stars} Stars | 🍴 ${p.forks} Forks\n`;
    mdOutput += `**Tech Stack:** ${p.languages.join(", ")}\n`;

    if (p.homepage) {
      mdOutput += `**Live Demo:** ${p.homepage}\n`;
    }

    mdOutput += `**Repository:** ${p.url}\n`;

    if (p.topics.length > 0) {
      mdOutput += `**Topics:** ${p.topics.join(", ")}\n\n`;
    } else {
      mdOutput += `\n`;
    }

    mdOutput += `### README Content\n`;
    mdOutput += "```markdown\n";
    mdOutput += p.readme;
    mdOutput += "\n```\n\n";
    mdOutput += "---\n\n";
  });

  return mdOutput;
}

async function main() {
  const projectsData: RepoDetails[] = [];

  for (const repo of REPOS_TO_FETCH) {
    const details = await getRepoDetails(repo);
    if (details) {
      projectsData.push(details);
    }
  }

  // Create rag directory if it doesn't exist
  const ragDir = path.join(process.cwd(), "src/data/rag");
  if (!fs.existsSync(ragDir)) {
    fs.mkdirSync(ragDir, { recursive: true });
  }

  const outputPath = path.join(ragDir, "projects.md");
  fs.writeFileSync(outputPath, generateMarkdown(projectsData), "utf-8");

  console.log(`\n✅ Done! Data saved to '${outputPath}'`);
}

main();
