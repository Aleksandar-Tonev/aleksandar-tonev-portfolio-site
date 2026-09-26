import { useEffect, useRef, useState } from "react";
import { heroFragments } from "@/data/heroFragments";

/**
 * Decorative flower fragments behind the Hero. Pointer position on the parent
 * Hero picks one of five broad regions; only that region's fragment shows.
 * Pure decoration: aria-hidden, pointer-events none, nothing focusable.
 */
export function HeroFlowerInteraction() {
  const layer = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const current = useRef<string | null>(null);

  useEffect(() => {
    const hero = layer.current?.parentElement;
    if (!hero) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const set = (id: string | null) => {
      if (current.current === id) return; // no re-render inside same region
      current.current = id;
      setActive(id);
    };
    const move = (e: PointerEvent) => {
      if (!fine.matches || e.pointerType !== "mouse") return;
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const zone = x > 0.36 && x < 0.64 && y > 0.3 && y < 0.7
        ? "center"
        : `${y < 0.5 ? "top" : "bottom"}-${x < 0.5 ? "left" : "right"}`;
      set(heroFragments.find((f) => f.triggerZone === zone)?.id ?? null);
    };
    const leave = () => set(null);
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => {
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={layer} aria-hidden="true" className="hero-flower-layer">
      {heroFragments.map((f) => (
        <img
          key={f.id}
          src={f.src}
          alt=""
          draggable={false}
          className={`hero-flower-fragment hero-flower-fragment--fade-${f.fadeEdge}${f.showOnMobile ? " is-mobile" : ""}${active === f.id ? " is-active" : ""}`}
          style={{
            width: `var(--fragment-${f.size})`,
            ...f.position,
            ["--resting-rotation" as string]: `${f.rotation - 2}deg`,
            ["--active-rotation" as string]: `${f.rotation}deg`,
            ["--enter-x" as string]: f.enter[0],
            ["--enter-y" as string]: f.enter[1],
          }}
        />
      ))}
    </div>
  );
}
