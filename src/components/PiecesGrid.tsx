"use client";

import { Fragment, useState } from "react";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import { Placeholder } from "./Placeholder";
import { ProductCard } from "./ProductCard";

type Filter = Category | "all";

export function PiecesGrid({ initial }: { initial: Filter }) {
  const [filter, setFilter] = useState<Filter>(initial);
  const items = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  const choose = (f: Filter) => {
    setFilter(f);
    // Keep the URL shareable without a full navigation.
    const url = f === "all" ? "/pieces" : `/pieces?c=${f}`;
    window.history.replaceState(null, "", url);
  };

  const tabs: { id: Filter; label: string }[] = [{ id: "all", label: "All" }, ...CATEGORIES];

  return (
    <>
      <div className="pieces-head">
        <h1 className="t-title">
          Pieces <span className="t-ui muted">({items.length})</span>
        </h1>
        <div className="tabs t-label" role="group" aria-label="Filter by category">
          {tabs.map((t) => (
            <button key={t.id} className="tab" aria-pressed={filter === t.id} onClick={() => choose(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-3">
        {items.map((p, i) => (
          <Fragment key={p.slug}>
            {/* One editorial break after the second row, only on the full list */}
            {filter === "all" && i === 6 && (
              <div className="grid-break">
                <Placeholder label="Editorial · On body, wide" ratio="16 / 7" />
              </div>
            )}
            <ProductCard product={p} />
          </Fragment>
        ))}
      </div>
    </>
  );
}
