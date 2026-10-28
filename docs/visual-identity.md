# Liv: visual identity

Decided in the interview of 2026-10-28. Direction: **Gallery**, with pieces numbered 01–12.
References: [Sophie Buhai](references/sophie-buhai.md), [AGMES](references/agmes.md).

---

## 1. Color

| Token | Hex | Use | Contrast on bone |
|---|---|---|---|
| `bone` | `#F4F1EC` | Page background **and** product photo backdrop | — |
| `ink` | `#1A1918` | All main text, piece names, prices | 15.6 : 1 |
| `muted` | `#6B665F` | Secondary text: material line, captions, inactive nav | 5.1 : 1 |
| `line` | `#DDD6CB` | Hairline dividers, input borders, unselected option buttons | decorative only |
| `green` | `#0F2A24` | **Accent.** Primary button only ("Add to bag", "Checkout"), focus ring, selected option border | 13.5 : 1 |
| `white` | `#FFFFFF` | Never used as a background. Only for text on green if bone looks off | — |

Rules:
- The page is always bone. No white sections, no grey cards, no gradients.
- Green appears on **one** element per screen at most: the button you most want pressed.
- Button text is bone on green (13.5 : 1).
- `#8C877F` (stone) from the brief is too faint for text (3.2 : 1). Use it only for non-text details, or not at all.
- Gold pieces on bone: keep the white balance warm, around 5000K, so the background stays cream rather than grey.

```css
:root {
  --bone:  #F4F1EC;
  --ink:   #1A1918;
  --muted: #6B665F;
  --line:  #DDD6CB;
  --green: #0F2A24;
}
```

---

## 2. Typefaces

Both free on Google Fonts.

| Role | Font | Weights | Where |
|---|---|---|---|
| Display | **Cormorant Garamond** | 500 regular, 500 italic | Piece names, page headings, the About story |
| Interface | **Hanken Grotesk** | 400, 500 | Nav, prices, buttons, material lines, details, forms |

Why these:
- Cormorant has sharp, high-contrast strokes that suit fine jewelry. It's thin at small sizes, so it's **never used below 22px**.
- Hanken Grotesk is a quiet, neutral sans in the spirit of Univers (Sophie Buhai), and reads cleanly at 12–14px.
- Backup if Cormorant starts to feel too common: **Bodoni Moda** (also free, more fashion, more severe).

### Type scale

| Name | Font | Size desktop / mobile | Line height | Spacing | Case |
|---|---|---|---|---|---|
| `display` | Cormorant 500 | 56 / 36px | 1.05 | -0.01em | Sentence |
| `title` | Cormorant 500 | 36 / 28px | 1.1 | 0 | Title (piece name on product page) |
| `name` | Cormorant 500 | 22 / 20px | 1.2 | 0 | Title (piece name on cards) |
| `body` | Hanken 400 | 15 / 15px | 1.6 | 0 | Sentence |
| `ui` | Hanken 400 | 13 / 13px | 1.4 | 0.02em | Sentence |
| `label` | Hanken 500 | 11 / 11px | 1.3 | 0.12em | UPPERCASE (nav, button text, "No. 04") |

- Prices: `ui` size, ink, no cents: `$640`, ranges `$420 – $480`.
- No bold anywhere except `label` at 500.
- Italics only for a single word of emphasis in the About story, never in the interface.

### Piece numbering

Every piece is written as number + name + material:

```
NO. 04                    ← label, muted
Halo                      ← name (Cormorant), ink
18k gold vermeil          ← ui, muted
```

- Inline (cart, related pieces, breadcrumbs): `No. 04 — Halo`.
- Numbers are always two digits: `No. 01`, never `No. 1`.
- Numbers are permanent. If a piece retires, its number isn't reused; a new piece becomes `No. 13`.

---

## 3. Product photography

### Shot list (per piece)

| # | Shot | Frame | Use |
|---|---|---|---|
| 1 | **Still life, front** | 4:5, on bone | Card image, first image on product page |
| 2 | **On body, color, close crop** | 4:5 | Card hover, second image on product page |
| 3 | Still life, side or 3/4 | 4:5, on bone | Product page |
| 4 | Detail / macro (clasp, texture, stone) | 4:5 | Product page |
| 5 | On body, wider (shows scale) | 4:5 | Product page |
| 6 | Packaging (optional, shoot once and reuse) | 4:5 | Last image on product page |

### Still-life rules
All 12 pieces must line up when shown side by side in the grid.

