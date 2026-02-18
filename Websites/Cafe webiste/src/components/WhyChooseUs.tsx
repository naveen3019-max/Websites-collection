import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Award, Clock, Leaf } from 'lucide-react';

const features = [
    {
        icon: <Coffee size={40} />,
        title: "Premium Quality",
        description: "We source the finest coffee beans from around the world for an unmatched taste."
    },
    {
        icon: <Leaf size={40} />,
        title: "Fresh Ingredients",
        description: "Our food is prepared daily using locally sourced, organic ingredients."
    },
    {
        icon: <Clock size={40} />,
        title: "Fast Service",
        description: "Experience quick and friendly service without compromising on quality."
    },
    {
        icon: <Award size={40} />,
        title: "Award Winning",
        description: "Recognized for our excellence in coffee brewing and culinary arts."
    }
];

const WhyChooseUs: React.FC = () => {
    return (
        <section className="py-20 bg-dark text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-serif italic text-xl mb-2"
                    >
                        Our Promise
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl font-bold"
                    >
                        Why Choose Cafe Aura?
                    </motion.h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/10 transition-colors border border-white/10"
                        >
                            <div className="text-primary mb-6 flex justify-center">
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-serif font-bold mb-4">{feature.title}</h4>
                            <p className="text-gray-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
