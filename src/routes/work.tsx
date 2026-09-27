import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { projectGroups, type Project } from "@/data/projects";
import { CarouselGroup, type EditorialSlot } from "@/components/portfolio/CarouselGroup";
import { StaticProjectOverlay } from "@/components/portfolio/StaticProjectOverlay";
const VideoProjectOverlay = lazy(() => import("@/components/portfolio/VideoProjectOverlay"));

const TITLE = "Selected Work — Aleksandar Tonev";
const DESC = "Print, identity, editorial and AI video projects by Aleksandar Tonev, in four independent carousels.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Work,
});

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

function Work() {
  const [open, setOpen] = useState<Project | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const headingId = useRef<string | null>(null);

  useEffect(() => {
    const h = document.getElementById("site-header");
    if (h) h.inert = !!open;
    return () => { if (h) h.inert = false; };
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
      <main id="main" inert={open ? true : undefined} className="mx-auto max-w-[1440px] px-5 pb-24 pt-16 md:px-10 md:pt-24">
        <section aria-labelledby="work-h">
          <div className="enter mb-12 flex items-baseline justify-between">
            <h1 id="work-h" className="font-display text-4xl uppercase md:text-6xl">Selected work</h1>
          </div>
          <div className="enter-2 space-y-24 md:space-y-32">
            <CarouselGroup id="A" label="Group A" projects={projectGroups.A} slots={slotsA} onProjectOpen={openProject} />
            <div className="md:ml-[8.33%]">
              <CarouselGroup id="B" label="Group B" projects={projectGroups.B} slots={slotsB} onProjectOpen={openProject} />
            </div>
            <div className="md:mr-[16.66%]">
              <CarouselGroup id="C" label="Group C" projects={projectGroups.C} slots={slotsC} onProjectOpen={openProject} />
            </div>
            <div className="md:ml-[25%]">
              <CarouselGroup id="D" label="Group D" projects={projectGroups.D} slots={slotsD} onProjectOpen={openProject} />
            </div>
          </div>
        </section>
      </main>
      {open && (open.video
        ? <Suspense fallback={null}><VideoProjectOverlay project={open} onNavigate={setOpen} onClose={close} /></Suspense>
        : <StaticProjectOverlay project={open} onNavigate={setOpen} onClose={close} />)}
    </>
  );
}
