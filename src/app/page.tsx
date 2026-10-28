import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Placeholder } from "@/components/Placeholder";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import {
  HOME_SELECTION,
  formatPrice,
  getProduct,
  pieceNumber,
  SPOTLIGHT_SLUG,
} from "@/lib/products";

const TRUST = [
  // Placeholder policies until shipping and returns are confirmed.
  { title: "Gold vermeil and solid gold", body: "Materials and weight listed on every piece." },
  { title: "Free shipping", body: "On every order, insured." },
  { title: "30-day returns", body: "Unworn pieces, in original packaging." },
];

export default function Home() {
  const spotlight = getProduct(SPOTLIGHT_SLUG)!;
  const selection = HOME_SELECTION.map((s) => getProduct(s)!);

  return (
    <>
      {/* Hero: image or short silent film, no text on top */}
      <section className="hero">
        <Placeholder label="Hero · Still life or 6–10s film" ratio="auto" className="hero-media" />
        <Link href="/pieces" className="hero-cta t-label link">
          View the pieces
        </Link>
      </section>

      {/* Spotlight: one piece */}
      <section className="section">
        <div className="wrap spotlight">
          <Reveal>
            <Link href={`/pieces/${spotlight.slug}`}>
              <Placeholder label={`${pieceNumber(spotlight.number)} · Still life`} />
            </Link>
          </Reveal>
          <Reveal className="spotlight-info" delay={120}>
            <p className="t-label muted" style={{ margin: "0 0 12px" }}>
              {pieceNumber(spotlight.number)}
            </p>
            <h2 className="t-display">{spotlight.name}</h2>
            <p className="t-ui muted" style={{ margin: "16px 0 0" }}>
              {spotlight.material} · {formatPrice(spotlight.price)}
            </p>
            <p style={{ margin: "24px 0 32px", maxWidth: 360 }}>{spotlight.description}</p>
            <Link href={`/pieces/${spotlight.slug}`} className="t-label link">
              View piece
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Selection */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <h2 className="t-title">The pieces</h2>
            <Link href="/pieces" className="t-label link">
              All twelve
            </Link>
          </div>
          <div className="grid-4">
            {selection.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Atelier strip */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap atelier-strip">
          <Reveal>
            <Placeholder label="Atelier · Hands at the bench" ratio="3 / 4" />
          </Reveal>
          <Reveal className="atelier-strip-text" delay={120}>
            <p className="t-label muted" style={{ margin: "0 0 16px" }}>
              Atelier
            </p>
            <p className="t-title" style={{ maxWidth: 420 }}>
              [Who makes the pieces, where, and since when.]
            </p>
            <Link href="/atelier" className="t-label link" style={{ display: "inline-block", marginTop: 32 }}>
              About the atelier
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Trust strip */}
      <section className="trust">
        <div className="wrap trust-grid">
          {TRUST.map((t) => (
            <div key={t.title}>
              <p className="t-label" style={{ margin: "0 0 8px" }}>
                {t.title}
              </p>
              <p className="t-ui muted" style={{ margin: 0 }}>
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section">
        <div className="wrap newsletter">
          <div>
            <p className="t-label" style={{ margin: "0 0 8px" }}>
              Newsletter
            </p>
            <p className="t-ui muted" style={{ margin: 0 }}>
              New pieces, before they are listed.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
