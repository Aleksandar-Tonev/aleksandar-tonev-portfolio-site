import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { Media } from "./Media";

/**
 * Reusable editorial carousel. Owns its own index, direction and animation state.
 * Timing, stagger and slot layout are tuned here / via the `slots` prop.
 */
export const OUT_MS = 180; // outgoing fade/slide
export const IN_MS = 200; // incoming fade/slide per card
export const STAGGER_MS = 60; // delay between cards on entry

export interface EditorialSlot {
  /** Reserved frame ratio; projects fit inside at their own 9:16 / 16:9 ratio. */
  frame: string;
  /** Tailwind column span classes (12-col grid). */
  span: string;
  /** Vertical offset at tablet (md) and desktop (lg). Stable across navigation. */
  offsetMd: string;
  offsetLg: string;
}

type Direction = "next" | "previous" | null;
type Phase = "idle" | "out" | "in";

function useMedia(q: string) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const fn = () => setM(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, [q]);
  return m;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function CarouselGroup({
  id,
  label,
  projects,
  slots,
  visibleCount = 3,
  onProjectOpen,
}: {
  id: string;
  label: string;
  projects: Project[];
  slots: EditorialSlot[];
  visibleCount?: number;
  onProjectOpen: (project: Project, trigger: HTMLElement) => void;
}) {
  const n = projects.length;
  const [currentIndex, setIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const isAnimating = phase !== "idle";
  const timers = useRef<number[]>([]);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const isLg = useMedia("(min-width: 1024px)");
  const isMd = useMedia("(min-width: 768px)");

  const maxSlots = Math.min(visibleCount, slots.length, n);
  const shown = Math.min(maxSlots, isLg ? 3 : isMd ? 2 : 1);
  const canNavigate = n > 1;
  const headingId = `carousel-${id.toLowerCase()}-heading`;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const go = (d: "next" | "previous") => {
    if (isAnimating || !canNavigate) return;
    const step = d === "next" ? 1 : -1;
    const apply = () => setIndex((i) => (i + step + n) % n);
    if (reduced) return apply();
    setDirection(d);
    setPhase("out");
    timers.current.push(
      window.setTimeout(() => {
        apply();
        setPhase("in");
      }, OUT_MS),
      window.setTimeout(() => {
        setPhase("idle");
        setDirection(null);
      }, OUT_MS + IN_MS + STAGGER_MS * (maxSlots - 1)),
    );
  };

  const animClass =
    phase === "out"
      ? direction === "next" ? "animate-card-out-left" : "animate-card-out-right"
      : phase === "in"
        ? direction === "next" ? "animate-card-in-right" : "animate-card-in-left"
        : "";

  const first = currentIndex + 1;
  const last = ((currentIndex + shown - 1) % n) + 1;
  const range = shown > 1 ? `${pad(first)} — ${pad(last)}` : pad(first);

  return (
    <section
      aria-roledescription="carousel"
      aria-labelledby={headingId}
      className="relative"
      onKeyDown={(e) => {
        // Arrow keys only while focus is inside this carousel (not global).
        if (e.key === "ArrowRight") go("next");
        if (e.key === "ArrowLeft") go("previous");
      }}
      onTouchStart={(e) => (touch.current = { x: e.touches[0]!.clientX, y: e.touches[0]!.clientY })}
      onTouchEnd={(e) => {
        const t = touch.current;
        touch.current = null;
        if (!t) return;
        const dx = e.changedTouches[0]!.clientX - t.x;
        const dy = e.changedTouches[0]!.clientY - t.y;
        dragged.current = Math.abs(dx) > 10 || Math.abs(dy) > 10;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? "next" : "previous");
      }}
    >
      <div className="mb-5 flex items-end justify-between gap-4 border-t border-foreground pt-3">
        <h3 id={headingId} tabIndex={-1} className="font-mono text-xs uppercase tracking-wider outline-none focus-visible:outline-2 focus-visible:outline-accent">
          <span className="text-accent">{id}</span> — {label}
        </h3>
        <p className="font-mono text-xs tabular-nums" aria-hidden>
          {range} / {pad(n)}
        </p>
        <p className="sr-only" aria-live="polite">
          {shown > 1
            ? `Showing projects ${first} to ${last} of ${n} in group ${id}.`
            : `Showing project ${first} of ${n} in group ${id}.`}
        </p>
      </div>

      <div className="relative">
      <div className="grid grid-cols-12 gap-x-5 gap-y-8" aria-busy={isAnimating}>
        {slots.slice(0, maxSlots).map((slot, s) => {
          const p = projects[(currentIndex + s) % n]!;
          const vis = s === 1 ? "hidden md:block" : s >= 2 ? "hidden lg:block" : "";
          return (
            <div
              key={s}
              className={`${slot.span} ${vis} md:[margin-top:var(--om)] lg:[margin-top:var(--ol)]`}
              style={{ ["--om" as string]: slot.offsetMd, ["--ol" as string]: slot.offsetLg }}
            >
              <button
                type="button"
                onClick={(e) => {
                  // A drag/swipe must never open (or play) a project.
                  if (dragged.current) { dragged.current = false; return; }
                  onProjectOpen(p, e.currentTarget);
                }}
                aria-haspopup="dialog"
                disabled={phase === "out"}
                className={`group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${animClass}`}
                style={{ animationDelay: phase === "in" ? `${s * STAGGER_MS}ms` : undefined }}
              >
                <Media project={p} ratio={slot.frame} eager thumb={!p.video} videoThumb={!!p.video} />
                <span className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="font-display text-lg uppercase leading-tight underline-offset-4 group-hover:text-accent group-hover:underline group-focus-visible:text-accent">
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
      {canNavigate && isLg && (
        <>
          <ArrowBtn dir="previous" disabled={atStart || isAnimating} onClick={() => go("previous")} className="absolute left-5 top-1/2 z-10 -translate-y-1/2" />
          <ArrowBtn dir="next" disabled={atEnd || isAnimating} onClick={() => go("next")} className="absolute right-5 top-1/2 z-10 -translate-y-1/2" />
        </>
      )}
      </div>

      {canNavigate && !isLg && (
        <div className="mt-6 flex items-center justify-center gap-5">
          <ArrowBtn dir="previous" disabled={atStart || isAnimating} onClick={() => go("previous")} />
          <p className="font-mono text-xs tabular-nums" aria-hidden>{range} / {pad(n)}</p>
          <ArrowBtn dir="next" disabled={atEnd || isAnimating} onClick={() => go("next")} />
        </div>
      )}
    </section>
  );
}

function ArrowBtn({ dir, disabled, onClick, className = "" }: { dir: "next" | "previous"; disabled: boolean; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      data-dir={dir}
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "next" ? "Next project" : "Previous project"}
      className={`carousel-arrow ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden style={dir === "previous" ? { rotate: "180deg" } : undefined}>
        <path d="M3 12h17M14 6l6 6-6 6" strokeLinecap="square" />
      </svg>
    </button>
  );
}
