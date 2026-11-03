/* ==========================================================================
   GoSipTea — App
   Rendering, filtering, search, modals, cart drawer, mock checkout,
   dynamic SEO (title / meta / OG per product) and micro-interactions.
   Depends on: js/products.js (data) → js/cart.js (Cart) → this file.
   ========================================================================== */

(() => {
  "use strict";

  /* ---------------- helpers ---------------- */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const fmt = window.GOSIP.fmtPrice;
  const byId = window.GOSIP.byId;

  const escapeHTML = (str = "") =>
    String(str).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);

  const debounce = (fn, ms = 140) => {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  };

  /* small inline icon set */
  const ICONS = {
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z"/><circle cx="12" cy="11" r="2.2"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.4l-5.8 3 1.1-6.4L2.6 9.4l6.5-.9L12 2.6z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6.5 7l1 12a1 1 0 0 0 1 .9h7a1 1 0 0 0 1-.9l1-12"/><path d="M10 11v5M14 11v5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 20c0-8 4-14 14-15-1 10-7 14-14 15Z"/><path d="M5 20c3-5 7-8 11-10"/></svg>',
    thermo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M10 4a2 2 0 1 1 4 0v9.3a4.5 4.5 0 1 1-4 0V4Z"/><circle cx="12" cy="17.4" r="1.8" fill="currentColor" stroke="none"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
    cup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 9h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z"/><path d="M16 10h2.5a2.5 2.5 0 0 1 0 5H16"/></svg>'
  };

  /* ---------------- element registry ---------------- */
  const els = {
    header: $(".site-header"),
    navToggle: $("#nav-toggle"),
    themeToggle: $("#theme-toggle"),
    cartOpen: $("#cart-open"),
    cartClose: $("#cart-close"),
    cartBadge: $("#cart-badge"),
    drawer: $("#cart-drawer"),
    drawerOverlay: $("#drawer-overlay"),
    drawerItems: $("#drawer-items"),
    drawerEmpty: $("#drawer-empty"),
    drawerCount: $("#drawer-count"),
    drawerSubtotal: $("#cart-subtotal"),
    drawerShip: $("#drawer-ship"),
    shipText: $("#ship-text"),
    shipBar: $("#ship-bar"),
    checkoutOpen: $("#checkout-open"),
    continueShopping: $("#continue-shopping"),
    grid: $("#tea-grid"),
    search: $("#search"),
    chips: $("#category-chips"),
    caffeine: $("#caffeine-filter"),
    taste: $("#taste-filter"),
    sort: $("#sort"),
    resetFilters: $("#reset-filters"),
    resultsCount: $("#results-count"),
    emptyState: $("#empty-state"),
    emptyReset: $("#empty-reset"),
    modalOverlay: $("#modal-overlay"),
    productModal: $("#product-modal"),
    pmBody: $("#pm-body"),
    pmClose: $("#pm-close"),
    checkoutModal: $("#checkout-modal"),
    ckClose: $("#ck-close"),
    ckForm: $("#checkout-form"),
    ckSummary: $("#ck-summary"),
    ckTotals: $("#ck-totals"),
    successModal: $("#success-modal"),
    okDone: $("#ok-done"),
    okOrder: $("#ok-order"),
    okSummary: $("#ok-summary"),
    newsForm: $("#news-form"),
    newsEmail: $("#news-email"),
    newsNote: $("#news-note"),
    toast: $("#toast")
  };

  /* ---------------- dynamic SEO per product ---------------- */
  const DEFAULT_META = {
    title: document.title,
    description: $('meta[name="description"]')?.content || "",
    ogTitle: $('meta[property="og:title"]')?.content || "",
    ogDesc: $('meta[property="og:description"]')?.content || "",
    ogImage: $('meta[property="og:image"]')?.content || "",
    twTitle: $('meta[name="twitter:title"]')?.content || "",
    twDesc: $('meta[name="twitter:description"]')?.content || "",
    twImage: $('meta[name="twitter:image"]')?.content || ""
  };

  const setMeta = (attr, key, content) => {
    const el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (el) el.setAttribute("content", content);
  };

  const absoluteURL = (rel) => { try { return new URL(rel, location.href).href; } catch { return rel; } };

  function applyProductMeta(p) {
    document.title = p.metaTitle || `${p.name} — GoSipTea`;
    setMeta("name", "description", p.metaDescription || "");
    setMeta("property", "og:title", `${p.name} — ${GOSIP.categoryLabel(p.category)} | GoSipTea`);
    setMeta("property", "og:description", p.metaDescription || "");
    setMeta("property", "og:image", absoluteURL(p.image));
    setMeta("name", "twitter:title", `${p.name} | GoSipTea`);
    setMeta("name", "twitter:description", p.metaDescription || "");
    setMeta("name", "twitter:image", absoluteURL(p.image));
    const url = new URL(location.href);
    url.searchParams.set("tea", p.id);
    history.replaceState(null, "", url);
  }

  function resetMeta() {
    document.title = DEFAULT_META.title;
    setMeta("name", "description", DEFAULT_META.description);
    setMeta("property", "og:title", DEFAULT_META.ogTitle);
    setMeta("property", "og:description", DEFAULT_META.ogDesc);
    setMeta("property", "og:image", DEFAULT_META.ogImage);
    setMeta("name", "twitter:title", DEFAULT_META.twTitle);
    setMeta("name", "twitter:description", DEFAULT_META.twDesc);
    setMeta("name", "twitter:image", DEFAULT_META.twImage);
    const url = new URL(location.href);
    if (url.searchParams.has("tea")) {
      url.searchParams.delete("tea");
      history.replaceState(null, "", url.pathname + (url.searchParams.toString() ? `?${url.searchParams}` : ""));
    }
  }

  /* ---------------- generic dialog management ---------------- */
  let lastFocused = null;

  function lockScroll() { document.body.classList.add("no-scroll"); }
  function unlockScroll() {
    if ($(".modal.is-open") || els.drawer.classList.contains("is-open")) return;
    document.body.classList.remove("no-scroll");
  }

  function openModal(modal) {
    lastFocused = document.activeElement;
    els.modalOverlay.hidden = false;
    requestAnimationFrame(() => els.modalOverlay.classList.add("is-open"));
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("is-open"));
    lockScroll();
    const first = modal.querySelector("button, input, select, [tabindex]");
    if (first) setTimeout(() => first.focus({ preventScroll: true }), 120);
  }

  function closeModal(modal) {
    modal.classList.remove("is-open");
    setTimeout(() => { modal.hidden = true; }, 380);
    if (!$$(".modal.is-open").length) {
      els.modalOverlay.classList.remove("is-open");
      setTimeout(() => { els.modalOverlay.hidden = true; }, 350);
    }
    unlockScroll();
    if (lastFocused) { lastFocused.focus({ preventScroll: true }); lastFocused = null; }
  }

  function openDrawer() {
    lastFocused = document.activeElement;
    els.drawerOverlay.hidden = false;
    requestAnimationFrame(() => els.drawerOverlay.classList.add("is-open"));
    els.drawer.classList.add("is-open");
    els.drawer.setAttribute("aria-hidden", "false");
    lockScroll();
    els.cartClose.focus({ preventScroll: true });
  }

  function closeDrawer() {
    els.drawer.classList.remove("is-open");
    els.drawer.setAttribute("aria-hidden", "true");
    els.drawerOverlay.classList.remove("is-open");
    setTimeout(() => { els.drawerOverlay.hidden = true; }, 350);
    unlockScroll();
    if (lastFocused) { lastFocused.focus({ preventScroll: true }); lastFocused = null; }
  }

  /* ---------------- toast ---------------- */
  let toastTimer;
  function toast(msg) {
    els.toast.innerHTML = `${ICONS.check}<span>${escapeHTML(msg)}</span>`;
    els.toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove("is-visible"), 2600);
  }

  /* ---------------- light / dark theme toggle ---------------- */
  /* data-theme is already set on <html> by the inline head script (no FOUC).
     Here we only wire the toggle, sync A11y state + browser-tab color,
     and persist the visitor's explicit choice (gosiptea_theme). */
  const THEME_KEY = "gosiptea_theme";
  const THEME_COLORS = { dark: "#0a1712", light: "#f6f1e6" };

  const currentTheme = () =>
    document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

  function syncThemeUI(theme) {
    if (!els.themeToggle) return;
    els.themeToggle.setAttribute("aria-checked", String(theme === "dark"));
    els.themeToggle.setAttribute("aria-label",
      theme === "dark" ? "Dark mode on — switch to light mode" : "Light mode on — switch to dark mode");
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_COLORS[theme]);
  }

  function setTheme(theme, persist) {
    document.documentElement.setAttribute("data-theme", theme);
    if (persist) {
      try { localStorage.setItem(THEME_KEY, theme); } catch { /* storage blocked */ }
    }
    syncThemeUI(theme);
  }

  function initTheme() {
    syncThemeUI(currentTheme());
    if (!els.themeToggle) return;
    els.themeToggle.addEventListener("click", () => {
      setTheme(currentTheme() === "dark" ? "light" : "dark", true);
    });
    /* follow system changes only until the visitor picks a theme themselves */
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onSystemChange = (e) => {
      let stored = null;
      try { stored = localStorage.getItem(THEME_KEY); } catch { /* ignore */ }
      if (!stored) setTheme(e.matches ? "light" : "dark", false);
    };
    if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange); /* older Safari */
  }

  /* ---------------- tea grid ---------------- */
  const FREE_SHIP = 50;
  /* Signature range only — Winter Edition teas (collection: "christmas") live on
     christmas/index.html but share the same cart & catalog. */
  const SIGNATURE_COUNT = window.TEA_PRODUCTS.filter(p => p.collection !== "christmas").length;

  const state = { query: "", category: "all", caffeine: "all", taste: "all", sort: "featured" };

  function filteredProducts() {
    const q = state.query.trim().toLowerCase();
    let list = window.TEA_PRODUCTS.filter(p => {
      if (p.collection === "christmas") return false;
      if (state.category !== "all" && p.category !== state.category) return false;
      if (state.caffeine !== "all" && p.caffeine !== state.caffeine) return false;
      if (state.taste !== "all" && !p.taste.includes(state.taste)) return false;
      if (q) {
        const hay = `${p.name} ${p.origin} ${p.notes} ${GOSIP.categoryLabel(p.category)}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    switch (state.sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "name": list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
      default: /* featured — keep curated order */ break;
    }
    return list;
  }

  function cardHTML(p) {
    return `
      <li>
        <article class="tea-card" data-id="${p.id}" tabindex="0" role="button"
                 aria-label="View details for ${escapeHTML(p.name)}">
          <div class="tea-media">
            <img src="${p.image}" alt="${escapeHTML(p.name)} — ${escapeHTML(GOSIP.categoryLabel(p.category))} from ${escapeHTML(p.origin)}"
                 loading="lazy" decoding="async">
            ${p.badge ? `<span class="tea-badge">${escapeHTML(p.badge)}</span>` : ""}
            <span class="tea-caf caf-${p.caffeine}"><i class="caf-dot"></i>${escapeHTML(GOSIP.caffeineLabel(p.caffeine))}</span>
          </div>
          <div class="tea-body">
            <span class="tea-kicker">${escapeHTML(GOSIP.categoryLabel(p.category))}</span>
            <h3 class="tea-name">${escapeHTML(p.name)}</h3>
            <span class="tea-origin">${ICONS.pin}${escapeHTML(p.origin)}</span>
            <div class="tea-tags">
              ${p.taste.map(t => `<span class="tea-tag">${escapeHTML(t)}</span>`).join("")}
            </div>
            <div class="tea-foot">
              <span class="tea-price">${fmt(p.price)}<small>${escapeHTML(p.size)}</small></span>
              <span class="tea-rating">${ICONS.star}${p.rating.toFixed(1)} (${p.reviews})</span>
              <button class="tea-add" data-add="${p.id}" aria-label="Add ${escapeHTML(p.name)} to cart">${ICONS.plus}</button>
            </div>
          </div>
        </article>
      </li>`;
  }

  function renderGrid() {
    const list = filteredProducts();
    els.grid.innerHTML = list.map(cardHTML).join("");
    els.resultsCount.textContent = `Showing ${list.length} of ${SIGNATURE_COUNT} teas`;
    els.emptyState.hidden = list.length !== 0;
    els.resetFilters.hidden = !(state.query || state.category !== "all" || state.caffeine !== "all" || state.taste !== "all");
  }

  function resetAllFilters() {
    state.query = ""; state.category = "all"; state.caffeine = "all"; state.taste = "all"; state.sort = "featured";
    els.search.value = "";
    els.caffeine.value = "all"; els.taste.value = "all"; els.sort.value = "featured";
    $$(".chip", els.chips).forEach(c => c.classList.toggle("is-active", c.dataset.category === "all"));
    renderGrid();
  }

  /* ---------------- product modal ---------------- */
  let currentProduct = null;

  function productModalHTML(p) {
    return `
      <div class="pm-media">
        <img src="${p.image}" alt="${escapeHTML(p.name)} — ${escapeHTML(GOSIP.categoryLabel(p.category))}">
      </div>
      <div class="pm-info">
        <div class="pm-kicker">
          <span class="pm-category">${escapeHTML(GOSIP.categoryLabel(p.category))}</span>
          ${p.certifications.map(c => `<span class="pm-cert">${escapeHTML(c)}</span>`).join("")}
        </div>
        <h3 class="pm-title" id="pm-title">${escapeHTML(p.name)}</h3>
        <div class="pm-meta">
          <span class="tea-origin">${ICONS.pin}${escapeHTML(p.origin)} · ${escapeHTML(p.altitude)}</span>
          <span class="tea-rating">${ICONS.star}${p.rating.toFixed(1)} · ${p.reviews} reviews</span>
        </div>
        <p class="pm-desc">${escapeHTML(p.description)}</p>

        <div class="pm-notes">
          <h4>Tasting Notes</h4>
          <div class="tea-tags">${p.notes.split(",").map(n => `<span class="tea-tag">${escapeHTML(n.trim())}</span>`).join("")}</div>
        </div>

        <div class="pm-brew">
          <h4>Brewing Ritual</h4>
          <div class="brew-chips">
            <span class="brew-chip">${ICONS.thermo}${escapeHTML(p.brewing.temp)}</span>
            <span class="brew-chip">${ICONS.clock}${escapeHTML(p.brewing.time)}</span>
            <span class="brew-chip">${ICONS.cup}${escapeHTML(p.brewing.dose)}</span>
          </div>
          <ol>${p.brewing.steps.map(s => `<li>${escapeHTML(s)}</li>`).join("")}</ol>
        </div>

        <div class="pm-cta">
          <span class="pm-price">${fmt(p.price)}<small>${escapeHTML(p.size)}</small></span>
          <div class="qty-stepper" aria-label="Quantity">
            <button type="button" data-qty="-1" aria-label="Decrease quantity">${ICONS.minus}</button>
            <output id="pm-qty">1</output>
            <button type="button" data-qty="1" aria-label="Increase quantity">${ICONS.plus}</button>
          </div>
          <button class="btn btn-primary" id="pm-add">${ICONS.cup}Add to Cart</button>
        </div>

        <p class="pm-eco">${ICONS.leaf}Ships plastic-free in home-compostable packaging within 48 h</p>
      </div>`;
  }

  function openProduct(id) {
    const p = byId(id);
    if (!p) return;
    currentProduct = p;
    els.pmBody.innerHTML = productModalHTML(p);
    applyProductMeta(p);
    openModal(els.productModal);
  }

  function closeProduct() {
    closeModal(els.productModal);
    currentProduct = null;
    resetMeta();
  }

  /* ---------------- cart drawer ---------------- */
  function updateBadge(popIt = true) {
    const n = Cart.count();
    els.cartBadge.textContent = n;
    els.cartBadge.hidden = n === 0;
    if (popIt && n > 0) {
      els.cartBadge.classList.remove("pop");
      void els.cartBadge.offsetWidth; // restart animation
      els.cartBadge.classList.add("pop");
    }
  }

  function drawerLineHTML(it) {
    const p = byId(it.id);
    if (!p) return "";
    return `
      <li class="cart-line" data-id="${p.id}">
        <img class="cart-line-img" src="${p.image}" alt="">
        <div>
          <p class="cart-line-name">${escapeHTML(p.name)}</p>
          <p class="cart-line-meta">${fmt(p.price)} · ${escapeHTML(p.size)}</p>
          <div class="cart-line-controls">
            <div class="qty-stepper">
              <button type="button" data-dec aria-label="Decrease quantity">${ICONS.minus}</button>
              <output>${it.qty}</output>
              <button type="button" data-inc aria-label="Increase quantity">${ICONS.plus}</button>
            </div>
            <button type="button" class="cart-line-remove" data-remove aria-label="Remove ${escapeHTML(p.name)}">${ICONS.trash}</button>
          </div>
        </div>
        <span class="cart-line-price">${fmt(p.price * it.qty)}</span>
      </li>`;
  }

  function renderDrawer() {
    const items = Cart.items;
    els.drawerItems.innerHTML = items.map(drawerLineHTML).join("");
    els.drawerEmpty.style.display = items.length ? "none" : "grid";
    els.drawerCount.textContent = `(${Cart.count()})`;
    els.drawerSubtotal.textContent = fmt(Cart.subtotal());
    els.checkoutOpen.disabled = items.length === 0;

    const subtotal = Cart.subtotal();
    const remaining = Math.max(0, FREE_SHIP - subtotal);
    els.shipText.innerHTML = remaining > 0
      ? `You're <strong>${fmt(remaining)}</strong> away from free shipping`
      : `${ICONS.leaf} You've unlocked <strong>free shipping</strong>`;
    els.shipBar.setAttribute("aria-valuenow", String(Math.min(100, Math.round(subtotal / FREE_SHIP * 100))));
    $("span", els.shipBar).style.width = `${Math.min(100, subtotal / FREE_SHIP * 100)}%`;
  }

  /* ---------------- checkout & success ---------------- */
  let lastOrder = null;

  function shippingFor(subtotal) { return subtotal >= FREE_SHIP ? 0 : 4.9; }

  function openCheckout() {
    if (!Cart.items.length) return;
    renderCheckout();
    closeDrawer();
    openModal(els.checkoutModal);
  }

  function renderCheckout() {
    const sub = Cart.subtotal();
    const ship = shippingFor(sub);
    els.ckSummary.innerHTML = Cart.items.map(it => {
      const p = byId(it.id);
      return `<div class="ck-line"><span>${escapeHTML(p.name)} × ${it.qty}</span><strong>${fmt(p.price * it.qty)}</strong></div>`;
    }).join("");
    els.ckTotals.innerHTML = `
      <div class="ck-line"><span>Subtotal</span><strong>${fmt(sub)}</strong></div>
      <div class="ck-line"><span>Shipping (carbon-neutral)</span><strong>${ship === 0 ? "FREE" : fmt(ship)}</strong></div>
      <div class="ck-line total"><span>Total</span><b>${fmt(sub + ship)}</b></div>`;
    $("#ck-submit").textContent = `Complete Order — ${fmt(sub + ship)}`;
  }

  const validators = {
    name: v => v.trim().length >= 2,
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    address: v => v.trim().length >= 4,
    city: v => v.trim().length >= 2,
    zip: v => v.trim().length >= 3,
    country: v => v !== ""
  };

  function validateForm(form) {
    let firstBad = null;
    for (const [name, ok] of Object.entries(validators)) {
      const input = form.elements[name];
      const field = input.closest(".field");
      const valid = ok(input.value);
      field.classList.toggle("is-invalid", !valid);
      if (!valid && !firstBad) firstBad = input;
    }
    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  function completeOrder(e) {
    e.preventDefault();
    const form = els.ckForm;
    if (!validateForm(form)) return;

    const sub = Cart.subtotal();
    const ship = shippingFor(sub);
    lastOrder = {
      id: `GSP-${Date.now().toString(36).toUpperCase().slice(-6)}`,
      lines: Cart.items.map(it => ({ ...it })),
      subtotal: sub,
      shipping: ship,
      total: sub + ship
    };

    $("#ok-order").textContent = lastOrder.id;
    els.okSummary.innerHTML = `
      ${lastOrder.lines.map(it => {
        const p = byId(it.id);
        return `<div class="ck-line"><span>${escapeHTML(p.name)} × ${it.qty}</span><strong>${fmt(p.price * it.qty)}</strong></div>`;
      }).join("")}
      <div class="ck-line"><span>Shipping (carbon-neutral)</span><strong>${lastOrder.shipping === 0 ? "FREE" : fmt(lastOrder.shipping)}</strong></div>
      <div class="ck-line total"><span>Total</span><b>${fmt(lastOrder.total)}</b></div>
      <div class="ck-line"><span>Ship to</span><strong>${escapeHTML(form.elements.name.value)}, ${escapeHTML(form.elements.country.value)}</strong></div>`;

    closeModal(els.checkoutModal);
    setTimeout(() => openModal(els.successModal), 300);
    Cart.clear();
  }

  function finishSuccess() {
    closeModal(els.successModal);
    toast("Cart cleared — ready for your next ritual");
  }

  /* ---------------- newsletter ---------------- */
  function handleNewsletter(e) {
    e.preventDefault();
    const value = els.newsEmail.value.trim();
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    if (!okEmail) {
      els.newsEmail.classList.add("is-error");
      els.newsEmail.focus();
      return;
    }
    els.newsEmail.classList.remove("is-error");
    try { localStorage.setItem("gosiptea_newsletter_v1", value); } catch {}
    els.newsNote.textContent = "Welcome to the inner circle. Check your inbox — your 10% ritual code is on its way.";
    els.newsNote.classList.add("is-success");
    els.newsForm.reset();
    toast("Subscribed — welcome to the Inner Circle");
  }

  /* ---------------- global events ---------------- */
  function wireEvents() {
    /* header */
    addEventListener("scroll", () => els.header.classList.toggle("is-scrolled", scrollY > 24), { passive: true });
    els.navToggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      els.navToggle.setAttribute("aria-expanded", String(open));
    });
    $$(".nav-link").forEach(a => a.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      els.navToggle.setAttribute("aria-expanded", "false");
    }));

    /* filters */
    els.search.addEventListener("input", debounce(e => { state.query = e.target.value; renderGrid(); }));
    els.chips.addEventListener("click", e => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      $$(".chip", els.chips).forEach(c => c.classList.toggle("is-active", c === chip));
      state.category = chip.dataset.category;
      renderGrid();
    });
    els.caffeine.addEventListener("change", e => { state.caffeine = e.target.value; renderGrid(); });
    els.taste.addEventListener("change", e => { state.taste = e.target.value; renderGrid(); });
    els.sort.addEventListener("change", e => { state.sort = e.target.value; renderGrid(); });
    els.resetFilters.addEventListener("click", resetAllFilters);
    els.emptyReset.addEventListener("click", resetAllFilters);

    /* grid interactions (delegated) */
    els.grid.addEventListener("click", e => {
      const addBtn = e.target.closest("[data-add]");
      if (addBtn) {
        e.stopPropagation();
        Cart.add(addBtn.dataset.add);
        addBtn.classList.add("added");
        addBtn.innerHTML = ICONS.check;
        setTimeout(() => { addBtn.classList.remove("added"); addBtn.innerHTML = ICONS.plus; }, 900);
        return;
      }
      const card = e.target.closest(".tea-card");
      if (card) openProduct(card.dataset.id);
    });
    els.grid.addEventListener("keydown", e => {
      if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("tea-card")) {
        e.preventDefault();
        openProduct(e.target.dataset.id);
      }
    });

    /* product modal (delegated) */
    els.pmBody.addEventListener("click", e => {
      const qtyBtn = e.target.closest("[data-qty]");
      if (qtyBtn) {
        const out = $("#pm-qty");
        out.textContent = Math.max(1, Math.min(99, parseInt(out.textContent, 10) + parseInt(qtyBtn.dataset.qty, 10)));
        return;
      }
      if (e.target.closest("#pm-add")) {
        const qty = parseInt($("#pm-qty").textContent, 10) || 1;
        Cart.add(currentProduct.id, qty);
        closeProduct();
        toast(`${currentProduct.name} × ${qty} added to your ritual`);
      }
    });
    els.pmClose.addEventListener("click", closeProduct);

    /* cart drawer */
    els.cartOpen.addEventListener("click", openDrawer);
    els.cartClose.addEventListener("click", closeDrawer);
    els.continueShopping.addEventListener("click", closeDrawer);
    els.drawerOverlay.addEventListener("click", closeDrawer);
    els.drawerItems.addEventListener("click", e => {
      const line = e.target.closest(".cart-line");
      if (!line) return;
      const id = line.dataset.id;
      if (e.target.closest("[data-inc]")) Cart.setQty(id, (Cart.items.find(i => i.id === id)?.qty || 0) + 1);
      else if (e.target.closest("[data-dec]")) Cart.setQty(id, (Cart.items.find(i => i.id === id)?.qty || 1) - 1);
      else if (e.target.closest("[data-remove]")) { Cart.remove(id); toast("Removed from cart"); }
    });

    /* checkout */
    els.checkoutOpen.addEventListener("click", openCheckout);
    els.ckClose.addEventListener("click", () => closeModal(els.checkoutModal));
    els.ckForm.addEventListener("submit", completeOrder);
    els.ckForm.addEventListener("input", e => {
      const field = e.target.closest(".field");
      if (field && field.classList.contains("is-invalid")) field.classList.remove("is-invalid");
    });

    /* success */
    els.okDone.addEventListener("click", finishSuccess);

    /* overlay click closes any open modal */
    els.modalOverlay.addEventListener("click", () => {
      const open = $$(".modal.is-open")[0];
      if (!open) return;
      if (open === els.productModal) closeProduct();
      else closeModal(open);
    });

    /* escape closes topmost layer */
    addEventListener("keydown", e => {
      if (e.key !== "Escape") return;
      if (!els.successModal.hidden) return finishSuccess();
      if (!els.checkoutModal.hidden) return closeModal(els.checkoutModal);
      if (!els.productModal.hidden) return closeProduct();
      if (els.drawer.classList.contains("is-open")) return closeDrawer();
      if (document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
        els.navToggle.setAttribute("aria-expanded", "false");
      }
    });

    /* newsletter */
    els.newsForm.addEventListener("submit", handleNewsletter);
    els.newsEmail.addEventListener("input", () => els.newsEmail.classList.remove("is-error"));

    /* cart reactivity */
    Cart.onChange(() => { updateBadge(); renderDrawer(); });

    /* remember newsletter subscribers */
    try {
      if (localStorage.getItem("gosiptea_newsletter_v1")) {
        els.newsNote.textContent = "You're already on the list — your 10% code is waiting in your inbox.";
        els.newsNote.classList.add("is-success");
      }
    } catch {}
  }

  /* ---------------- reveal animations & counters ---------------- */
  function initReveal() {
    /* graceful fallback: no IntersectionObserver → show everything now */
    if (!("IntersectionObserver" in window)) {
      $$("[data-reveal]").forEach(el => el.classList.add("is-revealed"));
      $$("[data-count]").forEach(el => {
        const d = parseInt(el.dataset.decimal || "0", 10);
        el.textContent = parseFloat(el.dataset.count).toFixed(d) + (el.dataset.suffix || "");
      });
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("is-revealed");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
    $$("[data-reveal]").forEach(el => io.observe(el));

    /* animated stat counters */
    const cio = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        cio.unobserve(el);
        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimal || "0", 10);
        const suffix = el.dataset.suffix || "";
        const t0 = performance.now(), dur = 1300;
        (function tick(now) {
          const k = Math.min(1, (now - t0) / dur);
          const eased = 1 - Math.pow(1 - k, 3);
          el.textContent = (target * eased).toFixed(decimals) + suffix;
          if (k < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.6 });
    $$("[data-count]").forEach(el => cio.observe(el));
  }

  /* ---------------- boot ---------------- */
  function init() {
    initTheme();
    renderGrid();
    updateBadge(false);
    renderDrawer();
    wireEvents();
    initReveal();

    /* deep link: ?tea=slug opens the product modal directly */
    const tea = new URLSearchParams(location.search).get("tea");
    if (tea && byId(tea)) setTimeout(() => openProduct(tea), 350);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
