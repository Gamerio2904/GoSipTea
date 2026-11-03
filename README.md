# GoSipTea — Eco-Friendly Premium Loose-Leaf Tea 🌿

A high-end, **100% static** e-commerce showcase website. No backend, no build step, no
sensitive keys — everything runs in the browser and deploys to **GitHub Pages** in minutes.

> **Live demo:** https://gamerio2904.github.io/GoSipTea/
> **Winter Edition:** https://gamerio2904.github.io/GoSipTea/christmas/

---

## ✨ Features

| Area | Details |
|------|---------|
| **Design** | Dark forest/obsidian palette (signature default) **+ warm ivory light mode**, bronze-gold accents, glassmorphism, Playfair Display + Inter, micro-interactions, entrance animations, mobile-first responsive |
| **3D Cup Hero** | WebGL-Layer (three.js via CDN, `js/hero3d.js`): echter 3D-Keramik-Cup mit Goldrand + GPU-Steam-Partikel, Maus-Parallax, Scroll-Choreografie — der Dampf löst sich synchron zum „GoSipTea"-Lettering-Morph auf. Fallback ohne WebGL / bei reduzierter Bewegung: das ursprüngliche SVG-Cup-Hero |
| **Vibe Layer** | `js/vibe.js`: Pointer-3D-Tilt auf Produkt-/Persona-/Mood-Karten + magnetische Primär-CTAs (nur Desktop-Hover, `prefers-reduced-motion` respektiert) |
| **Light / Dark Mode** | Sun/moon **slide toggle top-left** in the header; choice persisted in `localStorage` (`gosiptea_theme`), first visit follows the system preference, dark remains the default for fresh visitors; browser-tab color synced via `theme-color` |
| **Tea Explorer** | Live search, category chips (Green / Black / Herbal / Special Editions), caffeine + taste filters, sorting, animated results counter |
| **Product Detail** | Modal with origin, altitude, eco-certifications, tasting notes, brewing ritual (temp / time / dose / steps), quantity stepper |
| **Cart** | Persistent via `localStorage` (`gosiptea_cart_v1`), slide-over drawer, quantity steppers, remove, subtotal, free-shipping progress bar (>$50) |
| **Mock Checkout** | Dummy shipping form with client-side validation → order summary → showcase confirmation: *"GoSipTea is currently a showcase brand! Thank you for exploring."* No payments, nothing leaves the browser |
| **SEO** | Semantic HTML5, Open Graph + Twitter Cards, JSON-LD (`Organization` inkl. Instagram-`sameAs`, `WebSite`, `FAQPage`, `ItemList` of `Product` with offers & ratings), canonical URL, `robots.txt`, `sitemap.xml`, dynamic `<title>`/meta per product (`?tea=slug` deep links) |
| **A11y** | Skip link, ARIA labels/roles, focus management, Escape-to-close, `prefers-reduced-motion` support, keyboard-operable cards |

## 🎄 Winter Edition (christmas/)

Eine zweite, interne Mini-Website als **Weihnachtsaktion** — gleiche Design-Sprache,
eigene festliche Palette (Tannennacht / Schneetag, weiches Rot, Kerzengold):

| Feature | Details |
|---------|---------|
| **Hero** | „Der Winter-Gourmet-Guide: Finde deinen perfekten Festtags-Tee" mit Winterbild, Lichterkette & Schneefall (Canvas, respektiert `prefers-reduced-motion`) |
| **Festtags-Kollektion** | 4 limitierte Tees: **Goldener Bratapfel**, **Glühglück Orange & Kardamom**, **Spekulatius-Stündchen**, **Zimtstern-Chai** — eigene Bilder, deutsche Detail-Modals mit Brühritual |
| **Fake-Warenkorb** | Geteilt mit der Hauptseite (gleiches `localStorage`)! Weihnachts- **und** Signatur-Tees landen im selben Wunschzettel — Drawer, Badge, Mengensteuerung, Gratis-Versand-Balken |
| **Fake-Checkout** | Spielerisch ohne Formular: „Dem Weihnachtsmann übergeben" → weihnachtliche Erfolgsmeldung (u. a. *"Frohes Fest! Dieser Warenkorb bringt direkt den Weihnachtsmann ins Haus – rein digital!"*), Konfetti, Bestell-ID `GSP-XMAS-…` |
| **Geschenke & Sets** | Zum Verkauf: **Tee-Adventskalender 2026**, **Festtags-Probierpaket** (4 × 50 g) und **Winter-Tee-Set** (Steinzeug-Kanne + 2 Tassen + 2 Tees) — eigene Bilder, gleiche Karten/Modals wie die Tees. (Der interaktive 24-Türchen-Kalender wurde als Feature entfernt — der Kalender ist jetzt ein Produkt.) |
| **Schwebendes Widget** | Goldener Wunschzettel-Button unten rechts (Badge-Sync mit Header) |
| **Extra** | Geschenk-Stimmungen (Gemütlich / Genießer / Würzig) pulsen passende Karten an, saisonales Zitat-Band, Instagram-Verlinkung (@gosiptea.hhn) im Footer + JSON-LD |
| **A11y/SEO** | Gleiche Grundlagen wie Hauptseite; Seite ist bewusst `noindex` (interne Kampagne — Zeile in `christmas/index.html` entfernen, wenn sie gefunden werden darf) |

