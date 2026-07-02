import { ArrowLeftIcon } from "./icons.jsx";

export function TopBar({ onBack, title, right }) {
  return (
    <div className="re-topbar">
      {onBack ? (
        <button className="re-back-btn" onClick={onBack}><ArrowLeftIcon size={18} /></button>
      ) : <div style={{ width: 42 }} />}
      {title && <div className="re-topbar__title">{title}</div>}
      <div className="re-topbar__slot">{right}</div>
    </div>
  );
}
