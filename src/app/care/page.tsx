import type { Metadata } from "next";

export const metadata: Metadata = { title: "Care" };

// Policy figures are placeholders until shipping and returns are confirmed.
const RING_SIZES = [
  { us: "5", mm: "49.3", diameter: "15.7" },
  { us: "6", mm: "51.9", diameter: "16.5" },
  { us: "7", mm: "54.4", diameter: "17.3" },
  { us: "8", mm: "57.0", diameter: "18.1" },
  { us: "9", mm: "59.5", diameter: "19.0" },
];

const FAQ = [
  { q: "What is gold vermeil?", a: "A thick layer of 18k gold (at least 2.5 microns) over sterling silver." },
  { q: "Will vermeil tarnish?", a: "Over time, with wear. Follow the care steps above to slow it. Pieces can be re-plated." },
  { q: "Can I resize a ring?", a: "Solid gold rings can be resized once within the first year. Contact us first." },
  { q: "Do you ship internationally?", a: "[Confirm shipping regions.]" },
];

export default function CarePage() {
  return (
    <div className="wrap">
      <div className="page-head">
        <h1 className="t-display">Care</h1>
        <nav className="tabs t-label" style={{ marginTop: 32 }} aria-label="On this page">
          <a href="#sizing" className="link-quiet">Sizing</a>
          <a href="#care" className="link-quiet">Care</a>
          <a href="#materials" className="link-quiet">Materials</a>
          <a href="#shipping" className="link-quiet">Shipping &amp; returns</a>
          <a href="#faq" className="link-quiet">Questions</a>
        </nav>
      </div>

      <section id="sizing" className="two-col" style={{ scrollMarginTop: 80 }}>
        <h2 className="t-label" style={{ margin: 0 }}>Sizing</h2>
        <div>
          <p style={{ marginTop: 0 }} className="prose">
            Measure a ring that fits the intended finger, inside edge to inside edge, and match the diameter below.
            Between sizes, choose the larger.
          </p>
          <table className="table t-ui" style={{ maxWidth: 520, marginTop: 24 }}>
            <thead>
              <tr>
                <th>US size</th>
                <th>Circumference (mm)</th>
                <th>Diameter (mm)</th>
              </tr>
            </thead>
            <tbody>
              {RING_SIZES.map((s) => (
                <tr key={s.us}>
                  <td>{s.us}</td>
                  <td>{s.mm}</td>
                  <td>{s.diameter}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="t-ui muted" style={{ marginTop: 32 }}>
            Necklaces: 16&quot; sits at the base of the neck, 18&quot; at the collarbone, 20&quot; just below.
            <br />
            Bracelets: S fits wrists up to 15cm, M up to 16.5cm, L up to 18cm.
          </p>
        </div>
      </section>

      <section id="care" className="two-col" style={{ scrollMarginTop: 80 }}>
        <h2 className="t-label" style={{ margin: 0 }}>Care</h2>
        <div className="prose">
          <p>Remove before swimming, bathing, exercise or sleep.</p>
          <p>Apply perfume, lotion and hairspray before putting jewelry on.</p>
          <p>Store each piece separately in its pouch, away from humidity.</p>
          <p>Clean with a soft dry cloth. No chemical cleaners on vermeil.</p>
        </div>
      </section>

      <section id="materials" className="two-col" style={{ scrollMarginTop: 80 }}>
        <h2 className="t-label" style={{ margin: 0 }}>Materials</h2>
        <div className="prose">
          <p>
            <strong style={{ fontWeight: 500 }}>18k gold vermeil.</strong> At least 2.5 microns of 18k gold over
            sterling silver.
          </p>
          <p>
            <strong style={{ fontWeight: 500 }}>14k solid gold.</strong> Gold throughout. Will not wear through.
          </p>
        </div>
      </section>

      <section id="shipping" className="two-col" style={{ scrollMarginTop: 80 }}>
        <h2 className="t-label" style={{ margin: 0 }}>Shipping &amp; returns</h2>
        <div className="prose">
          <p>Orders ship in 2–3 business days, insured and signature-required.</p>
          <p>Free shipping on every order within the US.</p>
          <p>Returns within 30 days of delivery on unworn pieces in original packaging. Engraved pieces are final sale.</p>
        </div>
      </section>

      <section id="faq" className="two-col" style={{ scrollMarginTop: 80 }}>
        <h2 className="t-label" style={{ margin: 0 }}>Questions</h2>
        <div style={{ maxWidth: 620 }}>
          {FAQ.map((f) => (
            <details key={f.q} className="acc">
              <summary className="t-ui">{f.q}</summary>
              <div className="acc-body t-ui muted">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
