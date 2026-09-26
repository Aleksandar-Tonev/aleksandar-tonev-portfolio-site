import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { projectGroups, type Project } from "@/data/projects";
import { site } from "@/data/site";
import { CarouselGroup, type EditorialSlot } from "@/components/portfolio/CarouselGroup";
import { ProjectDialog } from "@/components/portfolio/ProjectDialog";
import { StaticProjectOverlay } from "@/components/portfolio/StaticProjectOverlay";
import { HeroFlowerInteraction } from "@/components/portfolio/HeroFlowerInteraction";
import { AboutPortrait } from "@/components/portfolio/AboutPortrait";
import { ResumeSection } from "@/components/portfolio/ResumeSection";

const TITLE = "Aleksandar Tonev — Graphic Design · Prepress · AI Visual Content";
const DESC = "Portfolio of Aleksandar Tonev: graphic design and prepress with production discipline, plus interior/spatial work and AI visual content.";

export const Route = createFileRoute("/")({
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
  component: Home,
});

// Carousel A: three stable editorial slots with fixed offsets.
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

function Home() {
  const [open, setOpen] = useState<Project | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const headingId = useRef<string | null>(null);
  const [menu, setMenu] = useState(false);

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

  const links = [["Work", "#work"], ["About", "#about"], ["Contact", "#contact"]] as const;

  return (
    <>
      <div inert={open ? true : undefined}>
        <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:p-2">
          Skip to work
        </a>
        <header className="sticky top-0 z-40 border-b border-foreground/15 bg-background">
          <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 md:px-10">
            <a href="#top" className="font-display text-base font-bold tracking-wide">ALEKSANDAR TONEV</a>
            <nav aria-label="Main" className="hidden gap-8 md:flex">
              {links.map(([l, h]) => (
                <a key={h} href={h} className={`link font-mono text-xs uppercase tracking-wider ${l === "Contact" ? "text-accent" : ""}`}>{l}</a>
              ))}
            </nav>
            <button
              type="button"
              className="nav-btn md:hidden"
              aria-expanded={menu}
              aria-controls="mnav"
              onClick={() => setMenu((m) => !m)}
            >
              <span className="font-mono text-xs uppercase">{menu ? "Close" : "Menu"}</span>
            </button>
          </div>
          {menu && (
            <nav id="mnav" aria-label="Mobile" className="border-t border-foreground/15 px-5 pb-4 md:hidden">
              {links.map(([l, h]) => (
                <a key={h} href={h} onClick={() => setMenu(false)} className="block border-b border-foreground/10 py-4 font-display text-2xl uppercase">
                  {l}
                </a>
              ))}
            </nav>
          )}
        </header>

        <main id="top" className="mx-auto max-w-[1440px] px-5 md:px-10">
          {/* Hero */}
          <section className="relative isolate grid grid-cols-12 gap-5 pb-20 pt-16 md:pb-28 md:pt-24">
            <HeroFlowerInteraction />
            <p className="col-span-12 font-mono text-xs uppercase tracking-wider md:col-span-3 md:pt-4">
              <span className="text-accent">■</span> {site.descriptor}
            </p>
            <h1 className="col-span-12 font-display text-[clamp(3rem,9vw,8.5rem)] font-bold uppercase leading-[0.9] tracking-tight md:col-span-9">
              {site.headline[0]}
              <br />
              <span className="text-muted-foreground">{site.headline[1]}</span>
            </h1>
            <div className="col-span-12 mt-8 md:col-span-5 md:col-start-4 lg:col-span-4 lg:col-start-4">
              <p className="text-base leading-relaxed">{site.intro}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#work" className="btn-primary">Explore selected work</a>
                <a href="#contact" className="btn-ghost">Get in touch</a>
              </div>
            </div>
          </section>

          {/* Work */}
          <section id="work" aria-labelledby="work-h" className="scroll-mt-16 pb-24">
            <div className="mb-12 flex items-baseline justify-between">
              <h2 id="work-h" className="font-display text-4xl uppercase md:text-6xl">Selected work</h2>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Placeholder content</p>
            </div>
            <div className="space-y-24 md:space-y-32">
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

          {/* About */}
          <section id="about" aria-labelledby="about-h" className="grid scroll-mt-16 grid-cols-12 gap-5 border-t border-foreground py-20 md:py-28">
            <h2 id="about-h" className="col-span-12 font-display text-4xl uppercase md:col-span-4 md:text-6xl">About</h2>
            <div className="col-span-12 md:col-span-4">
              <AboutPortrait />
            </div>
            <div className="col-span-12 space-y-5 text-base leading-relaxed md:col-span-4">
              {site.about.map((t) => <p key={t}>{t}</p>)}
            </div>
          </section>
        </main>

        <ResumeSection />

        {/* Contact */}
        <footer id="contact" className="scroll-mt-16 border-t border-background/15 bg-foreground text-background">
          <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
            <p className="font-mono text-xs uppercase tracking-wider opacity-70">Contact</p>
            <h2 className="mt-4 max-w-4xl font-display text-4xl uppercase leading-none md:text-7xl">
              Have a project or a role in mind? Let's talk.
            </h2>
            <a href={`mailto:${site.email}`} className="link-inverse mt-10 inline-block break-all font-display text-xl md:text-3xl">
              {site.email}
            </a>
            <div className="mt-6">
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="link-inverse font-mono text-xs uppercase tracking-wider">
                LinkedIn ↗
              </a>
            </div>
            <div className="mt-20 flex justify-between border-t border-background/20 pt-5 font-mono text-[11px] uppercase tracking-wider opacity-70">
              <span>{site.name}</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      </div>
      {open && (open.video
        ? <ProjectDialog project={open} onClose={close} />
        : <StaticProjectOverlay project={open} onNavigate={setOpen} onClose={close} />)}
    </>
  );
}
