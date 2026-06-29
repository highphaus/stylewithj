'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const allServices = [
  { 
    num: "01",
    category: "Styling & Curation",
    name: "Personal Styling Session", 
    desc: "A bespoke evaluation of your lifestyle, mapping out an elevated aesthetic blueprint that completely streamlines how you get dressed.",
    image: "/images/img07.jpeg"
  },
  { 
    num: "02",
    category: "Styling & Curation",
    name: "Wardrobe Strategy", 
    desc: "An intentional restructuring of your existing closet ecosystem. Sifting, organizing, and developing seasonal capsule looks.",
    image: "/images/img06.jpeg"
  },
  { 
    num: "03",
    category: "Styling & Curation",
    name: "Special Event Styling", 
    desc: "Exclusive sartorial architectural building for public presentations, galas, red carpets, or high-profile milestone events.",
    image: "/images/img05.jpeg"
  },
  { 
    num: "04",
    category: "Identity & Consulting",
    name: "Personal Branding Audit", 
    desc: "Aligning your outward professional appearance with executive prestige, company leadership value systems, and media optics.",
    image: "/images/img04.jpeg"
  },
  { 
    num: "05",
    category: "Identity & Consulting",
    name: "Color Analysis", 
    desc: "A deep clinical tonal breakdown mapping skin, eye, and contrast points to pinpoint your absolute premium color palette spectrum.",
    image: "/images/img08.jpeg"
  },
  { 
    num: "06",
    category: "Identity & Consulting",
    name: "Complete Transformation", 
    desc: "The ultimate signature identity overhaul. An immersive, custom lifestyle consulting package tailored for a complete life evolution.",
    image: "/images/img09.jpeg"
  }
];

interface CardProps {
  item: typeof allServices[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function ServiceCard({ item, index, total, scrollYProgress }: CardProps) {
  const start = index / total;
  const end = (index + 1) / total;

  const exitStart = (index + 1) / total - 0.08;
  const exitEnd = (index + 1) / total;

  const x = useTransform(
    scrollYProgress,
    index === total - 1 
      ? [0, 1] 
      : [0, Math.max(0, exitStart), Math.min(1, exitEnd), 1],
    index === total - 1
      ? ["0%", "0%"]
      : ["0%", "0%", "-105%", "-105%"]
  );

  const scale = useTransform(
    scrollYProgress,
    index === total - 1
      ? [0, 1]
      : [0, Math.max(0, exitStart), Math.min(1, exitEnd), 1],
    index === total - 1
      ? [1, 1]
      : [1, 1, 0.96, 0.96]
  );

  return (
    <motion.div 
      style={{ x, scale, zIndex: total - index }}
      className="absolute inset-0 w-full h-full bg-black will-change-transform"
    >
      {/* TRUE FULL-HEIGHT PORTRAIT FRAME */}
      <div className="relative w-full h-full bg-black overflow-hidden">
        <Image 
          src={item.image} 
          alt={item.name} 
          fill
          className="object-cover object-center scale-100 transition-transform duration-1000 ease-out"
          priority={index === 0}
          unoptimized
        />
        
        {/* EDITORIAL REVENUE OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 lg:via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-8 lg:p-20 select-none text-white">
          <div className="w-full max-w-2xl flex flex-col lg:flex-row lg:items-end justify-between gap-2 lg:gap-6">
            
            <div className="max-w-md">
              <h3 className="font-satoshi text-lg sm:text-2xl lg:text-3xl font-light tracking-wide uppercase mb-1 sm:mb-2 text-white leading-tight">
                {item.name}
              </h3>
              <p className="text-[10px] sm:text-xs lg:text-sm text-white/80 font-light leading-relaxed tracking-wide">
                {item.desc}
              </p>
            </div>

            <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 lg:gap-0 flex-shrink-0 mt-3 lg:mt-0">
              <span className="text-[7px] sm:text-[9px] tracking-[0.25em] uppercase font-sans font-light text-white/60 lg:mb-1">
                {item.category}
              </span>
              <span className="font-satoshi text-sm sm:text-lg italic font-light text-white/40">
                0{item.num}
              </span>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesGrid() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  return (
    <section ref={targetRef} className="relative h-[600vh] bg-[#FAF9F6]">
      
      {/* STICKY CONTAINER VIEWPORT */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center">
        
        {/* ── SOLID TEXT PANEL MASK (Top on Mobile, Left on Desktop) ── */}
        <div className="
          absolute top-0 left-0 right-0 z-50 bg-[#FAF9F6] flex flex-col justify-center
          px-6 sm:px-12 h-[35vh] sm:h-[40vh] border-b border-black/5
          lg:bottom-0 lg:right-auto lg:h-full lg:w-[540px] lg:pl-24 lg:pr-16 lg:border-r lg:border-b-0
          pointer-events-auto
        ">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.5em] uppercase font-light text-black/40 font-sans mt-4 lg:mt-0">
              03 // REPERTOIRE
            </span>
            <div className="hidden sm:block w-12 h-[1px] bg-black/15" />
          </div>
          
          <h2 className="font-satoshi text-3xl sm:text-5xl lg:text-7xl font-light tracking-tight text-[#1A1A1A] leading-[1.1] mb-2 sm:mb-6">
            What <span className="lg:block hidden"></span>We Do
          </h2>
          
          <p className="text-[10px] sm:text-xs font-sans font-light tracking-wide text-black/50 max-w-xs leading-relaxed border-l border-black/20 pl-3 sm:pl-4">
            Custom structural image design and strategic styling consultation built for the discerning modern profile.
          </p>
        </div>

        {/* ── CARD PORTRAIT CANVAS FIELD (Bottom on Mobile, Right on Desktop) ── */}
        <div className="w-full h-full relative z-20 pt-[35vh] sm:pt-[40vh] lg:pt-0 lg:pl-[540px]">
          {/* Container bg-black prevents visual seams */}
          <div className="relative w-full h-full overflow-hidden bg-black">
            
            {allServices.map((item, i) => (
              <ServiceCard 
                key={i} 
                item={item} 
                index={i} 
                total={allServices.length} 
                scrollYProgress={scrollYProgress}
              />
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}