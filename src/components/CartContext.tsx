"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "@/lib/products";

export type CartLine = {
  slug: string;
  option?: string;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  giftWrap: boolean;
  giftNote: string;
};

type CartContextValue = CartState & {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, option?: string) => void;
  setQty: (slug: string, option: string | undefined, qty: number) => void;
  remove: (slug: string, option?: string) => void;
  setGiftWrap: (v: boolean) => void;
  setGiftNote: (v: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  items: (CartLine & { product: Product })[];
};

const STORAGE_KEY = "liv-cart-v1";
const EMPTY: CartState = { lines: [], giftWrap: false, giftNote: "" };

const CartContext = createContext<CartContextValue | null>(null);

const same = (a: CartLine, slug: string, option?: string) => a.slug === slug && a.option === option;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>(EMPTY);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Restore from browser storage. Storage can be unavailable (private mode), so fail quietly.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        setState({ ...EMPTY, ...parsed, lines: parsed.lines.filter((l) => getProduct(l.slug)) });
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, loaded]);

  // Lock page scroll and allow Escape while the drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const add = useCallback((slug: string, option?: string) => {
    setState((s) => {
      const existing = s.lines.find((l) => same(l, slug, option));
      const lines = existing
        ? s.lines.map((l) => (same(l, slug, option) ? { ...l, qty: l.qty + 1 } : l))
        : [...s.lines, { slug, option, qty: 1 }];
      return { ...s, lines };
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((slug: string, option: string | undefined, qty: number) => {
    setState((s) => ({
      ...s,
      lines:
        qty <= 0
          ? s.lines.filter((l) => !same(l, slug, option))
          : s.lines.map((l) => (same(l, slug, option) ? { ...l, qty } : l)),
    }));
  }, []);

  const remove = useCallback((slug: string, option?: string) => {
    setState((s) => ({ ...s, lines: s.lines.filter((l) => !same(l, slug, option)) }));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const items = state.lines
      .map((l) => ({ ...l, product: getProduct(l.slug)! }))
      .filter((l) => l.product);
    return {
      ...state,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      setQty,
      remove,
      setGiftWrap: (giftWrap) => setState((s) => ({ ...s, giftWrap })),
      setGiftNote: (giftNote) => setState((s) => ({ ...s, giftNote })),
      clear: () => setState(EMPTY),
      count: items.reduce((n, l) => n + l.qty, 0),
      subtotal: items.reduce((n, l) => n + l.qty * l.product.price, 0),
      items,
    };
  }, [state, isOpen, add, setQty, remove]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
