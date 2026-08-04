import React from 'react';
import Navigation from '@/components/Navigation';
import Transformations from '@/components/Transformations';
import AtelierFooter from '@/components/sections/AtelierFooter';

export default function TransformationsPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1A1A1A] font-sans antialiased selection:bg-black selection:text-white scroll-smooth">
      <Navigation />
      
      <main>
        <header className="pt-32 sm:pt-40 pb-10 sm:pb-16 px-4 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-black/10 text-center">
          <h1 className="font-serif text-3xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-none text-black">
            Transformations
          </h1>
          <p className="font-serif text-sm sm:text-xl text-black/60 font-light italic leading-relaxed mt-4 sm:mt-6 max-w-2xl mx-auto">
            A visual ledger of shape balancing, outline corrections, and tailored posture alterations.
          </p>
        </header>
        <Transformations hideButton={true} />
      </main>

      <AtelierFooter />
    </div>
  );
}
