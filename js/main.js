/* ============================================================
   HAMEED STUDIO — Shared UI behaviour (nav, product cards, etc.)
   ============================================================ */

function initMobileNav() {
  const btn = document.querySelector(".hamburger");
  const nav = document.querySelector(".mobile-nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => nav.classList.toggle("open"));
}

function renderStars(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

/* Builds one product card's HTML. Used on Home + All Products pages. */
function productCardHTML(p) {
  const img = p.images[0].src;
  const badge = p.category === "Deals" ? `<span class="badge">${p.badge}</span>` : "";
  const strike = p.category === "Deals" && p.oldPrice ? `<span class="price-strike">${formatRs(p.oldPrice)}</span>` : "";
  return `
    <div class="product-card">
      <a href="product.html?id=${p.id}" class="product-thumb">
        ${badge}
        <img src="${img}" alt="${p.name}" loading="lazy">
      </a>
      <div class="product-info">
        <a href="product.html?id=${p.id}"><h3>${p.name}</h3></a>
        
        <div class="price-row">
          <span class="price">${formatRs(p.price)}</span>
          ${strike}
        </div>
        <button class="add-cart-btn" onclick="quickAddToCart('${p.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
          Add to Cart
        </button>
      </div>
    </div>`;
}

function renderProductGrid(container, products) {
  container.innerHTML = products.map(productCardHTML).join("");
}

/* Builds one package pricing card's HTML. Used on the Packages page
   and the "Related Packages" section of the Package Detail page.
   Needs js/packages.js (for the data shape) loaded before this. */
function packageCardHTML(pkg) {
  const pkgCheckIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`;
  return `
    <div class="pkg-card ${pkg.highlight ? "highlight" : ""}">
      ${pkg.highlight ? `<span class="pkg-ribbon">Most Popular</span>` : ""}
      <div class="pkg-duration">${pkg.duration}</div>
      <a href="package-detail.html?id=${pkg.id}"><h3>${pkg.title}</h3></a>
      <div class="pkg-price">${formatRs(pkg.price)} <span>/ event</span></div>
      <ul class="pkg-features">
        ${pkg.features.map(f => `<li>${pkgCheckIcon}<span>${f}</span></li>`).join("")}
      </ul>
      <div class="pkg-card-actions">
        <a href="package-detail.html?id=${pkg.id}" class="btn btn-outline">Details</a>
        <button type="button" class="btn ${pkg.highlight ? "btn-gold" : "btn-primary"} add-pkg-btn"
          data-key="${pkg.id}" data-label="${pkg.title.replace(/"/g, "&quot;")}" data-price="${pkg.price}">
          Add
        </button>
      </div>
    </div>`;
}

/* Quick-add from a grid card (Home / Products page).
   If the product has NO colour/size options, it's added straight
   away like before. If it DOES have options, we don't guess —
   a popup opens asking the shopper to pick colour/size themselves,
   exactly like the product detail page, and only adds to cart once
   they confirm. */
function quickAddToCart(id) {
  const p = getProductById(id);
  if (!p) return;

  if (!p.options || (!p.options.color && !p.options.size)) {
    addToCart({
      id: p.id,
      name: p.name,
      image: p.images[0].src,
      price: p.price,
      qty: 1,
      variantLabel: ""
    });
    showToast(`${p.name} added to cart`);
    return;
  }

  openQuickAddModal(p);
}

/* ------------------------------------------------------------
   Quick-Add options popup — shown when "Add to Cart" is clicked
   directly from a product card (Home / Products grid) for a
   product that has colour and/or size options. Mirrors the same
   swatch / size-pill markup used on the product detail page so it
   looks consistent, but lives entirely in this file so it works on
   every page that includes main.js.
   ------------------------------------------------------------ */
let _qaState = null;
let _qaProduct = null;

function ensureQuickAddModal() {
  if (document.getElementById("quick-add-overlay")) return;

  if (!document.getElementById("quick-add-styles")) {
    const style = document.createElement("style");
    style.id = "quick-add-styles";
    style.textContent = `
      .quick-add-overlay{
        position:fixed;inset:0;background:rgba(10,20,40,.55);
        backdrop-filter:blur(3px);z-index:999;
        display:none;align-items:center;justify-content:center;
        padding:20px;
      }
      .quick-add-overlay.open{display:flex;}
      .quick-add-modal{
        background:#fff;border-radius:18px;width:100%;max-width:420px;
        max-height:88vh;overflow:hidden;display:flex;flex-direction:column;
        box-shadow:0 25px 60px -10px rgba(10,30,80,.35);
        animation:qaPop .25s ease;
      }
      @keyframes qaPop{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
      .quick-add-head{
        display:flex;align-items:center;justify-content:space-between;gap:10px;
        padding:16px 20px;border-bottom:1px solid #eef1f7;
      }
      .quick-add-head-info{display:flex;align-items:center;gap:12px;min-width:0;}
      .quick-add-head-info img{width:48px;height:48px;border-radius:10px;object-fit:cover;flex-shrink:0;}
      .quick-add-head-info h3{margin:0;font-size:1rem;font-family:'Fraunces',serif;color:#0d2c66;
        overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
      .quick-add-close{
        background:#f2f4f8;border:none;width:32px;height:32px;border-radius:50%;
        display:flex;align-items:center;justify-content:center;cursor:pointer;
        color:#333;transition:.2s;flex-shrink:0;
      }
      .quick-add-close:hover{background:#e3e7ef;}
      .quick-add-close svg{width:16px;height:16px;}
      .quick-add-body{padding:16px 20px;overflow-y:auto;}
      .quick-add-body .option-group{margin-bottom:16px;}
      .quick-add-body .option-group h4{margin:0 0 8px;font-size:.9rem;color:#333;}
      .quick-add-body .option-selected-label{font-weight:500;color:#6b7280;}
      .quick-add-body .swatches{display:flex;flex-wrap:wrap;gap:8px;}
      .quick-add-body .swatch{width:40px;height:40px;border-radius:8px;overflow:hidden;cursor:pointer;
        border:2px solid transparent;}
      .quick-add-body .swatch img{width:100%;height:100%;object-fit:cover;display:block;}
      .quick-add-body .swatch.selected{border-color:#1550b8;}
      .quick-add-body .color-dot{width:32px;height:32px;border-radius:50%;cursor:pointer;
        border:2px solid #e5e7eb;box-shadow:inset 0 0 0 2px #fff;}
      .quick-add-body .color-dot.selected{border-color:#1550b8;}
      .quick-add-body .size-row{display:flex;flex-wrap:wrap;gap:8px;}
      .quick-add-body .size-pill{padding:7px 14px;border-radius:8px;border:1.5px solid #e0e4ea;
        background:#fff;cursor:pointer;font-size:.88rem;font-weight:600;color:#333;transition:.15s;}
      .quick-add-body .size-pill.selected{border-color:#1550b8;background:#eaf1ff;color:#1550b8;}
      .quick-add-price{font-weight:700;font-size:1.1rem;color:#0d2c66;margin-bottom:14px;}
      .quick-add-foot{padding:14px 20px;border-top:1px solid #eef1f7;}
      .quick-add-confirm-btn{width:100%;}
      @media (max-width:480px){
        .quick-add-modal{border-radius:14px;max-height:85vh;}
        .quick-add-head{padding:12px 14px;}
        .quick-add-body{padding:12px 14px;}
        .quick-add-foot{padding:12px 14px;}
      }
    `;
    document.head.appendChild(style);
  }

  const overlay = document.createElement("div");
  overlay.id = "quick-add-overlay";
  overlay.className = "quick-add-overlay";
  overlay.innerHTML = `
    <div class="quick-add-modal">
      <div class="quick-add-head">
        <div class="quick-add-head-info">
          <img id="qa-img" src="" alt="">
          <h3 id="qa-title"></h3>
        </div>
        <button type="button" class="quick-add-close" id="qa-close" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="quick-add-body" id="qa-body"></div>
      <div class="quick-add-foot">
        <div class="quick-add-price" id="qa-price"></div>
        <button type="button" class="btn btn-primary quick-add-confirm-btn" id="qa-confirm">Add to Cart</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeQuickAddModal();
  });
  document.getElementById("qa-close").addEventListener("click", closeQuickAddModal);
  document.getElementById("qa-confirm").addEventListener("click", confirmQuickAdd);
}

function openQuickAddModal(product) {
  ensureQuickAddModal();
  _qaProduct = product;
  _qaState = {
    color: product.options?.color ? product.options.color[0].name : null,
    size: product.options?.size ? (typeof product.options.size[0] === "object" ? product.options.size[0].name : product.options.size[0]) : null,
    pages: product.options?.size?.find(s => Array.isArray(s.pages))?.pages?.[0]?.label || null
  };

  document.getElementById("qa-img").src = product.images[0].src;
  document.getElementById("qa-img").alt = product.name;
  document.getElementById("qa-title").textContent = product.name;

  renderQuickAddBody();
  document.getElementById("quick-add-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeQuickAddModal() {
  const overlay = document.getElementById("quick-add-overlay");
  if (overlay) overlay.classList.remove("open");
  document.body.style.overflow = "";
  _qaProduct = null;
  _qaState = null;
}

function renderQuickAddBody() {
  const product = _qaProduct;
  const state = _qaState;
  const body = document.getElementById("qa-body");

  const selectedSizeEntry = product.options?.size?.find(s => (typeof s === "object" && s.name === state.size) || (typeof s !== "object" && s === state.size));
  const pageOptions = selectedSizeEntry?.pages || null;

  const colorBlock = product.options?.color ? `
    <div class="option-group">
      <h4>Design / Colour <span class="option-selected-label">— ${state.color}</span></h4>
      <div class="swatches">
        ${product.options.color.map(c => c.img ? `
          <div class="swatch ${state.color === c.name ? "selected" : ""}" data-color="${c.name}" title="${c.name}">
            <img src="${c.img}" alt="${c.name}">
          </div>` : `
          <div class="color-dot ${state.color === c.name ? "selected" : ""}" data-color="${c.name}" title="${c.name}" style="background:${c.hex}"></div>
        `).join("")}
      </div>
    </div>` : "";

  const sizeBlock = product.options?.size ? `
    <div class="option-group">
      <h4>Size <span class="option-selected-label">— ${state.size}</span></h4>
      <div class="size-row">
        ${product.options.size.map(s => {
          const label = typeof s === "object" ? s.name : s;
          return `<button type="button" class="size-pill ${state.size === label ? "selected" : ""}" data-size="${label}">${label}</button>`;
        }).join("")}
      </div>
    </div>` : "";

  const pagesBlock = pageOptions ? `
    <div class="option-group">
      <h4>Pages <span class="option-selected-label">— ${state.pages || pageOptions[0].label}</span></h4>
      <div class="size-row">
        ${pageOptions.map(p => `<button type="button" class="size-pill ${state.pages === p.label ? "selected" : ""}" data-page="${p.label}">${p.label}</button>`).join("")}
      </div>
    </div>` : "";

  body.innerHTML = colorBlock + sizeBlock + pagesBlock;

  body.querySelectorAll("[data-color]").forEach(el => {
    el.addEventListener("click", () => {
      _qaState.color = el.dataset.color;
      renderQuickAddBody();
      updateQuickAddPrice();
    });
  });
  body.querySelectorAll("[data-size]").forEach(el => {
    el.addEventListener("click", () => {
      _qaState.size = el.dataset.size;
      const entry = product.options.size.find(s => (typeof s === "object" ? s.name : s) === el.dataset.size);
      _qaState.pages = Array.isArray(entry?.pages) ? entry.pages[0].label : null;
      renderQuickAddBody();
      updateQuickAddPrice();
    });
  });
  body.querySelectorAll("[data-page]").forEach(el => {
    el.addEventListener("click", () => {
      _qaState.pages = el.dataset.page;
      renderQuickAddBody();
      updateQuickAddPrice();
    });
  });

  updateQuickAddPrice();
}

function updateQuickAddPrice() {
  const price = getProductPrice(_qaProduct, { size: _qaState.size, pages: _qaState.pages });
  document.getElementById("qa-price").textContent = formatRs(price);
}

function confirmQuickAdd() {
  const product = _qaProduct;
  const state = _qaState;
  const price = getProductPrice(product, { size: state.size, pages: state.pages });
  const labels = [];
  if (state.color) labels.push(state.color);
  if (state.size) labels.push(state.size + (state.pages ? ` / ${state.pages}` : ""));

  addToCart({
    id: product.id,
    name: product.name,
    image: product.images[0].src,
    price,
    qty: 1,
    variantLabel: labels.join(" / ")
  });
  showToast(`${product.name} added to cart`);
  closeQuickAddModal();
}

/* ------------------------------------------------------------
   Hero slider — arrows, autoplay and touch swipe (mobile + tablet)
   ------------------------------------------------------------ */
function initHeroSlider() {
  const heroSlider = document.querySelector(".hero-slider");
  const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
  if (!heroSlider || !heroSlides.length) return;

  const heroPrev = document.querySelector(".hero-slider-btn.prev");
  const heroNext = document.querySelector(".hero-slider-btn.next");

  let heroIndex = 0;
  let autoplayTimer = null;

  // Touch/swipe tracking
  let touchStartX = 0;
  let touchStartY = 0;
  let touchDeltaX = 0;
  let isSwiping = false;
  const SWIPE_THRESHOLD = 40; // px — how far a swipe must travel to trigger a slide change

  function showHeroSlide(index) {
    heroIndex = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, i) => slide.classList.toggle("active", i === heroIndex));
  }

  function nextHeroSlide() { showHeroSlide(heroIndex + 1); }
  function prevHeroSlide() { showHeroSlide(heroIndex - 1); }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextHeroSlide, 6000);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  heroPrev?.addEventListener("click", () => { prevHeroSlide(); startAutoplay(); });
  heroNext?.addEventListener("click", () => { nextHeroSlide(); startAutoplay(); });

  /* Touch events: pause autoplay while the finger is down, follow
     the finger horizontally, and only treat it as a swipe (not a
     vertical page scroll) once horizontal movement dominates. */
  heroSlider.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    touchDeltaX = 0;
    isSwiping = false;
    stopAutoplay();
  }, { passive: true });

  heroSlider.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];
    touchDeltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (!isSwiping && Math.abs(touchDeltaX) > Math.abs(deltaY) && Math.abs(touchDeltaX) > 10) {
      isSwiping = true;
    }
    // Once we know it's a horizontal swipe, stop the page from scrolling
    if (isSwiping && event.cancelable) {
      event.preventDefault();
    }
  }, { passive: false });

  heroSlider.addEventListener("touchend", () => {
    if (isSwiping) {
      if (touchDeltaX > SWIPE_THRESHOLD) {
        prevHeroSlide();
      } else if (touchDeltaX < -SWIPE_THRESHOLD) {
        nextHeroSlide();
      }
    }
    isSwiping = false;
    touchDeltaX = 0;
    startAutoplay();
  });

  showHeroSlide(0);
  startAutoplay();
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initHeroSlider();
});
