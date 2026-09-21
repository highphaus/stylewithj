import React from 'react';
import Navigation from '@/components/Navigation';
import GalleryGrid from '@/components/sections/GalleryGrid';
import AtelierFooter from '@/components/sections/AtelierFooter';

export default function LookbookPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      <Navigation />
      
      <main className="pt-16">
        {/* Render Gallery Section */}
        <GalleryGrid />
      </main>

      <AtelierFooter />
    </div>
  );
}
