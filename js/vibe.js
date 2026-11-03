/* ==========================================================================
   GoSipTea — Vibe layer (both pages)
   1. Pointer-driven 3D tilt on cards (+ soft glare via --gx/--gy custom
      properties that a ::after overlay can consume)
   2. Magnetic primary CTAs

   Desktop-only (hover + fine pointer) and skipped under
   prefers-reduced-motion. Inline transforms are cleared on pointer-out so
   the stylesheet's own hover states take over again.
   ========================================================================== */

(() => {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  /* ---------------- 1. card tilt ---------------- */
  const TILT_SEL = ".tea-card, .persona-card, .mood-card, .showcase-card, .qz-option";

  let current = null;
  let raf = 0;
  let lastX = 0, lastY = 0;

  function reset(card) {
    card.style.transform = "";
    card.style.removeProperty("--gx");
    card.style.removeProperty("--gy");
  }

  function apply() {
    raf = 0;
    const card = current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const nx = (lastX - r.left) / r.width - 0.5;
    const ny = (lastY - r.top) / r.height - 0.5;
    card.style.transform =
      "perspective(950px) rotateX(" + (-ny * 6).toFixed(2) + "deg)" +
      " rotateY(" + (nx * 8).toFixed(2) + "deg) translateY(-2px)";
    card.style.setProperty("--gx", ((nx + 0.5) * 100).toFixed(1) + "%");
    card.style.setProperty("--gy", ((ny + 0.5) * 100).toFixed(1) + "%");
  }

  document.addEventListener("pointermove", (e) => {
    const card = e.target && e.target.closest ? e.target.closest(TILT_SEL) : null;
    if (card !== current) {
      if (current) reset(current);
      current = card;
    }
    if (!current) return;
    lastX = e.clientX;
    lastY = e.clientY;
    if (!raf) raf = requestAnimationFrame(apply);
  }, { passive: true });

  document.addEventListener("pointerout", (e) => {
    if (!current) return;
    const to = e.relatedTarget;
    if (!to || !to.closest || !to.closest(TILT_SEL)) {
      reset(current);
      current = null;
    }
  }, { passive: true });

  /* ---------------- 2. magnetic CTAs ---------------- */
  function magnetize(btn) {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      btn.style.transform =
        "translate(" + (dx * 0.14).toFixed(1) + "px," + (dy * 0.2).toFixed(1) + "px)";
    }, { passive: true });
    btn.addEventListener("pointerleave", () => { btn.style.transform = ""; }, { passive: true });
  }

  const wireMagnets = () =>
    document.querySelectorAll(".btn-primary").forEach(magnetize);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireMagnets);
  } else {
    wireMagnets();
  }
})();
