import { useEffect, useRef, useState } from "react";
import { staticProjects, type Project } from "@/data/projects";

const pad = (n: number) => String(n).padStart(2, "0");

/** Full-screen editorial overlay for static projects 01–10. Video projects use ProjectDialog. */
export function StaticProjectOverlay({
  project,
  onNavigate,
  onClose,
}: {
  project: Project;
  onNavigate: (p: Project) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [swap, setSwap] = useState(0);
  const total = staticProjects.length;
  const idx = staticProjects.findIndex((p) => p.id === project.id);
  const num = idx + 1;
  // Carousels are circular, so 10 → 01 wraps; never into video projects.
  const prev = staticProjects[(idx - 1 + total) % total]!;
  const next = staticProjects[(idx + 1) % total]!;
  const portrait = project.aspectRatio === "9:16";
  const img = project.images[0];
  const titleId = "spo-title";

  // Scroll lock + keep page position; Escape + focus trap.
  useEffect(() => {
    const y = window.scrollY;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]');
        const first = f[0]!, last = f[f.length - 1]!;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.scrollTo(0, y);
    };
  }, [onClose]);

  // New project: reset scroll, replay short content transition.
  useEffect(() => {
    ref.current?.scrollTo(0, 0);
    setSwap((s) => s + 1);
  }, [project.id]);

  // Preload neighbours after the active image has loaded.
  const preload = () => [prev, next].forEach((p) => { const s = p.images[0]?.src; if (s) new Image().src = s; });

  const meta = [
    project.category,
    project.year ? String(project.year) : null,
  ].filter(Boolean) as string[];
  const facts = [
    ["Client", project.client],
    ["Role", project.role],
    ["Services", project.services?.join(", ")],
    ["Format", project.format],
  ].filter(([, v]) => v) as [string, string][];
  const description = project.description?.filter(Boolean) ?? [];

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[60] overflow-y-auto bg-background text-foreground animate-overlay-in"
    >
      <header className="sticky top-0 z-10 bg-background px-5 sm:px-8 lg:px-12">
        <div className="flex h-14 items-center justify-between gap-4 border-b border-foreground">
          <p className="font-mono text-xs uppercase tracking-wider tabular-nums">
            <span className="text-accent">{pad(num)}</span> / {pad(total)}
            <span className="ml-4 text-muted-foreground">{project.category}</span>
          </p>
          <button ref={closeRef} type="button" onClick={onClose} className="nav-btn" aria-label="Close project">
            ✕
          </button>
        </div>
      </header>

      <div key={swap} className="animate-fade">
        {/* Visual stage */}
        <section className="relative px-5 pt-8 sm:px-8 lg:px-12 lg:pt-12">
          {portrait && (
            <aside className="absolute left-12 top-12 hidden max-w-[14rem] space-y-1 font-mono text-xs uppercase tracking-wider text-muted-foreground lg:block">
              <p className="text-accent">{pad(num)}</p>
              {meta.map((m) => <p key={m}>{m}</p>)}
              {project.caption && <p className="normal-case tracking-normal">{project.caption}</p>}
            </aside>
          )}
          <div
            className="mx-auto"
            style={{
              aspectRatio: portrait ? "9 / 16" : "16 / 9",
              width: portrait ? "min(100%, calc(76vh * 9 / 16))" : "min(100%, 85vw, calc(76vh * 16 / 9))",
            }}
          >
            {img && (
              <img
                src={img.src}
                width={img.width}
                height={img.height}
                alt={project.alt}
                onLoad={preload}
                className="size-full object-contain"
              />
            )}
          </div>
        </section>

        {/* Editorial information */}
        <section className="px-5 pb-12 pt-16 sm:px-8 lg:px-12 lg:pt-24">
          <div className="grid grid-cols-12 gap-x-5 gap-y-6 border-t border-foreground pt-6">
            <div className="col-span-12 font-mono text-xs uppercase tracking-wider text-muted-foreground lg:col-span-2">
              <p className="text-accent">{pad(num)}</p>
              {meta.map((m) => <p key={m} className="mt-1">{m}</p>)}
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-3">
              <p className="font-mono text-xs uppercase tracking-wider text-accent">{project.category}</p>
              <h2
                id={titleId}
                className="mt-3 font-display uppercase leading-[0.95] text-[clamp(2rem,11vw,3.25rem)] md:text-[clamp(2.5rem,7vw,4rem)] lg:text-[clamp(3rem,6vw,5rem)]"
              >
                {project.title}
              </h2>
              {project.lead && <p className="mt-6 max-w-[60ch] text-xl leading-snug">{project.lead}</p>}
              {description.map((d, i) => (
                <p key={i} className="mt-4 max-w-[62ch] text-sm leading-relaxed">{d}</p>
              ))}
            </div>
            {facts.length > 0 && (
              <dl className="col-span-12 space-y-4 lg:col-span-3 lg:col-start-10">
                {facts.map(([k, v]) => (
                  <div key={k} className="border-t border-border pt-2">
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
                    <dd className="mt-1 text-sm">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <nav aria-label="Project navigation" className="mt-16 grid gap-4 border-t border-foreground pt-6 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => onNavigate(prev)}
              className="group min-h-11 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              aria-label={`Previous project: ${pad(idx === 0 ? total : idx)} ${prev.title}`}
            >
              <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">← Previous project</span>
              <span className="mt-1 block text-sm group-hover:underline">{pad(idx === 0 ? total : idx)} — {prev.title}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate(next)}
              className="group min-h-11 text-left sm:text-right focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              aria-label={`Next project: ${pad(num === total ? 1 : num + 1)} ${next.title}`}
            >
              <span className="block font-mono text-xs uppercase tracking-wider text-accent">Next project →</span>
              <span className="mt-1 block font-display text-2xl uppercase leading-tight group-hover:text-accent">
                {pad(num === total ? 1 : num + 1)} — {next.title}
              </span>
            </button>
          </nav>
        </section>
      </div>
    </div>
  );
}
