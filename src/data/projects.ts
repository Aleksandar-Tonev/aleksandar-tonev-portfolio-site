/**
 * PROJECT DATA — edit this file to add real work.
 *
 * Every entry below is a PLACEHOLDER (placeholder: true). To replace one:
 *  1. Set title, shortDescription, purpose and alt to the real values.
 *  2. Add images: [{ src: importedImage, width, height }].
 *  3. Add year only if you have a real value.
 *  4. Set placeholder: false.
 */

export type Discipline =
  | "Graphic Design"
  | "Prepress"
  | "Interior / Spatial"
  | "AI Visual Content";

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  title: string;
  category: Discipline;
  shortDescription: string;
  purpose: string;
  images: ProjectImage[];
  alt: string;
  year?: number;
  placeholder: boolean;
}

export type GroupId = "A" | "B" | "C" | "D";

const ph = (id: string, n: string, category: Discipline): Project => ({
  id,
  title: `Placeholder project ${n}`,
  category,
  shortDescription: "Placeholder — short project description to be supplied.",
  purpose: "Placeholder — project purpose and context to be supplied.",
  images: [],
  alt: `Placeholder image for project ${n}`,
  placeholder: true,
});

export const projectGroups: Record<GroupId, Project[]> = {
  A: [
    ph("a1", "01", "Graphic Design"),
    ph("a2", "02", "Prepress"),
    ph("a3", "03", "AI Visual Content"),
    ph("a4", "04", "Graphic Design"),
    ph("a5", "05", "Interior / Spatial"),
  ],
  B: [
    ph("b1", "06", "Prepress"),
    ph("b2", "07", "Graphic Design"),
    ph("b3", "08", "Graphic Design"),
    ph("b4", "09", "AI Visual Content"),
  ],
  C: [
    ph("c1", "10", "Interior / Spatial"),
    ph("c2", "11", "Graphic Design"),
    ph("c3", "12", "Prepress"),
    ph("c4", "13", "Interior / Spatial"),
  ],
  D: [
    ph("d1", "14", "AI Visual Content"),
    ph("d2", "15", "Graphic Design"),
    ph("d3", "16", "Prepress"),
  ],
};
