import { useEffect } from "react";
import { HeroSection } from "./sections/HeroSection";
import { WorkSection } from "./sections/WorkSection";
import { ResumeSectionPage, ContactDivider } from "./sections/ResumeSectionPage";
import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { jumpTarget, SECTIONS } from "./PageTransition";
import type { SectionId } from "./NavLink";

/** One continuous, naturally scrolling portfolio. Direct links (#hash or /work etc.) jump instantly, no wipe. */
export function OnePage({ initial }: { initial?: SectionId }) {
  useEffect(() => {
    const h = window.location.hash.slice(1) as SectionId;
    const id = SECTIONS.includes(h) ? h : initial;
    if (!id || id === "home") return;
    jumpTarget(id)?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [initial]);
  return (
    <main id="main">
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <ResumeSectionPage />
      <ContactDivider />
      <ContactSection />
    </main>
  );
}
