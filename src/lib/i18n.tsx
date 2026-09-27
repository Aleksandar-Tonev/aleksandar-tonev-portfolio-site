import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { dictionaries, type Dict, type Lang } from "@/data/i18n";
import type { Project } from "@/data/projects";

const KEY = "portfolio-lang";
const Ctx = createContext<{ lang: Lang; t: Dict; setLang: (l: Lang) => void }>({ lang: "en", t: dictionaries.en, setLang: () => {} });

/** Single global language state; English by default, choice saved in localStorage. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === "bg" || saved === "en") setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dictionaries[lang].meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", dictionaries[lang].meta.description);
  }, [lang]);
  const setLang = useCallback((l: Lang) => { setLangState(l); try { localStorage.setItem(KEY, l); } catch { /* ignore */ } }, []);
  return <Ctx.Provider value={{ lang, t: dictionaries[lang], setLang }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);

/** Localized title/category/alt for a project. */
export function useProjectCopy() {
  const { t } = useI18n();
  return (p: Project) => t.projects[p.id] ?? { title: p.title, category: p.category, alt: p.alt };
}
