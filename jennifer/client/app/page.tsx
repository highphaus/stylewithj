'use client';

import HeroSection from '@/components/sections/HeroSection';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] h-screen overflow-hidden font-sans antialiased selection:bg-black selection:text-white relative">
      <Navigation />
      
      {/* Hero */}
      <div id="hero" />
      <HeroSection />
    </div>
  );
}