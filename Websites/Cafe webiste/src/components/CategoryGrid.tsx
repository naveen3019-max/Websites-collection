import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
    {
        title: "Golden Chai",
        subtitle: "Hand-blended spices",
        image: "https://th.bing.com/th/id/OIP.hhrMaY6NH9w9jYSQaoCT6AHaFj?w=241&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        span: "md:col-span-2 md:row-span-2",
        link: "/menu?category=chai"
    },
    {
        title: "Artisan Brews",
        subtitle: "Single origin beans",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
        span: "md:col-span-2 md:row-span-1",
        link: "/menu?category=coffee"
    },
    {
        title: "Desi Bites",
        subtitle: "Flavorful snacks",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
        span: "md:col-span-1 md:row-span-1",
        link: "/menu?category=lunch"
    },
    {
        title: "Sweet Aura",
        subtitle: "Gourmet desserts",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80",
        span: "md:col-span-1 md:row-span-1",
        link: "/menu?category=desserts"
    }
];

const CategoryGrid: React.FC = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-bold tracking-widest uppercase mb-4 inline-block"
                        >
                            Curated Selection
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-serif font-bold text-dark"
                        >
                            Experience the <span className="text-primary italic">Variety</span>
                        </motion.h2>
                    </div>
                    <Link to="/menu">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-dark text-white px-8 py-3 rounded-full flex items-center gap-2 font-medium hover:bg-primary transition-colors duration-300"
                        >
                            Explore Full Menu <ArrowUpRight size={20} />
                        </motion.button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[240px]">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative overflow-hidden rounded-[2rem] ${cat.span}`}
                        >
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <span className="text-primary/90 text-sm font-bold tracking-widest uppercase mb-2 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    {cat.subtitle}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                                    {cat.title}
                                </h3>
                                <div className="overflow-hidden">
                                    <Link
                                        to={cat.link}
                                        className="flex items-center gap-2 text-white font-medium transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                                    >
                                        View Details <ArrowUpRight size={18} className="text-primary" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
