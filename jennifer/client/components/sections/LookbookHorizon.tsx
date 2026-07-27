// src/components/sections/LookbookHorizon.tsx
'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const deepArchiveCollection = [
  { id: 1, src: '/images/img06.jpeg', x: '10%', y: '15%', size: 'w-[110px] sm:w-[160px] md:w-[240px]' },
  { id: 2, src: '/images/img07.jpeg', x: '35%', y: '5%',  size: 'w-[95px] sm:w-[130px] md:w-[200px]' },
  { id: 3, src: '/images/img08.jpeg', x: '60%', y: '12%', size: 'w-[125px] sm:w-[170px] md:w-[260px]' },
  { id: 4, src: '/images/img09.jpeg', x: '80%', y: '8%',  size: 'w-[85px] sm:w-[120px] md:w-[180px]' },
  { id: 5, src: '/images/img10.jpeg', x: '5%',  y: '45%', size: 'w-[135px] sm:w-[180px] md:w-[280px]' },
  { id: 6, src: '/images/img11.jpeg', x: '28%', y: '38%', size: 'w-[115px] sm:w-[160px] md:w-[250px]' },
  { id: 7, src: '/images/img12.jpeg', x: '52%', y: '52%', size: 'w-[105px] sm:w-[140px] md:w-[220px]' },
  { id: 8, src: '/images/img13.jpeg', x: '75%', y: '42%', size: 'w-[125px] sm:w-[170px] md:w-[270px]' },
  { id: 9, src: '/images/img14.jpeg', x: '18%', y: '70%', size: 'w-[95px] sm:w-[140px] md:w-[210px]' },
  { id: 10, src: '/images/img15.jpeg', x: '42%', y: '75%', size: 'w-[135px] sm:w-[180px] md:w-[290px]' },
  { id: 11, src: '/images/img16.jpeg', x: '65%', y: '72%', size: 'w-[105px] sm:w-[150px] md:w-[230px]' },
];

export default function LookbookHorizon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [resetKey, setResetKey] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-[#FAF9F6] border-t border-neutral-200 py-24 sm:py-36 relative select-none overflow-hidden"
    >
      {/* SECTION LABELS & CONTROLS */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-8 sm:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 relative z-30 pointer-events-auto">
        <div>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.5em] text-neutral-400 uppercase block mb-3 font-semibold">
            ✦ Atelier Interactive Moodboard // Vol_01
          </span>
          <h3 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-[#1A1A1A]">
            The Tactile Wall
          </h3>
        </div>

        <div className="flex flex-col sm:items-end gap-3">
          <p className="font-mono text-[8px] sm:text-[9px] text-neutral-500 uppercase tracking-widest sm:text-right font-medium bg-black/5 px-3 py-1.5 rounded-full border border-black/5">
            🖐️ Pick & Drag to move and arrange pictures
          </p>
          <button
            onClick={() => setResetKey((k) => k + 1)}
            className="font-mono text-[8px] tracking-[0.25em] text-black/50 hover:text-black uppercase border-b border-black/20 hover:border-black pb-0.5 transition-colors self-start sm:self-auto"
          >
            Reset Wall Composition ↺
          </button>
        </div>
      </div>

      {/* THE PILING MATRIX CANVAS */}
      <div key={resetKey} className="relative w-full h-[100vh] sm:h-[110vh] min-h-[650px] sm:min-h-[750px] px-4 md:px-12 z-10 touch-none">
        
        {/* Architectural Grid Underlay Pattern */}
        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

        {deepArchiveCollection.map((item, index) => {
          const isHovered = hoveredIdx === index;
          
          return (
            <motion.div
              key={`${item.id}-${resetKey}`}
              drag
              dragConstraints={containerRef}
              dragElastic={0.12}
              dragMomentum={true}
              whileDrag={{ 
                scale: 1.12, 
                rotate: (index % 2 === 0 ? 3 : -3),
                zIndex: 100, 
                boxShadow: '0 30px 70px rgba(0,0,0,0.22)' 
              }}
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                left: item.x,
                top: item.y,
              }}
              animate={{
                scale: isHovered ? 1.06 : 1,
                zIndex: isHovered ? 40 : index + 5,
                boxShadow: isHovered 
                  ? '0 30px 60px rgba(0,0,0,0.14)' 
                  : '0 10px 30px rgba(0,0,0,0.03)'
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              className={`absolute aspect-[3/4] ${item.size} border border-neutral-300/80 bg-white overflow-hidden transition-all duration-300 cursor-grab active:cursor-grabbing touch-none select-none rounded-[1px]`}
            >
              <Image
                src={item.src}
                alt={`Collection Frame ${index}`}
                fill
                priority={index < 3}
                className="object-cover transition-transform duration-700 ease-out pointer-events-none"
                sizes="(max-width: 768px) 150px, 300px"
              />

              {/* Dynamic technical info overlay per asset strip */}
              <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8 flex justify-between items-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
                <span className="font-mono text-[7px] tracking-widest text-white/90">INDEX // REF_0{index + 1}</span>
                <span className="font-mono text-[7px] text-white bg-white/20 px-1">2026_C</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CUSTOM STUDIO CROSSHAIR TRACKER MOUSE */}
      <div 
        style={{ left: mousePos.x, top: mousePos.y }}
        className="absolute pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center hidden md:flex"
      >
        <div className="absolute w-8 h-px bg-black/30" />
        <div className="absolute h-8 w-px bg-black/30" />
        <div className="w-1.5 h-1.5 bg-black rounded-full" />
        <div className="absolute top-3 left-3 font-mono text-[6px] tracking-widest text-neutral-500 uppercase bg-[#FAF9F6]/90 px-1.5 py-0.5 border border-neutral-300/60 shadow-xs">
          PICK_AND_DRAG
        </div>
      </div>

    </section>
  );
}