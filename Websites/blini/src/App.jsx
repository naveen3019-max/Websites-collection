import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, X, MapPin, Clock, Phone, ExternalLink, 
  ChevronRight, Star, Coffee, Utensils
} from 'lucide-react';

// --- DATA CONSTANTS ---
const RESTAURANT = {
  name: "Blini Bistro",
  tagline: "India's only blini bistro — savory, sweet, always fresh",
  description: "A cozy Indo-Russian fusion cafe on Church Street, built entirely around blinis. Whether you crave our signature pizza-style savory crepes or classic sweet treats, every dish tells a story of two cultures coming together.",
  address: "Ground Floor, City Centre, No. 28, Church Street, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001 (opposite Adiga's)",
  phone: "919999999999", // TODO: Update with real owner number
  whatsappMsg: "Hi, I'd like to enquire about a table at Blini Bistro",
  hours: "Tue - Sun: 11:30 AM – 11:00 PM (Closed Mondays)",
  rating: 4.6,
  reviewsCount: "300+",
  swiggyUrl: "https://www.swiggy.com/dineout", // TODO: Update with exact URL
  mapsUrl: "https://maps.app.goo.gl/placeholder" // TODO: Update with exact URL
};

const MENU_CATEGORIES = ["Savory Blinis", "Sweet Blinis", "Russian Classics", "Breakfast", "Beverages"];

const MENU_ITEMS = [
  { name: "Chicken Blini Pizza", category: "Savory Blinis", price: "₹320", description: "Our signature savory blini topped with tender chicken, mozzarella, and house-made sauce.", isSignature: true },
  { name: "Paneer Tikka Blini", category: "Savory Blinis", price: "₹290", description: "Indo-Russian fusion at its best. Spiced paneer wrapped in a soft, warm blini." },
  { name: "Mushroom & Cheese Blini", category: "Savory Blinis", price: "₹280", description: "Earthy mushrooms and melted cheese folded into a perfectly cooked blini." },
  { name: "Nutella & Strawberry Crepe", category: "Sweet Blinis", price: "₹250", description: "A classic dessert blini loaded with Nutella and fresh strawberries.", isSignature: true },
  { name: "Mango Cream Blini", category: "Sweet Blinis", price: "₹260", description: "Seasonal mangoes with fresh cream, a tropical twist on a Russian favorite." },
  { name: "Traditional Borscht", category: "Russian Classics", price: "₹350", description: "Hearty beet soup served with a dollop of sour cream and fresh dill.", isSignature: true },
  { name: "Beef Stroganoff", category: "Russian Classics", price: "₹450", description: "Tender beef in a rich, creamy mushroom sauce served over traditional sides." },
  { name: "English Breakfast", category: "Breakfast", price: "₹380", description: "Eggs, sausages, baked beans, toast, and grilled tomatoes. A hearty start.", isSignature: true },
  { name: "Classic Cappuccino", category: "Beverages", price: "₹180", description: "Rich espresso blended with steamed milk and a deep layer of foam." },
  { name: "Russian Kompot", category: "Beverages", price: "₹150", description: "A traditional homemade fruit juice, subtly sweet and deeply refreshing." },
];

const REVIEWS = [
  { name: "Anjali S.", text: "A truly unique hidden gem! I've never had a savory blini like this before. The Chicken Blini Pizza is incredible. Cozy ambience right off busy Church Street.", rating: 5 },
  { name: "Rahul M.", text: "The hosts are so friendly and make you feel right at home. It's a small, intimate spot perfect for a quiet date. Loved the authentic Borscht!", rating: 4.5 },
  { name: "Priya K.", text: "India's only blini place did not disappoint! The blinis are incredibly soft. Slightly higher priced for the portion, but the flavor and experience make it completely worth it.", rating: 4.5 }
];

// --- COMPONENTS ---

