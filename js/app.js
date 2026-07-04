const state = {
  cart: loadCart(),
  selectedItem: null,
  selectedQty: 1,
  orderCounter: Number(localStorage.getItem("ml_order_counter")) || SETTINGS.orderNumberStart,
  cateringCounter: Number(localStorage.getItem("ml_catering_counter")) || SETTINGS.cateringNumberStart,
  lastSubmittedOrder: null,
  pendingReviewOrder: null,
  pendingReviewType: "regular",
  isSubmittingOrder: false,
  editingGroupUid: null,
  cateringItems: loadCateringItems()
};

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  hydrateSettings();
  renderMenu();
  renderBeverages();
  renderGroupBurritoOptions();
  renderGroupOrderList();
  renderCart();
  bindEvents();
});

function cacheElements() {
  Object.assign(els, {
    menuGrid: document.getElementById("menuGrid"),
    beverageSection: document.getElementById("beverageSection"),
    beverageGrid: document.getElementById("beverageGrid"),
    cateringSection: document.getElementById("cateringSection"),
    callButton: document.getElementById("callButton"),
    textButton: document.getElementById("textButton"),
    statusMessage: document.getElementById("statusMessage"),
    stickyCartBar: document.getElementById("stickyCartBar"),
    stickyCartSummary: document.getElementById("stickyCartSummary"),
    stickyCartTotal: document.getElementById("stickyCartTotal"),
    cartFab: document.getElementById("cartFab"),
    cartFabCount: document.getElementById("cartFabCount"),
    cartDrawer: document.getElementById("cartDrawer"),
    drawerBackdrop: document.getElementById("drawerBackdrop"),
    closeCart: document.getElementById("closeCart"),
    cartItems: document.getElementById("cartItems"),
    cartSubtotal: document.getElementById("cartSubtotal"),
    cartTax: document.getElementById("cartTax"),
    cartTotal: document.getElementById("cartTotal"),
    taxLine: document.getElementById("taxLine"),
    clearCartButton: document.getElementById("clearCartButton"),
    cartCheckoutButton: document.getElementById("cartCheckoutButton"),
    checkoutSection: document.getElementById("checkout"),
    customizeModal: document.getElementById("customizeModal"),
    modalItemName: document.getElementById("modalItemName"),
    modalItemDescription: document.getElementById("modalItemDescription"),
    modalQty: document.getElementById("modalQty"),
    decreaseQty: document.getElementById("decreaseQty"),
    increaseQty: document.getElementById("increaseQty"),
    beansCheckbox: document.getElementById("beansCheckbox"),
    addToCartButton: document.getElementById("addToCartButton"),
    customerForm: document.getElementById("customerForm"),
    customerName: document.getElementById("customerName"),
    customerPhone: document.getElementById("customerPhone"),
    customerEmail: document.getElementById("customerEmail"),
    specialInstructions: document.getElementById("specialInstructions"),
    reviewModal: document.getElementById("reviewModal"),
    reviewContent: document.getElementById("reviewContent"),
    reviewError: document.getElementById("reviewError"),
    submitOrderButton: document.getElementById("submitOrderButton"),
    confirmationModal: document.getElementById("confirmationModal"),
    confirmationOrderNumber: document.getElementById("confirmationOrderNumber"),
    confirmationEmail: document.getElementById("confirmationEmail"),
    newOrderButton: document.getElementById("newOrderButton"),
    openCatering: document.getElementById("openCatering"),
    openCateringHero: document.getElementById("openCateringHero"),
    cateringModal: document.getElementById("cateringModal"),
    cateringCompany: document.getElementById("cateringCompany"),
    cateringContact: document.getElementById("cateringContact"),
    cateringPhone: document.getElementById("cateringPhone"),
    cateringEmail: document.getElementById("cateringEmail"),
    groupPersonName: document.getElementById("groupPersonName"),
    groupPersonNameHint: document.getElementById("groupPersonNameHint"),
    groupBurritoSelect: document.getElementById("groupBurritoSelect"),
    groupBeansCheckbox: document.getElementById("groupBeansCheckbox"),
    groupBeansOption: document.getElementById("groupBeansOption"),
    groupOrderStats: document.getElementById("groupOrderStats"),
    addGroupPersonButton: document.getElementById("addGroupPersonButton"),
    groupOrderList: document.getElementById("groupOrderList"),
    submitCateringButton: document.getElementById("submitCateringButton"),
    cancelCateringButton: document.getElementById("cancelCateringButton")
  });
}

function hydrateSettings() {
  document.title = SETTINGS.pageTitle;
  document.getElementById("footerPhone").textContent = SETTINGS.phone;
  els.callButton.href = `tel:${SETTINGS.phoneHref}`;
  els.textButton.href = `sms:${SETTINGS.phoneHref}`;
  toggle(els.callButton, SETTINGS.callButtonEnabled);
  toggle(els.textButton, SETTINGS.textButtonEnabled);
  toggle(els.cateringSection, false);
  toggle(els.openCateringHero, SETTINGS.cateringEnabled);
  if (!SETTINGS.acceptingOrders) showStatus("Online ordering is currently unavailable. Please check back later.");
  if (SETTINGS.debugMode) console.log("Project Sunrise settings", SETTINGS);
}

