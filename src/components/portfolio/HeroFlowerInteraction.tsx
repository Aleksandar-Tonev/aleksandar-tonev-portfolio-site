import { useEffect, useRef } from "react";
import {
  heroFragmentSrc,
  heroFragmentsDesktop,
  heroFragmentsMobile,
  heroFragmentsTablet,
  type FragmentInstance,
} from "@/data/heroFragments";

/**
 * Decorative flower fragments behind the Hero. One 5s sequence per visit:
 * all shown at load, subtle asynchronous blinks, then one-by-one fade-outs
 * ending at exactly 5s. They stay hidden afterwards. The component remounts
 * when the visitor returns to Home, which restarts the sequence.
 * Reduced motion: static for 5s, then one short fade of the whole layer.
 */
export function HeroFlowerInteraction() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    const t = window.setTimeout(() => el?.classList.add("is-done"), 5000);
    return () => window.clearTimeout(t);
  }, []);

  const render = (list: FragmentInstance[], bp: string) =>
    list.map((f, i) => (
      <img
        key={f.id}
        src={heroFragmentSrc}
        alt=""
        draggable={false}
        className={`hero-flower-fragment hero-flower-bp-${bp} hero-flower-fragment--fade-${f.fadeEdge} hero-flower-slot-${(i % 5) + 1}`}
        style={{ width: f.width, ...f.position, ["--active-rotation" as string]: `${f.rotation}deg` }}
      />
    ));

  return (
    <div ref={ref} aria-hidden="true" className="hero-flower-layer">
      {render(heroFragmentsDesktop, "d")}
      {render(heroFragmentsTablet, "t")}
      {render(heroFragmentsMobile, "m")}
    </div>
  );
}
