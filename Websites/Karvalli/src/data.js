// =============================================================================
//  RESTAURANT DATA — Edit this file to update content without
//  touching any layout or component code.
// =============================================================================

export const RESTAURANT = {
  name:        'Karavali Fine Dine',
  tagline:     "Coastal Karnataka's Finest \u2014 Where Every Dish Tells an Ocean Story",
  address:     '14 First Floor, SOMS - MEDHU, Hosur Main Road, above Mahindra Car Showroom, next to Christ Universe College, Koramangala, Bengaluru 560030',
  phone:       '+91 63639 98516',
  phoneRaw:    '916363998516',
  rating:      4.4,
  reviewCount: 1910,
  priceRange:  '\u20B9200 \u2013 \u20B9600 for two',
  hours: [
    { day: 'Monday',    open: '11:30 AM', close: '1:30 AM' },
    { day: 'Tuesday',   open: '11:30 AM', close: '1:30 AM' },
    { day: 'Wednesday', open: '11:30 AM', close: '1:30 AM' },
    { day: 'Thursday',  open: '11:30 AM', close: '1:30 AM' },
    { day: 'Friday',    open: '11:30 AM', close: '1:30 AM' },
    { day: 'Saturday',  open: '11:30 AM', close: '1:30 AM' },
    { day: 'Sunday',    open: '11:30 AM', close: '1:30 AM' },
  ],
  swiggUrl: 'https://www.swiggy.com/restaurants/karavali-fine-dine-koramangala-bangalore-766609/dineout',
  waMessage: encodeURIComponent("Hi, I'd like to enquire about a table at Karavali Fine Dine"),
  waBookingMessage: encodeURIComponent("Hi, I'd like to book a table at Karavali Fine Dine Restaurant, Koramangala. Please let me know availability."),
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.6219!3d12.9197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15b1cf3d5a3d%3A0x1!2sKaravali+Fine+Dine+Restaurant!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin',
  googleMapsUrl: 'https://maps.google.com/?q=Karavali+Fine+Dine+Restaurant+Koramangala+Bengaluru',
  instagram: 'https://instagram.com',
  facebook:  'https://facebook.com',
  twitter:   'https://twitter.com',
};

// =============================================================================
// MENU
// =============================================================================
export const MENU_CATEGORIES = ['Starters', 'Seafood', 'Mains', 'Biryani', 'Desserts'];

export const MENU_ITEMS = [
  // ---------- STARTERS ----------
  {
    category: 'Starters',
    name: 'Mangalorean Fish Fry',
    desc: 'Seer fish marinated in a house blend of Byadagi chillies and coastal spices, shallow-fried to a golden crust.',
    price: '\u20B9280',
    veg: false,
    bestseller: true,
  },
  {
    category: 'Starters',
    name: 'Prawn Koliwada',
    desc: 'Tiger prawns in a crispy gram-flour batter with ajwain and chilli, served with coriander chutney.',
    price: '\u20B9320',
    veg: false,
    bestseller: false,
  },
  {
    category: 'Starters',
    name: 'Kori Sukka',
    desc: 'Dry-roasted chicken with freshly grated coconut, fried red chillies, and aromatic curry leaves.',
    price: '\u20B9260',
    veg: false,
    bestseller: true,
  },
  {
    category: 'Starters',
    name: 'Veg Cutlet (Coastal)',
    desc: 'Crispy patties of mashed potato, sweet corn, and coastal spices, pan-fried until golden.',
    price: '\u20B9160',
    veg: true,
    bestseller: false,
  },
  {
    category: 'Starters',
    name: 'Calamari Tawa',
    desc: 'Tender squid rings tawa-roasted with green masala and a squeeze of sea-salt lime.',
    price: '\u20B9350',
    veg: false,
    bestseller: false,
  },

  // ---------- SEAFOOD ----------
  {
    category: 'Seafood',
    name: 'Karavali Prawn Curry',
    desc: 'Plump tiger prawns simmered in a slow-cooked coconut milk gravy with tamarind and Byadagi chillies.',
    price: '\u20B9480',
    veg: false,
    bestseller: true,
  },
  {
    category: 'Seafood',
    name: 'Neer Dosa Combo with Fish Curry',
    desc: 'Lace-thin coconut neer dosas paired with tangy kane (lady fish) curry \u2014 a coastal breakfast-to-dinner staple.',
    price: '\u20B9290',
    veg: false,
    bestseller: true,
  },
  {
    category: 'Seafood',
    name: 'Crab Masala',
    desc: 'Whole mud crab slow-cooked in an aromatic red masala of coriander, cumin, and kokum.',
    price: '\u20B9580',
    veg: false,
    bestseller: false,
  },
  {
    category: 'Seafood',
    name: 'Surmai (King Fish) Curry',
    desc: 'Thick, mellow king-fish gravy balanced with turmeric, raw mango, and rich coconut cream.',
    price: '\u20B9420',
    veg: false,
    bestseller: false,
  },
  {
    category: 'Seafood',
    name: 'Lobster Tawa Fry',
    desc: 'Whole lobster marinated overnight in a spiced butter mix, tawa-finished for smoky caramelised edges.',
    price: '\u20B9700',
    veg: false,
    bestseller: false,
  },

  // ---------- MAINS ----------
  {
    category: 'Mains',
    name: 'Kori Rotti (Chicken Curry)',
    desc: 'Classic Tulu-Nadu chicken curry with crispy rice crisps (rotti) \u2014 the definitive coastal meal.',
    price: '\u20B9340',
    veg: false,
    bestseller: true,
  },
  {
    category: 'Mains',
    name: 'Mangalorean Ghee Roast Chicken',
    desc: 'Bone-in chicken cooked in a roasted-spice ghee masala \u2014 rich, fiery, and unmistakably Mangalorean.',
    price: '\u20B9380',
    veg: false,
    bestseller: true,
  },
  {
    category: 'Mains',
    name: 'Jackfruit (Kadala) Curry',
    desc: 'Young jackfruit and chickpea in a bold black-pepper coconut gravy. The vegetarian showstopper.',
    price: '\u20B9220',
    veg: true,
    bestseller: false,
  },
  {
    category: 'Mains',
    name: 'Boshi Meal',
    desc: 'A curated thali of fish curry, chicken sukka, dal, seasonal vegetables, pickles, papad, and red rice.',
    price: '\u20B9390',
    veg: false,
    bestseller: false,
  },
  {
    category: 'Mains',
    name: 'Appam with Stew',
    desc: 'Soft-lacey fermented rice appams served alongside a mild coconut and vegetable stew.',
    price: '\u20B9200',
    veg: true,
    bestseller: false,
  },

  // ---------- BIRYANI ----------
  {
    category: 'Biryani',
    name: 'Coastal Prawn Biryani',
    desc: 'Fragrant Jeerakasala rice layered with marinated tiger prawns and rose-water-infused dum gravy.',
    price: '\u20B9420',
    veg: false,
    bestseller: true,
  },
  {
    category: 'Biryani',
    name: 'Karavali Chicken Biryani',
    desc: 'Dum-cooked biryani with free-range chicken, caramelised onions, and a house spice blend.',
    price: '\u20B9320',
    veg: false,
    bestseller: true,
  },
  {
    category: 'Biryani',
    name: 'Crab Biryani',
    desc: 'Luxurious dum biryani packed with fresh mud crab masala \u2014 a weekend special worth planning for.',
    price: '\u20B9560',
    veg: false,
    bestseller: false,
  },
  {
    category: 'Biryani',
    name: 'Veg Dum Biryani',
    desc: 'Seasonal vegetables and cashews dum-cooked in aromatic basmati with saffron and caramelised onions.',
    price: '\u20B9240',
    veg: true,
    bestseller: false,
  },

  // ---------- DESSERTS ----------
  {
    category: 'Desserts',
    name: 'Gadbad Ice Cream',
    desc: "Mangalore's legendary layered sundae with mixed fruit jelly, tutti-frutti, two ice cream scoops, and nuts.",
    price: '\u20B9180',
    veg: true,
    bestseller: true,
  },
  {
    category: 'Desserts',
    name: 'Vermicelli Kheer',
    desc: 'Slow-simmered semiya payasam with cardamom, saffron, cashews, and raisins \u2014 pure coastal comfort.',
    price: '\u20B9120',
    veg: true,
    bestseller: false,
  },
  {
    category: 'Desserts',
    name: 'Coconut Halwa',
    desc: 'Hand-pulled fresh coconut halwa cooked in ghee \u2014 golden, chewy, and perfumed with cardamom.',
    price: '\u20B9130',
    veg: true,
    bestseller: false,
  },
];

