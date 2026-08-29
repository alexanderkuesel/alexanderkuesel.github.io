# alkue

Personal "about me" site for Alexander Kuesel Montealegre. Plain HTML, CSS and a
little vanilla JavaScript — no build step, no dependencies, no framework.

## Files

```
index.html              the whole page; every bit of copy lives here
assets/css/styles.css   design tokens at the top, then layout and components
assets/js/main.js       theme toggle, mobile menu, scroll-spy, footer year
assets/img/             put your photo / social preview image here
```

## Editing

Open `index.html` and edit the text directly. Each section is marked with a
comment (`<!-- ============ EXPERIENCE ============ -->`) so it's easy to find.

- **Add a job**: copy an entire `<li class="job">…</li>` block in the timeline
  and change the dates, role, employer and bullet points.
- **Add a skill group**: copy an `<article class="card">…</article>` block in the
  skills section.
- **Colours and spacing**: change the custom properties in the `:root` block at
  the top of `assets/css/styles.css`. `--accent` is the one that shifts the whole
  feel of the page; the dark palette is defined twice below it (once for the
  system preference, once for the manual toggle) — change both.
- **Phone number**: there's a commented-out `<li>` in the contact section if you
  want it public.
- **Social preview**: drop an image at `assets/img/og-image.png` (1200×630) and
  update the `og:image` / canonical URLs in `<head>` once the site has a domain.

## Preview locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publish with GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → branch `main`, folder `/ (root)`.
The `.nojekyll` file is there so GitHub serves the files as-is instead of running
them through Jekyll.
