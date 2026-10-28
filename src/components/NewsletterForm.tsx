"use client";

import { useState } from "react";

// Not connected to an email service yet; shows the confirmed state locally.
export function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return <p className="t-ui" style={{ margin: 0 }}>Subscribed.</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      style={{ display: "flex", gap: 8, maxWidth: 440 }}
    >
      <label className="sr-only" htmlFor="newsletter-email">
        Email
      </label>
      <input id="newsletter-email" className="input t-ui" type="email" required placeholder="Email" />
      <button className="btn btn-outline" type="submit" style={{ height: 48, flexShrink: 0 }}>
        Join
      </button>
    </form>
  );
}
