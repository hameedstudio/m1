/* ============================================================
   HAMEED STUDIO — Package selection "cart" + WhatsApp checkout
   Shared between packages.html and package-detail.html so a
   package added on one page still shows up in "Your Selection"
   on the other (stored in localStorage, same as cart.js does
   for products — see js/cart.js for the storage-fallback notes).

   Pages using this file must include, somewhere in the page,
   the "Your Selection" markup with these ids:
     #pkg-selection-empty   #pkg-selection-list
     #pkg-selection-total   #pkg-whatsapp-btn
   The floating summary pill is optional:
     #pkg-floating-btn  #pkg-floating-count  #pkg-floating-total
   ============================================================ */

const PKG_SELECTION_KEY = "hameed_pkg_selection";
const WHATSAPP_NUMBER = "923338181082"; // 0333 8181082 in international format
let _pkgMemorySelection = [];

function getSelection() {
  try {
    return JSON.parse(localStorage.getItem(PKG_SELECTION_KEY)) || [];
  } catch (e) {
    return _pkgMemorySelection;
  }
}

function saveSelection(selection) {
  try {
    localStorage.setItem(PKG_SELECTION_KEY, JSON.stringify(selection));
  } catch (e) { /* fall back to memory below */ }
  _pkgMemorySelection = selection;
  renderSelection();
}

function addToSelection(key, label, price) {
  const selection = getSelection();
  const existing = selection.find(item => item.key === key);
  if (existing) {
    existing.qty += 1;
  } else {
    selection.push({ key, label, price, qty: 1 });
  }
  saveSelection(selection);
  showToast(`${label} added to your selection`);
}

function changeSelectionQty(key, delta) {
  const selection = getSelection();
  const item = selection.find(i => i.key === key);
  if (!item) return;
  item.qty += delta;
  const filtered = item.qty <= 0 ? selection.filter(i => i.key !== key) : selection;
  saveSelection(filtered);
}

function removeFromSelection(key) {
  saveSelection(getSelection().filter(i => i.key !== key));
}

function buildWhatsappLink(selection, total) {
  const lines = selection.map(i => `• ${i.label} x${i.qty} — ${formatRs(i.price * i.qty)}`);
  const message =
    "Hi Hameed Studio! I'd like to book the following:\n\n" +
    lines.join("\n") +
    `\n\nTotal: ${formatRs(total)}\n\nPlease confirm availability.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* Single-package "ask about this" link, used on the Package Detail page. */
function buildSingleWhatsappLink(pkg) {
  const message = `Hi Hameed Studio! I'm interested in the "${pkg.title}" package (${formatRs(pkg.price)}). Could you confirm availability for my event date?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderSelection() {
  const emptyEl = document.getElementById("pkg-selection-empty");
  const listEl = document.getElementById("pkg-selection-list");
  const totalEl = document.getElementById("pkg-selection-total");
  const whatsappBtn = document.getElementById("pkg-whatsapp-btn");
  const floatingBtn = document.getElementById("pkg-floating-btn");
  const floatingCountEl = document.getElementById("pkg-floating-count");
  const floatingTotalEl = document.getElementById("pkg-floating-total");

  // These elements aren't on every page — bail out quietly if absent.
  if (!emptyEl || !listEl || !totalEl || !whatsappBtn) return;

  const selection = getSelection();

  if (!selection.length) {
    emptyEl.style.display = "block";
    listEl.innerHTML = "";
    totalEl.textContent = formatRs(0);
    whatsappBtn.classList.add("disabled");
    whatsappBtn.setAttribute("aria-disabled", "true");
    whatsappBtn.href = "#";
    if (floatingBtn) floatingBtn.style.display = "none";
    return;
  }

  emptyEl.style.display = "none";
  listEl.innerHTML = selection.map(item => `
    <div class="pkg-selected-row">
      <div class="pkg-selected-info">
        <b>${item.label}</b>
        <span>${formatRs(item.price)} each</span>
      </div>
      <div class="pkg-qty-col">
        <button type="button" class="pkg-qty-btn" data-key="${item.key}" data-delta="-1" aria-label="Decrease quantity">−</button>
        <span>${item.qty}</span>
        <button type="button" class="pkg-qty-btn" data-key="${item.key}" data-delta="1" aria-label="Increase quantity">+</button>
      </div>
      <div class="pkg-selected-price">${formatRs(item.price * item.qty)}</div>
      <button type="button" class="pkg-remove-btn" data-key="${item.key}" aria-label="Remove">×</button>
    </div>
  `).join("");

  const total = selection.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = selection.reduce((sum, i) => sum + i.qty, 0);
  totalEl.textContent = formatRs(total);
  whatsappBtn.classList.remove("disabled");
  whatsappBtn.removeAttribute("aria-disabled");
  whatsappBtn.href = buildWhatsappLink(selection, total);

  if (floatingBtn) {
    floatingBtn.style.display = "flex";
    floatingCountEl.textContent = count;
    floatingTotalEl.textContent = formatRs(total);
  }
}

document.addEventListener("click", event => {
  const addPkgBtn = event.target.closest(".add-pkg-btn");
  if (addPkgBtn) {
    addToSelection(addPkgBtn.dataset.key, addPkgBtn.dataset.label, Number(addPkgBtn.dataset.price));
    return;
  }
  const addAddonBtn = event.target.closest(".add-addon-btn");
  if (addAddonBtn) {
    addToSelection(addAddonBtn.dataset.key, addAddonBtn.dataset.label, Number(addAddonBtn.dataset.price));
    return;
  }
  const qtyBtn = event.target.closest(".pkg-qty-btn");
  if (qtyBtn) {
    changeSelectionQty(qtyBtn.dataset.key, Number(qtyBtn.dataset.delta));
    return;
  }
  const removeBtn = event.target.closest(".pkg-remove-btn");
  if (removeBtn) {
    removeFromSelection(removeBtn.dataset.key);
    return;
  }
  const floatBtn = event.target.closest("#pkg-floating-btn");
  if (floatBtn) {
    document.getElementById("pkg-order-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  const whatsappBtn = event.target.closest("#pkg-whatsapp-btn");
  if (whatsappBtn && !getSelection().length) {
    event.preventDefault();
  }
});

document.addEventListener("DOMContentLoaded", renderSelection);
