import { useState, useEffect, useRef, useCallback } from 'react'
import './index.css'

/* ═══════════════════════════════════════════════════════════════════
   IMAGE PATHS — swap these for real photos when available
   ═══════════════════════════════════════════════════════════════════ */
const IMAGES = {
  hero:      '/images/hero.jpg',
  about:     '/images/about.jpg',
  aglio:     '/images/aglio-olio.jpg',
  pizza:     '/images/pizza.jpg',
  karaoke:   '/images/karaoke.jpg',
  breakfast: '/images/breakfast.jpg',
  birthday:  '/images/birthday.jpg',
  outdoor:   '/images/outdoor.jpg',
  desserts:  '/images/desserts.jpg',
  liveMusic: '/images/live-music.jpg',
  corporate: '/images/corporate.jpg',
}

/* ═══════════════════════════════════════════════════════════════════
   EDITABLE CONSTANTS — update these without touching component code
   ═══════════════════════════════════════════════════════════════════ */

const RESTAURANT = {
  name:       'Marcopolo Cafe',
  tagline:    'Global flavors. Live music. Good nights.',
  tagline2:   'Where every table begins a new adventure.',
  address:    '43, 4th B Cross, KHB Colony, 5th Block, Koramangala Industrial Layout, Koramangala, Bengaluru, Karnataka 560095',
  addressShort: '43, 4th B Cross, 5th Block Koramangala, Bengaluru 560095',
  nearby:     '(Ground & 1st Floor, beside Tipsy Bull)',
  phone:      '+91 99722 33808',
  phoneRaw:   '919972233808',
  hours:      'Daily 10:30 AM – 11:50 PM',
  rating:     4.6,
  reviewCount: '2,091+',
  priceRange: '₹200 – ₹600 for two',
  mapEmbed:   'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8276714879483!2d77.6219!3d12.9350!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1450738b89c5%3A0xa8e3e1e05ea26f3!2sMarcopolo+Cafe!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  mapLink:    'https://maps.google.com/?q=Marcopolo+Cafe+Koramangala+Bengaluru',
  instagram:  '#',  // TODO: add real Instagram handle
  facebook:   '#',  // TODO: add real Facebook handle
  zomato:     'https://www.zomato.com/bangalore/marcopolo-cafe-koramangala',
}

// ── ORDER LINK ──────────────────────────────────────────────────────
// TODO: Confirm exact Swiggy/Zomato deep-link with the owner before publishing
const ORDER_URL = 'https://www.swiggy.com/search?query=marcopolo+cafe+koramangala'

// ── WHATSAPP ────────────────────────────────────────────────────────
const WA_NUMBER = RESTAURANT.phoneRaw
const WA_MESSAGE_DEFAULT = encodeURIComponent("Hi! I'd like to enquire about a table at Marcopolo Cafe.")
const WA_MESSAGE_EVENT   = encodeURIComponent("Hi! I'd like to enquire about hosting an event at Marcopolo Cafe.")
const WA_LINK_DEFAULT = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE_DEFAULT}`
const WA_LINK_EVENT   = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE_EVENT}`

