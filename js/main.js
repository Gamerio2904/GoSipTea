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
    initAccordions();
    initNewsletter();
    observeReveals(document);
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  });

  window.GSTUI = { toast: toast, pulseCart: pulseCart, observeReveals: observeReveals };
})();
