'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const transformationData = [
  {
    id: "01",
    client: "THE EXECUTIVE ARCHITECT",
    demographic: "FEMALE SILHOUETTE SYSTEM",
    concept: "Deconstructing traditional constraints into structural drop-shoulder lines and deep tonal textures.",
    beforeImg: "/images/Before.jpeg",
    afterImg: "/images/After.jpeg",
    specs: ["Canvas Alteration // Drop Line", "Heavy Matte Crepe Fabrics", "Palette // Pale Bone Tone"]
  },
  {
    id: "02",
    client: "THE MODERN PATRIARCH",
    demographic: "MALE SILHOUETTE SYSTEM",
    concept: "Restructuring upper-torso proportions using monolithic wool structures and raw minimalist layering.",
    beforeImg: "/images/img09.jpeg",
    afterImg: "/images/img10.jpeg",
    specs: ["Proportion Stance // Broadened", "Felted Wool Framework", "Palette // Deep Umber Ash"]
  },
  {
    id: "03",
    client: "THE VISUAL LEGACY FIELD",
    demographic: "FEMALE SILHOUETTE SYSTEM",
    concept: "Curating presence through fluid architectural drapery, asymmetric necklines, and clean geometric lines.",
    beforeImg: "/images/img11.jpeg",
    afterImg: "/images/img12.jpeg",
    specs: ["Fluid Geometric Draping", "Raw Spun Silk Composites", "Palette // True Charcoal Black"]
  },
  {
    id: "04",
    client: "CULTURAL AVANT-GARDE LENS",
    demographic: "MALE SILHOUETTE SYSTEM",
    concept: "A dramatic shift to curated minimalism, blending structured structural drops with historic tailored lines.",
    beforeImg: "/images/img13.jpeg",
    afterImg: "/images/img14.jpeg",
    specs: ["Asymmetric Hem Disruption", "Technical Linen Matrix", "Palette // Slate Graphite"]
  }
];

interface TransformationsProps {
  hideButton?: boolean;
  isPage?: boolean;
}

