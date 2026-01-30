import ContainerLanding from '@/components/Landing/ContainerLanding';
import CTABannerSection from '@/components/Landing/CTABannerSection';
import FeaturesSection from '@/components/Landing/FeaturesSection';
import Footer from '@/components/Landing/Footer';
import HeroSection from '@/components/Landing/HeroSection';
import HowItWorksSection from '@/components/Landing/HowItWorksSection';
import TestimonialsSection from '@/components/Landing/TestimonialsSection';
import WhyChooseSection from '@/components/Landing/WhyChooseSection';
import React from 'react';

const Landing: React.FC = () => {
    return (
        <ContainerLanding>
            {/* Hero */}
            <HeroSection />

            {/* Features */}
            <FeaturesSection />

            {/* How it works */}
            <HowItWorksSection />

            {/* Why choose */}
            <WhyChooseSection />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* CTA Banner */}
            <CTABannerSection />

            {/* Footer */}
            <Footer />
        </ContainerLanding>
    );
};

export default Landing;
