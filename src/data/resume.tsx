import { Icons } from "@/components/icons";
import { HomeIcon, FilePen } from "lucide-react";

export const DATA = {
    name: "Arjun Vijay Prakash",
    personalBrand: 'ArjunCodess',
    initials: "ArjunCodess",
    url: "https://arjuncodess.vercel.app",
    location: "Lucknow, Uttar Pradesh, India",
    locationLink: "https://www.google.com/maps/place/lucknow",
    description:
        "I'm a 14-year-old full-stack developer, aspiring writer and student who loves to design & build stuff.",
    summary:
        "I'm Arjun Vijay Prakash, a 14-year-old [full-stack developer](https://github.com/ArjunCodess), [technical writer](https://dev.to/arjuncodess) and [student](https://www.cmseducation.org/campuses/kanpurrd/) from India. I've been building websites and apps since I was young. I love turning ideas into reality through code. I've already shipped over 20 projects and even made some money freelancing. I share my coding journey on my blog, where I've built a community of over 30,000 followers. I'm actively looking to collaborate on projects, as well as on my blog.",
    avatarUrl: "/me.jpeg",
    skills: [
        "Next.js",
        "React.js",
        "TypeScript",
        "JavaScript",
        "Python",
        "Tailwind CSS",
        "Node.js",
        "Drizzle ORM",
        "PostgreSQL",
        "MongoDB",
        "Supabase",
        "Neon",
        "Clerk",
        "Better Auth",
        "Shadcn/UI",
        "Framer Motion",
        "Gemini AI",
        "Vercel AI SDK",
        "Flask",
        "Selenium",
        "Streamlit",
        "Machine Learning",
        "Remotion",
        "Cloudinary",
    ],
    navbar: [
        { href: "/", icon: HomeIcon, label: "Home" },
        { href: "/guestbook", icon: FilePen, label: "Guestbook" },
    ],
    cs50_images: [
        "/CS50T.png",
        "/CS50xPuzzleDay2024.png",
        "/CS50x.png",
        "/ReadyPlayer50.png",
    ],
    fcc_images: [
        "/FrontendDevelopmentLibraries.png",
        "/CollegeAlgebraWithPython.png",
        "/ResponsiveWebDesign.png",
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
            Linktree: {
                name: "Linktree",
                url: "https://linktr.ee/arjuncodess",
                icon: Icons.linktree,

                navbar: true,
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
            company: "Self Employed",
            href: "/",
            badges: [],
            location: "Remote",
            title: "Full Stack Developer",
            logoUrl: "/logo.png",
            start: "2020",
            end: "Present",
            description:
                "I have profound skills in Full-Stack Web Application Development and a little bit in design too. I have built projects ranging from simple games and mini implementations of data tools to more complex applications like social media platforms, e-commerce stores, and popular app clones. I'm learning new things all the time, so it's a mix of good and bad code on my GitHub.",
        },
    ],
    education: [
        {
            school: "City Montessori School",
            href: "https://www.cmseducation.org/",
            degree: "Intermediate +2 Course",
            logoUrl: "/cms.jfif",
            start: "2012",
            end: "2028",
        }
    ],
    projects: [
        {
            title: "WebCrawlAI",
            href: "https://webcrawlai.onrender.com/",
            dates: "2024",
            active: true,
            description:
                "AI-powered web scraping platform that leverages Gemini AI to extract specific information from websites — handles dynamic content, CAPTCHAs, and provides clean JSON output for easy integration.",
            technologies: [
                "Python",
                "Flask",
                "Selenium",
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
            image: "",
        },
        {
            title: "Analyzr",
            href: "https://getanalyzr.vercel.app",
            dates: "2024",
            active: true,
            description:
                "Free and open-source analytics tool that requires just one line of code to set up. Comes with built-in Discord notifications and works seamlessly with any website for real-time tracking and custom events.",
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
            image: "",
        },
        {
            title: "Storyblok MCP",
            href: "https://github.com/ArjunCodess/storyblok-mcp",
            dates: "2025",
            active: true,
            description:
                "Connect AI tools to Storyblok instantly - use natural language to manage your CMS like magic. Built for the Storyblok Headless CMS Challenge on DEV.to.",
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
            image: "",
        },
        {
            title: "MEN2 Predictor",
            href: "https://huggingface.co/spaces/arjuncodess/men2-predictor",
            dates: "2025",
            active: true,
            description:
                "A machine learning pipeline for predicting Multiple Endocrine Neoplasia type 2 (MEN2) syndrome. Achieves 96.73% accuracy with 100% sensitivity on real clinical data from 152 patients across 20 studies.",
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
                    icon: <Icons.globe className="size-3" />,
                },
                {
                    type: "Source Code",
                    href: "https://github.com/ArjunCodess/men2-predictor",
                    icon: <Icons.github className="size-3" />,
                },
            ],
            image: "",
        },
        {
            title: "VendX",
            href: "https://vendx-admin.vercel.app",
            dates: "July 2024",
            active: true,
            description:
                "E-commerce platform with an admin dashboard and storefront. Made with Next.js, Tailwind CSS, and Drizzle ORM. Lets users manage products, categories, colors, and sizes.",
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
            image: "",
        },
        {
            title: "TypeTheLyrics",
            href: "https://typethelyrics.vercel.app",
            dates: "2024",
            active: true,
            description:
                "Practice typing skills while following along with synchronized lyrics from your favorite Spotify songs. Tracks WPM and accuracy with a leaderboard system.",
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
            image: "",
        },
        {
            title: "Starfall",
            href: "https://starfall-kit.vercel.app",
            dates: "2024",
            active: true,
            description:
                "Neon-powered full-stack web application starter kit. Comes with Next.js, Tailwind CSS, Shadcn/UI, Drizzle ORM, Clerk auth, and TypeScript all pre-configured.",
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
            image: "",
        },
        {
            title: "AstroScope",
            href: "https://astroscope.streamlit.app/",
            dates: "2024",
            active: true,
            description:
                "Interactive dashboard that visualizes near-Earth asteroid data from NASA's NeoWs API. Provides insights into asteroid sizes, velocities, miss distances, and potential hazards.",
            technologies: [
                "Python",
                "Streamlit",
                "NASA API",
                "Data Visualization",
            ],
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
            image: "",
        },
        {
            title: "ChemistryCheck",
            href: "https://chemistrycheck.vercel.app",
            dates: "2025",
            active: true,
            description:
                "AI-powered chat analysis tool. Upload WhatsApp, Telegram, or Instagram exports and get insights into communication patterns, relationship dynamics, and potential red flags.",
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
            ],
            image: "",
        },
        {
            title: "FlashReels",
            href: "https://flashreels.vercel.app",
            dates: "2025",
            active: true,
            description:
                "AI-powered video creation platform. Generate professional reels with just a topic - AI handles script, images, voiceover, and captions automatically using Remotion.",
            technologies: [
                "Next.js",
                "TypeScript",
                "Remotion",
                "Gemini AI",
                "Fal.ai",
                "Deepgram",
                "Clerk",
            ],
            links: [
                {
                    type: "Live Website",
                    href: "https://flashreels.vercel.app",
                    icon: <Icons.globe className="size-3" />,
                },
            ],
            image: "",
        },
        {
            title: "TBH",
            href: "https://mytbh.vercel.app/",
            dates: "2024",
            active: true,
            description:
                "Anonymous Q&A app where friends can ask questions, you can reply publicly, make threads, and keep conversations going. Features AI-powered daily prompts.",
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
            image: "",
        },
        {
            title: "SortingWiz",
            href: "https://www.youtube.com/watch?v=hjY9Ifs8L6U",
            dates: "January 2024",
            active: true,
            description:
                "Python and Pygame-based interactive sorting algorithm visualizer. Watch algorithms like Bubble Sort, Insertion Sort, Selection Sort, and Heap Sort in real-time.",
            technologies: [
                "Python",
                "Pygame",
            ],
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
            image: "",
        },
    ],
    personalAchievements: [
        {
            title: "Learnt Full Stack Dev at 14",
            dates: "2024",
            description: "Self-taught full-stack development, mastering tech like MERN stack w/ Next.js at the age of 14.",
        },
        {
            title: "Made 20+ Projects",
            dates: "2020 - Present",
            description: "Developed over 20 projects using code, using a variety of different kinds of languages, frameworks and libraries.",
        },
        {
            title: "Hit 30K+ Followers on Blog",
            dates: "2024",
            description: "Built a blog with a following of over 30,000, sharing insights and tips on coding and development.",
        },
        {
            title: "Listed as the Top Writer on DEV.to",
            dates: "2024",
            description: "Recognized as a top writer on DEV.to for engaging and informative content on technology and programming.",
        },
        {
            title: "CS50 Achievements",
            dates: "2023 - 2024",
            description: "Completed CS50T and CS50x, two of Harvard's top computer science courses. Competed in Ready Player 50 in 2023 and Puzzle Day in 2024, successfully completing all levels of difficulty and earning gold certificates."
        }
    ],
    personalityTraits: [
        {
            title: "Self-motivated",
            description: "Driven to achieve my goals, always pushing myself to reach new heights in both personal and professional life.",
        },
        {
            title: "Curious",
            description: "Always eager to learn new things, constantly exploring new technologies and concepts to expand my knowledge.",
        },
        {
            title: "Anti-Social",
            description: "Doesn't enjoy working with others, preferring to focus on individual tasks and projects.",
        },
        {
            title: "Small-circle",
            description: "Prefers a small group of like-minded people, valuing quality over quantity in personal connections.",
        },
        {
            title: "Open-minded",
            description: "Enjoys hearing different opinions, open to diverse perspectives and ideas for personal and professional growth.",
        },
        {
            title: "Detail-oriented",
            description: "Pays attention to the little things, ensuring accuracy and thoroughness in all tasks and projects.",
        }
    ],
    hobbiesInterests: [
        {
            title: "Enthusiastic Reader",
            description: "Reading non-fiction and self-help books to gain insights and improve knowledge.",
        },
        {
            title: "Love Coding",
            description: "Building stuff out of code, turning ideas into functional applications and tools.",
        },
        {
            title: "Consistent Writer",
            description: "Writing general knowledge, practical tips, and development-related content to share insights and help others.",
        },
        {
            title: "Music Lover and Aspiring Producer",
            description: "Compiling and sharing underrated hip-hop songs. Just started out in music production, exploring beats and sound design.",
        }
    ],
} as const;