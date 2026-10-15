import { DATA } from "@/data/resume";
import fs from "node:fs";
import path from "node:path";

export type KnowledgeChunk = { id: string; content: string; source: string };

export function chunkKnowledgeText(
  content: string,
  maxLength = 1400,
): string[] {
  const chunks: string[] = [];
  let rest = content.trim();
  while (rest.length > maxLength) {
    const boundary = Math.max(
      rest.lastIndexOf("\n", maxLength),
      rest.lastIndexOf(" ", maxLength),
    );
    const end = boundary > maxLength / 2 ? boundary : maxLength;
    chunks.push(rest.slice(0, end).trim());
    rest = rest.slice(end).trim();
  }
  if (rest) chunks.push(rest);
  return chunks;
}

function getMarkdownChunks(): KnowledgeChunk[] {
  const directory = path.join(process.cwd(), "src/data/rag");
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .flatMap((file) => {
      const name = file.slice(0, -3);
      const content = fs.readFileSync(path.join(directory, file), "utf8");
      const pieces = chunkKnowledgeText(content, 1150);
      let index = 0;
      const date =
        name === "2025-wrapped"
          ? "December 31, 2025"
          : name === "projects"
            ? "May 9, 2026"
            : name === "open-source"
              ? "February 4, 2026"
              : null;
      let heading = "Introduction";
      return pieces.map((piece) => {
        const firstHeading = piece.match(/^#{1,6} (.+)/m)?.[1];
        if (firstHeading) heading = firstHeading;
        const source = `rag/${name}/${heading}`;
        const note = date
          ? `Historical reference from ${date}. Treat dates, statistics, habits, and status as a snapshot of that time; current portfolio facts take precedence.\n`
          : "";
        const chunk = {
          id: `rag/${name}/${index++}`,
          source,
          content: `${note}${heading}\n${piece}`,
        };
        const headings = [...piece.matchAll(/^#{1,6} (.+)/gm)];
        if (headings.length) heading = headings.at(-1)![1];
        return chunk;
      });
    });
}

// The website supplies current facts; Markdown retains deeper personal history,
// life writing, and project details that do not fit on the public profile.
export function getKnowledgeChunks(): KnowledgeChunk[] {
  const sections = [
    {
      source: "about",
      content: `${DATA.name}. ${DATA.description}\n${DATA.summary}\nLocation: ${DATA.location}. Contact: ${DATA.contact.email}`,
    },
    ...DATA.projects.map((p) => ({
      source: `project/${p.title}`,
      content: `${p.title} (${p.category}, ${p.dates}): ${p.description}\nTechnologies: ${p.technologies.join(", ")}. ${p.href}`,
    })),
    ...DATA.work.map((w) => ({
      source: `work/${w.company}`,
      content: `${w.title} at ${w.company}, ${w.start} to ${w.end}. ${w.description}`,
    })),
    ...DATA.education.map((e) => ({
      source: `education/${e.school}`,
      content: `${e.school}: ${e.degree}, ${e.start} to ${e.end}. ${e.description}`,
    })),
    ...DATA.personalAchievements.map((a) => ({
      source: `achievement/${a.title}`,
      content: `${a.title}, ${a.dates}: ${a.description}`,
    })),
    ...DATA.hobbiesInterests.map((h) => ({
      source: `interest/${h.title}`,
      content: `${h.title}: ${h.description}`,
    })),
    ...DATA.openSourceContributions.map((c) => ({
      source: `contribution/${c.title}`,
      content: `${c.title}: ${c.description}. ${c.date}. ${c.href}`,
    })),
    ...DATA.skillGroups.map((g) => ({
      source: `skills/${g.title}`,
      content: `${g.title}: ${g.skills.join(", ")}`,
    })),
  ];
  const curated = sections.flatMap(({ source, content }) => {
    const pieces = chunkKnowledgeText(content);
    return pieces.map((piece, index) => ({
      id: `${source}/${index}`,
      source,
      content: piece.trim(),
    }));
  });
  return [...curated, ...getMarkdownChunks()];
}

export function rankLexically(query: string, chunks = getKnowledgeChunks()) {
  const words = [
    ...new Set(query.toLowerCase().match(/[\p{L}\p{N}]{3,}/gu) || []),
  ];
  return chunks
    .map((chunk) => {
      const content = chunk.content.toLowerCase();
      const source = chunk.source.toLowerCase();
      const score = words.reduce(
        (sum, word) =>
          sum +
          (source.includes(word) ? 3 : 0) +
          (content.includes(word) ? 1 : 0),
        0,
      );
      return {
        ...chunk,
        similarity: words.length ? score / (words.length * 4) : 0,
      };
    })
    .sort((a, b) => b.similarity - a.similarity);
}
