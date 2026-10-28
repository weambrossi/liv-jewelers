import Link from "next/link";

const LINKS = [
  { href: "/pieces", label: "Pieces" },
  { href: "/atelier", label: "Atelier" },
  { href: "/care", label: "Care" },
  { href: "/care#shipping", label: "Shipping & returns" },
  { href: "/contact", label: "Contact" },
  { href: "https://instagram.com", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <nav className="footer-links t-ui" aria-label="Footer">
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="link-quiet">
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="t-ui muted" style={{ margin: 0 }}>
          © {new Date().getFullYear()} Liv
        </p>
      </div>
    </footer>
  );
}