**Keine echten Verkäufe:** Beide Seiten sind reine Showcase-Erlebnisse. Es gibt keine
Zahlungsabwicklung, keine Datenübertragung, keinen echten Checkout — der Warenkorb ist
ein Wunschzettel, der Checkout ein Wintermärchen.

## 📁 Structure

```
gosiptea/
├── index.html          # Hauptseite + alle SEO-Metadaten & JSON-LD (Org/WebSite/FAQ/ItemList)
├── 404.html            # Branded 404 (GitHub Pages serves it automatically)
├── robots.txt          # + sitemap.xml (Homepage)
├── site.webmanifest    # PWA manifest (colors, icon)
├── .nojekyll           # Bypasses Jekyll processing on GitHub Pages
├── css/
│   ├── styles.css      # Design system (tokens → components → light mode → responsive)
│   └── home.css        # Yogi-Rework: Cup-Hero (SVG + WebGL-Layer), Showcase, Finder, Personas
├── js/
│   ├── products.js     # 🍃 Tea catalog — single source of truth (signature + christmas + gifts)
│   ├── cart.js         # localStorage cart module — SHARED by both pages
│   ├── app.js          # Rendering, filters, modals, drawer, checkout, dynamic SEO
│   ├── hero.js         # Scroll-Morph: Steam → „GoSipTea"-Lettering → Content-Settle
│   ├── hero3d.js       # three.js WebGL-Cup + Steam-Partikel (ES module via importmap)
│   ├── showcase.js     # „The Edit"-Karussell + Kategorien-Tiles
│   ├── tea-finder.js   # 3-Fragen-Geschmacks-Quiz → Persona-Picks
│   └── vibe.js         # 3D-Tilt-Karten + magnetische CTAs
├── christmas/          # 🎄 Winter Edition (deutsche Kampagnenseite)
│   ├── index.html      # Hero, Festtags-Kollektion, Geschenke & Sets, Zitat
│   ├── christmas.css   # Festliche Token-Overrides + Lichterkette/FAB
│   └── christmas.js    # Grids, geteilter Warenkorb, Fake-Checkout, Schnee, Konfetti
└── assets/
    ├── favicon.svg     # Hand-crafted tea-leaf mark
    └── img/            # hero.jpg, story.jpg, packaging.jpg, teas/*.jpg, xmas/*.jpg
```

## 🚀 Run locally

Any static server works (relative paths keep it portable):

```bash
cd gosiptea
python3 -m http.server 8080
# → http://localhost:8080        (Hauptseite)
# → http://localhost:8080/christmas/  (Winter Edition)
```

Opening `index.html` directly via double-click also works.

## 🌍 Deploy to GitHub Pages

1. Push this folder to a repository (`main` branch).
2. Repo → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / root.
3. Done — the site is served at `https://<user>.github.io/<repo>/`.

All asset paths are **relative**, so the site works from any subpath
(`github.io/repo/`), a custom domain root, or any static host (Netlify, Vercel, Cloudflare Pages).

### Pushen zu origin/main

```bash
cd gosiptea
git remote -v                      # origin sollte github.com/Gamerio2904/GoSipTea.git sein
git push origin main               # fragt nach User + Token (GitHub-Passwörter funktionieren nicht → PAT verwenden!)
```

**Wichtig (Sicherheit):** Der früher im Chat gepostete Token gilt als kompromittiert und
**muss widerrufen** werden (GitHub → Settings → Developer settings → Personal access tokens →
Delete). Für künftige Pushes einen neuen **Fine-grained token** erstellen:
*Repository access: nur `GoSipTea` · Permissions: **Contents → Read and write**.* Token nie
wieder in Chats posten — lokal nutzen oder den Login im Browser speichern.

### „Mein Repo wird nicht angezeigt" — häufige Ursachen

1. **Private statt public:** GitHub Pages auf dem Gratis-Plan braucht ein **public** repo.
   → Repo → Settings → General → Danger Zone → *Change visibility* → Public.
2. **Falsche URL:** Projektseiten liegen unter `https://<user>.github.io/<repo>/` —
   nicht unter `github.com/<user>/<repo>` (das ist nur der Code) und nicht unter
   `<user>.github.io` ohne Pfad (das wäre nur ein extra User-Repo).
3. **Pages noch nicht aktiviert:** Settings → Pages → Source *Deploy from a branch* →
   `main` / root → Save. Danach 1–2 Minuten warten.
