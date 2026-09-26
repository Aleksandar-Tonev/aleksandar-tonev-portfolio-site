# Aleksandar Tonev — Portfolio Homepage

A single-page editorial portfolio homepage built to the uploaded brief: confident typography, controlled asymmetry, generous white space, and the work itself as the focus.

## Visual system

- Colours: warm paper `#F4F1EA`, near-black `#20201E`, stone `#A7A49C`, vermilion `#D85B3F` used sparingly for hover, focus and small markers.
- Type: Roboto Condensed for headlines, Montserrat for body, IBM Plex Mono for labels, numbers and metadata.
- No gradients, glow, glass effects, or decorative filler. Restrained motion only.

## Page structure (one page)

1. **Header** — name mark `ALEKSANDAR TONEV`, links to Work / About / Contact, understated contact route. Comfortable mobile menu.
2. **Hero** — headline "Design with intent. Built to deliver.", descriptor "Graphic Design · Prepress · AI Visual Content", a short positioning paragraph, primary action "Explore selected work", secondary "Get in touch". Typographic composition only — no invented portrait.
3. **Selected Work** — one unified composition of four independent carousel groups (A, B, C, D) with varied card proportions and deliberate vertical offsets. No category split, no uniform grid. Group A can show three cards on wide screens.
4. **Project overlay** — clicking a card opens a compact overlay on the same page with title, short description, purpose and metadata; closes with the button or Escape.
5. **About** — concise text on graphic design, prepress and production, plus AI visual content. A clearly marked, correctly proportioned space reserved for your real photograph.
6. **Contact / Footer** — short invitation, email `aleksandar.hristov.tonev@gmail.com`, LinkedIn `https://linkedin.com/in/aleksandar-tonev`, minimal footer with your name and the current year.

## Carousels

- Each group keeps its own state and has its own Previous / Next buttons and position indicator. Using one group never moves another.
- Carousel A: three fixed editorial slots on wide desktop. Each slot has a set vertical offset that stays put while you navigate. Previous / Next loop around, and the buttons are locked until each transition finishes.
- Tablet shows two cards where needed and mobile shows one main card. Nothing turns into a uniform slider or card grid.
- No autoplay. Transitions are short (about 500 ms) and use only movement and fading.
- Works with mouse, keyboard and touch. Placeholder media has fixed proportions, so nothing jumps around.
- Motion is removed when the visitor's system asks for reduced motion.

## Overlay

- Built as a proper accessible dialog. Keyboard focus stays inside it while it is open.
- Closes with the close button, the Escape key, or a click on the dimmed background.
- The page behind it can't be clicked or scrolled while it is open.
- On close, focus goes back to the card that opened it, and every carousel stays exactly where it was.

## Content

- Projects live in one typed list separate from the visuals, with `id`, `title`, `category`, `shortDescription`, `purpose`, `images`, `alt` and optional `year`.
- Since real images aren't ready yet, each card uses a clearly labelled placeholder block (typographic, not stock photography) marked as temporary in the data so swapping in real files is a one-line change per project.
- Nothing invented: no awards, clients, testimonials, years or biography.

## Responsive and accessibility

- Deliberate layouts at 1440, 768 and 390 px — the mobile version is rearranged, not shrunk; no sideways scrolling; large touch targets.
- Semantic markup, full keyboard operation, visible focus states, meaningful alt text, strong contrast, and no meaning carried by colour alone.

## Technical notes

- Existing React + TypeScript + Vite + Tailwind project; no new libraries beyond what's installed. Fonts loaded via the root document head; palette and type registered as design tokens in `src/styles.css`.
- Homepage replaces the placeholder at `src/routes/index.tsx`, with section and carousel components under `src/components/` and project data in `src/data/projects.ts`.
- Page-specific title, description and social preview text set on the homepage route.

## Checks and delivery

- Check the build and the browser console. Test the layout at 1440, 768 and 390 px, each carousel on its own, the overlay's focus and Escape behaviour, and reduced motion.
- Then report: the exact files created or changed, where to edit projects, images, portrait, copy, email and links, and a full list of what is still placeholder.
