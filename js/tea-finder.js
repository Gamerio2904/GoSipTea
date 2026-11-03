/* ==========================================================================
   GoSipTea — Tea Finder (index.html only)
   3-question taste finder (marketing blueprint: "Landingpage-Abfrage /
   Geschmacks-Quiz"). Scores answers against the signature catalog and
   recommends one tea — designed so the persona paths resolve to the
   curated picks: Berry Balance (Mia) & Golden Harmony (Jonas).
   No purchase, no data — pure browser-side recommendation.
   ========================================================================== */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const byId = window.GOSIP.byId;
  const fmt = window.GOSIP.fmtPrice;

  const escapeHTML = (str = "") =>
    String(str).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);

  /* ---------------- quiz definition ---------------- */
  const QUESTIONS = [
    {
      q: "When do you reach for the kettle most?",
      options: [
        { label: "Morning momentum",       scores: { "golden-harmony": 2, "golden-sunrise": 2, "emerald-matcha": 1 } },
        { label: "Afternoon tea break",    scores: { "berry-balance": 2, "velvet-earl-grey": 2, "jade-whisper": 1 } },
        { label: "Evening wind-down",      scores: { "moonlight-chamomile": 2, "crimson-rooibos": 2, "midnight-oolong": 1 } },
        { label: "All day, every day",     scores: { "jade-whisper": 2, "crimson-rooibos": 1, "golden-harmony": 1 } }
      ]
    },
    {
      q: "Which direction should the cup go?",
      options: [
        { label: "Fruity & bright",        scores: { "berry-balance": 3, "crimson-rooibos": 1, "velvet-earl-grey": 1 } },
        { label: "Classic & mild",         scores: { "golden-harmony": 3, "jade-whisper": 1, "golden-sunrise": 1 } },
        { label: "Floral & calming",       scores: { "moonlight-chamomile": 3, "jade-whisper": 1, "velvet-earl-grey": 1 } },
        { label: "Bold, spicy & roasted",  scores: { "forest-ember-chai": 3, "midnight-oolong": 2, "golden-sunrise": 1 } }
      ]
    },
    {
      q: "What matters most in the cup?",
      options: [
        { label: "Lowest bitterness, please",  scores: { "berry-balance": 2, "golden-harmony": 2, "moonlight-chamomile": 2, "crimson-rooibos": 1 } },
        { label: "Quality worth the price",    scores: { "golden-harmony": 2, "jade-whisper": 2, "velvet-earl-grey": 1 } },
        { label: "Caffeine-free calm",         scores: { "moonlight-chamomile": 3, "crimson-rooibos": 2, "berry-balance": 1 } },
        { label: "Something new to explore",   scores: { "midnight-oolong": 3, "emerald-matcha": 2, "forest-ember-chai": 1 } }
      ]
    }
  ];

  /* deterministic tie-break: curated picks first, then catalog order */
  const TIE_BREAK = ["berry-balance", "golden-harmony", "jade-whisper",
    "velvet-earl-grey", "golden-sunrise", "moonlight-chamomile",
    "crimson-rooibos", "midnight-oolong", "emerald-matcha", "forest-ember-chai"];

  const WHY = {
    "berry-balance": "Fruity, balanced and forgiving to brew — medium intensity at a fair price, exactly for careful tasting without bad surprises.",
    "golden-harmony": "A classic, mild black tea with soft malt and honey, little bitterness and honest organic & Fairtrade credentials.",
    "jade-whisper": "Our signature Dragonwell: naturally sweet, nutty and gentle — a green tea that converts everyone.",
    "velvet-earl-grey": "Silky bergamot and cornflower over high-grown Ceylon — the refined afternoon ritual.",
    "golden-sunrise": "Golden-tipped Assam with malty morning momentum — for cups that start things.",
    "moonlight-chamomile": "Whole Egyptian blossoms, honeyed apple calm — liquid moonlight, caffeine-free.",
    "crimson-rooibos": "Ruby-red rooibos with cedar and caramel sweetness — never bitter, any time of day.",
    "midnight-oolong": "Charcoal-roasted Dong Ding with layers of roast, caramel and orchid — for slow explorers.",
    "emerald-matcha": "Ceremonial Uji matcha with deep umami and velvet foam — whisked focus in a bowl.",
    "forest-ember-chai": "Assam layered with cardamom, cinnamon and cacao — built for simmering and long conversations."
  };

  /* ---------------- state & elements ---------------- */
  const root = $("#tea-finder");
  if (!root) return;

  const els = {
    progress: $("#qz-progress"),
    question: $("#qz-question"),
    options: $("#qz-options"),
    result: $("#qz-result"),
    card: $("#qz-card"),
    why: $("#qz-why"),
    restart: $("#qz-restart")
  };

  let step = 0;
  let scores = {};

  function renderQuestion() {
    const item = QUESTIONS[step];
    els.progress.innerHTML = QUESTIONS.map((_, i) =>
      `<span class="qz-dot${i <= step ? " is-done" : ""}" aria-hidden="true"></span>`).join("");
    els.question.textContent = `Question ${step + 1} of ${QUESTIONS.length}: ${item.q}`;
    els.options.innerHTML = item.options.map((o, i) =>
      `<button type="button" class="qz-option glass" data-qz="${i}">
         <span>${escapeHTML(o.label)}</span>
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
       </button>`).join("");
  }

  function winner() {
    let best = null, bestScore = -1;
    for (const [id, score] of Object.entries(scores)) {
      if (!byId(id)) continue;
      if (score > bestScore) { best = id; bestScore = score; }
      else if (score === bestScore) {
        if (TIE_BREAK.indexOf(id) < TIE_BREAK.indexOf(best)) best = id;
      }
    }
    return best || TIE_BREAK.find(id => byId(id)) || "berry-balance";
  }

  function renderResult(id) {
    const p = byId(id);
    if (!p) return;
    els.card.innerHTML = `
      <img src="${p.image}" alt="${escapeHTML(p.name)}">
      <div class="qz-card-body">
        <span class="tea-kicker">${escapeHTML(window.GOSIP.categoryLabel(p.category))}</span>
        <h3 class="tea-name">${escapeHTML(p.name)}</h3>
        <p class="qz-fit">${escapeHTML(WHY[id] || "")}</p>
        <div class="qz-actions">
          <span class="tea-price">${fmt(p.price)}<small>${escapeHTML(p.size)}</small></span>
          <button type="button" class="btn btn-ghost btn-sm" data-open="${p.id}">View details</button>
          <button type="button" class="btn btn-primary btn-sm" data-add="${p.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
            Add to Cart
          </button>
        </div>
      </div>`;
    els.why.textContent = "";
    els.result.hidden = false;
  }

  function onOption(e) {
    const btn = e.target.closest("[data-qz]");
    if (!btn) return;
    const option = QUESTIONS[step].options[parseInt(btn.dataset.qz, 10)];
    for (const [id, score] of Object.entries(option.scores)) {
      scores[id] = (scores[id] || 0) + score;
    }
    step += 1;
    if (step < QUESTIONS.length) {
      renderQuestion();
    } else {
      els.progress.innerHTML = QUESTIONS.map(() =>
        `<span class="qz-dot is-done" aria-hidden="true"></span>`).join("");
      els.question.textContent = "Your cup, matched:";
      els.options.innerHTML = "";
      renderResult(winner());
    }
  }

  function restart() {
    step = 0;
    scores = {};
    els.result.hidden = true;
    renderQuestion();
  }

  function init() {
    renderQuestion();
    els.options.addEventListener("click", onOption);
    els.restart.addEventListener("click", restart);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
