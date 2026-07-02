/*
  Project Sunrise Email Layer
  ---------------------------
  EmailJS is disabled by default for safe local testing.
  To activate:
    1. Create an EmailJS account.
    2. Add Public Key, Service ID, and Template ID in js/config.js.
    3. Set SETTINGS.emailJs.enabled = true.
    4. Keep the EmailJS browser script in index.html.
*/

function divider() {
  return "━━━━━━━━━━━━━━━━━━━━";
}

function testOrderBanner() {
  return SETTINGS.testMode
    ? `${divider()}\nTEST ORDER - DO NOT PREPARE\n${divider()}\n\n`
    : "";
}

function formatOrderForEmail(order) {
  const itemLines = order.items.map(item => {
    const extras = item.extras && item.extras.length
      ? item.extras.map(extra => `   + ${extra.name}`).join("\n")
      : "";
    return `1 x ${item.name}${extras ? "\n" + extras : ""}`;
  }).join("\n\n");

  const notes = order.customer.specialInstructions || "None";
  const taxLine = SETTINGS.taxEnabled ? `Tax\n${formatMoney(order.totals.tax)}\n\n` : "";

  return `${testOrderBanner()}${divider()}
MAMA LU'S
ORDER ${order.orderNumber}
${divider()}

Submitted
${order.date} at ${order.time}

Customer
${order.customer.name}

Phone
${order.customer.phone}

Preferred Contact
${order.customer.contactPreference.toUpperCase()}

${divider()}
BREAKFAST ORDER
${divider()}

${itemLines}

${divider()}
TOTALS
${divider()}

Subtotal
${formatMoney(order.totals.subtotal)}

${taxLine}TOTAL
${formatMoney(order.totals.total)}

${divider()}
SPECIAL INSTRUCTIONS
${divider()}

${notes}`;
}

function formatCateringForEmail(order) {
  const date = order.requestedDate || "Not specified";
  const time = order.requestedTime || "Not specified";
  const notes = order.specialInstructions || "None";
  const taxLine = SETTINGS.taxEnabled ? `Tax\n${formatMoney(order.totals.tax)}\n\n` : "";
  const itemLines = order.items.map(item => {
    const extras = item.extras && item.extras.length
      ? item.extras.map(extra => `   + ${extra.name}`).join("\n")
      : "";
    return `${item.personName}\n1 x ${item.name}${extras ? "\n" + extras : ""}`;
  }).join("\n\n--------------------\n\n");

  return `${testOrderBanner()}${divider()}
MAMA LU'S
OFFICE & GROUP ORDER ${order.orderNumber}
${divider()}

Submitted
${order.date} at ${order.timeSubmitted}

Company / Group
${order.company}

Contact
${order.contactName}

Phone
${order.phone}

Preferred Contact
${order.contactPreference.toUpperCase()}

Requested Date
${date}

Requested Time
${time}

${divider()}
INDIVIDUAL ORDERS
${divider()}

${itemLines}

${divider()}
TOTALS
${divider()}

People / Burritos
${order.estimatedBurritos}

Subtotal
${formatMoney(order.totals.subtotal)}

${taxLine}TOTAL
${formatMoney(order.totals.total)}

${divider()}
SPECIAL INSTRUCTIONS
${divider()}

${notes}`;
}

async function deliverEmail(params, previewLabel) {
  if (!SETTINGS.emailJs || !SETTINGS.emailJs.enabled) {
    console.log(`EmailJS disabled. ${previewLabel}:`, params.order_body);
    return { ok: true, skipped: true };
  }

  if (!window.emailjs) {
    throw new Error("EmailJS library is not loaded.");
  }

  const result = await window.emailjs.send(
    SETTINGS.emailJs.serviceId,
    SETTINGS.emailJs.templateId,
    params,
    { publicKey: SETTINGS.emailJs.publicKey }
  );

  console.log("EmailJS send result:", result);
  return { ok: true, result };
}

async function sendOrderEmail(order) {
  const body = formatOrderForEmail(order);
  const params = {
    to_email: SETTINGS.orderEmail,
    order_number: order.orderNumber,
    order_subject: `Mama Lu's Order - ${order.orderNumber}`,
    order_type: "Regular Order",
    customer_name: order.customer.name,
    customer_phone: order.customer.phone,
    preferred_contact: order.customer.contactPreference,
    order_total: formatMoney(order.totals.total),
    order_body: body,
    order_message: body,
    message: body,
    title: `Mama Lu's Order - ${order.orderNumber}`,
    from_name: order.customer.name,
    reply_to: SETTINGS.orderEmail
  };

  return deliverEmail(params, "Regular order email preview");
}

async function sendCateringEmail(order) {
  const body = formatCateringForEmail(order);
  const params = {
    to_email: SETTINGS.orderEmail,
    order_number: order.orderNumber,
    order_subject: `Mama Lu's Office & Group Order - ${order.orderNumber}`,
    order_type: "Office & Group Order",
    customer_name: order.contactName,
    customer_phone: order.phone,
    preferred_contact: order.contactPreference,
    order_total: formatMoney(order.totals.total),
    order_body: body,
    order_message: body,
    message: body,
    title: `Mama Lu's Office & Group Order - ${order.orderNumber}`,
    from_name: order.contactName,
    reply_to: SETTINGS.orderEmail
  };

  return deliverEmail(params, "Office & Group order email preview");
}
