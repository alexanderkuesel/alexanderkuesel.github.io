# alkue

Personal site for Alexander Kuesel Montealegre — a services and project showcase
rather than a CV. Plain HTML, CSS and a little vanilla JavaScript: no build step,
no dependencies, no framework.

## Files

```
index.html              the whole page; every bit of copy lives here
assets/css/styles.css   design tokens at the top, then layout and components
assets/js/main.js       theme toggle, mobile menu, scroll-spy, video embed, footer year
assets/img/             photos: web-sized versions plus the originals
```

## Page sections

`What I do` (services) → `Selected projects` → `Speaking & conferences` →
`Background` → `Outside Work` → `Contact`. Each is marked in `index.html` with a
banner comment like `<!-- ============ PROJECTS ============ -->`.

## Editing

- **Add a service**: copy an `<article class="service">…</article>` block and bump
  the `service__num`.
- **Add a project**: copy an `<article class="project">…</article>` block. The
  `project__org` line is the small uppercase label above the title.
- **Add a talk**: copy an `<li class="talk">…</li>` in the speaking section.
- **Add something to Outside Work**: copy an `<article class="pursuit">…</article>`
  block. Same card as a project, minus the orange rule down the side.
- **Colours and spacing**: the custom properties in the `:root` block at the top of
  `assets/css/styles.css`. The palette is defined three times — once for light, then
  again under `prefers-color-scheme: dark` and under `[data-theme="dark"]` for the
  manual toggle — so a colour change needs making in all three.

  The accent orange is `#EC6530`, taken from the Rhizomatix site, along with its
  `rgba(236, 101, 48, …)` tints. It splits into two tokens because the brand orange
  only reaches 3.1:1 on a pale background, short of the 4.5:1 needed for readable text:

  | token | use |
  | --- | --- |
  | `--accent` | anything text-sized — links, labels, small caps. Deep orange (`#b35200`) in light, brand orange in dark |
  | `--accent-bright` | always `#EC6530`: button fills, the play button, the rule down the left of a project card |
  | `--accent-soft` | 10–12% orange wash — chip fills and the hero glow |
  | `--accent-line` | 30% orange hairlines — chip borders, the footer rule |
  | `--accent-text` | near-black label sitting on an orange fill |

  If you swap the orange, keep that split: check any new text-sized colour against
  the background at 4.5:1 before using it.
- **Phone number**: there is a commented-out `<li>` in the contact section.
- **Social preview**: `og:image` currently points at the portrait. For a proper
  card, drop a 1200×630 image in `assets/img/` and point `og:image` at it; the
  URLs in `<head>` want making absolute once the site has a domain.

## Photos

| file | used for |
| --- | --- |
| `alexander-kuesel.jpg` | hero portrait, 900×900, cropped square around the head |
| `ovation-users-conference.jpg` | speaking section, 1600×882 |
| `IMG_3872.JPG`, `IMG_0173.JPEG` | the originals, kept as sources; not referenced by the page |

The web versions are cropped and resized down from the originals (3.2 MB → ~150 KB
each) and re-encoded, which also strips the EXIF — the original conference photo
carried GPS coordinates. If you replace a photo, do the same rather than pointing
the page at a multi-megabyte original.

## The video embed

Embedded YouTube works on GitHub Pages — Pages serves static files and the embed
is an ordinary iframe loaded by the visitor's browser.

This page uses a click-to-load facade: it ships a thumbnail and a play button, and
`main.js` swaps in the real `youtube-nocookie.com` iframe only when someone clicks.
That keeps the page fast and avoids handing YouTube a cookie for visitors who never
press play. Without JavaScript, a `<noscript>` link out to YouTube takes its place.

To feature a different talk, change **both** the `data-video-id` on
`<div class="video">` and the thumbnail `src`
(`https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg`) — plus the `<noscript>` and
"Watch on YouTube" links beside it.

To use a plain always-loaded embed instead, replace the `<div class="video">…</div>`
block with:

```html
<div class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
          title="Talk title" loading="lazy" allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
</div>
```

## Preview locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publish with GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → branch `main`, folder `/ (root)`.
The `.nojekyll` file is there so GitHub serves the files as-is instead of running
them through Jekyll.
