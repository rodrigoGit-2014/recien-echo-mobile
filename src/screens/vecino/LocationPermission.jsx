import { TopBar } from "../../components/common/TopBar.jsx";
import { Button } from "../../components/common/Button.jsx";
import { LocationIcon } from "../../components/common/icons.jsx";

export function LocationPermissionScreen({ nav }) {
  return (
    <div className="re-screen re-screen-enter">
      <TopBar onBack={() => nav.back()} />
      <div className="re-permission">
        <div className="re-permission__icon">
          <LocationIcon size={44} color="var(--accent)" />
        </div>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, marginBottom: 10 }}>
            Activa tu ubicación
          </h1>
          <p style={{ fontSize: 14.5, color: "var(--text-dim)", lineHeight: 1.55, maxWidth: 280 }}>
            La usamos solo para centrar el radar en tu barrio y calcular qué tan lejos están
            las cosas recién hechas. Nunca la compartimos con nadie.
          </p>
        </div>
      </div>
      <div className="re-pad" style={{ paddingBottom: 40, display: "flex", flexDirection: "column", gap: 14 }}>
        <Button variant="primary" onClick={() => nav.go("radar")}>Permitir ubicación</Button>
        <button className="re-btn re-btn--link" style={{ alignSelf: "center" }} onClick={() => nav.go("radar")}>Ahora no</button>
      </div>
    </div>
  );
}
