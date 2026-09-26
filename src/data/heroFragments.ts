// Hero flower fragments — the single place to adjust placement.
// Positions are initial art direction; refine visually as needed.
export type HeroFragment = {
  id: string;
  src: string;
  size: "small-1" | "small-2" | "small-3" | "large-1" | "large-2";
  position: { top?: string; right?: string; bottom?: string; left?: string };
  rotation: number;
  triggerZone: "top-left" | "top-right" | "center" | "bottom-left" | "bottom-right";
  fadeEdge: "top" | "right" | "bottom" | "left";
  /** Entrance offset [x, y] (8–12px). */
  enter: [string, string];
  /** Shown statically on touch / coarse-pointer devices. */
  showOnMobile?: boolean;
};

export const heroFragments: HeroFragment[] = [
  { id: "f1", src: "/images/hero/fragment-1.svg", size: "small-1", position: { top: "8%", left: "30%" }, rotation: 12, triggerZone: "top-left", fadeEdge: "bottom", enter: ["0px", "10px"] },
  { id: "f2", src: "/images/hero/fragment-2.svg", size: "small-2", position: { top: "-4%", right: "22%" }, rotation: -8, triggerZone: "top-right", fadeEdge: "left", enter: ["10px", "0px"], showOnMobile: true },
  { id: "f3", src: "/images/hero/fragment-3.svg", size: "small-3", position: { bottom: "6%", right: "34%" }, rotation: 6, triggerZone: "center", fadeEdge: "top", enter: ["0px", "-10px"] },
  { id: "f4", src: "/images/hero/fragment-4.svg", size: "large-1", position: { bottom: "4%", left: "-8%" }, rotation: -14, triggerZone: "bottom-left", fadeEdge: "left", enter: ["10px", "0px"] },
  { id: "f5", src: "/images/hero/fragment-5.svg", size: "large-2", position: { bottom: "-12%", right: "-6%" }, rotation: 0, triggerZone: "bottom-right", fadeEdge: "right", enter: ["-10px", "10px"], showOnMobile: true },
];
