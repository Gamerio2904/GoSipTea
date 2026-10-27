/* ==========================================================================
   GoSipTea — Cart Module
   Client-side persistent cart backed by localStorage.
   100% private: nothing leaves the browser (no keys, no network).
   API:
     Cart.add(id, qty)      Cart.setQty(id, qty)   Cart.remove(id)
     Cart.clear()           Cart.count()           Cart.subtotal()
     Cart.items -> [{id, qty}]                     Cart.onChange(fn)
   Emits: document event "cart:change" after every mutation.
   ========================================================================== */

const Cart = (() => {
  "use strict";

  const KEY = "gosiptea_cart_v1";

  /* ---- persistence ---- */
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      // Sanitize: keep only valid {id, qty} pairs for products that exist
      return parsed
        .filter(it => it && typeof it.id === "string" && Number.isFinite(it.qty))
        .map(it => ({ id: it.id, qty: Math.max(1, Math.min(99, Math.floor(it.qty))) }))
        .filter(it => window.GOSIP.byId(it.id));
    } catch {
      return []; // corrupted storage -> start fresh, never crash
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable (private mode) — cart simply won't persist */
    }
  }

  let items = load();

  function emit() {
    document.dispatchEvent(new CustomEvent("cart:change", { detail: { items } }));
  }

  /* ---- mutations ---- */
  function add(id, qty = 1) {
    const product = window.GOSIP.byId(id);
    if (!product) return;
    qty = Math.max(1, Math.min(99, Math.floor(qty)));
    const existing = items.find(it => it.id === id);
    if (existing) {
      existing.qty = Math.min(99, existing.qty + qty);
    } else {
      items.push({ id, qty });
    }
    save(); emit();
  }

  function setQty(id, qty) {
    const item = items.find(it => it.id === id);
    if (!item) return;
    qty = Math.floor(qty);
    if (qty <= 0) return remove(id);
    item.qty = Math.min(99, qty);
    save(); emit();
  }

  function remove(id) {
    items = items.filter(it => it.id !== id);
    save(); emit();
  }

  function clear() {
    items = [];
    save(); emit();
  }

  /* ---- derived values ---- */
  function count() {
    return items.reduce((sum, it) => sum + it.qty, 0);
  }

  function subtotal() {
    return items.reduce((sum, it) => {
      const p = window.GOSIP.byId(it.id);
      return p ? sum + p.price * it.qty : sum;
    }, 0);
  }

  function onChange(fn) {
    document.addEventListener("cart:change", fn);
  }

  return { get items() { return items; }, add, setQty, remove, clear, count, subtotal, onChange };
})();

window.Cart = Cart;
