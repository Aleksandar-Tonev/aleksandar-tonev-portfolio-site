/** Shared secondary section marker, placed above each main heading. */
export function SectionNumber({ number, name, className = "" }: { number: string; name: string; className?: string }) {
  return (
    <p className={`font-mono text-xs uppercase tracking-wider opacity-70 ${className}`}>
      <span>{number} / {name}</span>
    </p>
  );
}