'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLightbox } from '@/components/ImageLightbox';

export default function GallerySection() {
  const { openLightbox } = useLightbox();

  const images = [
    { src: "/images/includes/IMG_0333.JPG.jpeg", title: "Atelier Editorial Look 01" },
    { src: "/images/includes/IMG_1418.JPG.jpeg", title: "Atelier Editorial Look 02" },
    { src: "/images/includes/IMG_1756.JPG.jpeg", title: "Atelier Editorial Look 03" }
  ];

  return (
    <section className="w-full bg-[#FAF9F6] text-[#1A1A1A] py-20 sm:py-32 border-t border-black/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6 pb-8 border-b border-black/10">
          <div>
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-black/50 block mb-3 font-semibold">
              ✦ EDITORIAL ARCHIVE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] tracking-tight leading-tight">
              Our Work
            </h2>
          </div>
          <Link 
            href="/lookbook" 
            className="font-mono text-[9px] tracking-[0.25em] text-[#1A1A1A] hover:text-black uppercase border-b border-black pb-1 transition-all font-medium"
          >
            View Full Gallery →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {images.map((img, idx) => (
            <div 
              key={idx}
              onClick={() => openLightbox(img.src, img.title)}
              className="relative w-full h-[85vh] md:h-[600px] lg:h-[700px] overflow-hidden group cursor-pointer bg-[#0D0D0D] border border-black/10 rounded-xs shadow-md"
              title="Click to view image"
            >
              <Image 
                src={img.src} 
                alt={img.title}
                fill
                className="object-cover object-top group-hover:scale-[1.03] transition-all duration-700 ease-out"
                unoptimized
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

