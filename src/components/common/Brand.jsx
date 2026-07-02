export function BrandMark({ size = 44, animated = false }) {
  const ringStyle = (delay) => animated ? {
    animation: `re-sonar 2.4s ease-out infinite`,
    animationDelay: `${delay}s`,
  } : {};
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {animated && [0, 0.8, 1.6].map((d, i) => (
        <span key={i} style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: `2px solid var(--accent)`, ...ringStyle(d),
        }} />
      ))}
      <svg width={size} height={size} viewBox="0 0 44 44" style={{ position: "relative", zIndex: 1 }}>
        <circle cx="22" cy="22" r="21" stroke="var(--accent)" strokeWidth="2" opacity="0.25" fill="none" />
        <circle cx="22" cy="22" r="14.5" stroke="var(--accent)" strokeWidth="2" opacity="0.5" fill="none" />
        <circle cx="22" cy="22" r="8" stroke="var(--accent)" strokeWidth="2" opacity="0.85" fill="none" />
        <circle cx="22" cy="22" r="3.2" fill="var(--accent)" />
      </svg>
    </div>
  );
}

export function Wordmark({ size = 20 }) {
  return (
    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: size, letterSpacing: "-0.02em", display: "flex" }}>
      <span style={{ color: "var(--text)" }}>Recién</span>
      <span style={{ color: "var(--accent)" }}>Echo</span>
    </div>
  );
}
