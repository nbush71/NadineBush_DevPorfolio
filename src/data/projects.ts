const A = "https://nbush71.github.io/E-Portfolio/assets";
const GH = "https://www.github.com/nbush71";

export const techs = [
  { name: "HTML", logo: `${A}/HTML5_Badge_512.png` },
  { name: "CSS", logo: `${A}/CSS3%20Logo.png` },
  { name: "JavaScript", logo: `${A}/JavaScript%20Logo.png` },
  { name: "React", logo: `${A}/React%20Logo.png` },
  { name: "Next.js", logo: `${A}/Next-js_Logo_1.png` },
  { name: "Tailwind CSS", logo: `${A}/TailwindCSS_logo.jpeg` },
  { name: "Firebase", logo: `${A}/Firebase_Logo.svg` },
] as const;

export type Project = {
  id: string;
  title: string;
  kind: string;
  summary: string;
  stack: string[];
  image: string;
  live: string;
  repo: string;
};

export const projects: Project[] = [
  {
    id: "skinstric", title: "Skinstric", kind: "Paid virtual internship",
    summary: "A rebuild of the Skinstric skincare AI app, created from scratch on a real client brief.",
    stack: ["React", "Next.js", "Tailwind CSS", "JavaScript", "Vercel"],
    image: `${A}/Skinstric.jpg`, live: "https://skinstric-sable.vercel.app/", repo: "https://github.com/nbush71/Skinstric",
  },
  {
    id: "summarist", title: "Summarist", kind: "Advanced virtual internship",
    summary: "A book summary app with user accounts, search and paid subscriptions.",
    stack: ["React", "Next.js", "Tailwind CSS", "JavaScript", "Firebase", "Stripe", "Redux", "Vercel"],
    image: `${A}/Summarist.jpg`, live: "https://adv-internship2.vercel.app/", repo: "https://github.com/nbush71/AdvInternship2",
  },
  {
    id: "ultraverse", title: "Ultraverse", kind: "Virtual internship",
    summary: "A website for an NFT world, with searchable content, a carousel and a countdown timer.",
    stack: ["HTML", "CSS", "JavaScript", "React", "Vercel"],
    image: `${A}/Ultraverse.jpg`, live: "https://nadine-internship.vercel.app/", repo: "https://github.com/nbush71/nadine-internship",
  },
  {
    id: "movies", title: "Movie Search", kind: "React app",
    summary: "A movie search app where visitors look up films, filter results and browse featured titles.",
    stack: ["HTML", "CSS", "JavaScript", "React", "Vercel"],
    image: `${A}/Movies_React.jpg`, live: "https://movies-react-ashy-eight.vercel.app/", repo: "https://github.com/nbush71/Movies_React",
  },
  {
    id: "library", title: "Library", kind: "E-commerce app",
    summary: "An online bookstore where visitors browse and filter books and add them to a working shopping cart.",
    stack: ["HTML", "CSS", "JavaScript", "React", "Vercel"],
    image: `${A}/React_Library.jpg`, live: "https://e-com-react-self.vercel.app", repo: "https://github.com/nbush71/ECom_React",
  },
  {
    id: "treact", title: "Treact", kind: "Final project",
    summary: "A polished, fully responsive website with clear sections and easy navigation on any screen size.",
    stack: ["HTML", "CSS", "Responsive design"],
    image: `${A}/Treact.jpg`, live: "https://nbush71.github.io/Treact2/", repo: "http://www.github.com/nbush71/Treact2",
  },
];
