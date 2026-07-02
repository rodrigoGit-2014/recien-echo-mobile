import { useState } from "react";
import { TopBar } from "../../components/common/TopBar.jsx";
import { TextField } from "../../components/common/TextField.jsx";
import { PinInput } from "../../components/common/PinInput.jsx";
import { Button } from "../../components/common/Button.jsx";
import { AlertIcon } from "../../components/common/icons.jsx";
import { registerUser } from "../../services/authService.js";
import { isValidEmail, isValidPin } from "../../utils/validators.js";

export function VecinoSignupScreen({ nav }) {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const canSubmit = isValidEmail(email) && isValidPin(pin) && !pending;

  async function handleSubmit() {
    if (!canSubmit) return;
    setPending(true);
    setError(null);
    try {
      await registerUser({ email, password: pin, role: "vecino" });
      nav.go("locationPermission");
    } catch (err) {
      setError(err.message || "No pudimos crear tu cuenta. Inténtalo de nuevo.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="re-screen re-screen-enter">
      <TopBar onBack={() => nav.back()} />
      <div className="re-scroll re-pad" style={{ paddingBottom: 32 }}>
        <div style={{ marginTop: 4, marginBottom: 28 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, letterSpacing: "-0.02em" }}>
            Únete a tu barrio
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-dim)", marginTop: 8, lineHeight: 1.5 }}>
            Regístrate en menos de 30 segundos y descubre qué está recién hecho cerca de ti.
          </p>
        </div>

        {error && (
          <div className="re-banner-error" style={{ marginBottom: 18 }}>
            <AlertIcon size={16} />
            <div>{error}</div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <TextField label="Correo electrónico" type="email" placeholder="tu@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <PinInput label="Crea una contraseña de 4 dígitos" secure value={pin} onChange={setPin} />
        </div>

        <div style={{ marginTop: 24 }}>
          <Button variant="primary" disabled={!canSubmit} onClick={handleSubmit}>
            {pending ? "Creando cuenta…" : "Crear cuenta"}
          </Button>
        </div>

        <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-dim)", marginTop: 18 }}>
          ¿Ya tienes cuenta? <a onClick={() => nav.go("radar")} style={{ color: "var(--accent)", fontWeight: 600 }}>Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}
