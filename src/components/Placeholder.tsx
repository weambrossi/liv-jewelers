// Stand-in for a photo. Keeps the final aspect ratio so layouts don't shift
// when real images replace it. `label` names the shot that belongs here.

type Props = {
  label: string;
  ratio?: string; // CSS aspect-ratio, e.g. "4 / 5"
  alt?: boolean; // slightly darker fill, used for the hover / on-body shot
  className?: string;
  style?: React.CSSProperties;
};

export function Placeholder({ label, ratio = "4 / 5", alt, className = "", style }: Props) {
  return (
    <div
      className={`ph${alt ? " ph-alt" : ""} ${className}`}
      style={{ aspectRatio: ratio, ...style }}
      role="img"
      aria-label={label}
    >
      <span className="ph-label t-label">{label}</span>
    </div>
  );
}
