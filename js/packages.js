/* ============================================================
   HAMEED STUDIO — Event Coverage Packages (Photography & Video)
   Edit prices / features here — packages.html renders automatically
   from this file. Keep the same shape for each package object:
     id       - unique string
     group    - which tab/section it belongs to
     title    - card heading
     duration - small line under the title (e.g. "1 Day")
     price    - number (PKR)
     features - array of bullet strings
     highlight- true to visually mark as "Most Popular" (optional)
   ============================================================ */

const PACKAGE_GROUPS = [
  { key: "all", label: "All Packages" },
  { key: "photo-1day", label: "1 Day Photography" },
  { key: "video-1day", label: "1 Day Video Shoot" },
  { key: "photo-3day", label: "3 Days Photography" },
  { key: "video-3day", label: "3 Days Video Shoot" },
  { key: "combo-3day", label: "3 Days Video & Photography" }
];

const PACKAGES = [
  /* ---------------- 1 Day Photography ---------------- */
  {
    id: "p1d-1",
    group: "photo-1day",
    title: "1 Day Photography",
    duration: "1 Day Coverage",
    price: 10000,
    features: [
      "1 Photographer",
      "Only soft copy with 50% editing"
    ]
  },
  {
    id: "p1d-2",
    group: "photo-1day",
    title: "1 Day Photography + Album",
    duration: "1 Day Coverage",
    price: 25000,
    highlight: true,
    features: [
      "1 Photographer",
      "1 Digital Album (100 family photos)",
      "22 pages (page size 12 x 18)",
      "Soft copy with 50% editing"
    ]
  },

  /* ---------------- 1 Day Video Shoot ---------------- */
  {
    id: "v1d-1",
    group: "video-1day",
    title: "1 Day Video Shoot",
    duration: "1 Day Coverage",
    price: 15000,
    features: [
      "1 Video Operator",
      "Original movie & with mixing"
    ]
  },

  /* ---------------- 3 Days 1 Event Photography ---------------- */
  {
    id: "p3d-1",
    group: "photo-3day",
    title: "3 Days Photography",
    duration: "3 Days · 1 Event",
    price: 25000,
    features: [
      "1 Photographer",
      "Only soft copy with 50% editing"
    ]
  },
  {
    id: "p3d-2",
    group: "photo-3day",
    title: "3 Days Photography + 1 Album",
    duration: "3 Days · 1 Event",
    price: 35000,
    features: [
      "1 Photographer",
      "Soft copy with 50% editing",
      "1 Digital Photo Album"
    ]
  },
  {
    id: "p3d-3",
    group: "photo-3day",
    title: "3 Days Photography + 2 Albums",
    duration: "3 Days · 1 Event",
    price: 45000,
    highlight: true,
    features: [
      "1 Photographer",
      "Soft copy with 50% editing",
      "2 Digital Photo Albums"
    ]
  },
  {
    id: "p3d-4",
    group: "photo-3day",
    title: "3 Days Photography + 4 Albums",
    duration: "3 Days · 1 Event",
    price: 65000,
    features: [
      "1 Photographer",
      "Soft copy with 50% editing",
      "4 Digital Photo Albums"
    ]
  },

  /* ---------------- 3 Days 1 Event Video Shoot ---------------- */
  {
    id: "v3d-1",
    group: "video-3day",
    title: "3 Days Video Shoot",
    duration: "3 Days · 1 Event",
    price: 35000,
    features: [
      "1 Video Operator with full frame mirrorless camera & gumball",
      "Original & mixing — complete data"
    ]
  },

  /* ---------------- 3 Days 1 Event Video & Photography ---------------- */
  {
    id: "c3d-1",
    group: "combo-3day",
    title: "Video & Photography",
    duration: "3 Days · 1 Event",
    price: 65000,
    features: [
      "1 Photographer with full frame DSLR camera",
      "1 Video Operator with full frame mirrorless camera & gumball",
      "Complete unlimited high quality images with editing — soft copy only",
      "Original & mixing — complete data"
    ]
  },
  {
    id: "c3d-2",
    group: "combo-3day",
    title: "Video & Photography + 2 Albums",
    duration: "3 Days · 1 Event",
    price: 85000,
    features: [
      "1 Photographer with full frame DSLR camera",
      "1 Video Operator with full frame mirrorless camera & gumball",
      "Complete unlimited high quality images with editing — soft copy only",
      "2 Digital Photo Albums",
      "Original & mixing — complete data"
    ]
  },
  {
    id: "c3d-3",
    group: "combo-3day",
    title: "Video & Photography + Drone (1 Day)",
    duration: "3 Days · 1 Event",
    price: 95000,
    features: [
      "1 Photographer with full frame DSLR camera",
      "1 Video Operator with full frame mirrorless camera & gumball",
      "Complete unlimited high quality images with editing — soft copy only",
      "2 Digital Photo Albums",
      "Original & mixing — complete data",
      "1 Day Drone Coverage"
    ]
  },
  {
    id: "c3d-4",
    group: "combo-3day",
    title: "Video & Photography + Drone (2 Days)",
    duration: "3 Days · 1 Event",
    price: 100000,
    features: [
      "1 Photographer with full frame DSLR camera",
      "1 Video Operator with full frame mirrorless camera & gumball",
      "Complete unlimited high quality images with editing — soft copy only",
      "2 Digital Photo Albums",
      "Original & mixing — complete data",
      "2 Day Drone Coverage"
    ]
  },
  {
    id: "c3d-5",
    group: "combo-3day",
    title: "Video & Photography + 4 Albums + Drone",
    duration: "3 Days · 1 Event",
    price: 125000,
    highlight: true,
    features: [
      "1 Photographer with full frame DSLR camera",
      "1 Video Operator with full frame mirrorless camera & gumball",
      "Complete unlimited high quality images with editing — soft copy only",
      "4 Digital Photo Albums",
      "Original & mixing — complete data",
      "2 Day Drone Coverage"
    ]
  }
];

/* Optional extra / add-on charges shown below the package cards */
const PACKAGE_ADDONS = [
  { label: "Extra day, same event — Photography", price: 8000 },
  { label: "Extra photographer, same event — Photography", price: 8000 },
  { label: "Extra Digital Photo Album", price: 18000 },
  { label: "Extra day, same event — Video Shoot", price: 10000 },
  { label: "Extra Video Operator, same event", price: 10000 },
  { label: "Drone Camera Coverage — 1 Day", price: 10000 }
];