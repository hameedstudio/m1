/* ============================================================
   HAMEED STUDIO — Product data
   ------------------------------------------------------------
   HOW TO ADD / EDIT A PRODUCT
   Each product is one object in the PRODUCTS array below.

   - images: gallery photos. Keep them 16:9 (e.g. 800x450) so they
     line up with the CSS aspect-ratio boxes. Just replace the src
     with your own photo URL / local path.
   - options.color: ONLY add this if the product needs a colour /
     design picker. Each entry can show either a real "img"
     (a photo swatch) or a plain "hex" (a colour dot). Colour swatches
     here are COSMETIC ONLY — picking a colour never changes the price
     unless a product explicitly says otherwise.
   - options.size: ONLY add this if the product needs a size picker.
     Two formats are supported:
       1) Plain strings, e.g. ["Small", "Large"] → cosmetic only,
          price does NOT change with the size picked.
       2) Objects with a price, e.g. { name:"4x6 in", price:400 } →
          picking this size DOES change the price. Use getProductPrice()
          below to read the correct price for whatever the shopper picked.
   - options.size can also carry nested "pages" pricing (used for
     albums): { name:"4x6 in", pages:[ {label:"100 Pages", price:500}, ... ] }
     → price depends on BOTH the size and the pages picked.
   - Leave out the whole "options" key (or the one you don't need)
     and the product page will automatically hide that picker.
   ============================================================ */

/* Shared colour swatch list — used by every product below whose
   colour choice is COSMETIC ONLY (same price for every colour).
   Edit this one list to change the colours offered everywhere. */
const COLOR_OPTIONS = [
  { name: "Red", hex: "#d64545" },
  { name: "Green", hex: "#2f855a" },
  { name: "Blue", hex: "#2b6cb0" },
  { name: "Yellow", hex: "#e8b930" },
  { name: "Golden", hex: "#b9873c" },
  { name: "Dark Green", hex: "#145a32" },
  { name: "Navy", hex: "#1b2a4a" },
  { name: "Black", hex: "#1a1a1a" },
  { name: "Grey", hex: "#9aa0ac" },
  { name: "White", hex: "#ffffff" },
  { name: "Pink", hex: "#e88fb0" },
  { name: "Purple", hex: "#6b46c1" },
  { name: "Orange", hex: "#dd6b20" }
];

