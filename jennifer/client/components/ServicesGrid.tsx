'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent, MotionValue } from 'framer-motion';
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

interface DesktopCardProps {
  item: ServiceDefinition;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  onSelectService: (item: ServiceDefinition) => void;
}

function DesktopServiceCard({ item, index, total, scrollYProgress, onSelectService }: DesktopCardProps) {
  const activeTotal = total - 1;
  const isLastCard = index === total - 1;
  
  const start = index / activeTotal;
  const end = (index + 1) / activeTotal;
  const hold = isLastCard ? 1 : start + (end - start) * 0.65;

  const inputRange = isLastCard 
    ? [0, 1]
    : [0, Math.max(0.01, hold), end, 1];

  const outputX = isLastCard
    ? ["0%", "0%"]
    : ["0%", "0%", "-105%", "-105%"];

  const outputScale = isLastCard
    ? [1, 1]
    : [1, 1, 0.96, 0.96];

  const x = useTransform(scrollYProgress, inputRange, outputX);
  const scale = useTransform(scrollYProgress, inputRange, outputScale);

  return (
    <motion.div 
      style={{ x, scale, zIndex: total - index }}
      className="absolute inset-0 w-full h-full bg-[#FAF9F6] will-change-transform border-l border-black/10"
    >
      <div 
        onClick={() => onSelectService(item)}
        className="relative w-full h-full bg-[#EFECE6] overflow-hidden cursor-pointer group"
      >
        <Image 
          src={item.image} 
          alt={item.name} 
          fill
          unoptimized
          className="object-cover object-center scale-100 group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
          sizes="50vw"
          priority={index <= 1}
        />
      </div>
    </motion.div>
  );
}

interface ServicesGridProps {
  hideButton?: boolean;
}

