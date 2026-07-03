import { Button } from "../../components/common/Button.jsx";
import { CheckIcon } from "../../components/common/icons.jsx";

export function AccountVerifiedScreen({ nav, onContinue, role = "negocio" }) {
  const isVecino = role === "vecino";

  return (
    <div className="re-screen re-screen-enter">
      <div className="re-permission">
        <div className="re-success-icon">
          <span className="re-success-icon__ring" />
          <CheckIcon size={42} color="var(--fresh)" />
        </div>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, marginBottom: 10 }}>
            {isVecino ? "¡Bienvenido al barrio!" : "¡Correo verificado!"}
          </h1>
          <p style={{ fontSize: 14.5, color: "var(--text-dim)", lineHeight: 1.55, maxWidth: 280 }}>
            {isVecino
              ? "Tu cuenta está lista. Ahora activa tu ubicación para descubrir qué está recién hecho cerca de ti."
              : "Ahora configuremos tu negocio para que puedas empezar a avisarle a tus vecinos."}
          </p>
        </div>
      </div>
      <div className="re-pad" style={{ paddingBottom: 40 }}>
        <Button variant="fresh" onClick={onContinue || (() => nav.go(isVecino ? "locationPermission" : "configureBusiness"))}>
          {isVecino ? "Activar ubicación" : "Configurar mi negocio"}
        </Button>
      </div>
    </div>
  );
}
