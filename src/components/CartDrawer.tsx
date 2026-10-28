"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { formatPrice, pieceNumber } from "@/lib/products";
import { useCart } from "./CartContext";
import { Placeholder } from "./Placeholder";

export function CartDrawer() {
  const cart = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (cart.isOpen) closeRef.current?.focus();
  }, [cart.isOpen]);

  return (
    <>
      <div className={`scrim${cart.isOpen ? " is-open" : ""}`} onClick={cart.close} aria-hidden />
      <aside
        className={`drawer${cart.isOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Bag"
        aria-hidden={!cart.isOpen}
      >
        <div className="drawer-head">
          <span className="t-label">Bag ({cart.count})</span>
          <button ref={closeRef} className="t-label link-quiet" onClick={cart.close}>
            Close
          </button>
        </div>

        <div className="drawer-body">
          {cart.items.length === 0 ? (
            <div className="drawer-empty">
              <p className="t-ui muted" style={{ marginTop: 0 }}>
                Your bag is empty.
              </p>
              <Link href="/pieces" className="t-label link" onClick={cart.close}>
                View the pieces
              </Link>
            </div>
          ) : (
            cart.items.map((item) => (
              <div className="line-item" key={item.slug + (item.option ?? "")}>
                <Link href={`/pieces/${item.slug}`} onClick={cart.close}>
                  <Placeholder label="" />
                </Link>
                <div>
                  <p className="t-label muted" style={{ margin: "0 0 4px" }}>
                    {pieceNumber(item.product.number)}
                  </p>
                  <Link href={`/pieces/${item.slug}`} onClick={cart.close} className="t-name" style={{ fontSize: 20 }}>
                    {item.product.name}
                  </Link>
                  <p className="t-ui muted" style={{ margin: "4px 0 12px" }}>
                    {item.product.material}
                    {item.option && ` · ${item.product.options?.label} ${item.option}`}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div className="qty t-ui">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => cart.setQty(item.slug, item.option, item.qty - 1)}
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => cart.setQty(item.slug, item.option, item.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button className="t-ui muted link-quiet" onClick={() => cart.remove(item.slug, item.option)}>
                      Remove
                    </button>
                  </div>
                </div>
                <p className="t-ui" style={{ margin: 0 }}>
                  {formatPrice(item.product.price * item.qty)}
                </p>
              </div>
            ))
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="drawer-foot">
            <label className="check t-ui" style={{ marginBottom: cart.giftWrap ? 12 : 20 }}>
              <input
                type="checkbox"
                checked={cart.giftWrap}
                onChange={(e) => cart.setGiftWrap(e.target.checked)}
              />
              Gift wrap <span className="muted">· Complimentary</span>
            </label>
            {cart.giftWrap && (
              <textarea
                className="input t-ui"
                style={{ minHeight: 72, marginBottom: 20 }}
                placeholder="Gift note (optional)"
                maxLength={200}
                value={cart.giftNote}
                onChange={(e) => cart.setGiftNote(e.target.value)}
              />
            )}
            <div className="sum-row t-ui">
              <span>Subtotal</span>
              <span>{formatPrice(cart.subtotal)}</span>
            </div>
            <p className="t-ui muted" style={{ margin: "0 0 16px" }}>
              Shipping calculated at checkout
            </p>
            <Link href="/checkout" className="btn btn-primary" onClick={cart.close}>
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
