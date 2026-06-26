// jennifer/client/app/page.tsx
'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import IntroSection from '@/components/IntroSection';
import AudienceGrid from '@/components/AudienceGrid';
import ServicesGrid from '@/components/ServicesGrid';
import DiscoveryCall from '@/components/DiscoveryCall';
import Transformations from '@/components/Transformations';
import Lookbook from '@/components/Lookbook';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ProcessSection from '@/components/ProcessSection';
import InsightsSection from '@/components/InsightsSection';

export default function Home() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#5D4037] font-sans antialiased selection:bg-[#A1887F] selection:text-[#FFFFFF] scroll-smooth">
      <BookingModal />
      <Navigation />
      
      <main>
        <HeroSection />
        <IntroSection />
        <AudienceGrid />
        <ServicesGrid />
        <ProcessSection />
        <Transformations />
        <Lookbook />
        <AboutSection />
        <Testimonials />
        <InsightsSection />
        <DiscoveryCall />
      </main>

      <Footer />
    </div>
  );
}