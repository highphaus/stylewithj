'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent, MotionValue } from 'framer-motion';
import { useLightbox } from '@/components/ImageLightbox';
import { useSiteData } from '@/lib/use-site-data';

interface ServiceDefinition {
  num: string;
  category: string;
  name: string;
  desc: string;
  image: string;
  pricing?: string;
  points?: string[];
}

const allServices: ServiceDefinition[] = [
  { 
    num: "01",
    category: "Style Discovery",
    name: "Personal Styling", 
    desc: "Discover and define your personal style with looks tailored to your personality, lifestyle, comfort, preferences, and the way you want to show up in the world.",
    image: "/images/includes/IMG_0271.JPG.jpeg",
    pricing: "Starting from ₹5,000",
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
    pricing: "Starting from ₹7,500",
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
    pricing: "Starting from ₹10,000",
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
    pricing: "Starting from ₹12,500",
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
    pricing: "Starting from ₹15,000",
    points: [
      "Executive workwear & smart casual leadership dressing",
      "Business casual & elevated professional looks for tech hubs",
      "Corporate dressing for key investor pitch meetings",
      "Important meetings & first impressions"
    ]
  }
];

interface CardProps {
  item: ServiceDefinition;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  onSelectService: (item: ServiceDefinition) => void;
}

function ServiceCard({ item, index, total, scrollYProgress, onSelectService }: CardProps) {
  const activeTotal = total - 1;
  const isLastCard = index === total - 1;
  
  const start = index / activeTotal;
  const end = (index + 1) / activeTotal;
  // Comfortable hold phase: Card stays at 0% for 65% of its window, then slides smoothly to the left to reveal the next card
  const hold = isLastCard ? 1 : start + (end - start) * 0.65;

  // Strictly monotonically increasing input ranges
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
      className="absolute inset-0 w-full h-full bg-[#EFECE6] will-change-transform border-l border-black/10"
    >
      <div 
        onClick={() => onSelectService(item)}
        className="relative w-full h-full bg-[#EFECE6] overflow-hidden cursor-pointer group"
      >
        <Image 
          src={item.image} 
          alt={item.name} 
          fill
          className="object-cover object-center scale-100 group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={index === 0}
        />
      </div>
    </motion.div>
  );
}

interface ServicesGridProps {
  hideButton?: boolean;
}

