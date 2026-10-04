import { MEDIA, type SiteImage } from "./media";

export const BRAND = {
  name: "Ember & Crumb",
  descriptor: "Wood-fired kitchen & coffee bar",
  since: "2018",
  phone: "+1 (555) 014-2290",
  phoneHref: "tel:+15550142290",
  email: "hello@emberandcrumb.example",
  address: ["14 Hearth Lane", "Old Market Quarter"],
  instagram: "https://www.instagram.com/",
} as const;

export const NAV_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "Pizzas", href: "#pizzas" },
  { label: "Contact", href: "#contact" },
] as const;

/** 0 = Sunday … 6 = Saturday. */
export const HOURS = [
  { days: "Mon – Fri", open: "07:00", close: "21:00", dayIdx: [1, 2, 3, 4, 5] },
  { days: "Saturday", open: "08:00", close: "22:00", dayIdx: [6] },
  { days: "Sunday", open: "08:00", close: "18:00", dayIdx: [0] },
] as const;

export const OFFERINGS: {
  title: string;
  kicker: string;
  text: string;
  image: SiteImage;
  href: string;
}[] = [
  {
    title: "Wood-fired pizza",
    kicker: "From the oven",
    text: "Seventy-two-hour dough, San Marzano tomato and ninety seconds over oak.",
    image: MEDIA.pizza,
    href: "#pizzas",
  },
  {
    title: "Artisan burgers",
    kicker: "From the grill",
    text: "Dry-aged beef, house brioche and a whisper of beech-wood smoke.",
    image: MEDIA.burger,
    href: "#menu",
  },
  {
    title: "Specialty coffee",
    kicker: "From the bar",
    text: "Twelve single origins, roasted every Tuesday and pulled with care.",
    image: MEDIA.cortado,
    href: "#menu",
  },
  {
    title: "Fresh desserts",
    kicker: "From the pass",
    text: "Mascarpone, dark chocolate and pastry laminated over three days.",
    image: MEDIA.tiramisu,
    href: "#menu",
  },
];

/**
 * Chapters of the pizza scroll story. `from`/`to` are 1-based frame numbers in
 * the real image sequence (see PIZZA_SEQUENCE in media.ts) — copy follows the frames.
 */
export const PIZZA_CHAPTERS = [
  {
    from: 1,
    to: 52,
    title: "The round",
    text: "Tipo 00 flour, water, sea salt and time. Seventy-two hours cold, then stretched by hand to thirty centimetres.",
  },
  {
    from: 53,
    to: 125,
    title: "Every layer",
    text: "San Marzano tomato, fior di latte, roasted peppers, Gaeta olives, field mushrooms and basil — each one weighed, never piled.",
  },
  {
    from: 126,
    to: 150,
    title: "Together",
    text: "Assembled in under a minute, so the dough never waits and nothing goes soggy.",
  },
  {
    from: 151,
    to: 190,
    title: "To the fire",
    text: "Onto the peel and into a dome of stone, heated since dawn with seasoned oak and beech.",
  },
  {
    from: 191,
    to: 240,
    title: "Ninety seconds",
    text: "At 450 °C the crust blisters and leopard-spots while the centre stays soft. Then straight to your table.",
  },
] as const;

// ── Menu ─────────────────────────────────────────────────────────────────────
// Prices for coffee, bakes and desserts — and the Ortolana (formerly "Wood-Fired
// Pizza") — come from the café's existing menu data.
// Items marked `placeholder: true` are PLACEHOLDERS: their price (and, where noted,
// the photo) still needs to be confirmed by the café before launch.

export type MenuCategory = "Pizza" | "Burgers" | "Coffee" | "Desserts";

export type MenuItem = {
  name: string;
  description: string;
  price: string;
  image: SiteImage;
  tags?: string[];
  /** True when price/photo are placeholders awaiting real data. */
  placeholder?: boolean;
};

