// src/app/page.tsx
'use client';

import HeroSection from '@/components/sections/HeroSection';
import NarrativeHeader from '@/components/sections/NarrativeHeader';
import SplitScroll from '@/components/sections/SplitScroll';
import AtelierStory from '@/components/sections/AtelierStory';
import ClientShowcase from '@/components/sections/ClientShowcase';
import InfiniteMarquee from '@/components/sections/InfiniteMarquee'; // ← IMPORT NEW COMPONENT
import AtelierFooter from '@/components/sections/AtelierFooter';

export default function Home() {
  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      
      <HeroSection />

      <main className="relative z-20">
        <NarrativeHeader />
        <SplitScroll />
        <AtelierStory />
        <ClientShowcase />
        
        {/* The Live High-Density Photo Flex */}
        <InfiniteMarquee />
        
      </main>

      <AtelierFooter />
      
    </div>
  );
}