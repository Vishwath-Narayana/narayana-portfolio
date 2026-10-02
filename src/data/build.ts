/**
 * Everything on the Build page comes from here, and every fact comes from the resume.
 * Add `live` and `repo` to a project and the links appear on its entry.
 */

export type Stage = {
  name: string;
  period: string;
  text: string;
  tools: string[];
};

export const journey: Stage[] = [
  {
    name: "Design",
    period: "Where it started",
    text: "I began in Figma, drawing wireframes and prototypes and learning why one screen feels easy and the next one does not. At Poditivity I led UI and UX work, and I shot and edited the content too. Design taught me to start from the person using the thing.",
    tools: ["Figma", "Wireframing", "Prototyping", "User experience design"],
  },
  {
    name: "Full-stack",
    period: "Where I learned to build",
    text: "Drawing a screen was not enough for me. I wanted to make it work, so I learned React and Node and built what I had been designing: a file platform with roles and permissions, and a chat app that updates in real time. Building showed me how much happens behind a single button.",
    tools: ["React", "Next.js", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS"],
  },
  {
    name: "Data",
    period: "Where I am now",
    text: "The part I keep coming back to is what sits under every screen: where the data comes from, how it is cleaned, and whether anyone can trust it. I now build pipelines on AWS that take raw data to something a person can query. I am studying Computer Science at KITS Warangal, graduating in 2027.",
    tools: ["Python", "SQL", "PySpark", "Apache Airflow", "AWS Glue", "Athena", "Step Functions"],
  },
];

export type Layer = { name: string; skills: string[] };

/** Listed from what a person sees down to where the data is kept. */
export const layers: Layer[] = [
  { name: "Interface design", skills: ["Figma", "Wireframing", "Prototyping", "User experience design"] },
  {
    name: "Frontend",
    skills: ["React", "Next.js", "JavaScript", "Tailwind CSS", "Framer Motion", "HTML and CSS", "Responsive design"],
  },
  { name: "Backend", skills: ["Node.js", "Express", "REST APIs", "WebSockets", "JWT", "Role-based access"] },
  { name: "Databases", skills: ["MongoDB", "MySQL", "Amazon RDS", "Redis", "SQL"] },
  {
    name: "Data engineering",
    skills: ["ETL pipelines", "PySpark", "Apache Airflow", "AWS Glue", "Data lakes", "Python"],
  },
  { name: "Cloud and tools", skills: ["AWS", "Docker", "Linux", "Git", "Shell scripting", "Postman", "Vercel"] },
];

export type Project = {
  name: string;
  kind: string;
  about: string;
  did: string[];
  stack: string[];
  /** The parts it is made of, left to right. */
  shape: string[];
  shapeNote: string;
  live?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    name: "NYC Taxi Data Lake",
    kind: "Data engineering",
    about:
      "A pipeline on AWS that takes each month of New York taxi trips from raw files to tables ready for analysis, with no one touching it.",
    did: [
      "Designed a three-layer lake: raw, curated and aggregated, all in S3.",
      "Cleaned, validated and enriched the data with Glue jobs written in PySpark.",
      "Set up crawlers and the Glue Data Catalog so the results can be queried in SQL with Athena.",
      "Used job bookmarks so each run only processes new data, and Step Functions to order the steps.",
      "Scheduled the monthly load with EventBridge and added checks between layers.",
    ],
    stack: ["AWS S3", "AWS Glue", "PySpark", "Athena", "Step Functions", "EventBridge"],
    shape: ["Raw", "Curated", "Aggregated", "Athena"],
    shapeNote: "Loaded monthly, checked between every layer.",
  },
  {
    name: "FileDrive",
    kind: "Full-stack",
    about:
      "A cloud space where teams share files. Each team has its own workspace, and what a person can do depends on their role.",
    did: [
      "Built workspaces with team-based access and secure file storage.",
      "Added three roles, Admin, Editor and Viewer, using JWT and hashed passwords.",
      "Wrote the REST API in Express 5 for workspaces, files and onboarding.",
      "Stored files with Cloudinary and Supabase, and handled uploads with Multer.",
      "Pushed activity to the dashboard live over Socket.io.",
    ],
    stack: ["React 19", "Vite", "Node.js", "Express 5", "MongoDB", "Socket.io", "Cloudinary", "Supabase", "Tailwind CSS"],
    shape: ["React app", "Express API", "MongoDB", "File storage"],
    shapeNote: "Live activity runs alongside, over Socket.io.",
  },
  {
    name: "Real-time Chat",
    kind: "Full-stack",
    about:
      "A messaging app for one-to-one and group conversations, where messages arrive as they are sent.",
    did: [
      "Built one-to-one and group chats on WebSockets with Socket.io.",
      "Added JWT sign-in, online and offline status, typing indicators and push notifications.",
      "Tuned the database and backend for many people at once, and cached API responses to cut delay.",
      "Animated the interface with Framer Motion so it feels the same on phone and desktop.",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "Socket.io", "JWT", "Tailwind CSS", "Framer Motion"],
    shape: ["React app", "Socket.io", "Node server", "MongoDB"],
    shapeNote: "Messages travel over an open connection, not repeated requests.",
  },
];
