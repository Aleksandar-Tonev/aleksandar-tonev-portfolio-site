import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { usePageTransition } from "./PageTransition";

export type MainPath = "/" | "/work" | "/resume" | "/about" | "/contact";

/** Real link that routes through the editorial wipe. */
export function NavLink({ to, className, children, onNavigate }: { to: MainPath; className?: string; children: ReactNode; onNavigate?: () => void }) {
  const { go } = usePageTransition();
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <Link
      to={to}
      className={className}
      aria-current={path === to ? "page" : undefined}
      activeProps={{}}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        onNavigate?.();
        go(to);
      }}
    >
      {children}
    </Link>
  );
}
