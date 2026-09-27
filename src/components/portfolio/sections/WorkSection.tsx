import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { projectGroups, type Project } from "@/data/projects";
import { CarouselGroup, type EditorialSlot } from "@/components/portfolio/CarouselGroup";
import { StaticProjectOverlay } from "@/components/portfolio/StaticProjectOverlay";
import { SectionNumber } from "@/components/portfolio/SectionHeading";
import { useI18n } from "@/lib/i18n";
const VideoProjectOverlay = lazy(() => import("@/components/portfolio/VideoProjectOverlay"));



const slotsA: EditorialSlot[] = [
  { frame: "4/5", span: "col-span-12 md:col-span-6 lg:col-span-5", offsetMd: "0rem", offsetLg: "0rem" },
  { frame: "1/1", span: "col-span-12 md:col-span-6 lg:col-span-4", offsetMd: "2.5rem", offsetLg: "6rem" },
  { frame: "3/4", span: "col-span-12 lg:col-span-3", offsetMd: "0rem", offsetLg: "2.5rem" },
];
const slotsB: EditorialSlot[] = [
  { frame: "3/2", span: "col-span-12 md:col-span-7", offsetMd: "0rem", offsetLg: "0rem" },
  { frame: "4/5", span: "col-span-12 md:col-span-5", offsetMd: "2rem", offsetLg: "4rem" },
];
const slotsC: EditorialSlot[] = [
  { frame: "4/5", span: "col-span-12 md:col-span-5", offsetMd: "1.5rem", offsetLg: "3rem" },
  { frame: "16/10", span: "col-span-12 md:col-span-7", offsetMd: "0rem", offsetLg: "0rem" },
];
const slotsD: EditorialSlot[] = [{ frame: "21/9", span: "col-span-12", offsetMd: "0rem", offsetLg: "0rem" }];

export function WorkSection() {
  const [open, setOpen] = useState<Project | null>(null);
  const { t } = useI18n();
  const trigger = useRef<HTMLElement | null>(null);
  const headingId = useRef<string | null>(null);

  useEffect(() => {
    const h = document.getElementById("site-header");
    const root = document.documentElement;
    if (h) h.inert = !!open;
    if (open) root.dataset["overlay"] = "1";
    return () => { if (h) h.inert = false; delete root.dataset["overlay"]; };
  }, [open]);

  const restoreFocus = useCallback(() => {
    requestAnimationFrame(() => {
      const t = trigger.current;
      if (t?.isConnected) t.focus({ preventScroll: true });
      else if (headingId.current) document.getElementById(headingId.current)?.focus({ preventScroll: true });
    });
  }, []);

  const openProject = useCallback((p: Project, el: HTMLElement) => {
    trigger.current = el;
    headingId.current = el.closest("section")?.getAttribute("aria-labelledby") ?? null;
    // One history entry per open overlay (same URL), so Back closes it.
    history.pushState({ ...(history.state ?? {}), tvOverlay: p.id }, "", window.location.href);
    setOpen(p);
  }, []);
  const navigate = useCallback((p: Project) => {
    if ((history.state as { tvOverlay?: string } | null)?.tvOverlay)
      history.replaceState({ ...history.state, tvOverlay: p.id }, "", window.location.href);
    setOpen(p);
  }, []);
  const close = useCallback(() => {
    if ((history.state as { tvOverlay?: string } | null)?.tvOverlay) { history.back(); return; }
    setOpen(null);
    restoreFocus();
  }, [restoreFocus]);

  // Back closes the overlay; Forward reopens the last project shown.
  useEffect(() => {
    const onPop = () => {
      const id = (history.state as { tvOverlay?: string } | null)?.tvOverlay;
      const p = id ? projects.find((x) => x.id === id) : undefined;
      setOpen((cur) => {
        if (p) return p;
        if (cur) restoreFocus();
        return null;
      });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [restoreFocus]);

  return (
    <>
      <section id="work" data-section inert={open ? true : undefined} className="mx-auto max-w-[1440px] px-5 pb-24 pt-16 md:px-10 md:pt-24">
        <section aria-labelledby="work-h">
          <div className="enter mb-12">
            <SectionNumber number="01" />
            <h2 id="work-h" className="mt-4 font-display text-4xl uppercase md:text-6xl">{t.work.heading}</h2>
          </div>
          <div className="enter-2 space-y-24 md:space-y-32">
              <CarouselGroup id="A" label={t.work.carousels.A} projects={projectGroups.A} slots={slotsA} onProjectOpen={openProject} />
            <div className="md:ml-[8.33%]">
              <CarouselGroup id="B" label={t.work.carousels.B} projects={projectGroups.B} slots={slotsB} onProjectOpen={openProject} />
            </div>
            <div className="md:mr-[16.66%]">
              <CarouselGroup id="C" label={t.work.carousels.C} projects={projectGroups.C} slots={slotsC} onProjectOpen={openProject} />
            </div>
            <div className="md:ml-[25%]">
              <CarouselGroup id="D" label={t.work.carousels.D} projects={projectGroups.D} slots={slotsD} onProjectOpen={openProject} />
            </div>
          </div>
        </section>
      </section>
      {open && (open.video
        ? <Suspense fallback={null}><VideoProjectOverlay project={open} onNavigate={setOpen} onClose={close} /></Suspense>
        : <StaticProjectOverlay project={open} onNavigate={setOpen} onClose={close} />)}
    </>
  );
}
