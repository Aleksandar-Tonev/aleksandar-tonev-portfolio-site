import { createFileRoute } from "@tanstack/react-router";
import { OnePage } from "@/components/portfolio/OnePage";

const TITLE = "Résumé — Aleksandar Tonev";
const DESC = "Profile, experience, education and tools of Aleksandar Tonev — 15+ years in graphic design, prepress and production, now with AI visual content.";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return <OnePage initial="resume" />;
}
