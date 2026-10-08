# Khánh Trân — Product design portfolio

Next.js App Router, React, TypeScript, Tailwind CSS, and Lenis. All eleven project routes are statically generated. The original PDF remains unchanged.

## Run

```sh
npm install
npm run dev
```

Production: `npm run build` then `npm start`. Local URL: http://localhost:3000.

Set `SITE_URL` to the public HTTPS origin before a production build. The default is the existing deployment `https://portfolio-kt-nu.vercel.app`, so Open Graph URLs remain valid when the environment variable is missing. Change it for another domain. Deploy on a Node-compatible Next.js host.
## Homepage

The homepage uses Lenis on the native scroll container for eased wheel scrolling and working anchor links; Lenis honors reduced-motion preferences. It has a softened image hero, chronological project timeline, About portrait, and the shared Contact footer. The timeline retains the [ClearPath template](https://clearpath-template.framer.website/) process-section rhythm: airy off-white and sage palette, left-aligned project stories, and one sticky year on the right, without the decorative curve. On desktop, the project copy and cover are larger and centered within the left half, the role is shown from project data, and the backdrop spans the full work section without pale side panels. The year’s last digit rolls from 2026 down to 2022; its digit window leaves room for the entire glyph. Full dates remain on each project card, including multi-year ranges. Under reduced motion the digit jumps without transition and scroll-linked blur is removed.

Desktop timeline motion follows Lenis scroll updates: two soft sage, blue, and warm-tinted background layers drift in opposite directions, while visible project images move by at most 5% inside their frames. The SVG curve and drawing logic are removed. Text and the year stay above the ambient layers. Reduced motion disables background drift and image parallax; there is no continuous idle animation.

The Behind the objects section in `src/app/page.tsx` is split into three desktop screens: portrait and introduction; experience and career timeline; education, practice, and toolkit. At widths above 900px, each screen has a minimum height of the viewport minus the 86px header. `src/app/home.css` keeps the text within that space on standard desktop sizes, while short windows and enlarged content can grow without clipping. `AboutSnap` in `src/components/smooth-scroll.tsx` uses `lenis/snap` proximity snapping only inside About (18% threshold, 250ms debounce). It disables snapping for reduced motion, overflowing screens, and open dialogs, and recalculates points on resize. There is no nested scroll container or locked slideshow. Mobile redesign is out of scope; the existing narrow-screen flow remains unsnapped. Edit profile text, lists, and roles in `src/app/page.tsx`.

Selecting a project opens its complete case study in a native-dialog overlay above the timeline without changing the URL or the page’s scroll position. The overlay and backdrop ease in over 550ms on desktop. The icon-only close control sits in the dark gutter just outside the upper-right edge of the scrollable project panel; on narrow screens it stays inside the panel so it remains reachable. Close, Escape, or the backdrop returns focus to the originating project. Chapter links scroll within the panel, the image viewer remains a nested dialog, and each study ends with an All work control rather than a Next Project block. Project studies are overlay-only; there are no separate detail pages. `src/components/home/project-timeline.tsx` owns chronological rendering and overlay selection; `src/components/home/project-overlay.tsx` owns the overlay; `src/components/case-study-content.tsx` shares the study body. `src/components/smooth-scroll.tsx` configures Lenis; `src/app/home.css` owns homepage layout and animation. The About image uses Khánh Trân’s portrait from PDF page 2. `src/data/projects.ts` remains the sole project and project-image source.

The Work navigation link, timeline cards, and case-study framing do not show project ordinals or total counts. Chapter and gallery figure labels remain for navigation within a study.


## Update content

- `src/data/projects.ts`: project titles, URLs, roles, dates, tags, summaries, story sections, and covers.
- `src/data/assets.json`: original embedded PDF images, grouped by source page.
- `src/data/drawings.json`: cropped renderings of vector sketches on PDF pages 5, 7, 10, and 14. These are artwork crops, not page screenshots.
- `public/images`: optimized WebP assets. Preserve width and height in the asset manifests.
- `src/app/page.tsx`, `src/app/home.css`, `src/components/home/project-timeline.tsx`, `src/components/home/project-overlay.tsx`, and `src/components/smooth-scroll.tsx`: hero, chronological project timeline, About, Lenis scrolling, and case-study overlay.
- `src/data/art-direction.ts`: project-specific cover composition, gallery rhythm, palette, and optional detail image.
- `src/components/portfolio.tsx` and `src/components/case-study-content.tsx`: shared navigation, overlay case-study content, contact, and project metadata.
- `src/components/gallery.tsx`: four gallery modes and native-dialog image viewer with zoom, arrow keys, previous/next controls, and Escape.
- `src/components/exhibition-motion.tsx` and `src/app/template.tsx`: unobtrusive one-time image reveals and route entrance. Images remain visible without JavaScript and with reduced motion.
- `src/app/globals.css`: shared palette, typography, case-study layouts, and focus states.
- `public/khanh-tran-resume.pdf`: page 2 extracted directly from the supplied portfolio.

## Source and editorial decisions

Reviewed all 36 PDF pages, including the closing blue page. The source is a physical/industrial product design portfolio, not a digital UX portfolio. Its identity uses pale blue, navy, clean sans-serif typography, generous white space, and a small flower motif. The current site pairs the portfolio's own objects and technical numbering with a softened sage palette, serif editorial headings, and a deep green closing section. The PDF flower remains as a small maker's mark. The Igochi and ClearPath references informed restraint and page rhythm; no assets or wording were copied.

Documented identity: Trần Huỳnh Khánh Trân; Product R&D Engineer / Product Designer at Maztermind, 2024–present; based in Ho Chi Minh City. Experience also includes Jelly Key, Ki Saigon / reborn.design, and freelance graphic design. Education, software, technical skills, phone, and email are drawn from page 2. No explicit total years of experience, social links, external CV link, or embedded PDF hyperlinks are supplied.

Project groups: Homo Sapiens chess; Trong Dong coffee filter; Luxury Backgammon; Foldable Chess; Tournament Backgammon; Artisan Poker Chips; Jelly Key artisan keycaps (four collections); reborn.design sculptures (four collections); recycled-wood accessories; The Grounded chair glaze R&D; tournament graphic design (two events).

Stories describe documented roles and visible sketches, concepts, materials, product variants, storage, production details, illustration, and finished work. The PDF does not supply user interviews, research findings, UX flows, wireframes, digital UI, prototypes of digital interfaces, digital design systems, before/after comparisons, business metrics, measured outcomes, testimonials, team sizes, constraints, or explicit reflections. Those sections and metric/quote components are intentionally omitted rather than populated with invented claims. Editorial descriptions of visible details are not represented as research findings or measured impact.

Source date discrepancies: Poker Chips is dated 2024 in the index and 2025 on its project page, so the website uses 2024–2025. Sculpture is dated 2022–2023 in the index and 2020–2022 in the project section; the website uses the encompassing 2020–2023 range, also matching the employer tenure. These ranges reconcile inconsistent source labels; they are not asserted production timelines. Material R&D roles for the backgammon and folding chess projects follow the project index, while some project-page subtitles abbreviate the role to Designer.

## Verification

`npm run build` performs production compilation and TypeScript checking. Desktop browser review covers descending years, the single rolling digit, ambient background drift, image parallax, reduced-motion behavior, Lenis wheel smoothing, project overlays, Escape dismissal, and focus restoration. Case studies are overlay-only. No Lighthouse score is claimed.
