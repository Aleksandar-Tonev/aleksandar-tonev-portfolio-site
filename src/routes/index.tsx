import { createFileRoute } from "@tanstack/react-router";
import { OnePage } from "@/components/portfolio/OnePage";

const TITLE = "Aleksandar Tonev — Graphic Design · Prepress · AI Visual Content · Motion";
const DESC = "Portfolio of Aleksandar Tonev: Graphic designer with a prepress background. Developing in AI content, video and motion.";
/** Production domain (no trailing slash). Social image/URL tags are emitted only when set. */
const SITE_URL = "https://aleksandar-tonev.pages.dev";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: Page,
});

function Page() {
  return <OnePage />;
}
