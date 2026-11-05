/* ==========================================================================
   GoSipTea — Warenkorb (Demo)
   Speichert ausschließlich lokal (localStorage). Es werden keine Daten
   übertragen und keine Bestellungen möglich gemacht.
   ========================================================================== */

(function () {
  "use strict";

  var STORAGE_KEY = "gst_cart_v2";
  var FREE_SHIPPING_AT = 30;
  var SHIPPING_FEE = 4.9;

  function read() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr.filter(function (l) { return l && l.id && l.qty > 0; }) : [];
    } catch (e) { return []; }
  }

  function write(lines) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lines)); } catch (e) { /* Demo */ }
  }

  function product(line) {
    return window.GOSIP ? GOSIP.productById(line.id) : null;
  }

  function lines() {
    return read().map(function (l) {
      var p = product(l);
      return p ? { id: p.id, qty: l.qty, p: p } : null;
    }).filter(Boolean);
  }

  function count() {
    return read().reduce(function (n, l) { return n + l.qty; }, 0);
  }

  function subtotal() {
    return lines().reduce(function (s, l) { return s + l.p.price * l.qty; }, 0);
  }

  function shipping() {
    var sub = subtotal();
    if (sub === 0) return 0;
    return sub >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE;
  }

  function add(id, qty) {
    qty = qty || 1;
    var p = GOSIP.productById(id);
    if (!p) return;
    var ls = read();
    var found = ls.find(function (l) { return l.id === id; });
    if (found) { found.qty += qty; } else { ls.push({ id: id, qty: qty }); }
    write(ls);
    render();
    if (window.GSTUI) {
      GSTUI.toast(p.name + " wurde in den Warenkorb gelegt.");
      GSTUI.pulseCart();
    }
  }

  function setQty(id, qty) {
    var ls = read();
    var found = ls.find(function (l) { return l.id === id; });
    if (!found) return;
    found.qty = Math.max(0, qty);
    if (found.qty === 0) ls = ls.filter(function (l) { return l.id !== id; });
    write(ls);
    render();
  }

  function remove(id) {
    write(read().filter(function (l) { return l.id !== id; }));
    render();
  }

  function clear() {
    write([]);
    render();
  }

  /* ---------- Drawer-Rendering ------------------------------------------ */
  function eur(n) {
    return (Math.round(n * 100) / 100).toLocaleString("de-DE", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + " €";
  }

  function render() {
    var badge = document.getElementById("cart-count");
    var c = count();
    if (badge) {
      badge.textContent = String(c);
      badge.classList.toggle("is-visible", c > 0);
    }
    var body = document.getElementById("cart-lines");
    if (!body) return;
    var ls = lines();
    if (!ls.length) {
      body.innerHTML =
        '<div class="cart-empty">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M6 7h12l-1.2 12.1a2 2 0 0 1-2 1.9H9.2a2 2 0 0 1-2-1.9L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>' +
        "<p><strong>Dein Warenkorb ist leer.</strong><br>Entdecke unsere Tees und Probierpakete.</p>" +
        '<a class="btn btn--primary btn--sm" href="' + (document.body.dataset.prefix || "") + 'sortiment.html">Zum Sortiment</a>' +
        "</div>";
    } else {
      var prefix = document.body.dataset.prefix || "";
      body.innerHTML = ls.map(function (l) {
        return (
          '<div class="cart-line" data-line="' + l.id + '">' +
          '<img class="cart-line__img" src="' + prefix + l.p.img + '" alt="' + l.p.name + '" loading="lazy">' +
          "<div>" +
          '<p class="cart-line__name">' + l.p.name + "</p>" +
          '<p class="cart-line__meta">' + l.p.size + "</p>" +
          '<div class="qty">' +
          '<button type="button" data-dec="' + l.id + '" aria-label="Menge verringern">−</button>' +
          "<span>" + l.qty + "</span>" +
          '<button type="button" data-inc="' + l.id + '" aria-label="Menge erhöhen">+</button>' +
          "</div></div>" +
          '<div class="cart-line__right">' +
          '<span class="cart-line__price">' + eur(l.p.price * l.qty) + "</span>" +
          '<button type="button" class="cart-line__remove" data-remove="' + l.id + '">Entfernen</button>' +
          "</div></div>"
        );
      }).join("");
    }
    var subEl = document.getElementById("cart-subtotal");
    if (subEl) subEl.textContent = eur(subtotal());
    var shipEl = document.getElementById("cart-shipping-note");
    if (shipEl) {
      shipEl.textContent = subtotal() === 0
        ? "Beispiel-Versand: kostenlos ab 30 €."
        : (shipping() === 0 ? "Beispiel-Versand: kostenlos." : "Beispiel-Versand: " + eur(shipping()) + " – kostenlos ab 30 €.");
    }
    var totalEl = document.getElementById("cart-total");
    if (totalEl) totalEl.textContent = eur(subtotal() + shipping());
    var checkoutBtn = document.getElementById("cart-checkout");
    if (checkoutBtn) checkoutBtn.classList.toggle("is-hidden", ls.length === 0);
  }

  function open() {
    var d = document.getElementById("cart-drawer");
    var o = document.getElementById("cart-overlay");
    if (!d) return;
    d.classList.add("is-open");
    if (o) o.classList.add("is-open");
    d.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var closeBtn = d.querySelector(".cart-drawer__close");
    if (closeBtn) closeBtn.focus();
  }

  function close() {
    var d = document.getElementById("cart-drawer");
    var o = document.getElementById("cart-overlay");
    if (!d) return;
    d.classList.remove("is-open");
    if (o) o.classList.remove("is-open");
    d.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  /* ---------- Event-Delegation ------------------------------------------- */
  document.addEventListener("click", function (e) {
    var t = e.target;
    var addBtn = t.closest("[data-add]");
    if (addBtn) {
      add(addBtn.getAttribute("data-add"));
      addBtn.classList.add("is-added");
      setTimeout(function () { addBtn.classList.remove("is-added"); }, 900);
      return;
    }
    var inc = t.closest("[data-inc]");
    if (inc) { setQty(inc.getAttribute("data-inc"), (read().find(function (l) { return l.id === inc.getAttribute("data-inc"); }) || { qty: 0 }).qty + 1); return; }
    var dec = t.closest("[data-dec]");
    if (dec) {
      var id = dec.getAttribute("data-dec");
      var cur = (read().find(function (l) { return l.id === id; }) || { qty: 0 }).qty;
      setQty(id, cur - 1);
      return;
    }
    var rem = t.closest("[data-remove]");
    if (rem) { remove(rem.getAttribute("data-remove")); return; }
    if (t.closest("#cart-open")) { open(); return; }
    if (t.closest(".cart-drawer__close") || t.closest("#cart-overlay")) { close(); return; }
    if (t.closest("#cart-checkout")) {
      var prefix = document.body.dataset.prefix || "";
      window.location.href = prefix + "kasse.html";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });

  document.addEventListener("DOMContentLoaded", render);

  window.Cart = {
    add: add,
    remove: remove,
    setQty: setQty,
    clear: clear,
    lines: lines,
    count: count,
    subtotal: subtotal,
    shipping: shipping,
    eur: eur,
    render: render,
    open: open,
    close: close,
    FREE_SHIPPING_AT: FREE_SHIPPING_AT,
    SHIPPING_FEE: SHIPPING_FEE
  };
})();
