import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent("Namaste! I would like to order from your Indian outlet.")}`;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-primary rounded-full text-white group-hover:bg-[#A07048] transition-colors">
                        <Coffee size={24} />
                    </div>
                    <span className={`text-2xl font-serif font-bold ${isScrolled ? 'text-dark' : 'text-white'}`}>
                        Cafe Aura
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`font-medium transition-colors hover:text-primary ${location.pathname === link.path
                                ? 'text-primary'
                                : isScrolled
                                    ? 'text-dark'
                                    : 'text-white'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm">Order Now</Button>
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`md:hidden p-2 ${isScrolled ? 'text-dark' : 'text-white'}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-lg font-medium py-2 border-b border-gray-50 ${location.pathname === link.path ? 'text-primary' : 'text-dark'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                <Button className="w-full mt-2">Order Now</Button>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
