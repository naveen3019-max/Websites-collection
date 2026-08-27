import React, { useState } from 'react';

// --- CONSTANTS ---
const RESTAURANT_INFO = {
  name: "Naati Cafe",
  kannadaName: "ನಾಟಿ ಕೆಫೆ",
  tagline: "Real naati-style food. Earthy, rustic, and bursting with village flavors.",
  address: "56, 1st A Main Road, KHB Colony, 7th Block, Koramangala, Bengaluru, Karnataka 560030",
  phone: "+91 70221 81114",
  altPhone: "+91 86606 67671",
  whatsapp: "917022181114",
  hours: "Daily 7:30 AM – 11:00 PM",
  rating: "4.3",
  reviewsCount: "1,379+",
  swiggyUrl: "https://www.swiggy.com/", // Placeholder
  zomatoUrl: "https://www.zomato.com/", // Placeholder
  googleMapsUrl: "https://www.google.com/maps/place/Naati+Cafe/@12.9361912,77.6154139,15z/data=!4m10!1m2!2m1!1sNaati+Cafe!3m6!1s0x3bae15ab00c7b6b3:0xbfa09a398ac2356e!8m2!3d12.9361912!4d77.6154139!15sCgpOYWF0aSBDYWZlWhwiGm5hYXRpIGNhZmXgAQA!16s%2Fg%2F11j2__xbgc",
};

const MENU_CATEGORIES = [
  { id: 'biryani', name: 'Biryani' },
  { id: 'specials', name: 'Chicken & Mutton Specials' },
  { id: 'tiffin', name: 'Tiffin/Breakfast' },
  { id: 'starters', name: 'Starters' },
  { id: 'mains', name: 'South Indian Mains' },
  { id: 'beverages', name: 'Beverages' },
];

const MENU_ITEMS = [
  { id: 1, category: 'biryani', name: 'Naati Style Chicken Biryani', price: 220, isSignature: true, description: 'Traditional aromatic rice cooked with tender chicken and secret naati spices.' },
  { id: 2, category: 'biryani', name: 'Naati Style Mutton Biryani', price: 300, isSignature: true, description: 'Rich, flavorful mutton biryani cooked slow in traditional style.' },
  { id: 3, category: 'biryani', name: 'Mushroom Biryani', price: 190, isSignature: false, description: 'Fresh mushrooms layered with fragrant jeera rice and spices.' },
  { id: 4, category: 'biryani', name: 'Naati Veg Biryani', price: 180, isSignature: false, description: 'Mixed vegetables and paneer cooked with our signature biryani masala.' },
  { id: 5, category: 'specials', name: 'Bellari Chilli Chicken', price: 210, isSignature: true, description: 'Spicy, fiery Bellari style chicken toss with green chilies.' },
  { id: 6, category: 'specials', name: 'Mutton Keema', price: 280, isSignature: true, description: 'Minced mutton cooked with robust, earthy spices.' },
  { id: 7, category: 'specials', name: 'Naati Chicken Fry', price: 190, isSignature: false, description: 'Bone-in chicken fried with a heavy pepper and curry leaf coating.' },
  { id: 8, category: 'specials', name: 'Mutton Chops', price: 320, isSignature: true, description: 'Tender mutton chops cooked in a rich, dark pepper gravy.' },
  { id: 9, category: 'tiffin', name: 'Tatty Idli (2 pcs)', price: 60, isSignature: false, description: 'Soft, fluffy traditional flat idlis served with coconut chutney and sambar.' },
  { id: 10, category: 'tiffin', name: 'Masala Dosa', price: 80, isSignature: false, description: 'Crispy golden dosa with a spiced potato filling.' },
  { id: 11, category: 'tiffin', name: 'Set Dosa', price: 70, isSignature: false, description: 'Set of 3 incredibly soft, spongy dosas served with veg sagu.' },
  { id: 12, category: 'tiffin', name: 'Medu Vada (2 pcs)', price: 50, isSignature: false, description: 'Crispy on the outside, soft on the inside lentil donuts.' },
  { id: 13, category: 'starters', name: 'Chicken Kebab', price: 160, isSignature: true, description: 'Crispy deep-fried chicken marinated in fiery red spices.' },
  { id: 14, category: 'starters', name: 'Guntur Chicken', price: 200, isSignature: false, description: 'Extremely spicy chicken starter made with Guntur red chilies.' },
  { id: 15, category: 'starters', name: 'Gobi Manchurian', price: 120, isSignature: false, description: 'Indo-Chinese style crispy cauliflower florets in a tangy sauce.' },
  { id: 16, category: 'starters', name: 'Paneer Pepper Dry', price: 170, isSignature: false, description: 'Soft paneer cubes tossed with crushed black pepper and onions.' },
  { id: 17, category: 'mains', name: 'Naati Chicken Curry', price: 220, isSignature: false, description: 'Home-style chicken curry made with freshly ground coconut and spices.' },
  { id: 18, category: 'mains', name: 'Ragi Mudde', price: 40, isSignature: true, description: 'Healthy finger millet balls, pairs perfectly with our chicken or mutton curry.' },
  { id: 19, category: 'mains', name: 'Akki Roti', price: 50, isSignature: false, description: 'Traditional rice flour flatbread spiced with dill leaves, onions, and cumin.' },
  { id: 20, category: 'mains', name: 'Mutton Kurma', price: 290, isSignature: false, description: 'Slow-cooked mutton in a rich coconut and cashew gravy.' },
  { id: 21, category: 'beverages', name: 'Filter Coffee', price: 40, isSignature: true, description: 'Strong, aromatic South Indian filter coffee in a steel dabara.' },
  { id: 22, category: 'beverages', name: 'Spiced Buttermilk', price: 30, isSignature: false, description: 'Cooling yogurt drink with ginger, coriander, and green chilies.' },
  { id: 23, category: 'beverages', name: 'Sweet Lassi', price: 60, isSignature: false, description: 'Thick, sweet, and creamy churned yogurt.' },
];

