'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLightbox } from '@/components/ImageLightbox';

export default function AtelierCraft() {
  const { openLightbox } = useLightbox();

  return (
    <section className="py-20 sm:py-32 bg-[#FAF9F6] border-t border-black/15 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-8">
            <div>
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-black/50 block mb-3 font-semibold">
                ✦ THE MUMBAI KARKHANA
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] tracking-tight leading-tight">
                Heritage & <br />Master Karigars
              </h2>
            </div>
            
            <p className="font-sans text-xs sm:text-sm font-light text-black/80 leading-relaxed max-w-lg">
              Every bridal heirloom is conceived as a piece of art. Hand-embroidered in our studio by master karigars dedicating thousands of hours to perfection, our textiles weave stories of Indian heritage, Zardosi, and intricate handloom techniques.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-black/10">
              <div>
                <span className="block text-3xl sm:text-4xl font-serif font-light text-[#1A1A1A] mb-1">3000+</span>
                <span className="text-[9px] font-mono tracking-widest text-black/50 uppercase font-semibold">Hours per Silhouette</span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-serif font-light text-[#1A1A1A] mb-1">120</span>
                <span className="text-[9px] font-mono tracking-widest text-black/50 uppercase font-semibold">Master Artisans</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/connect"
                className="font-mono text-[9px] tracking-[0.25em] text-[#1A1A1A] hover:text-black uppercase border-b border-black pb-1 transition-all font-semibold"
              >
                Discover The Process →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div 
              onClick={() => openLightbox('/images/DSC07159.jpg', 'Heritage & Master Karigars')}
              className="relative w-full h-[85vh] sm:h-[600px] lg:h-[700px] bg-[#0D0D0D] overflow-hidden rounded-xs border border-black/10 shadow-md cursor-pointer group"
              title="Click to view image"
            >
              <Image 
                src="/images/DSC07159.jpg" 
                alt="Indian Craftsmanship and Embroidery" 
                fill
                className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

