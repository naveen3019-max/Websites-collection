import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, Users, Leaf, Target, Award, Quote } from 'lucide-react';
import SEO from '../components/SEO';

const About: React.FC = () => {
    const values = [
        { icon: <Heart className="text-primary" />, title: "Community First", desc: "We believe in building spaces where everyone feels at home." },
        { icon: <Coffee className="text-primary" />, title: "Quality Craft", desc: "Every bean is roasted with obsession and every cup is brewed with precision." },
        { icon: <Users className="text-primary" />, title: "Local Love", desc: "Supporting local Indian farmers and artisans in everything we do." },
        { icon: <Leaf className="text-primary" />, title: "Eco-Conscious", desc: "Committed to sustainable practices and reducing our carbon footprint." }
    ];

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Our Story & Philosophy | Cafe Aura"
                description="Discover the passion, people, and philosophy behind Cafe Aura. From a small hobby to a premium cafe destination in India."
            />

            {/* Immersive Header */}
            <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80"
                        alt="About Header"
                        className="w-full h-full object-cover grayscale opacity-60 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/40 to-white" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: "0em" }}
                        animate={{ opacity: 1, letterSpacing: "0.5em" }}
                        className="text-primary font-bold uppercase mb-6 inline-block"
                    >
                        Established 2010
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight"
                    >
                        The Heart of <br /><span className="text-primary italic">Cafe Aura</span>
                    </motion.h1>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="w-24 h-1 bg-primary mx-auto"
                    />
                </div>
            </div>

            {/* Our Journey Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-square relative z-10">
                                <img
                                    src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80"
                                    alt="First Outlet"
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            {/* Floating Stats Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="absolute -bottom-10 -right-10 bg-dark text-white p-10 rounded-[2.5rem] shadow-2xl z-20 hidden md:block"
                            >
                                <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Heritage</p>
                                <h4 className="text-4xl font-serif font-bold mb-4">14 Years</h4>
                                <p className="text-white/40 text-sm">Of perfecting the <br />perfect masala brew.</p>
                            </motion.div>
                        </motion.div>

                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-serif font-bold text-dark mb-8 leading-tight"
                            >
                                Where Every Cup <br />Has a <span className="text-primary italic">Soul</span>
                            </motion.h2>
                            <div className="space-y-6 text-gray-500 text-lg leading-relaxed">
                                <p>
                                    What started as a quiet dream in a small corner of Bengaluru back in 2010 has grown into a Sanctuary for coffee lovers and dreamers alike. We didn't just want to serve drinks; we wanted to create an **Aura** of warmth and inspiration.
                                </p>
                                <p>
                                    At Cafe Aura, we marry traditional Indian hospitality with modern artisanal techniques. Our beans are sourced directly from the misty hills of Chikmagalur, ensuring every sip carries the genuine essence of Indian heritage.
                                </p>
                            </div>

                            <div className="flex gap-8 mt-12">
                                <div className="text-center group">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mx-auto mb-4 scale-110">
                                        <Award size={32} />
                                    </div>
                                    <span className="text-sm font-bold uppercase tracking-widest">Best Cafe 2023</span>
                                </div>
                                <div className="text-center group">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mx-auto mb-4 scale-110">
                                        <Target size={32} />
                                    </div>
                                    <span className="text-sm font-bold uppercase tracking-widest">Modern Brewing</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-24 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-dark mb-4">Our Core Values</h2>
                        <div className="w-20 h-1 bg-primary mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 text-center"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    {v.icon}
                                </div>
                                <h4 className="text-xl font-bold text-dark mb-4">{v.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founders Message */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="bg-dark rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
                        {/* Decorative Quote Mark */}
                        <Quote className="absolute top-10 right-10 text-white/5 w-64 h-64 -rotate-12" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                            <div className="max-w-xl">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-white text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                                        "Coffee is the silence that allows <span className="text-primaryitalic">conversation</span> to begin."
                                    </h2>
                                    <p className="text-white/60 text-lg mb-8 italic">
                                        "We founded Cafe Aura with a simple mission: to slow down the world, one cup at a time. Every detail you see, from the lighting to the grind, is curated to make you feel present."
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-px bg-primary" />
                                        <div>
                                            <p className="text-white font-bold text-xl">Arjun & Priya</p>
                                            <p className="text-primary text-sm uppercase tracking-widest font-bold">Founders, Cafe Aura</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative lg:block hidden"
                            >
                                <div className="rounded-full overflow-hidden aspect-square border-[20px] border-white/5 p-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80"
                                        alt="Founders at Work"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sustainability Commitment */}
            <section className="py-24 bg-secondary/10">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mx-auto mb-8"
                        >
                            <Leaf size={40} />
                        </motion.div>
                        <h2 className="text-4xl font-serif font-bold text-dark mb-6">Our Green Aura</h2>
                        <p className="text-gray-500 text-lg leading-relaxed mb-12">
                            We are proud to be 100% plastic-free in our dine-in services. By partnering with local farmers who practice regenerative agriculture, we ensure that every bean we roast gives back more than it takes from the earth.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {["Plastic Free", "Fair Trade", "Organic Beans", "Zero Waste Kitchen"].map((tag, i) => (
                                <span key={i} className="px-6 py-2 bg-white rounded-full border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest shadow-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
