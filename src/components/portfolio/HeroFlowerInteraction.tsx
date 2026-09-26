import { useEffect, useState } from "react";
import {
  heroFragmentSrc,
  heroFragmentsDesktop,
  heroFragmentsMobile,
  heroFragmentsTablet,
  type FragmentInstance,
} from "@/data/heroFragments";

/**
 * Decorative flower fragments behind the Hero. Plays once (5s): fade in,
 * soft irregular flicker, fade out to invisible. No pointer/scroll input.
 * Reduced motion: stays invisible.
 */
export function HeroFlowerInteraction() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPlay(true);
  }, []);

  if (!play) return <div aria-hidden="true" className="hero-flower-layer" />;

  const render = (list: FragmentInstance[], bp: string) =>
    list.map((f) => (
      <img
        key={f.id}
        src={heroFragmentSrc}
        alt=""
        draggable={false}
        className={`hero-flower-fragment hero-flower-bp-${bp} hero-flower-fragment--fade-${f.fadeEdge} hero-flower-play-${f.variant}`}
        style={{ width: f.width, ...f.position, ["--active-rotation" as string]: `${f.rotation}deg` }}
      />
    ));

  return (
    <div aria-hidden="true" className="hero-flower-layer">
      {render(heroFragmentsDesktop, "d")}
      {render(heroFragmentsTablet, "t")}
      {render(heroFragmentsMobile, "m")}
    </div>
  );
}