function bindEvents() {
  els.cartFab.addEventListener("click", openCart);
  if (els.stickyCartBar) els.stickyCartBar.addEventListener("click", openCart);
  els.closeCart.addEventListener("click", closeCart);
  els.drawerBackdrop.addEventListener("click", closeCart);
  els.clearCartButton.addEventListener("click", clearCart);
  els.cartCheckoutButton.addEventListener("click", goToCheckout);
  els.decreaseQty.addEventListener("click", () => setModalQty(state.selectedQty - 1));
  els.increaseQty.addEventListener("click", () => setModalQty(state.selectedQty + 1));
  els.addToCartButton.addEventListener("click", addSelectedToCart);
  initializePhoneField(els.customerPhone);
  initializePhoneField(els.cateringPhone);
  els.customerPhone.addEventListener("input", (event) => event.target.value = formatPhone(event.target.value));
  els.cateringPhone.addEventListener("input", (event) => event.target.value = formatPhone(event.target.value));
  els.customerPhone.addEventListener("focus", () => ensureAreaCode(els.customerPhone));
  els.cateringPhone.addEventListener("focus", () => ensureAreaCode(els.cateringPhone));
  [els.customerName, els.customerPhone, els.customerEmail, els.cateringContact, els.cateringPhone, els.cateringEmail].forEach(field => {
    if (field) field.addEventListener("input", () => clearFieldInvalid(field));
  });
  els.groupPersonName.addEventListener("input", () => {
    clearGroupNameRequired();
    clearFieldInvalid(els.groupPersonName);
  });
  els.groupPersonName.addEventListener("keydown", handleGroupNameKeydown);
  if (els.cateringModal) {
    els.cateringModal.addEventListener("keydown", preventCateringEnterSubmit);
    const cateringForm = els.cateringModal.querySelector("form");
    if (cateringForm) cateringForm.addEventListener("submit", (event) => event.preventDefault());
    const cateringCloseButton = els.cateringModal.querySelector(".modal-close");
    if (cateringCloseButton) {
      cateringCloseButton.addEventListener("click", (event) => {
        event.preventDefault();
        closeGroupOrderAndReturnToMenu();
      });
    }
  }
  if (els.customizeModal) {
    const customizeCloseButton = els.customizeModal.querySelector(".modal-close");
    if (customizeCloseButton) {
      customizeCloseButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (els.customizeModal.open) els.customizeModal.close();
      });
    }
  }
  els.customerForm.addEventListener("submit", handleReviewOrder);
  els.submitOrderButton.addEventListener("click", submitReviewedOrder);
  els.newOrderButton.addEventListener("click", resetOrder);
  if (els.openCatering) els.openCatering.addEventListener("click", openGroupOrder);
  if (els.openCateringHero) els.openCateringHero.addEventListener("click", openGroupOrder);
  if (els.cateringModal) els.cateringModal.addEventListener("click", handleCateringBackdropClick);
  if (els.cancelCateringButton) els.cancelCateringButton.addEventListener("click", closeGroupOrderAndReturnToMenu);
  els.groupBurritoSelect.addEventListener("change", () => { updateGroupBeansVisibility(); clearFieldInvalid(els.groupBurritoSelect); });
  els.addGroupPersonButton.addEventListener("click", addGroupPersonOrder);
  els.submitCateringButton.addEventListener("click", (event) => { event.preventDefault(); reviewCateringOrder(); });
}


function openGroupOrder() {
  if (!SETTINGS.cateringEnabled) return;
  els.cateringModal.showModal();
  updateGroupBeansVisibility();
  setTimeout(() => els.groupPersonName.focus({ preventScroll: true }), 100);
}

function handleCateringBackdropClick(event) {
  if (event.target === els.cateringModal) closeGroupOrderAndReturnToMenu();
}

function closeGroupOrderAndReturnToMenu() {
  if (els.cateringModal && els.cateringModal.open) els.cateringModal.close();
  const menu = document.getElementById("menu");
  if (menu) menu.scrollIntoView({ behavior: "smooth", block: "start" });
}

function isBeanAndCheese(itemId) {
  return itemId === "bean-cheese";
}

function updateGroupBeansVisibility() {
  const selectedId = els.groupBurritoSelect ? els.groupBurritoSelect.value : "";
  const hideBeans = isBeanAndCheese(selectedId);
  if (els.groupBeansOption) els.groupBeansOption.classList.toggle("hidden", hideBeans);
  if (hideBeans && els.groupBeansCheckbox) els.groupBeansCheckbox.checked = false;
}

