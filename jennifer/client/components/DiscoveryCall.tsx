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

      {/* Centered Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-[#FFFFFF] mb-12 font-medium leading-snug uppercase tracking-wide drop-shadow-md">
          Elevate Your Aesthetic and Command Every Room You Enter
        </h2>
        <Link href="/connect" className="cursor-pointer bg-[#FFFFFF] text-[#5D4037] px-10 py-5 text-[11px] font-bold tracking-widest uppercase hover:bg-gray-100 transition-colors inline-flex items-center gap-4 shadow-lg">
          BOOK YOUR COMPLIMENTARY CONSULTATION
        </Link>
      </div>
    </section>
  );
}
