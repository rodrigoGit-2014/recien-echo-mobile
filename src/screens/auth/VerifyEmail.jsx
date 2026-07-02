import { useEffect, useState } from "react";
import { TopBar } from "../../components/common/TopBar.jsx";
import { Button } from "../../components/common/Button.jsx";
import { PinInput } from "../../components/common/PinInput.jsx";
import { MailIcon } from "../../components/common/icons.jsx";
import { resendVerificationCode, verifyUser } from "../../services/authService.js";

function useCountdown(initial, active) {
  const [t, setT] = useState(initial);
  useEffect(() => {
    if (!active) return;
    setT(initial);
    const id = setInterval(() => setT((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [active]);
  return t;
}

export function VerifyEmailScreen({ nav, email = "tunegocio@correo.com", previewUrl: initialPreviewUrl }) {
  const [previewUrl, setPreviewUrl] = useState(initialPreviewUrl || null);
  const [enteredCode, setEnteredCode] = useState("");
  const [resendActive, setResendActive] = useState(true);
  const [pending, setPending] = useState(false);
  const [verifyError, setVerifyError] = useState(null);
  const [resendMsg, setResendMsg] = useState(null);
  const t = useCountdown(30, resendActive);

  async function handleVerify() {
    if (enteredCode.length !== 4 || pending) return;
    setPending(true);
    setVerifyError(null);
    try {
      await verifyUser(email, enteredCode);
      nav.go("accountVerified");
    } catch (err) {
      setVerifyError(err.message || "No pudimos verificar tu cuenta. Inténtalo de nuevo.");
    } finally {
      setPending(false);
    }
  }

  async function handleResend() {
    try {
      const { previewUrl: url } = await resendVerificationCode(email);
      setPreviewUrl(url || null);
      setEnteredCode("");
      setVerifyError(null);
      setResendMsg("Te enviamos un nuevo código.");
      setResendActive((a) => !a);
    } catch (err) {
      setVerifyError(err.message);
    }
  }

  return (
    <div className="re-screen re-screen-enter">
      <TopBar onBack={() => nav.back()} />
      <div className="re-scroll re-pad" style={{ paddingTop: 20, paddingBottom: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, textAlign: "center", marginBottom: 26 }}>
          <div className="re-permission__icon"><MailIcon size={36} color="var(--accent)" /></div>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, marginBottom: 10 }}>
              Verifica tu correo
            </h1>
            <p style={{ fontSize: 14.5, color: "var(--text-dim)", lineHeight: 1.55, maxWidth: 300 }}>
              Enviamos un código de 4 dígitos a <strong style={{ color: "var(--text)" }}>{email}</strong>.
              Ingrésalo abajo para activar tu cuenta.
            </p>
            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-block", marginTop: 10, fontSize: 13, color: "var(--accent)", fontWeight: 600 }}
              >
                Ver correo de prueba ↗
              </a>
            )}
          </div>
        </div>

        {resendMsg && (
          <p style={{ textAlign: "center", fontSize: 12.5, color: "var(--fresh)", marginBottom: 16 }}>{resendMsg}</p>
        )}

        <PinInput label="Ingresa el código" value={enteredCode} onChange={setEnteredCode} error={verifyError} autoFocus />
      </div>

      <div className="re-pad" style={{ paddingBottom: 40, display: "flex", flexDirection: "column", gap: 14 }}>
        <Button variant="primary" disabled={enteredCode.length !== 4 || pending} onClick={handleVerify}>
          {pending ? "Verificando…" : "Verificar mi correo"}
        </Button>
        {t > 0 ? (
          <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-dim)" }}>Reenviar en 0:{String(t).padStart(2, "0")}</p>
        ) : (
          <button className="re-btn re-btn--link" style={{ alignSelf: "center" }} onClick={handleResend}>Reenviar código</button>
        )}
      </div>
    </div>
  );
}
