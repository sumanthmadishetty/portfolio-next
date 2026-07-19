export interface Experience {
  orgName: string;
  orgWebsite: string;
  start: string;
  end: string;
  designation: string;
  summary?: string;
  accomplishments: string[];
  techStack?: string[];
}

export const experience: Experience[] = [
  {
    orgName: "Skillsoft",
    orgWebsite: "https://www.skillsoft.com",
    start: "June 2025",
    end: "Present",
    designation: "Principal Software Engineer",
    summary:
      "Building a ground-up knowledge graph for a skills intelligence platform using Memgraph as the graph database, along with a broader modern stack.",
    accomplishments: [
      "Architecting and building a knowledge graph from the ground up for a skills intelligence platform using Memgraph.",
      "Working across the stack with React, Node.js/Express, PostgreSQL, AWS, Elasticsearch, Azure LLM services, and Kubernetes.",
    ],
    techStack: [
      "Memgraph",
      "ReactJS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "AWS",
      "Elasticsearch",
      "Azure LLM",
      "Kubernetes",
    ],
  },
  {
    orgName: "Niro",
    orgWebsite: "https://niro.money",
    start: "December 2021",
    end: "May 2025",
    designation: "SDE-3",
    summary:
      "Beyond full-stack work: maintained the entire cloud, set up CI/CD pipelines, built data pipelines from AWS sources to Snowflake, maintained the data warehouse, and designed and led the microservice for all post-disbursal loan flows — collections, finance, and more.",
    accomplishments: [
      "Designed and developed a data pipeline to transfer data from RDS to Snowflake.",
      "Designed and developed the Credit Line product.",
      "Evaluated and led GraphQL aggregation layers in our microservices architecture.",
      "Designed and led development of a microservice for loan repayment flows.",
      "Deployed and maintained cloud infrastructure, deployment scripts, and CI/CD pipelines.",
    ],
  },
  {
    orgName: "Reputation",
    orgWebsite: "https://reputation.com",
    start: "July 2021",
    end: "December 2021",
    designation: "Senior Software Engineer",
    accomplishments: [
      "Developed a custom video recorder component with caption features.",
      "Developed reporting tools for customer feedback.",
    ],
  },
  {
    orgName: "galleri5",
    orgWebsite: "https://galleri5.com",
    start: "May 2018",
    end: "September 2020",
    designation: "Associate Software Engineer",
    accomplishments: [
      "Developed the backend (Python/Chalice/Mongo) and frontend (ReactJS) for our SAAS platform, enabling brands to create and run campaigns on multiple social media platforms.",
      "Developed a Linktree alternative with affiliate product selling features.",
      "Suggested and developed various features for easier influencer discoverability by brands on our SAAS platform.",
    ],
  },
  {
    orgName: "Techsophy",
    orgWebsite: "https://techsophy.com",
    start: "May 2018",
    end: "September 2020",
    designation: "Associate Software Engineer",
    accomplishments: [
      "Implemented custom Webpack configuration to use React in conjunction with Rails.",
      "Implemented core functionalities for web applications such as push notifications, authentication, chatbots, and payment services.",
      "Implemented Optical Character Recognition (OCR) for reading data from various documents.",
      "Wrote functional and snapshot test cases for React using Jest and Enzyme for various projects.",
    ],
  },
];
