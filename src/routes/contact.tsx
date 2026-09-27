import { createFileRoute } from "@tanstack/react-router";
import { OnePage } from "@/components/portfolio/OnePage";

const TITLE = "Contact — Aleksandar Tonev";
const DESC = "Get in touch with Aleksandar Tonev about a project or a role — email or LinkedIn.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return <OnePage initial="contact" />;
}
