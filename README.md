# GoSipTea — Moderne Teemarke (studentisches Demo-Projekt)

GoSipTea ist ein fiktives Markenbeispiel, das im Rahmen eines Hochschullabors
zum Thema Online Marketing an der Hochschule Heilbronn entstanden ist.
Die Website demonstriert einen vollständigen Markenauftritt inklusive
Demonstrations-Shop — **ohne echte Bestellungen oder Zahlungen**.

## Live

- Startseite: https://gamerio2904.github.io/GoSipTea/
- Sortiment: https://gamerio2904.github.io/GoSipTea/sortiment.html
- Winter Edition (Tee-Adventskalender): https://gamerio2904.github.io/GoSipTea/christmas/index.html

## Seitenstruktur

| Seite | Datei | Inhalt |
| --- | --- | --- |
| Startseite | `index.html` | Hero, Kategorien, Auswahl, Tea-Finder, Philosophie, Werte, Winter-Edition-Banner, Instagram, Newsletter |
| Sortiment | `sortiment.html` | 20 Tees, Filter (Kategorie, Geschmack, Intensität, Preis, Suche) |
| Früchtetee | `fruechtetee.html` | Kategorie-Landingpage (Persona Mia, Berry Balance) |
| Schwarztee | `schwarztee.html` | Kategorie-Landingpage (Persona Jonas, Golden Harmony) |
| Produktdetails | `produkt.html?id=…` | Zutaten, Zubereitung, Herkunft, ähnliche Produkte |
| Über uns | `ueber-uns.html` | Entstehung, Vision, Mission, Werte |
| Nachhaltigkeit | `nachhaltigkeit.html` | Werte, Qualität, Ehrlichkeits-Box |
| Sip & Talk | `sip-talk.html` | Magazin: Rezepte, Teemomente, Tee-Wissen |
| Service & Kontakt | `service.html` | Kontakt, Demo-Versand/Zahlung, FAQ |
| Kasse (Demo) | `kasse.html` | Bestellübersicht, blockierter Demo-Checkout |
| Impressum | `impressum.html` | Wortgetreuer Projekt-Disclaimer |
| AGB / Datenschutz | `agb.html`, `datenschutz.html` | Demo-Texte |
| Winter Edition | `christmas/index.html` | Tee-Adventskalender 2026 (24 Probierpakete + Tee-Set) |

## Technik

- Reines HTML5/CSS/Vanilla-JS, keine Build-Pflicht (Generatoren nur für die Entwicklung)
- Design-System: `css/styles.css` (Creme/Beige/Teegrün, Fraunces + Manrope,
  Light/Dark-Theme via `data-theme`, dezente Scroll-Reveals, `prefers-reduced-motion`)
- Produktdaten: `js/products.js` (20 Produkte, 7 Kategorien, deutsch)
- Warenkorb: `js/cart.js` — ausschließlich `localStorage` (`gst_cart_v2`), keine Übertragung
- Tea-Finder: `js/tea-finder.js` — 3 Fragen → passende Tees
- SEO: Meta/OG/Twitter-Tags, JSON-LD (Organization, WebSite, Product, FAQPage,
  BreadcrumbList, Blog), `robots.txt`, `sitemap.xml`, semantisches HTML, Lazy-Loading

## Rechtlicher Hinweis

Die gesamte Website ist ein studentisches Projekt: Alle Produkte, Preise,
Personen und Angaben sind fiktiv. Der vollständige, wortgetreue Disclaimer
steht im [Impressum](https://gamerio2904.github.io/GoSipTea/impressum.html).
Es werden keine Zahlungsdaten abgefragt, gespeichert oder übertragen.
