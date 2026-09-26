/**
 * PROJECT DATA — edit this file to add real work.
 *
 * The portfolio holds exactly 13 projects across groups A–D.
 * Every entry below is a PLACEHOLDER (placeholder: true). To replace one:
 *  1. Set title, shortDescription, purpose and alt to the real values.
 *  2. Set aspectRatio to the work's real format: "9:16" (portrait) or "16:9" (landscape).
 *  3. Add images: [{ src: importedImage, width, height }].
 *  4. Add year only if you have a real value.
 *  5. Set placeholder: false.
 * Placement and offsets are handled by the layout, never stored here.
 */

export type Discipline =
  | "Graphic Design"
  | "Prepress"
  | "Interior / Spatial"
  | "AI Visual Content";

export type GroupId = "A" | "B" | "C" | "D";
export type ProjectAspectRatio = "9:16" | "16:9";

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  title: string;
  group: GroupId;
  aspectRatio: ProjectAspectRatio;
  category: Discipline;
  shortDescription: string;
  purpose: string;
  images: ProjectImage[];
  alt: string;
  year?: number;
  placeholder: boolean;
}

/** Numeric width/height ratio of a project's presentation format. */
export const ratioValue = (r: ProjectAspectRatio) => (r === "9:16" ? 9 / 16 : 16 / 9);

const ph = (
  id: string,
  n: string,
  group: GroupId,
  aspectRatio: ProjectAspectRatio,
  category: Discipline,
): Project => ({
  id,
  title: `Placeholder project ${n}`,
  group,
  aspectRatio,
  category,
  shortDescription: "Placeholder — short project description to be supplied.",
  purpose: "Placeholder — project purpose and context to be supplied.",
  images: [],
  alt: `Placeholder image for project ${n}`,
  placeholder: true,
});

/** Attach a supplied image + title; descriptions stay placeholder until supplied. */
const withImage = (p: Project, title: string, src: string): Project => {
  const portrait = p.aspectRatio === "9:16";
  return {
    ...p,
    title,
    alt: title,
    images: [{ src, width: portrait ? 900 : 1600, height: portrait ? 1600 : 900 }],
  };
};

export const projects: Project[] = [
  withImage(ph("a1", "01", "A", "9:16", "Graphic Design"), "Hair salon make-up poster", w1.url),
  withImage(ph("a2", "02", "A", "16:9", "Prepress"), "Davines billboard", w2.url),
  withImage(ph("a3", "03", "A", "9:16", "Graphic Design"), "Botyo Bukov book cover", w3.url),
  withImage(ph("a4", "04", "A", "16:9", "Prepress"), "Aspen Invest calendar header", w4.url),
  withImage(ph("b1", "05", "B", "16:9", "Prepress"), "Bulgarian National Audit Office calendar header", w5.url),
  withImage(ph("b2", "06", "B", "9:16", "Graphic Design"), "Dream catcher colour study", w6.url),
  withImage(ph("b3", "07", "B", "16:9", "Graphic Design"), "Geometric shapes drawing", w7.url),
  withImage(ph("c1", "08", "C", "9:16", "Graphic Design"), "University of Forestry flyer 2018", w8.url),
  withImage(ph("c2", "09", "C", "16:9", "Graphic Design"), "Logo mock-up", w9.url),
  withImage(ph("c3", "10", "C", "9:16", "Graphic Design"), "Business card", w10.url),
  ph("d1", "11", "D", "16:9", "AI Visual Content"),
  ph("d2", "12", "D", "16:9", "Graphic Design"),
  ph("d3", "13", "D", "9:16", "Prepress"),
];

export const PROJECT_TOTAL = 13;
if (import.meta.env.DEV && projects.length !== PROJECT_TOTAL) {
  console.error(`Portfolio data: expected ${PROJECT_TOTAL} projects, found ${projects.length}.`);
}

export const projectsIn = (g: GroupId) => projects.filter((p) => p.group === g);

export const projectGroups: Record<GroupId, Project[]> = {
  A: projectsIn("A"),
  B: projectsIn("B"),
  C: projectsIn("C"),
  D: projectsIn("D"),
};
