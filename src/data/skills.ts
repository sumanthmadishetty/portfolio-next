export type SkillCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "data"
  | "cloud";

export interface Skill {
  name: string;
  category: SkillCategory;
  /** RPG-style level, 1–10 */
  level: number;
}

export const categoryLabels: Record<SkillCategory, string> = {
  languages: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  data: "Data & Databases",
  cloud: "Cloud & DevOps",
};

export const skills: Skill[] = [
  // Languages
  { name: "JavaScript", category: "languages", level: 9 },
  { name: "TypeScript", category: "languages", level: 8 },
  { name: "Python", category: "languages", level: 7 },
  { name: "Java", category: "languages", level: 6 },
  { name: "Ruby", category: "languages", level: 5 },

  // Frontend
  { name: "ReactJS", category: "frontend", level: 9 },
  { name: "Next.js", category: "frontend", level: 8 },
  { name: "Webpack", category: "frontend", level: 7 },

  // Backend
  { name: "Node.js", category: "backend", level: 9 },
  { name: "Express", category: "backend", level: 8 },
  { name: "Fastify", category: "backend", level: 7 },
  { name: "GraphQL", category: "backend", level: 8 },
  { name: "Serverless", category: "backend", level: 7 },
  { name: "Spring Boot", category: "backend", level: 6 },
  { name: "FastAPI", category: "backend", level: 6 },
  { name: "Flask", category: "backend", level: 6 },
  { name: "Chalice", category: "backend", level: 6 },

  // Data & Databases
  { name: "PostgreSQL", category: "data", level: 8 },
  { name: "MongoDB", category: "data", level: 7 },
  { name: "Snowflake", category: "data", level: 7 },
  { name: "Elasticsearch", category: "data", level: 7 },
  { name: "Memgraph", category: "data", level: 7 },

  // Cloud & DevOps
  { name: "AWS", category: "cloud", level: 8 },
  { name: "Azure", category: "cloud", level: 6 },
  { name: "Kubernetes", category: "cloud", level: 7 },
];

export const characterClass = "Full-Stack Engineer";
export const characterXP = "5+ years";
