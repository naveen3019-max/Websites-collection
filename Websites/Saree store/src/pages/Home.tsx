
import Hero from '../components/Hero';
import FeaturedCollections from '../components/FeaturedCollections';
import AboutStore from '../components/AboutStore';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

import HeirloomCare from '../components/HeirloomCare';

const Home = () => {
    return (
        <>
            <Hero />
            <FeaturedCollections />
            <AboutStore />
            <WhyChooseUs />
            <HeirloomCare />
            <Testimonials />
            <Contact />
        </>
    );
};

export default Home;
