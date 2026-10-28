"use client";

import { useRef, useState } from "react";
import { Placeholder } from "./Placeholder";

// Desktop: images stacked in a column. Mobile: swipe gallery with a counter.
export function Gallery({ shots }: { shots: { label: string; alt?: boolean }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="pdp-gallery-wrap">
      <div className="pdp-gallery" ref={ref} onScroll={onScroll}>
        {shots.map((s) => (
          <Placeholder key={s.label} label={s.label} alt={s.alt} />
        ))}
      </div>
      <span className="pdp-counter t-label muted" aria-hidden>
        {index + 1} / {shots.length}
      </span>
    </div>
  );
}
