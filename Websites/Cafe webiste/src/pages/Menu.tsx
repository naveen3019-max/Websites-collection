import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Utensils, Star, Filter } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import PremiumMenuCard from '../components/PremiumMenuCard';
import SEO from '../components/SEO';

const categories = ["All", "Coffee & Chai", "Beverages", "Breakfast", "Lunch", "Desserts", "Snacks"];

const menuItems = [
    {
        id: 1,
        name: "Premium Masala Chai",
        description: "Authentic Indian tea brewed with fresh milk, ginger, and cardamom.",
        price: "₹120",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Coffee & Chai",
        isSignature: true
    },
    {
        id: 2,
        name: "Avocado Toast",
        description: "Multigrain sourdough topped with creamy avocado, cherry tomatoes, and chili flakes.",
        price: "₹380",
        image: "https://th.bing.com/th/id/OIP.2_QgO1XW3fY3jDTVZC5f2QHaL5?w=197&h=316&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Breakfast"
    },
    {
        id: 3,
        name: "Spicy Paneer Burger",
        description: "Crispy paneer patty with spicy mayo, lettuce, and onions on a brioche bun.",
        price: "₹260",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Lunch",
        isSignature: true
    },
    {
        id: 4,
        name: "Matcha Latte",
        description: "Premium Japanese matcha green tea whisked with frothy milk.",
        price: "₹240",
        image: "https://th.bing.com/th/id/OIP.flBklnuNRn4oS5mqWimvgwHaLH?w=204&h=306&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Beverages"
    },
    {
        id: 5,
        name: "Blueberry Cheesecake",
        description: "Creamy baked cheesecake swirled with fresh blueberry compote.",
        price: "₹280",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Desserts"
    },
    {
        id: 6,
        name: "Chili Garlic Gobi",
        description: "Crispy cauliflower tossed in a spicy garlic and chili glaze.",
        price: "₹220",
        image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Snacks"
    },
    {
        id: 7,
        name: "Ice Caramel Macchiato",
        description: "Double shot espresso with vanilla, cold milk, and caramel drizzle.",
        price: "₹210",
        image: "https://th.bing.com/th/id/OIP.u8tBFjfJaIGx5WL3bVfsfwHaLH?w=204&h=306&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Coffee & Chai"
    },
    {
        id: 8,
        name: "Masala Omelette",
        description: "Fluffy eggs cooked with onions, green chilies, and fresh coriander.",
        price: "₹180",
        image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Breakfast"
    },
    // New Items
    {
        id: 9,
        name: "Authentic Vada Pav",
        description: "The classic Mumbai street food. Spicy potato fritter in a soft bun with dry garlic chutney.",
        price: "₹80",
        image: "https://th.bing.com/th/id/OIP.xnEbYZHqXFnjeaOtPzjkIAHaEq?w=273&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Snacks",
        isSignature: true
    },
    {
        id: 10,
        name: "Kadak Adrak Chai",
        description: "Strong tea infused with fresh crushed ginger. Perfect for a rainy day.",
        price: "₹90",
        image: "https://th.bing.com/th/id/OIP.RlBFlUVb-qFb6kY0I93V_AHaE8?w=250&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Coffee & Chai"
    },
    {
        id: 11,
        name: "Paneer Tikka Platter",
        description: "Spiced paneer cubes grilled to perfection with bell peppers and onions.",
        price: "₹320",
        image: "https://th.bing.com/th/id/OIP.iyWU0PjOSwOJHHrq0EjOWQHaE7?w=240&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Snacks"
    },
    {
        id: 12,
        name: "South Indian Filter Coffee",
        description: "Traditional brew made with a special blend of roasted coffee and chicory.",
        price: "₹110",
        image: "https://th.bing.com/th/id/OIP.v_jLk81_98FCRtsgmyydWAHaE8?w=280&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Coffee & Chai"
    },
    {
        id: 13,
        name: "Alphonso Mango Lassi",
        description: "Creamy yogurt-based drink blended with the king of mangoes.",
        price: "₹180",
        image: "https://th.bing.com/th/id/OIP.F6okDALi4uUDiU9hb8oCXQHaE8?w=282&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Beverages"
    },
    {
        id: 14,
        name: "Poha Specialty",
        description: "Flattened rice tempered with mustard seeds, curry leaves, and peanuts.",
        price: "₹140",
        image: "https://th.bing.com/th/id/OIP.iQz755ZuyXxjt15r0Epo3AHaEK?w=280&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Breakfast"
    },
    {
        id: 15,
        name: "Chole Bhature",
        description: "Spicy chickpea curry served with two large fluffy deep-fried breads.",
        price: "₹280",
        image: "https://th.bing.com/th/id/OIP.0zzG79hf3OSz_GagdlGd4gHaHa?w=190&h=190&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Lunch"
    },
    {
        id: 16,
        name: "Classic Samosa (2pcs)",
        description: "Golden crispy pastry filled with spiced potatoes and peas.",
        price: "₹60",
        image: "https://th.bing.com/th/id/OIP.w8zRbkmmE6kEQUFJjCUcuAHaHa?w=177&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Snacks"
    },
    {
        id: 17,
        name: "Royal Rasmalai",
        description: "Soft cottage cheese dumplings soaked in sweetened, thickened milk.",
        price: "₹160",
        image: "https://th.bing.com/th/id/OIP.2xWipYiyacpNjQb8p4ebKwHaEK?w=264&h=182&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Desserts"
    },
    {
        id: 18,
        name: "Gulab Jamun (2pcs)",
        description: "Traditional deep-fried milk solids dumplings in saffron syrup.",
        price: "₹120",
        image: "https://th.bing.com/th/id/OIP.v_HhnW5zacEZ5kGtS4Aq3wHaGq?w=218&h=196&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Desserts"
    },
    {
        id: 19,
        name: "Bombay Grilled Sandwich",
        description: "Veg-stuffed sandwich with green chutney, cheese, and special spices.",
        price: "₹190",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
        category: "Breakfast"
    },
    {
        id: 20,
        name: "Chili Cheese Toast",
        description: "Crispy toast topped with melted cheese and fresh green chilies.",
        price: "₹170",
        image: "https://th.bing.com/th/id/OIP.SLBWZUjPX0lk_U1oeQXNZgHaE8?w=268&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Snacks"
    },
    {
        id: 21,
        name: "Tandoori Paneer Pizza",
        description: "Fresh dough topped with tandoori paneer, onions, and spicy mayo.",
        price: "₹420",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
        category: "Lunch"
    },
    {
        id: 22,
        name: "Hot Chocolate Bliss",
        description: "Premium dark chocolate melted with creamy milk and marshmallows.",
        price: "₹230",
        image: "https://th.bing.com/th/id/OIP.5AwTSLf_SgCkHRillBHVTAHaHa?w=197&h=197&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Beverages"
    },
    {
        id: 23,
        name: "Fresh Lime Soda",
        description: "Refreshing lemonade with a choice of sweet or salted base.",
        price: "₹90",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
        category: "Beverages"
    },
    {
        id: 24,
        name: "Peri Peri Fries",
        description: "Golden crispy fries tossed in a spicy peri peri seasoning.",
        price: "₹150",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
        category: "Snacks"
    }
];

