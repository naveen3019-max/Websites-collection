import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, X, MapPin, Clock, Phone, 
  MessageCircle, Star, Beer, Dog, ChevronRight,
  Music, Leaf, CheckCircle2
} from 'lucide-react';

// --- DATA CONSTANTS ---
const RESTAURANT_INFO = {
  name: "Daffy's Brewgarden",
  tagline: "Craft beer. Open sky. No frills.",
  address: "Plot No. 48, Ground Floor, 100 Feet Road, Defence Colony, Indiranagar, Bengaluru, Karnataka 560038",
  mapUrl: "https://maps.google.com/?q=Daffy's+Brewgarden+Indiranagar+Bengaluru",
  phone: "+91 96060 64302",
  phoneDisplay: "+91 96060 64302",
  hours: "Daily, 12:00 PM – 1:00 AM",
  rating: 4.4,
  reviewCount: "500+",
  costForTwo: "₹600–1,800",
  swiggyLink: "https://www.swiggy.com/dineout/daffys-brewgarden",
  zomatoLink: "https://www.zomato.com/bangalore/daffys-brewgarden"
};

const BEERS = [
  { name: "Indiranagar IPA", style: "Indian Pale Ale", abv: "6.5%", ibu: 45, note: "Hoppy, citrusy, and bold. A classic Bangalore favorite." },
  { name: "Garden City Wit", style: "Belgian Witbier", abv: "4.8%", ibu: 15, note: "Light, refreshing, with hints of orange peel and coriander." },
  { name: "Daffy's Dark", style: "Dry Stout", abv: "5.2%", ibu: 30, note: "Smooth, roasty notes of coffee and dark chocolate." },
  { name: "Sunset Cider", style: "Apple Cider", abv: "5.0%", ibu: 0, note: "Crisp, semi-sweet, perfect for golden hour." }
];

const MENU_CATEGORIES = ["Starters", "Maharashtrian & Goan", "South Indian", "Grills", "Bar Bites", "Desserts"];

const MENU_ITEMS = [
  { category: "Starters", name: "Gunpowder Fries", price: "₹240", desc: "Crispy fries tossed in house-made podi." },
  { category: "Starters", name: "Kanda Bhaji", price: "₹220", desc: "Classic Maharashtrian onion fritters." },
  { category: "Maharashtrian & Goan", name: "Kolhapuri Chicken Sukka", price: "₹380", desc: "Spicy, dry-roasted chicken with robust spices." },
  { category: "Maharashtrian & Goan", name: "Goan Fish Curry", price: "₹450", desc: "Tangy coconut curry, served with steamed rice." },
  { category: "South Indian", name: "Guntur Chilli Chicken", price: "₹360", desc: "Fiery and flavorful, a perfect beer companion." },
  { category: "South Indian", name: "Mutton Ghee Roast", price: "₹520", desc: "Slow-cooked in ghee and Mangalorean spices." },
  { category: "Grills", name: "Tandoori Malai Broccoli", price: "₹320", desc: "Charred florets marinated in cream and cheese." },
  { category: "Grills", name: "Pesto Chicken Tikka", price: "₹390", desc: "Fusion of basil pesto and traditional tandoor." },
  { category: "Bar Bites", name: "Masala Peanuts", price: "₹150", desc: "Onions, tomatoes, lime, and chaat masala." },
  { category: "Bar Bites", name: "Cheese Chilli Toast", price: "₹210", desc: "Melted cheese and green chillies on crusty bread." },
  { category: "Desserts", name: "Sizzling Brownie", price: "₹280", desc: "With vanilla ice cream and hot chocolate fudge." },
  { category: "Desserts", name: "Filter Coffee Panna Cotta", price: "₹250", desc: "A smooth, creamy tribute to Namma Bengaluru." },
];

const REVIEWS = [
  { author: "Karthik R.", rating: 5, text: "The open-air seating under the trees is just perfect. Roshni and Jeevan took great care of us. The IPA is top-notch." },
  { author: "Sneha M.", rating: 5, text: "Brought my golden retriever here and they were so welcoming! Love the chill vibe, great food, and unpretentious atmosphere." },
  { author: "Rahul P.", rating: 4, text: "Excellent stout and the Kolhapuri chicken is fiery and authentic. Great place to unwind after work." },
  { author: "Ananya D.", rating: 5, text: "Selena and Christine provided warm hospitality. The live acoustic music on Sunday evening made our day. Will be back!" }
];

