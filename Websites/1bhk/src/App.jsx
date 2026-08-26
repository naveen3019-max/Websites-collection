import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Star, Music, Menu as MenuIcon, X, ChevronRight, Camera, Globe, Calendar, Users } from 'lucide-react';

const RESTAURANT_INFO = {
  name: "1 Bar House Kitchen",
  shortName: "1BHK",
  concept: "Bungalow bar. Bold kitchen. Live every weekend.",
  address: "#56, Raj Villa, 5th Cross, 60 Feet Road, 6th Block, Koramangala, Bengaluru 560095",
  phone: "+91 95914 26566",
  hours: "Daily, 12:00 PM – 12:00 AM",
  rating: 4.3,
  reviewsCount: "3,423+",
  costForTwo: "₹1,400–1,600",
  swiggyUrl: "https://www.swiggy.com/restaurants/1-bhk-koramangala-bangalore-499477/dineout",
  mapUrl: "https://maps.google.com/?q=1+Bar+House+Kitchen+Koramangala",
  whatsappNumber: "919591426566",
};

const LIVE_MUSIC = {
  nextAct: "The Vinyl Records",
  date: "Friday, 8:00 PM",
  genre: "Indie Rock & Retro"
};

const MENU_CATEGORIES = ["Starters", "Wood-fired Pizzas", "Mains", "Bar Food", "Cocktails & Bar", "Desserts"];

const MENU = [
  { category: "Starters", name: "Goan Chorizo Poi", desc: "Spicy Goan sausage stuffed in traditional local bread.", price: "₹395" },
  { category: "Starters", name: "Ghee Roast Prawns", desc: "Mangalorean style spicy ghee roast with curry leaves.", price: "₹495" },
  { category: "Wood-fired Pizzas", name: "Truffle Mushroom", desc: "Wild mushrooms, truffle oil, mozzarella, parmesan.", price: "₹645" },
  { category: "Wood-fired Pizzas", name: "Pepperoni & Hot Honey", desc: "Italian pepperoni, jalapeños, drizzle of hot honey.", price: "₹695" },
  { category: "Mains", name: "Anglo-Indian Mutton Stew", desc: "Slow-cooked mutton with root vegetables and appam.", price: "₹595" },
  { category: "Mains", name: "Spinach & Ricotta Ravioli", desc: "Handmade pasta in burnt butter sage sauce.", price: "₹525" },
  { category: "Bar Food", name: "Peri Peri Fries", desc: "Crispy fries tossed in house peri-peri mix.", price: "₹245" },
  { category: "Bar Food", name: "Gunpowder Chicken Bites", desc: "Fried chicken tossed in spicy Andhra gunpowder.", price: "₹345" },
  { category: "Bar Food", name: "Crispy Lotus Stem", desc: "Honey chilli glazed lotus stem with sesame seeds.", price: "₹295" },
  { category: "Cocktails & Bar", name: "Koramangala Sunset", desc: "Gin, fresh grapefruit, rosemary, tonic.", price: "₹495" },
  { category: "Cocktails & Bar", name: "Smoked Old Fashioned", desc: "Bourbon, hickory smoke, bitters, orange peel.", price: "₹595" },
  { category: "Cocktails & Bar", name: "Bungalow Basil Smash", desc: "Vodka, fresh basil, lime, simple syrup.", price: "₹450" },
  { category: "Desserts", name: "Filter Coffee Tiramisu", desc: "Classic tiramisu infused with strong South Indian filter coffee.", price: "₹345" },
  { category: "Desserts", name: "Serradura", desc: "Traditional Goan sawdust pudding with crushed biscuits and cream.", price: "₹295" },
  { category: "Desserts", name: "Dark Chocolate Fondant", desc: "Warm gooey center with vanilla bean ice cream.", price: "₹395" }
];

