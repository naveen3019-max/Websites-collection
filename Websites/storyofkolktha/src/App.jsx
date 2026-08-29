import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, MapPin, Phone, Clock, Star, Navigation, Share2, MessageCircle, ShoppingBag, ChevronDown, Send, Users } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
//  EDITABLE CONSTANTS  — update these before going live
// ─────────────────────────────────────────────────────────────
const RESTAURANT_INFO = {
  name: "Story of Kolkata",
  tagline: "A taste of old Calcutta, in Koramangala",
  address: "1st Floor, MIG 134, KHB Colony, 5th Block, Koramangala, Bengaluru, Karnataka 560095",
  phone: "917005181891",
  displayPhone: "+91 70051 81891",
  hours: "12:00 PM – 10:30 PM (Daily)",
  priceRange: "₹400 – ₹1,400 for two",
  rating: 4.4,
  reviewsCount: 335,
  orderLink: "#", // ← Replace with real Swiggy / Zomato link
  gmapsLink: "https://www.google.com/maps/search/Story+of+Kolkata+Koramangala+5th+Block+Bengaluru",
  whatsappMsg: "Hi, I'd like to enquire about a table at Story of Kolkata",
  instagramLink: "#",
  facebookLink: "#",
};

const MENU_CATEGORIES = ["Bengali Specialties", "Starters & Kebabs", "Biryani", "North Indian Mains", "Chinese", "Desserts"];

