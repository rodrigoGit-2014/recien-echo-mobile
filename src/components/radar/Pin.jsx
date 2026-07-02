import { CatIcon } from "../../data/CatIcon.jsx";
import { CATEGORY_BY_ID } from "../../data/categories.js";
import { getFreshness, formatElapsed } from "../../data/formatters.js";

export function Pin({ pin, now, selected, dim, onSelect, style }) {
  const fresh = getFreshness(pin.publishedAt, now);
  const cat = CATEGORY_BY_ID[pin.category];
  return (
    <div
      className={`re-pin ${selected ? "re-pin--selected" : ""}`}
      style={{ left: `${pin.x}%`, top: `${pin.y}%`, opacity: dim ? 0.22 : 1, ...style }}
      onClick={() => onSelect(pin)}
    >
      <div
        className="re-pin__drop"
        style={{
          background: cat.tint,
          boxShadow: selected ? `0 0 0 6px ${fresh.color.replace("var(--fresh)", "rgba(74,222,128,0.28)")}, 0 6px 14px rgba(0,0,0,0.45)` : undefined,
        }}
      >
        <div className="re-pin__drop-icon"><CatIcon id={pin.category} size={22} color="#fff" /></div>
      </div>
      <div className="re-pin__capsule">
        <span className="re-pin__capsule-dot" style={{ background: fresh.color }} />
        {formatElapsed(fresh.elapsedS)}
      </div>
    </div>
  );
}

export function ClusterPin({ group, onExpand }) {
  const cx = group.reduce((s, p) => s + p.x, 0) / group.length;
  const cy = group.reduce((s, p) => s + p.y, 0) / group.length;
  return (
    <div className="re-cluster" style={{ left: `${cx}%`, top: `${cy}%` }} onClick={() => onExpand(group, cx, cy)}>
      <span className="re-cluster__count">{group.length}</span>
      <span className="re-cluster__label">aquí cerca</span>
    </div>
  );
}
