import React from 'react';

const words = ["Specialty Coffee", "Artisan Bakes", "Curated Vibes", "Modern Desi", "Freshly Brewed", "Indira Nagar", "Bengaluru", "Cafe Aura"];

const TrendingMarquee: React.FC = () => {
    return (
        <div className="bg-primary py-6 overflow-hidden flex whitespace-nowrap border-y border-white/10">
            <div className="flex animate-marquee">
                {words.map((word, i) => (
                    <span key={i} className="text-white text-3xl md:text-5xl font-serif font-bold mx-8 opacity-80 uppercase tracking-tighter">
                        {word} <span className="text-accent ml-8">•</span>
                    </span>
                ))}
            </div>
            <div className="flex animate-marquee" aria-hidden="true">
                {words.map((word, i) => (
                    <span key={i + words.length} className="text-white text-3xl md:text-5xl font-serif font-bold mx-8 opacity-80 uppercase tracking-tighter">
                        {word} <span className="text-accent ml-8">•</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TrendingMarquee;
