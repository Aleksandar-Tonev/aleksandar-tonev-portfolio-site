import { useEffect, useState } from "react";
import { ratioValue, type Project } from "@/data/projects";
import { useI18n, useProjectCopy } from "@/lib/i18n";

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
  thumb,
  videoThumb,
}: {
  project: Project;
  /** Frame ratio, e.g. "4/5". */
  ratio: string;
  eager?: boolean;
  /** Show the project's video player (overlay only). */
  playable?: boolean;
  /** Static carousel thumbnail: "+" affordance and hover/tap feedback. */
  thumb?: boolean;
  /** Video carousel thumbnail: central play button + duration label. */
  videoThumb?: boolean;
}) {
  const { t } = useI18n();
  const alt = useProjectCopy()(project).alt;
  const [fw, fh] = ratio.split("/").map(Number) as [number, number];
  const pr = ratioValue(project.aspectRatio);
  const widthLimited = pr >= fw / fh;
  const img = project.images[0];
  const cssRatio = project.aspectRatio.replace(":", " / ");
  const [stopMotionDuration, setStopMotionDuration] = useState<string | null>(null);

  useEffect(() => {
    if (!videoThumb || project.id !== "stop-motion-study" || !project.video) return;
    const video = document.createElement("video");
    video.preload = "metadata";
    const onMetadata = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const seconds = Math.round(video.duration);
      setStopMotionDuration(`${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`);
    };
    video.addEventListener("loadedmetadata", onMetadata);
    video.src = project.video;
    return () => {
      video.removeEventListener("loadedmetadata", onMetadata);
      video.removeAttribute("src");
      video.load();
    };
  }, [videoThumb, project.id, project.video]);

  const duration = project.id === "stop-motion-study" ? stopMotionDuration : project.duration;

  return (
    <div className="relative flex w-full items-start" style={{ aspectRatio: ratio.replace("/", " / ") }}>
      <div
        className={`relative overflow-hidden bg-muted ${thumb || videoThumb ? "thumb" : ""}`}
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
            aria-label={alt}
            className="absolute inset-0 size-full bg-foreground object-contain"
          />
        ) : img ? (
          <img
            src={img.src}
            width={img.width}
            height={img.height}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            className={`absolute inset-0 size-full ${project.fill ? "object-cover" : "object-contain"}`}
          />
        ) : (
          <div
            role="img"
            aria-label={alt}
            className="absolute inset-0 flex flex-col justify-between p-3 font-mono text-[11px] uppercase tracking-wider text-foreground/70"
          >
            <span className="flex items-center gap-2">
              <span className="size-1.5 bg-accent" aria-hidden /> {t.work.placeholder}
            </span>
            <span aria-hidden className="self-end">{project.aspectRatio}</span>
          </div>
        )}
        {thumb && <span aria-hidden className="thumb-plus">+</span>}
        {videoThumb && (
          <>
            <span className="vthumb-play" role="img" aria-label={t.work.playVideo}>
              <svg viewBox="0 0 24 24" aria-hidden width="20" height="20"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
            </span>
            {duration && <span className="vthumb-dur">{duration}</span>}
          </>
        )}
      </div>
    </div>
  );
}
