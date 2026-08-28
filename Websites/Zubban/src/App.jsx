import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Clock, Phone, Star, ArrowRight, Check, MessageCircle, ExternalLink } from 'lucide-react';

// --- DATA CONSTANTS ---

const RESTAURANT = {
  name: "Zubaan - West Asian Kitchen",
  tagline: "Dim lights. West Asian flavors. Slow evenings.",
  address: "465/C, 17th G Main Road, 6th Block, Koramangala, Bengaluru, Karnataka 560095",
  phone: "+91 77600 40004",
  whatsapp: "+917760040004",
  hours: "Daily, 8:30 AM – 12:00 AM",
  rating: 4.2,
  reviewsCount: "1,068+",
  costForTwo: "₹400–1,400 for two",
  swiggyLink: "#", // Placeholder until confirmed
  instagram: "#",
};

const MENU_CATEGORIES = [
  "Cold & Hot Meze", "Grills & Kebabs", "Mandi & Rice", 
  "Shawarma & Wraps", "Breads", "Desserts", "Beverages"
];

const MENU_ITEMS = [
  { name: "Cold Meze Platter", category: "Cold & Hot Meze", price: "₹450", desc: "Hummus, Baba Ganoush, Muhammara, Labneh, served with warm pita.", signature: true },
  { name: "Hummus Beiruti", category: "Cold & Hot Meze", price: "₹250", desc: "Classic hummus blended with garlic, parsley, and lemon.", signature: false },
  { name: "Falafel (6 pcs)", category: "Cold & Hot Meze", price: "₹220", desc: "Crispy fried chickpea patties with tahini sauce.", signature: false },
  
  { name: "Non-veg Mix Grill Platter", category: "Grills & Kebabs", price: "₹850", desc: "Assortment of Shish Tawook, Lamb Kebab, and Adana Kebab.", signature: true },
  { name: "Adana Kebab", category: "Grills & Kebabs", price: "₹400", desc: "Spiced minced lamb grilled on skewers, served with sumac onions.", signature: false },
  { name: "Chicken Shish Tawook", category: "Grills & Kebabs", price: "₹380", desc: "Marinated chicken breast cubes, charcoal-grilled.", signature: false },
  
  { name: "Chicken Mandi", category: "Mandi & Rice", price: "₹480", desc: "Slow-cooked aromatic rice with tender spiced chicken.", signature: true },
  { name: "Mutton Mandi", category: "Mandi & Rice", price: "₹550", desc: "Traditional Yemeni rice dish with slow-roasted mutton.", signature: false },
  
  { name: "Chicken Shawarma Wrap", category: "Shawarma & Wraps", price: "₹200", desc: "Thinly sliced chicken with garlic sauce and pickles in pita.", signature: false },
  { name: "Falafel Wrap", category: "Shawarma & Wraps", price: "₹180", desc: "Crispy falafel with tahini, tomatoes, and parsley.", signature: false },
  
  { name: "Turkish Lahmacun", category: "Breads", price: "₹250", desc: "Thin crisp flatbread topped with minced meat, vegetables, and herbs.", signature: true },
  { name: "Lebanese Pita", category: "Breads", price: "₹60", desc: "Freshly baked soft pita bread.", signature: false },
  
  { name: "Baklava", category: "Desserts", price: "₹300", desc: "Rich, sweet pastry made of layers of filo filled with chopped nuts and syrup.", signature: true },
  { name: "Kunafa", category: "Desserts", price: "₹350", desc: "Traditional Middle Eastern dessert made with spun pastry and cheese.", signature: false },
  
  { name: "Turkish Coffee", category: "Beverages", price: "₹150", desc: "Finely ground, unfiltered coffee.", signature: false },
  { name: "Mint Ayran", category: "Beverages", price: "₹120", desc: "Refreshing yogurt-based drink with mint.", signature: false },
];

const REVIEWS = [
  { author: "Priya S.", text: "The candlelight dinner setup was absolutely magical. The dim lighting and soft ghazals made it a perfect anniversary evening. Highly recommend the Mix Grill!", rating: 5 },
  { author: "Rahul M.", text: "Authentic Middle Eastern flavors. The Cold Meze platter took me straight back to Dubai. Small place, so definitely book ahead on weekends.", rating: 5 },
  { author: "Anjali T.", text: "Very cozy vibe. The Mandi is flavorful and portions are generous. The service is polite and unintrusive. Great date spot.", rating: 4 },
];

