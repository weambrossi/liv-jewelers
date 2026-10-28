import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap" style={{ paddingTop: 120, paddingBottom: 40 }}>
      <p className="t-label muted" style={{ margin: "0 0 16px" }}>404</p>
      <h1 className="t-title">This page doesn&apos;t exist.</h1>
      <Link href="/pieces" className="t-label link" style={{ display: "inline-block", marginTop: 32 }}>
        View the pieces
      </Link>
    </div>
  );
}
