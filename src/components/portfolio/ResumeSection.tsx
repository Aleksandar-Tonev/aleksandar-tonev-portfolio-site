import { useEffect, useRef, useState } from "react";
import { resume } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { afterWipe } from "./PageTransition";
import { SectionNumber } from "./SectionHeading";

const COUNT_MS = 700;

/** Compact dark résumé teaser. The 15+ entrance replays on every genuine entry (≥50% visible), rearming below 12%. */
export function ResumeSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [count, setCount] = useState(15);
  const raf = useRef(0);
  const { t } = useI18n();
  const r = t.resume;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setInView(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return setInView(true);
    let armed = true;
    const start = () => {
      setInView(true);
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / COUNT_MS);
        setCount(Math.round(15 * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf.current = requestAnimationFrame(tick);
      };
      cancelAnimationFrame(raf.current);
      setCount(0);
      raf.current = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e) return;
        // Tall sections can never reach 50% of themselves; use viewport coverage too.
        const cover = e.intersectionRect.height / window.innerHeight;
        const r = Math.max(e.intersectionRatio, cover);
        if (armed && r >= 0.5) { armed = false; afterWipe(start); }
        else if (!armed && r < 0.12) { armed = true; setInView(false); }
      },
      { threshold: [0, 0.05, 0.1, 0.12, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1] },
    );
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf.current); };
  }, []);

  const rest = r.statement[0].split(" ").slice(1).join(" ");

  return (
    <section
      ref={ref}
      id="resume"
      data-section
      aria-labelledby="resume-h"
      data-in={inView ? "true" : "false"}
      className="resume bg-foreground text-background"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-5 gap-y-10 px-5 py-20 md:px-10 md:py-28">
        <div className="enter col-span-12 lg:col-span-7">
          <SectionNumber number="03" tone="resume" />
          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-background/70">
            <span className="text-accent" aria-hidden="true">■</span> {r.label}
          </p>
          <h2
            id="resume-h"
            aria-label={`${r.statement[0]} ${r.statement[1]}`}
            className="mt-6 font-display text-[clamp(2.75rem,8vw,7.5rem)] font-bold uppercase leading-[0.9] tracking-tight"
          >
            <span aria-hidden="true">
              <span className="text-accent tabular-nums">{count}<span className="resume-plus" data-on={count === 15 ? "1" : "0"}>+</span></span>{" "}
              <span className="resume-clip"><span className="resume-rv resume-rv-b">{rest}</span></span>
              <br />
              <span className="resume-clip"><span className="resume-rv resume-rv-c">{r.statement[1]}</span></span>
            </span>
          </h2>
        </div>

        <div className="enter-2 col-span-12 md:col-span-8 md:col-start-5 lg:col-span-4 lg:col-start-9 lg:pt-24">
          <p className="resume-signal text-base leading-relaxed" style={{ animationDelay: "250ms" }}>{r.paragraph}</p>
          <ul className="mt-8 border-t border-background/20">
            {r.signals.map((s, i) => (
              <li
                key={s}
                className="resume-signal border-b border-background/20 py-3 font-mono text-xs uppercase tracking-wider text-background/70"
                style={{ animationDelay: `${350 + i * 80}ms` }}
              >
                {s}
              </li>
            ))}
          </ul>
          <ul className="resume-signal mt-10 border-t border-background/20" style={{ animationDelay: "650ms" }}>
            {resume.cvFiles.map((file) => (
              <li
                key={file.id}
                className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-background/20 py-4"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-background/70">{r.files[file.id]}</span>
                <span className="flex flex-wrap gap-3">
                  <a
                    href={file.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${r.preview} — ${r.files[file.id]} (${r.newTab})`}
                    className="resume-btn resume-btn-secondary resume-btn-sm"
                  >
                    {r.preview} <span aria-hidden="true" className="resume-arrow">↗</span>
                  </a>
                  <a
                    href={file.href}
                    download={file.filename}
                    aria-label={`${r.download} — ${r.files[file.id]}`}
                    className="resume-btn resume-btn-primary resume-btn-sm"
                  >
                    {r.download} <span aria-hidden="true" className="resume-arrow">↓</span>
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
