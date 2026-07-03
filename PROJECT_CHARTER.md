 :root {
  --navy: #082044;
  --navy-2: #123a6f;
  --gold: #f2aa22;
  --gold-dark: #d69012;
  --silver: #c8ccd2;
  --cream: #fbf7ef;
  --warm: #f4eadb;
  --white: #ffffff;
  --ink: #102033;
  --muted: #667085;
  --red: #d62828;
  --red-dark: #a81f1f;
  --green: #2d6a4f;
  --shadow: 0 18px 45px rgba(8, 32, 68, 0.16);
  --radius: 24px;
  --radius-sm: 16px;
  --font-heading: "Montserrat", sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: var(--font-body);
  color: var(--ink);
  background: linear-gradient(180deg, #fffaf2 0%, var(--cream) 42%, #f6efe5 100%);
  min-height: 100vh;
}
button, input, textarea { font: inherit; }
button { cursor: pointer; }
.hidden { display: none !important; }
.app-shell { width: min(1120px, calc(100% - 28px)); margin: 0 auto; }
.site-header { padding: 22px 0 14px; }
.brand-lockup { display: flex; align-items: center; gap: 14px; }
.logo-frame { width: 72px; height: 72px; border-radius: 22px; background: var(--navy); box-shadow: var(--shadow); overflow: hidden; flex: 0 0 auto; border: 2px solid rgba(200,204,210,.65); }
.site-logo { width: 100%; height: 100%; object-fit: cover; }
h1, h2, h3 { font-family: var(--font-heading); margin: 0; color: var(--navy); letter-spacing: -0.035em; }
h1 { font-size: clamp(2rem, 5vw, 3.6rem); line-height: .95; }
h2 { font-size: clamp(1.8rem, 4vw, 3rem); }
h3 { font-size: 1.12rem; }
p { line-height: 1.6; }
.eyebrow { margin: 0 0 6px; text-transform: uppercase; letter-spacing: .14em; font-size: .72rem; font-weight: 800; color: var(--red); }
.muted { color: var(--muted); }
.section-panel { position: relative; background: rgba(255,255,255,.78); border: 1px solid rgba(200,204,210,.55); border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; }
.hero { min-height: 430px; display: grid; place-items: center; text-align: center; margin: 8px 0 52px; padding: 58px 24px; }
.hero-pattern { display: none; }
.hero-content { position: relative; max-width: 690px; }
.hero-kicker { color: var(--green); font-weight: 800; margin: 0 0 10px; }
.hero h2 { font-size: clamp(2.4rem, 8vw, 5.3rem); line-height: .95; }
.hero-copy { color: var(--muted); max-width: 530px; margin: 22px auto 28px; font-size: 1.08rem; }
.hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.button { border: 0; border-radius: 999px; min-height: 48px; padding: 0 22px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 800; text-decoration: none; transition: transform .18s ease, box-shadow .18s ease, background .18s ease; }
.button:hover { transform: translateY(-2px); }
.button-primary { background: var(--gold); color: var(--navy); box-shadow: 0 12px 28px rgba(242,170,34,.28); }
.button-primary:hover { background: var(--gold-dark); color: var(--navy); }
.button-secondary { background: var(--navy); color: white; box-shadow: 0 12px 28px rgba(8,32,68,.22); border: 1px solid rgba(242,170,34,.55); }
.button-small { min-height: 40px; padding: 0 16px; font-size: .9rem; }
.button-disabled { background: #d4d4d4; color: #777; box-shadow: none; }
.full { width: 100%; }
.status-message { position: fixed; top: 18px; left: 50%; transform: translateX(-50%); width: min(520px, calc(100% - 32px)); z-index: 70; background: var(--navy); color: white; border-radius: 18px; padding: 14px 18px; box-shadow: var(--shadow); text-align: center; font-weight: 700; }
.section-heading { max-width: 680px; margin: 0 auto 24px; text-align: center; }
.section-heading.left { margin-left: 0; text-align: left; }
.section-heading p:not(.eyebrow) { color: var(--muted); margin: 8px 0 0; }
.menu-section { margin: 52px 0; }
.menu-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.menu-card { background: rgba(255,255,255,.95); border: 1px solid rgba(200,204,210,.7); border-radius: var(--radius); padding: 20px; min-height: 240px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 12px 30px rgba(4,30,66,.08); transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
.menu-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); border-color: rgba(4,30,66,.24); }
.food-icon { width: 54px; height: 54px; display: grid; place-items: center; border-radius: 18px; background: var(--warm); font-size: 1.9rem; margin-bottom: 16px; }
.card-body p, .menu-card > p { color: var(--muted); font-size: .94rem; }
.card-footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 18px; }
.card-footer strong { color: var(--navy); font-size: 1.45rem; font-family: var(--font-heading); }
.catering-section, .checkout-section { padding: 32px; margin: 52px 0; }
.form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.field-wide { grid-column: 1 / -1; }
.field-label { display: grid; gap: 8px; font-weight: 800; color: var(--navy); margin: 16px 0; }
.field-label span { font-weight: 600; color: var(--muted); }
input, textarea { width: 100%; border: 1px solid rgba(4,30,66,.18); border-radius: 16px; padding: 14px 15px; background: white; color: var(--ink); outline: none; }
input:focus, textarea:focus { border-color: var(--navy); box-shadow: 0 0 0 4px rgba(4,30,66,.1); }
textarea { min-height: 110px; resize: vertical; }
.contact-preference { border: 0; margin: 18px 0; padding: 0; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.contact-preference legend { width: 100%; color: var(--navy); font-weight: 800; margin-bottom: 8px; }
.pill-radio { border: 1px solid rgba(4,30,66,.18); border-radius: 999px; min-height: 46px; padding: 0 16px; display: inline-flex; align-items: center; gap: 8px; background: white; font-weight: 800; }
.site-footer { margin: 60px 0 120px; padding: 30px 0; display: flex; flex-wrap: wrap; gap: 14px; align-items: center; justify-content: center; color: var(--muted); border-top: 1px solid rgba(4,30,66,.12); }
.site-footer strong { color: var(--navy); }
.cart-fab { position: fixed; right: 20px; bottom: 20px; z-index: 40; width: 70px; height: 70px; border-radius: 24px; border: 0; background: var(--navy); color: white; box-shadow: var(--shadow); display: grid; place-items: center; font-size: 1.3rem; }
.cart-fab strong { position: absolute; top: -6px; right: -6px; min-width: 28px; height: 28px; border-radius: 999px; background: var(--red); display: grid; place-items: center; font-size: .82rem; }
.cart-drawer { position: fixed; top: 0; right: 0; width: min(430px, 100%); height: 100vh; background: var(--cream); z-index: 60; transform: translateX(105%); transition: transform .25s ease; box-shadow: -16px 0 45px rgba(4,30,66,.18); padding: 22px; display: flex; flex-direction: column; }
.cart-drawer.open { transform: translateX(0); }
.drawer-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(4,30,66,.12); padding-bottom: 18px; }
.icon-button { width: 42px; height: 42px; border-radius: 50%; border: 0; background: white; color: var(--navy); font-size: 1.6rem; box-shadow: 0 6px 18px rgba(4,30,66,.12); }
.cart-items { flex: 1; overflow: auto; padding: 18px 0; display: grid; align-content: start; gap: 12px; }
.empty-cart { background: white; border-radius: 20px; padding: 20px; color: var(--muted); }
.empty-cart strong { color: var(--navy); }
.cart-item { background: white; border: 1px solid rgba(4,30,66,.1); border-radius: 18px; padding: 14px; display: flex; justify-content: space-between; gap: 12px; }
.cart-item small { display: block; color: var(--green); margin-top: 4px; font-weight: 700; }
.cart-item-actions { text-align: right; display: grid; gap: 6px; }
.cart-item-actions span { font-weight: 900; color: var(--navy); }
.cart-item-actions button { border: 0; background: transparent; color: var(--red); font-weight: 800; padding: 0; }
.cart-totals { background: white; border-radius: 20px; padding: 16px; display: grid; gap: 10px; margin-bottom: 12px; }
.cart-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.cart-actions .button { margin: 0; }
.cart-totals div, .review-totals div { display: flex; justify-content: space-between; gap: 12px; }
.grand-total, .review-totals div:last-child { font-size: 1.18rem; color: var(--navy); border-top: 1px solid rgba(4,30,66,.12); padding-top: 10px; }
.backdrop { position: fixed; inset: 0; background: rgba(4,30,66,.35); z-index: 50; }
.modal { border: 0; border-radius: var(--radius); width: min(520px, calc(100% - 24px)); padding: 0; background: transparent; }
.modal.wide { width: min(760px, calc(100% - 24px)); }
.modal::backdrop { background: rgba(4,30,66,.55); backdrop-filter: blur(4px); }
.modal-card { position: relative; background: var(--cream); border-radius: var(--radius); padding: 28px; box-shadow: var(--shadow); }
.modal-close { position: absolute; top: 16px; right: 16px; }
.modal-section { margin: 24px 0; padding: 20px; background: white; border: 1px solid rgba(4,30,66,.1); border-radius: 20px; }
.modal-section h3 { margin-bottom: 14px; }
.quantity-control { display: inline-flex; align-items: center; gap: 18px; background: var(--warm); padding: 8px; border-radius: 999px; }
.quantity-control button { width: 46px; height: 46px; border-radius: 50%; border: 0; background: var(--navy); color: white; font-size: 1.35rem; font-weight: 900; }
.quantity-control strong { min-width: 34px; text-align: center; font-size: 1.25rem; }
.extra-option { width: 100%; min-height: 74px; display: flex; align-items: center; gap: 14px; padding: 16px; border-radius: 18px; border: 2px solid rgba(4,30,66,.12); background: var(--cream); cursor: pointer; transition: border .18s ease, background .18s ease; }
.extra-option:hover { border-color: rgba(4,30,66,.32); }
.extra-option input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.custom-checkbox { width: 30px; height: 30px; border-radius: 10px; border: 2px solid var(--navy); background: white; flex: 0 0 auto; display: grid; place-items: center; }
.extra-option input:checked + .custom-checkbox { background: var(--green); border-color: var(--green); }
.extra-option input:checked + .custom-checkbox::after { content: "✓"; color: white; font-weight: 900; }
.extra-copy { display: grid; gap: 4px; text-align: left; }
.extra-copy strong { color: var(--navy); }
.extra-copy small { color: var(--muted); font-weight: 800; }
.review-content { display: grid; gap: 14px; max-height: 60vh; overflow: auto; padding: 4px; }
.review-block, .review-totals { background: white; border-radius: 18px; padding: 16px; border: 1px solid rgba(4,30,66,.1); }
.review-block h3 { margin-bottom: 8px; }
.review-block p { margin: 8px 0; }
.review-block span { color: var(--green); font-weight: 800; }
.review-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 18px; }
.confirmation-card { text-align: center; }
.success-mark { width: 74px; height: 74px; border-radius: 50%; background: var(--green); color: white; display: grid; place-items: center; font-size: 2.4rem; font-weight: 900; margin: 0 auto 18px; }
@media (max-width: 960px) { .menu-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) {
  .app-shell { width: min(100% - 20px, 1120px); }
  .brand-lockup { align-items: center; }
  .logo-frame { width: 62px; height: 62px; border-radius: 18px; }
  .hero { min-height: 380px; padding: 44px 18px; }
  .menu-grid, .form-grid { grid-template-columns: 1fr; }
  .menu-card { min-height: 215px; }
  .catering-section, .checkout-section, .modal-card { padding: 22px; }
  .cart-fab { width: 64px; height: 64px; right: 14px; bottom: 14px; }
  .cart-actions { grid-template-columns: 1fr; }
  .review-actions { flex-direction: column-reverse; }
  .review-actions .button { width: 100%; }
}


