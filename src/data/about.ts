/** Every fact on the About page comes from the resume. */

export const intro = [
  "I am Vishwath, a Computer Science student at KITS Warangal, graduating in 2027. I started in design, learned to build full-stack products, and now spend most of my time on data engineering: pipelines on AWS that take raw data to something people can query.",
  "Away from the screen I photograph ordinary light and write about what I am learning. I also run things: I am the president of my college's CSE Association.",
];

export const education = {
  school: "Kakatiya Institute of Technology & Science, Warangal",
  degree: "B.Tech, Computer Science and Engineering",
  period: "2023 to 2027",
  note: "CGPA 8.35",
};

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

export const certifications = [
  "Google Cloud Computing Foundations: cloud fundamentals, infrastructure, networking and security, data, ML and AI",
  "Google Cloud: Implementing Cloud Load Balancing, Secure Network Design, Data Preparation for ML APIs",
];

export type Role = { role: string; org: string; note?: string; when?: string };

export const leadership: Role[] = [
  { role: "President", org: "CSE Association, KITSW" },
  {
    role: "Joint Secretary",
    org: "CSE Association, KITSW",
    when: "Third year",
    note: "Led department-level technical events, workshops and student coordination.",
  },
  {
    role: "Executive Member",
    org: "CSE Association, KITSW",
    when: "Second year",
    note: "Helped organise technical fests and inter-department activities.",
  },
  {
    role: "Videographer, Photographer and Content Strategist",
    org: "Student Alliance for Innovation & Leadership (SAiL), KITSW",
    note: "Produced multimedia content for college-wide innovation and leadership events.",
  },
  {
    role: "Smart India Hackathon",
    org: "Internal rounds",
    note: "Shortlisted, building quick prototypes under a deadline.",
  },
];