// ── MENU ────────────────────────────────────────────────────────────
const MENU_CATEGORIES = [
  {
    id: 'breakfast', label: 'All-Day Breakfast', iconKey: 'Breakfast', items: [
      { name: 'Classic English Breakfast',     price: 299, desc: 'Eggs, bacon, sausage, grilled tomato, toast & beans', popular: false },
      { name: 'Eggs Benedict',                 price: 279, desc: 'Poached eggs on toasted muffin with hollandaise sauce', popular: true  },
      { name: 'Avocado Toast',                 price: 249, desc: 'Smashed avocado, cherry tomato, microgreens on sourdough', popular: false },
      { name: 'Pancake Stack',                 price: 219, desc: 'Fluffy buttermilk pancakes with maple syrup & berries', popular: true  },
      { name: 'Full Indian Breakfast',         price: 259, desc: 'Poha / upma, vada, sambar, chutney & chai', popular: false },
      { name: 'Shakshuka',                     price: 269, desc: 'Baked eggs in spiced tomato-pepper sauce, crusty bread', popular: false },
      { name: 'French Toast Caramel Crunch',   price: 229, desc: 'Brioche french toast, caramel drizzle, whipped cream', popular: false },
      { name: 'Breakfast Burrito',             price: 289, desc: 'Scrambled eggs, cheese, salsa, jalapeño in a flour tortilla', popular: false },
    ]
  },
  {
    id: 'starters', label: 'Starters', iconKey: 'Starters', items: [
      { name: 'Chilli Cheese Toast',           price: 179, desc: 'Toasted bread loaded with chilli cheese blend', popular: true  },
      { name: 'Chicken Satay (5 pcs)',          price: 299, desc: 'Marinated skewers, peanut sauce & pickled cucumber', popular: false },
      { name: 'Crispy Calamari',               price: 319, desc: 'Lightly battered squid, lemon aioli, sriracha', popular: false },
      { name: 'Nachos Loaded',                 price: 249, desc: 'Tortilla chips, guacamole, salsa, sour cream & jalapeños', popular: false },
      { name: 'Kung Pao Cauliflower',          price: 229, desc: 'Wok-tossed florets in Sichuan Kung Pao sauce', popular: false },
      { name: 'Chicken Wings (6 pcs)',         price: 339, desc: 'Buffalo or BBQ glaze, celery sticks, blue cheese dip', popular: true  },
      { name: 'Bruschetta Trio',               price: 219, desc: 'Three-way topping: classic, mushroom & roasted pepper', popular: false },
      { name: 'Dimsums (8 pcs)',               price: 259, desc: 'Steamed or fried, choice of veg / chicken / prawn', popular: false },
    ]
  },
  {
    id: 'pasta', label: 'Pasta', iconKey: 'Pasta', items: [
      { name: 'Spaghetti Aglio e Olio',        price: 299, desc: 'Garlic, EVOO, chilli flakes, fresh parsley — the classic', popular: true  },
      { name: 'Penne Arrabiata',               price: 279, desc: 'Fiery tomato-garlic sauce, fresh basil', popular: true  },
      { name: 'Fettuccine Alfredo',            price: 319, desc: 'Rich cream & Parmesan sauce, cracked pepper', popular: false },
      { name: 'Chicken Pesto Linguine',        price: 349, desc: 'Grilled chicken, basil pesto, pine nuts, cherry tomatoes', popular: false },
      { name: 'Cacio e Pepe',                  price: 289, desc: 'Roman-style: Pecorino, black pepper, spaghetti', popular: false },
      { name: 'Pasta Bolognese',               price: 339, desc: 'Slow-cooked beef ragu, pappardelle, Parmesan', popular: false },
      { name: 'Roasted Veggie Pasta',          price: 269, desc: 'Seasonal roasted vegetables, olive oil, garlic & herbs', popular: false },
    ]
  },
  {
    id: 'pizza', label: 'Wood-Fired Pizza', iconKey: 'Pizza', items: [
      { name: 'Margherita',                    price: 299, desc: 'San Marzano tomato, fresh mozzarella, basil EVOO', popular: false },
      { name: 'Pepperoni Feast',               price: 379, desc: 'Double pepperoni, mozzarella, oregano, chilli flakes', popular: true  },
      { name: 'BBQ Chicken',                   price: 369, desc: 'Smoked chicken, BBQ base, caramelized onion, mozzarella', popular: false },
      { name: 'Funghi Truffle',                price: 399, desc: 'Wild mushrooms, truffle oil, thyme, mozzarella', popular: true  },
      { name: 'Four Cheese (Quattro Formaggi)',price: 389, desc: 'Mozzarella, Gorgonzola, Parmesan, Ricotta', popular: false },
      { name: 'Veggie Supreme',                price: 329, desc: 'Bell peppers, olives, onion, corn, jalapeño, mozzarella', popular: false },
      { name: 'Prawn Aglio',                   price: 409, desc: 'Garlic cream base, tiger prawns, chilli, parsley', popular: false },
    ]
  },
  {
    id: 'continental', label: 'Continental Mains', iconKey: 'Steak', items: [
      { name: 'Grilled Chicken Provençal',     price: 399, desc: 'Herb-marinated chicken, ratatouille, mashed potato', popular: false },
      { name: 'Fish & Chips',                  price: 369, desc: 'Beer-battered cod, thick-cut fries, tartar sauce', popular: true  },
      { name: 'Mushroom Wellington (V)',        price: 359, desc: 'Portobello in puff pastry, port wine jus, greens', popular: false },
      { name: 'Steak Frites',                  price: 499, desc: '200g sirloin, choice of sauce, shoestring fries', popular: false },
      { name: 'Butter Garlic Prawns',          price: 459, desc: 'Jumbo prawns, herb butter, garlic, sourdough', popular: false },
      { name: 'Shepherd\'s Pie',               price: 349, desc: 'Minced lamb, vegetables, mashed potato crust', popular: false },
    ]
  },
  {
    id: 'panasian', label: 'Pan-Asian', iconKey: 'Chopsticks', items: [
      { name: 'Pad Thai',                      price: 319, desc: 'Flat rice noodles, tamarind, peanuts, egg, lime', popular: true  },
      { name: 'Sichuan Chilli Chicken',        price: 339, desc: 'Wok-tossed, dried red chillies, Sichuan peppercorn', popular: true  },
      { name: 'Tom Yum Soup',                  price: 249, desc: 'Thai hot & sour, lemongrass, galangal, mushrooms', popular: false },
      { name: 'Chicken Fried Rice',            price: 279, desc: 'Wok-style, egg, spring onion, soy & sesame', popular: false },
      { name: 'Bao Buns (3 pcs)',              price: 289, desc: 'Steamed bao, choice of pulled pork / crispy tofu filling', popular: false },
      { name: 'Korean Kimchi Fried Rice',      price: 299, desc: 'Fermented kimchi, gochujang, fried egg on top', popular: false },
      { name: 'Pho (Noodle Soup)',             price: 299, desc: 'Vietnamese bone broth, rice noodles, herbs & lime', popular: false },
      { name: 'Singapore Noodles',             price: 309, desc: 'Curry-spiced vermicelli, shrimp, egg, bell peppers', popular: false },
    ]
  },
  {
    id: 'desserts', label: 'Desserts', iconKey: 'Dessert', items: [
      { name: 'Tiramisu',                      price: 199, desc: 'Espresso-soaked ladyfingers, mascarpone, cocoa dusting', popular: true  },
      { name: 'Warm Chocolate Lava Cake',      price: 189, desc: 'Dark chocolate, molten centre, vanilla ice cream', popular: true  },
      { name: 'Crème Brûlée',                  price: 199, desc: 'Classic vanilla custard, caramelized sugar crust', popular: false },
      { name: 'Cheesecake (NY style)',          price: 179, desc: 'Dense, creamy, berry compote', popular: false },
      { name: 'Gulab Jamun Ice Cream',         price: 159, desc: 'A desi classic paired with vanilla ice cream', popular: false },
      { name: 'Panna Cotta',                   price: 179, desc: 'Vanilla set cream, seasonal berry coulis', popular: false },
    ]
  },
  {
    id: 'beverages', label: 'Beverages', iconKey: 'Drink', items: [
      { name: 'Cold Brew Coffee',              price: 179, desc: '18-hour cold-steeped, smooth & bold', popular: true  },
      { name: 'Mango Jaljeera Sparkle',        price: 139, desc: 'Fresh mango, jaljeera spice, sparkling water', popular: false },
      { name: 'Passion Fruit Lemonade',        price: 149, desc: 'Fresh-squeezed lemon, passion fruit, mint', popular: true  },
      { name: 'Matcha Latte',                  price: 169, desc: 'Ceremonial matcha, oat milk, light sweetener', popular: false },
      { name: 'Watermelon Mint Cooler',        price: 129, desc: 'Fresh watermelon, mint, lime, sea salt', popular: false },
      { name: 'Chai Latte',                    price: 99,  desc: 'Masala chai concentrate, steamed milk, spice dusting', popular: false },
      { name: 'Virgin Sangria',                price: 159, desc: 'Mixed fruit, orange juice, ginger ale, cinnamon', popular: false },
      { name: 'Espresso / Americano',          price: 89,  desc: 'Double shot, from our house-blend beans', popular: false },
    ]
  },
]

// ── EVENTS ──────────────────────────────────────────────────────────
const EVENTS = [
  {
    id: 'birthday',
    img: IMAGES.birthday,
    iconKey: 'Birthday',
    title: 'Birthday Bashes',
    desc: 'Make your special day unforgettable — we handle décor, cake arrangements, a dedicated host, and a curated party menu.',
    features: ['Custom cake cutting setup', 'Themed décor available', 'Dedicated event host', 'Group menu packages'],
  },
  {
    id: 'corporate',
    img: IMAGES.corporate,
    iconKey: 'Briefcase',
    title: 'Corporate Outings',
    desc: 'From team lunches to end-of-year parties — our first-floor private space handles up to 60 guests with A/V setup.',
    features: ['Semi-private floor area', 'A/V & mic setup', 'Corporate buffet menus', 'Flexible scheduling'],
  },
  {
    id: 'farewell',
    img: IMAGES.outdoor,
    iconKey: 'Plane',
    title: 'Farewell & Get-togethers',
    desc: 'Give them a send-off worth remembering. Cozy group bookings with curated food & drinks packages starting at ₹599/head.',
    features: ['Group booking discounts', 'Special farewell platters', 'Karaoke slot included', 'Keepsake photographs'],
  },
  {
    id: 'bachelor',
    img: IMAGES.karaoke,
    iconKey: 'Champagne',
    title: 'Bachelor / Bachelorette',
    desc: 'Go all-out. Private booths, custom cocktails (mocktails), karaoke rounds & party games — we set it all up.',
    features: ['Private booth section', 'Custom mocktail menu', 'Karaoke rounds', 'Party games & props'],
  },
]

// ── GALLERY ─────────────────────────────────────────────────────────
const GALLERY_ITEMS = [
  { id: 1, label: 'Aglio e Olio',         cat: 'food',      src: IMAGES.aglio,     span: 'col-span-2 row-span-2', emoji: '🍝' },
  { id: 2, label: 'Wood-Fired Pizza',     cat: 'food',      src: IMAGES.pizza,     span: '',                      emoji: '🍕' },
  { id: 3, label: 'Karaoke Night',        cat: 'vibe',      src: IMAGES.karaoke,   span: '',                      emoji: '🎤' },
  { id: 4, label: 'Breakfast Spread',     cat: 'food',      src: IMAGES.breakfast, span: '',                      emoji: '🍳' },
  { id: 5, label: 'Birthday Setup',       cat: 'events',    src: IMAGES.birthday,  span: '',                      emoji: '🎂' },
  { id: 6, label: 'Outdoor Seating',      cat: 'ambience',  src: IMAGES.outdoor,   span: 'col-span-2',            emoji: '🌿' },
  { id: 7, label: 'Lava Cake & Tiramisu', cat: 'food',      src: IMAGES.desserts,  span: '',                      emoji: '🍮' },
  { id: 8, label: 'Live Music Evening',   cat: 'vibe',      src: IMAGES.liveMusic, span: '',                      emoji: '🎵' },
  { id: 9, label: 'Corporate Event',      cat: 'events',    src: IMAGES.corporate, span: '',                      emoji: '💼' },
]