/* Version 1.1 polish */
.menu-card { cursor: pointer; outline: none; }
.menu-card:focus-visible { box-shadow: 0 0 0 4px rgba(214,40,40,.18), var(--shadow); border-color: var(--red); }
.menu-card .customize-action, .menu-card .quick-add-action { pointer-events: auto; }
.status-message { background: linear-gradient(135deg, var(--navy), var(--navy-2)); }
.extra-option { justify-content: flex-start; text-align: left; }
.extra-copy { display: grid; gap: 3px; }
.extra-copy small { color: var(--muted); font-weight: 800; }
.custom-checkbox { flex: 0 0 auto; width: 34px; height: 34px; border-radius: 10px; border: 2px solid rgba(4,30,66,.25); background: white; display: grid; place-items: center; font-size: 1.05rem; }
.extra-option:has(input:checked) { border-color: rgba(45,106,79,.55); background: rgba(45,106,79,.08); }
.confirmation-order { margin: 18px 0; padding: 16px; border-radius: 18px; background: var(--cream); border: 1px solid rgba(4,30,66,.1); display: grid; gap: 4px; }
.confirmation-order span { color: var(--muted); font-size: .82rem; font-weight: 900; text-transform: uppercase; letter-spacing: .08em; }
.confirmation-order strong { color: var(--navy); font-size: 1.55rem; font-family: var(--font-heading); }
.button:disabled { opacity: .7; cursor: wait; transform: none; }

