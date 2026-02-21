
import { motion } from 'framer-motion';
import { Shield, Sun, Wind, Droplets } from 'lucide-react';

const HeirloomCare = () => {
    const tips = [
        {
            icon: <Shield size={24} />,
            title: "Storage Wisdom",
            desc: "Wrap your heirlooms in pure cotton or muslin. Avoid plastic covers to let the natural silk fibers breathe."
        },
        {
            icon: <Sun size={24} />,
            title: "Light Preservation",
            desc: "Store in a cool, dark place. Prolonged exposure to direct sunlight can fade natural vegetable dyes."
        },
        {
            icon: <Wind size={24} />,
            title: "The Airing Ritual",
            desc: "Every few months, unfold your sarees and air them in a shaded spot to prevent permanent creases."
        },
        {
            icon: <Droplets size={24} />,
            title: "Cleaning Mastery",
            desc: "Only professional dry cleaning is recommended. For stains, immediate blotting with cold water is key."
        }
    ];

    return (
        <section className="py-32 px-8 bg-maroon text-pearl overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-gold/30" />
                            <span className="text-gold font-poppins tracking-[0.4em] uppercase text-[10px] font-bold">
                                Preservation
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-playfair leading-tight tracking-tighter">
                            Heirloom <span className="italic text-gold">Care Guide</span>
                        </h2>
                        <p className="text-pearl/60 text-lg font-inter editorial-spacing max-w-lg">
                            A handwoven saree is not just a garment; it is a legacy. Follow our master weavers' guide to ensuring your treasure stays eternal.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {tips.map((tip, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="space-y-4"
                            >
                                <div className="text-gold opacity-50">{tip.icon}</div>
                                <h4 className="text-xl font-playfair font-bold text-pearl italic border-l border-gold/20 pl-4">{tip.title}</h4>
                                <p className="text-pearl/40 text-[10px] leading-relaxed uppercase tracking-wider font-inter">{tip.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="aspect-[4/5] bg-pearl/5 border border-gold/10 relative overflow-hidden group">
                        <img
                            src="/images/silk-saree-1.jpg"
                            alt="Saree Care"
                            className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[2s]"
                        />
                        <div className="absolute inset-0 bg-maroon/20 group-hover:bg-transparent transition-colors duration-700" />
                    </div>
                    {/* Floating decorative element */}
                    <div className="absolute -bottom-10 -right-10 bg-gold p-12 hidden xl:block border border-maroon/20">
                        <p className="text-maroon font-playfair text-xl font-bold italic tracking-tighter leading-none">Generations <br /> of Silk</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeirloomCare;
