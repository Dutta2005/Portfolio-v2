export const personalInfo = {
  name: "Raj Dutta",
  title: "Full Stack Developer & AI Engineer",
  divineTitle: "Devotee of Lord Mahadev · Builder of Digital Realms",
  email: "rdhack247@gmail.com",
  phone: "+91 8918794465",
  github: "https://github.com/Dutta2005",
  linkedin: "https://www.linkedin.com/in/rajdutta062005/",
  twitter: "https://x.com/RajDutta2005",
  instagram: "https://www.instagram.com/raj_rd_001/",
  quote:
    "Life is a divine algorithm, intricately coded by the universe, yet yours to rewrite and optimize.",
  summary:
    "Like Mahadev who sustains the entire cosmos in absolute stillness, I architect systems that hold scale — full-stack platforms, AI-powered tools, and SaaS products engineered with cosmic precision, sacred purpose, and unstoppable power.",
  currentFocus: [
    "Building AI-powered developer tools and SaaS products",
    "Exploring advanced agentic AI workflows & Model Context Protocol (MCP)",
    "Contributing to open-source communities and mentoring developers",
    "Cloud-native and scalable full-stack architectures",
  ],
};

export interface Skill {
  name: string;
  category: string;
}

export const skillCategories: Record<string, string[]> = {
  Languages: ["C", "C++", "JavaScript", "TypeScript", "Python", "Java"],
  Frontend: ["HTML5", "CSS3", "React", "Tailwind CSS", "Next.js"],
  Backend: ["Node.js", "Express.js", "FastAPI"],
  "Databases & ORM": [
    "MongoDB",
    "PostgreSQL",
    "Prisma",
    "Drizzle ORM",
    "Supabase",
    "NeonDB",
  ],
  "AI & Agentic": [
    "LangChain",
    "LangGraph",
    "OpenAI SDK",
    "RAG",
    "Agentic AI",
    "MCP",
    "Pinecone",
  ],
  "Cloud & Deploy": ["Docker", "Vercel", "Render", "AWS", "GCP"],
  "Tools & Ecosystem": ["Git", "GitHub", "VS Code", "Clerk", "Firebase"],
};

export interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
  description: string;
  tech: string[];
  color: "saffron" | "violet" | "ganga";
}

