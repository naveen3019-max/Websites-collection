import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle } from 'lucide-react';

const feeds = [
    { url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80", likes: "1.2k" },
    { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80", likes: "980" },
    { url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80", likes: "2.4k" },
    { url: "https://images.unsplash.com/photo-1559925373-2f82136b674b?auto=format&fit=crop&w=400&q=80", likes: "1.5k" },
    { url: "https://images.unsplash.com/photo-1525610553991-2bede1a233e9?auto=format&fit=crop&w=400&q=80", likes: "1.1k" },
    { url: "https://images.unsplash.com/photo-1517717449034-3daa5f452ce5?auto=format&fit=crop&w=400&q=80", likes: "3.2k" }
];

const SocialFeed: React.FC = () => {
    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        className="w-16 h-16 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl"
                    >
                        <Instagram size={32} />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4"
                    >
                        #CafeAuraVibe
                    </motion.h2>
                    <p className="text-gray-500">Join our community and share your moments with us.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    {feeds.map((feed, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="relative aspect-square group overflow-hidden bg-gray-200"
                        >
                            <img
                                src={feed.url}
                                alt={`Instagram feed ${index}`}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white font-medium">
                                <div className="flex items-center gap-1.5">
                                    <Heart size={20} fill="currentColor" /> {feed.likes}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MessageCircle size={20} fill="currentColor" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 border-2 border-dark px-10 py-4 rounded-full font-bold hover:bg-dark hover:text-white transition-all duration-300"
                    >
                        Follow @CafeAuraIndia
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default SocialFeed;
