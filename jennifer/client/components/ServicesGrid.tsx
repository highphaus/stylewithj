'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring, useMotionValueEvent, MotionValue } from 'framer-motion';
import { useLightbox } from '@/components/ImageLightbox';
import { useSiteData } from '@/lib/use-site-data';

interface ServiceItem {
  num: string;
  category: string;
  name: string;
  desc: string;
  image: string;
  bgGradient: string;
}

const allServices: ServiceItem[] = [
  {
    num: "01",
    category: "Full Image Strategy",
    name: "Executive & Signature Styling",
    desc: "Complete wardrobe transformation for high-profile individuals, executives, and leaders needing authentic commanding presence.",
    image: "/images/includes/IMG_0271.JPG.jpeg",
    bgGradient: "from-stone-900/60 to-black/80",
  },
  {
    num: "02",
    category: "Specialized Curation",
    name: "Occasion & Event Styling",
    desc: "Exquisite styling for red carpets, galas, weddings, photo shoots, and high-visibility public appearances.",
    image: "/images/CIT09345.jpg",
    bgGradient: "from-[#1a1816]/70 to-[#0c0b0a]/90",
  },
  {
    num: "03",
    category: "Wardrobe System",
    name: "Capsule Wardrobe Architecture",
    desc: "Decluttering, organizing, and building a streamlined, versatile capsule wardrobe aligned with your daily lifestyle.",
    image: "/images/includes/IMG_1406.JPG.jpeg",
    bgGradient: "from-[#1c1917]/60 to-[#0a0a0a]/85",
  },
  {
    num: "04",
    category: "VIP Procurement",
    name: "Personal Shopping & Sourcing",
    desc: "Exclusive access to rare luxury pieces, custom garments, and curated collections tailored precisely to your proportions.",
    image: "/images/includes/IMG_3112.JPG.jpeg",
    bgGradient: "from-[#181615]/70 to-black/90",
  },
];

interface ServicesGridProps {
  hideButton?: boolean;
}

