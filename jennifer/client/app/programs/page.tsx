import React from 'react';
import Navigation from '@/components/Navigation';
import AudienceGrid from '@/components/AudienceGrid';
import ServicesGrid from '@/components/ServicesGrid';
import DiscoveryCall from '@/components/DiscoveryCall';
import Footer from '@/components/Footer';

export default function ProgramsPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#5D4037] font-sans antialiased selection:bg-[#A1887F] selection:text-[#FFFFFF] scroll-smooth">
      <Navigation />
      
      <main>
        <div className="pt-32 pb-16 px-6 lg:px-12 text-center bg-[#FFFFFF]">
          <h1 className="font-serif text-5xl md:text-6xl text-[#5D4037] font-medium tracking-wide">
            Programs & Services
          </h1>
        </div>
        <AudienceGrid />
        <ServicesGrid />
        <DiscoveryCall />
      </main>

      <Footer />
    </div>
  );
}
