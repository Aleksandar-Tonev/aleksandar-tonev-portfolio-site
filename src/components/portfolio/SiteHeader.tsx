import { useState } from "react";
import { NavLink, type MainPath } from "./NavLink";

const links: [string, MainPath][] = [["Work", "/work"], ["Resume", "/resume"], ["About", "/about"], ["Contact", "/contact"]];

export function SiteHeader() {
  const [menu, setMenu] = useState(false);
  return (
    <header id="site-header" className="sticky top-0 z-40 border-b border-foreground/15 bg-background">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <NavLink to="/" onNavigate={() => setMenu(false)} className="font-display text-base font-bold tracking-wide">ALEKSANDAR TONEV</NavLink>
        <nav aria-label="Main" className="hidden gap-8 md:flex">
          {links.map(([l, h]) => (
            <NavLink key={h} to={h} className="nav-link font-mono text-xs uppercase tracking-wider">{l}</NavLink>
          ))}
        </nav>
        <button type="button" className="nav-btn md:hidden" aria-expanded={menu} aria-controls="mnav" onClick={() => setMenu((m) => !m)}>
          <span className="font-mono text-xs uppercase">{menu ? "Close" : "Menu"}</span>
        </button>
      </div>
      {menu && (
        <nav id="mnav" aria-label="Mobile" className="border-t border-foreground/15 px-5 pb-4 md:hidden">
          {links.map(([l, h]) => (
            <NavLink key={h} to={h} onNavigate={() => setMenu(false)} className="nav-link block border-b border-foreground/10 py-4 font-display text-2xl uppercase">{l}</NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
