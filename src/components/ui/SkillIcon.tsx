import type { IconType } from "react-icons";
import {
  SiC, SiCplusplus, SiJavascript, SiTypescript, SiPython, SiHtml5, SiReact,
  SiTailwindcss, SiNextdotjs, SiNodedotjs, SiExpress, SiFastapi, SiMongodb,
  SiPostgresql, SiPrisma, SiDrizzle, SiSupabase, SiLangchain, SiLanggraph,
  SiOpenai, SiModelcontextprotocol, SiDocker, SiVercel, SiRender, SiGooglecloud,
  SiGit, SiGithub, SiClerk, SiFirebase, SiRedis, SiGithubactions, SiResend, SiGooglegemini,
} from "react-icons/si";
import { FaAws, FaCss3Alt, FaJava } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";
import { LuBot, LuBraces, LuDatabase, LuNetwork, LuWorkflow, LuLayers, LuRoute } from "react-icons/lu";

const skillIcons: Record<string, IconType> = {
  C: SiC, "C++": SiCplusplus, JavaScript: SiJavascript, TypeScript: SiTypescript,
  Python: SiPython, Java: FaJava, HTML5: SiHtml5, CSS3: FaCss3Alt, React: SiReact,
  "Tailwind CSS": SiTailwindcss, "Next.js": SiNextdotjs, "Node.js": SiNodedotjs,
  "Express.js": SiExpress, FastAPI: SiFastapi, MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql, Prisma: SiPrisma, "Drizzle ORM": SiDrizzle, Supabase: SiSupabase,
  NeonDB: LuDatabase, Redis: SiRedis, Valkey: LuDatabase, LangChain: SiLangchain,
  LangGraph: SiLanggraph, "OpenAI SDK": SiOpenai, RAG: LuNetwork, "Agentic AI": LuBot,
  MCP: SiModelcontextprotocol, Pinecone: LuDatabase, Gemini: SiGooglegemini,
  OpenRouter: LuRoute, "Vercel AI SDK": SiVercel, BullMQ: LuLayers,
  Docker: SiDocker, Vercel: SiVercel, Render: SiRender, AWS: FaAws, GCP: SiGooglecloud,
  Git: SiGit, GitHub: SiGithub, "VS Code": VscVscode, Clerk: SiClerk, Firebase: SiFirebase,
  "GitHub Actions": SiGithubactions, Resend: SiResend, "Automated workflows": LuWorkflow,
};

export default function SkillIcon({ name, size = 19 }: { name: string; size?: number }) {
  const Icon = skillIcons[name] ?? LuBraces;
  return <Icon size={size} aria-hidden="true" />;
}
