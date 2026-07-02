## RC7.19 – Group Order Stabilization

- Fixed Office & Group Order modal close X.
- Clicking the backdrop now closes the group order modal.
- Restored a full-width Add Person / Add Another Person button.
- Bean & Cheese now hides Add Beans and cannot receive that extra.

# Mama Lu's Ordering Platform - Changelog

## RC7.14 — GitHub Pages Test Package

### Changed
- Repackaged the current navy/gold theme build for GitHub Pages testing.
- Preserved the current ordering flow, Office & Group Orders, sticky cart, and two-template EmailJS setup.
- Added this package as the recommended upload target for GitHub Pages testing.


## RC7.4 — Required Email + Field Alignment

### Changed
- Email Address is now required for regular and Office & Group Orders.
- Aligned Email Address cleanly with Phone Number in checkout layouts.
- Updated validation copy for required customer receipt emails.

# Mama Lu's Ordering Platform - Changelog

## v1.0.0 - Sunrise

### Added
- Mobile-first breakfast burrito ordering flow.
- Regular order cart with burrito customization.
- Per-burrito Add Beans option.
- Cart Clear All action with confirmation.
- Customer information screen with Full Name, phone formatting, contact preference, and special instructions.
- Order review screen before sending.
- EmailJS order delivery for regular orders.
- Office & Group Orders guided builder.
- Office & Group Orders person cards with Edit, Duplicate, and Remove.
- Office & Group Order email delivery.
- Order numbers: `ML-####` for regular orders and `ML-G####` for Office & Group Orders.
- Test Mode support for safe test orders.
- Hidden future toggles for tax, beverages, salsa, address, hours, banner, social links, pickup name, pickup time, call/text buttons, dynamic greeting, and meet section.

### Improved
- Entire menu card is clickable.
- Large, full-width Extras row for Add Beans.
- Clearer checkout copy: Almost Done, Full Name, Send Order.
- Cart language changed to Breakfast Order.
- Confirmation screen says Order Received.
- Kitchen-ticket style email formatting.

### Fixed
- Office & Group Orders now send through EmailJS.
- Duplicate workflow works when a new name is entered or guides the user back to the Full Name field when missing.
- Continue button closes the cart and moves directly to checkout.


## RC6 - Identity Build
- Removed the patterned hero background.
- Made the logo the homepage focal point.
- Added top-level Start Order and Office & Group Orders actions.
- Removed the lower duplicate group-order callout from the homepage flow.


## RC6.1
- Added Quick Add button for one-tap burrito ordering without customization.
- Removed the extra text-only Mama Lu's header so the logo remains the homepage focal point.
- Fixed Office & Group Orders Edit so it loads the person into the builder without removing the order until Save Person is tapped.


## RC6.2

### Added
- Temporary beverage preview: Coke, Sprite, Dr Pepper, Coco Agua, Watermelon Agua, and Horchata.
- Beverage add buttons for layout testing.

### Improved
- Office & Group Orders Edit now focuses the burrito selector so changing the burrito is the immediate next action.
- Duplicate continues to use the typed Full Name when one is entered, otherwise it prompts for the required name.


## RC6.3 - Group Order Name Edit & Beverage Hide

### Changed
- Hid the beverage preview again until drinks are ready to launch.
- Changed the Office & Group Orders person field from Full Name to Name.
- Added an Edit Name action for group-order person cards.
- Renamed Edit to Edit Burrito for clearer intent.


## RC7.1 - Mobile Experience Candidate
- Simplified homepage first screen further by removing the extra hero kicker.
- Enlarged the homepage logo treatment and cleaned the hero background.
- Made Quick Add the first menu action and kept Customize as the secondary action.
- Added a mobile sticky cart bar that appears only after items are added.
- Preserved EmailJS, regular orders, and Office & Group Orders.


## RC7.2 - Area Code Autofill
- Added configurable default area code support.
- Regular checkout and Office & Group Order organizer phone fields now start with (915).
- Preserved RC7.1 mobile/homepage updates.

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



## RC7.6 - Group Checkout Stabilization
- Fixed Phone/Email alignment in Office & Group Orders.
- Removed stale optional Email label.
- Added missing email validation helper so required email works consistently.
- Fixed Review Office & Group Order flow when an email address is entered.

## RC7.7 - Stabilization
- Added provided Mama Lu's logo asset.
- Prevented Enter key from closing Office & Group Orders while typing a name.
- Fixed group order review validation flow with required email.
- Customize > Add to Order no longer opens the cart automatically.
- Customers stay on the menu and can use the sticky cart bar when ready to review.


## RC7.8 - Stabilization Patch

- Replaced site logo with the corrected logo file.
- Fixed Edit Burrito so it does not automatically check Add Beans.
- Added additional customer receipt recipient aliases for EmailJS template compatibility.
- Note: EmailJS template To Email must be set to `{{to_email}}` for customer receipts to go to the customer-entered email.

## RC7.1 Redo - Stabilized Email Flow

### Fixed
- Rebuilt from the RC7.1 mobile/homepage experience while preserving the two-template EmailJS setup.
- Order send failures now display inside the review window instead of only behind the modal.
- Required-field validation scrolls and focuses the missing field.
- Added compatibility fields for EmailJS templates using `{{name}}`, `{{email}}`, `{{to_email}}`, and related aliases.
- Customer receipt failures no longer create duplicate kitchen orders on retry after the kitchen order has already been sent.
- Updated logo asset to the corrected logo.


## RC7.12 Email Debug
- Shows the exact EmailJS send failure in the review window.
- Identifies whether the kitchen or customer receipt template failed.
- Uses strict sending so receipt failures are visible during testing.


## RC7.13 Theme Match
- Applied deep navy and gold visual theme based on the original local project.
- Preserved current RC ordering flow and EmailJS two-template setup.
- Kept modern homepage/mobile experience while matching Mama Lu's navy/gold brand direction.


## RC7.17 - Business Email Test

### Changed
- Updated kitchen/business order email recipient to mamalusorders@gmail.com.
- Kept EmailJS service and template IDs unchanged unless you provide a new Service ID.
- Preserved the navy/gold theme and current ordering flow.

### Test
- Send one regular order and one Office & Group Order.
- Confirm kitchen tickets arrive at mamalusorders@gmail.com.
- Confirm customer receipts arrive at the customer email entered during checkout.