function ServiceCard({ 
  item, 
  index, 
  total,
  scrollYProgress 
}: { 
  item: ServiceItem; 
  index: number; 
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const { openLightbox } = useLightbox();

  return (
    <motion.div
      style={{
        opacity: scrollYProgress,
      }}
      className="absolute inset-0 w-full h-full flex items-center justify-center p-8 md:p-12 lg:p-16"
    >
      <div 
        onClick={() => openLightbox(item.image, item.name)}
        className="relative w-full h-full max-w-5xl rounded-xs overflow-hidden shadow-2xl group cursor-pointer border border-black/15 bg-black"
        title="Click to view full image"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
          priority={index === 0}
          unoptimized
        />

        <div className={`absolute inset-0 bg-gradient-to-t ${item.bgGradient} via-black/20 to-transparent opacity-80`} />
        
        <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 text-white flex flex-col gap-3 z-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/75 font-semibold bg-white/15 backdrop-blur-md px-3 py-1 rounded-xs border border-white/20">
              ✦ {item.num} // {item.category}
            </span>
          </div>

          <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-wide text-white drop-shadow-md">
            {item.name}
          </h3>

          <p className="font-sans text-sm md:text-base text-white/90 font-light leading-relaxed max-w-xl drop-shadow-sm">
            {item.desc}
          </p>

          <div className="pt-2 flex items-center gap-4">
            <span className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] text-white/90 uppercase border-b border-white/40 pb-0.5 group-hover:border-white transition-all font-semibold">
              Click To View Portrait →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesGrid({ hideButton }: ServicesGridProps = {}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { openLightbox } = useLightbox();
  const { services: dynamicServices } = useSiteData();
  
  const servicesList = dynamicServices && dynamicServices.length > 0 
    ? dynamicServices.map((s, idx) => ({
        num: `0${idx + 1}`,
        category: s.category,
        name: s.name,
        desc: s.desc,
        image: s.image,
        bgGradient: allServices[idx % allServices.length].bgGradient,
      }))
    : allServices;

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.001
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const idx = Math.min(
      servicesList.length - 1,
      Math.max(0, Math.floor(latest * servicesList.length))
    );
    setActiveIndex(idx);
  });

  const currentService = servicesList[activeIndex] || servicesList[0];

  return (
    <div id="services" className="relative w-full bg-[#FAF9F6] border-b border-black/15">
      
      {/* ── MOBILE / SMALL DEVICE LAYOUT (PHOTO FIRST TOUCHING HEADER DIVIDING LINE -> WRITING DIRECTLY UNDER PHOTO) ── */}
      <div className="block lg:hidden bg-[#FAF9F6] w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-black/10 bg-[#FAF9F6]">
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-[#1A1A1A]">
            What We Do
          </h2>
        </div>

        {/* Stacked Images Down-by-Down: Cover Image FIRST touching header line -> Writing DIRECTLY UNDER Cover Image */}
        <div className="flex flex-col bg-[#FAF9F6] divide-y divide-black/10">
          {servicesList.map((item) => (
            <div key={item.num} className="w-full flex flex-col bg-[#FAF9F6] pb-8">
              
              {/* 1. FULL BLEED COVER IMAGE DIRECTLY TOUCHING THE TOP DIVIDING LINE WITH 0 GAP */}
              <div 
                onClick={() => openLightbox(item.image, item.name)}
                className="relative w-full h-[80vh] min-h-[460px] bg-[#0D0D0D] overflow-hidden cursor-pointer group flex-shrink-0"
                title="Click to view image"
              >
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill
                  className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xs text-[8px] tracking-[0.3em] uppercase font-mono font-semibold border border-white/10">
                  ✦ {item.num} // {item.category}
                </div>
              </div>

              {/* 2. CAPTION / WRITING DIRECTLY UNDER THE IMAGE */}
              <div className="px-6 pt-6 flex flex-col gap-2.5 bg-[#FAF9F6]">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/45 font-bold block">
                  {item.category}
                </span>

                <h3 className="font-serif text-2xl font-light tracking-wide text-[#1A1A1A] uppercase">
                  {item.name}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-black/75 font-light leading-relaxed max-w-lg">
                  {item.desc}
                </p>

                <div className="pt-2">
                  <a 
                    href="/services" 
                    className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] text-[#1A1A1A] hover:text-black uppercase border-b border-black pb-1 transition-all font-medium"
                  >
                    Explore Service Details →
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP STICKY HORIZONTAL FLIGHT SCROLL SECTION ── */}
      <section ref={targetRef} className="hidden lg:block relative h-[480vh] bg-[#FAF9F6]">
        
        {/* STICKY CONTAINER VIEWPORT */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          
          {/* ── SOLID TEXT PANEL (Left Column on Desktop) ── */}
          <div className="
            absolute top-0 left-0 bottom-0 z-50 bg-[#FAF9F6] flex flex-col justify-between
            w-[540px] px-20 py-20 border-r border-black/10 pointer-events-auto overflow-y-auto
          ">
            <div>
              <h2 className="font-serif text-6xl font-light tracking-tight text-[#1A1A1A] leading-tight mb-4">
                What We Do
              </h2>

              {/* Dynamic Active Service Details directly under "What We Do" */}
              <motion.div 
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="pt-6 border-t border-black/10 flex flex-col gap-3"
              >
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/50 block font-semibold">
                  {currentService.category}
                </span>

                <h3 className="font-serif text-3xl font-light tracking-wide text-[#1A1A1A] uppercase">
                  {currentService.name}
                </h3>

                <p className="font-sans text-sm text-black/75 font-light leading-relaxed max-w-md">
                  {currentService.desc}
                </p>

                <div className="pt-2">
                  <a 
                    href="/services" 
                    className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#1A1A1A] hover:text-black uppercase border-b border-black pb-1 transition-all font-medium"
                  >
                    Explore Service Details →
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── CARD PORTRAIT CANVAS FIELD (Right Column on Desktop) ── */}
          <div className="w-full h-full relative z-20 pl-[540px]">
            <div className="relative w-full h-full overflow-hidden bg-[#FAF9F6]">
              
              {servicesList.map((item, i) => (
                <ServiceCard 
                  key={i} 
                  item={item} 
                  index={i} 
                  total={servicesList.length} 
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