import { useState } from "react";
import { TopBar } from "../../components/common/TopBar.jsx";
import { TextField } from "../../components/common/TextField.jsx";
import { PinInput } from "../../components/common/PinInput.jsx";
import { Button } from "../../components/common/Button.jsx";
import { AlertIcon } from "../../components/common/icons.jsx";
import { loginUser } from "../../services/authService.js";
import { isValidEmail, isValidPin } from "../../utils/validators.js";

export function LoginScreen({ nav, onLoginSuccess, role = "negocio" }) {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const isVecino = role === "vecino";
  const canSubmit = isValidEmail(email) && isValidPin(pin) && !pending;

  async function handleSubmit() {
    if (!canSubmit) return;
    setPending(true);
    setError(null);
    try {
      const user = await loginUser({ email, password: pin });
      onLoginSuccess(user);
    } catch (err) {
      setError(err);
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
            Hola de nuevo
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-dim)", marginTop: 8 }}>
            {isVecino
              ? "Inicia sesión para ver qué está recién hecho cerca de ti."
              : "Inicia sesión para administrar tu negocio."}
          </p>
        </div>

        {error && (
          <div className="re-banner-error" style={{ marginBottom: 18 }}>
            <AlertIcon size={16} />
            <div>
              {error.message}
              {error.code === "EMAIL_NOT_VERIFIED" && (
                <div><a onClick={() => nav.go("verifyEmail", { email, role })} style={{ color: "var(--error-text)", fontWeight: 700, textDecoration: "underline" }}>Reenviar verificación</a></div>
              )}
              {error.code === "EMAIL_NOT_FOUND" && (
                <div><a onClick={() => nav.go(isVecino ? "vecinoSignup" : "createBusinessAccount")} style={{ color: "var(--error-text)", fontWeight: 700, textDecoration: "underline" }}>Crear una cuenta</a></div>
              )}
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <TextField label="Correo electrónico" type="email" placeholder={isVecino ? "tu@correo.com" : "tunegocio@correo.com"} value={email} onChange={(e) => setEmail(e.target.value)} />
          <div>
            <PinInput label="Contraseña" secure value={pin} onChange={setPin} />
            <a onClick={() => nav.go("forgotPassword", { role })} style={{ display: "block", textAlign: "right", fontSize: 12.5, color: "var(--accent)", fontWeight: 600, marginTop: 10 }}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <Button variant="primary" disabled={!canSubmit} onClick={handleSubmit}>
            {pending ? "Iniciando sesión…" : "Iniciar sesión"}
          </Button>
        </div>

        {!isVecino && (
          <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-dim)", marginTop: 16 }}>
            Demo: demo@negocio.cl · 1234
          </p>
        )}

        <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-dim)", marginTop: 10 }}>
          ¿No tienes cuenta? <a onClick={() => nav.go(isVecino ? "vecinoSignup" : "createBusinessAccount")} style={{ color: "var(--accent)", fontWeight: 600 }}>Regístrate</a>
        </p>
      </div>
    </div>
  );
}
