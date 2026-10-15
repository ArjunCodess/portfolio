import dotenv from "dotenv";
import fs from "node:fs/promises";
import { setTimeout } from "node:timers/promises";
import { replaceDatabaseEmbeddings } from "../src/lib/ai/vector-store";
import { getKnowledgeChunks } from "../src/lib/ai/knowledge";
import {
  EMBEDDING_MODEL,
  EMBEDDING_PROFILE,
  EMBEDDING_DIMENSIONS,
  embedTexts,
  validateEmbedding,
} from "../src/lib/ai/config";

dotenv.config({ path: ".env.local", quiet: true });
async function main() {
  const chunks = getKnowledgeChunks();
  const existing = new Map<string, number[]>();
  // The committed cache is complete; the ignored checkpoint holds partial progress.
  for (const file of [
    "src/data/embeddings.json",
    ".cache/embedding-progress.json",
  ]) {
    if (process.argv.includes("--force")) break;
    try {
      const old = JSON.parse(await fs.readFile(file, "utf8"));
      if (
        old.model !== EMBEDDING_MODEL ||
        old.profile !== EMBEDDING_PROFILE ||
        old.dimensions !== EMBEDDING_DIMENSIONS
      )
        continue;
      for (const chunk of old.chunks)
        existing.set(
          JSON.stringify([chunk.id, chunk.source, chunk.content]),
          validateEmbedding(chunk.embedding),
        );
    } catch {
      // A missing or invalid cache never prevents a fresh generation.
    }
  }
  const perMinute = Number(process.env.EMBEDDING_REFRESH_RPM_LIMIT || "80");
  if (!Number.isFinite(perMinute) || perMinute < 1 || perMinute > 100)
    throw new Error("EMBEDDING_REFRESH_RPM_LIMIT must be between 1 and 100");
  await fs.mkdir(".cache", { recursive: true });
  const key = (c: { id: string; source: string; content: string }) =>
    JSON.stringify([c.id, c.source, c.content]);
  const changed = chunks.filter((c) => !existing.has(key(c)));
  const batchSize = Math.min(8, Math.floor(perMinute));
  for (let i = 0; i < changed.length; i += batchSize) {
    const batch = changed.slice(i, i + batchSize);
    const started = Date.now();
    const vectors = await embedTexts(
      batch.map((c) => `title: ${c.source} | text: ${c.content}`),
      120_000,
    );
    batch.forEach((chunk, j) => existing.set(key(chunk), vectors[j]));
    await fs.writeFile(
      ".cache/embedding-progress.json.tmp",
      JSON.stringify({
        model: EMBEDDING_MODEL,
        profile: EMBEDDING_PROFILE,
        dimensions: EMBEDDING_DIMENSIONS,
        chunks: chunks
          .filter((chunk) => existing.has(key(chunk)))
          .map((chunk) => ({ ...chunk, embedding: existing.get(key(chunk))! })),
      }),
    );
    await fs.rename(
      ".cache/embedding-progress.json.tmp",
      ".cache/embedding-progress.json",
    );
    console.log(
      `Embedded ${Math.min(i + batch.length, changed.length)}/${changed.length} changed chunks`,
    );
    // Google's batch endpoint counts each input against the per-minute allowance.
    if (i + batch.length < changed.length)
      await setTimeout(
        Math.max(
          0,
          Math.ceil((batch.length * 60_000) / perMinute) -
            (Date.now() - started),
        ),
      );
  }
  const indexed = chunks.map((chunk) => ({
    ...chunk,
    embedding: existing.get(key(chunk))!,
  }));
  const database = await replaceDatabaseEmbeddings(indexed);
  console.log(
    `Replaced all database embeddings: ${database.count} rows; corpus ${database.sourceHash}`,
  );
  // Write only after every embedding succeeds. Never delete the working index first.
  await fs.writeFile(
    "src/data/embeddings.json.tmp",
    JSON.stringify({
      model: EMBEDDING_MODEL,
      profile: EMBEDDING_PROFILE,
      dimensions: EMBEDDING_DIMENSIONS,
      chunks: indexed,
    }),
  );
  await fs.rename("src/data/embeddings.json.tmp", "src/data/embeddings.json");
  await fs.rm(".cache/embedding-progress.json", { force: true });
  console.log(
    `Indexed ${indexed.length} curated chunks with ${EMBEDDING_MODEL}; embedded ${changed.length} changed chunks`,
  );
}
main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Operation failed");
  process.exitCode = 1;
});
