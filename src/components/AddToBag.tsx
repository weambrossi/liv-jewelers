"use client";

import { useState } from "react";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "./CartContext";

export function AddToBag({ product }: { product: Product }) {
  const { add } = useCart();
  const [option, setOption] = useState<string | undefined>();
  const [notify, setNotify] = useState(false);
  const needsOption = !!product.options && !option;

  if (product.upcoming) {
    return (
      <div className="pdp-buy">
        <button className="btn btn-primary" disabled>
          Coming soon
        </button>
      </div>
    );
  }

  if (product.soldOut) {
    return (
      <div className="pdp-buy">
        {notify ? (
          <p className="t-ui" style={{ margin: 0 }}>
            We&apos;ll email you when it&apos;s back.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setNotify(true);
            }}
          >
            <p className="t-ui muted" style={{ margin: "0 0 12px" }}>
              Sold out
            </p>
            <label className="sr-only" htmlFor="notify-email">
              Email
            </label>
            <input
              id="notify-email"
              className="input t-ui"
              type="email"
              required
              placeholder="Email"
              style={{ marginBottom: 8 }}
            />
            <button className="btn btn-primary" type="submit">
              Notify me
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <>
      {product.options && (
        <div style={{ marginTop: 32 }}>
          <p className="t-label" style={{ margin: "0 0 12px" }}>
            {product.options.label}
            {option && <span className="muted"> · {option}</span>}
          </p>
          <div className="options t-ui" role="group" aria-label={product.options.label}>
            {product.options.values.map((v) => (
              <button key={v} className="opt" aria-pressed={option === v} onClick={() => setOption(v)}>
                {v}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="pdp-buy">
        <button
          className="btn btn-primary"
          disabled={needsOption}
          onClick={() => add(product.slug, option)}
        >
          {needsOption
            ? `Select ${product.options!.label.toLowerCase()}`
            : `${formatPrice(product.price)} — Add to bag`}
        </button>
      </div>
    </>
  );
}
