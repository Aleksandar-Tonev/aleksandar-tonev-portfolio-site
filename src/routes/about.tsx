import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/data/site";
import { AboutPortrait } from "@/components/portfolio/AboutPortrait";

const TITLE = "About — Aleksandar Tonev";
const DESC = "Aleksandar Tonev: graphic design and prepress foundation, production discipline, and AI as a tool for visual content.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main id="main" className="mx-auto grid max-w-[1440px] grid-cols-12 gap-5 px-5 py-16 md:px-10 md:py-24">
      <h1 className="enter col-span-12 font-display text-4xl uppercase md:col-span-4 md:text-6xl">About</h1>
      <div className="enter-2 col-span-12 md:col-span-4">
        <AboutPortrait />
      </div>
      <div className="enter-2 col-span-12 space-y-5 text-base leading-relaxed md:col-span-4">
        {site.about.map((t) => <p key={t}>{t}</p>)}
      </div>
    </main>
  );
}
