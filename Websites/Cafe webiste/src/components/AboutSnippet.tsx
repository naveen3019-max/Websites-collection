import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { Link } from 'react-router-dom';

const AboutSnippet: React.FC = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Collaged Images */}
                    <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px]">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="absolute top-0 left-0 w-3/4 h-3/4 z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=60"
                                alt="Cafe Interior"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="absolute bottom-0 right-0 w-2/3 h-2/3 z-20 rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=60"
                                alt="Artisan Coffee"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-primary/20 rounded-full animate-pulse z-0 hidden md:block"></div>
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-1/2">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-bold tracking-widest uppercase mb-4 inline-block"
                        >
                            Our Passion for Perfection
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-serif font-bold text-dark mb-6 leading-tight"
                        >
                            Crafting Moments, <br />
                            <span className="text-primary italic">One Cup at a Time.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-600 text-lg mb-8 leading-relaxed"
                        >
                            Cafe Aura isn't just about coffee; it's about the soul of brewing. We've brought our global standards to India, blending artisanal techniques with local warmth to create a sanctuary for coffee lovers.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-6"
                        >
                            <Link to="/about">
                                <Button variant="outline" size="lg">Discover Our Journey</Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSnippet;