export default function ServicesGrid({ hideButton = false }: ServicesGridProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceDefinition | null>(null);
  const { openLightbox } = useLightbox();
  const { services: dynamicServices } = useSiteData();
  
  const servicesList: ServiceDefinition[] = dynamicServices.length > 0 
    ? dynamicServices.map((ds, idx) => ({
        ...allServices[idx % allServices.length],
        ...ds
      }))
    : allServices;

  // Accurately measure scroll progress strictly while the section is sticky
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Fast, responsive spring without heavy sluggishness or delay
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

    setActiveIndex(idx);
  });

  const currentService = servicesList[activeIndex] || servicesList[0];

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

  return (
    <div id="services" className="relative w-full bg-[#FAF9F6] border-b border-black/15">
      
      {/* ── MOBILE / SMALL DEVICE LAYOUT ── */}
      <div className="block lg:hidden bg-[#FAF9F6] w-full overflow-hidden">
        
        {/* Section Heading: "Our Services" */}
        <div className="px-6 pt-12 pb-6 border-b border-black/10 bg-[#FAF9F6] flex items-end justify-between">
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-[#1A1A1A]">
            Our Services
          </h2>
          <Link 
            href="/services" 
            className="font-mono text-[9.5px] tracking-[0.2em] text-[#1A1A1A] hover:text-black uppercase border-b border-black pb-0.5 font-medium"
          >
            All Services →
          </Link>
        </div>

        {/* Vertical Stack: Clean Images with 'Tap the picture' on left bottom side */}
        <div className="flex flex-col bg-[#FAF9F6] divide-y divide-black/10">
          {servicesList.map((item) => (
            <div 
              key={item.num}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedService(item)}
              className="relative w-full h-[75dvh] min-h-[460px] bg-[#0D0D0D] overflow-hidden cursor-pointer group flex-shrink-0 select-none active:scale-[0.99] transition-transform"
              title="Tap the picture"
            >
              <Image 
                src={item.image} 
                alt={item.name} 
                fill
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />

              {/* Left Bottom Side: Tap the picture */}
              <div className="absolute bottom-5 left-5 z-10 pointer-events-none">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/80 backdrop-blur-md text-white rounded-full border border-white/20 text-[9px] font-mono tracking-[0.2em] uppercase font-semibold shadow-xl">
                  <span>Tap the picture</span>
                  <span className="text-xs">↗</span>
                </span>
              </div>

              {/* Right Bottom Side: Service Number */}
              <div className="absolute bottom-5 right-5 z-10 pointer-events-none">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/85 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 font-bold shadow-md">
                  {item.num}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation CTA */}
        <div className="px-6 py-8 bg-[#FAF9F6] flex justify-center border-t border-black/10">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 font-mono text-[9.5px] tracking-[0.25em] text-[#1A1A1A] hover:text-black uppercase border-b border-black pb-1 transition-all font-medium group"
          >
            <span>Explore All Services</span>
            <span className="transform group-hover:translate-x-1 transition-transform text-xs">→</span>
          </Link>
        </div>

      </div>

      {/* ── DESKTOP STICKY HORIZONTAL FLIGHT SCROLL SECTION ── */}
      <section ref={targetRef} className="hidden lg:block relative h-[340vh] bg-[#FAF9F6]">
        
        {/* STICKY CONTAINER VIEWPORT */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          
          {/* ── SOLID TEXT PANEL (Left Column on Desktop) ── */}
          <div className="
            absolute top-0 left-0 bottom-0 z-50 bg-[#FAF9F6] flex flex-col justify-start
            w-[540px] px-16 xl:px-20 pt-16 xl:pt-20 border-r border-black/10 pointer-events-auto
          ">
            <div>
              {/* Section Heading: "Our Services" (Positioned at the top of this section) */}
              <h2 className="font-serif text-5xl xl:text-6xl font-light tracking-tight text-[#1A1A1A] leading-tight mb-6">
                Our Services
              </h2>

              {/* Dynamic Active Service Details directly under "Our Services" */}
              <div className="pt-6 border-t border-black/10">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-col gap-4"
                  >
                    <span className="font-mono text-[9.5px] xl:text-[10px] tracking-[0.35em] uppercase text-black/50 font-semibold block">
                      ✦ SERVICE {currentService.num}
                    </span>

                    <h3 className="font-serif text-2xl xl:text-3xl font-light tracking-wide text-[#1A1A1A] uppercase leading-snug">
                      {currentService.name}
                    </h3>

                    <p className="font-sans text-xs xl:text-sm text-black/75 font-light leading-relaxed max-w-md">
                      {currentService.desc}
                    </p>

                    <div className="pt-3">
                      <Link 
                        href="/services" 
                        className="inline-flex items-center gap-2 font-mono text-[9.5px] xl:text-[10px] tracking-[0.25em] text-[#1A1A1A] hover:text-black uppercase border-b border-black pb-1 transition-all font-medium group"
                      >
                        <span>Explore Service Details</span>
                        <span className="transform group-hover:translate-x-1 transition-transform text-xs">→</span>
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
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
                  onSelectService={(selected) => setSelectedService(selected)}
                />
              ))}

            </div>
          </div>

          {/* Unified Floating Skip Button */}
          {!hideButton && (
            <div className="absolute bottom-6 right-6 z-30">
              <button
                onClick={() => {
                  const target = document.getElementById('transformations') || document.getElementById('horizon');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-black/85 hover:bg-black text-white text-[9px] tracking-[0.2em] uppercase font-light rounded-full border border-white/10 shadow-lg transition-all duration-300 hover:scale-105"
              >
                Skip ↓
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ── LUXURY SERVICE DETAILS MODAL (OPENS ON TAPPING PICTURE) ── */}
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
                {/* Service Title and Pricing */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-black/10 pb-4">
                  <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide text-[#1A1A1A] uppercase">
                    {selectedService.name}
                  </h3>
                  {selectedService.pricing && (
                    <span className="font-mono text-xs text-black/60 font-semibold bg-[#EFECE6] px-2.5 py-1 rounded-xs border border-black/5 self-start sm:self-auto">
                      {selectedService.pricing}
                    </span>
                  )}
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

    </div>
  );
}