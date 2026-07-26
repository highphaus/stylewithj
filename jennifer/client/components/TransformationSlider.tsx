// jennifer/client/components/TransformationSlider.tsx
'use client';
import { useState, useEffect, useRef } from 'react';

export default function TransformationSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [containerWidth, setContainerWidth] = useState(500);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPos(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="hidden lg:block py-24 bg-[#FAF9F6] border-t border-black/[0.04]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        <div className="lg:col-span-5 space-y-4 text-left">
          <span className="text-[10px] tracking-[0.5em] font-light text-black/40 uppercase block mb-4">
            04 // STRUCTURAL CASE STUDIES
          </span>
          <h2 className="font-satoshi text-4xl sm:text-5xl font-light tracking-tight text-[#1A1A1A] leading-[1.1] mb-4">
            Visual Structural <span className="italic text-black/30">Changes</span>
          </h2>
          <p className="text-xs sm:text-sm font-sans font-light tracking-wide text-black/50 leading-relaxed border-l border-black/20 pl-4 mt-6">
            Drag the divider line on the profile frame to witness how correct geometry mapping, fabric choices, and outline tailoring transform presentation posture entirely.
          </p>
        </div>

        <div 
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          className="lg:col-span-7 relative h-[400px] sm:h-[500px] lg:h-[650px] w-full select-none overflow-hidden bg-[#EAE8E3] cursor-ew-resize touch-pan-y"
        >
          {/* Before Image Layer */}
          <div className="absolute inset-0">
            <img src="/images/img15.jpeg" alt="Before lookbook profile" className="w-full h-full object-cover object-center grayscale-[20%]" draggable="false" />
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white/90 backdrop-blur-sm text-black font-sans text-[8px] sm:text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 shadow-sm">
              Baseline Outline
            </div>
          </div>
          
          {/* After Image Layer (Controlled via width percentage) */}
          <div className="absolute inset-0 overflow-hidden shadow-[20px_0_40px_rgba(0,0,0,0.1)]" style={{ width: `${sliderPos}%` }}>
            <div className="relative h-full" style={{ width: containerWidth }}>
              <img src="/images/img16.jpeg" alt="After lookbook profile" className="absolute inset-0 w-full h-full object-cover object-center" draggable="false" />
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-black text-white font-sans text-[8px] sm:text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 whitespace-nowrap z-10 shadow-sm">
                Bespoke Curation
              </div>
            </div>
          </div>

          {/* Visual Divider Line Indicator */}
          <div className="absolute top-0 bottom-0 w-[1px] bg-white z-10 pointer-events-none" style={{ left: `${sliderPos}%` }}>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center text-[10px] font-light font-sans tracking-tighter">
              <span className="-ml-0.5">&lt;</span><span className="-mr-0.5">&gt;</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}