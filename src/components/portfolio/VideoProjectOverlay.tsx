import { useEffect, useRef, useState } from "react";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import { DefaultVideoLayout, defaultLayoutIcons } from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { projects, videoProjects, type Project } from "@/data/projects";

const pad = (n: number) => String(n).padStart(2, "0");

/** Full-screen video overlay for projects 11–13: dark screening stage + editorial notes. */
export default function VideoProjectOverlay({
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
  // Only the thumbnail click that opened the overlay starts playback.
  const [autoId] = useState(project.id);
  const num = projects.findIndex((p) => p.id === project.id) + 1;
  const total = projects.length;
  const vi = videoProjects.findIndex((p) => p.id === project.id);
  const prev = vi > 0 ? videoProjects[vi - 1] : undefined;
  const next = vi < videoProjects.length - 1 ? videoProjects[vi + 1] : undefined;
  const portrait = project.aspectRatio === "9:16";
  const poster = project.images[0]?.src;
  const titleId = "vpo-title";

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.fullscreenElement) { e.preventDefault(); onClose(); }
      if (e.key === "Tab" && ref.current) {
        const f = [...ref.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')].filter((el) => el.offsetParent !== null);
        if (!f.length) return;
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

  const go = (p: Project) => {
    onNavigate(p);
    ref.current?.scrollTo({ top: 0 });
    closeRef.current?.focus();
  };

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 overflow-y-auto bg-background"
    >
      {/* Dark screening stage */}
      <section className="flex min-h-svh flex-col bg-[oklch(0.17_0_0)] text-background animate-fade">
        <header className="sticky top-0 z-10 bg-[oklch(0.17_0_0)]">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 border-b border-background/20 px-5 py-3 md:px-10">
            <p className="font-mono text-xs tabular-nums">
              <span className="text-accent">{pad(num)}</span> / {pad(total)}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close video project"
              className="grid size-11 place-items-center font-mono text-sm hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
            >
              ✕
            </button>
          </div>
        </header>

        <div className="flex flex-1 items-center justify-center px-5 py-8 md:px-10">
          <div className="flex w-full items-center justify-center">
            <div
              key={project.id}
              className="animate-overlay-in"
              style={
                portrait
                  ? { aspectRatio: "9 / 16", height: "min(78vh, 88vw * 16 / 9)", maxHeight: "min(78vh, 72svh)" }
                  : { aspectRatio: "16 / 9", width: "min(88vw, 76vh * 16 / 9)" }
              }
            >
              <MediaPlayer
                className="vo-player size-full"
                title={project.title}
                src={{ src: project.video!, type: "video/mp4" }}
                autoPlay={project.id === autoId}
                playsInline
                load="eager"
                preload="metadata"
                aspectRatio={portrait ? "9/16" : "16/9"}
                keyShortcuts={{ togglePaused: "k Space", seekBackward: "ArrowLeft", seekForward: "ArrowRight", toggleMuted: "m", toggleFullscreen: "f" }}
              >
                <MediaProvider>
                  {poster && <Poster className="vds-poster" src={poster} alt={project.alt} />}
                </MediaProvider>
                <DefaultVideoLayout icons={defaultLayoutIcons} noScrubGesture />
              </MediaPlayer>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial information */}
      <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20">
        <div className="grid grid-cols-12 gap-x-5 gap-y-6">
          <div className="col-span-12 font-mono text-[11px] uppercase tracking-wider text-muted-foreground md:col-span-2">
            <p className="text-foreground">{pad(num)}</p>
            <p className="mt-2">{project.category}</p>
            {project.duration && <p className="mt-2">{project.duration}</p>}
            {project.caption && <p className="mt-2 normal-case tracking-normal">{project.caption}</p>}
          </div>
          <div className="col-span-12 md:col-span-6">
            <h2 id={titleId} className="mt-3 font-display text-4xl uppercase leading-none md:text-6xl">{project.title}</h2>
            {project.lead && <p className="mt-6 max-w-[60ch] text-lg leading-snug">{project.lead}</p>}
            {project.description?.map((d, i) => (
              <p key={i} className="mt-4 max-w-[62ch] leading-relaxed">{d}</p>
            ))}
          </div>
          {(project.role || project.services?.length || project.format || project.year || project.client) && (
            <dl className="col-span-12 space-y-4 font-mono text-[11px] uppercase tracking-wider md:col-span-3 md:col-start-10">
              {project.client && <div><dt className="text-muted-foreground">Client</dt><dd className="mt-1">{project.client}</dd></div>}
              {project.role && <div><dt className="text-muted-foreground">Role</dt><dd className="mt-1">{project.role}</dd></div>}
              {project.services?.length ? <div><dt className="text-muted-foreground">Tools</dt><dd className="mt-1">{project.services.join(", ")}</dd></div> : null}
              {project.format && <div><dt className="text-muted-foreground">Format</dt><dd className="mt-1">{project.format}</dd></div>}
              {project.year && <div><dt className="text-muted-foreground">Year</dt><dd className="mt-1">{project.year}</dd></div>}
            </dl>
          )}
        </div>

        <nav aria-label="Video projects" className="mt-16 grid grid-cols-2 gap-5 border-t border-foreground pt-5">
          <div>
            {prev && (
              <button type="button" onClick={() => go(prev)} className="group min-h-11 text-left focus-visible:outline-2 focus-visible:outline-accent">
                <span className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">← Previous video</span>
                <span className="mt-1 block font-display uppercase group-hover:text-accent">
                  {pad(projects.indexOf(prev) + 1)} {prev.title}
                </span>
              </button>
            )}
          </div>
          <div className="text-right">
            {next && (
              <button type="button" onClick={() => go(next)} className="group min-h-11 text-right focus-visible:outline-2 focus-visible:outline-accent">
                <span className="block font-mono text-[11px] uppercase tracking-wider">Next video →</span>
                <span className="mt-1 block font-display text-xl uppercase group-hover:text-accent">
                  {pad(projects.indexOf(next) + 1)} {next.title}
                </span>
              </button>
            )}
          </div>
        </nav>
      </section>
    </div>
  );
}
