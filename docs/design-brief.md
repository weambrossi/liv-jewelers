# Liv Jewelers — Design Brief (pre-development)

Status: research and direction only. No code.

**Decision (2026-10-24):** Direction A (Gallery) with B's 01–12 numbering. Open questions at the bottom still pending.

---

## Phase 1 — Research

Eight sites reviewed (October 2026). Screenshots were not captured; open the links side by side while reading.

### 1. Sophie Buhai — https://www.sophiebuhai.com
Sculptural gold and stone jewelry, Los Angeles.
- **Homepage:** No headline. One campaign image, one sentence-case link ("Explore our new collection"). Then a grid of eight portrait (4:5) tiles, each with one label (Rings, Earrings, Objects).
- **Navigation:** Shops by category and by material (18k Gold, Pearls, Lapis, Onyx, Jade). Seasonal lookbooks archived from SS16 to now.
- **Cart:** Drawer with order summary, a gift-wrap toggle, subtotal, and "Shipping calculated at checkout".
- **Why it works:** The photography carries everything. Every label is one or two words. Lookbooks give a small catalog depth without adding products.
- **Borrow:** Portrait tile grid, shopping by material, gift-wrap toggle in the cart, a lookbook archive.

### 2. Charlotte Chesnais — https://www.charlottechesnais.com
Paris, sculptural silver and gold.
- **Homepage:** Centered logo above a single row of one-word links (Fine Jewellery, Bridal, Jewellery, Objects, About). Large banner, then four image tiles with no text.
- **Product page:** Size selector, "Add to bag", "Notify me" when sold out, a ring size guide (circumference in mm to US/UK/EU/JP) with a printable PDF. Three trust lines next to the button: secure payment, free shipping, free returns.
- **Why it works:** Very little UI. The product page answers sizing and shipping questions without leaving the page.
- **Borrow:** One-row nav, trust lines placed beside the add button, "Notify me", a size guide with a printable sizer.

### 3. AGMES — https://agmesnyc.com
Sculptural recycled silver and gold, New York. Closest in scale and price to a small brand.
- **Homepage:** Short carousel, two product rows (Latest, Fall), three category tiles, then a "Style Focus" block: one product, one line ("A new statement."), one button.
- **Product cards:** Name only (first names: Linnea, Pirrie, Margot), price, hover second image, "NEW" badge. Single-variant items show "Add to cart" right on the card.
- **Studio:** "Visit the Studio" sits in the main nav, with walk-in hours in the top bar.
- **Why it works:** Named pieces read like characters, not SKUs. The one-product spotlight is a good pattern for a 12-piece catalog.
- **Borrow:** Naming each piece, the single-piece spotlight block, a second image on hover.
- **Avoid:** Their "Sale price" label appearing with no original price; keep price display clean.

### 4. Mociun — https://mociun.com
Fine jewelry and ceramics, Brooklyn showroom.
- **Homepage:** Each block follows the same pattern: small uppercase label, short headline, uppercase CTA. Includes an appointment block, a showroom block with the street address, and a signed note from the founder ("CM").
- **Product card:** Product shot plus on-model shot, name, price, "New Arrival" badge.
- **Why it works:** Reads like a physical place you can visit. The founder's voice makes it feel personal without long copy.
- **Borrow:** A consistent label/headline/CTA rhythm, "Book an appointment", a short signed note from the founder.
- **Avoid:** Seven top-level menus; too many for 12 products.

### 5. WWAKE — https://wwake.com
Fine jewelry, New York.
- **Product cards:** Hover image swap, "From $980" for pieces with options, small badges ("Engrave yours"), "Sold out" state.
- **Trust strip:** Three points: Made in New York, Crafted to last, Shipping & returns.
- **Journal:** Articles in five themes (From the Earth, Through the Studio, Onto the Body...).
- **Why it works:** Explains how the jewelry is made in three short points instead of a long About page.
- **Borrow:** "From $X" pricing, a three-point trust strip, a short journal grouped by theme (later, optional).
- **Avoid:** The size of their navigation (by stone, shape, style). Built for 100+ products.

