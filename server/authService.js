// server/authService.js — lógica de autenticación. Vive en el servidor para
// poder guardar contraseñas hasheadas, generar/validar códigos de un solo
// uso y enviar correos sin exponer nada de eso al cliente.

import { db } from "./db.js";
import { AuthError } from "./errors.js";
import { hashPassword, verifyPassword } from "./password.js";
import { sendEmail, verificationEmailContent, passwordResetEmailContent } from "./email.js";
import { isValidEmail, isValidPin } from "./validators.js";

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function generateCode() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function sanitizeUser(user) {
  return {
    email: user.email,
    role: user.role,
    verified: user.verified,
    createdAt: user.createdAt,
  };
}

export async function registerUser({ email, password, role = "vecino" }) {
  if (!isValidEmail(email)) {
    throw new AuthError("INVALID_EMAIL", "Ingresa un correo válido.");
  }
  if (!isValidPin(password)) {
    throw new AuthError("INVALID_PASSWORD", "La contraseña debe tener 4 dígitos.");
  }

  const normalized = normalizeEmail(email);
  if (db.users.has(normalized)) {
    throw new AuthError("EMAIL_TAKEN", "Este correo ya está registrado.", 409);
  }

  const needsVerification = role === "negocio";
  const verificationCode = needsVerification ? generateCode() : null;

  const user = {
    email: normalized,
    passwordHash: hashPassword(password),
    role,
    verified: !needsVerification,
    verificationCode,
    resetCode: null,
    createdAt: Date.now(),
  };
  db.users.set(normalized, user);

  let previewUrl = null;
  if (needsVerification) {
    const { subject, html } = verificationEmailContent(verificationCode);
    const result = await sendEmail({ to: normalized, subject, html });
    previewUrl = result.previewUrl;
    // eslint-disable-next-line no-console
    console.log(`[auth] código de verificación para ${normalized}: ${verificationCode}`);
  }

  return { user: sanitizeUser(user), previewUrl };
}

export async function loginUser({ email, password }) {
  const normalized = normalizeEmail(email);
  const user = db.users.get(normalized);
  if (!user) {
    throw new AuthError("EMAIL_NOT_FOUND", "No existe una cuenta con este correo.", 404);
  }
  if (!verifyPassword(password, user.passwordHash)) {
    throw new AuthError("INVALID_PASSWORD", "La contraseña es incorrecta.", 401);
  }
  if (!user.verified) {
    throw new AuthError(
      "EMAIL_NOT_VERIFIED",
      "Tu cuenta aún no está verificada. Revisa tu correo para activarla.",
      403
    );
  }
  return { user: sanitizeUser(user) };
}

export async function verifyEmailCode(email, code) {
  const normalized = normalizeEmail(email);
  const user = db.users.get(normalized);
  if (!user) {
    throw new AuthError("EMAIL_NOT_FOUND", "No existe una cuenta con este correo.", 404);
  }
  if (user.verificationCode && user.verificationCode !== code) {
    throw new AuthError("INVALID_CODE", "El código no es correcto. Revísalo e inténtalo de nuevo.");
  }
  user.verified = true;
  user.verificationCode = null;
  db.users.set(normalized, user);
  return { user: sanitizeUser(user) };
}

export async function resendVerificationCode(email) {
  const normalized = normalizeEmail(email);
  const user = db.users.get(normalized);
  if (!user) {
    throw new AuthError("EMAIL_NOT_FOUND", "No existe una cuenta con este correo.", 404);
  }
  user.verificationCode = generateCode();
  db.users.set(normalized, user);

  const { subject, html } = verificationEmailContent(user.verificationCode);
  const { previewUrl } = await sendEmail({ to: normalized, subject, html });
  // eslint-disable-next-line no-console
  console.log(`[auth] código de verificación reenviado para ${normalized}: ${user.verificationCode}`);
  return { previewUrl };
}

export async function requestPasswordReset(email) {
  if (!isValidEmail(email)) {
    throw new AuthError("INVALID_EMAIL", "Ingresa un correo válido.");
  }
  const normalized = normalizeEmail(email);
  const user = db.users.get(normalized);
  if (!user) {
    throw new AuthError("EMAIL_NOT_FOUND", "No existe una cuenta con este correo.", 404);
  }
  user.resetCode = generateCode();
  db.users.set(normalized, user);

  const { subject, html } = passwordResetEmailContent(user.resetCode);
  const { previewUrl } = await sendEmail({ to: normalized, subject, html });
  // eslint-disable-next-line no-console
  console.log(`[auth] código de recuperación para ${normalized}: ${user.resetCode}`);
  return { previewUrl };
}

export async function resetPassword(email, code, newPassword) {
  if (!isValidPin(newPassword)) {
    throw new AuthError("INVALID_PASSWORD", "La contraseña debe tener 4 dígitos.");
  }
  const normalized = normalizeEmail(email);
  const user = db.users.get(normalized);
  if (!user) {
    throw new AuthError("EMAIL_NOT_FOUND", "No existe una cuenta con este correo.", 404);
  }
  if (!user.resetCode || user.resetCode !== code) {
    throw new AuthError("INVALID_CODE", "El código no es correcto. Revísalo e inténtalo de nuevo.");
  }
  user.passwordHash = hashPassword(newPassword);
  user.resetCode = null;
  db.users.set(normalized, user);
  return { user: sanitizeUser(user) };
}
