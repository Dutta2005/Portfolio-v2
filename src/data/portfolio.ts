import jeevanImage from "../../screenshots/jeevan-verse.png";
import dailyAgentImage from "../../screenshots/daily-ai-agent.png";
import orbitImage from "../../screenshots/orbit-cli.png";
import portfolioImage from "../../screenshots/portfolio-ai.png";
import kubernetesImage from "../../screenshots/mini-k8s.png";
import streamifyImage from "../../screenshots/streamify.png";

export const personalInfo = {
  name: "Raj Dutta",
  title: "AI Engineer & Full Stack Developer",
  email: "rdhack247@gmail.com",
  phone: "+91 8918794465",
  github: "https://github.com/Dutta2005",
  linkedin: "https://www.linkedin.com/in/rajdutta062005/",
  twitter: "https://x.com/RajDutta2005",
  instagram: "https://www.instagram.com/raj_rd_001",
  summary: "I build AI-powered features, intelligent agents, and full-stack web applications. My work connects practical AI with thoughtful product engineering.",
};

export const socialLinks = [
  { id: "github", label: "GitHub", href: personalInfo.github },
  { id: "linkedin", label: "LinkedIn", href: personalInfo.linkedin },
  { id: "twitter", label: "X", href: personalInfo.twitter },
  { id: "instagram", label: "Instagram", href: personalInfo.instagram },
  { id: "email", label: "Email", href: "mailto:" + personalInfo.email },
] as const;

export const skillCategories: Record<string, string[]> = {
  Languages: ["C", "C++", "JavaScript", "TypeScript", "Python", "Java"],
  Frontend: ["HTML5", "CSS3", "React", "Tailwind CSS", "Next.js"],
  Backend: ["Node.js", "Express.js", "FastAPI", "BullMQ"],
  "Databases & ORM": ["MongoDB", "PostgreSQL", "Prisma", "Drizzle ORM", "Supabase", "NeonDB", "Redis", "Valkey"],
  "AI & agents": ["LangChain", "LangGraph", "OpenAI SDK", "RAG", "Agentic AI", "MCP", "Pinecone", "Gemini", "OpenRouter", "Vercel AI SDK"],
  "Cloud & deployment": ["Docker", "Vercel", "Render", "AWS", "GCP"],
  "Tools & integrations": ["Git", "GitHub", "VS Code", "Clerk", "Firebase", "GitHub Actions", "Resend"],
};

export const featuredSkills = ["React", "Next.js", "TypeScript", "Python", "Node.js", "PostgreSQL", "LangChain", "LangGraph", "Docker", "Git"];

export interface Experience {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  category: string;
  bullets: string[];
}

export const experiences: Experience[] = [
  {
    role: "AI Engineer Intern",
    company: "InterviewSurge",
    period: "Sep 2026 – Present",
    current: true,
    category: "AI & product engineering",
    bullets: [
      "Develop AI-powered features, intelligent agents, and automated workflows across the product.",
      "Refine UI/UX and improve product functionality through hands-on product engineering.",
      "Contribute to product growth through AI-driven marketing, SEO, GEO, and content automation.",
    ],
  },
  {
    role: "Software Development Engineer Intern",
    company: "DeepDuoFoundation",
    period: "Feb – Apr 2026",
    category: "Backend & real-time systems",
    bullets: [
      "Built Redis-powered caching and worked on backend authentication and data integrations.",
      "Developed real-time experiences using WebSockets and contributed to improvements to the product feed.",
    ],
  },
  {
    role: "Organizer & Open Source Mentor",
    company: "JGEC Winter of Code",
    period: "Feb – Mar 2026",
    category: "Open source & mentorship",
    bullets: [
      "Built backend infrastructure for authentication, project management, and contributor leaderboards.",
      "Mentored contributors on DashSummarize, an AI Chrome extension, and Orbit CLI, a multi-provider AI agent.",
    ],
  },
];

export interface Project {
  title: string;
  category: string;
  description: string;
  github: string;
  live?: string;
  tech: string[];
  detail?: string;
  featured?: boolean;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}

