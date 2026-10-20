import assert from "node:assert/strict";
import fs from "node:fs";
import { afterEach, mock, test } from "node:test";
import { DATA } from "../src/data/resume";
import {
  planRetrieval,
  projectCatalog,
  retrieveChatContext,
  contextSources,
} from "../src/lib/ai/chat-retrieval";
import {
  buildContext,
  findRelevantContent,
  fuseRankings,
} from "../src/lib/ai/embedding";
import {
  getKnowledgeChunks,
  getKnowledgeHash,
  rankLexically,
} from "../src/lib/ai/knowledge";

const originalEnv = { ...process.env };
afterEach(() => {
  mock.restoreAll();
  process.env = { ...originalEnv };
});
const turns = (...questions: string[]) =>
  questions.map((text, i) => ({
    id: String(i),
    role: "user",
    parts: [{ type: "text", text }],
  }));

test("retrieval changes preserve compatibility with the committed vector index", () => {
  const indexed = JSON.parse(
    fs.readFileSync("src/data/embeddings.json", "utf8"),
  );
  assert.equal(
    getKnowledgeHash(indexed.chunks),
    getKnowledgeHash(getKnowledgeChunks()),
  );
});

test("follow-ups resolve projects, pairs, and ordered references", () => {
  for (const query of [
    "where was it accepted?",
    "what is its stack?",
    "tell me more",
  ]) {
    assert.deepEqual(
      planRetrieval(turns("tell me about NGTA", query)).entities.map(
        (p) => p.name,
      ),
      ["NGTA"],
    );
  }
  const pair = "compare MINTS and PRISM";
  assert.equal(
    planRetrieval(turns(pair, "where was it submitted?")).clarification,
    "which project do you mean: mints or prism?",
  );
  assert.deepEqual(
    planRetrieval(turns(pair, "tell me about both")).entities.map(
      (p) => p.name,
    ),
    ["MINTS", "PRISM"],
  );
  assert.equal(
    planRetrieval(turns(pair, "what about the former?")).entities[0].name,
    "MINTS",
  );
  assert.equal(
    planRetrieval(turns(pair, "what about the latter?")).entities[0].name,
    "PRISM",
  );
});

test("new topics do not inherit stale project references", () => {
  assert.deepEqual(
    planRetrieval(
      turns("tell me about NGTA", "tell me about PRISM"),
    ).entities.map((p) => p.name),
    ["PRISM"],
  );
  const plan = planRetrieval(
    turns(
      "tell me about NGTA",
      "tell me about the Lodha Genius Programme",
      "what was it like?",
    ),
  );
  assert.equal(plan.entities.length, 0);
  assert.ok(plan.query.includes("Lodha Genius"));
  const unrelated = planRetrieval(
    turns("tell me about NGTA", "where did arjun study?"),
  );
  assert.equal(unrelated.entities.length, 0);
  assert.ok(!unrelated.query.includes("NGTA"));
});

test("project aliases match whole names rather than substrings", () => {
  assert.equal(
    planRetrieval(turns("tell me about hydra ccrcc")).entities[0].name,
    "HYDRA-ccRCC",
  );
  assert.equal(
    planRetrieval(turns("tell me about prismatic colors")).entities.length,
    0,
  );
});

test("catalog covers every recorded python project without network calls", async () => {
  mock.method(globalThis, "fetch", () => {
    throw new Error("unexpected network call");
  });
  const plan = planRetrieval(turns("which projects use Python?"));
  assert.ok(plan.catalog);
  const context = await retrieveChatContext(plan, AbortSignal.timeout(1000));
  const expected = DATA.projects.filter((p) =>
    (p.technologies as readonly string[]).includes("Python"),
  );
  const rows = context.split("\n").slice(1);
  assert.equal(rows.length, expected.length);
  for (const project of expected)
    assert.ok(rows.some((row) => row.startsWith(`${project.title} |`)));
});

