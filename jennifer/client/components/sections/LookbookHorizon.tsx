// src/components/sections/LookbookHorizon.tsx
'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const deepArchiveCollection = [
  { id: 1, src: '/images/img06.jpeg', left: '6%', top: '10%', size: 'w-[120px] sm:w-[170px] md:w-[240px]' },
  { id: 2, src: '/images/img07.jpeg', left: '32%', top: '4%', size: 'w-[100px] sm:w-[140px] md:w-[200px]' },
  { id: 3, src: '/images/img08.jpeg', left: '58%', top: '8%', size: 'w-[130px] sm:w-[180px] md:w-[260px]' },
  { id: 4, src: '/images/img09.jpeg', left: '78%', top: '6%', size: 'w-[95px] sm:w-[130px] md:w-[180px]' },
  { id: 5, src: '/images/img10.jpeg', left: '4%', top: '44%', size: 'w-[140px] sm:w-[190px] md:w-[280px]' },
  { id: 6, src: '/images/img11.jpeg', left: '26%', top: '36%', size: 'w-[120px] sm:w-[170px] md:w-[250px]' },
  { id: 7, src: '/images/img12.jpeg', left: '50%', top: '48%', size: 'w-[110px] sm:w-[150px] md:w-[220px]' },
  { id: 8, src: '/images/img13.jpeg', left: '72%', top: '38%', size: 'w-[130px] sm:w-[180px] md:w-[270px]' },
  { id: 9, src: '/images/img14.jpeg', left: '16%', top: '68%', size: 'w-[100px] sm:w-[140px] md:w-[210px]' },
  { id: 10, src: '/images/img15.jpeg', left: '40%', top: '72%', size: 'w-[140px] sm:w-[190px] md:w-[290px]' },
  { id: 11, src: '/images/img16.jpeg', left: '64%', top: '66%', size: 'w-[110px] sm:w-[155px] md:w-[230px]' },
];

function TactileCard({ 
  item, 
  index, 
  boardRef 
}: { 
  item: typeof deepArchiveCollection[0]; 
  index: number; 
  boardRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      drag
      dragConstraints={boardRef}
      dragElastic={0.08}
      dragMomentum={true}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        left: item.left,
        top: item.top,
      }}
      animate={{
        scale: isDragging ? 1.12 : isHovered ? 1.05 : 1,
        rotate: isDragging ? (index % 2 === 0 ? 3 : -3) : 0,
        zIndex: isDragging ? 200 : isHovered ? 50 : index + 5,
        boxShadow: isDragging 
          ? '0 30px 80px rgba(0,0,0,0.3)' 
          : isHovered 
          ? '0 20px 50px rgba(0,0,0,0.15)' 
          : '0 8px 25px rgba(0,0,0,0.04)'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="absolute aspect-[3/4] border border-black/15 bg-white overflow-hidden cursor-grab active:cursor-grabbing touch-none select-none rounded-[2px]"
    >
      <div className={`relative h-full ${item.size} pointer-events-none`}>
        <Image
          src={item.src}
          alt={`Collection Frame ${index}`}
          fill
          priority={index < 3}
          className="object-cover pointer-events-none"
          sizes="(max-width: 768px) 150px, 300px"
        />
      </div>
    </motion.div>
  );
}

export default function LookbookHorizon() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);

  return (
    <section className="bg-[#FAF9F6] border-t border-neutral-200 py-20 sm:py-32 relative select-none overflow-hidden">
      {/* SECTION LABELS & CONTROLS */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-6 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 relative z-30 pointer-events-auto">
        <div>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.5em] text-neutral-400 uppercase block mb-2 font-semibold">
            ✦ Atelier Interactive Moodboard
          </span>
          <h3 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-[#1A1A1A]">
            The Tactile Wall
          </h3>
        </div>

        <div className="flex flex-col sm:items-end gap-3">
          <p className="font-mono text-[8px] sm:text-[9px] text-neutral-700 uppercase tracking-widest sm:text-right font-semibold bg-black/5 px-3 py-1.5 rounded-full border border-black/10">
            🖐️ Click or Touch Photos to Drag & Rearrange
          </p>
          <button
            onClick={() => setResetKey((k) => k + 1)}
            className="font-mono text-[9px] tracking-[0.25em] text-black/60 hover:text-black uppercase border-b border-black/30 hover:border-black pb-0.5 transition-colors self-start sm:self-auto font-medium"
          >
            Reset Wall Composition ↺
          </button>
        </div>
      </div>

      {/* THE PILING MATRIX CANVAS (touch-auto / touch-pan-y allows normal page scrolling on empty space) */}
      <div 
        key={resetKey}
        ref={boardRef} 
        className="relative w-full h-[85vh] sm:h-[100vh] min-h-[550px] sm:min-h-[700px] px-4 md:px-12 z-10 touch-pan-y overflow-hidden"
      >
        {/* Architectural Grid Underlay Pattern */}
        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

        {deepArchiveCollection.map((item, index) => (
          <TactileCard 
            key={`${item.id}-${resetKey}`}
            item={item}
            index={index}
            boardRef={boardRef}
          />
        ))}
      </div>
    </section>
  );
}