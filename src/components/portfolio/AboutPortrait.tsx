import { useCallback, useEffect, useRef, useState } from "react";
import duo from "@/assets/about-duotone.webp.asset.json";
import col from "@/assets/about-color.webp.asset.json";

/** Diagonal boundary rising from lower-left to upper-right; colour sits below it. y = boundary height at centre. */
const band = (y: number) => `polygon(0% 100%, 100% 100%, 100% ${y - 10}%, 0% ${y + 10}%)`;
const REST = band(75); // 25% above the bottom edge
const HINT = band(50); // another 25% upward
const FULL = band(-20);

export function AboutPortrait() {
  const ref = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);
  const [locked, setLocked] = useState(false);
  const [hint, setHint] = useState(false);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const touched = useRef(false);
  const running = useRef(false);
  const timers = useRef<number[]>([]);

  const runHint = useCallback(() => {
    if (touched.current || running.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    running.current = true;
    timers.current.push(window.setTimeout(() => { if (!touched.current) setHint(true); }, 350));
    timers.current.push(window.setTimeout(() => setHint(false), 350 + 600 + 200));
    timers.current.push(window.setTimeout(() => { running.current = false; }, 350 + 600 + 200 + 600));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const near = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setLoad(true); near.disconnect(); } }, { rootMargin: "600px" });
    let wasIn = false;
    const seen = new IntersectionObserver(([e]) => {
      const isIn = !!e?.isIntersecting;
      if (isIn && !wasIn) runHint();
      wasIn = isIn;
    }, { threshold: 0.4 });
    near.observe(el);
    seen.observe(el);
    const t = timers.current;
    return () => { near.disconnect(); seen.disconnect(); t.forEach(clearTimeout); };
  }, [runHint]);

  const active = locked || hover;
  const path = active ? FULL : hint ? HINT : REST;
  const stop = () => { touched.current = true; setHint(false); };

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={locked}
      aria-label={active ? "Show duotone portrait" : "Show full-colour portrait"}
      onClick={() => { stop(); setLocked((l) => !l); if (locked) setHover(false); }}
      onPointerEnter={(e) => { if (e.pointerType === "mouse") { stop(); setHover(true); } }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") setHover(false); }}
      className="portrait group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden bg-foreground/10 text-left"
    >
      {load && (
        <>
          <img src={duo.url} alt="Portrait of Aleksandar Tonev" onLoad={() => { setReady(true); runHint(); }} className="absolute inset-0 h-full w-full object-cover object-center" />
          {ready && (
            <img
              src={col.url}
              alt=""
              aria-hidden="true"
              className="portrait-color absolute inset-0 h-full w-full object-cover object-center"
              style={{ clipPath: path, transitionDuration: hint || running.current ? "600ms" : "550ms" }}
              data-on={active}
            />
          )}
        </>
      )}
      <span className="portrait-ctl absolute bottom-3 right-3 flex min-h-12 min-w-12 items-center gap-2 px-3 font-mono text-[11px] uppercase tracking-wider">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" /><path d="M8 1a7 7 0 0 1 0 14z" fill="currentColor" /></svg>
        {active ? "Full color" : "Reveal"}
      </span>
    </button>
  );
}
