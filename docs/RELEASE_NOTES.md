# Release Notes

## Version 1.2.2

### Changed
- Customer checkout field now says “Full Name”.
- Replaced the catering bulk-entry-first workflow with a guided group order builder.
- Group orders now ask for each person’s name, burrito selection, and beans option.

### Improved
- Catering review output now lists each person with their selected burrito and extras.
- Catering email preview now formats individual group orders clearly.

## Version 1.2.1

### Fixed
- Continue to Checkout now closes the cart drawer and scrolls directly to the checkout form.
- Customer name placeholder now says “Name” instead of a sample personal name.
- Cleaned up duplicate beverage card markup for future beverage activation.


## v1 Prototype

### Added
- Production-style project structure
- Modern Mexican visual direction
- Breakfast burrito menu
- Cart drawer
- Per-burrito beans
- Order review screen
- Local cart persistence
- Catering form shell

### Fixed
- Add Beans is a large, left-aligned, full-width clickable row.

### Not Yet Added
- EmailJS connection
- Final logo
- Deployment

## Version 1.1 — UX Polish

### Added
- Card-wide click/tap behavior for menu items.
- Keyboard support for opening menu item customizers.
- Order number display on the confirmation screen.
- Submit button loading state.

### Improved
- Extras row styling and left alignment.
- Confirmation screen clarity.
- Focus states for accessibility.

## Version 1.2 — EmailJS Ready

### Added
- `js/email.js` email layer.
- EmailJS-ready regular order function.
- EmailJS-ready catering order function.
- Email preview logging when EmailJS is disabled.
- EmailJS placeholders in `js/config.js`.
- Error message if order sending fails.

### Improved
- Submit flow now awaits the email layer before clearing the cart.
- Catering review now uses a structured catering payload.
- Catering confirmation uses the catering order number.

### Still Disabled by Default
- Real EmailJS delivery.
- Beverages.
- Salsa.
- Taxes.

## v1.3.0-launch-candidate.1

### Changed
- Renamed catering language to **Office & Group Orders**.
- Changed primary homepage action to **Start Your Order**.
- Changed cart action to **Continue**.
- Changed final submission wording to **Send Order**.

### Added
- Added running People Added and Total display for Office & Group Orders.
- Added **Duplicate** action for individual group-order entries.
- Added **Edit** action for individual group-order entries.
- Added local draft saving for Office & Group Order entries.
- Added a review reminder before sending an order.

### Improved
- Office & Group Orders now feel more guided and less like a form.
- Duplicate action pre-fills burrito and beans, then asks for the next person’s name.


## Launch Candidate 2

### Fixed
- Duplicate in Office & Group Orders now works when a new person name is already entered.
- Duplicate now guides the user back to the Full Name field when pressed before a name is entered.
- Added inline `* Required` prompt for group person name.

### Improved
- Duplicate preserves the selected burrito and beans options from the copied order.


## Launch Candidate 4

### Improved
- Refined checkout heading to “Almost Done.”
- Renamed cart heading to “Breakfast Order.”
- Added reassurance that orders are not sent until the final Send Order step.
- Updated confirmation wording to “Order Received!”
- Updated Office & Group order numbers to use ML-G####.
- Improved kitchen-ticket style email formatting for regular and Office & Group Orders.
- Duplicate/edit actions now scroll and focus the Full Name field when customer input is needed.

### Ready for Owner Setup
- EmailJS remains disabled by default until real Public Key, Service ID, and Template ID are added in `js/config.js`.


## EmailJS Test Build - Clear Cart Patch

### Added
- Added a **Clear All** button to the cart drawer.
- Added a confirmation prompt before clearing the full breakfast order.

### Improved
- Customers can now quickly start over if they make a mistake while building an order.
- Empty cart feedback now confirms when there is nothing to clear.


## LC4.1 - Office & Group Email Patch

### Fixed
- Routed Office & Group Orders through the same EmailJS delivery helper used by regular orders.
- Added fallback EmailJS template fields (`message`, `title`, `order_subject`) for better compatibility with EmailJS template variations.
- Added console logging for EmailJS send results during test mode troubleshooting.

## RC7.3 - Receipt Email + Group Time Cleanup

### Added
- Optional Email Address field to regular checkout for customer receipt copies.
- Optional Email Address field to Office & Group Orders for organizer receipt copies.
- Customer receipt email delivery when an email address is entered.

### Changed
- Removed Requested Time from Office & Group Orders for Version 1 launch.
- Kept Requested Date as optional for future planning without adding time pressure.
- Preserved Preferred Contact wording.

### Important EmailJS Note
- To send receipts to customers, the EmailJS template **To Email** field should use `{{to_email}}` instead of a fixed email address. The app sends the kitchen email to Mama Lu's and the optional receipt to the customer using that field.

