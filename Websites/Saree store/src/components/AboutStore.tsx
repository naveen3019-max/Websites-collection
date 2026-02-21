
import { motion } from 'framer-motion';

const AboutStore = () => {
    return (
        <section id="about" className="py-32 px-8 bg-pearl overflow-hidden relative">
            {/* Editorial Decorative text */}
            <div className="absolute top-0 right-0 pointer-events-none opacity-[0.02] select-none translate-x-1/2 -translate-y-1/4">
                <h2 className="text-[30rem] font-playfair font-bold text-gold leading-none italic">
                    Heritage
                </h2>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                {/* Modern Image Grid */}
                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative z-10"
                    >
                        <div className="aspect-[4/5] overflow-hidden bg-maroon border border-gold/20 shadow-2xl">
                            <img
                                src="/images/store-interior.jpg"
                                alt="Authentic RS Handlooms Interior"
                                className="w-full h-full object-cover opacity-90"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="absolute -bottom-16 -right-16 w-3/4 hidden xl:block z-20 border-[12px] border-pearl shadow-2xl"
                    >
                        <div className="aspect-square overflow-hidden bg-maroon border border-gold/10">
                            <img
                                src="/images/shopping-experience.jpg"
                                alt="Personalized Saree Shopping Experience"
                                className="w-full h-full object-cover opacity-90"
                            />
                        </div>
                    </motion.div>

                    {/* Minimal Floating badge */}
                    <div className="absolute -top-10 -left-10 bg-maroon p-10 z-0 hidden lg:block border border-gold/20 shadow-2xl">
                        <h4 className="text-pearl font-playfair text-6xl font-bold tracking-tighter block mb-2 leading-none italic">03</h4>
                        <p className="text-gold font-inter text-[10px] uppercase tracking-[0.3em] font-bold">Generations <br /> Of Mastery</p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-12">
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4"
                        >
                            <div className="h-[1px] w-12 bg-gold/30" />
                            <span className="text-gold font-poppins tracking-[0.4em] uppercase text-[10px] font-bold">
                                The Heritage
                            </span>
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-playfair text-ink leading-tight tracking-tighter">
                            Legacy of <span className="italic font-normal text-maroon">Artisanship</span>
                        </h2>
                        <p className="text-ink/70 text-lg font-inter editorial-spacing">
                            Born from a pursuit of textile perfection, our boutique has spent decades sourcing the finest threads from India's most renowned weaving clusters. We don't just sell sarees; we preserve a living art form.
                        </p>
                        <p className="text-ink/50 text-sm font-inter editorial-spacing italic border-l-2 border-gold/30 pl-6">
                            "To wear our saree is to drape oneself in centuries of history, culture, and soulful craftsmanship."
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-12 pt-10 border-t border-gold/20">
                        <div className="space-y-2">
                            <h4 className="text-maroon font-playfair text-4xl tracking-tighter font-bold italic">150+</h4>
                            <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">Master Weavers</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-maroon font-playfair text-4xl tracking-tighter font-bold italic">45k+</h4>
                            <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">Heirloom Pieces</p>
                        </div>
                    </div>

                    <div className="pt-8">
                        <button className="bg-maroon text-pearl px-12 py-5 font-bold tracking-[0.2em] uppercase text-[10px] hover:bg-maroon-light transition-all duration-500 border border-gold/20 shadow-xl shadow-maroon/10">
                            Discover Our Story
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutStore;
