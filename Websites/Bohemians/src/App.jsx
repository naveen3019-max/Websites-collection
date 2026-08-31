import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Menu as MenuIcon, 
  X, 
  ChevronRight,
  Camera,
  Globe,
  Coffee,
  Music,
  Dog,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';

// --- CONFIGURATION CONSTANTS ---
const RESTAURANT = {
  name: "Bohemians",
  tagline: "A bohemian bungalow, right in Indiranagar",
  address: "966, 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560008",
  mapsLink: "https://maps.app.goo.gl/bohemians", // Updated maps link
  phone: "919880435789", // Updated phone number
  hours: "11:00 AM – 12:30 AM",
  rating: "4.1",
  reviewCount: "3,000+",
  swiggyLink: "https://www.swiggy.com/restaurants/bohemians-indiranagar-bangalore-placeholder", // PLACEHOLDER
  zomatoLink: "https://www.zomato.com/bangalore/bohemians-indiranagar-bangalore", // PLACEHOLDER
  instagram: "https://instagram.com/bohemians.indiranagar"
};

const MENU_CATEGORIES = [
  "Starters & Kebabs", 
  "Dim Sums", 
  "Mains", 
  "Pizza", 
  "Salads & Healthy", 
  "Desserts", 
  "Bar Menu"
];

const MENU_ITEMS = {
  "Starters & Kebabs": [
    { name: "Sabudana Sago Kebabs", price: "₹345", description: "Crispy sago pearls with peanuts and warm spices", signature: true },
    { name: "Crispy Lotus Stem", price: "₹395", description: "Tossed in a sweet and spicy honey chili glaze", signature: true },
    { name: "Kerala Fried Chicken", price: "₹425", description: "Spicy, crispy chicken bites with curry leaves", signature: true },
    { name: "Paneer Tikka", price: "₹395", description: "Classic tandoor roasted cottage cheese" },
    { name: "Mutton Seekh Kebab", price: "₹495", description: "Minced lamb skewers with fragrant spices" }
  ],
  "Dim Sums": [
    { name: "Truffle Edamame Dumpling", price: "₹425", description: "Delicate wrapper filled with earthy truffle and edamame", signature: true },
    { name: "Chicken & Water Chestnut", price: "₹395", description: "Classic steamed dim sum with a crunch" },
    { name: "Prawn Har Gow", price: "₹445", description: "Translucent dumplings with plump prawns" }
  ],
  "Mains": [
    { name: "Railway Mutton", price: "₹595", description: "Slow-cooked colonial era mutton curry with potatoes", signature: true },
    { name: "Massaman Curry", price: "₹525", description: "Rich, mild Thai curry with coconut milk and peanuts", signature: true },
    { name: "Coconut Rice", price: "₹245", description: "Fragrant jasmine rice cooked in coconut milk", signature: true },
    { name: "Dal Makhani", price: "₹395", description: "Overnight simmered black lentils" },
    { name: "Butter Chicken", price: "₹495", description: "Classic creamy tomato gravy" }
  ],
  "Pizza": [
    { name: "Margherita", price: "₹495", description: "Fresh basil, mozzarella, san marzano tomatoes" },
    { name: "Truffle Fungi", price: "₹595", description: "Wild mushrooms, truffle oil, mozzarella" },
    { name: "Pepperoni", price: "₹645", description: "Spicy pork pepperoni, mozzarella" }
  ],
  "Salads & Healthy": [
    { name: "Quinoa & Avocado Bowl", price: "₹425", description: "Mixed greens, cherry tomatoes, citrus dressing" },
    { name: "Greek Salad", price: "₹395", description: "Feta, olives, cucumber, tomatoes, oregano" }
  ],
  "Desserts": [
    { name: "Dark Chocolate Cake", price: "₹345", description: "Decadent layered chocolate cake", signature: true },
    { name: "Tiramisu", price: "₹395", description: "Classic Italian coffee flavored dessert" },
    { name: "Baked Cheesecake", price: "₹395", description: "New York style with berry compote" }
  ],
  "Bar Menu": [
    { name: "Bohemian Rhapsody", price: "₹595", description: "Signature gin cocktail with elderflower and cucumber", signature: true },
    { name: "Old Fashioned", price: "₹545", description: "Bourbon, bitters, orange peel" },
    { name: "Margarita", price: "₹495", description: "Tequila, lime, triple sec" },
    { name: "Classic Mojito", price: "₹495", description: "Rum, mint, lime, soda" }
  ]
};

