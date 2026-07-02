import { CatIcon } from "../../data/CatIcon.jsx";
import { CATEGORY_BY_ID } from "../../data/categories.js";
import { Button } from "../../components/common/Button.jsx";
import { ChevronRightIcon, LogoutIcon, TeamIcon, SettingsIcon, BoltIcon } from "../../components/common/icons.jsx";

export function DashboardScreen({ nav, business, metrics, onLogout }) {
  const cat = CATEGORY_BY_ID[business.category];
  return (
    <div className="re-screen re-screen-enter">
      <div className="re-topbar" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 12, background: `${cat.tint}26`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <CatIcon id={business.category} size={19} color={cat.tint} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {business.name}
          </span>
        </div>
        <button className="re-back-btn" onClick={onLogout}><LogoutIcon size={17} /></button>
      </div>

      <div className="re-scroll re-pad" style={{ paddingTop: 6, paddingBottom: 110 }}>
        <div className="re-code-card">
          <div style={{ fontSize: 12.5, color: "var(--text-dim)", fontWeight: 600, marginBottom: 8 }}>CÓDIGO DE TU NEGOCIO</div>
          <div className="re-code" style={{ fontSize: 30, color: "var(--accent)" }}>{business.code}</div>
          <div style={{ fontSize: 12.5, color: "var(--text-dim)", marginTop: 8 }}>Compártelo con tu equipo para que se unan</div>
        </div>

        <div className="re-metric-grid" style={{ marginTop: 16 }}>
          <div className="re-metric">
            <div className="re-metric__value">{metrics.postedToday}</div>
            <div className="re-metric__label">Publicado hoy</div>
          </div>
          <div className="re-metric">
            <div className="re-metric__value">{metrics.viewsToday}</div>
            <div className="re-metric__label">Vistas hoy</div>
          </div>
          <div className="re-metric">
            <div className="re-metric__value">{metrics.collaborators}</div>
            <div className="re-metric__label">Colaboradores</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
          <div className="re-nav-row" onClick={() => nav.go("collaborators")}>
            <div className="re-icon-circle" style={{ width: 42, height: 42, background: "rgba(255,224,61,0.12)" }}>
              <TeamIcon size={19} color="var(--accent)" />
            </div>
            <div style={{ flex: 1 }}>
              <div className="re-nav-row__title">Colaboradores</div>
              <div className="re-nav-row__sub">{metrics.collaborators} activos en tu equipo</div>
            </div>
            <ChevronRightIcon size={18} color="var(--text-dim)" />
          </div>
          <div className="re-nav-row" onClick={() => nav.go("configureBusiness", { editMode: true })}>
            <div className="re-icon-circle" style={{ width: 42, height: 42, background: "rgba(74,222,128,0.12)" }}>
              <SettingsIcon size={19} color="var(--fresh)" />
            </div>
            <div style={{ flex: 1 }}>
              <div className="re-nav-row__title">Configuración del negocio</div>
              <div className="re-nav-row__sub">Nombre, categoría, ubicación</div>
            </div>
            <ChevronRightIcon size={18} color="var(--text-dim)" />
          </div>
        </div>
      </div>

      <div className="re-pad" style={{ position: "absolute", left: 0, right: 0, bottom: 32 }}>
        <Button variant="fresh" icon={<BoltIcon size={18} />} onClick={() => nav.go("publish")}>¡Recién hecho!</Button>
      </div>
    </div>
  );
}
