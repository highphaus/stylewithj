'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLightbox } from '@/components/ImageLightbox';
import { useSiteData } from '@/lib/use-site-data';

interface DefaultServiceItem {
  name: string;
  category: string;
  desc: string;
  image: string;
  href: string;
}

interface ServicesGridProps {
  hideButton?: boolean;
}

const allServices: DefaultServiceItem[] = [
  {
    name: "Executive & Signature Styling",
    category: "Full Image Strategy",
    desc: "Complete wardrobe transformation for high-profile individuals, executives, and leaders needing authentic commanding presence.",
    image: "/images/includes/IMG_0271.JPG.jpeg",
    href: "/services?service=executive",
  },
  {
    name: "Occasion & Event Styling",
    category: "Specialized Curation",
    desc: "Exquisite styling for red carpets, galas, weddings, photo shoots, and high-visibility public appearances.",
    image: "/images/CIT09345.jpg",
    href: "/services?service=occasion",
  },
  {
    name: "Capsule Wardrobe Architecture",
    category: "Wardrobe System",
    desc: "Decluttering, organizing, and building a streamlined, versatile capsule wardrobe aligned with your daily lifestyle.",
    image: "/images/includes/IMG_1406.JPG.jpeg",
    href: "/services?service=capsule",
  },
  {
    name: "Personal Shopping & Sourcing",
    category: "VIP Procurement",
    desc: "Exclusive access to rare luxury pieces, custom garments, and curated collections tailored precisely to your proportions.",
    image: "/images/includes/IMG_3112.JPG.jpeg",
    href: "/services?service=sourcing",
  },
];

export default function ServicesGrid({ hideButton }: ServicesGridProps = {}) {
  const { openLightbox } = useLightbox();
  const { services: dynamicServices } = useSiteData();
  
  const servicesList = dynamicServices && dynamicServices.length > 0
    ? dynamicServices.map((s, idx) => ({
        name: s.name,
        category: s.category,
        desc: s.desc,
        image: s.image,
        href: `/services?service=${s.id || idx}`,
      }))
    : allServices;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);

  // ── AUTOMATIC CYCLE ON DESKTOP ──
  useEffect(() => {
    if (isHovering) {
      setProgress(0);
      return;
    }

    const intervalTime = 50;
    const totalDuration = 6000;
    const increment = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((curr) => (curr + 1) % servicesList.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isHovering, activeIndex, servicesList.length]);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
    setIsHovering(true);
    setProgress(0);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const currentService = servicesList[activeIndex] || servicesList[0];

  return (
    <section id="services" className="w-full bg-[#FAF9F6] border-b border-black/15 overflow-hidden">
      
      {/* ─────────────────────────────────────────────────────────────────
          1. DESKTOP SINGLE-SCREEN LAYOUT (lg:flex) — MATCHES WHO WE ACCOMPANY
          ───────────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex w-full min-h-screen relative overflow-hidden bg-[#FAF9F6]">
        
        {/* Left Column: Full-Bleed Pinned Image Box */}
        <div 
          onClick={() => openLightbox(currentService.image, currentService.name)}
          className="w-7/12 h-screen sticky top-0 border-r border-black/10 overflow-hidden bg-[#EFECE6] cursor-pointer group"
          title="Click to view image"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image 
                src={currentService.image} 
                alt={currentService.name} 
                fill
                className="object-cover object-top opacity-100 group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md text-white/90 px-4 py-2 text-[9px] tracking-[0.3em] font-mono uppercase rounded-xs border border-white/10">
                ✦ 0{activeIndex + 1} // {currentService.name}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Index Stack & Active Item Details */}
        <div 
          className="w-5/12 flex flex-col justify-between p-10 lg:p-14 xl:p-16 z-10 bg-[#FAF9F6]"
          onMouseLeave={handleMouseLeave}
        >
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#1A1A1A]">
              What We Do
            </h2>
          </div>

          {/* Links stack with writing text under active item */}
          <div className="flex flex-col gap-2 my-auto w-full">
            {servicesList.map((item, i) => {
              const isActive = activeIndex === i;

              return (
                <Link
                  key={i}
                  href={item.href}
                  onMouseEnter={() => handleMouseEnter(i)}
                  className="w-full text-left flex flex-col group py-4 relative outline-none border-b border-black/[0.08] last:border-b-0"
                >
                  <div className="flex items-center justify-between w-full">
                    <h3 className={`text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 truncate ${
                      isActive ? 'text-[#1A1A1A] translate-x-1 font-bold' : 'text-black/50 group-hover:text-black/85 font-light'
                    }`}>
                      {item.name}
                    </h3>

                    <div className={`w-[6px] h-[6px] rounded-full transition-all duration-300 border flex-shrink-0 ${
                      isActive ? 'bg-[#1A1A1A] scale-125 border-[#1A1A1A]' : 'bg-transparent border-black/20 group-hover:border-black/40'
                    }`} />
                  </div>

                  {/* ACTIVE ITEM WRITING TEXT */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="mt-2.5 flex flex-col gap-2"
                    >
                      <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-black/50 font-bold">
                        {item.category}
                      </span>

                      <p className="font-sans text-xs sm:text-sm text-black/80 font-light leading-relaxed max-w-md">
                        {item.desc}
                      </p>

                      <div className="w-full h-[1px] bg-black/10 mt-1 overflow-hidden">
                        <motion.div
                          className="h-full bg-[#1A1A1A]"
                          style={{ width: `${isHovering ? 0 : progress}%` }}
                          transition={{ ease: 'linear' }}
                        />
                      </div>
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          2. MOBILE & SMALLER DEVICE LAYOUT (lg:hidden) — STACKED CARD-BY-CARD
          ───────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:hidden w-full bg-[#FAF9F6]">
        {/* Header */}
        <div className="px-6 pt-8 pb-6 border-b border-black/10 bg-[#FAF9F6]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-[#1A1A1A]">
            What We Do
          </h2>
        </div>

        {/* Stacked Images Down-by-Down */}
        <div className="flex flex-col bg-[#FAF9F6] divide-y divide-black/10">
          {servicesList.map((item, i) => (
            <div key={i} className="flex flex-col bg-[#FAF9F6] pb-10">
              
              {/* 1. Full-Bleed Portrait Cover Image */}
              <div 
                onClick={() => openLightbox(item.image, item.name)}
                className="relative w-full h-[75vh] min-h-[440px] bg-[#0D0D0D] overflow-hidden cursor-pointer group flex-shrink-0"
                title={`Click to view ${item.name}`}
              >
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill
                  sizes="100vw"
                  className="object-cover object-top scale-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white px-3 py-1.5 text-[8px] tracking-[0.25em] font-mono uppercase font-semibold border border-white/10">
                  ✦ 0{i + 1} // {item.name}
                </div>
              </div>

              {/* 2. All Writings & Details DIRECTLY UNDER the Image */}
              <div className="px-6 pt-6 flex flex-col gap-3">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/45 font-bold">
                  {item.category}
                </span>

                <h3 className="font-sans text-xl sm:text-2xl tracking-[0.12em] uppercase font-bold text-[#1A1A1A]">
                  {item.name}
                </h3>

                <p className="font-sans text-sm text-black/80 font-light leading-relaxed">
                  {item.desc}
                </p>

                <div className="pt-3 flex items-center gap-3">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] text-white text-[9px] tracking-[0.25em] uppercase font-mono font-semibold hover:bg-black transition-all rounded-xs shadow-xs"
                  >
                    Explore Details →
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
}