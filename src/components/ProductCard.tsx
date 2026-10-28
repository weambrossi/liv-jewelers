import Link from "next/link";
import { formatPrice, pieceNumber, type Product } from "@/lib/products";
import { Placeholder } from "./Placeholder";

// Still life first; the on-body shot fades in on hover.
export function ProductCard({ product }: { product: Product }) {
  const num = pieceNumber(product.number);
  return (
    <Link href={`/pieces/${product.slug}`} className="card" aria-label={`${num} ${product.name}`}>
      <div className="card-media">
        <Placeholder label={`${num} · Still life`} />
        <Placeholder label={`${num} · On body`} alt />
      </div>
      <div className="card-meta">
        <div className="card-row">
          <div className="card-title">
            <span className="t-label muted">{num}</span>
            <span className="t-name">{product.name}</span>
          </div>
          <span className={`t-ui${product.soldOut ? " muted" : ""}`}>
            {product.soldOut ? "Sold out" : formatPrice(product.price)}
          </span>
        </div>
        <p className="t-ui muted" style={{ margin: "2px 0 0" }}>
          {product.material}
        </p>
      </div>
    </Link>
  );
}
