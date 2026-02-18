import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand Info */}
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-primary mb-4">Cafe Aura</h3>
                        <p className="text-gray-400 mb-6">
                            Experience the taste of perfection. Bringing the finest blends and global flavors to the heart of India with love.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-serif font-bold mb-6">Explore</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="/menu" className="text-gray-400 hover:text-primary transition-colors">Indian Menu</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">Our Story</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-serif font-bold mb-6">Get in Touch</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <MapPin className="shrink-0 text-primary" size={20} />
                                <span>45, MG Road, Indira Nagar, Bengaluru, KA 560038</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Phone className="shrink-0 text-primary" size={20} />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Mail className="shrink-0 text-primary" size={20} />
                                <span>hello.india@cafeaura.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h4 className="text-xl font-serif font-bold mb-6">Opening Hours</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex justify-between">
                                <span>Mon - Fri</span>
                                <span>8:00 AM - 10:00 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Saturday</span>
                                <span>9:00 AM - 11:30 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sunday</span>
                                <span>9:00 AM - 11:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Cafe Aura India. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
