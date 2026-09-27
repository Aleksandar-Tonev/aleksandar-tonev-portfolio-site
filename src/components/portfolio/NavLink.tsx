import type { ReactNode } from "react";
import { usePageTransition } from "./PageTransition";

export type SectionId = "home" | "work" | "resume" | "about" | "contact";

/** Link to a section of the single page; the jump happens under the editorial wipe. */
export function NavLink({ to, className, children, onNavigate }: { to: SectionId; className?: string; children: ReactNode; onNavigate?: () => void }) {
  const { go, active } = usePageTransition();
  return (
    <a
      href={to === "home" ? "/" : `/${to}`}
      className={className}
      aria-current={active === to ? "location" : undefined}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        onNavigate?.();
        go(to);
      }}
    >
      {children}
    </a>
  );
}
