import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1920&q=80" 
          alt="Jenny - Image Consultant" 
          className="w-full h-full object-cover object-top"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#5D4037]/40 z-10"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-[#FFFFFF] mt-12">
        <span className="font-sans text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold text-[#FFFFFF]/80 block mb-8">
          PERSONAL STYLIST • IMAGE CONSULTANT • PERSONAL BRAND STRATEGIST
        </span>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 font-medium leading-[1.1] drop-shadow-lg">
          Become the Best-Presented<br />
          <span className="italic">Version of Yourself.</span>
        </h1>
        
        <p className="font-sans text-base md:text-lg lg:text-xl text-[#FFFFFF]/90 leading-relaxed max-w-3xl mx-auto mb-12 drop-shadow-md font-light">
          Helping ambitious individuals build confidence, credibility, and a powerful personal presence through personal styling, wardrobe strategy, grooming, and image transformation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <Link href="/connect" className="bg-[#FFFFFF] text-[#5D4037] px-10 py-5 text-[11px] font-bold tracking-widest uppercase hover:bg-[#FFFFFF]/90 transition-colors shadow-xl w-full sm:w-auto">
            Book a Consultation
          </Link>
          <Link href="/transformations" className="border border-[#FFFFFF]/50 text-[#FFFFFF] px-10 py-5 text-[11px] font-bold tracking-widest uppercase hover:bg-[#FFFFFF] hover:text-[#5D4037] transition-colors w-full sm:w-auto">
            View Transformations
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-[#FFFFFF]/80 font-sans text-[11px] tracking-widest uppercase font-bold">
          <span className="flex items-center gap-3">
            <span className="text-[#A1887F] text-lg">✓</span>
            Personalized One-on-One Guidance
          </span>
          <span className="flex items-center gap-3">
            <span className="text-[#A1887F] text-lg">✓</span>
            Complete Image Transformation
          </span>
          <span className="flex items-center gap-3">
            <span className="text-[#A1887F] text-lg">✓</span>
            Tailored to Your Lifestyle & Goals
          </span>
        </div>
      </div>
    </section>
  );
}
