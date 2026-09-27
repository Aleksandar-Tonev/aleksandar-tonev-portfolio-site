/** EN / BG DICTIONARY — every visible interface string lives here. English content comes from site.ts / projects.ts. */
import { site, resume } from "./site";
import { projects } from "./projects";

export type Lang = "en" | "bg";

export interface ProjectCopy { title: string; category: string; alt: string }

const en = {
  meta: {
    title: "Aleksandar Tonev — Graphic Design · Prepress · AI Visual Content",
    description: "Portfolio of Aleksandar Tonev: graphic design and prepress with production discipline, plus AI visual content and motion.",
  },
  name: "ALEKSANDAR TONEV",
  fullName: site.name,
  skip: "Skip to content",
  nav: { work: "Work", about: "About", resume: "Resume", contact: "Contact", main: "Main", mobile: "Mobile", menu: "Menu", close: "Close" },
  lang: { label: "Language", en: "English", bg: "Bulgarian" },
  hero: { descriptor: site.descriptor, headline: site.headline, intro: site.intro, ctaWork: "Explore selected work", ctaContact: "Get in touch" },
  work: {
    heading: "Selected work",
    carousels: { A: "Carousel A", B: "Carousel B", C: "Carousel C", D: "Carousel D — Video" } as Record<"A" | "B" | "C" | "D", string>,
    showingMany: (a: number, b: number, n: number, g: string) => `Showing projects ${a} to ${b} of ${n} in group ${g}.`,
    showingOne: (a: number, n: number, g: string) => `Showing project ${a} of ${n} in group ${g}.`,
    next: "Next project",
    prev: "Previous project",
    playVideo: "Play video",
    placeholder: "Placeholder",
  },
  overlay: {
    close: "Close project",
    closeVideo: "Close video project",
    client: "Client", role: "Role", services: "Services", tools: "Tools", format: "Format", year: "Year",
    projectNav: "Project navigation",
    videoNav: "Video projects",
    prevProject: "← Previous project",
    nextProject: "Next project →",
    prevProjectAria: "Previous project",
    nextProjectAria: "Next project",
    prevVideo: "← Previous video",
    nextVideo: "Next video →",
  },
  about: {
    heading: "About",
    paragraphs: site.about,
    portraitAlt: "Portrait of Aleksandar Tonev",
    showDuo: "Show duotone portrait",
    showColor: "Show full-colour portrait",
    full: "Full color",
    reveal: "Reveal",
  },
  resume: {
    label: resume.label,
    statement: resume.statement as readonly [string, string],
    paragraph: resume.paragraph,
    signals: resume.signals,
    files: { en: "English CV", bg: "Bulgarian CV" },
    preview: "Preview CV",
    download: "Download PDF",
    newTab: "opens in a new tab",
  },
  contact: {
    heading: "Contact",
    statement: "Have a project or a role in mind? Let's talk.",
    linkedin: "LinkedIn ↗",
  },
  home: { label: "Home", aria: "Return to Home" },
  projects: Object.fromEntries(projects.map((p) => [p.id, { title: p.title, category: p.category, alt: p.alt }])) as Record<string, ProjectCopy>,
};

export type Dict = typeof en;

