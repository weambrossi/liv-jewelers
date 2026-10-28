import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToBag } from "@/components/AddToBag";
import { Gallery } from "@/components/Gallery";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, getProduct, pieceNumber, PRODUCTS, relatedTo } from "@/lib/products";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: `${pieceNumber(product.number)} ${product.name}`,
    description: `${product.description} ${product.material}.`,
  };
}

export default async function ProductPage({ params }: Params) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const num = pieceNumber(product.number);
  const shots = [
    { label: `${num} · Still life, front` },
    { label: `${num} · On body`, alt: true },
    { label: `${num} · Still life, side` },
    { label: `${num} · Detail` },
    { label: `${num} · On body, scale`, alt: true },
  ];
  const related = relatedTo(product);

  return (
    <div className="wrap">
      <div className="pdp">
        <Gallery shots={shots} />

        <div className="pdp-info">
          <p className="t-label muted" style={{ margin: "0 0 12px" }}>
            {num}
          </p>
          <h1 className="t-title">{product.name}</h1>
          <p className="t-ui" style={{ margin: "12px 0 0" }}>
            {formatPrice(product.price)}
          </p>
          <p className="t-ui muted" style={{ margin: "4px 0 0" }}>
            {product.material}
          </p>
          <p style={{ margin: "28px 0 0" }}>{product.description}</p>

          <AddToBag product={product} />

          <p className="t-ui muted" style={{ margin: "0 0 32px" }}>
            Free shipping · 30-day returns · Gift wrap available
          </p>

          <details className="acc">
            <summary className="t-label">Details</summary>
            <div className="acc-body t-ui">
              <ul>
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </details>
          {product.category === "rings" && (
            <details className="acc">
              <summary className="t-label">Sizing</summary>
              <div className="acc-body t-ui">
                US sizes 5–9. Between sizes, choose the larger.{" "}
                <Link href="/care#sizing" className="link">
                  Size guide
                </Link>
              </div>
            </details>
          )}
          {product.options?.label === "Length" && (
            <details className="acc">
              <summary className="t-label">Length</summary>
              <div className="acc-body t-ui">
                16&quot; sits at the base of the neck. 18&quot; falls at the collarbone. 20&quot; sits just below.{" "}
                <Link href="/care#sizing" className="link">
                  Length guide
                </Link>
              </div>
            </details>
          )}
          <details className="acc">
            <summary className="t-label">Care</summary>
            <div className="acc-body t-ui">
              Remove before swimming, bathing or exercise. Store separately in the pouch provided. Polish with a soft
              dry cloth.{" "}
              <Link href="/care#care" className="link">
                Full care guide
              </Link>
            </div>
          </details>
          <details className="acc">
            <summary className="t-label">Shipping &amp; returns</summary>
            <div className="acc-body t-ui">
              Ships in 2–3 business days, insured. Returns accepted within 30 days on unworn pieces.{" "}
              <Link href="/care#shipping" className="link">
                Details
              </Link>
            </div>
          </details>
        </div>
      </div>

      <section style={{ paddingTop: 120 }}>
        <h2 className="t-title" style={{ marginBottom: 40 }}>
          Wear with
        </h2>
        <div className="grid-3">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
