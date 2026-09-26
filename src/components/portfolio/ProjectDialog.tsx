import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";
import { Media } from "./Media";

export function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    el.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab") {
        const f = el.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])');
        const first = f[0]!, last = f[f.length - 1]!;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/60 p-0 sm:items-center sm:p-6 animate-fade"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pd-title"
        aria-describedby="pd-desc"
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-background p-6 sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {project.category}{project.year ? ` · ${project.year}` : ""}
              {project.placeholder && <span className="ml-2 text-accent">· Placeholder</span>}
            </p>
            <h2 id="pd-title" className="mt-2 font-display text-3xl uppercase leading-none sm:text-4xl">
              {project.title}
            </h2>
          </div>
          <button type="button" data-autofocus onClick={onClose} className="nav-btn shrink-0" aria-label="Close project">
            ✕
          </button>
        </div>
        <Media project={project} ratio="16/10" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Description</h3>
            <p id="pd-desc" className="mt-2 text-sm leading-relaxed">{project.shortDescription}</p>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Purpose</h3>
            <p className="mt-2 text-sm leading-relaxed">{project.purpose}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
