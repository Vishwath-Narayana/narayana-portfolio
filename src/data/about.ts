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
    { label: "Leading", text: "The CSE Association at KITSW, as its president." },
    { label: "Looking up", text: "At the night sky, when it is clear enough." },
  ],
};

export type Note = { text: string; href?: string; cta?: string };

export const fieldNotes: Note[] = [
  { text: "I like looking up. Telescopes, stars, and how little of the sky most of us ever see.", href: "/write/looking-up", cta: "Read about the night sky" },
  { text: "I want to settle in Switzerland and stay there.", href: "/write/why-switzerland", cta: "Why Switzerland" },
  { text: "I photograph railway tracks, and ordinary light on ordinary places.", href: "/frame", cta: "See the photographs" },
  { text: "Area 51 is on my list. I am going with friends.", href: "/write/area-51", cta: "The plan" },
];

export const inShort = [
  "Four Google Cloud certifications, including the four-course Cloud Computing Foundations series",
  "President of the CSE Association, after serving as Joint Secretary and Executive Member",
  "Shortlisted in the internal rounds of Smart India Hackathon",
  "Social Growth Intern at Poditivity, January to March 2025",
];
