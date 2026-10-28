"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { Placeholder } from "@/components/Placeholder";
import { formatPrice, pieceNumber } from "@/lib/products";

// Stub checkout. When the store is connected, the bag's Checkout button should
// hand off to Shopify (or Stripe) Checkout instead of this page.
export default function CheckoutPage() {
  const cart = useCart();
  const [placed, setPlaced] = useState<{ total: number; email: string } | null>(null);

  if (placed) {
    return (
      <div className="wrap" style={{ paddingTop: 96, maxWidth: 640 }}>
        <p className="t-label muted" style={{ margin: "0 0 16px" }}>Order placed</p>
        <h1 className="t-title">Thank you.</h1>
        <p style={{ margin: "20px 0 40px" }}>
          A confirmation for {formatPrice(placed.total)} is on its way to {placed.email}.
        </p>
        <Link href="/pieces" className="t-label link">View the pieces</Link>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="wrap" style={{ paddingTop: 96 }}>
        <h1 className="t-title">Checkout</h1>
        <p className="t-ui muted" style={{ margin: "20px 0 32px" }}>Your bag is empty.</p>
        <Link href="/pieces" className="t-label link">View the pieces</Link>
      </div>
    );
  }

  const shipping = 0;
  const total = cart.subtotal + shipping;

  return (
    <div className="wrap">
      <div className="checkout">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const email = String(new FormData(e.currentTarget).get("email") ?? "");
            setPlaced({ total, email });
            cart.clear();
            window.scrollTo(0, 0);
          }}
        >
          <h1 className="t-title" style={{ marginBottom: 40 }}>Checkout</h1>

          <fieldset>
            <legend className="t-label">Contact</legend>
            <label className="field">
              <span className="sr-only">Email</span>
              <input className="input t-ui" name="email" type="email" required placeholder="Email" autoComplete="email" />
            </label>
          </fieldset>

          <fieldset>
            <legend className="t-label">Shipping</legend>
            <div className="field-row">
              <label className="field">
                <span className="sr-only">First name</span>
                <input className="input t-ui" required placeholder="First name" autoComplete="given-name" />
              </label>
              <label className="field">
                <span className="sr-only">Last name</span>
                <input className="input t-ui" required placeholder="Last name" autoComplete="family-name" />
              </label>
            </div>
            <label className="field">
              <span className="sr-only">Address</span>
              <input className="input t-ui" required placeholder="Address" autoComplete="address-line1" />
            </label>
            <label className="field">
              <span className="sr-only">Apartment, suite</span>
              <input className="input t-ui" placeholder="Apartment, suite (optional)" autoComplete="address-line2" />
            </label>
            <div className="field-row" style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
              <label className="field">
                <span className="sr-only">City</span>
                <input className="input t-ui" required placeholder="City" autoComplete="address-level2" />
              </label>
              <label className="field">
                <span className="sr-only">State</span>
                <input className="input t-ui" required placeholder="State" autoComplete="address-level1" />
              </label>
              <label className="field">
                <span className="sr-only">ZIP</span>
                <input className="input t-ui" required placeholder="ZIP" autoComplete="postal-code" />
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend className="t-label">Payment</legend>
            <div className="ph" style={{ height: 120, display: "grid", placeItems: "center" }}>
              <span className="t-label muted">Payment · Shopify / Stripe</span>
            </div>
          </fieldset>

          <button className="btn btn-primary" type="submit">
            Place order — {formatPrice(total)}
          </button>
        </form>

        <aside className="checkout-summary" aria-label="Order summary">
          <p className="t-label" style={{ margin: "0 0 8px" }}>Order summary</p>
          {cart.items.map((item) => (
            <div key={item.slug + (item.option ?? "")} className="line-item" style={{ gridTemplateColumns: "56px 1fr auto" }}>
              <Placeholder label="" />
              <div className="t-ui">
                <p style={{ margin: 0 }}>
                  <span className="muted">{pieceNumber(item.product.number)}</span> {item.product.name}
                </p>
                <p className="muted" style={{ margin: "2px 0 0" }}>
                  {item.product.material}
                  {item.option && ` · ${item.product.options?.label} ${item.option}`}
                  {item.qty > 1 && ` · ×${item.qty}`}
                </p>
              </div>
              <span className="t-ui">{formatPrice(item.product.price * item.qty)}</span>
            </div>
          ))}
          <div style={{ paddingTop: 16 }} className="t-ui">
            <div className="sum-row">
              <span>Subtotal</span>
              <span>{formatPrice(cart.subtotal)}</span>
            </div>
            {cart.giftWrap && (
              <div className="sum-row">
                <span>Gift wrap</span>
                <span>Complimentary</span>
              </div>
            )}
            <div className="sum-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="sum-row" style={{ marginTop: 12, fontWeight: 500 }}>
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