const Button = ({ children, primary, className, onClick, href, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300";
  const variants = primary 
    ? "bg-bistro-red text-white hover:bg-red-800 shadow-md hover:shadow-lg"
    : "bg-bistro-gold text-white hover:bg-yellow-600 shadow-md hover:shadow-lg";
  
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseStyle} ${variants} ${className}`} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-4xl md:text-5xl font-heading text-bistro-red mb-4">{title}</h2>
    {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
    <div className="flex justify-center mt-6">
      <div className="w-16 h-1 bg-bistro-gold rounded-full"></div>
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState(MENU_CATEGORIES[0]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getWhatsAppLink = () => {
    const encoded = encodeURIComponent(RESTAURANT.whatsappMsg);
    return `https://wa.me/${RESTAURANT.phone}?text=${encoded}`;
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Visit', href: '#visit' }
  ];

  return (
    <div className="min-h-screen bg-bistro-cream overflow-x-hidden">
      
      {/* STICKY NAV */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0 flex items-center">
              <a href="#" className="font-heading text-2xl font-bold text-bistro-red">Blini Bistro</a>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-gray-800 hover:text-bistro-red font-medium transition-colors">
                  {link.name}
                </a>
              ))}
              <a 
                href={RESTAURANT.swiggyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#FC8019] text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-600 transition shadow-sm flex items-center gap-2"
              >
                <Utensils size={18} />
                Order Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-800 focus:outline-none">
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 flex flex-col items-center space-y-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-800 hover:text-bistro-red font-medium text-lg"
              >
                {link.name}
              </a>
            ))}
            <a 
              href={RESTAURANT.swiggyUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#FC8019] text-white px-8 py-3 rounded-full font-semibold w-[80%] text-center mt-4 flex items-center justify-center gap-2"
            >
              <Utensils size={18} /> Order on Swiggy
            </a>
          </motion.div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 px-4 flex items-center min-h-[90vh] overflow-hidden">
        <div className="absolute inset-0 bg-folk-pattern opacity-40 z-0 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur border border-bistro-gold/30 text-sm font-medium text-bistro-green mb-6 shadow-sm">
                <Star size={16} className="text-bistro-gold fill-current" />
                <span>{RESTAURANT.rating} ({RESTAURANT.reviewsCount} reviews)</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-bistro-red mb-6 leading-tight">
                A Taste of Two <br/><span className="text-bistro-gold italic">Cultures</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-lg mx-auto md:mx-0 font-light leading-relaxed">
                {RESTAURANT.tagline}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <Button href={RESTAURANT.swiggyUrl} className="bg-[#FC8019] hover:bg-orange-600 w-full sm:w-auto text-sm md:text-base px-5 py-3">
                  Order Delivery
                </Button>
                <Button href={getWhatsAppLink()} primary={false} className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white border-none text-sm md:text-base px-5 py-3">
                  Book a Table via WhatsApp
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mt-12 md:mt-0"
            >
              <div className="aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform md:rotate-3 hover:rotate-0 transition-transform duration-500 max-w-md mx-auto">
                 <img 
                   src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1000&q=80" 
                   alt="Delicious sweet crepe" 
                   className="w-full h-full object-cover"
                 />
              </div>
              <div className="absolute -bottom-6 left-1/2 md:-bottom-6 md:-left-6 transform -translate-x-1/2 md:translate-x-0 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3">
                <div className="bg-bistro-gold/20 p-2 rounded-full">
                  <Utensils className="text-bistro-gold" size={24} />
                </div>
                <div className="text-sm font-bold text-gray-800">Freshly Made!</div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="aspect-square rounded-2xl shadow-lg relative overflow-hidden border border-bistro-gold/20">
                <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80" alt="Cozy Cafe Interior" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <h2 className="text-4xl font-heading text-bistro-red mb-6">The Only Blini Bistro in India</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Tucked away from the bustle of Church Street, Blini Bistro is a small, intimate spot bringing a truly unique concept to Bangalore. 
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                What is a blini? It's a traditional Russian crepe, famously soft and slightly thicker than its French cousin. Here, we've reimagined it: serving hearty, pizza-style savory blinis alongside classic sweet treats and authentic Russian dishes like Borscht.
              </p>
              <div className="flex items-center gap-3 text-bistro-green font-medium">
                <MapPin className="text-bistro-gold" />
                <span>A quiet escape on Church Street</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" className="py-24 bg-bistro-cream relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Menu" subtitle="A unique fusion of flavors. Don't miss our signature Blini Pizzas." />
          
          {/* Menu Categories Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {MENU_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  activeTab === category 
                    ? 'bg-bistro-red text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items List */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {MENU_ITEMS.filter(item => item.category === activeTab).map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-bistro-gold/10 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-heading text-gray-900 flex items-center gap-2">
                    {item.name}
                    {item.isSignature && (
                      <span className="text-[10px] uppercase tracking-wider bg-bistro-gold text-white px-2 py-0.5 rounded-full font-bold ml-2">Must Try</span>
                    )}
                  </h3>
                  <span className="text-lg font-bold text-bistro-red">{item.price}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <p className="text-sm text-gray-500 italic">Prices are indicative. Taxes as applicable.</p>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="A Glimpse Inside" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Savory Blini Pizza", url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80" },
              { label: "Sweet Nutella Crepe", url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80" },
              { label: "Cozy Corner Table", url: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80" },
              { label: "Exterior on Church St", url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" }
            ].map((img, idx) => (
              <div key={idx} className={`aspect-square bg-bistro-cream rounded-xl overflow-hidden border border-bistro-gold/20 shadow-sm ${idx === 0 || idx === 3 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <img src={img.url} alt={img.label} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="py-24 bg-bistro-green text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading text-bistro-cream mb-4">Guest Stories</h2>
            <div className="flex justify-center mt-6">
              <div className="w-16 h-1 bg-bistro-gold rounded-full"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                <div className="flex gap-1 mb-4 text-bistro-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < Math.floor(review.rating) ? 'fill-current' : 'opacity-30'} />
                  ))}
                </div>
                <p className="text-bistro-cream/90 italic mb-6 leading-relaxed">"{review.text}"</p>
                <p className="font-heading font-bold text-white">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT SECTION */}
      <section id="visit" className="py-24 bg-bistro-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-bistro-gold/20 flex flex-col md:flex-row">
            
            <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
              <h2 className="text-4xl font-heading text-bistro-red mb-8">Find Us</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-bistro-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Address</h4>
                    <p className="text-gray-600 mt-1">{RESTAURANT.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="text-bistro-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Hours</h4>
                    <p className="text-gray-600 mt-1">{RESTAURANT.hours}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="text-bistro-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Contact</h4>
                    <p className="text-gray-600 mt-1">For queries and booking enquiries, message us on WhatsApp.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button href={RESTAURANT.mapsUrl} primary className="flex-1 px-4 text-sm gap-2">
                  <MapPin size={16} /> Get Directions
                </Button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(RESTAURANT.address);
                    alert("Address copied to clipboard!");
                  }}
                  className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-full font-medium transition-all duration-300 text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300 gap-2"
                >
                   Copy Address
                </button>
              </div>
            </div>
            
            <div className="md:w-1/2 bg-gray-200 min-h-[400px] relative">
               <iframe 
                 src="https://maps.google.com/maps?q=Church%20Street,%20Bangalore&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0, position: "absolute", inset: 0 }} 
                 allowFullScreen="" 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 title="Blini Bistro Location"
               ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 border-t-[8px] border-bistro-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="font-heading text-2xl font-bold text-bistro-cream mb-2">Blini Bistro</h2>
            <p className="text-gray-400 text-sm">India's only blini bistro.</p>
          </div>
          
          <div className="flex gap-6">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-gray-400 hover:text-white transition">
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Blini Bistro. All rights reserved.
          </div>
        </div>
      </footer>

      {/* MOBILE FLOATING ACTION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 flex items-center p-3 gap-3 pb-safe">
        <a 
          href={`tel:+${RESTAURANT.phone}`}
          className="flex-1 flex flex-col items-center justify-center py-2 text-gray-600 hover:text-bistro-red"
        >
          <Phone size={20} className="mb-1" />
          <span className="text-[10px] font-medium uppercase tracking-wide">Call</span>
        </a>
        <a 
          href={getWhatsAppLink()}
          className="flex-1 flex flex-col items-center justify-center py-2 text-green-600 hover:text-green-700"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          <span className="text-[10px] font-medium uppercase tracking-wide">WhatsApp</span>
        </a>
        <a 
          href={RESTAURANT.swiggyUrl}
          className="flex-[2] bg-[#FC8019] text-white rounded-full py-3 flex items-center justify-center gap-2 font-bold text-sm shadow-md"
        >
          <Utensils size={16} /> Order Now
        </a>
      </div>
      
    </div>
  );
}
