'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLightbox } from '@/components/ImageLightbox';

export default function DesignerProfile() {
  const { openLightbox } = useLightbox();

  return (
    <section className="py-20 sm:py-32 bg-[#FAF9F6] border-t border-black/15 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Editorial Image Block */}
        <div className="lg:col-span-5 relative">
          <div 
            onClick={() => openLightbox('/images/includes/IMG_0267.JPG.jpeg', 'Designer Ethos & Atelier Legacy')}
            className="relative w-full h-[85vh] sm:h-[600px] lg:h-[700px] bg-[#0D0D0D] overflow-hidden rounded-xs border border-black/10 shadow-md cursor-pointer group"
            title="Click to view image"
          >
            <Image
              src="/images/includes/IMG_0267.JPG.jpeg"
              alt="Designer Profile"
              fill
              className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right Side: Ethos Details */}
        <div className="lg:col-span-7 space-y-6">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-black/50 block font-semibold">
            ✦ THE DESIGNER ETHOS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-tight tracking-tight">
            &ldquo;Bridal couture is the physical manifestation of cultural legacy and internal grace.&rdquo;
          </h2>
          <div className="h-[1px] w-12 bg-black/30 my-4" />
          <p className="font-sans text-xs sm:text-sm text-black/80 leading-relaxed font-light">
            With over a decade navigating the weaving clusters of Banaras and Kanchipuram, Jennifer founded the Atelier around a single rule: fashion should be a modern architectural revival of ancient textiles.
          </p>
          <p className="font-sans text-xs sm:text-sm text-black/80 leading-relaxed font-light">
            By merging the structural discipline of modern silhouettes with the intricate decadence of Zardosi and Chikankari, her clients don’t just look polished—they enter spaces with an anchored, unshakeable royal aura.
          </p>
          
          <div className="pt-6 border-t border-black/10 grid grid-cols-2 gap-6 text-[#1A1A1A]">
            <div>
              <h4 className="font-serif font-light text-xl text-black">Banaras & Kanchipuram</h4>
              <p className="font-mono text-[9px] text-black/50 uppercase tracking-wider mt-1 font-semibold">Handloom Sourcing Networks</p>
            </div>
            <div>
              <h4 className="font-serif font-light text-xl text-black">Bespoke Heritage</h4>
              <p className="font-mono text-[9px] text-black/50 uppercase tracking-wider mt-1 font-semibold">Zero Mass Manufacture</p>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1A1A1A] text-white text-[9px] font-mono tracking-[0.25em] uppercase hover:bg-black transition-all rounded-xs shadow-sm"
            >
              Book Personal Styling →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}