import { Button } from "../../components/common/Button.jsx";
import { CheckIcon } from "../../components/common/icons.jsx";

export function PasswordUpdatedScreen({ nav }) {
  return (
    <div className="re-screen re-screen-enter">
      <div className="re-permission">
        <div className="re-success-icon">
          <span className="re-success-icon__ring" />
          <CheckIcon size={42} color="var(--fresh)" />
        </div>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, marginBottom: 10 }}>
            Contraseña actualizada
          </h1>
          <p style={{ fontSize: 14.5, color: "var(--text-dim)", lineHeight: 1.55, maxWidth: 280 }}>
            Ya puedes iniciar sesión con tu nueva contraseña.
          </p>
        </div>
      </div>
      <div className="re-pad" style={{ paddingBottom: 40 }}>
        <Button variant="primary" onClick={() => nav.go("login")}>Iniciar sesión</Button>
      </div>
    </div>
  );
}