function updateCustomizerBeansVisibility(item) {
  const hideBeans = item && isBeanAndCheese(item.id);
  const beansOption = els.beansCheckbox ? els.beansCheckbox.closest(".extra-option") : null;
  if (beansOption) beansOption.classList.toggle("hidden", hideBeans);
  if (hideBeans && els.beansCheckbox) els.beansCheckbox.checked = false;
}

function goToCheckout(event) {
  event.preventDefault();
  if (!state.cart.length) {
    return showStatus("Please add at least one item before checking out.");
  }
  closeCart();
  els.checkoutSection.scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => els.customerName.focus({ preventScroll: true }), 450);
}

function renderMenu() {
  const category = MENU.categories.find(cat => cat.id === "breakfast-burritos");
  els.menuGrid.innerHTML = category.items
    .filter(item => item.enabled)
    .map(item => `
      <article class="menu-card ${item.soldOut ? "sold-out" : ""}" data-item-id="${item.id}" tabindex="${item.soldOut ? "-1" : "0"}" role="button" aria-label="Customize ${item.name}">
        <div class="food-icon" aria-hidden="true">🌯</div>
        <div class="card-body">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </div>
        <div class="card-footer menu-card-actions">
          <strong>${formatMenuPrice(item.price)}</strong>
          ${item.soldOut ? `<span class="button button-small button-disabled" aria-hidden="true">Sold Out</span>` : `
            <div class="menu-action-buttons">
              <button class="button button-small button-primary quick-add-action" type="button" data-quick-add="${item.id}" aria-label="Quick add ${item.name}">Quick Add</button>
              <button class="button button-small button-secondary customize-action" type="button" data-customize-item="${item.id}" aria-label="Customize ${item.name}">Customize</button>
            </div>
          `}
        </div>
      </article>
    `).join("");

  els.menuGrid.querySelectorAll(".menu-card:not(.sold-out)").forEach(card => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      openCustomizer(card.dataset.itemId);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCustomizer(card.dataset.itemId);
      }
    });
  });

  els.menuGrid.querySelectorAll("[data-customize-item]").forEach(button => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openCustomizer(button.dataset.customizeItem);
    });
  });

  els.menuGrid.querySelectorAll("[data-quick-add]").forEach(button => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      quickAddItem(button.dataset.quickAdd);
    });
  });
}

function renderBeverages() {
  toggle(els.beverageSection, SETTINGS.beveragesEnabled);
  if (!SETTINGS.beveragesEnabled) return;
  els.beverageGrid.innerHTML = MENU.beverages
    .filter(item => item.enabled)
    .map(item => `
      <article class="menu-card beverage-card" data-beverage-id="${item.id}">
        <div class="food-icon" aria-hidden="true">🥤</div>
        <h3>${item.name}</h3>
        <p>${item.category}</p>
        <div class="card-footer"><strong>${formatMoney(item.price)}</strong><button class="button button-small button-secondary" type="button" data-add-beverage="${item.id}">Add Drink</button></div>
      </article>
    `).join("");

  els.beverageGrid.querySelectorAll("[data-add-beverage]").forEach(button => {
    button.addEventListener("click", () => quickAddBeverage(button.dataset.addBeverage));
  });
}

function renderGroupBurritoOptions() {
  if (!els.groupBurritoSelect) return;
  const burritos = MENU.categories
    .find(category => category.id === "breakfast-burritos")
    .items
    .filter(item => item.enabled && !item.soldOut);

  els.groupBurritoSelect.innerHTML = `<option value="">Select a burrito</option>` + burritos.map(item =>
    `<option value="${item.id}">${item.name} - ${formatMenuPrice(item.price)}</option>`
  ).join("");
}

function addGroupPersonOrder() {
  const personName = els.groupPersonName.value.trim();
  const burritoId = els.groupBurritoSelect.value;
  const item = findMenuItem(burritoId);
  if (!personName) {
    markGroupNameRequired();
    return showStatus("Please enter the person's name for this group order.");
  }
  if (!item) return showStatus("Please choose a burrito for this person.");

  const beans = !isBeanAndCheese(item.id) && els.groupBeansCheckbox.checked;
  const orderEntry = {
    uid: state.editingGroupUid || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())),
    personName,
    type: "burrito",
    id: item.id,
    name: item.name,
    basePrice: item.price,
    extras: beans ? [{ id: "beans", name: "Beans", price: 0.25 }] : [],
    price: item.price + (beans ? 0.25 : 0)
  };

  if (state.editingGroupUid) {
    state.cateringItems = state.cateringItems.map(existing => existing.uid === state.editingGroupUid ? orderEntry : existing);
    state.editingGroupUid = null;
    showStatus(`${personName}'s order was updated.`);
  } else {
    state.cateringItems.push(orderEntry);
    showStatus(`${personName} added to the group order.`);
  }

  saveCateringItems();

  els.groupPersonName.value = "";
  els.groupBurritoSelect.value = "";
  els.groupBeansCheckbox.checked = false;
  updateGroupBeansVisibility();
  renderGroupOrderList();
  els.groupPersonName.focus();
}

