import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import { ChevronRight } from 'lucide-react';

const HeroSection: React.FC = () => {
    return (
        <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 text-center text-white">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-block text-accent font-serif text-xl mb-4 italic"
                >
                    Welcome to Cafe Aura
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight"
                >
                    Experience the <br />
                    <span className="text-primary">Taste of Perfection</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
                >
                    Indulge in our premium coffee blends and artisanal dishes, crafted to awaken your senses and create unforgettable moments.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link to="/menu">
                        <Button size="lg" className="gap-2">
                            View Menu <ChevronRight size={20} />
                        </Button>
                    </Link>
                    <a href={`https://wa.me/919876543210?text=${encodeURIComponent("Namaste! I would like to order from your Indian outlet.")}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-dark">
                            Order on WhatsApp
                        </Button>
                    </a>
                </motion.div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent mx-auto"></div>
            </motion.div>
        </div>
    );
};

export default HeroSection;
