import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Clock, Phone, ChevronRight, Star, MessageCircle, Calendar, Users, Wine, Copy, ArrowRight, Check } from 'lucide-react';

// --- DATA CONSTANTS ---
const RESTAURANT = {
  name: "Bologna Italian Restaurant",
  phone: "919606017136",
  displayPhone: "+91 96060 17136",
  address: "#759, First Floor, 100 Feet Road, HAL 2nd Stage, Appareddipalya, Indiranagar, Bengaluru, Karnataka 560038",
  hours: "12:00 PM – 11:30 PM",
  mapsLink: "https://maps.google.com/?q=Bologna+Italian+Restaurant+Indiranagar",
  rating: "4.6",
  reviewCount: "2,000+",
  tagline: "Emilia-Romagna, in the heart of Indiranagar",
};

const MENU_CATEGORIES = ["Starters & Bread", "Pasta", "Risotto & Mains", "Pizza", "Desserts", "Sangria & Wine"];

const MENU_ITEMS = [
  { category: "Starters & Bread", name: "Complimentary Herb Butter Bread", price: "On the House", desc: "Warm artisan bread served with our signature house-churned herb butter and pesto.", chefRec: true },
  { category: "Starters & Bread", name: "Burrata con Pomodorini", price: "₹695", desc: "Fresh creamy burrata, cherry tomatoes, basil, extra virgin olive oil.", chefRec: false },
  { category: "Pasta", name: "Tortellini Di Bologna", price: "₹825", desc: "Hand-folded tortellini stuffed with rich meat filling in a delicate broth or cream sauce.", chefRec: true },
  { category: "Pasta", name: "Ravioli Di Spinaci E Ricotta", price: "₹745", desc: "House-made ravioli filled with spinach and ricotta, finished in sage butter sauce.", chefRec: true },
  { category: "Pasta", name: "Carbonara Spaghetti", price: "₹795", desc: "Authentic Roman style with guanciale, pecorino romano, and egg yolk. No cream.", chefRec: true },
  { category: "Risotto & Mains", name: "Petto D'Anatra Grigliato", price: "₹1,250", desc: "Perfectly grilled duck breast with a rich berry jus and creamy mashed potatoes.", chefRec: true },
  { category: "Risotto & Mains", name: "Risotto ai Funghi Porcini", price: "₹895", desc: "Arborio rice, wild porcini mushrooms, parmesan, and a touch of truffle oil.", chefRec: false },
  { category: "Pizza", name: "Margherita Verace", price: "₹745", desc: "San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil.", chefRec: false },
  { category: "Pizza", name: "Prosciutto e Rucola", price: "₹925", desc: "Tomato base, mozzarella, topped with fresh arugula, prosciutto di Parma, and shaved parmesan.", chefRec: true },
  { category: "Desserts", name: "Signature Panna Cotta", price: "₹495", desc: "Silky Italian cream dessert with a seasonal berry compote.", chefRec: true },
  { category: "Desserts", name: "Classic Tiramisu", price: "₹525", desc: "Espresso-soaked ladyfingers layered with mascarpone cream and dusted with cocoa.", chefRec: false },
  { category: "Sangria & Wine", name: "Signature Red Sangria", price: "₹595 / ₹2,200", desc: "Full-bodied red wine infused with fresh citrus and seasonal fruits.", chefRec: true },
  { category: "Sangria & Wine", name: "Italian Wine Selection", price: "Varies", desc: "A curated selection of robust reds and crisp whites from the Emilia-Romagna region.", chefRec: false },
];

const REVIEWS = [
  { name: "Priya S.", text: "Absolutely phenomenal experience. The Tortellini Di Bologna transported me right back to Italy. The perfect spot for a romantic dinner.", context: "Romantic Dinner" },
  { name: "Rahul M.", text: "Hosted my wife's baby shower here. The staff was incredibly accommodating, the ambience is elegant, and the duck breast was cooked to perfection.", context: "Baby Shower" },
  { name: "Sneha K.", text: "A proper fine dining experience in Indiranagar. The complimentary bread with pesto is a lovely touch. Pricy, but worth every rupee for the quality and service.", context: "Weekend Dinner" },
];

// --- UTILS ---
const formatWhatsAppMessage = (data) => {
  let text = `Hi Bologna team, I'd like to reserve a table.\n\n`;
  if (data.name) text += `*Name:* ${data.name}\n`;
  if (data.date) text += `*Date:* ${data.date}\n`;
  if (data.time) text += `*Time:* ${data.time}\n`;
  if (data.guests) text += `*Guests:* ${data.guests}\n`;
  if (data.occasion) text += `*Occasion:* ${data.occasion}\n`;
  return encodeURIComponent(text);
};

// --- COMPONENTS ---

