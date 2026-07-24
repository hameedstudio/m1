/* ============================================================
   HAMEED STUDIO — Cart logic (shared across all pages)
   Cart is stored in localStorage under the key "hameed_cart" so
   it persists between the Home / Products / Product / Cart pages.
   ============================================================ */

const CART_KEY = "hameed_cart";
const DELIVERY_CHARGES = 299;  // flat delivery charge added to every order
const TAX_RATE = 0.12;         // 12% tax, applied automatically on the subtotal — change the rate here
const PICKUP_BRANCHES = [
  "Shaheenabad , GRW",
  "Civic Centre , GRW",
  "Opp. General Bus Stand, G.T. Road, GRW",
  "Sui Gas Road, GRW",
  "Near KING'S Mall , GRW",
  "31-C, Small Industrial Estate-1, GRW"
];
const PROMO_CODES = {          // add / edit promo codes here
  "14AUG": 200,
  "HS50": 500
};

/* Some browsers (mainly Firefox, or private/incognito windows) block
   localStorage when a page is opened straight from disk (file://
   instead of http://), or when storage is disabled by the user. To
   make sure the cart NEVER resets while browsing the site, we fall
   back to a cookie (which works almost everywhere) and only fall
   back further to a plain in-memory array as an absolute last
   resort. The memory fallback is the only case that can't survive a
   full page reload — running the site through a real server/domain
   (which is how it works on hameedstudio.com.pk) avoids that
   entirely, since normal localStorage works fine there. */
let _memoryCart = [];
let _storageOK = true;
let selectedDeliveryService = "home-delivery";
let selectedPickupBranch = "";
try {
  localStorage.setItem("__hs_test__", "1");
  localStorage.removeItem("__hs_test__");
} catch (e) {
  _storageOK = false;
}

/* ---- Cookie fallback helpers (used only if localStorage fails) ---- */
function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function getCart() {
  if (_storageOK) {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      _storageOK = false;
    }
  }
  // localStorage failed — try the cookie fallback before memory.
  try {
    const cookieVal = getCookie(CART_KEY);
    if (cookieVal) return JSON.parse(cookieVal);
  } catch (e) { /* fall through to memory */ }
  return _memoryCart;
}

function saveCart(cart) {
  let saved = false;
  if (_storageOK) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      saved = true;
    } catch (e) {
      _storageOK = false;
    }
  }
  if (!saved) {
    try {
      setCookie(CART_KEY, JSON.stringify(cart));
      saved = true;
    } catch (e) { /* cookie failed too */ }
  }
  _memoryCart = cart; // always keep memory in sync as the final safety net
  updateCartCountBadge();
}

/* Adds an item. If the same product + same variant combo already
   exists in the cart, it just increases the quantity. */
function addToCart({ id, name, image, price, qty, variantLabel }) {
  const cart = getCart();
  const key = id + "|" + (variantLabel || "");
  const existing = cart.find(item => item.key === key);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ key, id, name, image, price, qty, variantLabel: variantLabel || "" });
  }
  saveCart(cart);
}

function removeFromCart(key) {
  const cart = getCart().filter(item => item.key !== key);
  saveCart(cart);
}

function setQty(key, qty) {
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, qty);
  saveCart(cart);
}

function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function cartSubtotal() {
  return getCart().reduce((sum, i) => sum + i.qty * i.price, 0);
}

/* 12% tax, calculated automatically from the subtotal. Rounded to
   the nearest rupee so the total doesn't show paisa. */
function cartTax(subtotal = cartSubtotal()) {
  return Math.round(subtotal * TAX_RATE);
}

function getDeliveryService() {
  return selectedDeliveryService;
}

function setDeliveryService(service) {
  selectedDeliveryService = service === "pickup" ? "pickup" : "home-delivery";
  if (selectedDeliveryService !== "pickup") {
    selectedPickupBranch = "";
  }
}

function getPickupBranch() {
  return selectedPickupBranch;
}

function setPickupBranch(branch) {
  selectedPickupBranch = branch;
}

function getPickupBranches() {
  return PICKUP_BRANCHES;
}

function cartDeliveryCharges() {
  return getDeliveryService() === "pickup" ? 0 : DELIVERY_CHARGES;
}

function cartDeliveryLabel() {
  return getDeliveryService() === "pickup" ? "Pickup Service" : "Home Delivery";
}

/* Full order total: subtotal - discount (promo code) + delivery charges + tax.
   Pass the discount amount in rupees if a promo code is applied,
   otherwise leave it out. Use this wherever the cart page shows the
   final "Total" so tax is always included automatically. */
function cartTotal(discount = 0) {
  const discountedSubtotal = Math.max(0, cartSubtotal() - discount);
  return discountedSubtotal + cartDeliveryCharges() + cartTax(discountedSubtotal);
}

function clearCart() {
  if (_storageOK) {
    try {
      localStorage.removeItem(CART_KEY);
    } catch (e) {
      /* ignore, cookie/memory below still get cleared */
    }
  }
  try {
    setCookie(CART_KEY, "", -1); // expire the cookie immediately
  } catch (e) { /* ignore */ }
  _memoryCart = [];
  updateCartCountBadge();
}

function updateCartCountBadge() {
  document.querySelectorAll(".cart-count").forEach(el => {
    const count = cartCount();
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

function formatRs(n) {
  return "Rs. " + n.toLocaleString("en-PK");
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg><span></span>`;
    document.body.appendChild(toast);
  }
  toast.querySelector("span").textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.addEventListener("DOMContentLoaded", updateCartCountBadge);