### 6. Completedworks — https://www.completedworks.com
London, jewelry, ceramics, furniture.
- **Product titles:** "Name – Material + Type" (e.g. "Conked Out – Recycled Silver Earrings"). Material is always in the title.
- **Category tiles:** Objects cut out on white, one-word label.
- **Why it works:** The format makes the material clear at a glance. Cut-out objects on white make a small grid look consistent.
- **Borrow:** The "Name — Material" title format, cut-out product imagery for the grid.
- **Avoid:** The jokey, very wordy copy; it clashes with a showroom feel.

### 7. Jessica McCormack — https://www.jessicamccormack.com
High jewelry, London townhouse.
- **Homepage:** 16:9 hero images, with a looping film. Very little nav: Shop, Our World, Search.
- **Service:** "Chat with an Ambassador", WhatsApp, book an appointment, gift packaging, care guide, size guide.
- **Why it works:** Feels like a luxury house because service is placed as prominently as product.
- **Borrow:** A three-item nav, a short looping hero film, packaging shown as part of the product.

### 8. Mejuri — https://mejuri.com
Large direct-to-consumer brand. Included for comparison.
- **Homepage:** Full-width hero, one material-focused headline, "Shop now".
- **Why it's here:** Shows what to avoid at our scale: promo bars, membership prompts, store pickers, an app badge, sustainability reports. A large-store layout makes a 12-piece catalog look empty.
- **Borrow:** Only the clear one-line headline that names the material in the hero.

### Patterns across the strongest sites
1. Navigation has 3 to 6 one-word items.
2. The homepage leads with images. Text is one line or none.
3. Product cards show: image, hover image, name, price. Nothing else.
4. Material is always visible (title, filter, or spec).
5. Service (sizing, packaging, appointments, care) is visible and treated as part of the brand.
6. Photography is consistent: one background and one light setup across all products.

---

## Phase 2 — Site structure

### Sitemap
```
/                     Home
/pieces               Shop — all 12
/pieces/[slug]        Product page
/atelier              About
/care                 Care, sizing, materials
/contact              Contact + appointments
/shipping-returns
/faq                  (can merge into /care)
/privacy, /terms
Cart                  Slide-out drawer (no separate page)
/checkout             Hosted (Shopify or Stripe)
```
Main nav: **Pieces · Atelier · Care** — plus Bag. Contact goes in the footer.

### Home
1. **Hero:** Full-bleed image or 6–10s silent looping film. Brand name, one link: "View the pieces".
2. **Spotlight:** One piece. Large image on one side; name, material, price, "View" on the other.
3. **Selection:** 4 pieces in a row, linking to all 12.
4. **Atelier strip:** One editorial image and 2–3 lines on who makes the jewelry and where. Link to /atelier.
5. **Categories:** 3–4 tiles (Rings, Earrings, Necklaces, Bracelets) only if each has 3+ pieces. Otherwise, swap in shopping by material.
6. **Trust strip:** 3 points (e.g. materials, made where, shipping/returns).
7. **Newsletter:** One field, one line.
8. **Footer.**

### Pieces (shop)
- All 12 on one page: a 3-column grid (desktop), 2-column (mobile). No pagination.
- Filter as text tabs at the top: All · Rings · Earrings · Necklaces · Bracelets. No sidebar or dropdowns.
- Card: 4:5 image → second image on hover (fades in 300ms), name, material, price. No add button on the card.
- Optional: every 6th tile is a full-width editorial image to break up the grid.

### Product page
- **Left (60%):** Stacked images on desktop, scrolling past a sticky info column. Swipe gallery with dots on mobile. 4–6 images: front, side, detail, on-body, scale, packaging.
- **Right (40%, sticky):** Name, price, material, short description (2–3 sentences), variant (metal/size as buttons, not a dropdown), Add to bag, three trust lines.
- **Accordions below:** Details (dimensions, weight, stones), Sizing (with size guide link), Care, Shipping & returns.
- **Below the fold:** "Wear with" — 3 related pieces.
- Sold-out state → "Notify me" (email capture).

### Atelier (about)
- Full-width image → short story in large serif type (under 150 words) → alternating image/text pairs on materials, process, workspace → founder portrait with a signed line → link to Pieces.

### Cart + checkout
- **Drawer:** Item image, name, variant, quantity, remove link, gift-wrap toggle, optional gift note, subtotal, "Shipping calculated at checkout", Checkout button.
- **Empty state:** One line and a link to Pieces.
- **Checkout:** Hosted Shopify or Stripe checkout with Apple Pay / Google Pay. A custom checkout isn't worth the cost at 12 products.

