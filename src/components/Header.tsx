"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

const NAV = [
  { href: "/pieces", label: "Pieces" },
  { href: "/atelier", label: "Atelier" },
  { href: "/care", label: "Care" },
];

export function Header() {
  const pathname = usePathname();
  const { count, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className={`header${scrolled || menuOpen ? " is-scrolled" : ""}`}>
        <div className="header-inner">
          <div>
            <nav className="header-nav t-label" aria-label="Main">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="link-quiet"
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <button
              className="header-menu-btn t-label link-quiet"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>

          <Link href="/" className="header-logo" aria-label="Liv, home">
            LIV
          </Link>

          <div className="header-right">
            <button className="t-label link-quiet" onClick={open} aria-label={`Bag, ${count} items`}>
              Bag ({count})
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact">Contact</Link>
        </nav>
      )}
    </>
  );
}
