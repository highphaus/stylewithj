'use client';

import React from 'react';
import Link from 'next/link';
import { useLightbox } from '@/components/ImageLightbox';

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
  isStatic?: boolean;
}

export default function Transformations({ hideButton = false }: TransformationsProps) {
  const { openLightbox } = useLightbox();

  const handleOpenLightbox = (imgSrc: string, clientName: string, label: string, currentItem: typeof transformationData[0]) => {
    openLightbox(imgSrc, `${clientName} (${label})`, {
      num: currentItem.id,
      category: currentItem.demographic,
      concept: currentItem.concept,
      story: `${currentItem.concept} — Specifications: ${currentItem.specs.join(' • ')}`,
      fabric: currentItem.specs.join(' • '),
      tag: label
    });
  };

  return (
    <section 
      id="transformations" 
      className="relative w-full bg-[#FAF9F6] border-b border-black/10 py-16 sm:py-24 overflow-hidden"
    >
      <div className="w-full flex flex-col gap-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-6 max-w-7xl mx-auto w-full px-4 sm:px-10 lg:px-16">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] tracking-tight">
              Transformations
            </h2>
          </div>

          <div className="font-mono text-xs tracking-[0.3em] uppercase text-black/50 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black/60" />
            0{transformationData.length} CASE STUDIES ARCHIVED
          </div>
        </div>

        {/* STACKED DOWN-BY-DOWN REPEAT CASE STUDIES (ALL CASE STUDIES RENDERED DOWN BY DOWN) */}
        <div className="flex flex-col gap-20 divide-y divide-black/15">
          {transformationData.map((item, idx) => (
            <div key={item.id} className={`flex flex-col gap-6 ${idx > 0 ? 'pt-20' : ''}`}>
              
              {/* Case Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 max-w-7xl mx-auto w-full px-4 sm:px-10 lg:px-16">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/45 font-bold block mb-1">
                    ✦ CASE STUDY {item.id} // {item.demographic}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl font-light text-[#1A1A1A] tracking-tight uppercase">
                    {item.client}
                  </h3>
                </div>
              </div>

              {/* FULL-BLEED 100% WIDTH CANVAS (0 GAP TOUCHING LEFT AND RIGHT SIDES) */}
              <div className="w-full overflow-hidden">
                <div className="grid grid-cols-2 gap-0 w-full h-[75vh] min-h-[480px] sm:min-h-[600px] border-y border-black/15 overflow-hidden">
                  
                  {/* BEFORE FRAME (TOUCHES LEFT EDGE) */}
                  <div 
                    onClick={() => handleOpenLightbox(item.beforeImg, item.client, 'BEFORE', item)}
                    className="group relative w-full h-full bg-[#0D0D0D] overflow-hidden border-r border-black/15 cursor-pointer"
                    title="Click to view full high-res image & details"
                  >
                    <img
                      src={item.beforeImg}
                      alt={`${item.client} Before`}
                      className="w-full h-full object-cover object-top grayscale-[15%] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      draggable="false"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-6 bg-[#FAF9F6]/95 border border-black/10 px-3.5 py-1 text-[8px] sm:text-[9px] tracking-[0.25em] font-mono text-black uppercase font-bold shadow-xs">
                      BEFORE
                    </div>
                    <div className="absolute bottom-4 left-6 bg-black/80 backdrop-blur-md text-white/90 px-3.5 py-1 text-[8px] tracking-[0.2em] font-mono uppercase rounded-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                      ✦ CLICK TO EXPAND
                    </div>
                  </div>

                  {/* AFTER FRAME (TOUCHES RIGHT EDGE) */}
                  <div 
                    onClick={() => handleOpenLightbox(item.afterImg, item.client, 'AFTER', item)}
                    className="group relative w-full h-full bg-[#0D0D0D] overflow-hidden cursor-pointer"
                    title="Click to view full high-res image & details"
                  >
                    <img
                      src={item.afterImg}
                      alt={`${item.client} After`}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      draggable="false"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 right-6 bg-black text-white px-3.5 py-1 text-[8px] sm:text-[9px] tracking-[0.25em] font-mono uppercase font-bold shadow-xs border border-white/10">
                      AFTER
                    </div>
                    <div className="absolute bottom-4 right-6 bg-black/80 backdrop-blur-md text-white/90 px-3.5 py-1 text-[8px] tracking-[0.2em] font-mono uppercase rounded-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                      ✦ CLICK TO EXPAND
                    </div>
                  </div>

                </div>
              </div>

              {/* Subtext Bar: Narrative & Specs Underneath */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#EFECE6] p-6 border border-black/10 rounded-xs shadow-xs max-w-7xl mx-auto w-[calc(100%-2rem)] sm:w-[calc(100%-5rem)]">
                <div className="flex flex-col gap-1 max-w-2xl">
                  <p className="font-serif text-sm sm:text-base italic font-light text-black/85 leading-relaxed">
                    "{item.concept}"
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-black/40 font-bold mr-1">
                      SPECS:
                    </span>
                    {item.specs.map((spec, i) => (
                      <span 
                        key={i} 
                        className="font-mono text-[9px] tracking-wide text-black/75 bg-white/70 px-2.5 py-0.5 rounded-xs border border-black/5"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                  <Link
                    href="/connect"
                    className="tracking-[0.25em] text-[9px] uppercase font-mono font-semibold text-white bg-[#1A1A1A] hover:bg-black transition-all py-3 px-6 shadow-xs rounded-xs cursor-pointer"
                  >
                    Book Transformation →
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Ledger Footer Call to Action */}
      {!hideButton && (
        <div className="w-full pt-16 pb-6 border-t border-black/10 flex flex-col items-center text-center px-6 mt-20 max-w-7xl mx-auto">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-black/45 block mb-2 font-semibold">
            EXPLORE THE COMPLETE COLLECTION
          </span>
          <h4 className="font-serif text-2xl sm:text-4xl font-light text-[#1A1A1A] mb-6 leading-tight max-w-md">
            Ready for your personal style transformation?
          </h4>
          <Link
            href="/transformations"
            className="tracking-[0.3em] text-[9px] uppercase font-mono font-semibold text-[#1A1A1A] bg-[#EFECE6] hover:bg-[#EAE8E3] border border-black/10 transition-all py-4 px-8 rounded-xs cursor-pointer inline-block"
          >
            Access Full Archive →
          </Link>
        </div>
      )}

    </section>
  );
}