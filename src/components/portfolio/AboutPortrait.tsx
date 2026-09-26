import { useEffect, useRef, useState } from "react";
import duo from "@/assets/about-duotone.webp.asset.json";
import col from "@/assets/about-color.webp.asset.json";

const clip = (v: string) => `polygon(100% 100%, 100% ${v}, ${v} 100%)`;
const HIDDEN = clip("100%");
const FULL = clip("-100%");
const HINT = clip("80%");

export function AboutPortrait() {
  const ref = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);
  const [locked, setLocked] = useState(false);
  const [hint, setHint] = useState(false);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const touched = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    const near = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setLoad(true); near.disconnect(); } }, { rootMargin: "600px" });
    const seen = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      seen.disconnect();
      if (reduce) return;
      timers.push(window.setTimeout(() => { if (!touched.current) setHint(true); }, 500));
      timers.push(window.setTimeout(() => setHint(false), 500 + 400 + 250));
    }, { threshold: 0.5 });
    near.observe(el);
    seen.observe(el);
    return () => { near.disconnect(); seen.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  const active = locked || hover;
  const path = active ? FULL : hint ? HINT : HIDDEN;

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={locked}
      aria-label={locked ? "Show stylised portrait" : "Reveal colour portrait"}
      onClick={() => { touched.current = true; setHint(false); setLocked((l) => !l); if (locked) setHover(false); }}
      onPointerEnter={(e) => { if (e.pointerType === "mouse") { touched.current = true; setHint(false); setHover(true); } }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") setHover(false); }}
      className="portrait group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden bg-foreground/10 text-left"
    >
      {load && (
        <>
          <img src={duo.url} alt="Portrait of Aleksandar Tonev" onLoad={() => setReady(true)} className="absolute inset-0 h-full w-full object-cover object-center" />
          {ready && (
            <img src={col.url} alt="" aria-hidden="true" className="portrait-color absolute inset-0 h-full w-full object-cover object-center" style={{ clipPath: path, opacity: path === HIDDEN ? undefined : 1 }} data-on={path !== HIDDEN} />
          )}
        </>
      )}
      <span aria-hidden="true" className="portrait-cue pointer-events-none absolute bottom-0 right-0 h-24 w-24" />
      <span className="portrait-ctl absolute bottom-3 right-3 flex min-h-12 min-w-12 items-center gap-2 px-3 font-mono text-[11px] uppercase tracking-wider">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" /><path d="M8 1a7 7 0 0 1 0 14z" fill="currentColor" /></svg>
        {active ? "Stylised" : "Reveal"}
      </span>
    </button>
  );
}
