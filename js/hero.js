/* ==========================================================================
   GoSipTea — Cup Hero (index.html only)
   The landing page IS a steaming teacup. On scroll the steam turns into
   lettering ("GoSipTea" materializes out of the wisps) and then into the
   website: tagline, CTAs and trust badges settle in before the page
   continues below the pinned stage.
   Scroll engine: sticky stage + CSS custom property --p (0 → 1) + classes.
   Reduced motion: everything renders fully visible, no pinning.
   ========================================================================== */

(() => {
  "use strict";

  const hero = document.getElementById("cup-hero");
  if (!hero) return;

  const stage = hero.querySelector(".cup-stage");
  const letters = Array.from(hero.querySelectorAll(".cup-title .cl"));
  const steam = hero.querySelector(".cup-steam");
  const wisps = steam ? Array.from(steam.querySelectorAll(".wisp")) : [];
  const hint = hero.querySelector(".cup-scroll");

  const reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* letter thresholds spread across the first ~55 % of the scroll run */
  const LETTER_START = 0.10;
  const LETTER_STEP = 0.052;

  const clamp01 = (n) => Math.min(1, Math.max(0, n));
  const smooth = (p, a, b) => clamp01((p - a) / (b - a));

  let ticking = false;

  function update() {
    ticking = false;

    const rect = hero.getBoundingClientRect();
    const total = hero.offsetHeight - window.innerHeight;
    const p = total > 0 ? clamp01(-rect.top / total) : 0;
    hero.style.setProperty("--p", p.toFixed(4));

    /* letters materialize out of the steam, one after another */
    letters.forEach((el, i) => {
      el.classList.toggle("is-lit", p > LETTER_START + i * LETTER_STEP);
    });

    /* steam dissolves exactly while the letters appear */
    if (steam) {
      const fade = smooth(p, 0.06, 0.55);
      steam.style.opacity = String(1 - fade * 0.92);
    }
    wisps.forEach((w, i) => {
      w.style.opacity = String(1 - smooth(p, 0.05 + i * 0.03, 0.5 + i * 0.03));
    });

    /* stage classes drive content + cup transitions in CSS */
    stage.classList.toggle("is-content", p > 0.52);
    stage.classList.toggle("is-settle", p > 0.86);
    if (hint) hint.classList.toggle("is-hidden", p > 0.1);
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  if (reduceMotion) {
    /* static, fully readable hero */
    hero.classList.add("is-static");
    letters.forEach((el) => el.classList.add("is-lit"));
    stage.classList.add("is-content");
    if (steam) steam.style.opacity = "0.25";
    if (hint) hint.classList.add("is-hidden");
    return;
  }

  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll, { passive: true });
  update();
})();
