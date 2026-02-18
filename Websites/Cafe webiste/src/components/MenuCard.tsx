import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';

interface MenuCardProps {
    name: string;
    description: string;
    price: string;
    image: string;
    category: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ name, description, price, image, category }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col"
        >
            <div className="aspect-[4/3] overflow-hidden relative shrink-0">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-primary font-bold shadow-sm">
                    {price}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="text-sm text-primary font-medium mb-2">{category}</div>
                <h4 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">{name}</h4>
                <p className="text-gray-500 mb-6 flex-grow">{description}</p>
                <a
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(`Namaste! I would like to order ${name} from your Indian outlet.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto"
                >
                    <Button className="w-full group-hover:animate-glow hover:shadow-[0_0_20px_rgba(195,142,99,0.4)] transition-all duration-300">Order Now</Button>
                </a>
            </div>
        </motion.div>
    );
};

export default MenuCard;
