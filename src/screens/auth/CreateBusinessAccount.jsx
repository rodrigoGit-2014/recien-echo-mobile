import { useState } from "react";
import { TopBar } from "../../components/common/TopBar.jsx";
import { TextField } from "../../components/common/TextField.jsx";
import { PinInput } from "../../components/common/PinInput.jsx";
import { Button } from "../../components/common/Button.jsx";
import { registerUser } from "../../services/authService.js";
import { isValidEmail, isValidPin } from "../../utils/validators.js";

export function CreateBusinessAccountScreen({ nav }) {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [pinError, setPinError] = useState(null);
  const [pending, setPending] = useState(false);

  const canSubmit = isValidEmail(email) && isValidPin(pin) && !pending;

  async function handleSubmit() {
    if (!canSubmit) return;
    setPending(true);
    setEmailError(null);
    setPinError(null);
    try {
      await registerUser({ email, password: pin, role: "negocio" });
      nav.go("verifyEmail", { email });
    } catch (err) {
      if (err.code === "INVALID_PASSWORD") setPinError(err.message);
      else setEmailError(err.message || "No pudimos crear tu cuenta. Inténtalo de nuevo.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="re-screen re-screen-enter">
      <TopBar onBack={() => nav.back()} />
      <div className="re-scroll re-pad" style={{ paddingBottom: 32 }}>
        <div style={{ marginTop: 4, marginBottom: 26 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 27, letterSpacing: "-0.02em" }}>
            Registra tu negocio
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-dim)", marginTop: 8, lineHeight: 1.5 }}>
            Avisa a tus vecinos cuando algo esté recién hecho.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <TextField
            label="Correo electrónico" type="email" placeholder="tunegocio@correo.com"
            value={email} onChange={(e) => setEmail(e.target.value)} error={emailError}
          />
          <PinInput label="Crea una contraseña de 4 dígitos" secure value={pin} onChange={setPin} error={pinError} />
        </div>

        <div style={{ marginTop: 24 }}>
          <Button variant="primary" disabled={!canSubmit} onClick={handleSubmit}>
            {pending ? "Creando cuenta…" : "Crear cuenta"}
          </Button>
        </div>

        <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-dim)", marginTop: 18 }}>
          ¿Ya tienes cuenta de negocio? <a onClick={() => nav.go("login")} style={{ color: "var(--accent)", fontWeight: 600 }}>Iniciar sesión</a>
        </p>
      </div>
    </div>
  );
}
