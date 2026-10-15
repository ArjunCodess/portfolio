# Arjun Vijay Prakash's portfolio

Next.js 16.4, React 19.3, TypeScript, Tailwind CSS 4, Motion, and AI SDK 7. The site includes categorized projects, compact open-source contributions, expandable certificate cards adapted from [Aceternity UI](https://ui.aceternity.com/components/expandable-card), a guestbook, and a grounded chat assistant.

## Development

Use Node.js 24 and pnpm 11.1.1. Dependency overrides and explicit build-script permissions are in `pnpm-workspace.yaml`, as required by pnpm 11.

```sh
pnpm install
# Copy .env.example to .env.local and set the existing credentials.
pnpm db:setup-chat
pnpm dev
```

`POSTGRES_URL` uses Neon's serverless driver for the existing guestbook and the new chat budget table. The old Vercel Postgres driver is deprecated. `db:setup-chat` adds only the budget table and removes expired budget counters. Run it once per database before enabling chat, and during deployments to clean expired counters.

## Portfolio and chat knowledge

Edit `src/data/resume.tsx`. The website and current chat knowledge chunks both read this file. Additional Markdown in `src/data/rag/*.md` supplies the personal history, life writing, and detailed project/contribution context that does not fit on the website. Every Markdown file is included in both semantic and keyword retrieval; keep these files when updating the site. The GitHub activity graph still refreshes through its cached API. The 2025 wrapped document remains retrievable as a dated historical account. Project and contribution snapshots also retain their dates, so earlier statistics and habits are not presented as current facts.

### Optional GitHub README updates

`pnpm kb:sync-readmes` fetches one README per project repository, sequentially, using `GITHUB_TOKEN` or `GH_TOKEN`. To use your existing GitHub CLI login instead of an environment token, run `pnpm kb:sync-readmes -- --github-cli`. To refresh one project, run `pnpm kb:sync-readmes -- ArjunCodess/NGTA`, adding `--github-cli` if needed. A fine-grained token needs Contents: read permission on the selected repositories. The script saves separate `src/data/rag/github-*.md` snapshots; it never writes `personal.md`, `projects.md`, `open-source.md`, or the life-writing files.

Responses are cached in `.cache/github-readmes.json`. Later requests send `If-None-Match`; authenticated 304 responses do not consume GitHub's primary allowance. The script stops on 403/429, reports retry/reset headers, preserves working snapshots, and never loops through automatic retries. Secondary limits can still apply. No GitHub requests run during visitor chats, page loads, builds, or embedding generation. Review snapshot diffs before running `pnpm kb:generate`; unchanged vectors are reused.

For a workflow with no GitHub REST API quota, copy the README from a local checkout into a Markdown knowledge file. Another option is a repository push webhook that queues a refresh only when its README changes; webhook delivery needs a separate authenticated endpoint and duplicate handling. For this portfolio, an occasional manual conditional sync is simpler than maintaining that service.

For this portfolio, reviewed content in Git is the simplest option. Other options are a Sanity collection with a publish webhook that regenerates the index, or an authenticated admin form backed by Postgres. Both allow editing without a code commit, but add authentication and publishing infrastructure. Neither needs to scrape GitHub READMEs.

## EmbeddingGemma 2

EmbeddingGemma 2 is an open model, separate from the Gemini API. `services/embeddings/app.py` runs `google/embeddinggemma-2` with Sentence Transformers, disables unnecessary audio/vision encoders, and produces normalized 768-dimensional vectors. Model weights stay out of the Next.js deployment.

```sh
python -m pip install -r services/embeddings/requirements.txt
# Set EMBEDDING_SERVICE_TOKEN to a private shared secret in the service environment.
python -m uvicorn app:app --app-dir services/embeddings --host 127.0.0.1 --port 8000
```

Set `EMBEDDING_SERVICE_URL=http://127.0.0.1:8000` and the same `EMBEDDING_SERVICE_TOKEN` in `.env.local`, then run:

```sh
pnpm kb:generate
```

Run `pnpm kb:refresh -- --github-cli` to sync project READMEs, collect all website facts, certificate descriptions and RAG Markdown, then rebuild the database embeddings. Use `--local-only` to skip GitHub, or `--force` to regenerate every vector. Unchanged vectors are otherwise reused from `src/data/embeddings.json`, which is a generation cache. Every successful refresh deletes all `kb_documents` rows and inserts the complete new corpus in one transaction, after every vector has been generated and validated. Failed generation or a failed transaction preserves the previous database index.

Runtime retrieval blends Postgres pgvector cosine distance with rare-term and exact-phrase matches, with model, dimensions, and corpus-hash checks. This helps preserve exact names and award aliases without another model call. Queries use the matching search prefix. Source changes require a refresh; stale or unavailable semantic retrieval falls back to current Markdown and website facts. Commit the cache after content updates, and run the refresh against the deployment database.

For production, deploy the provided Docker service on a CPU host with persistent Hugging Face cache storage and set its HTTPS URL and token in Vercel. A continuously running host avoids model cold starts; hosting costs are separate from Gemini's free tier. Do not deploy a public unauthenticated model endpoint. Without the service, or while it sleeps, chat uses keyword retrieval over the same current facts. This fallback is logged and does not claim to use semantic search.

## Environment variables for the embedding service

| Variable | What to put there | Where it belongs |
| --- | --- | --- |
| `DEV_ALLOWED_ORIGINS` | Optional comma-separated development hostnames, such as `192.168.0.14,my-laptop.local`. Omit schemes, ports, and paths. Leave it empty for localhost. | Portfolio `.env.local` only; not needed on Vercel. |
| `EMBEDDING_SERVICE_URL` | `http://127.0.0.1:8000` locally, or the actual HTTPS base URL of your deployed Python service. Do not append `/embed`. | Portfolio `.env.local` and Vercel environment variables. |
| `EMBEDDING_SERVICE_TOKEN` | A random private shared password, not a Google API key. Use the exact same value on both servers, without `Bearer `. | Portfolio `.env.local`, Vercel, and the Python service environment. |

Generate a token on your own machine:

```sh
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

For local use, put that token and the localhost URL in the portfolio's `.env.local`. Start the Python service in another PowerShell terminal, from the repository root:

```powershell
python -m pip install -r services/embeddings/requirements.txt
$env:EMBEDDING_SERVICE_TOKEN="paste-your-generated-token"
python -m uvicorn app:app --app-dir services/embeddings --host 127.0.0.1 --port 8000
```

The Python process does not automatically read Next.js's `.env.local`, which is why its token must also be set in its own environment. The first start downloads the model weights and can take time. After `http://127.0.0.1:8000/health` responds, run `pnpm kb:refresh -- --local-only`, then restart the Next.js server after changing its environment.

For production, deploy `services/embeddings/Dockerfile` on a separate host with enough memory for the model and persistent cache storage. That host provides the real service URL; there is no production embedding URL until this service is deployed. Set its token there, add the same token and the service's HTTPS URL to Vercel for the relevant Preview/Production environments, then redeploy the portfolio. The service exposes port 8000. Hosting requirements and costs are separate from Gemini's free tier.

Do not use the portfolio's Vercel URL, a Google API URL, or `localhost` as the production embedding address. Vercel's `localhost` points to its own function, not your computer. Keep the token server-side, without a `NEXT_PUBLIC_` prefix. `GOOGLE_GENERATIVE_AI_API_KEY` still powers chat generation; these embedding settings only power semantic retrieval. If the service is unavailable, chat uses keyword retrieval. Let Next.js and Vercel manage `NODE_ENV` automatically.

## Free-tier chat

The default is the `gemini-flash-lite-latest` alias, verified with a live request on October 15, 2026. The alias follows Google's latest Flash-Lite release; its underlying version and quotas may change. `GEMINI_CHAT_MODEL` can select another available model, such as `gemini-3.8-flash`, after checking its quota in AI Studio.

Chat sends at most six recent messages, 5,200 characters of context, and 320 output tokens, with minimal thinking and no automatic provider retries. The server accepts text only, limits each message to 2,000 characters, and rejects oversized requests. Repeated standalone answers are cached for one hour per process; follow-up conversations are not shared. Query embeddings also have a bounded one-hour cache.

Postgres atomically reserves a persistent request budget before calling the model: five requests per visitor per minute, twenty per visitor per day, and defaults of eight requests per minute and one hundred per day across all instances. These are application limits, not a claim about Google's quota. Set `CHAT_RPM_LIMIT` and `CHAT_DAILY_LIMIT` below this project's actual available allowance, accounting for other apps using the same Google project. Failed requests consume a reservation to prevent retry storms. A missing budget table or unavailable database disables chat rather than allowing unmetered provider calls. Visitor keys hash the Vercel-provided IP with the current day. Cached answers consume no model request.

## Certificates and resume

The three 2026 certificate previews are served from `public/certificates`, including PNG renders of the IYNA and Hidden Prompt certificates. The original Aceternity grid renderer is preserved in `src/components/vendor/aceternity`, with its downloaded source for comparison. A data adapter and an outer certificate wrapper provide portfolio styling and accessibility; projects use ordinary image links. The cards support keyboard opening, Escape, outside-click dismissal, trapped focus, and reduced motion.

The resume source is `public/resume/main.tex`; the download button serves `public/resume/resume.pdf`. Compile the TeX source with a LaTeX installation and replace that PDF after resume changes. Build auxiliary files in `.cache`, not in the public directory.

## Validation

```sh
pnpm lint
pnpm typecheck
pnpm build
```

ESLint stays on version 9 and TypeScript on version 6 because the installed lint plugins do not support ESLint 10 or TypeScript 7 yet. Other direct dependencies were updated to current releases, including the Tailwind 4 PostCSS migration. The lockfile pins the tested versions.