4. **Push hat nicht geklappt:** `git push` braucht einen gültigen Token (siehe oben);
   bei 403 ist meist der Token abgelaufen oder ohne `Contents: write` erstellt.
5. **Neu geladen?** Nach dem ersten Deploy baut GitHub ~1 Minute — Seite einfach
   etwas später neu laden (Cache: Ctrl/Cmd+Shift+R).

## ✏️ Customize the catalog

Edit **`js/products.js`** — each tea is one self-documenting object:

```js
{
  id: "jade-whisper",          // unique slug — also used in ?tea= deep links
  name: "Jade Whisper",
  category: "green",           // green | black | herbal | special
  collection: "signature",     // weglassen = Hauptseite · "christmas" = nur Winter Edition
  price: 26,                   // USD
  caffeine: "low",             // none | low | medium | high
  taste: ["sweet", "earthy"],  // filterable taste tags
  brewing: { temp, time, dose, steps: [...] },
  image: "assets/img/teas/jade-whisper.jpg",
  metaTitle: "...",            // dynamic <title> when the modal opens
  metaDescription: "..."       // dynamic meta description
}
```

- Christmas items carry `collection: "christmas"` (+ optional `mood: ["cozy"|"indulgent"|"spicy"]`).
  Sie erscheinen **nicht** im Haupt-Grid, funktionieren aber im geteilten Warenkorb beider Seiten.
- For full SEO parity on the main page, mirror new signature products in the `ItemList`
  JSON-LD block in `index.html`.

## 🔒 Privacy & Security

- Zero backend, zero cookies, zero trackers, zero external APIs (fonts/CDN only).
- Cart, theme & advent calendar state live in the visitor's own `localStorage`.
- The fake checkout collects no data at all — nothing leaves the browser.

## 📝 Notes

- Tea reviews/ratings are illustrative showcase content.
- Replace `assets/img/*` with real product photography for production use.
- Die Winter Edition ist deutschsprachig (interne Kampagne); die Hauptseite bleibt englisch.

## 🍵 Stage: Yogi-Style Rework (2026-11-03, Design-Upgrade, Inhalt unverändert)

Design-Neuausrichtung der Hauptseite nach der warmen/natürlichen Yogi-Ästhetik
(große Naturkulisse, Serifen-Headlines, viel Weißraum, weiche Scroll-Choreografie)
— **alle Inhalte, Produkte, Filter, Warenkorb- und Theme-Logik bleiben identisch.**

Neu/geändert:
- **Cup-Hero (`#cup-hero`, `js/hero.js`, `css/home.css`):** Die Landingpage IST eine
  dampfende Teetasse über Tea-Terrassen. Beim Scrollen materialisiert sich aus dem
  Dampf Buchstabe für Buchstabe das Wortmark "GoSipTea" und wird zur Website:
  Tagline, CTAs und Trust-Badges setzen sich (Sticky-Stage, CSS-Var `--p` 0→1,
  Klassen `is-content`/`is-settle`). `prefers-reduced-motion`: statischer, voll
  lesbarer Hero ohne Pinning.
- **Showcase "The Edit" (`js/showcase.js`):** horizontaler Produkt-Carousel startet
  mit den beiden Persona-Picks; Kategorie-Tiles (Green/Black/Herbal/Special) setzen
  die bestehenden Filter-Chips.
- **Tea Finder (`js/tea-finder.js`, `#tea-finder`):** 3-Fragen-Geschmacksquiz
  (Blueprint: "Landingpage-Abfrage") — Mia-Pfad → **Berry Balance**, Jonas-Pfad →
  **Golden Harmony**. Rein clientseitig, keine Daten.
- **Personas (`#personas`):** Mia Weber & Jonas Lindner aus dem Marketing-Blueprint
  (siehe upload/) mit Zitaten, Motiven und Picks.
- **Neue Sorten (`js/products.js`):** `berry-balance` (Mia: fruchtig, mittel,
  fair, nie bitter) + `golden-harmony` (Jonas: klassisch-mild, Bio & Fairtrade,
  ehrliches P/L) inkl. eigener Produktfotos `assets/img/teas/`.
- **Cart-Bridge (`js/app.js`):** `window.GoSipOpen/GoSipCard/GoSipToast` — Quiz- und
  Persona-Karten außerhalb des Grids nutzen denselben Warenkorb/Modal.
- **Winter Edition:** Jeder Fake-Add löst jetzt einen Fun-Spruch aus — der erste
  exakt: "Frohes Fest! Dieser Warenkorb bringt direkt den Weihnachtsmann ins Haus
  – rein digital!" (weiterhin rein digital, kein echter Checkout).

QA (agent-browser, 2026-11-03): 0 Console-Errors (beide Seiten), Hero p=1 →
8/8 Buchstaben + Content-Settle, Finder Mia-Pfad → Berry Balance, Cart-Bridge
(add/count/subtotal), Theme-Toggle & Persistenz, Mobile 390px, Christmas
Add-Spruch verbatim verifiziert.
