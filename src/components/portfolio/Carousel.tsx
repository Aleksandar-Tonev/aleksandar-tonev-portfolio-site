import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { Media } from "./Media";

export interface Slot {
  ratio: string;
  /** Vertical offset on desktop, e.g. "0rem" — stays fixed during navigation. */
  offset: string;
  /** Tailwind column span classes. */
  span: string;
  /** Visibility: slot 0 always; others shown from md / lg up. */
  from?: "md" | "lg";
}

const DURATION = 500;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

export function Carousel({
  id,
  label,
  projects,
  slots,
  onOpen,
}: {
  id: string;
  label: string;
  projects: Project[];
  slots: Slot[];
  onOpen: (p: Project, trigger: HTMLElement) => void;
}) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [tick, setTick] = useState(0);
  const locked = useRef(false);
  const reduced = usePrefersReducedMotion();
  const touchX = useRef<number | null>(null);
  const n = projects.length;

  const go = (d: 1 | -1) => {
    if (locked.current) return;
    locked.current = true;
    setDir(d);
    setIndex((i) => (i + d + n) % n);
    setTick((t) => t + 1);
    window.setTimeout(() => (locked.current = false), reduced ? 0 : DURATION);
  };

  const anim =
    tick === 0 || reduced ? "" : dir === 1 ? "animate-slot-next" : "animate-slot-prev";

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className="relative"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="mb-5 flex items-end justify-between gap-4 border-t border-foreground pt-3">
        <p className="font-mono text-xs uppercase tracking-wider">
          <span className="text-accent">{id}</span> — {label}
        </p>
        <div className="flex items-center gap-3">
          <p className="font-mono text-xs tabular-nums" aria-live="polite">
            <span className="sr-only">Showing project </span>
            {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>
          <button type="button" onClick={() => go(-1)} className="nav-btn" aria-label={`Previous project in group ${id}`}>
            ←
          </button>
          <button type="button" onClick={() => go(1)} className="nav-btn" aria-label={`Next project in group ${id}`}>
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-x-5 gap-y-8">
        {slots.map((slot, s) => {
          const p = projects[(index + s) % n];
          const vis = slot.from === "lg" ? "hidden lg:block" : slot.from === "md" ? "hidden md:block" : "";
          return (
            <div
              key={s}
              className={`${slot.span} ${vis} md:[margin-top:var(--off)]`}
              style={{ ["--off" as string]: slot.offset, animationDelay: `${s * 40}ms` }}
            >
              <button
                key={`${p.id}-${tick}`}
                type="button"
                onClick={(e) => onOpen(p, e.currentTarget)}
                aria-haspopup="dialog"
                className={`group block w-full text-left ${anim}`}
                style={{ animationDelay: `${s * 40}ms` }}
              >
                <Media project={p} ratio={slot.ratio} />
                <span className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="font-display text-lg uppercase leading-tight group-hover:text-accent group-focus-visible:text-accent">
                    {p.title}
                  </span>
                  <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {p.category}
                  </span>
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
