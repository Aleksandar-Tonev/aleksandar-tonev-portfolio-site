import { useEffect } from "react";
import { HeroSection } from "./sections/HeroSection";
import { WorkSection } from "./sections/WorkSection";
import { ResumeSectionPage } from "./sections/ResumeSectionPage";
import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import type { SectionId } from "./NavLink";

/** One continuous, naturally scrolling portfolio. `initial` jumps (instantly) to a section on direct links. */
export function OnePage({ initial }: { initial?: SectionId }) {
  useEffect(() => {
    if (!initial || initial === "home") return;
    document.getElementById(initial)?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [initial]);
  return (
    <main id="main">
      <HeroSection />
      <WorkSection />
      <ResumeSectionPage />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