const bg: Dict = {
  meta: {
    title: "Александър Тонев — Графичен дизайн · Предпечат · AI визуално съдържание",
    description: "Портфолио на Александър Тонев: графичен дизайн и предпечат с производствена дисциплина, AI визуално съдържание и моушън.",
  },
  name: "АЛЕКСАНДЪР ТОНЕВ",
  fullName: "Александър Тонев",
  skip: "Към съдържанието",
  nav: { work: "Проекти", about: "За мен", resume: "Резюме", contact: "Контакт", main: "Основна навигация", mobile: "Мобилна навигация", menu: "Меню", close: "Затвори" },
  lang: { label: "Език", en: "Английски", bg: "Български" },
  hero: {
    descriptor: "Графичен дизайн · Предпечат · AI визуално съдържание · Моушън",
    headline: ["Дизайн с мисъл.", "Създаден да работи."],
    intro:
      "Графичен дизайнер с опит в предпечата. Развивам се в AI съдържание, видео и моушън. Създавам визуална работа, която издържа на екран, на печат и в пространството — композирана с грижа, подготвена за производство.",
    ctaWork: "Разгледай проектите",
    ctaContact: "Свържи се с мен",
  },
  work: {
    heading: "Избрани проекти",
    carousels: { A: "Карусел A", B: "Карусел B", C: "Карусел C", D: "Карусел D — Видео" },
    showingMany: (a, b, n, g) => `Показани са проекти от ${a} до ${b} от общо ${n} в група ${g}.`,
    showingOne: (a, n, g) => `Показан е проект ${a} от общо ${n} в група ${g}.`,
    next: "Следващ проект",
    prev: "Предишен проект",
    playVideo: "Пусни видеото",
    placeholder: "Временно съдържание",
  },
  overlay: {
    close: "Затвори проекта",
    closeVideo: "Затвори видеопроекта",
    client: "Клиент", role: "Роля", services: "Услуги", tools: "Инструменти", format: "Формат", year: "Година",
    projectNav: "Навигация между проектите",
    videoNav: "Видеопроекти",
    prevProject: "← Предишен проект",
    nextProject: "Следващ проект →",
    prevProjectAria: "Предишен проект",
    nextProjectAria: "Следващ проект",
    prevVideo: "← Предишно видео",
    nextVideo: "Следващо видео →",
  },
  about: {
    heading: "За мен",
    paragraphs: [
      "Моята основа е графичният дизайн и предпечатът: оформление, типография, цвят и техническата подготовка, която превръща дизайна в завършено, отпечатано изделие.",
      "Производствената дисциплина определя начина, по който работя във всеки формат — от печат и идентичност до видео и моушън проекти.",
      "Използвам AI и като инструмент за генериране на съдържание: начин да изследвам и развивам идеи, но никога заместител на дизайнерското мислене.",
    ],
    portraitAlt: "Портрет на Александър Тонев",
    showDuo: "Покажи двутоновия портрет",
    showColor: "Покажи цветния портрет",
    full: "В цвят",
    reveal: "Разкрий",
  },
  resume: {
    label: "Резюме / Опит",
    statement: ["15+ години в", "дизайна и производството"],
    paragraph:
      "Графичен дизайнер с над 15 години опит в рекламата, търговския печат, предпечата и визуалната комуникация, готова за производство, който днес надгражда тази основа с AI-асистирано създаване на изображения и видео.",
    signals: ["Графичен дизайн и предпечат", "AI-асистирано генериране на съдържание", "Магистър „Дизайн на обитаваната среда“ · Бакалавър „Инженерен дизайн“"],
    files: { en: "CV на английски", bg: "CV на български" },
    preview: "Преглед на CV",
    download: "Свали PDF",
    newTab: "отваря се в нов раздел",
  },
  contact: {
    heading: "Контакт",
    statement: "Имате проект или позиция наум? Нека поговорим.",
    linkedin: "LinkedIn ↗",
  },
  home: { label: "Начало", aria: "Обратно към началото" },
  projects: {
    a1: { title: "Плакат за фризьорски салон", category: "Дизайн на плакат", alt: "Плакат за фризьорски салон" },
    a2: { title: "Davines — 100% Vitality", category: "Външна реклама", alt: "Davines — 100% Vitality, външна реклама" },
    a3: { title: "Книга на Ботьо Буков", category: "Дизайн на корица", alt: "Корица на книга на Ботьо Буков" },
    a4: { title: "Календар Aspen Invest", category: "Дизайн на календарна глава", alt: "Календар Aspen Invest" },
    b1: { title: "Календар на Сметната палата", category: "Институционален дизайн", alt: "Календар на Сметната палата на Република България" },
    b2: { title: "Капан за сънища", category: "Експериментален дизайн", alt: "Капан за сънища" },
    b3: { title: "Геометрична студия", category: "Илюстрация", alt: "Геометрична студия" },
    c1: { title: "Флаер на Лесотехническия университет", category: "Дизайн на флаер", alt: "Флаер на Лесотехническия университет" },
    c2: { title: "Идентичност Александър Тонев", category: "Бранд идентичност", alt: "Визуална идентичност на Александър Тонев" },
    c3: { title: "Лична визитка", category: "Бранд материали", alt: "Лична визитна картичка" },
    d1: { title: "Моушън етюд", category: "Моушън дизайн", alt: "Моушън етюд" },
    d2: { title: "Архитектурен филм", category: "AI видео / Архитектура", alt: "Архитектурен филм" },
    d3: { title: "Cosmic", category: "AI видео / Експериментално", alt: "Cosmic" },
  },
};

export const dictionaries: Record<Lang, Dict> = { en, bg };
