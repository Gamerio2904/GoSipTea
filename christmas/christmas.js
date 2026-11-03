/* ==========================================================================
   GoSipTea — Winter Edition (christmas/index.html)
   Festliche Stimmungsseite: Fake-Warenkorb (gemeinsam mit der Hauptseite),
   weihnachtlicher Fake-Checkout mit Erfolgsmeldungen, interaktiver
   Adventskalender, Schneefall, Konfetti und Light/Dark-Toggle.
   Abhängigkeiten: ../js/products.js (Daten) → ../js/cart.js (Cart) → hier.
   Keine Zahlungen, keine Netzwerk-Aufrufe – alles bleibt im Browser.
   ========================================================================== */

(() => {
  "use strict";

  /* ---------------- Helfer ---------------- */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const fmt = window.GOSIP.fmtPrice;
  const byId = window.GOSIP.byId;

  const escapeHTML = (str = "") =>
    String(str).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);

  const reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* kleine Icon-Sammlung (wie in app.js) */
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
    cup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 9h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z"/><path d="M16 10h2.5a2.5 2.5 0 0 1 0 5H16"/></svg>',
    snow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9M12 3l-2 2.4M12 3l2 2.4M12 21l-2-2.4M12 21l2-2.4M4.2 7.5l3 .8M4.2 7.5l.8-3M19.8 16.5l-3-.8M19.8 16.5l-.8 3M19.8 7.5l-3 .8M19.8 7.5l-.8-3M4.2 16.5l3-.8M4.2 16.5l.8 3"/></svg>'
  };

  /* deutsche Bezeichnungen */
  const CAT_DE = { green: "Grüntee", black: "Schwarztee", herbal: "Kräutertee", special: "Kuratierte Edition" };
  const CAF_DE = { none: "Koffeinfrei", low: "Wenig Koffein", medium: "Mittleres Koffein", high: "Viel Koffein" };

  /* ---------------- Element-Registry ---------------- */
  const els = {
    header: $(".site-header"),
    navToggle: $("#nav-toggle"),
    themeToggle: $("#theme-toggle"),
    cartOpen: $("#cart-open"),
    cartFab: $("#cart-fab"),
    cartClose: $("#cart-close"),
    cartBadge: $("#cart-badge"),
    fabBadge: $("#fab-badge"),
    drawer: $("#cart-drawer"),
    drawerOverlay: $("#drawer-overlay"),
    drawerItems: $("#drawer-items"),
    drawerEmpty: $("#drawer-empty"),
    drawerCount: $("#drawer-count"),
    drawerSubtotal: $("#cart-subtotal"),
    shipText: $("#ship-text"),
    shipBar: $("#ship-bar"),
    checkoutOpen: $("#checkout-open"),
    continueShopping: $("#continue-shopping"),
    grid: $("#xmas-grid"),
    count: $("#xmas-count"),
    modalOverlay: $("#modal-overlay"),
    productModal: $("#product-modal"),
    pmBody: $("#pm-body"),
    pmClose: $("#pm-close"),
    checkoutModal: $("#checkout-modal"),
    ckClose: $("#ck-close"),
    ckSummary: $("#ck-summary"),
    ckTotals: $("#ck-totals"),
    orderSubmit: $("#xmas-order-submit"),
    successModal: $("#success-modal"),
    okDone: $("#ok-done"),
    okOrder: $("#ok-order"),
    okMessage: $("#ok-message"),
    okSummary: $("#ok-summary"),
    adventGrid: $("#advent-grid"),
    adventCount: $("#advent-opened-count"),
    adventReset: $("#advent-reset"),
    toast: $("#toast")
  };

  /* ---------------- Light/Dark (gleicher Schlüssel wie Hauptseite) ---------------- */
  const THEME_KEY = "gosiptea_theme";
  const THEME_COLORS = { dark: "#081009", light: "#f6f1e6" };

  const currentTheme = () =>
    document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

  function syncThemeUI(theme) {
    if (!els.themeToggle) return;
    els.themeToggle.setAttribute("aria-checked", String(theme === "dark"));
    els.themeToggle.setAttribute("aria-label",
      theme === "dark" ? "Dunkelmodus aktiv – zum Hellmodus wechseln" : "Hellmodus aktiv – zum Dunkelmodus wechseln");
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_COLORS[theme]);
  }

  function initTheme() {
    syncThemeUI(currentTheme());
    if (!els.themeToggle) return;
    els.themeToggle.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem(THEME_KEY, next); } catch { /* Storage blockiert */ }
      syncThemeUI(next);
    });
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onSystemChange = (e) => {
      let stored = null;
      try { stored = localStorage.getItem(THEME_KEY); } catch { /* egal */ }
      if (!stored) {
        document.documentElement.setAttribute("data-theme", e.matches ? "light" : "dark");
        syncThemeUI(e.matches ? "light" : "dark");
      }
    };
    if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange);
  }

  /* ---------------- Dialog-Verwaltung (Drawer/Modals) ---------------- */
  let lastFocused = null;

  const lockScroll = () => document.body.classList.add("no-scroll");
  const unlockScroll = () => {
    if ($(".modal.is-open") || els.drawer.classList.contains("is-open")) return;
    document.body.classList.remove("no-scroll");
  };

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

  /* ---------------- Toast ---------------- */
  let toastTimer;
  function toast(msg) {
    els.toast.innerHTML = `${ICONS.check}<span>${escapeHTML(msg)}</span>`;
    els.toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove("is-visible"), 2600);
  }

  /* ---------------- Festtags-Grid ---------------- */
  const XMAS_TEAS = window.TEA_PRODUCTS.filter(p => p.collection === "christmas" && !p.isCalendar);

  function cardHTML(p) {
    return `
      <li>
        <article class="tea-card" data-id="${p.id}" data-mood="${(p.mood || []).join(" ")}" tabindex="0" role="button"
                 aria-label="Details zu ${escapeHTML(p.name)} ansehen">
          <div class="tea-media">
            <img src="${p.image}" alt="${escapeHTML(p.name)} – ${escapeHTML(CAT_DE[p.category] || p.category)} aus ${escapeHTML(p.origin)}"
                 loading="lazy" decoding="async">
            ${p.badge ? `<span class="tea-badge">${escapeHTML(p.badge)}</span>` : ""}
            <span class="tea-caf caf-${p.caffeine}"><i class="caf-dot"></i>${escapeHTML(CAF_DE[p.caffeine] || p.caffeine)}</span>
          </div>
          <div class="tea-body">
            <span class="tea-kicker">${escapeHTML(CAT_DE[p.category] || p.category)}</span>
            <h3 class="tea-name">${escapeHTML(p.name)}</h3>
            <span class="tea-origin">${ICONS.pin}${escapeHTML(p.origin)}</span>
            <div class="tea-tags">
              ${p.taste.map(t => `<span class="tea-tag">${escapeHTML(t)}</span>`).join("")}
            </div>
            <div class="tea-foot">
              <span class="tea-price">${fmt(p.price)}<small>${escapeHTML(p.size)}</small></span>
              <span class="tea-rating">${ICONS.star}${p.rating.toFixed(1)} (${p.reviews})</span>
              <button class="tea-add" data-add="${p.id}" aria-label="${escapeHTML(p.name)} zum Warenkorb hinzufügen">${ICONS.plus}</button>
            </div>
          </div>
        </article>
      </li>`;
  }

  function renderGrid() {
    els.grid.innerHTML = XMAS_TEAS.map(cardHTML).join("");
    els.count.textContent = `${XMAS_TEAS.length} limitierte Festtags-Tees · Nachtisch fürs Herz, Frühstück für die Seele`;
  }

  /* ---------------- Produkt-Modal (deutsch) ---------------- */
  let currentProduct = null;

  function productModalHTML(p) {
    return `
      <div class="pm-media">
        <img src="${p.image}" alt="${escapeHTML(p.name)} – ${escapeHTML(CAT_DE[p.category] || p.category)}">
      </div>
      <div class="pm-info">
        <div class="pm-kicker">
          <span class="pm-category">${escapeHTML(CAT_DE[p.category] || p.category)}</span>
          ${p.certifications.map(c => `<span class="pm-cert">${escapeHTML(c)}</span>`).join("")}
        </div>
        <h3 class="pm-title" id="pm-title">${escapeHTML(p.name)}</h3>
        <div class="pm-meta">
          <span class="tea-origin">${ICONS.pin}${escapeHTML(p.origin)} · ${escapeHTML(p.altitude)}</span>
          <span class="tea-rating">${ICONS.star}${p.rating.toFixed(1)} · ${p.reviews} Bewertungen</span>
        </div>
        <p class="pm-desc">${escapeHTML(p.description)}</p>

        <div class="pm-notes">
          <h4>Geschmacksnoten</h4>
          <div class="tea-tags">${p.notes.split(",").map(n => `<span class="tea-tag">${escapeHTML(n.trim())}</span>`).join("")}</div>
        </div>

        <div class="pm-brew">
          <h4>Brühritual</h4>
          <div class="brew-chips">
            <span class="brew-chip">${ICONS.thermo}${escapeHTML(p.brewing.temp)}</span>
            <span class="brew-chip">${ICONS.clock}${escapeHTML(p.brewing.time)}</span>
            <span class="brew-chip">${ICONS.cup}${escapeHTML(p.brewing.dose)}</span>
          </div>
          <ol>${p.brewing.steps.map(s => `<li>${escapeHTML(s)}</li>`).join("")}</ol>
        </div>

        <div class="pm-cta">
          <span class="pm-price">${fmt(p.price)}<small>${escapeHTML(p.size)}</small></span>
          <div class="qty-stepper" aria-label="Menge">
            <button type="button" data-qty="-1" aria-label="Menge verringern">${ICONS.minus}</button>
            <output id="pm-qty">1</output>
            <button type="button" data-qty="1" aria-label="Menge erhöhen">${ICONS.plus}</button>
          </div>
          <button class="btn btn-primary" id="pm-add">${ICONS.cup}Zum Warenkorb hinzufügen</button>
        </div>

        <p class="pm-eco">${ICONS.leaf}Kommt plastikfrei in kompostierbarer Verpackung – spätestens zum 1. Advent</p>
      </div>`;
  }

  function openProduct(id) {
    const p = byId(id);
    if (!p) return;
    currentProduct = p;
    els.pmBody.innerHTML = productModalHTML(p);
    openModal(els.productModal);
  }

  function closeProduct() {
    closeModal(els.productModal);
    currentProduct = null;
  }

  /* ---------------- Warenkorb-Drawer (geteilt mit der Hauptseite) ---------------- */
  const FREE_SHIP = 50;

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
              <button type="button" data-dec aria-label="Menge verringern">${ICONS.minus}</button>
              <output>${it.qty}</output>
              <button type="button" data-inc aria-label="Menge erhöhen">${ICONS.plus}</button>
            </div>
            <button type="button" class="cart-line-remove" data-remove aria-label="${escapeHTML(p.name)} entfernen">${ICONS.trash}</button>
          </div>
        </div>
        <span class="cart-line-price">${fmt(p.price * it.qty)}</span>
      </li>`;
  }

  function updateBadge(popIt = true) {
    const n = Cart.count();
    for (const badge of [els.cartBadge, els.fabBadge]) {
      if (!badge) continue;
      badge.textContent = n;
      badge.hidden = n === 0;
      if (popIt && n > 0) {
        badge.classList.remove("pop");
        void badge.offsetWidth; /* Animation neu starten */
        badge.classList.add("pop");
      }
    }
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
      ? `Noch <strong>${fmt(remaining)}</strong> bis zum Gratis-Versand`
      : `${ICONS.leaf} Gratis-Versand <strong>freigeschaltet</strong>`;
    els.shipBar.setAttribute("aria-valuenow", String(Math.min(100, Math.round(subtotal / FREE_SHIP * 100))));
    $("span", els.shipBar).style.width = `${Math.min(100, subtotal / FREE_SHIP * 100)}%`;
  }

  /* ---------------- Fake-Checkout & weihnachtliche Erfolgsmeldung ---------------- */
  const XMAS_MESSAGES = [
    "Frohes Fest! Dieser Warenkorb bringt direkt den Weihnachtsmann ins Haus – rein digital!",
    "Ho ho ho! Deine Fake-Bestellung wurde feierlich an die Elfen weitergegeben – sie brühen bereits Wasser auf.",
    "Festtagsmodus aktiviert: Deine Tees sind sicher im Zuckerwatte-Schneesturm verstaut. Oops – Wunschzettel gespeichert!",
    "Moment, ein echter Shop? Nein – nur ein Wintermärchen. Dein Warenkorb bleibt Wunschzettel: guten Durst und frohe Festtage!"
  ];

  const shippingFor = (subtotal) => subtotal >= FREE_SHIP ? 0 : 4.9;

  function openCheckout() {
    if (!Cart.items.length) return;
    const sub = Cart.subtotal();
    const ship = shippingFor(sub);
    els.ckSummary.innerHTML = Cart.items.map(it => {
      const p = byId(it.id);
      return `<div class="ck-line"><span>${escapeHTML(p.name)} × ${it.qty}</span><strong>${fmt(p.price * it.qty)}</strong></div>`;
    }).join("");
    els.ckTotals.innerHTML = `
      <div class="ck-line"><span>Zwischensumme</span><strong>${fmt(sub)}</strong></div>
      <div class="ck-line"><span>Versand (CO₂-neutral, vom Schlitten)</span><strong>${ship === 0 ? "GRATIS" : fmt(ship)}</strong></div>
      <div class="ck-line total"><span>Gesamt</span><b>${fmt(sub + ship)}</b></div>`;
    els.orderSubmit.textContent = `Dem Weihnachtsmann übergeben — ${fmt(sub + ship)}`;
    closeDrawer();
    openModal(els.checkoutModal);
  }

  function completeFakeOrder() {
    if (!Cart.items.length) return;
    const sub = Cart.subtotal();
    const ship = shippingFor(sub);
    const orderId = `GSP-XMAS-${Date.now().toString(36).toUpperCase().slice(-6)}`;

    els.okOrder.textContent = orderId;
    els.okMessage.textContent = XMAS_MESSAGES[Math.floor(Math.random() * XMAS_MESSAGES.length)];
    els.okSummary.innerHTML = `
      ${Cart.items.map(it => {
        const p = byId(it.id);
        return `<div class="ck-line"><span>${escapeHTML(p.name)} × ${it.qty}</span><strong>${fmt(p.price * it.qty)}</strong></div>`;
      }).join("")}
      <div class="ck-line"><span>Versand (mit dem Rentier-Schlitten)</span><strong>${ship === 0 ? "GRATIS" : fmt(ship)}</strong></div>
      <div class="ck-line total"><span>Gesamt (bezahlt in Weihnachtsfreude)</span><b>${fmt(sub + ship)}</b></div>
      <div class="ck-line"><span>Für</span><strong>dich, natürlich. Frohes Fest!</strong></div>`;

    closeModal(els.checkoutModal);
    setTimeout(() => {
      openModal(els.successModal);
      burstConfetti();
    }, 300);
    Cart.clear();
  }

  function finishSuccess() {
    closeModal(els.successModal);
    toast("Warenkorb geleert – frohes Fest!");
  }

  /* ---------------- Konfetti ---------------- */
  const confettiCanvas = $("#confetti-canvas");
  let confettiRunning = false;

  function burstConfetti() {
    if (!confettiCanvas || reduceMotion) return;
    const ctx = confettiCanvas.getContext("2d");
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    confettiCanvas.width = innerWidth * dpr;
    confettiCanvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const colors = ["#dcbb74", "#c6544a", "#5e9e78", "#f0ebdd", "#a97f42"];
    const cx = innerWidth / 2, cy = innerHeight / 2.4;
    const parts = Array.from({ length: 150 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 8;
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        w: 5 + Math.random() * 6,
        h: 3 + Math.random() * 5,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - .5) * .3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1
      };
    });

    confettiRunning = true;
    const tick = () => {
      if (!confettiRunning) return;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      let alive = 0;
      for (const p of parts) {
        p.vy += 0.18; p.vx *= 0.992; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        p.life -= 0.008;
        if (p.life <= 0 || p.y > innerHeight + 20) continue;
        alive++;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (alive > 0) requestAnimationFrame(tick);
      else { ctx.clearRect(0, 0, innerWidth, innerHeight); confettiRunning = false; }
    };
    requestAnimationFrame(tick);
  }

  /* ---------------- Schneefall ---------------- */
  const snowCanvas = $("#snow-canvas");

  function initSnow() {
    if (!snowCanvas || reduceMotion) {
      if (snowCanvas) snowCanvas.style.display = "none";
      return;
    }
    const ctx = snowCanvas.getContext("2d");
    let flakes = [], w = 0, h = 0, running = true;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    function resize() {
      w = innerWidth; h = innerHeight;
      snowCanvas.width = w * dpr; snowCanvas.height = h * dpr;
      snowCanvas.style.width = w + "px"; snowCanvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.round(w / 14));
      flakes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: .8 + Math.random() * 2.4,
        vy: .3 + Math.random() * .9,
        vx: -.25 + Math.random() * .5,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: .004 + Math.random() * .012,
        opacity: .35 + Math.random() * .5
      }));
    }

    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.sway += f.swaySpeed;
        f.x += f.vx + Math.sin(f.sway) * .35;
        f.y += f.vy;
        if (f.y > h + 4) { f.y = -4; f.x = Math.random() * w; }
        if (f.x > w + 4) f.x = -4;
        if (f.x < -4) f.x = w + 4;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 244, 240, ${f.opacity})`;
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }

    resize();
    addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", () => {
      running = !document.hidden && !reduceMotion;
      if (running) requestAnimationFrame(frame);
    });
    requestAnimationFrame(frame);
  }

  /* ---------------- Adventskalender ---------------- */
  const ADVENT_KEY = "gosiptea_advent_v1";
  const ADVENT = [
    { k: "Tee",   n: "Jade Whisper",                 d: "Der Klassiker unterm Baum." },
    { k: "Notiz", n: "Decke, Kerze, Velvet Earl Grey.", d: "Mehr braucht der Montag nicht." },
    { k: "Tee",   n: "Golden Sunrise Assam",         d: "Morgenkraft für lange Dezembermorgen." },
    { k: "Notiz", n: "Geschenkidee Nr. 1",           d: "Der Adventskalender selbst. Sehr meta, oder?" },
    { k: "Tee",   n: "Moonlight Chamomile",          d: "Ruhe für alle, die viel schenken." },
    { k: "Notiz", n: "Wusstest du?",                 d: "Zimt zählt zu den ältesten Gewürzen der Welt." },
    { k: "Tee",   n: "Crimson Rooibos",              d: "Rubinrot wie die Christkugeln." },
    { k: "Notiz", n: "Auftrag des Tages",            d: "Drei tiefe Atemzüge beim Teekochen." },
    { k: "Tee",   n: "Velvet Earl Grey",             d: "Bergamotte unterm Sternenhimmel." },
    { k: "Notiz", n: "Brühtipp",                     d: "Orangenschalen nur ziehen – nie mitkochen." },
    { k: "Tee",   n: "Midnight Oolong",              d: "Der stille Star der Winterabende." },
    { k: "Notiz", n: "Halbzeit!",                    d: "Belohnung: ein zweiter Keks. Oder drei." },
    { k: "Tee",   n: "Emerald Matcha",               d: "Grün wie der Tannenbaum." },
    { k: "Notiz", n: "Heute bitte",                  d: "Anrufen statt schreiben. Mit Tee." },
    { k: "Tee",   n: "Spekulatius-Stündchen",        d: "Kekse in der Dose, Gewürze in der Tasse." },
    { k: "Notiz", n: "Verschenk-Tipp",               d: "Teedosen lieben Geschenkpapier." },
    { k: "Tee",   n: "Forest Ember Chai",            d: "Kaminfeuer zum Aufgießen." },
    { k: "Notiz", n: "Karaoke-Advent",               d: "Ein Lied laut mitsingen. Tee hilft." },
    { k: "Tee",   n: "Glühglück Orange & Kardamom",  d: "Glühwein-Gefühl, ganz ohne Glühwein." },
    { k: "Notiz", n: "Sonntagsformel",               d: "Fensterbank + Kerze + Jade Whisper." },
    { k: "Tee",   n: "Goldener Bratapfel",           d: "Duftet wie der letzte Adventssonntag." },
    { k: "Notiz", n: "Heute wichtig",                d: "Danke sagen. An jemanden, der es verdient hat." },
    { k: "Tee",   n: "Zimtstern-Chai",               d: "Der Stern über deinem Teeglas." },
    { k: "Notiz", n: "Heiligabend",                  d: "Alles, was zählt, ist in der Tasse – und um dich herum." }
  ];

  function loadOpened() {
    try {
      const arr = JSON.parse(localStorage.getItem(ADVENT_KEY) || "[]");
      return Array.isArray(arr) ? arr.filter(n => Number.isInteger(n) && n >= 1 && n <= 24) : [];
    } catch { return []; }
  }

  function saveOpened(list) {
    try { localStorage.setItem(ADVENT_KEY, JSON.stringify(list)); } catch { /* egal */ }
  }

  function renderAdvent() {
    const opened = loadOpened();
    els.adventGrid.innerHTML = ADVENT.map((item, i) => {
      const day = i + 1;
      const isOpen = opened.includes(day);
      return `
        <button class="door${isOpen ? " is-open" : ""}" data-day="${day}"
                aria-pressed="${isOpen}" aria-label="Türchen ${day} – ${isOpen ? "geöffnet: " + escapeHTML(item.n) : "öffnen"}">
          <span class="door-inner">
            <span class="door-face door-front" aria-hidden="true">
              <span class="door-num">${day}</span>
              <span class="door-snow">${ICONS.snow}</span>
            </span>
            <span class="door-face door-back" aria-hidden="true">
              <span class="door-kicker">Türchen ${day} · ${escapeHTML(item.k)}</span>
              <span class="door-name">${escapeHTML(item.n)}</span>
              <span class="door-text">${escapeHTML(item.d)}</span>
            </span>
          </span>
        </button>`;
    }).join("");
    els.adventCount.textContent = `${opened.length} / 24 geöffnet`;
  }

  function onDoorClick(e) {
    const door = e.target.closest(".door");
    if (!door || door.classList.contains("is-open")) return;
    const day = parseInt(door.dataset.day, 10);
    const item = ADVENT[day - 1];
    door.classList.add("is-open");
    door.setAttribute("aria-pressed", "true");
    door.setAttribute("aria-label", `Türchen ${day} – geöffnet: ${item.n}`);
    const opened = loadOpened();
    if (!opened.includes(day)) { opened.push(day); saveOpened(opened); }
    els.adventCount.textContent = `${opened.length} / 24 geöffnet`;
  }

  function resetAdvent() {
    saveOpened([]);
    renderAdvent();
    toast("Alle Türchen wieder zu – 24 neue Überraschungen warten");
  }

  /* ---------------- Geschenk-Stimmungen → Karten pulsieren ---------------- */
  function goToMood(mood) {
    const target = $("#festtags");
    if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    setTimeout(() => {
      $$(`#xmas-grid .tea-card`).forEach(card => {
        const moods = (card.dataset.mood || "").split(/\s+/);
        card.classList.toggle("is-pulsed", moods.includes(mood));
        if (moods.includes(mood)) {
          setTimeout(() => card.classList.remove("is-pulsed"), 2600);
        }
      });
    }, reduceMotion ? 60 : 620);
  }

  /* ---------------- Events ---------------- */
  function wireEvents() {
    addEventListener("scroll", () => els.header.classList.toggle("is-scrolled", scrollY > 24), { passive: true });

    els.navToggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      els.navToggle.setAttribute("aria-expanded", String(open));
    });
    $$(".nav-link").forEach(a => a.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      els.navToggle.setAttribute("aria-expanded", "false");
    }));

    /* Grid: Add-to-Cart & Karte öffnen (delegiert) */
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

    /* Wunschzettel-Buttons außerhalb des Grids (z. B. Adventskalender-Teaser) */
    document.addEventListener("click", e => {
      const addBtn = e.target.closest("[data-add]");
      if (!addBtn || els.grid.contains(addBtn)) return;
      const p = byId(addBtn.dataset.add);
      if (!p) return;
      Cart.add(p.id);
      toast(`${p.name} liegt auf deinem Wunschzettel`);
    });

    /* Produkt-Modal */
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
        toast(`${currentProduct.name} × ${qty} liegt auf deinem Wunschzettel`);
        closeProduct();
      }
    });
    els.pmClose.addEventListener("click", closeProduct);

    /* Drawer */
    els.cartOpen.addEventListener("click", openDrawer);
    els.cartFab.addEventListener("click", openDrawer);
    els.cartClose.addEventListener("click", closeDrawer);
    els.continueShopping.addEventListener("click", closeDrawer);
    els.drawerOverlay.addEventListener("click", closeDrawer);
    els.drawerItems.addEventListener("click", e => {
      const line = e.target.closest(".cart-line");
      if (!line) return;
      const id = line.dataset.id;
      if (e.target.closest("[data-inc]")) Cart.setQty(id, (Cart.items.find(i => i.id === id)?.qty || 0) + 1);
      else if (e.target.closest("[data-dec]")) Cart.setQty(id, (Cart.items.find(i => i.id === id)?.qty || 1) - 1);
      else if (e.target.closest("[data-remove]")) { Cart.remove(id); toast("Aus dem Warenkorb entfernt"); }
    });

    /* Fake-Checkout */
    els.checkoutOpen.addEventListener("click", openCheckout);
    els.ckClose.addEventListener("click", () => closeModal(els.checkoutModal));
    els.orderSubmit.addEventListener("click", completeFakeOrder);
    els.okDone.addEventListener("click", finishSuccess);

    /* Overlay schließt offene Modals */
    els.modalOverlay.addEventListener("click", () => {
      const open = $$(".modal.is-open")[0];
      if (!open) return;
      if (open === els.productModal) closeProduct();
      else closeModal(open);
    });

    /* Escape schließt die oberste Ebene */
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

    /* Adventskalender */
    els.adventGrid.addEventListener("click", onDoorClick);
    els.adventReset.addEventListener("click", resetAdvent);

    /* Stimmungen */
    $$(".mood-card[data-mood-link]").forEach(card =>
      card.addEventListener("click", () => goToMood(card.dataset.moodLink)));

    /* Warenkorb-Reaktivität */
    Cart.onChange(() => { updateBadge(); renderDrawer(); });
  }

  /* ---------------- Reveal-Animationen ---------------- */
  function initReveal() {
    if (!("IntersectionObserver" in window)) {
      $$("[data-reveal]").forEach(el => el.classList.add("is-revealed"));
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
  }

  /* ---------------- Start ---------------- */
  function init() {
    initTheme();
    renderGrid();
    renderAdvent();
    updateBadge(false);
    renderDrawer();
    wireEvents();
    initReveal();
    initSnow();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
