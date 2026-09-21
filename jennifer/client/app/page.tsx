'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import ServicesGrid from '@/components/ServicesGrid';
import Transformations from '@/components/Transformations';
import AtelierFooter from '@/components/sections/AtelierFooter';

export default function Home() {
  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] min-h-screen font-sans antialiased selection:bg-black selection:text-white relative">
      <Navigation />
      
      {/* 1. Hero Section */}
      <div id="hero" />
      <HeroSection />

      {/* 2. Services Section (What We Do) */}
      <div id="services" />
      <ServicesGrid />

      {/* 3. Transformations */}
      <div id="transformations" />
      <Transformations hideButton={true} />

      {/* 4. Footer with Makeover CTA */}
      <AtelierFooter />
    </div>
  );
}