import { useCallback, useEffect, useRef, useState } from "react";
import duo from "@/assets/about-duotone.webp";
import col from "@/assets/about-color.webp";
import { afterWipe } from "./PageTransition";
import { useI18n } from "@/lib/i18n";

/** Diagonal boundary rising from lower-left to upper-right; colour sits below it. y = boundary height at centre. */
const band = (y: number) => `polygon(0% 100%, 100% 100%, 100% ${y - 10}%, 0% ${y + 10}%)`;
const HIDDEN = band(115); // fully duotone
const FULL = band(-20);

export function AboutPortrait() {
  const ref = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);
  const [locked, setLocked] = useState(false);
  const [hint, setHint] = useState(false);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const touched = useRef(false);
  const { t } = useI18n();
  const running = useRef(false);
  const timers = useRef<number[]>([]);

  const runHint = useCallback(() => {
    if (touched.current || running.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    running.current = true;
    timers.current.push(window.setTimeout(() => { if (!touched.current) setHint(true); }, 350));
    timers.current.push(window.setTimeout(() => setHint(false), 1350));
    timers.current.push(window.setTimeout(() => { running.current = false; }, 2350));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const near = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setLoad(true); near.disconnect(); } }, { rootMargin: "600px" });
    let wasIn = false;
    const seen = new IntersectionObserver(([e]) => {
      const isIn = !!e?.isIntersecting;
      if (isIn && !wasIn) afterWipe(runHint);
      wasIn = isIn;
    }, { threshold: 0.4 });
    near.observe(el);
    seen.observe(el);
    const t = timers.current;
    return () => { near.disconnect(); seen.disconnect(); t.forEach(clearTimeout); };
  }, [runHint]);

  const active = locked || hover;
  const path = active ? FULL : HIDDEN;
  const lineY = active ? "-95%" : hint ? "-50%" : "0%";
  const stop = () => { touched.current = true; setHint(false); };

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={locked}
      aria-label={active ? t.about.showDuo : t.about.showColor}
      onClick={() => { stop(); setLocked((l) => !l); if (locked) setHover(false); }}
      onPointerEnter={(e) => { if (e.pointerType === "mouse") { stop(); setHover(true); } }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") setHover(false); }}
      className="portrait group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden bg-foreground/10 text-left"
    >
      {load && (
        <>
          <img src={duo} alt={t.about.portraitAlt} onLoad={() => { setReady(true); afterWipe(runHint); }} className="absolute inset-0 h-full w-full object-cover object-center" />
          {ready && (
            <img
              src={col}
              alt=""
              aria-hidden="true"
              className="portrait-color absolute inset-0 h-full w-full object-cover object-center"
              style={{ clipPath: path }}
              data-on={active}
            />
          )}
        </>
      )}
      <span
        aria-hidden="true"
        className="portrait-line pointer-events-none absolute inset-0"
        style={{ transform: `translateY(${lineY})`, transitionDuration: hint || running.current ? "1000ms" : "550ms" }}
      >
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="85" x2="100" y2="65" stroke="white" strokeOpacity="0.85" strokeWidth="1" vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" />
        </svg>
      </span>
      <span className="portrait-ctl absolute bottom-3 right-3 flex min-h-12 min-w-12 items-center gap-2 px-3 font-mono text-[11px] uppercase tracking-wider">
        {!active && <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" /><path d="M8 1a7 7 0 0 1 0 14z" fill="currentColor" /></svg>}
        {active ? t.about.full : t.about.reveal}
      </span>
    </button>
  );
}
