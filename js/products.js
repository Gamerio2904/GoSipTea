/* ==========================================================================
   GoSipTea — Tea Catalog
   Single source of truth for the showcase catalog.
   Each product drives: grid cards, detail modal, cart lines,
   dynamic <title>/meta tags and JSON-LD parity (see index.html).
   ========================================================================== */

const TEA_PRODUCTS = [
  /* ------------------------------------------------------------------
     Persona Picks — curated for our community personas (marketing
     blueprint): Mia Weber (fruity, balanced aroma, medium intensity,
     fair price, zero-fail tastings) and Jonas Lindner (classic, mild
     black tea, credible organic & Fairtrade, honest price-quality).
     ------------------------------------------------------------------ */
  {
    id: "berry-balance",
    name: "Berry Balance",
    category: "herbal",
    persona: "mia",
    origin: "GoSipTea Atelier · Hamburg",
    altitude: "Hibiscus from Aswan · berries from Ceylon",
    price: 19,
    size: "80 g · ~40 cups",
    caffeine: "none",
    taste: ["fruity", "sweet"],
    notes: "Blackberry, elderberry, baked apple, gentle hibiscus lift",
    badge: "Persona Pick",
    rating: 4.8,
    reviews: 156,
    description:
      "Blended for balanced afternoons: sun-ripened berries and soft baked apple over " +
      "a naturally gentle hibiscus base — fruity, yet never too sharp or too sweet. " +
      "Medium intensity that steeps forgivingly: three minutes or seven, the cup stays " +
      "smooth. The easy way to try something new without risking a bad surprise.",
    certifications: ["USDA Organic", "Fair Trade", "Plastic-Free Packaging"],
    brewing: {
      temp: "100°C · 212°F",
      time: "5–7 min",
      dose: "3 g / 250 ml",
      steps: [
        "Fruit teas love fully boiled water.",
        "5 minutes for bright berry notes, 7 for deeper apple warmth.",
        "Never turns bitter — re-steep the leaves once more if you like."
      ]
    },
    image: "assets/img/teas/berry-balance.jpg",
    metaTitle: "Berry Balance — Fruity Organic Berry Fruit Tea | GoSipTea",
    metaDescription: "Balanced berry fruit tea with blackberry, elderberry and baked apple. Medium intensity, never bitter, USDA Organic. 80 g loose leaf, $19."
  },
  {
    id: "golden-harmony",
    name: "Golden Harmony",
    category: "black",
    persona: "jonas",
    origin: "Dimbula Highlands · Sri Lanka",
    altitude: "1,300 m single estate",
    price: 24,
    size: "75 g · ~38 cups",
    caffeine: "medium",
    taste: ["sweet", "robust"],
    notes: "Soft malt, clover honey, warm biscuit, whisper of caramel",
    badge: "Persona Pick",
    rating: 4.9,
    reviews: 178,
    description:
      "A classic black tea for everyday rituals: high-grown Dimbula leaves, gently " +
      "oxidized for a full yet mellow aroma with notably little bitterness. Honey-smooth " +
      "plain, wonderful with a splash of oat milk. Verified organic & Fairtrade from a " +
      "single family estate — honest quality at a price that keeps its promises.",
    certifications: ["USDA Organic", "Fair Trade", "Rainforest Alliance"],
    brewing: {
      temp: "95°C · 203°F",
      time: "3 min",
      dose: "3 g / 250 ml",
      steps: [
        "Freshly boiled water with a brief rest — gentle on the leaves.",
        "Steep 3 minutes; the cup stays smooth without tannic bite.",
        "Enjoy plain, or with oat milk and a spoon of honey."
      ]
    },
    image: "assets/img/teas/golden-harmony.jpg",
    metaTitle: "Golden Harmony — Mild Organic Classic Black Tea | GoSipTea",
    metaDescription: "Mellow classic black tea from Dimbula, Sri Lanka. Soft malt and honey with little bitterness, USDA Organic & Fairtrade. 75 g loose leaf, $24."
  },
  {
    id: "jade-whisper",
    name: "Jade Whisper",
    category: "green",
    origin: "Hangzhou · Zhejiang, China",
    altitude: "600–800 m terraces",
    price: 26,
    size: "70 g · ~35 cups",
    caffeine: "low",
    taste: ["sweet", "earthy", "floral"],
    notes: "Toasted chestnut, fresh-cut grass, orchid, sweet butter finish",
    badge: "Bestseller",
    rating: 4.9,
    reviews: 214,
    description:
      "Our signature first-flush Dragonwell, pan-fired within hours of plucking by the " +
      "Zhang family on the West Lake terraces. Flat, spear-shaped leaves unfurl into a " +
      "jade liquor with a naturally sweet, nutty depth — the tea that converted our " +
      "founders, and still our most reordered ritual.",
    certifications: ["USDA Organic", "Fair Trade", "Carbon Neutral"],
    brewing: {
      temp: "80°C · 176°F",
      time: "2 min",
      dose: "3 g / 250 ml",
      steps: [
        "Rinse leaves with a splash of hot water and pour it off.",
        "Steep 2 minutes for the first infusion, then +30 s per re-steep.",
        "Re-steep up to 3 times — each infusion reveals a new layer."
      ]
    },
    image: "assets/img/teas/jade-whisper.jpg",
    metaTitle: "Jade Whisper — Organic Dragonwell Green Tea | GoSipTea",
    metaDescription: "First-flush organic Dragonwell green tea from Hangzhou. Toasted chestnut and orchid notes, USDA Organic, Fair Trade. 70 g loose leaf, $26."
  },
  {
    id: "golden-sunrise",
    name: "Golden Sunrise Assam",
    category: "black",
    origin: "Dibrugarh · Assam, India",
    altitude: "120 m river valley",
    price: 22,
    size: "80 g · ~40 cups",
    caffeine: "high",
    taste: ["robust", "sweet"],
    notes: "Malted barley, dark honey, baked bread, gentle spice",
    badge: "Bold",
    rating: 4.8,
    reviews: 186,
    description:
      "A second-flush Assam picked in peak summer, when golden tips concentrate the " +
      "malt. Slow-oxidized for a liquor the color of sunset and a body that stands up " +
      "to milk — our go-to for mornings that demand momentum. Grown beside the " +
      "Brahmaputra on a garden that replants a tree for every kilo sold.",
    certifications: ["USDA Organic", "Rainforest Alliance", "Plastic-Free Packaging"],
    brewing: {
      temp: "95°C · 203°F",
      time: "3–4 min",
      dose: "3.5 g / 250 ml",
      steps: [
        "Use freshly boiled water for full extraction.",
        "Steep 3 minutes for black-coffee strength, 4 for milk tea.",
        "Add oat milk and a whisper of honey if you like it luxe."
      ]
    },
    image: "assets/img/teas/golden-sunrise.jpg",
    metaTitle: "Golden Sunrise Assam — Bold Organic Black Tea | GoSipTea",
    metaDescription: "Second-flush Assam black tea with golden tips. Malt, dark honey and baked bread. High caffeine, Rainforest Alliance certified. $22."
  },
  {
    id: "velvet-earl-grey",
    name: "Velvet Earl Grey",
    category: "black",
    origin: "Ceylon Highlands · Sri Lanka",
    altitude: "1,400 m estate",
    price: 24,
    size: "75 g · ~38 cups",
    caffeine: "medium",
    taste: ["floral", "fruity"],
    notes: "Cold-pressed bergamot, blue cornflower, silky citrus, soft spice",
    badge: "Signature",
    rating: 4.9,
    reviews: 321,
    description:
      "High-grown Ceylon orange pekoe scented three times with cold-pressed Calabrian " +
      "bergamot oil — never artificial flavoring — then finished with hand-picked blue " +
      "cornflower petals. The result is silky rather than sharp: citrus that whispers, " +
      "florals that linger. Afternoon ceremonies, upgraded.",
    certifications: ["USDA Organic", "Direct Trade", "Plastic-Free Packaging"],
    brewing: {
      temp: "90°C · 194°F",
      time: "3 min",
      dose: "3 g / 250 ml",
      steps: [
        "Slightly below boiling protects the bergamot top notes.",
        "Steep 3 minutes; longer pulls out tannic bitterness.",
        "Delicious plain — or with a lemon twist, never milk."
      ]
    },
    image: "assets/img/teas/velvet-earl-grey.jpg",
    metaTitle: "Velvet Earl Grey — Organic Bergamot Black Tea | GoSipTea",
    metaDescription: "Ceylon black tea triple-scented with real Calabrian bergamot and blue cornflower. Silky citrus, organic, $24. Afternoon tea, elevated."
  },
  {
    id: "emerald-matcha",
    name: "Emerald Matcha Reserve",
    category: "green",
    origin: "Uji · Kyoto, Japan",
    altitude: "Shaded gyokuro gardens",
    price: 38,
    size: "30 g tin · 15 bowls",
    caffeine: "high",
    taste: ["earthy", "sweet", "floral"],
    notes: "Deep umami, sweet grass, white chocolate, jade-green velvet foam",
    badge: "Ceremonial",
    rating: 5.0,
    reviews: 98,
    description:
      "Ceremonial-grade, stone-milled matcha from Uji's oldest shaded gardens, where " +
      "tana canopies deepen chlorophyll for three weeks before the spring harvest. " +
      "First-harvest leaves only, de-stemmed and granite-milled at 3 microns. Whisk " +
      "into a foam so velvety it drinks like a dessert that happens to be a vegetable.",
    certifications: ["JAS Organic", "Radiation Tested", "Carbon Neutral"],
    brewing: {
      temp: "75°C · 167°F",
      time: "20 s whisk",
      dose: "2 g / 70 ml",
      steps: [
        "Sift 2 g of matcha into a warmed bowl to prevent clumps.",
        "Add 70 ml of 75°C water; whisk briskly in an M-motion.",
        "Stop when a fine jade foam forms — drink immediately, respects the harvest."
      ]
    },
    image: "assets/img/teas/emerald-matcha.jpg",
    metaTitle: "Emerald Matcha Reserve — Ceremonial-Grade Uji Matcha | GoSipTea",
    metaDescription: "Ceremonial-grade stone-milled matcha from Uji, Kyoto. Deep umami and sweet grass, first harvest only, JAS Organic. 30 g tin, $38."
  },
  {
    id: "moonlight-chamomile",
    name: "Moonlight Chamomile",
    category: "herbal",
    origin: "Fayoum Oasis · Egypt",
    altitude: "Desert oasis fields",
    price: 19,
    size: "60 g · ~30 cups",
    caffeine: "none",
    taste: ["floral", "sweet"],
    notes: "Honeyed apple, soft pollen, meadow herbs, golden calm",
    badge: "Caffeine-Free",
    rating: 4.7,
    reviews: 142,
    description:
      "Whole Egyptian chamomile blossoms — never crushed dust — hand-picked at dawn " +
      "while their essential oils peak, then shade-dried on the Nile delta. Steeps " +
      "into liquid moonlight: honeyed apple sweetness with a lavender-soft landing. " +
      "Our most-gifted tisane and the final chapter of long days.",
    certifications: ["USDA Organic", "Fair Trade", "Plastic-Free Packaging"],
    brewing: {
      temp: "100°C · 212°F",
      time: "5 min",
      dose: "2.5 g / 250 ml",
      steps: [
        "Full boiling water coaxes out the blossom oils.",
        "Cover your cup while steeping to trap the aromatics.",
        "5 minutes for sleep ritual strength; add raw honey if desired."
      ]
    },
    image: "assets/img/teas/moonlight-chamomile.jpg",
    metaTitle: "Moonlight Chamomile — Organic Caffeine-Free Herbal Tea | GoSipTea",
    metaDescription: "Whole Egyptian chamomile blossoms, shade-dried on the Nile delta. Honeyed apple and meadow notes, caffeine-free, USDA Organic. $19."
  },
  {
    id: "crimson-rooibos",
    name: "Crimson Rooibos",
    category: "herbal",
    origin: "Cederberg · South Africa",
    altitude: "450 m fynbos wilderness",
    price: 21,
    size: "80 g · ~40 cups",
    caffeine: "none",
    taste: ["earthy", "sweet", "fruity"],
    notes: "Warm cedar, honeybush, burnt caramel, ruby-red glow",
    badge: "Wild-Harvested",
    rating: 4.8,
    reviews: 167,
    description:
      "Wild-harvested rooibos from the Cederberg's fynbos fields, where the red needles " +
      "grow on nothing but winter rain and patience. Traditionally oxidized on open " +
      "air under mountain sun, it brews a ruby-red cup with deep cedar warmth and " +
      "natural sweetness — no sugar required, ever.",
    certifications: ["Rainforest Alliance", "Plastic-Free Packaging", "Carbon Neutral"],
    brewing: {
      temp: "100°C · 212°F",
      time: "5–7 min",
      dose: "3 g / 250 ml",
      steps: [
        "Rooibos is forgiving — it never turns bitter.",
        "Steep 5 minutes for pure sipping, 7 for rooibos lattes.",
        "Excellent with a cinnamon stick and oat milk."
      ]
    },
    image: "assets/img/teas/crimson-rooibos.jpg",
    metaTitle: "Crimson Rooibos — Organic South African Herbal Tea | GoSipTea",
    metaDescription: "Wild-harvested rooibos from Cederberg, South Africa. Cedar, honeybush and caramel notes, caffeine-free, ruby-red brew. $21."
  },
  {
    id: "midnight-oolong",
    name: "Midnight Oolong",
    category: "special",
    origin: "Nantou · Taiwan",
    altitude: "1,000 m mist gardens",
    price: 30,
    size: "60 g tin · ~30 cups",
    caffeine: "medium",
    taste: ["robust", "sweet", "fruity"],
    notes: "Roasted chestnut, dark caramel, orchid shadow, long ember finish",
    badge: "Small Batch",
    rating: 4.9,
    reviews: 89,
    description:
      "A charcoal-roasted Dong Ding oolong from Nantou's high mist gardens, finished " +
      "over longan-wood embers in the traditional style. Released in small batches of " +
      "400 tins per season. Each 40-second re-steep peels back a layer — from roast, " +
      "to caramel, to the orchid floral that made this mountain famous.",
    certifications: ["Direct Trade", "Carbon Neutral", "Plastic-Free Packaging"],
    brewing: {
      temp: "95°C · 203°F",
      time: "50 s",
      dose: "5 g / 150 ml gongfu",
      steps: [
        "Best in a gaiwan or small teapot, leaf-heavy.",
        "First infusion 50 seconds; add 15–20 s per round.",
        "Survives 6+ infusions — an evening companion, not a drink."
      ]
    },
    image: "assets/img/teas/midnight-oolong.jpg",
    metaTitle: "Midnight Oolong — Charcoal-Roasted Taiwan Oolong | GoSipTea",
    metaDescription: "Charcoal-roasted Dong Ding oolong from Nantou, Taiwan. Roast, caramel and orchid layers across 6+ infusions. Small batch of 400 tins, $30."
  },
  {
    id: "forest-ember-chai",
    name: "Forest Ember Chai",
    category: "special",
    origin: "Kerala · India",
    altitude: "Cardamom hills",
    price: 27,
    size: "90 g · ~45 cups",
    caffeine: "high",
    taste: ["spicy", "robust", "sweet"],
    notes: "Cinnamon ember, cardamom warmth, cacao nib, black pepper glow",
    badge: "Winter Edition",
    rating: 4.8,
    reviews: 203,
    description:
      "Our spice-blenders in the Kerala cardamom hills layer Assam black tea with " +
      "cinnamon bark, green cardamom, star anise, black pepper and raw cacao nibs — " +
      "ground fresh in micro-batches every fortnight. Built for simmering: the pot " +
      "fills the whole house with the smell of a forest fire, in the best way.",
    certifications: ["Fair Trade", "USDA Organic", "Direct Trade"],
    brewing: {
      temp: "Simmer · 98°C",
      time: "8 min",
      dose: "4 g / 250 ml",
      steps: [
        "Simmer leaves and spices in water for 4 minutes — don't rush it.",
        "Add oat or whole milk and simmer 3 more minutes.",
        "Sweeten with jaggery or honey; strain and serve hot."
      ]
    },
    image: "assets/img/teas/forest-ember-chai.jpg",
    metaTitle: "Forest Ember Chai — Spiced Masala Chai Black Tea | GoSipTea",
    metaDescription: "Assam black tea layered with Kerala cardamom, cinnamon, star anise and cacao nibs. Made for simmering, Fair Trade, $27. Winter edition."
  },

  /* ======================================================================
     Winter Edition — festive showcase teas (German copy, internal mini-site
     christmas/index.html). They share the same cart & catalog as the
     signature range but are NOT rendered in the main collection grid
     (see filteredProducts() in js/app.js).
     ====================================================================== */
  {
    id: "goldener-bratapfel",
    name: "Goldener Bratapfel",
    collection: "christmas",
    category: "herbal",
    origin: "GoSipTea Manufaktur · Hamburg",
    altitude: "Kleine Winterbatch · 400 Dosen",
    price: 16,
    size: "80 g · ca. 40 Tassen",
    caffeine: "none",
    taste: ["sweet", "fruity"],
    notes: "Bratapfel, Zimtstange, Vanilleblüte, flüssiger Honig",
    badge: "Festtags-Liebling",
    rating: 4.9,
    reviews: 128,
    description:
      "Wie der Duft des letzten Adventssonntags in einer Tasse: saftige Bratapfel-Stücke, " +
      "Ceylon-Zimt und ein Hauch Bourbon-Vanille treffen auf sanfte Hibiskus-Wärme. " +
      "Koffeinfrei, also beliebig spät – und zusammen mit einer Decke ohnehin unschlagbar. " +
      "Familienrezept der Manufaktur, jeden Winter frisch komponiert.",
    certifications: ["Bio-zertifiziert", "Kleine Batch", "Plastikfrei verpackt"],
    brewing: {
      temp: "95°C · 203°F",
      time: "5–7 Min.",
      dose: "3 g / 250 ml",
      steps: [
        "Wasser vollständig aufkochen lassen – Fruchttees mögen es heiß.",
        "5 Minuten für den ersten Aufguss, 7 für volle Bratapfel-Tiefe.",
        "Mit einer Scheibe Orange und einem Zimtstern servieren."
      ]
    },
    image: "assets/img/xmas/goldener-bratapfel.jpg",
    mood: ["cozy"]
  },
  {
    id: "gluehglueck-orange-kardamom",
    name: "Glühglück Orange & Kardamom",
    collection: "christmas",
    category: "green",
    origin: "Uji · Japan & Nürnberger Gewürzhof",
    altitude: "Herbstpflückung · schattige Gärten",
    price: 18,
    size: "70 g · ca. 35 Tassen",
    caffeine: "low",
    taste: ["spicy", "fruity"],
    notes: "Süße Orange, grüner Kardamom, Nelke, goldener Glanz",
    badge: "Limitiert",
    rating: 4.8,
    reviews: 96,
    description:
      "Glühwein-Feeling, ganz ohne Glühwein: sanfter Grüntee aus Uji, ummantelt von " +
      "Sonnenorangen, grünem Kardamom und einer Spur Nelke. Der Duft füllt das ganze " +
      "Wohnzimmer, der Geschmack bleibt fein und goldklar. Viel zu gut für den Weihnachtsmarkt – " +
      "genau richtig für den Fenstersitz zu Hause.",
    certifications: ["JAS Bio", "Direkthandel", "CO₂-neutraler Versand"],
    brewing: {
      temp: "75°C · 167°F",
      time: "2 Min.",
      dose: "3 g / 250 ml",
      steps: [
        "Wasser abkochen und kurz stehen lassen – Grüntee mag es sanft.",
        "2 Minuten ziehen lassen – länger rückt die Orange zu weit nach vorn.",
        "Ein feiner Zweig Rosmarin macht ihn zum festlichen Aperitif-Ersatz."
      ]
    },
    image: "assets/img/xmas/gluehglueck-orange-kardamom.jpg",
    mood: ["spicy"]
  },
  {
    id: "spekulatius-stuendchen",
    name: "Spekulatius-Stündchen",
    collection: "christmas",
    category: "black",
    origin: "Ceylon Highlands · Sri Lanka",
    altitude: "1.400 m Familienestate",
    price: 17,
    size: "80 g · ca. 40 Tassen",
    caffeine: "medium",
    taste: ["sweet", "spicy"],
    notes: "Spekulatius, Zimt, geröstete Mandel, Karamell",
    badge: "Nur im Winter",
    rating: 4.9,
    reviews: 147,
    description:
      "Das Stündchen zwischen Keksdose und Fernseher, jetzt flüssig: vollmundiger Ceylon- " +
      "Schwarztee mit Spekulatius-Gewürzen, gerösteten Mandeln und einem Karamell-Finish, " +
      "das samtig weich um die Kehle legt. Verträgt sich prächtig mit einem Schuss Hafermilch – " +
      "und natürlich mit dem ersten echten Spekulatius daneben.",
    certifications: ["Rainforest Alliance", "Bio-zertifiziert", "Plastikfrei verpackt"],
    brewing: {
      temp: "90°C · 194°F",
      time: "3 Min.",
      dose: "3 g / 250 ml",
      steps: [
        "Kurz unter dem Siedepunkt aufgießen – schützt die feinen Gewürznoten.",
        "3 Minuten ziehen lassen, mit Milch wird er zum Dessert.",
        "Am besten mit frischen Zimtsternen durchziehen – duftet doppelt so gut."
      ]
    },
    image: "assets/img/xmas/spekulatius-stuendchen.jpg",
    mood: ["cozy", "indulgent"]
  },
  {
    id: "zimtstern-chai",
    name: "Zimtstern-Chai",
    collection: "christmas",
    category: "special",
    origin: "Kerala · Indien",
    altitude: "Kardamomhügel",
    price: 19,
    size: "90 g · ca. 45 Tassen",
    caffeine: "high",
    taste: ["spicy", "sweet"],
    notes: "Ceylon-Zimt, Kardamom, Sternanis, Kakaonuss",
    badge: "Winter Edition",
    rating: 4.8,
    reviews: 118,
    description:
      "Unser kräftigster Winterbote: Assam-Schwarztee, geschichtet mit Ceylon-Zimt, " +
      "Kardamom, Sternanis und einer Messerspitze Kakao – frisch gemahlen in winzigen " +
      "Batches. Aufgekocht in Milch & Wasser wird daraus der wärmste Platz im Haus. " +
      "Für alle, die ihren Advent gerne mit Pfeffer und Feuer würzen.",
    certifications: ["Fair Trade", "Direkthandel", "Bio-zertifiziert"],
    brewing: {
      temp: "Simmer · 98°C",
      time: "8 Min.",
      dose: "4 g / 250 ml",
      steps: [
        "Tee und Gewürze 4 Minuten in Wasser köcheln – nicht hetzen.",
        "Hafer- oder Vollmilch dazu, weitere 3 Minuten simmern.",
        "Mit Honig süßen, abseihen und anbrennen lassen, was an Wärme bleibt."
      ]
    },
    image: "assets/img/xmas/zimtstern-chai.jpg",
    mood: ["spicy"]
  },
  {
    id: "tee-adventskalender-2026",
    name: "Tee-Adventskalender 2026",
    collection: "christmas",
    category: "special",
    origin: "GoSipTea Manufaktur · Hamburg",
    altitude: "Limitiert auf 500 Kalender",
    price: 46,
    size: "24 Türen · 24 Bio-Teeminen",
    caffeine: "none",
    taste: ["sweet", "floral"],
    notes: "24 Überraschungen, Bio-Muster aller Gärten, Samtschachtel",
    badge: "Wunschzettel-Hit",
    rating: 5.0,
    reviews: 87,
    description:
      "24 Türen. 24 Teemomente. Ein Kalender, der duftet wie der erste Adventsmorgen: " +
      "hinter jeder Tür verbirgt sich eine handverlesene Bio-Teemine aus unseren " +
      "Partnergärten – von Jade Whisper bis zum Spekulatius-Stündchen. Aus Kraft- " +
      "pappe und Sojatinte, komplett kompostierbar. Und nach dem 24. Dezember? " +
      "Bleibt die schönste Tür trotzdem offen – die zum nächsten Weihnachten.",
    certifications: ["Bio-zertifiziert", "Kompostierbar", "Limitiert auf 500"],
    brewing: {
      temp: "Tür pro Tag",
      time: "1.–24. Dezember",
      dose: "24 × 2,5 g Proben",
      steps: [
        "Pro Tag eine Tür öffnen – oder laut Kalender-Regelbuch: alle auf einmal.",
        "Jede Mine reicht für eine große Tasse oder eine kleine Auszeit.",
        "Leere Türen in den Kompost, die Erinnerung bleibt im Tagebuch."
      ]
    },
    image: "assets/img/xmas/advent.jpg",
    mood: ["indulgent"],
    isCalendar: true
  }
];

/* Expose globally (no modules — keep GitHub Pages simple & fast) */
window.TEA_PRODUCTS = TEA_PRODUCTS;

/* Shared lookup + formatting helpers */
const GOSIP = {
  products: TEA_PRODUCTS,
  byId: (id) => TEA_PRODUCTS.find(p => p.id === id),
  categoryLabel: (key) => ({
    green: "Green Tea",
    black: "Black Tea",
    herbal: "Herbal Tea",
    special: "Special Editions"
  })[key] || key,
  caffeineLabel: (key) => ({
    none: "Caffeine-Free",
    low: "Low Caffeine",
    medium: "Medium Caffeine",
    high: "High Caffeine"
  })[key] || key,
  fmtPrice: (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n)
};
window.GOSIP = GOSIP;
