/* ==========================================================================
   GoSipTea — Teekatalog (Deutsch)
   Zentrale Datenquelle für Produktkarten, Filter, Detailseiten,
   Warenkorb und Tea-Finder.
   Hinweis: Fiktives studentisches Projekt — Preise, Produkte und
   Zertifizierungen sind Beispieldaten ohne realen Anspruch.
   ========================================================================== */

const GOSIP = {
  /* ------------------------------------------------------------------ */
  /* Kategorien                                                          */
  /* ------------------------------------------------------------------ */
  categories: [
    {
      id: "fruechtetee",
      name: "Früchtetee",
      tagline: "Sonnenreife Früchte – fruchtig, sanft, ohne Koffein",
      desc: "Fruchtige Kompositionen aus Beeren, Apfel und Hibiskus. Der unkomplizierte Genuss für den ganzen Tag – verzeiht jede Ziehzeit.",
      img: "assets/img/teas/berry-balance.jpg",
      landing: "fruechtetee.html"
    },
    {
      id: "kraeutertee",
      name: "Kräutertee",
      tagline: "Blüten, Kräuter & eine Tasse Ruhe",
      desc: "Kamille, Rooibos und frische Minze: koffeinfreie Kräuterkompositionen für ruhige Momente und den Abend.",
      img: "assets/img/teas/moonlight-chamomile.jpg",
      landing: ""
    },
    {
      id: "schwarztee",
      name: "Schwarztee",
      tagline: "Klassiker mit Charakter & mildem Finale",
      desc: "Assam, Earl Grey und weiche Kompositionen: klassische Schwarztees mit vollmundigem Aroma und glaubwürdiger Herkunft.",
      img: "assets/img/teas/golden-harmony.jpg",
      landing: "schwarztee.html"
    },
    {
      id: "gruentee",
      name: "Grüntee",
      tagline: "Frisch, klar & vegetal",
      desc: "Sanft gedämpfte und panasenröstige Grüntees – von grasig-frischem Sencha bis blumigem Jade-Tee.",
      img: "assets/img/teas/jade-whisper.jpg",
      landing: ""
    },
    {
      id: "chai",
      name: "Gewürztee & Chai",
      tagline: "Warme Würze, goldene Momente",
      desc: "Zimt, Kardamom und Nelke: würzige Chai-Kompositionen – pur oder mit Milch und Honig geköchelt.",
      img: "assets/img/teas/forest-ember-chai.jpg",
      landing: ""
    },
    {
      id: "spezialitaeten",
      name: "Tee-Spezialitäten",
      tagline: "Oolong & Matcha für Entdecker",
      desc: "Handgerollte Oolongs und Steinmühle-Matcha: besondere Tees für alle, die tiefer eintauchen möchten.",
      img: "assets/img/teas/midnight-oolong.jpg",
      landing: ""
    },
    {
      id: "sets",
      name: "Probierpakete & Geschenksets",
      tagline: "Zum Kennenlernen & Verschenken",
      desc: "Vom Festtags-Probierpaket bis zum Tee-Adventskalender: sorgfältig zusammengestellte Sets für gemeinsame Teemomente.",
      img: "assets/img/new/geschenkset.jpg",
      landing: ""
    }
  ],

  /* ------------------------------------------------------------------ */
  /* Produkte                                                            */
  /* ------------------------------------------------------------------ */
  products: [
    /* --- Früchtetee --------------------------------------------------- */
    {
      id: "berry-balance",
      name: "Berry Balance",
      cat: "fruechtetee",
      price: 19,
      size: "80 g · ca. 40 Tassen",
      caffeine: "none",
      intensity: 2,
      tastes: ["fruchtig", "mild"],
      notes: "Brombeere, Holunderbeere, Bratapfel, zarte Hibiskus-Frische",
      desc: "Komponiert für ausgeglichene Nachmittage: Sonnengereifte Beeren und weicher Bratapfel auf einer sanften Hibiskusbasis – fruchtig, aber nie zu herb oder zu süß. Die mittlere Intensität verzeiht jede Ziehzeit: Drei Minuten oder sieben, die Tasse bleibt geschmeidig. Der unkomplizierte Weg, eine neue Sorte auszuprobieren – ohne böse Überraschung.",
      ingredients: ["Apfelstücke", "Hibiskusblüten", "Hagebutten", "Brombeeren", "Holunderbeeren", "natürliches Beeren-Aroma"],
      brew: { temp: "100 °C", time: "5–7 Min.", amount: "1 gehäufter TL pro Tasse (250 ml)" },
      origin: "Komposition aus dem GoSipTea Atelier · Hibiskus aus Ägypten, Beeren aus Ceylon",
      cert: ["Bio-Anbau", "Plastikfreie Verpackung"],
      persona: "mia",
      badge: "Persona-Pick",
      img: "assets/img/teas/berry-balance.jpg"
    },
    {
      id: "berry-sunset",
      name: "Berry Sunset",
      cat: "fruechtetee",
      price: 15,
      size: "100 g · ca. 50 Tassen",
      caffeine: "none",
      intensity: 1,
      tastes: ["fruchtig", "mild"],
      notes: "Hagebutte, Himbeere, Hibiskus, sommerliche Sonnenröte",
      desc: "Rubinrot leuchtender Früchtetee mit weicher Himbeere und sonnengereifter Hagebutte. Sanft im Abgang, fruchtig in der Nase – der unbeschwerte Sommerbecher für die Pause zwischen zwei Terminen oder gemeinsame Nachmittage auf dem Balkon.",
      ingredients: ["Hagebutten", "Hibiskusblüten", "Apfelstücke", "Himbeeren", "Rote-Bete-Raspeln", "natürliches Himbeer-Aroma"],
      brew: { temp: "100 °C", time: "5–8 Min.", amount: "1 TL pro Tasse (250 ml)" },
      origin: "Komposition aus dem GoSipTea Atelier · Hagebutte aus Polen",
      cert: ["Bio-Anbau", "Plastikfreie Verpackung"],
      persona: null,
      badge: null,
      img: "assets/img/new/berry-sunset.jpg"
    },
    {
      id: "goldener-bratapfel",
      name: "Goldener Bratapfel",
      cat: "fruechtetee",
      price: 16,
      size: "80 g · ca. 40 Tassen",
      caffeine: "none",
      intensity: 1,
      tastes: ["fruchtig", "mild"],
      notes: "Bratapfel, Zimtstange, Vanilleblüte, flüssiger Honig",
      desc: "Der Duft des Ofens in einer Tasse: Weiche Apfelstücke, zarte Zimtwärme und ein Hauch Vanille. So gemütlich wie ein Spaziergang durch den Herbstmarkt – und verzeiht großzügig jede Ziehzeit.",
      ingredients: ["Apfelstücke", "Zimtstücke", "Rote-Bete-Raspeln", "Hagebutten", "Vanillestücke", "natürliches Aroma"],
      brew: { temp: "100 °C", time: "6–8 Min.", amount: "1 gehäufter TL pro Tasse (250 ml)" },
      origin: "Komposition aus dem GoSipTea Atelier · Äpfel aus dem Alten Land",
      cert: ["Bio-Anbau", "Plastikfreie Verpackung"],
      persona: null,
      badge: null,
      img: "assets/img/xmas/goldener-bratapfel.jpg"
    },

    /* --- Kräutertee ---------------------------------------------------- */
    {
      id: "moonlight-chamomile",
      name: "Moonlight Chamomile",
      cat: "kraeutertee",
      price: 19,
      size: "60 g · ca. 30 Tassen",
      caffeine: "none",
      intensity: 1,
      tastes: ["mild", "kräuterig"],
      notes: "Honigapfel, weiche Blüten, Wiesenkräuter, goldene Ruhe",
      desc: "Handgepflückte Kamillenblüten in goldener Tinktur: Honigapfel in der Nase, weiche Wiesenkräuter am Gaumen und ein Abgang wie eine abendliche Decke. Der klassische Ruhe-Tee – ehrlich, mild und ohne Koffein.",
      ingredients: ["Kamillenblüten", "Apfelstücke", "Melisse", " Lindenblüten", "natürliches Honig-Aroma"],
      brew: { temp: "100 °C", time: "5–8 Min.", amount: "1 TL pro Tasse (250 ml)" },
      origin: "Kamille aus dem Nile-Delta, abgefüllt im GoSipTea Atelier",
      cert: ["Bio-Anbau", "Plastikfreie Verpackung"],
      persona: null,
      badge: null,
      img: "assets/img/teas/moonlight-chamomile.jpg"
    },
    {
      id: "mint-meadow",
      name: "Mint Meadow",
      cat: "kraeutertee",
      price: 14,
      size: "80 g · ca. 45 Tassen",
      caffeine: "none",
      intensity: 1,
      tastes: ["kräuterig", "mild"],
      notes: "Pfefferminze, Zitronenverbene, Limette, kühle Frische",
      desc: "Kühle Frische wie ein früher Morgen auf der Wiese: Kräftige Pfefferminze trifft auf zitrische Verbene und einen Hauch Limette. Belebt die Sinne – ohne Koffein, zu jeder Tageszeit.",
      ingredients: ["Pfefferminze", "Zitronenverbene", "Zitronengras", "Limettenschalen", "Ringelblumenblüten"],
      brew: { temp: "100 °C", time: "5–7 Min.", amount: "1 TL pro Tasse (250 ml)" },
      origin: "Pfefferminze aus der Ägyptischen Oase Fayoum",
      cert: ["Bio-Anbau", "Plastikfreie Verpackung"],
      persona: null,
      badge: "Neu",
      img: "assets/img/new/mint-meadow.jpg"
    },
    {
      id: "crimson-rooibos",
      name: "Crimson Rooibos",
      cat: "kraeutertee",
      price: 21,
      size: "80 g · ca. 40 Tassen",
      caffeine: "none",
      intensity: 2,
      tastes: ["fruchtig", "kräuterig"],
      notes: "Warmer Zedernholz-Ton, Honeybush, Karamell, rubinroter Glanz",
      desc: "Rubinroter Rooibos aus den Cedarbergen: weicher Honigbusch, geröstetes Karamell und ein warmer Zedernholz-Ton. Kräftig genug für den Nachmittag, koffeinfrei genug für den Abend.",
      ingredients: ["Rooibos", "Honeybush", "Kakao-Schalen", "Karamellstücke", "natürliches Aroma"],
      brew: { temp: "100 °C", time: "5–7 Min.", amount: "1 gehäufter TL pro Tasse (250 ml)" },
      origin: "Rooibos aus den Cedarbergen, Südafrika · fairer Direktbezug",
      cert: ["Bio-Anbau", "Fairtrade-Handel"],
      persona: null,
      badge: null,
      img: "assets/img/teas/crimson-rooibos.jpg"
    },

    /* --- Schwarztee ---------------------------------------------------- */
    {
      id: "golden-harmony",
      name: "Golden Harmony",
      cat: "schwarztee",
      price: 24,
      size: "75 g · ca. 38 Tassen",
      caffeine: "medium",
      intensity: 2,
      tastes: ["mild"],
      notes: "Weiches Malz, Klee-Honig, warmer Keks, Hauch Karamell",
      desc: "Ein klassischer Schwarztee mit vollmundigem Aroma und wenig Bitterkeit: Weiches Malz, Klee-Honig und ein warmer Keks-Ton im Abgang. Bio- und Fairtrade-zertifiziert (fiktive Beispieldaten) – für alle, die eine verlässliche Alltagsqualität suchen, die jeden Morgen funktioniert.",
      ingredients: ["Schwarztee (Assam- und Ceylon-Blend)"],
      brew: { temp: "100 °C", time: "3–4 Min.", amount: "1 TL pro Tasse (250 ml)" },
      origin: "Assam-Tal & Ceylon-Hochland, veredelt im GoSipTea Atelier",
      cert: ["Bio-Anbau", "Fairtrade-Handel"],
      persona: "jonas",
      badge: "Persona-Pick",
      img: "assets/img/teas/golden-harmony.jpg"
    },
    {
      id: "golden-sunrise",
      name: "Golden Sunrise Assam",
      cat: "schwarztee",
      price: 22,
      size: "80 g · ca. 40 Tassen",
      caffeine: "high",
      intensity: 3,
      tastes: ["würzig"],
      notes: "Gemälzte Gerste, dunkler Honig, frisches Brot, milde Würze",
      desc: "Kräftiger Second-Flush-Assam für den Start in den Tag: Malz, dunkler Honig und eine brotige Wärme. Verträgt einen Schuss Milch – und wird genau dann richtig rund, wenn der Morgen einen Anstoß braucht.",
      ingredients: ["Schwarztee (Assam Second Flush)"],
      brew: { temp: "100 °C", time: "3–4 Min.", amount: "1 TL pro Tasse (250 ml)" },
      origin: "Assam-Tal, Nordindien · ausgewählte Gartenpartien",
      cert: ["Bio-Anbau", "Fairtrade-Handel"],
      persona: null,
      badge: null,
      img: "assets/img/teas/golden-sunrise.jpg"
    },
    {
      id: "velvet-earl-grey",
      name: "Velvet Earl Grey",
      cat: "schwarztee",
      price: 24,
      size: "75 g · ca. 38 Tassen",
      caffeine: "medium",
      intensity: 2,
      tastes: ["fruchtig"],
      notes: "Kaltgepresste Bergamotte, Kornblume, seidige Zitrus, weicher Abgang",
      desc: "Unser Earl Grey, aber samtiger: Ceylon-Schwarztee mit kaltgepresster Bergamotte und blauer Kornblume. Seidige Zitrusfrische ohne Biss – der Nachmittagstee für Schreibtisch und Sonntagskuchen.",
      ingredients: ["Schwarztee (Ceylon)", "Bergamotten-Öl", "Kornblumenblüten", "Orangenschalen"],
      brew: { temp: "100 °C", time: "3–4 Min.", amount: "1 TL pro Tasse (250 ml)" },
      origin: "Ceylon-Hochland, Sri Lanka · Bergamotte aus Kalabrien",
      cert: ["Bio-Anbau", "Plastikfreie Verpackung"],
      persona: null,
      badge: null,
      img: "assets/img/teas/velvet-earl-grey.jpg"
    },
    {
      id: "spekulatius-stuendchen",
      name: "Spekulatius-Stündchen",
      cat: "schwarztee",
      price: 17,
      size: "80 g · ca. 40 Tassen",
      caffeine: "medium",
      intensity: 2,
      tastes: ["würzig", "mild"],
      notes: "Spekulatius, Zimt, geröstete Mandel, Karamell",
      desc: "Der Ofen hat gerade geschlossen, die Plätzchen sind noch warm: Weicher Schwarztee mit Spekulatiusgewürz, Zimt und gerösteter Mandel. Der Adventsklassiker für das Stündchen zwischen Kaffee und Abendtee.",
      ingredients: ["Schwarztee", "Zimtstücke", "Mandeln", "Kakaoschalen", "natürliches Aroma"],
      brew: { temp: "100 °C", time: "3–4 Min.", amount: "1 TL pro Tasse (250 ml)" },
      origin: "Ceylon-Basis, komponiert im GoSipTea Atelier",
      cert: ["Bio-Anbau", "Plastikfreie Verpackung"],
      persona: null,
      badge: null,
      img: "assets/img/xmas/spekulatius-stuendchen.jpg"
    },

    /* --- Grüntee -------------------------------------------------------- */
    {
      id: "jade-whisper",
      name: "Jade Whisper",
      cat: "gruentee",
      price: 26,
      size: "70 g · ca. 35 Tassen",
      caffeine: "low",
      intensity: 2,
      tastes: ["mild", "kräuterig"],
      notes: "Geröstete Kastanie, frisches Gras, Orchidee, süßes Butter-Finale",
      desc: "Ein leiser Jade-Grüntee mit seidigem Körper: geröstete Kastanie, frisch gemähtes Gras und ein blumiger Hauch Orchidee. Das süße Butter-Finale macht ihn zu einem Grüntee für Menschen, die Bitterkeit meiden.",
      ingredients: ["Grüntee (Jade-Cloud-Style)", ],
      brew: { temp: "75–80 °C", time: "2–3 Min.", amount: "1 TL pro Tasse (250 ml)" },
      origin: "Teegarten in der Provinz Zhejiang, China",
      cert: ["Bio-Anbau", "Plastikfreie Verpackung"],
      persona: null,
      badge: null,
      img: "assets/img/teas/jade-whisper.jpg"
    },
    {
      id: "morgenlicht-sencha",
      name: "Morgenlicht Sencha",
      cat: "gruentee",
      price: 20,
      size: "80 g · ca. 40 Tassen",
      caffeine: "low",
      intensity: 2,
      tastes: ["mild", "kräuterig"],
      notes: "Frisches Gras, junge Blattspitzen, Zitrusnote, klare Klarheit",
      desc: "Gedämpfter Japan-Sencha mit klarem, grünem Auftritt: frisches Gras, eine feine Zitrusnote und ein sauberer Abgang. Der Morgen-Grüntee für alle, die sanft wach werden möchten.",
      ingredients: ["Grüntee (Sencha, gedämpft)"],
      brew: { temp: "75–80 °C", time: "1,5–2,5 Min.", amount: "1 TL pro Tasse (250 ml)" },
      origin: "Shizuoka-Präfektur, Japan",
      cert: ["Bio-Anbau", "Plastikfreie Verpackung"],
      persona: null,
      badge: "Neu",
      img: "assets/img/new/morgenlicht-sencha.jpg"
    },
    {
      id: "gluehglueck-orange-kardamom",
      name: "Glühglück Orange & Kardamom",
      cat: "gruentee",
      price: 18,
      size: "70 g · ca. 35 Tassen",
      caffeine: "low",
      intensity: 2,
      tastes: ["fruchtig", "würzig"],
      notes: "Süße Orange, grüner Kardamom, Nelke, goldener Glanz",
      desc: "Grüntee trifft Glühwein-Begeisterung: Süße Orange, warmer Kardamom und eine Nelke im sanften grünen Körper. Das goldene Glühglück für kalte Balkonabende – ohne Zucker, ohne Koffein-Bombe.",
      ingredients: ["Grüntee (Sencha)", "Orangenschalen", "Kardamom", "Nelken", "Zimt", "natürliches Aroma"],
      brew: { temp: "75–80 °C", time: "2–3 Min.", amount: "1 TL pro Tasse (250 ml)" },
      origin: "Sencha-Basis aus China, komponiert im GoSipTea Atelier",
      cert: ["Bio-Anbau", "Plastikfreie Verpackung"],
      persona: null,
      badge: null,
      img: "assets/img/xmas/gluehglueck-orange-kardamom.jpg"
    },

    /* --- Gewürztee & Chai ------------------------------------------------ */
    {
      id: "forest-ember-chai",
      name: "Forest Ember Chai",
      cat: "chai",
      price: 27,
      size: "90 g · ca. 45 Tassen",
      caffeine: "high",
      intensity: 3,
      tastes: ["würzig"],
      notes: "Zimt-Glut, Kardamom-Wärme, Kakaonuss, schwarzer Pfeffer",
      desc: "Ein Chai wie ein Abend am Lagerfeuer: Assam-Schwarztee unter einer Glut aus Zimt, Kardamom, Kakaonuss und schwarzem Pfeffer. Klassisch mit Milch und Honig geköchelt – oder pur, kräftig und würzig.",
      ingredients: ["Schwarztee (Assam)", "Zimt", "Kardamom", "Kakaonibs", "Ingwer", "schwarzer Pfeffer", "Nelken"],
      brew: { temp: "100 °C", time: "4–5 Min.", amount: "1 TL pro Tasse; klassisch: 2 Min. mit Milch köcheln" },
      origin: "Assam-Basis, Gewürze aus Kerala, Indien",
      cert: ["Bio-Anbau", "Fairtrade-Handel"],
      persona: null,
      badge: null,
      img: "assets/img/teas/forest-ember-chai.jpg"
    },
    {
      id: "zimtstern-chai",
      name: "Zimtstern-Chai",
      cat: "chai",
      price: 19,
      size: "90 g · ca. 45 Tassen",
      caffeine: "high",
      intensity: 3,
      tastes: ["würzig"],
      notes: "Ceylon-Zimt, Kardamom, Sternanis, Kakaonuss",
      desc: "Der chai-artige Klassiker für kalte Tage: Ceylon-Zimt, Kardamom und Sternanis auf kräftigem Schwarztee. Süß-würzig wie der Duft der ersten Plätzchen – ein Chai, der Gemeinschaft atmet.",
      ingredients: ["Schwarztee", "Ceylon-Zimt", "Kardamom", "Sternanis", "Kakaoschalen", "natürliches Aroma"],
      brew: { temp: "100 °C", time: "4–5 Min.", amount: "1 TL pro Tasse; mit Milch & Honig ein Traum" },
      origin: "Ceylon-Basis, Zimt aus Sri Lanka",
      cert: ["Bio-Anbau", "Plastikfreie Verpackung"],
      persona: null,
      badge: null,
      img: "assets/img/xmas/zimtstern-chai.jpg"
    },

    /* --- Tee-Spezialitäten ------------------------------------------------ */
    {
      id: "midnight-oolong",
      name: "Midnight Oolong",
      cat: "spezialitaeten",
      price: 30,
      size: "60 g Dose · ca. 30 Tassen",
      caffeine: "medium",
      intensity: 3,
      tastes: ["würzig"],
      notes: "Geröstete Kastanie, dunkler Karamell, Orchidee, langes Glutfinale",
      desc: "Ein dunkel gerösteter Oolong für die langen Nächte: geröstete Kastanie, dunkler Karamell und ein blumiger Hauch Orchidee. Bis zu vier Aufgüsse – jede Tasse erzählt eine andere Geschichte.",
      ingredients: ["Oolong-Tee (dunkel geröstet)"],
      brew: { temp: "90 °C", time: "2–3 Min.", amount: "1 TL pro Tasse; bis zu 4 Aufgüsse" },
      origin: "Wuyi-Gebirge, Fujian, China",
      cert: ["Bio-Anbau", "Plastikfreie Verpackung"],
      persona: null,
      badge: null,
      img: "assets/img/teas/midnight-oolong.jpg"
    },
    {
      id: "emerald-matcha",
      name: "Emerald Matcha Reserve",
      cat: "spezialitaeten",
      price: 38,
      size: "30 g Dose · ca. 15 Schalen",
      caffeine: "high",
      intensity: 3,
      tastes: ["kräuterig"],
      notes: "Tiefes Umami, süßes Gras, weiße Schokolade, jadegrüner Samt",
      desc: "Zeremonie-Grade-Matcha aus der ersten Ernte: tiefes Umami, süßes Gras und ein jadegrüner, samtiger Körper. In einer Steinmühle gemahlen – für die stille Tee-Zeremonie zwischendurch.",
      ingredients: ["Matcha (Zeremonie-Grade, Steinmühle)"],
      brew: { temp: "80 °C", time: "schlagen", amount: "2 Bambuslöffel (ca. 2 g) auf 100 ml" },
      origin: "Uji, Kyoto, Japan · erste Ernte",
      cert: ["Bio-Anbau", "Plastikfreie Verpackung"],
      persona: null,
      badge: null,
      img: "assets/img/teas/emerald-matcha.jpg"
    },

    /* --- Probierpakete & Geschenksets -------------------------------------- */
    {
      id: "tee-adventskalender-2026",
      name: "Tee-Adventskalender 2026",
      cat: "sets",
      price: 69,
      size: "24 Probierpakete + Tee-Set",
      caffeine: "none",
      intensity: 2,
      tastes: ["fruchtig", "mild", "würzig", "kräuterig"],
      notes: "24 Probierpakete, exklusives Tee-Set, festliche Überraschungen",
      desc: "Ein Adventskalender – und mehr: Hinter 24 Türchen warten je 2 Tassen Probierpakete aus dem gesamten GoSipTea-Sortiment (Früchte-, Kräuter-, Grün- und Schwarztees). Dazu ein exklusives GoSipTea-Tee-Set mit handgemachter Steinzeugkanne, zwei Tassen und Teesieb. Der Kalender für gemeinsame Adventsnachmittage – mit dem Tee-Set bleibt der Genuss auch nach Weihnachten.",
      ingredients: ["24 Probierpakete (je ca. 4 g) aus dem Sortiment", "Steinzeugkanne 0,9 l", "2 Steinzeugtassen", "Edelstahl-Teesieb", "24 Türchen-Karten mit Teegeschichten"],
      brew: { temp: "sortenabhängig", time: "sortenabhängig", amount: "je Türchen 1–2 Tassen" },
      origin: "Zusammengestellt im GoSipTea Atelier · Kanne handgemacht",
      cert: ["Bio-Anbau", "Plastikfreie Verpackung"],
      persona: null,
      badge: "Winter Edition",
      img: "assets/img/xmas/advent.jpg"
    },
    {
      id: "festtags-probierpaket",
      name: "Festtags-Probierpaket",
      cat: "sets",
      price: 24,
      size: "4 × 50 g Festtags-Tees",
      caffeine: "medium",
      intensity: 2,
      tastes: ["würzig", "fruchtig"],
      notes: "Alle vier Festtags-Tees, Duftkerze, Geschenkkarte",
      desc: "Das Festtags-Probierpaket mit allen vier Winter-Kompositionen (je 50 g), einer zum Set passenden Duftkerze und einer handgeschriebenen Geschenkkarte. Für alle, die die Winterzeit in ihrer ganzen Bandbreite schmecken möchten – oder beschenken.",
      ingredients: ["Goldener Bratapfel (50 g)", "Glühglück Orange & Kardamom (50 g)", "Spekulatius-Stündchen (50 g)", "Zimtstern-Chai (50 g)", "Duftkerze", "Geschenkkarte"],
      brew: { temp: "sortenabhängig", time: "3–8 Min.", amount: "je Sorte 1 TL pro Tasse" },
      origin: "Zusammengestellt im GoSipTea Atelier",
      cert: ["Bio-Anbau", "Plastikfreie Verpackung"],
      persona: null,
      badge: null,
      img: "assets/img/xmas/festtags-probierpaket.jpg"
    },
    {
      id: "winter-tee-set",
      name: "Winter-Tee-Set",
      cat: "sets",
      price: 39,
      size: "Kanne + 2 Tassen + 2 Tees",
      caffeine: "none",
      intensity: 1,
      tastes: ["mild", "kräuterig"],
      notes: "Handgemachtes Steinzeug, Kanne 0,9 l, 2 Bio-Tee-Wahlen",
      desc: "Handgemachtes Steinzeug für gemeinsame Runden: Kanne (0,9 l), zwei Tassen und zwei frei wählbare Bio-Tees (je 50 g). Das Set für geteilte Teemomente – von der WG-Küche bis zum Familienadvent.",
      ingredients: ["Steinzeugkanne 0,9 l", "2 Steinzeugtassen", "2 Bio-Tees nach Wahl (je 50 g)"],
      brew: { temp: "sortenabhängig", time: "sortenabhängig", amount: "Kanne füllt ca. 3 Tassen" },
      origin: "Steinzeug aus kleiner Töpferwerkstatt, Tees aus dem Sortiment",
      cert: ["Bio-Anbau", "Plastikfreie Verpackung"],
      persona: null,
      badge: null,
      img: "assets/img/xmas/winter-tee-set.jpg"
    }
  ]
};

/* ---------------------------------------------------------------------- */
/* Helfer                                                                  */
/* ---------------------------------------------------------------------- */
GOSIP.catById = function (id) {
  return this.categories.find(function (c) { return c.id === id; }) || null;
};

GOSIP.productById = function (id) {
  return this.products.find(function (p) { return p.id === id; }) || null;
};

GOSIP.productsByCat = function (catId) {
  return this.products.filter(function (p) { return p.cat === catId; });
};

GOSIP.caffeineLabel = function (key) {
  return {
    none: "ohne Koffein",
    low: "wenig Koffein",
    medium: "mittleres Koffein",
    high: "viel Koffein"
  }[key] || "";
};

GOSIP.intensityLabel = function (n) {
  return { 1: "sanft", 2: "mittel", 3: "intensiv" }[n] || "";
};

/* EUR-Preis formatieren */
GOSIP.eur = function (n) {
  return n.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " €";
};

/* Explizit global verfügbar machen (const erzeugt keine window-Eigenschaft) */
window.GOSIP = GOSIP;
