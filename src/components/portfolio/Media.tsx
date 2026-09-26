import type { Project } from "@/data/projects";

/** Fixed-ratio media box: real image when supplied, labelled placeholder otherwise. */
export function Media({ project, ratio }: { project: Project; ratio: string }) {
  const img = project.images[0];
  return (
    <div className="relative w-full overflow-hidden bg-muted" style={{ aspectRatio: ratio }}>
      {img ? (
        <img
          src={img.src}
          width={img.width}
          height={img.height}
          alt={project.alt}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={project.alt}
          className="absolute inset-0 flex flex-col justify-between p-4 font-mono text-[11px] uppercase tracking-wider text-foreground/70"
        >
          <span className="flex items-center gap-2">
            <span className="size-1.5 bg-accent" aria-hidden /> Placeholder image
          </span>
          <span aria-hidden className="self-end">{ratio.replace("/", ":")}</span>
        </div>
      )}
    </div>
  );
}
