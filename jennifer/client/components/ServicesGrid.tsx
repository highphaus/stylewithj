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
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 lg:via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-8 lg:p-20 select-none text-white">
          <div className="w-full max-w-xl">
            <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-light tracking-wide uppercase mb-2 text-white leading-tight">
              {item.name}
            </h3>
            <p className="font-sans text-xs lg:text-sm text-white/85 font-light leading-relaxed tracking-wide">
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
    <section ref={targetRef} className="relative h-[480vh] bg-[#FAF9F6]">
      
      {/* STICKY CONTAINER VIEWPORT */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* ── SOLID TEXT PANEL MASK (Top on Mobile, Left on Desktop) ── */}
        <div className="
          absolute top-0 left-0 right-0 z-50 bg-[#FAF9F6] flex flex-col justify-center
          px-6 sm:px-12 h-[36vh] sm:h-[40vh] border-b border-black/5
          lg:bottom-0 lg:right-auto lg:h-full lg:w-[540px] lg:pl-24 lg:pr-16 lg:border-r lg:border-b-0
          pointer-events-auto
        ">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-light tracking-tight text-[#1A1A1A] leading-[1.1] mb-2 sm:mb-6">
            What <span className="lg:block hidden"></span>We Do
          </h2>
          
          <p className="text-[11px] sm:text-xs font-sans font-light tracking-wide text-black/60 max-w-xs leading-relaxed border-l border-black/20 pl-3 sm:pl-4">
            Custom structural image design and strategic styling consultation built for the discerning modern profile.
          </p>
        </div>

        {/* ── CARD PORTRAIT CANVAS FIELD (Bottom on Mobile, Right on Desktop) ── */}
        <div className="w-full h-full relative z-20 pt-[36vh] sm:pt-[40vh] lg:pt-0 lg:pl-[540px]">
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

        {/* Unified Floating Skip Button (Tucked neatly to the bottom right side of the screen) */}
        {!hideButton && (
          <div className="absolute bottom-6 right-4 sm:right-6 z-30">
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
  );
}