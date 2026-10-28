"use client";

import { useState } from "react";

// Not connected to email yet; shows the sent state locally.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return <p className="t-ui">Sent. We reply within two business days.</p>;
  }

  return (
    <form
      style={{ maxWidth: 560 }}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="field-row">
        <label className="field">
          <span className="t-label">Name</span>
          <input className="input t-ui" name="name" required autoComplete="name" />
        </label>
        <label className="field">
          <span className="t-label">Email</span>
          <input className="input t-ui" name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label className="field">
        <span className="t-label">Order number (optional)</span>
        <input className="input t-ui" name="order" />
      </label>
      <label className="field">
        <span className="t-label">Message</span>
        <textarea className="input t-ui" name="message" required />
      </label>
      <button className="btn btn-outline" type="submit">
        Send
      </button>
    </form>
  );
}