- **Backdrop:** seamless paper matched to bone `#F4F1EC`. After editing, the background color in every photo must sample within about 2% of `#F4F1EC`, so photos blend into the page with no visible frame edge.
- **Frame:** 4:5 portrait. Export at 1600 × 2000px.
- **Size in frame:** the piece takes up about **40% of the frame width**. Use the same scale for every piece in the same category, so earrings look like earrings and necklaces look like necklaces relative to each other.
- **Position:** horizontally centered. Vertically, the center of the piece sits slightly **above** the middle of the frame (about 45% from the top). That looks centered to the eye; dead-center looks low.
- **Angle:** pick one and keep it for all 12. Overhead (flat lay) is easiest to keep consistent.
- **Light:** one large soft light from the **upper left**. A short, soft shadow falls **down and to the right** in every photo.
- **Styling:** nothing in the frame but the piece. No props, flowers, stones or fabric in the main shot.
- **Necklaces:** lay chains in the same shape every time (a soft U or V), centered.
- **Earrings:** shoot as a pair, side by side, with the same gap each time.

```
4:5 frame (1600 × 2000)
┌──────────────────────┐
│                      │
│                      │
│                      │
│        ╭───╮         │  ← piece center ~45% from top
│        ╰───╯░        │  ← soft shadow, down-right
│                      │     piece ≈ 40% of width
│                      │
│                      │
│                      │
└──────────────────────┘
light from upper left ↘
```

### On-body rules
- Natural color, warm skin tones, matching the warmth of the still lifes.
- **Close crop:** ear, neck and collarbone, wrist, hand. **No full faces.**
- Neutral clothing (bone, oatmeal, black) or bare skin. No patterns, no other jewelry.
- Soft daylight. No flash, no hard shadows.
- Same 4:5 frame. The piece sits in roughly the same place in the frame as in the still life, so the hover fade doesn't jump.

---

## 4. Layout and alignment

### Grid
- Content area **1120px** wide, centered. Margins outside it stay empty.
- **Shop grid:** 3 columns, 32px gap between columns, 64px between rows. 12 pieces = 4 rows.
- Tablet (≤ 1024px): 2 columns. Mobile (≤ 640px): 2 columns, 12px gap, 16px page margins.
- Header and footer use the full width with 40px side padding (16px on mobile).

### Product card
```
┌──────────────────────────┐
│                          │
│     still life, 4:5      │   hover → on-body shot, 300ms fade
│                          │
└──────────────────────────┘
                              12px gap
NO. 04 Halo           $640    ← number + name left, price right, same baseline
18k gold vermeil              ← muted, one line
```
- Text aligns exactly with the left and right edges of the image.
- Number and name on the left, price on the right, on one shared baseline.
- No border, no shadow, no background behind the card.
- No badges. If a piece is sold out, the price is replaced with `Sold out` in muted.

### Product page
```
| 40px |      images (7 cols)       | 1 col |   info (4 cols, sticky)    | 40px |
        ┌──────────────────────────┐          NO. 04
        │ 1  still life            │          Halo
        ├──────────────────────────┤          $640
        │ 2  on body               │          ────────────────
        ├──────────────────────────┤          2–3 sentence description
        │ 3  side                  │          Size  [5] [6] [7] [8]
        ├──────────────────────────┤          [  $640 — Add to bag  ]  green
        │ 4  detail                │          Free shipping · 30-day returns
        ├──────────────────────────┤          + Details
        │ 5  scale                 │          + Sizing
        └──────────────────────────┘          + Care
                                              + Shipping & returns
        Wear with:  [ ]  [ ]  [ ]
```
- Images stacked in one column, 8px apart, filling the full column width.
- The info column stays fixed in view while the images scroll past.
- Mobile: images become a swipe gallery with a small `1 / 5` counter, info below, and a fixed `Add to bag` bar at the bottom of the screen.
- Option buttons: square corners, `line` border; selected = `ink` border. No dropdowns.

### Motion
| Element | Animation |
|---|---|
| Card hover | Cross-fade still life → on-body, 300ms ease |
| Images entering on scroll | Fade in + move up 8px, 600ms, once |
| Cart drawer | Slides in from right, 350ms |
| Links | Underline fades in, 200ms |
| Everything else | None. No parallax, carousels, cursor effects or loading spinners. |

Respect "reduce motion" settings: turn off the fade-up and use instant hover swaps.

---

## 5. Still open

These don't affect the identity above, but are needed before build:

1. Brand name as it appears in the logo ("LIV" / "Liv" / "Liv Jewelers"), and whether there's an existing logo.
2. Names for the 12 pieces and their category split.
3. Price range.
4. Options per piece (ring sizes, chain lengths).
5. Platform: Shopify recommended (both reference sites use it).
6. Brand story for the Atelier page.
7. Shipping regions and return window (the "30-day returns" line above is a placeholder).
