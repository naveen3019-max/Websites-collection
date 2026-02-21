import { Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-maroon text-pearl pt-24 pb-12 px-8 border-t border-gold/20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                {/* Brand Section */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-3xl font-playfair tracking-tighter">RS <span className="italic">Handlooms</span></h3>
                        <p className="text-pearl/40 text-[10px] uppercase font-bold tracking-[0.3em] font-inter">Museum of Textiles</p>
                    </div>
                    <p className="text-pearl/60 text-sm font-inter leading-relaxed max-w-xs editorial-spacing">
                        Curating the finest handwoven legacies from India's most prestigious looms. Every drape tells a story of heritage and artisanal mastery.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gold/40 hover:text-gold transition-all duration-300 transform hover:-translate-y-1">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="text-gold/40 hover:text-gold transition-all duration-300 transform hover:-translate-y-1">
                            <Facebook size={20} />
                        </a>
                        <a href="#" className="text-gold/40 hover:text-gold transition-all duration-300 transform hover:-translate-y-1">
                            <Twitter size={20} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-playfair text-[10px] uppercase tracking-[0.3em] text-gold mb-8 font-bold">Maison</h4>
                    <ul className="space-y-4 font-inter text-sm text-pearl/40">
                        <li><Link to="/" className="hover:text-gold transition-colors">The Boutique</Link></li>
                        <li><Link to="/collections" className="hover:text-gold transition-colors">Collections</Link></li>
                        <li><Link to="/heritage" className="hover:text-gold transition-colors">Heritage</Link></li>
                        <li><Link to="/journal" className="hover:text-gold transition-colors">Journal</Link></li>
                        <li><Link to="/bespoke" className="hover:text-gold transition-colors">Concierge</Link></li>
                    </ul>
                </div>

                {/* Collections */}
                <div>
                    <h4 className="font-playfair text-[10px] uppercase tracking-[0.3em] text-gold mb-8 font-bold">Collections</h4>
                    <ul className="space-y-4 font-inter text-sm text-pearl/40">
                        <li><Link to="/collections" className="hover:text-gold transition-colors">Banarasi Silk</Link></li>
                        <li><Link to="/collections" className="hover:text-gold transition-colors">Heritage Bridal</Link></li>
                        <li><Link to="/collections" className="hover:text-gold transition-colors">Chiffon Edits</Link></li>
                        <li><Link to="/collections" className="hover:text-gold transition-colors">Handloom Cotton</Link></li>
                        <li><Link to="/collections" className="hover:text-gold transition-colors">Masterpiece Series</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="space-y-8">
                    <h4 className="font-playfair text-[10px] uppercase tracking-[0.3em] text-gold mb-8 font-bold">Inquiry</h4>
                    <p className="text-pearl/50 text-sm font-inter">Receive our seasonal lookbooks and private event invitations.</p>
                    <div className="relative group">
                        <input
                            type="email"
                            placeholder="Email Correspondence"
                            className="w-full bg-transparent border-b border-gold/20 py-4 font-inter text-sm focus:border-gold outline-none transition-colors text-pearl"
                        />
                        <button className="absolute right-0 bottom-4 text-gold/40 hover:text-gold transition-colors">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-12 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-6 uppercase tracking-widest text-[10px] font-inter">
                <p className="text-pearl/20 text-center md:text-left">
                    © 2026 RS Handlooms. All Rights Reserved.
                </p>
                <div className="flex gap-8">
                    <Link to="/" className="text-pearl/20 hover:text-gold transition-colors">Privacy Policy</Link>
                    <Link to="/" className="text-pearl/20 hover:text-gold transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
