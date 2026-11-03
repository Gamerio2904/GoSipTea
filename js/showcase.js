/* ==========================================================================
   GoSipTea — Home Showcase (index.html only)
   Yogi-style home additions that reuse the existing card renderer:
   1. "Discover your next favorite tea" — horizontal product carousel
   2. Category tiles (Green / Black / Herbal / Special) that drive the
      existing explorer filter chips
   3. Global delegated handlers so persona & quiz cards outside the grid
      can add to cart (data-add) and open the product modal (data-open)
   Depends on: products.js, cart.js, app.js (window.GoSipCard / GoSipOpen /
   GoSipToast bridges).
   ========================================================================== */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const byId = window.GOSIP.byId;
  const reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- 1. Showcase carousel ---------------- */
  const SHOWCASE_IDS = [
    "berry-balance",     /* persona pick — Mia */
    "golden-harmony",    /* persona pick — Jonas */
    "jade-whisper",
    "velvet-earl-grey",
    "forest-ember-chai",
    "moonlight-chamomile"
  ];

  function renderShowcase() {
    const track = $("#showcase-track");
    if (!track || typeof window.GoSipCard !== "function") return;
    const items = SHOWCASE_IDS.map(byId).filter(Boolean);
    track.innerHTML = items.map(p => `<li>${window.GoSipCard(p)}</li>`).join("");
  }

  function wireCarousel() {
    const track = $("#showcase-track");
    if (!track) return;
    $$("[data-carousel]").forEach(btn => {
      btn.addEventListener("click", () => {
        const dir = btn.dataset.carousel === "next" ? 1 : -1;
        const step = Math.min(track.clientWidth * 0.85, 640);
        track.scrollBy({
          left: dir * step,
          behavior: reduceMotion ? "auto" : "smooth"
        });
      });
    });
  }

  /* ---------------- 2. Category tiles → explorer chips ---------------- */
  function renderCategoryTiles() {
    const wrap = $("#cat-tiles");
    if (!wrap) return;
    const signature = window.TEA_PRODUCTS.filter(p => p.collection !== "christmas");
    const tiles = [
      { key: "green",  label: "Green Tea",   blurb: "Fresh, focused, vegetal" },
      { key: "black",  label: "Black Tea",   blurb: "Classic, mellow, malty" },
      { key: "herbal", label: "Herbal Tea",  blurb: "Caffeine-free calm & fruit" },
      { key: "special",label: "Special Editions", blurb: "Small batches & rarities" }
    ];
    wrap.innerHTML = tiles.map(t => {
      const n = signature.filter(p => p.category === t.key).length;
      return `
        <button class="cat-tile glass" data-cat-tile="${t.key}" aria-label="Show ${t.label} in the collection">
          <span class="cat-count">${n} teas</span>
          <span class="cat-label">${t.label}</span>
          <span class="cat-blurb">${t.blurb}</span>
          <span class="cat-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </button>`;
    }).join("");

    wrap.addEventListener("click", e => {
      const tile = e.target.closest("[data-cat-tile]");
      if (!tile) return;
      const key = tile.dataset.catTile;
      const chip = $(`.chip[data-category="${key}"]`);
      if (chip) chip.click();
      const collection = $("#collection");
      if (collection) {
        collection.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
    });
  }

  /* ---------------- 3. Global data-add / data-open (outside the grid) ---------------- */
  function wireGlobalActions() {
    document.addEventListener("click", e => {
      const addBtn = e.target.closest("[data-add]");
      if (addBtn && !$("#tea-grid")?.contains(addBtn)) {
        const p = byId(addBtn.dataset.add);
        if (!p) return;
        e.stopPropagation();
        window.Cart.add(p.id);
        if (window.GoSipToast) window.GoSipToast(`${p.name} added to your ritual`);
        addBtn.classList.add("is-added");
        setTimeout(() => addBtn.classList.remove("is-added"), 900);
        return;
      }
      const openBtn = e.target.closest("[data-open]");
      if (openBtn && typeof window.GoSipOpen === "function") {
        window.GoSipOpen(openBtn.dataset.open);
      }
    });
  }

  /* ---------------- boot ---------------- */
  function init() {
    renderShowcase();
    wireCarousel();
    renderCategoryTiles();
    wireGlobalActions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