export const MENU_CATEGORIES: {
  name: MenuCategory;
  note: string;
  /** Index of the item whose photo leads the category preview. */
  lead?: number;
  items: MenuItem[];
}[] = [
  {
    name: "Pizza",
    note: "Wood-fired, 30 cm, ready in ninety seconds.",
    items: [
      {
        name: "Ortolana",
        description: "San Marzano, fior di latte, roasted peppers, Gaeta olives, field mushrooms, basil.",
        price: "18",
        image: MEDIA.pizza,
        tags: ["V", "House"],
      },
      {
        name: "Margherita",
        description: "San Marzano, fior di latte, basil, Sicilian olive oil.",
        price: "14", // PLACEHOLDER price
        image: MEDIA.pizzaLayers, // PLACEHOLDER photo
        tags: ["V"],
        placeholder: true,
      },
      {
        name: "Diavola",
        description: "Spicy Calabrian salami, smoked provola, chilli honey.",
        price: "17", // PLACEHOLDER price
        image: MEDIA.oven, // PLACEHOLDER photo
        placeholder: true,
      },
      {
        name: "Bianca al Tartufo",
        description: "Fior di latte, wild mushrooms, black truffle, thyme. No tomato.",
        price: "21", // PLACEHOLDER price
        image: MEDIA.pizzaPeel, // PLACEHOLDER photo
        tags: ["V"],
        placeholder: true,
      },
    ],
  },
  {
    name: "Burgers",
    note: "Dry-aged beef, house brioche, hand-cut fries.",
    items: [
      {
        name: "The Smoke House",
        description: "Dry-aged beef, aged cheddar, butter lettuce, tomato, beech-smoked mayo, sesame brioche.",
        price: "16", // PLACEHOLDER price
        image: MEDIA.burger,
        tags: ["House"],
        placeholder: true,
      },
      {
        name: "Ember Double",
        description: "Two smashed patties, American cheese, pickles, burnt-onion jam.",
        price: "18", // PLACEHOLDER price
        image: MEDIA.burgerSmoke, // PLACEHOLDER photo
        placeholder: true,
      },
      {
        name: "Garden Burger",
        description: "Roasted mushroom and lentil patty, smoked scamorza, rocket, tomato.",
        price: "15", // PLACEHOLDER price
        image: MEDIA.burger, // PLACEHOLDER photo
        tags: ["V"],
        placeholder: true,
      },
    ],
  },
  {
    name: "Coffee",
    note: "Roasted on Tuesdays. Oat milk at no extra cost.",
    lead: 1,
    items: [
      { name: "Espresso", description: "Ethiopia Guji, single origin. Jasmine, bergamot, dark honey.", price: "3.8", image: MEDIA.espresso },
      { name: "Cortado", description: "Equal parts espresso and steamed milk. Velvet, cocoa, toasted almond.", price: "4.6", image: MEDIA.cortado },
      { name: "Flat White", description: "Double ristretto under silk-fine microfoam. Caramel, hazelnut.", price: "5.2", image: MEDIA.flatWhite },
      { name: "Caramel Latte", description: "House-burnt caramel, a pinch of sea salt, espresso, steamed milk.", price: "5.8", image: MEDIA.latte },
      { name: "Cold Brew", description: "Steeped eighteen hours in small batches. Dark cherry, cacao nib.", price: "5.4", image: MEDIA.coldBrew },
      { name: "Pour Over", description: "A rotating micro-lot, brewed by hand at the bar.", price: "6.5", image: MEDIA.pourOver },
    ],
  },
  {
    name: "Desserts",
    note: "Made each morning. Until they’re gone.",
    items: [
      { name: "Tiramisu", description: "Mascarpone, espresso-soaked savoiardi, a dark veil of cocoa.", price: "8.5", image: MEDIA.tiramisu },
      { name: "Chocolate Tart", description: "70% ganache, brown-butter crust, a few flakes of salt.", price: "8", image: MEDIA.chocolateTart },
      { name: "Sourdough Croissant", description: "Laminated over three days with cultured butter.", price: "4.9", image: MEDIA.croissant },
    ],
  },
];
