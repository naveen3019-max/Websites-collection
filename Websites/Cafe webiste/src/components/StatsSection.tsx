import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Users, MapPin, Award } from 'lucide-react';

const stats = [
    { id: 1, icon: <Coffee size={32} />, value: "50k+", label: "Cups Brewed" },
    { id: 2, icon: <Users size={32} />, value: "20k+", label: "Happy Souls" },
    { id: 3, icon: <MapPin size={32} />, value: "5", label: "Indian Outlets" },
    { id: 4, icon: <Award size={32} />, value: "15+", label: "Culinary Awards" },
];

const StatsSection: React.FC = () => {
    return (
        <section className="py-20 bg-dark text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex flex-col items-center group"
                        >
                            <div className="mb-4 p-4 rounded-2xl bg-white/5 group-hover:bg-primary transition-colors duration-500 text-primary group-hover:text-white">
                                {stat.icon}
                            </div>
                            <div className="text-4xl md:text-5xl font-serif font-bold mb-2">{stat.value}</div>
                            <div className="text-gray-400 font-medium tracking-wide uppercase text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
