import { DATA } from "@/data/resume";
import { buildContext, findRelevantContent } from "./embedding";
import { getKnowledgeChunks, type KnowledgeChunk } from "./knowledge";

type Turn = { role: string; parts: { type: string; text?: string }[] };
const followupPattern =
  /\b(it|its|that|this|they|their|them|those|both|same|former|latter)\b|^(and |what about |tell me more|more\b|why\b|how so\b)/i;

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}+#]+/gu, " ")
    .trim();
}

function contains(text: string, phrase: string) {
  return ` ${normalize(text)} `.includes(` ${normalize(phrase)} `);
}

export const projects = DATA.projects.map((project) => ({
  name: project.title,
  aliases: [
    ...new Set([
      project.title,
      ...project.links.flatMap((link) => {
        const repo = link.href.match(
          /^https:\/\/github.com\/[^/]+\/([^/#?]+)/,
        )?.[1];
        return repo ? [repo.replace(/[_-]/g, " ")] : [];
      }),
    ]),
  ],
  category: project.category,
  technologies: [...project.technologies],
  url: project.href,
}));

function mentionedProjects(text: string) {
  const normalized = ` ${normalize(text)} `;
  return projects
    .filter((project) => project.aliases.some((alias) => contains(text, alias)))
    .sort((a, b) => {
      const position = (project: typeof a) =>
        Math.min(
          ...project.aliases
            .map((alias) => normalized.indexOf(` ${normalize(alias)} `))
            .filter((index) => index >= 0),
        );
      return position(a) - position(b);
    });
}

export function planRetrieval(messages: Turn[]) {
  const text = (turn: Turn) =>
    turn.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text || "")
      .join(" ");
  const query = text(messages.at(-1)!);
  let entities = mentionedProjects(query);
  const followup = followupPattern.test(query);
  let previous = "";
  if (!entities.length && followup) {
    const history = messages.slice(0, -1);
    // prefer the visitor's topic over incidental names in an answer.
    for (const turn of history.filter((m) => m.role === "user").reverse()) {
      previous = text(turn);
      entities = mentionedProjects(text(turn));
      if (entities.length) break;
      if (!followupPattern.test(text(turn))) break;
    }
    if (entities.length > 1) {
      if (/\bformer\b/i.test(query)) entities = entities.slice(0, 1);
      else if (/\blatter\b/i.test(query)) entities = entities.slice(-1);
      else if (/\b(it|its)\b/i.test(query)) {
        return {
          query,
          entities: [],
          comparison: false,
          catalog: false,
          clarification: `Which project do you mean: ${entities.map((p) => p.name).join(" or ")}?`,
        };
      }
    }
  }
  const resolvedQuery = entities.length
    ? `${query}\nprojects: ${entities.map((p) => p.name).join(", ")}`
    : followup && previous
      ? `${query}\nprevious question: ${previous.slice(0, 500)}`
      : query;
  return {
    query: resolvedQuery,
    entities,
    comparison:
      entities.length > 1 ||
      /\b(compare|comparison|versus|vs|difference)\b/i.test(query),
    catalog:
      /\b(projects|work)\b/i.test(query) &&
      /\b(which|list|all|how many|what|any)\b/i.test(query) &&
      !entities.length,
    clarification: undefined,
  };
}

export function projectCatalog(query: string) {
  const technologies = [
    ...new Set(projects.flatMap((p) => p.technologies)),
  ].filter((tech) => contains(query, tech));
  const categories = [...new Set(projects.map((p) => p.category))].filter(
    (category) => contains(query, category),
  );
  const negative = /\b(not|without|excluding|except)\b/i.test(query);
  const matching = negative
    ? projects
    : projects.filter(
        (project) =>
          (!technologies.length ||
            (/\bor\b/i.test(query)
              ? technologies.some((tech) => project.technologies.includes(tech))
              : technologies.every((tech) =>
                  project.technologies.includes(tech),
                ))) &&
          (!categories.length || categories.includes(project.category)),
      );
  return `current project catalog, ${matching.length} records out of ${projects.length}. applied filters: ${negative ? "none; apply the requested exclusion to these records" : [...technologies, ...categories].join(", ") || "none; inspect these records for the requested criteria"}. technologies are recorded tags; do not infer unlisted technologies.\n${matching.map((project) => `${project.name} | ${project.category} | ${project.technologies.join(", ")} | ${project.url}`).join("\n")}`;
}

export function sourceUrl(source: string): string | undefined {
  const project = projects.find((p) => source === `project/${p.name}`);
  if (project) return project.url;
  const repo = source.match(/^rag\/github-([^/]+)\//)?.[1];
  if (repo?.startsWith("arjuncodess-"))
    return `https://github.com/ArjunCodess/${repo.slice("arjuncodess-".length)}`;
  return undefined;
}

export function contextSources(context: string, answer: string) {
  const urls = [
    ...new Set(
      [...context.matchAll(/^source url: (https?:\/\/\S+)/gm)].map(
        (match) => match[1],
      ),
    ),
  ];
  return urls
    .map((url) => ({
      url,
      label:
        projects.find((project) => project.url === url)?.name ||
        new URL(url).pathname.split("/").filter(Boolean).at(-1) ||
        "source",
    }))
    .filter(
      (source, index, all) =>
        contains(answer, source.label) &&
        all.findIndex(
          (other) => other.label.toLowerCase() === source.label.toLowerCase(),
        ) === index,
    )
    .slice(0, 3);
}

export async function retrieveChatContext(
  plan: ReturnType<typeof planRetrieval>,
  signal: AbortSignal,
) {
  signal.throwIfAborted();
  if (plan.catalog) return projectCatalog(plan.query);
  const current = getKnowledgeChunks();
  const facts = plan.entities.flatMap((p) =>
    current.filter((c) => c.source === `project/${p.name}`),
  );
  // exact status questions need current facts, not older readmes.
  if (
    facts.length &&
    /\b(accepted|submitted|published|status|technologies|stack|link|url)\b/i.test(
      plan.query,
    ) &&
    !/\b(why|how|limitations|implementation|architecture|method|results|explain)\b/i.test(
      plan.query,
    ) &&
    !plan.comparison
  ) {
    return contextWithLinks(facts);
  }
  const queries =
    plan.comparison && plan.entities.length
      ? plan.entities
          .slice(0, 3)
          .map((p) => `${plan.query}\nfocus project: ${p.name}`)
      : [plan.query];
  const results = await Promise.all(
    queries.map((query) =>
      findRelevantContent(query, plan.comparison ? 4 : 6, false, signal),
    ),
  );
  // interleave searches so each compared project gets evidence.
  const selected: KnowledgeChunk[] = [...facts];
  const seen = new Set(selected.map((c) => c.id));
  for (let i = 0; i < 6; i++) {
    for (const result of results) {
      const chunk = result[i];
      if (chunk && !seen.has(chunk.id)) {
        seen.add(chunk.id);
        selected.push(chunk);
      }
    }
  }
  return contextWithLinks(
    selected.slice(0, plan.comparison ? 10 : 7),
    plan.comparison ? 10_000 : 7000,
  );
}

function contextWithLinks(chunks: KnowledgeChunk[], budget = 7000) {
  return buildContext(
    chunks.map((chunk) => ({
      ...chunk,
      content: `${sourceUrl(chunk.source) ? `source url: ${sourceUrl(chunk.source)}\n` : ""}${chunk.content}`,
    })),
    budget,
  );
}
