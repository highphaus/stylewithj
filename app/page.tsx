// src/app/page.tsx
'use client';

import HeroSection from '@/components/sections/HeroSection';
import SplitScroll from '@/components/sections/SplitScroll';
import AtelierStory from '@/components/sections/AtelierStory';
import AtelierFooter from '@/components/sections/AtelierFooter';
import CustomCursor from '@/components/ui/CustomCursor';

export default function Home() {
  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      
      {/* Global Interface Interactions */}
      <CustomCursor />
      
      {/* 1. Full-Bleed Parallax Landing */}
      <HeroSection />

      <main className="relative z-20">
        {/* 2. Pure YSL Split-Scrolling Mechanic */}
        <SplitScroll />

        {/* 3. Studio Brand Narrative */}
        <AtelierStory />
      </main>

      {/* 4. Minimal Closing Gateway */}
      <AtelierFooter />
      
    </div>
  );
}