/* Version 1.2.2 group order builder */
select {
  width: 100%;
  border: 1px solid rgba(4,30,66,.18);
  border-radius: 16px;
  padding: 14px 15px;
  background: white;
  color: var(--ink);
  outline: none;
  font: inherit;
}
select:focus { border-color: var(--navy); box-shadow: 0 0 0 4px rgba(4,30,66,.1); }
.group-order-builder {
  margin: 22px 0;
  padding: 20px;
  border-radius: 22px;
  background: white;
  border: 1px solid rgba(4,30,66,.1);
}
.builder-heading { margin-bottom: 10px; }
.builder-heading h3 { margin-bottom: 4px; }
.group-options-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 14px;
  align-items: center;
  margin: 8px 0 16px;
}
.group-extra-option { min-height: 68px; background: var(--cream); }
.group-order-list {
  display: grid;
  gap: 10px;
  margin-top: 12px;
}
.group-order-list-heading,
.group-order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.group-order-list-heading {
  padding: 12px 4px 4px;
  color: var(--navy);
}
.group-order-list-heading span { color: var(--muted); font-weight: 800; }
.group-order-item {
  background: var(--cream);
  border: 1px solid rgba(4,30,66,.1);
  border-radius: 16px;
  padding: 13px 14px;
}
.group-order-item small {
  display: block;
  color: var(--muted);
  font-weight: 800;
  margin-top: 3px;
}
.group-order-item button {
  border: 0;
  background: transparent;
  color: var(--red);
  font-weight: 900;
}
@media (max-width: 640px) {
  .group-options-row { grid-template-columns: 1fr; }
  .group-options-row .button { width: 100%; }
}

