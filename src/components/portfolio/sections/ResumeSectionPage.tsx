import { ResumeSection } from "@/components/portfolio/ResumeSection";

export function ResumeSectionPage() {
  return <ResumeSection />;
}

/** Light visual separator between the dark Résumé and Contact fields — not a destination. */
export function ContactDivider() {
  return (
    <div id="contact-divider" aria-hidden="true" className="bg-background">
      <div className="mx-auto flex max-w-[1440px] items-center gap-5 px-5 md:px-10" style={{ height: "var(--divider-h)" }} data-x="">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Contact</span>
        <span className="h-px flex-1 bg-accent" />
      </div>
    </div>
  );
}
