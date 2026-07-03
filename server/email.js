// server/email.js — envío de correo por SMTP directo

import nodemailer from "nodemailer";

const REQUIRED_VARS = ["MAIL_HOST", "MAIL_USERNAME", "MAIL_PASSWORD"];

export function validateSmtpConfig() {
  const missing = REQUIRED_VARS.filter((v) => !process.env[v]);
  if (missing.length > 0) {
    throw new Error(`Faltan variables de entorno SMTP: ${missing.join(", ")}`);
  }
}

let smtpTransport = null;

function getSmtpTransport() {
  if (!smtpTransport) {
    const port = Number(process.env.MAIL_PORT) || 587;
    smtpTransport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port,
      secure: port === 465, // 465 = TLS implícito; 587/25 = STARTTLS
      auth: { user: process.env.MAIL_USERNAME, pass: process.env.MAIL_PASSWORD },
    });
  }
  return smtpTransport;
}

function smtpFromHeader() {
  const from = process.env.APP_EMAIL_FROM || process.env.MAIL_USERNAME;
  return from.includes("<") ? from : `ReciénEcho <${from}>`;
}

export async function sendEmail({ to, subject, html }) {
  const transport = getSmtpTransport();
  await transport.sendMail({ from: smtpFromHeader(), to, subject, html });
  return { provider: "smtp" };
}

export function describeEmailMode() {
  return `SMTP directo (${process.env.MAIL_HOST}, remitente ${process.env.APP_EMAIL_FROM || process.env.MAIL_USERNAME})`;
}

function codeEmailHtml({ heading, body, code }) {
  return `
    <div style="font-family: Arial, sans-serif; background: #14140F; padding: 32px; color: #F7F6F1;">
      <div style="max-width: 420px; margin: 0 auto; background: #1F1F1A; border-radius: 20px; padding: 32px; text-align: center;">
        <div style="font-weight: 800; font-size: 20px; margin-bottom: 24px;">
          Recién<span style="color: #FFE03D;">Echo</span>
        </div>
        <h1 style="font-size: 20px; margin: 0 0 12px;">${heading}</h1>
        <p style="color: #93928A; font-size: 14px; line-height: 1.5; margin: 0 0 24px;">${body}</p>
        <div style="font-family: 'Courier New', monospace; font-weight: 700; font-size: 32px; letter-spacing: 4px; color: #FFE03D; background: rgba(255,224,61,0.08); border-radius: 14px; padding: 16px;">
          ${code}
        </div>
      </div>
    </div>
  `;
}

export function verificationEmailContent(code) {
  return {
    subject: "Tu código para verificar tu negocio en ReciénEcho",
    html: codeEmailHtml({
      heading: "Verifica tu correo",
      body: "Usa este código en la app para activar tu cuenta de negocio.",
      code,
    }),
  };
}

export function passwordResetEmailContent(code) {
  return {
    subject: "Código para recuperar tu contraseña — ReciénEcho",
    html: codeEmailHtml({
      heading: "Recupera tu contraseña",
      body: "Usa este código en la app para elegir una contraseña nueva.",
      code,
    }),
  };
}
