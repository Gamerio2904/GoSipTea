# GoSipTea — Moderne Teemarke (studentisches Projekt)

GoSipTea ist ein Markenbeispiel, das im Rahmen eines Hochschullabors
zum Thema Online Marketing an der Hochschule Heilbronn entstanden ist.
Die Website zeigt einen vollständigen Markenauftritt inklusive Shop-Ansicht —
**ohne echte Bestellungen oder Zahlungen**.

## Live

- Startseite: https://gamerio2904.github.io/GoSipTea/
- Sortiment: https://gamerio2904.github.io/GoSipTea/sortiment.html
- Winter Edition (Tee-Adventskalender): https://gamerio2904.github.io/GoSipTea/christmas/index.html

## Seitenstruktur

| Seite | Datei | Inhalt |
| --- | --- | --- |
| Startseite | `index.html` | Hero, 8 Kategorien (gleich groß), Bestseller, Aktionen (Weihnachtsdeal + 20 % Aktionsrabatt), Tee-Finder, Philosophie, Werte, Instagram, Newsletter |
| Sortiment | `sortiment.html` | 20 Tees, Dropdown-Filter (Kategorie, Geschmack, Intensität, Preis, Suche) |
| Früchtetee | `fruechtetee.html` | Kategorieseite im Sortiment-Layout (Filter + Karten, Empfehlung: Berry Balance) |
| Schwarztee | `schwarztee.html` | Kategorieseite im Sortiment-Layout (Filter + Karten, Empfehlung: Golden Harmony) |
| Produktdetails | `produkt.html?id=…` | Bildwechsel (2 Ansichten), Zutaten, Zubereitung, Herkunft, ähnliche Produkte |
| Über uns | `ueber-uns.html` | Entstehung (studentisches Projekt), Vision, Mission, Werte, Nachhaltigkeits-Link |
| Nachhaltigkeit | `nachhaltigkeit.html` | Verantwortung, Qualität, Ehrlichkeit statt Greenwashing |
| Sip & Talk | `sip-talk.html` | Magazin: Rezepte, Teemomente, Tee-Wissen („Beitrag lesen“ als Button), Podcast-Ausblick |
| Service & Kontakt | `service.html` | Kontakt, Versand & Zahlung, FAQ |
| Kasse | `kasse.html` | Bestellübersicht mit Abschluss-Button (ohne Bestellprozess) |
| Impressum | `impressum.html` | Wortgetreuer Projekt-Disclaimer |
| AGB / Datenschutz | `agb.html`, `datenschutz.html` | Klar strukturierte Rechtstexte |
| Winter Edition | `christmas/index.html` | Tee-Adventskalender 2026 (24 Probierpakete + Tee-Set), Weihnachtsdeal 49,90 €, online Adventskalender mit Türchen 1–24 |

## Navigation & Suche

- Dropdown-Menüs im Header: **Sortiment ▾** (alle Kategorien)
  und **Specials ▾** (Winter Edition, Wintertees, Kalender, Festtags-Paket) —
  die Winter Edition ist damit dauerhaft oben erreichbar.
- **Suchleiste (Lupe)** im Header und im mobilen Menü; die Treffer erscheinen
  gefiltert im Sortiment (`sortiment.html?q=…`).
- **Nach-oben-Pfeil** unten rechts auf jeder Seite.

## Preise

Loser Tee startet bei **4,50 €** (Mint Meadow) bzw. **4,90 €** (Berry Sunset);
die meisten Tees liegen zwischen 5,50 € und 7,90 €. Spezialitäten (Oolong 9,90 €,
Matcha 12,90 €) und Sets (Festtags-Paket 19,90 € mit 4 × 10 g, Winter-Tee-Set
29,90 €, Adventskalender 49,90 €) darüber. Versand 4,90 €, ab 30 € frei.

## Bilder

- Alle Produktbilder sind **einheitlich** im gleichen Stil generiert
  (Creme/Beige, natürliches Licht) — jede Karte hat eine **zweite Ansicht
  als Hover-Bild** (`assets/img/teas2/`).
- Alle Produktbilder sind quadratisch (1024 px) und können **direkt auf
  Instagram** gepostet werden; fertige 1080×1080-Exporte liegen in
  `assets/img/instagram/`. So bleiben Insta und Website bildgleich.
- Der Winter-Adventskalender zeigt die Türchen 1 bis 24 als schematische
  Grafik; Türchen 1 ist grün markiert und steht für den Start am 1. Dezember.

## Technik

- Reines HTML5/CSS/Vanilla-JS, keine Build-Pflicht (Generatoren nur für die Entwicklung)
- Design-System: `css/styles.css` (Creme/Beige/Teegrün, Fraunces + Manrope,
  Light/Dark-Theme via `data-theme`, dezente Scroll-Reveals, `prefers-reduced-motion`)
- Einheitliches Logo (SVG-Badge mit Tasse + „GoSipTea“/„SIP & TALK“, identisch
  in Header, Footer & Favicon `assets/img/favicon.svg`)
- Produktdaten: `js/products.js` (20 Produkte, 8 Kategorien inkl. **Specials**, deutsch)
- Warenkorb: `js/cart.js` — ausschließlich `localStorage` (`gst_cart_v2`), keine Übertragung
- Tee-Finder: `js/tea-finder.js` — 3 Fragen (inkl. Moment „rund um die Uhr“) → passende Tees
- SEO: Meta/OG/Twitter-Tags, JSON-LD (Organization, WebSite, Product, FAQPage,
  BreadcrumbList, Blog), `robots.txt`, `sitemap.xml`, semantisches HTML, Lazy-Loading

## Rechtlicher Hinweis

Die gesamte Website ist ein studentisches Projekt der Hochschule Heilbronn:
Alle Produkte, Preise und Angaben sind Teil des Projekts. Der vollständige,
wortgetreue Disclaimer steht im
[Impressum](https://gamerio2904.github.io/GoSipTea/impressum.html). Ein
Bestell- und Bezahlprozess ist nicht vorgesehen, es werden keine Zahlungsdaten
abgefragt, gespeichert oder übertragen.
