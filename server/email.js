// server/email.js — abstracción de envío de correo, con cadena de respaldo:
//
//   1. SMTP directo (MAIL_HOST/PORT/USERNAME/PASSWORD) — el buzón de correo
//      que ya tienes contratado, sin depender de un tercero ni de verificar
//      un dominio en otro servicio.
//   2. Resend (EMAIL_API_KEY) — si algún día quieres volver a usarlo.
//   3. Ethereal — buzón de pruebas sin configuración, con un link para "ver"
//      el correo como si hubiera llegado (nodemailer.getTestMessageUrl()).
//
// Si un método falla, se cae automáticamente al siguiente y se deja un log
// claro del motivo. authService.js siempre llama a sendEmail() sin saber
// cuál de los tres terminó enviando.

import nodemailer from "nodemailer";

let etherealTransportPromise = null;

function getEtherealTransport() {
  if (!etherealTransportPromise) {
    etherealTransportPromise = nodemailer.createTestAccount().then((account) =>
      nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: { user: account.user, pass: account.pass },
      })
    );
  }
  return etherealTransportPromise;
}

let smtpTransport = null;

function hasSmtpConfig() {
  return Boolean(process.env.MAIL_HOST && process.env.MAIL_USERNAME && process.env.MAIL_PASSWORD);
}

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

async function sendViaSmtp({ to, subject, html }) {
  const transport = getSmtpTransport();
  await transport.sendMail({ from: smtpFromHeader(), to, subject, html });
  return { previewUrl: null, provider: "smtp" };
}

function resendFromHeader() {
  const from = process.env.APP_EMAIL_FROM;
  if (!from) return "ReciénEcho <onboarding@resend.dev>";
  return from.includes("<") ? from : `ReciénEcho <${from}>`;
}

async function sendViaResend({ to, subject, html }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.EMAIL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFromHeader(),
      to: [to],
      subject,
      html,
    }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend respondió ${response.status}: ${body}`);
  }
  return { previewUrl: null, provider: "resend" };
}

async function sendViaEthereal({ to, subject, html }) {
  const transport = await getEtherealTransport();
  const info = await transport.sendMail({
    from: '"ReciénEcho (modo prueba)" <no-reply@recienecho.test>',
    to,
    subject,
    html,
  });
  const previewUrl = nodemailer.getTestMessageUrl(info) || null;
  // eslint-disable-next-line no-console
  console.log(`[email:ethereal] "${subject}" → ${to} — ${previewUrl}`);
  return { previewUrl, provider: "ethereal" };
}

export async function sendEmail({ to, subject, html }) {
  if (hasSmtpConfig()) {
    try {
      return await sendViaSmtp({ to, subject, html });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`[email:smtp] Falló el envío: ${err.message}`);
    }
  }
  if (process.env.EMAIL_API_KEY) {
    try {
      return await sendViaResend({ to, subject, html });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`[email:resend] Falló el envío: ${err.message}`);
    }
  }
  // eslint-disable-next-line no-console
  console.warn("[email] Sin SMTP ni Resend disponibles, uso Ethereal (buzón de prueba) como último respaldo.");
  return sendViaEthereal({ to, subject, html });
}

export function describeEmailMode() {
  if (hasSmtpConfig()) return `SMTP directo (${process.env.MAIL_HOST}, remitente ${process.env.APP_EMAIL_FROM || process.env.MAIL_USERNAME})`;
  if (process.env.EMAIL_API_KEY) return `Resend (remitente ${process.env.APP_EMAIL_FROM || "onboarding@resend.dev"})`;
  return "Ethereal (buzón de prueba)";
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
