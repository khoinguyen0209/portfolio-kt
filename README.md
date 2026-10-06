# Khánh Trân — Product design portfolio

Next.js App Router, React, TypeScript, and Tailwind CSS. All eleven project routes are statically generated. The original PDF remains unchanged.

## Run

```sh
npm install
npm run dev
```

Production: `npm run build` then `npm start`. Local URL: http://localhost:3000.

Set `SITE_URL` to the public HTTPS origin before a production build. The default is the existing deployment `https://portfolio-kt-nu.vercel.app`, so Open Graph URLs remain valid when the environment variable is missing. Change it for another domain. Deploy on a Node-compatible Next.js host.

## Update content

- `src/data/projects.ts`: project titles, URLs, roles, dates, tags, summaries, story sections, and featured selection.
- `src/data/assets.json`: original embedded PDF images, grouped by source page.
- `src/data/drawings.json`: cropped renderings of vector sketches on PDF pages 5, 7, 10, and 14. These are artwork crops, not page screenshots.
- `public/images`: optimized WebP assets. Preserve width and height in the asset manifests.
- `src/app/page.tsx`: four composed project spreads, catalogue, About, experience, and expertise. The featured selection remains in `projects.ts`.
- `src/data/art-direction.ts`: project-specific cover composition, gallery rhythm, palette, and optional detail image. Catalogue numbers follow the original project order; they do not imply product editions.
- `src/components/portfolio.tsx`: navigation, catalogue labels, story layout, contact, and next-project navigation.
- `src/components/gallery.tsx`: four gallery modes and native-dialog image viewer with zoom, arrow keys, previous/next controls, and Escape.
- `src/components/exhibition-motion.tsx` and `src/app/template.tsx`: unobtrusive one-time image reveals and route entrance. Images remain visible without JavaScript and with reduced motion.
- `src/app/globals.css`: restrained palette, self-hosted Manrope/Instrument Serif typography, editorial compositions, touch layouts, focus states, and reduced-motion support.
- `public/khanh-tran-resume.pdf`: page 2 extracted directly from the supplied portfolio.

## Source and editorial decisions

Reviewed all 36 PDF pages, including the closing blue page. The source is a physical/industrial product design portfolio, not a digital UX portfolio. Its identity uses pale blue, navy, clean sans-serif typography, generous white space, and a small flower motif. The redesigned experience treats the work as an object catalogue: warm paper, charcoal, sparing oxide-red derived from the materials, oversized editorial type, technical numbering, varied object imagery, and a dark closing sheet. The PDF flower remains as a small maker's mark. The Igochi reference informed restraint, spatial tension, and world-building only; no assets, layout, wording, or interaction patterns were copied.

Documented identity: Trần Huỳnh Khánh Trân; Product R&D Engineer / Product Designer at Maztermind, 2024–present; based in Ho Chi Minh City. Experience also includes Jelly Key, Ki Saigon / reborn.design, and freelance graphic design. Education, software, technical skills, phone, and email are drawn from page 2. No explicit total years of experience, social links, external CV link, or embedded PDF hyperlinks are supplied.

Project groups: Homo Sapiens chess; Trong Dong coffee filter; Luxury Backgammon; Foldable Chess; Tournament Backgammon; Artisan Poker Chips; Jelly Key artisan keycaps (four collections); reborn.design sculptures (four collections); recycled-wood accessories; The Grounded chair glaze R&D; tournament graphic design (two events).

Stories describe documented roles and visible sketches, concepts, materials, product variants, storage, production details, illustration, and finished work. The PDF does not supply user interviews, research findings, UX flows, wireframes, digital UI, prototypes of digital interfaces, digital design systems, before/after comparisons, business metrics, measured outcomes, testimonials, team sizes, constraints, or explicit reflections. Those sections and metric/quote components are intentionally omitted rather than populated with invented claims. Editorial descriptions of visible details are not represented as research findings or measured impact.

Source date discrepancies: Poker Chips is dated 2024 in the index and 2025 on its project page, so the website uses 2024–2025. Sculpture is dated 2022–2023 in the index and 2020–2022 in the project section; the website uses the encompassing 2020–2023 range, also matching the employer tenure. These ranges reconcile inconsistent source labels; they are not asserted production timelines. Material R&D roles for the backgammon and folding chess projects follow the project index, while some project-page subtitles abbreviate the role to Designer.

## Verification

`npm run build` performs production compilation and TypeScript checking. Browser review covers the homepage, all 11 static project routes at 320px, 768px, and 1440px, metadata and internal anchors, gallery keyboard navigation/zoom/focus restoration, route navigation, reduced-motion behavior, and one-time image reveals. Cached navigation may return HTTP 304; pages rendered successfully. No Lighthouse score is claimed.
