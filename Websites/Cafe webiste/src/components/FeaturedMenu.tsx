import React from 'react';
import { motion } from 'framer-motion';
import PremiumMenuCard from './PremiumMenuCard';

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    category: string;
}

const featuredItems: MenuItem[] = [
    {
        id: 1,
        name: "Premium Masala Chai",
        description: "Authentic Indian tea brewed with fresh milk, ginger, and cardamom.",
        price: "₹120",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
        category: "Coffee & Chai"
    },
    {
        id: 2,
        name: "Avocado Toast",
        description: "Multigrain sourdough topped with creamy avocado and chili flakes.",
        price: "₹380",
        image: "https://th.bing.com/th/id/OIP.2_QgO1XW3fY3jDTVZC5f2QHaL5?w=197&h=316&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Breakfast"
    },
    {
        id: 3,
        name: "Spicy Paneer Burger",
        description: "Crispy paneer patty with spicy mayo and fresh greens.",
        price: "₹260",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
        category: "Lunch"
    }
];

const FeaturedMenu: React.FC = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background elements for modern look */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-widest uppercase mb-4 inline-block"
                    >
                        Desi Delights
                    </motion.span>
                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif font-bold text-dark leading-tight"
                    >
                        Popular <span className="text-primary">Indian Picks</span>
                    </motion.h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {featuredItems.map((item) => (
                        <PremiumMenuCard
                            key={item.id}
                            {...item}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedMenu;
