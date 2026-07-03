# Mama Lu's Ordering Platform — RC7.14

This package is intended to be tested by uploading the extracted contents to GitHub Pages.

## GitHub Pages test steps
1. Extract this ZIP.
2. Open the extracted folder.
3. Upload the files inside the folder to your GitHub repository.
4. Commit the changes.
5. Wait 1–2 minutes, then test your GitHub Pages URL on your phone.

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


## RC6 - Identity Build
- Removed the patterned hero background.
- Made the logo the homepage focal point.
- Added top-level Start Order and Office & Group Orders actions.
- Removed the lower duplicate group-order callout from the homepage flow.


### RC6.1 Notes
- Use **Quick Add** for plain burritos with no extras.
- Tap the card or **Customize** when beans or quantity changes are needed.
- In Office & Group Orders, **Edit** now changes the button to **Save Person** and keeps the original entry until saved.


## RC7.2 testing notes
Test the homepage on mobile first. Confirm that the logo is the focal point, both ordering buttons are visible near the top, Quick Add works with one tap, and the sticky cart bar appears after adding an item.


## RC7.2 Notes
- Phone fields now auto-populate the 915 area code for faster local orders.
- EmailJS remains connected.
- Group orders and regular orders remain enabled.

## RC7.3 - Receipt Email + Group Time Cleanup

### Added
- Required Email Address field to regular checkout for customer receipt copies.
- Required Email Address field to Office & Group Orders for organizer receipt copies.
- Customer receipt email delivery when an email address is entered.

### Changed
- Removed Requested Time from Office & Group Orders for Version 1 launch.
- Kept Requested Date as optional for future planning without adding time pressure.
- Preserved Preferred Contact wording.

### Important EmailJS Note
- To send receipts to customers, the EmailJS template **To Email** field should use `{{to_email}}` instead of a fixed email address. The app sends the kitchen email to Mama Lu's and the optional receipt to the customer using that field.



## RC7.7 Notes
Office & Group Orders no longer show Requested Date. Email is required and aligned with Phone Number. The group review button now routes correctly to the review screen.


### EmailJS Receipt Reminder
For customer receipts, the EmailJS template **To Email** field must be set to `{{to_email}}`. If it is hardcoded to the kitchen email address, both the kitchen order and the customer receipt will go to the kitchen inbox.


## RC7.9 EmailJS Templates

This build uses two separate EmailJS templates:

- Kitchen Order: `template_k6q2ezg` — should send to `mamalusorders@gmail.com`.
- Customer Receipt: `template_fwtpv5n` — should use `{{to_email}}` in the EmailJS **To Email** field.

The customer receipt is sent to the email entered during checkout.


## RC7.12 Email Debug
- Shows the exact EmailJS send failure in the review window.
- Identifies whether the kitchen or customer receipt template failed.
- Uses strict sending so receipt failures are visible during testing.


## RC7.13 Theme Match
- Applied deep navy and gold visual theme based on the original local project.
- Preserved current RC ordering flow and EmailJS two-template setup.
- Kept modern homepage/mobile experience while matching Mama Lu's navy/gold brand direction.
