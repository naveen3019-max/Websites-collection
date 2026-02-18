import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedMenu from '../components/FeaturedMenu';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';
import StatsSection from '../components/StatsSection';
import AboutSnippet from '../components/AboutSnippet';
import ModernGallery from '../components/ModernGallery';
import TrendingMarquee from '../components/TrendingMarquee';

import CategoryGrid from '../components/CategoryGrid';
import CraftSection from '../components/CraftSection';
import SocialFeed from '../components/SocialFeed';

const Home: React.FC = () => {
    return (
        <main>
            <SEO
                title="Indian Premium Coffee & Dining"
                description="Welcome to Cafe Aura India. Experience the best coffee and premium dining in Bengaluru with a modern touch."
            />

            <HeroSection />

            <TrendingMarquee />

            <CategoryGrid />

            <AboutSnippet />

            <CraftSection />

            <StatsSection />

            <FeaturedMenu />

            <WhyChooseUs />

            <ModernGallery />

            <SocialFeed />

            <Testimonials />

            <CTASection />
        </main>
    );
};

export default Home;
