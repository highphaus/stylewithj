'use client';

import HeroSection from '@/components/sections/HeroSection';
import AtelierFooter from '@/components/sections/AtelierFooter';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      <Navigation />
      
      {/* Hero */}
      <div id="hero" />
      <HeroSection />

      <AtelierFooter />
    </div>
  );
}