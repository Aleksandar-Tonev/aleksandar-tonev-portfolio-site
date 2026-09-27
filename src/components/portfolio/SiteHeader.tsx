import { useState } from "react";
import { NavLink, type SectionId } from "./NavLink";
import { useI18n } from "@/lib/i18n";
import type { Lang } from "@/data/i18n";

const ids: SectionId[] = ["work", "about", "resume", "contact"];

function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  const opts: [Lang, string, string][] = [["en", "EN", t.lang.en], ["bg", "БГ", t.lang.bg]];
  return (
    <div role="group" aria-label={t.lang.label} className={`flex items-center font-mono text-xs uppercase tracking-wider ${className}`}>
      {opts.map(([l, short, full], i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span aria-hidden="true" className="px-1 text-muted-foreground">/</span>}
          <button
            type="button"
            lang={l}
            aria-pressed={lang === l}
            aria-label={full}
            onClick={() => setLang(l)}
            className={`lang-btn min-h-11 min-w-8 px-1 ${lang === l ? "text-accent" : "hover:text-accent"}`}
          >
            {short}
          </button>
        </span>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const { t } = useI18n();
  return (
    <header id="site-header" className="sticky top-0 z-40 border-b border-foreground/15 bg-background">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <NavLink to="home" onNavigate={() => setMenu(false)} className="font-display text-base font-bold tracking-wide">{t.name}</NavLink>
        <div className="hidden items-center gap-8 md:flex">
          <nav aria-label={t.nav.main} className="flex gap-8">
            {ids.map((h) => (
              <NavLink key={h} to={h} className="nav-link font-mono text-xs uppercase tracking-wider">{t.nav[h as "work"]}</NavLink>
            ))}
          </nav>
          <LangSwitch />
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <LangSwitch />
          <button type="button" className="nav-btn" aria-expanded={menu} aria-controls="mnav" onClick={() => setMenu((m) => !m)}>
            <span className="font-mono text-xs uppercase">{menu ? t.nav.close : t.nav.menu}</span>
          </button>
        </div>
      </div>
      {menu && (
        <nav id="mnav" aria-label={t.nav.mobile} className="border-t border-foreground/15 px-5 pb-4 md:hidden">
          {ids.map((h) => (
            <NavLink key={h} to={h} onNavigate={() => setMenu(false)} className="nav-link block border-b border-foreground/10 py-4 font-display text-2xl uppercase">{t.nav[h as "work"]}</NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
