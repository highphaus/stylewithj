// src/components/sections/FabricPhysicsLab.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface FabricPreset {
  id: string;
  name: string;
  composition: string;
  weight: string;
  description: string;
  imageUrl: string;
  blurStyle: string;
}

const fabricPresets: FabricPreset[] = [
  {
    id: 'fab-1',
    name: 'Architectural Organza',
    composition: '100% Silk Gazar Filament',
    weight: '42 gsm // Heavy Structural Hold',
    description: 'Engineered with extreme tensile memory to retain geometric shapes and sharp, volumetric silhouettes away from the physical silhouette frame.',
    imageUrl: '/images/img01.jpeg',
    blurStyle: 'contrast-[1.15] brightness-[1.05]'
  },
  {
    id: 'fab-2',
    name: 'Fluid Liquid Crepe',
    composition: 'Rayon Viscose Matte Twill',
    weight: '280 gsm // Kinetic Low-Bias Drop',
    description: 'A heavy, bias-cut structural drape that cascades down coordinates like water, tracing physical posture with high-velocity kinetic drop paths.',
    imageUrl: '/images/img02.jpeg',
    blurStyle: 'brightness-[0.85] contrast-[0.95]'
  },
  {
    id: 'fab-3',
    name: 'Raw Technical Canvas',
    composition: 'Unbleached Flax Flax-Hemp Matrix',
    weight: '410 gsm // Architectural Sculpt',
    description: 'The raw foundation of pattern engineering. Rigid, tactile structural weave showing industrial cross-hatching, perfect for structural baselines.',
    imageUrl: '/images/img03.jpeg',
    blurStyle: 'contrast-[1.05] saturate-[0.8]'
  }
];

export default function FabricPhysicsLab() {
  const [selectedFabric, setSelectedFabric] = useState<FabricPreset>(fabricPresets[0]);
  const [tensionValue, setTensionValue] = useState<number>(65);

  return (
    <section className="bg-[#FAF9F6] py-44 border-t border-neutral-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* ─── LEFT PANEL: THE INTERACTIVE SYSTEM METRICS (Cols 1-5) ─── */}
        <div className="lg:col-span-5 flex flex-col justify-center z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 font-mono">
              Laboratory Engine // V_0.2
            </span>
          </div>

          <h3 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-[#1A1A1A] leading-tight mb-8">
            Textile Draping <br />
            <span className="italic font-normal text-neutral-500">Kinetic Physics</span>
          </h3>

          <p className="font-sans text-xs tracking-widest text-neutral-400 uppercase font-light leading-relaxed mb-12 pb-8 border-b border-neutral-200">
            Simulate material tension parameters to visualize structural behavior across variant high-tier seasonal material fibers.
          </p>

          {/* FABRIC SELECTOR SELECTION PLATFORM */}
          <div className="flex flex-col gap-4 mb-12">
            {fabricPresets.map((fabric) => (
              <button
                key={fabric.id}
                onClick={() => setSelectedFabric(fabric)}
                className="text-left w-full group relative py-3 px-4 flex items-center justify-between border transition-all duration-300"
                style={{
                  borderColor: selectedFabric.id === fabric.id ? '#1A1A1A' : 'transparent',
                  backgroundColor: selectedFabric.id === fabric.id ? '#FAF9F6' : 'transparent'
                }}
              >
                <div className="flex flex-col">
                  <span className="font-serif text-lg text-[#1A1A1A]">{fabric.name}</span>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-400 mt-1">
                    {fabric.composition}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-neutral-400">
                  {selectedFabric.id === fabric.id ? '[ ACTIVE ]' : '// SELECT'}
                </span>
              </button>
            ))}
          </div>

          {/* DYNAMIC PARAMETER KNOB CONTROL */}
          <div className="flex flex-col gap-3 font-mono text-[9px] text-neutral-500 bg-neutral-50 p-6 border border-neutral-200/60">
            <div className="flex justify-between uppercase tracking-widest">
              <span>Weave Warp Tension Metric</span>
              <span className="text-black font-bold">{tensionValue}% Scale</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="120" 
              value={tensionValue}
              onChange={(e) => setTensionValue(Number(e.target.value))}
              className="w-full h-px bg-neutral-300 appearance-none cursor-ew-resize accent-black mt-2" 
            />
            <div className="flex justify-between font-mono text-[7px] text-neutral-400 uppercase mt-1">
              <span>0.1x Fluid Fluidity</span>
              <span>1.5x Rigid Architecture</span>
            </div>
          </div>
        </div>

        {/* ─── RIGHT PANEL: THE DYNAMIC EXPERIMENTAL VIEWPORT (Cols 7-12) ─── */}
        <div className="lg:col-span-6 lg:col-start-7 w-full flex justify-center lg:justify-end relative">
          
          <div className="relative w-full max-w-[440px] aspect-[3/4] overflow-hidden bg-neutral-950 p-6 flex flex-col justify-between border border-neutral-800 shadow-2xl">
            {/* Fine Grid Background Vector Matrix */}
            <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#FFF_1px,transparent_1px),linear-gradient(to_bottom,#FFF_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />
            
            {/* Top HUD Frame Details */}
            <div className="relative z-20 flex justify-between font-mono text-[8px] tracking-widest text-neutral-500">
              <span>RENDER // SIM_O26_GRID</span>
              <span>EST_WT: {selectedFabric.weight}</span>
            </div>

            {/* CENTRAL IMAGE SIMULATOR CONTAINER CANVAS */}
            <div className="relative w-full h-[70%] my-auto overflow-hidden border border-neutral-900 bg-neutral-900/40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFabric.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={selectedFabric.imageUrl}
                    alt={selectedFabric.name}
                    fill
                    priority
                    className={`object-cover transition-all duration-300 ${selectedFabric.blurStyle}`}
                    style={{ 
                      transform: `scale(${1 + (tensionValue - 65) * 0.0015})`,
                      filter: `contrast(${100 + (tensionValue - 65) * 0.3}%) brightness(${95 - (tensionValue - 65) * 0.1}%)`
                    }}
                    sizes="40vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Decorative Drafting Vector Geometry Overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none stroke-neutral-400" fill="none" strokeWidth="0.5">
                <line x1="0" y1="0" x2="100%" y2="100%" strokeDasharray="4 4" />
                <line x1="100%" y1="0" x2="0" y2="100%" strokeDasharray="4 4" />
                <circle cx="50%" cy="50%" r={tensionValue * 1.5} className="transition-all duration-300" strokeDasharray="2 2" />
              </svg>
            </div>

            {/* Bottom HUD Text Manifesto Details */}
            <div className="relative z-20 pt-4 border-t border-neutral-900 flex flex-col gap-2 font-mono text-[8px] text-neutral-500">
              <div className="flex justify-between">
                <span>MAT_COMP: {selectedFabric.composition}</span>
                <span>STATUS: LOCKED_IN</span>
              </div>
              <p className="font-sans text-[10px] font-light leading-relaxed normal-case text-neutral-400 mt-2">
                {selectedFabric.description}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}