export default function ServicesGrid({ hideButton = false }: ServicesGridProps) {
  // Desktop state
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);

  // Mobile state (Auto carousel)
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileDirection, setMobileDirection] = useState(1);
  const [isMobilePaused, setIsMobilePaused] = useState(false);
  const mobileTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Shared modal state
  const [selectedService, setSelectedService] = useState<ServiceDefinition | null>(null);
  const { services: dynamicServices } = useSiteData();

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

  // ── DESKTOP SCROLL PROGRESS ──
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    let idx = 0;
    if (latest >= 0.88) idx = 4;
    else if (latest >= 0.65) idx = 3;
    else if (latest >= 0.40) idx = 2;
    else if (latest >= 0.18) idx = 1;
    else idx = 0;

    setActiveDesktopIndex(idx);
  });

  // ── MOBILE AUTO-CAROUSEL CONTROLS ──
  const handleMobileNext = () => {
    setMobileDirection(1);
    setMobileIndex((prev) => (prev + 1) % total);
  };

  const handleMobilePrev = () => {
    setMobileDirection(-1);
    setMobileIndex((prev) => (prev - 1 + total) % total);
  };

  const handleMobileSelect = (index: number) => {
    setMobileDirection(index > mobileIndex ? 1 : -1);
    setMobileIndex(index);
  };

  // Auto carousel effect for mobile (4.5s interval)
  useEffect(() => {
    if (isMobilePaused || selectedService !== null) return;

    mobileTimerRef.current = setInterval(() => {
      setMobileDirection(1);
      setMobileIndex((prev) => (prev + 1) % total);
    }, 4500);

    return () => {
      if (mobileTimerRef.current) clearInterval(mobileTimerRef.current);
    };
  }, [isMobilePaused, selectedService, total]);

  const currentDesktopService = servicesList[activeDesktopIndex] || servicesList[0];
  const currentMobileService = servicesList[mobileIndex] || servicesList[0];

  // Modal navigation
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

  const mobileSlideVariants = {
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
    <div id="services" className="relative w-full bg-[#FAF9F6] border-b border-black/15">
      
      {/* ═══════════════════════════════════════════════════════════════════
          1. LAPTOP / DESKTOP VIEW (lg+): ORIGINAL FLIGHT SCROLL ANIMATION
         ═══════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block">
        <section ref={targetRef} className="relative h-[320vh] xl:h-[340vh] bg-[#FAF9F6]">
          <div className="sticky top-0 h-screen h-[100svh] w-full overflow-hidden flex flex-row items-center bg-[#FAF9F6]">
            
            {/* DESKTOP FIXED LEFT EDITORIAL PANEL */}
            <div className="
              absolute top-0 left-0 bottom-0 z-50 bg-[#FAF9F6] flex flex-col justify-start
              w-[480px] xl:w-[540px] px-12 xl:px-20 pt-16 xl:pt-20 border-r border-black/10 pointer-events-auto
            ">
              <div>
                <h2 className="font-serif text-5xl xl:text-6xl font-light tracking-tight text-[#1A1A1A] leading-tight mb-2">
                  Our Services
                </h2>
                <div className="flex items-center gap-2.5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-black/40 flex-shrink-0" />
                  <p className="font-mono text-[10px] xl:text-[11px] tracking-[0.22em] uppercase text-black/60 font-medium">
                    Personal Styling & Image Consulting
                  </p>
                </div>

                {/* Dynamic Active Service Details */}
                <div className="pt-6 border-t border-black/10">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeDesktopIndex}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="flex flex-col gap-4"
                    >
                      <span className="font-mono text-[9.5px] xl:text-[10px] tracking-[0.35em] uppercase text-black/50 font-semibold block">
                        ✦ SERVICE {currentDesktopService.num} · {currentDesktopService.category}
                      </span>

                      <h3 className="font-serif text-2xl xl:text-3xl font-bold tracking-wide text-[#1A1A1A] uppercase leading-snug">
                        {currentDesktopService.name}
                      </h3>

                      <p className="font-sans text-xs xl:text-sm text-black/75 font-light leading-relaxed max-w-md">
                        {currentDesktopService.desc}
                      </p>

                      <div className="pt-3">
                        <button 
                          type="button"
                          onClick={() => setSelectedService(currentDesktopService)}
                          className="inline-flex items-center gap-2 font-mono text-[9.5px] xl:text-[10px] tracking-[0.25em] text-[#1A1A1A] hover:text-black uppercase border-b border-black pb-1 transition-all font-medium group cursor-pointer"
                        >
                          <span>Explore Service Details</span>
                          <span className="transform group-hover:translate-x-1 transition-transform text-xs">→</span>
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* DESKTOP RIGHT CARD CANVAS FIELD */}
            <div className="w-full relative z-20 flex-1 h-full min-h-0 pl-[480px] xl:pl-[540px] overflow-hidden">
              <div className="relative w-full h-full overflow-hidden bg-[#FAF9F6]">
                {servicesList.map((item, i) => (
                  <DesktopServiceCard 
                    key={i} 
                    item={item} 
                    index={i} 
                    total={servicesList.length} 
                    scrollYProgress={smoothProgress}
                    onSelectService={(selected) => setSelectedService(selected)}
                  />
                ))}

                {!hideButton && (
                  <div className="absolute top-4 right-4 z-30">
                    <button
                      onClick={() => {
                        const target = document.getElementById('transformations') || document.getElementById('horizon');
                        target?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex items-center gap-1 px-3.5 py-1.5 bg-black/85 hover:bg-black text-white text-[9px] tracking-[0.2em] uppercase font-light rounded-full border border-white/10 shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      Skip ↓
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          2. SMALLER DEVICE VIEW (< lg): AUTO-MOVEMENT CAROUSEL
             (Landscape image + Service Name & details, NO timer line)
         ═══════════════════════════════════════════════════════════════════ */}
      <div 
        className="lg:hidden relative w-full bg-[#FAF9F6] py-10 sm:py-14 select-none"
        onMouseEnter={() => setIsMobilePaused(true)}
        onMouseLeave={() => setIsMobilePaused(false)}
        onTouchStart={() => setIsMobilePaused(true)}
        onTouchEnd={() => setTimeout(() => setIsMobilePaused(false), 2000)}
      >
        <div className="px-5 sm:px-8">
          
          {/* MOBILE HEADER BAR */}
          <div className="flex items-end justify-between pb-6 border-b border-black/10 gap-3">
            <div className="flex flex-col items-start text-left">
              <h2 className="font-serif text-2xl sm:text-3xl font-light tracking-tight text-[#1A1A1A] leading-tight text-left">
                Our Services
              </h2>
              <div className="flex items-center gap-1.5 mt-1.5 text-left">
                <span className="w-1.5 h-1.5 rounded-full bg-black/40 flex-shrink-0" />
                <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-black/60 font-medium">
                  Personal Styling & Image Consulting
                </p>
              </div>
            </div>

            {/* Mobile Controls: Index & Arrows */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <div className="font-mono text-[11px] text-black/50">
                <span className="text-[#1A1A1A] font-bold">{String(mobileIndex + 1).padStart(2, '0')}</span>
                <span>/</span>
                <span>{String(total).padStart(2, '0')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleMobilePrev}
                  className="w-8 h-8 rounded-full border border-black/20 hover:border-black hover:bg-black hover:text-white flex items-center justify-center text-xs transition-all cursor-pointer"
                  aria-label="Previous Service"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={handleMobileNext}
                  className="w-8 h-8 rounded-full border border-black/20 hover:border-black hover:bg-black hover:text-white flex items-center justify-center text-xs transition-all cursor-pointer"
                  aria-label="Next Service"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE CAROUSEL CARD */}
          <div className="pt-6">
            <AnimatePresence mode="wait" custom={mobileDirection}>
              <motion.div
                key={mobileIndex}
                custom={mobileDirection}
                variants={mobileSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, { offset }) => {
                  if (offset.x < -40) handleMobileNext();
                  else if (offset.x > 40) handleMobilePrev();
                }}
                className="flex flex-col gap-4 cursor-grab active:cursor-grabbing"
              >
                {/* Landscape Image */}
                <div 
                  onClick={() => setSelectedService(currentMobileService)}
                  className="relative w-full aspect-[16/10] bg-[#EFECE6] overflow-hidden rounded-xs border border-black/10 cursor-pointer shadow-xs"
                >
                  <Image 
                    src={currentMobileService.image} 
                    alt={currentMobileService.name} 
                    fill
                    unoptimized
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#FAF9F6]/90 backdrop-blur-xs px-2.5 py-0.5 border border-black/10 rounded-xs">
                    <span className="font-mono text-[8.5px] tracking-[0.2em] uppercase text-black/80 font-bold">
                      ✦ {currentMobileService.num} · {currentMobileService.category}
                    </span>
                  </div>
                </div>

                {/* Service Name & Details */}
                <div className="flex flex-col items-start text-left gap-2 w-full">
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-black/50 font-bold">
                    ✦ SERVICE {currentMobileService.num}
                  </span>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#1A1A1A] uppercase leading-tight text-left">
                    {currentMobileService.name}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-black/75 font-light leading-relaxed text-left">
                    {currentMobileService.desc}
                  </p>

                  <div className="pt-1.5 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedService(currentMobileService)}
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.22em] text-[#1A1A1A] hover:text-black uppercase font-semibold border-b border-black pb-0.5 transition-all cursor-pointer group"
                    >
                      <span>Explore Service Details</span>
                      <span className="transform group-hover:translate-x-1 transition-transform text-xs">→</span>
                    </button>
                    <Link
                      href="/connect"
                      className="inline-flex items-center gap-1 font-mono text-[9.5px] tracking-[0.2em] text-black/60 hover:text-black uppercase font-medium"
                    >
                      <span>Book Consultation</span>
                      <span>↗</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          3. SHARED LUXURY SERVICE DETAILS MODAL
         ═══════════════════════════════════════════════════════════════════ */}
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
              {/* Modal Header */}
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
                <div className="border-b border-black/10 pb-4">
                  <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide text-[#1A1A1A] uppercase">
                    {selectedService.name}
                  </h3>
                </div>

                <p className="font-sans text-xs sm:text-sm text-black/80 font-light leading-relaxed border-l-2 border-black/25 pl-4 py-1">
                  {selectedService.desc}
                </p>

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

                {/* Switcher Prev / Next */}
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

                {/* Actions */}
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

    </div>
  );
}