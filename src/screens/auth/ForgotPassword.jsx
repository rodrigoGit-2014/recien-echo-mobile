import { useState } from "react";
import { TopBar } from "../../components/common/TopBar.jsx";
import { TextField } from "../../components/common/TextField.jsx";
import { Button } from "../../components/common/Button.jsx";
import { AlertIcon } from "../../components/common/icons.jsx";
import { requestPasswordReset } from "../../services/authService.js";
import { isValidEmail } from "../../utils/validators.js";

export function ForgotPasswordScreen({ nav }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit() {
    if (!isValidEmail(email) || pending) return;
    setPending(true);
    setError(null);
    try {
      await requestPasswordReset(email);
      nav.go("resetPassword", { email });
    } catch (err) {
      setError(err.message || "No pudimos procesar tu solicitud. Inténtalo de nuevo.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="re-screen re-screen-enter">
      <TopBar onBack={() => nav.back()} />
      <div className="re-scroll re-pad" style={{ paddingBottom: 32 }}>
        <div style={{ marginTop: 4, marginBottom: 26 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.02em" }}>
            Recupera tu contraseña
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-dim)", marginTop: 8, lineHeight: 1.5 }}>
            Te enviaremos un código de 4 dígitos a tu correo para que puedas crear una nueva contraseña.
          </p>
        </div>
        {error && (
          <div className="re-banner-error" style={{ marginBottom: 18 }}><AlertIcon size={16} /><div>{error}</div></div>
        )}
        <TextField label="Correo electrónico" type="email" placeholder="tunegocio@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div style={{ marginTop: 24 }}>
          <Button variant="primary" disabled={!isValidEmail(email) || pending} onClick={handleSubmit}>
            {pending ? "Enviando…" : "Enviar código"}
          </Button>
        </div>
      </div>
    </div>
  );
}