### Additions worth having
| Feature | Why |
|---|---|
| Printable ring sizer + size chart | Reduces returns on rings |
| Gift wrap + gift note in cart | Jewelry is often a gift; costs little to add |
| "Notify me" on sold-out pieces | Keeps a small catalog from looking empty |
| Packaging shown on product page | Signals premium |
| Appointments / virtual try-on call (if you have a studio) | Showroom feel |
| Lookbook page (later) | Gives depth without adding products |

Skip: wishlist, accounts, reviews, search, quick-view, pop-ups, live chat. All unnecessary at 12 products.

---

## Phase 3 — Three directions

### A. Gallery
Each piece shown like a sculpture in a museum.
- **Mood:** Quiet, warm, still. Lots of space. One object per frame.
- **Palette:** Bone `#F4F1EC` (background), Ink `#1A1918` (text), Stone `#8C877F` (secondary), Plaster `#E6E1D8` (image wells).
- **Type:** High-contrast serif for names and headlines (paid: *Canela* or *GT Super*; free: *Cormorant* — use sparingly) + a small, neutral sans for UI (*Neue Haas Unica* / free: *Hanken Grotesk*). UI text at 12–13px, letter-spaced uppercase for labels.
- **Homepage:** Full-bleed still-life hero → spotlight → 4-up selection → atelier strip → footer.
- **Product card:** Object on plaster background, no border. Name in serif below, price in small sans to the right.
- **Photography:** Stone, plaster, or linen surfaces; single soft light from the side; long shadows. On-model shots are cropped close, never a full face.
- **References:** Sophie Buhai, Charlotte Chesnais, Jessica McCormack.

### B. Index
Each piece numbered, like an exhibition catalog.
- **Mood:** Precise, graphic, architectural. Strict grid, numbers 01–12.
- **Palette:** White `#FFFFFF`, Black `#0E0E0E`, Graphite `#6B6B6B`, a single accent for states (e.g. Oxblood `#5B1F1A`).
- **Type:** Sans only (paid: *Söhne* / *ABC Diatype*; free: *Geist*), plus a mono for specs (*ABC Diatype Mono* / free: *IBM Plex Mono*).
- **Homepage:** Wordmark top left, nav top right → a 12-cell grid of all pieces as the homepage itself → one-line footer. About sits in a numbered list.
- **Product card:** Number (`03`), image cut out on white, then `Name — 18k Gold — $640` on one line in mono.
- **Photography:** Cut-outs on pure white, same angle and scale for every piece, plus one black-and-white on-body image per piece.
- **References:** Completedworks (titles, cut-outs), AGMES (naming), Swiss-style exhibition catalogs.

### C. Salon
Warm and personal, like visiting the maker's studio.
- **Mood:** Tactile, intimate, slightly romantic. More lifestyle, more founder voice.
- **Palette:** Linen `#EFE8DD`, Espresso `#2B211B`, Clay `#B7775B`, Olive `#6E6A4E`.
- **Type:** Soft old-style serif for headlines and body (paid: *Ogg* or *Lyon Display*; free: *EB Garamond*) + small uppercase sans labels.
- **Homepage:** Hero film of hands at work → founder note → selection carousel → studio/appointments block → journal teaser.
- **Product card:** On-model image first, product shot on hover. Name, price, and a one-line description.
- **Photography:** Film grain, warm daylight, hands, skin, fabric, studio tools.
- **References:** Mociun, WWAKE, AGMES "Visit the Studio".

### Comparison
| | A. Gallery | B. Index | C. Salon |
|---|---|---|---|
| Feels like | Gallery / museum | Exhibition catalog | Maker's studio |
| Works best with | Gold, stones, sculptural shapes | Minimal, geometric pieces | Handmade, personal, gift-led |
| Photo demand | High (styled still life) | Medium (consistent cut-outs) | High (lifestyle + model) |
| Risk | Looks cold if photos are weak | Looks severe or technical | Looks generic-boutique if over-styled |
| 12-product fit | Strong | Strongest | Medium |

---

## Phase 4 — Recommendation

