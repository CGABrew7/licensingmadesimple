# LicensingMadeSimple design system

Scope: restyle every non-homepage page to match the homepage redesign on branch `fable/homepage-redesign` (commit 365d6b9, draft PR #34). The homepage redesign is the source of truth. Production is unchanged and stays unchanged until the owner deploys.

Direction: a licensing desk. Surfaces are separated by tone, not by borders or shadows. Type is Geist Sans only. Labels are sentence case. Green is reserved for the roadmap action.

Source files this guide was written from:

| File | Role |
| --- | --- |
| `src/styles/home.css` | Homepage redesign. Imported only from `src/pages/index.astro`. Every selector starts with `.hp`, `body:has(.hp)`, or `html:has(.hp)`. |
| `src/styles/global.css` | Shared stylesheet, imported by `src/layouts/Layout.astro`. Holds the `:root` tokens and every inner-page class. |
| `src/layouts/Layout.astro` | Head tags, JSON-LD, nav, footer, Clarity script. |
| `src/pages/index.astro` | Homepage markup and its two inline scripts. |

Every value below is copied from those files. If a value is not listed here, it is not in the CSS. Do not add one.

---

## 1. Design tokens

### 1.1 Two token sets, and which one to promote

There are two sets.

1. Shared tokens. `src/styles/global.css`, selector `:root`. Used by every page today.
2. Homepage tokens. `src/styles/home.css`, selector `.hp`. They exist only inside the `.hp` wrapper.

The homepage tokens do not reference the shared tokens. They repeat the same hex values where the two overlap and add five new tones.

**Promote the homepage set (`--h-*` and `--t-*`).** Migrated pages read `--h-*` and `--t-*` only. The shared `:root` set stays in place, untouched, until the last page type is migrated, because unmigrated pages still depend on it. Do not rename tokens. Do not edit `:root` during rollout.

### 1.2 Color

Source: `src/styles/home.css`, selector `.hp`.

| Homepage token | Value | Same value in `global.css :root` | Use |
| --- | --- | --- | --- |
| `--h-ground` | `#f4faf7` | `--tint-50`, `--bg`, `--surface` | Page ground |
| `--h-paper` | `#ffffff` | none | Sheets, FAQ items, row hover, nav bar |
| `--h-wash` | `#ecf3ef` | none | Resting controls, result cells, FAQ hover |
| `--h-stage` | `#e1ebe5` | none | Pale stage band, hairlines on paper, control hover |
| `--h-stage-2` | `#cddbd3` | none | Second staircase step, decorative fill |
| `--h-ink` | `#12211a` | `--tint-900`, `--text`, `--primary`, `--dark` | Text, selected controls |
| `--h-soft` | `#4d6459` | `--tint-600`, `--text-secondary`, `--text-muted` | Secondary labels only |
| `--h-dark` | `#12211a` | `--tint-900` | Dark field |
| `--h-dark-2` | `#223329` | none | Tiles on the dark field |
| `--h-dark-line` | `#2c4035` | none | Hairlines on the dark field |
| `--h-on-dark` | `#f4faf7` | `--tint-50` | Text on dark and on green |
| `--h-on-dark-soft` | `#b6c7be` | `--tint-200` | Secondary text on dark |
| `--h-accent` | `#0b7a55` | `--cta` (`#0B7A55`) | Roadmap button, roadmap field, link hover |
| `--h-accent-press` | `#086348` | `--cta-hover` | Roadmap button hover |

Literal colors in `home.css` that have no token. Reuse them only for the same job.

| Value | Selector | Job |
| --- | --- | --- |
| `#dce8e1` | `.hp-map a` | Tile label on `--h-dark-2` |
| `#5d7468` | `.hp-proof-list a` | Resting underline on dark |
| `#9fb3a8` | `.hp-more a` | Resting underline on ground |
| `#d4e1da` | `body:has(.hp) .footer-grid a` | Footer link (equals `--tint-100`) |
| `#ffffff` | `body:has(.hp) .nav`, footer link hover | Nav bar, footer link hover |

The header and footer rules in `home.css` use literal hex values (`#12211a`, `#ecf3ef`, `#f4faf7`, `#b6c7be`) because the nav and footer sit outside `.hp` and cannot read `--h-*`. Keep them literal while they stay under `body:has(.hp)`.

Shared `:root` colors that the redesign does not use: `--accent` (`#5A6475`), `--accent-light` (`#F7F8FA`), `--tint-300`, `--tint-400`, `--tint-500`, `--tint-700`, `--tint-800`, `--tint-950`. Do not use them on migrated pages.

Color rules taken from the homepage:

- Body text is `--h-ink`. `--h-soft` is for labels and secondary lines, not for paragraphs.
- Green (`--h-accent`) marks the roadmap. The green button leads to the green section. Do not use green for other buttons or bands.
- Separate surfaces by tone. No card borders. No box shadows.

### 1.3 Fonts

Source: `src/layouts/Layout.astro` (imports) and `global.css :root`.

- Family: `--sans: "Geist Sans", "Source Sans 3", "Segoe UI", sans-serif`.
- Loaded weights: `@fontsource/geist-sans` latin 400, 500, 600, 700.
- Weights the homepage uses: 400 body, 500 secondary labels and coverage links, 600 headings, buttons, and emphasized links.
- `--mono` exists in `:root`. The redesign overrides every mono label back to `var(--sans)` with `letter-spacing: 0` and `text-transform: none`. Migrated pages do not use `--mono`.
- The font preload in `Layout.astro` applies only when the path is `/`. Leave it as is.

### 1.4 Type scale

Source: `src/styles/home.css`, selector `.hp`, plus the named selectors.

| Token or selector | Size | Weight | Line height | Letter spacing |
| --- | --- | --- | --- | --- |
| `--t-display` on `.hp-h1` | `clamp(1.5rem, 7.4vw, 5.25rem)` | 600 | 0.98 | -0.045em |
| `.hp-close-line` | `clamp(2.5rem, 10.6vw, 7.5rem)` | 600 | 0.95 | -0.05em |
| `.hp-roadmap-copy .hp-h2` at 900px and up | `clamp(2.5rem, 5vw, 4.5rem)` | 600 | 0.98 | -0.045em |
| `--t-h2` on `.hp-h2` | `clamp(1.875rem, 3.5vw, 3rem)` | 600 | 1.04 | -0.035em |
| `.hp-steps h3` at 900px and up | `clamp(1.5rem, 2.4vw, 2.125rem)` | 600 (global heading rule) | 1.15 | -0.035em |
| `--t-lead` on `.hp-lead` | `clamp(1.25rem, 1.7vw, 1.5rem)` | 500 | 1.35 | -0.012em |
| `--t-lead` on row and card titles (`.hp-core-row h3`) | same | 600 | 1.18 | -0.025em |
| `--t-lead` on `.hp-faq-q` | same | 600 | 1.2 | -0.015em |
| `--t-body` on `.hp` | `1.0625rem` | 400 | 1.55 | none |
| `--t-small` | `0.9375rem` | 400 to 600 by role | 1.4 to 1.5 | 0, or 0.02em on tiles |
| Footer note and footer bottom | `0.875rem` | 400 | inherited | none |

Other real values: `.hp-hero-lead` drops to `1.125rem` with line height 1.4 below 700px. `.hp-faq-toggle` is `1.5rem`, weight 400.

Text wrapping: `.hp h1, .hp h2, .hp h3 { text-wrap: balance; }` and `.hp p { text-wrap: pretty; }`.

Measures used on the homepage: `13em` (h1), `9em` (close line), `20em`, `24em`, `26em`, `30em`, `34em`, `36em`, `40em`, `44em` (FAQ answers). Use `36em` to `44em` for running prose.

### 1.5 Spacing and layout

Source: `src/styles/home.css`, selector `.hp` and the named selectors.

| Token or value | Value | Use |
| --- | --- | --- |
| `--h-pad` | `clamp(20px, 4vw, 40px)` | Inline page padding |
| `--h-gap` | `clamp(72px, 10vw, 152px)` | Section block padding (`.hp-section`) |
| `.hp-wrap` | `max-width: 1280px; margin: 0 auto; padding-inline: var(--h-pad)` | Page container |
| 12-column grid | `repeat(12, minmax(0, 1fr))`, `column-gap: 24px` | All split layouts at 900px and up |
| Stack gap | `4px` | Between stacked rows, tiles, choices, FAQ items |
| Tap target | `min-height: 44px` | Every inline link that stands alone |
| Button height | `min-height: 54px` | `.hp-btn`, result buttons |
| Sticky offset | `top: 104px` | Sticky heading column under the 68px nav |

Breakpoints in `home.css`: `min-width: 700px`, `min-width: 900px`, `min-width: 1200px`, and `max-width: 699px`. Hover-only behavior is gated with `(hover: hover)`.

Breakpoints in `global.css` that still drive the nav and footer: `max-width: 1024px`, `860px` (nav switches to the drawer), `768px`, `640px` (`.req-table` stacks), `420px`.

The shared container is `.container` (`max-width: 1120px; padding: 0 24px`). Migrated pages use the 1280px measure.

### 1.6 Radii

| Token or value | Source | Use |
| --- | --- | --- |
| `--h-r: 4px` | `home.css`, `.hp` | Buttons, sheets, FAQ items, rows, nav button |
| `3px` | `home.css`, `.hp-map a`, `.hp .wiz-choice`, `.hp .ca-switch label`, `.hp .wr-item`, `.hp .ca-abbr` | Small controls and cells inside a sheet |
| `0` | `home.css`, `.hp .wiz-bar`, `.hp-steps li`, `.hp-pair > div`, `.hp-stage` | Bars and full tone blocks |

Legacy radii in `global.css :root`: `--radius: 12px`, `--radius-lg: 12px`, `--radius-btn: 8px`. Do not use them on migrated pages.

### 1.7 Shadows

The homepage uses no shadows. `home.css` sets `box-shadow: none` on every restyled shared component.

Legacy shadows in `global.css :root`: `--shadow-sm`, `--shadow`, `--shadow-lg`. Do not use them on migrated pages. Set `box-shadow: none` when you restyle a shared component that carries one.

### 1.8 Focus

Source: `home.css`.

```css
.hp a:focus-visible,
.hp button:focus-visible,
.hp summary:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}
```

Exceptions that already exist: `.hp .hp-btn:focus-visible { outline-color: var(--h-ink); }`. Controls on a sheet use `outline: 2px solid var(--h-ink); outline-offset: 2px`. Nav uses `2px solid #12211a`, footer uses `2px solid #f4faf7`, both with `outline-offset: 3px`.

### 1.9 Motion

Source: `home.css`.

- Easing: `--h-ease: cubic-bezier(0.2, 0.7, 0.2, 1)`. One curve for everything.
- Durations in use: `0.18s` (tiles, choices, switch labels), `0.2s` (buttons, FAQ item, underline color), `0.25s` (arrows, row hover), `0.3s` (FAQ toggle, progress bar), `0.35s` (FAQ answer), `0.4s` (wizard panels), `0.5s` (tiles on load), `0.8s` (hero and scroll rise), `0.9s` (board fade).
- Keyframes: `hp-rise` (opacity 0 and `translateY(18px)` to rest), `hp-fade` (opacity only), `hp-tile` (opacity 0 and `scale(0.6)` to rest, homepage board only).
- Hover and press: `.hp-arrow` moves `translateX(4px)`. `.hp-btn:active` moves `translateY(1px)`.
- Scroll rise: elements with `data-rise` start at `opacity: 0; transform: translateY(26px)` and transition over `0.8s`. Stagger with `style="--d:1"`, which adds `calc(var(--d, 0) * 80ms)` of delay.

The scroll rise is safe by construction. The hiding rule is `.hp-js .hp [data-rise]`. The class `hp-js` is added to `<html>` by the inline script at the top of `index.astro`, only when `IntersectionObserver` exists. Without the script, nothing is hidden.

### 1.10 Reduced motion

Source: `home.css`. All entrance animation sits inside `@media (prefers-reduced-motion: no-preference)`. The reduce block is:

```css
@media (prefers-reduced-motion: reduce) {
  html:has(.hp) { scroll-behavior: auto; }
  .hp *,
  .hp *::before,
  .hp *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-delay: 0s !important;
  }
}
```

The board script in `index.astro` also checks `window.matchMedia('(prefers-reduced-motion: reduce)')` before it animates the panel.

There is also a print rule that un-hides rise elements:

```css
@media print {
  .hp-js .hp [data-rise] { opacity: 1; transform: none; }
}
```

**Gaps builders must close.**

1. `global.css` sets `html { scroll-behavior: smooth; }` with no reduced-motion guard. The guard exists only as `html:has(.hp)`. A migrated page gets it once the page has the `.hp` wrapper and loads the shared sheet from section 2.1. Do not ship a migrated page without both.
2. The nav and footer sit outside `.hp`, so `.hp *` does not reach them. `.nav-cta` carries a `0.2s` background transition in `global.css`. Add this rule to the shared sheet in the chrome step:

```css
@media (prefers-reduced-motion: reduce) {
  body:has(.hp) .nav *,
  body:has(.hp) .footer * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-delay: 0s !important;
  }
}
```

---

## 2. Component catalog

### 2.1 How to promote homepage CSS without touching unmigrated pages

The homepage already has an opt-in switch: the wrapper class `.hp`. A page that has no `.hp` element matches nothing in `home.css`. Keep that switch.

Mechanism, in three parts:

1. **A second stylesheet, linked per template.** Create one new file, `src/styles/desk.css` (a proposed file name, it does not exist yet). Move the reusable rules out of `home.css` into it. Import it from `index.astro` before `home.css`, and from each template as that template is migrated. Do not import it from `Layout.astro` during rollout.
2. **A wrapper class.** In a migrated template, wrap everything inside `<Layout>` in `<div class="hp">`. The homepage wrapper is `class="home hp"`. Inner pages use `hp` only. `.home` carries legacy homepage rules in `global.css`.
3. **Scoped overrides of shared classes.** `home.css` already restyles shared components by prefixing them: `.hp .ca-card`, `.hp .wizard-card`, `.hp .btn-quiet`. Do the same for inner-page classes: `.hp .page-hero`, `.hp .lms-table`, `.hp .faq-item`. This keeps template markup, schema, links, and data untouched.

Opt-in markup for a migrated template:

```astro
---
import Layout from '../layouts/Layout.astro';
import '../styles/desk.css';
// existing imports and data stay as they are
---
<Layout title={/* unchanged */} description={/* unchanged */} jsonLd={/* unchanged */}>
  <div class="hp">
    <!-- existing sections, unchanged copy -->
  </div>
</Layout>
```

What moves from `home.css` to `desk.css`:

| Move to `desk.css` (shared) | Stays in `home.css` (homepage only) |
| --- | --- |
| The `.hp` token block | `.hp-hero`, `.hp-h1`, `.hp-hero-row`, `.hp-hero-lead`, `.hp-hero-aside`, `.hp-actions` |
| `.hp-wrap`, text-wrap rules, focus rules | `.hp-board-field`, `.hp-board`, `.hp-board-head`, `.hp-board-title`, `.hp-board-hint`, `.hp-map`, `.hp-reading*`, `.hp-proof-list` |
| `.hp-h2`, `.hp-lead`, `.hp-section`, `.hp-arrow` | `.hp-dir-grid`, `.hp-dir-copy`, `.hp-stage` layout, all `.hp .ca-*` |
| `.hp-btn`, `.hp-link`, `.hp-dark`, `.hp .btn-quiet` | `.hp-roadmap*`, `.hp #wizard`, all `.hp .wizard-*`, `.hp .wiz-*`, `.hp .wr-*` except `.hp .wr-item-label` |
| `.hp-split`, `.hp-split-head`, `.hp-split-body` | `.hp-path-lead`, `.hp-behind*` |
| `.hp-core-list`, `.hp-core-row`, `.hp-core-go`, `.hp-more` | `@keyframes hp-tile` and the `.hp-map a` animation rules |
| `.hp-steps`, `.hp-pair*` | The per-section `padding-top: 0` rules (`.hp-core`, `.hp-behind`, `.hp-faq`) |
| `.hp-faq-list`, `.hp-faq-item`, `.hp-faq-q`, `.hp-faq-toggle`, `.hp-faq-a` | |
| `.hp-close`, `.hp-close-grid`, `.hp-close-line` | |
| `.hp .wr-item-label` (used by `.lms-factbar` on state x type pages) | |
| `@keyframes hp-rise`, `@keyframes hp-fade`, the `[data-rise]` rules, the reduce block, the print block | |
| The whole `body:has(.hp)` header and footer block | |

Rules for the move:

- Move rules. Do not rewrite values. The homepage must render the same before and after.
- Keep source order inside each file. `desk.css` loads first, `home.css` second.
- Add `.hp { overflow-x: clip; }` to `desk.css` only if an inner page uses a bleed layout. The homepage gets that rule today from `.home` in `global.css`.
- Per-page scoped `<style>` blocks (for example `.article p` in the guide and legal templates) can outrank shared rules. When you migrate a template, remove its scoped block in the same change and move the equivalent rule into `desk.css` under `.hp .article`. Check computed styles after the build.

Scroll rise on inner pages is optional. If a template uses `data-rise`, it must also include the small `IntersectionObserver` script that `index.astro` carries at the top of its wrapper (move it into a shared partial rather than pasting it). Do not put `data-rise` on tables, long prose blocks, or any element that can be taller than the viewport. Use it on headings and short blocks only. The generated sets (state profile, state x type, directory type) should skip it.

End state, after all ten page types are migrated: move `desk.css` into `Layout.astro`, drop the `body:has(.hp)` prefix from the chrome rules, and retire the unused legacy rules in `global.css`. That is a separate cleanup PR. The header and footer restyle depends on `:has()` until then. A browser without `:has()` shows the current header and footer.

### 2.2 Nav

Markup: `src/layouts/Layout.astro`, `<nav class="nav" aria-label="Primary">`. Classes: `.nav`, `.nav-inner`, `.nav-logo`, `.nav-desktop`, `.nav-mobile`, `.nav-cta`, `.nav-drawer`, `.nav-drawer-panel`, `.burger`.

Redesign rules, already written in `home.css` under `body:has(.hp)`:

- `.nav`: background `#ffffff`, bottom border transparent.
- `.nav-inner`: `max-width: 1280px`, `padding-inline: clamp(20px, 4vw, 40px)`, `min-height: 68px`.
- `.nav-desktop`: `gap: 28px`. Links are `#12211a`, `0.9375rem`, `min-height: 44px`, underline on hover with `text-underline-offset: 6px` and `text-decoration-thickness: 2px`.
- `.nav-cta`: `min-height: 44px`, `padding: 0 16px`, `border-radius: 4px`, `0.9375rem`. Color stays `--cta` from `global.css`.
- `.nav-drawer > summary`: 44px by 44px, no border, `border-radius: 4px`, background `#ecf3ef`.
- `.nav-drawer-panel`: no border, `border-radius: 4px`. Panel links `border-radius: 3px`.

Reuse: no markup change. A page gets this nav when it has the `.hp` wrapper and loads `desk.css`. Do not change nav items, order, labels, or the `/#wizard` target. Keep `aria-label="Primary"` and the `.sr-only` menu label.

### 2.3 Footer

Markup: `Layout.astro`, `<footer class="footer" aria-label="Site footer">`. Classes: `.footer`, `.footer-art` (from `FooterArt.astro`), `.footer-grid`, `.footer-brand`, `.footer-note`, `.footer-bottom`.

Redesign rules, already written under `body:has(.hp)`:

- `.footer`: `padding-top: clamp(48px, 6vw, 80px)`. Container `max-width: 1280px`, `padding-inline: clamp(20px, 4vw, 40px)`.
- `.footer h4`: sans, `0.9375rem`, weight 600, `letter-spacing: 0`, no uppercase, color `#f4faf7`.
- `.footer-grid a`: `padding: 7px 0`, `0.9375rem`, color `#d4e1da`. Hover `#ffffff` with underline, `text-underline-offset: 4px`.
- `.footer-brand p`: `0.9375rem`, `#b6c7be`, `max-width: 26em`.
- `.footer-note` and `.footer-bottom`: `0.875rem`, `#b6c7be`. `.footer-bottom` has no top border.

Reuse: no markup change. Do not edit footer links, the footer note, the copyright line, or the Cornerstone Licensing credit. The footer art and the logo stay as they are.

### 2.4 Page hero (inner pages)

Current: `.page-hero` in `global.css`. Centered, bottom border, h1 at `clamp(2rem, 4vw, 3rem)`. Children in use: `.lms-crumb`, `.crumb-list`, `.lms-kicker`, `h1`, `p`, `.lede`, `.hub-byline` (from `Byline.astro`), `.section-links.hub-jumps`, `.hub-up`.

Homepage reference: `.hp-hero`, `.hp-h1`, `.hp-hero-row`, `.hp-lead`. Headline large and left, lead under it, no border.

Restyle under `.hp .page-hero` in `desk.css`, with existing values only:

- Left aligned. No bottom border. Background stays the ground. Top padding `clamp(32px, 4vw, 56px)` (from `.hp-hero`). Container at the 1280px measure with `padding-inline: var(--h-pad)`.
- `h1`: weight 600. Two sizes, both real.
  - Short hub titles (states hub, directory hub, guides hub, FAQ, about, contact, legal, 404): `clamp(2.5rem, 5vw, 4.5rem)`, line height 0.98, letter spacing -0.045em.
  - Long generated titles (state profile, state x type, directory type, guide articles): `var(--t-h2)`, line height 1.04, letter spacing -0.035em.
  - Keep `overflow-wrap: break-word`. Do not use `--t-display` on inner pages. It is sized for the homepage headline.
- First paragraph or `.lede`: the `.hp-lead` values. `max-width: 34em`, `margin: 0`, color `--h-ink`. Further paragraphs: `--t-body`, `max-width: 40em`.
- `.lms-kicker`: sans, `--t-small`, weight 500, `letter-spacing: 0`, `text-transform: none`, color `--h-soft`. These are the values of `.hp .wizard-result .lms-kicker`.
- `.lms-crumb` and `.crumb-list`: `--t-small`, color `--h-soft`, `justify-content: flex-start`. Keep `aria-label="Breadcrumb"` and `aria-current="page"`.
- `.hub-byline`: `--t-small`, color `--h-soft`. `time` stays ink, weight 600.
- `.section-links.hub-jumps`: `justify-content: flex-start`. Links use the `.hp-more a` values (weight 500, underline, `text-underline-offset: 5px`, resting underline `#9fb3a8`, `min-height: 44px`).
- Load motion: `animation: hp-rise 0.8s var(--h-ease) both` on the h1, with `0.08s` delay on the lead, inside `@media (prefers-reduced-motion: no-preference)`.

### 2.5 Section bands

Current: `.section` (`padding: 88px 0`), `.section-alt` (same color as the ground, so no visible band), `.section-title` and `.section-sub` (centered), `.cta-band` (dark, centered).

Homepage bands:

| Band | Class | Values |
| --- | --- | --- |
| Ground | `.hp-section` | No background. `padding-block: var(--h-gap)`. Consecutive sections drop the top padding (`padding-top: 0`). |
| Dark field | `.hp-dark` | `background: var(--h-dark); color: var(--h-on-dark)`. |
| Pale stage | `.hp-stage` | `background: var(--h-stage)`. Holds a white sheet. |
| Green field | `.hp-roadmap` | `background: var(--h-accent)`. Homepage wizard only. Do not reuse on inner pages. |
| Light and dark pair | `.hp-pair`, `.hp-pair-map`, `.hp-pair-filing` | Two halves meeting on one edge, paper and dark. |

Restyle under `.hp`:

- `.hp .section`: `padding-block: var(--h-gap)`. Container at 1280px.
- `.hp .section-alt`: `background: var(--h-stage)`. Cards and tables inside it sit on `--h-paper`.
- `.hp .section-title`: the `.hp-h2` values, `text-align: left`.
- `.hp .section-sub`: `text-align: left`, `margin-left: 0`, `--t-body`, color `--h-ink`, `max-width: 40em`.
- Heading left, content right: use `.hp-split` with `.hp-split-head` (columns 1 to 4, sticky at `top: 104px`) and `.hp-split-body` (columns 6 to 12). Use it where a section has one heading and one list or table.
- `.cta-band` (FAQ page): use the close pattern in 2.7.
- Many templates set `style="max-width:720px"` on `.container`. Remove the inline style when you migrate the template and set the prose measure in CSS (`max-width: 44em`, left aligned inside the 1280px container).

### 2.6 Cards and rows

Current: `.card-grid`, `.card`, `.lms-dir-card`, `.lms-card-link`, `.lms-core-grid`, `.lms-agency-grid`, `.lms-state-grid`, `.neighbor-list`, `.lms-factbar`, `.author-box`, `.lms-cta`.

The homepage has no bordered card grid. It has three surfaces. Pick by content.

**Rows.** `.hp-core-list` and `.hp-core-row`. For a list of destinations with a title and a line of description.

```html
<ul class="hp-core-list" role="list">
  <li>
    <a class="hp-core-row" href="/directory/collection">
      <h3>State licensing rules for debt collectors</h3>
      <p>Which states require a collection agency license, including the Colorado and Wyoming applications, and which board or department takes the filing.</p>
      <span class="hp-core-go">Open the collection page<span class="hp-arrow" aria-hidden="true"> →</span></span>
    </a>
  </li>
</ul>
```

Values: `padding: 22px 20px` with matching negative inline margin, `border-radius: var(--h-r)`, hover `background: var(--h-paper)`. At 700px and up the row is `minmax(0, 1fr) auto` with the destination label at the right end. Use `.hp-core-go` only when the card already has link text (`.lms-card-link`). Do not write new link text.

**Sheets.** A white sheet on a pale stage, as in `.hp .ca-card`: `background: var(--h-paper); border: 0; border-radius: var(--h-r); box-shadow: none; padding: clamp(18px, 2.6vw, 32px)`. Restyle `.hp .card`, `.hp .author-box`, and `.hp .lms-cta` this way. Inside a sheet, separate rows with `border-top: 1px solid var(--h-stage)`.

**Cells.** Small fact cells, as in `.hp .wr-item`: `background: var(--h-wash); border: 0; border-radius: 3px; padding: 14px 16px`, stacked with `gap: 4px`. Restyle `.hp .lms-factbar > div` this way. Its labels use `.wr-item-label`, which the homepage already restyles (`--t-small`, no uppercase, `--h-soft`).

Other mappings:

- `.hp .card-grid`: `gap: 4px`. Cards on the ground or stage are paper. `.card h3` uses `--t-lead` at weight 600, line height 1.18, letter spacing -0.025em. `.card p` uses `--t-body`, color `--h-ink`. No hover shadow.
- `.hp .lms-card-link`: the `.hp-core-go` values (`--t-small`, weight 600, underline 2px, offset 5px). Parent hover turns it `--h-accent`.
- `.hp .neighbor-list a`: `background: var(--h-wash)`, no border, `border-radius: 3px`, hover `background: var(--h-stage)`. These are the `.hp .ca-switch label` values. On a stage band use `--h-paper` at rest.
- `.hp .lms-inline-states`: left aligned. Links at `min-height: 44px`.
- `.hp .lms-cta` (`FileWithCornerstone.astro`): a paper sheet. `.lms-cta-kicker` takes the kicker values in 2.4. `.lms-cta-btn` stays ink, see 2.7. Keep `id="filing-cta"`, `target="_blank"`, and `rel="noopener"`.
- `.hp .author-box` (`AuthorBox.astro`): a paper sheet. Links weight 600, underlined, hover `--h-accent`.
- `.hp .lms-disclaimer` (`DirectoryDisclaimer.astro`): `--t-small`, color `--h-soft`. Text unchanged.

### 2.7 Buttons and links

| Class | Source | Use |
| --- | --- | --- |
| `.hp-btn` | `home.css` | The roadmap action. Green, `min-height: 54px`, `padding: 0 24px`, `border-radius: var(--h-r)`, weight 600. Hover `--h-accent-press`. Active `translateY(1px)`. |
| `.hp-link` | `home.css` | Secondary action. Ink, weight 600, underline 2px, offset 5px, `min-height: 44px`. Hover `--h-accent`. |
| `.hp-arrow` | `home.css` | Arrow span inside a button or link. `aria-hidden="true"`, text content is a space and `→`. |
| `.hp .btn-quiet` | `home.css` | Quiet button. `min-height: 54px`, no border, `background: var(--h-wash)`, hover `--h-stage`. |
| `.hp-more a` | `home.css` | Inline link rows. `--t-small`, weight 500, underline with `#9fb3a8` at rest. |

```html
<a href="/#wizard" class="hp-btn">Get Your Roadmap<span class="hp-arrow" aria-hidden="true"> →</span></a>
<a class="hp-link" href="/directory">Browse the Directory</a>
```

Mapping for existing inner-page buttons:

- `.hero-cta` (about) and `.cta-band .cta-btn` (FAQ): both point to `/#wizard`. Give them the `.hp-btn` values.
- `.lms-cta-btn`: points to Cornerstone, not to the roadmap. Keep it ink: `background: var(--h-ink); color: var(--h-on-dark); min-height: 54px; border-radius: var(--h-r)`. Do not make it green.
- `.btn-quiet` (directory hub): covered by `.hp .btn-quiet`.
- Links inside prose: weight 600, `text-decoration: underline`, `text-underline-offset: 4px`, hover `--h-accent`. These are the `.hp-faq-a a` values. Today prose links have no underline until hover.
- Where a template joins links with a middle dot, you may drop the dot and space the links with `gap` as the homepage did. Keep every link and its text.

Close pattern, for the end of a page. Classes `.hp-close`, `.hp-close-grid`, `.hp-close-line`, with a `.hp-lead` and a `.hp-btn`. Use the page's existing heading, paragraph, and button text. The FAQ page already has all three:

```html
<section class="hp-close">
  <div class="hp-wrap hp-close-grid">
    <h2 class="hp-close-line">See the license and the desk.</h2>
    <p class="hp-lead">Three questions name the license type. The full state list stays in the directory.</p>
    <a class="hp-btn" href="/#wizard">Get Your Roadmap<span class="hp-arrow" aria-hidden="true"> →</span></a>
  </div>
</section>
```

Do not add a close section to a page that has no closing call to action today.

### 2.8 Tables

The homepage has no `<table>`. Its tabular language is the definition rows in `.hp .ca-rows`, `.hp .wr-rows`, and `.hp-reading-rows`: sentence-case labels in `--h-soft`, values in ink, hairlines in `--h-stage` on paper or `--h-dark-line` on dark.

Inner-page tables: `.lms-table-wrap`, `.lms-table`, `.hub-table`, `.hub-note`, `.hub-cited` (directory type pages), and `.req-wrap`, `.req-table`, `.lms-verified`, `.tool-row` (state x type pages).

Restyle under `.hp`, with existing values only:

- Wrapper (`.lms-table-wrap`, `.req-wrap`): `background: var(--h-paper); border: 0; border-radius: var(--h-r)`. Keep `overflow-x: auto` on `.lms-table-wrap` and `overflow: hidden` on `.req-wrap`.
- Header cells: sans, `--t-small`, weight 500, `letter-spacing: 0`, `text-transform: none`, color `--h-soft`, `background: var(--h-wash)`, no bottom border.
- Body cells: `--t-body` for `.req-table`, `--t-small` for the wide `.lms-table`. Color `--h-ink`. `border-top: 1px solid var(--h-stage)`. Padding `14px 16px`.
- Row header cells (`th scope="row"`): weight 600, ink.
- Row hover on `.lms-table`: `background: var(--h-wash)`.
- Links in cells: the prose link values in 2.7.
- `.hub-note`: `--t-small`, ink. `.hub-cited`: `--t-small`, `--h-soft`.
- `.lms-verified`: `--t-small`, `--h-soft`. `time` stays ink, weight 600.
- `.tool-row a`: the `.hp-link` values at `--t-small`.

Keep: `scope` attributes, `thead`, the `min-width: 760px` on `.hub-table`, the 640px stacked layout of `.req-table`, section ids used as jump targets (`hub.tableId`, `#faq`, `#states`), and every cell value and source link.

### 2.9 FAQ

Homepage classes: `.hp-faq-list`, `.hp-faq-item`, `.hp-faq-q`, `.hp-faq-toggle`, `.hp-faq-a`.

```html
<details class="hp-faq-item">
  <summary class="hp-faq-q">Can I do it myself?<span class="hp-faq-toggle" aria-hidden="true">+</span></summary>
  <div class="hp-faq-a">...existing answer markup...</div>
</details>
```

Values: list `gap: 4px`. Item `background: var(--h-paper); border-radius: var(--h-r)`, closed hover `--h-wash`. Question `min-height: 68px`, `padding: 18px clamp(18px, 2.4vw, 28px)`, `--t-lead`, weight 600. Toggle rotates 45 degrees when open. Answer `max-width: 44em`, bottom padding `24px`, rises with `hp-rise 0.35s` when opened.

Inner pages use `.faq-list`, `.faq-item`, `.faq-q`, `.faq-toggle`, `.faq-a` (FAQ page, directory type pages, state x type pages). Two ways to migrate. Pick one per template.

1. Swap the class names to the `hp-faq-*` set. Right for `faq.astro`.
2. Keep the class names and restyle `.hp .faq-item`, `.hp .faq-q`, `.hp .faq-toggle`, `.hp .faq-a` with the same values. Right for the generated templates.

In both cases: remove the item border and bottom margin, set answer text to `--t-body` in ink, add `aria-hidden="true"` to the toggle span if you touch the markup, and keep the native `details` and `summary` elements. Inside a narrow prose column, set the question to `--t-body` at weight 600 with `min-height: 54px` so long generated questions do not dominate. The `FAQPage` JSON-LD on directory type and state x type pages is built from data. Do not touch it. Do not change questions or answers.

State x type pages also carry a plain `.lms-faq` block (`h3` and `p` pairs, `id="license-faq"`). Leave it as headings and paragraphs. Keep the id.

### 2.10 Forms and controls

No template read for this guide contains a text input, select, or form submission. The contact page is one mailto line. `.form-group` rules exist in `global.css` and have no homepage equivalent. Do not add forms. Do not style `.form-group` by guesswork.

The site's interactive controls are button and radio based, and both are restyled in `home.css`:

- Wizard (`LicenseWizard.jsx`, homepage only): `.wizard-card`, `.wiz-progress`, `.wiz-bar`, `.wiz-q`, `.wiz-choices`, `.wiz-choice`, `.wiz-choice-row`, `.wiz-choice-title`, `.wiz-choice-sub`, `.wiz-meta`, `.wiz-back`, `.wiz-text`, `.wiz-note`, `.wizard-result`, `.wr-title`, `.wr-details`, `.wr-item`, `.wr-rows`, `.wr-actions`. Choice: `min-height: 64px`, `background: var(--h-wash)`, `border-radius: 3px`, hover turns ink with on-dark text. Do not edit the component, its labels, or its data.
- Segmented switch (`CaliforniaSample.astro`, homepage only): `.ca-switch`, `.ca-input`, `.ca-fact`, `.ca-rows`. Resting label `--h-wash`, checked label ink. Keep `role="radiogroup"` and its `aria-label`.

Inner pages link to the wizard with `/#wizard`. They do not embed it.

### 2.11 Distinctive homepage components

| Component | Classes | Reuse on inner pages |
| --- | --- | --- |
| State board | `.hp-board`, `.hp-map`, `.hp-reading`, `.hp-proof-list` | The tile colors only (see states hub in 3). Do not copy the tile map, the panel, or the board script. |
| Staircase | `.hp-steps` (three `li`, tones `--h-stage`, `--h-stage-2`, `--h-dark`, offsets `56px` and `112px` at 900px and up) | The three steps on the about page. Three items only. |
| Light and dark pair | `.hp-pair`, `.hp-pair-map`, `.hp-pair-filing` | Optional, for a two-part statement that already exists on a page. |
| Sheet on a stage | `.hp-stage` with a paper sheet | Tables and fact sheets in `.section-alt` bands. |
| Roadmap field | `.hp-roadmap` | Homepage only. |

No receipts, tickets, stamps, or ledgers exist in the homepage CSS. Do not add them.

### 2.12 What must not change in any component

- `Layout.astro` head output: title, description, canonical, robots, Open Graph, Twitter tags, favicon, font preloads, and every JSON-LD block.
- The Clarity script at the end of `Layout.astro`, its id, and its load timing.
- `<main id="main">`, `aria-label` values, `.sr-only` text, heading order, `scope` attributes, `time datetime` values, `target` and `rel` on links.
- Link targets and link text. Section ids.

---

## 3. Page-type rollout plan

Do the steps in the order shown. Each step is one draft PR. Size key: S is under half a day and one or two files. M is several files or one template with many parts. L is one template with many conditional parts and a large generated set to check.

| Order | Page type | Files | Size | Edit a generator or a single template |
| --- | --- | --- | --- | --- |
| 1 | Shared chrome and shared sheet | `src/styles/desk.css` (new), `src/styles/home.css`, `src/pages/index.astro` (one import) | M | Stylesheets only. Unblocks everything. |
| 2 | FAQ | `src/pages/faq.astro` | S | Single template. |
| 3 | About and contact | `src/pages/about.astro`, `src/pages/contact.astro` | S | Two single templates. |
| 4 | Legal and utility | `privacy.astro`, `terms.astro`, `404.astro`, `privacy/chrome-license-expiration-tracker.astro` | S | Four single templates, one shared `.article` rule. |
| 5 | Guides hub and articles | `src/pages/guides/index.astro` plus five articles | M | Six single templates, repeated structure. |
| 6 | States hub | `src/pages/states/index.astro` | S | Single template. |
| 7 | Directory hub | `src/pages/directory/index.astro` | S | Single template plus three shared components. |
| 8 | Directory type pages | `src/pages/directory/[type].astro` | M | One template, three branches, two table shapes. |
| 9 | State profile | `src/pages/states/[state].astro` | M | One template, 50 states and DC. |
| 10 | State x license-type | `src/pages/states/[state]/[type].astro` | L | One template, large generated set. Edit the template only. |

Small static pages go first so the shared rules are proven before the generated sets load them. Never hand-edit built output or data files. Change the template, then run `npm run build`.

### Step 1. Shared chrome and shared sheet (M)

No inner page changes appearance in this step.

1. Create `src/styles/desk.css`. Move the rules listed in 2.1 out of `home.css`. Keep values and order.
2. Import `desk.css` in `index.astro` on the line before `home.css`.
3. Add the nav and footer reduced-motion rule from 1.10.
4. Add the shared `.hp` overrides this guide names for chrome-level pieces only: `.hp .page-hero` (2.4), `.hp .section`, `.hp .section-alt`, `.hp .section-title`, `.hp .section-sub`, `.hp .container` (2.5), prose links and `.lms-kicker`, `.hub-byline`, `.lms-crumb`, `.lms-disclaimer`.
5. Move the homepage rise script into a shared partial only if a later step will use `data-rise`. Otherwise leave it in `index.astro`.
6. Do not edit `Layout.astro` or `global.css`.

Check: the homepage renders the same as the preview at 390, 768, 1024, 1200, and 1440px. Every other built page is unchanged.

### Step 2. FAQ (S)

1. Import `desk.css`. Wrap the page in `<div class="hp">`.
2. Hero: short hub title size.
3. Question list: swap to the `hp-faq-*` classes. Place it in `.hp-split-body` if you add a `.hp-split`, or in a `44em` column. Remove the inline `max-width` style.
4. Replace `.cta-band` with the close pattern in 2.7, using the existing heading, paragraph, and button text.

### Step 3. About and contact (S)

About:
1. Import, wrap, hero with `.lms-kicker` and `.lede`.
2. `.story`: left aligned, `max-width: 44em`. `.story-open` uses the `.hp-lead` values. `.story h2` uses `--t-lead`, weight 600, letter spacing -0.025em. `.story p` uses `--t-body` in ink.
3. `.story-steps`: restyle as the staircase tones (`--h-stage`, `--h-stage-2`, `--h-dark` with on-dark text), no borders, no radius. Keep the `ol`, the `strong` titles, and the links. The `01`, `02`, `03` spans are mono today. Set them in sans, or remove the spans as the homepage did for its own steps and say so in the PR.
4. `.hero-cta` takes the `.hp-btn` values.
5. `.lms-disclaimer`: unchanged text.

Contact: import, wrap, hero. The single paragraph uses `--t-body` in ink with a prose link. Remove the scoped `.article` style block. Do not add a form. Do not change the email address.

### Step 4. Legal and utility (S)

1. Add one shared rule set to `desk.css`: `.hp .article h2` (`--t-lead`, weight 600, letter spacing -0.025em, line height 1.2), `.hp .article p`, `.hp .article li` (`--t-body`, ink), prose links, `max-width: 44em`, left aligned.
2. In `privacy.astro`, `terms.astro`, and `privacy/chrome-license-expiration-tracker.astro`: import, wrap, remove the scoped `.article` style block and the inline `max-width`.
3. `404.astro`: import, wrap, short hub title size. The three links become a left-aligned row with `gap`, each at `min-height: 44px`.
4. Do not change any legal wording, date, or link. The "Last updated" lines stay exactly as written.

### Step 5. Guides hub and articles (M)

Hub (`guides/index.astro`):
1. Import, wrap, hero with `Byline`.
2. The guide links carry long inline `style` attributes. Replace them with `.hp-core-list` and `.hp-core-row` (an `h3` and a `p` per row). Do not add a `.hp-core-go` label. There is no link text for it today.
3. `AuthorBox` becomes a paper sheet.

Articles (`first-business-license`, `multi-state`, `nmls`, `which-license-do-i-need`, `what-happens-if-you-skip-it`):
1. Import, wrap, hero with the long-title size, `Byline`, and `.lms-crumb` where present.
2. Remove each scoped `.article` style block. The shared `.hp .article` rules from step 4 apply. Add `.hp .article h3` (`--t-body`, weight 600) and `.hp .article ul` for the two articles that use them.
3. `.lms-link-list`, `FileWithCornerstone`, `AuthorBox`: shared restyles.
4. `Article` JSON-LD comes from `articleSchema`. Do not touch it or the dates.

Do one article first, review it, then apply the same change to the other four.

### Step 6. States hub (S)

1. Import, wrap, hero with `.lms-crumb`.
2. `.lms-core-legend` and `.section-sub`: left aligned, `--t-body`.
3. Region lists: this is the board at full size. Put the region section on `.hp-dark`. `.lms-region h2` uses `--t-lead` in on-dark. `.lms-state-grid` gets `gap: 4px`. Each link takes the `.hp-map a` colors: `background: var(--h-dark-2)`, text `#dce8e1`, no border, `border-radius: 3px`, hover and focus `background: var(--h-on-dark)` with ink text, focus outline in `--h-on-dark`. The abbreviation span uses `--h-on-dark-soft` and must switch to ink on hover so it stays readable.
4. Keep the three-column grid and the one-column layout at 768px. Keep every state link and name.
5. `DirectoryDisclaimer` in the last band: unchanged text.

### Step 7. Directory hub (S)

1. Import, wrap, hero with `.lms-kicker` and `Byline`.
2. Core licenses: `.card.lms-dir-card` in `.lms-core-grid`. Convert to rows (`.hp-core-row`) with the existing `.lms-card-link` text as `.hp-core-go`, or keep the grid as paper sheets with `gap: 4px`. Rows match the homepage. The `.lms-kicker` inside each card takes the kicker values.
3. Browse by state: `.section-alt` becomes the stage. `.btn-quiet` is covered. `.lms-inline-states` left aligned with tap-sized links. Remove the inline centering style on the paragraph that holds the button.
4. Adjacent filings: three paper cards, or rows.
5. `FileWithCornerstone`, `DirectoryDisclaimer`, `AuthorBox`: shared restyles from 2.6. These three components are used by later steps, so finish them here.

### Step 8. Directory type pages (M)

One template, three branches: `hub` (national hub with a four-column `.hub-table` and FAQ), `lending` (prose, plain `.lms-table`, FAQ), and the default branch (prose, optional table, adjacent types with `.lms-state-list`).

1. Import, wrap. Hero with crumb, kicker, long-title size, `.lede`, `Byline`, and `.hub-jumps`.
2. `.lms-prose`: left aligned, `max-width: 44em`. `h2` at `--t-lead`, weight 600. Text `--t-body` in ink. Keep every `id` on the `h2` elements. They are jump targets.
3. Table band: `.section-alt` as the stage, `.lms-table-wrap` as a paper sheet, table values from 2.8.
4. `.lms-subhead` and `.lms-link-list`: `--t-lead` heading, prose links.
5. FAQ: restyle `.hp .faq-*` in place (option 2 in 2.9).
6. Closing section: shared components. The three-link paragraph may drop its dot separators for `gap`.
7. Check one page from each branch, and one adjacent type (for example `/directory/insurance`).

### Step 9. State profile (M)

One template, 50 states and DC. Edit the template only.

1. Import, wrap. Hero: crumb, kicker (`{state.abbr}` and region), long-title size, the quality paragraphs, `.hub-jumps`, `state.notes`, `.hub-byline`. The hero can hold several paragraphs. Only the first takes the lead size.
2. Agencies: `.card` in `.lms-agency-grid` as paper sheets, `gap: 4px`. The "Official site" link takes the prose link values.
3. Core licenses: `.section-alt` as the stage. Four `.card.lms-dir-card` items become rows or paper sheets. Kicker (`requiredLabel`) in sans. `.lms-card-link` takes the `.hp-core-go` values.
4. Prose section with `StatuteHistory`: `.statute-history h2` at `--t-lead`, text `--t-body` in ink, `.statute-history-note` at `--t-small` in `--h-soft`. Keep `min-height: 44px` on the list links.
5. Closing band: shared components.
6. Pages with `robots="noindex, follow"` keep that value. The `quality.indexable` branches stay as they are.
7. Check California, Texas, one state with statute history, and one non-indexable state if any exist.

### Step 10. State x license-type (L)

One template, the largest generated set. Edit the template only. It carries breadcrumbs, a fact bar, the fee table, statute history, long prose, how-to steps, two FAQ blocks, sources, three link sections, and the Cornerstone call to action, with `striking` variants.

1. Import, wrap. Hero: `.crumb-list` left aligned, kicker, long-title size, `fact.lead` as the lead, `.hub-up` at `--t-small`.
2. `.lms-factbar`: three wash cells with `gap: 4px` (2.6). Keep the agency link.
3. `.req-block`: `.req-title` left at `--t-h2`, `.req-lead` at `--t-body`. `.req-wrap` as a paper sheet. `.req-table` values from 2.8. Keep the stacked layout at 640px, including its visually hidden `thead`. `.lms-verified` and `.tool-row` as in 2.8.
4. `.lms-prose`: as in step 8. `.howto-steps strong` in ink at weight 600. Remove the inline `margin-top` style and set the gap in CSS.
5. `.neighbor-list`: wash chips (2.6).
6. FAQ: restyle `.hp .faq-*` in place, with the compact question size from 2.9. Leave `.lms-faq` as headings and paragraphs. Keep `id="license-faq"`.
7. "Other filings" band: stage with paper cards. "Nearby states": chips. "Other states": `.lms-inline-states` left aligned, `.section-links` left aligned.
8. Closing section: shared components, including the `striking.cta` variant.
9. No `data-rise` on this template.
10. Check at least: one page per license type, one `striking` page with `placement` before and one after, one page where a table cell says Varies, see regulator, one page with long agency names at 390px, and one non-indexable page.

Do not change `rows`, `fact`, `page`, `striking`, or any import under `src/data` or `src/lib`. JSON-LD is assembled in the template frontmatter. Do not edit the frontmatter beyond adding the stylesheet import.

### Checks for every step

- `npm run build` passes.
- Build the base branch separately and compare output. Pages outside the PR are byte-identical. If a hashed stylesheet name changes on a page outside the PR, confirm the CSS it loads is unchanged and report it.
- For pages in the PR: the head is identical apart from stylesheet links. The set of links inside `main` is identical. Visible text is identical.
- No sideways scroll at 390, 768, 1024, 1200, and 1440px.
- Keyboard: every link, summary, and button shows a focus outline.
- With reduced motion set, nothing is hidden and nothing animates. With scripts off, nothing is hidden.
- The new and changed files contain no em dash and no en dash that was not already there.

---

## 4. Guardrails

**Restyle only.** Layout and style change. Nothing else does.

1. Do not change facts, prices, fees, bonds, timelines, dates, sources, product names, nav items, legal links, or meaning.
2. Do not add Jeff's name, a personal location, or the text "Hanok Ventures" unless that exact text already appears on the page being edited. It does not appear in any template read for this guide.
3. No em dashes and no en dashes in copy. Do not add any. Use a period, a comma, or a short sentence. Some existing strings already contain one (for example the states hub intro, list items in a guide, several `<title>` values, and two wizard labels). Do not rewrite them in a restyle PR. List each one you find in the PR description so the owner can decide.
4. No invented facts. No new claims, counts, testimonials, badges, or microcopy. If a layout needs text that does not exist on the page, change the layout.
5. Keep existing analytics. The Clarity script in `Layout.astro` stays as is. Do not add, remove, or reorder trackers. Do not add a consent banner.
6. Keep SEO tags and schema. Titles, descriptions, canonicals, robots values, Open Graph, Twitter tags, and every JSON-LD block stay byte-identical.
7. Keep accessibility. Landmarks, `aria` attributes, `.sr-only` text, heading order, table `scope` attributes, native `details` and `summary`, focus outlines, and 44px tap targets stay. Do not lower contrast below what the homepage uses.
8. Keep directory data, state facts, and forms unchanged. Do not edit `src/data`, `src/lib`, `LicenseWizard.jsx`, or `CaliforniaSample.astro`.
9. Images. The homepage uses no photographs. Add none by default. An AI image is allowed only if it is photorealistic and very high quality. Never place a lone image on one item of a list.
10. Tokens. Use only the tokens and values in section 1. Do not invent colors, type sizes, radii, shadows, easings, or component classes. New selectors are allowed only as `.hp`-scoped overrides of classes that already exist.
11. Scope. Every new rule starts with `.hp`, `body:has(.hp)`, or `html:has(.hp)`. Do not edit `:root` in `global.css`. Do not edit `Layout.astro` unless the step says so. Pages that are not in your step must not change.
12. Generated pages. Do not hand-edit generated leaves or built output. Edit the template, then rebuild.
13. No new packages, fonts, or scripts. Do not run package installers beyond what the repo's lockfile already needs to build.
14. Production. Do not deploy, publish, or merge. Production deploys belong to the owner. Work on a branch and open a draft PR.
15. Motion. Every animation sits inside `@media (prefers-reduced-motion: no-preference)` or is covered by the reduce block in 1.10. Nothing is hidden when scripts do not run.

---

## 5. Builder briefs

Replace `<PAGE TYPE>` and `<STEP N>` with one row from the table in section 3.

### Brief for a Cursor CloudAgent

```text
Repo: LicensingMadeSimple (Astro). Base branch: fable/homepage-redesign (draft PR #34).

Task: restyle one page type only: <PAGE TYPE>, which is <STEP N> in DESIGN-SYSTEM.md section 3.

1. Read DESIGN-SYSTEM.md at the repo root first. Follow it exactly. The homepage redesign is the source of truth.
2. Create a branch from fable/homepage-redesign. If src/styles/desk.css does not exist, stop and report. Step 1 must land first.
3. Do only the steps listed for <PAGE TYPE>. Edit only the files named for that step, plus scoped .hp rules in src/styles/desk.css.
4. Restyle only. Do not change facts, prices, dates, sources, product names, nav items, legal links, link targets, or meaning. Do not add Jeff's name, a location, or the text "Hanok Ventures". No em or en dashes in anything you write. No new copy, images, packages, fonts, or trackers.
5. Keep analytics, SEO tags, JSON-LD, and accessibility byte-identical. Do not edit src/data, src/lib, Layout.astro, global.css, LicenseWizard.jsx, or CaliforniaSample.astro.
6. Use only tokens and values listed in DESIGN-SYSTEM.md section 1. Every new selector starts with .hp, body:has(.hp), or html:has(.hp).
7. For generated pages, edit the template only. Never edit built output.
8. Run npm run build. Build the base branch too and compare. Pages outside this step must be byte-identical. For pages in this step, the head (apart from stylesheet links), the links inside main, and the visible text must be identical.
9. Check 390, 768, 1024, 1200, and 1440px, keyboard focus, reduced motion, and scripts off.
10. Open a draft PR against fable/homepage-redesign. In the description list: files changed, checks run with results, anything not checked, and any existing dash you found in copy. Do not merge. Do not deploy. Production deploys belong to the owner.
```

### Brief for Grok

```text
You are restyling one page type on the LicensingMadeSimple site (Astro). Base branch: fable/homepage-redesign.

Page type: <PAGE TYPE>. This is <STEP N> in DESIGN-SYSTEM.md section 3.

Rules:
- Read DESIGN-SYSTEM.md at the repo root before you write anything. Follow it. Do not improvise a new look.
- Restyle only the named page type. Change layout and style. Change nothing else.
- Keep every fact, price, date, source, product name, nav item, legal link, link target, and sentence as it is. Add no new copy.
- Do not add Jeff's name, a location, or the text "Hanok Ventures".
- Write no em dashes and no en dashes. Use a period or a comma.
- Use only the colors, type sizes, spacing, radii, and motion values in section 1 of the guide. No shadows. No borders on cards. Geist Sans only.
- Scope every new CSS rule with .hp, body:has(.hp), or html:has(.hp), in src/styles/desk.css. Wrap the page content in <div class="hp"> and import desk.css in that template.
- Do not edit Layout.astro, global.css, src/data, src/lib, LicenseWizard.jsx, or CaliforniaSample.astro. Keep analytics, SEO tags, JSON-LD, and accessibility attributes unchanged.
- For generated pages, edit the one template. Do not edit generated or built files.
- No new images, packages, fonts, scripts, or trackers.

Finish:
- Run npm run build and confirm it passes. Confirm pages outside this page type did not change.
- Open a draft PR against fable/homepage-redesign with the files changed, the checks you ran, and what you did not check.
- Do not merge, deploy, or publish. Production deploys belong to the owner.
```