const SectionHeading = ({ children, subtitle }) => (
  <div className="text-center mb-16">
    <h2 className="font-serif text-4xl md:text-5xl text-bologna-charcoal mb-4">{children}</h2>
    {subtitle && <p className="font-sans text-bologna-green uppercase tracking-widest text-sm">{subtitle}</p>}
    <div className="h-px w-24 bg-bologna-red mx-auto mt-6 opacity-60"></div>
  </div>
);

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState(MENU_CATEGORIES[0]);
  const [copied, setCopied] = useState(false);
  const [resData, setResData] = useState({ name: '', date: '', time: '', guests: '2', occasion: 'Casual Dining' });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReserve = (e) => {
    e.preventDefault();
    const message = formatWhatsAppMessage(resData);
    window.open(`https://wa.me/${RESTAURANT.phone}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-bologna-cream font-sans text-bologna-charcoal relative">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-bologna-cream/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className={`font-serif text-2xl tracking-wide ${isScrolled ? 'text-bologna-charcoal' : 'text-white'}`}>BOLOGNA</a>
          
          <div className="hidden md:flex items-center space-x-10">
            {['About', 'Menu', 'Gallery', 'Reviews'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm uppercase tracking-widest transition-colors hover:text-bologna-red ${isScrolled ? 'text-bologna-charcoal' : 'text-white/90'}`}>
                {item}
              </a>
            ))}
            <a href="#reserve" className="bg-bologna-red text-white px-6 py-3 text-sm uppercase tracking-widest hover:bg-red-900 transition-colors">
              Reserve a Table
            </a>
          </div>

          <button className={`md:hidden ${isScrolled ? 'text-bologna-charcoal' : 'text-white'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-bologna-cream z-40 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-300">
          {['About', 'Menu', 'Gallery', 'Reviews'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="font-serif text-3xl text-bologna-charcoal hover:text-bologna-red transition-colors">
              {item}
            </a>
          ))}
          <a href="#reserve" onClick={() => setMobileMenuOpen(false)} className="bg-bologna-red text-white px-8 py-4 text-sm uppercase tracking-widest mt-8">
            Reserve a Table
          </a>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-bologna-charcoal">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920" 
            alt="Bologna Restaurant Ambience" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-multiply"
          />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-medium tracking-wider">{RESTAURANT.rating} ({RESTAURANT.reviewCount} Reviews)</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
            An Ode to <br/><span className="italic font-light">Emilia-Romagna</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light tracking-wide mb-12 uppercase">{RESTAURANT.tagline}</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#reserve" className="w-full sm:w-auto bg-bologna-red text-white px-10 py-4 text-sm uppercase tracking-widest hover:bg-red-900 transition-colors">
              Reserve a Table
            </a>
            <a href="#menu" className="w-full sm:w-auto bg-transparent border border-white text-white px-10 py-4 text-sm uppercase tracking-widest hover:bg-white/10 transition-colors">
              View Menu
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading subtitle="Our Story">The Essence of Italy</SectionHeading>
          <p className="text-lg md:text-xl font-light leading-relaxed text-bologna-charcoal/80 mb-10">
            At Bologna, we bring the soul of Emilia-Romagna to the vibrant streets of Indiranagar. 
            Our kitchen is dedicated to the art of authentic Italian fine dining, where hand-folded tortellini, 
            wood-fired pizzas, and rich regional flavors take center stage. Set against an elegant backdrop 
            with romantic Italian melodies, we invite you to experience a culinary journey that celebrates tradition, 
            passion, and the joy of sharing a beautiful meal.
          </p>
          <div className="flex justify-center space-x-12 opacity-70">
            <div className="flex flex-col items-center"><Wine className="w-8 h-8 mb-3 text-bologna-green" /><span className="text-xs uppercase tracking-widest">Curated Wines</span></div>
            <div className="flex flex-col items-center"><Users className="w-8 h-8 mb-3 text-bologna-green" /><span className="text-xs uppercase tracking-widest">Celebrations</span></div>
            <div className="flex flex-col items-center"><Star className="w-8 h-8 mb-3 text-bologna-green" /><span className="text-xs uppercase tracking-widest">Fine Dining</span></div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-white px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading subtitle="Culinary Journey">Our Menu</SectionHeading>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {MENU_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveMenuTab(category)}
                className={`px-6 py-2 text-sm uppercase tracking-widest transition-all duration-300 ${activeMenuTab === category ? 'text-bologna-red border-b border-bologna-red' : 'text-bologna-charcoal/50 hover:text-bologna-charcoal'}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 animate-in fade-in duration-500">
            {MENU_ITEMS.filter(item => item.category === activeMenuTab).map((item, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between items-baseline mb-2 border-b border-bologna-charcoal/10 pb-2">
                  <h3 className="font-serif text-xl md:text-2xl flex items-center">
                    {item.name}
                    {item.chefRec && <span className="ml-3 text-[10px] uppercase tracking-widest bg-bologna-green/10 text-bologna-green px-2 py-1 rounded-sm whitespace-nowrap">Chef's Rec</span>}
                  </h3>
                  <span className="font-sans text-sm tracking-wider ml-4">{item.price}</span>
                </div>
                <p className="font-light text-sm text-bologna-charcoal/70 leading-relaxed group-hover:text-bologna-charcoal transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-6 bg-bologna-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Aesthetic">The Experience</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Signature Pasta Plating', height: 'h-96', img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800' },
              { label: 'Elegant Indoor Ambience', height: 'h-96 md:h-64', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800' },
              { label: 'Wood-Fired Pizza', height: 'h-96', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800' },
              { label: 'Wine & Sangria Service', height: 'h-96 md:h-80', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800' },
              { label: 'Romantic Outdoor Seating', height: 'h-96 md:h-80 lg:-mt-32', img: 'https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?auto=format&fit=crop&q=80&w=800' },
              { label: 'Celebration Table Setup', height: 'h-96 lg:-mt-16', img: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800' },
              { label: 'Duck Breast Mains', height: 'h-96 md:h-64 lg:-mt-16', img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800' },
              { label: 'Panna Cotta Dessert', height: 'h-96', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800' },
            ].map((item, i) => (
              <div key={i} className={`relative flex items-center justify-center overflow-hidden ${item.height} bg-stone-200 group`}>
                <img src={item.img} alt={item.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-bologna-charcoal/30 group-hover:bg-bologna-charcoal/10 transition-colors duration-500"></div>
                <span className="text-white text-xs uppercase tracking-widest font-medium z-10 drop-shadow-md">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-bologna-charcoal text-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Guest Words</h2>
            <div className="h-px w-24 bg-bologna-red mx-auto mt-6 opacity-60"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-white/5 p-10 border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex text-bologna-red mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="font-light text-white/80 leading-relaxed mb-8 italic">"{review.text}"</p>
                <div className="flex flex-col border-t border-white/10 pt-6">
                  <span className="font-serif text-lg">{review.name}</span>
                  <span className="text-xs uppercase tracking-widest text-white/50 mt-1">{review.context}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reserve & Visit Section */}
      <section id="reserve" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div>
            <SectionHeading subtitle="Join Us">Reserve Your Table</SectionHeading>
            <p className="text-center lg:text-left text-bologna-charcoal/70 mb-10 font-light">
              Experience the finest Italian dining in Indiranagar. For weekend dinners, baby showers, or group celebrations, we highly recommend reserving in advance.
            </p>
            
            <form onSubmit={handleReserve} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-bologna-charcoal/50 mb-2">Name</label>
                  <input type="text" required value={resData.name} onChange={e => setResData({...resData, name: e.target.value})} className="w-full border-b border-bologna-charcoal/20 py-3 focus:outline-none focus:border-bologna-red bg-transparent transition-colors" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-bologna-charcoal/50 mb-2">Guests</label>
                  <select value={resData.guests} onChange={e => setResData({...resData, guests: e.target.value})} className="w-full border-b border-bologna-charcoal/20 py-3 focus:outline-none focus:border-bologna-red bg-transparent transition-colors">
                    {[1,2,3,4,5,6,7,8,'9+'].map(n => <option key={n} value={n}>{n} People</option>)}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-bologna-charcoal/50 mb-2">Date</label>
                  <input type="date" required value={resData.date} onChange={e => setResData({...resData, date: e.target.value})} className="w-full border-b border-bologna-charcoal/20 py-3 focus:outline-none focus:border-bologna-red bg-transparent transition-colors text-bologna-charcoal" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-bologna-charcoal/50 mb-2">Time</label>
                  <input type="time" required value={resData.time} onChange={e => setResData({...resData, time: e.target.value})} className="w-full border-b border-bologna-charcoal/20 py-3 focus:outline-none focus:border-bologna-red bg-transparent transition-colors text-bologna-charcoal" />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-bologna-charcoal/50 mb-2">Occasion</label>
                <select value={resData.occasion} onChange={e => setResData({...resData, occasion: e.target.value})} className="w-full border-b border-bologna-charcoal/20 py-3 focus:outline-none focus:border-bologna-red bg-transparent transition-colors">
                  <option>Casual Dining</option>
                  <option>Romantic Dinner</option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Baby Shower</option>
                  <option>Business Meeting</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-bologna-red text-white py-4 mt-4 uppercase tracking-widest text-sm hover:bg-red-900 transition-colors flex justify-center items-center">
                Request Booking via WhatsApp <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </form>
          </div>

          <div className="bg-bologna-cream p-10 md:p-14 border border-bologna-charcoal/5">
            <h3 className="font-serif text-3xl mb-8 border-b border-bologna-charcoal/10 pb-6">Location & Hours</h3>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mt-1 text-bologna-green mr-4 flex-shrink-0" />
                <div>
                  <p className="font-light leading-relaxed text-bologna-charcoal/90 pr-4">{RESTAURANT.address}</p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <a href={RESTAURANT.mapsLink} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest text-bologna-red hover:text-red-900 border-b border-bologna-red/30 pb-1">Get Directions</a>
                    <button onClick={handleCopyAddress} className="text-xs uppercase tracking-widest text-bologna-charcoal/60 hover:text-bologna-charcoal flex items-center">
                      {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />} {copied ? 'Copied' : 'Copy Address'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-5 h-5 mt-1 text-bologna-green mr-4 flex-shrink-0" />
                <div>
                  <p className="font-medium">Everyday</p>
                  <p className="font-light text-bologna-charcoal/70">{RESTAURANT.hours}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 mt-1 text-bologna-green mr-4 flex-shrink-0" />
                <div>
                  <a href={`tel:${RESTAURANT.phone}`} className="font-light text-bologna-charcoal/90 hover:text-bologna-red transition-colors block">{RESTAURANT.displayPhone}</a>
                  <span className="text-xs text-bologna-charcoal/50 uppercase tracking-widest mt-1 block">Call or WhatsApp</span>
                </div>
              </div>
            </div>
            
            {/* Google Map Embed */}
            <div className="mt-10 h-64 relative w-full overflow-hidden border border-bologna-charcoal/10">
              <iframe 
                src="https://maps.google.com/maps?q=Bologna%20Italian%20Restaurant%20Indiranagar&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                aria-hidden="false" 
                tabIndex="0"
                title="Bologna Italian Restaurant Location"
                className="absolute inset-0 w-full h-full grayscale-[20%] contrast-125"
              ></iframe>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bologna-charcoal pt-20 pb-10 px-6 text-white text-center md:text-left">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 border-b border-white/10 pb-16">
          <div>
            <h4 className="font-serif text-3xl mb-6">BOLOGNA</h4>
            <p className="font-light text-white/60 leading-relaxed mb-6 max-w-sm mx-auto md:mx-0">
              Authentic Italian fine dining, bringing the rich flavors and elegant traditions of Emilia-Romagna to Indiranagar.
            </p>
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors uppercase tracking-widest text-xs">Instagram</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors uppercase tracking-widest text-xs">Facebook</a>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <h5 className="uppercase tracking-widest text-xs text-white/50 mb-2">Explore</h5>
            {['About', 'Menu', 'Gallery', 'Reviews'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="font-light text-white/80 hover:text-bologna-red transition-colors">{item}</a>
            ))}
          </div>
          
          <div className="flex flex-col space-y-4">
            <h5 className="uppercase tracking-widest text-xs text-white/50 mb-2">Contact</h5>
            <p className="font-light text-white/80">{RESTAURANT.displayPhone}</p>
            <p className="font-light text-white/80 max-w-xs mx-auto md:mx-0">{RESTAURANT.address}</p>
            <a href={`mailto:hello@bolognarestaurant.com`} className="font-light text-bologna-red hover:text-white transition-colors mt-4 block">hello@bolognarestaurant.com</a>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Bologna Italian Restaurant. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0">Built for Fine Dining</p>
        </div>
      </footer>

      {/* Floating Action Elements */}
      
      {/* WhatsApp Floating Button (Desktop mostly, or always) */}
      <a 
        href={`https://wa.me/${RESTAURANT.phone}?text=Hi%20Bologna%20team,%20I'd%20like%20to%20reserve%20a%20table.`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:bg-green-600 transition-colors z-50 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-3 transition-all duration-300 ease-in-out font-medium tracking-wide">
          Reserve on WhatsApp
        </span>
      </a>

      {/* Mobile Bottom Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex text-center z-40 pb-safe">
        <a href={`tel:${RESTAURANT.phone}`} className="flex-1 py-4 flex flex-col items-center text-bologna-charcoal border-r border-gray-200">
          <Phone className="w-5 h-5 mb-1 text-bologna-charcoal/70" />
          <span className="text-[10px] uppercase tracking-widest font-medium">Call</span>
        </a>
        <a href="#menu" className="flex-1 py-4 flex flex-col items-center text-bologna-charcoal border-r border-gray-200 bg-bologna-cream/50">
          <Menu className="w-5 h-5 mb-1 text-bologna-charcoal/70" />
          <span className="text-[10px] uppercase tracking-widest font-medium">Menu</span>
        </a>
        <a href="#reserve" className="flex-1 py-4 flex flex-col items-center text-bologna-red bg-bologna-red/5">
          <Calendar className="w-5 h-5 mb-1" />
          <span className="text-[10px] uppercase tracking-widest font-medium">Reserve</span>
        </a>
      </div>

    </div>
  );
};

export default App;
