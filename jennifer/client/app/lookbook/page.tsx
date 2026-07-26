import React from 'react';
import Navigation from '@/components/Navigation';
import LookbookGrid from '@/components/sections/LookbookGrid';
import GalleryGrid from '@/components/sections/GalleryGrid';
import AtelierFooter from '@/components/sections/AtelierFooter';

export default function LookbookPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      <Navigation />
      
      <main className="pt-16">
        {/* Render Gallery Section */}
        <GalleryGrid />
        
        {/* Divider separator */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 my-16">
          <div className="h-px bg-black/10 w-full" />
        </div>

        {/* Render Lookbook Section */}
        <LookbookGrid />
      </main>

      <AtelierFooter />
    </div>
  );
}
