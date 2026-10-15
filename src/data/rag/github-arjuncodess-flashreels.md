# GitHub README: arjuncodess/flashreels

> Repository: https://github.com/arjuncodess/flashreels
> Retrieved: 2026-10-15T06:35:14.009Z
> Technical reference snapshot. Current personal facts, achievements, and project status are maintained separately.

<h2 align="center">Flash Reels - AI-Powered Video Creation Platform</h2>

<p align="center">
  Transform your ideas into professional videos without technical skills. Our AI-powered platform makes it easy to create, edit, and share scroll-stopping content that drives engagement.
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Environment Variables](#environment_variables)
- [Deployment](#deployment)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

Flash Reels is an AI-powered video creation platform that enables users to generate professional reels and short videos with just a few clicks. The platform combines multiple AI services to automate the entire video creation workflow—from script generation to final video rendering.

The main idea is straightforward: users provide a topic, select their preferences for style, voice, and caption design, and the platform handles the rest. It generates a script using Google Gemini, creates AI images using Fal.ai's Flux model, converts text to speech using Microsoft Edge TTS, generates synchronized captions with Deepgram, and renders the final video using Remotion.

**I built it** to make video creation accessible to everyone. No video editing skills required—just creativity and an idea. The platform handles all the technical complexity behind the scenes, allowing creators to focus on their content.

## 🏁 Getting Started <a name = "getting_started"></a>

Want to run Flash Reels locally? Here's what you need to do.

### What You Need First

- Node.js version 18 or newer
- pnpm (recommended), npm, yarn, or bun
- A PostgreSQL database (I use Neon)
- API keys for the following services:
  - Clerk (authentication)
  - Google Gemini (script generation)
  - Fal.ai (image generation)
  - Deepgram (caption generation)
  - Cloudinary (media storage)
  - GitHub Personal Access Token (for video rendering workflow)

### Getting It Running

1. **Grab the code**

   ```bash
   git clone https://github.com/your-username/FlashReels.git
   cd FlashReels
   ```

2. **Install everything**

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up your environment**
   
   Create a `.env.local` file in the root directory and add all required environment variables (see [Environment Variables](#environment_variables) section below).

4. **Set up the database**

   ```bash
   pnpm db:push
   ```

   This will create the necessary tables in your PostgreSQL database using Drizzle ORM.

5. **Start the development server**

   ```bash
   pnpm dev
   ```

The site should be running at `http://localhost:3000`.

## 🎈 Usage <a name = "usage"></a>

### What It Does

1. **Create New Video**
   - Navigate to the "Create New" page from the dashboard
   - Enter a topic for your video
   - Select an image style (e.g., Realistic, Artistic, Cinematic)
   - Choose a voice for text-to-speech
   - Pick a caption style (Classic, Supreme, Glitch, Fire, Futuristic)
   - Optionally set the video duration
   - Click "Create" and wait for the AI to generate your video

2. **Video Generation Workflow**
   - The platform generates a script using Google Gemini based on your topic
   - AI images are created for each scene using Fal.ai's Flux model
   - Text-to-speech audio is generated using Microsoft Edge TTS
   - Captions are automatically generated with Deepgram for perfect synchronization
   - All assets are uploaded to Cloudinary for storage
   - The video data is saved to the database

3. **Video Rendering**
   - Once created, videos can be rendered using Remotion
   - Rendering is handled via GitHub Actions workflow
   - The rendered video is available for download

4. **Dashboard**
   - View all your created videos
   - See video status (generating, completed, etc.)
   - Access video details and editing options

5. **Community**
   - Browse videos created by other users
   - Search and filter videos
   - View public video content

6. **Favorites**
   - Save videos you like to your favorites
   - Quick access to your favorite content

### The Video Creation Flow

1. User selects topic and preferences
2. AI generates a script with scene descriptions
3. AI creates images for each scene
4. Text-to-speech converts script to audio
5. Captions are generated with precise timing
6. All assets are stored in Cloudinary
7. Video data is saved to the database
8. User can render and download the final video

## 🔧 Environment Variables <a name = "environment_variables"></a>

The following environment variables are required for the application to work:

### Required Variables

```env
# Database
NEXT_PUBLIC_DATABASE_URL=your_neon_postgresql_connection_string

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# AI Services
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key
FAL_AI_API_KEY=your_fal_ai_api_key
DEEPGRAM_API_KEY=your_deepgram_api_key

# Media Storage (Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Video Rendering (GitHub Actions)
PAT_TOKEN=your_github_personal_access_token
REPO_NAME=your_username/your_repo_name
```

### Getting API Keys

- **Clerk**: Sign up at [clerk.com](https://clerk.com) and create a new application
- **Google Gemini**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Fal.ai**: Sign up at [fal.ai](https://fal.ai) and get your API key
- **Deepgram**: Create an account at [deepgram.com](https://deepgram.com) and get your API key
- **Cloudinary**: Sign up at [cloudinary.com](https://cloudinary.com) and get your credentials
- **Neon Database**: Create a database at [neon.tech](https://neon.tech) and copy the connection string
- **GitHub PAT**: Create a personal access token with workflow permissions at [github.com/settings/tokens](https://github.com/settings/tokens)

## 🚀 Deployment <a name = "deployment"></a>

This project is set up to deploy on Vercel, which works seamlessly with Next.js.

### Getting It Live

1. **Vercel Setup**
   - Connect your GitHub repository to Vercel
   - Add all environment variables in the Vercel dashboard
   - Deploy automatically on push to main branch

2. **Environment Variables**
   - Add all the environment variables listed in the [Environment Variables](#environment_variables) section to your Vercel project settings

3. **Database Setup**
   - Ensure your Neon database is accessible from Vercel
   - Run `pnpm db:push` after deployment to set up the database schema

4. **GitHub Actions**
   - Ensure your GitHub repository has the workflow file for video rendering
   - Set up the PAT_TOKEN in your repository secrets if using GitHub Actions for rendering

5. **Custom Domain**
   - Set up your custom domain in Vercel settings if desired

The site will be live and ready to create AI-powered videos!

## ⛏️ Built Using <a name = "built_using"></a>

### Core Framework

- **Next.js 15.2.1** with App Router for the main framework
- **React 19** for the user interface
- **TypeScript** for type safety
- **Node.js** to run everything

### UI and Design

- **Tailwind CSS** for styling
- **Radix UI** for accessible components (Alert Dialog, Collapsible, Dialog, Dropdown Menu, Select, Slider, Toast)
- **Lucide React** for icons
- **Next Themes** for dark/light mode support
- **Motion** for animations
- **Class Variance Authority** for component variants

### Database and ORM

- **Drizzle ORM** for database management
- **Neon PostgreSQL** for the database
- **Drizzle Kit** for database migrations

### Authentication

- **Clerk** for user authentication and management

### AI and Media Services

- **Google Gemini** (Gemini 1.5 Flash) for script generation
- **Fal.ai** (Flux Schnell) for AI image generation
- **Microsoft Edge TTS** for text-to-speech audio generation
- **Deepgram** for automatic caption generation with timing
- **Cloudinary** for media storage and delivery

### Video Rendering

- **Remotion** for video composition and rendering
- **GitHub Actions** for automated video rendering workflows

### Utilities

- **Axios** for HTTP requests
- **date-fns** for date formatting
- **jszip** for file compression
- **dotenv** for environment variable management

### Development Tools

- **ESLint** for code quality
- **TypeScript** for type checking
- **Turbopack** for fast development builds

## ✍️ Author <a name = "authors"></a>

- **ArjunCodess** - *Built and maintain Flash Reels*

**I believe** in making video creation accessible to everyone through the power of AI. If you want to collaborate or have questions, feel free to reach out.

## 🎉 Acknowledgments <a name = "acknowledgement"></a>

- **Vercel** for seamless Next.js deployment and hosting
- **shadcn/ui** for the excellent component library foundation
- **Remotion** for making programmatic video creation possible
- **Clerk** for simplifying authentication
- **All the AI service providers** (Google, Fal.ai, Deepgram, Microsoft) for their powerful APIs
- **The open source community** for the amazing tools and libraries that made this project possible

---

<div align="center">

**Flash Reels** - Reels That Wow, Made in No Time!

_Built with ❤️ for creators and content makers_

</div>

