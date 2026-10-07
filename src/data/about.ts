/** Every fact here comes from the resume or from what Vishwath told me. */

export const identity = "Final-year B.Tech in Computer Science, KITS Warangal. Graduating 2027. Looking for data engineering roles.";

export const story = [
  "I started in design, drawing wireframes and prototypes in Figma. It taught me to care about how a thing feels to the person using it.",
  "Then I learned to build the whole product: React, Node and MongoDB, with real-time chat and file sharing on Socket.io. Somewhere in there my curiosity moved from the screen to the data moving underneath it.",
  "Now I build pipelines on AWS that take raw files to tables people can query, and I run the CSE Association at my college while I do it.",
];

export const currently = {
  when: "October 2026",
  lines: [
    { label: "Building", text: "This site, and a data lake on AWS for NYC taxi trips." },
    { label: "Learning", text: "Data engineering, one pipeline at a time." },
    { label: "Leading", text: "The CSE Association at KITSW, as its president, after serving as Executive Member and Joint Secretary." },
  ],
};

/** Off-screen life, kept to one line that links to the posts. */
export const someday = [
  { text: "Switzerland, to settle", href: "/write/why-switzerland" },
  { text: "Area 51, with friends", href: "/write/area-51" },
];

export const inShort = [
  { label: "Certified", text: "Four Google Cloud certifications, including the four-course Cloud Computing Foundations series" },
  { label: "Shortlisted", text: "Internal rounds of Smart India Hackathon" },
  { label: "Interned", text: "Social Growth Intern at Poditivity, January to March 2025" },
];

/**
 * Pictures of me, kept out of Frame. Drop files into public/about/ with these names and they appear.
 * Missing files are skipped and the layout closes up around them.
 */
export const aboutPics = {
  portrait: { file: "portrait.jpg", alt: "Vishwath" },
  story: [
    { file: "story-1.jpg", alt: "Vishwath, early on" },
    { file: "story-2.jpg", alt: "Vishwath, building" },
    { file: "story-3.jpg", alt: "Vishwath today" },
  ],
};
