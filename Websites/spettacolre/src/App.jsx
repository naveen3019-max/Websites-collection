import React, { useState, useEffect } from 'react';
import { 
  Menu, X, MapPin, Phone, Clock, Star, Leaf, 
  MessageCircle, Navigation, ExternalLink, Utensils, 
  ChevronRight, Info
} from 'lucide-react';

// --- CONSTANTS ---
const RESTAURANT = {
  name: "Spettacolare",
  tagline: "Handmade pasta. Italian streets. All veg.",
  description: "A lively, all-vegetarian Italian street-food kitchen in Indiranagar. We believe in fresh, handmade pasta made visibly in-house, wood-fired pizza, and casual trattoria vibes. No stiff upper lip, just great food.",
  address: "208, Paramahansa Yogananda Road, Stage 2, Hoysala Nagar, Indiranagar, Bengaluru, Karnataka 560038",
  phone: "+91 93533 50092",
  phoneRaw: "919353350092",
  hours: "Daily, 12:00 PM – 12:00 AM",
  rating: "4.2",
  reviewsCount: "2,000+",
  costForTwo: "₹400–1,400 for two",
  zomatoLink: "https://www.zomato.com/bangalore/spettacolare-indiranagar", // Confirm exact link before publishing
  swiggyLink: "https://www.swiggy.com/restaurants/spettacolare-indiranagar", // Placeholder
};

const MENU = [
  {
    category: "Small Plates & Panzerotti",
    items: [
      { name: "Panzerotti Classico", desc: "Stuffed fried dough with tomato and mozzarella", price: "₹280", v: true },
      { name: "Caponata", desc: "Sweet and sour Sicilian eggplant relish with crusty bread", price: "₹310", v: true, vg: true },
      { name: "Bruschetta Pomodoro", desc: "Fresh tomatoes, garlic, basil on toasted house bread", price: "₹260", v: true, vg: true },
    ]
  },
  {
    category: "Pasta",
    note: "All pasta handmade in-house. Eggless options clearly marked.",
    items: [
      { name: "Fettuccine Puttanesca", desc: "Rich tomato sauce, olives, capers, chili (Eggless)", price: "₹450", v: true, vg: true, signature: true },
      { name: "Orecchiette in Limone Sauce", desc: "Fresh lemon zest, butter, parmesan, black pepper", price: "₹420", v: true },
      { name: "Mushroom Carbonara", desc: "Rich creamy sauce, pecorino, black pepper, shiitake bacon", price: "₹480", v: true, signature: true },
      { name: "Cashew-Cheese Aglio e Olio", desc: "Garlic, in-house chili oil, parsley, vegan cashew parmesan", price: "₹430", v: true, vg: true },
    ]
  },
  {
    category: "Pizza",
    items: [
      { name: "Margherita", desc: "San Marzano tomatoes, fresh mozzarella, basil", price: "₹450", v: true },
      { name: "Sun-Dried Nduja", desc: "Spicy vegetarian 'nduja', red onions, mozzarella", price: "₹520", v: true, signature: true },
      { name: "Vegan Ortolana", desc: "Zucchini, peppers, eggplant, vegan cheese, marinara", price: "₹490", v: true, vg: true },
    ]
  },
  {
    category: "Desserts & Granita",
    items: [
      { name: "Seasonal Granita", desc: "Crushed ice dessert, Sicilian style (Ask for today's flavor)", price: "₹220", v: true, vg: true },
      { name: "Classic Tiramisu", desc: "Mascarpone, espresso, ladyfingers", price: "₹350", v: true },
      { name: "Vegan Panna Cotta", desc: "Coconut milk based with berry compote", price: "₹310", v: true, vg: true },
    ]
  }
];

const REVIEWS = [
  { text: "The Puttanesca sauce was incredibly fresh. Hard to find such good handmade eggless pasta!", author: "Priya S." },
  { text: "Love the casual vibe. The vegan cashew cheese pasta actually tastes amazing, which is rare.", author: "Rahul M." },
  { text: "Great portions and the sun-dried nduja pizza is a must-try. Authentic street food feel.", author: "Ankita D." }
];

// --- HELPERS ---
const generateWhatsAppLink = (message) => {
  return `https://wa.me/${RESTAURANT.phoneRaw}?text=${encodeURIComponent(message)}`;
};