/* Launch Candidate 1 refinements */
.group-order-stats {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(4,30,66,.08), rgba(214,40,40,.06));
  color: var(--navy);
  font-weight: 900;
}
.group-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}
.group-order-item {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
}
.group-actions button {
  padding: 8px 9px;
  border-radius: 999px;
  background: white;
  border: 1px solid rgba(4,30,66,.12);
}

.review-error {
  margin: 12px 0 0;
  padding: 12px 14px;
  border-radius: 14px;
  background: #fff1f1;
  color: var(--red);
  font-weight: 900;
  text-align: center;
  border: 1px solid rgba(214,40,40,.24);
}

.review-note {
  margin: 12px 0 0;
  color: var(--muted);
  font-weight: 800;
  text-align: center;
}
@media (max-width: 640px) {
  .group-order-item { grid-template-columns: 1fr; align-items: start; }
  .group-actions { justify-content: flex-start; }
  .group-order-stats { flex-direction: column; align-items: flex-start; }
}


/* Launch Candidate 2 duplicate/name validation polish */
.field-hint {
  display: inline-block;
  margin-top: 6px;
  color: var(--red);
  font-weight: 900;
}
.field-error {
  border-color: var(--red) !important;
  box-shadow: 0 0 0 4px rgba(214,40,40,.12) !important;
}


/* Launch Candidate 4 finishing polish */
.cart-reassurance {
  margin: 0 0 12px;
  color: var(--muted);
  font-size: .88rem;
  font-weight: 700;
  text-align: center;
}
.field-hint {
  display: block;
  margin-top: 6px;
  color: var(--red);
  font-weight: 900;
}
.field-error {
  border-color: var(--red) !important;
  box-shadow: 0 0 0 4px rgba(214,40,40,.12) !important;
}


