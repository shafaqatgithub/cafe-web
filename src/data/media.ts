/**
 * Every image/video on the site is defined here.
 *
 *  • Local assets (public/assets/) come from the project's own media:
 *      - video/burger-hero.mp4      ← the original SmokeReveal burger video
 *      - video/burger-hero-poster.jpg, images/burger.jpg ← stills derived from it
 *        (cropped so the generator's ✦ watermark in the bottom-right is excluded)
 *      - pizza-sequence/pizza-001…240.jpg ← the ezgif ZIP, extracted 1:1
 *  • Food photography for the menu (pizza, burgers, coffee, desserts) does not exist yet, so those
 *    entries use Unsplash photos as PLACEHOLDERS (Unsplash License). Replace `src`
 *    with files in public/assets/images/ — local files need no extra config.
 */

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position for cropped placements (pizza frames keep the subject right of centre). */
  focus?: string;
};

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

// ── Pizza image sequence ─────────────────────────────────────────────────────
//  240 frames, 640×360, background rgb(235 231 219), no watermark.
//  001–052  finished pizza slowly rotating
//  053–125  slices and toppings lift apart into an exploded stack
//  126–150  the layers settle back together
//  151–190  the pizza glides right, onto the peel, into the stone oven
//  191–240  baking over an open wood fire
export const PIZZA_SEQUENCE = {
  frameCount: 240,
  width: 640,
  height: 360,
  /** 1-based frame number → URL. */
  src: (frame: number) => `/assets/pizza-sequence/pizza-${String(frame).padStart(3, "0")}.jpg`,
  /** Source crop that holds the action (the left 220px is empty background). */
  crop: { x: 220, y: 0, w: 420, h: 360 },
  /** Matches the frames' own background so canvas edges disappear. */
  background: "#ebe7db",
} as const;

const frame = (n: number) => PIZZA_SEQUENCE.src(n);

/** The same pizza story as the sequence, as an 8 s video (looped behind the pizza section). */
export const PIZZA_VIDEO = {
  src: "/assets/video/pizza-animation.mp4",
  poster: frame(1),
} as const;

export const HERO_VIDEO = {
  src: "/assets/video/burger-hero.mp4",
  poster: "/assets/video/burger-hero-poster.jpg",
  width: 640,
  height: 360,
  alt: "A cheeseburger on a walnut board appears as a cloud of white smoke clears.",
} as const;

export const MEDIA = {
  burger: {
    src: "/assets/images/burger.jpg",
    width: 480,
    height: 360,
    alt: "Sesame brioche cheeseburger with lettuce, tomato and melted cheddar on a walnut board.",
  },

  // ── PLACEHOLDERS (Unsplash) — replace with the café's own photography ──────
  pizza: {
    src: unsplash("1590947132387-155cc02f3212"),
    width: 1200,
    height: 800,
    alt: "Vegetable pizza with tomatoes, mushrooms and herbs on a dark wooden board, one slice pulled away.",
  },
  margherita: {
    src: unsplash("1574071318508-1cdbab80d002", 800),
    width: 800,
    height: 535,
    alt: "Neapolitan margherita with a blistered crust, melted mozzarella and fresh basil.",
  },
  diavola: {
    src: unsplash("1628840042765-356cda07504e", 800),
    width: 800,
    height: 800,
    alt: "Wood-fired pizza covered in crisp, curled slices of spicy salami.",
  },
  bianca: {
    src: unsplash("1513104890138-7c749659a591", 800),
    width: 800,
    height: 533,
    alt: "Golden white pizza cut into slices, with rosemary and cherry tomatoes beside it.",
  },
  smokeHouse: {
    src: unsplash("1586190848861-99aa4a171e90"),
    width: 1200,
    height: 1200,
    alt: "Sesame-bun cheeseburger stacked with lettuce, tomato, bacon and melted cheese on a dark background.",
  },
  emberDouble: {
    src: unsplash("1572802419224-296b0aeee0d9", 800),
    width: 800,
    height: 570,
    alt: "Double cheeseburger with two smashed patties and dripping American cheese.",
  },
  gardenBurger: {
    src: unsplash("1525059696034-4967a8e1dca2", 800),
    width: 800,
    height: 1198,
    alt: "Veggie burger with a crisp patty, avocado and fresh greens in a soft bun.",
  },
  cortado: {
    src: unsplash("1559496417-e7f25cb247f3"),
    width: 1200,
    height: 800,
    alt: "A cortado in a short glass on a white table, leaf shadows falling across it.",
  },
  espresso: {
    src: unsplash("1510591509098-f4fdc6d0ff04", 800),
    width: 800,
    height: 533,
    alt: "A single espresso with golden crema in a white cup.",
  },
  flatWhite: {
    src: unsplash("1572442388796-11668a67e53d", 800),
    width: 800,
    height: 533,
    alt: "A flat white with rosetta latte art on a saucer, from above.",
  },
  latte: {
    src: unsplash("1541167760496-1628856ab772", 800),
    width: 800,
    height: 533,
    alt: "Steamed milk being poured into a latte held in one hand.",
  },
  coldBrew: {
    src: unsplash("1461023058943-07fcbe16d735", 800),
    width: 800,
    height: 533,
    alt: "Iced cold brew with milk swirling through the glass.",
  },
  pourOver: {
    src: unsplash("1442512595331-e89e73853f31", 800),
    width: 800,
    height: 533,
    alt: "A barista pouring from a gooseneck kettle into glass pour-over brewers.",
  },
  tiramisu: {
    src: unsplash("1571877227200-a0d98ea607e9"),
    width: 1200,
    height: 800,
    alt: "A slice of tiramisu dusted with cocoa on a wooden table.",
  },
  chocolateTart: {
    src: unsplash("1606313564200-e75d5e30476c", 800),
    width: 800,
    height: 533,
    alt: "Dark chocolate cake stacked on a white plate, drizzled with ganache.",
  },
  croissant: {
    src: unsplash("1555507036-ab1f4038808a", 800),
    width: 800,
    height: 533,
    alt: "Two golden croissants dusted with flour.",
  },
} satisfies Record<string, SiteImage>;
