import type { ReactNode } from "react";

/** Shared section title and its secondary sequence number. */
export function SectionHeading({ number, id, className = "", children }: { number: string; id?: string; className?: string; children: ReactNode }) {
  return (
    <h2 id={id} className={`flex items-baseline gap-3 font-display text-4xl font-normal uppercase md:text-6xl ${className}`}>
      <span aria-hidden="true" className="shrink-0 font-mono text-xs font-normal opacity-70 md:text-sm">{number} /</span>
      <span>{children}</span>
    </h2>
  );
}