// --- COMPONENTS ---

const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-12 animate-fade-in">
    <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4">{title}</h2>
    {subtitle && <p className="text-cream/70 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    <div className="w-24 h-1 bg-secondary mx-auto mt-6 rounded-full opacity-50"></div>
  </div>
);

const WhatsAppButton = ({ text = "Reserve a Table", icon = true, message = "Hi, I'd like to reserve a table at Zubaan", className = "" }) => {
  const url = `https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(message)}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" 
       className={`inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-base font-semibold py-3 px-6 rounded-lg transition-all ${className}`}>
      {icon && <MessageCircle size={20} />}
      {text}
    </a>
  );
};

const SwiggyButton = ({ text = "Order on Swiggy", className = "" }) => (
  <a href={RESTAURANT.swiggyLink} target="_blank" rel="noopener noreferrer" 
     className={`inline-flex items-center justify-center gap-2 bg-[#FC8019] hover:bg-[#e67315] text-white font-semibold py-3 px-6 rounded-lg transition-all ${className}`}>
    <ExternalLink size={20} />
    {text}
  </a>
);

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

// --- MAIN APP ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState(MENU_CATEGORIES[0]);
  
  // Reservation form state
  const [resForm, setResForm] = useState({ name: '', date: '', time: '', guests: '2', occasion: 'Casual Dining' });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    const msg = `Hi Zubaan! I'd like to make a reservation:
Name: ${resForm.name}
Date: ${resForm.date}
Time: ${resForm.time}
Guests: ${resForm.guests}
Occasion: ${resForm.occasion}`;
    window.open(`https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-base pattern-bg font-sans selection:bg-primary/30 text-cream">
      
      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-primary">
            ZUBAAN<span className="text-secondary text-4xl leading-none">.</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#menu" className="hover:text-primary transition-colors">Menu</a>
            <a href="#candlelight" className="hover:text-primary transition-colors">Candlelight</a>
            <a href="#gallery" className="hover:text-primary transition-colors">Gallery</a>
            <a href="#visit" className="hover:text-primary transition-colors">Visit</a>
          </div>

          <div className="hidden md:flex gap-4">
            <SwiggyButton text="Order" className="py-2 px-4 text-sm" />
          </div>

          <button className="md:hidden text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full glass-nav flex flex-col p-6 gap-6 md:hidden">
            {['About', 'Menu', 'Candlelight', 'Gallery', 'Visit'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}
                 className="text-lg uppercase tracking-widest hover:text-primary text-center">
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <header className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Subtle radial gradient to simulate candlelight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-base to-base z-0"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8 animate-fade-in text-sm text-primary">
            <Star className="fill-primary" size={16} />
            <span className="font-semibold">{RESTAURANT.rating}</span>
            <span className="text-cream/70">({RESTAURANT.reviewsCount} Reviews)</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight animate-fade-in-delayed">
            West Asian flavors.<br/>
            <span className="text-primary italic">Slow evenings.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-cream/80 font-light mb-12 max-w-2xl animate-fade-in-delayed delay-500">
            A cozy, dimly-lit haven in Koramangala serving authentic Middle Eastern, Turkish & Lebanese cuisine.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delayed delay-700">
            <WhatsAppButton text="Reserve a Table" className="py-4 px-8 text-lg" />
            <SwiggyButton className="py-4 px-8 text-lg" />
          </div>
          <p className="mt-4 text-xs text-cream/50 uppercase tracking-widest animate-fade-in-delayed delay-1000">Limited seating — Reservations recommended</p>
        </div>
      </header>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-4xl text-primary">The Concept</h2>
              <div className="w-16 h-1 bg-secondary rounded-full opacity-50"></div>
              <p className="text-lg text-cream/80 leading-relaxed font-light">
                Zubaan was born out of a desire to translate the intimate, warm hospitality of West Asia into a dining experience in Bengaluru. 
              </p>
              <p className="text-lg text-cream/80 leading-relaxed font-light">
                Unlike bustling, bright eateries, we lean into the mood—dim lighting, flickering candles, and the soft strains of ghazals and traditional instrumentals. Our menu is a curated journey through mezze platters, charcoal-grilled meats, and fragrant mandi, meant to be shared over slow, lingering conversations.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] bg-base border border-primary/20 rounded-lg overflow-hidden">
                <img src="/images/about_interior.jpg" alt="Cozy interior shot with dim lighting" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] bg-base border border-primary/20 rounded-lg overflow-hidden mt-12">
                <img src="/images/about_platter.jpg" alt="Platter of food on dark wood table" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CANDLELIGHT DINNER SECTION */}
      <section id="candlelight" className="py-24 px-6 bg-[#151210] relative border-y border-primary/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <SectionTitle title="Candlelight Dinners" subtitle="Our signature bookable experience for special occasions." />
          
          <p className="text-lg text-cream/70 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Elevate your evening with our exclusive candlelight setup. Perfect for anniversaries, birthdays, or intimate dates, we prepare a specially decorated table in our quietest corner, complete with floral accents and dedicated service.
          </p>
          
          <div className="glass-card p-8 max-w-lg mx-auto text-left">
            <h3 className="font-serif text-2xl text-primary mb-6 text-center">Request a Setup</h3>
            <form onSubmit={handleReservationSubmit} className="space-y-4">
              <input required type="text" placeholder="Your Name" value={resForm.name} onChange={e=>setResForm({...resForm, name: e.target.value})} className="w-full bg-base/50 border border-primary/20 rounded px-4 py-3 text-cream focus:border-primary outline-none transition-colors" />
              <div className="grid grid-cols-2 gap-4">
                <input required type="date" value={resForm.date} onChange={e=>setResForm({...resForm, date: e.target.value})} className="w-full bg-base/50 border border-primary/20 rounded px-4 py-3 text-cream focus:border-primary outline-none transition-colors [color-scheme:dark]" />
                <input required type="time" value={resForm.time} onChange={e=>setResForm({...resForm, time: e.target.value})} className="w-full bg-base/50 border border-primary/20 rounded px-4 py-3 text-cream focus:border-primary outline-none transition-colors [color-scheme:dark]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input required type="number" min="1" max="10" placeholder="Guests" value={resForm.guests} onChange={e=>setResForm({...resForm, guests: e.target.value})} className="w-full bg-base/50 border border-primary/20 rounded px-4 py-3 text-cream focus:border-primary outline-none transition-colors" />
                <select value={resForm.occasion} onChange={e=>setResForm({...resForm, occasion: e.target.value})} className="w-full bg-base/50 border border-primary/20 rounded px-4 py-3 text-cream focus:border-primary outline-none transition-colors appearance-none">
                  <option>Candlelight Dinner</option>
                  <option>Casual Dining</option>
                  <option>Celebration</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-base font-semibold py-4 rounded transition-colors flex items-center justify-center gap-2 mt-4">
                <MessageCircle size={20} /> Request via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <SectionTitle title="Our Menu" subtitle="A curated selection of Middle Eastern, Turkish & Lebanese classics." />
          
          {/* Menu Categories */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {MENU_CATEGORIES.map(category => (
              <button 
                key={category}
                onClick={() => setActiveMenuTab(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${activeMenuTab === category ? 'bg-secondary text-cream border border-secondary' : 'bg-transparent text-cream/60 border border-primary/20 hover:border-primary/50'}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 animate-fade-in">
            {MENU_ITEMS.filter(item => item.category === activeMenuTab).map((item, idx) => (
              <div key={idx} className="border-b border-primary/10 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-xl text-primary flex items-center gap-2">
                    {item.name}
                    {item.signature && <span className="bg-secondary/20 text-secondary text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-secondary/30">Signature</span>}
                  </h3>
                  <span className="font-semibold text-cream/90">{item.price}</span>
                </div>
                <p className="text-cream/60 text-sm font-light pr-12">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <SwiggyButton text="View Full Menu & Order" />
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 px-6 bg-[#151210]">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle title="Atmosphere & Fare" subtitle="A glimpse into the Zubaan experience." />
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square bg-base border border-primary/10 rounded overflow-hidden hover:border-primary/40 transition-colors">
              <img src="/images/gallery_meze.jpg" alt="Close up of Cold Meze Platter" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] col-span-2 bg-base border border-primary/10 rounded overflow-hidden hover:border-primary/40 transition-colors">
              <img src="/images/gallery_candlelit.jpg" alt="Romantic candlelit table setting for two" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] col-span-2 bg-base border border-primary/10 rounded overflow-hidden hover:border-primary/40 transition-colors">
              <img src="/images/gallery_wide_interior.jpg" alt="Wide shot of dimly lit restaurant interior" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-base border border-primary/10 rounded overflow-hidden hover:border-primary/40 transition-colors">
              <img src="/images/gallery_grill.jpg" alt="Mix Grill Platter sizzling" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <SectionTitle title="Guest Voices" subtitle="What our patrons say about their evenings at Zubaan." />
          
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="glass-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} className="fill-primary text-primary" />)}
                  </div>
                  <p className="text-cream/80 font-light italic leading-relaxed mb-6">"{review.text}"</p>
                </div>
                <p className="font-serif text-primary text-lg">— {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT SECTION */}
      <section id="visit" className="py-24 px-6 bg-[#151210] border-t border-primary/10">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title="Join Us" subtitle="" />
              
              <div className="space-y-8 mt-8">
                <div className="flex gap-4 items-start">
                  <MapPin className="text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif text-xl text-primary mb-2">Location</h4>
                    <p className="text-cream/70 font-light leading-relaxed">{RESTAURANT.address}</p>
                    <div className="flex gap-4 mt-4">
                      <button onClick={() => window.open('https://maps.google.com/?q=Zubaan+West+Asian+Kitchen+Koramangala', '_blank')} className="text-sm border border-primary/30 hover:border-primary px-4 py-2 rounded transition-colors">Get Directions</button>
                      <button onClick={() => navigator.clipboard.writeText(RESTAURANT.address)} className="text-sm border border-transparent text-primary hover:underline px-4 py-2">Copy Address</button>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <Clock className="text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif text-xl text-primary mb-2">Hours</h4>
                    <p className="text-cream/70 font-light">{RESTAURANT.hours}</p>
                    <p className="text-secondary text-sm mt-2 font-medium">Reservations highly recommended for evenings.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <Phone className="text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif text-xl text-primary mb-2">Contact</h4>
                    <p className="text-cream/70 font-light">{RESTAURANT.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="aspect-square md:aspect-[4/3] bg-base/50 border border-primary/20 rounded-xl overflow-hidden p-2">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.487922718104!2d77.618683!3d12.940562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzI2LjAiTiA3N8KwMzcnMDcuMyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{border:0, borderRadius: '0.5rem'}} 
                allowFullScreen="" 
                loading="lazy"
                title="Restaurant Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-base border-t border-primary/20 py-12 px-6 text-center">
        <a href="#" className="font-serif text-3xl font-bold tracking-wider text-primary mb-6 inline-block">
          ZUBAAN<span className="text-secondary text-4xl leading-none">.</span>
        </a>
        <p className="text-cream/50 text-sm mb-8">{RESTAURANT.tagline}</p>
        
        <div className="flex justify-center gap-6 mb-12">
          <a href={RESTAURANT.instagram} className="text-cream/60 hover:text-primary transition-colors"><InstagramIcon /></a>
          <a href={`tel:${RESTAURANT.phone.replace(/[^0-9+]/g, '')}`} className="text-cream/60 hover:text-primary transition-colors"><Phone /></a>
        </div>
        
        <div className="text-cream/40 text-xs flex flex-col md:flex-row justify-center gap-4 border-t border-primary/10 pt-8 max-w-2xl mx-auto">
          <span>&copy; {new Date().getFullYear()} Zubaan - West Asian Kitchen. All rights reserved.</span>
          <span>Designed with ❤️</span>
        </div>
      </footer>

      {/* FLOATING ACTION BAR (MOBILE) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full glass-nav flex border-t border-primary/20 z-50">
        <a href={`tel:${RESTAURANT.phone.replace(/[^0-9+]/g, '')}`} className="flex-1 flex flex-col items-center justify-center py-3 text-cream/80 hover:text-primary border-r border-primary/10">
          <Phone size={20} className="mb-1" />
          <span className="text-[10px] uppercase tracking-widest">Call</span>
        </a>
        <a href={`https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent("Hi, I'd like to reserve a table at Zubaan")}`} className="flex-1 flex flex-col items-center justify-center py-3 text-[#25D366] font-medium border-r border-primary/10 bg-[#25D366]/5">
          <MessageCircle size={20} className="mb-1" />
          <span className="text-[10px] uppercase tracking-widest">Reserve</span>
        </a>
        <a href={RESTAURANT.swiggyLink} className="flex-1 flex flex-col items-center justify-center py-3 text-[#FC8019] font-medium bg-[#FC8019]/5">
          <ExternalLink size={20} className="mb-1" />
          <span className="text-[10px] uppercase tracking-widest">Order</span>
        </a>
      </div>
      
    </div>
  );
}
