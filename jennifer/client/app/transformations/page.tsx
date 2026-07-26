import React from 'react';
import Navigation from '@/components/Navigation';
import Transformations from '@/components/Transformations';
import AtelierFooter from '@/components/sections/AtelierFooter';

export default function TransformationsPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1A1A1A] font-sans antialiased selection:bg-black selection:text-white scroll-smooth">
      <Navigation />
      
      <main>
        <header className="pt-32 pb-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-black/10 text-center">
          <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-black/40 block mb-4 font-semibold">
            ✦ PORTFOLIO // EVOLUTIONS
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-none text-black">
            Transformations
          </h1>
          <p className="font-serif text-lg sm:text-xl text-black/55 font-light italic leading-relaxed mt-6 max-w-2xl mx-auto">
            A visual ledger of shape balancing, outline corrections, and tailored posture alterations.
          </p>
        </header>
        <Transformations hideButton={true} isStatic={false} />
      </main>

      <AtelierFooter />
    </div>
  );
}
