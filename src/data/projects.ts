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

import w1 from "@/assets/work-media/work-1.webp";
import w2 from "@/assets/work-media/work-2.png";
import w3 from "@/assets/work-media/work-3.webp";
import w4 from "@/assets/work-media/work-4.webp";
import w5 from "@/assets/work-media/work-5.webp";
import w6 from "@/assets/work-media/work-6.webp";
import w7 from "@/assets/work-media/work-7.webp";
import w8 from "@/assets/work-media/work-8.webp";
import w9 from "@/assets/work-media/work-9.webp";
import w10 from "@/assets/work-media/work-10.webp";
import w11 from "@/assets/work-media/work-11.webp";
import w12 from "@/assets/work-media/work-12.webp";
import w13 from "@/assets/work-media/work-13.webp";
import v11 from "@/assets/work-media/work-11.mp4";
const v12 = { url: "/videos/12-architectural-film-16-9-web.mp4" };
const v13 = { url: "/videos/13-Cosmic-clip-9-16-web.mp4" };

export type Discipline = string;

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
  /** Fill the frame (crop edges) instead of fitting the whole picture. */
  fill?: boolean;
  /** Optional video; images[0] is its cover picture. Plays only in the overlay. */
  video?: string;
  /** Video running time, e.g. "01:27". */
  duration?: string;
  year?: number;
  /** Optional real editorial fields for the static overlay — render only when set. */
  client?: string;
  role?: string;
  services?: string[];
  format?: string;
  lead?: string;
  description?: string[];
  caption?: string;
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
  withImage(ph("a1", "01", "A", "9:16", "Poster Design"), "Hair Salon Poster", w1),
  withImage(ph("a2", "02", "A", "16:9", "Outdoor Advertising"), "Davines — 100% Vitality", w2),
  withImage(ph("a3", "03", "A", "9:16", "Book Cover Design"), "Botyo Bukov Book", w3),
  withImage(ph("a4", "04", "A", "16:9", "Calendar Head Design"), "Aspen Invest Calendar", w4),
  withImage(ph("b1", "05", "B", "16:9", "Institutional Design"), "Bulgarian National Audit Office Calendar", w5),
  withImage(ph("b2", "06", "B", "9:16", "Experimental Design"), "Color Geometry Study", w6),
  withImage(ph("b3", "07", "B", "16:9", "Illustration"), "Geometric Study", w7),
  withImage(ph("c1", "08", "C", "9:16", "Flyer Design"), "University of Forestry Flyer", w8),
  withImage(ph("c2", "09", "C", "16:9", "Brand Identity"), "Aleksandar Tonev Identity", w9),
  withImage(ph("c3", "10", "C", "9:16", "Brand Collateral"), "Cosmetics Business Card", w10),
  { ...withImage(ph("d1", "11", "D", "16:9", "Motion Design"), "Motion Study", w11), video: v11, duration: "00:28" },
  { ...withImage(ph("d2", "12", "D", "16:9", "AI Video / Architecture"), "Architectural Film", w12), video: v12.url, fill: true, duration: "01:27" },
  { ...ph("stop-motion-study", "13", "D", "16:9", "Motion Design"), title: "Stop Motion Study", alt: "Stop Motion Study", video: "/videos/stop-motion-16-9.mp4" },
  { ...withImage(ph("d3", "13", "D", "9:16", "AI Video / Experimental"), "Cosmic", w13), video: v13.url, duration: "01:08" },
];

export const PROJECT_TOTAL = 14;
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

/** Static projects 01–10 (no video), in numerical order, for the editorial overlay. */
export const staticProjects = projects.filter((p) => !p.video);

/** Video projects 11–13, in order, for the video overlay. */
export const videoProjects = projects.filter((p) => p.video);