// --- COMPONENTS ---

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = ['About', 'Menu', 'Gallery', 'Reviews', 'Visit'];

  return (
    <nav className="fixed w-full bg-spetta-cream/95 backdrop-blur-sm z-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="font-display text-3xl text-spetta-red">Spettacolare</span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {links.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-stone-700 hover:text-spetta-red font-medium transition-colors">
                {link}
              </a>
            ))}
            <a href={RESTAURANT.zomatoLink} target="_blank" rel="noreferrer" className="bg-spetta-red text-white px-6 py-2.5 rounded-full font-bold hover:bg-red-700 transition-colors shadow-sm">
              Order Now
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-700 hover:text-spetta-red p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-spetta-cream border-b border-stone-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            {links.map(link => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
                className="text-stone-800 hover:bg-spetta-yellow/20 hover:text-spetta-red block px-3 py-3 rounded-md text-base font-medium"
              >
                {link}
              </a>
            ))}
            <a 
              href={RESTAURANT.zomatoLink}
              target="_blank" rel="noreferrer"
              className="bg-spetta-red text-white block px-3 py-3 rounded-md text-base font-bold text-center mt-4"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="pt-32 pb-20 px-4 md:pt-40 md:pb-28 bg-spetta-cream relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-spetta-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-spetta-green rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center space-x-4 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-spetta-green border border-green-200">
              <Leaf size={14} className="mr-1.5" /> 100% Vegetarian
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">
              Vegan Options
            </span>
          </div>
          
          <h1 className="font-display text-6xl md:text-8xl text-stone-900 mb-6 leading-tight tracking-wide uppercase">
            Italian Streets.<br/>
            <span className="text-spetta-red text-shadow-sm">Handmade Pasta.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-stone-600 mb-10 max-w-2xl mx-auto md:mx-0">
            {RESTAURANT.tagline} A lively casual kitchen in Indiranagar.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <a 
              href={RESTAURANT.zomatoLink} 
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-md"
            >
              Order Online <ExternalLink size={18} className="ml-2" />
            </a>
            <a 
              href={generateWhatsAppLink("Hi, I'd like to enquire about a table at Spettacolare")} 
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-md"
            >
              <MessageCircle size={20} className="mr-2" /> Book via WhatsApp
            </a>
          </div>
          
          <div className="mt-10 flex justify-center md:justify-start items-center text-sm font-medium text-stone-500 space-x-2">
            <Star className="text-spetta-yellow fill-current" size={16} />
            <span>{RESTAURANT.rating} rating on delivery platforms</span>
            <span>•</span>
            <span>{RESTAURANT.costForTwo}</span>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md md:max-w-none">
           <div className="aspect-[4/3] rounded-[3rem] overflow-hidden relative shadow-2xl transform rotate-3 border-8 border-white">
              <img src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Fresh pasta dish" className="absolute inset-0 w-full h-full object-cover" />
           </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-square bg-spetta-yellow/20 rounded-3xl overflow-hidden relative border-4 border-spetta-yellow shadow-lg transform -rotate-3">
               <img src="https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Chef making fresh pasta" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
          <div className="pl-0 md:pl-10">
            <h2 className="font-display text-5xl text-spetta-green mb-6">Real Food.<br/>No Fuss.</h2>
            <p className="text-lg text-stone-700 mb-6 leading-relaxed">
              {RESTAURANT.description}
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-spetta-cream p-5 rounded-2xl border-l-4 border-spetta-yellow">
                <h4 className="font-bold text-xl mb-2 text-stone-900">Fresh Pasta</h4>
                <p className="text-stone-600 text-sm">Rolled and shaped by hand every single day.</p>
              </div>
              <div className="bg-spetta-cream p-5 rounded-2xl border-l-4 border-spetta-red">
                <h4 className="font-bold text-xl mb-2 text-stone-900">Vegan Friendly</h4>
                <p className="text-stone-600 text-sm">Dedicated cashew-cheese options and eggless pasta.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MenuSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="menu" className="py-24 bg-spetta-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl text-stone-900 mb-4 tracking-wide uppercase">The Menu</h2>
          <div className="h-1 w-24 bg-spetta-red mx-auto mb-6 rounded-full"></div>
          <p className="text-stone-600">Fresh ingredients, bold flavors, 100% vegetarian.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {MENU.map((category, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm md:text-base transition-all ${
                activeTab === idx 
                  ? 'bg-spetta-green text-white shadow-md' 
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-100">
          {MENU[activeTab].note && (
            <div className="flex items-start bg-blue-50 text-blue-800 p-4 rounded-xl mb-8 border border-blue-100">
              <Info size={20} className="mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{MENU[activeTab].note}</p>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {MENU[activeTab].items.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="flex justify-between items-baseline mb-2 border-b border-stone-200 pb-2 border-dashed">
                  <h3 className="font-display text-2xl text-stone-900 group-hover:text-spetta-red transition-colors flex items-center gap-2">
                    {item.name}
                  </h3>
                  <span className="font-bold text-lg text-spetta-green shrink-0 ml-4">{item.price}</span>
                </div>
                
                <p className="text-stone-600 text-sm mb-3 pr-8">{item.desc}</p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.signature && (
                    <span className="text-[10px] uppercase tracking-wider font-bold bg-spetta-yellow text-stone-900 px-2 py-0.5 rounded">
                      Guest Favorite
                    </span>
                  )}
                  {item.vg && (
                    <span className="text-[10px] uppercase tracking-wider font-bold border border-spetta-green text-spetta-green px-2 py-0.5 rounded">
                      VG
                    </span>
                  )}
                  {item.v && !item.vg && (
                    <span className="text-[10px] uppercase tracking-wider font-bold border border-stone-300 text-stone-500 px-2 py-0.5 rounded">
                      V
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center flex justify-center space-x-4 text-xs font-medium text-stone-400">
          <span className="flex items-center"><span className="border border-stone-300 px-1.5 py-0.5 rounded mr-1.5">V</span> Vegetarian</span>
          <span className="flex items-center"><span className="border border-spetta-green text-spetta-green px-1.5 py-0.5 rounded mr-1.5">VG</span> Vegan Option Available</span>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-5xl text-stone-900 mb-12 text-center tracking-wide uppercase">The Vibe</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2 row-span-2 bg-spetta-yellow/20 rounded-2xl overflow-hidden border border-spetta-yellow/30 relative">
            <img src="https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="High-energy kitchen tossing pasta" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="bg-spetta-red/10 rounded-2xl aspect-square overflow-hidden border border-spetta-red/20 relative">
            <img src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Close-up Fettuccine Puttanesca" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="bg-spetta-green/10 rounded-2xl aspect-square overflow-hidden border border-spetta-green/20 relative">
            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Wood-fired Pizza" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="col-span-2 md:col-span-2 bg-stone-100 rounded-2xl aspect-[2/1] overflow-hidden border border-stone-200 relative">
            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Casual trattoria seating with guests" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-spetta-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl text-stone-900 mb-4 tracking-wide uppercase">Word on the Street</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm transform transition-transform hover:-translate-y-2">
              <div className="flex text-spetta-red mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-current" />)}
              </div>
              <p className="text-stone-700 font-medium text-lg italic mb-6">"{review.text}"</p>
              <p className="text-stone-500 font-bold text-sm">— {review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Visit = () => {
  const [enquiry, setEnquiry] = useState({ name: '', date: '', time: '', size: '', preference: 'Vegetarian' });

  const handleWhatsAppEnquiry = (e) => {
    e.preventDefault();
    const msg = `Hi Spettacolare! I'd like to check table availability:
Name: ${enquiry.name}
Date: ${enquiry.date}
Time: ${enquiry.time}
Guests: ${enquiry.size}
Preference: ${enquiry.preference}`;
    window.open(generateWhatsAppLink(msg), '_blank');
  };

  return (
    <section id="visit" className="py-24 bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16">
          
          <div>
            <h2 className="font-display text-5xl text-spetta-yellow mb-8 tracking-wide uppercase">Drop By</h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <MapPin className="text-spetta-red mr-4 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-xl mb-2 text-white">Address</h4>
                  <p className="text-stone-400 leading-relaxed max-w-sm">{RESTAURANT.address}</p>
                  <a href="https://maps.google.com/?q=Spettacolare+Indiranagar" target="_blank" rel="noreferrer" className="inline-flex items-center mt-3 text-spetta-yellow hover:text-white font-medium transition-colors">
                    Get Directions <Navigation size={16} className="ml-1.5" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="text-spetta-green mr-4 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-xl mb-2 text-white">Hours</h4>
                  <p className="text-stone-400">{RESTAURANT.hours}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-spetta-yellow mr-4 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-xl mb-2 text-white">Contact</h4>
                  <p className="text-stone-400 mb-2">{RESTAURANT.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 w-full h-64 bg-stone-800 rounded-2xl flex items-center justify-center border border-stone-700 overflow-hidden">
              <iframe 
                src="https://maps.google.com/maps?q=Spettacolare,+Indiranagar,+Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location of Spettacolare"
              ></iframe>
            </div>
          </div>
          
          {/* Enquiry Form */}
          <div className="bg-stone-800 p-8 md:p-10 rounded-3xl border border-stone-700">
            <h3 className="font-display text-3xl mb-2 text-white">Table Enquiry</h3>
            <p className="text-stone-400 mb-8 text-sm">Send us a quick WhatsApp to check if we have space for your group.</p>
            
            <form onSubmit={handleWhatsAppEnquiry} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Name</label>
                <input required type="text" value={enquiry.name} onChange={e=>setEnquiry({...enquiry, name: e.target.value})} className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-spetta-yellow focus:ring-1 focus:ring-spetta-yellow transition-colors" placeholder="Your name" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Date</label>
                  <input required type="date" value={enquiry.date} onChange={e=>setEnquiry({...enquiry, date: e.target.value})} className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-spetta-yellow [color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Time</label>
                  <input required type="time" value={enquiry.time} onChange={e=>setEnquiry({...enquiry, time: e.target.value})} className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-spetta-yellow [color-scheme:dark]" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Party Size</label>
                  <select value={enquiry.size} onChange={e=>setEnquiry({...enquiry, size: e.target.value})} className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-spetta-yellow appearance-none">
                    <option value="">Select</option>
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3-4">3-4 People</option>
                    <option value="5+">5+ People</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Dietary</label>
                  <select value={enquiry.preference} onChange={e=>setEnquiry({...enquiry, preference: e.target.value})} className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-spetta-yellow appearance-none">
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" className="w-full bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-4 rounded-xl flex items-center justify-center mt-4 transition-colors">
                <MessageCircle size={20} className="mr-2" /> Send Enquiry via WhatsApp
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-stone-950 py-8 border-t border-stone-800 text-center">
    <p className="text-stone-500 font-medium">© {new Date().getFullYear()} {RESTAURANT.name}. All rights reserved.</p>
  </footer>
);

const FloatingActionBar = () => (
  <div className="md:hidden fixed bottom-4 left-4 right-4 bg-white rounded-full shadow-2xl border border-stone-200 z-50 flex overflow-hidden">
    <a href={`tel:${RESTAURANT.phoneRaw}`} className="flex-1 flex flex-col items-center justify-center py-2 text-stone-700 hover:bg-stone-50 transition-colors border-r border-stone-200">
      <Phone size={20} className="mb-1" />
      <span className="text-[10px] font-bold uppercase">Call</span>
    </a>
    <a href={generateWhatsAppLink("Hi, I'd like to place an order or enquire.")} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center justify-center py-2 text-[#25D366] hover:bg-stone-50 transition-colors border-r border-stone-200">
      <MessageCircle size={20} className="mb-1" />
      <span className="text-[10px] font-bold uppercase">Chat</span>
    </a>
    <a href={RESTAURANT.zomatoLink} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center justify-center py-2 bg-orange-500 text-white hover:bg-orange-600 transition-colors">
      <Utensils size={20} className="mb-1" />
      <span className="text-[10px] font-bold uppercase">Order</span>
    </a>
  </div>
);

function App() {
  return (
    <div className="font-sans text-stone-800 bg-spetta-cream">
      <Nav />
      <main>
        <Hero />
        <About />
        <MenuSection />
        <Gallery />
        <Reviews />
        <Visit />
      </main>
      <Footer />
      <FloatingActionBar />
    </div>
  );
}

export default App;
