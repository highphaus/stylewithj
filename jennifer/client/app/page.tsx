// src/app/page.tsx
'use client';

import HeroSection from '@/components/sections/HeroSection';
import NarrativeHeader from '@/components/sections/NarrativeHeader';
import SplitScroll from '@/components/sections/SplitScroll';
import AtelierStory from '@/components/sections/AtelierStory';
import ClientShowcase from '@/components/sections/ClientShowcase';
import AtelierCanvas from '@/components/sections/AtelierCanvas';
import AtelierConsultation from '@/components/sections/AtelierConsultation';
import LookbookHorizon from '@/components/sections/LookbookHorizon';
import LookbookGrid from '@/components/sections/LookbookGrid';
import AtelierToile from '@/components/sections/AtelierToile'; // ← IMPORT NEW FEATURE
import InfiniteMarquee from '@/components/sections/InfiniteMarquee';
import AtelierFooter from '@/components/sections/AtelierFooter';
import Navigation from '@/components/Navigation';
import ExhibitionShowcase from '@/components/sections/ExhibitionShowcase';
import ConstructionLedger from '@/components/sections/ConstructionLedger';
import FabricPhysicsLab from '@/components/sections/FabricPhysicsLab';

export default function Home() {
  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      <Navigation />
      <HeroSection />
      <main className="relative z-20">
        <NarrativeHeader />
        <SplitScroll />
        <AtelierStory />
        <ClientShowcase />
        <AtelierCanvas />
        <AtelierConsultation />
        <LookbookHorizon />
        <ExhibitionShowcase/>
        <ConstructionLedger/>
        <FabricPhysicsLab/>
        <LookbookGrid/>
        {/* The New Haute Couture Prototype Analysis Studio */}
        <AtelierToile />
        
        <InfiniteMarquee />
      </main>
      <AtelierFooter />
    </div>
  );
}