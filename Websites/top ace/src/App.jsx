import { useState, useEffect } from "react";
import {
  MapPin, Phone, Clock, Star, Music, Flame,
  ChevronDown, ExternalLink, Copy, Check, Menu, X,
  MessageCircle, Navigation, ArrowRight, Leaf,
  Wind, UtensilsCrossed, Users, Heart, Mic2,
  PartyPopper, Cake, Coffee, Sandwich, Soup,
  ShieldCheck, Sparkles, Armchair,
  ChefHat, CheckCircle2, Building2,
} from "lucide-react";

/* ── Inline brand SVG icons ── */
const Instagram = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const FacebookIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

/* ─── RESTAURANT DATA ─────────────────────────────────────────────────────── */
const INFO = {
  name: "Top Ace Cafe",
  nameKannada: "ಟಾಪ್ ಏಸ್",
  tagline: "Pure veg eats. Two floors of vibe.",
  rating: 4.6,
  reviewCount: 804,
  priceRange: "200–1,400 for two",
  address: "#74, 2nd & 3rd Floor, Jyoti Nivas College Road, 5th Block, Koramangala, Bengaluru, Karnataka 560095",
  phone: "+91 80882 78223",
  phoneRaw: "918088278223",
  hours: "Daily · 11:30 AM – 12:00 AM",
  swiggyUrl: "https://www.swiggy.com/restaurants/356210/dineout",
  mapsUrl: "https://maps.google.com/?q=Top+Ace+Cafe+Koramangala+Bengaluru",
  instagram: "https://instagram.com/topacecafe",
  facebook: "https://facebook.com/topacecafe",
};

const mkWA = (name, date, time, size, floor, occasion) => {
  const m = `Hi Top Ace Cafe! I would like to book a table.\n\nName: ${name}\nDate: ${date}\nTime: ${time}\nParty size: ${size}\nFloor: ${floor}\nOccasion: ${occasion}\n\nPlease confirm availability. Thank you!`;
  return `https://wa.me/${INFO.phoneRaw}?text=${encodeURIComponent(m)}`;
};
const WA_DEFAULT = `https://wa.me/${INFO.phoneRaw}?text=${encodeURIComponent("Hi, I'd like to book a table at Top Ace Cafe")}`;
const WA_EVENT   = `https://wa.me/${INFO.phoneRaw}?text=${encodeURIComponent("Hi Top Ace Cafe! I am interested in planning a special event or decoration. Can you share details and availability?")}`;

const FLOORS = [
  {
    floor: "2nd Floor", name: "The Green Lounge", color: "mint",
    vibe: "Cozy · Family-friendly · Romantic",
    icon: Leaf,
    gradient: "from-mint-dark via-mint to-mint-light",
    description: "A beautifully lit, plant-forward space perfect for families, dates, and weekend brunches. Enjoy our full vegetarian menu and signature mocktails in a calm, social atmosphere.",
    img: "/floor2.png",
    features: [
      { Icon: Leaf,        text: "100% Veg Menu" },
      { Icon: Coffee,      text: "Signature Mocktails" },
      { Icon: Sparkles,    text: "Great Ambience" },
      { Icon: Heart,       text: "Birthday & Date Decor" },
      { Icon: Users,       text: "Family Seating" },
      { Icon: Armchair,    text: "Group Tables" },
    ],
  },
  {
    floor: "3rd Floor", name: "The Vibe Bar", color: "coral",
    vibe: "Lively · Music · Nightlife",
    icon: Music,
    gradient: "from-coral-dark via-coral to-coral-light",
    description: "Where the city comes alive. Our bar floor features live music nights, a dedicated dance floor, karaoke sessions, and an electric atmosphere — all 100% vegetarian.",
    img: "/floor3.png",
    features: [
      { Icon: Music,       text: "Live Music Nights" },
      { Icon: Sparkles,    text: "Dance Floor" },
      { Icon: Mic2,        text: "Karaoke Sessions" },
      { Icon: Coffee,      text: "Bar & Mocktail Counter" },
      { Icon: Users,       text: "Group Bookings" },
      { Icon: PartyPopper, text: "Event Hosting" },
    ],
  },
];

const CELEBRATIONS = [
  { Icon: Cake,        title: "Birthday Parties",  desc: "Custom decorations, cake setups, and surprise arrangements tailored for your celebration." },
  { Icon: Heart,       title: "Date Nights",        desc: "Romantic table setups, rose petals, candles, and a cozy atmosphere for two." },
  { Icon: Users,       title: "Group Hangouts",     desc: "Large group seating with personalised menus and group booking discounts." },
  { Icon: Mic2,        title: "Karaoke Nights",    desc: "Grab the mic on our dedicated karaoke setup on the 3rd floor — every Friday & Saturday." },
  { Icon: Building2,   title: "Office Parties",    desc: "Corporate team outings with private floor bookings and customised buffet options." },
  { Icon: Sparkles,    title: "Anniversaries",     desc: "Make it unforgettable with flower arrangements and special decor on request." },
];

