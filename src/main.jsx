import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./styles/tokens.css";
import "./styles/device.css";
import "./styles/forms.css";
import "./styles/layout.css";
import "./styles/radar.css";

// Atajo para pruebas: visitar la app con ?resetDb limpia la base de datos en
// memoria del servidor (usuarios, códigos, etc.) antes de montar React.
async function bootstrap() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("resetDb")) {
    try {
      await fetch("/api/dev/reset", { method: "POST" });
    } catch {
      // Si el backend no está corriendo, seguimos igual: la app lo avisará
      // en el primer intento de login/registro.
    }
    params.delete("resetDb");
    const cleanUrl = window.location.pathname + (params.toString() ? `?${params}` : "");
    window.history.replaceState({}, "", cleanUrl);
  }

  createRoot(document.getElementById("root")).render(<App />);
}

bootstrap();
