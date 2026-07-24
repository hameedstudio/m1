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

/* Quick-add from a grid card: uses the first option of each
   variant type as the default, so it works whether the product
   has color, size, both, or neither. */
function quickAddToCart(id) {
  const p = getProductById(id);
  if (!p) return;
  const labels = [];
  if (p.options?.color) labels.push(p.options.color[0].name);
  if (p.options?.size) labels.push(p.options.size[0]);
  addToCart({
    id: p.id,
    name: p.name,
    image: p.images[0].src,
    price: p.price,
    qty: 1,
    variantLabel: labels.join(" / ")
  });
  showToast(`${p.name} added to cart`);
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