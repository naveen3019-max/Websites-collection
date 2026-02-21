import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';

interface ProductDetailsProps {
    product: {
        id: number;
        title: string;
        image: string;
        price: string;
        tag: string;
        description?: string;
    } | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProductDetails = ({ product, isOpen, onClose }: ProductDetailsProps) => {
    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
                    {/* Editorial Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-maroon/95 backdrop-blur-3xl"
                    />

                    {/* Modal Content - High Fashion Focus */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 40 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-6xl max-h-[90vh] bg-pearl overflow-hidden flex flex-col md:flex-row border border-gold/20"
                    >
                        {/* Close Button - Minimal */}
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 z-20 p-4 bg-maroon text-pearl hover:text-gold transition-colors border border-gold/20"
                        >
                            <X size={24} />
                        </button>

                        {/* Product Image Section */}
                        <div className="w-full md:w-1/2 relative bg-maroon overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-[2s] scale-105 hover:scale-110 opacity-80"
                            />
                            {/* Image Details Badge */}
                            <div className="absolute bottom-10 left-10 p-8 bg-pearl/90 backdrop-blur-md border border-gold/20 max-w-xs hidden md:block">
                                <p className="text-gold font-poppins font-bold text-[10px] tracking-[0.3em] uppercase mb-2">Authentic Weaver Identity</p>
                                <p className="text-maroon font-playfair text-xl font-bold tracking-tight italic">Handloom Certified Piece</p>
                            </div>
                        </div>

                        {/* Content Section - Editorial Layout */}
                        <div className="w-full md:w-1/2 p-12 md:p-20 overflow-y-auto bg-pearl flex flex-col justify-center">
                            <div className="space-y-12">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-[1px] w-12 bg-gold/30" />
                                        <span className="text-gold font-poppins tracking-[0.4em] uppercase text-[10px] font-bold">
                                            {product.tag}
                                        </span>
                                    </div>
                                    <h2 className="text-5xl md:text-6xl font-playfair text-ink leading-[0.9] tracking-tighter">
                                        {product.title}
                                    </h2>
                                    <p className="text-3xl font-playfair italic text-maroon tracking-tight">
                                        {product.price}
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    <p className="text-ink/60 font-inter text-lg leading-relaxed editorial-spacing">
                                        {product?.description || 'A timeless representation of Indian weaving excellence. Handcrafted with meticulous attention to detail and traditional artistry.'}
                                    </p>

                                    <div className="grid grid-cols-2 gap-10">
                                        <div className="space-y-2">
                                            <p className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold">Fabric</p>
                                            <p className="text-ink font-playfair font-bold text-lg italic tracking-tight">Pure Mulberry Silk</p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold">Technique</p>
                                            <p className="text-ink font-playfair font-bold text-lg italic tracking-tight">Kadhwa Hand-weave</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-10 border-t border-gold/20">
                                    <a
                                        href={`https://wa.me/919380388788?text=${encodeURIComponent(
                                            `Hello RS Handlooms, I am interested in acquiring this piece:\n\n*${product.title}*\nPrice: ${product.price}\n\nReference Image: ${window.location.origin}${product.image}`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-maroon text-pearl py-6 font-bold tracking-[0.3em] uppercase text-[10px] hover:bg-maroon-light transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 group border border-gold/20"
                                    >
                                        Acquire via WhatsApp
                                        <MessageCircle size={18} className="text-gold group-hover:scale-110 transition-transform" />
                                    </a>
                                    <button className="w-full border border-gold/30 text-ink py-6 font-bold tracking-[0.3em] uppercase text-[10px] hover:bg-maroon hover:text-pearl hover:border-maroon transition-all duration-500">
                                        Request Private Viewing
                                    </button>
                                </div>

                                <p className="text-ink/30 text-[10px] font-inter uppercase tracking-[.3em] leading-relaxed">
                                    *Each masterpiece is unique. Subtle variations in weave are a testament to the hand-made heritage of the piece.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProductDetails;
