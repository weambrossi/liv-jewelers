import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="wrap">
      <div className="page-head">
        <h1 className="t-display">Contact</h1>
      </div>
      <div className="two-col">
        <div className="t-ui">
          <p className="t-label" style={{ margin: "0 0 8px" }}>Email</p>
          <p style={{ margin: "0 0 24px" }}>
            <a href="mailto:hello@example.com" className="link">[hello@liv.com]</a>
          </p>
          <p className="t-label" style={{ margin: "0 0 8px" }}>Instagram</p>
          <p style={{ margin: 0 }}>
            <a href="https://instagram.com" className="link">[@liv]</a>
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
