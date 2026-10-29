// The catalog. Values in [brackets] and prices are placeholders until confirmed.
// Pieces 01–08 have studio photos; 09–12 are open slots.

export type Category = "rings" | "earrings" | "necklaces" | "bracelets";

export type OptionSet = {
  label: string; // "Size", "Length"
  values: string[];
};

export type Product = {
  number: number; // 1–12, permanent
  slug: string;
  name: string;
  type: string; // what the piece is, shown under the name
  tone: "silver" | "gold";
  category: Category;
  price: number; // USD, whole dollars
  description: string;
  details: string[];
  image?: string; // retouched still life in /public/images/pieces
  options?: OptionSet;
  soldOut?: boolean;
  upcoming?: boolean; // open slot: no photo, not for sale yet
};

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "rings", label: "Rings" },
  { id: "earrings", label: "Earrings" },
  { id: "necklaces", label: "Necklaces" },
  { id: "bracelets", label: "Bracelets" },
];

const NAME = "[Name]";
const RING_SIZES: OptionSet = { label: "Size", values: ["5", "6", "7", "8", "9"] };
const CHAIN_LENGTHS: OptionSet = { label: "Length", values: ['18"', '20"', '22"'] };

export const PRODUCTS: Product[] = [
  {
    number: 1,
    slug: "figaro-chain",
    name: NAME,
    type: "Figaro chain",
    tone: "silver",
    category: "necklaces",
    price: 180,
    description: "Classic figaro pattern: three short links, then one long. Worn alone or under a pendant.",
    details: ["[Metal]", "[Width] mm links", "Lobster clasp"],
    image: "/images/pieces/figaro-chain.webp",
    options: CHAIN_LENGTHS,
  },
  {
    number: 2,
    slug: "charm-bracelet",
    name: NAME,
    type: "Charm bracelet",
    tone: "silver",
    category: "bracelets",
    price: 150,
    description: "Fine cable chain with seven small charms: cross, star, heart, moon, two pearls and a bezel-set stone.",
    details: ["[Metal]", "Freshwater pearls [confirm]", "Adjustable with extender chain", "Lobster clasp"],
    image: "/images/pieces/charm-bracelet.webp",
  },
  {
    number: 3,
    slug: "halo-ring",
    name: NAME,
    type: "Halo ring",
    tone: "silver",
    category: "rings",
    price: 320,
    description: "Princess-cut center stone framed by a halo of small rounds, on a pavé band.",
    details: ["[Metal]", "[Stone] center, [size] mm", "Pavé halo and band"],
    image: "/images/pieces/halo-ring.webp",
    options: RING_SIZES,
  },
  {
    number: 4,
    slug: "heart-pave-studs",
    name: NAME,
    type: "Heart pavé studs",
    tone: "silver",
    category: "earrings",
    price: 240,
    description: "Heart-shaped studs set edge to edge with small round stones.",
    details: ["[Metal]", "[Stone]", "[Size] mm", "Push backs"],
    image: "/images/pieces/heart-pave-studs.webp",
  },
  {
    number: 5,
    slug: "heart-eternity-band",
    name: NAME,
    type: "Heart eternity band",
    tone: "silver",
    category: "rings",
    price: 280,
    description: "A full circle of heart-cut stones, each held by three prongs.",
    details: ["[Metal]", "[Stone], heart cut", "Full eternity setting"],
    image: "/images/pieces/heart-eternity-band.webp",
    options: RING_SIZES,
  },
  {
    number: 6,
    slug: "emerald-cut-studs",
    name: NAME,
    type: "Emerald-cut studs",
    tone: "silver",
    category: "earrings",
    price: 260,
    description: "Single step-cut stones in four-prong basket settings.",
    details: ["[Metal]", "[Stone], emerald cut, [size] mm", "Push backs"],
    image: "/images/pieces/emerald-cut-studs.webp",
  },
  {
    number: 7,
    slug: "baguette-cushion-studs",
    name: NAME,
    type: "Baguette cushion studs",
    tone: "gold",
    category: "earrings",
    price: 340,
    description: "Cushion-shaped studs with two rows of baguettes inside a border of round stones.",
    details: ["[Metal]", "[Stone], baguette and round", "[Size] mm", "Screw backs [confirm]"],
    image: "/images/pieces/baguette-cushion-studs.webp",
  },
  {
    number: 8,
    slug: "solitaire-studs",
    name: NAME,
    type: "Solitaire studs",
    tone: "gold",
    category: "earrings",
    price: 190,
    description: "One round stone in a four-prong setting. Small enough for every day.",
    details: ["[Metal]", "[Stone], round, [size] mm", "Push backs"],
    image: "/images/pieces/solitaire-studs.webp",
  },
  {
    number: 9,
    slug: "piece-09",
    name: NAME,
    type: "[Type]",
    tone: "gold",
    category: "necklaces",
    price: 0,
    description: "[Description]",
    details: ["[Metal]", "[Dimensions]"],
    upcoming: true,
  },
  {
    number: 10,
    slug: "piece-10",
    name: NAME,
    type: "[Type]",
    tone: "gold",
    category: "bracelets",
    price: 0,
    description: "[Description]",
    details: ["[Metal]", "[Dimensions]"],
    upcoming: true,
  },
  {
    number: 11,
    slug: "piece-11",
    name: NAME,
    type: "[Type]",
    tone: "gold",
    category: "rings",
    price: 0,
    description: "[Description]",
    details: ["[Metal]", "[Dimensions]"],
    upcoming: true,
  },
  {
    number: 12,
    slug: "piece-12",
    name: NAME,
    type: "[Type]",
    tone: "gold",
    category: "necklaces",
    price: 0,
    description: "[Description]",
    details: ["[Metal]", "[Dimensions]"],
    upcoming: true,
  },
];

export const SPOTLIGHT_SLUG = "halo-ring";
export const HOME_SELECTION = ["heart-pave-studs", "heart-eternity-band", "baguette-cushion-studs", "emerald-cut-studs"];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function pieceNumber(n: number) {
  return `No. ${String(n).padStart(2, "0")}`;
}

export function formatPrice(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

// Three photographed pieces from other categories, in catalog order after this one.
export function relatedTo(product: Product, count = 3) {
  const others = PRODUCTS.filter((p) => p.category !== product.category && p.image);
  const start = others.findIndex((p) => p.number > product.number);
  const rotated = start === -1 ? others : [...others.slice(start), ...others.slice(0, start)];
  return rotated.slice(0, count);
}
