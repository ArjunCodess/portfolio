import { DATA } from "@/data/resume";

export type KnowledgeChunk = { id: string; content: string; source: string };

// One source of truth for the website and retrieval; no GitHub token or scraper.
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
  return sections.flatMap(({ source, content }) => {
    const pieces = content.match(/[\s\S]{1,1400}(?:\s|$)/g) || [content];
    return pieces.map((piece, index) => ({
      id: `${source}/${index}`,
      source,
      content: piece.trim(),
    }));
  });
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
