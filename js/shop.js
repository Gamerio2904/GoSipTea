/* ==========================================================================
   GoSipTea — Shop-Rendering
   Einheitliche Produktkarten, Sortiment-Filter, Produktdetailseite,
   Kassenübersicht. Alle Texte Deutsch.
   ========================================================================== */

(function () {
  "use strict";

  var PREFIX = document.body.dataset.prefix || "";

  /* ---------- Icon-Snippets --------------------------------------------- */
  var ICON_PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  var ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>';

  /* ---------- Einheitliche Produktkarte ---------------------------------- */
  function intensityDots(n) {
    var out = '<span class="int__dots" aria-hidden="true">';
    for (var i = 1; i <= 3; i++) out += '<i class="int__dot' + (i <= n ? " is-on" : "") + '"></i>';
    return out + "</span>";
  }

  function buildCard(p, opts) {
    opts = opts || {};
    var cat = GOSIP.catById(p.cat);
    var href = opts.href || (PREFIX + "produkt.html?id=" + encodeURIComponent(p.id));
    var imgPrefix = opts.imgPrefix !== undefined ? opts.imgPrefix : PREFIX;
    var badge = p.badge
      ? '<span class="p-card__badge' + (p.badge === "Neu" ? " p-card__badge--accent" : "") + '">' + p.badge + "</span>"
      : "";
    var tags = p.tastes.map(function (t) { return '<span class="tag">' + t + "</span>"; }).join("");
    var imgAlt = p.img2
      ? '<img class="p-card__img p-card__img--alt" src="' + imgPrefix + p.img2 + '" alt="' + p.name + " – zweite Ansicht" + '" loading="lazy" width="880" height="880">'
      : "";
    return (
      '<article class="p-card' + (opts.reveal ? " reveal" : "") + '">' +
      '<a class="p-card__media" href="' + href + '" aria-label="' + p.name + ' ansehen">' +
      '<img class="p-card__img" src="' + imgPrefix + p.img + '" alt="' + p.name + " – " + (cat ? cat.name : "Tee") + '" loading="lazy" width="880" height="880">' +
      imgAlt +
      badge +
      "</a>" +
      '<div class="p-card__body">' +
      '<p class="p-card__cat">' + (cat ? cat.name : "") + "</p>" +
      '<h3 class="p-card__name"><a href="' + href + '">' + p.name + "</a></h3>" +
      '<p class="p-card__notes">' + p.notes + "</p>" +
      '<div class="p-card__meta">' +
      '<span class="int">' + intensityDots(p.intensity) + GOSIP.intensityLabel(p.intensity) + "</span>" +
      '<span class="p-card__tags">' + tags + "</span>" +
      "</div>" +
      '<div class="p-card__foot">' +
      '<span class="p-card__price">' + GOSIP.eur(p.price) + "<small>" + p.size + "</small></span>" +
      '<div class="p-card__actions">' +
      '<button type="button" class="p-card__add" data-add="' + p.id + '" aria-label="' + p.name + ' in den Warenkorb legen (Demo)">' + ICON_PLUS + "</button>" +
      '<a class="btn btn--sm ' + (opts.ghostBtn ? "btn--ghost" : "btn--primary") + '" href="' + href + '">Mehr erfahren</a>' +
      "</div></div></div></article>"
    );
  }

  /* ---------- Grid-Container füllen --------------------------------------- */
  function fillGrids() {
    var grids = document.querySelectorAll("[data-gst-grid]");
    grids.forEach(function (el) {
      var spec = el.getAttribute("data-gst-grid");
      var mode = spec.split(":")[0];
      var arg = spec.split(":")[1];
      var items;
      if (mode === "cat") items = GOSIP.productsByCat(arg);
      else if (mode === "ids") items = arg.split(",").map(function (id) { return GOSIP.productById(id.trim()); }).filter(Boolean);
      else items = GOSIP.products.slice(0, 4);
      el.innerHTML = items.map(function (p) { return buildCard(p, { reveal: true, ghostBtn: el.hasAttribute("data-ghost") }); }).join("");
      if (window.GSTUI) GSTUI.observeReveals(el);
    });
  }

  /* ---------- Sortiment + Filter ------------------------------------------- */
  var state = { cat: "", tastes: [], intensity: "", price: "", q: "" };

  function priceMatch(p) {
    if (state.price === "a") return p.price <= 6;
    if (state.price === "b") return p.price > 6 && p.price <= 9;
    if (state.price === "c") return p.price > 9;
    return true;
  }

  function applyFilters() {
    var grid = document.getElementById("sortiment-grid");
    if (!grid) return;
    var q = state.q.trim().toLowerCase();
    var items = GOSIP.products.filter(function (p) {
      if (state.cat && p.cat !== state.cat) return false;
      if (state.tastes.length && !state.tastes.some(function (t) { return p.tastes.indexOf(t) !== -1; })) return false;
      if (state.intensity && String(p.intensity) !== state.intensity) return false;
      if (!priceMatch(p)) return false;
      if (q) {
        var hay = (p.name + " " + p.notes + " " + p.desc + " " + p.tastes.join(" ")).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
    var countEl = document.getElementById("filter-count");
    if (countEl) countEl.textContent = items.length + " von " + GOSIP.products.length + " Tees";
    var none = document.getElementById("no-results");
    if (none) none.hidden = items.length > 0;
    grid.innerHTML = items.map(function (p) { return buildCard(p, { reveal: true }); }).join("");
    if (window.GSTUI) GSTUI.observeReveals(grid);
  }

  function initFilters() {
    var bar = document.getElementById("filterbar");
    if (!bar) return;
    var params = new URLSearchParams(location.search);
    if (params.get("cat")) state.cat = params.get("cat");
    if (params.get("geschmack")) state.tastes = [params.get("geschmack")];
    if (params.get("intensitaet")) state.intensity = params.get("intensitaet");
    if (params.get("q")) {
      state.q = params.get("q");
      var sIn = document.getElementById("filter-search");
      if (sIn) sIn.value = state.q;
    }

    bar.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      var kind = chip.getAttribute("data-kind");
      var val = chip.getAttribute("data-val");
      if (kind === "cat") {
        state.cat = state.cat === val ? "" : val;
        bar.querySelectorAll('.chip[data-kind="cat"]').forEach(function (c) { c.classList.toggle("is-active", c.getAttribute("data-val") === state.cat); });
      } else if (kind === "taste") {
        var i = state.tastes.indexOf(val);
        if (i === -1) state.tastes.push(val); else state.tastes.splice(i, 1);
        chip.classList.toggle("is-active", i === -1);
      }
      applyFilters();
    });

    bar.addEventListener("change", function (e) {
      var t = e.target;
      if (t.id === "filter-cat") state.cat = t.value;
      if (t.id === "filter-intensity") state.intensity = t.value;
      if (t.id === "filter-price") state.price = t.value;
      applyFilters();
    });

    var search = document.getElementById("filter-search");
    if (search) {
      search.addEventListener("input", function () {
        state.q = search.value;
        applyFilters();
      });
    }

    var reset = document.getElementById("filter-reset");
    if (reset) {
      reset.addEventListener("click", function () {
        state = { cat: "", tastes: [], intensity: "", price: "", q: "" };
        bar.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-active"); });
        var i0 = document.getElementById("filter-cat"); if (i0) i0.value = "";
        var i1 = document.getElementById("filter-intensity"); if (i1) i1.value = "";
        var i2 = document.getElementById("filter-price"); if (i2) i2.value = "";
        var i3 = document.getElementById("filter-search"); if (i3) i3.value = "";
        applyFilters();
      });
    }

    /* Vorauswahl aus URL übernehmen */
    var catSel = document.getElementById("filter-cat");
    if (catSel && state.cat) catSel.value = state.cat;
    state.tastes.forEach(function (t) {
      var chip = bar.querySelector('.chip[data-kind="taste"][data-val="' + t + '"]');
      if (chip) chip.classList.add("is-active");
    });
    var iSel = document.getElementById("filter-intensity");
    if (iSel && state.intensity) iSel.value = state.intensity;
    applyFilters();
  }

  /* ---------- Produktdetailseite ------------------------------------------- */
  function initDetail() {
    var root = document.getElementById("detail-root");
    if (!root) return;
    var id = new URLSearchParams(location.search).get("id") || "";
    var p = GOSIP.productById(id);
    var fallback = document.getElementById("detail-fallback");
    if (!p) {
      if (fallback) fallback.hidden = false;
      root.hidden = true;
      return;
    }
    document.title = p.name + " | GoSipTea – Tee, der verbindet";
    var cat = GOSIP.catById(p.cat);
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", p.name + " – " + p.notes + ". " + p.size + " für " + GOSIP.eur(p.price) + ". Jetzt bei GoSipTea entdecken (Demo-Shop).");

    /* Breadcrumb */
    var bc = document.getElementById("breadcrumb");
    if (bc) {
      var li = bc.querySelectorAll("li");
      if (li.length >= 3) li[2].innerHTML = '<span aria-current="page">' + p.name + "</span>";
    }

    /* Bild + Info + zweite Ansicht */
    var img = document.getElementById("detail-img");
    if (img) {
      img.src = p.img;
      img.alt = p.name + " – " + (cat ? cat.name : "Tee");
    }
    var thumbs = document.getElementById("detail-thumbs");
    if (thumbs) {
      var tA = thumbs.querySelector(".detail-thumb--a img");
      var tB = thumbs.querySelector(".detail-thumb--b");
      if (tA) tA.src = p.img;
      if (tB) {
        if (p.img2) {
          tB.hidden = false;
          tB.querySelector("img").src = p.img2;
        } else {
          tB.hidden = true;
        }
      }
      thumbs.addEventListener("click", function (e) {
        var btn = e.target.closest(".detail-thumb");
        if (!btn || !img) return;
        var src = btn.querySelector("img").getAttribute("src");
        if (src) img.src = src;
        thumbs.querySelectorAll(".detail-thumb").forEach(function (b) { b.classList.toggle("is-active", b === btn); });
      });
    }
    var badge = document.getElementById("detail-badge");
    if (badge) {
      if (p.badge) { badge.textContent = p.badge; badge.hidden = false; }
    }
    document.getElementById("detail-cat").textContent = cat ? cat.name : "";
    document.getElementById("detail-name").textContent = p.name;
    document.getElementById("detail-notes").textContent = p.notes;
    document.getElementById("detail-price").textContent = GOSIP.eur(p.price);
    document.getElementById("detail-size").textContent = p.size;
    document.getElementById("detail-desc").textContent = p.desc;
    document.getElementById("detail-add").setAttribute("data-add", p.id);

    /* Specs */
    document.getElementById("spec-intensity").textContent = GOSIP.intensityLabel(p.intensity);
    document.getElementById("spec-caffeine").textContent = GOSIP.caffeineLabel(p.caffeine);
    document.getElementById("spec-cat").textContent = cat ? cat.name : "";

    /* Intensität im Spec: Dots */
    document.getElementById("spec-intensity-dots").innerHTML = intensityDots(p.intensity);

    /* Tags + Zertifikate */
    document.getElementById("detail-tags").innerHTML = p.tastes.map(function (t) { return '<span class="tag">' + t + "</span>"; }).join("");
    document.getElementById("detail-cert").innerHTML = p.cert.map(function (c) { return '<span class="tag">' + c + "</span>"; }).join("");

    /* Accordion-Inhalte */
    document.getElementById("acc-ingredients").innerHTML = "<ul>" + p.ingredients.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>";
    document.getElementById("acc-brew").innerHTML =
      '<div class="brew-row">' +
      '<span class="brew-pill">Wassertemperatur: ' + p.brew.temp + "</span>" +
      '<span class="brew-pill">Ziehzeit: ' + p.brew.time + "</span>" +
      '<span class="brew-pill">Dosierung: ' + p.brew.amount + "</span>" +
      "</div>";
    document.getElementById("acc-origin").innerHTML =
      "<ul><li><strong>Herkunft:</strong> " + p.origin + "</li>" +
      '<li><strong>Qualitätsanspruch:</strong> Natürliche Zutaten, schonende Verarbeitung und transparente Angaben – nachvollziehbar aufbereitet in unserem Atelier.</li>' +
      '<li><strong>Verpackung:</strong> Aromasicherer, wiederverschließbarer Beutel, plastikfrei (Beispieldaten).</li></ul>';
    document.getElementById("acc-shipping").innerHTML =
      "<ul><li><strong>Demo-Hinweis:</strong> Dieses Projekt ist ein studentischer Demonstrationsshop – Bestellungen und Zahlungen sind nicht möglich.</li>" +
      "<li><strong>Beispiel-Versand:</strong> 4,90 €, ab 30 € kostenfrei (Beispieldaten).</li>" +
      "<li><strong>Keine Zahlungsdaten:</strong> Wir fragen und speichern keine Zahlungsdaten ab.</li></ul>";

    /* Ähnliche Produkte */
    var rel = document.getElementById("related-grid");
    if (rel) {
      var relItems = GOSIP.productsByCat(p.cat).filter(function (x) { return x.id !== p.id; }).slice(0, 4);
      if (relItems.length < 3) {
        GOSIP.products.forEach(function (x) {
          if (relItems.length < 4 && x.id !== p.id && relItems.indexOf(x) === -1 && x.badge === "Bestseller") relItems.push(x);
        });
      }
      rel.innerHTML = relItems.slice(0, 4).map(function (x) { return buildCard(x, { reveal: true }); }).join("");
      if (window.GSTUI) GSTUI.observeReveals(rel);
    }

    /* JSON-LD Product (Demo) */
    try {
      var ld = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: p.name,
        description: p.notes + ". " + p.desc,
        image: new URL(p.img, location.href).href,
        brand: { "@type": "Brand", name: "GoSipTea" },
        offers: {
          "@type": "Offer",
          price: String(p.price),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: location.href
        }
      };
      var s = document.createElement("script");
      s.type = "application/ld+json";
      s.textContent = JSON.stringify(ld);
      document.head.appendChild(s);
    } catch (e) { /* Demo */ }
  }

  /* ---------- Kasse (Demo-Checkout) ------------------------------------------ */
  function initCheckout() {
    var table = document.getElementById("checkout-table-body");
    if (!table) return;
    var ls = Cart.lines();
    if (!ls.length) {
      table.innerHTML =
        '<tr><td colspan="4"><div class="cart-empty"><p><strong>Dein Warenkorb ist leer.</strong></p>' +
        '<a class="btn btn--primary btn--sm" href="sortiment.html">Zum Sortiment</a></div></td></tr>';
      var actions = document.getElementById("checkout-actions");
      if (actions) actions.hidden = true;
      return;
    }
    table.innerHTML = ls.map(function (l) {
      return (
        "<tr><td>" +
        '<span class="t-prod"><img src="' + l.p.img + '" alt="' + l.p.name + '">' +
        "<span>" + l.p.name + "<small>" + l.p.size + "</small></span></span></td>" +
        '<td data-label="Menge">' + l.qty + "</td>" +
        '<td data-label="Einzelpreis">' + Cart.eur(l.p.price) + "</td>" +
        '<td data-label="Summe"><strong>' + Cart.eur(l.p.price * l.qty) + "</strong></td></tr>"
      );
    }).join("");
    var sub = Cart.subtotal(), ship = Cart.shipping();
    document.getElementById("sum-subtotal").textContent = Cart.eur(sub);
    document.getElementById("sum-shipping").textContent = ship === 0 ? "kostenlos" : Cart.eur(ship);
    document.getElementById("sum-total").textContent = Cart.eur(sub + ship);
    var btn = document.getElementById("demo-checkout-btn");
    var msg = document.getElementById("checkout-msg");
    if (btn) {
      btn.addEventListener("click", function () {
        if (msg) {
          msg.hidden = false;
          msg.innerHTML = "<strong>Demo-Checkout bestätigt – kein Kauf getätigt.</strong><br>Dies ist ein studentisches Demonstrationsprojekt. Es wurde keine Bestellung übermittelt, kein Vertrag geschlossen und keine Zahlungsdaten abgefragt oder gespeichert.";
          msg.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        if (window.GSTUI) GSTUI.toast("Demo-Checkout: Es findet kein echter Kauf statt.");
      });
    }
    var clearBtn = document.getElementById("cart-clear");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        Cart.clear();
        location.reload();
      });
    }
  }

  /* ---------- Start ---------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    fillGrids();
    initFilters();
    initDetail();
    initCheckout();
  });

  /* öffentliche Mini-API */
  window.GSTSHOP = { buildCard: buildCard };
})();
