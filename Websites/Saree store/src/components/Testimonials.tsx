import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonials = () => {
    const reviews = [
        {
            name: 'Priya Sharma',
            role: 'Bridal Client',
            content: 'The craftsmanship is unlike anything I’ve seen. My bridal Banarasi saree felt like an inheritance, not just a purchase. The champagne gold detailing is simply exquisite.',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
        },
        {
            name: 'Ananya Iyer',
            role: 'Textile Enthusiast',
            content: 'As someone who values authentic handloom, this boutique is a sanctuary. Their Kanchipuram edit is curated with such profound respect for the tradition.',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1974&auto=format&fit=crop'
        },
        {
            name: 'Sanjana Reddy',
            role: 'Modern Sophisticate',
            content: 'The minimal luxury aesthetic is what drew me in. Their modern chiffon collection is the perfect balance of heritage and contemporary high-fashion.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'
        },
        {
            name: 'Meera Kapur',
            role: 'Collectors Edition',
            content: 'Acquiring a piece from RS Handlooms is an education in art. The depth of knowledge their concierge provides about the weave origin is truly remarkable.',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1974&auto=format&fit=crop'
        },
        {
            name: 'Zoya Khan',
            role: 'Bespoke Client',
            content: 'Their customization service for my daughters wedding was seamless. They captured the exact shade of crimson we were looking for in pure Mulberry silk.',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1974&auto=format&fit=crop'
        },
        {
            name: 'Radhika Nair',
            role: 'Heritage Patron',
            content: 'The care guide and the passion for preservation is what sets RS Handlooms apart. They are not just selling sarees; they are protecting our culture.',
            image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1974&auto=format&fit=crop'
        }
    ];

    return (
        <section id="testimonials" className="py-32 px-8 bg-pearl overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center space-y-6 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4"
                    >
                        <div className="h-[1px] w-12 bg-gold/30" />
                        <span className="text-gold font-poppins tracking-[0.4em] uppercase text-[10px] font-bold">
                            Client Chronicles
                        </span>
                        <div className="h-[1px] w-12 bg-gold/30" />
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-playfair text-ink leading-tight tracking-tighter">
                        Testament to <span className="italic font-normal text-maroon">Excellence</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group p-12 bg-white border border-gold/10 hover:border-gold/30 transition-all duration-700 flex flex-col items-center text-center shadow-lg shadow-maroon/[0.02]"
                        >
                            <div className="relative mb-10 w-24 h-24">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                />
                                <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-maroon flex items-center justify-center text-pearl border border-gold/20 shadow-xl">
                                    <Quote size={16} className="text-gold" />
                                </div>
                            </div>
                            <p className="text-ink/60 font-inter italic leading-relaxed mb-10 text-sm tracking-wide">
                                "{review.content}"
                            </p>
                            <div className="space-y-2">
                                <h4 className="font-playfair text-xl font-bold tracking-tight text-ink">{review.name}</h4>
                                <p className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold font-poppins">{review.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
