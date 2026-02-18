import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { ShoppingCart } from 'lucide-react';

interface PremiumMenuCardProps {
    name: string;
    description: string;
    price: string;
    image: string;
    category: string;
}

const PremiumMenuCard: React.FC<PremiumMenuCardProps> = ({ name, description, price, image, category }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative bg-white rounded-[2.5rem] p-4 h-full flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_rgba(139,94,60,0.15)]"
        >
            {/* Image Container */}
            <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Floating Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-primary text-xs font-bold tracking-widest uppercase shadow-sm">
                    {category}
                </div>

                {/* Quick Add Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <a
                        href={`https://wa.me/919876543210?text=${encodeURIComponent(`Namaste! I would like to order ${name} from your Indian outlet.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button className="rounded-full w-14 h-14 p-0 flex items-center justify-center bg-white text-primary hover:bg-primary hover:text-white border-none shadow-xl animate-glow">
                            <ShoppingCart size={24} />
                        </Button>
                    </a>
                </div>
            </div>

            {/* Content Container */}
            <div className="px-4 pb-4 flex flex-col flex-grow text-center">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="text-2xl font-serif font-bold text-dark group-hover:text-primary transition-colors duration-300">{name}</h4>
                    <span className="text-xl font-bold text-primary">{price}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                    {description}
                </p>
                <div className="w-full h-px bg-gray-100 mb-6" />
                <a
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(`Namaste! I would like to order ${name} from your Indian outlet.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto"
                >
                    <Button variant="outline" className="w-full border-gray-200 text-dark hover:border-primary hover:text-primary rounded-xl transition-all duration-300 group-hover:bg-primary/5 group-hover:animate-glow hover:shadow-[0_0_20px_rgba(195,142,99,0.4)]">
                        Order Desi Special
                    </Button>
                </a>
            </div>
        </motion.div>
    );
};

export default PremiumMenuCard;