export const projects: Project[] = [
  {
    title: "Jeevan Verse",
    category: "Health & community platform",
    description: "A full-stack platform bringing AI-powered health insights, blood requests, community discussions, and health campaigns into one place.",
    github: "https://github.com/Dutta2005/Jeevan-verse",
    live: "https://jeevan-verse.vercel.app/",
    tech: ["MERN", "RAG", "Gemini", "Pinecone", "Socket.io"],
    featured: true,
    image: jeevanImage,
    imageAlt: "Jeevan Verse landing page with health insights, blood requests, and community features.",
    imageWidth: 3362,
    imageHeight: 1488,
  },
  {
    title: "Daily Tech News Agent",
    category: "AI & automation",
    description: "An automated tech digest that gathers news, uses AI to curate and summarize stories across AI, software development, and cybersecurity, and delivers a daily email newsletter.",
    github: "https://github.com/Dutta2005/daily-tech-news-agent",
    tech: ["Node.js", "Vercel AI SDK", "Gemini", "OpenRouter", "PostgreSQL (NeonDB)", "Resend", "GitHub Actions"],
    image: dailyAgentImage,
    imageAlt: "Daily Tech News Agent workflow showing news sources, Node.js collection, AI processing, database storage, and newsletter delivery.",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    title: "Orbit CLI",
    category: "AI developer tool",
    description: "A multi-provider AI command-line tool bringing Gemini, OpenAI, and Anthropic into one workflow, with secure authentication and personal configuration.",
    github: "https://github.com/Dutta2005/Orbit-CLI",
    tech: ["Next.js", "Express.js", "AI SDK", "Prisma"],
    image: orbitImage,
    imageAlt: "Orbit CLI project overview showing its terminal interface, authentication, and AI provider integrations.",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    title: "PortfolioAI",
    category: "AI portfolio builder",
    description: "Turns an uploaded résumé into a professional portfolio with AI parsing and role-based templates. A simpler path from your experience to a personal website.",
    github: "https://github.com/Dutta2005/PortfolioAI/",
    live: "https://portfolio-ai-pied.vercel.app/",
    tech: ["Next.js", "OpenAI", "Supabase", "Prisma"],
    featured: true,
    image: portfolioImage,
    imageAlt: "PortfolioAI landing page introducing résumé uploads and AI-generated portfolio websites.",
    imageWidth: 3326,
    imageHeight: 1504,
  },
  {
    title: "Mini Kubernetes",
    category: "Infrastructure & systems",
    description: "A hands-on, simplified Kubernetes control plane with an API server, job scheduling, Docker execution, and a controller/watcher loop that reconciles workload states.",
    github: "https://github.com/Dutta2005/mini-k8s",
    tech: ["Node.js", "Express", "BullMQ", "Docker", "PostgreSQL", "Drizzle ORM", "Valkey"],
    detail: "Job lifecycle: SUBMITTED → RUNNABLE → RUNNING → SUCCEEDED or FAILED.",
    image: kubernetesImage,
    imageAlt: "Kubernetes concept diagram illustrating a control plane, scheduler, controllers, and worker nodes.",
    imageWidth: 800,
    imageHeight: 505,
  },
  {
    title: "Streamify",
    category: "Real-time communication",
    description: "A MERN application for real-time chat, video calls, and cultural exchange, connecting people through live conversations.",
    github: "https://github.com/Dutta2005/stremify",
    live: "https://stremify-tau.vercel.app",
    tech: ["MERN", "TanStack Query", "Stream"],
    image: streamifyImage,
    imageAlt: "Streamify landing page introducing its language exchange platform, conversations, and video calls.",
    imageWidth: 3314,
    imageHeight: 1509,
  },
];

export const achievements = [
  { title: "HackWars Hackathon", result: "Winner", date: "Mar 2025" },
  { title: "Social Winter of Code", result: "Rank 33 of 330+ contributors", date: "Mar 2025" },
];
