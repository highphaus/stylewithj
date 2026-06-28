// src/components/sections/ConstructionLedger.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GarmentSpec {
  id: string;
  name: string;
  silhouette: string;
  panels: number;
  hours: number;
  yieldMeters: number;
  rarityLimit: number;
  notes: string;
}

const ledgerData: GarmentSpec[] = [
  {
    id: 'spec-1',
    name: 'Asymmetric Sculpted Blazer',
    silhouette: 'Deconstructed Geometric Shoulder',
    panels: 42,
    hours: 74,
    yieldMeters: 3.8,
    rarityLimit: 15,
    notes: 'Requires dual-stage reinforcement tailoring. Each interior seam is hand-bound with silk bias tape to maintain structural projection away from the posture.'
  },
  {
    id: 'spec-2',
    name: 'Pleated Organza Columns',
    silhouette: 'High-Volume Layered Architecture',
    panels: 118,
    hours: 140,
    yieldMeters: 18.5,
    rarityLimit: 5,
    notes: 'Features micro-pleated heat-pressed panel fluting. Panels are joined using invisible hairline blind-stitches to create an illusion of floating material layers.'
  },
  {
    id: 'spec-3',
    name: 'Bias-Cut Fluid Slip Frame',
    silhouette: 'Kinetic Ergonomic Draped Form',
    panels: 14,
    hours: 38,
    yieldMeters: 4.2,
    rarityLimit: 30,
    notes: 'Cut on a strict 45-degree grain deviation. The fabric undergoes a 72-hour tension hang on an archival form prior to final hand-rolling hem stabilization.'
  }
];

export default function ConstructionLedger() {
  const [activeSpec, setActiveSpec] = useState<GarmentSpec>(ledgerData[0]);

  return (
    <section className="bg-[#FAF9F6] py-44 border-t border-neutral-200 relative overflow-hidden text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* ─── LEFT: THE DESIGNER INDEX INDEX (Cols 1-5) ─── */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 font-mono">
              Atelier Ledger // Metrics
            </span>
          </div>

          <h3 className="font-serif text-4xl md:text-5xl font-light tracking-wide leading-tight mb-8">
            Construction <br />
            <span className="italic font-normal text-neutral-500">Specifications</span>
          </h3>

          <p className="font-sans text-xs tracking-widest text-neutral-400 uppercase font-light leading-relaxed mb-12 pb-8 border-b border-neutral-200">
            Explore the raw, non-compromised architectural construction logs defining every limited-tier garment template.
          </p>

          {/* COMPONENT INTERACTION MENU LIST */}
          <div className="flex flex-col border-b border-neutral-200/60">
            {ledgerData.map((spec) => (
              <button
                key={spec.id}
                onClick={() => setActiveSpec(spec)}
                className="text-left py-6 border-t border-neutral-200/60 group flex justify-between items-baseline"
              >
                <span className={`font-serif text-xl md:text-2xl transition-all duration-300 ${activeSpec.id === spec.id ? 'translate-x-2 text-black' : 'text-neutral-400 hover:text-neutral-700'}`}>
                  {spec.name}
                </span>
                <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase">
                  {activeSpec.id === spec.id ? '[ Open Log ]' : '// Read'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ─── RIGHT: THE COMPOSITION DATA DISPLAY HUD (Cols 7-12) ─── */}
        <div className="lg:col-span-6 lg:col-start-7 w-full">
          <div className="relative w-full bg-neutral-50 border border-neutral-200 p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[500px]">
            
            {/* Fine Geometric Drafting Blueprint Watermark */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:25px_25px] pointer-events-none" />
            
            <div className="flex justify-between font-mono text-[8px] tracking-widest text-neutral-400 mb-12 relative z-10">
              <span>LEDGER SHEET // AUTH_024</span>
              <span>ATELIER MODE // VERIFIED</span>
            </div>

            {/* DYNAMIC COUNTER DISPLAY FRAME */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpec.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-2 gap-x-8 gap-y-12 relative z-10"
              >
                {/* METRIC 1 */}
                <div className="flex flex-col gap-2 border-l border-neutral-300 pl-4">
                  <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase">Hand-Stitch Craft</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-4xl font-light text-black">{activeSpec.hours}</span>
                    <span className="font-mono text-[9px] text-neutral-400">Hrs</span>
                  </div>
                </div>

                {/* METRIC 2 */}
                <div className="flex flex-col gap-2 border-l border-neutral-300 pl-4">
                  <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase">Pattern Segments</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-4xl font-light text-black">{activeSpec.panels}</span>
                    <span className="font-mono text-[9px] text-neutral-400">Cut Pieces</span>
                  </div>
                </div>

                {/* METRIC 3 */}
                <div className="flex flex-col gap-2 border-l border-neutral-300 pl-4">
                  <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase">Material Yield</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-4xl font-light text-black">{activeSpec.yieldMeters}</span>
                    <span className="font-mono text-[9px] text-neutral-400">Linear M</span>
                  </div>
                </div>

                {/* METRIC 4 */}
                <div className="flex flex-col gap-2 border-l border-neutral-300 pl-4">
                  <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase">Archival Edition</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-4xl font-light text-black">{activeSpec.rarityLimit}</span>
                    <span className="font-mono text-[9px] text-neutral-400">Worldwide</span>
                  </div>
                </div>

                {/* TECHNICAL NOTES EXPANSION BLOCK */}
                <div className="col-span-2 pt-8 border-t border-neutral-200 mt-4 flex flex-col gap-3">
                  <span className="font-mono text-[8px] tracking-widest text-neutral-400 uppercase">Tailoring Methodology Notes:</span>
                  <p className="font-sans text-xs md:text-sm text-neutral-600 leading-relaxed font-light">
                    {activeSpec.notes}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Form Factor HUD Info */}
            <div className="flex justify-between font-mono text-[8px] tracking-wider text-neutral-400 border-t border-neutral-200/60 pt-8 mt-12 relative z-10">
              <span>SILHOUETTE: {activeSpec.silhouette.toUpperCase()}</span>
              <span className="text-neutral-400">REV // 02</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}