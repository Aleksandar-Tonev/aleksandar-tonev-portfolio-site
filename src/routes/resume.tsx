import { createFileRoute } from "@tanstack/react-router";
import { cv, resume } from "@/data/site";
import { ResumeSection } from "@/components/portfolio/ResumeSection";

const TITLE = "Résumé — Aleksandar Tonev";
const DESC = "Profile, experience, education and tools of Aleksandar Tonev — 15+ years in graphic design, prepress and production, now with AI visual content.";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Resume,
});

function Label({ children }: { children: string }) {
  return (
    <h2 className="col-span-12 font-mono text-xs uppercase tracking-wider text-muted-foreground md:col-span-3">
      <span className="text-accent" aria-hidden="true">■</span> {children}
    </h2>
  );
}

function Resume() {
  return (
    <main id="main">
      <div className="enter">
        <ResumeSection heading="h1" />
      </div>
      <div className="enter-2 mx-auto max-w-[1440px] px-5 md:px-10">
        <section className="grid grid-cols-12 gap-5 border-b border-foreground/15 py-14 md:py-20">
          <Label>Profile</Label>
          <div className="col-span-12 max-w-[62ch] space-y-5 text-base leading-relaxed md:col-span-7 md:col-start-5">
            {cv.profile.map((p) => <p key={p}>{p}</p>)}
          </div>
        </section>

        <section className="grid grid-cols-12 gap-5 border-b border-foreground/15 py-14 md:py-20">
          <Label>Experience</Label>
          <ol className="col-span-12 md:col-span-8 md:col-start-5">
            {cv.experience.map((e) => (
              <li key={e.org + e.period} className="grid grid-cols-8 gap-x-5 gap-y-2 border-t border-foreground/15 py-6 first:border-t-0 first:pt-0">
                <p className="col-span-8 font-mono text-xs uppercase tracking-wider text-muted-foreground md:col-span-2">{e.period}</p>
                <div className="col-span-8 md:col-span-6">
                  <h3 className="font-display text-xl uppercase leading-tight">{e.role}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.org} · {e.place}</p>
                  <ul className="mt-3 max-w-[62ch] space-y-1.5 text-sm leading-relaxed">
                    {e.points.map((pt) => <li key={pt}>— {pt}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid grid-cols-12 gap-5 border-b border-foreground/15 py-14 md:py-20">
          <Label>Education</Label>
          <div className="col-span-12 grid gap-8 md:col-span-8 md:col-start-5 md:grid-cols-2">
            {cv.education.map((ed) => (
              <div key={ed.degree}>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{ed.period}</p>
                <h3 className="mt-2 font-display text-xl uppercase leading-tight">{ed.degree}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{ed.org}</p>
                <p className="mt-3 text-sm leading-relaxed">{ed.focus}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-12 gap-5 border-b border-foreground/15 py-14 md:py-20">
          <Label>Disciplines</Label>
          <ul className="col-span-12 flex flex-wrap gap-x-6 gap-y-2 font-display text-lg uppercase md:col-span-8 md:col-start-5 md:text-2xl">
            {cv.disciplines.map((d, i) => (
              <li key={d}>{d}{i < cv.disciplines.length - 1 && <span className="ml-6 text-accent" aria-hidden="true">/</span>}</li>
            ))}
          </ul>
        </section>

        <section className="grid grid-cols-12 gap-5 py-14 md:py-20">
          <Label>Tools & languages</Label>
          <dl className="col-span-12 grid gap-6 text-sm md:col-span-8 md:col-start-5 md:grid-cols-2">
            {cv.tools.map(([k, v]) => (
              <div key={k} className="border-t border-foreground/15 pt-3">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
                <dd className="mt-1">{v}</dd>
              </div>
            ))}
            <div className="border-t border-foreground/15 pt-3">
              <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Languages</dt>
              <dd className="mt-1">{cv.languages.join(" · ")}</dd>
            </div>
            <div className="border-t border-foreground/15 pt-3">
              <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Certificates</dt>
              <dd className="mt-1">{cv.certificates.join(" · ")}</dd>
            </div>
          </dl>
        </section>

        <div className="flex flex-col gap-3 border-t border-foreground pb-20 pt-10 sm:flex-row">
          <a href={resume.pdf} target="_blank" rel="noopener noreferrer" className="btn-primary">Preview CV ↗</a>
          <a href={resume.pdf} download={resume.downloadName} className="btn-ghost">Download CV ↓</a>
        </div>
      </div>
    </main>
  );
}
