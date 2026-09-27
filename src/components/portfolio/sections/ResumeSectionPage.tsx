import { ResumeSection } from "@/components/portfolio/ResumeSection";
import { SectionNumber } from "@/components/portfolio/SectionHeading";
import { useI18n } from "@/lib/i18n";

export function ResumeSectionPage() {
  return <ResumeSection />;
}

/** Light visual separator between the dark Résumé and Contact fields — not a destination. */
export function ContactDivider() {
  const { t } = useI18n();
  return (
    <div id="contact-divider" className="bg-background">
      <div className="mx-auto flex max-w-[1440px] items-center gap-5 px-5 md:px-10" style={{ height: "var(--divider-h)" }} data-x="">
        <SectionNumber number="04" />
        <h2 id="contact-h" className="font-display text-4xl uppercase md:text-6xl">{t.contact.heading}</h2>
        <span className="h-px flex-1 bg-accent" />
      </div>
    </div>
  );
}
