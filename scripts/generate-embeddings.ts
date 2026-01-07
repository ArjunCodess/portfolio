/**
 * Generate Embeddings Script
 *
 * Reads KB files from src/data/rag/, chunks them, generates embeddings
 * using Vercel AI SDK with Google Gemini, and stores them in the database.
 *
 * Run with: pnpm tsx scripts/generate-embeddings.ts
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs";
import path from "path";
import { sql } from "@vercel/postgres";
import { embedMany } from "ai";
import { google } from "@ai-sdk/google";
import { formatEmbedding } from "@/lib/utils";

// Embedding model - Gemini text-embedding-004 (768 dimensions)
const EMBEDDING_MODEL = "text-embedding-004";

interface Chunk {
  content: string;
  source: string;
  metadata: {
    chunkIndex: number;
    wordCount: number;
    section?: string;
  };
}

interface EmbeddingResult {
  chunk: Chunk;
  embedding: number[];
}

/**
 * Read all KB files from src/data/rag
 */
function readKBFiles(): { content: string; source: string }[] {
  const ragDir = path.join(process.cwd(), "src/data/rag");
  const files = fs.readdirSync(ragDir).filter((f) => f.endsWith(".md"));

  return files.map((file) => {
    const filePath = path.join(ragDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const source = file.replace(".md", "");
    return { content, source };
  });
}

/**
 * Chunk text into smaller pieces with overlap
 * Target: 600-800 chars, 100 char overlap
 */
function chunkText(text: string, source: string): Chunk[] {
  const chunks: Chunk[] = [];

  // Split by paragraphs first
  const paragraphs = text.split(/\n\n+/);

  let currentChunk = "";
  let chunkIndex = 0;

  for (const paragraph of paragraphs) {
    const trimmedPara = paragraph.trim();
    if (!trimmedPara) continue;

    // If adding this paragraph would exceed target size, save current chunk
    if (
      currentChunk.length + trimmedPara.length > 800 &&
      currentChunk.length > 300
    ) {
      chunks.push({
        content: currentChunk.trim(),
        source,
        metadata: {
          chunkIndex: chunkIndex++,
          wordCount: currentChunk.split(/\s+/).length,
        },
      });

      // Keep last 100 chars for overlap
      const overlap = currentChunk.slice(-100);
      currentChunk = overlap + "\n\n" + trimmedPara;
    } else {
      currentChunk += (currentChunk ? "\n\n" : "") + trimmedPara;
    }
  }

  // Add remaining content
  if (currentChunk.trim().length > 100) {
    chunks.push({
      content: currentChunk.trim(),
      source,
      metadata: {
        chunkIndex: chunkIndex++,
        wordCount: currentChunk.split(/\s+/).length,
      },
    });
  }

  return chunks;
}

/**
 * Generate embeddings for all chunks using Vercel AI SDK
 */
async function generateEmbeddings(chunks: Chunk[]): Promise<EmbeddingResult[]> {
  console.log(`⏳ Generating embeddings using Gemini ${EMBEDDING_MODEL}...`);

  const texts = chunks.map((c) => c.content);

  // Use embedMany for batch embedding
  const { embeddings } = await embedMany({
    model: google.embedding(EMBEDDING_MODEL),
    values: texts,
  });

  console.log(`Generated ${embeddings.length} embeddings`);

  // Map embeddings back to chunks
  return chunks.map((chunk, i) => ({
    chunk,
    embedding: embeddings[i],
  }));
}

/**
 * Store embeddings in database
 */
async function storeEmbeddings(results: EmbeddingResult[]): Promise<void> {
  console.log(`⏳ Storing ${results.length} embeddings to database...`);

  // Clear existing data
  await sql`DELETE FROM kb_documents`;
  console.log("  Cleared existing data");

  // Insert in batches
  const batchSize = 50;
  let inserted = 0;

  for (let i = 0; i < results.length; i += batchSize) {
    const batch = results.slice(i, i + batchSize);

    for (const result of batch) {
      const embeddingStr = formatEmbedding(result.embedding);

      await sql`
        INSERT INTO kb_documents (content, embedding, source, metadata)
        VALUES (
          ${result.chunk.content},
          ${embeddingStr}::vector,
          ${result.chunk.source},
          ${JSON.stringify(result.chunk.metadata)}::jsonb
        )
      `;
      inserted++;
    }

    console.log(`  Inserted ${inserted}/${results.length} rows`);
  }

  console.log(`✅ Successfully stored ${inserted} embeddings`);
}

/**
 * Main execution
 */
async function main() {
  console.log("🚀 Starting embedding generation with Vercel AI SDK...\n");

  try {
    // 1. Read KB files
    console.log("📖 Reading KB files...");
    const files = readKBFiles();
    console.log(
      `  Found ${files.length} files: ${files.map((f) => f.source).join(", ")}\n`,
    );

    // 2. Chunk documents
    console.log("✂️ Chunking documents...");
    const allChunks: Chunk[] = [];
    for (const file of files) {
      const chunks = chunkText(file.content, file.source);
      allChunks.push(...chunks);
      console.log(`  ${file.source}: ${chunks.length} chunks`);
    }
    console.log(`  Total: ${allChunks.length} chunks\n`);

    // 3. Generate embeddings
    const results = await generateEmbeddings(allChunks);
    console.log(`\n✅ Generated ${results.length} embeddings\n`);

    // 4. Store to database
    await storeEmbeddings(results);

    console.log("\n🎉 Embedding generation complete!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
