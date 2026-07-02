# Mama Lu's Owner Guide

This guide explains the normal business edits you may want to make.

## Main Settings

Open:

```text
js/config.js
```

Important settings:

```js
acceptingOrders: true,
taxEnabled: false,
beveragesEnabled: false,
salsaEnabled: false,
callButtonEnabled: false,
textButtonEnabled: false,
testMode: false,
```

## Test Mode

Before public launch, you can set:

```js
testMode: true,
```

Emails will include:

```text
TEST ORDER - DO NOT PREPARE
```

For live orders, set:

```js
testMode: false,
```

## Changing Menu Prices

Open:

```text
js/menu.js
```

Find the item and change the price number.

Example:

```js
price: 5.75
```

## Hiding or Showing Menu Items

In `js/menu.js`, set an item to unavailable:

```js
enabled: false
```

To show it again:

```js
enabled: true
```

## Turning On Tax Later

In `js/config.js`:

```js
taxEnabled: true,
taxRate: 0.0825,
```

## Turning On Drinks Later

In `js/config.js`:

```js
beveragesEnabled: true,
```

## Turning On Salsa Later

In `js/config.js`:

```js
salsaEnabled: true,
```

## EmailJS

EmailJS settings are in `js/config.js`:

```js
emailJs: {
  enabled: true,
  publicKey: "...",
  serviceId: "...",
  templateId: "..."
}
```

The EmailJS template body should contain only:

```text
{{order_body}}
```

The EmailJS subject should be:

```text
Mama Lu's Order - {{order_number}}
```


## Customer Receipt Emails

Version RC7.3 adds optional customer receipt emails. To make this work in EmailJS, set the template **To Email** field to:

```text
{{to_email}}
```

The website will send:
- Kitchen order email to `mamalusorders@gmail.com`
- Optional receipt email to the customer or group organizer if they entered an email address

The EmailJS template body should remain:

```text
{{order_body}}
```

The EmailJS subject should remain:

```text
{{order_subject}}
```


## EmailJS Template Setup

Kitchen template: `template_k6q2ezg`
- Use for kitchen order tickets.
- Keep the EmailJS To Email set to `mamalusorders@gmail.com`.

Customer receipt template: `template_fwtpv5n`
- Use for customer copies/receipts.
- Set EmailJS To Email to `{{to_email}}`.

The website sends both emails when an order is submitted.
