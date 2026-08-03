'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLightbox } from '@/components/ImageLightbox';

const galleryItems = [
  { id: 1, category: "western", src: "/images/includes/B4A2A5F7-FFA5-4B7A-9B0F-5EA8653D623E.JPG.jpeg", aspect: "aspect-[3/4]", title: "Satin Polka Dot Slip", desc: "Fluid bias-cut polka dot slip dress styled with ankle strap heels on a grand wooden staircase." },
  { id: 2, category: "editorial", src: "/images/includes/IMG_8709.JPG.jpeg", aspect: "aspect-[4/5]", title: "Sculpted Peplum Gown", desc: "Structured black strapless peplum column silhouette set against resort waters." },
  { id: 3, category: "western", src: "/images/includes/IMG_9051.JPG.jpeg", aspect: "aspect-[3/2]", title: "Meadow Halter Midi", desc: "Earthy chic white halter dress accessorized with statement leather disc belt." },
  { id: 4, category: "resort", src: "/images/includes/IMG_3112.JPG.jpeg", aspect: "aspect-[3/4]", title: "Ocean Halter Backless Gown", desc: "Minimalist black backless maxi dress styled for sunset ocean coastal breeze." },
  { id: 5, category: "casual", src: "/images/includes/IMG_9135.JPG.jpeg", aspect: "aspect-[4/5]", title: "Boho Floral Midi", desc: "Relaxed white floral bohemian dress paired with rustic leather boots." },
  { id: 6, category: "editorial", src: "/images/includes/IMG_8826.JPG.jpeg", aspect: "aspect-[3/2]", title: "Midnight Off-Shoulder Gown", desc: "Sophisticated off-shoulder gathered dress with gold wrist cuffs and sleek sunglasses." },
  { id: 7, category: "western", src: "/images/includes/IMG_0263.JPG.jpeg", aspect: "aspect-[3/4]", title: "Golden Hour Sunset Dress", desc: "Vibrant blush rose pleated midi dress catching warm golden hour sunlight." },
  { id: 8, category: "casual", src: "/images/includes/IMG_8236.JPG.jpeg", aspect: "aspect-[4/5]", title: "Puff-Sleeve Floral Sundress", desc: "Smocked corset bodice mini dress with delicate blue floral sprigs on green lawn." },
  { id: 9, category: "editorial", src: "/images/includes/IMG_8694.JPG.jpeg", aspect: "aspect-[3/2]", title: "Structured Poolside Stance", desc: "Sharp strapless corset peplum gown styled with gold choker necklace." },
  { id: 10, category: "resort", src: "/images/includes/IMG_8846.JPG.jpeg", aspect: "aspect-[3/4]", title: "Cliffside Ocean Silhouette", desc: "Full-length profile of the midnight navy off-shoulder evening drape." },
  { id: 11, category: "casual", src: "/images/includes/IMG_9140.JPG.jpeg", aspect: "aspect-[4/5]", title: "Rustic Lakeside Curation", desc: "Bohemian floral dress paired with leather boots in coastal field." },
  { id: 12, category: "western", src: "/images/includes/IMG_9060.JPG.jpeg", aspect: "aspect-[3/2]", title: "Sunlit Field Stance", desc: "White halter dress accentuating natural waistlines." },
  { id: 13, category: "casual", src: "/images/includes/IMG_0270.JPG.jpeg", aspect: "aspect-[3/4]", title: "Golden Meadow Horizon", desc: "Romantic blush pink midi dress in open sunset landscape." },
  { id: 14, category: "resort", src: "/images/includes/IMG_8863.JPG.jpeg", aspect: "aspect-[4/5]", title: "Tropical Resort Elegance", desc: "High-end resort wear curated for summer getaway destinations." },
  { id: 15, category: "editorial", src: "/images/includes/IMG_4485.JPG.jpeg", aspect: "aspect-[3/2]", title: "Architectural Motion Drape", desc: "Contemporary polka dot midi dress in natural motion." }
];

export default function GalleryGrid() {
  const [filter, setFilter] = useState<'all' | 'western' | 'editorial' | 'resort' | 'casual'>('all');
  const { openLightbox } = useLightbox();

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="w-full bg-[#FAF9F6] text-[#1A1A1A] pb-20 sm:pb-32">
      
      {/* ── HEADER BUCKET ── */}
      <header className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-b border-black/5 pb-10 pt-16 sm:pt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight leading-none text-[#1A1A1A]">
              Lookbook
            </h1>
          </div>
          <div className="max-w-xs text-left md:text-right">
            <p className="font-serif text-xs italic text-black/60 leading-relaxed font-light">
              A visual archive cataloging Western wear, resort silhouettes, and curated editorial looks styled by Jennifer.
            </p>
          </div>
        </div>

        {/* ── FILTER TABS ── */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-8 text-[9px] tracking-[0.25em] uppercase font-light">
          {(['all', 'western', 'editorial', 'resort', 'casual'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 transition-all duration-300 border rounded-xs ${
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

      {/* ── RESPONSIVE 2-COLUMN MOBILE & 3-COLUMN DESKTOP GRID CONTAINER ── */}
      <main className="sm:px-8 lg:px-20 max-w-7xl mx-auto py-0 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openLightbox(item.src, item.title, {
                  category: item.category.toUpperCase(),
                  story: item.desc,
                  concept: 'Curated Lookbook Archive',
                  fabric: 'High-Tier Drape & Craftsmanship',
                  occasion: item.category === 'western' ? 'Everyday Workwear & Dinners' : item.category === 'editorial' ? 'Red Carpet & Evening Events' : 'Resort, Beachside & Holiday Edits'
                })}
                className="relative group overflow-hidden bg-[#EAE8E3] border-b border-black/[0.06] sm:border sm:rounded-sm h-[100dvh] sm:h-auto sm:aspect-[3/4] shadow-xs cursor-pointer"
                title="Click to view image"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover object-top sm:object-center transition-transform duration-[2500ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* EDITORIAL GLIDE-UP HOVER OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-6 select-none text-white">
                  <h3 className="font-serif text-sm sm:text-lg tracking-wide uppercase mb-0.5 sm:mb-1 font-light">
                    {item.title}
                  </h3>
                  <p className="text-[9px] sm:text-[11px] text-white/80 leading-relaxed font-light max-w-xs line-clamp-2">
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
