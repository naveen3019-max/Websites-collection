import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Plus, Minus, Instagram, Facebook, Twitter, Linkedin, Briefcase, Handshake } from 'lucide-react';
import Button from '../components/ui/Button';
import SEO from '../components/SEO';

const faqData = [
    {
        question: "Do you offer franchise opportunities in India?",
        answer: "Yes, we are actively expanding across major Indian cities. Please reach out to our partnerships team via the contact form with the subject 'Franchise Inquiry'."
    },
    {
        question: "Is there a space for remote working?",
        answer: "Absolutely! Our MG Road flagship outlet features high-speed Wi-Fi and quiet corners perfect for working or holding casual meetings."
    },
    {
        question: "Do you host private events or celebrations?",
        answer: "We love celebrations! Whether it's a book launch, birthday, or corporate meet-up, we have dedicated event packages. Contact us for details."
    },
    {
        question: "Are your beans available for purchase?",
        answer: "Yes, our signature Chikmagalur blends are available in 250g and 500g packs at our cafe counter and online through our WhatsApp shop."
    }
];

const Contact: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Connect with Us | Cafe Aura India"
                description="Get in touch with Cafe Aura India. Visit our Bengaluru outlet, explore franchise opportunities, or join our team."
            />

            {/* Minimalist Header */}
            <div className="bg-secondary/30 pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-primary font-bold tracking-widest uppercase mb-4 inline-block"
                        >
                            Namaste! We're Listening
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-serif font-bold text-dark mb-6 leading-tight"
                        >
                            Let's Start a <br /><span className="text-primary italic">Conversation</span>
                        </motion.h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Left: Contact Information */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-serif font-bold text-dark mb-10">Visit Our Flagship</h2>

                            <div className="space-y-12">
                                <div className="flex items-start gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <MapPin size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-dark mb-2">Heritage MG Road</h4>
                                        <p className="text-gray-500 leading-relaxed">
                                            45, MG Road, Above Metro Station<br />
                                            Bengaluru, Karnataka 560001
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Phone size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-dark mb-2">Phone & WhatsApp</h4>
                                        <p className="text-gray-500 mb-1">+91 98765 43210</p>
                                        <p className="text-primary text-sm font-bold">Fastest response via WhatsApp</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Mail size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-dark mb-2">Corporate & Support</h4>
                                        <p className="text-gray-500 mb-1">hello.in@cafeaura.com</p>
                                        <p className="text-gray-500">partners@cafeaura.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Clock size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-dark mb-2">Service Hours</h4>
                                        <p className="text-gray-500">Everyday: 8:00 AM - 11:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Hub Links */}
                            <div className="mt-16 p-10 bg-dark rounded-[3rem] text-white overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                                <h4 className="text-2xl font-serif font-bold mb-6">Our Social Hub</h4>
                                <div className="flex gap-4">
                                    {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                                        <button key={i} className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                                            <Icon size={20} />
                                        </button>
                                    ))}
                                </div>
                                <p className="mt-8 text-white/40 text-sm">Join 50k+ coffee lovers across India.</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Modern Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-secondary/20 p-8 md:p-16 rounded-[4rem] border border-primary/5"
                    >
                        <h3 className="text-3xl font-serif font-bold text-dark mb-10 text-center">Send Us a Pulse</h3>
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full bg-white px-8 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-white px-8 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            <select className="w-full bg-white px-8 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm appearance-none text-gray-500">
                                <option>Inquiry Type</option>
                                <option>Franchise & Partnerships</option>
                                <option>Careers</option>
                                <option>Customer Feedback</option>
                                <option>Event Booking</option>
                            </select>

                            <textarea
                                placeholder="Write your thoughts here..."
                                rows={5}
                                className="w-full bg-white px-8 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm resize-none"
                            ></textarea>

                            <Button className="w-full py-6 rounded-2xl text-lg font-bold shadow-xl animate-glow">
                                Send Namaste <Send size={20} className="ml-2" />
                            </Button>
                        </form>
                    </motion.div>
                </div>

                {/* FAQ Section */}
                <section className="mt-32">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-serif font-bold text-dark"
                        >
                            Commonly <span className="text-primary italic">Asked</span>
                        </motion.h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqData.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="border border-gray-100 rounded-3xl overflow-hidden bg-white"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-lg font-bold text-dark">{faq.question}</span>
                                    {openFaq === index ? <Minus size={20} className="text-primary" /> : <Plus size={20} className="text-primary" />}
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-8 pb-6 text-gray-500 leading-relaxed md:pr-16"
                                        >
                                            {faq.answer}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Careers & Partnerships */}
                <section className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-primary p-12 rounded-[3.5rem] text-white flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
                                <Briefcase size={32} />
                            </div>
                            <h3 className="text-3xl font-serif font-bold mb-4">Join Our Tribe</h3>
                            <p className="text-white/80 mb-8 max-w-sm">
                                Passionate about coffee and people? We're always looking for talented baristas and curators.
                            </p>
                        </div>
                        <button className="text-left font-bold border-b border-white w-fit hover:border-black transition-colors">
                            Explore Open Roles
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-dark p-12 rounded-[3.5rem] text-white flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                                <Handshake size={32} />
                            </div>
                            <h3 className="text-3xl font-serif font-bold mb-4">Partner with Aura</h3>
                            <p className="text-white/40 mb-8 max-w-sm">
                                Looking to bring Cafe Aura to your city? Let's discuss franchise and collaboration opportunities.
                            </p>
                        </div>
                        <button className="text-left font-bold border-b border-white w-fit hover:border-primary transition-colors text-primary">
                            Inquire Now
                        </button>
                    </motion.div>
                </section>

                {/* Map Section */}
                <div className="mt-40 rounded-[4rem] overflow-hidden shadow-2xl h-[500px] border-[12px] border-secondary/20">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9221528627!2d77.6387!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a6bb455555%3A0x2f6b0f0f0f0f0f0f!2sIndira%20Nagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Cafe Aura India Location"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
