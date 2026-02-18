import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';

const CTASection: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
                }}
            >
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center text-white">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-serif font-bold mb-6"
                >
                    Craving Something Delicious?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
                >
                    Order now and enjoy the premium taste of Cafe Aura delivered straight to your doorstep or ready for pickup.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <a href={`https://wa.me/919876543210?text=${encodeURIComponent("Namaste! I would like to order from your Indian outlet.")}`} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="bg-accent text-dark hover:bg-white">
                            Order on WhatsApp
                        </Button>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
