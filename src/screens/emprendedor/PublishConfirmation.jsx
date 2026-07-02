import { CatIcon } from "../../data/CatIcon.jsx";
import { CATEGORY_BY_ID } from "../../data/categories.js";
import { Button } from "../../components/common/Button.jsx";
import { CheckIcon } from "../../components/common/icons.jsx";

export function PublishConfirmationScreen({ nav, business, pin }) {
  const cat = CATEGORY_BY_ID[business.category];
  return (
    <div className="re-screen re-screen-enter">
      <div className="re-permission" style={{ flex: "none", paddingTop: 56, paddingBottom: 24 }}>
        <div className="re-success-icon">
          <span className="re-success-icon__ring" />
          <CheckIcon size={42} color="var(--fresh)" />
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24 }}>¡Estás en el radar!</h1>
        <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.5, maxWidth: 280 }}>
          Tus vecinos ya pueden ver que {pin.product.toLowerCase()} está recién hecho.
        </p>
      </div>

      <div className="re-pad">
        <div className="re-pin-preview">
          <div className="re-ring-progress">
            <svg width="56" height="56" style={{ position: "absolute" }}>
              <circle cx="28" cy="28" r="24" fill="none" stroke="var(--line)" strokeWidth="3" />
              <circle cx="28" cy="28" r="24" fill="none" stroke="var(--fresh)" strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 24}`} strokeDashoffset="0" strokeLinecap="round"
                transform="rotate(-90 28 28)" />
            </svg>
            <CatIcon id={business.category} size={24} color={cat.tint} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15.5 }}>{pin.product}</div>
            <div style={{ fontSize: 12.5, color: "var(--text-dim)", marginTop: 2 }}>{business.name} · {pin.quantity} unid.</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="re-code" style={{ color: "var(--fresh)", fontSize: 17 }}>30:00</div>
            <div style={{ fontSize: 10.5, color: "var(--text-dim)" }}>tiempo restante</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} />
      <div className="re-pad" style={{ paddingBottom: 40, display: "flex", flexDirection: "column", gap: 14 }}>
        <Button variant="primary" onClick={() => nav.go("radar")}>Ver mi pin en el radar</Button>
        <button className="re-btn re-btn--link" style={{ alignSelf: "center" }} onClick={() => nav.go("publish")}>Publicar algo más</button>
      </div>
    </div>
  );
}
