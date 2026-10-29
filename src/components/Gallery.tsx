"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Placeholder } from "./Placeholder";

// Desktop: images stacked in a column. Mobile: swipe gallery with a counter.
export function Gallery({
  shots,
  image,
  alt = "",
}: {
  shots: { label: string; alt?: boolean }[];
  image?: string;
  alt?: string;
}) {
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
        {shots.map((s, i) =>
          i === 0 && image ? (
            <div className="photo" key={s.label}>
              <Image src={image} alt={alt} width={1200} height={1500} sizes="(max-width: 860px) 100vw, 60vw" priority />
            </div>
          ) : (
            <Placeholder key={s.label} label={s.label} alt={s.alt} />
          ),
        )}
      </div>
      <span className="pdp-counter t-label muted" aria-hidden>
        {index + 1} / {shots.length}
      </span>
    </div>
  );
}
