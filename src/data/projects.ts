export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
  /** Placeholder cards are visually marked until real content lands. */
  placeholder?: boolean;
}

// Swap these placeholders with real projects — just edit this file.
export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "Placeholder — a cool project will land here soon. Describe the problem, the stack, and the impact in one or two lines.",
    tags: ["Next.js", "TypeScript", "AWS"],
    placeholder: true,
  },
  {
    title: "Project Two",
    description:
      "Placeholder — another project slot. Link out to a live demo or a GitHub repo when it's ready.",
    tags: ["Node.js", "GraphQL", "PostgreSQL"],
    placeholder: true,
  },
  {
    title: "Project Three",
    description:
      "Placeholder — third slot. Side projects, open source, experiments — anything worth showing off.",
    tags: ["Python", "Snowflake", "Data Eng"],
    placeholder: true,
  },
];
