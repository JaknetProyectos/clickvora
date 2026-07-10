import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

const SUPPORT_EMAIL = "cotizacion@clickvora.com.mx";
const BRAND_NAME = "Clickvora";
const BRAND_URL = "clickvora.com.mx";
const BRAND_LOGO = "https://clickvora.com.mx/title.png";

// Campos estándar para filtrarlos en la sección de "Campos adicionales"
const STANDARD_FIELDS = ["nombre", "email", "mensaje", "asunto"];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, email, mensaje, asunto = "Nuevo mensaje de contacto" } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Faltan campos requeridos (nombre, email, mensaje)" },
        { status: 400 }
      );
    }

    // Extraer de forma dinámica cualquier propiedad extra enviada en el lead
    const extraFields = Object.entries(body).filter(
      ([key, val]) => !STANDARD_FIELDS.includes(key) && val !== undefined && val !== null && val !== ""
    );

    // 1. EMAIL PARA EL NEGOCIO (LEAD DE CONTACTO)
    const businessEmailHtml = renderEmailTemplate({
      title: "🎮 Nuevo Lead de Desarrollo",
      subtitle: "Se ha recibido una nueva solicitud de proyecto desde el sitio web.",
      nombre,
      email,
      mensaje,
      extraFields,
      isBusiness: true,
    });

    await resend.emails.send({
      from: `${BRAND_NAME} Leads <${SUPPORT_EMAIL}>`,
      to: SUPPORT_EMAIL,
      subject: `🚀 [Lead] ${asunto} - ${nombre}`,
      html: businessEmailHtml,
    });

    // 2. EMAIL PARA EL CLIENTE (CONFIRMACIÓN DE RECEPCIÓN)
    const clientEmailHtml = renderEmailTemplate({
      title: "✅ Hemos recibido tu mensaje",
      subtitle: "Gracias por confiar en nosotros para tu proyecto de videojuegos o app móvil.",
      nombre,
      email,
      mensaje,
      extraFields,
      isBusiness: false,
    });

    await resend.emails.send({
      from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
      to: email,
      subject: `✓ Recibimos tu solicitud - ${BRAND_NAME}`,
      html: clientEmailHtml,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Función helper para generar el HTML con estética gaming / apps móviles
function renderEmailTemplate({
  title,
  subtitle,
  nombre,
  email,
  mensaje,
  extraFields,
  isBusiness,
}: {
  title: string;
  subtitle: string;
  nombre: string;
  email: string;
  mensaje: string;
  extraFields: [string, any][];
  isBusiness: boolean;
}) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #0F151C;
          color: #e5e7eb;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
        }
        .wrapper {
          max-width: 600px;
          margin: 40px auto;
          padding: 20px;
        }
        .container {
          background-color: #1A232E;
          border: 1px solid #2A3A4A;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.7);
        }
        /* Borde decorativo superior */
        .accent-bar {
          height: 6px;
          background: linear-gradient(90deg, #E8827A, #C5A4D9, #A8D5E2);
        }
        .header {
          padding: 32px 28px 20px 28px;
          text-align: center;
          border-bottom: 1px solid #2A3A4A;
          background-color: #0F151C;
        }
        .logo {
          height: 34px;
          width: auto;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }
        .header-sub {
          font-size: 11px;
          color: #6B7A8A;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-top: 8px;
        }
        .content {
          padding: 32px 32px 24px 32px;
        }
        .title {
          font-size: 26px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 8px 0;
          letter-spacing: -0.02em;
        }
        .subtitle {
          font-size: 14px;
          color: #9AA5B5;
          margin: 0 0 28px 0;
          line-height: 1.6;
        }
        .section-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #E8827A;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #2A3A4A;
        }
        .card {
          background-color: #0F151C;
          border-radius: 18px;
          border: 1px solid #2A3A4A;
          padding: 20px 22px;
          margin-bottom: 28px;
        }
        .field {
          margin-bottom: 14px;
          padding-bottom: 12px;
          border-bottom: 1px solid #2A3A4A;
        }
        .field:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        .label {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          color: #6B7A8A;
          letter-spacing: 0.08em;
          margin-bottom: 4px;
        }
        .value {
          font-size: 15px;
          color: #e5e7eb;
          font-weight: 500;
        }
        .value-email {
          color: #E8827A;
          font-weight: 600;
        }
        .msg-box {
          font-size: 14px;
          color: #e5e7eb;
          line-height: 1.7;
          white-space: pre-wrap;
          background-color: #0F151C;
          padding: 18px 20px;
          border-radius: 14px;
          border: 1px solid #2A3A4A;
        }
        .badge {
          display: inline-block;
          background: #E8827A;
          color: #0F151C;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 12px;
          border-radius: 20px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .footer {
          text-align: center;
          padding: 24px 28px;
          font-size: 12px;
          color: #4A5A6A;
          border-top: 1px solid #2A3A4A;
          background-color: #0F151C;
        }
        .footer a {
          color: #E8827A;
          text-decoration: none;
          font-weight: 500;
        }
        .footer .tagline {
          margin-top: 6px;
          color: #6B7A8A;
          font-size: 11px;
          letter-spacing: 0.05em;
        }
        .emoji-big {
          font-size: 28px;
          margin-right: 6px;
        }
        .divider {
          height: 1px;
          background: #2A3A4A;
          margin: 24px 0;
        }
        @media only screen and (max-width: 480px) {
          .wrapper { padding: 10px; }
          .content { padding: 24px 20px; }
          .header { padding: 24px 20px; }
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <!-- Barra decorativa -->
          <div class="accent-bar"></div>

          <!-- Header Logo -->
          <div class="header">
            <img src="${BRAND_LOGO}" alt="${BRAND_NAME}" class="logo" />
            <div class="header-sub">🎮 • Desarrollo de Videojuegos & Apps Móviles</div>
          </div>

          <!-- Body Content -->
          <div class="content">
            <h1 class="title">${title}</h1>
            <p class="subtitle">${subtitle}</p>

            <div class="section-label">
              <span class="badge">${isBusiness ? 'Datos del Lead' : 'Resumen'}</span>
            </div>

            <div class="card">
              <div class="field">
                <div class="label">👤 Nombre</div>
                <div class="value">${nombre}</div>
              </div>
              <div class="field">
                <div class="label">📧 Correo Electrónico</div>
                <div class="value value-email">${email}</div>
              </div>

              <!-- Render Dinámico de Campos Adicionales -->
              ${extraFields.map(([key, value]) => `
                <div class="field">
                  <div class="label">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                  <div class="value">${value}</div>
                </div>
              `).join('')}
            </div>

            <div class="section-label">💬 Mensaje</div>
            <div class="msg-box">${mensaje}</div>

            ${!isBusiness ? `
              <div class="divider"></div>
              <p style="font-size: 13px; color: #6B7A8A; line-height: 1.6; font-style: italic;">
                ✦ Este es un correo automático de confirmación. Nuestro equipo de desarrollo revisará tu solicitud y te contactará a la brevedad.
              </p>
              <p style="font-size: 13px; color: #6B7A8A; line-height: 1.6;">
                🚀 <strong style="color: #E8827A;">Próximos pasos:</strong> Analizaremos tu idea y te presentaremos una propuesta inicial en menos de 48 horas.
              </p>
            ` : `
              <div class="divider"></div>
              <p style="font-size: 13px; color: #6B7A8A; line-height: 1.6;">
                📌 <strong style="color: #E8827A;">Acción recomendada:</strong> Revisa los detalles y asigna el lead al equipo de desarrollo para dar seguimiento.
              </p>
            `}
          </div>

          <!-- Footer -->
          <div class="footer">
            © ${new Date().getFullYear()} <a href="${BRAND_URL}">${BRAND_NAME}</a> — Todos los derechos reservados.<br/>
            <span class="tagline">🎮 Desarrollo de Videojuegos & Apps Móviles · Experiencias interactivas que conectan</span>
          </div>

        </div>
      </div>
    </body>
    </html>
  `;
}