import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu as MenuIcon, X, MapPin, Clock, Phone, Star, ArrowRight, Flame, ExternalLink } from 'lucide-react';

// --- DATA ---
const RESTAURANT = {
  name: "Bamey's Restro Cafe",
  phone: "+91 91489 27318",
  phoneAlt: "+91 80 4110 2071",
  whatsapp: "919148927318",
  address: "A/5, Ground Floor, KHB Colony, 5th Block, Koramangala, Bengaluru, Karnataka 560034",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5833075253816!2d77.6186!3d12.9344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144e5b4b1a41%3A0x8e8749db712d9a3b!2sBamey%27s%20Restro%20Cafe!5e0!3m2!1sen!2sin!4v1689230588647!5m2!1sen!2sin",
  hours: "Daily, 11:30 AM – 10:30 PM",
  orderUrl: "https://www.swiggy.com/restaurants/bameys-restro-cafe-koramangala-bangalore-5943", 
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 }
};

const stagger = {
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: "-100px" }
};

const Nav = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-zinc-950/80 backdrop-blur-xl shadow-lg shadow-black/20 py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center gap-2">
            <span className="font-display font-bold text-3xl text-white tracking-tight">Bamey's<span className="text-bamey-orange">.</span></span>
          </a>
          
          <div className="hidden md:flex items-center space-x-10">
            {['About', 'Menu', 'Challenge', 'Gallery', 'Visit'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-zinc-300 hover:text-bamey-orange transition-colors">{item}</a>
            ))}
            <a 
              href={RESTAURANT.orderUrl} 
              target="_blank" rel="noreferrer"
              className="bg-bamey-orange hover:bg-[#d47d25] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:-translate-y-0.5 shadow-[0_0_20px_rgba(224,138,44,0.3)] flex items-center gap-2"
            >
              Order Online
            </a>
          </div>
          
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-zinc-900 border-t border-white/10 absolute w-full left-0 shadow-2xl px-6 py-6 space-y-4"
        >
          {['About', 'Menu', 'Challenge', 'Gallery', 'Visit'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="block text-lg font-medium text-zinc-200 border-b border-white/5 pb-3">{item}</a>
          ))}
          <a href={RESTAURANT.orderUrl} target="_blank" rel="noreferrer" className="mt-6 bg-bamey-orange text-white text-center px-4 py-3 rounded-xl font-bold block w-full shadow-lg">
            Order Online
          </a>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-zinc-950 overflow-hidden pt-20">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-bamey-orange/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-bamey-red/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 bg-zinc-900/50 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/10">
            <span className="flex gap-1 text-yellow-400"><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/></span>
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">{RESTAURANT.rating} Rated in Bengaluru</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
            Authentic <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-bamey-orange to-bamey-red">Himalayan</span> Flavors.
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-10 font-body leading-relaxed max-w-lg">
            Experience the true essence of Nepalese culinary heritage right in the heart of Koramangala. From perfectly steamed momos to rich Thakali thalis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#menu" className="bg-gradient-to-r from-bamey-orange to-bamey-red hover:from-[#d47d25] hover:to-[#963026] text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_30px_rgba(224,138,44,0.4)] flex items-center justify-center gap-2">
              Explore Menu <ArrowRight size={18} />
            </a>
            <a href={`https://wa.me/${RESTAURANT.whatsapp}`} target="_blank" rel="noreferrer" className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-full font-bold transition-all border border-zinc-700 hover:border-zinc-500 flex items-center justify-center">
              Book a Table
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative h-[600px] hidden lg:block rounded-[2rem] overflow-hidden shadow-2xl border border-white/5"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/80 to-transparent z-10 mix-blend-overlay"></div>
          <img 
            src="/images/hero_momos.jpg" 
            alt="Nepalese Momos" 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 bg-zinc-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold tracking-widest text-bamey-orange uppercase mb-4">The Bamey's Experience</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white">A cozy slice of the Himalayas.</h3>
        </motion.div>

        <motion.div variants={stagger} initial="initial" whileInView="whileInView" className="grid md:grid-cols-3 gap-12">
          {[
            { title: "Culinary Heritage", desc: "Recipes passed down through generations, utilizing authentic Himalayan spices like Timur for an uncompromising, real taste.", img: "/images/thakali_thali.jpg" },
            { title: "Warm Ambience", desc: "A thoughtfully curated space featuring traditional prayer flags and a warm, inviting atmosphere perfect for friends and family.", img: "/images/cafe_interior.jpg" },
            { title: "Table-Bell Service", desc: "Experience our charming traditional service. Every table features a small brass bell—just ring it when you need us.", img: "/images/hero_momos.jpg" }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeIn} className="group cursor-pointer bg-zinc-950/50 p-6 rounded-[2rem] border border-white/5 hover:border-bamey-orange/50 transition-colors">
              <div className="relative h-56 mb-8 overflow-hidden rounded-xl bg-zinc-800">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
              </div>
              <h4 className="text-2xl font-display font-bold text-white mb-3">{item.title}</h4>
              <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Challenge = () => {
  return (
    <section id="challenge" className="py-32 bg-black text-white relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 z-0 opacity-40">
        <img src="/images/spicy_momos.jpg" alt="Spicy" className="w-full h-full object-cover mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div {...fadeIn} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/20 text-red-400 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            <Flame size={16} /> Extreme Heat
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">The Spiciest Momo Challenge.</h2>
          <p className="text-xl text-zinc-300 mb-12 max-w-2xl leading-relaxed">
            <span className="font-bold text-white">10 Momos. 10 Minutes. Ultimate Glory.</span><br/> Conquer our insanely spicy Dalle Khursani momos to win 90 days of free momos and a permanent spot on our Winners' Board.
          </p>
          
          <a href={`https://wa.me/${RESTAURANT.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] transform hover:scale-105">
            Accept the Challenge
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Menu = () => {
  const categories = [
    {
      name: "Momos",
      items: [
        { name: "Momo Platter", price: "₹350", desc: "Assortment of Steamed, Fried, Kothey, and Chilly momos.", highlight: true },
        { name: "Jhol Momo", price: "₹240", desc: "Momos drowned in a spicy sesame and tomato broth." },
        { name: "Kothey Momo", price: "₹220", desc: "Half pan-fried, half steamed with traditional spices." },
      ]
    },
    {
      name: "Himalayan Mains",
      items: [
        { name: "Thakali Veg Thali", price: "₹280", desc: "Rice, Dal, Gundruk, Achar, Sabzi, Papad, Curd & Ghee.", highlight: true },
        { name: "Chicken Choila", price: "₹260", desc: "Spicy grilled chicken tossed with mustard oil and fenugreek." },
        { name: "Laphing", price: "₹160", desc: "Cold mung bean noodle roll with spicy soy and garlic water." },
      ]
    }
  ];

  return (
    <section id="menu" className="py-32 bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div {...fadeIn} className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-bamey-orange uppercase mb-4">Menu</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white">Curated Offerings.</h3>
          </div>
          <a href={RESTAURANT.orderUrl} target="_blank" rel="noreferrer" className="text-white font-bold border-b-2 border-bamey-orange pb-1 hover:text-bamey-orange transition-colors inline-flex items-center gap-2">
            View Full Menu on Swiggy <ExternalLink size={16} />
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {categories.map((cat, idx) => (
            <motion.div key={idx} variants={fadeIn} initial="initial" whileInView="whileInView" viewport={{once: true, margin: "-50px"}}>
              <h4 className="text-3xl font-display font-bold text-white mb-8 pb-4 border-b border-zinc-800">{cat.name}</h4>
              <div className="space-y-8">
                {cat.items.map((item, i) => (
                  <div key={i} className="group relative p-6 rounded-2xl hover:bg-zinc-900 transition-colors border border-transparent hover:border-zinc-800 cursor-pointer">
                    <div className="flex justify-between items-baseline mb-2">
                      <h5 className="text-xl font-bold text-white group-hover:text-bamey-orange transition-colors flex items-center gap-3">
                        {item.name}
                        {item.highlight && <span className="text-[10px] uppercase tracking-widest bg-bamey-orange/20 text-bamey-orange px-2 py-1 rounded-sm">Must Try</span>}
                      </h5>
                      <span className="text-bamey-orange font-bold text-lg">{item.price}</span>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="visit" className="bg-black pt-24 pb-12 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid md:grid-cols-4 gap-12 mb-20">
        <div className="md:col-span-2">
          <span className="font-display font-bold text-4xl text-white mb-6 block tracking-tight">Bamey's<span className="text-bamey-orange">.</span></span>
          <p className="text-zinc-500 max-w-sm leading-relaxed text-lg">
            Bringing the authentic taste and warmth of the Himalayas to Koramangala. A perfect spot for friends, family, and food lovers.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact</h4>
          <ul className="space-y-4 text-zinc-400">
            <li>{RESTAURANT.phone}</li>
            <li>{RESTAURANT.phoneAlt}</li>
            <li className="leading-relaxed">{RESTAURANT.address}</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Hours</h4>
          <ul className="space-y-4 text-zinc-400">
            <li>{RESTAURANT.hours}</li>
            <li className="pt-4">
              <a href="#" className="text-bamey-orange hover:text-white font-bold transition-colors">Follow us on Social Media</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
        <p>© {new Date().getFullYear()} Bamey's Restro Cafe. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-body text-white antialiased selection:bg-bamey-orange selection:text-white bg-zinc-950">
      <Nav isScrolled={isScrolled} />
      <Hero />
      <About />
      <Challenge />
      <Menu />
      <Footer />
    </div>
  );
}

export default App;
