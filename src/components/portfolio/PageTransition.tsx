import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { SectionId } from "./NavLink";

type Phase = "idle" | "in" | "out";
const ORDER: SectionId[] = ["home", "work", "resume", "about", "contact"];
const Ctx = createContext<{ go: (to: SectionId) => void; active: SectionId }>({ go: () => {}, active: "home" });
export const usePageTransition = () => useContext(Ctx);

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Editorial wipe for nav-link jumps only; manual scrolling is never intercepted. */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [active, setActive] = useState<SectionId>("home");
  const [announce, setAnnounce] = useState("");
  const busy = useRef(false);

  // Track which section is under the reading line (for the active nav state).
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let cur: SectionId = "home";
      for (const id of ORDER) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) cur = id;
      }
      setActive(cur);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);

  const go = useCallback(async (to: SectionId) => {
    const el = document.getElementById(to);
    if (!el || busy.current) return;
    busy.current = true;
    const jump = () => {
      if (to === "home") window.scrollTo({ top: 0, behavior: "auto" });
      else el.scrollIntoView({ behavior: "auto", block: "start" });
      const h = el.querySelector<HTMLElement>("h1, h2");
      if (h) {
        if (!h.hasAttribute("tabindex")) h.setAttribute("tabindex", "-1");
        h.focus({ preventScroll: true });
        setAnnounce(h.textContent ?? "");
      }
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      jump();
      busy.current = false;
      return;
    }
    const half = window.matchMedia("(min-width: 1024px)").matches ? 350 : 250;
    const root = document.documentElement;
    root.style.setProperty("--wipe-half", `${half}ms`);
    root.dataset["wiping"] = "1";
    setPhase("in");
    await wait(half + 20);
    jump();
    el.setAttribute("data-reveal", "");
    requestAnimationFrame(() => setPhase("out"));
    await wait(half + 20);
    setPhase("idle");
    delete root.dataset["wiping"];
    window.dispatchEvent(new Event("wipe:done"));
    busy.current = false;
    setTimeout(() => el.removeAttribute("data-reveal"), 700);
  }, []);

  return (
    <Ctx.Provider value={{ go, active }}>
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
  if (typeof document === "undefined" || document.documentElement.dataset["wiping"] !== "1") return fn();
  window.addEventListener("wipe:done", () => fn(), { once: true });
}
