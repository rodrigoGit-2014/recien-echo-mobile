// server/email.js — envío de correo por Resend

export function validateEmailConfig() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Falta variable de entorno: RESEND_API_KEY");
  }
}

function getFromHeader() {
  const from = process.env.APP_EMAIL_FROM;
  if (!from) return "ReciénEcho <no-reply@recienecho.com>";
  return from.includes("<") ? from : `ReciénEcho <${from}>`;
}

export async function sendEmail({ to, subject, html }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: getFromHeader(),
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`[email:resend] Error ${response.status}: ${body}`);
    throw new Error(`Resend respondió ${response.status}: ${body}`);
  }

  const data = await response.json();
  console.log(`[email:resend] Enviado a ${to} — id: ${data.id}`);
  return { provider: "resend", id: data.id };
}

export function describeEmailMode() {
  return `Resend (remitente ${process.env.APP_EMAIL_FROM || "no-reply@recienecho.com"})`;
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
