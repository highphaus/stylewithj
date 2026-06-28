// src/components/sections/AtelierStory.tsx
'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function AtelierStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Structural parallax movement multipliers
  const xTextGlance = useTransform(scrollYProgress, [0, 1], ["5%", "-25%"]);
  const yTextBlocks = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yImageFrame = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // Track cursor offsets relative to the central pattern box
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5, // Map from -0.5 to 0.5
      y: (e.clientY - rect.top) / rect.height - 0.5,  // Map from -0.5 to 0.5
    });
  };

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative min-h-screen bg-[#FAF9F6] text-[#1A1A1A] py-44 overflow-hidden z-20 border-t border-neutral-200"
    >
      {/* ─── BACKGROUND LAYOUT: ARCHIVAL RUNWAY GRID STAMP ─── */}
      <div className="absolute top-[15%] left-0 w-full pointer-events-none select-none overflow-hidden opacity-[0.02] z-0">
        <motion.p 
          style={{ x: xTextGlance }}
          className="font-serif text-[24vw] uppercase tracking-tighter whitespace-nowrap leading-none"
        >
          Sartorial DNA
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* ─── LEFT COLUMN: CORE BRAND MANIFESTO ─── */}
        <motion.div 
          style={{ y: yTextBlocks }}
          className="lg:col-span-5 flex flex-col justify-center z-10"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-neutral-300" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-mono">
              Pattern Identity
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-light tracking-tight font-serif text-[#1A1A1A] leading-[1.1] mb-12">
            Garments constructed <br /> 
            <span className="italic font-normal text-neutral-500 pl-4 md:pl-12">to define structural</span> <br /> 
            identity.
          </h2>

          <div className="text-xs md:text-sm text-neutral-600 leading-relaxed font-light space-y-8 max-w-xl border-l border-neutral-200 pl-6 md:pl-8">
            <p>
              The label operates on the fine boundary separating architectural form from fluid textiles. We believe true presence is an intentional statement, structured carefully through elite pattern tailoring and geometric construction.
            </p>
            <p className="text-neutral-400">
              Operating from a private studio environment, we consult with collectors and curators globally—blending striking contemporary silhouettes with timeless, high-tier textile execution.
            </p>
          </div>
        </motion.div>

        {/* ─── RIGHT COLUMN: INTERACTIVE KINETIC FABRIC DECONSTRUCTION ─── */}
        <div className="lg:col-span-7 relative flex justify-center lg:justify-end w-full">
          <motion.div
            style={{ y: yImageFrame }}
            className="relative w-full max-w-[450px] aspect-[3/4] bg-neutral-50/50 border border-neutral-200/60 p-6 flex flex-col justify-between overflow-hidden group select-none shadow-[0_40px_80px_rgba(0,0,0,0.02)]"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Background Studio Drafting Lines */}
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
            
            {/* Top Spec Labeling Row */}
            <div className="flex justify-between font-mono text-[8px] tracking-widest text-neutral-400 z-20">
              <span>PATTERN // BLK_024</span>
              <span>SCALE: ASYMMETRIC 1:1</span>
            </div>

            {/* THE DECONSTRUCTED CANVAS MATRIX */}
            <div className="relative w-full h-[75%] my-auto flex items-center justify-center">
              
              {/* FRAGMENT 1: Left Vertical Layer (Moves counter to cursor) */}
              <motion.div
                animate={{ 
                  x: isHovered ? mousePos.x * -25 : 0,
                  y: isHovered ? mousePos.y * -15 : 0 
                }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                className="absolute left-4 top-0 w-[45%] h-full overflow-hidden bg-neutral-100 shadow-md border border-white"
              >
                <Image
                  src="/images/img06.jpeg"
                  alt="Pattern Cut Left Profile"
                  fill
                  className="object-cover origin-center scale-110"
                  sizes="30vw"
                />
                <div className="absolute top-2 left-2 font-mono text-[7px] bg-black text-white px-1 tracking-widest">A_LEFT</div>
              </motion.div>

              {/* FRAGMENT 2: Right Top Layer (Slides dynamically outward) */}
              <motion.div
                animate={{ 
                  x: isHovered ? mousePos.x * 35 : 0,
                  y: isHovered ? mousePos.y * -30 : 0
                }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                className="absolute right-4 top-0 w-[45%] h-[45%] overflow-hidden bg-neutral-200 shadow-sm border border-white"
              >
                <Image
                  src="/images/img07.jpeg"
                  alt="Pattern Cut Right Shoulder"
                  fill
                  className="object-cover brightness-95"
                  sizes="25vw"
                />
                <div className="absolute bottom-2 right-2 font-mono text-[7px] text-neutral-400">B_SHOULDER</div>
              </motion.div>

              {/* FRAGMENT 3: Right Bottom Texture Zoom Layer (Floats independently) */}
              <motion.div
                animate={{ 
                  x: isHovered ? mousePos.x * 15 : 0,
                  y: isHovered ? mousePos.y * 40 : 0,
                  rotate: isHovered ? mousePos.x * 8 : 0
                }}
                transition={{ type: "spring", stiffness: 50, damping: 12 }}
                className="absolute right-0 bottom-4 w-[50%] h-[45%] overflow-hidden bg-neutral-300 shadow-xl border-4 border-[#FAF9F6] z-10"
              >
                <Image
                  src="/images/img08.jpeg"
                  alt="Macro Fabric Draping View"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
                <div className="absolute top-2 right-2 font-mono text-[7px] bg-neutral-900 text-white px-1">C_MACRO_TEXTILE</div>
              </motion.div>

              {/* Floating Center Measurement Spec Grid Lines (Only visible on hover) */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <motion.div 
                  animate={{ opacity: isHovered ? 0.3 : 0 }}
                  className="w-full h-px bg-dashed bg-neutral-400 border-t border-dashed"
                />
                <motion.div 
                  animate={{ opacity: isHovered ? 0.3 : 0 }}
                  className="h-full w-px bg-dashed bg-neutral-400 border-l border-dashed absolute"
                />
              </div>

            </div>

            {/* Bottom Technical Spec Footer Row */}
            <div className="flex justify-between font-mono text-[8px] tracking-wider text-neutral-400 border-t border-neutral-100 pt-4 z-20">
              <span>SYSTEM_GRID // REF_049</span>
              <span className="text-neutral-500 animate-pulse">● ATELIER_ACTIVE</span>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}