# Mama Lu's Ordering Platform

Version: **v1.0.0 - Sunrise**

A mobile-first online ordering platform for Mama Lu's breakfast burritos.

## What It Includes

- Regular breakfast burrito ordering.
- Office & Group Orders.
- Per-burrito Add Beans option.
- Order review before sending.
- EmailJS order delivery.
- Kitchen-ticket style emails.
- Hidden future support for beverages, salsa, tax, hours, address, banner, social links, and pickup options.

## Run Locally

1. Unzip the folder.
2. Open `index.html` in a browser.
3. Place a test order.

## Important Files

```text
index.html
css/style.css
js/config.js
js/menu.js
js/app.js
js/email.js
images/logo-placeholder.svg
docs/PROJECT_CHARTER.md
docs/RELEASE_NOTES.md
OWNER_GUIDE.md
LAUNCH_CHECKLIST.md
CHANGELOG.md
```

## EmailJS Setup

The EmailJS keys are configured in:

```text
js/config.js
```

The EmailJS template body must contain only:

```text
{{order_body}}
```

The EmailJS subject should be:

```text
Mama Lu's Order - {{order_number}}
```

## Test Mode

In `js/config.js`:

```js
testMode: true
```

Use this for testing. Emails will clearly say:

```text
TEST ORDER - DO NOT PREPARE
```

For live orders:

```js
testMode: false
```

## Publish to GitHub Pages

1. Create a GitHub account if needed.
2. Create a new repository named something like `mama-lus`.
3. Upload all files from this folder.
4. Go to repository **Settings**.
5. Go to **Pages**.
6. Under **Build and deployment**, select:
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/root`
7. Save.
8. GitHub will give you a live URL.

## Version

Codename: **Sunrise**
