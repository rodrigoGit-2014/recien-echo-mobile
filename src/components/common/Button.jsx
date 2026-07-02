export function Button({ variant = "primary", children, onClick, disabled, icon, type = "button", style }) {
  return (
    <button
      type={type}
      className={`re-btn re-btn--${variant}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {icon}
      {children}
    </button>
  );
}
