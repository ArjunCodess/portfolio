import { Icons } from "@/components/icons";
import { FilePen, FolderKanban, HomeIcon } from "lucide-react";

export const DATA = {
  name: "Arjun Vijay Prakash",
  personalBrand: "ArjunCodess",
  initials: "ArjunCodess",
  url: "https://arjuncodess.is-a.dev",
  location: "Lucknow, Uttar Pradesh, India",
  locationLink: "https://www.google.com/maps/place/lucknow",
  description:
    "I'm a student researcher, full-stack developer, and writer working on medical AI, genomic interpretability, and space monitoring.",
  summary:
    "I'm Arjun Vijay Prakash, a 16-year-old researcher and developer from Lucknow, India. My work spans medical AI, mechanistic interpretability, and space monitoring. **NGTA was accepted at NeSy 2026 and GenAI4Health 2026, a NeurIPS 2026 workshop.** I've submitted MINTS to GLBIO 2027 and PRISM to Advances in Space Research. My earlier MEN2 prediction research won an INSEF bronze prize. I won **first prize at Xavier University's AI Vulnerability Challenge** with Saksham Yadav. I've attended YC Startup School India, the Lodha Genius Programme at Ashoka University, and the FXB Climate Advocates Program, and completed IYNA's Neuroscience 1 capstone track. Alongside research, I'm CTO at Pilot, an associate editor at Synthica, and a technical writer with [35,000+ followers on DEV.to](https://dev.to/arjuncodess). I also write personal essays on Medium, including [chain reaction](https://arjunwritess.medium.com/list/chain-reaction-575bef231dc9) and [to my love](https://arjunwritess.medium.com/list/to-my-love-758949c73be0).",
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
    { href: "/projects", icon: FolderKanban, label: "Projects" },
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
        "Leading development of an AI-powered Instagram automation platform for creators. Architected full-stack application using Next.js, React, Node.js, PostgreSQL, Instagram API, and Gemini API. Building in public with transparent, open-source approach. [Live Website](https://pilot-ops.vercel.app/) | [GitHub](https://github.com/getpilot)",
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
      title: "PRISM",
      href: "https://github.com/ArjunCodess/PRISM",
      dates: "2026",
      active: true,
      category: "Research",
      featured: true,
      description:
        "**Submitted to Advances in Space Research.** Predictive Risk Intelligence for Space Monitoring, an explainable T-48-hour conjunction-risk copilot.",
      technologies: ["Research"],
      links: [
        {
          type: "Source Code",
          href: "https://github.com/ArjunCodess/PRISM",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
      title: "MEN2 Predictor",
      href: "https://huggingface.co/spaces/arjuncodess/men2-predictor",
      dates: "2025",
      active: true,
      category: "Research",
      featured: true,
      description:
        "**INSEF Regional Fair Bronze Prize Winner.** Medical ML pipeline for predicting MEN2 syndrome. Achieves 97.20% accuracy with 100% sensitivity on real clinical data from 152 patients across 20 studies (24 RET variants).",
      technologies: [
        "Python",
        "Machine Learning",
        "Medical AI",
        "Research",
        "scikit-learn",
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
      title: "NGTA",
      href: "https://github.com/ArjunCodess/NGTA",
      dates: "2026",
      active: true,
      category: "Research",
      featured: true,
      description:
        "**Accepted at NeSy 2026 and GenAI4Health 2026, a NeurIPS 2026 workshop.** Research project on NARS-guided transformer attention for clinical prediction under extreme missingness. Maps neural uncertainty into NARS truth values and feeds revised confidence back into Transformer attention.",
      technologies: [
        "Python",
        "Machine Learning",
        "Research",
        "Medical AI",
        "Transformers",
        "NARS",
        "TeX",
      ],
      links: [
        {
          type: "Source Code",
          href: "https://github.com/ArjunCodess/NGTA",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
      title: "MINTS",
      href: "https://github.com/ArjunCodess/MINTS",
      dates: "2026",
      active: true,
      category: "Research",
      featured: true,
      description:
        "**Submitted to GLBIO 2027.** Research project on mechanistic interpretability for nucleotide transformers. Tests whether genomic transformer circuits implement biological motif detectors using probes, QK/OV analysis, patching, and SAE feature search.",
      technologies: [
        "Python",
        "Machine Learning",
        "Research",
        "Genomics",
        "Mechanistic Interpretability",
        "Transformers",
        "TeX",
      ],
      links: [
        {
          type: "Source Code",
          href: "https://github.com/ArjunCodess/MINTS",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
      title: "Analyzr",
      href: "https://getanalyzr.vercel.app",
      dates: "2024",
      active: true,
      category: "Full stack",
      featured: true,
      description:
        "**200+ Product Hunt upvotes, 31 GitHub stars.** Free, open-source analytics requiring just one line of code. Built-in Discord notifications and real-time tracking for any website.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "Tailwind CSS",
        "Shadcn/UI",
        "Analytics",
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
      category: "Full stack",
      featured: false,
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
        "Web Scraping",
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
      category: "Full stack",
      featured: true,
      description:
        "AI-powered chat analysis tool with RAG chatbot. Upload WhatsApp, Telegram, or Instagram exports and chat with an AI that has full context of your conversation. Get insights into communication patterns, relationship dynamics, and potential red flags.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Drizzle ORM",
        "Gemini AI",
        "RAG",
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
      category: "Full stack",
      featured: true,
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
        "Video AI",
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
      title: "audion",
      href: "https://audion-audio-cnn.vercel.app",
      dates: "2026",
      active: true,
      category: "Full stack",
      featured: false,
      description:
        "ML-first audio classification project with a CNN training pipeline and Next.js inference visualizer. Upload audio and inspect predictions, waveforms, spectrograms, and convolutional feature maps.",
      technologies: [
        "Python",
        "PyTorch",
        "Audio ML",
        "Modal",
        "FastAPI",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
      ],
      links: [
        {
          type: "Live Website",
          href: "https://audion-audio-cnn.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source Code",
          href: "https://github.com/ArjunCodess/audion",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
      title: "AstroScope",
      href: "https://astroscope.streamlit.app/",
      dates: "2024",
      active: true,
      category: "Others",
      featured: false,
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
      category: "Others",
      featured: false,
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
      category: "Full stack",
      featured: false,
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
        "E-commerce",
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
      category: "Others",
      featured: false,
      description:
        "**12 GitHub stars.** Neon-powered full-stack web application starter kit with Next.js, Tailwind CSS, Shadcn/UI, Drizzle ORM, and Clerk auth pre-configured.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Drizzle ORM",
        "Neon",
        "Clerk",
        "Starter Kit",
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
      category: "Others",
      featured: false,
      description:
        "Practice typing skills with synchronized Spotify lyrics. Tracks WPM and accuracy with a leaderboard system.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "Tailwind CSS",
        "Spotify API",
        "Game",
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
      category: "Full stack",
      featured: false,
      description:
        "Anonymous Q&A app with AI-powered daily prompts. Friends can ask questions, reply publicly, create threads, and keep conversations going.",
      technologies: [
        "Next.js",
        "TypeScript",
        "MongoDB",
        "Tailwind CSS",
        "NextAuth",
        "Gemini AI",
        "Social App",
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
      category: "Others",
      featured: false,
      description:
        "Python and Pygame-based interactive sorting algorithm visualizer. Watch Bubble Sort, Insertion Sort, Selection Sort, and Heap Sort in real-time.",
      technologies: ["Python", "Pygame", "Algorithms", "Visualization"],
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
      title: "AI Vulnerability Challenge - Xavier University",
      dates: "2026",
      description:
        "**First prize** at AI Vulnerability Challenge, Xavier University, Ohio, USA, with teammate Saksham Yadav. Received an 11-inch iPad with the A16 chip and 128GB storage as the award.",
    },
    {
      title: "FXB Climate Advocates Program",
      dates: "Summer 2026",
      description: "Attended the Summer 2026 FXB Climate Advocates Program.",
    },
    {
      title: "IYNA Neuroscience 1 Capstone",
      dates: "2026",
      description: "Completed IYNA's 2026 Neuroscience 1 capstone track.",
    },
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
      description: "Attended YC Startup School India in Bangalore.",
    },
    {
      title: "Lodha Genius - Ashoka University Programme",
      dates: "2026",
      description:
        "Attended the Lodha Genius Programme at Ashoka University and wrote [chain reaction](https://arjunwritess.medium.com/list/chain-reaction-575bef231dc9), a series about the experience.",
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
        "Solved [400+ LeetCode problems](https://leetcode.com/u/arjuncodess/) (265k rank). Stepped away from daily problem-solving after a 600-day streak.",
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
        "I write about life, feelings, and the questions I can't answer on my [Medium blog](https://medium.com/@arjunwritess). My series include [chain reaction](https://arjunwritess.medium.com/list/chain-reaction-575bef231dc9), about the Lodha Genius Programme, and [to my love](https://arjunwritess.medium.com/list/to-my-love-758949c73be0), a new series. Won 2nd place in a writing competition with an entry published in an anthology.",
    },
    {
      title: "Language Learning",
      description:
        "Stopped daily Spanish practice after a [600-day streak](https://www.duolingo.com/profile/ArjunCodess).",
    },
    {
      title: "Electronics & Arduino",
      description:
        "Exploring hardware projects with Arduino. Built multiple small projects over 10 days in September 2025.",
    },
  ],
  openSourceContributions: [
    {
      title: "Grafana #133074",
      description: "Keep equal-size points visible",
      href: "https://github.com/grafana/grafana/pull/133074",
      type: "major",
      date: "Sep 2026",
    },
    {
      title: "Grafana #133253",
      description: "Unload nested plugins safely",
      href: "https://github.com/grafana/grafana/pull/133253",
      type: "major",
      date: "Sep 2026",
    },
    {
      title: "Tempo #7958",
      description: "Report module failures correctly",
      href: "https://github.com/grafana/tempo/pull/7958",
      type: "major",
      date: "Sep 2026",
    },
    {
      title: "fish-shell #13009",
      description: "Correct function query status",
      href: "https://github.com/fish-shell/fish-shell/pull/13009",
      type: "major",
      date: "Sep 2026",
    },
    {
      title: "Grafana #133075",
      description: "Remove unused SVG assets",
      href: "https://github.com/grafana/grafana/pull/133075",
      type: "minor",
      date: "Sep 2026",
    },
    {
      title: "Notesnook #8624",
      description: "Fix toolbar group indentation",
      href: "https://github.com/streetwriters/notesnook/pull/8624",
      type: "major",
      date: "Feb 2026",
      tech: ["TypeScript", "React", "Testing"],
      repoInfo: "13k+ stars",
    },
    {
      title: "next-cloudinary #601",
      description: "Fix fullscreen video sizing",
      href: "https://github.com/cloudinary-community/next-cloudinary/pull/601",
      type: "major",
      date: "Oct 2025",
      tech: ["TypeScript", "Next.js", "Video"],
      repoInfo: "Cloudinary Official",
    },
    {
      title: "next-cloudinary #602",
      description: "Fix route-change lifecycle",
      href: "https://github.com/cloudinary-community/next-cloudinary/pull/602",
      type: "major",
      date: "Oct 2025",
      tech: ["TypeScript", "Next.js", "React"],
      repoInfo: "Cloudinary Official",
    },
    {
      title: "Zero #2013",
      description: "Refine mail header layout",
      href: "https://github.com/Mail-0/Zero/pull/2013",
      type: "major",
      date: "Aug 2025",
      tech: ["TypeScript", "UI/UX", "React"],
      repoInfo: "10k+ stars",
    },
    {
      title: "terminal-catacomb-crawler #37",
      description: "Fix level-up input freeze",
      href: "https://github.com/CatacombCrawler/terminal-catacomb-crawler/pull/37",
      type: "minor",
      date: "Oct 2025",
      tech: ["Python"],
      repoInfo: undefined,
    },
    {
      title: "tix-cli #56",
      description: "Add interactive task TUI",
      href: "https://github.com/TheDevOpsBlueprint/tix-cli/pull/56",
      type: "minor",
      date: "Oct 2025",
      tech: ["Python", "Textual", "TUI"],
      repoInfo: undefined,
    },
    {
      title: "cvimprover-api #31",
      description: "Sanitize user input",
      href: "https://github.com/CVImprover/cvimprover-api/pull/31",
      type: "minor",
      date: "Oct 2025",
      tech: ["Python", "Django", "Security"],
      repoInfo: undefined,
    },
    {
      title: "tix-cli #60",
      description: "Document the task TUI",
      href: "https://github.com/TheDevOpsBlueprint/tix-cli/pull/60",
      type: "minor",
      date: "Oct 2025",
      tech: ["Documentation"],
      repoInfo: undefined,
    },
  ],
} as const;
