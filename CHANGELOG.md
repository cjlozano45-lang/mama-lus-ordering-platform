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
