'use client';

import HeroSection from '@/components/sections/HeroSection';




// Import your new three-panel About Section
import AboutSection from '@/components/sections/AboutSection'; 
import CinematicPhilosophy from '@/components/sections/CinematicPhilosophy';
import AudienceGrid from '@/components/AudienceGrid';
import ServicesGrid from '@/components/ServicesGrid';
import Transformations from '@/components/Transformations';
import TransformationSlider from '@/components/TransformationSlider';

import MeetSection from '@/components/MeetSection';

import InsightsSection from '@/components/InsightsSection';
import AtelierConsultation from '@/components/sections/AtelierConsultation';

// Other remaining sections
import NarrativeHeader from '@/components/sections/NarrativeHeader';
import SplitScroll from '@/components/sections/SplitScroll';
import AtelierStory from '@/components/sections/AtelierStory';
import ClientShowcase from '@/components/sections/ClientShowcase';
import AtelierCanvas from '@/components/sections/AtelierCanvas';
import LookbookHorizon from '@/components/sections/LookbookHorizon';
import LookbookGrid from '@/components/sections/LookbookGrid';
import AtelierToile from '@/components/sections/AtelierToile';
import AvantGardeShowcase from '@/components/sections/AvantGardeShowcase';
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
      
      {/* 1. Hero */}
      <div id="hero" />
      <HeroSection />
     

      {/* 1.5. Brand Intro Split Section (Added right next to Hero) */}
      <AboutSection />

      <main className="relative z-20">
        {/* 2. The Philosophy */}
        <div id="philosophy" />
        <CinematicPhilosophy />

        {/* 3. Who We Help */}
        <div id="who-we-help" />
        <AudienceGrid />

        {/* 4. Services */}
        <div id="services" />
        <ServicesGrid />

        {/* 5. Transformations */}
        <div id="transformations" />
        <Transformations />
        <TransformationSlider />

        {/* 6. About Jenny */}
        <div id="about" />
        <MeetSection />

        {/* 7. Testimonials */}
        <div id="testimonials" />
        <InfiniteMarquee />
        

        {/* 8. Insights */}
        <div id="insights" />
        <InsightsSection />

        {/* 9. Book Consultation */}
        <div id="book" />
        <AtelierConsultation />

        {/* --- All remaining sections --- */}
        <NarrativeHeader />
        <SplitScroll />
        <AtelierStory />
        <ClientShowcase />
        <AtelierCanvas />
        <LookbookHorizon />
        <ExhibitionShowcase/>
        <ConstructionLedger/>
        <FabricPhysicsLab/>
        <LookbookGrid/>
        <AtelierToile />
        <AvantGardeShowcase />
        
      </main>
      <AtelierFooter />
    </div>
  );
}