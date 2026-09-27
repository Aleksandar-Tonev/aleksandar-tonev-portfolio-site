import { site } from "@/data/site";
import { HeroFlowerInteraction } from "@/components/portfolio/HeroFlowerInteraction";
import { NavLink } from "@/components/portfolio/NavLink";



export function HeroSection() {
  return (
    <section id="home" data-section className="mx-auto max-w-[1440px] px-5 md:px-10">
      <section className="relative isolate grid grid-cols-12 gap-5 pb-20 pt-16 md:pb-28 md:pt-24">
        <HeroFlowerInteraction />
        <p className="enter col-span-12 font-mono text-xs uppercase tracking-wider md:col-span-3 md:pt-4">
          <span className="text-accent">■</span> {site.descriptor}
        </p>
        <h1 className="enter col-span-12 font-display text-[clamp(3rem,9vw,8.5rem)] font-bold uppercase leading-[0.9] tracking-tight md:col-span-9">
          {site.headline[0]}
          <br />
          <span className="text-muted-foreground">{site.headline[1]}</span>
        </h1>
        <div className="enter-2 col-span-12 mt-8 md:col-span-5 md:col-start-4 lg:col-span-4 lg:col-start-4">
          <p className="text-base leading-relaxed">{site.intro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <NavLink to="work" className="btn-primary">Explore selected work</NavLink>
            <NavLink to="contact" className="btn-ghost">Get in touch</NavLink>
          </div>
        </div>
      </section>
    </section>
  );
}
