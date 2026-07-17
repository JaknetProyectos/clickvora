// app/api/checkout-clickvora/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getTranslations } from "next-intl/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const SUPPORT_EMAIL = "cotizacion@clickvora.com.mx";
const BRAND_NAME = "Clickvora";
const BRAND_URL = "clickvora.com.mx";
const BRAND_LOGO = "https://clickvora.com.mx/title.png";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { locale, orderId, amount, customer, items, metadata } = body;

    if (!orderId || !amount || !customer || !items) {
      return NextResponse.json(
        { error: "Faltan campos requeridos para procesar la orden" },
        { status: 400 }
      );
    }

    // Cargar traducciones con el locale recibido
    const t = await getTranslations({ locale, namespace: 'Emails' });

    // 1. EMAIL PARA EL CLIENTE (TICKET / RECIBO DE COMPRA)
    const clientReceiptHtml = renderReceiptTemplate({
      title: t('checkout.clientTitle'),
      subtitle: t('checkout.clientSubtitle', { orderId }),
      orderId,
      amount,
      customer,
      items,
      metadata,
      isBusiness: false,
      t,
    });

    await resend.emails.send({
      from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
      to: customer.email,
      subject: t('checkout.clientSubject', { orderId }),
      html: clientReceiptHtml,
    });

    // 2. EMAIL PARA EL NEGOCIO (NOTIFICACIÓN DE VENTA)
    const businessNotificationHtml = renderReceiptTemplate({
      title: t('checkout.businessTitle'),
      subtitle: t('checkout.businessSubtitle', { amount: amount.toFixed(2) }),
      orderId,
      amount,
      customer,
      items,
      metadata,
      isBusiness: true,
      t,
    });

    await resend.emails.send({
      from: `${BRAND_NAME} Sales <${SUPPORT_EMAIL}>`,
      to: SUPPORT_EMAIL,
      subject: t('checkout.businessSubject', { orderId, amount: amount.toFixed(2) }),
      html: businessNotificationHtml,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Función helper para generar el HTML del ticket con la estética gaming / apps móviles
function renderReceiptTemplate({
  title,
  subtitle,
  orderId,
  amount,
  customer,
  items,
  metadata,
  isBusiness,
  t,
}: {
  title: string;
  subtitle: string;
  orderId: string;
  amount: number;
  customer: any;
  items: any[];
  metadata: any;
  isBusiness: boolean;
  t: any;
}) {
  const year = new Date().getFullYear();
  
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
        .grid {
          display: table;
          width: 100%;
          table-layout: fixed;
          margin-bottom: 24px;
        }
        .col {
          display: table-cell;
          width: 50%;
          vertical-align: top;
        }
        .info-label {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          color: #6B7A8A;
          letter-spacing: 0.08em;
          margin-bottom: 4px;
        }
        .info-value {
          font-size: 13px;
          color: #e5e7eb;
          line-height: 1.5;
          padding-right: 10px;
        }
        .info-value strong {
          color: #ffffff;
        }
        .ticket-box {
          background-color: #0F151C;
          border-radius: 18px;
          border: 1px solid #2A3A4A;
          padding: 18px 20px;
          margin-bottom: 28px;
        }
        .ticket-row {
          display: table;
          width: 100%;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px dashed #2A3A4A;
        }
        .ticket-row:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        .item-name {
          display: table-cell;
          font-size: 14px;
          color: #e5e7eb;
          font-weight: 500;
        }
        .item-qty {
          font-size: 12px;
          color: #6B7A8A;
          margin-left: 6px;
        }
        .item-price {
          display: table-cell;
          text-align: right;
          font-size: 14px;
          color: #f3f4f6;
          font-weight: 600;
        }
        .total-box {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 2px solid rgba(232, 130, 122, 0.3);
        }
        .total-label {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
        }
        .total-amount {
          font-size: 20px;
          font-weight: 700;
          color: #E8827A;
          text-align: right;
        }
        .meta-box {
          font-size: 13px;
          color: #9AA5B5;
          background-color: #0F151C;
          padding: 14px 18px;
          border-radius: 14px;
          border-left: 3px solid #E8827A;
          margin-bottom: 28px;
        }
        .divider {
          height: 1px;
          background: #2A3A4A;
          margin: 24px 0;
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
        @media only screen and (max-width: 480px) {
          .wrapper { padding: 10px; }
          .content { padding: 24px 20px; }
          .header { padding: 24px 20px; }
          .col { display: block; width: 100%; margin-bottom: 12px; }
          .grid { display: block; }
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <!-- Barra decorativa -->
          <div class="accent-bar"></div>

          <!-- Header -->
          <div class="header">
            <img src="${BRAND_LOGO}" alt="${BRAND_NAME}" class="logo" />
            <div class="header-sub">${t('checkout.headerSub')}</div>
          </div>

          <!-- Body -->
          <div class="content">
            <h1 class="title">${title}</h1>
            <p class="subtitle">${subtitle}</p>

            <!-- Datos Generales -->
            <div class="grid">
              <div class="col">
                <div class="info-label">${t('checkout.orderIdLabel')}</div>
                <div class="info-value" style="font-family: monospace; font-size: 14px; color: #ffffff;">${orderId}</div>
              </div>
              <div class="col">
                <div class="info-label">${t('checkout.paymentDateLabel')}</div>
                <div class="info-value">${new Date().toLocaleDateString('es-MX', { timeZone: 'America/Mexico_City' })}</div>
              </div>
            </div>

            <!-- Cliente -->
            <div class="section-label">${isBusiness ? t('checkout.customerSectionBusiness') : t('checkout.customerSectionClient')}</div>
            <div class="grid">
              <div class="col">
                <div class="info-label">${t('checkout.customerNameLabel')}</div>
                <div class="info-value">
                  <strong>${customer.nombre} ${customer.apellido}</strong><br/>
                  ${customer.email}<br/>
                  ${customer.telefono}
                </div>
              </div>
              <div class="col">
                <div class="info-label">${t('checkout.customerAddressLabel')}</div>
                <div class="info-value">
                  ${customer.direccion}<br/>
                  ${customer.direccion2 ? customer.direccion2 + '<br/>' : ''}
                  ${customer.ciudad}, ${customer.estado}<br/>
                  CP: ${customer.cp}, ${customer.pais}
                  ${customer.empresa ? '<br/><strong>' + t('checkout.customerCompanyLabel') + ':</strong> ' + customer.empresa : ''}
                </div>
              </div>
            </div>

            <!-- Metadata / Notas -->
            ${metadata && (metadata.notes || Object.keys(metadata).length > 0) ? `
              <div class="section-label">${t('checkout.operationDetailsLabel')}</div>
              <div class="meta-box">
                ${metadata.notes || JSON.stringify(metadata)}
              </div>
            ` : ''}

            <!-- Productos -->
            <div class="section-label">${t('checkout.productSummaryLabel')}</div>
            <div class="ticket-box">
              ${items.map((item: any) => `
                <div class="ticket-row">
                  <div class="item-name">
                    ${item.product.name}
                    <span class="item-qty">x${item.quantity || 1}</span>
                  </div>
                  <div class="item-price">
                    $${(Number(item.product.price) * (item.quantity || 1)).toFixed(2)} MXN
                  </div>
                </div>
              `).join('')}
              
              <div class="ticket-row total-box">
                <div class="item-name total-label">${t('checkout.totalPaidLabel')}</div>
                <div class="item-price total-amount">$${amount.toFixed(2)} MXN</div>
              </div>
            </div>

            ${!isBusiness ? `
              <div class="divider"></div>
              <p style="font-size: 13px; color: #6B7A8A; line-height: 1.6; font-style: italic;">
                ${t('checkout.clientFooterNote')}
              </p>
            ` : `
              <div class="divider"></div>
              <p style="font-size: 13px; color: #6B7A8A; line-height: 1.6;">
                ${t('checkout.businessFooterNote')}
              </p>
            `}
          </div>

          <!-- Footer -->
          <div class="footer">
            ${t('checkout.footerCopyright', { year, url: BRAND_URL, brand: BRAND_NAME })}<br/>
            <span class="tagline">${t('checkout.footerTagline')}</span>
          </div>

        </div>
      </div>
    </body>
    </html>
  `;
}