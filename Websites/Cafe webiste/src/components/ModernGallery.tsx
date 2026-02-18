import React from 'react';
import { motion } from 'framer-motion';

const images = [
    { url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", span: "md:col-span-2 md:row-span-2" }, // 4 slots
    { url: "https://th.bing.com/th/id/OIP.hhrMaY6NH9w9jYSQaoCT6AHaFj?w=241&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", span: "md:col-span-1 md:row-span-1" }, // 1 slot
    { url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", span: "md:col-span-1 md:row-span-1" }, // 1 slot
    { url: "https://th.bing.com/th/id/OIP.hhrMaY6NH9w9jYSQaoCT6AHaFj?w=241&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", span: "md:col-span-1 md:row-span-1" }, // 1 slot
    { url: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", span: "md:col-span-1 md:row-span-1" }, // 1 slot
    { url: "https://th.bing.com/th/id/OIP.hhrMaY6NH9w9jYSQaoCT6AHaFj?w=241&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", span: "md:col-span-2 md:row-span-1" }, // 2 slots
    { url: "https://th.bing.com/th/id/OIP.7twrYAZ4lgkxkiUCKqmcxwHaEK?w=315&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", span: "md:col-span-2 md:row-span-1" }, // Social Ambiance (Updated)
];

const ModernGallery: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-widest uppercase mb-4"
                    >
                        Immerse Yourself
                    </motion.h2>
                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-dark">Vibe of Cafe Aura</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`${img.span} relative rounded-2xl overflow-hidden group`}
                        >
                            <img
                                src={img.url}
                                alt="Gallery image"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white font-serif italic text-2xl">Namaste</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ModernGallery;
