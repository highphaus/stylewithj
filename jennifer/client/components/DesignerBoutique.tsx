'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLightbox } from '@/components/ImageLightbox';

export default function DesignerBoutique() {
  const { openLightbox } = useLightbox();

  const products = [
    {
      num: '01',
      name: "The 'J' Monogram Tote",
      category: "Leather Goods",
      price: "₹2,10,000",
      img: "/images/includes/IMG_0330.JPG.jpeg"
    },
    {
      num: '02',
      name: "Silk Organza Trench",
      category: "Ready to Wear",
      price: "₹3,60,000",
      img: "/images/includes/IMG_8857.JPG.jpeg"
    },
    {
      num: '03',
      name: "Structural Cuff Ensemble",
      category: "Fine Jewelry",
      price: "₹1,50,000",
      img: "/images/includes/IMG_9158.JPG.jpeg"
    },
    {
      num: '04',
      name: "Architectural Silk Drape",
      category: "Couture",
      price: "₹2,85,000",
      img: "/images/includes/IMG_3119.JPG.jpeg"
    }
  ];

  return (
    <section className="py-20 sm:py-32 bg-[#FAF9F6] border-t border-black/15 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-black/10">
          <div>
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-black/50 block mb-3 font-semibold">
              ✦ LA BOUTIQUE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] tracking-tight leading-tight">
              Signature Pieces
            </h2>
          </div>
          <p className="font-serif text-sm sm:text-base text-black/60 font-light italic leading-relaxed max-w-md">
            A curated selection of iconic silhouettes, available directly from our New Delhi atelier.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((item) => (
            <div 
              key={item.num} 
              className="group flex flex-col bg-[#FAF8F3] border border-black/10 hover:border-black/30 transition-all duration-500 overflow-hidden rounded-xs shadow-xs"
            >
              <div 
                onClick={() => openLightbox(item.img, `${item.name} (${item.category})`)}
                className="relative aspect-[3/4] overflow-hidden bg-[#0D0D0D] cursor-pointer"
                title="Click to view image"
              >
                <Image 
                  src={item.img} 
                  alt={item.name} 
                  fill
                  className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="block text-center bg-black/85 text-white text-[8px] font-mono tracking-[0.2em] uppercase py-2 backdrop-blur-md rounded-xs border border-white/10">
                    Click to View Details
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between gap-3 text-left">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-black/40 font-bold block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-lg text-[#1A1A1A] font-light leading-snug group-hover:text-black/70 transition-colors">
                    {item.name}
                  </h4>
                </div>

                <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-black">{item.price}</span>
                  <Link
                    href="/connect"
                    className="font-mono text-[9px] tracking-[0.2em] uppercase font-semibold text-black hover:opacity-60 transition-opacity"
                  >
                    Inquire →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            href="/connect"
            className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold text-[#1A1A1A] border-b border-black pb-1 hover:text-black/60 hover:border-black/60 transition-colors inline-block"
          >
            Inquire For Atelier Boutique Curations →
          </Link>
        </div>

      </div>
    </section>
  );
}