/* RC6 Identity Build */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.site-header-minimal {
  padding: 18px 0 4px;
  display: flex;
  justify-content: center;
}
.mini-brand {
  color: var(--navy);
  text-decoration: none;
  font-family: var(--font-heading);
  font-weight: 900;
  letter-spacing: -0.04em;
  font-size: 1.05rem;
  opacity: .82;
}
.hero-identity {
  min-height: calc(100vh - 120px);
  margin: 10px 0 58px;
  padding: clamp(32px, 7vw, 76px) 20px;
  background:
    radial-gradient(circle at 50% 0%, rgba(255,255,255,.96) 0%, rgba(255,248,237,.94) 54%, rgba(246,236,220,.9) 100%);
  border: 1px solid rgba(4,30,66,.1);
}
.hero-content-identity {
  display: grid;
  justify-items: center;
  gap: 16px;
  max-width: 560px;
}
.hero-logo {
  width: clamp(156px, 26vw, 260px);
  height: clamp(156px, 26vw, 260px);
  object-fit: contain;
  border-radius: 32px;
  filter: drop-shadow(0 18px 34px rgba(4,30,66,.18));
  margin-bottom: 4px;
}
.hero-identity .hero-kicker {
  margin: 4px 0 0;
  color: var(--red);
  text-transform: uppercase;
  letter-spacing: .18em;
  font-size: .8rem;
}
.hero-identity h2 {
  font-size: clamp(2.1rem, 7vw, 4.4rem);
  line-height: .94;
  max-width: 680px;
}
.hero-actions-stacked {
  margin-top: 12px;
  display: grid;
  width: min(100%, 390px);
  gap: 12px;
}
.button-hero {
  min-height: 58px;
  width: 100%;
  font-size: 1.02rem;
  border-radius: 18px;
  justify-content: center;
}
.hero-identity .button-secondary {
  background: white;
  color: var(--navy);
  border: 1px solid rgba(4,30,66,.18);
  box-shadow: 0 12px 28px rgba(4,30,66,.10);
}
.hero-identity .button-secondary:hover {
  background: var(--navy);
  color: white;
}
@media (min-width: 720px) {
  .hero-actions-stacked {
    grid-template-columns: 1fr 1fr;
    width: min(100%, 520px);
  }
}
@media (max-width: 640px) {
  .site-header-minimal { padding-top: 12px; }
  .mini-brand { font-size: .95rem; }
  .hero-identity {
    min-height: calc(100vh - 88px);
    padding: 30px 18px;
    margin-top: 6px;
  }
  .hero-logo {
    width: 162px;
    height: 162px;
    border-radius: 28px;
  }
  .hero-identity h2 { font-size: clamp(2.25rem, 13vw, 3.6rem); }
  .button-hero { min-height: 58px; }
}


