import { useEffect, useRef, useState } from "react";
import {
  heroFragmentSrc,
  heroFragmentsDesktop,
  heroFragmentsMobile,
  heroFragmentsTablet,
  type FragmentInstance,
} from "@/data/heroFragments";

/**
 * Decorative flower fragments behind the Hero. All shown for 1.5s, then each
 * runs its own fixed, looping opacity cycle (CSS) so they never pulse in unison.
 * Paused while the Hero is off screen. Reduced motion: static, fully shown.
 */
export function HeroFlowerInteraction() {
  const ref = useRef<HTMLDivElement>(null);
  const [cycling, setCycling] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setCycling(true), 1500);
    const el = ref.current;
    const io = el
      ? new IntersectionObserver(([e]) => setPaused(!e?.isIntersecting), { rootMargin: "200px" })
      : null;
    if (el && io) io.observe(el);
    return () => {
      window.clearTimeout(t);
      io?.disconnect();
    };
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
    <div
      ref={ref}
      aria-hidden="true"
      className={`hero-flower-layer${cycling ? " is-cycling" : ""}${paused ? " is-paused" : ""}`}
    >
      {render(heroFragmentsDesktop, "d")}
      {render(heroFragmentsTablet, "t")}
      {render(heroFragmentsMobile, "m")}
    </div>
  );
}
