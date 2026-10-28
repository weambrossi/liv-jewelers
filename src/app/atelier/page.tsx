import type { Metadata } from "next";
import Link from "next/link";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Atelier" };

// Copy in [brackets] is a placeholder for the brand story.
const CHAPTERS = [
  {
    label: "Materials",
    text: "[Which metals and stones are used, where they come from, and why.]",
    shot: "Atelier · Raw materials",
  },
  {
    label: "Process",
    text: "[How a piece is made: carving, casting, finishing. How long it takes.]",
    shot: "Atelier · Bench, tools",
  },
  {
    label: "The studio",
    text: "[Where the studio is and who works there.]",
    shot: "Atelier · Studio space",
  },
];

export default function AtelierPage() {
  return (
    <>
      <Placeholder label="Atelier · Full-width editorial" ratio="auto" style={{ height: "72svh", minHeight: 420 }} />

      <section className="section">
        <div className="wrap" style={{ textAlign: "center" }}>
          <p className="t-label muted" style={{ margin: "0 0 24px" }}>
            Atelier
          </p>
          <p className="t-title" style={{ maxWidth: 760, margin: "0 auto" }}>
            [Brand story, under 150 words. Who founded Liv, where the pieces are made, and what the twelve have in
            common.]
          </p>
        </div>
      </section>

      {CHAPTERS.map((c, i) => (
        <section key={c.label} className="section" style={{ paddingTop: 0 }}>
          <div className="wrap atelier-strip" style={{ direction: i % 2 ? "rtl" : "ltr" }}>
            <Reveal>
              <Placeholder label={c.shot} ratio="4 / 5" />
            </Reveal>
            <Reveal className="atelier-strip-text" delay={120}>
              <div style={{ direction: "ltr" }}>
                <p className="t-label muted" style={{ margin: "0 0 16px" }}>
                  {c.label}
                </p>
                <p className="t-name" style={{ maxWidth: 420, fontSize: 26, lineHeight: 1.3 }}>
                  {c.text}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "minmax(0, 360px)", justifyContent: "center", textAlign: "center" }}>
          <Placeholder label="Founder · Portrait" ratio="4 / 5" />
          <p className="t-name" style={{ marginTop: 24, fontStyle: "italic" }}>
            [Founder name]
          </p>
          <Link href="/pieces" className="t-label link" style={{ marginTop: 40, justifySelf: "center" }}>
            View the pieces
          </Link>
        </div>
      </section>
    </>
  );
}
