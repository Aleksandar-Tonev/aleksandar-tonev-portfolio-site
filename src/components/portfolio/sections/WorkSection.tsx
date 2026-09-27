import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { projectGroups, type Project } from "@/data/projects";
import { CarouselGroup, type EditorialSlot } from "@/components/portfolio/CarouselGroup";
import { StaticProjectOverlay } from "@/components/portfolio/StaticProjectOverlay";
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
  const trigger = useRef<HTMLElement | null>(null);
  const headingId = useRef<string | null>(null);

  useEffect(() => {
    const h = document.getElementById("site-header");
    const root = document.documentElement;
    if (h) h.inert = !!open;
    if (open) root.dataset["overlay"] = "1";
    return () => { if (h) h.inert = false; delete root.dataset["overlay"]; };
  }, [open]);

  const openProject = useCallback((p: Project, el: HTMLElement) => {
    trigger.current = el;
    headingId.current = el.closest("section")?.getAttribute("aria-labelledby") ?? null;
    setOpen(p);
  }, []);
  const close = useCallback(() => {
    setOpen(null);
    requestAnimationFrame(() => {
      const t = trigger.current;
      if (t?.isConnected) t.focus();
      else if (headingId.current) document.getElementById(headingId.current)?.focus();
    });
  }, []);

  return (
    <>
      <section id="work" data-section inert={open ? true : undefined} className="mx-auto max-w-[1440px] px-5 pb-24 pt-16 md:px-10 md:pt-24">
        <section aria-labelledby="work-h">
          <div className="enter mb-12 flex items-baseline justify-between">
            <h2 id="work-h" className="font-display text-4xl uppercase md:text-6xl">Selected work</h2>
          </div>
          <div className="enter-2 space-y-24 md:space-y-32">
              <CarouselGroup id="A" label="Carousel A" projects={projectGroups.A} slots={slotsA} onProjectOpen={openProject} />
            <div className="md:ml-[8.33%]">
              <CarouselGroup id="B" label="Carousel B" projects={projectGroups.B} slots={slotsB} onProjectOpen={openProject} />
            </div>
            <div className="md:mr-[16.66%]">
              <CarouselGroup id="C" label="Carousel C" projects={projectGroups.C} slots={slotsC} onProjectOpen={openProject} />
            </div>
            <div className="md:ml-[25%]">
              <CarouselGroup id="D" label="Carousel D — Video" projects={projectGroups.D} slots={slotsD} onProjectOpen={openProject} />
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
