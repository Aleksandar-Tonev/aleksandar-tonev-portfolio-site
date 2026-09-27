import { createFileRoute } from "@tanstack/react-router";
import { OnePage } from "@/components/portfolio/OnePage";

const TITLE = "Aleksandar Tonev — Graphic Design · Prepress · AI Visual Content";
const DESC = "Portfolio of Aleksandar Tonev: graphic design and prepress with production discipline, plus interior/spatial work and AI visual content.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return <OnePage />;
}
