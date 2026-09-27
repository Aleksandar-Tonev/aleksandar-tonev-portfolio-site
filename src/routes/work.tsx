import { createFileRoute } from "@tanstack/react-router";
import { OnePage } from "@/components/portfolio/OnePage";

const TITLE = "Selected Work — Aleksandar Tonev";
const DESC = "Print, identity, editorial and AI video projects by Aleksandar Tonev, in four independent carousels.";

export const Route = createFileRoute("/work")({
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
  return <OnePage initial="work" />;
}
