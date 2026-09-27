import { site } from "@/data/site";
import { AboutPortrait } from "@/components/portfolio/AboutPortrait";
import { SectionNumber } from "@/components/portfolio/SectionHeading";



export function AboutSection() {
  return (
    <section id="about" data-section className="mx-auto grid max-w-[1440px] grid-cols-12 gap-5 px-5 py-16 md:px-10 md:py-24">
      <div className="enter col-span-12 md:col-span-4">
        <SectionNumber number="02" />
        <h2 className="mt-4 font-display text-4xl uppercase md:text-6xl">About</h2>
      </div>
      <div className="enter-2 col-span-12 md:col-span-4">
        <AboutPortrait />
      </div>
      <div className="enter-2 col-span-12 space-y-5 text-base leading-relaxed md:col-span-4">
        {site.about.map((t) => <p key={t}>{t}</p>)}
      </div>
    </section>
  );
}
