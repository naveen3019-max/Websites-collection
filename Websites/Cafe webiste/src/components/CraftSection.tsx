import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Leaf, ShieldCheck, Heart } from 'lucide-react';

const CraftSection: React.FC = () => {
    const values = [
        { icon: <Coffee />, title: "Precision Brewing", desc: "Scientific precision in every temperature, timing, and grind." },
        { icon: <Leaf />, title: "Ethical Sourcing", desc: "Direct relationship with Indian farmers for the highest quality beans." },
        { icon: <ShieldCheck />, title: "Unmatched Purity", desc: "Zero artificial flavors. Just pure, organic, and natural ingredients." },
        { icon: <Heart />, title: "Crafted with Passion", desc: "Our baristas are artists dedicated to the perfect cup of joy." }
    ];

    return (
        <section className="py-24 bg-dark text-white overflow-hidden relative">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative z-10 rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
                                alt="Coffee Craft"
                                className="w-full h-full object-cover grayscale active:grayscale-0 transition-all duration-1000"
                            />
                        </motion.div>

                        {/* Decorative floating card */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="absolute -bottom-10 -right-10 bg-primary p-8 rounded-[2rem] hidden md:block max-w-[280px] shadow-2xl"
                        >
                            <h4 className="text-2xl font-serif font-bold mb-2">Our Secret?</h4>
                            <p className="text-white/80 text-sm">
                                We roast our beans in small batches right here in Bengaluru to ensure maximum freshness.
                            </p>
                        </motion.div>
                    </div>

                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-bold tracking-widest uppercase mb-4 inline-block"
                        >
                            The Art of Aura
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight"
                        >
                            Beyond Coffee, <br />It's a <span className="italic text-primary">Philosophy</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-white/60 text-lg mb-12"
                        >
                            At Cafe Aura, we believe that the best moments are nurtured in spaces that value craft over convenience. Our process is slow, intentional, and deeply rooted in excellence.
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {values.map((v, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                    className="flex flex-col gap-4 group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        {v.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">{v.title}</h4>
                                        <p className="text-white/40 text-sm">{v.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CraftSection;