const REVIEWS = [
  {
    name: "Priya S.",
    rating: 5,
    text: "The ambience is absolutely magical! It feels like you've walked into a cozy, artsy home. The Railway Mutton with Coconut Rice was incredible. Highly recommend the outdoor seating on a breezy evening.",
    date: "2 weeks ago"
  },
  {
    name: "Rahul M.",
    rating: 5,
    text: "Great spot for pet lovers! We brought our golden retriever and the staff (especially Noel) were so accommodating. The Sabudana Kebabs are a must-try. Live music on weekends adds to the whole vibe.",
    date: "1 month ago"
  },
  {
    name: "Anjali K.",
    rating: 5,
    text: "Beautiful bohemian decor and perfectly dim lighting. It's my favorite date night spot in Indiranagar. The Massaman Curry is authentic and delicious. Service by Prem was prompt and warm.",
    date: "3 weeks ago"
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState(MENU_CATEGORIES[0]);

  // Reservation Form State
  const [resDate, setResDate] = useState("");
  const [resTime, setResTime] = useState("");
  const [resGuests, setResGuests] = useState("2");
  const [resSeating, setResSeating] = useState("Outdoor (Pet-friendly)");
  const [resName, setResName] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    const message = `Hi, I'd like to reserve a table at Bohemians.%0A%0A*Name:* ${resName}%0A*Date:* ${resDate}%0A*Time:* ${resTime}%0A*Guests:* ${resGuests}%0A*Preference:* ${resSeating}`;
    window.open(`https://wa.me/${RESTAURANT.phone}?text=${message}`, '_blank');
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Visit', href: '#visit' }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Sticky Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-cream/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="#" className="flex-shrink-0">
              <span className={`font-serif text-3xl font-bold tracking-wider ${isScrolled ? 'text-rust' : 'text-cream text-shadow'}`}>
                Bohemians
              </span>
            </a>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`text-sm font-medium uppercase tracking-widest hover:text-amber transition-colors ${isScrolled ? 'text-gray-800' : 'text-cream text-shadow'}`}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href={RESTAURANT.swiggyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-swiggy text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors shadow-lg flex items-center gap-2"
              >
                Order Now
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md ${isScrolled ? 'text-gray-800' : 'text-cream'}`}
              >
                {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-cream absolute top-full left-0 w-full shadow-lg border-t border-amber/20">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-gray-800 border-b border-amber/10 uppercase tracking-wider"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        {/* Hero Image */}
        <div className="absolute inset-0 bg-rust/80 flex items-center justify-center overflow-hidden">
             <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Bohemians Bungalow Interior" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <h1 className="font-display text-7xl md:text-9xl text-cream mb-4 tracking-wide text-shadow">
            Bohemians
          </h1>
          <p className="font-serif text-xl md:text-3xl text-cream/90 mb-8 italic">
            {RESTAURANT.tagline}
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-10 text-cream bg-black/30 w-fit mx-auto px-4 py-2 rounded-full backdrop-blur-sm border border-cream/20">
            <Star className="fill-amber text-amber" size={18} />
            <span className="font-semibold">{RESTAURANT.rating}</span>
            <span className="text-sm opacity-80">({RESTAURANT.reviewCount} Reviews)</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#reserve" 
              className="w-full sm:w-auto bg-amber text-cream px-8 py-4 rounded-full text-lg font-medium hover:bg-rust transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              Reserve a Table
              <ChevronDown size={20} />
            </a>
            <a 
              href={RESTAURANT.swiggyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-cream/30 text-cream px-8 py-4 rounded-full text-lg font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              Order Delivery
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-5xl md:text-6xl text-rust mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-light">
                <p>
                  Tucked away in the leafy lanes of Indiranagar, Bohemians is more than just a restaurant—it's a home. A sprawling vintage bungalow lovingly transformed into an eclectic, artsy escape from the city's hustle.
                </p>
                <p>
                  Every corner tells a story, from the mismatched vintage furniture and warm amber lamplight to the layered textures that evoke a well-traveled soul. Our menu reflects this journey, offering a curated mix of European, Modern Indian, Mediterranean, and Arabian flavors.
                </p>
              </div>
              
              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center text-teal">
                    <Dog size={24} />
                  </div>
                  <h3 className="font-serif font-bold text-gray-800 text-lg">Pet Friendly</h3>
                  <p className="text-sm text-gray-600">Breezy outdoor seating for you and your furry friends.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center text-amber">
                    <Music size={24} />
                  </div>
                  <h3 className="font-serif font-bold text-gray-800 text-lg">Live Music</h3>
                  <p className="text-sm text-gray-600">Soulful acoustic sets and karaoke nights.</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
               <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Cozy bungalow interior" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-6xl text-teal mb-4">Our Menu</h2>
            <p className="font-serif text-xl text-gray-600 italic">Eclectic flavors from around the world</p>
          </div>

          {/* Service Charge Note (Optional/Suggested) */}
          <div className="bg-white/50 border border-amber/20 rounded-lg p-4 mb-8 flex items-start gap-3 text-sm text-gray-600">
             <Info className="text-amber shrink-0 mt-0.5" size={18} />
             <p><strong>Transparency Note:</strong> We levy an optional service charge which is distributed entirely amongst our staff. If you wish to opt out, please inform your server before billing.</p>
          </div>

          {/* Menu Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide mb-10 pb-2 border-b border-gray-200 gap-6">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveMenuTab(cat)}
                className={`whitespace-nowrap pb-4 px-2 font-serif text-lg transition-all ${
                  activeMenuTab === cat 
                    ? 'text-rust border-b-2 border-rust font-bold' 
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="space-y-8 min-h-[400px]">
            {MENU_ITEMS[activeMenuTab].map((item, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-baseline mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-xl font-bold text-gray-800 group-hover:text-amber transition-colors">
                      {item.name}
                    </h3>
                    {item.signature && (
                      <span className="text-[10px] uppercase tracking-widest bg-rust text-white px-2 py-1 rounded-sm font-bold">
                        Signature
                      </span>
                    )}
                  </div>
                  <div className="font-serif text-lg text-gray-800 border-b border-dotted border-gray-300 flex-grow mx-4"></div>
                  <span className="font-serif font-bold text-teal">{item.price}</span>
                </div>
                <p className="text-gray-600 text-sm font-light w-4/5">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a 
              href={RESTAURANT.zomatoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-rust text-rust hover:bg-rust hover:text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              View Full Menu on Zomato
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reserve" className="py-24 bg-texture border-y border-amber/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-cream">
            <div className="text-center mb-10">
              <h2 className="font-display text-4xl text-rust mb-2">Book a Table</h2>
              <p className="text-gray-600 font-light">Join us at the bungalow. We'll confirm via WhatsApp.</p>
            </div>
            
            <form onSubmit={handleReservationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    required
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber focus:border-amber outline-none transition-all bg-cream/30"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                  <select 
                    value={resGuests}
                    onChange={(e) => setResGuests(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber focus:border-amber outline-none transition-all bg-cream/30"
                  >
                    {[1,2,3,4,5,6,7,8,"9+"].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    required
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber focus:border-amber outline-none transition-all bg-cream/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input 
                    type="time" 
                    required
                    value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber focus:border-amber outline-none transition-all bg-cream/30"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seating Preference</label>
                  <select 
                    value={resSeating}
                    onChange={(e) => setResSeating(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber focus:border-amber outline-none transition-all bg-cream/30"
                  >
                    <option value="Outdoor (Pet-friendly)">Outdoor / Courtyard (Pet-friendly)</option>
                    <option value="Indoor (Cozy)">Indoor (Cozy Bungalow Vibe)</option>
                    <option value="Any available">Any available</option>
                  </select>
                </div>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-whatsapp text-white py-4 rounded-lg font-medium text-lg hover:bg-green-600 transition-colors shadow-md flex justify-center items-center gap-2 mt-4"
              >
                <MessageCircle size={20} />
                Send Request via WhatsApp
              </button>
              <p className="text-xs text-center text-gray-500 mt-4">
                You will be redirected to WhatsApp to send this pre-filled message.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-6xl text-rust mb-4">The Bungalow</h2>
            <p className="font-serif text-xl text-gray-600 italic">Glimpses of our space and food</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[300px]">
             <div className="col-span-2 row-span-2 rounded-xl overflow-hidden border-2 border-amber/30 relative group">
                <img src="https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Outdoor seating" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
             </div>
             <div className="rounded-xl overflow-hidden border-2 border-teal/30 relative group">
                <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Signature Dish" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
             </div>
             <div className="rounded-xl overflow-hidden border-2 border-rust/30 relative group">
                <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Live Music" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
             </div>
             <div className="rounded-xl overflow-hidden border-2 border-gray-300 relative group">
                <img src="https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Dim Sums" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
             </div>
             <div className="rounded-xl overflow-hidden border-2 border-amber/40 relative group">
                <img src="https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Indoor Seating" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
             </div>
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href={RESTAURANT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-rust transition-colors font-medium"
            >
              <Camera size={20} />
              Follow our journey on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-6xl text-teal mb-4">Guest Love</h2>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="fill-amber text-amber" size={24} />
              ))}
            </div>
            <p className="font-serif text-xl text-gray-800 font-bold">{RESTAURANT.rating} / 5 <span className="font-light text-gray-600">({RESTAURANT.reviewCount} reviews)</span></p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-cream hover:shadow-md transition-shadow relative">
                <div className="absolute top-6 right-6 text-amber/20">
                  <Star className="fill-current" size={40} />
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="fill-amber text-amber" size={16} />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed relative z-10">"{review.text}"</p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  <span className="font-serif font-bold text-gray-900">{review.name}</span>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Section */}
      <section id="visit" className="py-24 bg-rust text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display text-5xl md:text-6xl mb-10 text-white">Find Us</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-white/10 p-3 rounded-full">
                    <MapPin size={24} className="text-amber" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold mb-2 text-white">Address</h3>
                    <p className="text-cream/80 leading-relaxed max-w-sm">
                      {RESTAURANT.address}
                    </p>
                    <div className="flex gap-4 mt-4">
                      <button 
                        onClick={() => navigator.clipboard.writeText(RESTAURANT.address)}
                        className="text-sm border border-white/30 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
                      >
                        Copy Address
                      </button>
                      <a 
                        href={RESTAURANT.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm bg-amber text-white px-4 py-2 rounded-full hover:bg-amber/90 transition-colors"
                      >
                        Get Directions
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-white/10 p-3 rounded-full">
                    <Clock size={24} className="text-amber" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold mb-2 text-white">Hours</h3>
                    <p className="text-cream/80">Open Daily</p>
                    <p className="text-cream/80 font-medium text-lg mt-1">{RESTAURANT.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-white/10 p-3 rounded-full">
                    <Phone size={24} className="text-amber" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold mb-2 text-white">Contact</h3>
                    <p className="text-cream/80">Call or WhatsApp for reservations</p>
                    <a href={`tel:+${RESTAURANT.phone}`} className="inline-block mt-2 font-medium text-lg text-amber hover:text-white transition-colors">
                      +91 98804 35789
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-[400px] md:h-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-black/20 relative">
               <iframe 
                 src="https://maps.google.com/maps?q=Bohemians%20Indiranagar&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen="" 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="font-serif text-3xl font-bold text-white tracking-wider block mb-2">
              Bohemians
            </span>
            <p className="text-sm">The Social House, Indiranagar</p>
          </div>
          
          <div className="flex gap-6">
            <a href={RESTAURANT.instagram} className="hover:text-white transition-colors">
              <Camera size={24} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Globe size={24} />
            </a>
          </div>
        </div>
        <div className="text-center text-xs mt-12 opacity-50">
          © {new Date().getFullYear()} Bohemians. All rights reserved.
        </div>
      </footer>

      {/* Floating Mobile Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-50 flex">
        <a href={`tel:+${RESTAURANT.phone}`} className="flex-1 py-4 flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-amber active:bg-gray-50">
          <Phone size={20} />
          <span className="text-[10px] font-medium uppercase tracking-wider">Call</span>
        </a>
        <a href={`https://wa.me/${RESTAURANT.phone}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 flex flex-col items-center justify-center gap-1 text-whatsapp active:bg-green-50">
          <MessageCircle size={20} />
          <span className="text-[10px] font-medium uppercase tracking-wider">WhatsApp</span>
        </a>
        <a href={RESTAURANT.swiggyLink} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 flex flex-col items-center justify-center gap-1 text-swiggy active:bg-orange-50">
          <Coffee size={20} />
          <span className="text-[10px] font-medium uppercase tracking-wider">Order</span>
        </a>
      </div>

      {/* Floating WhatsApp Button (Desktop) */}
      <a 
        href={`https://wa.me/${RESTAURANT.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-8 right-8 bg-whatsapp text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}