const MENU = [
  { id:"starters",    label:"Starters",           Icon: UtensilsCrossed, items:[
    { name:"Crispy Corn Chilli",      price:199, desc:"Tossed with peppers and spices" },
    { name:"Paneer Tikka",            price:249, desc:"Marinated cottage cheese, tandoor-grilled" },
    { name:"Mushroom 65",             price:229, desc:"Crispy spiced mushroom fry" },
    { name:"Veg Spring Rolls (6 pcs)",price:189, desc:"Crispy oriental rolls with dipping sauce" },
    { name:"Chilli Paneer (Dry)",     price:239, desc:"Indo-Chinese style, tossed in sauce" },
    { name:"Loaded Nachos",           price:219, desc:"Salsa, guacamole, jalapeno, cheese" },
    { name:"Mezze Platter",           price:299, desc:"Hummus, pita, falafel, tzatziki" },
  ]},
  { id:"continental", label:"Continental",         Icon: ChefHat, items:[
    { name:"Penne Arrabbiata",        price:299, desc:"Spicy tomato sauce, fresh basil" },
    { name:"Mushroom Risotto",        price:349, desc:"Creamy arborio, parmesan, truffle oil" },
    { name:"Veg Lasagne",             price:329, desc:"Layered pasta with bechamel and mozzarella" },
    { name:"Fettuccine Alfredo",      price:319, desc:"Classic creamy parmesan sauce" },
    { name:"Veg Pizza (8 inch)",      price:299, desc:"Tomato base, mozzarella, seasonal veggies" },
    { name:"Burrito Bowl",            price:279, desc:"Mexican rice, beans, salsa, sour cream" },
    { name:"Stuffed Bell Pepper",     price:289, desc:"Quinoa, veggies, topped with cheese" },
  ]},
  { id:"northindian", label:"North Indian",         Icon: Soup, items:[
    { name:"Paneer Butter Masala",    price:279, desc:"Creamy tomato gravy — house favourite" },
    { name:"Dal Makhani",             price:249, desc:"Slow-cooked black lentils, smoky finish" },
    { name:"Palak Paneer",            price:269, desc:"Cottage cheese in spiced spinach gravy" },
    { name:"Veg Biryani (Single)",    price:259, desc:"Fragrant basmati, whole spices, raita" },
    { name:"Kadai Paneer",            price:289, desc:"Bold, spiced kadai masala" },
    { name:"Butter Naan (2 pcs)",     price:79,  desc:"Soft tandoor-baked flatbread" },
    { name:"Jeera Rice",              price:129, desc:"Aromatic cumin-tempered basmati" },
  ]},
  { id:"sandwiches",  label:"Sandwiches & Wraps",   Icon: Sandwich, items:[
    { name:"Cheese Club Sandwich",    price:219, desc:"Triple-decker, loaded with cheese" },
    { name:"Veg Grilled Sandwich",    price:179, desc:"Fresh veggies, green chutney, cheese" },
    { name:"Paneer Tikka Wrap",       price:199, desc:"Grilled paneer, mint chutney in soft wrap" },
    { name:"BBQ Mushroom Burger",     price:229, desc:"Crispy patty, BBQ sauce, pickles" },
    { name:"Falafel Wrap",            price:209, desc:"Falafel, hummus, salad, garlic sauce" },
    { name:"Classic Bruschetta",      price:159, desc:"Toasted baguette, tomato, fresh basil" },
  ]},
  { id:"mocktails",   label:"Mocktails & Shakes",   Icon: Coffee, items:[
    { name:"Virgin Mojito",           price:149, desc:"Mint, lime, soda — refreshing classic" },
    { name:"Passion Fruit Cooler",    price:169, desc:"Tropical, tangy, super refreshing" },
    { name:"Blue Lagoon",             price:159, desc:"Blue curacao syrup, citrus, soda" },
    { name:"Watermelon Mint Slush",   price:149, desc:"Fresh watermelon, crushed ice" },
    { name:"Mango Tango",             price:159, desc:"Alphonso mango, chilli, lime" },
    { name:"Oreo Milkshake",          price:169, desc:"Thick shake, crushed Oreo, whipped cream" },
    { name:"Cold Coffee (Thick)",     price:149, desc:"Cafe-style blended cold coffee" },
  ]},

  { id:"desserts",    label:"Desserts",               Icon: Cake, items:[
    { name:"Chocolate Lava Cake",     price:189, desc:"Warm molten centre, vanilla ice cream" },
    { name:"Gulab Jamun (4 pcs)",     price:129, desc:"Soft, syrupy, classic Indian sweet" },
    { name:"Tiramisu",                price:199, desc:"Creamy Italian dessert, coffee-soaked" },
    { name:"Kulfi Falooda",           price:149, desc:"Indian-style dessert drink, rose syrup" },
    { name:"Cheese Cake Slice",       price:179, desc:"New York style, berry coulis" },
    { name:"Brownie Sundae",          price:189, desc:"Warm brownie, ice cream, hot fudge" },
  ]},
];

