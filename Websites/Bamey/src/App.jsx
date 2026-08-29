import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X, MapPin, Clock, Phone, Star, ArrowRight, Flame, ExternalLink, Beer, Wine, Coffee, Music, GlassWater, Quote } from 'lucide-react';

// --- DATA ---
const RESTAURANT = {
  name: "Daawat Restaurant Bar & Pub",
  phone: "+91 98765 43210",
  phoneAlt: "+91 80 1234 5678",
  whatsapp: "919876543210",
  address: "Koramangala, Bengaluru, Karnataka 560034",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5833075253816!2d77.6186!3d12.9344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144e5b4b1a41%3A0x8e8749db712d9a3b!2sKoramangala!5e0!3m2!1sen!2sin!4v1689230588647!5m2!1sen!2sin",
  hours: "Daily, 12:00 PM – 1:00 AM",
  rating: "4.8"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  cocktail: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ambience: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  food: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  experience: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ]
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
  
  const navLinks = ['About', 'Menu', 'Experience', 'Reviews', 'Gallery', 'Visit'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-zinc-950/90 backdrop-blur-xl shadow-lg shadow-black/40 py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-3xl text-white tracking-tight group-hover:text-daawat-gold transition-colors">Daawat<span className="text-daawat-gold">.</span></span>
          </a>
          
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-zinc-300 hover:text-daawat-gold transition-colors">{item}</a>
            ))}
            <a 
              href={`https://wa.me/${RESTAURANT.whatsapp}`} 
              target="_blank" rel="noreferrer"
              className="bg-daawat-gold hover:bg-[#b5952f] text-black px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:-translate-y-0.5 shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center gap-2"
            >
              Reserve Table
            </a>
          </div>
          
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2">
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-zinc-900 border-t border-white/10 absolute w-full left-0 shadow-2xl px-6 py-6 space-y-4 overflow-hidden"
          >
            {navLinks.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="block text-lg font-medium text-zinc-200 border-b border-white/5 pb-3">{item}</a>
            ))}
            <a href={`https://wa.me/${RESTAURANT.whatsapp}`} target="_blank" rel="noreferrer" className="mt-6 bg-daawat-gold text-black text-center px-4 py-3 rounded-xl font-bold block w-full shadow-lg">
              Reserve Table
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-zinc-950 overflow-hidden pt-20">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-daawat-gold/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-daawat-crimson/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 bg-zinc-900/50 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/10">
            <span className="flex gap-1 text-daawat-gold"><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/></span>
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">{RESTAURANT.rating} Rated in Koramangala</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
            Elevated <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-daawat-gold to-daawat-amber">Dining & Drinks</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-10 font-body leading-relaxed max-w-lg">
            Experience the vibrant nightlife of Bengaluru with premium spirits, crafted cocktails, and a grand feast of flavors at Daawat.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#menu" className="bg-gradient-to-r from-daawat-gold to-[#b5952f] text-black px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2">
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
          className="relative h-[650px] hidden lg:block rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/60 to-transparent z-10 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-50"></div>
          <img 
            src={IMAGES.hero} 
            alt="Daawat Hero" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-8 left-8 z-20 bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-xl">
             <div className="h-12 w-12 bg-daawat-gold rounded-full flex items-center justify-center text-black">
                <GlassWater size={24} />
             </div>
             <div>
                <p className="text-white font-bold font-display text-lg">Signature Cocktails</p>
                <p className="text-zinc-300 text-sm">Crafted to perfection</p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 bg-zinc-900 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold tracking-widest text-daawat-gold uppercase mb-4">The Daawat Experience</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white">Where spirits meet spices.</h3>
        </motion.div>

        <motion.div variants={stagger} initial="initial" whileInView="whileInView" className="grid md:grid-cols-3 gap-12">
          {[
            { title: "Curated Cocktails", desc: "Expert mixologists crafting signature cocktails that push the boundaries of flavor.", icon: <Wine className="text-daawat-gold mb-4" size={32} />, img: IMAGES.cocktail },
            { title: "Lively Ambience", desc: "A vibrant space that transitions from a cozy restaurant by day to a pulsating pub by night.", icon: <Music className="text-daawat-gold mb-4" size={32} />, img: IMAGES.ambience },
            { title: "Gourmet Bites", desc: "Pair your drinks with our eclectic menu of global and local bar favorites, prepared fresh.", icon: <Flame className="text-daawat-gold mb-4" size={32} />, img: IMAGES.food }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeIn} className="group cursor-pointer bg-zinc-950/50 p-6 rounded-[2rem] border border-white/5 hover:border-daawat-gold/50 transition-colors flex flex-col items-center text-center">
              <div className="relative h-48 w-full mb-8 overflow-hidden rounded-xl bg-zinc-800">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.icon}
                </div>
              </div>
              <h4 className="text-2xl font-display font-bold text-white mb-3">{item.title}</h4>
              <p className="text-zinc-400 leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-32 bg-black text-white relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 z-0">
        <img src={IMAGES.experience} alt="Live Nights at Daawat" className="w-full h-full object-cover mix-blend-luminosity opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex items-center min-h-[60vh]">
        <motion.div {...fadeIn} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-daawat-gold/20 text-daawat-gold rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-daawat-gold/30">
            <Music size={16} /> Live Nights
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400">Unforgettable Evenings.</h2>
          <p className="text-xl text-zinc-300 mb-12 max-w-2xl leading-relaxed">
            <span className="font-bold text-white">Music, Drinks, and Memories.</span><br/> Join us for weekend DJ sets, acoustic live bands, and exclusive tasting events designed for those who appreciate the finer things. Let the rhythm take over as you sip on our signature creations.
          </p>
          
          <a href={`https://wa.me/${RESTAURANT.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-daawat-gold hover:bg-[#b5952f] text-black px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] transform hover:scale-105">
            View Upcoming Events <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Menu = () => {
  const categories = [
    {
      name: "Bar Bites",
      items: [
        { name: "Loaded Nachos", price: "₹350", desc: "Tortilla chips stacked with cheese, jalapenos, and our signature salsa.", highlight: true },
        { name: "Crispy Calamari", price: "₹450", desc: "Served with a zesty garlic aioli." },
        { name: "Spicy Chicken Wings", price: "₹380", desc: "Tossed in fiery hot sauce, served with blue cheese dip." },
        { name: "Paneer Tikka Skewers", price: "₹320", desc: "Charcoal grilled paneer marinated in aromatic Indian spices." },
      ]
    },
    {
      name: "Signature Cocktails",
      items: [
        { name: "The Daawat Gold", price: "₹550", desc: "Premium whiskey, honey syrup, bitters, and an orange twist.", highlight: true },
        { name: "Crimson Sunset", price: "₹480", desc: "Vodka, cranberry, lime, and a splash of ginger ale." },
        { name: "Classic Mojito", price: "₹420", desc: "White rum, fresh mint, lime juice, and soda." },
        { name: "Spiced Old Fashioned", price: "₹600", desc: "Bourbon, cinnamon infused syrup, and angostura bitters." },
      ]
    }
  ];

  return (
    <section id="menu" className="py-32 bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div {...fadeIn} className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-daawat-gold uppercase mb-4">Menu</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white">Taste the Night.</h3>
          </div>
          <a href="#" className="text-white font-bold border-b-2 border-daawat-gold pb-1 hover:text-daawat-gold transition-colors inline-flex items-center gap-2">
            Download Full Menu <ExternalLink size={16} />
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {categories.map((cat, idx) => (
            <motion.div key={idx} variants={fadeIn} initial="initial" whileInView="whileInView" viewport={{once: true, margin: "-50px"}}>
              <h4 className="text-3xl font-display font-bold text-white mb-8 pb-4 border-b border-zinc-800 flex items-center gap-3">
                 {cat.name === 'Bar Bites' ? <Flame className="text-daawat-gold"/> : <GlassWater className="text-daawat-gold"/>}
                 {cat.name}
              </h4>
              <div className="space-y-6">
                {cat.items.map((item, i) => (
                  <div key={i} className="group relative p-6 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900 transition-colors border border-white/5 hover:border-zinc-700 cursor-pointer">
                    <div className="flex justify-between items-baseline mb-2">
                      <h5 className="text-xl font-bold text-white group-hover:text-daawat-gold transition-colors flex items-center gap-3">
                        {item.name}
                        {item.highlight && <span className="text-[10px] uppercase tracking-widest bg-daawat-gold/20 text-daawat-gold px-2 py-1 rounded-sm">House Favorite</span>}
                      </h5>
                      <span className="text-daawat-gold font-bold text-lg whitespace-nowrap ml-4">{item.price}</span>
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

const Reviews = () => {
  return (
    <section id="reviews" className="py-32 bg-zinc-900 border-t border-white/5">
       <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold tracking-widest text-daawat-gold uppercase mb-4">Testimonials</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white">What our guests say.</h3>
          </motion.div>

          <motion.div variants={stagger} initial="initial" whileInView="whileInView" className="grid md:grid-cols-3 gap-8">
             {[
               { text: "Absolutely phenomenal! The cocktails are top-tier, and the ambience is perfectly tuned for a great night out with friends.", author: "Rohan K." },
               { text: "The Bar Bites here are exceptional. I highly recommend the Loaded Nachos and the Spiced Old Fashioned. A must-visit in Koramangala.", author: "Priya S." },
               { text: "Best pub in Bangalore! The live music on weekends sets an amazing vibe. The service is incredibly fast and courteous.", author: "Arjun M." }
             ].map((review, i) => (
                <motion.div key={i} variants={fadeIn} className="bg-zinc-950 p-8 rounded-3xl border border-white/5 relative">
                   <Quote className="text-zinc-800 absolute top-6 right-6" size={48} />
                   <div className="flex gap-1 text-daawat-gold mb-6">
                      <Star size={16} className="fill-current"/><Star size={16} className="fill-current"/><Star size={16} className="fill-current"/><Star size={16} className="fill-current"/><Star size={16} className="fill-current"/>
                   </div>
                   <p className="text-zinc-300 mb-8 italic relative z-10 leading-relaxed text-lg">"{review.text}"</p>
                   <p className="text-white font-bold font-display">{review.author}</p>
                </motion.div>
             ))}
          </motion.div>
       </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="py-32 bg-zinc-950 border-t border-white/5">
       <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeIn} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-daawat-gold uppercase mb-4">Gallery</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-white">Moments at Daawat.</h3>
            </div>
            <a href={`https://instagram.com`} target="_blank" rel="noreferrer" className="text-white font-bold border-b-2 border-daawat-gold pb-1 hover:text-daawat-gold transition-colors inline-flex items-center gap-2">
              Follow us on Instagram <ExternalLink size={16} />
            </a>
          </motion.div>

          <motion.div variants={stagger} initial="initial" whileInView="whileInView" className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {IMAGES.gallery.map((img, i) => (
                <motion.div key={i} variants={fadeIn} className={`relative overflow-hidden rounded-2xl group ${i === 0 || i === 3 || i === 4 ? 'md:col-span-2 aspect-video' : 'aspect-square'}`}>
                   <img src={img} alt={`Gallery Image ${i+1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-daawat-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"></div>
                </motion.div>
             ))}
          </motion.div>
       </div>
    </section>
  )
}


const Footer = () => (
  <footer id="visit" className="bg-black pt-24 pb-12 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid md:grid-cols-4 gap-12 mb-20">
        <div className="md:col-span-2">
          <span className="font-display font-bold text-4xl text-white mb-6 block tracking-tight">Daawat<span className="text-daawat-gold">.</span></span>
          <p className="text-zinc-500 max-w-sm leading-relaxed text-lg">
            The premier destination for food, drinks, and unforgettable nights in Koramangala. 
            Elevating the standard of dining and nightlife in Bengaluru.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact</h4>
          <ul className="space-y-4 text-zinc-400">
            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><Phone size={16} /> {RESTAURANT.phone}</li>
            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><Phone size={16} /> {RESTAURANT.phoneAlt}</li>
            <li className="leading-relaxed flex items-start gap-3 mt-4"><MapPin size={16} className="mt-1 flex-shrink-0" /> {RESTAURANT.address}</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Hours</h4>
          <ul className="space-y-4 text-zinc-400">
            <li className="flex items-center gap-3"><Clock size={16} /> {RESTAURANT.hours}</li>
            <li className="pt-6">
              <a href="#" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl font-bold transition-colors">
                 Get Directions
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
        <p>© {new Date().getFullYear()} Daawat Restaurant Bar & Pub. All rights reserved.</p>
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
    <div className="font-body text-white antialiased selection:bg-daawat-gold selection:text-black bg-zinc-950">
      <Nav isScrolled={isScrolled} />
      <Hero />
      <About />
      <Experience />
      <Menu />
      <Reviews />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;
