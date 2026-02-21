
import { motion } from 'framer-motion';

const JournalPage = () => {
    const articles = [
        {
            id: 1,
            date: 'March 2026',
            title: 'The Art of the Antique Zari',
            category: 'Craftsmanship',
            excerpt: 'How our weavers restore gold-thread techniques from the 18th century for modern bridal heirlooms.',
            image: '/src/assets/silk-saree-1.jpg'
        },
        {
            id: 2,
            date: 'February 2026',
            title: 'Draping as Identity',
            category: 'Styling',
            excerpt: 'Exploring the intersection of tradition and personal expression through the five-yard drape.',
            image: '/src/assets/shopping-experience.jpg'
        },
        {
            id: 3,
            date: 'January 2026',
            title: 'Sustainable Silks',
            category: 'Heritage',
            excerpt: 'Our commitment to organic dyes and ethical weaving clusters in the heart of South India.',
            image: '/src/assets/store-interior.jpg'
        },
        {
            id: 4,
            date: 'December 2025',
            title: 'The Indigo Revival',
            category: 'Technique',
            excerpt: 'Rediscovering the deep Soul of Blue through ancient vat-dyeing processes in Rajasthan.',
            image: '/src/assets/silk-saree-2.jpg'
        },
        {
            id: 5,
            date: 'November 2025',
            title: 'Heirloom Preservation',
            category: 'Care',
            excerpt: 'A masterclass on maintaining the luster of pure Zari and silk for generations to come.',
            image: '/src/assets/maroon-floral-saree.jpg'
        },
        {
            id: 6,
            date: 'October 2025',
            title: 'Modern Draping Artistry',
            category: 'Styling',
            excerpt: 'Transitioning the traditional 6-yard drape into contemporary evening-wear silhouettes.',
            image: '/src/assets/butterfly-silk.jpg'
        }
    ];

    return (
        <div className="pt-32 pb-20 px-8 bg-pearl min-h-screen">
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="space-y-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-4"
                    >
                        <div className="h-[1px] w-12 bg-gold/30" />
                        <span className="text-gold font-poppins tracking-[0.4em] uppercase text-[10px] font-bold">
                            The Edit
                        </span>
                        <div className="h-[1px] w-12 bg-gold/30" />
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-playfair text-ink leading-tight tracking-tighter">
                        Boutique <span className="italic font-normal text-maroon">Journal</span>
                    </h1>
                    <p className="text-lg text-ink/60 font-inter max-w-2xl mx-auto leading-relaxed editorial-spacing">
                        Editorial insights into the world of heritage textiles, modern draping artistry, and the soul of Indian luxury.
                    </p>
                </div>

                {/* Featured Master Story */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center py-20 border-b border-gold/10">
                    <div className="relative">
                        <div className="aspect-[16/10] bg-maroon overflow-hidden border border-gold/20 shadow-2xl">
                            <img src="/src/assets/silk-saree-1.jpg" alt="Featured Narrative" className="w-full h-full object-cover opacity-90" />
                        </div>
                        <div className="absolute -bottom-8 -right-8 bg-pearl border border-gold/10 p-8 hidden xl:block shadow-2xl z-20">
                            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-2">March 2026 Issue</p>
                            <p className="text-2xl font-playfair text-maroon italic font-bold tracking-tighter leading-none">The Varanasi <br />Chronicle</p>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-gold font-poppins text-[10px] tracking-[0.3em] uppercase font-bold">Featured Narrative</span>
                            <h2 className="text-4xl md:text-5xl font-playfair text-ink leading-tight tracking-tighter">The Alchemy of Gold: <br /><span className="italic">Restoring 18th Century Zari</span></h2>
                        </div>
                        <div className="space-y-6 text-lg text-ink/70 font-inter leading-relaxed editorial-spacing">
                            <p>
                                In the quiet ateliers of RS Handlooms, a quiet revolution is taking place. We have begun a restoration project that aims to bring back the 'pure gold' weaving techniques of the 18th-century royal courts. Unlike modern machine-spun zari, these yarns are dipped in 24k gold multiple times by hand.
                            </p>
                            <p>
                                The process is grueling, requiring twice the precision and three times the strength of a standard weave. But the result is a textile that doesn't just shine—it radiates a warmth that only true gold can possess. "We are not just making clothes," says our lead weaver, "we are capturing sunlight in silk."
                            </p>
                        </div>
                        <button className="text-maroon font-playfair font-bold uppercase text-[10px] tracking-[0.3em] flex items-center gap-3 group">
                            Full Journal Entry
                            <div className="h-[1px] w-12 bg-maroon/30 group-hover:w-24 transition-all duration-700" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {articles.map((article, idx) => (
                        <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="space-y-8 group"
                        >
                            <div className="aspect-square bg-maroon overflow-hidden border border-gold/10 relative">
                                <img src={article.image} alt={article.title} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000 group-hover:opacity-100" />
                                <div className="absolute inset-0 bg-maroon/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-[10px] font-bold tracking-[0.2em] uppercase text-gold">
                                    <span>{article.category}</span>
                                    <span className="w-1 h-1 bg-gold rounded-full" />
                                    <span className="text-ink/30 italic">{article.date}</span>
                                </div>
                                <h3 className="text-3xl font-playfair text-ink leading-tight group-hover:text-maroon transition-colors">{article.title}</h3>
                                <p className="text-ink/60 text-sm font-inter leading-relaxed">{article.excerpt}</p>
                                <button className="pt-4 text-maroon font-playfair italic text-lg flex items-center gap-3 group/btn">
                                    Read Narrative
                                    <div className="h-[1px] w-8 bg-maroon/30 group-hover/btn:w-16 transition-all duration-500" />
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JournalPage;
