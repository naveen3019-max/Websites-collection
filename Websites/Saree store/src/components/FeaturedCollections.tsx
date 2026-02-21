import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductDetails from './ProductDetails';

const FeaturedCollections = () => {
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProductClick = (product: any) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const collections = [
        {
            id: 1,
            title: 'Timeless Banarasi',
            price: '₹24,999',
            image: '/images/silk-saree-1.jpg',
            tag: 'Heritage',
            description: 'Handwoven pure silk featuring intricate gold zari work and traditional motifs.'
        },
        {
            id: 2,
            title: 'Royal Kanchipuram',
            price: '₹32,000',
            image: '/images/silk-saree-2.jpg',
            tag: 'Royal',
            description: 'The "Queen of Silks" with contrasting borders and authentic temple weave patterns.'
        },
        {
            id: 3,
            title: 'Handloom Prints',
            price: '₹8,499',
            image: '/images/printed-saree-1.jpg',
            tag: 'Artisanal',
            description: 'Breathable hand-block prints on premium cotton-silk blends for everyday elegance.'
        },
        {
            id: 4,
            title: 'Multicolor Edit',
            price: '₹14,500',
            image: '/images/printed-saree-2.jpg',
            tag: 'Designer',
            description: 'A vibrant symphony of contemporary colors in a hand-crafted designer print.'
        },
        {
            id: 5,
            title: 'Butterfly Silk Haute',
            price: '₹28,500',
            image: '/images/butterfly-silk.jpg',
            tag: 'Exclusive',
            description: 'Exquisite silk featuring hand-applied butterfly motifs on a deep plum canvas.'
        },
        {
            id: 6,
            title: 'Fuschia Elegance',
            price: '₹26,000',
            image: '/images/pink-silk-saree.jpg',
            tag: 'New Entry',
            description: 'A striking fuschia silk drape with a prestigious dark green border and gold highlights.'
        },
        {
            id: 7,
            title: 'Maroon Floral Story',
            price: '₹12,499',
            image: '/images/maroon-floral-saree.jpg',
            tag: 'Artisanal',
            description: 'Graceful floral narratives hand-printed on rich maroon silk-crepe fabric.'
        },
        {
            id: 8,
            title: 'Midnight Azure Silk',
            price: '₹34,000',
            image: '/images/purple-silk-saree.jpg',
            tag: 'Royal',
            description: 'Prestigious purple silk paired with a vibrant azure blue pallu, featuring traditional zari artistry.'
        },
    ];

    return (
        <section id="collections" className="py-32 px-8 bg-pearl">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
                    <div className="max-w-2xl space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4"
                        >
                            <div className="h-[1px] w-12 bg-gold/30" />
                            <span className="text-gold font-poppins tracking-[0.4em] uppercase text-[10px] font-bold">
                                Curated Anthology
                            </span>
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-playfair text-ink leading-tight tracking-tighter">
                            Seasonal <span className="italic font-normal text-maroon">Edits</span>
                        </h2>
                        <p className="text-ink/60 font-inter text-lg editorial-spacing">
                            Explore our meticulously selected range of artisanal weaves. Each piece is a testament to India's diverse textile heritage.
                        </p>
                    </div>
                    <button className="text-ink font-bold tracking-[0.2em] uppercase text-[10px] flex items-center gap-3 group border-b border-gold/30 pb-2 self-start md:self-auto hover:border-gold transition-colors">
                        View All Series
                        <ArrowRight size={14} className="opacity-50 group-hover:translate-x-1 transition-transform text-gold" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {collections.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                            onClick={() => handleProductClick(item)}
                        >
                            <div className="relative overflow-hidden aspect-[3/4] mb-8 bg-maroon border border-gold/10">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-80"
                                />
                                <div className="absolute top-6 right-6">
                                    <span className="bg-white text-gold px-4 py-2 text-[10px] uppercase font-bold tracking-widest border border-gold/10 shadow-lg">
                                        {item.tag}
                                    </span>
                                </div>
                                {/* Minimal Overlay */}
                                <div className="absolute inset-0 bg-maroon/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                                    <span className="bg-pearl text-maroon px-8 py-4 text-[10px] uppercase font-bold tracking-[0.2em] border border-gold/20">
                                        View Detail
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-playfair text-2xl text-ink group-hover:text-gold transition-colors duration-500 tracking-tight">
                                        {item.title}
                                    </h3>
                                    <span className="font-inter font-bold text-xs text-maroon">
                                        {item.price}
                                    </span>
                                </div>
                                <p className="text-ink/40 text-[10px] font-inter line-clamp-1 italic tracking-wide">
                                    {item.description}
                                </p>
                                <div className="pt-4 flex items-center gap-4 border-t border-gold/10 mt-4">
                                    <button className="flex-1 bg-maroon text-pearl py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-maroon-light transition-all duration-500 border border-gold/20 shadow-lg shadow-maroon/5">
                                        Acquire
                                    </button>
                                    <button className="p-3 border border-gold/30 text-ink hover:bg-gold hover:text-pearl transition-all duration-500">
                                        <ShoppingBag size={14} className="opacity-50" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Section */}
                <div className="mt-24 pt-16 border-t border-gold/10">
                    <div className="flex flex-col items-center gap-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center space-y-4"
                        >
                            <span className="text-gold font-poppins tracking-[0.4em] uppercase text-[10px] font-bold">The Complete Edit</span>
                            <h3 className="text-4xl font-playfair text-ink italic">View All <span className="font-normal not-italic">in Series</span></h3>
                        </motion.div>

                        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
                            <Link
                                to="/collections"
                                className="flex-1 bg-maroon text-pearl py-6 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-maroon-light transition-all duration-500 border border-gold/20 text-center flex items-center justify-center gap-3 group"
                            >
                                Curated Anthology
                                <ArrowRight size={14} className="opacity-40 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/collections"
                                className="flex-1 bg-white text-maroon py-6 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-gold hover:text-maroon transition-all duration-500 border border-gold/20 text-center flex items-center justify-center gap-3 group shadow-xl shadow-gold/[0.05]"
                            >
                                Seasonal Edits
                                <ArrowRight size={14} className="opacity-40 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <ProductDetails
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
};

export default FeaturedCollections;
