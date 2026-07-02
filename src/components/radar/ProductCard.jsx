import { CatIcon } from "../../data/CatIcon.jsx";
import { CATEGORY_BY_ID } from "../../data/categories.js";
import { getFreshness, formatElapsed, formatDistance } from "../../data/formatters.js";
import { ChevronRightIcon } from "../common/icons.jsx";

export function ProductCard({ pin, now, active, onClick }) {
  const fresh = getFreshness(pin.publishedAt, now);
  const cat = CATEGORY_BY_ID[pin.category];
  return (
    <div className={`re-product-card ${active ? "re-product-card--active" : ""}`} onClick={onClick}>
      <div className="re-product-thumb" style={{ background: `linear-gradient(150deg, ${cat.tint}55, ${cat.tint}22)` }}>
        <CatIcon id={pin.category} size={30} color={cat.tint} strokeWidth={1.6} className="re-product-thumb__icon" />
      </div>
      <div className="re-product-info">
        <div className="re-product-name">{pin.product}</div>
        <div className="re-product-biz">{pin.businessName}</div>
        <div className="re-product-meta">
          <span className="re-product-meta__dot" style={{ background: fresh.color }} />
          <span style={{ color: fresh.color }}>{formatElapsed(fresh.elapsedS)}</span>
          <span>· {formatDistance(pin.distanceM)}</span>
        </div>
      </div>
      <ChevronRightIcon size={18} color="var(--text-dim)" />
    </div>
  );
}
