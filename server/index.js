import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { router } from "./routes.js";
import { describeEmailMode, validateSmtpConfig } from "./email.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, "..", "dist");

// Validar configuración SMTP antes de iniciar
validateSmtpConfig();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/api", router);

// En producción (Railway) este mismo proceso sirve el frontend ya compilado
// por `npm run build`, así que no hace falta CORS ni un proxy aparte: todo
// vive en el mismo origen. En desarrollo local `dist/` no existe (el
// frontend lo sirve Vite en otro puerto), así que esto se omite sin error.
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] ReciénEcho API escuchando en http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`[server] Envío de correo: ${describeEmailMode()}`);
});
