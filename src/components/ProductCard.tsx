import Link from "next/link";
import { formatPrice, pieceNumber, type Product } from "@/lib/products";
import { PieceImage } from "./PieceImage";
import { Placeholder } from "./Placeholder";

export function priceLabel(product: Product) {
  if (product.upcoming) return "Coming soon";
  if (product.soldOut) return "Sold out";
  return formatPrice(product.price);
}

// Still life first. The on-body shot fades in on hover once it exists;
// until then, photographed pieces zoom in slightly instead.
export function ProductCard({ product }: { product: Product }) {
  const num = pieceNumber(product.number);
  const hasPhoto = !!product.image;
  return (
    <Link
      href={`/pieces/${product.slug}`}
      className={`card${hasPhoto ? " card-photo" : ""}`}
      aria-label={`${num} ${product.name}, ${product.type}`}
    >
      <div className="card-media">
        <PieceImage product={product} label={`${num} · Still life`} />
        {!hasPhoto && <Placeholder label={`${num} · On body`} alt />}
      </div>
      <div className="card-meta">
        <div className="card-row">
          <div className="card-title">
            <span className="t-label muted">{num}</span>
            <span className="t-name">{product.name}</span>
          </div>
          <span className={`t-ui${product.soldOut || product.upcoming ? " muted" : ""}`}>{priceLabel(product)}</span>
        </div>
        <p className="t-ui muted" style={{ margin: "2px 0 0" }}>
          {product.type}
        </p>
      </div>
    </Link>
  );
}
