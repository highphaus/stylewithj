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
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-16 lg:p-20 select-none text-white">
          <div className="w-full max-w-2xl flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            
            <div className="max-w-md">
              <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide uppercase mb-2 text-white">
                {item.name}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed tracking-wide">
                {item.desc}
              </p>
            </div>

            <div className="flex flex-col sm:items-end flex-shrink-0">
              <span className="text-[9px] tracking-[0.25em] uppercase font-sans font-light text-white/60 mb-1">
                {item.category}
              </span>
              <span className="font-serif text-lg italic font-light text-white/40">
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
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* ── SOLID LEFT PANEL MASK ── */}
        <div className="absolute left-0 top-0 bottom-0 z-50 bg-[#FAF9F6] flex flex-col justify-center pl-8 md:pl-16 lg:pl-24 pr-16 w-[340px] sm:w-[440px] lg:w-[540px] border-r border-black/5 pointer-events-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] tracking-[0.5em] uppercase font-light text-black/40 font-sans">
              03 // REPERTOIRE
            </span>
            <div className="w-12 h-[1px] bg-black/15" />
          </div>
          
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#1A1A1A] leading-[1.0] mb-6">
            What <br />We Do
          </h2>
          
          <p className="text-xs font-sans font-light tracking-wide text-black/50 max-w-xs leading-relaxed border-l border-black/20 pl-4">
            Custom structural image design and strategic styling consultation built for the discerning modern profile.
          </p>
        </div>

        {/* ── CARD PORTRAIT CANVAS FIELD ── */}
        <div className="w-full h-full relative z-20 pl-[340px] sm:pl-[440px] lg:pl-[540px]">
          {/* Changed container to bg-black so if a rendering seam ever tries to drop, it drops dark instead of white */}
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