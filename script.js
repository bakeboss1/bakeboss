// ============================================================
// script.js — Bake Boss Bakery Website Logic
// ============================================================

// ── CONFIG ──────────────────────────────────────────────────
// Replace with your actual WhatsApp number (with country code, no +)
const WHATSAPP_NUMBER = "919876543210"; // e.g. 919876543210
const INSTAGRAM_URL = "https://instagram.com/bakeboss"; // Update this

// WhatsApp link helper
const waLink = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

// ── LIGHTBOX STATE ───────────────────────────────────────────
let lightboxOpen = false;

// ── DOM READY ────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  initNav();
  initScrollReveal();
  initCategoryCards();
  initMenuTabs();
  initLightbox();
  await loadAll();
});

// ── NAV ──────────────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById("nav");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });

  hamburger?.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close nav when a link is clicked (mobile)
  navLinks?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

// ── SCROLL REVEAL ────────────────────────────────────────────
function initScrollReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

// ── CATEGORY SCROLL CARDS ────────────────────────────────────
function initCategoryCards() {
  document.querySelectorAll(".cat-card").forEach((card) => {
    card.addEventListener("click", () => {
      const target = card.dataset.target;
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// ── MENU TABS ────────────────────────────────────────────────
function initMenuTabs() {
  document.querySelectorAll(".menu-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".menu-tab")
        .forEach((t) => t.classList.remove("active"));
      document
        .querySelectorAll(".menu-category")
        .forEach((c) => c.classList.remove("active"));
      tab.classList.add("active");
      const cat = document.getElementById("menu-" + tab.dataset.cat);
      cat?.classList.add("active");
    });
  });
}

// ── LIGHTBOX ─────────────────────────────────────────────────
function initLightbox() {
  const lb = document.getElementById("lightbox");
  const closeBtn = document.getElementById("lightbox-close");

  closeBtn?.addEventListener("click", closeLightbox);
  lb?.addEventListener("click", (e) => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxOpen) closeLightbox();
  });
}

function openLightbox(imgSrc, categoryLabel, categoryKey) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const lbCat = document.getElementById("lightbox-category");
  const orderBtn = document.getElementById("lightbox-order");

  img.src = imgSrc;
  img.alt = "Bake Boss " + categoryLabel;

  // Show the category name as a subtle label (e.g. "CAKES")
  if (lbCat) lbCat.textContent = categoryLabel.toUpperCase();

  // Generic order link — category-specific prefill
  const msgMap = {
    cake: "Hi Bake Boss, I'd like to order a cake!",
    brownie: "Hi Bake Boss, I'd like to order brownies!",
    cookie: "Hi Bake Boss, I'd like to order cookies!",
    dry_cake: "Hi Bake Boss, I'd like to order dry cakes!",
  };
  orderBtn.href = waLink(
    msgMap[categoryKey] || "Hi Bake Boss, I want to place an order",
  );

  lb.classList.add("open");
  document.body.style.overflow = "hidden";
  lightboxOpen = true;
}

function closeLightbox() {
  document.getElementById("lightbox")?.classList.remove("open");
  document.body.style.overflow = "";
  lightboxOpen = false;
}

// ── CAROUSEL DRAG SCROLL ─────────────────────────────────────
function initCarouselDrag(el) {
  let isDown = false,
    startX,
    scrollLeft;
  el.addEventListener("mousedown", (e) => {
    isDown = true;
    el.classList.add("active");
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  });
  el.addEventListener("mouseleave", () => {
    isDown = false;
    el.classList.remove("active");
  });
  el.addEventListener("mouseup", () => {
    isDown = false;
    el.classList.remove("active");
  });
  el.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = scrollLeft - (x - startX) * 1.2;
  });
}

// ── CAROUSEL ARROW BUTTONS ───────────────────────────────────
function initCarouselButtons(wrapper) {
  const carousel = wrapper.querySelector(".carousel");
  const prev = wrapper.querySelector(".carousel-btn.prev");
  const next = wrapper.querySelector(".carousel-btn.next");
  if (!prev || !next) return;

  const scrollAmt = () => Math.min(carousel.offsetWidth * 0.7, 300);

  prev.addEventListener("click", () =>
    carousel.scrollBy({ left: -scrollAmt(), behavior: "smooth" }),
  );
  next.addEventListener("click", () =>
    carousel.scrollBy({ left: scrollAmt(), behavior: "smooth" }),
  );
}

// ── RENDER SKELETON PLACEHOLDERS ─────────────────────────────
function renderSkeletons(containerId, count = 4) {
  const container = document.getElementById(containerId);
  if (!container) return;
  // Photo-only skeletons — no text rows beneath
  container.innerHTML = Array.from(
    { length: count },
    () => '<div class="skeleton skeleton-photo"></div>',
  ).join("");
}

