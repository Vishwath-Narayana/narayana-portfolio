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
      "From January to March I was a Social Growth Intern at Poditivity: Figma wireframes and prototypes, campaigns, photography, videography and the content calendar.",
      "At SAiL I became the videographer, photographer and content strategist for college-wide events.",
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

export const quiet =
  "Also: Google Cloud Computing Foundations, Cloud Load Balancing, Secure Network Design and Data Preparation for ML APIs. Shortlisted in the internal rounds of Smart India Hackathon.";

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