const GALLERY = [
  { url: "/hero_restaurant_1787732600012.png", alt: "Premium Bar Interior" },
  { url: "/food_pizza_1787732665713.png", alt: "Wood fired pizza" },
  { url: "/live_music_1787732719169.png", alt: "Live music band playing" },
  { url: "/courtyard_restaurant_1787732649646.png", alt: "Outdoor courtyard seating" },
  { url: "https://images.unsplash.com/photo-1554679665-f5537f187268?auto=format&fit=crop&w=800&q=80", alt: "Heritage bungalow exterior" },
  { url: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80", alt: "Craft cocktails on the bar" },
];

const REVIEWS = [
  { name: "Rahul S.", text: "The courtyard vibe is unmatched in Koramangala. Perfect mix of heritage feel and great music.", rating: 5 },
  { name: "Priya M.", text: "Wood-fired pizzas and cocktails were spot on. The live band on Saturday night made the evening.", rating: 5 },
  { name: "Arun K.", text: "Beautiful bungalow setting. Great service and the Goan Chorizo Poi is a must-try!", rating: 4 },
];

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState(MENU_CATEGORIES[0]);
  const [isScrolled, setIsScrolled] = useState(false);

  // Reservation Form State
  const [resForm, setResForm] = useState({ name: '', date: '', time: '', guests: '2', preference: 'Courtyard' });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppBooking = (e) => {
    e.preventDefault();
    const message = `Hi 1BHK, I'd like to book a table.\n\nName: ${resForm.name}\nDate: ${resForm.date}\nTime: ${resForm.time}\nGuests: ${resForm.guests}\nSeating Preference: ${resForm.preference}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  const defaultWhatsAppClick = () => {
    const encoded = encodeURIComponent("Hi, I'd like to book a table at 1BHK");
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  const NavLinks = () => (
    <>
      <a href="#about" className="hover:text-amber transition-colors font-medium text-sm tracking-wide uppercase">About</a>
      <a href="#live-music" className="hover:text-amber transition-colors font-medium text-sm tracking-wide uppercase">Live Music</a>
      <a href="#menu" className="hover:text-amber transition-colors font-medium text-sm tracking-wide uppercase">Menu</a>
      <a href="#gallery" className="hover:text-amber transition-colors font-medium text-sm tracking-wide uppercase">Gallery</a>
      <a href="#visit" className="hover:text-amber transition-colors font-medium text-sm tracking-wide uppercase">Visit</a>
    </>
  );

  return (
    <div className="min-h-screen bg-charcoal text-cream font-sans scroll-smooth relative">
      {/* Background Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-[0.03]">
        <span className="text-[25vw] font-display font-bold text-white whitespace-nowrap rotate-[-15deg] select-none">
          1BHK KORAMANGALA
        </span>
      </div>

      <div className="relative z-10">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-charcoal/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="font-display text-3xl font-bold tracking-tight text-cream">
            1BHK<span className="text-amber">.</span>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <a href={RESTAURANT_INFO.swiggyUrl} target="_blank" rel="noreferrer" className="bg-[#FC8019] text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
              Order on Swiggy
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-cream" onClick={() => setIsNavOpen(!isNavOpen)}>
            {isNavOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isNavOpen && (
          <div className="absolute top-full left-0 w-full bg-charcoal/95 backdrop-blur-md border-t border-white/10 md:hidden flex flex-col items-center py-6 space-y-6 shadow-xl">
            <NavLinks />
            <a href={RESTAURANT_INFO.swiggyUrl} target="_blank" rel="noreferrer" className="bg-[#FC8019] text-white px-6 py-2.5 rounded-full font-semibold w-3/4 text-center">
              Order on Swiggy
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/hero_restaurant_1787732600012.png" alt="1BHK Interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight">
            1 Bar House Kitchen
          </h1>
          <p className="text-xl md:text-2xl text-cream/90 mb-10 font-light tracking-wide">
            {RESTAURANT_INFO.concept}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={defaultWhatsAppClick} className="w-full sm:w-auto bg-bottle-green text-white px-8 py-3.5 rounded-full font-semibold text-lg hover:bg-green-800 transition-all flex items-center justify-center gap-2 group">
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Book a Table
            </button>
            <a href={RESTAURANT_INFO.swiggyUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-transparent border-2 border-[#FC8019] text-[#FC8019] hover:bg-[#FC8019] hover:text-white px-8 py-3.5 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2">
              Order on Swiggy
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-amber text-sm font-bold tracking-widest uppercase mb-3">Our Story</h2>
                <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight">A heritage bungalow turned vibrant kitchen & bar.</h3>
              </div>
              <p className="text-lg text-cream/80 leading-relaxed font-light">
                Nestled in the heart of Koramangala, 1BHK offers an escape from the ordinary. Whether you're looking for a cozy corner indoors, al fresco dining in our lush courtyard, or sunset cocktails on the terrace, we bring together the warmth of a heritage bungalow with the lively energy of a modern bar.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="border-l-2 border-amber pl-4">
                  <h4 className="font-display text-2xl font-bold mb-1">200+</h4>
                  <p className="text-cream/60 text-sm">Seating Capacity</p>
                </div>
                <div className="border-l-2 border-amber pl-4">
                  <h4 className="font-display text-2xl font-bold mb-1">4</h4>
                  <p className="text-cream/60 text-sm">Unique Dining Zones</p>
                </div>
              </div>
            </div>
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <img src="/courtyard_restaurant_1787732649646.png" alt="Bungalow exterior" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-xl font-display font-medium text-amber">The Courtyard</p>
                <p className="text-cream/80 text-sm">Our most loved outdoor seating space.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Private Events Section */}
      <section className="py-20 px-6 bg-amber text-charcoal relative">
        <div className="container mx-auto max-w-5xl text-center">
          <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Host Your Private Event</h2>
          <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto mb-8 opacity-90">
            From intimate birthday gatherings in our AC indoors to large corporate parties in the Courtyard. 
            We offer custom food packages and dedicated bar service.
          </p>
          <button onClick={defaultWhatsAppClick} className="bg-charcoal text-cream px-8 py-3 rounded-full font-bold hover:bg-black transition-colors shadow-lg">
            Inquire Now
          </button>
        </div>
      </section>

      {/* Live Music Section */}
      <section id="live-music" className="py-24 bg-bottle-green/20 relative border-y border-white/5">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <Music className="w-12 h-12 text-amber mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Live Music Weekends</h2>
          <p className="text-xl text-cream/80 mb-12 max-w-2xl mx-auto font-light">
            Experience the best local bands and acoustic artists every weekend. Pair great music with our signature cocktails for the perfect night out.
          </p>
          
          <div className="bg-charcoal/50 border border-white/10 rounded-2xl p-8 max-w-xl mx-auto backdrop-blur-sm">
            <h3 className="text-amber font-bold tracking-widest uppercase text-sm mb-2">Up Next</h3>
            <p className="text-3xl font-display font-bold mb-2">{LIVE_MUSIC.nextAct}</p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-cream/70 mb-8">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {LIVE_MUSIC.date}</span>
              <span className="flex items-center gap-2"><Music className="w-4 h-4" /> {LIVE_MUSIC.genre}</span>
            </div>
            <button onClick={defaultWhatsAppClick} className="bg-amber text-charcoal px-8 py-3 rounded-full font-bold hover:bg-yellow-500 transition-colors inline-flex items-center gap-2">
              Ask About Lineup & Book <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-amber text-sm font-bold tracking-widest uppercase mb-3">Our Menu</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Bold Flavors. Crafted Drinks.</h3>
          </div>

          {/* Menu Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-12 pb-2 justify-start md:justify-center">
            {MENU_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveMenuTab(category)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeMenuTab === category 
                    ? 'bg-amber text-charcoal' 
                    : 'bg-white/5 text-cream hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 animate-fade-in">
            {MENU.filter(item => item.category === activeMenuTab).map((item, idx) => (
              <div key={idx} className="group border-b border-white/5 pb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-xl font-display font-bold group-hover:text-amber transition-colors">{item.name}</h4>
                  <span className="text-lg font-medium text-amber ml-4">{item.price}</span>
                </div>
                <p className="text-cream/60 text-sm font-light leading-relaxed pr-8">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
             <a href={RESTAURANT_INFO.swiggyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#FC8019] font-semibold hover:text-orange-400 transition-colors border-b border-transparent hover:border-current pb-1">
               Order full menu on Swiggy <ChevronRight className="w-4 h-4" />
             </a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-black/20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-amber text-sm font-bold tracking-widest uppercase mb-3">Gallery</h2>
              <h3 className="text-4xl font-display font-bold">The 1BHK Vibe</h3>
            </div>
            <a href={`https://instagram.com`} target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-cream hover:text-amber transition-colors">
              <Camera className="w-5 h-5" /> Follow Us
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group">
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-medium text-lg px-4 text-center">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 text-white/5">
          <Star className="w-96 h-96 fill-current" />
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
             <h3 className="text-4xl md:text-5xl font-display font-bold mb-4">Loved by Bengaluru</h3>
             <div className="flex items-center justify-center gap-2 text-xl">
               <span className="font-bold">{RESTAURANT_INFO.rating}</span>
               <div className="flex text-amber">
                 {[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < Math.floor(RESTAURANT_INFO.rating) ? 'fill-current' : 'opacity-30'}`} />)}
               </div>
               <span className="text-cream/60 text-sm ml-2">from {RESTAURANT_INFO.reviewsCount} Google Reviews</span>
             </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                <div className="flex text-amber mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-cream/90 text-lg mb-6 leading-relaxed italic">"{review.text}"</p>
                <p className="font-display font-bold text-amber">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit & Reservation Section */}
      <section id="visit" className="py-24 bg-white/5 border-t border-white/10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Info & Map */}
            <div>
              <h2 className="text-4xl font-display font-bold mb-8">Visit Us</h2>
              <div className="space-y-8 mb-10">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-amber shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Location</h4>
                    <p className="text-cream/70 leading-relaxed mb-3">{RESTAURANT_INFO.address}</p>
                    <a href={RESTAURANT_INFO.mapUrl} target="_blank" rel="noreferrer" className="text-amber text-sm font-semibold hover:underline">Get Directions &rarr;</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-amber shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Hours</h4>
                    <p className="text-cream/70">{RESTAURANT_INFO.hours}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-amber shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Contact</h4>
                    <p className="text-cream/70 mb-1">{RESTAURANT_INFO.phone}</p>
                    <p className="text-cream/50 text-sm">Valet parking available</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full h-64 bg-white/10 rounded-xl overflow-hidden relative">
                {/* Embedded Map Placeholder */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5912443026116!2d77.61661647466872!3d12.934005087378032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144e5917c0a7%3A0xc3cf3f9cb907b897!2s1BHK%20-%20Bar%20House%20Kitchen!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0" title="1BHK Map"
                ></iframe>
              </div>
            </div>

            {/* Reservation Form */}
            <div className="bg-charcoal border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-bottle-green/20 rounded-bl-full -mr-8 -mt-8"></div>
               
               <h3 className="text-3xl font-display font-bold mb-2">Book a Table</h3>
               <p className="text-cream/60 mb-8 font-light text-sm">Fill in the details and we'll confirm your reservation via WhatsApp instantly.</p>
               
               <form onSubmit={handleWhatsAppBooking} className="space-y-5 relative z-10">
                 <div>
                   <label className="block text-xs font-bold text-cream/70 uppercase tracking-wider mb-2">Name</label>
                   <input type="text" required value={resForm.name} onChange={e => setResForm({...resForm, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-amber transition-colors" placeholder="John Doe" />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-5">
                   <div>
                     <label className="block text-xs font-bold text-cream/70 uppercase tracking-wider mb-2">Date</label>
                     <input type="date" required value={resForm.date} onChange={e => setResForm({...resForm, date: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-amber transition-colors [color-scheme:dark]" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-cream/70 uppercase tracking-wider mb-2">Time</label>
                     <input type="time" required value={resForm.time} onChange={e => setResForm({...resForm, time: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-amber transition-colors [color-scheme:dark]" />
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-5">
                   <div>
                     <label className="block text-xs font-bold text-cream/70 uppercase tracking-wider mb-2">Guests</label>
                     <select value={resForm.guests} onChange={e => setResForm({...resForm, guests: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-amber transition-colors appearance-none">
                       {[1,2,3,4,5,6,7,8,9,10, "10+"].map(num => <option key={num} value={num} className="bg-charcoal">{num} People</option>)}
                     </select>
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-cream/70 uppercase tracking-wider mb-2">Seating</label>
                     <select value={resForm.preference} onChange={e => setResForm({...resForm, preference: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-amber transition-colors appearance-none">
                       <option value="Courtyard" className="bg-charcoal">Courtyard</option>
                       <option value="Terrace" className="bg-charcoal">Terrace</option>
                       <option value="Indoor AC" className="bg-charcoal">Indoor AC</option>
                       <option value="Bar" className="bg-charcoal">Bar</option>
                     </select>
                   </div>
                 </div>

                 <button type="submit" className="w-full bg-[#25D366] text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors mt-4 flex items-center justify-center gap-2">
                   <Phone className="w-5 h-5" /> Book via WhatsApp
                 </button>
               </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 py-12 px-6 border-t border-white/10 text-center md:text-left pb-28 md:pb-12">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-cream mb-2">1BHK<span className="text-amber">.</span></h2>
            <p className="text-cream/50 text-sm">© {new Date().getFullYear()} 1 Bar House Kitchen. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber hover:text-charcoal transition-colors">
              <Camera className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber hover:text-charcoal transition-colors">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-cream/30 text-xs font-mono uppercase tracking-widest border-t border-white/5 pt-8">
          Crafted with ♥ by Antigravity
        </div>
      </footer>

      {/* Floating Mobile Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-charcoal/95 backdrop-blur-md border-t border-white/10 p-3 flex gap-3 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        <button onClick={defaultWhatsAppClick} className="flex-1 bg-[#25D366] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" /> Book
        </button>
        <a href={RESTAURANT_INFO.swiggyUrl} target="_blank" rel="noreferrer" className="flex-1 bg-[#FC8019] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
           Order Swiggy
        </a>
      </div>
      
      {/* Floating WhatsApp Bubble (Desktop) */}
      <button onClick={defaultWhatsAppClick} className="hidden md:flex fixed bottom-8 right-8 bg-[#25D366] text-white w-14 h-14 rounded-full items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group">
        <Phone className="w-6 h-6" />
        <span className="absolute right-full mr-4 bg-white text-charcoal px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Chat with us
        </span>
      </button>

      </div>
    </div>
  );
}

export default App;