function renderGroupOrderList() {
  if (!els.groupOrderList) return;
  const groupTotal = state.cateringItems.reduce((sum, item) => sum + item.price, 0);
  if (els.addGroupPersonButton) {
    els.addGroupPersonButton.textContent = state.editingGroupUid ? "Save Person" : (state.cateringItems.length ? "Add Another Person" : "Add Person");
  }

  if (els.groupOrderStats) {
    if (!state.cateringItems.length) {
      els.groupOrderStats.innerHTML = `<span>Let's build your group order.</span><strong>Start by adding the first person below.</strong>`;
    } else {
      els.groupOrderStats.innerHTML = `<span>People Added: ${state.cateringItems.length}</span><strong>Total: ${formatMoney(groupTotal)}</strong>`;
    }
  }

  if (!state.cateringItems.length) {
    els.groupOrderList.innerHTML = `<div class="empty-cart"><strong>No individual orders added yet.</strong><p>Add the first person's name and burrito to start the group order.</p></div>`;
    return;
  }

  els.groupOrderList.innerHTML = `
    <div class="group-order-list-heading">
      <strong>Office & Group Orders</strong>
      <span>${state.cateringItems.length} burrito${state.cateringItems.length === 1 ? "" : "s"}</span>
    </div>
    ${state.cateringItems.map(item => `
      <div class="group-order-item ${state.editingGroupUid === item.uid ? "editing" : ""}">
        <div>
          <strong>✓ ${escapeHtml(item.personName)}</strong>
          <small>${escapeHtml(item.name)}${item.extras.length ? " + Beans" : ""}</small>
        </div>
        <strong>${formatMoney(item.price)}</strong>
        <div class="group-actions">
          <button type="button" data-edit-name="${item.uid}">Edit Name</button>
          <button type="button" data-edit-group="${item.uid}">Edit Burrito</button>
          <button type="button" data-duplicate-group="${item.uid}">Duplicate</button>
          <button type="button" data-remove-group="${item.uid}">Remove</button>
        </div>
      </div>
    `).join("")}
  `;

  els.groupOrderList.querySelectorAll("[data-remove-group]").forEach(button => {
    button.addEventListener("click", () => {
      state.cateringItems = state.cateringItems.filter(item => item.uid !== button.dataset.removeGroup);
      saveCateringItems();
      renderGroupOrderList();
    });
  });

  els.groupOrderList.querySelectorAll("[data-duplicate-group]").forEach(button => {
    button.addEventListener("click", () => {
      const item = state.cateringItems.find(entry => entry.uid === button.dataset.duplicateGroup);
      if (!item) return;

      const duplicateName = els.groupPersonName.value.trim();
      els.groupBurritoSelect.value = item.id;
      els.groupBeansCheckbox.checked = !isBeanAndCheese(item.id) && item.extras.some(extra => extra.id === "beans");
      updateGroupBeansVisibility();

      if (!duplicateName) {
        markGroupNameRequired();
        els.groupPersonName.scrollIntoView({ behavior: "smooth", block: "center" });
        els.groupPersonName.focus();
        showStatus("Enter the next name, then tap Duplicate again to add the same burrito.");
        return;
      }

      clearGroupNameRequired();
      state.cateringItems.push({
        uid: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
        personName: duplicateName,
        type: item.type,
        id: item.id,
        name: item.name,
        basePrice: item.basePrice,
        extras: isBeanAndCheese(item.id) ? [] : item.extras.map(extra => ({ ...extra })),
        price: isBeanAndCheese(item.id) ? item.basePrice : item.price
      });
      saveCateringItems();
      els.groupPersonName.value = "";
      els.groupBurritoSelect.value = "";
      els.groupBeansCheckbox.checked = false;
      renderGroupOrderList();
      els.groupPersonName.focus();
      showStatus(`Duplicated order added for ${duplicateName}.`);
    });
  });


  els.groupOrderList.querySelectorAll("[data-edit-name]").forEach(button => {
    button.addEventListener("click", () => {
      const item = state.cateringItems.find(entry => entry.uid === button.dataset.editName);
      if (!item) return;
      const updatedName = window.prompt("Update name", item.personName);
      if (updatedName === null) return;
      const cleanName = updatedName.trim();
      if (!cleanName) {
        showStatus("Name is required for this person.");
        return;
      }
      item.personName = cleanName;
      saveCateringItems();
      renderGroupOrderList();
      showStatus(`Name updated to ${cleanName}.`);
    });
  });

  els.groupOrderList.querySelectorAll("[data-edit-group]").forEach(button => {
    button.addEventListener("click", () => {
      const item = state.cateringItems.find(entry => entry.uid === button.dataset.editGroup);
      if (!item) return;
      state.editingGroupUid = item.uid;
      els.groupPersonName.value = item.personName;
      els.groupBurritoSelect.value = item.id;
      els.groupBeansCheckbox.checked = false;
      updateGroupBeansVisibility();
      renderGroupOrderList();
      els.groupBurritoSelect.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        els.groupBurritoSelect.focus();
        try { els.groupBurritoSelect.click(); } catch (error) { /* Some browsers block programmatic select opening. */ }
      }, 250);
      showStatus("Choose a new burrito, then tap Save Person.");
    });
  });
}


