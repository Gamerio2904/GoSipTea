# GoSipTea — Eco-Friendly Premium Loose-Leaf Tea 🌿

A high-end, **100% static** e-commerce showcase website. No backend, no build step, no
sensitive keys — everything runs in the browser and deploys to **GitHub Pages** in minutes.

> **Live demo:** https://gamerio2904.github.io/GoSipTea/

---

## ✨ Features

| Area | Details |
|------|---------|
| **Design** | Dark forest/obsidian palette, bronze-gold accents, glassmorphism, Playfair Display + Inter, micro-interactions, entrance animations, mobile-first responsive |
| **Tea Explorer** | Live search, category chips (Green / Black / Herbal / Special Editions), caffeine + taste filters, sorting, animated results counter |
| **Product Detail** | Modal with origin, altitude, eco-certifications, tasting notes, brewing ritual (temp / time / dose / steps), quantity stepper |
| **Cart** | Persistent via `localStorage` (`gosiptea_cart_v1`), slide-over drawer, quantity steppers, remove, subtotal, free-shipping progress bar (>$50) |
| **Mock Checkout** | Dummy shipping form with client-side validation → order summary → showcase confirmation: *"GoSipTea is currently a showcase brand! Thank you for exploring."* No payments, nothing leaves the browser |
| **SEO** | Semantic HTML5, Open Graph + Twitter Cards, JSON-LD (`Organization`, `WebSite`, `ItemList` of `Product` with offers & ratings), canonical URL, dynamic `<title>`/meta per product (`?tea=slug` deep links), sitemap-ready structure |
| **A11y** | Skip link, ARIA labels/roles, focus management, Escape-to-close, `prefers-reduced-motion` support, keyboard-operable cards |

## 📁 Structure

```
gosiptea/
├── index.html          # Single-page site + all SEO metadata & JSON-LD
├── 404.html            # Branded 404 (GitHub Pages serves it automatically)
├── site.webmanifest    # PWA manifest (colors, icon)
├── .nojekyll           # Bypasses Jekyll processing on GitHub Pages
├── css/
│   └── styles.css      # Full design system (tokens → components → responsive)
├── js/
│   ├── products.js     # 🍃 Tea catalog — the single source of truth
│   ├── cart.js         # localStorage cart module (add/setQty/remove/clear)
│   └── app.js          # Rendering, filters, modals, drawer, checkout, dynamic SEO
└── assets/
    ├── favicon.svg     # Hand-crafted tea-leaf mark
    └── img/            # hero.jpg, story.jpg, packaging.jpg, teas/*.jpg
```

## 🚀 Run locally

Any static server works (relative paths keep it portable):

```bash
cd gosiptea
python3 -m http.server 8080
# → http://localhost:8080
```

Opening `index.html` directly via double-click also works.

## 🌍 Deploy to GitHub Pages

1. Push this folder to a repository (`main` branch).
2. Repo → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / root.
3. Done — the site is served at `https://<user>.github.io/<repo>/`.

All asset paths are **relative**, so the site works from any subpath
(`github.io/repo/`), a custom domain root, or any static host (Netlify, Vercel, Cloudflare Pages).

## ✏️ Customize the catalog

Edit **`js/products.js`** — each tea is one self-documenting object:

```js
{
  id: "jade-whisper",          // unique slug — also used in ?tea= deep links
  name: "Jade Whisper",
  category: "green",           // green | black | herbal | special
  price: 26,                   // USD
  caffeine: "low",             // none | low | medium | high
  taste: ["sweet", "earthy"],  // filterable taste tags
  brewing: { temp, time, dose, steps: [...] },
  image: "assets/img/teas/jade-whisper.jpg",
  metaTitle: "...",            // dynamic <title> when the modal opens
  metaDescription: "..."       // dynamic meta description
}
```

The grid, filters, cart, modal and deep links all update automatically.
For full SEO parity, mirror new products in the `ItemList` JSON-LD block in `index.html`.

## 🔒 Privacy & Security

- Zero backend, zero cookies, zero trackers, zero external APIs (fonts/CDN only).
- Cart & newsletter state live in the visitor's own `localStorage`.
- The checkout collects dummy data that never leaves the browser.

## 📝 Notes

- Tea reviews/ratings are illustrative showcase content.
- Replace `assets/img/*` with real product photography for production use.
