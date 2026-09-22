'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteData } from '@/lib/use-site-data';

interface ServiceDefinition {
  num: string;
  category: string;
  name: string;
  desc: string;
  image: string;
  points?: string[];
}

const allServices: ServiceDefinition[] = [
  { 
    num: "01",
    category: "Style Discovery",
    name: "Personal Styling", 
    desc: "Discover and define your personal style with looks tailored to your personality, lifestyle, comfort, preferences, and the way you want to show up in the world.",
    image: "/images/includes/IMG_0271.JPG.jpeg",
    points: [
      "Discover your personal style & signature silhouette",
      "Understand what silhouettes, colours, and fits work for you",
      "Create outfits that suit your personality and lifestyle",
      "Feel comfortable and confident in what you wear"
    ]
  },
  { 
    num: "02",
    category: "Closet Evolution",
    name: "Wardrobe Styling & Audit", 
    desc: "Make your existing wardrobe work harder. Rediscover forgotten pieces, create fresh outfit combinations, identify what's missing, and build a versatile closet.",
    image: "/images/includes/DSC04682.jpg",
    points: [
      "Comprehensive wardrobe audit & assessment",
      "Identifying what works and what doesn't",
      "Styling existing pieces in 5+ new ways",
      "Creating multiple looks from the same wardrobe",
      "Building an intentional, versatile capsule closet"
    ]
  },
  { 
    num: "03",
    category: "Intentional Shopping",
    name: "Personal Shopping Bangalore", 
    desc: "Shop with intention through curated recommendations tailored to your style, lifestyle, and budget. Spend less time searching and more time finding what works.",
    image: "/images/includes/IMG_9135.JPG.jpeg",
    points: [
      "Personalised shopping itineraries & recommendations",
      "Curated pieces based on individual body proportions",
      "Shopping according to exact budget parameters",
      "Avoiding unnecessary impulse purchases",
      "Finding handloom & modern pieces that complement your closet"
    ]
  },
  { 
    num: "04",
    category: "Event & Celebration",
    name: "Occasion & Bridal Styling", 
    desc: "Tell us where you're going, and we'll help you figure out what to wear. From weddings and parties to date nights and celebrations, curate the perfect look.",
    image: "/images/includes/IMG_1754.JPG.jpeg",
    points: [
      "Weddings: Bridal trousseau & bridesmaid curations",
      "Garden wedding guest & cocktail drape outfits",
      "Date nights, galas & celebrations",
      "Vacations & resort wardrobes",
      "Special milestone events"
    ]
  },
  { 
    num: "05",
    category: "Professional Identity",
    name: "Workwear & Tech Leadership", 
    desc: "Build a work wardrobe that feels polished, confident, comfortable, and authentically yours. From everyday office looks to important executive presentations.",
    image: "/images/includes/IMG_8863.JPG.jpeg",
    points: [
      "Executive workwear & smart casual leadership dressing",
      "Business casual & elevated professional looks for tech hubs",
      "Corporate dressing for key investor pitch meetings",
      "Important meetings & first impressions"
    ]
  }
];

interface ServicesGridProps {
  hideButton?: boolean;
}