function handleGroupNameKeydown(event) {
  if (event.key !== "Enter") return;
  event.preventDefault();
  if (els.groupBurritoSelect) els.groupBurritoSelect.focus();
}

function preventCateringEnterSubmit(event) {
  if (event.key !== "Enter") return;
  const tag = event.target.tagName;
  const type = event.target.getAttribute("type");
  if (tag === "TEXTAREA") return;
  if (tag === "BUTTON" || type === "button" || type === "submit") return;
  event.preventDefault();
}

function markGroupNameRequired() {
  els.groupPersonName.classList.add("field-error");
  if (els.groupPersonNameHint) els.groupPersonNameHint.classList.remove("hidden");
}

function clearGroupNameRequired() {
  els.groupPersonName.classList.remove("field-error");
  if (els.groupPersonNameHint) els.groupPersonNameHint.classList.add("hidden");
}

function quickAddItem(itemId) {
  if (!SETTINGS.acceptingOrders) return showStatus("Online ordering is currently unavailable.");
  const item = findMenuItem(itemId);
  if (!item || item.soldOut) return;
  state.cart.push({
    uid: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    type: "burrito",
    id: item.id,
    name: item.name,
    basePrice: item.price,
    extras: [],
    price: item.price
  });
  saveCart();
  renderCart();
  els.cartFab.classList.remove("cart-pulse");
  void els.cartFab.offsetWidth;
  els.cartFab.classList.add("cart-pulse");
  showStatus(`✓ ${item.name} added to your order.`);
}

function quickAddBeverage(beverageId) {
  if (!SETTINGS.acceptingOrders) return showStatus("Online ordering is currently unavailable.");
  const item = MENU.beverages.find(beverage => beverage.id === beverageId && beverage.enabled);
  if (!item) return;

  state.cart.push({
    uid: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    type: "beverage",
    id: item.id,
    name: item.name,
    basePrice: item.price,
    extras: [],
    price: item.price
  });

  saveCart();
  renderCart();
  els.cartFab.classList.remove("cart-pulse");
  void els.cartFab.offsetWidth;
  els.cartFab.classList.add("cart-pulse");
  showStatus(`✓ ${item.name} added to your order.`);
}

function openCustomizer(itemId) {
  if (!SETTINGS.acceptingOrders) return showStatus("Online ordering is currently unavailable.");
  const item = findMenuItem(itemId);
  if (!item || item.soldOut) return;
  state.selectedItem = item;
  state.selectedQty = 1;
  els.modalItemName.textContent = item.name;
  els.modalItemDescription.textContent = item.description;
  els.beansCheckbox.checked = false;
  updateCustomizerBeansVisibility(item);
  setModalQty(1);
  els.customizeModal.showModal();
}

function setModalQty(qty) {
  state.selectedQty = Math.max(1, Math.min(SETTINGS.cateringLimit, qty));
  els.modalQty.textContent = state.selectedQty;
}

function addSelectedToCart() {
  if (!state.selectedItem) return;
  const beans = !isBeanAndCheese(state.selectedItem.id) && els.beansCheckbox.checked;
  for (let i = 0; i < state.selectedQty; i++) {
    state.cart.push({
      uid: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
      type: "burrito",
      id: state.selectedItem.id,
      name: state.selectedItem.name,
      basePrice: state.selectedItem.price,
      extras: beans ? [{ id: "beans", name: "Beans", price: 0.25 }] : [],
      price: state.selectedItem.price + (beans ? 0.25 : 0)
    });
  }
  saveCart();
  renderCart();
  els.customizeModal.close();
  const addedName = state.selectedItem.name;
  state.selectedItem = null;
  showStatus(`✓ ${addedName} added to your order.`);
  if (getBurritoCount() >= SETTINGS.cateringThreshold) showStatus("Large order detected. For 25 burritos or more, Office & Group Orders may be easier.");
}

