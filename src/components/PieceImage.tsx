import Image from "next/image";
import type { Product } from "@/lib/products";
import { Placeholder } from "./Placeholder";

// The product's retouched still life, or a labelled placeholder until it's shot.
export function PieceImage({
  product,
  label,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 360px",
  priority,
}: {
  product: Product;
  label: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!product.image) return <Placeholder label={label} />;
  return (
    <div className="photo">
      <Image
        src={product.image}
        alt={`${product.type}${product.name.startsWith("[") ? "" : `, ${product.name}`}`}
        width={1200}
        height={1500}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
