
import { motion } from 'framer-motion';

const CollectionsPage = () => {
    const collections = [
        {
            id: 1,
            title: 'Timeless Banarasi',
            price: '₹24,999',
            image: '/src/assets/silk-saree-1.jpg',
            tag: 'Heritage',
            description: 'Handwoven pure silk featuring intricate gold zari work and traditional motifs.'
        },
        {
            id: 2,
            title: 'Royal Kanchipuram',
            price: '₹32,000',
            image: '/src/assets/silk-saree-2.jpg',
            tag: 'Royal',
            description: 'The "Queen of Silks" with contrasting borders and authentic temple weave patterns.'
        },
        {
            id: 3,
            title: 'Handloom Prints',
            price: '₹8,499',
            image: '/src/assets/printed-saree-1.jpg',
            tag: 'Artisanal',
            description: 'Breathable hand-block prints on premium cotton-silk blends for everyday elegance.'
        },
        {
            id: 4,
            title: 'Multicolor Edit',
            price: '₹14,500',
            image: '/src/assets/printed-saree-2.jpg',
            tag: 'Designer',
            description: 'A vibrant symphony of contemporary colors in a hand-crafted designer print.'
        },
        {
            id: 5,
            title: 'Butterfly Silk Haute',
            price: '₹28,500',
            image: '/src/assets/butterfly-silk.jpg',
            tag: 'Exclusive',
            description: 'Exquisite silk featuring hand-applied butterfly motifs on a deep plum canvas.'
        },
        {
            id: 6,
            title: 'Fuschia Elegance',
            price: '₹26,000',
            image: '/src/assets/pink-silk-saree.jpg',
            tag: 'New Entry',
            description: 'A striking fuschia silk drape with a prestigious dark green border and gold highlights.'
        },
        {
            id: 7,
            title: 'Maroon Floral Story',
            price: '₹12,499',
            image: '/src/assets/maroon-floral-saree.jpg',
            tag: 'Artisanal',
            description: 'Graceful floral narratives hand-printed on rich maroon silk-crepe fabric.'
        },
        {
            id: 8,
            title: 'Midnight Azure Silk',
            price: '₹34,000',
            image: '/src/assets/purple-silk-saree.jpg',
            tag: 'Royal',
            description: 'Prestigious purple silk paired with a vibrant azure blue pallu, featuring traditional zari artistry.'
        },
        {
            id: 9,
            title: 'Chanderi Gold Leaf',
            price: '₹12,499',
            image: '/src/assets/silk-saree-1.jpg',
            tag: 'Artisanal',
            description: 'Etheral Chanderi silk-cotton blend with delicate gold leaf butis and a sheer finish.'
        },
        {
            id: 10,
            title: 'Gadwal Heritage',
            price: '₹18,999',
            image: '/src/assets/silk-saree-2.jpg',
            tag: 'Mandated',
            description: 'Original Gadwal weave with a contrasting silk border and a fine cotton body.'
        },
        {
            id: 11,
            title: 'Maheshwari Elegance',
            price: '₹9,800',
            image: '/src/assets/printed-saree-1.jpg',
            tag: 'Artisanal',
            description: 'Traditional Maheshwari patterns featuring reversible borders and signature geometric motifs.'
        },
        {
            id: 12,
            title: 'Sambalpuri Ikat',
            price: '₹15,500',
            image: '/src/assets/printed-saree-2.jpg',
            tag: 'Ikat Edit',
            description: 'Authentic tie-dye Ikat from Odisha, showcasing Shankha and Chakra traditional patterns.'
        },
        {
            id: 13,
            title: 'Paithani Masterpiece',
            price: '₹45,000',
            image: '/src/assets/butterfly-silk.jpg',
            tag: 'Museum Grade',
            description: 'Hand-woven Paithani silk featuring a kaleidoscopic peacock pallu and oblique square borders.'
        },
        {
            id: 14,
            title: 'Patan Patola Story',
            price: '₹85,000',
            image: '/src/assets/pink-silk-saree.jpg',
            tag: 'Heirloom',
            description: 'Double Ikat masterpiece from Gujarat, where the design is identical on both sides.'
        },
        {
            id: 15,
            title: 'Kalamkari Narrative',
            price: '₹11,200',
            image: '/src/assets/maroon-floral-saree.jpg',
            tag: 'Hand-painted',
            description: 'Pen-kalamkari work on natural-dyed cotton, depicting floral scrolls and mythical figures.'
        },
        {
            id: 16,
            title: 'Jamdani Ethereal',
            price: '₹16,700',
            image: '/src/assets/purple-silk-saree.jpg',
            tag: 'Artisanal',
            description: 'Fine muslin Jamdani with "discontinuous weft" floral motifs that seem to float on the fabric.'
        },
    ];

    return (
        <div className="pt-32 pb-20 px-8 bg-pearl min-h-screen">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="space-y-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-4"
                    >
                        <div className="h-[1px] w-12 bg-gold/30" />
                        <span className="text-gold font-poppins tracking-[0.4em] uppercase text-[10px] font-bold">
                            The Anthology
                        </span>
                        <div className="h-[1px] w-12 bg-gold/30" />
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-playfair text-ink leading-tight tracking-tighter">
                        The Full <span className="italic font-normal text-maroon">Collection</span>
                    </h1>
                    <p className="text-lg text-ink/60 font-inter max-w-2xl mx-auto leading-relaxed editorial-spacing">
                        Explore our complete curated selection of handwoven masterpieces, from the spiritual looms of Banaras to the royal courts of Kanchipuram.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {collections.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            viewport={{ once: true }}
                            className="space-y-6 group cursor-pointer"
                        >
                            <div className="aspect-[3/4] overflow-hidden bg-maroon border border-gold/10 group-hover:border-gold transition-all duration-700 relative">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100" />
                                <div className="absolute top-4 right-4 bg-maroon/90 text-[8px] text-pearl font-bold tracking-widest px-3 py-1 uppercase border border-gold/20">
                                    {item.tag}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-xl font-playfair font-bold text-ink group-hover:text-maroon transition-colors">{item.title}</h4>
                                    <span className="text-gold font-inter font-bold text-xs">{item.price}</span>
                                </div>
                                <p className="text-ink/40 text-[10px] font-inter uppercase tracking-[0.2em]">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollectionsPage;
