// ── FALLBACK DATA (shown when Supabase is not configured) ────
const FALLBACK_GALLERY = {
  cake: [
    {
      id: "c1",
      title: "Chocolate Truffle Cake",
      caption: "Rich dark chocolate with ganache drip",
      image_url:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=480&q=80",
    },
    {
      id: "c2",
      title: "Vanilla Berry Cake",
      caption: "Light sponge with fresh berries",
      image_url:
        "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=480&q=80",
    },
    {
      id: "c3",
      title: "Red Velvet Cake",
      caption: "Classic red velvet with cream cheese frosting",
      image_url:
        "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=480&q=80",
    },
    {
      id: "c4",
      title: "Mango Cream Cake",
      caption: "Seasonal Alphonso mango delight",
      image_url:
        "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=480&q=80",
    },
    {
      id: "c5",
      title: "Lemon Drizzle Cake",
      caption: "Zesty lemon with a sweet glaze",
      image_url:
        "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=480&q=80",
    },
  ],
  brownie: [
    {
      id: "b1",
      title: "Classic Fudge Brownie",
      caption: "Dense, gooey chocolate squares",
      image_url:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=480&q=80",
    },
    {
      id: "b2",
      title: "Walnut Brownie",
      caption: "Crunchy walnuts in every bite",
      image_url:
        "https://images.unsplash.com/photo-1600454301215-c3cdf25e79c5?w=480&q=80",
    },
    {
      id: "b3",
      title: "Nutella Swirl Brownie",
      caption: "Swirled Nutella on fudgy base",
      image_url:
        "https://images.unsplash.com/photo-1589375165882-ae3e90af7b3b?w=480&q=80",
    },
    {
      id: "b4",
      title: "Cream Cheese Brownie",
      caption: "Tangy cream cheese marble",
      image_url:
        "https://images.unsplash.com/photo-1541080923-7d3da8f88a50?w=480&q=80",
    },
  ],
  cookie: [
    {
      id: "ck1",
      title: "Choco Chip Cookie",
      caption: "Buttery crisp with premium chocolate chips",
      image_url:
        "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=480&q=80",
    },
    {
      id: "ck2",
      title: "Oreo Stuffed Cookie",
      caption: "Whole Oreo baked inside a cookie",
      image_url:
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=480&q=80",
    },
    {
      id: "ck3",
      title: "Peanut Butter Cookie",
      caption: "Crumbly, salty-sweet classic",
      image_url:
        "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=480&q=80",
    },
    {
      id: "ck4",
      title: "Red Velvet Cookie",
      caption: "Chewy red velvet with white choco chips",
      image_url:
        "https://images.unsplash.com/photo-1596550349793-e78d3375e7c8?w=480&q=80",
    },
  ],
};

const FALLBACK_MENU = {
  cake: [
    { name: "Chocolate Truffle Cake (500g)", price: 599 },
    { name: "Red Velvet Cake (500g)", price: 649 },
    { name: "Mango Cream Cake (500g)", price: 699 },
    { name: "Vanilla Berry Cake (500g)", price: 579 },
    { name: "Lemon Drizzle Cake (500g)", price: 549 },
    { name: "Custom Theme Cake (1 kg)", price: 1299 },
  ],
  brownie: [
    { name: "Classic Fudge Brownie (6 pcs)", price: 249 },
    { name: "Walnut Brownie (6 pcs)", price: 279 },
    { name: "Nutella Swirl Brownie (6 pcs)", price: 299 },
    { name: "Cream Cheese Brownie (6 pcs)", price: 299 },
    { name: "Assorted Brownie Box (12 pcs)", price: 499 },
  ],
  cookie: [
    { name: "Choco Chip Cookie (6 pcs)", price: 199 },
    { name: "Oreo Stuffed Cookie (4 pcs)", price: 229 },
    { name: "Peanut Butter Cookie (6 pcs)", price: 199 },
    { name: "Red Velvet Cookie (6 pcs)", price: 219 },
    { name: "Assorted Cookie Box (12 pcs)", price: 399 },
  ],
};
