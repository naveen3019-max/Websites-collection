import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-32 px-8 bg-maroon text-pearl relative overflow-hidden">
            {/* Editorial Background Element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/[0.02] transform skew-x-12 hidden lg:block" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
                {/* Contact Information */}
                <div className="space-y-16">
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4"
                        >
                            <div className="h-[1px] w-12 bg-gold/40" />
                            <span className="text-gold font-poppins tracking-[0.4em] uppercase text-[10px] font-bold">
                                Maison Concierge
                            </span>
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-playfair leading-tight tracking-tighter">
                            Begin Your <br />
                            <span className="italic font-normal text-gold">Style Inquiry</span>
                        </h2>
                        <p className="text-pearl/60 text-lg font-inter editorial-spacing max-w-sm">
                            Our specialists are dedicated to assisting you with bespoke curations, fabric inquiries, and bridal styling consultations.
                        </p>
                    </div>

                    <div className="space-y-10">
                        {[
                            { icon: <MapPin size={24} />, title: 'The Flagship Boutique', detail: 'Plot No. 45-A, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033' },
                            { icon: <Phone size={24} />, title: 'Private Line', detail: '+91 91234 56789' },
                            { icon: <Mail size={24} />, title: 'Digital Correspondence', detail: 'concierge@rshandlooms.com' },
                            { icon: <Clock size={24} />, title: 'Boutique Hours', detail: 'Mon - Sun: 10:30 AM - 08:30 PM' },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-6 group cursor-pointer"
                            >
                                <div className="p-4 bg-pearl/5 border border-gold/10 group-hover:bg-gold group-hover:text-maroon transition-colors duration-500 opacity-60 group-hover:opacity-100 text-gold">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="font-playfair text-xl font-bold tracking-tight mb-1">{item.title}</h4>
                                    <p className="text-gold text-[10px] font-inter tracking-widest uppercase editorial-spacing">{item.detail}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-pearl/5 p-12 border border-gold/20 relative"
                >
                    <div className="space-y-8">
                        <h3 className="text-3xl font-playfair tracking-tight italic text-pearl">Request A Consultation</h3>
                        <form className="space-y-8">
                            <div className="space-y-8">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        className="w-full bg-transparent border-b border-gold/20 py-4 font-inter text-sm focus:border-gold outline-none transition-colors peer placeholder-transparent"
                                        placeholder="Full Name"
                                        id="name"
                                    />
                                    <label htmlFor="name" className="absolute left-0 top-0 text-[10px] uppercase font-bold tracking-[.3em] text-gold/40 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-gold peer-focus:text-[10px]">
                                        Your Name
                                    </label>
                                </div>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        className="w-full bg-transparent border-b border-gold/20 py-4 font-inter text-sm focus:border-gold outline-none transition-colors peer placeholder-transparent"
                                        placeholder="Email Address"
                                        id="email"
                                    />
                                    <label htmlFor="email" className="absolute left-0 top-0 text-[10px] uppercase font-bold tracking-[.3em] text-gold/40 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-gold peer-focus:text-[10px]">
                                        Email Address
                                    </label>
                                </div>
                                <div className="relative group">
                                    <select
                                        className="w-full bg-transparent border-b border-gold/20 py-4 font-inter text-sm focus:border-gold outline-none transition-colors text-pearl/40 focus:text-pearl"
                                    >
                                        <option className="bg-maroon" disabled selected>Select Service</option>
                                        <option className="bg-maroon" value="bridal">Bridal Styling</option>
                                        <option className="bg-maroon" value="bespoke">Bespoke Fabrication</option>
                                        <option className="bg-maroon" value="bulk">Institutional & Bulk Gifting</option>
                                        <option className="bg-maroon" value="viewing">Private Viewing</option>
                                    </select>
                                </div>
                                <div className="relative group">
                                    <textarea
                                        rows={4}
                                        className="w-full bg-transparent border-b border-gold/20 py-4 font-inter text-sm focus:border-gold outline-none transition-colors peer placeholder-transparent resize-none"
                                        placeholder="Inquiry Details"
                                        id="message"
                                    />
                                    <label htmlFor="message" className="absolute left-0 top-0 text-[10px] uppercase font-bold tracking-[.3em] text-gold/40 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-gold peer-focus:text-[10px]">
                                        Identify Your Requirements
                                    </label>
                                </div>
                            </div>

                            <div className="p-6 bg-gold/5 border border-gold/10 space-y-3">
                                <p className="text-[10px] text-gold font-bold tracking-widest uppercase italic">Institutional Inquiry</p>
                                <p className="text-[10px] text-pearl/40 font-inter leading-relaxed">For corporate gifting, weaver commissions, or bulk event orders, please specify the quantity and desired delivery timeline.</p>
                            </div>

                            <button className="w-full bg-white text-maroon py-6 text-[10px] font-bold tracking-[.4em] uppercase hover:bg-gold hover:text-maroon transition-all duration-500 flex items-center justify-center gap-4 group">
                                Establish Connection
                                <Send size={14} className="opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>

            {/* Modern Map View */}
            <div className="max-w-7xl mx-auto mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative h-[500px] w-full bg-maroon border border-gold/20 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-[2s] overflow-hidden group"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.827222623!2d78.406!3d17.439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90d8ffba3f9f%3A0xad3f3f3f3f3f3f3f!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1633000000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    />
                    <div className="absolute inset-0 pointer-events-none border-[30px] border-maroon" />
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
