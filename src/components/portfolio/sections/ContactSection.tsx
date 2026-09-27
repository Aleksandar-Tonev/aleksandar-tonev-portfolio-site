import { site } from "@/data/site";
import { SectionNumber } from "@/components/portfolio/SectionHeading";



export function ContactSection() {
  return (
    <section id="contact" data-section className="flex contact-min flex-col bg-foreground text-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 py-16 md:px-10 md:py-24">
        <SectionNumber number="04" name="Contact" className="enter" />
        <h2 className="enter mt-4 max-w-4xl font-display text-4xl font-normal uppercase md:text-6xl">
          Have a project or a role in mind? Let's talk.
        </h2>
        <div className="enter-2">
          <a href={`mailto:${site.email}`} className="link-inverse mt-10 inline-block break-all font-display text-xl md:text-3xl">
            {site.email}
          </a>
          <div className="mt-6">
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="link-inverse font-mono text-xs uppercase tracking-wider">
              LinkedIn ↗
            </a>
          </div>
        </div>
        <div className="mt-auto flex justify-between border-t border-background/20 pt-5 font-mono text-[11px] uppercase tracking-wider opacity-70">
          <span>{site.name}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </section>
  );
}
