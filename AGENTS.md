<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Portfolio content lives in src/data (projects.ts, site.ts), separate from components in src/components/portfolio — so copy and projects can be swapped without touching layout.
- Single continuous page (OnePage: home/work/resume/about/contact sections); nav links jump instantly under the editorial wipe, manual scroll never wipes; /work etc. routes render the same page and jump to their section — hybrid navigation requested by the user.
- Render the four section sequence markers with the shared SectionNumber presentation component so placement and styling remain consistent across the continuous page.
- All visible text comes from the EN/BG dictionary in src/data/i18n.ts via useI18n() (src/lib/i18n.tsx) — one global language state, saved in localStorage, English default.
