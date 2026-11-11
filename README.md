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
| Startseite | `index.html` | Hero, 8 Kategorien (gleich groß), Bestseller, Deals (Weihnachtsdeal + 20 % Studentenrabatt), Tea-Finder, Philosophie, Werte, Instagram, Newsletter |
| Sortiment | `sortiment.html` | 20 Tees, Dropdown-Filter (Kategorie, Geschmack, Intensität, Preis, Suche) |
| Früchtetee | `fruechtetee.html` | Kategorie-Entdeckerseite (Empfehlung: Berry Balance) |
| Schwarztee | `schwarztee.html` | Kategorie-Entdeckerseite (Empfehlung: Golden Harmony) |
| Produktdetails | `produkt.html?id=…` | Bildwechsel (2 Ansichten), Zutaten, Zubereitung, Herkunft, ähnliche Produkte |
| Über uns | `ueber-uns.html` | Entstehung, Vision, Mission, Werte |
| Nachhaltigkeit | `nachhaltigkeit.html` | Werte, Qualität, Ehrlichkeits-Box |
| Sip & Talk | `sip-talk.html` | Magazin: Rezepte, Teemomente, Tee-Wissen („Beitrag lesen“ als Button) |
| Service & Kontakt | `service.html` | Kontakt, Demo-Versand/Zahlung, FAQ |
| Kasse (Demo) | `kasse.html` | Bestellübersicht, blockierter Demo-Checkout |
| Impressum | `impressum.html` | Wortgetreuer Projekt-Disclaimer |
| AGB / Datenschutz | `agb.html`, `datenschutz.html` | Demo-Texte |
| Winter Edition | `christmas/index.html` | Tee-Adventskalender 2026 (24 Probierpakete + Tee-Set), Weihnachtsdeal 49,90 € |

## Navigation & Suche

- Dropdown-Menüs im Header: **Sortiment ▾** (alle Kategorien + Entdeckerseiten)
  und **Specials ▾** (Winter Edition, Wintertees, Kalender, Festtags-Paket) —
  die Winter Edition ist damit dauerhaft oben erreichbar.
- **Suchleiste (Lupe)** im Header und im mobilen Menü; die Treffer erscheinen
  gefiltert im Sortiment (`sortiment.html?q=…`).
- **Nach-oben-Pfeil** unten rechts auf jeder Seite.

## Preise (Studenten-freundlich)

Loser Tee startet bei **4,50 €** (Mint Meadow) bzw. **4,90 €** (Berry Sunset);
die meisten Tees liegen zwischen 5,50 € und 7,90 €. Spezialitäten (Oolong 9,90 €,
Matcha 12,90 €) und Sets (Festtags-Paket 19,90 €, Winter-Tee-Set 29,90 €,
Adventskalender 49,90 €) darüber. Beispiel-Versand 4,90 €, ab 30 € frei —
alles fiktive Beispielpreise.

## Bilder

- Alle Produktbilder sind **einheitlich** im gleichen Stil generiert
  (Creme/Beige, natürliches Licht) — jede Karte hat eine **zweite Ansicht
  als Hover-Bild** (`assets/img/teas2/`).
- Alle Produktbilder sind quadratisch (1024 px) und können **direkt auf
  Instagram** gepostet werden; fertige 1080×1080-Exporte liegen in
  `assets/img/instagram/`. So bleiben Insta und Website bildgleich.
- Der Adventskalender ist bewusst **ohne Zahlen/Zitate** abgebildet; die
  Türchen-Reihenfolge 1–24 zeigt die schematische Grafik auf der Winter-Seite
  (rein dekorativ, nicht interaktiv).

## Technik

- Reines HTML5/CSS/Vanilla-JS, keine Build-Pflicht (Generatoren nur für die Entwicklung)
- Design-System: `css/styles.css` (Creme/Beige/Teegrün, Fraunces + Manrope,
  Light/Dark-Theme via `data-theme`, dezente Scroll-Reveals, `prefers-reduced-motion`)
- Einheitliches Logo (SVG-Badge, identisch in Header, Footer & Favicon
  `assets/img/favicon.svg`)
- Produktdaten: `js/products.js` (20 Produkte, 8 Kategorien inkl. **Specials**, deutsch)
- Warenkorb: `js/cart.js` — ausschließlich `localStorage` (`gst_cart_v2`), keine Übertragung
- Tea-Finder: `js/tea-finder.js` — 3 Fragen (inkl. Moment „rund um die Uhr“) → passende Tees
- SEO: Meta/OG/Twitter-Tags, JSON-LD (Organization, WebSite, Product, FAQPage,
  BreadcrumbList, Blog), `robots.txt`, `sitemap.xml`, semantisches HTML, Lazy-Loading

## Rechtlicher Hinweis

Die gesamte Website ist ein studentisches Projekt: Alle Produkte, Preise,
Personen und Angaben sind fiktiv. Der vollständige, wortgetreue Disclaimer
steht im [Impressum](https://gamerio2904.github.io/GoSipTea/impressum.html).
Es werden keine Zahlungsdaten abgefragt, gespeichert oder übertragen.
Hinweise zur Demo erscheinen bewusst dezent im Footer sowie prominent im
Warenkorb und am Checkout.
