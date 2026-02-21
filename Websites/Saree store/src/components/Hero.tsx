
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-24 px-8 overflow-hidden bg-pearl">
            {/* Dynamic Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/[0.05] transform skew-x-6 hidden lg:block" />
            <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-maroon/[0.02] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10 w-full">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-12"
                >
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-4"
                        >
                            <div className="h-[1px] w-12 bg-gold/30" />
                            <span className="text-gold font-poppins tracking-[0.4em] uppercase text-[10px] font-bold">
                                The Legacy Edit 2026
                            </span>
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-playfair text-ink leading-[0.9] tracking-tighter">
                            Timeless <br />
                            <span className="italic font-normal relative text-maroon">
                                Artistry
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ delay: 0.8, duration: 1 }}
                                    className="absolute -bottom-2 left-0 h-[1px] bg-gold/30"
                                />
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-ink/60 font-inter max-w-lg leading-relaxed editorial-spacing">
                            A curated anthology of sarees handcrafted by master artisans. Where heritage weaving techniques meet modern sophisticated silhouettes.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <button className="bg-maroon text-pearl px-10 py-5 font-bold tracking-[0.2em] uppercase text-[10px] hover:bg-maroon-light transition-all duration-500 flex items-center justify-center gap-3 border border-gold/20 shadow-xl shadow-maroon/10">
                            The Collection
                            <ArrowRight size={16} className="opacity-50 text-gold" />
                        </button>
                        <a
                            href="https://wa.me/919380388788?text=Hello%20RS%20Handlooms%2C%20I%20am%20interested%20in%20your%20saree%20collection."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-gold/30 text-ink px-10 py-5 font-bold tracking-[0.2em] uppercase text-[10px] hover:bg-maroon hover:text-pearl hover:border-maroon transition-all duration-500 flex items-center justify-center gap-3 backdrop-blur-sm"
                        >
                            <MessageCircle size={16} className="opacity-50 text-gold" />
                            WhatsApp Inquiry
                        </a>
                    </div>

                    {/* Minimal Trust markers */}
                    <div className="flex items-center gap-12 pt-10">
                        <div className="space-y-1">
                            <p className="text-sm font-playfair font-bold text-maroon uppercase tracking-widest">Handloom</p>
                            <p className="text-[10px] text-ink/40 uppercase tracking-widest">Certified Origin</p>
                        </div>
                        <div className="h-8 w-[1px] bg-gold/20" />
                        <div className="space-y-1">
                            <p className="text-sm font-playfair font-bold text-maroon uppercase tracking-widest">Bespoke</p>
                            <p className="text-[10px] text-ink/40 uppercase tracking-widest">Tailored Service</p>
                        </div>
                    </div>
                </motion.div>

                {/* Hero Image - More Editorial */}
                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative group"
                >
                    <div className="relative z-10 overflow-hidden aspect-[3/4] md:h-[750px] bg-maroon border border-gold/10 shadow-2xl">
                        <img
                            src="/src/assets/hero-saree.jpg"
                            alt="Authentic Editorial Saree Showcase"
                            className="w-full h-full object-cover transition-transform duration-[2s] scale-105 group-hover:scale-110 opacity-80"
                        />
                        {/* Elegant overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-maroon/60 to-transparent opacity-60" />
                    </div>

                    {/* Floating Minimal Tag */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-10 -left-10 bg-white p-8 border border-gold/10 shadow-2xl z-20 hidden xl:block"
                    >
                        <p className="text-gold font-poppins font-bold text-[10px] tracking-[0.3em] uppercase mb-2">Exclusively Crafted</p>
                        <p className="text-maroon font-playfair text-3xl font-bold tracking-tighter leading-none italic">Royal Mustard</p>
                        <p className="text-ink/30 text-[10px] tracking-widest uppercase mt-4">Heritage Edition</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
