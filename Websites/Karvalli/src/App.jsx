import { useState, useEffect } from 'react';
import { RESTAURANT, MENU_CATEGORIES, MENU_ITEMS, REVIEWS, GALLERY } from './data';

// ─────────────────────────────────────────────────────────────────
// SCROLL-REVEAL HOOK
// ─────────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─────────────────────────────────────────────────────────────────
// PROFESSIONAL SVG ICON LIBRARY (no emojis, no external deps)
// ─────────────────────────────────────────────────────────────────
const Icon = {
  Star: ({ filled, className = 'w-4 h-4' }) => (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={filled ? 0 : 1.5} className={`${className} ${filled ? 'star-filled' : 'star-empty'}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
    </svg>
  ),
  WhatsApp: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  Phone: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
    </svg>
  ),
  MapPin: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  ),
  Clock: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <circle cx={12} cy={12} r={10}/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  ChevronLeft: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  ),
  ChevronRight: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  Copy: ({ className = 'w-4 h-4' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <rect x={9} y={9} width={13} height={13} rx={2} ry={2}/>
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
    </svg>
  ),
  Check: ({ className = 'w-4 h-4' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className={className}>
      <polyline points="20 6 9 18 4 13"/>
    </svg>
  ),
  ArrowRight: ({ className = 'w-4 h-4' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
    </svg>
  ),
  Wave: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path strokeLinecap="round" d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/>
    </svg>
  ),
  Fish: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0 0-3-6-9-6C6 6 3 12 3 12s3 6 9 6c6 0 9-6 9-6z"/>
      <circle cx={16} cy={11} r={1} fill="currentColor" stroke="none"/>
      <path strokeLinecap="round" d="M3 12c-1.5-1-1.5-3 0-4"/>
    </svg>
  ),
  Leaf: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8C8 10 5.9 16.17 3.82 19.1c-.53.77.05 1.9.93 1.82C15.87 20 21 13 21 7c-1 0-3 1-4 1z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.9 19.1C5 17 7 15 9 14"/>
    </svg>
  ),
  Award: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <circle cx={12} cy={8} r={6}/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  Moon: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  ),
  Users: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx={9} cy={7} r={4}/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  Utensils: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path strokeLinecap="round" d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
    </svg>
  ),
  Calendar: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <rect x={3} y={4} width={18} height={18} rx={2} ry={2}/>
      <line x1={16} y1={2} x2={16} y2={6}/>
      <line x1={8} y1={2} x2={8} y2={6}/>
      <line x1={3} y1={10} x2={21} y2={10}/>
    </svg>
  ),
  Sparkle: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
    </svg>
  ),
  Flame: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/>
    </svg>
  ),
  Heart: ({ className = 'w-4 h-4' }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  ),
};

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────
function Stars({ rating, max = 5, size = 'w-4 h-4' }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Icon.Star key={i} filled={i < Math.round(rating)} className={size} />
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────
// SWIGGY LOGO ICON — authentic S-curve brand mark
// ─────────────────────────────────────────────────────────────────
function SwiggyLogoIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Swiggy"
    >
      {/*
        Swiggy S-mark: a bold S-curve with the characteristic
        counter-clockwise swirl — top arc sweeps left, bottom arc sweeps right.
      */}
      <path d="M17.25 6.5A5.25 5.25 0 0 0 6.9 9.4c-.18.6-.27 1.23-.27 1.87 0 2.55 1.73 4.72 4.13 5.16l3.18.58c1.06.19 1.83 1.1 1.83 2.17a2.22 2.22 0 0 1-2.58 2.19l-3.5-.63A2.22 2.22 0 0 1 7.85 18.6l-1.96.35a4.19 4.19 0 0 0 4.08 3.3l3.5.01a4.22 4.22 0 0 0 .74-8.38l-3.18-.58c-1.38-.25-2.38-1.45-2.38-2.87 0-1.6 1.3-2.9 2.9-2.9 1.14 0 2.16.67 2.63 1.71l1.93-.87A5.22 5.22 0 0 0 17.25 6.5z"/>
      <path d="M15.37 4.56l1.97-.34A6.27 6.27 0 0 0 6.7 7.1l1.97.34a4.27 4.27 0 0 1 6.7-2.88z"/>
    </svg>
  );
}

function waLink(msg) {
  return `https://wa.me/${RESTAURANT.phoneRaw}?text=${msg}`;
}


function SectionTag({ children }) {
  return <span className="section-tag">{children}</span>;
}

function SwiggButton({ className = '', size = 'md' }) {
  const cls = size === 'lg' ? 'text-base px-7 py-3.5 gap-2.5' : 'text-sm px-5 py-2.5 gap-2';
  return (
    <a
      href={RESTAURANT.swiggUrl}
      target="_blank"
      rel="noopener noreferrer"
      id="swiggy-order-btn"
      className={`swiggy-btn ${cls} ${className}`}
      aria-label="Order on Swiggy Dineout"
    >
      <SwiggyLogoIcon className={size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      Order on Swiggy
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────
// ① NAVBAR
// ─────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['About', 'Specials', 'Menu', 'Gallery', 'Reviews', 'Visit'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-glass shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#hero" className="flex items-center gap-3 group" aria-label="Karavali Fine Dine — Home">
          <span className="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 font-serif font-bold text-lg group-hover:bg-gold-500/30 transition-colors">K</span>
          <span className="font-serif font-semibold text-cream-100 text-lg leading-tight hidden sm:block">
            Karavali<span className="text-gold-400"> Fine Dine</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-5 lg:gap-7">
          {links.map(l => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="font-sans text-sm font-medium text-cream-200/80 hover:text-gold-400 transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[1px] after:bg-gold-400 after:transition-all hover:after:w-full"
              >{l}</a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <SwiggButton />
        </div>

        <button
          id="mobile-menu-btn"
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-5 h-0.5 bg-cream-100 transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-cream-100 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-cream-100 transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <div className={`md:hidden nav-glass border-t border-gold-500/10 transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-screen pb-4' : 'max-h-0'}`}>
        <ul className="px-4 pt-4 space-y-1">
          {links.map(l => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="block py-2 px-3 rounded-lg font-sans text-sm font-medium text-cream-200 hover:bg-white/10 hover:text-gold-400 transition"
                onClick={() => setMenuOpen(false)}
              >{l}</a>
            </li>
          ))}
        </ul>
        <div className="px-4 pt-3">
          <SwiggButton className="w-full justify-center" />
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────
// ② HERO — rating badge & price removed
// ─────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="/hero.png" alt="Karavali Fine Dine restaurant interior" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-950/80 via-teal-950/55 to-teal-950/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-32">
        {/* Eyebrow — SVG wave icon instead of emoji */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-teal-950/60 backdrop-blur text-gold-400 text-xs font-sans font-semibold tracking-widest uppercase">
            <Icon.Wave className="w-3.5 h-3.5" />
            Coastal Karnataka Fine Dining &middot; Koramangala, Bengaluru
          </span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-cream-50 leading-[1.1] mb-5 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Karavali
          <br />
          <span className="gold-shimmer italic">Fine Dine</span>
        </h1>

        <p className="font-sans text-cream-200/80 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Where the Arabian Sea meets your table &mdash; authentic Mangalorean flavours, slow-cooked to perfection.
        </p>

        {/* CTAs — no rating badge, no price */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <SwiggButton size="lg" />
          <a
            href={waLink(RESTAURANT.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-whatsapp-btn"
            className="inline-flex items-center gap-2.5 font-sans font-semibold text-base px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5a] text-white transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5"
          >
            <Icon.WhatsApp />
            WhatsApp Us
          </a>
        </div>

        {/* Scroll cue */}
        <div className="mt-16 flex justify-center animate-float">
          <a href="#about" aria-label="Scroll to About" className="flex flex-col items-center gap-1 text-cream-200/40 hover:text-gold-400 transition-colors">
            <span className="font-sans text-xs tracking-widest uppercase">Explore</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60V30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0Z" fill="#051f1c" />
        </svg>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// ③ ABOUT — SVG icons replace emojis
// ─────────────────────────────────────────────────────────────────
function About() {
  const facts = [
    { IconComp: Icon.Fish,  label: 'Fresh Daily',     desc: 'Seafood sourced and delivered fresh every morning' },
    { IconComp: Icon.Leaf,  label: 'Coastal Recipes',  desc: 'Authentic Mangalorean family recipes, unchanged' },
    { IconComp: Icon.Award, label: '4.4 Stars',        desc: 'Rated by over 1,900 diners on Google' },
    { IconComp: Icon.Moon,  label: 'Late Kitchen',     desc: 'Open until 1:30 AM, Bengaluru\'s late-night gem' },
  ];

  return (
    <section id="about" className="py-24 bg-teal-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="reveal-left mb-4"><SectionTag>Our Story</SectionTag></div>
            <h2 className="reveal-left font-serif text-4xl md:text-5xl font-bold text-cream-50 leading-tight mb-6" style={{ transitionDelay: '0.1s' }}>
              The Taste of the<br />
              <span className="italic text-gold-400">Arabian Coast</span>
            </h2>
            <div className="reveal-left space-y-4 text-cream-200/75 font-sans text-base leading-relaxed" style={{ transitionDelay: '0.2s' }}>
              <p>
                Karavali Fine Dine brings the bold, sun-kissed flavours of coastal Karnataka straight to the heart of Koramangala. Our kitchen draws on centuries-old Tulu-Nadu and Mangalorean culinary traditions &mdash; slow-cooking, fresh coconut, and a reverence for the sea.
              </p>
              <p>
                Every curry, every tawa fry, and every biryani is crafted with freshly-ground spice blends and produce delivered daily. We believe the best coastal food is not complicated &mdash; it is honest, generous, and deeply flavourful.
              </p>
              <p>
                From the iconic Kori Rotti to our legendary Prawn Biryani and the festival-special Gadbad ice cream, we have curated a menu that feels like a journey down the Konkan coast &mdash; without leaving Bengaluru.
              </p>
            </div>
            <div className="reveal-left mt-8" style={{ transitionDelay: '0.3s' }}>
              <a
                href="#menu"
                className="inline-flex items-center gap-2 font-sans font-semibold text-gold-400 border border-gold-500/40 rounded-full px-6 py-2.5 hover:bg-gold-500/10 transition-all duration-200"
              >
                Explore Our Menu
                <Icon.ArrowRight />
              </a>
            </div>
          </div>

          <div className="reveal-right">
            <div className="relative">
              <img
                src="/interior.png"
                alt="Karavali Fine Dine restaurant interior ambience"
                className="rounded-2xl w-full h-72 md:h-96 object-cover shadow-2xl"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-gold-500/20" />
              {/* Floating badge — SVG fish icon instead of lobster emoji */}
              <div className="absolute -bottom-5 -left-5 bg-teal-800 border border-gold-500/30 rounded-xl px-5 py-3 shadow-xl backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
                    <Icon.Fish className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-cream-50 text-sm">Premium Seafood</p>
                    <p className="font-sans text-xs text-cream-200/60">Sourced fresh daily</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Facts grid — SVG icons */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {facts.map((f, i) => (
                <div key={i} className="card-lift bg-teal-900/60 border border-gold-500/10 rounded-xl p-4">
                  <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/15 flex items-center justify-center text-gold-400 mb-3">
                    <f.IconComp className="w-4.5 h-4.5" />
                  </div>
                  <p className="font-serif font-semibold text-cream-100 text-sm mb-0.5">{f.label}</p>
                  <p className="font-sans text-xs text-cream-200/55 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// ④ WHY KARAVALI — new pillars section
// ─────────────────────────────────────────────────────────────────
function WhyKaravali() {
  const pillars = [
    {
      IconComp: Icon.Fish,
      title: 'Ocean-Fresh Daily',
      body: 'We source our seafood fresh every morning. No frozen catch &mdash; just the ocean\'s finest, prepared the same day.',
    },
    {
      IconComp: Icon.Flame,
      title: 'Slow-Cooked Masalas',
      body: 'Our curries are built over low heat with hand-ground spices &mdash; the same way coastal Karnataka grandmothers have done for generations.',
    },
    {
      IconComp: Icon.Leaf,
      title: 'Pure Coastal Recipes',
      body: 'No shortcuts, no fusion shortcuts. Recipes anchored in Tulu-Nadu and Konkan tradition, served as they were meant to be.',
    },
    {
      IconComp: Icon.Moon,
      title: 'Late Kitchen Till 1:30 AM',
      body: 'Great Mangalorean food should never be a daytime-only luxury. We keep our kitchen open late so Bengaluru can eat well, any hour.',
    },
    {
      IconComp: Icon.Users,
      title: 'Warm Hospitality',
      body: 'From a solo meal to a family feast of 20, our team treats every table like a guest at home on the Konkan coast.',
    },
    {
      IconComp: Icon.Award,
      title: '4.4-Star Reputation',
      body: 'Over 1,900 diners have shared their experience. We earn our rating one honest plate at a time, every single service.',
    },
  ];

  return (
    <section id="specials" className="py-24 bg-gradient-to-b from-teal-950 to-teal-900/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,151,59,0.05),transparent_65%)]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-14">
          <div className="flex justify-center mb-4 reveal"><SectionTag>Why We're Different</SectionTag></div>
          <h2 className="reveal font-serif text-4xl md:text-5xl font-bold text-cream-50 mb-4" style={{ transitionDelay: '0.1s' }}>
            The <span className="italic text-gold-400">Karavali Promise</span>
          </h2>
          <p className="reveal font-sans text-cream-200/65 max-w-lg mx-auto text-base" style={{ transitionDelay: '0.2s' }}>
            Six reasons guests keep coming back, and why locals trust us for their most meaningful meals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="reveal card-lift bg-teal-900/50 border border-gold-500/10 hover:border-gold-500/25 rounded-2xl p-6 group"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-5 group-hover:bg-gold-500/15 transition-colors">
                <p.IconComp className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-semibold text-cream-100 text-lg mb-2">{p.title}</h3>
              <p className="font-sans text-cream-200/60 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: p.body }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// ⑤ SIGNATURE DISHES — new featured section
// ─────────────────────────────────────────────────────────────────
function SignatureDishes() {
  const dishes = [
    {
      img: '/prawn.png',
      name: 'Karavali Prawn Curry',
      tag: 'House Signature',
      desc: 'Plump tiger prawns simmered for hours in a slow-cooked coconut milk gravy with tamarind and Byadagi chillies. The dish that defines our kitchen.',
      price: '\u20B9480',
    },
    {
      img: '/kori-rotti.png',
      name: 'Kori Rotti',
      tag: 'Coastal Classic',
      desc: 'Crispy wafer-thin rice crisps drenched in a bold, aromatic Tulu-Nadu chicken curry. The definitive Mangalorean one-plate meal &mdash; lighter than you think, unforgettable every time.',
      price: '\u20B9340',
    },
    {
      img: '/biryani.png',
      name: 'Coastal Prawn Biryani',
      tag: 'Chef\'s Favourite',
      desc: 'Fragrant Jeerakasala rice layered with marinated tiger prawns and rose-water-infused dum gravy. Sealed and slow-cooked to lock in every note of spice and sea.',
      price: '\u20B9420',
    },
  ];

  return (
    <section className="py-24 bg-teal-950 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex justify-center mb-4 reveal"><SectionTag>Must-Try</SectionTag></div>
          <h2 className="reveal font-serif text-4xl md:text-5xl font-bold text-cream-50 mb-4" style={{ transitionDelay: '0.1s' }}>
            Signature <span className="italic text-gold-400">Dishes</span>
          </h2>
          <p className="reveal font-sans text-cream-200/65 max-w-md mx-auto text-base" style={{ transitionDelay: '0.2s' }}>
            Three plates that tell the whole story of coastal Karnataka cuisine. Start here.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {dishes.map((d, i) => (
            <div
              key={i}
              className="reveal card-lift rounded-2xl overflow-hidden bg-teal-900/60 border border-gold-500/10 group"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={d.img}
                  alt={d.name}
                  className="w-full h-full object-cover gallery-img"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-teal-950/10 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-sans font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-300 backdrop-blur">
                  {d.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif font-semibold text-cream-100 text-xl mb-2">{d.name}</h3>
                <p className="font-sans text-cream-200/60 text-sm leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: d.desc }} />
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-gold-400 text-xl">{d.price}</span>
                  <a
                    href={RESTAURANT.swiggUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-[#FC8019] hover:text-[#e06b0e] border border-[#FC8019]/30 hover:border-[#FC8019] rounded-full px-3 py-1.5 transition-all"
                  >
                    Order <Icon.ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 reveal">
          <a href="#menu" className="inline-flex items-center gap-2 font-sans font-semibold text-gold-400 border border-gold-500/30 rounded-full px-6 py-2.5 hover:bg-gold-500/10 transition-all">
            View Full Menu <Icon.ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// ⑥ MENU
// ─────────────────────────────────────────────────────────────────
function Menu() {
  const [activeTab, setActiveTab] = useState('Starters');
  const items = MENU_ITEMS.filter(i => i.category === activeTab);

  return (
    <section id="menu" className="py-24 bg-teal-900/30 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,151,59,0.04),transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-14">
          <div className="flex justify-center mb-4 reveal"><SectionTag>What We Serve</SectionTag></div>
          <h2 className="reveal font-serif text-4xl md:text-5xl font-bold text-cream-50 mb-4" style={{ transitionDelay: '0.1s' }}>
            Our <span className="italic text-gold-400">Menu</span>
          </h2>
          <p className="reveal font-sans text-cream-200/65 max-w-lg mx-auto text-base" style={{ transitionDelay: '0.2s' }}>
            Coastal Karnataka's finest &mdash; from tawa-fried starters to slow-cooked curries and dum biryanis.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12 reveal" style={{ transitionDelay: '0.3s' }}>
          {MENU_CATEGORIES.map(cat => (
            <button
              key={cat}
              id={`menu-tab-${cat.toLowerCase()}`}
              onClick={() => setActiveTab(cat)}
              className={`font-sans text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 ${activeTab === cat ? 'menu-tab-active' : 'menu-tab-inactive'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div
              key={`${item.category}-${item.name}`}
              className="card-lift bg-teal-900/70 border border-gold-500/10 rounded-2xl p-5 relative overflow-hidden flex flex-col"
            >
              {item.bestseller && (
                <span className="absolute top-3 right-3 text-[10px] font-sans font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-gold-500/15 text-gold-400 border border-gold-500/20">
                  Bestseller
                </span>
              )}

              <div className="flex items-center gap-1.5 mb-3">
                <span className={`w-3 h-3 rounded-sm border-[1.5px] flex items-center justify-center ${item.veg ? 'border-green-500' : 'border-red-500'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${item.veg ? 'bg-green-500' : 'bg-red-500'}`} />
                </span>
                <span className={`font-sans text-xs ${item.veg ? 'text-green-400/70' : 'text-red-400/70'}`}>
                  {item.veg ? 'Vegetarian' : 'Non-Vegetarian'}
                </span>
              </div>

              <h3 className="font-serif font-semibold text-cream-100 text-lg mb-1.5 leading-snug">{item.name}</h3>
              <p className="font-sans text-cream-200/55 text-sm leading-relaxed mb-4 flex-1">{item.desc}</p>

              <div className="flex items-center justify-between mt-auto pt-2 border-t border-gold-500/8">
                <span className="font-serif font-bold text-gold-400 text-xl">{item.price}</span>
                <a
                  href={RESTAURANT.swiggUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-[#FC8019] hover:text-[#e06b0e] border border-[#FC8019]/30 hover:border-[#FC8019] rounded-full px-3 py-1.5 transition-all"
                  aria-label={`Order ${item.name} on Swiggy`}
                >
                  Order <Icon.ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <SwiggButton size="lg" />
          <p className="font-sans text-xs text-cream-200/40 mt-3">Full menu available on Swiggy Dineout</p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// ⑦ GALLERY
// ─────────────────────────────────────────────────────────────────
function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-teal-950 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex justify-center mb-4 reveal"><SectionTag>Gallery</SectionTag></div>
          <h2 className="reveal font-serif text-4xl md:text-5xl font-bold text-cream-50 mb-4" style={{ transitionDelay: '0.1s' }}>
            Feasting for the <span className="italic text-gold-400">Eyes</span>
          </h2>
          <p className="reveal font-sans text-cream-200/65 max-w-md mx-auto text-base" style={{ transitionDelay: '0.2s' }}>
            A glimpse of the flavours and spaces that await you at Karavali.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 reveal" style={{ transitionDelay: '0.3s' }}>
          {GALLERY.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl bg-teal-900 ${i === 0 ? 'aspect-square md:row-span-2 md:col-span-2' : 'aspect-video md:aspect-square'}`}
            >
              <img src={img.src} alt={img.alt} className="gallery-img w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="font-sans text-xs text-cream-100/90 leading-snug">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// ⑧ EVENTS — new section
// ─────────────────────────────────────────────────────────────────
function Events() {
  const offerings = [
    {
      IconComp: Icon.Users,
      title: 'Private Group Dining',
      desc: 'Hosting a team dinner, birthday, or anniversary? Reserve our private dining area for groups of 10 to 50 guests. Dedicated service, curated coastal menu, and a space that feels truly special.',
    },
    {
      IconComp: Icon.Utensils,
      title: 'Coastal Catering',
      desc: 'Bring the flavours of Karavali to your office, wedding, or event. Our catering team handles everything from live tawa stations to full Boshi Meal thalis &mdash; delivered fresh, served hot.',
    },
    {
      IconComp: Icon.Calendar,
      title: 'Celebration Packages',
      desc: 'Birthdays, engagements, farewell dinners &mdash; tell us the occasion and we will build a bespoke package with a welcome drink, customised menu, and a complimentary dessert spread.',
    },
  ];

  return (
    <section id="events" className="py-24 bg-teal-900/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gold-500/4 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="reveal-left mb-4"><SectionTag>Private &amp; Events</SectionTag></div>
            <h2 className="reveal-left font-serif text-4xl md:text-5xl font-bold text-cream-50 leading-tight mb-6" style={{ transitionDelay: '0.1s' }}>
              Make It a<br />
              <span className="italic text-gold-400">Memorable Occasion</span>
            </h2>
            <p className="reveal-left font-sans text-cream-200/70 text-base leading-relaxed mb-8" style={{ transitionDelay: '0.2s' }}>
              Karavali is more than a restaurant &mdash; it is a destination for the moments that matter. We partner with you to make every gathering feel effortless and extraordinary.
            </p>
            <div className="reveal-left flex flex-col sm:flex-row gap-4" style={{ transitionDelay: '0.3s' }}>
              <a
                href={waLink(encodeURIComponent("Hi, I'd like to enquire about a private dining or event package at Karavali Fine Dine. Could you share details?"))}
                target="_blank"
                rel="noopener noreferrer"
                id="events-wa-btn"
                className="inline-flex items-center gap-2.5 font-sans font-semibold text-sm px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1ebe5a] text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/25"
              >
                <Icon.WhatsApp />
                Enquire via WhatsApp
              </a>
              <a
                href={`tel:${RESTAURANT.phone}`}
                className="inline-flex items-center gap-2.5 font-sans font-semibold text-sm px-6 py-3 rounded-full border border-gold-500/30 text-gold-400 hover:bg-gold-500/10 transition-all"
              >
                <Icon.Phone />
                Call Us
              </a>
            </div>
          </div>

          <div className="space-y-5 reveal-right">
            {offerings.map((o, i) => (
              <div key={i} className="card-lift flex gap-4 bg-teal-900/60 border border-gold-500/10 hover:border-gold-500/25 rounded-2xl p-5 group transition-all">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:bg-gold-500/15 transition-colors">
                  <o.IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-cream-100 text-base mb-1">{o.title}</h3>
                  <p className="font-sans text-cream-200/60 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: o.desc }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// ⑨ REVIEWS
// ─────────────────────────────────────────────────────────────────
function Reviews() {
  const [active, setActive] = useState(0);
  const total = REVIEWS.length;
  const prev = () => setActive(a => (a - 1 + total) % total);
  const next = () => setActive(a => (a + 1) % total);

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="reviews" className="py-24 bg-teal-950 relative">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-500/4 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex justify-center mb-4 reveal"><SectionTag>Guest Reviews</SectionTag></div>
          <h2 className="reveal font-serif text-4xl md:text-5xl font-bold text-cream-50 mb-3" style={{ transitionDelay: '0.1s' }}>
            What Our <span className="italic text-gold-400">Guests Say</span>
          </h2>
          <div className="reveal flex justify-center items-center gap-3 mt-4" style={{ transitionDelay: '0.2s' }}>
            <Stars rating={4.4} size="w-5 h-5" />
            <span className="font-serif font-bold text-gold-400 text-2xl">4.4</span>
            <span className="font-sans text-cream-200/60 text-sm">/ 5 &middot; {RESTAURANT.reviewCount.toLocaleString()} Google reviews</span>
          </div>
        </div>

        <div className="reveal relative" style={{ transitionDelay: '0.3s' }}>
          <div className="grid md:grid-cols-3 gap-5">
            {[0, 1, 2].map(offset => {
              const idx = (active + offset) % total;
              const review = REVIEWS[idx];
              return (
                <div
                  key={idx}
                  className={`card-lift bg-teal-900/70 border rounded-2xl p-6 transition-all duration-500 ${offset === 0 ? 'border-gold-500/30 shadow-lg shadow-gold-500/5' : 'border-gold-500/10'}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center font-serif font-bold text-gold-400 text-base">
                        {review.avatar}
                      </div>
                      <div>
                        <p className="font-serif font-semibold text-cream-100 text-sm">{review.name}</p>
                        <p className="font-sans text-xs text-cream-200/50">{review.date}</p>
                      </div>
                    </div>
                    <Stars rating={review.rating} />
                  </div>
                  <Icon.Sparkle className="w-4 h-4 text-gold-500/30 mb-2" />
                  <p className="font-sans text-cream-200/75 text-sm leading-relaxed italic">&ldquo;{review.text}&rdquo;</p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button id="review-prev-btn" onClick={prev} className="w-10 h-10 rounded-full border border-gold-500/30 hover:border-gold-500 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 transition-all" aria-label="Previous review">
              <Icon.ChevronLeft />
            </button>
            <div className="flex gap-1.5 items-center">
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={`rounded-full transition-all duration-300 ${i === active ? 'w-6 h-2 bg-gold-400' : 'w-2 h-2 bg-gold-500/30 hover:bg-gold-500/60'}`} aria-label={`Review ${i + 1}`} />
              ))}
            </div>
            <button id="review-next-btn" onClick={next} className="w-10 h-10 rounded-full border border-gold-500/30 hover:border-gold-500 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 transition-all" aria-label="Next review">
              <Icon.ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// ⑩ RESERVATION FORM
// ─────────────────────────────────────────────────────────────────
function ReservationForm() {
  const [form, setForm] = useState({ name: '', date: '', time: '', guests: '2', note: '' });
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hi! I'd like to book a table at Karavali Fine Dine.\n\n` +
      `Name: ${form.name}\n` +
      `Date: ${form.date}\n` +
      `Time: ${form.time}\n` +
      `Party size: ${form.guests} guests\n` +
      (form.note ? `Special requests: ${form.note}\n` : '') +
      `\nPlease confirm availability. Thank you!`
    );
    window.open(`https://wa.me/${RESTAURANT.phoneRaw}?text=${msg}`, '_blank');
  };

  return (
    <div className="reveal bg-teal-900/60 border border-gold-500/15 rounded-2xl p-8" style={{ transitionDelay: '0.2s' }}>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[#25D366]/15 flex items-center justify-center text-[#25D366]">
          <Icon.WhatsApp className="w-4 h-4" />
        </div>
        <h3 className="font-serif font-semibold text-cream-100 text-xl">Reserve a Table</h3>
      </div>
      <p className="font-sans text-sm text-cream-200/55 mb-6">
        Fill in your details &mdash; we will open WhatsApp with everything pre-filled. No app or account needed.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4" id="reservation-form">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="res-name" className="block font-sans text-xs text-cream-200/70 mb-1.5">Your Name *</label>
            <input id="res-name" name="name" type="text" required placeholder="e.g. Priya Sharma" value={form.name} onChange={handleChange} className="form-input" />
          </div>
          <div>
            <label htmlFor="res-guests" className="block font-sans text-xs text-cream-200/70 mb-1.5">Party Size *</label>
            <select id="res-guests" name="guests" value={form.guests} onChange={handleChange} className="form-input cursor-pointer">
              {[1,2,3,4,5,6,7,8,10,12,15,20].map(n => (
                <option key={n} value={n} className="bg-teal-900">{n} {n === 1 ? 'person' : 'people'}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="res-date" className="block font-sans text-xs text-cream-200/70 mb-1.5">Preferred Date *</label>
            <input id="res-date" name="date" type="date" required value={form.date} onChange={handleChange} className="form-input" min={new Date().toISOString().split('T')[0]} />
          </div>
          <div>
            <label htmlFor="res-time" className="block font-sans text-xs text-cream-200/70 mb-1.5">Preferred Time *</label>
            <input id="res-time" name="time" type="time" required value={form.time} onChange={handleChange} className="form-input" />
          </div>
        </div>
        <div>
          <label htmlFor="res-note" className="block font-sans text-xs text-cream-200/70 mb-1.5">Special Requests (optional)</label>
          <textarea id="res-note" name="note" rows={2} placeholder="Birthday celebration, dietary preferences, high chair needed..." value={form.note} onChange={handleChange} className="form-input resize-none" />
        </div>
        <button
          type="submit"
          id="reservation-submit-btn"
          className="w-full flex items-center justify-center gap-2.5 font-sans font-semibold text-white rounded-xl py-3.5 transition-all duration-200 bg-[#25D366] hover:bg-[#1ebe5a] hover:shadow-lg hover:shadow-green-500/25"
        >
          <Icon.WhatsApp />
          Book via WhatsApp
        </button>
      </form>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// ⑪ VISIT
// ─────────────────────────────────────────────────────────────────
function Visit() {
  const [copied, setCopied] = useState(false);
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long' });

  const copyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT.address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="visit" className="py-24 bg-teal-900/20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/3 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-14">
          <div className="flex justify-center mb-4 reveal"><SectionTag>Find Us</SectionTag></div>
          <h2 className="reveal font-serif text-4xl md:text-5xl font-bold text-cream-50 mb-4" style={{ transitionDelay: '0.1s' }}>
            Come <span className="italic text-gold-400">Visit Us</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="reveal-left">
            <div className="rounded-2xl overflow-hidden border border-gold-500/15 h-80 md:h-96 bg-teal-900">
              <iframe
                title="Karavali Fine Dine Restaurant Location"
                src={RESTAURANT.googleMapsEmbed}
                width="100%" height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(170deg) saturate(0.8) brightness(0.85)' }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href={RESTAURANT.googleMapsUrl}
                target="_blank" rel="noopener noreferrer"
                id="get-directions-btn"
                className="flex-1 flex items-center justify-center gap-2 font-sans text-sm font-semibold text-cream-100 bg-teal-800 hover:bg-teal-700 border border-gold-500/15 rounded-xl py-3 transition-all"
              >
                <Icon.MapPin />
                Get Directions
              </a>
              <button
                id="copy-address-btn"
                onClick={copyAddress}
                className="flex-1 flex items-center justify-center gap-2 font-sans text-sm font-semibold text-gold-400 border border-gold-500/30 hover:border-gold-500 rounded-xl py-3 transition-all hover:bg-gold-500/5"
              >
                {copied ? <Icon.Check /> : <Icon.Copy />}
                {copied ? 'Copied!' : 'Copy Address'}
              </button>
            </div>
          </div>

          <div className="space-y-5 reveal-right" style={{ transitionDelay: '0.1s' }}>
            <div className="bg-teal-900/60 border border-gold-500/15 rounded-2xl p-6">
              <div className="flex gap-3">
                <div className="text-gold-400 mt-0.5 shrink-0"><Icon.MapPin /></div>
                <div>
                  <p className="font-serif font-semibold text-cream-100 mb-1.5">Address</p>
                  <p className="font-sans text-cream-200/70 text-sm leading-relaxed">{RESTAURANT.address}</p>
                </div>
              </div>
            </div>

            <div className="bg-teal-900/60 border border-gold-500/15 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-gold-400"><Icon.Phone /></div>
                <p className="font-serif font-semibold text-cream-100">Contact</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={`tel:${RESTAURANT.phone}`} id="call-btn-visit" className="flex items-center gap-2 font-sans text-sm font-medium text-cream-100 bg-teal-800/60 hover:bg-teal-700/60 border border-gold-500/15 rounded-full px-4 py-2 transition-all">
                  <Icon.Phone className="w-4 h-4" />
                  {RESTAURANT.phone}
                </a>
                <a href={waLink(RESTAURANT.waBookingMessage)} target="_blank" rel="noopener noreferrer" id="whatsapp-visit-btn" className="flex items-center gap-2 font-sans text-sm font-semibold text-white bg-[#25D366] hover:bg-[#1ebe5a] rounded-full px-4 py-2 transition-all">
                  <Icon.WhatsApp className="w-4 h-4" />
                  WhatsApp to Book
                </a>
              </div>
            </div>

            <div className="bg-teal-900/60 border border-gold-500/15 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-gold-400"><Icon.Clock /></div>
                <p className="font-serif font-semibold text-cream-100">Opening Hours</p>
              </div>
              <div className="space-y-1.5">
                {RESTAURANT.hours.map(({ day, open, close }) => (
                  <div key={day} className={`flex items-center justify-between text-sm font-sans rounded-lg px-3 py-2 ${day === today ? 'bg-gold-500/10 border border-gold-500/20' : ''}`}>
                    <span className={day === today ? 'font-semibold text-gold-400' : 'text-cream-200/70'}>{day}{day === today ? ' (Today)' : ''}</span>
                    <span className={day === today ? 'font-semibold text-gold-300' : 'text-cream-200/60'}>{open} &ndash; {close}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-sans text-xs text-green-400">Open daily &middot; Late kitchen till 1:30 AM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <ReservationForm />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// ⑫ FOOTER
// ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-teal-950 border-t border-gold-500/10 pt-16 pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center font-serif font-bold text-gold-400 text-xl">K</span>
              <div>
                <p className="font-serif font-bold text-cream-50 text-base">Karavali Fine Dine</p>
                <p className="font-sans text-xs text-cream-200/50">Koramangala, Bengaluru</p>
              </div>
            </div>
            <p className="font-sans text-sm text-cream-200/55 leading-relaxed mb-5">
              Authentic coastal Karnataka cuisine in the heart of Bengaluru. Where tradition meets the ocean.
            </p>
            <div className="flex gap-3">
              {[
                { href: RESTAURANT.instagram, label: 'Instagram', d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { href: RESTAURANT.facebook, label: 'Facebook', d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-gold-500/20 hover:border-gold-500/60 flex items-center justify-center text-cream-200/50 hover:text-gold-400 transition-all">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d={s.d}/></svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-serif font-semibold text-cream-100 mb-4">Quick Links</p>
            <ul className="space-y-2">
              {['About', 'Specials', 'Menu', 'Gallery', 'Reviews', 'Events', 'Visit'].map(l => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="font-sans text-sm text-cream-200/55 hover:text-gold-400 transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-serif font-semibold text-cream-100 mb-4">Get In Touch</p>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Icon.MapPin className="w-4 h-4 text-gold-400/70 shrink-0 mt-0.5" />
                <p className="font-sans text-sm text-cream-200/55 leading-relaxed">{RESTAURANT.address}</p>
              </div>
              <a href={`tel:${RESTAURANT.phone}`} className="flex items-center gap-2.5 font-sans text-sm text-cream-200/55 hover:text-gold-400 transition-colors">
                <Icon.Phone className="w-4 h-4 text-gold-400/70" />
                {RESTAURANT.phone}
              </a>
              <a href={waLink(RESTAURANT.waMessage)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 font-sans text-sm text-[#25D366] hover:text-[#1ebe5a] transition-colors">
                <Icon.WhatsApp className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
            <div className="mt-5 pt-5 border-t border-gold-500/10">
              <SwiggButton className="w-full justify-center text-sm" />
            </div>
          </div>
        </div>

        <div className="border-t border-gold-500/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-cream-200/35">&copy; 2025 Karavali Fine Dine Restaurant. All rights reserved.</p>
          <p className="font-sans text-xs text-cream-200/35 flex items-center gap-1">
            Built with <Icon.Heart className="w-3 h-3 text-gold-400/60" /> by Naveen &middot; Bengaluru
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────
// FLOATING WHATSAPP FAB
// ─────────────────────────────────────────────────────────────────
function FloatingButtons() {
  return (
    <a
      href={waLink(RESTAURANT.waMessage)}
      target="_blank"
      rel="noopener noreferrer"
      id="floating-whatsapp-btn"
      aria-label="Chat on WhatsApp"
      className="wa-pulse fixed bottom-24 md:bottom-8 right-5 md:right-8 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-green-500/30 flex items-center justify-center text-white hover:scale-110 hover:bg-[#1ebe5a] transition-all duration-200"
    >
      <Icon.WhatsApp className="w-6 h-6" />
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────
// MOBILE ACTION BAR
// ─────────────────────────────────────────────────────────────────
function MobileActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-teal-900/95 backdrop-blur border-t border-gold-500/15 flex">
        <a href={`tel:${RESTAURANT.phone}`} id="mob-call-btn"
          className="flex-1 flex flex-col items-center gap-1 py-3 text-cream-200/70 hover:text-gold-400 transition-colors" aria-label="Call">
          <Icon.Phone />
          <span className="font-sans text-[10px] font-semibold tracking-wide">Call</span>
        </a>
        <a href={waLink(RESTAURANT.waMessage)} target="_blank" rel="noopener noreferrer" id="mob-wa-btn"
          className="flex-1 flex flex-col items-center gap-1 py-3 text-[#25D366] hover:text-[#1ebe5a] transition-colors" aria-label="WhatsApp">
          <Icon.WhatsApp />
          <span className="font-sans text-[10px] font-semibold tracking-wide">WhatsApp</span>
        </a>
        <a href={RESTAURANT.swiggUrl} target="_blank" rel="noopener noreferrer" id="mob-swiggy-btn"
          className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors" style={{ color: '#FC8019' }} aria-label="Order on Swiggy">
          <SwiggyLogoIcon className="w-5 h-5" />
          <span className="font-sans text-[10px] font-semibold tracking-wide">Order</span>
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────
export default function App() {
  useReveal();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyKaravali />
        <SignatureDishes />
        <Menu />
        <Gallery />
        <Events />
        <Reviews />
        <Visit />
      </main>
      <Footer />
      <FloatingButtons />
      <MobileActionBar />
    </>
  );
}
