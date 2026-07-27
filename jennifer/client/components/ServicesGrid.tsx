'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

const allServices = [
  { 
    num: "01",
    category: "Styling & Curation",
    name: "Personal Styling Session", 
    desc: "A bespoke evaluation of your lifestyle, mapping out an elevated aesthetic blueprint that completely streamlines how you get dressed.",
    image: "/images/img18.jpeg"
  },
  { 
    num: "02",
    category: "Styling & Curation",
    name: "Wardrobe Strategy", 
    desc: "An intentional restructuring of your existing closet ecosystem. Sifting, organizing, and developing seasonal capsule looks.",
    image: "/images/img19.jpeg"
  },
  { 
    num: "03",
    category: "Styling & Curation",
    name: "Special Event Styling", 
    desc: "Exclusive sartorial architectural building for public presentations, galas, red carpets, or high-profile milestone events.",
    image: "/images/img20.jpeg"
  },
  { 
    num: "04",
    category: "Identity & Consulting",
    name: "Personal Branding Audit", 
    desc: "Aligning your outward professional appearance with executive prestige, company leadership value systems, and media optics.",
    image: "/images/img21.jpeg"
  },
  { 
    num: "05",
    category: "Identity & Consulting",
    name: "Color Analysis", 
    desc: "A deep clinical tonal breakdown mapping skin, eye, and contrast points to pinpoint your absolute premium color palette spectrum.",
    image: "/images/img22.jpeg"
  },
  { 
    num: "06",
    category: "Identity & Consulting",
    name: "Complete Transformation", 
    desc: "The ultimate signature identity overhaul. An immersive, custom lifestyle consulting package tailored for a complete life evolution.",
    image: "/images/img23.jpeg"
  }
];

interface CardProps {
  item: typeof allServices[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function ServiceCard({ item, index, total, scrollYProgress }: CardProps) {
  const activeTotal = total - 1;
  const isLastCard = index === total - 1;
  
  const start = index / activeTotal;
  const end = (index + 1) / activeTotal;
  const hold = start + (end - start) * 0.65; // Hold static for 65% of scroll segment

  const x = useTransform(
    scrollYProgress,
    isLastCard 
      ? [0, 1] 
      : [0, start, hold, end],
    isLastCard
      ? ["0%", "0%"]
      : ["0%", "0%", "0%", "-105%"]
  );

  const scale = useTransform(
    scrollYProgress,
    isLastCard
      ? [0, 1]
      : [0, start, hold, end],
    isLastCard
      ? [1, 1]
      : [1, 1, 1, 0.96]
  );

  return (
    <motion.div 
      style={{ x, scale, zIndex: total - index }}
      className="absolute inset-0 w-full h-full bg-black will-change-transform"
    >
      {/* TRUE FULL-HEIGHT PORTRAIT FRAME FOR DESKTOP */}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-8 lg:p-20 pb-20 lg:pb-28 select-none text-white">
          <div className="w-full max-w-xl">
            <h3 className="font-serif text-2xl lg:text-4xl font-light tracking-wide uppercase mb-3 text-white leading-tight">
              {item.name}
            </h3>
            <p className="font-sans text-xs lg:text-sm text-white/90 font-light leading-relaxed tracking-wide">
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface ServicesGridProps {
  hideButton?: boolean;
}

export default function ServicesGrid({ hideButton = false }: ServicesGridProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Smooth the scroll position with spring physics (damping & stiffness)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.001
  });

  return (
    <div id="services" className="relative w-full bg-[#FAF9F6]">
      
      {/* ── 1. MOBILE EXCLUSIVE VIEW (block lg:hidden): Clean Editorial Service Cards Stack ── */}
      <div className="block lg:hidden w-full py-12 px-4 sm:px-8 bg-[#FAF9F6]">
        {/* Mobile Section Header */}
        <div className="max-w-md mx-auto mb-10 text-left">
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-[#1A1A1A] mb-3">
            What We Do
          </h2>
          <p className="text-xs font-sans font-light tracking-wide text-black/65 leading-relaxed border-l-2 border-black/20 pl-3">
            Custom structural image design and strategic styling consultation built for the discerning modern profile.
          </p>
        </div>

        {/* Stack of Spacious Integrated Mobile Service Cards */}
        <div className="flex flex-col gap-10 max-w-md mx-auto">
          {allServices.map((service, idx) => (
            <div 
              key={idx} 
              className="flex flex-col bg-[#FAF8F3] border border-black/10 p-5 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.02)] rounded-sm"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EAE8E3] border border-black/5 shadow-xs rounded-[1px] mb-5">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover object-center"
                  unoptimized
                />
              </div>

              {/* Service Writing Details */}
              <div className="flex flex-col text-left">
                <h3 className="font-serif text-xl tracking-wide font-normal text-[#1A1A1A] uppercase mb-2.5 leading-tight">
                  {service.name}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-black/75 leading-relaxed font-light">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. DESKTOP EXCLUSIVE VIEW (hidden lg:block): Sticky Horizontal Flight Scroll ── */}
      <section ref={targetRef} className="hidden lg:block relative h-[480vh] bg-[#FAF9F6]">
        
        {/* STICKY CONTAINER VIEWPORT */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          
          {/* ── SOLID TEXT PANEL MASK (Left on Desktop) ── */}
          <div className="
            absolute top-0 bottom-0 left-0 z-50 bg-[#FAF9F6] flex flex-col justify-center
            h-full w-[540px] pl-24 pr-16 border-r border-black/10
            pointer-events-auto
          ">
            <h2 className="font-serif text-5xl lg:text-7xl font-light tracking-tight text-[#1A1A1A] leading-[1.1] mb-6">
              What <span className="block"></span>We Do
            </h2>
            
            <p className="text-xs font-sans font-light tracking-wide text-black/60 max-w-xs leading-relaxed border-l border-black/20 pl-4">
              Custom structural image design and strategic styling consultation built for the discerning modern profile.
            </p>
          </div>

          {/* ── CARD PORTRAIT CANVAS FIELD (Right on Desktop) ── */}
          <div className="w-full h-full relative z-20 pl-[540px]">
            {/* Container bg-black prevents visual seams */}
            <div className="relative w-full h-full overflow-hidden bg-black">
              
              {allServices.map((item, i) => (
                <ServiceCard 
                  key={i} 
                  item={item} 
                  index={i} 
                  total={allServices.length} 
                  scrollYProgress={smoothProgress}
                />
              ))}

            </div>
          </div>

          {/* Unified Floating Skip Button */}
          {!hideButton && (
            <div className="absolute bottom-6 right-6 z-30">
              <button
                onClick={() => {
                  document.getElementById('horizon')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-black/85 hover:bg-black text-white text-[9px] tracking-[0.2em] uppercase font-light rounded-full border border-white/10 shadow-lg transition-all duration-300 hover:scale-105"
              >
                Skip ↓
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}