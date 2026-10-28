# Liv

Storefront for a 12-piece jewelry collection. Next.js 16, no other dependencies.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Where things live

| What | File |
|---|---|
| The 12 pieces (names, prices, materials, sizes, descriptions) | `src/lib/products.ts` |
| Which piece is spotlighted, which 4 show on the homepage | `SPOTLIGHT_SLUG`, `HOME_SELECTION` in `src/lib/products.ts` |
| Colors, type sizes, spacing | `:root` and type classes at the top of `src/app/globals.css` |
| Fonts | `src/app/layout.tsx` (Cormorant Garamond + Hanken Grotesk) |
| Image slots | `src/components/Placeholder.tsx`, labelled with the shot that belongs there |

## Placeholders still in the site

- **Photos:** every image is a labelled bone-colored box. Each label names the shot from `docs/visual-identity.md` (e.g. `No. 04 · On body`).
- **Copy in [brackets]:** brand story on Home and Atelier, founder name, contact email and Instagram.
- **Policies:** free shipping, 30-day returns and ship times (Home trust strip, product page, Care page).
- **Catalog:** all 12 names, prices and measurements.
- **Checkout:** `/checkout` is a stub that shows the order flow. Connect Shopify (or Stripe) and point the bag's Checkout button at it.
- **Forms:** newsletter, contact and "Notify me" show a confirmation but don't send anything yet.

## Docs

- `docs/design-brief.md`: research, structure, chosen direction
- `docs/visual-identity.md`: colors, type, photo rules, layout specs
- `docs/references/`: Sophie Buhai and AGMES breakdowns