**Go with A (Gallery) as the base, borrowing B's numbering.**

- 12 pieces is small enough to treat each one as an exhibit. Numbering them 01–12 says "this is complete and chosen", not "we only have 12 products."
- A warm off-white with a serif reads premium and established. Pure B can feel like a design studio rather than a jewelry house.
- It needs one consistent still-life photo shoot, which is achievable. C needs ongoing model/lifestyle shoots to stay fresh.

### Combined system
- Palette: A's Bone / Ink / Stone / Plaster.
- Type: serif for piece names and headlines, small sans for UI, mono only for numbers and specs.
- Every piece has a number, a name, a material: `No. 04 — Halo — 18k Gold Vermeil`.
- Motion: images fade in and rise 8px on scroll; hover image cross-fades in 300ms; cart drawer slides in in 350ms. No parallax, no carousels on desktop, no cursor effects.
- Copy rule: no taglines or adjectives like "timeless", "elevated", "luxurious". Labels and facts only: material, dimensions, where it's made.

### Page layouts (desktop → mobile)

**Home**
```
[ nav: LIV            Pieces  Atelier  Care     Bag(0) ]
[ full-bleed hero image / film                          ]
[   "View the pieces"                                   ]
[ No. 04  ———  large image   |  Halo                    ]
[                            |  18k gold vermeil · $640 ]
[ 01 ][ 02 ][ 03 ][ 05 ]  → All pieces                  ]
[ editorial image  |  3 lines on the atelier → Atelier  ]
[ Materials · Made in __ · Free returns                 ]
[ newsletter field                                       ]
[ footer                                                 ]
```
Mobile: hero 100vh → spotlight stacked → selection becomes a 2-column grid.

**Pieces**
```
[ All  Rings  Earrings  Necklaces  Bracelets            ]
[ 01 ][ 02 ][ 03 ]
[ 04 ][ 05 ][ 06 ]
[ —— full-width editorial image —— ]
[ 07 ][ 08 ][ 09 ]
[ 10 ][ 11 ][ 12 ]
```

**Product**
```
[ image 1            ] [ No. 04                    ]
[ image 2            ] [ Halo                      ]
[ image 3            ] [ $640                      ]
[ image 4 (on body)  ] [ 18k gold vermeil          ]
[ image 5 (packaging)] [ 2–3 sentence description  ]
[                    ] [ Size: 5 6 7 8             ]
[                    ] [ [ Add to bag ]            ]
[                    ] [ Ships in 2 days · Free returns · Gift wrap ]
[                    ] [ + Details + Sizing + Care + Shipping ]
[ Wear with:  [ ][ ][ ]                            ]
```

**Atelier**
```
[ full-bleed image                                   ]
[ short story, large serif, centered                 ]
[ image | Materials   ]
[ Process  | image    ]
[ founder portrait + signed line                     ]
[ → View the pieces                                  ]
```

**Cart drawer**
```
[ Bag (2)                                 Close ]
[ img  Halo · Size 6 · $640        − 1 +  Remove ]
[ img  Arc Studs · $380            − 1 +  Remove ]
[ ☐ Gift wrap   [ add a note ]                   ]
[ Subtotal $1,020                                ]
[ Shipping calculated at checkout                ]
[ [ Checkout ]                                   ]
```

---

## Open questions (needed before design)

1. **Brand name and logo:** Is it "Liv Jewelers", "Liv", or something else? Do you have a logo or wordmark?
2. **Materials:** Solid gold, gold vermeil, sterling silver, plated? Any stones or pearls?
3. **Price range:** Roughly, lowest and highest piece?
4. **The 12 pieces:** How many rings / earrings / necklaces / bracelets? Do they have names?
5. **Variants:** Ring sizes? Metal options? Chain lengths?
6. **Photography:** What exists today: product shots, on-model, lifestyle? Same background throughout? Is a shoot planned?
7. **Platform:** Shopify (easiest for inventory, payments, taxes) or a custom site with Shopify/Stripe behind it?
8. **Story:** Who makes the jewelry, where, and since when? Anything distinctive about the process?
9. **Physical presence:** Studio, appointments, pop-ups, or online only?
10. **Shipping:** US only or international? Return policy?
11. **Direction:** Do you agree with A + B numbering, or does one of the three feel closer to the brand?
