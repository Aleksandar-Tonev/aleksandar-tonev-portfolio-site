import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { HeroFlowerInteraction } from "@/components/portfolio/HeroFlowerInteraction";
import { NavLink } from "@/components/portfolio/NavLink";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [run, setRun] = useState(0);
  const { t } = useI18n();

  // Replay the 5s fragment sequence only after the visitor genuinely leaves the Hero (<5% visible) and returns (>40%).
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    let left = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e) return;
        if (e.intersectionRatio < 0.05) left = true;
        else if (left && e.intersectionRatio > 0.4) { left = false; setRun((r) => r + 1); }
      },
      { threshold: [0, 0.05, 0.4, 0.6] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="home" data-section className="mx-auto max-w-[1440px] px-5 md:px-10">
      <section className="relative isolate grid grid-cols-12 gap-5 pb-20 pt-16 md:pb-28 md:pt-24">
        <HeroFlowerInteraction key={run} />
        <p className="enter col-span-12 font-mono text-xs uppercase tracking-wider md:col-span-3 md:pt-4">
          <span className="text-accent">■</span> {t.hero.descriptor}
        </p>
        <h1 className="enter col-span-12 font-display text-[clamp(3rem,9vw,8.5rem)] font-bold uppercase leading-[0.9] tracking-tight md:col-span-9 bg-lh-hero">
          {t.hero.headline[0]}
          <br />
          <span className="text-muted-foreground">{t.hero.headline[1]}</span>
        </h1>
        <div className="enter-2 col-span-12 mt-8 md:col-span-5 md:col-start-4 lg:col-span-4 lg:col-start-4">
          <p className="text-base leading-relaxed">{t.hero.intro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <NavLink to="work" className="btn-primary">{t.hero.ctaWork}</NavLink>
            <NavLink to="contact" className="btn-ghost">{t.hero.ctaContact}</NavLink>
          </div>
        </div>
      </section>
    </section>
  );
}