// =============================================================================
// REVIEWS
// =============================================================================
export const REVIEWS = [
  {
    name: 'Rohan M.',
    rating: 5,
    date: 'August 2025',
    text: 'The prawn biryani was absolutely outstanding \u2014 perfectly spiced, fragrant, and generous portions. The ambience felt like a proper fine-dine experience without burning a hole in the wallet.',
    avatar: 'R',
  },
  {
    name: 'Priya S.',
    rating: 5,
    date: 'July 2025',
    text: 'Kori Rotti is a must-order. The chicken curry had that authentic Tulu-Nadu depth of flavour. Service was warm and attentive. Will definitely be back with family.',
    avatar: 'P',
  },
  {
    name: 'Aditya K.',
    rating: 4,
    date: 'June 2025',
    text: 'Crab masala was incredibly fresh and well-cooked. The ghee roast chicken is restaurant-level quality. Cosy interiors and a late closing time make it perfect for a work dinner.',
    avatar: 'A',
  },
  {
    name: 'Nisha R.',
    rating: 5,
    date: 'May 2025',
    text: 'Came for the fish curry combo and stayed for the Gadbad ice cream. Authentically Mangalorean food \u2014 you can tell the recipes have not been watered down for a city crowd.',
    avatar: 'N',
  },
  {
    name: 'Vikram T.',
    rating: 4,
    date: 'April 2025',
    text: 'Great variety \u2014 the menu covers everything from light starters to full meals. The surmai curry was silky and balanced. Parking can be tricky on weekends, plan ahead.',
    avatar: 'V',
  },
  {
    name: 'Sneha D.',
    rating: 5,
    date: 'March 2025',
    text: "Best coastal food in Koramangala, hands down. The neer dosa is gossamer thin and the fish curry has that perfect tang. Discovered this gem through a friend and now it's our go-to.",
    avatar: 'S',
  },
];

// =============================================================================
// GALLERY
// =============================================================================
export const GALLERY = [
  { src: '/seafood.png',  alt: 'Mangalorean seafood platter \u2014 fish curry and prawn masala',   span: 'col-span-2 row-span-2' },
  { src: '/interior.png', alt: 'Karavali Fine Dine restaurant dining room interior',                span: '' },
  { src: '/prawn.png',    alt: 'Tiger prawn curry in traditional copper bowl',                      span: '' },
  { src: '/biryani.png',  alt: 'Coastal Karnataka fish biryani in handi pot',                      span: '' },
  { src: '/crab.png',     alt: 'Mud crab Mangalorean masala on slate plate',                        span: '' },
  { src: '/dessert.png',  alt: 'Gadbad ice cream sundae \u2014 Mangalorean signature dessert',     span: '' },
];
