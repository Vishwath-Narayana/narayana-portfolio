/** Every fact on the About page comes from the resume or from what Vishwath told me. */

export const intro =
  "I started in design, learned to build full-stack products, and now spend most of my time on data engineering: pipelines on AWS that take raw data to something people can query.";

export type Year = { year: string; title: string; lines: string[] };

export const years: Year[] = [
  {
    year: "2023",
    title: "Joined KITS Warangal",
    lines: [
      "B.Tech in Computer Science and Engineering.",
      "I came in drawing screens before I wrote code, and that never fully left.",
    ],
  },
  {
    year: "2024",
    title: "Executive Member, CSE Association",
    lines: [
      "Helped organise technical fests and inter-department activities.",
      "Learned to build the whole product, front to back.",
    ],
  },
  {
    year: "2025",
    title: "Joint Secretary, and a first internship",
    lines: [
      "Led department-level technical events, workshops and student coordination.",
      "Spent January to March as a Social Growth Intern at Poditivity.",
      "Took on photography, video and content for SAiL, the college innovation and leadership group.",
    ],
  },
  {
    year: "2026",
    title: "President, CSE Association",
    lines: [
      "I run the association I joined as a member two years ago.",
      "On the engineering side, I built a data lake on AWS for NYC taxi trips.",
    ],
  },
  {
    year: "2027",
    title: "Graduation",
    lines: ["B.Tech finishes with a CGPA of 8.35 so far.", "Next: a first role in data engineering."],
  },
];

export const education = {
  school: "Kakatiya Institute of Technology & Science (KITSW), Warangal",
  degree: "B.Tech, Computer Science and Engineering",
  period: "2023 to 2027",
  note: "CGPA 8.35",
};

export const certifications = [
  {
    name: "Google Cloud Computing Foundations",
    detail: "Four-course series: cloud fundamentals, infrastructure, networking and security, data, ML and AI.",
  },
  { name: "Google Cloud: Implementing Cloud Load Balancing" },
  { name: "Google Cloud: Secure Network Design" },
  { name: "Google Cloud: Data Preparation for ML APIs" },
];

export const skills: { label: string; items: string }[] = [
  { label: "Languages", items: "Python, JavaScript, SQL" },
  { label: "Data engineering", items: "ETL pipelines, PySpark, Apache Airflow, AWS Glue, data lakes" },
  { label: "Databases", items: "MongoDB, MongoDB Atlas, Amazon RDS, MySQL, Redis" },
  { label: "Cloud and DevOps", items: "AWS (EC2, S3, IAM, Lambda, RDS, Glue, Redshift), Docker, Linux, shell scripting, Git, GitHub, Vercel" },
  { label: "Backend", items: "Node.js, Express.js, REST APIs, WebSocket (Socket.io), JWT, RBAC" },
  { label: "Frontend", items: "React, Next.js, HTML, CSS, Tailwind CSS, responsive design, Framer Motion" },
  { label: "Design", items: "Figma, wireframing, prototyping, user experience design" },
  { label: "Tools", items: "Postman, Cloudinary, Render, VS Code" },
];

export const experience = {
  role: "Social Growth Intern",
  org: "Poditivity",
  place: "Remote",
  period: "January to March 2025",
  points: [
    "Led UI and UX work, drawing wireframes and prototypes in Figma.",
    "Planned content and ran campaigns, including photography, videography and editing.",
    "Helped set the brand strategy and content calendar so the look and message stayed consistent.",
  ],
};

export const activities = [
  { role: "President", org: "CSE Association, KITSW", note: "Current." },
  { role: "Joint Secretary", org: "CSE Association, KITSW, third year", note: "Led department-level technical events, workshops and student coordination." },
  { role: "Executive Member", org: "CSE Association, KITSW, second year", note: "Helped organise technical fests and inter-department activities." },
  { role: "Videographer, Photographer and Content Strategist", org: "SAiL, KITSW", note: "Produced multimedia content for college-wide innovation and leadership events." },
  { role: "Smart India Hackathon", org: "Internal rounds", note: "Shortlisted. Rapid prototyping under a deadline." },
];

export type Off = { line: string; href: string; cta: string };

export const offTheClock: Off[] = [
  {
    line: "I like looking up. Telescopes, stars, and how little of the sky most of us ever see.",
    href: "/write/looking-up",
    cta: "Read about the night sky",
  },
  {
    line: "I want to settle in Switzerland and stay there.",
    href: "/write/why-switzerland",
    cta: "Why Switzerland",
  },
  {
    line: "I photograph railway tracks, because they are the one place every city agrees on a line.",
    href: "/frame",
    cta: "See the photographs",
  },
  {
    line: "Area 51 is on my list, and I am going with friends.",
    href: "/write/area-51",
    cta: "The plan",
  },
];
