'use client';

import React from 'react';
import Link from 'next/link';

export default function SilhouetteMatrix() {
  const MATRIX_ITEMS = [
    { 
      num: '01',
      label: "Shoulder Axis Balance", 
      formula: "S = A * 1.618", 
      badge: "GOLDEN RATIO GRID",
      desc: "Aligning formal garment structure grids cleanly with the native bone clavicle profile for effortless posture balance." 
    },
    { 
      num: '02',
      label: "Drape Cascade Angle", 
      formula: "D = 45° Drop Velocity", 
      badge: "TEXTILE KINETICS",
      desc: "Calculating raw textile velocity and gravity fall to guarantee fluid movement dynamics during high-profile events." 
    },
    { 
      num: '03',
      label: "Contrast Field Index", 
      formula: "C = 70:30 Monochromatic Split", 
      badge: "PROPORTION HARMONY",
      desc: "Balancing foundational monochromatic tonal blocks against high-impact designer statement accessories." 
    }
  ];

  return (
    <section className="py-20 sm:py-32 bg-[#FAF9F6] border-t border-black/15 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-black/10">
          <div>
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-black/50 block mb-3 font-semibold">
              ✦ MATHEMATICAL ALIGNMENT
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] tracking-tight leading-tight">
              The Mathematical Balance Ratios
            </h2>
          </div>
          <p className="font-serif text-sm sm:text-base text-black/60 font-light italic leading-relaxed max-w-md">
            Precision algorithms behind posture alignment, fabric drape velocity, and silhouette proportioning.
          </p>
        </div>

        {/* Matrix Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {MATRIX_ITEMS.map((item) => (
            <div 
              key={item.num} 
              className="p-8 sm:p-10 bg-[#FAF8F3] border border-black/10 hover:border-black/40 hover:bg-[#1A1A1A] hover:text-white group transition-all duration-500 ease-out rounded-xs shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[9px] text-black/40 group-hover:text-white/50 font-bold">
                    /{item.num}
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 group-hover:text-white/70 bg-white/70 group-hover:bg-white/10 px-2.5 py-1 border border-black/5 group-hover:border-white/10 rounded-xs">
                    {item.badge}
                  </span>
                </div>

                <div className="font-mono text-xs italic tracking-wide text-black/60 group-hover:text-white/80 mb-3">
                  {item.formula}
                </div>

                <h3 className="font-serif text-2xl font-light text-[#1A1A1A] group-hover:text-white mb-3 leading-snug">
                  {item.label}
                </h3>

                <p className="font-sans text-xs text-black/70 group-hover:text-white/80 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/10 group-hover:border-white/15 flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-black/40 group-hover:text-white/50">
                  Precision Standard
                </span>
                <Link
                  href="/connect"
                  className="font-mono text-[9px] tracking-[0.2em] uppercase font-semibold text-black group-hover:text-white underline underline-offset-4"
                >
                  Consult →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}