const GALLERY_IMAGES = [
  { id: 1, label: 'Naati Biryani Spread', src: '/biryani.jpg' },
  { id: 2, label: 'Bellari Chilli Chicken', src: '/chilli_chicken.jpg' },
  { id: 3, label: 'Weekend Breakfast', src: '/tiffin.jpg' },
  { id: 4, label: 'Bustling Interior', src: '/hero.jpg' },
  { id: 5, label: 'Traditional Cooking', src: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=800' },
  { id: 6, label: 'Hand-Ground Spices', src: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800' },
  { id: 7, label: 'Rich Naati Gravies', src: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800' },
  { id: 8, label: 'Village Style Chops', src: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800' },
];

const REVIEWS = [
  { id: 1, author: 'Siddharth M.', text: '"Proper authentic taste. The biryani hits the right naati spot without being overly greasy. Excellent value for money."', rating: 5 },
  { id: 2, author: 'Pooja K.', text: '"The Bellari Chilli Chicken is a must-try! Very casual vibe, perfect for a quick weekend lunch with friends."', rating: 4 },
  { id: 3, author: 'Rahul S.', text: '"Love their weekend tiffin. The idlis are soft and the filter coffee is exactly how it should be. Downstairs seating gets full fast!"', rating: 5 },
];

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-[#F5E6D3]/95 backdrop-blur-sm border-b-[6px] border-[#8C3A1B] shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-24 items-center">
        <div className="flex-shrink-0 flex flex-col justify-center">
          <span className="font-display font-bold text-3xl text-[#8C3A1B] leading-none drop-shadow-sm">{RESTAURANT_INFO.name}</span>
          <span className="text-sm font-bold text-naati-green mt-1 tracking-wider">{RESTAURANT_INFO.kannadaName}</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#about" className="text-stone-800 hover:text-naati-terracotta transition font-bold text-lg">Our Story</a>
          <a href="#menu" className="text-stone-800 hover:text-naati-terracotta transition font-bold text-lg">Menu</a>
          <a href="#gallery" className="text-stone-800 hover:text-naati-terracotta transition font-bold text-lg">Gallery</a>
          <a href="#visit" className="text-stone-800 hover:text-naati-terracotta transition font-bold text-lg">Visit</a>
        </div>
        <div>
          <a 
            href={RESTAURANT_INFO.swiggyUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#FC8019] hover:bg-[#e67315] text-white px-6 py-2.5 rounded-lg font-bold shadow-[4px_4px_0px_rgba(140,58,27,1)] transition transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
          >
            Order on Swiggy
          </a>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative bg-stone-900 pt-16 pb-24 md:pt-32 md:pb-40 overflow-hidden border-b-[16px] border-[#8C3A1B] shadow-2xl">
    <div className="absolute inset-0 z-0">
      <img src="/hero.jpg" alt="Naati Cafe Interior" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#4A2615]/80 to-[#2A1108]/95"></div>
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto text-center px-4">
      <div className="text-naati-yellow text-4xl mb-4 opacity-90 drop-shadow-lg">❁ ❁ ❁</div>
      
      <a href={RESTAURANT_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full shadow-lg border border-white/20 mb-8 hover:bg-white/20 transition cursor-pointer">
        <span className="text-naati-yellow text-xl">★</span>
        <span className="font-bold text-white tracking-wide">{RESTAURANT_INFO.rating}</span>
        <span className="text-stone-200 text-sm font-medium">({RESTAURANT_INFO.reviewsCount} Google Reviews)</span>
      </a>
      
      <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold text-white tracking-tight mb-4 md:mb-6 leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
        {RESTAURANT_INFO.name} <br/> 
        <span className="text-naati-yellow block mt-3 text-4xl sm:text-5xl md:text-6xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{RESTAURANT_INFO.kannadaName}</span>
      </h1>
      
      <p className="mt-6 md:mt-8 max-w-3xl text-xl md:text-2xl text-[#F5E6D3] mx-auto font-medium px-4 drop-shadow-md leading-relaxed">
        {RESTAURANT_INFO.tagline}
      </p>
      
      <div className="text-naati-yellow text-4xl mt-10 mb-10 opacity-90 drop-shadow-lg">❁ ❁ ❁</div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-6 px-4 sm:px-0">
        <a 
          href={RESTAURANT_INFO.swiggyUrl}
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#FC8019] hover:bg-[#e67315] text-white px-10 py-4 rounded-xl font-bold text-xl shadow-[6px_6px_0px_rgba(0,0,0,0.4)] transition transform hover:-translate-y-1 active:translate-y-2 active:shadow-none w-full sm:w-auto"
        >
          Order on Swiggy
        </a>
        <a 
          href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi, I'd like to enquire about a table/order at Naati Cafe`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20b858] text-white px-10 py-4 rounded-xl font-bold text-xl shadow-[6px_6px_0px_rgba(0,0,0,0.4)] transition transform hover:-translate-y-1 active:translate-y-2 active:shadow-none w-full sm:w-auto flex items-center justify-center gap-3"
        >
          <span>WhatsApp Us</span>
        </a>
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-20 md:py-32 bg-[#F5E6D3] relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%238C3A1B\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
    
    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[#8C3A1B] mb-6">The Naati Experience</h2>
          <div className="w-32 h-2 bg-naati-yellow mb-8 rounded-full"></div>
          <p className="text-lg md:text-xl text-stone-800 leading-relaxed mb-6 font-medium">
            Located in the heart of Koramangala (7th Block), <strong>Naati Cafe</strong> is your bustling, casual spot for authentic Karnataka "naati-style" cooking. Rated 4.3 stars by over 1,300 happy guests, we pride ourselves on serving real flavors with absolutely no shortcuts.
          </p>
          <p className="text-lg md:text-xl text-stone-800 leading-relaxed font-medium">
            From early morning tiffins to late-night biryani runs, our kitchen is always firing. We believe in preserving the earthy, fire-cooked tastes of Karnataka's villages and bringing them straight to your table in Bengaluru.
          </p>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=800" alt="Village cooking" className="rounded-2xl shadow-[12px_12px_0px_rgba(181,80,46,1)] border-4 border-[#8C3A1B] transform lg:rotate-2 object-cover aspect-[4/3] w-full" />
          <div className="absolute -bottom-8 -left-8 bg-naati-yellow text-stone-900 font-bold text-xl px-8 py-4 rounded-xl shadow-xl transform -rotate-6 border-2 border-stone-900">
            100% Authentic
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="bg-[#FAF3E4] p-8 rounded-2xl shadow-[8px_8px_0px_rgba(60,93,58,0.2)] border-2 border-naati-green hover:-translate-y-2 transition duration-300">
          <div className="text-5xl mb-6">🌿</div>
          <h3 className="text-2xl font-display font-bold text-stone-900 mb-4">Hand-Ground Spices</h3>
          <p className="text-stone-700 text-lg font-medium">Our masalas are ground daily using traditional methods. We source our chilies from Guntur and Bellary for that undeniable Naati punch.</p>
        </div>
        <div className="bg-[#FAF3E4] p-8 rounded-2xl shadow-[8px_8px_0px_rgba(181,80,46,0.2)] border-2 border-[#8C3A1B] hover:-translate-y-2 transition duration-300">
          <div className="text-5xl mb-6">🪵</div>
          <h3 className="text-2xl font-display font-bold text-stone-900 mb-4">Slow Fire Cooked</h3>
          <p className="text-stone-700 text-lg font-medium">Great food takes time. Our signature Mutton Keema and Biryanis are slow-cooked to perfection over hours, locking in the earthy village flavors.</p>
        </div>
        <div className="bg-[#FAF3E4] p-8 rounded-2xl shadow-[8px_8px_0px_rgba(224,168,62,0.2)] border-2 border-naati-yellow hover:-translate-y-2 transition duration-300">
          <div className="text-5xl mb-6">🥘</div>
          <h3 className="text-2xl font-display font-bold text-stone-900 mb-4">Banana Leaf Feasts</h3>
          <p className="text-stone-700 text-lg font-medium">Mornings at Naati Cafe are iconic. Start your day with soft Tatty Idlis, crispy Set Dosas, and a frothy steel tumbler of strong Filter Coffee.</p>
        </div>
      </div>
    </div>
  </section>
);

const Menu = () => {
  const [activeTab, setActiveTab] = useState(MENU_CATEGORIES[0].id);
  const currentItems = MENU_ITEMS.filter(item => item.category === activeTab);

  return (
    <section id="menu" className="py-24 bg-[#FAF3E4] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-stone-900 mb-4">Village Menu</h2>
          <div className="w-32 h-2 bg-naati-green mx-auto rounded-full"></div>
        </div>
        
        {/* Tabs */}
        <div className="flex overflow-x-auto pb-6 mb-12 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar space-x-3 snap-x">
          {MENU_CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`snap-start whitespace-nowrap px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-sm border-2 ${
                activeTab === category.id 
                  ? 'bg-naati-green text-white border-naati-green shadow-[4px_4px_0px_rgba(0,0,0,0.8)] transform -translate-y-1' 
                  : 'bg-white text-stone-700 border-stone-200 hover:border-naati-green hover:text-naati-green'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid md:grid-cols-2 gap-8">
          {currentItems.map(item => (
            <div key={item.id} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border-l-8 border-[#8C3A1B] border-y border-r border-stone-200 hover:shadow-xl transition group relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition duration-500 text-9xl pointer-events-none">🌿</div>
              
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="pr-4">
                  <h3 className="text-2xl font-display font-bold text-stone-900 group-hover:text-[#8C3A1B] transition">{item.name}</h3>
                  {item.isSignature && (
                    <span className="inline-block bg-naati-yellow text-stone-900 text-xs font-bold px-3 py-1 rounded-full mt-2 uppercase tracking-wide border border-stone-900">
                      ★ Chef's Special
                    </span>
                  )}
                </div>
                <span className="text-2xl font-bold text-naati-green whitespace-nowrap bg-naati-green/10 px-4 py-2 rounded-lg">₹{item.price}</span>
              </div>
              <p className="text-stone-600 text-base md:text-lg mt-3 relative z-10 font-medium leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
        
        {currentItems.length === 0 && (
          <p className="text-center text-stone-500 py-10 text-xl font-medium">More items coming soon...</p>
        )}
      </div>
    </section>
  );
};

const Gallery = () => (
  <section id="gallery" className="py-24 bg-[#F5E6D3] border-t-8 border-[#8C3A1B]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-5xl md:text-6xl font-display font-bold text-stone-900 mb-16 text-center">Sights & Flavors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {GALLERY_IMAGES.map((img) => (
          <div key={img.id} className="relative aspect-square rounded-xl shadow-lg overflow-hidden group border-4 border-white bg-stone-200">
            <img 
              src={img.src} 
              alt={img.label} 
              className="w-full h-full object-cover transform transition duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A1108]/90 via-[#4A2615]/40 to-transparent flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition duration-300">
              <span className="text-white font-bold text-xl drop-shadow-md text-center font-display tracking-wide">{img.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Reviews = () => (
  <section id="reviews" className="py-24 bg-[#8C3A1B] text-[#F5E6D3] relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <h2 className="text-5xl md:text-6xl font-display font-bold mb-16 text-center text-white">What People Say</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {REVIEWS.map(review => (
          <div key={review.id} className="bg-[#4A2615]/40 p-10 rounded-3xl backdrop-blur-sm border-2 border-[#B5502E] shadow-xl relative mt-8 hover:-translate-y-2 transition duration-300">
            <div className="absolute -top-6 left-10 text-6xl text-naati-yellow drop-shadow-md">"</div>
            <div className="text-naati-yellow mb-6 text-2xl tracking-widest mt-4">
              {"★".repeat(review.rating)}
            </div>
            <p className="text-xl font-medium mb-8 leading-relaxed text-[#F5E6D3]">{review.text}</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#B5502E] rounded-full flex items-center justify-center font-bold text-xl text-white border-2 border-naati-yellow">
                {review.author.charAt(0)}
              </div>
              <p className="font-bold text-white text-lg tracking-wide">{review.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Visit = () => (
  <section id="visit" className="py-24 bg-[#FAF3E4]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-[#F5E6D3] overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="p-10 md:p-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-stone-900 mb-8">Visit Our Kitchen</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="text-3xl">📍</div>
                <div>
                  <h3 className="font-bold text-xl text-stone-900 mb-2">Address</h3>
                  <p className="text-stone-600 text-lg font-medium max-w-sm">{RESTAURANT_INFO.address}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">🕒</div>
                <div>
                  <h3 className="font-bold text-xl text-stone-900 mb-2">Hours</h3>
                  <p className="text-stone-600 text-lg font-medium">{RESTAURANT_INFO.hours}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">📞</div>
                <div>
                  <h3 className="font-bold text-xl text-stone-900 mb-2">Contact</h3>
                  <p className="text-stone-600 text-lg font-medium">{RESTAURANT_INFO.phone} <br/> {RESTAURANT_INFO.altPhone}</p>
                </div>
              </div>
              
              <div className="pt-8 flex flex-wrap gap-4 border-t border-stone-200">
                <a 
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank" rel="noopener noreferrer"
                  className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[4px_4px_0px_rgba(181,80,46,0.5)] transition transform hover:-translate-y-1 active:translate-y-1 active:shadow-none"
                >
                  Get Directions
                </a>
                <button 
                  onClick={() => navigator.clipboard.writeText(RESTAURANT_INFO.address)}
                  className="bg-stone-200 hover:bg-stone-300 text-stone-800 px-8 py-4 rounded-xl font-bold text-lg shadow-sm transition"
                >
                  Copy Address
                </button>
              </div>
            </div>
          </div>
          <div className="h-[400px] lg:h-auto bg-stone-300 relative border-l-4 border-[#F5E6D3]">
             <iframe 
               src="https://maps.google.com/maps?q=Naati%20Cafe,%2056,%201st%20A%20Main%20Road,%20KHB%20Colony,%207th%20Block,%20Koramangala,%20Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen="" 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               title="Naati Cafe Location"
               className="absolute inset-0"
             ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-stone-900 text-[#F5E6D3] py-16 text-center pb-32 md:pb-16 border-t-8 border-naati-green">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-display font-bold text-white mb-2">{RESTAURANT_INFO.name}</h2>
      <p className="mb-10 text-naati-yellow font-bold tracking-widest">{RESTAURANT_INFO.kannadaName}</p>
      
      <div className="flex justify-center space-x-8 mb-12">
         <a href={RESTAURANT_INFO.swiggyUrl} className="font-bold text-lg hover:text-white transition">Swiggy</a>
         <a href={RESTAURANT_INFO.zomatoUrl} className="font-bold text-lg hover:text-white transition">Zomato</a>
         <a href={`https://wa.me/${RESTAURANT_INFO.whatsapp}`} className="font-bold text-lg hover:text-white transition">WhatsApp</a>
      </div>
      
      <div className="text-[#B5502E] text-2xl mb-8">❁ ❁ ❁</div>
      <p className="text-sm font-medium">© {new Date().getFullYear()} {RESTAURANT_INFO.name}. All rights reserved.</p>
    </div>
  </footer>
);

const MobileActionBar = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-[#FAF3E4] border-t-[3px] border-[#8C3A1B] p-3 flex gap-2 z-50 md:hidden shadow-[0_-10px_20px_rgba(0,0,0,0.15)]">
    <a href={`tel:${RESTAURANT_INFO.phone.replace(/[^0-9+]/g, '')}`} className="flex-1 bg-stone-200 text-stone-900 text-center py-3.5 rounded-xl font-bold text-sm shadow-sm active:bg-stone-300 flex items-center justify-center">
      Call
    </a>
    <a href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#25D366] text-white text-center py-3.5 rounded-xl font-bold text-sm shadow-sm active:bg-[#20b858] flex items-center justify-center">
      WhatsApp
    </a>
    <a href={RESTAURANT_INFO.swiggyUrl} target="_blank" rel="noopener noreferrer" className="flex-[1.5] bg-[#FC8019] text-white text-center py-3.5 rounded-xl font-bold text-sm shadow-sm active:bg-[#e67315] flex items-center justify-center">
      Order Now
    </a>
  </div>
);

const WhatsappFab = () => (
  <a 
    href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi, I'd like to enquire about a table/order at Naati Cafe`}
    target="_blank" rel="noopener noreferrer"
    className="hidden md:flex fixed bottom-8 right-8 bg-[#25D366] hover:bg-[#20b858] text-white p-5 rounded-full shadow-[0_10px_20px_rgba(37,211,102,0.4)] z-50 transition-all transform hover:scale-110 items-center justify-center border-2 border-white"
    title="Chat on WhatsApp"
  >
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.161.487-.916.947-1.313 1.022-.397.076-.898.135-2.835-.667-2.36-1.02-3.859-3.148-3.976-3.305-.118-.157-.948-1.267-.948-2.414s.608-1.714.826-1.932c.219-.219.475-.274.636-.274.161 0 .321 0 .466.007.151.008.354-.058.553.42.215.515.694 1.702.754 1.823.061.121.101.263.02.42-.08.156-.121.253-.24.394-.121.141-.252.302-.36.402-.121.119-.247.251-.106.495.141.244.629 1.042 1.348 1.688.927.834 1.71 1.092 1.95 1.212.241.121.378.102.523-.058.146-.16.634-.736.805-.989.171-.253.342-.21.562-.128.22.083 1.393.659 1.634.78.241.121.401.182.46.284.059.102.059.589-.102 1.076z"/></svg>
  </a>
);

function App() {
  return (
    <div className="font-sans antialiased text-stone-900 bg-[#FAF3E4] selection:bg-[#8C3A1B] selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Reviews />
      <Visit />
      <Footer />
      <MobileActionBar />
      <WhatsappFab />
    </div>
  );
}

export default App;