// ── REVIEWS ─────────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: 'Ananya R.',
    rating: 5,
    date: 'July 2025',
    tag: '🎤 Karaoke Night',
    review: 'Best karaoke experience in Koramangala! The vibe is electric, staff is amazing, and the pasta was absolutely delicious. We stayed way past midnight!',
  },
  {
    name: 'Rahul M.',
    rating: 5,
    date: 'June 2025',
    tag: '🎂 Birthday Party',
    review: "Hosted my girlfriend's birthday here and they went ALL out. Custom décor, a surprise cake, dedicated host — everything was perfect. Highly recommended for parties!",
  },
  {
    name: 'Priya S.',
    rating: 4,
    date: 'August 2025',
    tag: '🍝 Food Lover',
    review: "The Aglio e Olio is genuinely one of the best in the city. Perfectly al dente, bold garlic flavour without being overbearing. Came back three times for it!",
  },
  {
    name: 'Karan T.',
    rating: 5,
    date: 'May 2025',
    tag: '💼 Corporate Lunch',
    review: "Organised our team farewell here for 35 people. The first floor is perfect, the buffet was well-priced and absolutely delicious. Will definitely book again.",
  },
  {
    name: 'Meera L.',
    rating: 5,
    date: 'July 2025',
    tag: '🌿 Ambience',
    review: 'The outdoor seating is so charming — fairy lights, good music, cool Bengaluru weather. Felt like we were dining at a European cafe. Value for money is outstanding.',
  },
  {
    name: 'Aditya K.',
    rating: 4,
    date: 'June 2025',
    tag: '🍕 Pizza Night',
    review: "Wood-fired pizza here rivals many 'authentic' Italian spots. Thin, blistered, charred crust. The truffle mushroom one is a must-try. Portions are very generous too.",
  },
]

/* ═══════════════════════════════════════════════════════════════════
   UTILITY HOOKS
   ═══════════════════════════════════════════════════════════════════ */

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function useScrollY() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return scrollY
}

/* ═══════════════════════════════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════════════════════════════ */

