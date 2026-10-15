# GitHub README: arjuncodess/chemistrycheck

> Repository: https://github.com/arjuncodess/chemistrycheck
> Retrieved: 2026-10-15T06:35:13.498Z
> Technical reference snapshot. Current personal facts, achievements, and project status are maintained separately.

<p align="center">
  <a href="https://chemistrycheck.vercel.app" rel="noopener">
 <img width=750px height=394px src="https://chemistrycheck.vercel.app/og-image.png" alt="ChemistryCheck - Chat Analysis & Insights"></a>
</p>

<h2 align="center">ChemistryCheck - AI-Powered Chat Analysis & Relationship Insights</h2>

<p align="center">
  Decode your chats. Understand your relationships. Get brutally honest insights about what's really happening between the lines. Upload WhatsApp, Telegram, or Instagram chat exports and let AI analyze communication patterns, spot red flags, and reveal relationship dynamics. Plus, chat with an AI that has full context of your conversation history.
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Deployment](#deployment)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

ChemistryCheck is an AI-powered chat analysis tool that helps you understand what's really happening in your conversations. Upload your chat history from WhatsApp, Telegram, or Instagram, and get comprehensive insights into communication patterns, relationship dynamics, and potential red flags.

The main idea is straightforward: analyze chat exports to reveal patterns that might not be obvious at first glance. Who's more invested? Are there warning signs? Is this genuine connection or something else? The AI analyzes message frequency, response times, word usage, emoji patterns, and more to give you honest, data-driven insights.

**I built it** to help people see beyond the surface of their conversations. It uses modern web tools and AI to process chat data, generate statistics, and provide actionable insights through an intuitive dashboard. The analysis includes everything from basic stats (message counts, word frequency) to advanced AI-powered relationship health scores and personality insights.

## 🏁 Getting Started <a name = "getting_started"></a>

Want to run ChemistryCheck locally? Here's what you need to do.

### What You Need First

- Node.js version 18 or newer
- A PostgreSQL database (I use Neon, but any PostgreSQL database works)
- A Google Gemini API key for AI insights
- Google OAuth credentials (optional, for social login)

### Getting It Running

1. **Grab the code**

   ```bash
   git clone https://github.com/ArjunCodess/chemistrycheck.git
   cd chemistrycheck
   ```

2. **Install everything**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up your environment**

   Create a `.env` file in the root directory with the following variables:

   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=
   BLOB_READ_WRITE_TOKEN=
   APP_URL=http://localhost:3000
   BETTER_AUTH_URL=http://localhost:3000
   BETTER_AUTH_SECRET=
   DATABASE_URL=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   ```

4. **Set up the database**

   Run the database migrations:

   ```bash
   npx drizzle-kit push
   ```

5. **Start the development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

The application should be running at `http://localhost:3000`.

## 🎈 Usage <a name = "usage"></a>

### What It Does

1. **Upload Chat Exports**
   - Support for WhatsApp (.txt), Telegram (.json), and Instagram (.json) chat exports
   - Secure file upload using Vercel Blob storage
   - Automatic platform detection and parsing
   - Changed your mind? Delete your uploaded file instantly before analysis starts
   - Clear transparency about how your data is handled—shown right after upload
   - Chat files are deleted from storage immediately after analysis is complete. The project is fully open source for transparency.

2. **AI-Powered Analysis**
   - Analyzes message patterns, response times, word frequency, and emoji usage
   - Generates relationship health scores and interest percentages
   - Identifies communication patterns and potential red flags
   - Provides personality insights and attachment style analysis

3. **Comprehensive Dashboard**
   - View all your analyses in one place
   - Visual identification of WhatsApp, Telegram, and Instagram analyses with colored platform icons
   - Detailed statistics and visualizations
   - Activity patterns (messages by hour, day, month)
   - Response time analysis
   - Media statistics
   - Emoji analysis
   - AI-generated insights and summaries

4. **RAG Chatbot**
   - Chat with an AI that has full context of your conversation
   - Ask questions like "When did we first say I love you?" or "Find messages about our trip"
   - Semantic search powered by pgvector embeddings
   - Owner-only access (hidden on public/shared links)

5. **Scorecard Generator**
   - Create beautiful, shareable scorecards summarizing your chat analysis
   - Multiple themes: Light, Dark, Rose Gradient, Ocean, Sunset, Purple
   - Customizable metrics: Chemistry Score, Messages, Reply Time, Balance, Interest Levels, Top Emojis, Attachment Styles, Health Score, Red Flags
   - Privacy options: Blur names, use initials, custom nicknames, or hide names entirely
   - Export as PNG, JPEG, or copy to clipboard
   - Perfect for sharing on social media

6. **Shareable Analysis**
   - Make analyses public and shareable
   - View detailed breakdowns of communication patterns

### The Analysis Flow

1. Sign up or sign in to your account
2. Navigate to "New Analysis" and select your platform (WhatsApp, Telegram, or Instagram)
3. Upload your chat export file
4. Get redirected to the analysis page instantly while processing happens in the background
5. View comprehensive insights once the AI finishes analyzing
6. Access your analysis history from the main dashboard

The analysis includes everything from basic message counts to advanced AI insights about relationship dynamics, helping you understand what's really happening in your conversations.

## ⛏️ Built Using <a name = "built_using"></a>

### Core Framework

- **Next.js 15.2.3** with App Router for the main framework
- **React 19** for the user interface
- **TypeScript** for type safety
- **Node.js** to run everything

### Database & ORM

- **Drizzle ORM** for database management
- **Neon PostgreSQL** (or any PostgreSQL database) for data storage
- **Better Auth** for authentication and session management

### AI & Processing

- **Vercel AI SDK** for unified AI interactions and streaming
- **Google Gemini AI** (gemini-3-flash-preview) for generating relationship insights and analysis
- **Gemini gemini-embedding-001** for semantic embeddings (RAG chatbot)
- **pgvector** for vector similarity search
- **Inngest** for background job processing (parsing & embedding)
- Custom chat parsers for WhatsApp, Telegram, and Instagram exports

### UI and Design

- **Tailwind CSS** for styling
- **Radix UI** for accessible components (dialogs, dropdowns, tabs, etc.)
- **Lucide React** for icons
- **Next Themes** for dark/light mode support
- **Recharts** for data visualization
- **React D3 Cloud** for word cloud visualizations
- **html-to-image** for scorecard export functionality

### Storage & Deployment

- **Vercel Blob** for secure file storage
- **Vercel** for hosting and deployment
- **Vercel Analytics** for tracking usage

### Development Tools

- **ESLint** for code quality
- **Drizzle Kit** for database migrations
- **pnpm/npm** for package management

## 🚀 Deployment <a name = "deployment"></a>

This application is set up to deploy on Vercel.

### Getting It Live

1. **Vercel Setup**
   - Connect your GitHub repository to Vercel
   - Set up the environment variables in the Vercel dashboard
   - Deploy automatically when you push to main

2. **Environment Variables You Need**
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=
   BLOB_READ_WRITE_TOKEN=
   APP_URL=https://your-domain.vercel.app
   BETTER_AUTH_URL=https://your-domain.vercel.app
   BETTER_AUTH_SECRET=
   DATABASE_URL=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   ```

3. **Database Setup**
   - Set up a PostgreSQL database (Neon, Supabase, or any PostgreSQL provider)
   - Run migrations: `npx drizzle-kit push`
   - Ensure the `DATABASE_URL` is correctly configured

4. **Custom Domain**
   - Set up your custom domain in Vercel if desired
   - Update `APP_URL` to match your domain

The application will be live and ready to analyze chat conversations!

## ✍️ Author <a name = "authors"></a>

**ArjunCodess** - The sole developer and creator of ChemistryCheck

Built with the goal of helping people understand their relationships better through data-driven insights.

## 🎉 Acknowledgments <a name = "acknowledgement"></a>

- **Vercel** for making deployment smooth and hosting the application
- **shadcn/ui** for providing excellent UI components to build upon
- **Google Gemini** for powering the AI insights
- **Drizzle ORM** for making database management straightforward
- **Better Auth** for handling authentication seamlessly
- **The open source community** for all the amazing tools and libraries that made this possible

---

<div align="center">

**ChemistryCheck** - Decode your chats. Understand your relationships.

_Built with ❤️ for those seeking honest insights_

</div>

