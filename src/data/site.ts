/** SITE COPY & CONTACT — edit headline, intro, about text and links here. */
export const site = {
  name: "Aleksandar Tonev",
  headline: ["Design with intent.", "Built to deliver."],
  descriptor: "Graphic Design · Prepress · AI Visual Content · Motion",
  intro:
    "Graphic designer with a prepress background. Developing in AI content, video and motion. Building visual work that holds up on screen, on press and in space — composed with care, prepared for production.",
  about: [
    "My foundation is graphic design and prepress: layout, typography, colour and the technical preparation that turns a design into a finished, printed piece.",
    "Production discipline shapes how I work across formats — from print and identity to video and motion projects.",
    "I also use AI as a tool for content generation: a way to explore and extend ideas, never a substitute for design thinking.",
  ],
  email: "aleksandar.hristov.tonev@gmail.com",
  linkedin: "https://linkedin.com/in/aleksandar-tonev",
  /** Set to an imported image URL when the real portrait is supplied. */
  portrait: null as string | null,
};

/** RÉSUMÉ SECTION — edit copy here. PDF lives in public/documents/. */
export const resume = {
  label: "Résumé / Experience",
  statement: ["15+ years in", "design & production"] as const,
  paragraph:
    "Graphic designer with 15+ years of experience across advertising, commercial print, prepress and production-ready visual communication, now extending that foundation into AI-assisted image and video content.",
  signals: ["Graphic design & prepress", "AI-assisted content generation", "MSc in Habitat and Environmental Design · BSc in Engineering Design"],
  pdf: "/documents/Aleksandar-Tonev-CV.pdf",
  downloadName: "Aleksandar-Tonev-CV.pdf",
};

/** RÉSUMÉ PAGE DETAIL — taken from the CV PDF. */
export const cv = {
  profile: [
    "Production-disciplined graphic designer with 15+ years in advertising and commercial print, covering the full production lifecycle — from concept and layout to technically clean, press-ready artwork for web offset and large-format printing. Work spans books, periodicals, advertising, outdoor, in-house and promotional materials.",
    "Since mid-2025, self-directed into generative AI for visual content: a brief-to-final-asset pipeline of AI-generated image and video, prompt engineering and audio sync — a workflow that extends rather than replaces the classical design process.",
  ],
  experience: [
    { role: "Design Specialist & AI-Assisted Visual Content Creator", org: "Self-directed", place: "Stara Zagora", period: "Aug 2025 — Present", points: ["End-to-end AI visual content workflow: prompt engineering, AI image/video/text generation, editing and sound design, including an entry to the Higgsfield AI Video Contest (2026).", "20+ AI short-form videos across different genres.", "Moderator on the SoftUni Circle platform for AI."] },
    { role: "Graphic Designer", org: "DMI Development", place: "Sofia", period: "Jun 2023 — Jul 2025", points: ["Advertising materials and corporate print publications.", "100% press-ready files (colour profiles, bleeds, resolution, separations, proofing), reducing file returns and reprint costs.", "Multiple parallel jobs under strict deadlines."] },
    { role: "Prepress Specialist", org: "Pechatnitsa 2M (Print House)", place: "Stara Zagora", period: "Mar 2022 — Nov 2022", points: ["Preflighted client files for sheet-fed and web offset printing.", "Resolved technical print errors before press release."] },
    { role: "Designer", org: "Alpha Vizia Ltd", place: "Stara Zagora", period: "Oct 2021 — Mar 2022 · Jan 2007 — Sep 2014", points: ["Complete creative cycle from client brief to production-ready output for outdoor advertising, promotional merchandise and print media.", "Coordinated print production and deadlines directly with print houses."] },
    { role: "Prepress Specialist", org: "FATUM Ltd", place: "Sofia", period: "Oct 2005 — Jan 2006", points: ["Preflighting for sheet-fed and web offset; advertising design and print preparation."] },
    { role: "Prepress Specialist", org: "Billboard JSC", place: "Sofia", period: "Jul 2004 — Sep 2005", points: ["Print advertising and large-format file preparation; in-house design-to-print coordination."] },
    { role: "Designer", org: "Kameya Ltd", place: "Sofia", period: "Jun 2003 — Jun 2004", points: ["Print advertising materials; preflight for web offset printing."] },
    { role: "Designer & Office Manager", org: "FUMI Press Ltd", place: "Sofia", period: "Apr 2001 — Apr 2003", points: ["Books, a newspaper and print advertising; print coordination and newspaper distribution."] },
  ],
  education: [
    { degree: "MSc, Habitat and Environmental Design", org: "University of Forestry, Sofia", period: "2019 — 2021", focus: "Interior design for residential and public buildings, furniture design, 3D concepts." },
    { degree: "BSc, Engineering Design", org: "University of Forestry, Sofia", period: "2014 — 2019", focus: "Interiors and furniture design." },
  ],
  disciplines: [
    "Design & print production", "Editorial layout", "Branding & visual identity", "Typography & composition", "Advertising & outdoor", "Prepress & colour management", "Generative AI image & video", "Prompt engineering", "Audio sync for AI video",
  ],
  tools: [
    ["Design", "Photoshop, InDesign, Illustrator, Figma"],
    ["Video", "Premiere Pro, After Effects, CapCut"],
    ["AI", "Claude, ChatGPT, Higgsfield.ai"],
  ] as const,
  languages: ["Bulgarian — native", "English — professional working proficiency"],
  certificates: ["AI Adoption — SoftUni, 2025", "B2 Pre-Certificate in English (CEFR)"],
};