const Icons = {
  // ── UI / Navigation ─────────────────────────────────────────────
  Star:       ({ className = 'inline w-4 h-4' } = {}) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>,
  Phone:      () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>,
  WhatsApp:   () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.13.558 4.122 1.532 5.856L.073 23.927l6.277-1.434C7.896 23.454 9.904 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.667-.487-5.214-1.34l-.374-.213-3.727.851.865-3.647-.23-.377A9.936 9.936 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>,
  MapPin:     () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>,
  Clock:      () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm.5 11H11V7h1.5v4.8l3.5 2.1-.8 1.3-2.7-1.6V13z"/></svg>,
  Copy:       () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>,
  Directions: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"/></svg>,
  Menu:       () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>,
  X:          () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>,
  Send:       () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>,
  Instagram:  () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  Facebook:   () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  // ── Food & Menu ──────────────────────────────────────────────────
  Breakfast:  ({ className = 'w-5 h-5' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
  Starters:   ({ className = 'w-5 h-5' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
  Pasta:      ({ className = 'w-5 h-5' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/><path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4"/><path d="M12 8v8M8 12h8"/></svg>,
  Pizza:      ({ className = 'w-5 h-5' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2L2 19.5h20L12 2z"/><path d="M12 2v17.5"/><circle cx="9" cy="13" r="1" fill="currentColor" stroke="none"/><circle cx="14" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="14" cy="16" r="1" fill="currentColor" stroke="none"/></svg>,
  Steak:      ({ className = 'w-5 h-5' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
  Chopsticks: ({ className = 'w-5 h-5' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 3l1 18M18 3l-1 18"/><path d="M5 9h14"/><path d="M7 15c2-1 4-1 6 0s4 1 6 0"/></svg>,
  Dessert:    ({ className = 'w-5 h-5' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><path d="M12 3c-2.5 0-4 1.5-4 3.5S9.5 10 12 10s4-1.5 4-3.5S14.5 3 12 3z"/><path d="M8 10v11M16 10v11"/></svg>,
  Drink:      ({ className = 'w-5 h-5' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 2h8l1 7H7L8 2z"/><path d="M7 9c0 5 2 9 5 9s5-4 5-9"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>,
  // ── Events & Occasions ───────────────────────────────────────────
  Birthday:   ({ className = 'w-7 h-7' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><path d="M12 3c0 0-1 1.5-1 3s1 2 1 2 1-.5 1-2-1-3-1-3z" fill="currentColor" stroke="none"/><rect x="4" y="8" width="16" height="8" rx="1"/><path d="M8 8V6M12 8V6M16 8V6"/></svg>,
  Briefcase:  ({ className = 'w-7 h-7' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/><path d="M2 13h20"/></svg>,
  Plane:      ({ className = 'w-7 h-7' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.3 8.72a16 16 0 006 6l1.08-1.08a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>,
  Champagne:  ({ className = 'w-7 h-7' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 22h8M12 11v11M6.5 3h11l-2 8H8.5L6.5 3z"/><path d="M9 3c0-1 1-2 3-2s3 1 3 2"/><circle cx="16" cy="3" r="1" fill="currentColor" stroke="none"/><circle cx="14" cy="1.5" r="0.8" fill="currentColor" stroke="none"/></svg>,
  // ── Music & Vibe ─────────────────────────────────────────────────
  Mic:        ({ className = 'w-6 h-6' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
  Music:      ({ className = 'w-6 h-6' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  // ── Travel / Brand ───────────────────────────────────────────────
  Compass:    ({ className = 'w-4 h-4' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" stroke="none" opacity="0.7"/></svg>,
  BookOpen:   ({ className = 'w-4 h-4' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
  Camera:     ({ className = 'w-4 h-4' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  Sparkle:    ({ className = 'w-4 h-4' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>,
  Building:   ({ className = 'w-6 h-6' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>,
  Calendar:   ({ className = 'w-6 h-6' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Parking:    ({ className = 'w-5 h-5' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 010 6H9"/></svg>,
  Delivery:   ({ className = 'w-5 h-5' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="5.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/><path d="M15 6h5l2 6H15V6z"/><path d="M3 9h8M3 12h6M1 6h14v9H3l-2-9z"/></svg>,
  Fire:       ({ className = 'w-6 h-6' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2c0 0 5 4 5 9a5 5 0 01-10 0c0-2 1-3.5 1-3.5S9 9 9 11a3 3 0 006 0c0-3-3-9-3-9z"/></svg>,
  Globe:      ({ className = 'w-6 h-6' } = {}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
}

/* ═══════════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */

// ── Compass Rose SVG ─────────────────────────────────────────────
function CompassRose({ size = 200, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(217,164,65,0.15)" strokeWidth="1"/>
      <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(217,164,65,0.1)" strokeWidth="1" strokeDasharray="4 4"/>
      <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(217,164,65,0.08)" strokeWidth="1"/>
      {/* Cardinal points */}
      {['N','S','E','W'].map((d, i) => {
        const a = i * 90
        const rad = (a - 90) * Math.PI / 180
        const x = 100 + 88 * Math.cos(rad)
        const y = 100 + 88 * Math.sin(rad)
        return (
          <text key={d} x={x} y={y} textAnchor="middle" dominantBaseline="central"
            fill="rgba(217,164,65,0.6)" fontSize="10" fontFamily="Inter" fontWeight="700"
            letterSpacing="1">
            {d}
          </text>
        )
      })}
      {/* Major arms */}
      {[0,90,180,270].map(a => {
        const rad = (a - 90) * Math.PI / 180
        return (
          <line key={a}
            x1="100" y1="100"
            x2={100 + 62 * Math.cos(rad)} y2={100 + 62 * Math.sin(rad)}
            stroke="rgba(217,164,65,0.5)" strokeWidth="1.5"/>
        )
      })}
      {/* Minor arms */}
      {[45,135,225,315].map(a => {
        const rad = (a - 90) * Math.PI / 180
        return (
          <line key={a}
            x1="100" y1="100"
            x2={100 + 50 * Math.cos(rad)} y2={100 + 50 * Math.sin(rad)}
            stroke="rgba(217,164,65,0.3)" strokeWidth="1"/>
        )
      })}
      {/* Needle */}
      <polygon points="100,38 105,100 100,115 95,100"
        fill="rgba(193,80,46,0.9)"/>
      <polygon points="100,162 105,100 100,85 95,100"
        fill="rgba(217,164,65,0.6)"/>
      <circle cx="100" cy="100" r="5" fill="#D9A441"/>
      <circle cx="100" cy="100" r="2" fill="#1F2A44"/>
    </svg>
  )
}

// ── Star Rating ──────────────────────────────────────────────────
function StarRating({ rating, max = 5, size = 'sm' }) {
  const cls = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5'
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill={i < Math.floor(rating) ? '#F59E0B' : i < rating ? 'url(#half)' : 'none'}
          stroke={i < rating ? 'none' : 'rgba(245,158,11,0.3)'} strokeWidth="1.5"
          className={cls}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
        </svg>
      ))}
    </span>
  )
}

// ── Navbar ───────────────────────────────────────────────────────
function Navbar() {
  const scrollY = useScrollY()
  const [menuOpen, setMenuOpen] = useState(false)
  const isScrolled = scrollY > 60

  const navLinks = [
    { href: '#about',   label: 'About'    },
    { href: '#menu',    label: 'Menu'     },
    { href: '#events',  label: 'Events'   },
    { href: '#gallery', label: 'Gallery'  },
    { href: '#reviews', label: 'Reviews'  },
    { href: '#visit',   label: 'Visit'    },
  ]

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'navbar-blur py-3' : 'bg-transparent py-4'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group" aria-label="Marcopolo Cafe home">
          <img src="/logo.jpg" alt="Marcopolo Cafe logo" className="w-10 h-10 rounded-full object-cover border border-gold-500/30 group-hover:border-gold-500 transition-colors" loading="lazy"/>
          <div className="hidden sm:block">
            <span className="font-display font-bold text-gold-500 text-lg leading-tight block">Marcopolo</span>
            <span className="text-cream-200/60 text-xs leading-tight tracking-widest uppercase block">Cafe · Koramangala</span>
          </div>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-6" role="list">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-cream-100/70 hover:text-gold-500 text-sm font-medium transition-colors animated-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a href={WA_LINK_DEFAULT} target="_blank" rel="noopener noreferrer"
            className="btn btn-outline-gold text-sm px-4 py-2" id="nav-whatsapp-btn">
            <Icons.WhatsApp /> Book a Table
          </a>
          <a href={ORDER_URL} target="_blank" rel="noopener noreferrer"
            className="btn btn-swiggy text-sm px-4 py-2" id="nav-order-btn">
            <Icons.Delivery /> Order on Swiggy
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-cream-100 p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          id="mobile-menu-btn"
        >
          {menuOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden navbar-blur border-t border-gold-500/10 mt-1"
        >
          <ul className="max-w-7xl mx-auto px-4 py-4 space-y-2" role="list">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-cream-100/80 hover:text-gold-500 font-medium transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2 border-t border-gold-500/10">
              <a href={WA_LINK_DEFAULT} target="_blank" rel="noopener noreferrer"
                className="btn btn-whatsapp w-full py-3 text-sm mb-2 block text-center" id="mobile-nav-whatsapp">
                <Icons.WhatsApp /> WhatsApp to Book
              </a>
              <a href={ORDER_URL} target="_blank" rel="noopener noreferrer"
                className="btn btn-swiggy w-full py-3 text-sm block text-center flex items-center justify-center gap-2" id="mobile-nav-order">
                <Icons.Delivery /> Order on Swiggy
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

// ── Hero ─────────────────────────────────────────────────────────
function Hero() {
  const stars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    top:  Math.random() * 100,
    left: Math.random() * 100,
    dur:  (Math.random() * 3 + 2).toFixed(1),
    del:  (Math.random() * 3).toFixed(1),
  }))

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient"
      aria-label="Hero section"
    >
      {/* Animated background stars */}
      {stars.map(s => (
        <span key={s.id} className="star" style={{
          width: s.size + 'px', height: s.size + 'px',
          top: s.top + '%', left: s.left + '%',
          '--duration': s.dur + 's', '--delay': s.del + 's',
        }}/>
      ))}

      {/* Subtle route lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full opacity-5" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <path d="M0 450 Q360 200 720 450 Q1080 700 1440 450" fill="none" stroke="#D9A441" strokeWidth="1" strokeDasharray="6 6"/>
          <path d="M0 600 Q480 300 960 600 Q1200 750 1440 550" fill="none" stroke="#D9A441" strokeWidth="1" strokeDasharray="4 8"/>
          <circle cx="720" cy="450" r="3" fill="#D9A441"/>
          <circle cx="0" cy="450" r="3" fill="#D9A441"/>
          <circle cx="1440" cy="450" r="3" fill="#D9A441"/>
        </svg>
      </div>

      {/* Hero background image with overlay */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={IMAGES.hero}
          alt="Marcopolo Cafe interior — vibrant eclectic multicuisine cafe with live music"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/85 via-indigo-950/70 to-indigo-950/90"/>
      </div>

      {/* Background compass — large, decorative */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-15 pointer-events-none hidden lg:block" aria-hidden="true">
        <CompassRose size={600} className="compass-spin"/>
      </div>
      <div className="absolute -left-16 bottom-0 opacity-8 pointer-events-none" aria-hidden="true">
        <CompassRose size={300} className="compass-spin"/>
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        {/* Logo badge */}
        <div className="flex justify-center mb-8">
          <img
            src="/logo.jpg"
            alt="Marcopolo Cafe emblem"
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-2 border-gold-500/40 shadow-gold-lg animate-float"
            loading="eager"
          />
        </div>

        {/* Chip */}
        <div className="flex justify-center mb-5">
          <span className="section-chip"><Icons.Compass /> Koramangala 5th Block · Bengaluru</span>
        </div>

        {/* Title */}
        <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-cream-50 leading-none mb-4">
          Marco<span className="text-gradient-gold">polo</span>
          <span className="block font-display font-normal italic text-3xl sm:text-4xl lg:text-5xl text-cream-200/80 mt-2">Cafe</span>
        </h1>

        {/* Tagline */}
        <p className="font-display italic text-xl sm:text-2xl lg:text-3xl text-cream-200/90 mt-6 mb-2 max-w-2xl mx-auto">
          "{RESTAURANT.tagline}"
        </p>
        <p className="text-cream-200/50 text-sm sm:text-base mt-2 mb-8 tracking-wide">{RESTAURANT.tagline2}</p>

        {/* Rating badge */}
        <div className="flex justify-center mb-10">
          <div className="glass-card inline-flex items-center gap-4 px-6 py-3">
            <div className="flex flex-col items-center">
              <StarRating rating={RESTAURANT.rating} size="lg"/>
              <span className="text-gold-500 font-bold text-xl mt-0.5">{RESTAURANT.rating}★</span>
            </div>
            <div className="w-px h-10 bg-gold-500/20"/>
            <div>
              <p className="text-cream-100 font-semibold text-sm">{RESTAURANT.reviewCount} Reviews</p>
              <p className="text-cream-200/50 text-xs">on Google</p>
            </div>
            <div className="w-px h-10 bg-gold-500/20"/>
            <div>
              <p className="text-cream-100 font-semibold text-sm">{RESTAURANT.priceRange}</p>
              <p className="text-cream-200/50 text-xs">for two</p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={ORDER_URL} target="_blank" rel="noopener noreferrer"
            className="btn btn-swiggy px-8 py-4 text-base font-bold w-full sm:w-auto" id="hero-order-btn">
            <Icons.Delivery /> Order on Swiggy
          </a>
          <a href={WA_LINK_DEFAULT} target="_blank" rel="noopener noreferrer"
            className="btn btn-whatsapp px-8 py-4 text-base font-bold w-full sm:w-auto" id="hero-whatsapp-btn">
            <Icons.WhatsApp /> WhatsApp to Book
          </a>
          <a href="#menu"
            className="btn btn-outline-gold px-8 py-4 text-base font-bold w-full sm:w-auto" id="hero-menu-btn">
            View Menu ↓
          </a>
        </div>

        {/* Scroll cue */}
        <div className="mt-16 flex justify-center">
          <a href="#about" className="text-gold-500/50 hover:text-gold-500 transition-colors animate-bounce" aria-label="Scroll to about section">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Section Wrapper ───────────────────────────────────────────────
function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`py-20 lg:py-28 ${className}`} aria-label={id + ' section'}>
      {children}
    </section>
  )
}

function Container({ children }) {
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
}

function SectionHeader({ chip, title, subtitle, light = false }) {
  return (
    <div className={`text-center mb-12 reveal ${light ? 'text-indigo-950' : ''}`}>
      {chip && <div className="flex justify-center mb-4"><span className="section-chip">{chip}</span></div>}
      <h2 className={`font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 ${light ? 'text-indigo-950' : 'text-cream-50'}`}>
        {title}
      </h2>
      <div className="route-divider max-w-xs mx-auto"><span className="compass-dot"/></div>
      {subtitle && <p className={`max-w-2xl mx-auto text-base sm:text-lg ${light ? 'text-indigo-900/70' : 'text-cream-200/70'}`}>{subtitle}</p>}
    </div>
  )
}

// ── About ─────────────────────────────────────────────────────────
function About() {
  const features = [
    { iconKey: 'Breakfast', label: 'All-Day Breakfast', desc: '10:30 AM to closing — pancakes to shakshuka' },
    { iconKey: 'Fire',      label: 'Wood-Fired Pizza',  desc: 'Thin-crust, blistered, authentic charred flavour' },
    { iconKey: 'Pasta',     label: 'World Pasta',       desc: 'Italian classics — Aglio e Olio, Arrabiata & more' },
    { iconKey: 'Chopsticks',label: 'Pan-Asian',         desc: 'Sichuan, Thai, Korean & Vietnamese done right' },
    { iconKey: 'Mic',       label: 'Karaoke Station',   desc: 'Take the mic every evening — all are welcome!' },
    { iconKey: 'Music',     label: 'Live Music',        desc: 'Curated evenings with live acoustic & band sets' },
    { iconKey: 'Building',  label: '2 Floors',          desc: 'Ground floor vibe & 1st floor for private events' },
    { iconKey: 'Calendar',  label: 'Event Hosting',     desc: 'Birthdays, corporates, farewells & bachelor nights' },
  ]

  return (
    <Section id="about" className="bg-indigo-950/80">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div className="reveal">
            <span className="section-chip mb-5 inline-flex items-center gap-1.5"><Icons.Compass /> Our Story</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-cream-50 mb-6 leading-tight">
              A Cafe for the <span className="text-gradient-gold">World Traveler</span> in You
            </h2>
            <div className="route-divider max-w-[180px]"><span className="compass-dot"/></div>
            <p className="text-cream-200/75 text-base sm:text-lg leading-relaxed mb-5">
              Tucked into the heart of Koramangala 5th Block, <strong className="text-cream-100">Marcopolo Cafe</strong> is where global flavors collide in the most delicious way. We're an eclectic, all-day cafe that refuses to be pinned down to one cuisine — because great food, like travel, knows no borders.
            </p>
            <p className="text-cream-200/75 text-base leading-relaxed mb-5">
              From a lazy weekend <strong className="text-cream-100">all-day breakfast</strong> to weeknight karaoke with friends, from authentic wood-fired pizzas to bold Sichuan stir-fries and silky Italian pasta — we do it all with heart.
            </p>
            <p className="text-cream-200/75 text-base leading-relaxed mb-8">
              <strong className="text-cream-100">Ground floor</strong> is your everyday cafe — vibrant, open, industrial-chic. The <strong className="text-cream-100">first floor</strong> is where we transform for your private events, parties, and karaoke nights that go until midnight.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#events" className="btn btn-gold px-6 py-3 text-sm font-bold" id="about-events-btn">
                🎉 Host an Event
              </a>
              <a href="#menu" className="btn btn-outline-gold px-6 py-3 text-sm font-bold" id="about-menu-btn">
                Explore Menu →
              </a>
            </div>
          </div>

          {/* About image + feature grid */}
          <div className="reveal reveal-delay-2 space-y-4">
            {/* Photo */}
            <div className="rounded-2xl overflow-hidden border border-gold-500/15 shadow-dark-lg aspect-[4/3] w-full">
              <img
                src={IMAGES.about}
                alt="Marcopolo Cafe — travel-inspired cafe interior with world map and compass"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            {/* Feature mini-grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {features.slice(0, 4).map(f => {
                const FeatureIcon = Icons[f.iconKey]
                return (
                  <div key={f.label} className="glass-card p-3 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1 text-center">
                    <span className="flex justify-center text-gold-500 mb-1"><FeatureIcon className="w-6 h-6"/></span>
                    <h3 className="text-cream-100 font-semibold text-xs">{f.label}</h3>
                  </div>
                )
              })}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {features.slice(4).map(f => {
                const FeatureIcon = Icons[f.iconKey]
                return (
                  <div key={f.label} className="glass-card p-3 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1 text-center">
                    <span className="flex justify-center text-gold-500 mb-1"><FeatureIcon className="w-6 h-6"/></span>
                    <h3 className="text-cream-100 font-semibold text-xs">{f.label}</h3>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// ── Menu ─────────────────────────────────────────────────────────
function Menu() {
  const [activeTab, setActiveTab] = useState('breakfast')

  const activeCategory = MENU_CATEGORIES.find(c => c.id === activeTab)

  return (
    <Section id="menu" className="bg-gradient-to-b from-indigo-950/60 to-indigo-950/90">
      <Container>
        <SectionHeader
          chip={<><Icons.BookOpen className="w-4 h-4"/> What We Serve</>}
          title="The Menu"
          subtitle="Global flavors, locally loved — something for every mood, every meal, every craving."
        />

        {/* Tab buttons */}
        <div className="overflow-x-auto scroll-x-snap mb-10 reveal">
          <div className="flex gap-2 min-w-max mx-auto justify-start lg:justify-center pb-2">
            {MENU_CATEGORIES.map(cat => {
              const TabIcon = Icons[cat.iconKey]
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 whitespace-nowrap ${
                    activeTab === cat.id
                      ? 'bg-gold-500 text-indigo-950 border-gold-500 font-bold'
                      : 'bg-transparent text-cream-200/60 border-gold-500/20 hover:border-gold-500/50 hover:text-cream-100'
                  }`}
                  id={`menu-tab-${cat.id}`}
                  aria-pressed={activeTab === cat.id}
                  aria-controls={`menu-panel-${cat.id}`}
                >
                  {TabIcon && <TabIcon className="w-4 h-4"/>}
                  {cat.label}
                </button>
              )
            }
            )}
          </div>
        </div>

        {/* Menu items — key={activeTab} remounts grid on every tab switch so animation re-fires */}
        <div
          key={activeTab}
          id={`menu-panel-${activeTab}`}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 menu-grid"
          role="region"
          aria-label={activeCategory?.label + ' menu items'}
        >
          {activeCategory?.items.map((item, idx) => (
            <div
              key={item.name}
              className="glass-card p-5 hover:border-gold-500/35 hover:-translate-y-1 transition-all duration-300 menu-item"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-cream-100 font-semibold text-sm flex-1 pr-2">{item.name}</h3>
                {item.popular && (
                  <span className="popular-badge shrink-0">★ Popular</span>
                )}
              </div>
              <p className="text-cream-200/55 text-xs leading-relaxed mb-3">{item.desc}</p>
              <p className="text-gold-500 font-bold text-base">₹{item.price}</p>
            </div>
          ))}
        </div>

        {/* Order CTA below menu */}
        <div className="text-center mt-12 reveal">
          <p className="text-cream-200/60 text-sm mb-4">Craving something? Order straight to your door.</p>
          <a href={ORDER_URL} target="_blank" rel="noopener noreferrer"
            className="btn btn-swiggy px-8 py-4 text-base font-bold" id="menu-order-btn">
            <Icons.Delivery /> Order Now on Swiggy
          </a>
        </div>
      </Container>
    </Section>
  )
}

// ── Events ───────────────────────────────────────────────────────
function Events() {
  const [form, setForm] = useState({
    name: '', date: '', time: '', guests: '', occasion: '', notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Hi! I'd like to book an event at Marcopolo Cafe.\n\n` +
      `👤 Name: ${form.name}\n` +
      `📅 Date: ${form.date}\n` +
      `⏰ Time: ${form.time}\n` +
      `👥 Guests: ${form.guests}\n` +
      `🎉 Occasion: ${form.occasion}\n` +
      (form.notes ? `📝 Notes: ${form.notes}` : '')
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <Section id="events" className="bg-cream-100">
      <Container>
        <SectionHeader
          chip={<><Icons.Calendar className="w-4 h-4"/> Host Your Event</>}
          title={<><span className="text-indigo-950">Make It</span> <span className="text-gradient-gold" style={{WebkitTextFillColor: '#C1502E'}}>Unforgettable</span></>}
          subtitle="From intimate birthday dinners to full-floor corporate events — we've got the space, the food, and the vibe to make your occasion extraordinary."
          light
        />

        {/* Event cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {EVENTS.map((ev, i) => (
            <div key={ev.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg border border-indigo-950/10 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 reveal reveal-delay-${i + 1}`}>
              {/* Event image */}
              <div className="h-40 overflow-hidden relative">
                <img
                  src={ev.img}
                  alt={ev.title + ' at Marcopolo Cafe'}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
                <span className="absolute bottom-3 left-4 text-white/90">{(() => { const EvIcon = Icons[ev.iconKey]; return <EvIcon className="w-8 h-8"/> })()}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-indigo-950 text-lg mb-2">{ev.title}</h3>
                <p className="text-indigo-950/65 text-sm leading-relaxed mb-4">{ev.desc}</p>
                <ul className="space-y-1.5">
                  {ev.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-indigo-950/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 shrink-0"/>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Enquiry Form + Quick WhatsApp */}
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Form */}
          <div className="lg:col-span-3 reveal">
            <div className="bg-indigo-950 rounded-2xl p-8 shadow-dark-lg border border-gold-500/15">
              <h3 className="font-display font-bold text-cream-50 text-2xl mb-2">Book Your Event</h3>
              <p className="text-cream-200/60 text-sm mb-6">Fill in the details below and we'll open WhatsApp with a pre-filled message — no form submission, no fuss.</p>

              <form onSubmit={handleSubmit} className="space-y-4" aria-label="Event booking form">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="event-name" className="block text-cream-200/70 text-xs font-medium mb-1.5 uppercase tracking-wide">Your Name *</label>
                    <input id="event-name" name="name" required
                      value={form.name} onChange={handleChange}
                      placeholder="Ananya R."
                      className="form-input" />
                  </div>
                  <div>
                    <label htmlFor="event-guests" className="block text-cream-200/70 text-xs font-medium mb-1.5 uppercase tracking-wide">No. of Guests *</label>
                    <input id="event-guests" name="guests" required type="number" min="1"
                      value={form.guests} onChange={handleChange}
                      placeholder="e.g. 20"
                      className="form-input" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="event-date" className="block text-cream-200/70 text-xs font-medium mb-1.5 uppercase tracking-wide">Preferred Date *</label>
                    <input id="event-date" name="date" required type="date"
                      value={form.date} onChange={handleChange}
                      className="form-input" />
                  </div>
                  <div>
                    <label htmlFor="event-time" className="block text-cream-200/70 text-xs font-medium mb-1.5 uppercase tracking-wide">Preferred Time *</label>
                    <input id="event-time" name="time" required type="time"
                      value={form.time} onChange={handleChange}
                      className="form-input" />
                  </div>
                </div>

                <div>
                  <label htmlFor="event-occasion" className="block text-cream-200/70 text-xs font-medium mb-1.5 uppercase tracking-wide">Occasion *</label>
                  <select id="event-occasion" name="occasion" required
                    value={form.occasion} onChange={handleChange}
                    className="form-input">
                    <option value="" disabled>Select occasion…</option>
                    <option value="Birthday Party">🎂 Birthday Party</option>
                    <option value="Corporate Outing / Team Party">💼 Corporate Outing / Team Party</option>
                    <option value="Farewell / Get-together">✈️ Farewell / Get-together</option>
                    <option value="Bachelor / Bachelorette Party">🥂 Bachelor / Bachelorette Party</option>
                    <option value="Casual Gathering">👥 Casual Gathering</option>
                    <option value="Karaoke Night">🎤 Karaoke Night</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="event-notes" className="block text-cream-200/70 text-xs font-medium mb-1.5 uppercase tracking-wide">Any Special Requests</label>
                  <textarea id="event-notes" name="notes" rows={3}
                    value={form.notes} onChange={handleChange}
                    placeholder="Décor preferences, dietary needs, surprise cake, etc."
                    className="form-input resize-none" />
                </div>

                <button type="submit" id="event-submit-btn"
                  className="btn btn-whatsapp w-full py-4 text-base font-bold">
                  {submitted ? '✅ Opening WhatsApp…' : <><Icons.Send /> Send Enquiry via WhatsApp</>}
                </button>
                <p className="text-cream-200/40 text-xs text-center">Clicking above will open WhatsApp on your device with all details pre-filled.</p>
              </form>
            </div>
          </div>

          {/* Quick contact */}
          <div className="lg:col-span-2 reveal reveal-delay-2">
            <div className="bg-terracotta-500 rounded-2xl p-8 text-white shadow-lg">
              <span className="text-4xl mb-4 block">📞</span>
              <h3 className="font-display font-bold text-2xl mb-3">Prefer to chat directly?</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                Our team is on WhatsApp daily from <strong>10 AM – 11 PM</strong>. Drop us a message and we'll revert within the hour.
              </p>
              <a href={WA_LINK_EVENT} target="_blank" rel="noopener noreferrer"
                className="btn btn-whatsapp w-full py-4 text-base font-bold mb-4" id="events-whatsapp-btn">
                <Icons.WhatsApp /> WhatsApp for Event Enquiry
              </a>
              <a href={`tel:${RESTAURANT.phone.replace(/\s/g,'')}`}
                className="btn bg-white text-terracotta-500 w-full py-4 text-base font-bold hover:bg-cream-50" id="events-call-btn">
                <Icons.Phone /> Call Us
              </a>
            </div>

            {/* Hours reminder */}
            <div className="bg-white rounded-2xl p-6 mt-4 shadow border border-indigo-950/10">
              <h4 className="font-display font-bold text-indigo-950 text-base mb-3 flex items-center gap-2">
                <Icons.Clock /> We're Open
              </h4>
              <p className="text-indigo-950/70 text-sm font-semibold">{RESTAURANT.hours}</p>
              <p className="text-indigo-950/50 text-xs mt-1">Last orders for the kitchen ~11:30 PM</p>
              <p className="text-indigo-950/50 text-xs mt-3">📍 {RESTAURANT.nearby}</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// ── Gallery ──────────────────────────────────────────────────────
function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all')
  const filters = ['all', 'food', 'vibe', 'events', 'ambience']

  const filtered = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(g => g.cat === activeFilter)

  return (
    <Section id="gallery" className="bg-indigo-950/80">
      <Container>
        <SectionHeader
          chip={<><Icons.Camera className="w-4 h-4"/> Inside Marcopolo</>}
          title="A Peek Into Our World"
          subtitle="Food that wows, nights that glow, events that you'll never forget — see why Koramangala keeps coming back."
        />

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-8 reveal">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              id={`gallery-filter-${f}`}
              aria-pressed={activeFilter === f}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize border transition-all duration-200 ${
                activeFilter === f
                  ? 'bg-gold-500 text-indigo-950 border-gold-500'
                  : 'text-cream-200/60 border-gold-500/20 hover:border-gold-500/50 hover:text-cream-100'
              }`}>
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px]">
          {filtered.map((item, i) => (
            <div key={item.id}
              className={`photo-tile ${item.span} reveal reveal-delay-${(i % 4) + 1}`}
              role="img"
              aria-label={`Gallery image: ${item.label}`}>
              {/* Real photo */}
              <img
                src={item.src}
                alt={item.label + ' at Marcopolo Cafe'}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4 z-10">
                <div className="w-full">
                  <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-0.5">{item.cat}</p>
                  <p className="text-white font-bold text-sm">{item.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ── Reviews ──────────────────────────────────────────────────────
function Reviews() {
  const scrollRef = useRef(null)

  const scroll = useCallback((dir) => {
    const el = scrollRef.current
    if (el) el.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }, [])

  return (
    <Section id="reviews" className="bg-cream-100 overflow-hidden">
      <Container>
        <SectionHeader
          chip={<><Icons.Sparkle className="w-4 h-4"/> What Guests Say</>}
          title={<><span className="text-indigo-950">Loved by</span> <span style={{color:'#C1502E'}}>Koramangala</span></>}
          subtitle={`Rated ${RESTAURANT.rating}★ by ${RESTAURANT.reviewCount} Google reviewers — here's what keeps them coming back.`}
          light
        />

        {/* Scroll controls */}
        <div className="flex items-center gap-3 justify-center mb-6 reveal">
          <button onClick={() => scroll(-1)} id="reviews-prev-btn" aria-label="Scroll reviews left"
            className="w-10 h-10 rounded-full border border-indigo-950/20 flex items-center justify-center text-indigo-950 hover:bg-indigo-950 hover:text-white hover:border-indigo-950 transition-all">
            ←
          </button>
          <div className="h-1 w-24 bg-indigo-950/10 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-terracotta-500 rounded-full"/>
          </div>
          <button onClick={() => scroll(1)} id="reviews-next-btn" aria-label="Scroll reviews right"
            className="w-10 h-10 rounded-full border border-indigo-950/20 flex items-center justify-center text-indigo-950 hover:bg-indigo-950 hover:text-white hover:border-indigo-950 transition-all">
            →
          </button>
        </div>

        {/* Review cards */}
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scroll-x-snap pb-4 -mx-4 px-4 reveal">
          {REVIEWS.map((r, i) => (
            <div key={r.name}
              className="shrink-0 w-80 bg-white rounded-2xl p-6 shadow border border-indigo-950/8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              {/* Tag */}
              <span className="inline-block bg-cream-100 text-indigo-950 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-indigo-950/10">
                {r.tag}
              </span>
              {/* Stars */}
              <div className="mb-3">
                <StarRating rating={r.rating} size="sm"/>
              </div>
              {/* Review text */}
              <p className="text-indigo-950/75 text-sm leading-relaxed mb-5 italic">"{r.review}"</p>
              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-4 border-t border-indigo-950/8">
                <div className="w-8 h-8 rounded-full bg-indigo-950 flex items-center justify-center text-gold-500 font-bold text-sm">
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-indigo-950 font-semibold text-sm">{r.name}</p>
                  <p className="text-indigo-950/40 text-xs">{r.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Review CTA */}
        <div className="text-center mt-8 reveal">
          <a href={RESTAURANT.zomato} target="_blank" rel="noopener noreferrer"
            className="btn bg-indigo-950 text-cream-100 px-6 py-3 text-sm font-medium hover:bg-indigo-900 transition-colors" id="reviews-more-btn">
            Read all {RESTAURANT.reviewCount} reviews →
          </a>
        </div>
      </Container>
    </Section>
  )
}

// ── Visit ─────────────────────────────────────────────────────────
function Visit() {
  const [copied, setCopied] = useState(false)

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(RESTAURANT.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch { /* fallback */ }
  }

  const hours = [
    { day: 'Monday – Friday',   time: '10:30 AM – 11:50 PM', note: '' },
    { day: 'Saturday',          time: '10:30 AM – 11:50 PM', note: '' },
    { day: 'Sunday',            time: '10:30 AM – 11:50 PM', note: 'Brunch special all day' },
    { day: 'Public Holidays',   time: '10:30 AM – 11:50 PM', note: '' },
  ]

  return (
    <Section id="visit" className="bg-gradient-to-b from-indigo-950/90 to-indigo-950">
      <Container>
        <SectionHeader
          chip={<><Icons.MapPin className="w-4 h-4"/> Find Us</>}
          title="Come Visit Us"
          subtitle="We're in the heart of Koramangala 5th Block — easy to find, hard to leave."
        />

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Map */}
          <div className="lg:col-span-3 reveal">
            <div className="map-container w-full aspect-video shadow-dark-lg">
              <iframe
                title="Marcopolo Cafe location on Google Maps"
                src={RESTAURANT.mapEmbed}
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <a href={RESTAURANT.mapLink} target="_blank" rel="noopener noreferrer"
                className="btn btn-gold flex-1 py-3 text-sm font-bold" id="get-directions-btn">
                <Icons.Directions /> Get Directions
              </a>
              <button onClick={copyAddress} id="copy-address-btn"
                className="btn btn-outline-gold flex-1 py-3 text-sm font-bold">
                <Icons.Copy /> {copied ? '✓ Copied!' : 'Copy Address'}
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-6 reveal reveal-delay-2">
            {/* Address */}
            <div className="glass-card p-6">
              <h3 className="text-gold-500 font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                <Icons.MapPin /> Address
              </h3>
              <p className="text-cream-100 text-sm leading-relaxed">{RESTAURANT.address}</p>
              <p className="text-cream-200/50 text-xs mt-2">{RESTAURANT.nearby}</p>
            </div>

            {/* Hours */}
            <div className="glass-card p-6">
              <h3 className="text-gold-500 font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                <Icons.Clock /> Opening Hours
              </h3>
              <table className="w-full text-sm" aria-label="Opening hours">
                <tbody>
                  {hours.map(h => (
                    <tr key={h.day} className="border-b border-gold-500/10 last:border-0">
                      <td className="py-2 text-cream-200/70 pr-4">{h.day}</td>
                      <td className="py-2 text-cream-100 font-medium text-right">
                        {h.time}
                        {h.note && <span className="block text-xs text-gold-500/70">{h.note}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Contact & Parking */}
            <div className="glass-card p-6">
              <h3 className="text-gold-500 font-semibold text-sm uppercase tracking-wider mb-3">Contact & Getting Here</h3>
              <div className="space-y-3 text-sm">
                <a href={`tel:${RESTAURANT.phone.replace(/\s/g,'')}`}
                  className="flex items-center gap-3 text-cream-100 hover:text-gold-500 transition-colors" id="visit-call-link">
                  <Icons.Phone />
                  {RESTAURANT.phone}
                </a>
                <a href={WA_LINK_DEFAULT} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-cream-100 hover:text-gold-500 transition-colors" id="visit-whatsapp-link">
                  <Icons.WhatsApp />
                  WhatsApp Chat
                </a>
                <p className="flex items-start gap-3 text-cream-200/60 text-xs leading-relaxed pt-2 border-t border-gold-500/10">
                  <span className="mt-0.5">🅿️</span>
                  <span>Street parking available on 4th B Cross. We recommend coming by Namma Metro (Jayanagar station) or ride-share on busy weekend evenings.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// ── Footer ────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-gold-500/15 pt-16 pb-24 lg:pb-16" aria-label="Site footer">
      <Container>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.jpg" alt="Marcopolo Cafe logo" className="w-12 h-12 rounded-full object-cover border border-gold-500/30" loading="lazy"/>
              <div>
                <span className="font-display font-bold text-gold-500 text-lg block">Marcopolo</span>
                <span className="text-cream-200/50 text-xs tracking-widest uppercase">Cafe · Koramangala</span>
              </div>
            </div>
            <p className="text-cream-200/55 text-sm leading-relaxed italic mb-4">
              "{RESTAURANT.tagline}"
            </p>
            <div className="flex gap-3">
              <a href={RESTAURANT.instagram} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-indigo-950 transition-all"
                aria-label="Marcopolo Cafe on Instagram" id="footer-instagram">
                <Icons.Instagram />
              </a>
              <a href={RESTAURANT.facebook} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-indigo-950 transition-all"
                aria-label="Marcopolo Cafe on Facebook" id="footer-facebook">
                <Icons.Facebook />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-cream-100 text-sm uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              {['About', 'Menu', 'Events & Parties', 'Gallery', 'Reviews', 'Visit'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/ & /g, '').replace(/ /g, '-')}`}
                    className="text-cream-200/55 hover:text-gold-500 transition-colors animated-underline">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-cream-100 text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-cream-200/55">
              <li>
                <a href={`tel:${RESTAURANT.phone.replace(/\s/g,'')}`} className="hover:text-gold-500 transition-colors flex items-center gap-2" id="footer-phone">
                  <Icons.Phone /> {RESTAURANT.phone}
                </a>
              </li>
              <li>
                <a href={WA_LINK_DEFAULT} target="_blank" rel="noopener noreferrer"
                  className="hover:text-gold-500 transition-colors flex items-center gap-2" id="footer-whatsapp">
                  <Icons.WhatsApp /> WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs leading-relaxed">
                <Icons.MapPin />
                <span>{RESTAURANT.addressShort}</span>
              </li>
              <li className="flex items-center gap-2 text-xs">
                <Icons.Clock /> {RESTAURANT.hours}
              </li>
            </ul>
          </div>

          {/* Order */}
          <div>
            <h4 className="font-semibold text-cream-100 text-sm uppercase tracking-wider mb-4">Order Now</h4>
            <p className="text-cream-200/55 text-xs mb-4 leading-relaxed">
              Craving Marcopolo? Get it delivered to your door.
            </p>
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer"
              className="btn btn-swiggy w-full py-3 text-sm font-bold mb-3 flex items-center justify-center gap-2" id="footer-order-btn">
              <Icons.Delivery /> Order on Swiggy
            </a>
            <a href={RESTAURANT.zomato} target="_blank" rel="noopener noreferrer"
              className="btn bg-[#E23744] text-white w-full py-3 text-sm font-bold hover:bg-[#c72f3c] transition-colors flex items-center justify-center gap-2" id="footer-zomato-btn">
              <Icons.Fire /> View on Zomato
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold-500/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-200/35">
          <p>© {new Date().getFullYear()} Marcopolo Cafe. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="compass-dot w-1.5 h-1.5 bg-gold-500/50 rounded-full inline-block"/>
            43, 4th B Cross, Koramangala 5th Block, Bengaluru 560095
          </p>
        </div>
      </Container>
    </footer>
  )
}

// ── Floating WhatsApp FAB (desktop) ──────────────────────────────
function WhatsAppFAB() {
  const scrollY = useScrollY()
  return (
    <a
      href={WA_LINK_DEFAULT}
      target="_blank"
      rel="noopener noreferrer"
      className="fab hidden lg:flex bg-whatsapp text-white bottom-8 right-8"
      aria-label="Chat with Marcopolo Cafe on WhatsApp"
      id="whatsapp-fab"
      style={{ opacity: scrollY > 200 ? 1 : 0, pointerEvents: scrollY > 200 ? 'auto' : 'none', transition: 'opacity 0.3s ease' }}
    >
      <Icons.WhatsApp />
    </a>
  )
}

// ── Mobile Action Bar ─────────────────────────────────────────────
function MobileActionBar() {
  return (
    <div className="mobile-action-bar lg:hidden" aria-label="Quick actions">
      <a href={`tel:${RESTAURANT.phone.replace(/\s/g,'')}`}
        className="flex flex-col items-center justify-center py-3 text-cream-100 hover:text-gold-500 transition-colors gap-1" id="mob-call-btn">
        <Icons.Phone />
        <span className="text-[10px] font-medium">Call</span>
      </a>
      <a href={WA_LINK_DEFAULT} target="_blank" rel="noopener noreferrer"
        className="flex flex-col items-center justify-center py-3 bg-whatsapp/10 text-whatsapp hover:bg-whatsapp/20 transition-colors gap-1" id="mob-whatsapp-btn">
        <Icons.WhatsApp />
        <span className="text-[10px] font-medium">WhatsApp</span>
      </a>
      <a href={ORDER_URL} target="_blank" rel="noopener noreferrer"
        className="flex flex-col items-center justify-center py-3 bg-swiggy/90 text-white hover:bg-swiggy transition-colors gap-1" id="mob-order-btn">
        <Icons.Delivery />
        <span className="text-[10px] font-medium">Order</span>
      </a>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   ROOT APP
   ═══════════════════════════════════════════════════════════════════ */

export default function App() {
  useScrollReveal()

  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Events />
        <Gallery />
        <Reviews />
        <Visit />
      </main>
      <Footer />
      <WhatsAppFAB />
      <MobileActionBar />
    </div>
  )
}
