# Azabell1993.github.io

Personal portfolio and research site — built as a pure HTML/CSS/JS static site
hosted on GitHub Pages.

---

## File structure

```
/
├── index.html              Landing page (home)
├── README.md               This file
├── assets/
│   ├── css/
│   │   └── main.css        All styles (single stylesheet)
│   ├── js/
│   │   └── main.js         Minimal JS (nav toggle + active link)
│   └── img/
│       └── favicon.svg     SVG favicon (edit to change monogram/colour)
├── cv/
│   └── index.html          Curriculum vitae
├── research/
│   └── index.html          Research overview
├── projects/
│   └── index.html          Projects listing
├── notes/
│   ├── index.html          Notes index
│   └── [slug]/
│       └── index.html      Individual note pages (create as needed)
└── contact/
    └── index.html          Contact page
```

---

## Quick customisation checklist

Search for `<!-- CUSTOMIZE:` across all HTML files — every field that
needs a real value is marked with that comment.

Key substitutions:

| Placeholder | Replace with |
|---|---|
| `Azabell` (site name in `<header>`) | Your preferred display name |
| `jiwoo93@kookmin.ac.kr` | Your email address |
| `https://www.linkedin.com/in/park-jiwoo-48b941216/` | Your LinkedIn URL |
| `[University Name]` | Your institution |
| `[Company Name]` | Your employer |
| `[Advisor Name]` | Your supervisor |
| `[Award Name Placeholder]` | Real award or remove the entry |
| `[Placeholder] paper title` | Real paper titles |
| `2026 Azabell` (footer) | Current year + your name |

---

## Changing the accent colour

Open `assets/css/main.css` and edit lines inside `:root {}`:

```css
--c-accent:      #1d4ed8;   /* primary links, active nav */
--c-accent-dark: #1e3a8a;   /* hover state */
```

Replace the hex values with any colour. Dark, medium-saturation colours
work best against the white background.

---

## Editing pages

Each page is a self-contained `index.html` in its subdirectory.
The header/footer HTML is duplicated across pages (no server-side
includes). When you change the nav or footer, update it in **all** files.

Files to change simultaneously when updating global chrome:
- `index.html`
- `cv/index.html`
- `research/index.html`
- `projects/index.html`
- `notes/index.html`
- `contact/index.html`

---

## Adding a project card

In `projects/index.html`, copy the `<article class="card">` block and
fill in:
- `card-name` text and `href`
- `card-description` paragraph
- `tag-list` items (tech stack)
- `card-links` items (GitHub, docs, paper)

---

## Adding a note

1. Create the directory and file:
   ```
   notes/[your-slug]/index.html
   ```

2. Use any existing page as a template. A minimal note page needs:
   - The shared `<header>` / `<footer>` markup
   - A `<main>` with `<div class="container">` containing your content
   - Inside main, use `.prose` for flowing text sections:
     ```html
     <article class="prose">
       <h1>Note title</h1>
       <p>...</p>
     </article>
     ```

3. Add an `<li class="entry">` entry in `notes/index.html` pointing to
   `/notes/[your-slug]/` with a matching date and description.

---

## Editing the CV

All CV sections are in `cv/index.html`. Sections are delimited by
`<h2 class="section-heading">` elements. Each entry follows the pattern:

```html
<li class="entry">
  <span class="entry-title">Title</span>
  <span class="entry-meta">Date range</span>
  <span class="entry-sub">Organisation · Location</span>
  <div class="entry-body">Description or bullet list.</div>
</li>
```

**Print to PDF**: open `cv/index.html` in a browser, use
*File → Print → Save as PDF*. The print stylesheet hides the nav/footer
and optimises typography.

---

## Deployment

This is a GitHub Pages **user site** (`username.github.io`). It deploys
automatically from the `main` (or `master`) branch root.

1. Ensure the repository is named exactly `Azabell1993.github.io`
   (case-insensitive on GitHub).
2. Go to **Settings → Pages** and confirm the source is set to
   `Deploy from a branch → main → / (root)`.
3. Push changes to `main`. GitHub Pages rebuilds within ~1 minute.
4. The site is served at `https://Azabell1993.github.io/`.

No build step required — all files are served as-is.

---

## Local preview

Open `index.html` directly in a browser, **or** use any static file
server to avoid path issues with root-relative asset links (`/assets/…`):

```bash
# Python 3
python3 -m http.server 8000 --directory .
# then open http://localhost:8000

# Node (npx)
npx serve .
```

---

## Browser support

Targets modern evergreen browsers (Chrome, Firefox, Safari, Edge).
Uses CSS custom properties, CSS Grid, and `position: sticky` — all
broadly supported since 2019+. No polyfills required.