// ── RENDER A PHOTO-ONLY CARD (no title / caption / order button) ──
function createPhotoCard(item) {
  const div = document.createElement("div");
  div.className = "photo-card";
  div.setAttribute("role", "button");
  div.setAttribute("aria-label", "View photo");

  // Map category key → readable label for lightbox
  const categoryLabels = {
    cake: "Cakes",
    brownie: "Brownies",
    cookie: "Cookies",
    dry_cake: "Dry Cakes",
  };
  const label = categoryLabels[item.category] || item.category || "";

  div.innerHTML = `
    <img src="${item.image_url}" alt="Bake Boss ${label}" loading="lazy">
    <div class="img-overlay">
      <div class="overlay-zoom">🔍</div>
    </div>
  `;

  // Open lightbox on click — passes category label instead of title/caption
  div.addEventListener("click", () => {
    openLightbox(item.image_url, label, item.category);
  });

  return div;
}

// ── RENDER GALLERY CAROUSEL ───────────────────────────────────
function renderCarousel(containerId, items) {
  const carousel = document.getElementById(containerId);
  if (!carousel) return;

  carousel.innerHTML = "";

  if (!items || items.length === 0) {
    carousel.innerHTML = `<p style="color:var(--text-light);padding:2rem;font-size:0.9rem;">No items found. Add some in Supabase!</p>`;
    return;
  }

  // Photo-only cards — title/caption/order button live at section level
  items.forEach((item) => carousel.appendChild(createPhotoCard(item)));
  initCarouselDrag(carousel);
  initCarouselButtons(carousel.closest(".carousel-wrapper"));
}

// ── RENDER MENU CATEGORY ─────────────────────────────────────
function renderMenuCategory(catId, items) {
  const grid = document.getElementById("menu-" + catId);
  if (!grid) return;
  grid.innerHTML = "";

  if (!items || items.length === 0) {
    grid.innerHTML = `<p class="menu-empty">No items yet. Add them in Supabase.</p>`;
    return;
  }

  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
  <span class="menu-name">
    ${item.name}
    ${
      item.quantity_label
        ? `<small style="display:block;font-size:0.72rem;color:rgba(255,255,255,0.45);font-weight:400;margin-top:2px;">${item.quantity_label}</small>`
        : ""
    }
  </span>
  <span class="menu-price">₹${item.price.toLocaleString("en-IN")}</span>
`;
    grid.appendChild(div);
  });
}

// ── FETCH & RENDER ALL ────────────────────────────────────────
async function loadAll() {
  // Show skeletons immediately
  [
    "gallery-cakes",
    "gallery-brownies",
    "gallery-cookies",
    "gallery-dry-cakes",
  ].forEach((id) => renderSkeletons(id));

  // Check if Supabase is configured
  const isConfigured =
    typeof supabase !== "undefined" &&
    !supabase.url.includes("YOUR_PROJECT_ID");

  let galleryData = { cake: [], brownie: [], cookie: [], dry_cake: [] };
  let menuData = { cake: [], brownie: [], cookie: [], dry_cake: [] };

  if (isConfigured) {
    try {
      // Fetch gallery and menu in parallel
      const [rawGallery, rawMenu] = await Promise.all([
        supabase.from("gallery"),
        supabase.from("menu"),
      ]);

      // Group by category
      rawGallery.forEach((item) => {
        const cat = item.category; // "cake" | "brownie" | "cookie"
        if (galleryData[cat]) galleryData[cat].push(item);
      });
      rawMenu.forEach((item) => {
        const cat = item.category;
        if (menuData[cat]) menuData[cat].push(item);
      });
    } catch (err) {
      console.warn(
        "[Bake Boss] Supabase fetch failed, using fallback data.",
        err,
      );
      galleryData = FALLBACK_GALLERY;
      menuData = FALLBACK_MENU;
    }
  } else {
    // Dev mode: use fallback data
    console.info("[Bake Boss] Supabase not configured. Showing sample data.");
    galleryData = FALLBACK_GALLERY;
    menuData = FALLBACK_MENU;
  }

  // Render galleries
  renderCarousel("gallery-cakes", galleryData.cake);
  renderCarousel("gallery-brownies", galleryData.brownie);
  renderCarousel("gallery-cookies", galleryData.cookie);
  renderCarousel("gallery-dry-cakes", galleryData.dry_cake);

  // Render menus
  renderMenuCategory("cake", menuData.cake);
  renderMenuCategory("brownie", menuData.brownie);
  renderMenuCategory("cookie", menuData.cookie);
  renderMenuCategory("dry_cake", menuData.dry_cake);

  // Re-run scroll reveal for dynamically added elements
  initScrollReveal();
}
