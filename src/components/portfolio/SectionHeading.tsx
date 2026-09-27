/** Shared secondary section marker, placed beside or above each main heading. */
export function SectionNumber({ number, tone = "accent", className = "" }: { number: string; tone?: "accent" | "resume"; className?: string }) {
  return (
    <p className={`shrink-0 font-mono text-xs uppercase tracking-wider ${tone === "accent" ? "text-accent" : "text-background"} ${className}`}>
      <span>{number}</span> <span className="text-accent">/</span>
    </p>
  );
}