const GALLERY = [
  { id: 1, type: "ambience", label: "Garden Seating", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=500&auto=format&fit=crop" },
  { id: 2, type: "beer", label: "Fresh Pours", img: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=500&auto=format&fit=crop" },
  { id: 3, type: "food", label: "Bar Bites", img: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?q=80&w=500&auto=format&fit=crop" },
  { id: 4, type: "pets", label: "Pet Friendly", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=500&auto=format&fit=crop" },
];

// --- COMPONENTS ---

const SectionHeading = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <div className="flex items-center justify-center gap-4 mb-4">
      <div className="h-[1px] w-12 bg-amber"></div>
      <Leaf className="w-5 h-5 text-forest" />
      <div className="h-[1px] w-12 bg-amber"></div>
    </div>
    <h2 className="text-4xl md:text-5xl font-display text-forest mb-4">{title}</h2>
    {subtitle && <p className="text-charcoal/70 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 font-medium transition-all duration-300 rounded-sm";
  const variants = {
    primary: "bg-amber text-white hover:bg-amber/90 shadow-md",
    secondary: "bg-forest text-white hover:bg-forest/90",
    outline: "border-2 border-forest text-forest hover:bg-forest hover:text-white",
    whatsapp: "bg-[#25D366] text-white hover:bg-[#20bd5a]"
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState(MENU_CATEGORIES[0]);

  // Reservation Form State
  const [resForm, setResForm] = useState({ name: '', date: '', time: '', party: '2', pets: false });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReservation = (e) => {
    e.preventDefault();
    let message = `Hi, I'd like to reserve a table at Daffy's Brewgarden.`;
    if (resForm.name) {
      message += `\nName: ${resForm.name}\nDate: ${resForm.date}\nTime: ${resForm.time}\nParty Size: ${resForm.party}`;
      if (resForm.pets) message += `\nBringing a pet: Yes 🐾`;
    }
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${RESTAURANT_INFO.phone.replace(/\D/g,'')}?text=${encoded}`, '_blank');
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Beers', href: '#beers' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Visit', href: '#visit' },
  ];

  return (
    <div className="min-h-screen bg-stone selection:bg-amber/30 selection:text-charcoal relative">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-stone/95 backdrop-blur-sm shadow-sm py-3' : 'bg-stone/80 backdrop-blur-md border-b border-white/10 py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <a href="#" className="font-display text-2xl md:text-3xl text-forest font-bold tracking-wider">
            DAFFY'S
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-charcoal/80 hover:text-amber font-medium transition-colors">
                {link.name}
              </a>
            ))}
            <Button onClick={handleReservation} variant="whatsapp" className="px-5 py-2 text-sm rounded-full">
              <MessageCircle className="w-4 h-4 mr-2" /> Reserve
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-forest" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-stone border-t border-forest/10 shadow-lg py-4 px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg text-charcoal font-medium block py-2 border-b border-forest/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1920&auto=format&fit=crop" alt="Daffy's Brewgarden" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center space-x-2 bg-white/10 text-stone px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/20 backdrop-blur-md">
            <Star className="w-4 h-4 fill-amber text-amber" />
            <span>{RESTAURANT_INFO.rating} Rating ({RESTAURANT_INFO.reviewCount})</span>
            <span className="text-white/30 mx-2">|</span>
            <Dog className="w-4 h-4" />
            <span>Pet Friendly</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display text-white mb-6 leading-tight drop-shadow-lg">
            Daffy's <br className="md:hidden"/> Brewgarden
          </h1>
          <p className="text-xl md:text-2xl text-stone/90 mb-10 font-medium drop-shadow-md">
            {RESTAURANT_INFO.tagline}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={handleReservation} variant="whatsapp" className="w-full sm:w-auto text-lg px-8 py-4">
              <MessageCircle className="w-5 h-5 mr-2" /> Reserve a Table
            </Button>
            <a href="#menu" className="w-full sm:w-auto text-lg px-8 py-4 border-2 border-stone text-stone hover:bg-stone hover:text-charcoal transition-all font-medium inline-flex justify-center items-center rounded-sm">
              View Menu
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[500px] rounded-lg overflow-hidden flex flex-col items-center justify-center border border-forest/20 group">
              <img src="https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?q=80&w=800&auto=format&fit=crop" alt="Garden Seating" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-display text-forest mb-6">An open-sky neighborhood drinkery.</h2>
              <p className="text-lg text-charcoal/70 mb-6 leading-relaxed">
                Nestled in the heart of Indiranagar, Daffy's Brewgarden is your casual, unfussy escape. We believe in good times, great craft beer, and honest food served without the pretension.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  { icon: Beer, text: "In-house craft beers brewed with passion" },
                  { icon: Leaf, text: "Breezy alfresco garden seating" },
                  { icon: Dog, text: "100% Pet-friendly (#ChugWithThePug)" },
                  { icon: Music, text: "Live acoustic sessions on weekends" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-charcoal/80">
                    <item.icon className="w-6 h-6 text-amber mr-4 flex-shrink-0" />
                    <span className="font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
              
              <div className="p-6 bg-stone border-l-4 border-amber">
                <p className="italic text-charcoal/80">"Genuine, warm hospitality is our real strength. Ask for Roshni, Jeevan, Selena, or Christine when you visit!"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Beers Section */}
      <section id="beers" className="py-20 bg-forest text-stone relative">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
           <svg className="relative block w-[calc(134%+1.3px)] h-[40px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-white"></path>
           </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display text-amber mb-4">On Tap</h2>
            <p className="text-stone/80 max-w-2xl mx-auto text-lg">Fresh, local, and crafted for the Bangalore weather. Try a sampler to find your favorite.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BEERS.map((beer, idx) => (
              <div key={idx} className="bg-stone/10 border border-stone/20 p-8 text-center hover:bg-stone/15 transition-colors">
                <Beer className="w-12 h-12 text-amber mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="text-2xl font-display text-stone mb-1">{beer.name}</h3>
                <p className="text-amber font-medium mb-4">{beer.style}</p>
                <p className="text-stone/70 mb-6 text-sm">{beer.note}</p>
                <div className="flex justify-center gap-4 text-xs font-semibold text-stone/50 uppercase tracking-wider">
                  <span>ABV: {beer.abv}</span>
                  <span>IBU: {beer.ibu}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
           <svg className="relative block w-[calc(134%+1.3px)] h-[40px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-stone"></path>
           </svg>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-stone">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Honest Food" subtitle="Minimalist presentation, maximum flavor. Exploring the best of Maharashtrian, Goan, and South Indian coastal spices." />
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {MENU_CATEGORIES.map(category => (
              <button 
                key={category}
                onClick={() => setActiveMenuTab(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeMenuTab === category 
                  ? 'bg-forest text-white shadow-md' 
                  : 'bg-white text-charcoal/70 hover:bg-white/60'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {MENU_ITEMS.filter(item => item.category === activeMenuTab).map((item, idx) => (
              <div key={idx} className="flex justify-between items-start border-b border-forest/10 pb-4">
                <div className="pr-4">
                  <h4 className="text-lg font-bold text-charcoal mb-1">{item.name}</h4>
                  <p className="text-sm text-charcoal/60">{item.desc}</p>
                </div>
                <div className="font-medium text-amber shrink-0">{item.price}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <Button variant="outline" className="px-8" onClick={() => window.open(RESTAURANT_INFO.swiggyLink, '_blank')}>
                Order Delivery via Swiggy
             </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="The Brewgarden Vibe" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY.map((item) => (
              <div key={item.id} className={`aspect-square bg-stone/20 rounded-sm flex flex-col items-center justify-center group overflow-hidden relative border border-black/5`}>
                <img src={item.img} alt={item.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center pb-6 opacity-80 group-hover:opacity-100 transition-opacity z-20">
                  <span className="font-display text-xl text-white relative z-10">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-forest text-stone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display text-amber mb-4">Word on the Street</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-white/5 p-6 border border-white/10 rounded-sm hover:bg-white/10 transition-colors">
                <div className="flex text-amber mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-stone/80 mb-6 text-sm italic">"{review.text}"</p>
                <p className="text-stone font-medium text-sm">— {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation & Visit Section */}
      <section id="visit" className="py-24 bg-stone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Info & Map */}
            <div>
              <h2 className="text-4xl font-display text-forest mb-8">Drop By</h2>
              
              <div className="w-full h-64 mb-8 rounded-sm overflow-hidden border border-black/10">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  src={`https://maps.google.com/maps?q=${encodeURIComponent("Plot No. 48, Ground Floor, 100 Feet Road, Defence Colony, Indiranagar, Bengaluru, Karnataka 560038")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  title="Google Maps Location"
                ></iframe>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-amber mt-1 mr-4 shrink-0" />
                  <div>
                    <h4 className="font-bold text-charcoal text-lg">Location</h4>
                    <p className="text-charcoal/70 mt-1">{RESTAURANT_INFO.address}</p>
                    <div className="mt-2 text-sm text-forest font-medium flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Parking Available
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-amber mt-1 mr-4 shrink-0" />
                  <div>
                    <h4 className="font-bold text-charcoal text-lg">Hours</h4>
                    <p className="text-charcoal/70 mt-1">{RESTAURANT_INFO.hours}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-amber mt-1 mr-4 shrink-0" />
                  <div>
                    <h4 className="font-bold text-charcoal text-lg">Contact</h4>
                    <p className="text-charcoal/70 mt-1">{RESTAURANT_INFO.phoneDisplay}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="secondary" onClick={() => window.open(RESTAURANT_INFO.mapUrl, '_blank')}>
                  Get Directions
                </Button>
                <Button variant="outline" onClick={() => navigator.clipboard.writeText(RESTAURANT_INFO.address)}>
                  Copy Address
                </Button>
              </div>
            </div>

            {/* Quick Reservation Form */}
            <div className="bg-white p-8 rounded-sm shadow-sm border border-black/5">
              <h3 className="text-2xl font-display text-forest mb-6">Reserve a Table</h3>
              <form onSubmit={handleReservation} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Name</label>
                  <input type="text" required className="w-full border-b-2 border-forest/20 py-2 focus:outline-none focus:border-amber bg-transparent" placeholder="Your Name" value={resForm.name} onChange={e => setResForm({...resForm, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">Date</label>
                    <input type="date" required className="w-full border-b-2 border-forest/20 py-2 focus:outline-none focus:border-amber bg-transparent" value={resForm.date} onChange={e => setResForm({...resForm, date: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">Time</label>
                    <input type="time" required className="w-full border-b-2 border-forest/20 py-2 focus:outline-none focus:border-amber bg-transparent" value={resForm.time} onChange={e => setResForm({...resForm, time: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Party Size</label>
                  <select className="w-full border-b-2 border-forest/20 py-2 focus:outline-none focus:border-amber bg-transparent" value={resForm.party} onChange={e => setResForm({...resForm, party: e.target.value})}>
                    {[1,2,3,4,5,6,7,8,"9+"].map(n => <option key={n} value={n}>{n} People</option>)}
                  </select>
                </div>
                <div className="flex items-center pt-2 pb-4">
                  <input type="checkbox" id="pets" className="w-4 h-4 text-amber border-forest/30 rounded focus:ring-amber" checked={resForm.pets} onChange={e => setResForm({...resForm, pets: e.target.checked})} />
                  <label htmlFor="pets" className="ml-2 text-sm text-charcoal">Bringing a pet? (#ChugWithThePug)</label>
                </div>
                
                <Button type="submit" variant="whatsapp" className="w-full py-4 text-lg">
                  <MessageCircle className="w-5 h-5 mr-2" /> Book via WhatsApp
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-stone py-12 border-t-4 border-amber">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div>
            <span className="font-display text-2xl text-amber font-bold tracking-wider mb-4 block">DAFFY'S</span>
            <p className="text-stone/60 text-sm max-w-xs mx-auto md:mx-0">
              {RESTAURANT_INFO.tagline} A neighborhood brewgarden in Indiranagar.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2 text-stone/70 text-sm">
            <a href="#about" className="hover:text-amber">About Us</a>
            <a href="#menu" className="hover:text-amber">Food Menu</a>
            <a href="#beers" className="hover:text-amber">Craft Beers</a>
            <a href="#visit" className="hover:text-amber">Contact & Location</a>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a href="#" className="w-10 h-10 rounded-full bg-stone/10 flex items-center justify-center hover:bg-amber hover:text-charcoal transition-colors">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-stone/10 flex items-center justify-center hover:bg-amber hover:text-charcoal transition-colors">
                FB
              </a>
            </div>
            <div className="inline-flex items-center text-sm font-medium text-stone/80 border border-stone/20 px-3 py-1 rounded-full">
              <Dog className="w-4 h-4 mr-2 text-amber" /> Pet Friendly
            </div>
          </div>
          
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone/10 text-center text-stone/40 text-xs flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Daffy's Brewgarden. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Please drink responsibly.</p>
        </div>
      </footer>

      {/* Floating Action Bar (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-black/10 flex shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <a href={`tel:${RESTAURANT_INFO.phone.replace(/\D/g,'')}`} className="flex-1 py-3 flex flex-col items-center justify-center text-forest border-r border-black/10">
          <Phone className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase">Call</span>
        </a>
        <a href="#menu" className="flex-1 py-3 flex flex-col items-center justify-center text-forest border-r border-black/10">
          <MenuIcon className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase">Menu</span>
        </a>
        <a href={`https://wa.me/${RESTAURANT_INFO.phone.replace(/\D/g,'')}?text=Hi`} target="_blank" rel="noreferrer" className="flex-1 py-3 flex flex-col items-center justify-center bg-[#25D366] text-white">
          <MessageCircle className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase">WhatsApp</span>
        </a>
      </div>

      {/* Desktop Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${RESTAURANT_INFO.phone.replace(/\D/g,'')}?text=${encodeURIComponent("Hi, I'd like to reserve a table at Daffy's Brewgarden")}`}
        target="_blank"
        rel="noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 hover:shadow-xl"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
      
    </div>
  );
}
