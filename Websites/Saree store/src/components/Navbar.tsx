import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Collections', href: '/collections' },
        { name: 'Heritage', href: '/heritage' },
        { name: 'Bespoke', href: '/bespoke' },
        { name: 'Journal', href: '/journal' },
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-8 py-6 border-b border-transparent',
                (isScrolled || isOpen) ? 'bg-white shadow-sm py-4 border-gold/20' : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between relative z-[110]">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-16 h-12 bg-maroon flex items-center justify-center text-pearl font-playfair bold text-2xl tracking-tighter border border-gold/30">
                        RS
                    </div>
                    <div className="flex flex-col">
                        <span className="font-playfair font-bold text-2xl tracking-[0.1em] text-ink lg:block hidden leading-none uppercase">
                            RS <span className="font-normal italic">Handlooms</span>
                        </span>
                        <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-poppins lg:block hidden">Museum of Textiles</span>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={cn(
                                "font-inter transition-colors duration-300 font-semibold tracking-[0.1em] uppercase text-[10px]",
                                location.pathname === link.href ? "text-gold" : "text-ink/60 hover:text-gold"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/bespoke" className="bg-maroon text-pearl px-8 py-3 font-bold tracking-[.2em] uppercase text-[10px] hover:bg-maroon-light transition-all duration-500 flex items-center gap-3 border border-gold/20 shadow-lg shadow-maroon/10">
                        <Phone size={14} className="opacity-50 text-gold" />
                        Concierge
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-ink p-2">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className={cn(
                    "md:hidden fixed inset-0 bg-white z-[100] flex flex-col items-center pt-32 gap-10 animate-fade-in",
                    isScrolled ? "top-[73px]" : "top-[89px]"
                )}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "text-4xl font-playfair transition-colors italic tracking-tighter",
                                location.pathname === link.href ? "text-gold" : "text-ink hover:text-gold"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/bespoke" onClick={() => setIsOpen(false)} className="bg-maroon text-pearl px-12 py-5 font-bold tracking-[0.2em] uppercase text-xs mt-8 flex items-center gap-3 border border-gold/20">
                        <Phone size={18} className="opacity-50 text-gold" />
                        Contact Boutique
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
