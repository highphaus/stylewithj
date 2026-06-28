// src/components/sections/AtelierConsultation.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Step = 'archetype' | 'material' | 'pipeline' | 'manifest';

export default function AtelierConsultation() {
  const [currentStep, setCurrentStep] = useState<Step>('archetype');
  const [config, setConfig] = useState({
    archetype: '',
    material: '',
    pipeline: '',
  });

  const handleSelect = (field: keyof typeof config, value: string, nextStep: Step) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
    setCurrentStep(nextStep);
  };

  const resetProtocol = () => {
    setConfig({ archetype: '', material: '', pipeline: '' });
    setCurrentStep('archetype');
  };

  return (
    <section className="bg-[#FAF9F6] py-44 border-t border-neutral-200 text-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* ─── LEFT COLUMN: STUDIO STATUS INDICATORS (Cols 1-4) ─── */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 font-mono">
              Protocol System // Secure
            </span>
          </div>

          <h3 className="font-serif text-3xl md:text-4xl font-light tracking-wide leading-tight mb-8">
            The Commission <br />
            <span className="italic font-normal text-neutral-500">Intake Desk</span>
          </h3>

          <div className="space-y-4 font-mono text-[9px] uppercase tracking-widest text-neutral-400 pt-8 border-t border-neutral-200">
            <div className="flex justify-between">
              <span>Studio Route:</span>
              <span className="text-black">{currentStep.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span>Current Status:</span>
              <span className="text-neutral-500">Awaiting Specifications</span>
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN: THE STEP-BY-STEP SELECTION FORM (Cols 6-12) ─── */}
        <div className="lg:col-span-7 lg:col-start-6 w-full min-h-[350px] flex items-center">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: ARCHETYPE CONFIGURATION */}
            {currentStep === 'archetype' && (
              <motion.div
                key="step-archetype"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="w-full space-y-8"
              >
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">[ Protocol 01 / Select Archetype Structure ]</span>
                <h4 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-neutral-800">What silhouette silhouette plane are we building?</h4>
                <div className="flex flex-wrap gap-4 pt-4">
                  {['Deconstructed Tailored Blazer', 'Asymmetric Architectural Gown', 'Fluid Crop Pattern Top', 'Sculpted Heavy Wool Coat'].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSelect('archetype', item, 'material')}
                      className="font-mono text-[10px] uppercase tracking-widest border border-neutral-300 px-6 py-4 hover:border-black hover:bg-neutral-50 transition-all"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: MATERIAL SELECTION */}
            {currentStep === 'material' && (
              <motion.div
                key="step-material"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="w-full space-y-8"
              >
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">[ Protocol 02 / Material Core Sourcing ]</span>
                <h4 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-neutral-800">Assign the material fiber composition:</h4>
                <div className="flex flex-wrap gap-4 pt-4">
                  {['42g Rigid Silk Organza Silk', 'Heavy Structured Linen Canvas Hemp', 'Premium Italian Brushed Wool Wool', 'Bias-Cut Liquid Rayon Crepe Crepe'].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSelect('material', item, 'pipeline')}
                      className="font-mono text-[10px] uppercase tracking-widest border border-neutral-300 px-6 py-4 hover:border-black hover:bg-neutral-50 transition-all"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: PRODUCTION PIPELINE SELECTION */}
            {currentStep === 'pipeline' && (
              <motion.div
                key="step-pipeline"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="w-full space-y-8"
              >
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">[ Protocol 03 / Construction Speed Timeline ]</span>
                <h4 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-neutral-800">Select desired execution architecture speed:</h4>
                <div className="flex flex-wrap gap-4 pt-4">
                  {['Standard Salon Window (6-8 Weeks)', 'Express Editorial Flight (2-3 Weeks)', 'Next-Season Archival Placement'].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSelect('pipeline', item, 'manifest')}
                      className="font-mono text-[10px] uppercase tracking-widest border border-black bg-black text-white px-6 py-4 hover:bg-neutral-800 transition-all"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4: FINAL CONSOLIDATED MANIFEST */}
            {currentStep === 'manifest' && (
              <motion.div
                key="step-manifest"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full bg-neutral-50 p-8 border border-neutral-200 space-y-6"
              >
                <span className="font-mono text-[8px] text-neutral-400 uppercase tracking-widest">[ Final Log Manifest // Configuration Secured ]</span>
                
                <div className="font-mono text-xs text-neutral-700 space-y-3 border-b border-neutral-200 pb-6">
                  <p>STRUCTURAL BASE: <span className="text-black font-bold uppercase">{config.archetype}</span></p>
                  <p>TEXTILE COMP: <span className="text-black font-bold uppercase">{config.material}</span></p>
                  <p>PIPELINE TRACK: <span className="text-black font-bold uppercase">{config.pipeline}</span></p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href={`mailto:studio@slook.com?subject=Bespoke Commission Intake Request&body=Archetype: ${config.archetype}%0AMaterial: ${config.material}%0APipeline: ${config.pipeline}`}
                    className="font-mono text-[10px] uppercase tracking-[0.3em] bg-black text-white text-center px-6 py-4 hover:bg-neutral-800 transition-all"
                  >
                    Transmit Specs to Atelier ↗
                  </a>
                  <button
                    onClick={resetProtocol}
                    className="font-mono text-[10px] uppercase tracking-[0.3em] border border-neutral-300 text-neutral-500 text-center px-6 py-4 hover:text-black hover:border-black transition-all"
                  >
                    Reset Configuration [ × ]
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}