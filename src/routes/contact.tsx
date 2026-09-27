import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/data/site";

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
  component: Contact,
});

function Contact() {
  return (
    <main id="main" className="flex min-h-[calc(100svh-3.5rem)] flex-col bg-foreground text-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 py-16 md:px-10 md:py-24">
        <p className="enter font-mono text-xs uppercase tracking-wider opacity-70">Contact</p>
        <h1 className="enter mt-4 max-w-4xl font-display text-4xl uppercase leading-none md:text-7xl">
          Have a project or a role in mind? Let's talk.
        </h1>
        <div className="enter-2">
          <a href={`mailto:${site.email}`} className="link-inverse mt-10 inline-block break-all font-display text-xl md:text-3xl">
            {site.email}
          </a>
          <div className="mt-6">
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="link-inverse font-mono text-xs uppercase tracking-wider">
              LinkedIn ↗
            </a>
          </div>
        </div>
        <div className="mt-auto flex justify-between border-t border-background/20 pt-5 font-mono text-[11px] uppercase tracking-wider opacity-70">
          <span>{site.name}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </main>
  );
}
