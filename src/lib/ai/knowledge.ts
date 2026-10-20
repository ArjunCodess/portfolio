import { DATA } from "@/data/resume";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { CERTIFICATE_GROUPS } from "@/data/certificates";

export type KnowledgeChunk = { id: string; content: string; source: string };

export function chunkKnowledgeText(
  content: string,
  maxLength = 1400,
): string[] {
  const chunks: string[] = [];
  // Git uses CRLF on Windows and LF on Vercel. Normalize before chunking
  // so the corpus hash and chunk boundaries match on both platforms.
  let rest = content.replace(/\r\n?/g, "\n").trim();
  while (rest.length > maxLength) {
    const newline = rest.lastIndexOf("\n", maxLength);
    // Prefer complete Markdown lines so a short factual bullet isn't split
    // between its question-bearing phrase and the answer at the next chunk.
    const boundary =
      newline > maxLength / 2 ? newline : rest.lastIndexOf(" ", maxLength);
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
let knowledgeCache: KnowledgeChunk[] | undefined;

export function getKnowledgeChunks(): KnowledgeChunk[] {
  // production knowledge changes with each deployment.
  if (process.env.NODE_ENV === "production" && knowledgeCache)
    return knowledgeCache;
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
      content: `${a.title}, ${a.dates}: ${a.description}${a.title === "AI Vulnerability Challenge - Xavier University" ? " Official challenge name: Hidden Prompt: National AI Vulnerability Challenge 2026." : ""}`,
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
    ...CERTIFICATE_GROUPS.flatMap((group) =>
      group.cards.map((card) => ({
        source: `certificate/${card.title}`,
        content: `${card.title}. ${card.description}. ${card.content}`,
      })),
    ),
  ];
  const curated = sections.flatMap(({ source, content }) => {
    const pieces = chunkKnowledgeText(content);
    return pieces.map((piece, index) => ({
      id: `${source}/${index}`,
      source,
      content: piece.trim(),
    }));
  });
  const chunks = [...curated, ...getMarkdownChunks()];
  if (process.env.NODE_ENV === "production") knowledgeCache = chunks;
  return chunks;
}

const hashes = new WeakMap<KnowledgeChunk[], string>();

export function getKnowledgeHash(chunks: KnowledgeChunk[]): string {
  const cached = hashes.get(chunks);
  if (cached) return cached;
  const hash = createHash("sha256")
    .update(
      JSON.stringify(
        chunks.map(({ id, source, content }) => ({ id, source, content })),
      ),
    )
    .digest("hex");
  hashes.set(chunks, hash);
  return hash;
}

function tokens(text: string) {
  return text.toLowerCase().match(/[\p{L}\p{N}+#]+/gu) || [];
}

const lexicalIndexes = new WeakMap<
  KnowledgeChunk[],
  ReturnType<typeof lexicalIndex>
>();

function lexicalIndex(chunks: KnowledgeChunk[]) {
  const frequencies = new Map<string, number>();
  const documents = chunks.map((chunk) => {
    const words = tokens(chunk.content);
    const counts = new Map<string, number>();
    for (const word of words) counts.set(word, (counts.get(word) || 0) + 1);
    for (const word of counts.keys())
      frequencies.set(word, (frequencies.get(word) || 0) + 1);
    return {
      counts,
      length: words.length,
      source: new Set(tokens(chunk.source)),
    };
  });
  return {
    documents,
    frequencies,
    average:
      documents.reduce((sum, doc) => sum + doc.length, 0) /
        (documents.length || 1) || 1,
  };
}

export function rankLexically(query: string, chunks = getKnowledgeChunks()) {
  const stopWords = new Set([
    "what",
    "which",
    "who",
    "was",
    "were",
    "the",
    "and",
    "did",
    "does",
    "how",
    "about",
    "arjun",
    "his",
    "you",
    "your",
    "with",
    "for",
    "that",
    "this",
    "are",
    "a",
    "an",
    "i",
    "me",
    "is",
    "in",
    "to",
    "of",
    "it",
    "its",
    "be",
    "on",
    "at",
    "can",
    "tell",
    "projects",
    "project",
  ]);
  const words = [...new Set(tokens(query))].filter(
    (word) => !stopWords.has(word),
  );
  let index = lexicalIndexes.get(chunks);
  if (!index) {
    index = lexicalIndex(chunks);
    lexicalIndexes.set(chunks, index);
  }
  const { documents, frequencies, average } = index;
  return chunks
    .map((chunk, i) => {
      const doc = documents[i];
      const score = words.reduce((sum, word) => {
        const frequency = frequencies.get(word) || 0;
        const idf = Math.log(
          1 + (chunks.length - frequency + 0.5) / (frequency + 0.5),
        );
        const count = doc.counts.get(word) || 0;
        const bm25 =
          (count * 2.2) /
          (count + 1.2 * (0.25 + (0.75 * doc.length) / average));
        return sum + idf * (bm25 + (doc.source.has(word) ? 1.5 : 0));
      }, 0);
      return {
        ...chunk,
        similarity: score,
      };
    })
    .sort((a, b) => b.similarity - a.similarity);
}
