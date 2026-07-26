'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const galleryItems = [
  { id: 1, category: "editorial", src: "/images/img01.jpeg", aspect: "aspect-[3/4]", title: "Draped Fluidity", desc: "Experimentation with asymmetric satin structures." },
  { id: 2, category: "silhouettes", src: "/images/img02.jpeg", aspect: "aspect-[4/5]", title: "Tailored Architecture", desc: "Double-breasted sharp shoulders in premium felted wool." },
  { id: 3, category: "minimalist", src: "/images/img03.jpeg", aspect: "aspect-[3/2]", title: "Archival Monolith", desc: "Clean linear geometry against neutral concrete." },
  { id: 4, category: "editorial", src: "/images/img04.jpeg", aspect: "aspect-[3/4]", title: "Contrast Composition", desc: "Bone and charcoal layered fabrics." },
  { id: 5, category: "silhouettes", src: "/images/img05.jpeg", aspect: "aspect-[4/5]", title: "Spun Silk Flow", desc: "Fluid bias-cut silk organza movements." },
  { id: 6, category: "minimalist", src: "/images/img06.jpeg", aspect: "aspect-[3/2]", title: "Shadow Play", desc: "Heavy texture contrasts in raw linen." },
  { id: 7, category: "editorial", src: "/images/img07.jpeg", aspect: "aspect-[3/4]", title: "Sculpted Outline", desc: "High-contrast geometric edge detail." },
  { id: 8, category: "silhouettes", src: "/images/img08.jpeg", aspect: "aspect-[4/5]", title: "Liquid Crepe Drop", desc: "Relaxed volume tailoring." },
  { id: 9, category: "minimalist", src: "/images/img09.jpeg", aspect: "aspect-[3/2]", title: "Asymmetric Hem", desc: "Deconstructed canvas wool layers." },
  { id: 10, category: "editorial", src: "/images/img10.jpeg", aspect: "aspect-[3/4]", title: "Executive Stance", desc: "Structured wool canvas coat styling." },
  { id: 11, category: "silhouettes", src: "/images/img11.jpeg", aspect: "aspect-[4/5]", title: "Tonal Realignment", desc: "Slate graphite draping lines." },
  { id: 12, category: "minimalist", src: "/images/img12.jpeg", aspect: "aspect-[3/2]", title: "Linen Matrix", desc: "Fine weave macro details." },
  { id: 13, category: "editorial", src: "/images/img13.jpeg", aspect: "aspect-[3/4]", title: "Avant-Garde Frame", desc: "Dramatically styled profile silhouette." },
  { id: 14, category: "silhouettes", src: "/images/img14.jpeg", aspect: "aspect-[4/5]", title: "Obsidian Drape", desc: "Deep dark textural contrasts." },
  { id: 15, category: "minimalist", src: "/images/img15.jpeg", aspect: "aspect-[3/2]", title: "Bone Structure", desc: "Minimal cream fabric folds." },
];

export default function GalleryGrid() {
  const [filter, setFilter] = useState<'all' | 'editorial' | 'silhouettes' | 'minimalist'>('all');

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="w-full bg-[#FAF9F6] text-[#1A1A1A] pb-24 sm:pb-36">
      
      {/* ── HEADER BUCKET ── */}
      <header className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-b border-black/5 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-sans text-[10px] tracking-[0.6em] uppercase text-black/40 block mb-3">
              EXHIBITION GALLERY // CAPTURES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight leading-none">
              Aesthetic <span className="italic text-black/30">Index.</span>
            </h2>
          </div>
          <div className="max-w-xs text-left md:text-right">
            <p className="font-serif text-xs italic text-black/50 leading-relaxed font-light">
              A visual archive cataloging structural forms, raw textile textures, and custom campaigns.
            </p>
          </div>
        </div>

        {/* ── FILTER TABS ── */}
        <div className="flex flex-wrap gap-3 mt-12 text-[9px] tracking-[0.25em] uppercase font-light">
          {(['all', 'editorial', 'silhouettes', 'minimalist'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 transition-all duration-300 border ${
                filter === cat 
                  ? 'bg-black text-white border-black font-medium shadow-sm' 
                  : 'bg-transparent text-black/60 border-black/10 hover:border-black hover:text-black font-light'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* ── MASONRY/GRID CONTAINER ── */}
      <main className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto py-16">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`break-inside-avoid relative group overflow-hidden bg-[#EAE8E3] border border-black/[0.02] ${item.aspect}`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover object-center transition-transform duration-[3000ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* EDITORIAL GLIDE-UP HOVER OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 select-none text-white">
                  <span className="text-[8px] tracking-[0.4em] uppercase text-white/50 mb-2 font-mono">
                    [ CAT_ITEM_0{item.id} // {item.category.toUpperCase()} ]
                  </span>
                  <h3 className="font-sans text-lg tracking-wide uppercase mb-1 font-light">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-white/70 leading-relaxed font-light max-w-xs">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
