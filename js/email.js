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

function describeEmailError(error) {
  if (!error) return "Unknown EmailJS error.";
  const parts = [];
  if (error.status) parts.push(`status ${error.status}`);
  if (error.text) parts.push(error.text);
  if (error.message && !parts.includes(error.message)) parts.push(error.message);
  try {
    const raw = JSON.stringify(error);
    if (raw && raw !== "{}") parts.push(raw);
  } catch (_) {}
  return parts.join(" | ") || String(error);
}

function createEmailSendError(label, templateId, error) {
  const detail = describeEmailError(error);
  const wrapped = new Error(`${label} failed using ${templateId}: ${detail}`);
  wrapped.emailLabel = label;
  wrapped.templateId = templateId;
  wrapped.originalError = error;
  return wrapped;
}

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
${order.customer.email ? `
Email
${order.customer.email}
` : ""}
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
${order.email ? `
Email
${order.email}
` : ""}
Preferred Contact
${order.contactPreference.toUpperCase()}

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


function formatCustomerReceipt(order, orderType) {
  const title = orderType === "catering" ? "OFFICE & GROUP ORDER RECEIPT" : "ORDER RECEIPT";
  const body = orderType === "catering" ? formatCateringForEmail(order) : formatOrderForEmail(order);
  return `${divider()}
MAMA LU'S
${title}
${divider()}

This is a copy of your order for your records.

${body.replace(testOrderBanner(), "")}

${divider()}
Thank you for choosing Mama Lu's.
${divider()}`;
}

async function sendCustomerReceiptEmail(order, orderType) {
  const recipient = orderType === "catering" ? order.email : order.customer.email;
  if (!recipient) return { ok: true, skipped: true };

  const body = formatCustomerReceipt(order, orderType);
  const name = orderType === "catering" ? order.contactName : order.customer.name;
  const phone = orderType === "catering" ? order.phone : order.customer.phone;
  const contact = orderType === "catering" ? order.contactPreference : order.customer.contactPreference;

  const params = {
    // EmailJS template must use {{to_email}} in the To Email field.
    // Extra aliases are included for compatibility while testing templates.
    to_email: recipient,
    email: recipient,
    user_email: recipient,
    customer_email: recipient,
    recipient_email: recipient,
    order_number: order.orderNumber,
    order_subject: `Mama Lu's Receipt - ${order.orderNumber}`,
    order_type: orderType === "catering" ? "Office & Group Order Receipt" : "Order Receipt",
    customer_name: name,
    name: name,
    customer_phone: phone,
    phone: phone,
    preferred_contact: contact,
    contact_method: contact,
    order_total: formatMoney(order.totals.total),
    order_body: body,
    order_message: body,
    message: body,
    title: `Mama Lu's Receipt - ${order.orderNumber}`,
    from_name: "Mama Lu's",
    reply_to: SETTINGS.orderEmail
  };

  return deliverEmail(params, "Customer receipt email", SETTINGS.emailJs.receiptTemplateId);
}

async function deliverEmail(params, previewLabel, templateId) {
  if (!SETTINGS.emailJs || !SETTINGS.emailJs.enabled) {
    console.log(`EmailJS disabled. ${previewLabel}:`, params.order_body);
    return { ok: true, skipped: true };
  }

  if (!window.emailjs) {
    throw new Error("EmailJS library is not loaded.");
  }

  const selectedTemplateId = templateId || SETTINGS.emailJs.kitchenTemplateId || SETTINGS.emailJs.templateId;
  if (!selectedTemplateId) {
    throw new Error("EmailJS template ID is missing.");
  }

  try {
    const result = await window.emailjs.send(
      SETTINGS.emailJs.serviceId,
      selectedTemplateId,
      params,
      { publicKey: SETTINGS.emailJs.publicKey }
    );

    console.log(`${previewLabel} send result:`, result);
    return { ok: true, result, label: previewLabel, templateId: selectedTemplateId };
  } catch (error) {
    console.error(`${previewLabel} failed:`, error);
    throw createEmailSendError(previewLabel, selectedTemplateId, error);
  }
}

async function sendOrderEmail(order) {
  const body = formatOrderForEmail(order);
  const params = {
    to_email: SETTINGS.orderEmail,
    order_number: order.orderNumber,
    order_subject: `Mama Lu's Order - ${order.orderNumber}`,
    order_type: "Regular Order",
    customer_name: order.customer.name,
    name: order.customer.name,
    customer_email: order.customer.email,
    email: order.customer.email,
    customer_phone: order.customer.phone,
    phone: order.customer.phone,
    preferred_contact: order.customer.contactPreference,
    contact_method: order.customer.contactPreference,
    order_total: formatMoney(order.totals.total),
    order_body: body,
    order_message: body,
    message: body,
    title: `Mama Lu's Order - ${order.orderNumber}`,
    from_name: order.customer.name,
    reply_to: order.customer.email || SETTINGS.orderEmail
  };

  const kitchenResult = await deliverEmail(params, "Kitchen regular order email", SETTINGS.emailJs.kitchenTemplateId);
  const receiptResult = await sendCustomerReceiptEmail(order, "regular");
  return { ok: true, kitchenResult, receiptResult };
}

async function sendCateringEmail(order) {
  const body = formatCateringForEmail(order);
  const params = {
    to_email: SETTINGS.orderEmail,
    order_number: order.orderNumber,
    order_subject: `Mama Lu's Office & Group Order - ${order.orderNumber}`,
    order_type: "Office & Group Order",
    customer_name: order.contactName,
    name: order.contactName,
    customer_email: order.email,
    email: order.email,
    customer_phone: order.phone,
    phone: order.phone,
    preferred_contact: order.contactPreference,
    contact_method: order.contactPreference,
    order_total: formatMoney(order.totals.total),
    order_body: body,
    order_message: body,
    message: body,
    title: `Mama Lu's Office & Group Order - ${order.orderNumber}`,
    from_name: order.contactName,
    reply_to: order.email || SETTINGS.orderEmail
  };

  const kitchenResult = await deliverEmail(params, "Kitchen Office & Group order email", SETTINGS.emailJs.kitchenTemplateId);
  const receiptResult = await sendCustomerReceiptEmail(order, "catering");
  return { ok: true, kitchenResult, receiptResult };
}
