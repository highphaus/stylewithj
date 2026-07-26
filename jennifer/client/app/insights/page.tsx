import React from 'react';
import Navigation from '@/components/Navigation';
import InsightsSection from '@/components/InsightsSection';
import AtelierFooter from '@/components/sections/AtelierFooter';

export default function InsightsPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1A1A1A] font-sans antialiased selection:bg-black selection:text-white scroll-smooth">
      <Navigation />
      
      <main>
        <div className="pt-32 pb-16 px-6 lg:px-12 text-center bg-[#FAF9F6]">
          <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] font-light tracking-wide">
            Insights
          </h1>
        </div>
        <InsightsSection hideButton={true} />
      </main>

      <AtelierFooter />
    </div>
  );
}