const Menu: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredItems = menuItems.filter(item => {
        const matchesCategory = activeCategory === "All" || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const signatureItems = menuItems.filter(item => item.isSignature);

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Explore Our Indian Localized Menu | Cafe Aura"
                description="Browse 30+ delicious localized items from Masala Chai to Avocado Toast. High-quality ingredients and modern Indian flavors."
            />

            {/* Minimalist Header */}
            <div className="bg-secondary/30 pt-32 pb-20 border-b border-primary/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-primary font-bold tracking-widest uppercase mb-4 inline-block"
                        >
                            The Full Experience
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-serif font-bold text-dark mb-6 leading-tight"
                        >
                            Our <span className="text-primary italic">Crafted</span> Menu
                        </motion.h1>

                        {/* Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative max-w-xl mx-auto mt-8"
                        >
                            <input
                                type="text"
                                placeholder="Search for flavors (e.g. Masala Chai, Burger...)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-6 py-5 rounded-3xl border-none shadow-2xl focus:ring-2 focus:ring-primary/40 text-lg"
                            />
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={24} />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Signature Series Section */}
            {activeCategory === "All" && searchQuery === "" && (
                <section className="py-20 bg-white border-b border-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
                                <Star size={24} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-dark">Signature Series</h2>
                                <p className="text-gray-500">Hand-picked favorites that define Cafe Aura.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {signatureItems.map(item => (
                                <PremiumMenuCard key={`sig-${item.id}`} {...item} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <div className="container mx-auto px-4 py-20">
                {/* Advanced Filter Layout */}
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Sidebar Filters */}
                    <div className="lg:w-64 shrink-0">
                        <div className="sticky top-32">
                            <div className="flex items-center gap-2 mb-8 text-primary font-bold uppercase tracking-wider text-sm">
                                <Filter size={18} /> Filters
                            </div>
                            <div className="flex flex-col gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-6 py-4 rounded-2xl font-medium text-left transition-all duration-300 flex items-center justify-between group ${activeCategory === category
                                            ? 'bg-primary text-white shadow-xl'
                                            : 'bg-white text-gray-500 hover:bg-primary/5 hover:text-primary'
                                            }`}
                                    >
                                        {category}
                                        <span className={`text-xs opacity-50 group-hover:opacity-100 ${activeCategory === category ? 'text-white' : 'text-primary'}`}>
                                            ({menuItems.filter(i => category === "All" ? true : i.category === category).length})
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Promo Card */}
                            <div className="mt-12 p-8 bg-dark rounded-[2rem] text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
                                <h4 className="text-xl font-serif font-bold mb-4 relative z-10">Hungry?</h4>
                                <p className="text-white/60 text-sm mb-6 relative z-10">Get 10% off on your first WhatsApp order!</p>
                                <button className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-white hover:text-dark transition-colors">
                                    Use CODE: AURA10
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Menu Content */}
                    <div className="flex-grow">
                        <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
                            <h3 className="text-2xl font-serif font-bold text-dark">
                                {activeCategory} <span className="text-gray-300 ml-2 font-sans font-normal text-lg">({filteredItems.length} items)</span>
                            </h3>
                        </div>

                        <AnimatePresence mode="popLayout">
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                            >
                                {filteredItems.map((item) => (
                                    <MenuCard
                                        key={item.id}
                                        {...item}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {filteredItems.length === 0 && (
                            <div className="text-center py-32 bg-gray-50 rounded-[3rem]">
                                <Utensils className="mx-auto text-gray-200 mb-6" size={64} />
                                <h3 className="text-3xl font-serif text-gray-400 font-bold mb-2">No flavors found</h3>
                                <p className="text-gray-400 max-w-xs mx-auto">Try adjusting your search or category filters to find what you're looking for.</p>
                                <button
                                    onClick={() => { setSearchQuery(""); setActiveCategory("All") }}
                                    className="mt-8 text-primary font-bold underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
