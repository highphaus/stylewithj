// src/components/sections/ClientShowcase.tsx
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id: string;
  num: string;
  client: string;
  scope: string;
  year: string;
  images: string[];
}

const portfolioData: Project[] = [
  {
    id: 'proj-1',
    num: '01 /',
    client: 'The Met Gala / Commission',
    scope: 'Sculpted Architectural Bodice & Silk Veil',
    year: '2025',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600'
    ]
  },
  {
    id: 'proj-2',
    num: '02 /',
    client: 'Vogue Editorial / Cover Art',
    scope: 'Asymmetric Pleated Organza & Tailored Outerwear',
    year: '2025',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600'
    ]
  },
  {
    id: 'proj-3',
    num: '03 /',
    client: 'Slook E-Commerce / Global Campaign',
    scope: 'Minimalist Ready-To-Wear Structural Framework',
    year: '2026',
    images: [
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600'
    ]
  }
];

export default function ClientShowcase() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalize coordinates around center (from -0.5 to 0.5)
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  const activeData = portfolioData.find((p) => p.id === activeProject);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-[#FAF9F6] border-t border-neutral-200 py-44 min-h-screen relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* ─── LEFT SIDE: PRESTIGIOUS TEXT INDEX (Cols 1-7) ─── */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="mb-16">
            <span className="font-mono text-[9px] tracking-[0.5em] text-neutral-400 uppercase block mb-3">
              Archival Retrospective
            </span>
            <h3 className="font-serif text-4xl md:text-6xl font-light tracking-wide text-[#1A1A1A]">
              Selected Commissions
            </h3>
          </div>

          <div className="flex flex-col border-t border-neutral-200">
            {portfolioData.map((project) => (
              <div
                key={project.id}
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
                className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-10 border-b border-neutral-200 cursor-pointer transition-colors duration-500 hover:bg-neutral-100/50 px-4 -mx-4"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-[10px] tracking-widest text-neutral-400 group-hover:text-black transition-colors">
                    {project.num}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-[#1A1A1A] group-hover:translate-x-2 transition-transform duration-500 ease-out">
                      {project.client}
                    </h4>
                    <span className="font-sans text-xs text-neutral-400 uppercase tracking-wider font-light">
                      {project.scope}
                    </span>
                  </div>
                </div>

                <span className="font-mono text-[10px] tracking-widest text-neutral-400 pt-4 md:pt-0">
                  // {project.year}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── RIGHT SIDE: KINETIC COLLAGE CANVAS (Cols 8-12) ─── */}
        <div className="lg:col-span-5 h-[50vh] lg:h-[70vh] relative flex items-center justify-center min-h-[400px]">
          <div className="absolute inset-0 border border-neutral-200/60 bg-neutral-50/30 opacity-60 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <AnimatePresence mode="wait">
            {activeProject && activeData ? (
              <motion.div
                key={activeProject}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Image Fan Layer 1: Primary Large Image */}
                <motion.div
                  animate={{ 
                    x: mousePos.x * 40, 
                    y: mousePos.y * 30,
                    rotate: mousePos.x * -5 
                  }}
                  transition={{ type: "spring", stiffness: 40, damping: 14 }}
                  className="absolute w-[65%] aspect-[3/4] bg-neutral-100 shadow-[0_30px_60px_rgba(0,0,0,0.06)] overflow-hidden border border-white z-20"
                >
                  <Image
                    src={activeData.images[0]}
                    alt="Primary Archive Fragment"
                    fill
                    className="object-cover grayscale brightness-95"
                    sizes="30vw"
                  />
                </motion.div>

                {/* Image Fan Layer 2: Offset Accent Image */}
                <motion.div
                  animate={{ 
                    x: mousePos.x * -50 + 40, 
                    y: mousePos.y * -40 - 20,
                    rotate: mousePos.x * 8 + 4
                  }}
                  transition={{ type: "spring", stiffness: 35, damping: 12 }}
                  className="absolute w-[50%] aspect-[4/5] bg-neutral-200 shadow-[0_40px_80px_rgba(0,0,0,0.08)] overflow-hidden border-[8px] border-[#FAF9F6] z-10"
                >
                  <Image
                    src={activeData.images[1]}
                    alt="Secondary Details Frame"
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </motion.div>

                {/* Floating Technical HUD Coordinate Stamp */}
                <motion.div
                  animate={{ x: mousePos.x * 20, y: mousePos.y * 50 }}
                  className="absolute bottom-6 left-6 font-mono text-[7px] text-neutral-400 bg-white/80 border border-neutral-200 px-2 py-1 uppercase tracking-widest z-30"
                >
                  INDEX_SYS // {activeData.id.toUpperCase()}
                </motion.div>

              </motion.div>
            ) : (
              // Default Blueprint/Standby State
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                className="w-16 h-16 border border-neutral-400 rounded-full flex items-center justify-center font-mono text-xs text-neutral-400"
              >
                +
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}