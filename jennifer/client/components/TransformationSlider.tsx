// jennifer/client/components/TransformationSlider.tsx
'use client';
import { useState } from 'react';

export default function TransformationSlider() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section className="py-24 bg-[#F0EDE6] border-t border-[#E0D9CE]/60">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#6B5E56] uppercase block">Case Studies</span>
          <h2 className="font-serif text-3xl font-light text-[#332922]">Visual Structural Changes</h2>
          <p className="text-xs text-[#6B5E56] leading-relaxed">
            Drag the divider line on the profile frame to witness how correct geometry mapping, fabric choices, and outline tailoring transform presentation posture entirely.
          </p>
        </div>

        <div className="lg:col-span-7 relative h-[450px] w-full select-none overflow-hidden rounded-2xl shadow-md border border-[#E0D9CE]">
          {/* Before Image Layer */}
          <div className="absolute inset-0 bg-[#E0D9CE]">
            <img src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=800&q=80" alt="Before lookbook profile" className="w-full h-full object-cover filter grayscale" />
            <div className="absolute bottom-4 left-4 bg-[#332922] text-white font-bold text-[9px] tracking-widest uppercase px-3 py-1">Baseline Outline</div>
          </div>
          
          {/* After Image Layer (Controlled via width percentage) */}
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
            <div className="w-full h-[450px] relative">
              <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80" alt="After lookbook profile" className="absolute inset-0 w-full h-full object-cover max-w-none" style={{ width: '100%', maxWidth: 'none' }} />
              <div className="absolute bottom-4 left-4 bg-white text-[#332922] font-bold text-[9px] tracking-widest uppercase px-3 py-1 whitespace-nowrap">Bespoke Curation</div>
            </div>
          </div>

          {/* Slider input control axis override */}
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={sliderPos} 
            onChange={(e) => setSliderPos(Number(e.target.value))} 
            className="absolute inset-0 opacity-0 w-full h-full cursor-ew-resize z-20"
          />
          {/* Visual Divider Line Indicator */}
          <div className="absolute top-0 bottom-0 w-[2px] bg-white z-10 pointer-events-none" style={{ left: `${sliderPos}%` }}>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#332922] shadow-md flex items-center justify-center text-xs font-bold font-serif">&#8596;</div>
          </div>
        </div>

      </div>
    </section>
  );
}