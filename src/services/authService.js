// services/authService.js — cliente HTTP del backend de autenticación.
// Toda la lógica (hashing, códigos, envío de correo) vive en server/ ahora;
// este módulo solo llama a /api/auth/* y traduce errores HTTP a AuthError.

import { AuthError } from "./errors.js";

async function request(path, body) {
  let res;
  try {
    res = await fetch(`/api${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new AuthError("NETWORK_ERROR", "No pudimos conectar con el servidor. ¿Está corriendo el backend?");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new AuthError(data.code || "UNKNOWN_ERROR", data.message || "Ocurrió un error inesperado.");
  }
  return data;
}

export async function registerUser({ email, password, role = "vecino" }) {
  return request("/auth/register", { email, password, role });
}

export async function loginUser({ email, password }) {
  const { user } = await request("/auth/login", { email, password });
  return user;
}

export async function verifyUser(email, code) {
  const { user } = await request("/auth/verify", { email, code });
  return user;
}

export async function resendVerificationCode(email) {
  return request("/auth/resend-verification", { email });
}

export async function requestPasswordReset(email) {
  return request("/auth/request-password-reset", { email });
}

export async function resetPassword(email, code, newPassword) {
  const { user } = await request("/auth/reset-password", { email, code, newPassword });
  return user;
}
