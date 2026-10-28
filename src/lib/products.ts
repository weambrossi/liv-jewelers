// Placeholder catalog. Names, prices, materials and measurements are stand-ins
// until the real 12 pieces are confirmed. Swap values here; pages read from this file only.

export type Category = "rings" | "earrings" | "necklaces" | "bracelets";

export type OptionSet = {
  label: string; // "Size", "Length"
  values: string[];
};

export type Product = {
  number: number; // 1–12, permanent
  slug: string;
  name: string;
  category: Category;
  material: string;
  price: number; // USD, whole dollars
  description: string;
  details: string[];
  options?: OptionSet;
  soldOut?: boolean;
};

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "rings", label: "Rings" },
  { id: "earrings", label: "Earrings" },
  { id: "necklaces", label: "Necklaces" },
  { id: "bracelets", label: "Bracelets" },
];

const RING_SIZES: OptionSet = { label: "Size", values: ["5", "6", "7", "8", "9"] };
const CHAIN_LENGTHS: OptionSet = { label: "Length", values: ['16"', '18"', '20"'] };
const BRACELET_SIZES: OptionSet = { label: "Size", values: ["S", "M", "L"] };

export const PRODUCTS: Product[] = [
  {
    number: 1,
    slug: "arc",
    name: "Arc",
    category: "rings",
    material: "18k gold vermeil",
    price: 280,
    description: "Domed band that narrows at the back. High polish.",
    details: ["18k gold vermeil on sterling silver", "6mm at widest, 2mm at back", "5.2g", "Handmade"],
    options: RING_SIZES,
  },
  {
    number: 2,
    slug: "tide",
    name: "Tide",
    category: "earrings",
    material: "18k gold vermeil",
    price: 240,
    description: "Small hinged hoops with a wave in the profile.",
    details: ["18k gold vermeil on sterling silver", "18mm diameter, 3mm wide", "2.4g each", "Hinged closure", "Handmade"],
  },
  {
    number: 3,
    slug: "reed",
    name: "Reed",
    category: "necklaces",
    material: "14k solid gold",
    price: 860,
    description: "Fine cable chain with a single slim bar pendant.",
    details: ["14k solid gold", "Bar 22mm × 1.5mm", "1.1mm cable chain", "Spring ring clasp", "Handmade"],
    options: CHAIN_LENGTHS,
  },
  {
    number: 4,
    slug: "halo",
    name: "Halo",
    category: "rings",
    material: "18k gold vermeil",
    price: 640,
    description: "Wide sculpted band with a soft ridge around the center. Made to be worn alone.",
    details: ["18k gold vermeil on sterling silver", "9mm wide", "8.6g", "Handmade"],
    options: RING_SIZES,
  },
  {
    number: 5,
    slug: "coil",
    name: "Coil",
    category: "bracelets",
    material: "18k gold vermeil",
    price: 520,
    description: "Open cuff formed from a single wrapped wire.",
    details: ["18k gold vermeil on sterling silver", "4mm wire", "Adjustable opening", "Handmade"],
    options: BRACELET_SIZES,
  },
  {
    number: 6,
    slug: "ember",
    name: "Ember",
    category: "earrings",
    material: "14k solid gold",
    price: 420,
    description: "Faceted drop on a short hook. Catches light from every side.",
    details: ["14k solid gold", "24mm drop", "1.8g each", "Hook closure", "Handmade"],
  },
  {
    number: 7,
    slug: "lune",
    name: "Lune",
    category: "necklaces",
    material: "18k gold vermeil",
    price: 380,
    description: "Crescent pendant on a fine curb chain.",
    details: ["18k gold vermeil on sterling silver", "Pendant 16mm", "1.4mm curb chain", "Lobster clasp", "Handmade"],
    options: CHAIN_LENGTHS,
  },
  {
    number: 8,
    slug: "knot",
    name: "Knot",
    category: "bracelets",
    material: "14k solid gold",
    price: 1180,
    description: "Rigid bangle with a single knot at the center.",
    details: ["14k solid gold", "3mm round wire", "Slip-on", "Handmade"],
    options: BRACELET_SIZES,
  },
  {
    number: 9,
    slug: "stem",
    name: "Stem",
    category: "rings",
    material: "14k solid gold",
    price: 720,
    description: "Thin band with a raised, hand-carved line across the top.",
    details: ["14k solid gold", "2mm wide", "2.9g", "Handmade"],
    options: RING_SIZES,
  },
  {
    number: 10,
    slug: "orbit",
    name: "Orbit",
    category: "earrings",
    material: "18k gold vermeil",
    price: 310,
    description: "Two linked rings that move independently.",
    details: ["18k gold vermeil on sterling silver", "30mm total drop", "3.1g each", "Post and butterfly back", "Handmade"],
  },
  {
    number: 11,
    slug: "sable",
    name: "Sable",
    category: "necklaces",
    material: "18k gold vermeil",
    price: 960,
    description: "Heavy collar of flattened links. Sits at the collarbone.",
    details: ["18k gold vermeil on sterling silver", "7mm links", "Toggle clasp", "Handmade"],
    options: { label: "Length", values: ['15"', '16"'] },
  },
  {
    number: 12,
    slug: "vessel",
    name: "Vessel",
    category: "bracelets",
    material: "18k gold vermeil",
    price: 450,
    description: "Hinged oval bangle with a hollow, rounded profile.",
    details: ["18k gold vermeil on sterling silver", "6mm profile", "Hinged with hidden clasp", "Handmade"],
    options: BRACELET_SIZES,
    soldOut: true,
  },
];

export const SPOTLIGHT_SLUG = "halo";
export const HOME_SELECTION = ["arc", "tide", "reed", "ember"];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function pieceNumber(n: number) {
  return `No. ${String(n).padStart(2, "0")}`;
}

export function formatPrice(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

// Three pieces from other categories, in catalog order after this one.
export function relatedTo(product: Product, count = 3) {
  const others = PRODUCTS.filter((p) => p.category !== product.category);
  const start = others.findIndex((p) => p.number > product.number);
  const rotated = start === -1 ? others : [...others.slice(start), ...others.slice(0, start)];
  return rotated.slice(0, count);
}
