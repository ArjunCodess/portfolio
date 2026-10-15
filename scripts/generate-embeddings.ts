import dotenv from "dotenv";
import fs from "node:fs/promises";
import { replaceDatabaseEmbeddings } from "../src/lib/ai/vector-store";
import { getKnowledgeChunks } from "../src/lib/ai/knowledge";
import {
  EMBEDDING_MODEL,
  EMBEDDING_DIMENSIONS,
  embedTexts,
  validateEmbedding,
} from "../src/lib/ai/config";

dotenv.config({ path: ".env.local", quiet: true });
async function main() {
  const chunks = getKnowledgeChunks();
  const existing = new Map<string, number[]>();
  try {
    const old = JSON.parse(
      await fs.readFile("src/data/embeddings.json", "utf8"),
    );
    if (
      !process.argv.includes("--force") &&
      old.model === EMBEDDING_MODEL &&
      old.dimensions === EMBEDDING_DIMENSIONS
    ) {
      for (const chunk of old.chunks)
        existing.set(
          JSON.stringify([chunk.id, chunk.source, chunk.content]),
          validateEmbedding(chunk.embedding),
        );
    }
  } catch {
    existing.clear();
  }
  const key = (c: { id: string; source: string; content: string }) =>
    JSON.stringify([c.id, c.source, c.content]);
  const changed = chunks.filter((c) => !existing.has(key(c)));
  for (let i = 0; i < changed.length; i += 8) {
    const batch = changed.slice(i, i + 8);
    const vectors = await embedTexts(
      batch.map((c) => `title: ${c.source} | text: ${c.content}`),
      120_000,
    );
    batch.forEach((chunk, j) => existing.set(key(chunk), vectors[j]));
    console.log(
      `Embedded ${Math.min(i + batch.length, changed.length)}/${changed.length} changed chunks`,
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
      dimensions: EMBEDDING_DIMENSIONS,
      chunks: indexed,
    }),
  );
  await fs.rename("src/data/embeddings.json.tmp", "src/data/embeddings.json");
  console.log(
    `Indexed ${indexed.length} curated chunks with ${EMBEDDING_MODEL}; embedded ${changed.length} changed chunks`,
  );
}
main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Operation failed");
  process.exitCode = 1;
});