export default function ServicesGrid({ hideButton = false }: ServicesGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceDefinition | null>(null);
  const { services: dynamicServices } = useSiteData();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const servicesList: ServiceDefinition[] = dynamicServices.length > 0 
    ? dynamicServices.map((ds, idx) => {
        const fallback = allServices[idx % allServices.length];
        return {
          ...fallback,
          ...ds,
          image: ds.image && ds.image.trim() !== '' ? ds.image : fallback.image
        };
      })
    : allServices;

  const total = servicesList.length;

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleSelect = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto movement carousel timer (every 4.5 seconds)
  useEffect(() => {
    if (isPaused || selectedService !== null) return;

    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, selectedService, total]);

  const currentService = servicesList[currentIndex] || servicesList[0];

  const currentModalIndex = selectedService 
    ? servicesList.findIndex(s => s.num === selectedService.num)
    : -1;

  const handleModalPrev = () => {
    if (currentModalIndex > 0) {
      setSelectedService(servicesList[currentModalIndex - 1]);
    }
  };

  const handleModalNext = () => {
    if (currentModalIndex !== -1 && currentModalIndex < servicesList.length - 1) {
      setSelectedService(servicesList[currentModalIndex + 1]);
    }
  };

  // Animation variants for smooth auto-sliding
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0
    })
  };

  return (
    <section 
      id="services" 
      className="relative w-full bg-[#FAF9F6] border-b border-black/15 py-12 sm:py-16 md:py-20 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 md:pb-10 border-b border-black/10 gap-4">
          <div className="flex flex-col items-start text-left">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#1A1A1A] leading-tight text-left">
              Our Services
            </h2>
            <div className="flex items-center gap-2 mt-2 text-left">
              <span className="w-1.5 h-1.5 rounded-full bg-black/40 flex-shrink-0" />
              <p className="font-mono text-[9.5px] sm:text-[11px] tracking-[0.22em] uppercase text-black/60 font-medium">
                Personal Styling & Image Consulting
              </p>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-4 self-start md:self-end">
            <div className="flex items-center gap-2 font-mono text-xs text-black/50">
              <span className="text-[#1A1A1A] font-bold tracking-widest">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span>/</span>
              <span className="tracking-widest">{String(total).padStart(2, '0')}</span>
            </div>

            {/* Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-black/20 hover:border-black hover:bg-black hover:text-white flex items-center justify-center transition-all cursor-pointer text-sm"
                aria-label="Previous Service"
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-black/20 hover:border-black hover:bg-black hover:text-white flex items-center justify-center transition-all cursor-pointer text-sm"
                aria-label="Next Service"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* ── AUTO MOVEMENT CAROUSEL CONTENT ── */}
        <div className="pt-8 md:pt-12">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, { offset }) => {
                if (offset.x < -40) handleNext();
                else if (offset.x > 40) handlePrev();
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center cursor-grab active:cursor-grabbing"
            >
              
              {/* ── LANDSCAPE IMAGE CONTAINER ── */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div 
                  onClick={() => setSelectedService(currentService)}
                  className="relative w-full aspect-[16/10] bg-[#EFECE6] overflow-hidden rounded-xs border border-black/10 group cursor-pointer shadow-sm"
                >
                  <Image 
                    src={currentService.image} 
                    alt={currentService.name} 
                    fill
                    unoptimized
                    priority
                    className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  
                  {/* Category Pill Tag Overlay */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-[#FAF9F6]/90 backdrop-blur-xs px-3 py-1 border border-black/10 rounded-xs">
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-black/80 font-bold">
                      ✦ {currentService.num} · {currentService.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── SERVICE DETAILS & NAME ── */}
              <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col items-start text-left gap-4 sm:gap-5">
                
                {/* Micro Category Tag */}
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-black/50 font-bold">
                  ✦ SERVICE {currentService.num} · {currentService.category}
                </span>

                {/* Bold Service Name */}
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide text-[#1A1A1A] uppercase leading-snug text-left">
                  {currentService.name}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm sm:text-base text-black/75 font-light leading-relaxed text-left">
                  {currentService.desc}
                </p>

                {/* Action Links */}
                <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
                  <button
                    type="button"
                    onClick={() => setSelectedService(currentService)}
                    className="inline-flex items-center gap-2 font-mono text-[10.5px] sm:text-[11px] tracking-[0.22em] text-[#1A1A1A] hover:text-black uppercase font-semibold border-b-2 border-black pb-1 transition-all cursor-pointer group"
                  >
                    <span>Explore Service Details</span>
                    <span className="transform group-hover:translate-x-1.5 transition-transform text-xs">→</span>
                  </button>

                  <Link
                    href="/connect"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[10.5px] tracking-[0.2em] text-black/60 hover:text-black uppercase font-medium transition-colors"
                  >
                    <span>Book Consultation</span>
                    <span>↗</span>
                  </Link>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── CAROUSEL PROGRESS & QUICK NAV TABS ── */}
        <div className="mt-10 sm:mt-14 pt-6 border-t border-black/10">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
            {servicesList.map((svc, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className={`flex flex-col items-start text-left p-2.5 sm:p-3 rounded-xs transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#EFECE6] border-l-2 border-black' 
                      : 'hover:bg-black/5 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-mono text-[9px] tracking-widest font-bold text-black/60">
                      {svc.num}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                    )}
                  </div>
                  <span className="font-serif text-xs sm:text-sm font-semibold text-[#1A1A1A] line-clamp-1">
                    {svc.name}
                  </span>

                  {/* Active Auto-Timer Progress Bar Line */}
                  {isActive && !isPaused && (
                    <div className="w-full h-0.5 bg-black/10 mt-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 4.5, ease: 'linear' }}
                        className="h-full bg-black"
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── LUXURY SERVICE DETAILS MODAL ── */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto cursor-zoom-out select-none"
          >
            <motion.div
              initial={{ scale: 0.94, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 16, opacity: 0 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl bg-[#FAF9F6] text-[#1A1A1A] rounded-xs border border-white/20 shadow-2xl overflow-hidden cursor-default my-auto max-h-[90vh] flex flex-col"
            >
              {/* Top Modal Header */}
              <div className="p-4 sm:p-5 border-b border-black/10 flex items-center justify-between bg-[#FAF8F3]">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/50 font-bold">
                    ✦ SERVICE {selectedService.num}
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.15em] uppercase text-black/70 bg-[#EFECE6] px-2.5 py-0.5 border border-black/10 rounded-xs font-semibold">
                    {selectedService.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/15 text-black flex items-center justify-center text-xs font-mono transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-7 overflow-y-auto flex flex-col gap-5">
                {/* Service Title */}
                <div className="border-b border-black/10 pb-4">
                  <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide text-[#1A1A1A] uppercase">
                    {selectedService.name}
                  </h3>
                </div>

                {/* Narrative Description */}
                <p className="font-sans text-xs sm:text-sm text-black/80 font-light leading-relaxed border-l-2 border-black/25 pl-4 py-1">
                  {selectedService.desc}
                </p>

                {/* Points / Highlights */}
                {selectedService.points && selectedService.points.length > 0 && (
                  <div className="bg-[#EFECE6] p-4 sm:p-5 rounded-xs border border-black/5 flex flex-col gap-2.5">
                    <span className="font-mono text-[8.5px] tracking-[0.25em] uppercase text-black/50 font-bold">
                      WHAT THIS INCLUDES:
                    </span>
                    <div className="flex flex-col gap-2">
                      {selectedService.points.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 font-sans text-xs text-black/85 font-light leading-snug">
                          <span className="w-1.5 h-1.5 rounded-full bg-black/50 mt-1 flex-shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service Switcher Prev / Next */}
                <div className="flex items-center justify-between pt-2 border-t border-black/10">
                  <button
                    onClick={handleModalPrev}
                    disabled={currentModalIndex <= 0}
                    className={`font-mono text-[9px] tracking-widest uppercase py-2 px-3 border border-black/15 rounded-xs transition-all ${
                      currentModalIndex <= 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black hover:text-white cursor-pointer'
                    }`}
                  >
                    ← Prev Service
                  </button>
                  <span className="font-mono text-[9px] tracking-widest text-black/40">
                    {currentModalIndex + 1} / {servicesList.length}
                  </span>
                  <button
                    onClick={handleModalNext}
                    disabled={currentModalIndex === -1 || currentModalIndex >= servicesList.length - 1}
                    className={`font-mono text-[9px] tracking-widest uppercase py-2 px-3 border border-black/15 rounded-xs transition-all ${
                      currentModalIndex === -1 || currentModalIndex >= servicesList.length - 1
                        ? 'opacity-30 cursor-not-allowed'
                        : 'hover:bg-black hover:text-white cursor-pointer'
                    }`}
                  >
                    Next Service →
                  </button>
                </div>

                {/* CTA Action Buttons */}
                <div className="pt-1 flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href="/connect"
                    onClick={() => setSelectedService(null)}
                    className="w-full sm:flex-1 py-3.5 bg-[#1A1A1A] hover:bg-black text-white text-[9.5px] font-mono tracking-[0.22em] uppercase text-center font-medium rounded-xs shadow-xs transition-all"
                  >
                    Book This Service →
                  </Link>
                  <Link
                    href="/services"
                    onClick={() => setSelectedService(null)}
                    className="w-full sm:w-auto px-5 py-3.5 border border-black/25 hover:border-black text-[9.5px] font-mono tracking-[0.2em] uppercase text-center font-medium text-black transition-all rounded-xs"
                  >
                    All Services Details →
                  </Link>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}