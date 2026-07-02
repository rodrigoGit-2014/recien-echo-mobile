export function Chip({ active, tint, icon, label, onClick }) {
  return (
    <button
      className={`re-chip ${active ? "re-chip--active" : ""}`}
      style={active ? { background: tint || "var(--accent)" } : undefined}
      onClick={onClick}
      type="button"
    >
      {icon}
      {label}
    </button>
  );
}