test("catalog respects unions and preserves exclusions for the answering model", () => {
  const context = projectCatalog("which projects use Python or R?");
  const expected = DATA.projects.filter((p) =>
    p.technologies.some((t) => t === "Python" || t === "R"),
  );
  assert.equal(context.split("\n").length - 1, expected.length);
  assert.equal(
    projectCatalog("list projects without Python").split("\n").length - 1,
    DATA.projects.length,
  );
  assert.ok(
    projectCatalog("which projects use Ruby?").includes(
      "inspect these records",
    ),
  );
});

test("current acceptance facts bypass old readmes and remote retrieval", async () => {
  mock.method(globalThis, "fetch", () => {
    throw new Error("unexpected network call");
  });
  const context = await retrieveChatContext(
    planRetrieval(turns("where was NGTA accepted?")),
    AbortSignal.timeout(1000),
  );
  assert.ok(context.includes("Accepted at"));
  assert.ok(context.includes("GenAI4Health 2026"));
  assert.ok(
    context.includes("source url: https://github.com/ArjunCodess/NGTA"),
  );
  assert.ok(!context.includes("Historical reference"));
});

test("source links are grounded, relevant, and deduplicated", () => {
  const context =
    "source url: https://github.com/ArjunCodess/PRISM\nsource url: https://github.com/ArjunCodess/prism\nsource url: https://github.com/ArjunCodess/MINTS";
  assert.deepEqual(
    contextSources(context, "prism forecasts conjunction risk"),
    [{ label: "prism", url: "https://github.com/ArjunCodess/PRISM" }],
  );
  assert.deepEqual(contextSources(context, "this detail isn't recorded"), []);
});

test("comparison evidence includes current facts for both projects", async () => {
  delete process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const context = await retrieveChatContext(
    planRetrieval(turns("compare MINTS and PRISM")),
    AbortSignal.timeout(1000),
  );
  assert.ok(context.includes("[project/MINTS]"));
  assert.ok(context.includes("[project/PRISM]"));
  assert.ok(context.includes("Submitted to GLBIO 2027"));
  assert.ok(context.includes("Submitted to Advances in Space Research"));
  assert.ok(context.length <= 10_000);
});

test("keyword retrieval finds representative portfolio evidence", () => {
  const chunks = getKnowledgeChunks();
  const cases = [
    ["NGTA accepted NeSy", "project/NGTA"],
    ["MINTS nucleotide transformers", "project/MINTS"],
    ["PRISM conjunction risk", "project/PRISM"],
    ["Lodha Genius Programme", "education/Lodha"],
    ["Hidden Prompt Xavier", "achievement/AI Vulnerability"],
    ["chain reaction", "rag/"],
  ];
  for (const [query, source] of cases) {
    assert.ok(
      rankLexically(query, chunks)
        .slice(0, 8)
        .some((c) => c.source.startsWith(source)),
      query,
    );
  }
});

test("bm25 matches short technical terms without substring noise", () => {
  const chunks = [
    { id: "a", source: "one", content: "R and AI research" },
    { id: "b", source: "two", content: "windows railway" },
  ];
  const ranked = rankLexically("R AI", chunks);
  assert.equal(ranked[0].id, "a");
  assert.equal(ranked[1].similarity, 0);
});

test("rank fusion rewards agreement without mixing incompatible score scales", () => {
  const fused = fuseRankings(
    [
      { id: "a", score: 1000 },
      { id: "b", score: 1 },
    ],
    [
      { id: "b", score: 0.8 },
      { id: "c", score: 0.7 },
    ],
  );
  assert.equal(fused[0].id, "b");
  assert.equal(new Set(fused.map((c) => c.id)).size, fused.length);
});

test("context packing preserves complete chunks and fits smaller later evidence", () => {
  const context = buildContext(
    [
      { source: "large", content: "x".repeat(100) },
      { source: "small", content: "complete fact" },
    ],
    40,
  );
  assert.equal(context, "[small]\ncomplete fact");
});

test("aborted retrieval never starts a provider call or falls back", async () => {
  mock.method(globalThis, "fetch", () => {
    throw new Error("unexpected network call");
  });
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(
    findRelevantContent("NGTA", 4, false, controller.signal),
    { name: "AbortError" },
  );
});
