<h1 align="center">Portfolio</h1>

<p align="center">
  My personal portfolio, built with Next.js, showcasing my projects, research, open-source contributions, writing, and achievements.
</p>

---

## 🌐 Live Site

**[arjuncodess.is-a.dev](https://arjuncodess.is-a.dev)**

## 🧐 About

Hi, I'm **Arjun Vijay Prakash**, a 16-year-old full-stack developer, researcher, technical writer, and CTO at [Pilot](https://github.com/getpilot) from Lucknow, India. I work on neuro-symbolic AI, mechanistic interpretability, computational genomics, medical AI, and space debris monitoring. I'm also an associate editor at Synthica.

- **NGTA accepted at NeSy 2026 and GenAI4Health 2026**, a NeurIPS 2026 workshop.
- **First prize at Xavier University's AI Vulnerability Challenge**, competing with Saksham Yadav as Team Cipher Force. The competition brought together 187 teams from 97 schools across 20 cities. [Official result](https://www.linkedin.com/feed/update/urn:li:activity:7510232515480145920/).
- **Selected for YC Startup School India**, with an 8% event acceptance rate.
- **35000+ followers and 420,000+ views** on [DEV.to](https://dev.to/arjuncodess), with **$2,450 earned** through technical writing.
- **Open-source contributions** to Grafana, Tempo, fish-shell, Notesnook, next-cloudinary, and Zero.
- **Lodha Genius Programme at Ashoka University**, followed by my Medium series ["chain reaction."](https://arjunwritess.medium.com/list/chain-reaction-575bef231dc9). I also write ["to my love."](https://arjunwritess.medium.com/list/to-my-love-758949c73be0).

### Current Research

- **[NGTA](https://github.com/ArjunCodess/NGTA):** NARS-guided Transformer attention for clinical prediction under extreme missingness. NeSy plans primary proceedings in PMLR and a Neurosymbolic Artificial Intelligence journal special issue for invited extended versions. These are [conference publication plans](https://2026.nesyconf.org/call-for-papers/), not confirmation that NGTA is published or accepted by the journal.
- **[MINTS](https://github.com/ArjunCodess/MINTS):** Mechanistic interpretability for genomic transformers. Submitted to GLBIO 2027.
- **[PRISM](https://github.com/ArjunCodess/PRISM):** Forecasting reported conjunction risk for space debris monitoring. Submitted to Advances in Space Research.
- **[HYDRA-ccRCC](https://github.com/ArjunCodess/HYDRA-ccRCC):** Kidney-cancer transcriptomics and prognostic evidence auditing. Planned submission to Bioinformatics Advances.
- **[PSYCON](https://github.com/ArjunCodess/PSYCON):** Evidence-linked analysis of communication in group discussions. Submitted to IRIS National Fair 2026-27.

## ✨ Features

- **Next.js App Router** with Turbopack and React 19.
- **Animations** using Motion, with the page and bottom navbar shifting left when chat opens.
- **Dark/light mode** with system preference detection and responsive layouts.
- **Certificate gallery** using Aceternity UI's expandable cards, with full-image previews, keyboard controls, and external certificate links.
- **Project showcase** featuring four full-stack and four research projects on the homepage. The `/projects` archive adds exclusive category filters, sorting, and an Others category.
- **Compact open-source cards** with short descriptions and direct contribution links.
- **Guestbook** and a cached GitHub activity graph.
- **AI chatbot with RAG**, combining semantic search with keyword matching over portfolio facts and personal Markdown.
- **Resume download** serving the updated PDF from `public/resume/resume.pdf`.

## 🧠 AI Chatbot & RAG Architecture

The chatbot answers questions about my projects, research, background, and writing using the portfolio's own content. Chat generation calls Groq and embeddings call Google's API directly from Next.js; no Python service or local model hosting is required.

### How it Works

1. **Ingestion pipeline** (`scripts/generate-embeddings.ts`) reads current website data from `src/data/resume.tsx`, certificate descriptions, and every Markdown file in `src/data/rag/`. Line-aware chunking keeps short factual statements together. The `gemini-embedding-2` API produces normalized 768-dimensional vectors.
2. **Index refresh** reuses unchanged vectors from `src/data/embeddings.json` when their model, dimensions, and retrieval profile match. After every vector is generated and validated, one Postgres transaction deletes the old `kb_documents` rows and inserts the complete new index. A failed generation or transaction preserves the previous database index.
3. **Retrieval** embeds the question using the same model and searches pgvector with cosine similarity, blended with rare-term and exact-phrase matches. The top four results supply context. Model, profile, dimensions, and corpus-hash checks prevent mismatched or stale vectors from being used. Keyword retrieval remains available when semantic search is unavailable.
4. **Generation** uses `openai/gpt-oss-120b` on Groq with low reasoning effort through AI SDK 7. A failed, empty, or truncated generation gets one fallback attempt on `openai/gpt-oss-20b`. Responses are buffered and checked before the UI stream starts, so provider failures return HTTP 429 or 503 instead of an empty HTTP 200. Replies appear once the complete answer is ready, in lowercase prose while preserving proper names, with instructions to distinguish submissions, acceptances, and publication plans. Gemini is used only for embeddings.

### Free-Tier Usage

Chat sends at most six recent text messages within a byte budget, 5,200 characters of retrieved context, and a 2,048-token generation cap per attempt, with replies limited to 120 words. Reasoning is excluded from conversation history. Standalone answers and query embeddings have bounded, one-hour caches. Each Groq attempt has an 18-second timeout with no SDK retries; the whole request has a 45-second deadline. Semantic retrieval falls back to keywords if the embedding or vector lookup times out. Database budget reservations also have deadlines. The sidebar provides a retry button for failed answers. Run `pnpm test:chat` for mocked regression checks covering provider failures, empty answers, history, and HTTP status codes.

Postgres reserves request budgets across instances: five requests per visitor per minute, twenty per visitor per day, and configurable global limits that default to eight per minute and one hundred per day. Set `CHAT_RPM_LIMIT` and `CHAT_DAILY_LIMIT` below your Groq account's actual allowance, accounting for token limits as well as request limits. A missing budget table or unavailable database disables chat rather than bypassing these limits.

Embedding refreshes default to **80 texts per minute**, counting each text in a batch. `EMBEDDING_REFRESH_RPM_LIMIT` can lower that pace. Partial progress is saved in `.cache/embedding-progress.json`, so an interrupted refresh can resume without generating completed chunks again. Embedding quotas are separate from chat quotas.

## 🛠️ Tech Stack

### Core

- **Framework:** Next.js 16.4, App Router, Turbopack.
- **UI:** React 19.3 and TypeScript 6.
- **Styling:** Tailwind CSS 4 and shadcn/ui.
- **Animations:** Motion 14, Magic UI, and Aceternity UI expandable cards.

### AI & Data

- **LLM:** Groq, defaulting to `openai/gpt-oss-120b` with low reasoning effort.
- **SDK:** AI SDK 7 with Groq and Google providers.
- **Embeddings:** `gemini-embedding-2`, 768 dimensions, through the Gemini API.
- **Database:** Postgres through Neon's serverless driver, with pgvector for semantic search.
- **Knowledge:** Current portfolio data, certificate descriptions, and preserved Markdown history.

### Deployment

- **Platform:** Vercel, using Node.js 24.
- **Analytics:** Vercel Analytics and Speed Insights.
- **Package manager:** pnpm 11.1.1. Dependency overrides and explicit build permissions live in `pnpm-workspace.yaml`.

## 🏁 Getting Started

### Prerequisites

- Node.js 24.x.
- pnpm 11.1.1.
- A Postgres database with pgvector support.
- A Groq API key for chat and a Google API key for embeddings.

### Installation

See [.env.example](.env.example) for the environment variables.

```bash
git clone https://github.com/ArjunCodess/portfolio.git
cd portfolio
pnpm install
cp .env.example .env.local
```

Set `POSTGRES_URL`, `GROQ_API_KEY`, and `GOOGLE_GENERATIVE_AI_API_KEY` in `.env.local`. Add the GitHub OAuth and auth credentials from `.env.example` if using guestbook sign-in. Next.js and Vercel set `NODE_ENV` automatically.

```bash
# Create the persistent chat-budget table.
pnpm db:setup-chat

# Generate the knowledge index using your Google API key.
pnpm kb:generate

pnpm dev
```

Visit `http://localhost:3000`.

### Setting up the Knowledge Base (RAG)

```bash
# Refresh embeddings from local portfolio data and Markdown.
pnpm kb:generate

# Optionally sync project READMEs, then refresh embeddings.
pnpm kb:refresh -- --github-cli

# Skip GitHub and refresh local content only.
pnpm kb:refresh -- --local-only

# Regenerate every vector instead of reusing cached progress.
pnpm kb:refresh -- --local-only --force
```

`pnpm db:generate-embeddings` is also available as an alias for generation. Commit `src/data/embeddings.json` after content changes and run the refresh against the deployment database. Builds, visitor chats, and ordinary page loads never sync GitHub READMEs or regenerate the corpus.

Set `GROQ_API_KEY` in Vercel for chat generation, and keep `GOOGLE_GENERATIVE_AI_API_KEY` for semantic retrieval and index generation. `GROQ_CHAT_MODEL` optionally overrides the default `openai/gpt-oss-120b`; the old `GEMINI_CHAT_MODEL` setting is no longer used. Missing or unavailable Google embeddings fall back to keyword retrieval. No embedding regeneration is needed when changing the chat model.

`DEV_ALLOWED_ORIGINS` is optional and development-only. For LAN access, use comma-separated hostnames such as `192.168.0.14,my-laptop.local`, without schemes or ports. Leave it empty for localhost and omit it in Vercel.

### Code Formatting & Checks

```bash
pnpm pretty
pnpm lint
pnpm typecheck
pnpm build
```

## 🎨 Customization Guide

### 1. Update Personal Information (`src/data/resume.tsx`)

Edit the `DATA` constant to change your name, social links, work, education, projects, achievements, and interests. Use descriptive inline link labels: link an activity, platform, project, or challenge name rather than a streak, ranking, prize amount, or follower count.

Projects use `Full stack`, `Research`, or `Others` categories. The homepage shows featured full-stack and research projects; category filters live on `/projects`. Matching image and no-image cards stay in the same rows, with unmatched cards placed last.

### 2. Update the AI Knowledge Base (RAG)

Keep and edit `src/data/rag/personal.md`, `projects.md`, `open-source.md`, and the life-writing files. Every Markdown file participates in retrieval, including historical accounts whose dates help distinguish past facts from current ones. Add new files for details that do not fit on the website, then run `pnpm kb:generate`.

Optional README syncing replaces the old project/contribution fetch scripts:

```bash
# Use your existing GitHub CLI login.
pnpm kb:sync-readmes -- --github-cli

# Refresh one repository only.
pnpm kb:sync-readmes -- ArjunCodess/NGTA --github-cli
```

Alternatively, set `GITHUB_TOKEN` or `GH_TOKEN` with Contents: read access to the selected repositories. The script fetches sequentially, caches responses in `.cache/github-readmes.json`, and uses ETags for conditional requests. Authenticated 304 responses do not consume GitHub's primary allowance; secondary limits can still apply. It stops on 403/429 without automatic retries and preserves working snapshots.

Synced READMEs are stored separately as `src/data/rag/github-*.md`; the script does not overwrite personal history or the older project/contribution files. Review snapshot changes before generating embeddings. To avoid GitHub REST API quota entirely, copy a README from a local checkout into a knowledge file. The GitHub activity graph remains independent of this workflow.

### 3. Update Certificates & Resume

Certificate data lives in `src/data/certificates.ts`, and images live in `public/certificates/`. The original Aceternity renderer is preserved under `src/components/vendor/aceternity`; the portfolio wrapper handles styling, accessibility, and an isolated instance per certificate to prevent animation-ID collisions.

The resume source is `public/resume/main.tex`. Compile it with a LaTeX installation, review the resulting PDF, and replace `public/resume/resume.pdf` for the download button. Keep build auxiliaries in `.cache`.

## 📁 Project Structure

```text
scripts/
├── generate-embeddings.ts   # Generate, validate, and replace the vector index
├── sync-github-readmes.ts   # Optional conditional README sync
├── refresh-knowledge.ts    # Sync and generation workflow
└── setup-chat.ts           # Persistent chat-budget table
src/
├── app/
│   ├── api/chat/           # Streaming portfolio assistant
│   ├── projects/           # Filterable project archive
│   └── ...
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── vendor/aceternity/   # Preserved expandable-card renderer
│   └── ...
├── data/
│   ├── resume.tsx          # Current portfolio facts
│   ├── certificates.ts    # Certificate content
│   ├── embeddings.json    # Complete generation cache
│   └── rag/               # Personal history and detailed knowledge
└── lib/ai/                 # Retrieval, prompts, budgets, and vector storage
public/
├── certificates/           # Certificate images
└── resume/                 # LaTeX source and downloadable PDF
```

## 📄 Key Sections

- **About:** Personal introduction, current research, and major achievements.
- **Skills:** Technologies used across development and research.
- **Work Experience:** Pilot, Synthica, technical writing, and school technology leadership.
- **Education:** Academic background and the Lodha Genius Programme.
- **Projects:** Featured work on the homepage and the full categorized archive.
- **Open Source:** Compact contribution cards with direct pull-request links.
- **Certifications:** Expandable program, Harvard CS50, and freeCodeCamp certificates.
- **Achievements:** Competition results, selected programs, and writing milestones.
- **Hobbies:** Writing, hardware, and personal interests, with past daily habits described as past.

## 🚀 Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ArjunCodess/portfolio)

Use Node.js **24.x** and the project's pnpm version. Add the credentials from `.env.example`, run `pnpm db:setup-chat` for the deployment database, and refresh that database's knowledge index before enabling chat. Let Vercel run the normal `pnpm build` command. No separate embedding host is required.

## 📫 Contact

- **Email:** arjunv.prakash12345@gmail.com
- **GitHub:** [@ArjunCodess](https://github.com/ArjunCodess)
- **Twitter/X:** [@ArjunCodess](https://x.com/ArjunCodess)
- **DEV.to:** [@arjuncodess](https://dev.to/arjuncodess)
- **Medium:** [@arjunwritess](https://medium.com/@arjunwritess)
- **Linktree:** [linktr.ee/arjuncodess](https://linktr.ee/arjuncodess)

## 📝 License

This project is open source and available under the MIT License.

---

<div align="center">

**Built with ❤️ by Arjun Vijay Prakash**

_Full-stack Developer | Researcher | Technical Writer | CTO @ Pilot_

</div>