/* RC6.1 quick add and group edit fixes */
.site-header-minimal { min-height: 12px; padding: 8px 0 0; }
.menu-card-actions { align-items: flex-end; }
.menu-action-buttons { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
.menu-action-buttons .button { min-height: 40px; padding: 0 13px; }
.quick-add-action { box-shadow: 0 8px 18px rgba(214,40,40,.16); }
.cart-pulse { animation: cartPulse .42s ease; }
@keyframes cartPulse {
  0% { transform: scale(1); }
  45% { transform: scale(1.08); }
  100% { transform: scale(1); }
}
.group-order-item.editing { border-color: rgba(214,40,40,.45); background: rgba(214,40,40,.06); }
@media (max-width: 640px) {
  .menu-card-actions { align-items: stretch; }
  .menu-action-buttons { width: 100%; display: grid; grid-template-columns: 1fr; }
  .menu-action-buttons .button { width: 100%; }
}


/* RC7.1 mobile experience and identity polish */
.hero-identity {
  min-height: calc(100vh - 90px);
  margin: 6px 0 48px;
  background: linear-gradient(180deg, rgba(255, 248, 237, 0.98), rgba(255, 255, 255, 0.94));
}
.hero-content-identity { gap: 20px; }
.hero-logo {
  width: clamp(190px, 32vw, 310px);
  height: clamp(190px, 32vw, 310px);
  margin-bottom: 2px;
  border-radius: 34px;
}
.hero-identity h2 {
  max-width: 560px;
  font-size: clamp(2.25rem, 6.2vw, 4.6rem);
}
.hero-actions-stacked { margin-top: 8px; }
.menu-action-buttons {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}
.menu-card-actions {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: end;
}
.menu-action-buttons .button { width: 100%; }
.customize-action {
  background: white;
  color: var(--navy);
  border: 1px solid rgba(4,30,66,.18);
  box-shadow: none;
}
.customize-action:hover { background: var(--navy); color: white; }
.sticky-cart-bar {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 45;
  min-height: 62px;
  border: 0;
  border-radius: 20px;
  background: var(--navy);
  color: white;
  box-shadow: 0 18px 45px rgba(4, 30, 66, 0.28);
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 12px;
  align-items: center;
  padding: 0 16px;
  font-weight: 900;
}
.sticky-cart-bar strong { color: white; font-family: var(--font-heading); font-size: 1.05rem; }
.has-sticky-cart .site-footer { margin-bottom: 150px; }
@media (min-width: 741px) {
  .sticky-cart-bar { display: none !important; }
}
@media (max-width: 740px) {
  .cart-fab { display: none; }
  .hero-identity {
    min-height: calc(100vh - 52px);
    padding: 28px 18px 30px;
    margin-bottom: 36px;
  }
  .hero-logo {
    width: min(64vw, 230px);
    height: min(64vw, 230px);
  }
  .hero-identity h2 { font-size: clamp(2rem, 12vw, 3.3rem); }
  .button-hero { min-height: 60px; font-size: 1rem; }
  .menu-card { min-height: 0; padding: 18px; }
  .menu-card-actions { grid-template-columns: 1fr; gap: 12px; }
  .card-footer strong { font-size: 1.55rem; }
}
@media (max-width: 380px) {
  .hero-logo { width: 185px; height: 185px; }
  .hero-identity h2 { font-size: 2.1rem; }
  .sticky-cart-bar { grid-template-columns: 1fr auto; }
  .sticky-cart-bar span:last-child { display: none; }
}


/* RC7.4 required receipt email polish */
.receipt-hint {
  display: block;
  margin-top: 6px;
  color: var(--muted);
  font-weight: 700;
  font-size: .86rem;
}


/* RC7.5 group checkout alignment and validation polish */
.group-contact-grid { align-items: start; }
.group-contact-grid .field-label { margin: 0; }
.group-contact-grid .receipt-hint { min-height: 0; margin-top: 8px; }
@media (min-width: 721px) {
  .group-contact-grid { grid-auto-rows: auto; }
}


/* RC7.6 alignment and required email stabilization */
.field-label > input[type="text"],
.field-label > input[type="tel"],
.field-label > input[type="email"],
.field-label > input[type="date"] {
  min-height: 58px;
  display: block;
}
.group-contact-grid { align-items: start; }
.group-contact-grid .field-label {
  margin: 0;
  grid-template-rows: auto 58px;
}
.group-contact-grid .field-label > input { align-self: start; }
.group-receipt-hint {
  margin: -6px 0 0;
  color: var(--muted);
  font-weight: 700;
}
@media (max-width: 720px) {
  .group-contact-grid .field-label { grid-template-rows: auto auto; }
  .group-receipt-hint { margin-top: 0; }
}


/* RC7.13 Theme Match: navy/gold Mama Lu's visual system */
.site-header {
  background: var(--navy);
  color: white;
  margin-bottom: 24px;
  padding: 18px 0 16px;
  box-shadow: 0 10px 28px rgba(8,32,68,.18);
}
.site-header .brand-lockup h1,
.site-header h1,
.site-header h2,
.site-header h3,
.site-header strong { color: white; }
.site-header .eyebrow { color: var(--gold); }
.logo-frame {
  background: var(--navy);
  border-color: rgba(242,170,34,.72);
  box-shadow: 0 16px 34px rgba(0,0,0,.22);
}
.hero {
  background: linear-gradient(145deg, var(--navy) 0%, #0c2f5f 100%);
  color: white;
  border: 1px solid rgba(242,170,34,.35);
}
.hero h2,
.hero h1 { color: white; }
.hero-kicker { color: var(--gold); }
.hero-copy { color: rgba(255,255,255,.82); }
.hero .hero-logo, .hero .site-logo, .hero img {
  border-radius: 10px;
}
.section-panel {
  border-color: rgba(8,32,68,.12);
}
.menu-card:hover { border-color: rgba(242,170,34,.75); }
.food-icon { background: rgba(242,170,34,.16); }
.card-footer strong { color: var(--navy); }
.cart-fab { background: var(--navy); border: 2px solid var(--gold); }
.cart-fab strong { background: var(--gold); color: var(--navy); }
.status-message { background: var(--navy); border: 1px solid rgba(242,170,34,.55); }
input:focus, textarea:focus { border-color: var(--gold); box-shadow: 0 0 0 4px rgba(242,170,34,.22); }
.pill-radio:has(input:checked) { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(242,170,34,.18); }
.site-footer { border-top-color: rgba(8,32,68,.16); }
.site-footer strong { color: var(--navy); }

/* RC7.15 exact old local project theme match */
:root {
  --navy: #0B1E3B;
  --navy-2: #15325D;
  --gold: #D89A2B;
  --gold-dark: #b97d17;
  --silver: #E5E5E5;
  --cream: #F8F5EF;
  --warm: #EDE7D9;
  --white: #FFFFFF;
  --ink: #222222;
  --muted: #666666;
  --red: #A32323;
  --red-dark: #8B1E1E;
  --green: #2E8B57;
  --shadow: 0 18px 45px rgba(11,30,59,0.22);
}
body {
  color: var(--ink);
  background: var(--cream);
}
.site-header-minimal {
  background: transparent;
}
.hero-identity {
  background: linear-gradient(135deg, var(--navy) 0%, var(--navy-2) 100%);
  border: 0;
  box-shadow: 0 18px 45px rgba(11,30,59,0.22);
  color: var(--white);
}
.hero-content-identity {
  display: grid;
  justify-items: center;
}
.hero-logo {
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  object-fit: contain;
}
.hero-identity h2 {
  display: inline-block;
  width: auto;
  max-width: none;
  margin: 6px auto 18px;
  background: var(--gold);
  color: var(--navy);
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 1rem;
  line-height: 1.1;
  letter-spacing: 0;
  font-weight: 900;
  box-shadow: 0 8px 20px rgba(0,0,0,0.14);
}
.hero-actions-stacked {
  gap: 14px;
}
.button {
  border-radius: 12px;
}
.button-primary {
  background: var(--gold);
  color: var(--navy);
  box-shadow: 0 10px 24px rgba(0,0,0,.18);
}
.button-primary:hover {
  background: var(--gold-dark);
  color: var(--navy);
}
.button-secondary {
  background: transparent;
  color: var(--white);
  border: 2px solid rgba(255,255,255,.92);
  box-shadow: none;
}
.button-secondary:hover,
.hero-identity .button-secondary:hover {
  background: var(--white);
  color: var(--navy);
}
.menu-section,
.checkout-section,
.catering-section,
.section-panel:not(.hero-identity) {
  background: rgba(255,255,255,.92);
}
.menu-card,
.cart-item,
.review-block,
.review-totals,
.modal-section,
.group-order-builder {
  background: var(--white);
  border-color: rgba(11,30,59,.10);
  box-shadow: 0 10px 28px rgba(11,30,59,0.08);
}
.menu-card:hover {
  box-shadow: 0 16px 38px rgba(216,154,43,0.24);
  border-color: rgba(216,154,43,.45);
}
.eyebrow,
.cart-item-actions button {
  color: var(--red);
}
.food-icon,
.quantity-control,
.extra-option,
.group-order-item {
  background: var(--warm);
}
.customize-action {
  background: var(--white);
  color: var(--navy);
  border: 1px solid rgba(11,30,59,.18);
  box-shadow: none;
}
.customize-action:hover {
  background: var(--navy);
  color: var(--white);
}
input:focus, textarea:focus, select:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 4px rgba(216,154,43,.18);
}
.cart-fab,
.sticky-cart-bar,
.quantity-control button,
.status-message {
  background: var(--navy);
  color: var(--white);
}
.cart-fab strong {
  background: var(--gold);
  color: var(--navy);
}
.success-mark {
  background: var(--green);
}
.button-disabled, .button:disabled {
  background: #E5E5E5;
  color: #666666;
}
@media (max-width: 740px) {
  .hero-identity {
    padding: 34px 18px 36px;
  }
  .hero-logo {
    width: min(68vw, 250px);
    height: auto;
  }
  .hero-identity h2 {
    font-size: .95rem;
  }
  .button-hero {
    min-height: 58px;
  }
}


/* Stabilization Build 1 - group order critical fixes */
.group-add-person-button { margin: 10px 0 18px; min-height: 58px; font-size: 1rem; }
.group-final-actions { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 16px; }
@media (min-width: 720px) { .group-final-actions { grid-template-columns: 1fr 1fr; } }
.group-options-row:has(.group-extra-option.hidden) { display: none; }


/* Stabilization Build 2: restore high-contrast red modal navigation buttons. */
.modal-card .review-actions .button-secondary,
.modal-card .group-final-actions .button-secondary {
  background: #A32323;
  color: #ffffff;
  border-color: #A32323;
  box-shadow: 0 12px 28px rgba(163, 35, 35, 0.22);
}

.modal-card .review-actions .button-secondary:hover,
.modal-card .group-final-actions .button-secondary:hover {
  background: #8f1f1f;
  border-color: #8f1f1f;
}


/* Stabilization Build 6: eliminate transparent action buttons. */
.button.button-secondary:not(.customize-action) {
  background: #A32323 !important;
  color: #ffffff !important;
  border: 2px solid #A32323 !important;
  box-shadow: 0 12px 28px rgba(163, 35, 35, 0.22) !important;
}
.button.button-secondary:not(.customize-action):hover {
  background: #8f1f1f !important;
  border-color: #8f1f1f !important;
  color: #ffffff !important;
}
.customize-action {
  background: var(--white) !important;
  color: var(--navy) !important;
  border: 1px solid rgba(11,30,59,.18) !important;
  box-shadow: none !important;
}
.customize-action:hover {
  background: var(--navy) !important;
  color: var(--white) !important;
}

/* Stabilization Build 7: final button color audit. No transparent action buttons. */
:root { --danger-red: #A32323; --danger-red-dark: #8f1f1f; --disabled-gray: #6B7280; }

/* Red action buttons: cancel, back, clear, remove. */
#clearCartButton,
#cancelGroupOrder,
#backFromReview,
#backToGroupEdit,
.cancel-button,
.back-button,
.clear-button,
.danger-button,
.button-danger,
.button-cancel,
.button-back,
.cart-actions .button-secondary,
.review-actions .button-secondary,
.group-final-actions .button-secondary,
.modal-card .button-secondary:not(.customize-action),
button[data-action="cancel"],
button[data-action="back"],
button[data-action="clear"] {
  background: var(--danger-red) !important;
  color: #ffffff !important;
  border: 2px solid var(--danger-red) !important;
  box-shadow: 0 12px 28px rgba(163, 35, 35, 0.24) !important;
  opacity: 1 !important;
}

#clearCartButton:hover,
#cancelGroupOrder:hover,
#backFromReview:hover,
#backToGroupEdit:hover,
.cancel-button:hover,
.back-button:hover,
.clear-button:hover,
.danger-button:hover,
.button-danger:hover,
.button-cancel:hover,
.button-back:hover,
.cart-actions .button-secondary:hover,
.review-actions .button-secondary:hover,
.group-final-actions .button-secondary:hover,
.modal-card .button-secondary:not(.customize-action):hover,
button[data-action="cancel"]:hover,
button[data-action="back"]:hover,
button[data-action="clear"]:hover {
  background: var(--danger-red-dark) !important;
  border-color: var(--danger-red-dark) !important;
  color: #ffffff !important;
}

/* Disabled buttons should never look transparent/white-on-white. */
.button:disabled,
button:disabled,
.button-disabled {
  background: var(--disabled-gray) !important;
  color: #ffffff !important;
  border: 2px solid var(--disabled-gray) !important;
  box-shadow: none !important;
  opacity: .75 !important;
  cursor: not-allowed !important;
  transform: none !important;
}

/* Preserve white utility buttons. */
.customize-action,
.edit-name-button,
.edit-burrito-button,
.duplicate-button,
.group-order-item .button-secondary {
  background: #ffffff !important;
  color: var(--navy) !important;
  border: 1px solid rgba(11,30,59,.18) !important;
  box-shadow: none !important;
}

/* LC1 Build 2: restore home Office & Group Orders button to white.
   This must override the broad red secondary-button stabilization rules. */
#openCateringHero.button-secondary,
.hero-identity #openCateringHero.button-secondary {
  background: #ffffff !important;
  color: var(--navy) !important;
  border: 2px solid rgba(11,30,59,.18) !important;
  box-shadow: 0 12px 28px rgba(11,30,59,.10) !important;
}
#openCateringHero.button-secondary:hover,
.hero-identity #openCateringHero.button-secondary:hover {
  background: #ffffff !important;
  color: var(--navy) !important;
  border-color: rgba(11,30,59,.35) !important;
  transform: translateY(-2px);
}

/* LC1 customer experience polish */
.button.is-sending {
  pointer-events: none;
  gap: 10px;
}
.button-spinner {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 3px solid rgba(8,32,68,.25);
  border-top-color: var(--navy);
  display: inline-block;
  animation: mamaSpin .8s linear infinite;
}
@keyframes mamaSpin { to { transform: rotate(360deg); } }
.cart-pulse { animation: cartPulse .35s ease; }
@keyframes cartPulse {
  0% { transform: translateY(0) scale(1); }
  45% { transform: translateY(-3px) scale(1.06); }
  100% { transform: translateY(0) scale(1); }
}
.success-mark { animation: successPop .35s ease both; }
@keyframes successPop {
  0% { transform: scale(.78); opacity: .4; }
  100% { transform: scale(1); opacity: 1; }
}
