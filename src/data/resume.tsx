import { Icons } from "@/components/icons";
import { HomeIcon, FilePen } from "lucide-react";

export const DATA = {
  name: "Arjun Vijay Prakash",
  personalBrand: "ArjunCodess",
  initials: "ArjunCodess",
  url: "https://arjuncodess.is-a.dev",
  location: "Lucknow, Uttar Pradesh, India",
  locationLink: "https://www.google.com/maps/place/lucknow",
  description:
    "I'm a 16-year-old full-stack developer, aspiring researcher, technical writer, and CTO at Pilot.",
  summary:
    "I'm Arjun, a 16-year-old [full-stack developer](https://github.com/ArjunCodess) from India. I taught myself to code because I wanted to build stuff, and now I can't stop. I mostly work with Next.js and TypeScript, but I've also been getting into machine learning lately (built a [medical prediction model](https://huggingface.co/spaces/arjuncodess/men2-predictor) that won a national science fair). I write about what I'm learning on [DEV.to](https://dev.to/arjuncodess), which has been a great way to think through problems and help others along the way. Outside of coding, I'm [learning Spanish](https://www.duolingo.com/profile/ArjunCodess), solving [LeetCode problems](https://leetcode.com/ArjunCodess), and I [write about life](https://medium.com/@arjunwritess) on Medium.",
  avatarUrl: "/me.jpeg",
  skillGroups: [
    {
      title: "Web / App",
      skills: [
        "TypeScript",
        "JavaScript",
        "React.js",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "MongoDB",
        "Supabase",
        "Tailwind CSS",
        "Drizzle ORM",
        "Better Auth",
        "Shadcn/UI",
      ],
    },
    {
      title: "AI / Data",
      skills: [
        "Python",
        "Machine Learning",
        "scikit-learn",
        "XGBoost",
        "LightGBM",
        "SHAP",
        "pandas",
        "NumPy",
        "Gemini AI",
        "Vercel AI SDK",
      ],
    },
    {
      title: "Research / Editorial",
      skills: [
        "Research Writing",
        "Peer Review",
        "Editorial Standards",
        "Technical Writing",
      ],
    },
    {
      title: "Embedded / Hardware",
      skills: [
        "ESP32",
        "Arduino C++",
        "I2C OLED",
        "Rotary Encoder",
        "DHT11",
        "MQ-135",
        "Wi-Fi / NTP",
        "Arduino",
        "Robotics",
      ],
    },
    {
      title: "Leadership / Community",
      skills: ["Team Management", "Workshop Planning", "Club Leadership"],
    },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/guestbook", icon: FilePen, label: "Guestbook" },
  ],
  cs50_images: [
    "/certificates/cs50/CS50T.png",
    "/certificates/cs50/CS50x.png",
    "/certificates/cs50/CS50xPuzzleDay2024.png",
    "/certificates/cs50/CS50xPuzzleDay2025.png",
    "/certificates/cs50/ReadyPlayer50.png",
  ],
  fcc_images: [
    "/certificates/fcc/FrontendDevelopmentLibraries.png",
    "/certificates/fcc/CollegeAlgebraWithPython.png",
    "/certificates/fcc/ResponsiveWebDesign.png",
  ],
  contact: {
    email: "arjunv.prakash12345@gmail.com",
    tel: "+91 8601404303",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/ArjunCodess",
        icon: Icons.github,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/ArjunCodess",
        icon: Icons.x,

        navbar: true,
      },
      "dev.to": {
        name: "DevTo",
        url: "https://dev.to/arjuncodess",
        icon: Icons.devto,

        navbar: true,
      },
      Medium: {
        name: "Medium",
        url: "https://medium.com/@arjunwritess",
        icon: Icons.medium,

        navbar: true,
      },
      Leetcode: {
        name: "Leetcode",
        url: "https://leetcode.com/ArjunCodess",
        icon: Icons.leetcode,

        navbar: false,
      },
      Linktree: {
        name: "Linktree",
        url: "https://linktr.ee/arjuncodess",
        icon: Icons.linktree,

        navbar: false,
      },
      Email: {
        name: "Send Email",
        url: "mailto:arjunv.prakash12345@gmail.com",
        icon: Icons.email,

        navbar: true,
      },
    },
  },
  work: [
    {
      company: "Synthica",
      badges: ["Peer Review", "Remote", "Editorial"],
      location: "Remote",
      title: "Associate Editor, Computer Science",
      logoUrl: "/synthica.jpg",
      start: "May 2026",
      end: "Present",
      description:
        "Selected as Associate Editor for Synthica Journal after a competitive review process of over 400 applications, with only 47 associate editors chosen across 8 categories. Reviewing and evaluating computer science research submissions, maintaining editorial standards, and contributing to the peer review process while collaborating with the Synthica Editorial Team to advance open-access academic publishing in computer science research.",
    },
    {
      company: "City Montessori School",
      badges: ["HackSpace", "On-site", "Leadership"],
      location: "On-site",
      title: "Vice President, HackSpace",
      logoUrl: "/cms.jfif",
      start: "May 2026",
      end: "Present",
      description:
        "Leading HackSpace, a student-run technology club at City Montessori School focused on hands-on learning in software development and hardware innovation. Organising workshops, projects, and collaborative sessions across app development, web programming, game development, Arduino, robotics, and 3D modelling.",
    },
    {
      company: "Pilot",
      badges: ["Open Source", "Building in Public", "Startup"],
      location: "Remote",
      title: "Chief Technology Officer (CTO)",
      logoUrl: "/pilot.png",
      start: "July 2025",
      end: "Present",
      description:
        "Leading development of an AI-powered Instagram automation platform for creators. Architected full-stack application using Next.js, React, Node.js, PostgreSQL, Instagram API, and Gemini API. Building in public with transparent, open-source approach. [Live Website](https://pilot-ops.vercel.app/) | [GitHub](https://github.com/pilot-ops-crm)",
    },
    {
      company: "Technical Writer",
      badges: ["$2,450 Earned", "35K Followers", "410K+ Views"],
      location: "Remote",
      title: "Freelance Technical Writer",
      logoUrl: "/devto.svg",
      start: "July 2025",
      end: "Present",
      description:
        "Built a following of [35,000+ followers](https://dev.to/arjuncodess) and 410,000+ views on DEV.to. Earned $2,450 in total through technical writing, including $1,375 in 2025 alone—my first $1K earned as a 16-year-old. Won [$500 from Runner H AI Challenge](https://dev.to/devteam/congrats-to-the-runner-h-ai-agent-prompting-challenge-winners-3aap). Created educational content on web development, AI, and programming.",
    },
  ],
  education: [
    {
      school: "City Montessori School",
      href: "https://cmseducation.org/",
      degree: "High School (11th & 12th Grade), ISC Board",
      logoUrl: "/cms.jfif",
      start: "Apr 2026",
      end: "Apr 2028",
      description:
        "Pursuing the ISC (Class 11-12) curriculum with a focus on Artificial Intelligence, Mathematics, Physics, and Chemistry. Completed ICSE (Class 10) with a Board Score of 95.4%.",
    },
    {
      school: "Lodha Genius - Ashoka University Programme",
      href: "https://www.lodhageniusprogramme.com/",
      degree: "Selected for the LG-AUP 2026 cohort (Science Track)",
      logoUrl: "/lodha-genius.png",
      start: "May 2026",
      end: "June 2026",
      description:
        "Fully funded residential programme at Ashoka University run with the Lodha Foundation. On campus from May 16 to June 15, 2026, studying advanced science, math, and research with world-class faculty while collaborating with a highly selective cohort from across India. [Programme website](https://www.lodhageniusprogramme.com/).",
    },
  ],
  projects: [
    {
      title: "MEN2 Predictor",
      href: "https://huggingface.co/spaces/arjuncodess/men2-predictor",
      dates: "2025",
      active: true,
      description:
        "**INSEF Regional Fair Bronze Prize Winner.** Medical ML pipeline for predicting MEN2 syndrome. Achieves 97.20% accuracy with 100% sensitivity on real clinical data from 152 patients across 20 studies (24 RET variants).",
      technologies: [
        "Python",
        "Machine Learning",
        "scikit-learn",
        "LightGBM",
        "XGBoost",
        "Gradio",
      ],
      links: [
        {
          type: "HuggingFace Space",
          href: "https://huggingface.co/spaces/arjuncodess/men2-predictor",
          icon: <Icons.huggingface className="size-3" />,
        },
        {
          type: "Source Code",
          href: "https://github.com/ArjunCodess/men2-predictor",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/men2-predictor.png",
    },
    {
      title: "Analyzr",
      href: "https://getanalyzr.vercel.app",
      dates: "2024",
      active: true,
      description:
        "**200+ Product Hunt upvotes, 31 GitHub stars.** Free, open-source analytics requiring just one line of code. Built-in Discord notifications and real-time tracking for any website.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "Tailwind CSS",
        "Shadcn/UI",
      ],
      links: [
        {
          type: "Live Website",
          href: "https://getanalyzr.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source Code",
          href: "https://github.com/ArjunCodess/analyzr",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/analyzr.png",
    },
    {
      title: "WebCrawlAI",
      href: "https://webcrawlai.onrender.com/",
      dates: "2024",
      active: true,
      description:
        "**119 GitHub stars.** AI-powered web scraping platform using Gemini AI. Handles dynamic content, CAPTCHAs, and provides clean JSON output.",
      technologies: [
        "Python",
        "Flask",
        "Selenium",
        "Thordata",
        "Gemini AI",
        "BeautifulSoup",
        "Tailwind CSS",
      ],
      links: [
        {
          type: "Live Website",
          href: "https://webcrawlai.onrender.com/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source Code",
          href: "https://github.com/ArjunCodess/WebCrawlAI",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/webcrawlai.png",
    },
    {
      title: "ChemistryCheck",
      href: "https://chemistrycheck.vercel.app",
      dates: "2025",
      active: true,
      description:
        "AI-powered chat analysis tool with RAG chatbot. Upload WhatsApp, Telegram, or Instagram exports and chat with an AI that has full context of your conversation. Get insights into communication patterns, relationship dynamics, and potential red flags.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Drizzle ORM",
        "Gemini AI",
        "Tailwind CSS",
        "Better Auth",
      ],
      links: [
        {
          type: "Live Website",
          href: "https://chemistrycheck.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source Code",
          href: "https://github.com/ArjunCodess/chemistrycheck",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/chemistrycheck.png",
    },
    {
      title: "FlashReels",
      href: "https://flashreels.vercel.app",
      dates: "2025",
      active: true,
      description:
        "AI-powered video creation platform. Generate professional reels with just a topic — AI handles script, images, voiceover (Edge TTS), and captions (Deepgram) automatically using Remotion.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Remotion",
        "Gemini AI",
        "Fal.ai",
        "Edge TTS",
        "Deepgram",
        "Clerk",
      ],
      links: [
        {
          type: "Live Website",
          href: "https://flashreels.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source Code",
          href: "https://github.com/ArjunCodess/FlashReels",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/flashreels.png",
    },
    {
      title: "AstroScope",
      href: "https://astroscope.streamlit.app/",
      dates: "2024",
      active: true,
      description:
        "**7 GitHub stars.** Interactive dashboard visualizing near-Earth asteroid data from NASA's NeoWs API. Shows asteroid sizes, velocities, miss distances, and hazard levels.",
      technologies: ["Python", "Streamlit", "NASA API", "Data Visualization"],
      links: [
        {
          type: "Live Dashboard",
          href: "https://astroscope.streamlit.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source Code",
          href: "https://github.com/ArjunCodess/astroscope",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/astroscope.png",
    },
    {
      title: "Storyblok MCP",
      href: "https://github.com/ArjunCodess/storyblok-mcp",
      dates: "2025",
      active: true,
      description:
        "DEV.to Challenge Entry. Connect AI tools to Storyblok instantly — use natural language to manage your CMS. Built for the Storyblok Headless CMS Challenge.",
      technologies: [
        "TypeScript",
        "JavaScript",
        "MCP Protocol",
        "Storyblok API",
      ],
      links: [
        {
          type: "Source Code",
          href: "https://github.com/ArjunCodess/storyblok-mcp",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/storyblok-mcp.png",
    },
    {
      title: "VendX",
      href: "https://vendx-admin.vercel.app",
      dates: "2024",
      active: true,
      description:
        "Full-stack e-commerce platform with admin dashboard and storefront. Manage products, categories, colors, sizes, and orders.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Drizzle ORM",
        "Neon",
        "Shadcn/UI",
        "Clerk",
      ],
      links: [
        {
          type: "Admin Dashboard",
          href: "https://vendx-admin.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Store",
          href: "https://vendx-store.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/vendx.png",
    },
    {
      title: "Starfall",
      href: "https://starfall-kit.vercel.app",
      dates: "2024",
      active: true,
      description:
        "**12 GitHub stars.** Neon-powered full-stack web application starter kit with Next.js, Tailwind CSS, Shadcn/UI, Drizzle ORM, and Clerk auth pre-configured.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Drizzle ORM",
        "Neon",
        "Clerk",
      ],
      links: [
        {
          type: "Live Demo",
          href: "https://starfall-kit.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Documentation",
          href: "https://starfall-docs.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/starfall.png",
    },
    {
      title: "TypeTheLyrics",
      href: "https://typethelyrics.vercel.app",
      dates: "2024",
      active: true,
      description:
        "Practice typing skills with synchronized Spotify lyrics. Tracks WPM and accuracy with a leaderboard system.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "Tailwind CSS",
        "Spotify API",
      ],
      links: [
        {
          type: "Live Website",
          href: "https://typethelyrics.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/typethelyrics.png",
    },
    {
      title: "TBH",
      href: "https://mytbh.vercel.app/",
      dates: "2024",
      active: true,
      description:
        "Anonymous Q&A app with AI-powered daily prompts. Friends can ask questions, reply publicly, create threads, and keep conversations going.",
      technologies: [
        "Next.js",
        "TypeScript",
        "MongoDB",
        "Tailwind CSS",
        "NextAuth",
        "Gemini AI",
      ],
      links: [
        {
          type: "Live Website",
          href: "https://mytbh.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source Code",
          href: "https://github.com/ArjunCodess/tbh",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/tbh.png",
    },
    {
      title: "SortingWiz",
      href: "https://www.youtube.com/watch?v=hjY9Ifs8L6U",
      dates: "2024",
      active: true,
      description:
        "Python and Pygame-based interactive sorting algorithm visualizer. Watch Bubble Sort, Insertion Sort, Selection Sort, and Heap Sort in real-time.",
      technologies: ["Python", "Pygame"],
      links: [
        {
          type: "Video Demo",
          href: "https://www.youtube.com/watch?v=hjY9Ifs8L6U",
          icon: <Icons.youtube className="size-3" />,
        },
        {
          type: "Source Code",
          href: "https://github.com/ArjunCodess/algorithm_visualizer_pygame",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/sortingwiz.png",
    },
  ],
  personalAchievements: [
    {
      title: "INSEF Regional Fair (Online)",
      dates: "2025",
      description:
        "[Bronze Prize Winner](https://insef.org/insef/INSEF_Regional_Fair_Online_2025_26_Results.htm) for MEN2 Predictor, a medical ML research project achieving 97.20% accuracy with 100% sensitivity in rare disease prediction.",
    },
    {
      title: "Runner H AI Agent Prompting Challenge",
      dates: "2025",
      description:
        "[Won $500](https://dev.to/devteam/congrats-to-the-runner-h-ai-agent-prompting-challenge-winners-3aap) in the DEV.to AI Agent Prompting Challenge for innovative use of AI tools.",
    },
    {
      title: "Invisible Wars - Xavier University",
      dates: "2025",
      description:
        "Ranked [Top 25](https://www.xavier.edu/invisible-wars/) in the High School Cyber Defense Challenge.",
    },
    {
      title: "HACKHAZARDS '25 Hackathon",
      dates: "2025",
      description:
        "Certified [Top 100](https://devfolio.co/projects/nirvanaai-4093) for Nirvana AI project on Devfolio.",
    },
    {
      title: "Hit 35K+ Followers on DEV.to",
      dates: "2025",
      description:
        "Built a following of over [35,000](https://dev.to/arjuncodess) with 400,000+ views, sharing insights on coding, AI, and development.",
    },
    {
      title: "YC Startup School India",
      dates: "2026",
      description:
        "Confirmed attendee for YC Startup School India in Bangalore, selected to attend Y Combinator's India startup event.",
    },
    {
      title: "Lodha Genius - Ashoka University Programme",
      dates: "2026",
      description:
        "Selected for the highly selective LG-AUP 2026 cohort at Ashoka University.",
    },
    {
      title: "CS50 Achievements",
      dates: "2023 - 2025",
      description:
        "Completed [CS50T](https://cs50.harvard.edu/certificates/ce13e906-e90f-4469-b1aa-ff24e88fa4be) and [CS50x](https://cs50.harvard.edu/certificates/0b5006d6-7765-4383-b72d-adc7067786c0) (Harvard's intro to technology and computer science). Gold certificates in [Puzzle Day 2024](https://cs50.harvard.edu/certificates/83f288c3-144d-45ae-9cfa-a20fadcaf82f) & [2025](https://cs50.harvard.edu/certificates/2f63e5e4-7c6d-48d5-9dbf-6af88fef95f6) (solved all problems). Completed [Ready Player 50](https://cs50.harvard.edu/certificates/784280e3-a410-4c61-af9a-20368a95e56f) (2023) - a prompt injection challenge.",
    },
  ],
  hobbiesInterests: [
    {
      title: "Competitive Programming",
      description:
        "Solved [400+ LeetCode problems](https://leetcode.com/u/arjuncodess/) (265k rank). Practicing algorithmic thinking and problem-solving daily.",
    },
    {
      title: "Love Coding",
      description:
        "Building stuff out of code, turning ideas into functional applications. Shipped 20+ projects across web, AI, and ML.",
    },
    {
      title: "Technical Writing",
      description:
        "Writing educational content on web development, AI, and programming. [35K followers on DEV.to](https://dev.to/arjuncodess) with 400K+ views.",
    },
    {
      title: "Writing & Personal Essays",
      description:
        "I write about life, feelings, and the questions I can't answer on my [Medium blog](https://medium.com/@arjunwritess). It's a mix of personal essays, reflections, free-verse poetry, and philosophical pieces. Won 2nd place in a writing competition with an entry published in an anthology.",
    },
    {
      title: "Language Learning",
      description:
        "[500+ day Duolingo streak](https://www.duolingo.com/profile/ArjunCodess) learning Spanish. Consistent daily practice builds discipline.",
    },
    {
      title: "Electronics & Arduino",
      description:
        "Exploring hardware projects with Arduino. Built multiple small projects over 10 days in September 2025.",
    },
  ],
  openSourceContributions: [
    {
      title: "Notesnook #8624",
      description:
        "Fixed toolbar item indentation when moving between groups + added comprehensive tests for the customize-toolbar component.",
      href: "https://github.com/streetwriters/notesnook/pull/8624",
      type: "major",
      date: "Feb 2026",
      tech: ["TypeScript", "React", "Testing"],
      repoInfo: "13k+ stars",
    },
    {
      title: "next-cloudinary #601",
      description:
        "Fixed CldVideoPlayer fullscreen object-cover issue where videos wouldn't properly fill the screen.",
      href: "https://github.com/cloudinary-community/next-cloudinary/pull/601",
      type: "major",
      date: "Oct 2025",
      tech: ["TypeScript", "Next.js", "Video"],
      repoInfo: "Cloudinary Official",
    },
    {
      title: "next-cloudinary #602",
      description:
        "Fixed CldVideoPlayer route change issue in Next.js 15 App Router with proper lifecycle management.",
      href: "https://github.com/cloudinary-community/next-cloudinary/pull/602",
      type: "major",
      date: "Oct 2025",
      tech: ["TypeScript", "Next.js", "React"],
      repoInfo: "Cloudinary Official",
    },
    {
      title: "Zero #2013",
      description:
        "Redesigned mail header layout with square buttons and enhanced spacing for better visual hierarchy.",
      href: "https://github.com/Mail-0/Zero/pull/2013",
      type: "major",
      date: "Aug 2025",
      tech: ["TypeScript", "UI/UX", "React"],
      repoInfo: "10k+ stars",
    },
    {
      title: "terminal-catacomb-crawler #37",
      description:
        "Fixed level up UI input freeze and terminal mode handling issues.",
      href: "https://github.com/CatacombCrawler/terminal-catacomb-crawler/pull/37",
      type: "minor",
      date: "Oct 2025",
      tech: ["Python"],
      repoInfo: undefined,
    },
    {
      title: "tix-cli #56",
      description:
        "Added Textual-based TUI for interactive task management with keyboard navigation.",
      href: "https://github.com/TheDevOpsBlueprint/tix-cli/pull/56",
      type: "minor",
      date: "Oct 2025",
      tech: ["Python", "Textual", "TUI"],
      repoInfo: undefined,
    },
    {
      title: "cvimprover-api #31",
      description:
        "Added comprehensive input sanitization for user data security (XSS, injection prevention).",
      href: "https://github.com/CVImprover/cvimprover-api/pull/31",
      type: "minor",
      date: "Oct 2025",
      tech: ["Python", "Django", "Security"],
      repoInfo: undefined,
    },
    {
      title: "tix-cli #60",
      description:
        "Updated README with interactive TUI documentation and requirements.",
      href: "https://github.com/TheDevOpsBlueprint/tix-cli/pull/60",
      type: "minor",
      date: "Oct 2025",
      tech: ["Documentation"],
      repoInfo: undefined,
    },
  ],
} as const;
