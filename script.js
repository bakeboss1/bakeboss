// ============================================================
// script.js — Bake Boss Bakery Website Logic
// ============================================================

// ── CONFIG ──────────────────────────────────────────────────
// Replace with your actual WhatsApp number (with country code, no +)
const WHATSAPP_NUMBER = "919016988150"; // e.g. 919876543210
const INSTAGRAM_URL = "https://www.instagram.com/bake__boss/"; // Update this

// WhatsApp link helper
const waLink = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

// ── FALLBACK DATA (shown when Supabase is not configured) ────
const FALLBACK_GALLERY = {
  cake: [
    {
      id: "c1",
      title: "Chocolate Truffle Cake",
      caption: "Rich dark chocolate with ganache drip",
      image_url:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=480&q=80",
    },
    {
      id: "c2",
      title: "Vanilla Berry Cake",
      caption: "Light sponge with fresh berries",
      image_url:
        "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=480&q=80",
    },
    {
      id: "c3",
      title: "Red Velvet Cake",
      caption: "Classic red velvet with cream cheese frosting",
      image_url:
        "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=480&q=80",
    },
    {
      id: "c4",
      title: "Mango Cream Cake",
      caption: "Seasonal Alphonso mango delight",
      image_url:
        "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=480&q=80",
    },
    {
      id: "c5",
      title: "Lemon Drizzle Cake",
      caption: "Zesty lemon with a sweet glaze",
      image_url:
        "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=480&q=80",
    },
  ],
  brownie: [
    {
      id: "b1",
      title: "Classic Fudge Brownie",
      caption: "Dense, gooey chocolate squares",
      image_url:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=480&q=80",
    },
    {
      id: "b2",
      title: "Walnut Brownie",
      caption: "Crunchy walnuts in every bite",
      image_url:
        "https://images.unsplash.com/photo-1600454301215-c3cdf25e79c5?w=480&q=80",
    },
    {
      id: "b3",
      title: "Nutella Swirl Brownie",
      caption: "Swirled Nutella on fudgy base",
      image_url:
        "https://images.unsplash.com/photo-1589375165882-ae3e90af7b3b?w=480&q=80",
    },
    {
      id: "b4",
      title: "Cream Cheese Brownie",
      caption: "Tangy cream cheese marble",
      image_url:
        "https://images.unsplash.com/photo-1541080923-7d3da8f88a50?w=480&q=80",
    },
  ],
  cookie: [
    {
      id: "ck1",
      title: "Choco Chip Cookie",
      caption: "Buttery crisp with premium chocolate chips",
      image_url:
        "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=480&q=80",
    },
    {
      id: "ck2",
      title: "Oreo Stuffed Cookie",
      caption: "Whole Oreo baked inside a cookie",
      image_url:
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=480&q=80",
    },
    {
      id: "ck3",
      title: "Peanut Butter Cookie",
      caption: "Crumbly, salty-sweet classic",
      image_url:
        "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=480&q=80",
    },
    {
      id: "ck4",
      title: "Red Velvet Cookie",
      caption: "Chewy red velvet with white choco chips",
      image_url:
        "https://images.unsplash.com/photo-1596550349793-e78d3375e7c8?w=480&q=80",
    },
  ],
};

const FALLBACK_MENU = {
  cake: [
    { name: "Chocolate Truffle Cake (500g)", price: 599 },
    { name: "Red Velvet Cake (500g)", price: 649 },
    { name: "Mango Cream Cake (500g)", price: 699 },
    { name: "Vanilla Berry Cake (500g)", price: 579 },
    { name: "Lemon Drizzle Cake (500g)", price: 549 },
    { name: "Custom Theme Cake (1 kg)", price: 1299 },
  ],
  brownie: [
    { name: "Classic Fudge Brownie (6 pcs)", price: 249 },
    { name: "Walnut Brownie (6 pcs)", price: 279 },
    { name: "Nutella Swirl Brownie (6 pcs)", price: 299 },
    { name: "Cream Cheese Brownie (6 pcs)", price: 299 },
    { name: "Assorted Brownie Box (12 pcs)", price: 499 },
  ],
  cookie: [
    { name: "Choco Chip Cookie (6 pcs)", price: 199 },
    { name: "Oreo Stuffed Cookie (4 pcs)", price: 229 },
    { name: "Peanut Butter Cookie (6 pcs)", price: 199 },
    { name: "Red Velvet Cookie (6 pcs)", price: 219 },
    { name: "Assorted Cookie Box (12 pcs)", price: 399 },
  ],
};

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

function openLightbox(imgSrc, title, caption) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const lbTitle = document.getElementById("lightbox-title");
  const lbCaption = document.getElementById("lightbox-caption");
  const orderBtn = document.getElementById("lightbox-order");

  img.src = imgSrc;
  img.alt = title;
  lbTitle.textContent = title;
  lbCaption.textContent = caption || "";
  orderBtn.href = waLink(`Hi Bake Boss, I want to order ${title}`);

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
  container.innerHTML = Array.from(
    { length: count },
    () => `
    <div class="skeleton-card">
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton skeleton-text" style="width:75%"></div>
      <div class="skeleton skeleton-text short"></div>
      <div class="skeleton skeleton-text" style="height:30px;margin-top:8px;border-radius:8px"></div>
    </div>
  `,
  ).join("");
}

// ── RENDER A GALLERY ITEM CARD ────────────────────────────────
function createItemCard(item) {
  const div = document.createElement("div");
  div.className = "item-card";
  div.innerHTML = `
    <div class="item-img-wrap" role="button" aria-label="View ${item.title}">
      <img src="${item.image_url}" alt="${item.title}" loading="lazy">
      <div class="img-overlay">
        <div class="overlay-zoom">🔍</div>
      </div>
    </div>
    <div class="item-info">
      <div class="item-title">${item.title}</div>
      <div class="item-caption">${item.caption || ""}</div>
      <a class="btn-order" href="${waLink(`Hi Bake Boss, I want to order ${item.title}`)}" target="_blank" rel="noopener">
        <span>🛒</span> Order This
      </a>
    </div>
  `;

  // Lightbox on image click
  div.querySelector(".item-img-wrap").addEventListener("click", () => {
    openLightbox(item.image_url, item.title, item.caption);
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

  items.forEach((item) => carousel.appendChild(createItemCard(item)));
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
  <span class="menu-price">₹${Number(item.price).toLocaleString("en-IN")}</span>
`;
    grid.appendChild(div);
  });
}

// ── FETCH & RENDER ALL ────────────────────────────────────────
async function loadAll() {
  // Show skeletons immediately
  ["gallery-cakes", "gallery-brownies", "gallery-cookies"].forEach((id) =>
    renderSkeletons(id),
  );

  // Check if Supabase is configured
  const isConfigured =
    typeof supabase !== "undefined" &&
    !supabase.url.includes("YOUR_PROJECT_ID");

  let galleryData = { cake: [], brownie: [], cookie: [] };
  let menuData = { cake: [], brownie: [], cookie: [] };

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

  // Render menus
  renderMenuCategory("cake", menuData.cake);
  renderMenuCategory("brownie", menuData.brownie);
  renderMenuCategory("cookie", menuData.cookie);

  // Re-run scroll reveal for dynamically added elements
  initScrollReveal();
}
