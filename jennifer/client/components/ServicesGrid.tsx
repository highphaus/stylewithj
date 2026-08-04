'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, MotionValue } from 'framer-motion';
import { useLightbox } from '@/components/ImageLightbox';
import { useSiteData } from '@/lib/use-site-data';

const allServices = [
  { 
    num: "01",
    category: "Style Discovery",
    name: "Personal Styling", 
    desc: "Discover and define your personal style with looks tailored to your personality, lifestyle, comfort, preferences, and the way you want to show up in the world.",
    image: "/images/includes/IMG_0271.JPG.jpeg"
  },
  { 
    num: "02",
    category: "Closet Evolution",
    name: "Wardrobe Styling", 
    desc: "Make your existing wardrobe work harder. Rediscover forgotten pieces, create fresh outfit combinations, identify what's missing, and build a versatile closet.",
    image: "/images/includes/IMG_1406.JPG.jpeg"
  },
  { 
    num: "03",
    category: "Intentional Shopping",
    name: "Personal Shopping", 
    desc: "Shop with intention through curated recommendations tailored to your style, lifestyle, and budget. Spend less time searching and more time finding what works.",
    image: "/images/includes/IMG_1423.JPG.jpeg"
  },
  { 
    num: "04",
    category: "Event & Celebration",
    name: "Occasion Styling", 
    desc: "Tell us where you're going, and we'll help you figure out what to wear. From weddings and parties to date nights and celebrations, curate the perfect look.",
    image: "/images/includes/IMG_1754.JPG.jpeg"
  },
  { 
    num: "05",
    category: "Professional Identity",
    name: "Workwear Styling", 
    desc: "Build a work wardrobe that feels polished, confident, comfortable, and authentically yours. From everyday office looks to important executive presentations.",
    image: "/images/includes/IMG_8863.JPG.jpeg"
  }
];

interface CardProps {
  item: typeof allServices[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function ServiceCard({ item, index, total, scrollYProgress }: CardProps) {
  const { openLightbox } = useLightbox();
  const activeTotal = total - 1;
  const isLastCard = index === total - 1;
  
  const start = index / activeTotal;
  const end = (index + 1) / activeTotal;
  const hold = start + (end - start) * 0.65;

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
      className="absolute inset-0 w-full h-full bg-[#EFECE6] will-change-transform border-l border-black/10"
    >
      <div 
        onClick={() => openLightbox(item.image, item.name)}
        className="relative w-full h-full bg-[#EFECE6] overflow-hidden cursor-pointer group"
        title="Click to view image"
      >
        <Image 
          src={item.image} 
          alt={item.name} 
          fill
          className="object-cover object-top scale-100 group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
          priority={index === 0}
          unoptimized
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
  const { openLightbox } = useLightbox();
  const { services: dynamicServices } = useSiteData();
  const servicesList = dynamicServices.length > 0 ? dynamicServices : allServices;

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
    <div id="services" className="relative w-full bg-[#FAF9F6]">
      
      {/* ── MOBILE / SMALL DEVICE LAYOUT (FULL SCREEN EDGE-TO-EDGE COVER IMAGES WITH NO DEAD SPACE) ── */}
      <div className="block lg:hidden bg-[#FAF9F6] w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-16 pb-8 border-b border-black/10 bg-[#FAF9F6]">
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-[#1A1A1A] mb-1">
            What We Do
          </h2>
        </div>

        {/* Stacked Images Down-by-Down with 100% Full-Bleed Screen Coverage */}
        <div className="flex flex-col bg-[#FAF9F6] divide-y divide-black/10">
          {servicesList.map((item) => (
            <div key={item.num} className="w-full flex flex-col pb-8">
              
              {/* FULL BLEED CINEMATIC COVER IMAGE (0 SIDE MARGINS / DEAD SPACE, HERO STYLE) */}
              <div 
                onClick={() => openLightbox(item.image, item.name)}
                className="relative w-full h-[85vh] min-h-[480px] bg-[#0D0D0D] overflow-hidden cursor-pointer group"
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

              {/* CAPTION DIRECTLY UNDER THE IMAGE */}
              <div className="px-6 pt-6 flex flex-col gap-2.5">
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