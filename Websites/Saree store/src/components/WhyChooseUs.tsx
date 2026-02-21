import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Gem, Headphones } from 'lucide-react';

const WhyChooseUs = () => {
    const features = [
        {
            icon: <Gem size={28} />,
            title: 'Quintessential Quality',
            desc: 'Sourced from the heart of heritage weaving clusters, we guarantee only 100% pure, certified handloom fabrics.'
        },
        {
            icon: <ShieldCheck size={28} />,
            title: 'Legacy Of Trust',
            desc: 'For decades, our boutique has been the preferred destination for generations of families for their milestone moments.'
        },
        {
            icon: <Clock size={28} />,
            title: 'Bespoke Curations',
            desc: 'Our latest design series are carefully curated weekly, ensuring you have access to the vanguard of ethnic fashion.'
        },
        {
            icon: <Headphones size={28} />,
            title: 'Private Concierge',
            desc: 'Experience a personalized shopping journey with our expert saree stylists via virtual or in-person consultation.'
        }
    ];

    return (
        <section className="py-32 px-8 bg-maroon text-pearl relative overflow-hidden">
            {/* Elegant Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C5A059 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                    {/* Section Header Side */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4"
                            >
                                <div className="h-[1px] w-12 bg-gold/40" />
                                <span className="text-gold font-poppins tracking-[0.4em] uppercase text-[10px] font-bold">
                                    The Distinction
                                </span>
                            </motion.div>
                            <h2 className="text-5xl md:text-7xl font-playfair leading-tight tracking-tighter">
                                Uncompromising <br />
                                <span className="italic font-normal text-gold">Excellence</span>
                            </h2>
                            <p className="text-pearl/60 text-lg font-inter editorial-spacing max-w-md">
                                We believe that true luxury lies in the details. From the purity of the silk to the precision of the weave, we uphold the highest standards of Indian craftsmanship.
                            </p>
                        </div>

                        <div className="pt-6">
                            <button className="border border-gold/30 text-pearl px-12 py-5 font-bold tracking-[0.2em] uppercase text-[10px] hover:bg-gold hover:text-maroon transition-all duration-500">
                                Book A Viewing
                            </button>
                        </div>
                    </div>

                    {/* Features Grid Side */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-10">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-10 bg-pearl/5 border border-gold/10 hover:border-gold transition-all duration-500 space-y-6"
                            >
                                <div className="text-gold shrink-0 group-hover:scale-110 transition-transform duration-500 opacity-60">
                                    {feature.icon}
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-xl font-playfair font-bold tracking-tight text-pearl">{feature.title}</h4>
                                    <p className="text-pearl/50 text-xs font-inter leading-relaxed tracking-wide">
                                        {feature.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
