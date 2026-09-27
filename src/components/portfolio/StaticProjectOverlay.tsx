import { useEffect, useRef, useState } from "react";
import { staticProjects, type Project } from "@/data/projects";
import { useI18n, useProjectCopy } from "@/lib/i18n";

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
  const { t } = useI18n();
  const pc = useProjectCopy();
  const o = t.overlay;
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

  const facts = [
    [o.client, project.client],
    [o.role, project.role],
    [o.services, project.services?.join(", ")],
    [o.format, project.format],
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
        <div className="flex h-14 items-center justify-between gap-4 border-b border-foreground lg:grid lg:h-auto lg:min-h-16 lg:grid-cols-[8rem_minmax(0,1fr)_8rem] lg:py-3">
          <p className="font-mono text-xs uppercase tracking-wider tabular-nums">
            <span className="text-accent">{pad(num)}</span> / {pad(total)}
          </p>
          <p aria-hidden="true" className="hidden text-balance text-center font-display text-2xl uppercase leading-tight lg:line-clamp-2">
            {pc(project).title}
          </p>
          <button ref={closeRef} type="button" onClick={onClose} className="nav-btn lg:justify-self-end" aria-label={o.close}>
            ✕
          </button>
        </div>
      </header>

      <div key={swap} className="animate-fade">
        {/* Visual stage */}
        <section className="relative px-5 pt-8 sm:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-10 lg:px-12 lg:pb-16 lg:pt-12">
          {/* Desktop only: category at image top, previous link above the image midpoint */}
          <div className="relative hidden lg:block">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{pc(project).category}</p>
            <button
              type="button"
              onClick={() => onNavigate(prev)}
              className="group absolute left-0 top-[42%] max-w-full -translate-y-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              aria-label={`${o.prevProjectAria}: ${pad(idx === 0 ? total : idx)} ${pc(prev).title}`}
            >
              <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">{o.prevProject}</span>
              <span className="mt-1 block max-w-[22ch] text-sm group-hover:underline">{pad(idx === 0 ? total : idx)} — {pc(prev).title}</span>
            </button>
          </div>
          <div
            className={`mx-auto ${portrait ? "" : "lg:!w-[min(62vw,calc(76vh*16/9))]"}`}
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
                alt={pc(project).alt}
                onLoad={preload}
                className="size-full object-contain"
              />
            )}
          </div>
          {/* Desktop only: next link, bottom aligned with image bottom */}
          <div className="hidden lg:flex lg:items-end lg:justify-end">
            <button
              type="button"
              onClick={() => onNavigate(next)}
              className="group max-w-full text-right focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              aria-label={`${o.nextProjectAria}: ${pad(num === total ? 1 : num + 1)} ${pc(next).title}`}
            >
              <span className="block font-mono text-xs uppercase tracking-wider text-accent">{o.nextProject}</span>
              <span className="ml-auto mt-2 line-clamp-2 max-w-[14ch] text-balance font-display text-3xl uppercase leading-[1.05] group-hover:text-accent xl:text-4xl">
                {pad(num === total ? 1 : num + 1)} — {pc(next).title}
              </span>
            </button>
          </div>
        </section>

        {/* Editorial information */}
        <section className="px-5 pb-12 pt-16 sm:px-8 lg:hidden">
          <div className="grid grid-cols-12 gap-x-5 gap-y-6 border-t border-foreground pt-6">
            <div className="col-span-12 font-mono text-xs uppercase tracking-wider text-muted-foreground lg:col-span-2">
              <p className="text-accent">{pad(num)}</p>
              <p className="mt-1">{pc(project).category}</p>
              {project.year && <p className="mt-1">{project.year}</p>}
              {project.caption && <p className="mt-1 normal-case tracking-normal">{project.caption}</p>}
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-3">
              <h2
                id={titleId}
                className="mt-3 font-display uppercase leading-[0.95] text-[clamp(2rem,11vw,3.25rem)] md:text-[clamp(2.5rem,7vw,4rem)] lg:text-[clamp(3rem,6vw,5rem)]"
              >
                {pc(project).title}
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

          <nav aria-label={o.projectNav} className="mt-16 grid gap-4 border-t border-foreground pt-6 sm:grid-cols-2 lg:hidden">
            <button
              type="button"
              onClick={() => onNavigate(prev)}
              className="group min-h-11 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              aria-label={`${o.prevProjectAria}: ${pad(idx === 0 ? total : idx)} ${pc(prev).title}`}
            >
              <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">{o.prevProject}</span>
              <span className="mt-1 block text-sm group-hover:underline">{pad(idx === 0 ? total : idx)} — {pc(prev).title}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate(next)}
              className="group min-h-11 text-left sm:text-right focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              aria-label={`${o.nextProjectAria}: ${pad(num === total ? 1 : num + 1)} ${pc(next).title}`}
            >
              <span className="block font-mono text-xs uppercase tracking-wider text-accent">{o.nextProject}</span>
              <span className="mt-1 block font-display text-2xl uppercase leading-tight group-hover:text-accent">
                {pad(num === total ? 1 : num + 1)} — {pc(next).title}
              </span>
            </button>
          </nav>
        </section>
      </div>
    </div>
  );
}