const REVIEWS = [
  { name:"Priya S.",  avatar:"PS", rating:5, color:"coral", tag:"Dining Experience",
    text:"The food was absolutely amazing — best flavours in Koramangala by far! The Paneer Tikka kept me coming back. Staff was super attentive and the ambience on the 3rd floor is just fire!" },
  { name:"Rohan M.",  avatar:"RM", rating:5, color:"plum",  tag:"Birthday Celebration",
    text:"Celebrated my birthday here and they decorated the table beautifully with balloons and flowers. The Paneer Butter Masala was chef's kiss! Highly recommend for any occasion!" },
  { name:"Ananya K.", avatar:"AK", rating:4, color:"mint",  tag:"Family Dining",
    text:"Great place for a family outing! The 2nd floor is calm and perfect for conversations. Food quality is excellent and the mocktails are very creative. 100% veg menu is a big plus for us." },
  { name:"Karan B.",  avatar:"KB", rating:5, color:"coral", tag:"Live Music Night",
    text:"Came for karaoke night on Saturday and it was EPIC. Live music + dance floor + amazing food — perfect combo. And the fact it's all vegetarian is unbelievable! This place is underrated." },
  { name:"Deepa R.",  avatar:"DR", rating:5, color:"plum",  tag:"Regular Guest",
    text:"The Cheese Club Sandwich and Virgin Mojito are my go-to every single visit. Service is always quick and staff genuinely makes you feel welcome. My favourite cafe in Bengaluru!" },
  { name:"Arjun T.",  avatar:"AT", rating:4, color:"mint",  tag:"Office Outing",
    text:"Brought my team here for an office party — staff arranged everything perfectly. Large group seating, custom menu, and even a cake! The 3rd floor really sets the mood." },
];

const NAV = [
  { label:"About",     href:"#about" },
  { label:"Floors",    href:"#floors" },
  { label:"Celebrate", href:"#celebrate" },
  { label:"Menu",      href:"#menu" },
  { label:"Gallery",   href:"#gallery" },
  { label:"Reviews",   href:"#reviews" },
  { label:"Visit",     href:"#visit" },
];

const GALLERY_TILES = [
  { label:"Vibrant Ambience",        Icon: Sparkles,     bg:"bg-plum",         accent:"text-coral",  span:"col-span-2 row-span-2", img:"/cafe_interior.png" },
  { label:"Paneer Butter Masala",  Icon: Soup,         bg:"bg-plum-light",   accent:"text-amber-400", img:"/gal_paneer.png" },
  { label:"Signature Mocktails",   Icon: Coffee,       bg:"bg-plum-dark",    accent:"text-mint", img:"/gal_mocktails.png" },
  { label:"Live Music Night",      Icon: Music,        bg:"bg-plum",         accent:"text-purple-400", img:"/gal_livemusic.png" },
  { label:"Birthday Decorations",  Icon: Cake,         bg:"bg-coral-dark",   accent:"text-white",  span:"col-span-2", img:"/gal_birthday.png" },
  { label:"Cheese Club Sandwich",  Icon: Sandwich,     bg:"bg-mint-dark",    accent:"text-cream", img:"/gal_sandwich.png" },
  { label:"2nd Floor Lounge",      Icon: Leaf,         bg:"bg-mint",         accent:"text-plum", img:"/floor2.png" },
  { label:"3rd Floor Vibe",        Icon: Sparkles,     bg:"bg-plum-light",   accent:"text-coral", img:"/floor3.png" },
  { label:"Date Night Setup",      Icon: Heart,        bg:"bg-coral",        accent:"text-white", img:"/gal_datenight.png" },
];

