import React from 'react';
import Navigation from '@/components/Navigation';
import AudienceGrid from '@/components/AudienceGrid';
import ServicesGrid from '@/components/ServicesGrid';
import DiscoveryCall from '@/components/DiscoveryCall';
import AtelierFooter from '@/components/sections/AtelierFooter';

export default function ProgramsPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1A1A1A] font-sans antialiased selection:bg-black selection:text-white scroll-smooth">
      <Navigation />
      
      <main>
        <div className="pt-32 pb-16 px-6 lg:px-12 text-center bg-[#FAF9F6]">
          <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] font-light tracking-wide">
            Programs & Services
          </h1>
        </div>
        <AudienceGrid />
        <ServicesGrid hideButton={true} />
        <DiscoveryCall />
      </main>

      <AtelierFooter />
    </div>
  );
}
