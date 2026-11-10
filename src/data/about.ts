/** Every fact here comes from the resume or from what Vishwath told me. */

export const identity =
  "Final-year B.Tech in Computer Science at KITS Warangal, graduating in 2027. I build data pipelines on AWS, and I am looking for data engineering roles.";

/** The four things a visitor wants first, read at a glance. */
export const facts = [
  { label: "Based in", text: "Warangal, India" },
  { label: "Studying", text: "B.Tech CSE, KITSW" },
  { label: "Focus", text: "Data engineering" },
  { label: "Status", text: "Open to roles, 2027" },
];

/** Big numbers under the hero. `value` counts up; `suffix` and `prefix` stay still. */
export const stats = [
  { value: 8.35, decimals: 2, label: "CGPA at KITS Warangal" },
  { value: 3, label: "Projects, from design to data" },
  { value: 31, label: "Photographs on the roll" },
  { value: 2027, label: "Graduating, B.Tech CSE", plain: true },
];

/** The story, one chapter per stage, each beside its own photograph. */
export const story = [
  {
    chapter: "Design",
    text: "I started in design, drawing wireframes and prototypes in Figma. It taught me to care about how a thing feels to the person using it.",
  },
  {
    chapter: "Full-stack",
    text: "Then I learned to build the whole product: React, Node and MongoDB, with real-time chat and file sharing on Socket.io. Somewhere in there my curiosity moved from the screen to the data moving underneath it.",
  },
  {
    chapter: "Data",
    text: "Now I build pipelines on AWS that take raw files to tables people can query, and I run the CSE Association at my college while I do it.",
  },
];

export type PathEntry = { when: string; role: string; where: string; note?: string };

/** The path so far, grouped. Newest first inside each group. */
export const path: { group: string; entries: PathEntry[] }[] = [
  {
    group: "Education",
    entries: [
      {
        when: "2023 – 2027",
        role: "B.Tech, Computer Science and Engineering",
        where: "Kakatiya Institute of Technology & Science, Warangal",
        note: "CGPA 8.35",
      },
    ],
  },
  {
    group: "Experience",
    entries: [
      {
        when: "Jan – Mar 2025",
        role: "Social Growth Intern",
        where: "Poditivity, remote",
        note: "Led UI and UX work in Figma, and planned, shot and edited the content.",
      },
    ],
  },
  {
    group: "Leadership",
    entries: [
      { when: "Now", role: "President", where: "CSE Association, KITSW" },
      {
        when: "Year 3",
        role: "Joint Secretary",
        where: "CSE Association, KITSW",
        note: "Led department technical events, workshops and student coordination.",
      },
      {
        when: "Year 2",
        role: "Executive Member",
        where: "CSE Association, KITSW",
        note: "Helped run technical fests and inter-department activities.",
      },
      {
        when: "Alongside",
        role: "Videographer, photographer and content strategist",
        where: "Student Alliance for Innovation & Leadership (SAiL), KITSW",
      },
    ],
  },
  {
    group: "Recognition",
    entries: [
      { when: "Hackathon", role: "Shortlisted, internal rounds", where: "Smart India Hackathon" },
      {
        when: "Certified",
        role: "Google Cloud Computing Foundations",
        where: "Google Cloud",
        note: "The four-course series, plus Cloud Load Balancing, Secure Network Design and Data Preparation for ML APIs.",
      },
    ],
  },
];

export const currently = {
  when: "November 2026",
  lines: [
    { label: "Building", text: "This site, and a data lake on AWS for NYC taxi trips." },
    { label: "Learning", text: "Data engineering, one pipeline at a time." },
    { label: "Leading", text: "The CSE Association at KITSW, as its president." },
  ],
};

/** Off-screen life, kept to one line that links to the posts. */
export const someday = [
  { text: "Switzerland, to settle", href: "/write/why-switzerland" },
  { text: "Area 51, with friends", href: "/write/area-51" },
];

/**
 * Pictures of me, kept out of Frame. Drop files into public/about/ with these names and they appear.
 * Missing files are skipped and the layout closes up around them.
 *
 * `moments` is a strip of extra photos (events, the association, behind the camera). Add a file
 * as public/about/moment-1.jpg and so on, and give it a caption here.
 */
export const aboutPics = {
  portrait: { file: "portrait.jpg", alt: "Vishwath Narayana" },
  story: [
    { file: "story-1.jpg", alt: "Vishwath on a rooftop at night" },
    { file: "story-2.jpg", alt: "Vishwath on the college court, laughing" },
    { file: "story-3.jpg", alt: "Vishwath on the college court, smiling" },
  ],
  moments: [
    { file: "moment-1.jpg", alt: "Leading an event as CSE Association president", caption: "CSE Association" },
    { file: "moment-2.jpg", alt: "Behind the camera", caption: "Behind the camera" },
    { file: "moment-3.jpg", alt: "At work", caption: "At work" },
    { file: "moment-4.jpg", alt: "Around campus", caption: "Around campus" },
  ],
};