/* ─── HELPERS ───────────────────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal, .reveal-l, .reveal-r").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function VegBadge({ sm }) {
  const cls = sm ? "text-xs px-2 py-0.5 gap-1" : "text-sm px-3 py-1 gap-1.5";
  return (
    <span className={`inline-flex items-center bg-green-50 border border-green-500 text-green-700 rounded-full font-bold ${cls}`}>
      <ShieldCheck size={sm ? 12 : 14} className="text-green-600" />
      100% Pure Veg
    </span>
  );
}

function Stars({ n, light }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={14} className={i <= n ? "fill-amber-400 text-amber-400" : light ? "fill-white/20 text-white/20" : "fill-amber-100 text-amber-100"} />
      ))}
    </div>
  );
}

/* ─── NAVBAR ────────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = href => { setOpen(false); document.querySelector(href)?.scrollIntoView({ behavior:"smooth" }); };

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "nav-glass shadow-lg" : "bg-transparent"}`} aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        <a href="#hero" onClick={e => { e.preventDefault(); go("#hero"); }} className="flex items-center gap-2.5 group" aria-label="Top Ace Cafe Home">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-coral-gradient flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-white font-display font-black text-lg">TA</span>
          </div>
          <div>
            <div className="font-display font-black text-white text-base leading-none">TOP ACE</div>
            <div className="text-[10px] text-white/60 font-body leading-none mt-0.5">ಟಾಪ್ ಏಸ್ · Koramangala</div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {NAV.map(l => (
            <button key={l.href} onClick={() => go(l.href)} className="text-white/80 hover:text-coral transition-colors text-sm font-medium font-body">
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href={INFO.swiggyUrl} target="_blank" rel="noopener noreferrer" id="nav-swiggy-btn"
            className="hidden sm:flex items-center gap-1.5 bg-swiggy text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-orange-500 transition-colors">
            <ExternalLink size={13} /> Order on Swiggy
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2" aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden nav-glass border-t border-white/10">
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV.map(l => (
              <button key={l.href} onClick={() => go(l.href)} className="text-left text-white/90 hover:text-coral py-3 px-2 border-b border-white/10 text-sm font-medium transition-colors">
                {l.label}
              </button>
            ))}
            <a href={INFO.swiggyUrl} target="_blank" rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 bg-swiggy text-white px-4 py-3 rounded-xl text-sm font-bold">
              <ExternalLink size={14} /> Order on Swiggy
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── HERO ──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-plum-gradient">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src="/cafe_interior.png" alt="Top Ace Cafe interior" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-plum-dark/80 backdrop-blur-sm" />
      </div>

      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-coral/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-mint/10 rounded-full blur-3xl animate-pulse" style={{animationDelay:"1s"}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-plum-light/20 rounded-full blur-3xl" />
        {/* Particle dots */}
        {Array.from({length:24}).map((_,i) => (
          <div key={i} className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{top:`${(i*37)%97}%`, left:`${(i*53)%97}%`, animationDelay:`${(i*0.25)%2}s`, animationDuration:`${2.5+(i*0.3)%2.5}s`}} />
        ))}
      </div>

      {/* Decorative ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] border border-white/5 rounded-full" />
        <div className="absolute w-[700px] h-[700px] border border-white/[0.03] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-20">
        {/* Feature badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <VegBadge />
          <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm font-medium">
            <Sparkles size={14} className="text-coral" /> Great Ambience
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm font-medium">
            <Music size={14} className="text-mint" /> Live Music
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm font-medium">
            <Building2 size={14} className="text-amber-400" /> Two Floors
          </span>
        </div>

        {/* Name */}
        <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl text-white leading-none tracking-tight">
          TOP ACE
          <span className="text-gradient-coral block text-3xl sm:text-4xl md:text-5xl mt-1">CAFE</span>
        </h1>
        <p className="text-white/50 text-lg md:text-xl mt-3 mb-6 font-body">ಟಾಪ್ ಏಸ್ · Koramangala, Bengaluru</p>

        <p className="text-white/90 text-xl sm:text-2xl md:text-3xl font-display font-bold max-w-2xl mx-auto leading-snug mb-10">
          "{INFO.tagline}"
        </p>

        {/* Info pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <div className="glass-card rounded-2xl px-5 py-3 flex items-center gap-3">
            <Stars n={5} light />
            <span className="font-bold text-amber-400">4.6</span>
            <span className="text-white/60 text-sm">(804+ reviews)</span>
          </div>
          <div className="glass-card rounded-2xl px-5 py-3">
            <span className="text-white/80 text-sm font-body">&#8377;{INFO.priceRange}</span>
          </div>
          <div className="glass-card rounded-2xl px-5 py-3 flex items-center gap-2">
            <Clock size={14} className="text-mint" />
            <span className="text-white/80 text-sm font-body">11:30 AM – 12 AM Daily</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={INFO.swiggyUrl} target="_blank" rel="noopener noreferrer" id="hero-swiggy-btn"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-swiggy hover:bg-orange-500 text-white font-bold py-4 px-8 rounded-2xl text-base shadow-2xl shadow-orange-500/30 transition-all hover:scale-105">
            <ExternalLink size={16} /> Order on Swiggy
          </a>
          <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" id="hero-whatsapp-btn"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-whatsapp hover:bg-green-500 text-white font-bold py-4 px-8 rounded-2xl text-base shadow-2xl shadow-green-500/30 transition-all hover:scale-105">
            <MessageCircle size={18} /> WhatsApp to Book
          </a>
        </div>

        <div className="mt-16 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs font-body uppercase tracking-widest">Explore</span>
          <ChevronDown size={20} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ─────────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-coral font-bold text-sm uppercase tracking-widest font-body">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-plum mt-2">
            Bengaluru's Favourite<br />
            <span className="text-gradient-coral">Pure Veg Hangout</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          {/* Left – brand card */}
          <div className="reveal-l h-full">
            <div className="rounded-3xl overflow-hidden relative h-full min-h-[380px] shadow-xl border border-white/10 group">
              <img src="/about_cafe_interior.png" alt="Top Ace Cafe Ambience" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-dark/90 via-plum-dark/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 z-10">
                <div className="w-12 h-12 bg-coral/90 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <Leaf size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-display font-black text-white mb-2 drop-shadow-md">Where Veg Gets Vibrant</h3>
                <p className="text-white/90 text-sm font-body max-w-sm drop-shadow">
                  Nestled in the heart of Koramangala 5th Block, we've created a space where pure-veg meets continental flair and Bengaluru's love for good music.
                </p>
              </div>
            </div>
          </div>

          {/* Right – feature list */}
          <div className="reveal-r space-y-4">
            {[
              { Icon: Leaf,  color:"text-mint",        bg:"bg-mint/10",
                title:"100% Pure Vegetarian",
                desc:"Every single item on our menu — from starters to desserts — is completely vegetarian. No compromise, ever." },
              { Icon: Coffee,  color:"text-coral",       bg:"bg-coral/10",
                title:"Signature Mocktails",
                desc:"Refreshing, handcrafted drinks to perfectly complement your meal and set the mood." },
              { Icon: Music, color:"text-purple-500",  bg:"bg-purple-50",
                title:"Live Music & Events",
                desc:"Weekly live acts, karaoke nights, and a dedicated dance floor on our 3rd floor bar." },
              { Icon: Cake,  color:"text-amber-500",   bg:"bg-amber-50",
                title:"Celebrations & Decorations",
                desc:"Birthdays, anniversaries, dates — we set up custom decors that make every moment Instagram-worthy." },
            ].map(({ Icon, color, bg, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm border border-cream-dark hover:shadow-md transition-shadow group">
                <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} className={color} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-plum text-base">{title}</h4>
                  <p className="text-plum/60 text-sm mt-1 font-body">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 reveal">
          {[
            { Icon: Star,        value:"4.6★", label:"Google Rating",  sub:"804+ reviews",       color:"text-amber-400" },
            { Icon: Building2,   value:"2",    label:"Unique Floors",   sub:"Two vibes, one place",color:"text-coral" },
            { Icon: ShieldCheck, value:"100%", label:"Vegetarian",      sub:"Always, always",     color:"text-mint" },
            { Icon: Clock,       value:"11:30",label:"Opens Daily",     sub:"Till midnight",      color:"text-blue-400" },
          ].map(({ Icon, value, label, sub, color }) => (
            <div key={label} className="bg-plum-gradient rounded-2xl p-5 text-center group hover:-translate-y-1 transition-transform">
              <Icon size={22} className={`${color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
              <div className="text-2xl md:text-3xl font-display font-black text-coral">{value}</div>
              <div className="text-white text-sm font-bold mt-1">{label}</div>
              <div className="text-white/50 text-xs mt-0.5 font-body">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FLOORS ────────────────────────────────────────────────────────────── */
function Floors() {
  return (
    <section id="floors" className="py-20 md:py-28 bg-plum-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 reveal">
          <span className="text-coral font-bold text-sm uppercase tracking-widest font-body">Two Floors, One Vibe</span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mt-2">
            Pick Your <span className="text-gradient-coral">Atmosphere</span>
          </h2>
          <p className="text-white/60 mt-3 max-w-xl mx-auto font-body text-base">
            Whether you're here for a quiet family dinner or a dance-floor night — we've got a floor for that.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {FLOORS.map((fl, i) => {
            const FlIcon = fl.icon;
            return (
              <div key={fl.floor}
                className={`reveal ${i===1?"delay-200":""} relative rounded-3xl overflow-hidden bg-plum border border-white/10 group hover:border-${fl.color}/40 transition-all duration-300`}>

                {/* Visual header — gradient + icon */}
                <div className={`relative h-48 flex items-center justify-center bg-gradient-to-br ${fl.gradient} overflow-hidden`}>
                  <img src={fl.img} alt={fl.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-plum-dark/60 mix-blend-multiply transition-opacity group-hover:opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-dark via-transparent to-transparent" />
                  {/* Decorative rings */}
                  <div className="absolute w-48 h-48 border-2 border-white/10 rounded-full" />
                  <div className="absolute w-72 h-72 border border-white/5 rounded-full" />
                  {/* Large icon */}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <FlIcon size={40} className="text-white" />
                    </div>
                    <span className="text-white/80 text-sm font-bold font-body">{fl.vibe}</span>
                  </div>
                  {/* Floor badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white border border-white/30`}>
                      <Building2 size={11} /> {fl.floor}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-7">
                  <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-3">{fl.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-5 font-body">{fl.description}</p>
                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 mb-6">
                    {fl.features.map(({ Icon, text }) => (
                      <div key={text} className="flex items-center gap-2 text-white/80 text-sm font-body">
                        <Icon size={14} className={fl.color==="mint"?"text-mint":"text-coral"} />
                        {text}
                      </div>
                    ))}
                  </div>
                  <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-bold py-2.5 px-5 rounded-xl transition-all ${fl.color==="mint"?"bg-mint/20 text-mint hover:bg-mint hover:text-plum":"bg-coral/20 text-coral hover:bg-coral hover:text-white"}`}>
                    <MessageCircle size={15} /> Book this floor
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── CELEBRATE ─────────────────────────────────────────────────────────── */
function Celebrate() {
  return (
    <section id="celebrate" className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 reveal">
          <span className="text-coral font-bold text-sm uppercase tracking-widest font-body">Events & Occasions</span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-plum mt-2 flex items-center justify-center gap-3">
            Celebrate Here <PartyPopper size={36} className="text-coral" />
          </h2>
          <p className="text-plum/60 mt-3 max-w-xl mx-auto font-body text-base">
            From intimate birthday dinners to large group outings — we make every occasion unforgettable.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {CELEBRATIONS.map(({ Icon, title, desc }, i) => (
            <div key={title}
              className={`reveal ${["delay-100","delay-200","delay-300","delay-100","delay-200","delay-300"][i]} bg-white rounded-2xl p-6 shadow-sm border border-cream-dark hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}>
              <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-coral group-hover:scale-110 transition-all duration-300">
                <Icon size={22} className="text-coral group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display font-black text-plum text-lg mb-2">{title}</h3>
              <p className="text-plum/60 text-sm font-body leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="reveal bg-plum-gradient rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-coral/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-mint/10 rounded-full blur-2xl" />
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-coral/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <PartyPopper size={32} className="text-coral" />
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-3">Planning a Special Event?</h3>
            <p className="text-white/70 max-w-lg mx-auto mb-8 font-body text-base leading-relaxed">
              WhatsApp us for custom event packages — decoration themes, special menus, dedicated floor bookings, and more.
            </p>
            <a href={WA_EVENT} target="_blank" rel="noopener noreferrer" id="celebrate-whatsapp-btn"
              className="inline-flex items-center gap-3 bg-whatsapp hover:bg-green-500 text-white font-bold py-4 px-8 rounded-2xl text-base shadow-2xl shadow-green-500/30 transition-all hover:scale-105">
              <MessageCircle size={20} /> Enquire for Events & Decorations
            </a>
            <p className="text-white/40 text-xs mt-4 font-body flex items-center justify-center gap-1.5">
              <Phone size={11} /> Opens WhatsApp · {INFO.phone}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── MENU ──────────────────────────────────────────────────────────────── */
function MenuSection() {
  const [tab, setTab] = useState("starters");
  const cat = MENU.find(c => c.id === tab);

  return (
    <section id="menu" className="py-20 md:py-28 bg-plum-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 reveal">
          <span className="text-coral font-bold text-sm uppercase tracking-widest font-body">What We Serve</span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mt-2">
            Our <span className="text-gradient-coral">Menu</span>
          </h2>
          <div className="mt-4 flex justify-center"><VegBadge /></div>
          <p className="text-white/50 mt-2 font-body text-sm">Every item is 100% vegetarian — always.</p>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 mb-8 reveal">
          {MENU.map(c => {
            const TabIcon = c.Icon;
            return (
              <button key={c.id} id={`menu-tab-${c.id}`} onClick={() => setTab(c.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all ${tab===c.id?"bg-coral text-white shadow-lg shadow-coral/30":"bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"}`}>
                <TabIcon size={14} /><span>{c.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cat?.items.map(item => (
            <div key={item.name} className="menu-card bg-plum rounded-2xl p-5 border border-white/10 hover:border-coral/30">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="veg-badge-square mt-0.5 flex-shrink-0">
                    <div className="veg-dot" style={{width:"8px",height:"8px"}} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-white text-sm leading-snug">{item.name}</h4>
                    <p className="text-white/50 text-xs mt-1 font-body leading-snug">{item.desc}</p>
                  </div>
                </div>
                <span className="text-coral font-bold text-sm flex-shrink-0">&#8377;{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center reveal">
          <p className="text-white/50 text-sm mb-4 font-body">Full menu available on Swiggy</p>
          <a href={INFO.swiggyUrl} target="_blank" rel="noopener noreferrer" id="menu-swiggy-btn"
            className="inline-flex items-center gap-2 bg-swiggy hover:bg-orange-500 text-white font-bold py-3 px-7 rounded-full transition-colors shadow-lg">
            <ExternalLink size={15} /> Order on Swiggy
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── GALLERY ───────────────────────────────────────────────────────────── */
function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 reveal">
          <span className="text-coral font-bold text-sm uppercase tracking-widest font-body">Moments & Vibes</span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-plum mt-2">
            Gallery <Sparkles size={32} className="inline text-coral mb-1" />
          </h2>
          <p className="text-plum/50 mt-3 font-body text-sm flex items-center justify-center gap-1.5">
            <Instagram size={14} className="text-plum/50" />
            Tag us on Instagram with <strong>#TopAceCafe</strong> to be featured here
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[170px] md:auto-rows-[190px]">
          {GALLERY_TILES.map((t, i) => {
            const TileIcon = t.Icon;
            return (
              <div key={i}
                className={`reveal rounded-2xl overflow-hidden relative group cursor-pointer ${t.span||""} ${t.bg}`}>
                <img src={t.img} alt={t.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-plum-dark/90 via-plum-dark/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center flex-shrink-0">
                    <TileIcon size={20} className="text-white" />
                  </div>
                  <span className="text-xs md:text-sm font-bold font-body text-white leading-tight drop-shadow-md">{t.label}</span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl">
                  <span className="text-white text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">Add Your Photo</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <a href={INFO.instagram} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-plum font-bold hover:text-coral transition-colors font-body text-sm">
            <Instagram size={18} /> Follow us on Instagram <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── REVIEWS ───────────────────────────────────────────────────────────── */
function Reviews() {
  const cmap = {
    coral: { bg:"bg-coral/10",  text:"text-coral",     border:"border-coral/20" },
    plum:  { bg:"bg-plum/10",   text:"text-plum-light", border:"border-plum/20" },
    mint:  { bg:"bg-mint/10",   text:"text-mint-dark",  border:"border-mint/20" },
  };

  return (
    <section id="reviews" className="py-20 md:py-28 bg-plum-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 reveal">
          <span className="text-coral font-bold text-sm uppercase tracking-widest font-body">Guest Love</span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mt-2">
            What People <span className="text-gradient-coral">Are Saying</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <Stars n={5} light />
            <span className="font-bold text-amber-400 ml-1">4.6</span>
            <span className="text-white/50 text-sm ml-1">(804+ Google reviews)</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r) => {
            const c = cmap[r.color];
            return (
              <div key={r.name} className={`review-card reveal glass-card rounded-2xl p-6 border ${c.border}`}>
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full mb-4 ${c.bg} ${c.text}`}>
                  <CheckCircle2 size={11} /> {r.tag}
                </span>
                <div className="mb-3"><Stars n={r.rating} light /></div>
                <p className="text-white/80 text-sm leading-relaxed mb-5 font-body">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${c.bg} flex items-center justify-center text-xs font-black ${c.text}`}>{r.avatar}</div>
                  <div>
                    <div className="text-white text-sm font-bold font-display">{r.name}</div>
                    <div className="text-white/40 text-xs font-body flex items-center gap-1"><Star size={10} className="fill-amber-400 text-amber-400" /> Google Review</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── RESERVATION FORM ──────────────────────────────────────────────────── */
function ReservationForm() {
  const [form, setForm] = useState({
    name:"", date:"", time:"", size:"2",
    floor:"2nd Floor – Veg & Mocktails",
    occasion:"Casual Hangout",
  });
  const [done, setDone] = useState(false);

  const floorOpts = ["2nd Floor – Veg & Mocktails","3rd Floor – Bar & Music","No preference"];
  const ocOpts    = ["Casual Hangout","Birthday Celebration","Date Night","Anniversary","Office Outing","Family Gathering","Other"];
  const change = e => setForm(f => ({...f,[e.target.name]:e.target.value}));
  const submit = e => {
    e.preventDefault();
    window.open(mkWA(form.name,form.date,form.time,form.size,form.floor,form.occasion),"_blank");
    setDone(true); setTimeout(()=>setDone(false),4000);
  };
  const inputCls = "w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm font-body focus:border-coral focus:outline-none transition-colors";

  return (
    <div className="bg-plum-gradient rounded-3xl p-7 md:p-10 border border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-whatsapp/20 rounded-xl flex items-center justify-center">
          <MessageCircle size={20} className="text-whatsapp" />
        </div>
        <div>
          <h3 className="font-display font-black text-white text-lg">Reserve via WhatsApp</h3>
          <p className="text-white/50 text-xs font-body">No account needed — opens WhatsApp directly</p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/60 text-xs font-bold mb-1.5 uppercase tracking-wide font-body" htmlFor="res-name">Your Name</label>
            <input id="res-name" name="name" type="text" required value={form.name} onChange={change} placeholder="e.g. Priya Kumar" className={inputCls} />
          </div>
          <div>
            <label className="block text-white/60 text-xs font-bold mb-1.5 uppercase tracking-wide font-body" htmlFor="res-date">Date</label>
            <input id="res-date" name="date" type="date" required value={form.date} onChange={change} className={inputCls} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/60 text-xs font-bold mb-1.5 uppercase tracking-wide font-body" htmlFor="res-time">Time</label>
            <input id="res-time" name="time" type="time" required value={form.time} onChange={change} className={inputCls} />
          </div>
          <div>
            <label className="block text-white/60 text-xs font-bold mb-1.5 uppercase tracking-wide font-body" htmlFor="res-size">Party Size</label>
            <select id="res-size" name="size" value={form.size} onChange={change} className={inputCls}>
              {["1","2","3","4","5","6","7","8","9","10","10+"].map(n => (
                <option key={n} value={n} className="bg-plum">{n} {n==="1"?"person":"people"}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <span className="block text-white/60 text-xs font-bold mb-1.5 uppercase tracking-wide font-body">Floor Preference</span>
          <div className="grid sm:grid-cols-3 gap-2">
            {floorOpts.map(f => (
              <label key={f} className={`flex items-center gap-2 cursor-pointer rounded-xl p-3 border text-sm font-body transition-all ${form.floor===f?"border-coral bg-coral/20 text-white":"border-white/15 bg-white/5 text-white/60 hover:border-white/30"}`}>
                <input type="radio" name="floor" value={f} checked={form.floor===f} onChange={change} className="sr-only" />
                <span className="w-3.5 h-3.5 rounded-full border-2 border-current flex-shrink-0 flex items-center justify-center">
                  {form.floor===f && <span className="w-1.5 h-1.5 rounded-full bg-coral" />}
                </span>
                <span className="text-xs leading-snug">{f.split("–")[0].trim()}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-white/60 text-xs font-bold mb-1.5 uppercase tracking-wide font-body" htmlFor="res-occ">Occasion</label>
          <select id="res-occ" name="occasion" value={form.occasion} onChange={change} className={inputCls}>
            {ocOpts.map(o => <option key={o} value={o} className="bg-plum">{o}</option>)}
          </select>
        </div>
        <button type="submit" id="reservation-submit-btn"
          className={`w-full flex items-center justify-center gap-3 font-bold py-4 rounded-xl text-base transition-all ${done?"bg-green-500 text-white":"bg-whatsapp hover:bg-green-500 text-white hover:scale-[1.02] shadow-lg shadow-green-500/20"}`}>
          {done ? <><Check size={18} /> Opening WhatsApp…</> : <><MessageCircle size={18} /> Send Booking Request via WhatsApp</>}
        </button>
        <p className="text-center text-white/30 text-xs font-body flex items-center justify-center gap-1.5">
          <Phone size={10} /> Opens WhatsApp · {INFO.phone}
        </p>
      </form>
    </div>
  );
}

/* ─── VISIT ─────────────────────────────────────────────────────────────── */
function Visit() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(INFO.address); setCopied(true); setTimeout(()=>setCopied(false),2500); } catch {}
  };

  return (
    <section id="visit" className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 reveal">
          <span className="text-coral font-bold text-sm uppercase tracking-widest font-body">Find Us</span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-plum mt-2">
            Come <span className="text-gradient-coral">Visit Us</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="reveal-l"><ReservationForm /></div>
          <div className="reveal-r space-y-5">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-cream-dark h-64 md:h-72">
              <iframe
                title="Top Ace Cafe Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5862177395797!2d77.62303!3d12.93454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14e7%3A0x1!2sKoramangala+5th+Block%2C+Bengaluru!5e0!3m2!1sen!2sin!4v1"
                width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { Icon:MapPin,  title:"Address",          content:INFO.address,
                  extra: <div className="flex gap-3 mt-2">
                    <a href={INFO.mapsUrl} target="_blank" rel="noopener noreferrer" id="directions-btn" className="flex items-center gap-1.5 text-xs font-bold text-coral hover:underline"><Navigation size={12}/> Get Directions</a>
                    <button onClick={copy} id="copy-address-btn" className="flex items-center gap-1.5 text-xs font-bold text-plum/60 hover:text-plum">{copied?<><Check size={12}/>Copied!</>:<><Copy size={12}/>Copy</>}</button>
                  </div> },
                { Icon:Clock,   title:"Hours",            content:INFO.hours },
                { Icon:Phone,   title:"Phone / WhatsApp", content:INFO.phone,
                  extra: <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-whatsapp mt-2 hover:underline"><MessageCircle size={12}/> Open WhatsApp</a> },
                { Icon:Star,    title:"Google Rating",    content:"4.6★ · 804+ reviews",
                  extra: <div className="mt-1"><Stars n={5}/></div> },
              ].map(({ Icon, title, content, extra }) => (
                <div key={title} className="bg-white rounded-2xl p-4 shadow-sm border border-cream-dark">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={14} className="text-coral" />
                    <span className="text-xs font-bold text-plum/50 uppercase tracking-wide font-body">{title}</span>
                  </div>
                  <p className="text-plum text-sm font-body leading-snug">{content}</p>
                  {extra}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────────────── */
function Footer() {
  const go = h => document.querySelector(h)?.scrollIntoView({behavior:"smooth"});
  return (
    <footer className="bg-plum-dark border-t border-white/10 pt-16 pb-28 md:pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-coral-gradient flex items-center justify-center">
                <span className="text-white font-display font-black text-xl">TA</span>
              </div>
              <div>
                <div className="font-display font-black text-white text-xl">TOP ACE CAFE</div>
                <div className="text-white/40 text-xs font-body">ಟಾಪ್ ಏಸ್ · Koramangala, Bengaluru</div>
              </div>
            </div>
            <p className="text-white/50 text-sm font-body leading-relaxed max-w-xs mb-4">
              Pure vegetarian continental cafe with live music, dance floor and karaoke in the heart of Koramangala.
            </p>
            <VegBadge sm />
            <div className="flex gap-3 mt-5">
              {[{Icon:Instagram,href:INFO.instagram,label:"Instagram"},{Icon:FacebookIcon,href:INFO.facebook,label:"Facebook"}].map(({Icon,href,label})=>(
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-coral flex items-center justify-center transition-colors">
                  <Icon size={16} className="text-white" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-display font-bold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV.map(l => (
                <li key={l.href}>
                  <button onClick={()=>go(l.href)} className="text-white/50 hover:text-white text-sm font-body transition-colors flex items-center gap-1.5">
                    <ArrowRight size={12} className="text-coral/50" /> {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-display font-bold text-base mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex gap-2"><MapPin size={14} className="text-coral flex-shrink-0 mt-0.5"/><span className="text-white/50 text-sm font-body leading-snug">{INFO.address}</span></div>
              <div className="flex gap-2"><Phone size={14} className="text-coral flex-shrink-0"/><a href={`tel:${INFO.phone}`} className="text-white/50 hover:text-white text-sm font-body">{INFO.phone}</a></div>
              <div className="flex gap-2"><Clock size={14} className="text-coral flex-shrink-0"/><span className="text-white/50 text-sm font-body">11:30 AM – 12:00 AM</span></div>
            </div>
            <a href={INFO.swiggyUrl} target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-swiggy/20 hover:bg-swiggy text-swiggy hover:text-white text-xs font-bold py-2 px-4 rounded-full border border-swiggy/40 transition-all">
              <ExternalLink size={12} /> Order on Swiggy
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs font-body">&copy; {new Date().getFullYear()} Top Ace Cafe · All rights reserved.</p>
          <p className="text-white/20 text-xs font-body flex items-center gap-1.5"><ShieldCheck size={12} /> 100% Pure Vegetarian</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── FLOATING ELEMENTS ─────────────────────────────────────────────────── */
function FloatingWA() {
  return (
    <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" id="floating-whatsapp-btn" aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-20 md:bottom-6 z-50 w-14 h-14 bg-whatsapp hover:bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 transition-all hover:scale-110 animate-float">
      <MessageCircle size={26} className="text-white" />
    </a>
  );
}

function MobileBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden mobile-fab">
      <div className="flex divide-x divide-white/10">
        <a href={`tel:${INFO.phone}`} id="mobile-call-btn" aria-label="Call"
          className="flex-1 flex flex-col items-center justify-center py-3 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
          <Phone size={20}/><span className="text-[10px] font-body mt-1">Call</span>
        </a>
        <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" id="mobile-whatsapp-btn" aria-label="WhatsApp"
          className="flex-1 flex flex-col items-center justify-center py-3 text-whatsapp hover:bg-white/10 transition-colors">
          <MessageCircle size={20}/><span className="text-[10px] font-body mt-1">WhatsApp</span>
        </a>
        <a href={INFO.swiggyUrl} target="_blank" rel="noopener noreferrer" id="mobile-swiggy-btn" aria-label="Swiggy"
          className="flex-1 flex flex-col items-center justify-center py-3 text-swiggy hover:bg-white/10 transition-colors">
          <ExternalLink size={20}/><span className="text-[10px] font-body mt-1">Swiggy</span>
        </a>
      </div>
    </div>
  );
}

/* ─── APP ───────────────────────────────────────────────────────────────── */
export default function App() {
  useScrollReveal();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Floors />
        <Celebrate />
        <MenuSection />
        <Gallery />
        <Reviews />
        <Visit />
      </main>
      <Footer />
      <FloatingWA />
      <MobileBar />
    </>
  );
}
