import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { SectionId } from "./NavLink";
import { useI18n } from "@/lib/i18n";

type Phase = "idle" | "in" | "out";
export const SECTIONS: SectionId[] = ["home", "work", "about", "resume", "contact"];
const Ctx = createContext<{ go: (to: SectionId) => void; active: SectionId }>({ go: () => {}, active: "home" });
export const usePageTransition = () => useContext(Ctx);

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Element to align to the top: Contact shows its light divider above it. */
export function jumpTarget(id: SectionId) {
  if (typeof document === "undefined") return null;
  if (id === "contact") return document.getElementById("contact-divider") ?? document.getElementById(id);
  return document.getElementById(id);
}

function jumpTo(id: SectionId) {
  if (id === "home") window.scrollTo({ top: 0, behavior: "auto" });
  else jumpTarget(id)?.scrollIntoView({ behavior: "auto", block: "start" });
}

/** Editorial wipe for link jumps only; manual scrolling is never intercepted. */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [active, setActive] = useState<SectionId>("home");
  const [announce, setAnnounce] = useState("");
  const busy = useRef(false);
  const activeRef = useRef<SectionId>("home");

  // Active section = the one crossing a line at 40% of the viewport (stable, no boundary flicker).
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let cur: SectionId = "home";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) cur = id;
      }
      activeRef.current = cur;
      setActive(cur);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    // Back/Forward between hash entries: instant, no wipe.
    const pop = () => {
      // Project-overlay history entries are handled by WorkSection; never scroll for them.
      if (document.documentElement.dataset["overlay"] || (history.state as { tvOverlay?: string } | null)?.tvOverlay) return;
      const h = (window.location.hash.slice(1) || "home") as SectionId;
      if (SECTIONS.includes(h)) jumpTo(h);
    };
    window.addEventListener("popstate", pop);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      window.removeEventListener("popstate", pop);
    };
  }, []);

  const go = useCallback(async (to: SectionId) => {
    const el = document.getElementById(to);
    if (!el || busy.current || activeRef.current === to) return;
    busy.current = true;
    const jump = () => {
      jumpTo(to);
      const hash = `#${to}`;
      if (window.location.hash !== hash) history.pushState(null, "", hash);
      const h = to === "contact"
        ? document.getElementById("contact-h")
        : el.querySelector<HTMLElement>("h1, h2");
      if (h) {
        if (!h.hasAttribute("tabindex")) h.setAttribute("tabindex", "-1");
        h.focus({ preventScroll: true });
        setAnnounce(h.getAttribute("aria-label") ?? h.textContent ?? "");
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
      <HomeReturn />
      <div className="wipe" data-phase={phase} aria-hidden="true">
        <div className="wipe-panel" />
      </div>
      <p className="sr-only" aria-live="polite">{announce}</p>
    </Ctx.Provider>
  );
}

/** Fixed "← HOME" control, shown outside the Hero and hidden while a project overlay is open. */
function HomeReturn() {
  const { go, active } = usePageTransition();
  const { t } = useI18n();
  const shown = active !== "home";
  return (
    <a
      href="#home"
      aria-label={t.home.aria}
      className="home-return"
      data-shown={shown ? "1" : "0"}
      tabIndex={shown ? undefined : -1}
      aria-hidden={shown ? undefined : true}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        go("home");
      }}
    >
      <span aria-hidden="true" className="home-return-arrow">←</span>
      <span className="home-return-label">{t.home.label}</span>
    </a>
  );
}

/** Run fn now, or once the covering wipe has finished revealing the page. */
export function afterWipe(fn: () => void) {
  if (typeof document === "undefined" || document.documentElement.dataset["wiping"] !== "1") return fn();
  window.addEventListener("wipe:done", () => fn(), { once: true });
}