export default function Transformations({ hideButton = false, isPage = false }: TransformationsProps) {
  const [activeWorkspace, setActiveWorkspace] = useState(0);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          if (!isNaN(index)) {
            setActiveWorkspace(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#FAF9F6] text-[#1A1A1A] relative">
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* ── LEFT MATRIX TRACK: THE IMMOBILE ANTE LAB (STAY-STICKY STATIC STAGE) ── */}
        <div className="lg:col-span-5 hidden lg:block sticky top-0 h-screen overflow-hidden bg-[#EAE8E3] border-r border-black/5">
          
          {/* THE CROSSFADING BASELINE ENGINE */}
          <div className="absolute inset-0 w-full h-full">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeWorkspace}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                src={transformationData[activeWorkspace].beforeImg}
                alt="Baseline Laboratory Frame"
                className="w-full h-full object-cover object-top grayscale-[30%]"
              />
            </AnimatePresence>
          </div>

          {/* SARTORIAL WATERMARKS */}
          <div className="absolute top-12 left-12 z-20">
            <span className="font-sans text-[9px] tracking-[0.6em] text-black/40 block mb-2">
              LABORATORY METADATA RECORDING
            </span>
            <div className="font-sans text-xs font-semibold tracking-widest text-black">
              SYS_ANTE_REF // 0{transformationData[activeWorkspace].id}
            </div>
          </div>

          <div className="absolute bottom-12 left-12 z-20 right-12 flex justify-between items-end">
            <div>
              <span className="font-sans text-[8px] tracking-[0.3em] text-black/30 block mb-1">CURRENT RAW MATRIX</span>
              <span className="font-sans text-[10px] tracking-widest text-black/60 uppercase">
                [ INITIAL STRUCTURAL STATE ]
              </span>
            </div>
            <div className="font-sans text-[4vw] font-extralight text-black/10 tracking-tighter leading-none">
              /{transformationData[activeWorkspace].id}
            </div>
          </div>

        </div>

        {/* ── RIGHT MATRIX TRACK: THE INTERLOCKING FLUID POST RUNWAY ── */}
        <div className="lg:col-span-7 px-6 md:px-16 lg:px-24 flex flex-col pt-32 pb-44">
          
          {/* RUNWAY OVERVIEW DESCRIPTOR */}
          <div className="mb-48 border-b border-black/10 pb-16 text-left max-w-xl">
            <span className="font-sans text-[10px] tracking-[0.6em] text-black/40 block mb-4 uppercase">
              EXHIBITION EDITION // VOL. V
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight leading-none text-[#1A1A1A] mb-6">
              Sartorial <span className="italic text-black/30">Evolutions</span>
            </h2>
            <p className="font-serif text-sm italic text-black/50 leading-relaxed font-light">
              Scroll down naturally. As the right track scales through optimized designs, the sticky left frame alters its raw baseline state synchronously.
            </p>
          </div>

          {/* DYNAMIC SCROLL CONTAINER ROW */}
          <div className="flex flex-col gap-64 w-full">
            {transformationData.map((item, index) => (
              <div
                key={item.id}
                data-index={index}
                ref={(el) => { itemsRef.current[index] = el; }}
                className="w-full flex flex-col text-left pt-12 border-t border-black/[0.06]"
              >
                {/* HEADLINE MARKERS */}
                <div className="flex justify-between items-baseline mb-8">
                  <span className="font-sans text-xs font-semibold text-black/20">0{item.id}</span>
                  <span className="font-sans text-[9px] tracking-[0.2em] text-black/40 uppercase font-medium">
                    {item.demographic}
                  </span>
                </div>

                {/* MOBILE ONLY FALLBACK TRACK FOR THE BEFORE IMAGE */}
                <div className="w-full aspect-[4/5] bg-[#EAE8E3] overflow-hidden mb-6 block lg:hidden">
                  <img 
                    src={item.beforeImg} 
                    alt="Ante State Baseline" 
                    className="w-full h-full object-cover object-top grayscale" 
                  />
                  <div className="p-3 bg-black/5 text-[8px] tracking-widest uppercase font-sans text-black/40">
                    Ante State View
                  </div>
                </div>

                {/* REFINED MONOLITHIC AFTER IMAGE */}
                <div className="w-full aspect-[3/4] bg-[#EAE8E3] overflow-hidden relative shadow-[40px_40px_90px_rgba(0,0,0,0.015)] mb-10 border border-black/[0.01]">
                  <img
                    src={item.afterImg}
                    alt="Realized Design Target"
                    className="w-full h-full object-cover object-top transition-transform duration-[4000ms] ease-out hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-black text-white text-[8px] tracking-[0.4em] px-3 py-1.5 uppercase font-medium">
                    POST // REALIZED SILHOUETTE
                  </div>
                </div>

                {/* SPECS & DESIGN DIRECTION */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4 items-start">
                  <div className="md:col-span-7">
                    <h3 className="font-sans text-sm tracking-[0.2em] font-medium text-[#1A1A1A] uppercase mb-3">
                      {item.client}
                    </h3>
                    <p className="font-serif text-sm italic text-black/60 leading-relaxed font-light">
                      "{item.concept}"
                    </p>
                  </div>
                  
                  {/* SPEC LABELS */}
                  <div className="md:col-span-5 flex flex-col gap-1.5 pt-1 border-t md:border-t-0 md:border-l border-black/10 md:pl-6">
                    {item.specs.map((spec, sIdx) => (
                      <span key={sIdx} className="font-sans text-[9px] tracking-wider text-black/40 uppercase">
                        • {spec}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* REDIRECT INTEGRATION TERMINAL */}
          {!hideButton && (
            <div className="w-full pt-44 mt-44 border-t border-black/10 flex flex-col items-start">
              <span className="font-sans text-[8px] tracking-[0.4em] text-black/30 block mb-3 uppercase">
                ARCHIVE CONCLUSION CONTINUUM
              </span>
              <h4 className="font-serif text-3xl font-light text-[#1A1A1A] mb-8 leading-tight max-w-sm">
                Unlock the entire visual identity ledger.
              </h4>
              <Link
                href="/transformations"
                className="tracking-[0.4em] text-[9px] uppercase font-light text-black/60 hover:text-black transition-all duration-500 py-4 px-10 border border-black/20 hover:border-black rounded-none bg-transparent"
              >
                Access Full Ledger
              </Link>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}