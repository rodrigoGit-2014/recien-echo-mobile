import { useState } from "react";
import { TopBar } from "../../components/common/TopBar.jsx";
import { PinInput } from "../../components/common/PinInput.jsx";
import { Button } from "../../components/common/Button.jsx";
import { AlertIcon } from "../../components/common/icons.jsx";
import { resetPassword } from "../../services/authService.js";
import { isValidPin } from "../../utils/validators.js";

export function ResetPasswordScreen({ nav, email = "tunegocio@correo.com" }) {
  const [resetCode, setResetCode] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const codeComplete = resetCode.length === 4;
  const confirmError = confirmPin.length === 4 && confirmPin !== newPin ? "Las contraseñas no coinciden" : null;
  const canSubmit = codeComplete && isValidPin(newPin) && newPin === confirmPin && !pending;

  async function handleSubmit() {
    if (!canSubmit) return;
    setPending(true);
    setError(null);
    try {
      await resetPassword(email, resetCode, newPin);
      nav.go("passwordUpdated");
    } catch (err) {
      setError(err.message || "No pudimos actualizar tu contraseña. Inténtalo de nuevo.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="re-screen re-screen-enter">
      <TopBar onBack={() => nav.back()} />
      <div className="re-scroll re-pad" style={{ paddingBottom: 32 }}>
        <div style={{ marginTop: 4, marginBottom: 24 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.02em" }}>
            Ingresa el código
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-dim)", marginTop: 8 }}>
            Enviado a <strong style={{ color: "var(--text)" }}>{email}</strong>
          </p>
        </div>

        {error && (
          <div className="re-banner-error" style={{ marginBottom: 20 }}><AlertIcon size={16} /><div>{error}</div></div>
        )}

        <PinInput value={resetCode} onChange={setResetCode} autoFocus />

        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 26 }}>
          <PinInput label="Nueva contraseña" secure value={newPin} onChange={setNewPin} />
          <PinInput label="Confirmar contraseña" secure value={confirmPin} onChange={setConfirmPin} error={confirmError} />
        </div>

        <div style={{ marginTop: 24 }}>
          <Button variant="primary" disabled={!canSubmit} onClick={handleSubmit}>
            {pending ? "Actualizando…" : "Actualizar contraseña"}
          </Button>
        </div>
      </div>
    </div>
  );
}
