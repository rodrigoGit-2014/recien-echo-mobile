import { useState } from "react";
import { CatIcon } from "../../data/CatIcon.jsx";
import { CATEGORY_BY_ID } from "../../data/categories.js";
import { getFreshness, formatElapsed, formatDistance, walkMinutes } from "../../data/formatters.js";
import { Button } from "../../components/common/Button.jsx";
import { ArrowLeftIcon, MapPinIcon, ClockIcon, CheckIcon } from "../../components/common/icons.jsx";

export function ProductDetailScreen({ nav, pin, now }) {
  const [routeStarted, setRouteStarted] = useState(false);
  if (!pin) return null;
  const cat = CATEGORY_BY_ID[pin.category];
  const fresh = getFreshness(pin.publishedAt, now);
  const wMin = walkMinutes(pin.distanceM);

  return (
    <div className="re-screen re-screen-enter">
      <div className="re-detail-hero" style={{ background: `linear-gradient(150deg, ${cat.tint}66, ${cat.tint}1a)` }}>
        <div className="re-detail-hero__icon">
          <CatIcon id={pin.category} size={180} color="#fff" strokeWidth={1.2} />
        </div>
        <button
          className="re-back-btn"
          style={{ position: "absolute", top: 47 + 10, left: 16, background: "rgba(20,20,16,0.55)", borderColor: "rgba(255,255,255,0.15)" }}
          onClick={() => nav.back()}
        >
          <ArrowLeftIcon size={18} />
        </button>
        <div className="re-detail-badge" style={{ top: "auto", bottom: 16, left: 16 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: fresh.color }} />
          <span style={{ fontSize: 12.5, fontWeight: 700, textTransform: "capitalize" }}>{fresh.state}</span>
          <span style={{ fontSize: 12.5, color: "var(--text-dim)" }}>· {formatElapsed(fresh.elapsedS)}</span>
        </div>
      </div>

      <div className="re-scroll re-pad" style={{ paddingTop: 22, paddingBottom: 24 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.02em" }}>
          {pin.product}
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, color: "var(--text-dim)", fontSize: 14 }}>
          <CatIcon id={pin.category} size={16} color={cat.tint} />
          {pin.businessName}
        </div>

        <div className="re-stat-grid" style={{ marginTop: 22 }}>
          <div className="re-stat">
            <div className="re-stat__value">{formatDistance(pin.distanceM)}</div>
            <div className="re-stat__label">Distancia</div>
          </div>
          <div className="re-stat">
            <div className="re-stat__value">{wMin} min</div>
            <div className="re-stat__label">A pie</div>
          </div>
          <div className="re-stat">
            <div className="re-stat__value">{formatElapsed(fresh.elapsedS)}</div>
            <div className="re-stat__label">Publicado</div>
          </div>
        </div>

        <div className="re-card" style={{ marginTop: 16, display: "flex", alignItems: "flex-start", gap: 12 }}>
          <MapPinIcon size={20} color="var(--accent)" />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14.5 }}>{pin.businessName}</div>
            <div style={{ fontSize: 13.5, color: "var(--text-dim)", marginTop: 3 }}>{pin.address}</div>
          </div>
        </div>

        <p style={{ fontSize: 12.5, color: "var(--text-dim)", marginTop: 16, lineHeight: 1.5, display: "flex", gap: 8 }}>
          <ClockIcon size={16} color="var(--text-dim)" />
          Sin reservas, sin pagos. Esta publicación desaparece del radar cuando se cumplen 30 minutos —
          ve pronto si te interesa.
        </p>
      </div>

      <div className="re-pad" style={{ paddingBottom: 40 }}>
        <Button
          variant={routeStarted ? "fresh" : "primary"}
          icon={routeStarted ? <CheckIcon size={18} /> : undefined}
          onClick={() => setRouteStarted(true)}
        >
          {routeStarted ? "Ruta iniciada" : "Cómo llegar"}
        </Button>
      </div>
    </div>
  );
}
