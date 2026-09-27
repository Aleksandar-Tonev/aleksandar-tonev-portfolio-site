import { useEffect, useRef, useState } from "react";
import { resume } from "@/data/site";
import { afterWipe } from "./PageTransition";

export function ResumeSection({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const H = heading;
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setInView(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          afterWipe(() => setInView(true));
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="resume"
      aria-labelledby="resume-h"
      data-in={inView ? "true" : "false"}
      className="resume scroll-mt-16 bg-foreground text-background"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-5 gap-y-10 px-5 py-20 md:px-10 md:py-28">
        <div className="col-span-12 lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-wider text-background/70">
            <span className="text-accent" aria-hidden="true">■</span> {resume.label}
          </p>
          <H
            id="resume-h"
            className="mt-6 font-display text-[clamp(2.75rem,8vw,7.5rem)] font-bold uppercase leading-[0.9] tracking-tight"
          >
            <span className="resume-clip">
              <span className="resume-rv resume-rv-a text-accent">{resume.statement[0].split(" ")[0] ?? ""}</span>
            </span>{" "}
            <span className="resume-clip">
              <span className="resume-rv resume-rv-b">{resume.statement[0].split(" ").slice(1).join(" ")}</span>
            </span>
            <br />
            <span className="resume-clip">
              <span className="resume-rv resume-rv-b">{resume.statement[1]}</span>
            </span>
          </H>
        </div>

        <div className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-4 lg:col-start-9 lg:pt-24">
          <p className="text-base leading-relaxed">{resume.paragraph}</p>
          <ul className="mt-8 border-t border-background/20">
            {resume.signals.map((s, i) => (
              <li
                key={s}
                className="resume-signal border-b border-background/20 py-3 font-mono text-xs uppercase tracking-wider text-background/70"
                style={{ animationDelay: `${120 + i * 50}ms` }}
              >
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={resume.pdf}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Preview Aleksandar Tonev CV as PDF"
              className="resume-btn resume-btn-primary"
            >
              Preview CV <span aria-hidden="true" className="resume-arrow">↗</span>
            </a>
            <a
              href={resume.pdf}
              download={resume.downloadName}
              aria-label="Download Aleksandar Tonev CV as PDF"
              className="resume-btn resume-btn-secondary"
            >
              Download CV <span aria-hidden="true" className="resume-arrow">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
