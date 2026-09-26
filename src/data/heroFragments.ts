// Hero flower fragments — the single place to adjust placement.
// One artwork (fragment-1.svg) repeated at several sizes. Each breakpoint has
// its own list so instances never overlap each other or the hero text.
export type FragmentInstance = {
  id: string;
  width: string;
  position: { top?: string; right?: string; bottom?: string; left?: string };
  rotation: number;
  fadeEdge: "top" | "right" | "bottom" | "left";
  /** Which flicker curve to use, so instances don't pulse in unison. */
  variant: 1 | 2 | 3;
};

export const heroFragmentSrc = "/images/hero/fragment-1.svg";

// Desktop (≥1024px): positions are relative to the full browser width, not the content column.
// headline spans the upper band; intro sits cols 4–7.
// Free areas: top-right corner, left column under the descriptor, bottom-left, bottom-right.
export const heroFragmentsDesktop: FragmentInstance[] = [
  { id: "d1", width: "9rem", position: { top: "-2%", right: "4%" }, rotation: -8, fadeEdge: "left", variant: 1 },
  { id: "d2", width: "8rem", position: { top: "34%", left: "1.5rem" }, rotation: 12, fadeEdge: "bottom", variant: 2 },
  { id: "d3", width: "14rem", position: { bottom: "8%", left: "0.75rem" }, rotation: -14, fadeEdge: "left", variant: 3 },
  { id: "d4", width: "16.8rem", position: { bottom: "8%", right: "0.75rem" }, rotation: 4, fadeEdge: "right", variant: 1 },
  // Above the headline, and in the gap after "INTENT."
  { id: "d5", width: "6.5rem", position: { top: "0.5rem", left: "44%" }, rotation: 10, fadeEdge: "top", variant: 2 },
  { id: "d6", width: "8rem", position: { top: "18rem", left: "61%" }, rotation: -6, fadeEdge: "bottom", variant: 3 },
];

// Tablet (768–1023px): fewer, smaller instances kept to the edges.
export const heroFragmentsTablet: FragmentInstance[] = [
  { id: "t1", width: "7rem", position: { top: "-4%", right: "3%" }, rotation: -8, fadeEdge: "left", variant: 2 },
  { id: "t2", width: "14rem", position: { bottom: "-16%", left: "-8%" }, rotation: -14, fadeEdge: "left", variant: 1 },
  { id: "t3", width: "16rem", position: { bottom: "-20%", right: "-8%" }, rotation: 4, fadeEdge: "right", variant: 3 },
];

// Mobile (<768px): two small instances in the top and bottom padding only.
export const heroFragmentsMobile: FragmentInstance[] = [
  { id: "m1", width: "4.5rem", position: { top: "0.25rem", right: "0" }, rotation: -8, fadeEdge: "left", variant: 1 },
  { id: "m2", width: "7rem", position: { bottom: "-3.5rem", right: "-1.5rem" }, rotation: 4, fadeEdge: "right", variant: 2 },
];
