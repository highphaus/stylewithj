// src/components/sections/AtelierToile.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface GarmentPrototype {
  id: string;
  name: string;
  blueprintCode: string;
  imageSrc: string;
  technicalDetails: string[];
}

const prototypeData: GarmentPrototype[] = [
  {
    id: 'toile-1',
    name: 'Asymmetric Pleated Blouson',
    blueprintCode: 'TL_REF_084_VOL2',
    imageSrc: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800',
    technicalDetails: [
      'Bias cut structural vector deviation: 45°',
      'Dart integration: Dual-radial symmetry fold',
      'Shoulder anchoring reinforcement width: 14.2cm',
    ],
  },
  {
    id: 'toile-2',
    name: 'Deconstructed Sculpted Dress',
    blueprintCode: 'TL_REF_091_VOL2',
    imageSrc: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800',
    technicalDetails: [
      'Fabric memory suspension factor: 82%',
      'Panel intersection seam configurations: 18 count',
      'Volume offset coefficient: +3.4 units',
    ],
  },
];

export default function AtelierToile() {
  const [activeProto, setActiveProto] = useState<GarmentPrototype>(prototypeData[0]);
  const [blueprintActive, setBlueprintActive] = useState(false);

  return (
    <section className="bg-[#FAF9F6] py-44 border-t border-neutral-200 text-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* ─── LEFT PANEL: THE SPEC SHEET CONTROL SYSTEM ─── */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 font-mono">
              Toile Analysis Studio // Prototype Mode
            </span>
          </div>

          <h3 className="font-serif text-4xl md:text-5xl font-light tracking-wide leading-tight mb-8">
            The Digital Toile <br />
            <span className="italic font-normal text-neutral-500">Architecture Canvas</span>
          </h3>

          <p className="font-sans text-xs tracking-widest text-neutral-400 uppercase font-light leading-relaxed mb-12 border-b border-neutral-200 pb-8">
            Activate the engineering blueprint overlay matrix to observe pattern panel distribution configurations and geometric grain balances.
          </p>

          {/* CHOOSE PROTOTYPE BUTTON STRIPS */}
          <div className="flex flex-col gap-4 mb-8">
            {prototypeData.map((proto) => (
              <button
                key={proto.id}
                onClick={() => {
                  setActiveProto(proto);
                  setBlueprintActive(false);
                }}
                className={`text-left py-4 px-6 border transition-all duration-300 flex justify-between items-center font-serif text-lg ${
                  activeProto.id === proto.id ? 'border-black bg-white' : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <span>{proto.name}</span>
                <span className="font-mono text-[8px] uppercase tracking-widest">
                  {activeProto.id === proto.id ? '[ SELECTED ]' : '// INSPECT'}
                </span>
              </button>
            ))}
          </div>

          {/* THE INTERACTIVE TOGGLE KNOB FOR TRACING LINES */}
          <button
            onClick={() => setBlueprintActive(!blueprintActive)}
            className={`font-mono text-[10px] uppercase tracking-[0.3em] px-8 py-4 border text-center transition-all duration-300 ${
              blueprintActive 
                ? 'bg-black text-white border-black' 
                : 'bg-transparent text-black border-black hover:bg-neutral-100'
            }`}
          >
            {blueprintActive ? 'Deactivate Structural Lines [ × ]' : 'Activate Pattern Blueprint [ + ]'}
          </button>
        </div>

        {/* ─── RIGHT PANEL: THE DYNAMIC EXPERIMENTAL BLUEPRINT MATRIX ─── */}
        <div className="lg:col-span-6 lg:col-start-7 w-full flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[420px] aspect-[3/4] bg-neutral-900 overflow-hidden border border-neutral-800 p-6 flex flex-col justify-between shadow-2xl">
            
            {/* Fine Technical Drawing Geometry Sheet Overlay Grid Background */}
            <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#FFF_1px,transparent_1px),linear-gradient(to_bottom,#FFF_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-10" />

            {/* Top Meta Specifications Readout */}
            <div className="relative z-20 flex justify-between font-mono text-[8px] tracking-widest text-neutral-400 mix-blend-difference">
              <span>CANVAS CODE // {activeProto.blueprintCode}</span>
              <span>DRAFT_STATE: {blueprintActive ? 'BLUEPRINT_ACTIVE' : 'NATURAL_VIEW'}</span>
            </div>

            {/* CENTRAL IMAGE VIEWER */}
            <div className="relative w-full h-[72%] my-auto overflow-hidden bg-neutral-950 border border-neutral-800">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProto.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeProto.imageSrc}
                    alt={activeProto.name}
                    fill
                    priority
                    className={`object-cover transition-all duration-700 ease-out ${
                      blueprintActive ? 'brightness-[0.3] contrast-[1.1] saturate-[0.2]' : 'brightness-100'
                    }`}
                    sizes="40vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* DYNAMIC BLUEPRINT TRACING INTERACTIVE VECTOR LINES */}
              <AnimatePresence>
                {blueprintActive && (
                  <motion.svg 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.55 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 w-full h-full stroke-white pointer-events-none z-20" 
                    fill="none" 
                    strokeWidth="0.5"
                  >
                    {/* Pattern Geometry Tracing Line Nodes */}
                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} x1="15%" y1="0" x2="15%" y2="100%" strokeDasharray="3 3" />
                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} x1="85%" y1="0" x2="85%" y2="100%" strokeDasharray="3 3" />
                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.1 }} x1="0" y1="30%" x2="100%" y2="30%" />
                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2 }} x1="0" y1="65%" x2="100%" y2="65%" strokeDasharray="6 3" />
                    
                    {/* Concentric Asymmetric Measurement Circular Darts */}
                    <motion.circle initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9 }} cx="50%" cy="40%" r="55" strokeDasharray="2 4" />
                    <motion.circle initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} cx="35%" cy="55%" r="15" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Panel Specifications Details HUD */}
            <div className="relative z-20 flex flex-col gap-2 font-mono text-[8px] text-neutral-400 border-t border-neutral-800 pt-4 mix-blend-difference">
              <div className="flex justify-between uppercase">
                <span>Tailoring Metric Vectors</span>
                <span>SYSTEM RENDER</span>
              </div>
              
              {/* Animated Detail Notes Output */}
              <div className="min-h-[30px] font-sans text-[10px] text-neutral-500 font-light lowercase leading-relaxed normal-case mt-1">
                {blueprintActive ? (
                  <ul className="list-none space-y-1 font-mono text-[8px] text-neutral-400 uppercase tracking-wider">
                    {activeProto.technicalDetails.map((detail, idx) => (
                      <motion.li 
                        initial={{ opacity: 0, x: -5 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: idx * 0.1 }}
                        key={idx}
                      >
                        // {detail}
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  "Activate the prototype matrix view layer above to populate exact seam distributions and cutting parameters for this look."
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}