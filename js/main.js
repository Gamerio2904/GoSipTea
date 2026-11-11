/* ==========================================================================
   GoSipTea — UI-Basis: Header, mobile Navigation, Theme-Toggle,
   Reveal-Animationen, Accordion, Newsletter, Toast.
   ========================================================================== */

(function () {
  "use strict";

  /* Progressive Enhancement: Reveal-Animationen nur mit JS */
  document.documentElement.classList.add("js");

  /* ---------- Theme ------------------------------------------------------ */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.setAttribute("aria-checked", t === "dark" ? "true" : "false");
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("gosiptea_theme"); } catch (e) { }
    applyTheme(saved === "dark" ? "dark" : "light");
    document.addEventListener("click", function (e) {
      if (!e.target.closest("#theme-toggle")) return;
      var cur = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(cur);
      try { localStorage.setItem("gosiptea_theme", cur); } catch (err) { }
    });
  }

  /* ---------- Header-Scrollzustand ---------------------------------------- */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile Navigation ------------------------------------------- */
  function initMobileNav() {
    var burger = document.getElementById("burger");
    var menu = document.getElementById("mobile-nav");
    if (!burger || !menu) return;
    function set(open) {
      menu.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    }
    burger.addEventListener("click", function () {
      set(!menu.classList.contains("is-open"));
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.closest(".mobile-nav__close")) set(false);
    });
  }

  /* ---------- Kopfzeilen-Suche --------------------------------------------- */
  function initSearch() {
    var wrap = document.getElementById("hdr-search");
    if (!wrap) return;
    var btn = wrap.querySelector("#search-toggle");
    var input = wrap.querySelector("input[name='q']");
    function set(open) {
      wrap.classList.toggle("is-open", open);
      if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open && input) input.focus();
    }
    if (btn) btn.addEventListener("click", function () { set(!wrap.classList.contains("is-open")); });
    document.addEventListener("click", function (e) {
      if (wrap.classList.contains("is-open") && !e.target.closest("#hdr-search")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && wrap.classList.contains("is-open")) set(false);
    });
  }

  /* ---------- Dropdown-Navigation (Klick + Tastatur) ----------------------- */
  function initDropdowns() {
    document.querySelectorAll(".nav__item--sub > .nav__parent").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var item = btn.parentElement;
        var open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        document.querySelectorAll(".nav__item--sub.is-open").forEach(function (o) {
          if (o !== item) {
            o.classList.remove("is-open");
            var b = o.querySelector(".nav__parent");
            if (b) b.setAttribute("aria-expanded", "false");
          }
        });
      });
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".nav__item--sub")) {
        document.querySelectorAll(".nav__item--sub.is-open").forEach(function (o) {
          o.classList.remove("is-open");
          var b = o.querySelector(".nav__parent");
          if (b) b.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  /* ---------- Nach-oben-Button --------------------------------------------- */
  function initToTop() {
    var btn = document.getElementById("to-top");
    if (!btn) return;
    var onScroll = function () {
      btn.classList.toggle("is-visible", window.scrollY > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Reveal-Animationen ------------------------------------------- */
  function observeReveals(root) {
    var els = (root || document).querySelectorAll(".reveal:not(.is-in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Accordion ------------------------------------------------------ */
  function initAccordions() {
    document.querySelectorAll(".acc__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var panel = btn.nextElementSibling;
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        if (panel) panel.classList.toggle("is-open", !open);
      });
    });
  }

  /* ---------- Newsletter (Demo, ohne Übertragung) ------------------------------ */
  function initNewsletter() {
    document.querySelectorAll("[data-newsletter]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        var ok = form.parentElement.querySelector(".news__ok");
        if (ok && input && input.value.trim()) {
          form.hidden = true;
          ok.hidden = false;
          if (window.GSTUI) GSTUI.toast("Danke! (Demo – es werden keine Daten übermittelt.)");
        }
      });
    });
  }

  /* ---------- Toast + Warenkorb-Puls --------------------------------------------- */
  var toastTimer = null;
  function toast(msg) {
    var el = document.getElementById("toast");
    if (!el) return;
    el.querySelector("span").textContent = msg;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("is-visible"); }, 2800);
  }

  function pulseCart() {
    var btn = document.getElementById("cart-open");
    if (!btn) return;
    btn.style.transform = "scale(1.15)";
    setTimeout(function () { btn.style.transform = ""; }, 220);
  }

  /* ---------- Start ---------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initHeader();
    initMobileNav();
    initSearch();
    initDropdowns();
    initToTop();
    initAccordions();
    initNewsletter();
    observeReveals(document);
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  });

  window.GSTUI = { toast: toast, pulseCart: pulseCart, observeReveals: observeReveals };
})();