// Reliable Unsplash image IDs for food categories
const MENU_ITEMS = [
  // ── Bengali Specialties ──────────────────────────────────
  { name: "Kosha Mangsho", price: 350, category: "Bengali Specialties", isKolkataSpecial: true,
    description: "Slow-cooked traditional Bengali mutton curry, the soul of a Sunday feast.",
    img: "/kosha_mangsho.jpg" },
  { name: "Bhetki Macher Paturi", price: 280, category: "Bengali Specialties", isKolkataSpecial: true,
    description: "Bhetki fish marinated in yellow mustard paste, steamed in banana leaf.",
    img: "https://images.unsplash.com/photo-1605209971703-9e2b0b1bf43e?w=400&q=80" },
  { name: "Chicken Dak Bungalow", price: 320, category: "Bengali Specialties", isKolkataSpecial: true,
    description: "A heritage chicken curry with boiled egg and potatoes — colonial-era comfort food.",
    img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80" },
  { name: "Cholar Dal with Luchi", price: 180, category: "Bengali Specialties", isKolkataSpecial: true,
    description: "Bengal gram lentils slow-cooked with coconut and ghee, served with puffy fried bread.",
    img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80" },
  // ── Starters & Kebabs ────────────────────────────────────
  { name: "Chicken Tikka", price: 250, category: "Starters & Kebabs", isKolkataSpecial: false,
    description: "Succulent tandoor-roasted marinated chicken served with mint chutney.",
    img: "/chicken_tikka.jpg" },
  { name: "Seekh Kebab", price: 280, category: "Starters & Kebabs", isKolkataSpecial: false,
    description: "Minced mutton kebabs with aromatic spices, grilled on skewers.",
    img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80" },
  { name: "Paneer Tikka", price: 230, category: "Starters & Kebabs", isKolkataSpecial: false,
    description: "Cottage cheese marinated in yogurt and spices, charred to perfection.",
    img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80" },
  { name: "Tangri Kebab", price: 320, category: "Starters & Kebabs", isKolkataSpecial: false,
    description: "Drumsticks marinated overnight in a spiced yogurt mix, slow-roasted.",
    img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80" },
  // ── Biryani ──────────────────────────────────────────────
  { name: "Kolkata Chicken Biryani", price: 290, category: "Biryani", isKolkataSpecial: true,
    description: "The iconic Kolkata biryani — fragrant rice with chicken, boiled egg and signature aloo.",
    img: "/kolkata_biryani.jpg" },
  { name: "Mutton Dum Biryani", price: 380, category: "Biryani", isKolkataSpecial: false,
    description: "Slow-cooked under a sealed lid for maximum fragrance and tenderness.",
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80" },
  { name: "Prawn Biryani", price: 420, category: "Biryani", isKolkataSpecial: false,
    description: "Tender prawns layered with saffron-kissed basmati rice.",
    img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&q=80" },
  { name: "Veg Biryani", price: 220, category: "Biryani", isKolkataSpecial: false,
    description: "Seasonal vegetables and whole spices in long-grain basmati.",
    img: "https://images.unsplash.com/photo-1645177628172-a5b36b90b7d4?w=400&q=80" },
  // ── North Indian Mains ───────────────────────────────────
  { name: "Butter Chicken", price: 290, category: "North Indian Mains", isKolkataSpecial: false,
    description: "The classic — tandoor-roasted chicken in a velvety spiced tomato sauce.",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
  { name: "Paneer Butter Masala", price: 240, category: "North Indian Mains", isKolkataSpecial: false,
    description: "Silky tomato-butter gravy with fresh cottage cheese.",
    img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80" },
  { name: "Dal Makhani", price: 200, category: "North Indian Mains", isKolkataSpecial: false,
    description: "Black lentils slow-simmered overnight with butter and cream.",
    img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80" },
  { name: "Rogan Josh", price: 350, category: "North Indian Mains", isKolkataSpecial: false,
    description: "Aromatic Kashmiri mutton curry with whole spices.",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80" },
  // ── Chinese ──────────────────────────────────────────────
  { name: "Chilli Chicken (Dry)", price: 230, category: "Chinese", isKolkataSpecial: false,
    description: "Kolkata street-style Indo-Chinese chilli chicken — a city staple.",
    img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&q=80" },
  { name: "Hakka Noodles", price: 180, category: "Chinese", isKolkataSpecial: false,
    description: "Stir-fried noodles with fresh vegetables and soy.",
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80" },
  { name: "Manchurian Gravy", price: 210, category: "Chinese", isKolkataSpecial: false,
    description: "Deep-fried chicken balls in a tangy Manchurian sauce.",
    img: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&q=80" },
  { name: "Prawn Fried Rice", price: 260, category: "Chinese", isKolkataSpecial: false,
    description: "Wok-tossed rice with prawns, egg, and spring onion.",
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80" },
  // ── Desserts ─────────────────────────────────────────────
  { name: "Mishti Doi", price: 90, category: "Desserts", isKolkataSpecial: true,
    description: "The quintessential Bengali dessert — caramelized sweet yogurt in clay pots.",
    img: "https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?w=400&q=80" },
  { name: "Rasgulla", price: 80, category: "Desserts", isKolkataSpecial: true,
    description: "Soft chenna balls soaked in light sugar syrup. Bengal's pride.",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80" },
  { name: "Gulab Jamun", price: 80, category: "Desserts", isKolkataSpecial: false,
    description: "Warm milk-solid dumplings dipped in rose-scented sugar syrup.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { name: "Ice Cream", price: 100, category: "Desserts", isKolkataSpecial: false,
    description: "Seasonal scoops from our curated selection.",
    img: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&q=80" },
];

const GALLERY_ITEMS = [
  { src: "/kolkata_biryani.jpg",    alt: "Kolkata Biryani with egg and potato",      label: "Kolkata Biryani",      size: "tall" },
  { src: "/kosha_mangsho.jpg",      alt: "Kosha Mangsho slow-cooked mutton",         label: "Kosha Mangsho" },
  { src: "/chicken_tikka.jpg",      alt: "Sizzling chicken tikka platter",           label: "Chicken Tikka" },
  { src: "/kolkata_biryani.jpg",    alt: "Aromatic Biryani Spices",                  label: "Aromatic Spices" },
  { src: "/kosha_mangsho.jpg",      alt: "Traditional Terracotta Cooking",           label: "Traditional Flavours" },
];

const REVIEWS = [
  { author: "Rahul M.",  stars: 5, text: "The most authentic Kolkata biryani I've found in Bangalore. The potato was perfect and the aroma took me straight back home!" },
  { author: "Sneha B.",  stars: 5, text: "Kosha Mangsho with luchi transported me straight to Park Street. Generous portions, great ambience — definitely coming back." },
  { author: "Amit K.",   stars: 4, text: "Good variety. We had kebabs and Chinese, both were top-notch. Very value for money for the quality you get." },
  { author: "Priya S.",  stars: 5, text: "As a Bengali far from home, this place is my go-to whenever I'm craving authentic food. The Mishti Doi is divine." },
  { author: "Vikram N.", stars: 4, text: "Ordered the Dak Bungalow curry — hadn't seen it on many menus. Perfectly spiced, reminded me of my grandmother's cooking." },
  { author: "Ananya R.", stars: 5, text: "Came for the biryani, stayed for the ambience. The whole menu is a love letter to Kolkata." },
];

const FEATURES = [
  { emoji: "🐟", title: "Authentic Bengali",   desc: "Recipes rooted in generations of culinary heritage" },
  { emoji: "🌏", title: "Multi-Cuisine",        desc: "Bengali · North Indian · Chinese · Biryani · Kebabs" },
  { emoji: "💸", title: "Value for Money",      desc: "₹400 – ₹1,400 for two · Casual & relaxed" },
  { emoji: "⭐", title: "4.4 on Google",        desc: "335+ verified reviews from happy guests" },
];

// ─────────────────────────────────────────────────────────────
//  APP
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled,        setScrolled]        = useState(false);
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
  const [activeTab,       setActiveTab]       = useState(MENU_CATEGORIES[0]);
  const [copiedAddr,      setCopiedAddr]      = useState(false);
  const [booking,         setBooking]         = useState({ name: '', date: '', time: '', guests: '2' });
  const [imgErrors,       setImgErrors]       = useState({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsapp = (msg) =>
    window.open(`https://wa.me/${RESTAURANT_INFO.phone}?text=${encodeURIComponent(msg || RESTAURANT_INFO.whatsappMsg)}`, '_blank');

  const copyAddr = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopiedAddr(true);
    setTimeout(() => setCopiedAddr(false), 2500);
  };

  const submitBooking = (e) => {
    e.preventDefault();
    const { name, date, time, guests } = booking;
    whatsapp(`Hi! I'd like to book a table at Story of Kolkata.\n\nName: ${name}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}`);
  };

  // Fallback gradient for broken images
  const FALLBACK_STYLE = "bg-gradient-to-br from-heritage-maroon/30 to-heritage-navy/50";

  const filtered = MENU_ITEMS.filter(i => i.category === activeTab);

  return (
    <div className="font-sans text-heritage-navy bg-heritage-parchment min-h-screen">

      {/* ══════════════════════════ NAV ══════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-heritage-parchment/97 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-5 flex justify-between items-center">
          {/* Logo */}
          <span className={`font-serif font-bold tracking-wide transition-all duration-300 ${
            scrolled ? 'text-heritage-maroon text-xl' : 'text-heritage-yellow text-2xl drop-shadow-lg'
          }`}>
            Story of Kolkata
          </span>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            {[['#about','About'],['#menu','Menu'],['#gallery','Gallery'],['#reviews','Reviews'],['#visit','Visit']].map(([h,l])=>(
              <a key={h} href={h} className={`hover:text-heritage-yellow transition-colors ${scrolled?'text-heritage-navy':'text-white/90'}`}>{l}</a>
            ))}
            <a href={RESTAURANT_INFO.orderLink} target="_blank" rel="noreferrer"
              className="ml-2 bg-swiggy-orange text-white px-5 py-2.5 rounded-full hover:bg-orange-600 active:scale-95 transition-all shadow-lg flex items-center gap-2 font-semibold">
              <ShoppingBag size={15}/> Order Now
            </a>
          </div>

          {/* Hamburger */}
          <button onClick={()=>setMobileMenuOpen(v=>!v)}
            className={`md:hidden p-1 ${scrolled?'text-heritage-maroon':'text-heritage-yellow'}`}
            aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={28}/> : <Menu size={28}/>}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 bg-heritage-parchment flex flex-col px-8 pt-28 gap-5 transition-transform duration-300 md:hidden ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {[['#about','Our Heritage'],['#menu','The Menu'],['#gallery','Gallery'],['#reviews','Reviews'],['#visit','Visit Us']].map(([h,l])=>(
          <a key={h} href={h} onClick={()=>setMobileMenuOpen(false)}
            className="text-2xl font-serif text-heritage-maroon border-b border-heritage-maroon/15 pb-4 hover:text-heritage-yellow transition-colors">
            {l}
          </a>
        ))}
        <a href={RESTAURANT_INFO.orderLink} target="_blank" rel="noreferrer" onClick={()=>setMobileMenuOpen(false)}
          className="mt-4 bg-swiggy-orange text-white text-center py-3.5 rounded-full font-semibold shadow-lg">
          Order Now
        </a>
        <button onClick={()=>{whatsapp();setMobileMenuOpen(false);}}
          className="bg-whatsapp-green text-white text-center py-3.5 rounded-full font-semibold shadow-lg">
          WhatsApp Us
        </button>
      </div>

      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* layered background */}
        <div className="absolute inset-0 bg-heritage-navy z-0"/>
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: "url('/hero_background.jpg')",
          backgroundSize: 'cover', backgroundPosition: 'center'
        }}/>
        {/* rich gradient so text always readable */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-heritage-navy/80 via-heritage-navy/55 to-heritage-navy/85"/>
        {/* Subtle horizontal noise texture overlay */}
        <div className="absolute inset-0 z-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.03) 3px,rgba(255,255,255,0.03) 4px)'
        }}/>

        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
          <p className="text-heritage-yellow uppercase tracking-[0.35em] text-xs font-semibold mb-5 opacity-90">
            Est. in Koramangala · Bengali Cuisine Restaurant
          </p>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-serif text-white leading-tight mb-4 drop-shadow-xl">
            Story of<br/>
            <em className="text-heritage-yellow not-italic">Kolkata</em>
          </h1>
          <p className="text-lg md:text-2xl text-white/80 font-light italic mb-8 max-w-xl mx-auto leading-relaxed">
            "{RESTAURANT_INFO.tagline}"
          </p>

          {/* Rating chip */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-10 text-white">
            {[...Array(4)].map((_,i)=>(
              <Star key={i} size={15} className="text-heritage-yellow fill-current"/>
            ))}
            <Star size={15} className="text-heritage-yellow" style={{opacity:0.4, fill:'#D9A521'}}/>
            <span className="font-bold ml-1 text-sm">{RESTAURANT_INFO.rating}</span>
            <span className="text-white/60 text-xs">({RESTAURANT_INFO.reviewsCount}+ Reviews)</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={RESTAURANT_INFO.orderLink} target="_blank" rel="noreferrer"
              className="bg-swiggy-orange text-white px-9 py-4 rounded-full font-semibold hover:bg-orange-600 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-2">
              <ShoppingBag size={20}/> Order Online
            </a>
            <button onClick={()=>whatsapp()}
              className="bg-whatsapp-green text-white px-9 py-4 rounded-full font-semibold hover:bg-green-600 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-2">
              <MessageCircle size={20}/> Book via WhatsApp
            </button>
          </div>

          {/* Price & hours sub-info */}
          <p className="text-white/40 text-xs mt-7 tracking-wide">
            {RESTAURANT_INFO.priceRange} &nbsp;·&nbsp; {RESTAURANT_INFO.hours}
          </p>
        </div>

        <a href="#about" aria-label="Scroll down"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40 hover:text-heritage-yellow transition-colors">
          <ChevronDown size={32} className="animate-bounce"/>
        </a>
      </section>

      {/* ══════════════════════════ FEATURES STRIP ══════════════════════════ */}
      <section className="bg-heritage-maroon py-10">
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {FEATURES.map((f,i)=>(
            <div key={i}>
              <div className="text-3xl mb-2">{f.emoji}</div>
              <div className="font-serif font-bold text-heritage-yellow text-sm mb-1">{f.title}</div>
              <div className="text-heritage-parchment/70 text-xs leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════ ABOUT ══════════════════════════ */}
      <section id="about" className="py-24 bg-heritage-parchment">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-16 items-center">

          {/* Left – text */}
          <div>
            <p className="text-heritage-yellow uppercase tracking-widest text-[11px] font-semibold mb-3">Our Heritage</p>
            <h2 className="text-4xl md:text-5xl font-serif text-heritage-maroon mb-6 leading-snug">
              A Chapter of<br/>Old Calcutta
            </h2>
            <div className="w-14 h-[3px] bg-heritage-yellow rounded mb-8"/>
            <p className="text-gray-700 leading-relaxed mb-5 text-base md:text-lg">
              Somewhere between the rattling trams of Esplanade and the amber glow of a Park Street evening lives a cuisine that tells stories.
              <strong> Story of Kolkata</strong> brings that spirit to Koramangala — one plate at a time.
            </p>
            <p className="text-gray-600 leading-relaxed mb-9 text-sm md:text-base">
              From our signature mustard-laced fish curries and slow-cooked Kosha Mangsho to the city's beloved egg-and-potato biryani, every dish is a postcard from Bengal.
              Alongside our Bengali specialties, we serve hearty North Indian mains, Indo-Chinese street favourites, and succulent tandoor kebabs — because the story of Kolkata was always bigger than a single chapter.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={()=>whatsapp()}
                className="bg-heritage-maroon text-heritage-parchment px-7 py-3 rounded-full font-semibold hover:bg-heritage-navy transition-colors flex items-center gap-2 shadow-md">
                <MessageCircle size={17}/> Book a Table
              </button>
              <a href="#menu"
                className="border-2 border-heritage-maroon text-heritage-maroon px-7 py-3 rounded-full font-semibold hover:bg-heritage-maroon hover:text-heritage-parchment transition-colors">
                Explore Menu →
              </a>
            </div>
          </div>

          {/* Right – photo collage */}
          <div className="grid grid-cols-2 gap-4">
            {/* tall left */}
            <div className="row-span-2 rounded-2xl overflow-hidden shadow-xl">
              <img src="/kosha_mangsho.jpg" alt="Kosha Mangsho slow-cooked mutton curry"
                className="w-full h-full object-cover" loading="lazy"/>
            </div>
            {/* top right */}
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <img src="/kolkata_biryani.jpg" alt="Kolkata Biryani with egg and potato"
                className="w-full h-full object-cover" loading="lazy"/>
            </div>
            {/* bottom right */}
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <img src="/chicken_tikka.jpg" alt="Sizzling chicken tikka"
                className="w-full h-full object-cover" loading="lazy"/>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ MENU ══════════════════════════ */}
      <section id="menu" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <p className="text-heritage-yellow uppercase tracking-widest text-[11px] font-semibold mb-3">What We Serve</p>
            <h2 className="text-4xl md:text-5xl font-serif text-heritage-maroon">The Menu</h2>
          </div>

          {/* Category tabs */}
          <div className="flex gap-3 mb-12 overflow-x-auto pb-2" style={{scrollbarWidth:'none'}}>
            {MENU_CATEGORIES.map(cat=>(
              <button key={cat} onClick={()=>setActiveTab(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex-shrink-0 ${
                  activeTab===cat
                    ? 'bg-heritage-maroon text-heritage-parchment shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Items grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((item,idx)=>(
              <div key={idx}
                className="flex gap-4 p-4 rounded-2xl border border-gray-100 hover:shadow-md hover:border-heritage-yellow/30 transition-all group">
                {/* Thumbnail */}
                <div className="w-[88px] h-[88px] flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                  {item.img && !imgErrors[item.name] ? (
                    <img src={item.img} alt={item.name}
                      onError={()=>setImgErrors(e=>({...e,[item.name]:true}))}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"/>
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center text-3xl ${FALLBACK_STYLE}`}>
                      {item.category==='Biryani'?'🍛':item.category==='Desserts'?'🍮':item.category==='Chinese'?'🥢':'🍽️'}
                    </div>
                  )}
                </div>
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="min-w-0">
                      <span className="font-serif font-bold text-heritage-navy text-[15px] leading-snug block">{item.name}</span>
                      {item.isKolkataSpecial && (
                        <span className="inline-block mt-1 text-[10px] bg-heritage-yellow text-heritage-maroon px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          ★ Kolkata Special
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-heritage-maroon text-sm flex-shrink-0">₹{item.price}</span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 italic mt-10">
            * Sample selection. Visit us or WhatsApp us for the full menu & daily specials.
          </p>
        </div>
      </section>

      {/* ══════════════════════════ GALLERY ══════════════════════════ */}
      <section id="gallery" className="py-24 bg-heritage-navy">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <p className="text-heritage-yellow uppercase tracking-widest text-[11px] font-semibold mb-3">Food & Ambience</p>
            <h2 className="text-4xl md:text-5xl font-serif text-heritage-parchment">Glimpses of Bengal</h2>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* First item spans 2 rows */}
            <div className="relative group overflow-hidden rounded-2xl md:row-span-2">
              <img src={GALLERY_ITEMS[0].src} alt={GALLERY_ITEMS[0].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{minHeight:'250px'}} loading="lazy"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-white font-serif text-lg">{GALLERY_ITEMS[0].label}</span>
              </div>
            </div>
            {/* Items 1-5 */}
            {GALLERY_ITEMS.slice(1).map((img,i)=>(
              <div key={i} className="relative group overflow-hidden rounded-2xl aspect-square">
                <img src={img.src} alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-serif text-base">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ REVIEWS ══════════════════════════ */}
      <section id="reviews" className="py-24 bg-heritage-parchment">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <p className="text-heritage-yellow uppercase tracking-widest text-[11px] font-semibold mb-3">What Guests Say</p>
            <h2 className="text-4xl md:text-5xl font-serif text-heritage-maroon mb-4">Stories from Our Table</h2>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_,i)=>(
                <Star key={i} size={20} className="text-heritage-yellow fill-current" style={i===4?{opacity:0.5}:{}}/>
              ))}
            </div>
            <p className="text-gray-500 text-sm">{RESTAURANT_INFO.rating} out of 5 · {RESTAURANT_INFO.reviewsCount}+ Google Reviews</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {REVIEWS.map((r,i)=>(
              <div key={i}
                className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all relative">
                <div className="text-6xl text-heritage-yellow/15 font-serif absolute top-3 left-4 leading-none select-none">"</div>
                <div className="flex gap-0.5 mb-4 relative z-10">
                  {[...Array(r.stars)].map((_,j)=>(
                    <Star key={j} size={14} className="text-heritage-yellow fill-current"/>
                  ))}
                </div>
                <p className="text-gray-700 italic text-sm leading-relaxed mb-5 relative z-10">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-heritage-maroon flex items-center justify-center text-heritage-yellow font-bold text-sm font-serif">
                    {r.author[0]}
                  </div>
                  <span className="font-semibold text-heritage-navy text-sm">{r.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ BOOKING FORM ══════════════════════════ */}
      <section className="py-24 bg-heritage-maroon relative overflow-hidden">
        {/* decorative circle */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full pointer-events-none"/>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 rounded-full pointer-events-none"/>

        <div className="max-w-lg mx-auto px-5 text-center relative z-10">
          <p className="text-heritage-yellow uppercase tracking-widest text-[11px] font-semibold mb-3">Reservations</p>
          <h2 className="text-4xl font-serif text-heritage-parchment mb-3">Reserve a Table</h2>
          <p className="text-heritage-parchment/60 mb-10 text-sm leading-relaxed">
            Fill the form and it will open a pre-filled WhatsApp message — your reservation confirmed in seconds.
          </p>

          <form onSubmit={submitBooking}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 space-y-5 text-left border border-white/20 shadow-2xl">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-widest text-heritage-parchment/60 block mb-2">Your Name</label>
              <input required type="text" placeholder="e.g. Sneha Banerjee"
                value={booking.name} onChange={e=>setBooking({...booking,name:e.target.value})}
                className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-heritage-yellow text-sm"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-heritage-parchment/60 block mb-2">Date</label>
                <input required type="date" min={new Date().toISOString().split('T')[0]}
                  value={booking.date} onChange={e=>setBooking({...booking,date:e.target.value})}
                  className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-heritage-yellow text-sm"/>
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-heritage-parchment/60 block mb-2">Time</label>
                <select required value={booking.time} onChange={e=>setBooking({...booking,time:e.target.value})}
                  className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-heritage-yellow text-sm">
                  <option value="" className="text-gray-800">Select</option>
                  {['12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM',
                    '7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM','9:30 PM','10:00 PM'].map(t=>(
                    <option key={t} value={t} className="text-gray-800">{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-widest text-heritage-parchment/60 block mb-2">Party Size</label>
              <div className="relative">
                <Users size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"/>
                <select value={booking.guests} onChange={e=>setBooking({...booking,guests:e.target.value})}
                  className="w-full bg-white/15 border border-white/25 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-heritage-yellow text-sm">
                  {[1,2,3,4,5,6,7,8].map(n=>(
                    <option key={n} value={n} className="text-gray-800">{n} Guest{n>1?'s':''}</option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit"
              className="w-full bg-whatsapp-green text-white py-4 rounded-2xl font-semibold hover:bg-green-600 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg mt-2">
              <Send size={17}/> Confirm via WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* ══════════════════════════ VISIT ══════════════════════════ */}
      <section id="visit" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <p className="text-heritage-yellow uppercase tracking-widest text-[11px] font-semibold mb-3">Find Us</p>
            <h2 className="text-4xl md:text-5xl font-serif text-heritage-maroon">Visit Us</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Info cards */}
            <div className="space-y-5">
              {[
                {
                  icon: <MapPin size={20} className="text-heritage-maroon"/>,
                  title: 'Address',
                  content: (
                    <>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">{RESTAURANT_INFO.address}</p>
                      <div className="flex flex-wrap gap-3">
                        <a href={RESTAURANT_INFO.gmapsLink} target="_blank" rel="noreferrer"
                          className="text-xs font-semibold text-heritage-maroon bg-heritage-maroon/10 px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-heritage-maroon/20 transition-colors">
                          <Navigation size={13}/> Get Directions
                        </a>
                        <button onClick={copyAddr}
                          className="text-xs font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-gray-200 transition-colors">
                          <Share2 size={13}/> {copiedAddr ? '✓ Copied!' : 'Copy Address'}
                        </button>
                      </div>
                    </>
                  )
                },
                {
                  icon: <Clock size={20} className="text-heritage-maroon"/>,
                  title: 'Opening Hours',
                  content: (
                    <>
                      <p className="text-gray-600 text-sm font-medium">{RESTAURANT_INFO.hours}</p>
                      <p className="text-gray-400 text-xs mt-1">Open every day of the week</p>
                    </>
                  )
                },
                {
                  icon: <Phone size={20} className="text-heritage-maroon"/>,
                  title: 'Contact & Pricing',
                  content: (
                    <>
                      <a href={`tel:+${RESTAURANT_INFO.phone}`}
                        className="text-gray-700 text-sm font-semibold hover:text-heritage-maroon transition-colors">
                        {RESTAURANT_INFO.displayPhone}
                      </a>
                      <p className="text-gray-400 text-xs mt-1">{RESTAURANT_INFO.priceRange}</p>
                    </>
                  )
                }
              ].map((card,i)=>(
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-5 hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 rounded-full bg-heritage-yellow/20 flex items-center justify-center flex-shrink-0">
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-heritage-navy mb-2">{card.title}</h4>
                    {card.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[420px] relative">
              <iframe
                title="Story of Kolkata Location"
                src="https://maps.google.com/maps?q=1st+Floor+MIG+134+KHB+Colony+5th+Block+Koramangala+Bengaluru&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%"
                style={{border:0}} allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"/>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ FOOTER ══════════════════════════ */}
      <footer className="bg-heritage-navy text-heritage-parchment pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-serif font-bold text-heritage-yellow mb-3">Story of Kolkata</h3>
              <p className="text-sm text-heritage-parchment/60 leading-relaxed mb-5 max-w-xs">
                Bringing the culinary heritage of Bengal to the heart of Koramangala, Bengaluru.
              </p>
              <div className="flex gap-3">
                {[['Instagram', RESTAURANT_INFO.instagramLink],['Facebook', RESTAURANT_INFO.facebookLink]].map(([name,href])=>(
                  <a key={name} href={href}
                    className="px-4 py-2 border border-white/20 rounded-full text-xs font-medium hover:border-heritage-yellow hover:text-heritage-yellow transition-all">
                    {name}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-serif font-bold text-heritage-yellow mb-5">Quick Links</h4>
              <div className="space-y-3">
                {[['#about','Our Heritage'],['#menu','The Menu'],['#gallery','Gallery'],['#reviews','Reviews'],['#visit','Visit Us']].map(([h,l])=>(
                  <a key={h} href={h} className="block text-sm text-heritage-parchment/60 hover:text-heritage-yellow transition-colors">{l}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-serif font-bold text-heritage-yellow mb-5">Get in Touch</h4>
              <div className="space-y-4 text-sm text-heritage-parchment/60">
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-heritage-yellow flex-shrink-0"/>
                  <a href={`tel:+${RESTAURANT_INFO.phone}`} className="hover:text-heritage-yellow transition-colors">
                    {RESTAURANT_INFO.displayPhone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={14} className="text-heritage-yellow flex-shrink-0"/>
                  <span>{RESTAURANT_INFO.hours}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-heritage-yellow flex-shrink-0 mt-0.5"/>
                  <span>5th Block, Koramangala, Bengaluru</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle size={14} className="text-heritage-yellow flex-shrink-0"/>
                  <button onClick={()=>whatsapp()} className="hover:text-heritage-yellow transition-colors text-left">
                    WhatsApp Us
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-heritage-parchment/30">
            <span>© {new Date().getFullYear()} Story of Kolkata. All rights reserved.</span>
            <span>Designed with ❤️ for Old Calcutta</span>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════ FLOATING WHATSAPP (Desktop) ══════════════════════════ */}
      <button onClick={()=>whatsapp()}
        className="hidden md:flex fixed bottom-8 right-8 z-50 bg-whatsapp-green text-white w-14 h-14 rounded-full shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        aria-label="Chat on WhatsApp">
        <MessageCircle size={26}/>
      </button>

      {/* ══════════════════════════ MOBILE ACTION BAR ══════════════════════════ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-2px_16px_rgba(0,0,0,0.12)] grid grid-cols-3">
        <a href={`tel:+${RESTAURANT_INFO.phone}`}
          className="py-3 flex flex-col items-center justify-center gap-0.5 text-heritage-navy border-r border-gray-100 active:bg-gray-50">
          <Phone size={18}/>
          <span className="text-[9px] font-bold uppercase tracking-wider">Call</span>
        </a>
        <button onClick={()=>whatsapp()}
          className="py-3 flex flex-col items-center justify-center gap-0.5 text-whatsapp-green border-r border-gray-100 active:bg-gray-50">
          <MessageCircle size={18}/>
          <span className="text-[9px] font-bold uppercase tracking-wider">WhatsApp</span>
        </button>
        <a href={RESTAURANT_INFO.orderLink} target="_blank" rel="noreferrer"
          className="py-3 flex flex-col items-center justify-center gap-0.5 text-swiggy-orange active:bg-gray-50">
          <ShoppingBag size={18}/>
          <span className="text-[9px] font-bold uppercase tracking-wider">Order Now</span>
        </a>
      </div>

    </div>
  );
}