function renderCart() {
  const totals = calculateTotals();
  els.cartFabCount.textContent = state.cart.length;
  if (els.stickyCartBar) {
    const itemLabel = `${state.cart.length} Item${state.cart.length === 1 ? "" : "s"}`;
    els.stickyCartSummary.textContent = `🛒 ${itemLabel}`;
    els.stickyCartTotal.textContent = formatMoney(totals.total);
    els.stickyCartBar.classList.toggle("hidden", state.cart.length === 0);
    document.body.classList.toggle("has-sticky-cart", state.cart.length > 0);
  }
  els.cartSubtotal.textContent = formatMoney(totals.subtotal);
  els.cartTax.textContent = formatMoney(totals.tax);
  els.cartTotal.textContent = formatMoney(totals.total);
  toggle(els.taxLine, SETTINGS.taxEnabled);

  if (!state.cart.length) {
    els.cartItems.innerHTML = `<div class="empty-cart"><strong>Your order is empty.</strong><p>Choose your favorite breakfast burrito to get started.</p></div>`;
    return;
  }

  els.cartItems.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>1 × ${item.name}</strong>
        ${item.extras.map(extra => `<small>+ ${extra.name}</small>`).join("")}
      </div>
      <div class="cart-item-actions">
        <span>${formatMoney(item.price)}</span>
        <button type="button" data-remove="${item.uid}">Remove</button>
      </div>
    </div>
  `).join("");

  els.cartItems.querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click", () => removeCartItem(button.dataset.remove));
  });
}

function removeCartItem(uid) {
  state.cart = state.cart.filter(item => item.uid !== uid);
  saveCart();
  renderCart();
}

function clearCart() {
  if (!state.cart.length) {
    return showStatus("Your breakfast order is already empty.");
  }

  const shouldClear = window.confirm("Clear your entire breakfast order and start over?");
  if (!shouldClear) return;

  state.cart = [];
  saveCart();
  renderCart();
  showStatus("Your breakfast order has been cleared.");
}


function clearReviewError() {
  if (!els.reviewError) return;
  els.reviewError.textContent = "";
  els.reviewError.classList.add("hidden");
}

function showReviewError(message) {
  if (!els.reviewError) return showStatus(message);
  els.reviewError.textContent = message;
  els.reviewError.classList.remove("hidden");
}

function getFieldLabel(field) {
  return field ? field.closest(".field-label") : null;
}

function clearFieldInvalid(field) {
  if (!field) return;
  field.classList.remove("field-error");
  const label = getFieldLabel(field);
  if (label) {
    label.classList.remove("field-label-error");
    const hint = label.querySelector(".validation-hint");
    if (hint) hint.remove();
  }
}

function markFieldInvalid(field, message) {
  if (!field) return;
  field.classList.add("field-error");
  const label = getFieldLabel(field);
  if (label) {
    label.classList.add("field-label-error");
    let hint = label.querySelector(".validation-hint");
    if (!hint) {
      hint = document.createElement("small");
      hint.className = "field-hint validation-hint";
      label.appendChild(hint);
    }
    hint.textContent = `* ${message}`;
  }
}

function clearOrderValidation() {
  [els.customerName, els.customerPhone, els.customerEmail].forEach(clearFieldInvalid);
}

function clearGroupValidation() {
  [els.cateringContact, els.cateringPhone, els.cateringEmail, els.groupPersonName, els.groupBurritoSelect].forEach(clearFieldInvalid);
}

function focusMissingField(field, message) {
  markFieldInvalid(field, message);
  if (field) {
    field.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => field.focus({ preventScroll: true }), 250);
  }
  showStatus(message);
}

function handleReviewOrder(event) {
  event.preventDefault();
  clearReviewError();
  clearOrderValidation();
  if (!state.cart.length) return focusMissingField(els.menuGrid, "Please add at least one item before reviewing your order.");
  if (!els.customerName.value.trim()) return focusMissingField(els.customerName, "Name is required.");
  if (!isValidPhone(els.customerPhone.value)) return focusMissingField(els.customerPhone, "Valid phone number is required.");
  if (!els.customerEmail.value.trim()) return focusMissingField(els.customerEmail, "Email address is required.");
  if (!isValidEmail(els.customerEmail.value.trim())) return focusMissingField(els.customerEmail, "Valid email address is required.");

  clearOrderValidation();
  const order = buildOrderPayload();
  state.pendingReviewType = "regular";
  state.pendingReviewOrder = order;
  els.reviewContent.innerHTML = renderReview(order);
  els.submitOrderButton.textContent = "Send Order";
  clearReviewError();
  els.reviewModal.showModal();
}

async function submitReviewedOrder() {
  if (state.isSubmittingOrder) return;
  clearReviewError();
  const order = state.pendingReviewOrder || buildOrderPayload();
  const type = state.pendingReviewType || "regular";
  const originalButtonText = type === "catering" ? "Send Group Order" : "Send Order";
  state.lastSubmittedOrder = order;
  state.isSubmittingOrder = true;
  els.submitOrderButton.disabled = true;
  els.submitOrderButton.classList.add("is-sending");
  els.submitOrderButton.innerHTML = `<span class="button-spinner" aria-hidden="true"></span><span>Sending your order...</span>`;
  showStatus("🌯 Sending your order to Mama Lu's...");

  try {
    if (type === "catering") {
      await sendCateringEmail(order);
      state.cateringCounter += 1;
      localStorage.setItem("ml_catering_counter", state.cateringCounter);
      resetCateringBuilder();
    } else {
      await sendOrderEmail(order);
      state.orderCounter += 1;
      localStorage.setItem("ml_order_counter", state.orderCounter);
      state.cart = [];
      saveCart();
      renderCart();
    }

    els.reviewModal.close();
    els.confirmationOrderNumber.textContent = order.orderNumber;
    const receiptEmail = type === "catering" ? order.email : order.customer.email;
    if (els.confirmationEmail) els.confirmationEmail.textContent = receiptEmail || "your email";
    els.confirmationModal.showModal();
  } catch (error) {
    console.error(error);
    const detail = error && error.message ? error.message : String(error);
    showReviewError(`EmailJS debug: ${detail}`);
    showStatus("Order was not sent. See the EmailJS debug message in the review window.");
  } finally {
    state.isSubmittingOrder = false;
    els.submitOrderButton.disabled = false;
    els.submitOrderButton.classList.remove("is-sending");
    els.submitOrderButton.textContent = originalButtonText;
  }
}

function resetCateringBuilder() {
  state.cateringItems = [];
  state.editingGroupUid = null;
  ["cateringCompany", "cateringContact", "cateringPhone", "cateringEmail", "cateringInstructions"].forEach(id => {
    const field = document.getElementById(id);
    if (field) field.value = "";
  });
  if (els.groupPersonName) els.groupPersonName.value = "";
  if (els.groupBurritoSelect) els.groupBurritoSelect.value = "";
  if (els.groupBeansCheckbox) els.groupBeansCheckbox.checked = false;
  const textPref = document.querySelector('input[name="cateringContactPreference"][value="Text"]');
  if (textPref) textPref.checked = true;
  saveCateringItems();
  renderGroupOrderList();
}

function resetOrder() {
  els.confirmationModal.close();
  els.customerForm.reset();
  initializePhoneField(els.customerPhone);
  document.querySelector('input[name="contactPreference"][value="Text"]').checked = true;
  state.pendingReviewOrder = null;
  state.pendingReviewType = "regular";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function reviewCateringOrder() {
  clearReviewError();
  clearGroupValidation();
  const company = els.cateringCompany ? els.cateringCompany.value.trim() : "";
  const contact = els.cateringContact.value.trim();
  const phone = els.cateringPhone.value.trim();
  const email = els.cateringEmail.value.trim();

  if (!contact) return focusMissingField(els.cateringContact, "Contact name is required.");
  if (!isValidPhone(phone)) return focusMissingField(els.cateringPhone, "Valid phone number is required.");
  if (!email) return focusMissingField(els.cateringEmail, "Email address is required.");
  if (!isValidEmail(email)) return focusMissingField(els.cateringEmail, "Valid email address is required.");
  if (!state.cateringItems.length) return focusMissingField(els.groupPersonName, "Add at least one person before reviewing.");

  clearGroupValidation();
  const order = buildCateringPayload();
  state.pendingReviewType = "catering";
  state.pendingReviewOrder = order;
  els.reviewContent.innerHTML = renderCateringReview(order);
  els.submitOrderButton.textContent = "Send Group Order";
  clearReviewError();
  if (els.cateringModal.open) els.cateringModal.close();
  els.reviewModal.showModal();
}

function buildOrderPayload() {
  const totals = calculateTotals();
  return {
    orderNumber: `ML-${state.orderCounter}`,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    customer: {
      name: els.customerName.value.trim(),
      phone: els.customerPhone.value.trim(),
      email: els.customerEmail.value.trim(),
      contactPreference: document.querySelector('input[name="contactPreference"]:checked').value,
      specialInstructions: els.specialInstructions.value.trim()
    },
    items: state.cart,
    totals
  };
}

function buildCateringPayload() {
  const items = state.cateringItems.map(item => ({ ...item }));
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = SETTINGS.taxEnabled ? subtotal * SETTINGS.taxRate : 0;
  return {
    orderNumber: `ML-G${state.cateringCounter}`,
    date: new Date().toLocaleDateString(),
    timeSubmitted: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    company: document.getElementById("cateringCompany").value.trim() || "Office & Group Order",
    contactName: document.getElementById("cateringContact").value.trim(),
    phone: document.getElementById("cateringPhone").value.trim(),
    email: document.getElementById("cateringEmail").value.trim(),
    contactPreference: document.querySelector('input[name="cateringContactPreference"]:checked').value,
    items,
    estimatedBurritos: items.length,
    specialInstructions: document.getElementById("cateringInstructions").value.trim(),
    totals: { subtotal, tax, total: subtotal + tax },
    requiresManualPricing: false
  };
}

function renderReview(order) {
  return `
    <div class="review-block"><h3>${order.orderNumber}</h3><p>${order.date} at ${order.time}</p></div>
    <div class="review-block"><h3>Order</h3>${order.items.map(item => `<p><strong>1 × ${item.name}</strong>${item.extras.map(extra => `<br><span>+ ${extra.name}</span>`).join("")}</p>`).join("")}</div>
    <div class="review-block"><h3>Customer</h3><p>${escapeHtml(order.customer.name)}<br>${escapeHtml(order.customer.phone)}${order.customer.email ? `<br>${escapeHtml(order.customer.email)}` : ""}<br>Preferred Contact: ${order.customer.contactPreference}</p>${order.customer.specialInstructions ? `<p><strong>Notes:</strong><br>${escapeHtml(order.customer.specialInstructions)}</p>` : ""}</div>
    <div class="review-totals"><div><span>Subtotal</span><strong>${formatMoney(order.totals.subtotal)}</strong></div>${SETTINGS.taxEnabled ? `<div><span>Tax</span><strong>${formatMoney(order.totals.tax)}</strong></div>` : ""}<div><span>Total</span><strong>${formatMoney(order.totals.total)}</strong></div></div>
  `;
}

function renderCateringReview(order) {
  return `
    <div class="review-block"><h3>${order.orderNumber}</h3><p>${order.date} at ${order.timeSubmitted}</p></div>
    <div class="review-block"><h3>Group</h3><p><strong>${escapeHtml(order.company)}</strong><br>${escapeHtml(order.contactName)}<br>${escapeHtml(order.phone)}${order.email ? `<br>${escapeHtml(order.email)}` : ""}<br>Preferred Contact: ${order.contactPreference}</p></div>
    <div class="review-block"><h3>Individual Orders</h3>${order.items.map(item => `<p><strong>${escapeHtml(item.personName)}</strong><br>1 × ${escapeHtml(item.name)}${item.extras.map(extra => `<br><span>+ ${escapeHtml(extra.name)}</span>`).join("")}</p>`).join("")}<p><strong>Total burritos:</strong> ${order.estimatedBurritos}</p></div>
    ${order.specialInstructions ? `<div class="review-block"><h3>Special Instructions</h3><p>${escapeHtml(order.specialInstructions)}</p></div>` : ""}
    <div class="review-totals"><div><span>Subtotal</span><strong>${formatMoney(order.totals.subtotal)}</strong></div>${SETTINGS.taxEnabled ? `<div><span>Tax</span><strong>${formatMoney(order.totals.tax)}</strong></div>` : ""}<div><span>Total</span><strong>${formatMoney(order.totals.total)}</strong></div></div>
  `;
}

function calculateTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price, 0);
  const tax = SETTINGS.taxEnabled ? subtotal * SETTINGS.taxRate : 0;
  return { subtotal, tax, total: subtotal + tax };
}

function getBurritoCount() {
  return state.cart.filter(item => item.type === "burrito").length;
}

function findMenuItem(id) {
  return MENU.categories.flatMap(category => category.items).find(item => item.id === id);
}

function openCart() {
  els.cartDrawer.classList.add("open");
  els.cartDrawer.setAttribute("aria-hidden", "false");
  els.drawerBackdrop.classList.remove("hidden");
}

function closeCart() {
  els.cartDrawer.classList.remove("open");
  els.cartDrawer.setAttribute("aria-hidden", "true");
  els.drawerBackdrop.classList.add("hidden");
}

function initializePhoneField(input) {
  if (!input) return;
  if (!input.value.trim()) input.value = `(${SETTINGS.defaultAreaCode}) `;
}

function ensureAreaCode(input) {
  if (!input) return;
  if (!input.value.replace(/\D/g, "")) {
    input.value = `(${SETTINGS.defaultAreaCode}) `;
  }
}

function formatPhone(value) {
  let digits = value.replace(/\D/g, "").slice(0, 10);
  const defaultArea = SETTINGS.defaultAreaCode || "915";

  if (!digits) digits = defaultArea;

  const a = digits.slice(0, 3);
  const b = digits.slice(3, 6);
  const c = digits.slice(6, 10);
  if (digits.length > 6) return `(${a}) ${b}-${c}`;
  if (digits.length > 3) return `(${a}) ${b}`;
  if (digits.length === 3) return `(${a}) `;
  if (digits.length > 0) return `(${a}`;
  return "";
}

function isValidPhone(value) {
  return /^\(\d{3}\) \d{3}-\d{4}$/.test(value);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

function formatMoney(value) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function formatMenuPrice(value) {
  return Number.isInteger(value) ? `$${value}` : formatMoney(value);
}

function showStatus(message) {
  els.statusMessage.textContent = message;
  els.statusMessage.classList.remove("hidden");
  setTimeout(() => els.statusMessage.classList.add("hidden"), 4500);
}

function toggle(element, shouldShow) {
  element.classList.toggle("hidden", !shouldShow);
}

function saveCart() {
  localStorage.setItem("ml_cart", JSON.stringify(state.cart));
}

function loadCart() {
  try { return JSON.parse(localStorage.getItem("ml_cart")) || []; }
  catch { return []; }
}

function saveCateringItems() {
  localStorage.setItem("ml_catering_items", JSON.stringify(state.cateringItems));
}

function loadCateringItems() {
  try { return JSON.parse(localStorage.getItem("ml_catering_items")) || []; }
  catch { return []; }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
}