export const experiences: Experience[] = [
  {
    role: "Organizer & Open Source Mentor",
    company: "JGEC Winter of Code (JWoC) 2026",
    period: "Feb 2026 – Mar 2026",
    type: "Remote",
    description:
      "Like the sacred Ganga that descends from Shiva's matted locks — purifying, guiding, and nourishing all it meets — I led contributors through their open-source awakening. Architected backend infrastructure for auth, project management, and leaderboard systems. Mentored contributors on DashSummarize (AI Chrome extension) and Orbit CLI (multi-provider AI agent).",
    tech: ["Node.js", "Express.js", "Supabase", "Next.js", "Gen AI"],
    color: "saffron",
  },
  {
    role: "Full Stack Developer Intern",
    company: "Neuxa Global",
    period: "May 2025 – July 2025",
    type: "Remote",
    description:
      "With the unwavering focus of Mahadev's blazing third eye, I built responsive full-stack web applications, crafted scalable RESTful APIs, and wove seamless database integrations — always optimizing for clarity, performance, and cosmic user experiences.",
    tech: ["Next.js", "Node.js", "Supabase", "Prisma", "TypeScript"],
    color: "violet",
  },
  {
    role: "Web Developer Intern",
    company: "NeuroNexus Innovations",
    period: "April 2025 – May 2025",
    type: "Remote",
    description:
      "Channeling the creative Tandava — the divine cosmic dance of Lord Shiva — I developed MERN stack interfaces and backend integrations, weaving products born from innovation that connects souls across digital realms.",
    tech: ["React", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    color: "ganga",
  },
];

export interface Project {
  title: string;
  tagline: string;
  description: string;
  github: string;
  live: string;
  tech: string[];
  featured: boolean;
  color: "saffron" | "violet" | "gold" | "ganga";
}

export const projects: Project[] = [
  {
    title: "Jeevan Verse",
    tagline: "Where life connects life — by Mahadev's boundless grace",
    description:
      "A MERN stack web app where users can find symptoms, request blood, join sacred discussions, and support health campaigns. A digital temple of wellness and community.",
    github: "https://github.com/Dutta2005/Jeevan-verse",
    live: "https://jeevan-verse.vercel.app/",
    tech: ["MERN", "Tailwind CSS", "Socket.io", "Nodemailer"],
    featured: true,
    color: "saffron",
  },
  {
    title: "Orbit CLI",
    tagline: "A multi-dimensional AI oracle, like Mahadev's all-seeing third eye",
    description:
      "A multi-provider AI CLI integrating Gemini, OpenAI, and Anthropic with secure auth and personalized configuration. Command the digital cosmos directly from your terminal.",
    github: "https://github.com/Dutta2005/Orbit-CLI",
    live: "https://github.com/Dutta2005/Orbit-CLI",
    tech: ["Next.js", "Express.js", "AI SDK", "Better Auth", "Prisma", "NeonDB"],
    featured: true,
    color: "violet",
  },
  {
    title: "PortfolioAI",
    tagline: "Manifest your destiny, as Brahma scripts the universe",
    description:
      "A full-stack app generating professional portfolios from uploaded resumes using AI parsing and role-based templates. Your divine story, eloquently told.",
    github: "https://github.com/Dutta2005/PortfolioAI/",
    live: "https://portfolio-ai-pied.vercel.app/",
    tech: ["Next.js", "Shadcn UI", "NextAuth", "OpenAI", "Supabase", "Prisma"],
    featured: true,
    color: "gold",
  },
  {
    title: "Stremify",
    tagline: "Real-time connection, flowing like the eternal sacred Ganga",
    description:
      "A MERN app for real-time chat, video calls, and global cultural exchange. Bridging souls across the digital cosmos with live presence.",
    github: "https://github.com/Dutta2005/stremify",
    live: "https://stremify-tau.vercel.app",
    tech: ["MERN", "Tailwind CSS", "TanStack Query", "Stream"],
    featured: false,
    color: "ganga",
  },
  {
    title: "ReadmeEasy",
    tagline: "Speak your truth — let AI inscribe it in the cosmic scroll",
    description:
      "A web app that generates comprehensive README files using OpenAI — transforming fragmented ideas into sacred, comprehensive documentation.",
    github: "https://github.com/Dutta2005/ReadmeEasy",
    live: "https://readme-easy.vercel.app",
    tech: ["Next.js", "Shadcn UI", "OpenAI API"],
    featured: false,
    color: "saffron",
  },
  {
    title: "Droply",
    tagline: "Guard your media, as Nandi guards the gates of Kailash",
    description:
      "A secure cloud image management platform to store, view, and organize media. Your impenetrable digital sanctuary in the divine clouds.",
    github: "https://github.com/Dutta2005/Droply",
    live: "https://droply-ten.vercel.app/",
    tech: ["Next.js", "Clerk", "HeroUI", "ImageKit", "Drizzle ORM", "NeonDB"],
    featured: false,
    color: "violet",
  },
  {
    title: "PixelFlow",
    tagline: "Transform and transcend — as Shiva's Tandava reshapes existence",
    description:
      "A media utility app to compress videos and resize images for social platforms. Transforming raw media with divine efficiency and cosmic speed.",
    github: "https://github.com/Dutta2005/PixelFlow",
    live: "https://www.aicloudinary.xyz/",
    tech: ["Next.js", "Clerk", "DaisyUI", "Cloudinary", "Prisma", "NeonDB"],
    featured: false,
    color: "gold",
  },
];

export interface Achievement {
  icon: string;
  title: string;
  description: string;
  date: string;
  color: "gold" | "saffron" | "violet" | "ganga";
}

export const achievements: Achievement[] = [
  {
    icon: "🏆",
    title: "Winner — HackWars Hackathon",
    description:
      "Emerged victorious among the finest digital warriors, blessed and guided by Mahadev's divine grace and clarity of vision.",
    date: "March 2025",
    color: "gold",
  },
  {
    icon: "⚡",
    title: "Rank 33 / 330+ — Social Winter of Code",
    description:
      "Stood among the elite contributors in the open-source realm — a testament to consistent devotion and skillful execution.",
    date: "March 2025",
    color: "saffron",
  },
  {
    icon: "🔱",
    title: "Open Source Mentor — JWoC 2026",
    description:
      "Guided the next generation of developers with patience and wisdom, as Lord Shiva guides all souls toward liberation.",
    date: "2026",
    color: "violet",
  },
];
