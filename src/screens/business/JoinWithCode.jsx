import { useState } from "react";
import { MOCK_BUSINESSES } from "../../data/mockData.js";
import { TopBar } from "../../components/common/TopBar.jsx";
import { TextField } from "../../components/common/TextField.jsx";
import { Button } from "../../components/common/Button.jsx";
import { CardIcon } from "../../components/common/icons.jsx";

export function JoinWithCodeScreen({ nav, onFound }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  function formatCode(v) {
    const clean = v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
    if (clean.length <= 3) return clean;
    return `${clean.slice(0, 3)}-${clean.slice(3, 7)}`;
  }

  function handleSearch() {
    const found = MOCK_BUSINESSES.find((b) => b.code === code) ||
      (code === "PAN-4821" ? MOCK_BUSINESSES[0] : null);
    if (!found) {
      setError("No encontramos un negocio con ese código. Verifica e inténtalo de nuevo.");
      return;
    }
    setError(null);
    onFound(found);
  }

  return (
    <div className="re-screen re-screen-enter">
      <TopBar onBack={() => nav.back()} />
      <div className="re-pad" style={{ marginTop: 16, marginBottom: 8, display: "flex", justifyContent: "center" }}>
        <div className="re-permission__icon"><CardIcon size={36} color="var(--accent)" /></div>
      </div>
      <div className="re-pad" style={{ textAlign: "center", marginBottom: 26 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, marginBottom: 10 }}>Soy colaborador</h1>
        <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.5 }}>
          Ingresa el código que te compartió tu negocio para empezar a publicar.
        </p>
      </div>
      <div className="re-pad">
        <TextField
          label="Código de negocio" placeholder="ABC-1234" value={code}
          onChange={(e) => setCode(formatCode(e.target.value))}
          error={error} hint={!error ? "Código de demo: PAN-4821" : undefined}
        />
        <div style={{ marginTop: 22 }}>
          <Button variant="primary" disabled={code.length < 7} onClick={handleSearch}>Buscar negocio</Button>
        </div>
      </div>
    </div>
  );
}
