import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/lib/i18n";

const SRC = "/videos/video-presentation-for-site-4-5.mp4";
const KEY = "about-video";
const isOurs = () => (history.state as { tvOverlay?: string } | null)?.tvOverlay === KEY;

/** Play button on the About photo + compact 4:5 video modal. */
export function AboutVideo() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const finish = useCallback(() => {
    const v = vid.current;
    if (v) { v.pause(); v.currentTime = 0; }
    setOpen(false);
    requestAnimationFrame(() => btn.current?.focus({ preventScroll: true }));
  }, []);
  const close = useCallback(() => { if (isOurs()) history.back(); else finish(); }, [finish]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const header = document.getElementById("site-header");
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    root.dataset["overlay"] = "1";
    if (header) header.inert = true;
    closeBtn.current?.focus();
    vid.current?.play().catch(() => {});
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      if (e.key === "Tab" && box.current) {
        const f = box.current.querySelectorAll<HTMLElement>("button, video");
        const first = f[0], last = f[f.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const onPop = () => { if (!isOurs()) finish(); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onPop);
    return () => {
      document.body.style.overflow = prev;
      delete root.dataset["overlay"];
      if (header) header.inert = false;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPop);
    };
  }, [open, close, finish]);

  return (
    <>
      <button
        ref={btn}
        type="button"
        aria-label={t.about.videoAria}
        aria-haspopup="dialog"
        onClick={() => { history.pushState({ ...(history.state ?? {}), tvOverlay: KEY }, "", window.location.href); setOpen(true); }}
        className="about-video-btn absolute bottom-3 left-3 flex min-h-12 min-w-12 cursor-pointer items-center gap-2 px-3 font-mono text-[11px] uppercase tracking-wider"
      >
        <span aria-hidden="true">▶</span>{t.about.video}
      </button>
      {open && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/70 p-5" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div ref={box} role="dialog" aria-modal="true" aria-label={t.about.video} className="relative w-full" style={{ maxWidth: "min(480px, calc((100dvh - 7rem) * 0.8))" }}>
            <div className="mb-2 flex justify-end">
              <button ref={closeBtn} type="button" onClick={close} aria-label={t.about.videoClose} className="about-video-btn flex h-11 w-11 cursor-pointer items-center justify-center text-lg">✕</button>
            </div>
            <video ref={vid} src={SRC} controls playsInline preload="metadata" className="block aspect-[4/5] w-full bg-foreground object-cover" />
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
