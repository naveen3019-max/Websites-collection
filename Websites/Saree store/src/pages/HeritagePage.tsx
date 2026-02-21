
import { motion } from 'framer-motion';

const HeritagePage = () => {
    return (
        <div className="pt-32 pb-20 px-8 bg-pearl min-h-screen">
            <div className="max-w-7xl mx-auto space-y-32">
                {/* Intro Section */}
                <div className="space-y-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-4"
                    >
                        <div className="h-[1px] w-12 bg-gold/30" />
                        <span className="text-gold font-poppins tracking-[0.4em] uppercase text-[10px] font-bold">
                            The Loom Story
                        </span>
                        <div className="h-[1px] w-12 bg-gold/30" />
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-playfair text-ink leading-tight tracking-tighter">
                        Museum of <span className="italic font-normal text-maroon">Textiles</span>
                    </h1>
                    <p className="text-lg text-ink/60 font-inter max-w-2xl mx-auto leading-relaxed editorial-spacing">
                        A sanctuary where every thread is a testament to India's weaving brilliance. Discover the heritage of the masters who bring silk to life.
                    </p>
                </div>

                {/* The Living Loom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="aspect-[4/5] bg-maroon relative group"
                    >
                        <img src="/src/assets/store-interior.jpg" alt="Traditional Loom" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 border-[20px] border-pearl/10 m-8" />
                    </motion.div>
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <span className="text-gold font-poppins text-[10px] tracking-[0.3em] uppercase font-bold">01. Our Roots</span>
                            <h2 className="text-5xl font-playfair text-ink leading-tight">The Living <br /><span className="italic font-normal">Loom</span></h2>
                        </div>
                        <p className="text-ink/70 font-inter editorial-spacing text-lg">
                            Behind every RS Handlooms creation lies a rhythm—the steady, rhythmic heartbeat of the handloom. We have spent three generations fostering relationships with weaving clusters that have remained unchanged for centuries.
                        </p>
                        <p className="text-ink/60 font-inter editorial-spacing">
                            Our journey began in the narrow lanes of Banaras, where we were captivated by the alchemy of silk and silver. Today, that curiosity has grown into a prestigious partnership with over 150 master weavers across India, ensuring that the 'Living Loom' continues to thrive in a world of mechanical replication.
                        </p>
                    </div>
                </div>

                {/* Mastery Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-10 order-2 lg:order-1">
                        <div className="space-y-4">
                            <span className="text-gold font-poppins text-[10px] tracking-[0.3em] uppercase font-bold">02. The Process</span>
                            <h2 className="text-5xl font-playfair text-ink leading-tight">Mastery of <br /><span className="italic font-normal">Threads</span></h2>
                        </div>
                        <div className="space-y-8">
                            {[
                                { title: "Zari Artistry", desc: "Using 24-carat gold and silver dipped threads to create patterns that never lose their luster." },
                                { title: "Dyeing Heritage", desc: "Eco-certified organic dyes that preserve the structural integrity of pure mulberry silk." },
                                { title: "The Weave Pulse", desc: "Each saree takes between 15 to 60 days to complete, depending on the complexity of the motif." }
                            ].map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="border-l border-gold/30 pl-8 space-y-2"
                                >
                                    <h4 className="text-xl font-playfair font-bold text-maroon uppercase tracking-tighter">{step.title}</h4>
                                    <p className="text-ink/50 text-sm font-inter">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="aspect-[3/4] bg-maroon order-1 lg:order-2"
                    >
                        <img src="/src/assets/shopping-experience.jpg" alt="Thread Mastery" className="w-full h-full object-cover opacity-80" />
                    </motion.div>
                </div>

                {/* Global Legacy Section */}
                <div className="py-24 bg-maroon text-pearl -mx-8 px-8 border-y border-gold/20">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <span className="text-gold font-poppins text-[10px] tracking-[0.3em] uppercase font-bold text-center lg:text-left block lg:inline">The Reach</span>
                                <h2 className="text-5xl font-playfair leading-tight text-center lg:text-left">A Global <br /><span className="italic">Heritage</span></h2>
                            </div>
                            <p className="text-pearl/60 font-inter leading-relaxed editorial-spacing text-center lg:text-left">
                                From the private galleries of London to the UNESCO heritage summits in Paris, RS Handlooms has traveled the world as an ambassador for Indian weaving. Our textiles have graced the halls of prestigious museums and the wardrobes of international dignitaries who value the soul of a handwoven piece.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-40 grayscale group">
                                {['UNESCO Showcase', 'Milan Craft Week', 'NY Metropolitan Art', 'Loom to Luxury 2024'].map((venue, i) => (
                                    <span key={i} className="text-[10px] font-bold tracking-widest uppercase border border-pearl/20 px-4 py-2">{venue}</span>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-[16/9] bg-white/5 border border-gold/10 overflow-hidden">
                            <img src="/src/assets/hero-saree.jpg" alt="Global Showcase" className="w-full h-full object-cover opacity-60" />
                            <div className="absolute inset-0 bg-maroon/20" />
                        </div>
                    </div>
                </div>

                {/* Weaving Clusters Map Section */}
                <div className="space-y-20">
                    <div className="text-center space-y-6">
                        <div className="h-[1px] w-12 bg-gold/30 mx-auto" />
                        <h2 className="text-4xl md:text-6xl font-playfair text-ink leading-tight">
                            The Weaving <span className="italic">Clusters</span>
                        </h2>
                        <p className="text-ink/60 font-inter max-w-2xl mx-auto">
                            A geographical journey through the looms that define our anthology. Each region contributes a unique soul to the silk.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { region: "Banaras", city: "Varanasi", specialty: "Kadhwa & Meenakari", desc: "The spiritual center of silk weaving, specializing in heavy gold brocades and floral motifs." },
                            { region: "Kanchipuram", city: "Tamil Nadu", specialty: "Triple-twisted Silk", desc: "Famous for heavy-weight silk and the contrasting 'Korvai' border joints." },
                            { region: "Patan", city: "Gujarat", specialty: "Double Ikat", desc: "Where the design is identical on both sides, a feat of mathematical precision on the loom." },
                            { region: "Pochampally", city: "Telangana", specialty: "Geometric Ikat", desc: "Characterized by bold geometric patterns that create a mesmerizing sense of movement." }
                        ].map((cluster, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-10 border border-gold/10 bg-white shadow-xl shadow-gold/[0.01] space-y-6 hover:border-gold/30 transition-all duration-500"
                            >
                                <div className="space-y-1">
                                    <p className="text-gold font-poppins text-[10px] font-bold uppercase tracking-widest">{cluster.city}</p>
                                    <h4 className="text-2xl font-playfair font-bold text-maroon italic">{cluster.region}</h4>
                                </div>
                                <p className="text-xs font-bold text-ink/40 uppercase tracking-widest border-b border-gold/10 pb-4">{cluster.specialty}</p>
                                <p className="text-ink/60 text-xs font-inter leading-relaxed">{cluster.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Closing Statement */}
                <div className="py-32 border-t border-gold/10 text-center space-y-10">
                    <h2 className="text-4xl md:text-6xl font-playfair italic text-maroon tracking-tighter max-w-4xl mx-auto">
                        "We do not inherit the loom from our ancestors; we borrow it from our children."
                    </h2>
                    <p className="text-gold font-poppins text-[10px] tracking-[0.4em] uppercase font-bold">The Sustainable Legacy</p>
                </div>
            </div>
        </div>
    );
};

export default HeritagePage;
