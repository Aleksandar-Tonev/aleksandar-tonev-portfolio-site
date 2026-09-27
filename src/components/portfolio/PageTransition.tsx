import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";

type Phase = "idle" | "in" | "cover" | "out";
const Ctx = createContext<{ go: (to: string) => void }>({ go: () => {} });
export const usePageTransition = () => useContext(Ctx);

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function focusMain() {
  const h = document.querySelector<HTMLElement>("main h1, main h2");
  if (h) {
    if (!h.hasAttribute("tabindex")) h.setAttribute("tabindex", "-1");
    h.focus({ preventScroll: true });
  }
}

/** One top-level editorial wipe: red line + panel in, swap route while covered, panel out. */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const [announce, setAnnounce] = useState("");
  const busy = useRef(false);

  const half = () => (window.matchMedia("(min-width: 1024px)").matches ? 350 : 250);
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const finish = useCallback(() => {
    setPhase("idle");
    delete document.documentElement.dataset['wiping'];
    busy.current = false;
    window.dispatchEvent(new Event("wipe:done"));
    focusMain();
    setTimeout(() => setAnnounce(document.title), 50);
  }, []);

  const go = useCallback(
    async (to: string) => {
      if (busy.current) return;
      if (router.state.location.pathname === to) return;
      busy.current = true;
      if (reduced()) {
        await router.navigate({ to });
        window.scrollTo(0, 0);
        finish();
        return;
      }
      const h = half();
      const root = document.documentElement;
      root.style.setProperty("--wipe-half", `${h}ms`);
      root.dataset['wiping'] = "1";
      setPhase("in");
      await wait(h);
      try {
        await router.navigate({ to });
      } finally {
        window.scrollTo(0, 0);
        requestAnimationFrame(() => setPhase("out"));
        await wait(h + 20);
        finish();
      }
    },
    [router, finish],
  );

  // Back/Forward (or any other in-app navigation): cover instantly, then reveal the correct page.
  useEffect(() => {
    const offBefore = router.subscribe("onBeforeNavigate", (e) => {
      if (busy.current || !e.fromLocation || !e.pathChanged || reduced()) return;
      busy.current = true;
      const h = half();
      document.documentElement.style.setProperty("--wipe-half", `${h}ms`);
      document.documentElement.dataset['wiping'] = "1";
      setPhase("cover");
    });
    const offResolved = router.subscribe("onResolved", async (e) => {
      if (!busy.current || !e.pathChanged) return;
      if (document.documentElement.dataset['wiping'] !== "1") return;
      // only handle the cover path here; `go` finishes its own
      setPhase((p) => {
        if (p !== "cover") return p;
        requestAnimationFrame(() => requestAnimationFrame(() => setPhase("out")));
        setTimeout(finish, half() + 60);
        return p;
      });
    });
    return () => { offBefore(); offResolved(); };
  }, [router, finish]);

  return (
    <Ctx.Provider value={{ go }}>
      {children}
      <div className="wipe" data-phase={phase} aria-hidden="true">
        <div className="wipe-panel" />
      </div>
      <p className="sr-only" aria-live="polite">{announce}</p>
    </Ctx.Provider>
  );
}

/** Run fn now, or once the covering wipe has finished revealing the page. */
export function afterWipe(fn: () => void) {
  if (typeof document === "undefined" || document.documentElement.dataset['wiping'] !== "1") return fn();
  window.addEventListener("wipe:done", () => fn(), { once: true });
}
