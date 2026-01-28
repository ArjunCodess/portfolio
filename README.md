<h1 align="center">Portfolio</h1>

<p align="center">
  A modern, animated personal portfolio built with Next.js 16, featuring smooth animations, dark mode, and a beautiful design showcasing my work, achievements, and journey as a developer.
</p>

---

## 🌐 Live Site

**[arjuncodess.is-a.dev](https://arjuncodess.is-a.dev)**

## 🧐 About

Hi, I'm **Arjun Vijay Prakash** — a 16-year-old full-stack developer, aspiring researcher, technical writer, and CTO at [Pilot](https://github.com/pilot-ops-crm) from Lucknow, India.

- **20+ Projects** shipped across web, AI, and ML
- **34,000+ followers** on [DEV.to](https://dev.to/arjuncodess) with 400,000+ views
- **$1,375 earned** through technical writing
- **INSEF Regional Fair** selected for MEN2 Predictor ML research
- **Harvard CS50** certified (CS50x, CS50T, Puzzle Day Gold 2024 & 2025)

## ✨ Features

- **Next.js 16** with App Router and Turbopack
- **Beautiful Animations** using Framer Motion
- **Dark/Light Mode** with system preference detection
- **Fully Responsive** design
- **Certificate Gallery** with interactive modals
- **Project Showcase** with live links and GitHub repos
- **Guestbook** for visitors to leave messages
- **AI Chatbot** with RAG (Retrieval-Augmented Generation) for intelligent answers
- **Smart Context** utilizing vector search to answer content-specific questions
- **Cloud Embeddings** using Google Gemini via Vercel AI SDK



## 🧠 AI Chatbot & RAG Architecture

This portfolio features a sophisticated **Retrieval-Augmented Generation (RAG)** chatbot that allows visitors to "chat" with the portfolio. Unlike standard chatbots, this one knows specific details about my work, skills, and background by querying a structured knowledge base.

### How it Works

1.  **Ingestion Pipeline** (`scripts/generate-embeddings.ts`):
    -   Source content (Markdown files) is read from `src/data/rag`.
    -   Text is chunked into semantic segments (~800 characters) with overlap.
    -   **Cloud Embeddings**: We use Google Gemini's `gemini-embedding-001` model via the Vercel AI SDK for high-quality 768-dimensional embeddings.
    -   Vectors are stored in **Vercel Postgres** using the `pgvector` extension.

2.  **Retrieval System**:
    -   When a user asks a question, their query is converted to a vector embedding using the same Gemini model.
    -   We perform a **cosine similarity search** in Postgres to find the most relevant content chunks.
    -   The top 5 matching chunks are retrieved to form the "context".

3.  **Generation Phase**:
    -   The user's query and the retrieved context are fed into **Google's Gemini Flash** model (via Vercel AI SDK).
    -   The model generates a response based *only* on the provided facts, minimizing hallucinations.
    -   The response is streamed back to the UI in real-time.

## 🛠️ Tech Stack

### Core
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Animations:** Framer Motion, Magic UI

### AI & Data
- **LLM:** Google Gemini Flash
- **SDK:** Vercel AI SDK
- **Embeddings:** Google Gemini (`gemini-embedding-001`, 768 dimensions)
- **Database:** Vercel Postgres (with `pgvector`)
- **Vector Search:** SQL-based cosine similarity

### Deployment
- **Platform:** Vercel
- **Analytics:** Vercel Analytics

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

Check out [.env.example](.env.example) to see the required environment variables.

```bash
# Clone the repository
git clone https://github.com/ArjunCodess/portfolio.git
cd portfolio

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add your POSTGRES_URL for the guestbook feature

# Start development server
pnpm dev
```

### Setting up the Knowledge Base (RAG)

To make the chatbot work locally, you need to generate embeddings for the data:

```bash
# 1. Ensure your .env.local has:
#    - POSTGRES_URL connection string
#    - GOOGLE_GENERATIVE_AI_API_KEY for embeddings

# 2. Run the embedding generation script
pnpm db:generate-embeddings
```
This will read from `src/data/rag/*.md`, generate vectors using Gemini, and populate your database.

Visit `http://localhost:3000` to see the portfolio.

### Code Formatting

To ensure the code follows the project's style guidelines, you can run the prettier script:

```bash
pnpm pretty
```
This will automatically format all supported files in the project.

## 🎨 Customization Guide

This portfolio is designed to be easily customized. Here is how you can make it yours:

### 1. Update Personal Information (`src/data/resume.tsx`)

The entire portfolio is data-driven. You don't need to dig into React components to change the text. Open `src/data/resume.tsx` and update the `DATA` constant:

-   **Name & Brand**: Update `name`, `initials`, and `personalBrand`.
-   **Social Links**: modifying the `contact.social` object.
-   **Work & Education**: Update the `work` and `education` arrays.
-   **Projects**: content for the "Projects" section is in the `projects` array.

### 2. Update the AI Knowledge Base (RAG)

The AI Chatbot answers questions based on markdown files in `src/data/rag/`. To teach the AI about **you**:

1.  **Delete existing files** in `src/data/rag/`.
2.  **Add your own Markdown files**. You can organize them however you like (e.g., `bio.md`, `experience.md`, `hobbies.md`).
3.  **Automate Project Data** (`scripts/fetch-projects.ts`):
    -   This script automatically fetches your project details (stars, descriptions, READMEs) from GitHub and saves them to `src/data/rag/projects.md`.
    -   **How to use**: Update the `USERNAME` and `REPOS_TO_FETCH` arrays in `scripts/fetch-projects.ts`, then run:
        ```bash
        npx tsx scripts/fetch-projects.ts
        ```
    -   *Note: This is why `scripts/fetch-projects.ts` exists—to keep your AI knowledge base in sync with your actual GitHub data!*
4.  **Re-generate embeddings**:
    ```bash
    pnpm db:generate-embeddings
    ```
    This script will chunk your new text, create vectors, and store them in your database so the AI accepts them as truth.

### 3. Tips for Best Results
-   **Be Specific**: When writing your RAG files, be descriptive. Instead of "I like coding", say "I enjoy building scalable web apps with Next.js and Postgres".
-   **Images**: Add your photos to the `public/` folder and reference them in `resume.tsx` (e.g., `avatarUrl: "/me.jpg"`).

## 📁 Project Structure

```
scripts/
├── generate-embeddings.ts      # Generates vector embeddings for RAG
└── fetch-projects.ts           # Fetches project data from GitHub for RAG
src/
├── app/           # Next.js App Router pages
│   ├── api/       # API Routes (Chat interface)
│   └── ...
├── components/    # Reusable UI components
│   ├── ui/        # shadcn/ui components
│   └── ...
├── data/          # Portfolio data and content
│   ├── resume.tsx # Main resume data
│   └── rag/       # RAG context files (Knowledge Base)
└── lib/           # Utility functions
    └── ai/        # AI & RAG helper logic
```

## 📄 Key Sections

- **About** - Personal introduction and summary
- **Skills** - Technical skills and technologies
- **Work Experience** - Professional experience as CTO and Technical Writer
- **Education** - Academic background
- **Certifications** - CS50 and FreeCodeCamp certificates
- **Projects** - Featured projects with live demos
- **Achievements** - Awards and recognitions
- **Hobbies** - Personal interests and activities

## 🚀 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ArjunCodess/portfolio)

## 📫 Contact

- **Email:** arjunv.prakash12345@gmail.com
- **GitHub:** [@ArjunCodess](https://github.com/ArjunCodess)
- **Twitter/X:** [@ArjunCodess](https://x.com/ArjunCodess)
- **DEV.to:** [@arjuncodess](https://dev.to/arjuncodess)
- **Linktree:** [linktr.ee/arjuncodess](https://linktr.ee/arjuncodess)

## 📝 License

This project is open source and available under the [MIT License](/LICENSE).

---

<div align="center">

**Built with ❤️ by Arjun Vijay Prakash**

*Full-stack Developer | Aspiring Researcher | Technical Writer | CTO @ Pilot*

</div>
