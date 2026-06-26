import React from 'react';
import Link from 'next/link';

export default function DiscoveryCall() {
  return (
    <section className="relative py-32 px-6 lg:px-12 flex flex-col items-center justify-center min-h-[500px]">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1600&q=80" 
          alt="Fashion Consultation" 
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="text-center z-10 max-w-3xl px-6">
        <h2 className="font-serif text-4xl md:text-6xl mb-8 font-medium text-[#FFFFFF] drop-shadow-md">
          Ready to Elevate Your Image?
        </h2>
        <div className="font-sans text-base text-[#FFFFFF]/80 leading-relaxed max-w-xl mx-auto mb-12 drop-shadow-sm space-y-4">
          <p>Your appearance should support your ambitions, not hold them back.</p>
          <p>Book a personalized consultation and take the first step toward becoming the best-presented version of yourself.</p>
        </div>
        <Link href="/connect" className="bg-[#FFFFFF] text-[#5D4037] px-10 py-5 text-[11px] font-bold tracking-widest uppercase hover:bg-[#FFFFFF]/90 transition-colors shadow-xl inline-flex items-center gap-4">
          Book Your Consultation
          <span className="text-lg leading-none">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