const PRODUCTS = [

  /* ------------------------- Mugs ------------------------- */
  {
    id: "imported-white-mug",
    name: "Imported White Mug",
    price: 999,
    category: "Mugs",
    desc: "A premium white photo mug with crisp print quality and a glossy finish.",
    specs: ["11oz ceramic", "Dishwasher safe", "Personalized design"],
    rating: 4.6,
    reviews: 24,
    images: [
      { src: "./images/wmug2.webp", label: "Imported White Mug" },
      { src: "./images/wmug1.webp", label: "Imported White Mug" }
    ]
  },
  {
    id: "pakistani-white-mug",
    name: "Pakistani White Mug",
    price: 599,
    category: "Mugs",
    desc: "A classic white mug with patriotic design options and vibrant photo printing.",
    specs: ["11oz ceramic", "Microwave safe", "Custom photo print"],
    rating: 4.4,
    reviews: 18,
    images: [
      { src: "./images/wmug1.webp", label: "Pakistani White Mug" },
      { src: "./images/wmug2.webp", label: "Pakistani White Mug" }
    ]
  },
  {
    id: "colour-mug",
    name: "Colour Mug",
    price: 899,
    category: "Mugs",
    desc: "A colourful mug with bright customizable prints and multiple hue options.",
    specs: ["11oz ceramic", "Vibrant colours", "Personalized design"],
    rating: 4.7,
    reviews: 32,
    options: { color: COLOR_OPTIONS },
    images: [
      { src: "./images/cmug2.webp", label: "Colour Mug" },
      { src: "./images/cmug1.webp", label: "Colour Mug" }
    ]
  },
  {
    id: "heart-mug",
    name: "Heart Mug",
    price: 950,
    category: "Mugs",
    desc: "A romantic heart-shaped design printed on a mug, perfect for special gifts.",
    specs: ["11oz ceramic", "Glossy finish", "Ideal for couples"],
    rating: 4.8,
    reviews: 28,
    options: { color: COLOR_OPTIONS },
    images: [
      { src: "./images/hmug1.webp", label: "Heart Mug" },
      { src: "./images/hmug2.webp", label: "Heart Mug" }
    ]
  },
  {
    id: "patch-mug",
    name: "Patch Mug",
    price: 999,
    category: "Mugs",
    desc: "A creative patch-style mug made for memorable portrait and graphic prints.",
    specs: ["11oz ceramic", "Photo quality print", "Personalised gift"],
    rating: 4.5,
    reviews: 20,
    options: { color: COLOR_OPTIONS },
    images: [
      { src: "./images/ppp1.webp", label: "Patch Mug" },
      { src: "./images/ppp2.webp", label: "Patch Mug" }
    ]
  },
  {
    id: "magic-mug",
    name: "Magic Mug",
    price: 999,
    category: "Mugs",
    desc: "A heat-sensitive magic mug that reveals your photo when hot liquid is poured.",
    specs: ["11oz ceramic", "Heat activated", "Surprise reveal"],
    rating: 4.9,
    reviews: 34,
    images: [
      { src: "./images/mmug1.webp", label: "Magic Mug" },
      { src: "./images/mmug2.webp", label: "Magic Mug" }
    ]
  },

  /* ------------------------ Cushions ----------------------- */
  {
    id: "cushion",
    name: " Square Cushion",
    price: 999,
    category: "Cushion",
    desc: "A soft photo cushion for cozy decor and personalized gifting.",
    specs: ["Velvet cover", "Premium print", "Comfortable padding"],
    rating: 4.6,
    reviews: 22,
    options: { color: COLOR_OPTIONS },
    images: [
      { src: "./images/scush1.webp", label: "Cushion" },
      { src: "./images/scush2.webp", label: "Cushion" }
    ]
  },
  {
    id: "heart-cushion",
    name: "Heart Cushion",
    price: 999,
    category: "Cushion",
    desc: "A heart-themed cushion with custom prints, ideal for loved ones.",
    specs: ["Velvet cover", "Soft filling", "Personalized print"],
    rating: 4.7,
    reviews: 26,
    options: { color: COLOR_OPTIONS },
    images: [
      { src: "./images/hcush1.webp", label: "Heart Cushion" },
      { src: "./images/hcush2.webp", label: "Heart Cushion" }
    ]
  },
  {
    id: "magic-cushion",
    name: "Magic Cushion",
    price: 1250,
    category: "Cushion",
    desc: "A photo cushion with a premium print finish for special occasions.",
    specs: ["Velvet cover", "Soft padding", "Gift ready"],
    rating: 4.8,
    reviews: 30,
    options: { color: COLOR_OPTIONS },
    images: [
      { src: "./images/mcush1.webp", label: "Magic Cushion" },
      { src: "./images/mcush2.webp", label: "Magic Cushion" }
    ]
  },

  /* ------------------------- Frames ------------------------- */
  {
    id: "photo-frame",
    name: "Photo Frame",
    price: 499,
    category: "Frames",
    desc: "A stylish frame for your favourite photo, available in multiple sizes.",
    specs: ["Solid wood frame", "Glass front", "Multiple sizes"],
    rating: 4.5,
    reviews: 14,
    options: {
      size: [
        { name: "4x6 in", price: 400 },
        { name: "5x7 in", price: 500 },
        { name: "6x8 in", price: 600 },
        { name: "8x10 in", price: 700 },
        { name: "8x12 in", price: 800 },
        { name: "12x18 in", price: 1000 },
        { name: "20x24 in", price: 2500 }
      ]
    },
    images: [
      { src: "./images/fr2.webp", label: "Frame" },
      { src: "./images/fr1.webp", label: "Frame" }
    ]
  },
  {
    id: "magic-mirror-frame",
    name: "Magic Mirror Frame",
    price: 1500,
    category: "Frames",
    desc: "A mirror frame with a standout design, perfect for gifts and decor.",
    specs: ["Glass mirror", "Decorative frame", "Ready to display"],
    rating: 4.6,
    reviews: 17,
    images: [
      { src: "./images/mm1.webp", label: "Magic Mirror Frame" },
      { src: "./images/mm2.webp", label: "Magic Mirror Frame" }
    ]
  },
  {
    id: "led-frame",
    name: "LED Frame",
    price: 2200,
    category: "Frames",
    desc: "A modern LED-lit frame for brightening your photo display.",
    specs: ["LED illumination", "USB powered", "Premium finish"],
    rating: 4.4,
    reviews: 15,
    images: [
      { src: "./images/mf2.webp", label: "LED Frame" },
      { src: "./images/mf1.webp", label: "LED Frame" }
    ]
  }, {
    id: "heart-frame",
    name: "Heart Frame",
    price: 900,
    category: "Frames",
    desc: "A heart-shaped frame for portraits or personal artwork.",
    specs: ["Durable frame", "Easy wall mount", "Stylish finish"],
    rating: 4.5,
    reviews: 19,
    images: [
      { src: "./images/hrf1.webp", label: "Hanging Frame" },
      { src: "./images/hrf2.webp", label: "Hanging Frame" }
    ]
  },
  {
    id: "hanging-frame",
    name: "Hanging Frame",
    price: 1800,
    category: "Frames",
    desc: "A hanging frame for portraits or personal artwork.",
    specs: ["Durable frame", "Easy wall mount", "Stylish finish"],
    rating: 4.5,
    reviews: 19,
    images: [
      { src: "./images/hf1.webp", label: "Hanging Frame" },
      { src: "./images/hf2.webp", label: "Hanging Frame" }
    ]
  },
  {
    id: "couple-frame",
    name: "Couple Frame",
    price: 1999,
    category: "Frames",
    desc: "A romantic couple-themed frame for memorable gifting moments.",
    specs: ["Glass front", "Premium border", "Gift ready"],
    rating: 4.7,
    reviews: 23,
    images: [
      { src: "./images/cpf1.webp", label: "LED Frame" },
      { src: "./images/cpf2.webp", label: "LED Frame" }
    ]
  },

  /* ------------------------- Shirts ------------------------- */
  {
    id: "white-shirt",
    name: "White Shirt",
    price: 500,
    category: "Shirts",
    desc: "A crisp white custom shirt printed with your favourite photo or artwork.",
    specs: ["Soft cotton", "Photo print", "Comfort fit"],
    rating: 4.3,
    reviews: 12,
    options: {
    
      size: [
        { name: "Small", price: 500 },
        { name: "Medium", price: 650 },
        { name: "Large", price: 750 },
        { name: "XL", price: 850 }
      ]
    },
    images: [
      { src: "./images/ws1.webp", label: "White Shirt" },
      { src: "./images/w2.webp", label: "White Shirt" }
    ]
  },
  {
    id: "colour-shirt",
    name: "Colour Shirt",
    price: 499,
    category: "Shirts",
    desc: "A colourful shirt available in custom prints and designs.",
    specs: ["Soft cotton", "Bright prints", "Customized design", "Printing Only","Shirt Not Included"],
    rating: 4.5,
    reviews: 14,
options: {
      color: COLOR_OPTIONS,
     
    },
        images: [
      { src: "./images/cshirt1.webp", label: "Colour Shirt" },
      { src: "./images/cshirt2.webp", label: "Colour Shirt" }
    ]
  },
  {
    id: "sports-shirt",
    name: "Sports Shirt",
    price: 499,
    category: "Shirts",
    desc: "A sport-style shirt with photo branding and comfortable stretch fabric.",
    specs: ["Activewear fabric","Printing Only","Shirt Not Included", "Performance fit"],
    rating: 4.5,
    reviews: 16,
    options: { color: COLOR_OPTIONS },
    images: [
      { src: "./images/sshirt1.webp", label: "Sports Shirt" },
      { src: "./images/sshirt2.webp", label: "Sports Shirt" }
    ]
  },

  /* ------------------------- Albums ------------------------- */
  {
    id: "digital-album",
    name: "Digital Album",
    price: 9999,
    category: "Albums",
    desc: "A ready-to-share digital photo album for special events.",
    specs: ["High-resolution PDF", "Custom layout", "Fast delivery", "120 Photos", "22 Pages"],
    rating: 4.8,
    reviews: 211,
    images: [
      { src: "./images/aa11.webp", label: "Photo Album" },
      { src: "./images/aa2.webp", label: "Photo Album" }
     
    ]
  },
  {
    id: "photo-album",
    name: "Photo Album",
    price: 500,
    category: "Albums",
    desc: "A printed photo album with page-count pricing and premium paper.",
    specs: ["Hardcover", "Premium paper", "Custom page count"],
    rating: 4.8,
    reviews: 29,
    options: {
      size: [
        { name: "4x6 in", pages: [
            { label: "100 Pages", price: 500 },
            { label: "150 Pages", price: 800 },
            { label: "200 Pages", price: 1000 }
          ]
        },
        { name: "5x7 in", pages: [
            { label: "100 Pages", price: 750 },
            { label: "150 Pages", price: 1000 },
            { label: "200 Pages", price: 1500 }
          ]
        }
      ]
    },
    images: [
       { src: "./images/a1.webp", label: "Digital Album" },
      { src: "./images/a2.webp", label: "Digital Album" }
    ]
  },

  /* --------------- Lunch boxes & water bottles --------------- */
  {
    id: "lunch-box",
    name: "Lunch Box",
    price: 950,
    category: "Lunch boxes and waterbottles",
    desc: "A personalized lunch box with a custom image print.",
    specs: ["Durable plastic", "Leak resistant", "Photo print"],
    rating: 4.6,
    reviews: 11,
    options: { color: COLOR_OPTIONS },
    images: [
      { src: "./images/lb2.webp", label: "Lunch Box" },
      { src: "./images/lb1.webp", label: "Lunch Box" }
    ]
  },
  {
    id: "water-bottle",
    name: "Water Bottle",
    price: 1250,
    category: "Lunch boxes and waterbottles",
    desc: "A personalized water bottle with a crisp image finish.",
    specs: ["Stainless steel", "Leak proof", "Photo print"],
    rating: 4.5,
    reviews: 12,
    images: [
      { src: "./images/wb2.webp", label: "Water Bottle" },
      { src: "./images/wb1.webp", label: "Water Bottle" }
    ]
  },
  {
    id: "temp-water-bottle",
    name: "Temp Water Bottle",
    price: 1500,
    category: "Lunch boxes and waterbottles",
    desc: "An insulated bottle with photo-print personalization.",
    specs: ["Insulated design", "Keeps drinks cool", "Custom print"],
    rating: 4.4,
    reviews: 10,
    options: { color: COLOR_OPTIONS },
    images: [
      { src: "./images/twb1.webp", label: "Temp Water Bottle" },
      { src: "./images/twb2.webp", label: "Temp Water Bottle" }
    ]
  },

  /* -------------------------- Wallets ------------------------- */
  {
    id: "wallet",
    name: "Wallet",
    price: 950,
    category: "Wallets",
    desc: "A sleek wallet with room for cards and a custom photo panel.",
    specs: ["Leather finish", "Compact design", "Photo panel"],
    rating: 4.7,
    reviews: 26,
    images: [
      { src: "./images/w11.webp", label: "Wallet" },
      { src: "./images/w22.webp", label: "Wallet" }
    ]
  },

  /* ---------------------- Jewellery items ---------------------- */
  {
    id: "chain",
    name: "Chain",
    price: 499,
    category: "Jewellery items",
    desc: "A gift chain that can be paired with personalized pendants.",
    specs: ["Quality chain", "Gift ready", "Elegant finish"],
    rating: 4.4,
    reviews: 13,
    images: [
      { src: "./images/ch1.webp", label: "Chain" },
      { src: "./images/ch2.webp", label: "Chain" }
    ]
  },
  {
    id: "ring",
    name: "Ring",
    price: 199,
    category: "Jewellery items",
    desc: "A premium ring with a custom engraving-ready finish.",
    specs: ["Classic design", "Quality metal", "Gift ready"],
    rating: 4.5,
    reviews: 14,
    images: [
      { src: "./images/r2.webp", label: "Ring" },
      { src: "./images/r1.webp", label: "Ring" }
    ]
  },

  /* ---------------------------- Pens ---------------------------- */
  {
    id: "pen",
    name: "Pen",
    price: 299,
    category: "Pens",
    desc: "A custom-printed pen for a practical and personal gift.",
    specs: ["Smooth ink", "Personalized print", "Gift ready"],
    rating: 4.3,
    reviews: 9,
    images: [
      { src: "./images/p1.webp", label: "Pen" },
      { src: "./images/p2.webp", label: "Pen" }
    ]
  },
  {
    id: "glowing-pen",
    name: "Glowing Pen",
    price: 499,
    category: "Pens",
    desc: "A glowing pen with a personalized print finish.",
    specs: ["LED tip", "Custom design", "Light-up body"],
    rating: 4.5,
    reviews: 11,
    images: [
      { src: "./images/gp1.webp", label: "Glowing Pen" },
      { src: "./images/gp2.webp", label: "Glowing Pen" }
    ]
  },

  /* -------------------------- Key rings -------------------------- */
  {
    id: "leather-key-ring",
    name: "Leather Key Ring",
    price: 299,
    category: "Key ring",
    desc: "A leather key ring with a custom printed photo panel.",
    specs: ["Leather finish", "Compact size", "Personalized print"],
    rating: 4.4,
    reviews: 8,
    images: [
      { src: "./images/k1.webp", label: "Leather Key Ring" },
      { src: "./images/k2.webp", label: "Leather Key Ring" }
    ]
  },
  {
    id: "metal-keyring",
    name: "Metal Keyring",
    price: 499,
    category: "Key ring",
    desc: "A metal keyring with an engraved or printed custom image.",
    specs: ["Metal finish", "Personalized print", "Gift ready"],
    rating: 4.5,
    reviews: 10,
    images: [
      { src: "./images/mk1.webp", label: "Metal Keyring" },
      { src: "./images/mk2.webp", label: "Metal Keyring" }
    ]
  },

  /* --------------------------- Badge --------------------------- */
  {
    id: "badge",
    name: "Badge",
    price: 199,
    category: "Badge",
    desc: "A photo badge perfect for events, gifts, and personalized keepsakes.",
    specs: ["Lightweight", "Printed finish", "Custom design"],
    rating: 4.2,
    reviews: 7,
    images: [
      { src: "./images/b1.webp", label: "Badge" },
      { src: "./images/b2.webp", label: "Badge" }
    ]
  },

  /* ------------------------ Mobile cover ------------------------ */
  {
    id: "mobile-cover",
    name: "Mobile Cover",
    price: 499,
    category: "Mobile cover",
    desc: "A custom mobile cover with your photo printed in high quality.",
    specs: ["Hard shell", "Vivid print", "Perfect fit"],
    rating: 4.5,
    reviews: 15,
    images: [
      { src: "./images/mcover2.webp", label: "Mobile Cover" },
      { src: "./images/mc1.webp", label: "Mobile Cover" }
    ]
  },

  /* --------------------------- Deals --------------------------- */
  {
    id: "deal-14-august-shirt",
    name: "14 August Deal Shirt",
    price: 599,
    oldPrice: 700,
    category: "Deals",
    badge: "Deal",
    desc: "Special 14 August offer on a customised photo shirt.",
    specs: ["Printed shirt", "Special discount", "Limited stock"],
    rating: 4.6,
    reviews: 40,
    images: [
      { src: "./images/m1m12.webp", label: "14 August Shirt" },
      { src: "./images/m1m1.webp", label: "14 August Shirt" }
    ]
  },
  {
    id: "deal-14-august-badge",
    name: "14 August Deal Badge ",
    price: 199 ,
    oldPrice: 299,
    category: "Deals",
    badge: "Deal",
    desc: "A commemorative badge specially priced for 14 August.",
    specs: ["Custom badge", "Discounted price", "Event special"],
    rating: 4.3,
    reviews: 22,
    images: [
      { src: "./images/m1m2.webp", label: "14 August Badge" },
      { src: "./images/m1m22.webp", label: "14 August Badge" }
    ]
  },
  {
    id: "deal-14-august-mug",
    name: "14 August Deal Mug",
    price: 599,
    oldPrice: 1000,
    category: "Deals",
    badge: "Deal",
    desc: "A festive 14 August magic mug offer featuring patriotic prints.",
    specs: ["Heat sensitive", "Special price", "Photographic print"],
    rating: 4.7,
    reviews: 28,
    images: [
      { src: "./images/m1m3.webp", label: "14 August Mug" },
      { src: "./images/m1m32.webp", label: "14 August Mug" }
    ]
  },
  {
    id: "deal-magic-cushion",
    name: "Wallet + Keyring",
    price: 1199,
    oldPrice: 1500,
    category: "Deals",
    badge: "Deal",
    desc: "A Sleek Leather wallet with a Sleeker Leather Key ring.",
    specs: ["Soft leather", "Special Quality", "Custom print"],
    rating: 4.8,
    reviews: 36,
    images: [
      { src: "./images/w2.webp", label: "Magic Cushion" },
      { src: "./images/w1.webp", label: "Magic Cushion" }
    ]
  }
];

/* Helper: find a product by id */
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

/* ------------------------------------------------------------
   Helper: getProductPrice(product, selected)
   Works out the correct price for whatever the shopper has picked
   on the product page. `selected` looks like:
     { size: "5x7 in" }                              — Frame / Shirt
     { size: "4x6 in", pages: "150 Pages" }           — Album
   For products with no price-affecting options it just returns
   product.price, so it's always safe to call.
   ------------------------------------------------------------ */
function getProductPrice(product, selected = {}) {
  if (!product.options || !Array.isArray(product.options.size)) {
    return product.price;
  }
  const first = product.options.size[0];
  if (typeof first !== "object") {
    // Plain string sizes (cosmetic only) → price never changes
    return product.price;
  }

  const sizeEntry = product.options.size.find(s => s.name === selected.size) || first;

  if (Array.isArray(sizeEntry.pages)) {
    const firstPage = sizeEntry.pages[0];
    const pageEntry = sizeEntry.pages.find(p => p.label === selected.pages) || firstPage;
    return pageEntry.price;
  }

  return sizeEntry.price;
}