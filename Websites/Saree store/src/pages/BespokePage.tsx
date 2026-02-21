import { motion } from 'framer-motion';

const BespokePage = () => {
    return (
        <div className="pt-32 pb-20 px-8 bg-pearl min-h-screen">
            <div className="max-w-7xl mx-auto space-y-24">
                {/* Intro */}
                <div className="space-y-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-4"
                    >
                        <div className="h-[1px] w-12 bg-gold/30" />
                        <span className="text-gold font-poppins tracking-[0.4em] uppercase text-[10px] font-bold">
                            Private Viewing
                        </span>
                        <div className="h-[1px] w-12 bg-gold/30" />
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-playfair text-ink leading-tight tracking-tighter">
                        Bespoke <span className="italic font-normal text-maroon">Concierge</span>
                    </h1>
                    <p className="text-lg text-ink/60 font-inter max-w-2xl mx-auto leading-relaxed editorial-spacing">
                        Experience a personalized journey through our archives. Our stylists are here to help you find the drape that perfectly reflects your identity.
                    </p>
                </div>

                {/* Service Tiers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        {
                            title: "Heritage Consultation",
                            detail: "A 45-minute virtual session with our lead curator to explore weaving techniques and collection highlights.",
                            cta: "Request Invite"
                        },
                        {
                            title: "Bridal Trousseau",
                            detail: "A specialized service for brides and their families, including private loom commissions and color customization.",
                            cta: "Explore Service"
                        },
                        {
                            title: "Private In-Store",
                            detail: "After-hours access to our Flagship Boutique with a dedicated stylist and textile historian.",
                            cta: "Schedule Visit"
                        }
                    ].map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-12 border border-gold/10 bg-white shadow-xl shadow-gold/[0.02] flex flex-col justify-between"
                        >
                            <div className="space-y-6">
                                <h3 className="text-3xl font-playfair text-maroon italic tracking-tighter">{service.title}</h3>
                                <p className="text-ink/60 text-sm font-inter leading-relaxed">{service.detail}</p>
                            </div>
                            <a
                                href={`https://wa.me/919380388788?text=Hello%20RS%20Handlooms,%20I%20would%20like%20to%20inquire%20about%20the%20${encodeURIComponent(service.title)}%20service.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-12 text-gold font-poppins text-[10px] uppercase font-bold tracking-[0.3em] flex items-center gap-2 group"
                            >
                                {service.cta}
                                <span className="w-8 h-[1px] bg-gold/30 group-hover:w-12 transition-all duration-300" />
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Material Knowledge Section */}
                <div className="space-y-16">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="h-[1px] w-12 bg-gold/30" />
                        <h2 className="text-4xl md:text-6xl font-playfair text-ink leading-tight">
                            The Material <span className="italic">Archive</span>
                        </h2>
                        <p className="text-ink/60 font-inter max-w-2xl mx-auto editorial-spacing">
                            Understanding the anatomy of a handwoven masterpiece. From the grade of silk to the purity of Zari.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="space-y-12">
                            {[
                                { title: "Silk Classification", desc: "We exclusively use Grade-A Mulberry and Tussar silk, known for their protein-rich fibers and natural luster that deepens over decades." },
                                { title: "Zari Purity", desc: "Our 'Sona Rupa' Zari features 24-carat gold and silver dipped threads, ensuring the sparkle remains eternal without tarnishing." }
                            ].map((info, idx) => (
                                <div key={idx} className="space-y-4 border-b border-gold/10 pb-8">
                                    <h4 className="text-2xl font-playfair font-bold text-maroon italic">{info.title}</h4>
                                    <p className="text-ink/60 font-inter leading-relaxed">{info.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-maroon p-1 relative overflow-hidden group">
                            <img src="/images/hero-saree.jpg" alt="Textile Macro Detail" className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 transition-all duration-1000" />
                            <div className="absolute inset-0 border border-gold/20 m-6" />
                        </div>
                    </div>
                </div>

                {/* Institutional & Corporate Gifting */}
                <div className="py-24 bg-pearl border-y border-gold/10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="relative order-2 lg:order-1">
                            <div className="aspect-square bg-white border border-gold/20 p-8 shadow-2xl relative z-10">
                                <img src="/images/silk-saree-2.jpg" alt="Institutional Gifting" className="w-full h-full object-cover opacity-90" />
                            </div>
                            <div className="absolute -top-10 -left-10 w-64 h-64 bg-maroon/5 rounded-full blur-3xl" />
                        </div>
                        <div className="space-y-10 order-1 lg:order-2">
                            <div className="space-y-4 text-center lg:text-left">
                                <span className="text-gold font-poppins text-[10px] tracking-[0.3em] uppercase font-bold">Volume & Prestige</span>
                                <h2 className="text-4xl md:text-6xl font-playfair text-ink leading-tight">Institutional <br /><span className="italic">Partnerships</span></h2>
                            </div>
                            <p className="text-ink/60 font-inter leading-relaxed editorial-spacing text-center lg:text-left">
                                For corporate entities and luxury institutions, RS Handlooms offers a specialized gifting concierge. We create custom-commissioned weaves for dignitaries, corporate anniversaries, and high-level hospitality events. Each gift is accompanied by a certified provenance report and artisan narrative.
                            </p>
                            <div className="grid grid-cols-2 gap-8 text-center lg:text-left">
                                <div className="space-y-2">
                                    <h5 className="text-maroon font-playfair text-xl italic">Custom Motifs</h5>
                                    <p className="text-[10px] text-ink/40 uppercase tracking-widest">Logo & Crest Weaving</p>
                                </div>
                                <div className="space-y-2">
                                    <h5 className="text-maroon font-playfair text-xl italic">Certified Origin</h5>
                                    <p className="text-[10px] text-ink/40 uppercase tracking-widest">A-Grade Silk Quality</p>
                                </div>
                            </div>
                            <a
                                href="https://wa.me/919380388788?text=Hello%20RS%20Handlooms,%20I%20am%20interested%20in%20discussing%20an%20Institutional%20Partnership%20or%20Corporate%20Gifting%20commission."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-8 text-maroon font-playfair font-bold uppercase text-[10px] tracking-[0.3em] border-b border-maroon/20 pb-2 hover:border-maroon transition-all"
                            >
                                Initiate Commission via WhatsApp
                            </a>
                        </div>
                    </div>
                </div>



                {/* Workflow Section */}
                <div className="bg-maroon py-24 px-12 border border-gold/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <h2 className="text-[12rem] font-playfair font-bold text-gold italic leading-none">Experience</h2>
                    </div>

                    <div className="max-w-4xl space-y-16 relative z-10">
                        <div className="space-y-4">
                            <span className="text-gold/60 font-poppins text-[10px] tracking-[0.3em] uppercase font-bold text-center block">The Process</span>
                            <h2 className="text-5xl font-playfair text-pearl text-center">Bespoke <span className="italic">Journey</span></h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                            {[
                                { step: "01", title: "Discovery", desc: "Share your preferences and the nature of the occasion." },
                                { step: "02", title: "Curated Box", desc: "A curated selection based on your profile is prepared." },
                                { step: "03", title: "Private Draping", desc: "A guided session to finalize your masterpiece." }
                            ].map((item, idx) => (
                                <div key={idx} className="space-y-4">
                                    <span className="text-gold font-playfair text-3xl italic">{item.step}</span>
                                    <h4 className="text-pearl font-bold uppercase text-[12px] tracking-widest">{item.title}</h4>
                                    <p className="text-pearl/40 text-xs font-inter leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BespokePage;
