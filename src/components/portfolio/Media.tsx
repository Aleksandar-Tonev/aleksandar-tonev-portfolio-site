import { ratioValue, type Project } from "@/data/projects";

/**
 * Reserved frame (fixed aspect) holding the project's media at its own declared
 * ratio (9:16 or 16:9) — never cropped to the frame. Frame size is fixed before
 * loading, so swapping formats never shifts layout.
 */
export function Media({
  project,
  ratio,
  eager,
  playable,
}: {
  project: Project;
  /** Frame ratio, e.g. "4/5". */
  ratio: string;
  eager?: boolean;
  /** Show the project's video player (overlay only). */
  playable?: boolean;
}) {
  const [fw, fh] = ratio.split("/").map(Number) as [number, number];
  const pr = ratioValue(project.aspectRatio);
  const widthLimited = pr >= fw / fh;
  const img = project.images[0];
  const cssRatio = project.aspectRatio.replace(":", " / ");

  return (
    <div className="relative flex w-full items-start" style={{ aspectRatio: ratio.replace("/", " / ") }}>
      <div
        className="relative overflow-hidden bg-muted"
        style={{
          aspectRatio: cssRatio,
          ...(widthLimited ? { width: "100%" } : { height: "100%" }),
        }}
      >
        {playable && project.video ? (
          <video
            src={project.video}
            poster={img?.src}
            controls
            playsInline
            preload="metadata"
            aria-label={project.alt}
            className="absolute inset-0 size-full bg-foreground object-contain"
          />
        ) : img ? (
          <img
            src={img.src}
            width={img.width}
            height={img.height}
            alt={project.alt}
            loading={eager ? "eager" : "lazy"}
            className={`absolute inset-0 size-full ${project.fill ? "object-cover" : "object-contain"}`}
          />
        ) : (
          <div
            role="img"
            aria-label={project.alt}
            className="absolute inset-0 flex flex-col justify-between p-3 font-mono text-[11px] uppercase tracking-wider text-foreground/70"
          >
            <span className="flex items-center gap-2">
              <span className="size-1.5 bg-accent" aria-hidden /> Placeholder
            </span>
            <span aria-hidden className="self-end">{project.aspectRatio}</span>
          </div>
        )}
      </div>
    </div>
  );
}
