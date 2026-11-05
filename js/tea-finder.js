/* ==========================================================================
   GoSipTea — Tea-Finder (Geschmacksabfrage)
   Drei Fragen → passende Tees. Ergebnis: bis zu 3 einheitliche Karten.
   ========================================================================== */

(function () {
  "use strict";

  var ANSWERS = { taste: "", moment: "", intensity: "" };

  var QUESTIONS = [
    {
      key: "taste",
      label: "Wie soll deine Tasse schmecken?",
      opts: [
        { val: "fruchtig", label: "Fruchtig & frisch" },
        { val: "mild", label: "Mild & sanft" },
        { val: "würzig", label: "Würzig & intensiv" },
        { val: "kräuterig", label: "Kräuterig & ruhig" }
      ]
    },
    {
      key: "moment",
      label: "Wann genießt du deinen Tee am liebsten?",
      opts: [
        { val: "morgen", label: "Morgens – wach werden" },
        { val: "nachmittag", label: "Nachmittags – kleine Pause" },
        { val: "abend", label: "Abends – runterkommen" }
      ]
    },
    {
      key: "intensity",
      label: "Wie kräftig darf es sein?",
      opts: [
        { val: "1", label: "Sanft" },
        { val: "2", label: "Ausgewogen" },
        { val: "3", label: "Kräftig" }
      ]
    }
  ];

  function scoreProduct(p) {
    var score = 0;
    if (ANSWERS.taste && p.tastes.indexOf(ANSWERS.taste) !== -1) score += 4;
    if (ANSWERS.intensity) {
      var diff = Math.abs(p.intensity - Number(ANSWERS.intensity));
      score += [3, 2, 0][Math.min(diff, 2)];
    }
    if (ANSWERS.moment === "abend" && p.caffeine === "none") score += 3;
    if (ANSWERS.moment === "morgen" && (p.caffeine === "high" || p.caffeine === "medium")) score += 3;
    if (ANSWERS.moment === "nachmittag" && (p.caffeine === "low" || p.caffeine === "none" || p.caffeine === "medium")) score += 2;
    if (p.persona) score += 1;
    return score;
  }

  function render() {
    var formBox = document.getElementById("quiz-form");
    var resultBox = document.getElementById("quiz-results");
    if (!formBox || !resultBox) return;

    var allAnswered = ANSWERS.taste && ANSWERS.moment && ANSWERS.intensity;
    var placeholder = document.getElementById("quiz-placeholder");

    if (!allAnswered) {
      resultBox.hidden = true;
      formBox.hidden = false;
      if (placeholder) placeholder.hidden = false;
      formBox.innerHTML = QUESTIONS.map(function (qq, idx) {
        return (
          '<p class="quiz__step">Schritt ' + (idx + 1) + " von 3</p>" +
          "<h3>" + qq.label + "</h3>" +
          '<div class="quiz__opts">' +
          qq.opts.map(function (o) {
            var active = ANSWERS[qq.key] === o.val ? " is-active" : "";
            return '<button type="button" class="quiz__opt' + active + '" data-q="' + qq.key + '" data-v="' + o.val + '">' + o.label + "</button>";
          }).join("") +
          "</div>"
        );
      }).join("");
      return;
    }

    /* Ergebnis */
    var ranked = GOSIP.products
      .map(function (p) { return { p: p, s: scoreProduct(p) }; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, 3)
      .map(function (x) { return x.p; });

    formBox.hidden = true;
    resultBox.hidden = false;
    if (placeholder) placeholder.hidden = true;
    resultBox.innerHTML =
      '<p class="quiz__step">Dein Teematch</p>' +
      "<h3>Das könnten deine neuen Lieblinge sein</h3>" +
      '<div class="p-grid p-grid--3" style="margin-top:18px">' +
      ranked.map(function (p) { return window.GSTSHOP.buildCard(p, { ghostBtn: true }); }).join("") +
      "</div>" +
      '<div style="margin-top:22px; display:flex; gap:16px; flex-wrap:wrap; align-items:center">' +
      '<a class="btn btn--light btn--sm" href="' + (document.body.dataset.prefix || "") + 'sortiment.html">Ganzes Sortiment ansehen</a>' +
      '<button type="button" class="quiz__reset" id="quiz-reset">Abfrage neu starten</button>' +
      "</div>";

    var resetBtn = document.getElementById("quiz-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        ANSWERS = { taste: "", moment: "", intensity: "" };
        render();
      });
    }
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".quiz__opt");
    if (!btn) return;
    ANSWERS[btn.getAttribute("data-q")] = btn.getAttribute("data-v");
    render();
  });

  document.addEventListener("DOMContentLoaded", render);
})();
