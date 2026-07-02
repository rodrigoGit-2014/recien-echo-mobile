import { Button } from "../../components/common/Button.jsx";
import { CheckIcon } from "../../components/common/icons.jsx";

export function AccountVerifiedScreen({ nav }) {
  return (
    <div className="re-screen re-screen-enter">
      <div className="re-permission">
        <div className="re-success-icon">
          <span className="re-success-icon__ring" />
          <CheckIcon size={42} color="var(--fresh)" />
        </div>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, marginBottom: 10 }}>
            ¡Correo verificado!
          </h1>
          <p style={{ fontSize: 14.5, color: "var(--text-dim)", lineHeight: 1.55, maxWidth: 280 }}>
            Ahora configuremos tu negocio para que puedas empezar a avisarle a tus vecinos.
          </p>
        </div>
      </div>
      <div className="re-pad" style={{ paddingBottom: 40 }}>
        <Button variant="fresh" onClick={() => nav.go("configureBusiness")}>Configurar mi negocio</Button>
      </div>
    </div>
  );
}
