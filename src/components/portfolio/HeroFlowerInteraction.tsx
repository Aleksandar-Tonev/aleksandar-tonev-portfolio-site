import { useEffect, useState } from "react";
import { heroFragments, heroSequence } from "@/data/heroFragments";

/**
 * Decorative flower fragments behind the Hero. A timed, non-looping sequence
 * plays once on load, then settles into a fixed composition. No pointer input.
 * Pure decoration: aria-hidden, pointer-events none, nothing focusable.
 */
export function HeroFlowerInteraction() {
  const [active, setActive] = useState<string[]>([]);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 767px), (hover: none), (pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seq = small ? heroSequence.mobile : heroSequence.desktop;
    const final = small ? heroSequence.mobileFinal : heroSequence.desktopFinal;
    if (reduced) return setActive(final);
    const timers: number[] = [];
    const step = heroSequence.holdMs + heroSequence.blinkMs;
    seq.forEach((s, i) => timers.push(window.setTimeout(() => setActive(s), i * step)));
    timers.push(window.setTimeout(() => setActive(final), seq.length * step));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div aria-hidden="true" className="hero-flower-layer">
      {heroFragments.map((f) => (
        <img
          key={f.id}
          src={f.src}
          alt=""
          draggable={false}
          className={`hero-flower-fragment hero-flower-fragment--fade-${f.fadeEdge}${active.includes(f.id) ? " is-active" : ""}`}
          style={{
            width: `var(--fragment-${f.size})`,
            ...f.position,
            ["--active-rotation" as string]: `${f.rotation}deg`,
          }}
        />
      ))}
    </div>
  );
}
