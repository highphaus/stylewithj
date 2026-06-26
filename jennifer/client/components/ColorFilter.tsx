// jennifer/client/components/ColorFilter.tsx
'use client';
import { useState } from 'react';

const PALETTES = [
  { name: 'Earthy Atelier', base: '#F7F5F0', contrast: '#332922', text: '#6B5E56', accent: '#E0D9CE', desc: 'Warm raw silks, structured linens, minimalist drapes.' },
  { name: 'Midnight Editorial', base: '#1C1612', contrast: '#F7F5F0', text: '#A3968E', accent: '#4A3B32', desc: 'High-contrast wool matrices, avant-garde evening contours.' },
  { name: 'Bridal Monochrome', base: '#FAF9F6', contrast: '#2B231D', text: '#7D7066', accent: '#EADFC9', desc: 'Ivory overlays, custom heritage weaves, luminous textures.' }
];

export default function ColorFilter() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 transition-colors duration-700 border-t border-[#E0D9CE]/60" style={{ backgroundColor: PALETTES[active].base }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Selection Matrix */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase block" style={{ color: PALETTES[active].text }}>
              Tactile Interaction
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light leading-tight" style={{ color: PALETTES[active].contrast }}>
              Filter by Chromatic Master Palette
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: PALETTES[active].text }}>
              Select an aesthetic frequency below to view the structural fabrics and seasonal mood configurations Jennifer maps for her clients.
            </p>

            <div className="space-y-3 pt-4">
              {PALETTES.map((palette, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="w-full text-left p-5 transition-all duration-300 border rounded-xl flex items-center justify-between group"
                  style={{ 
                    borderColor: active === i ? PALETTES[active].contrast : `${PALETTES[active].accent}80`,
                    backgroundColor: active === i ? `${PALETTES[active].accent}30` : 'transparent'
                  }}
                >
                  <div>
                    <h4 className="text-sm font-semibold tracking-wide" style={{ color: PALETTES[active].contrast }}>{palette.name}</h4>
                    <p className="text-xs mt-1 opacity-80 font-light" style={{ color: PALETTES[active].text }}>{palette.desc}</p>
                  </div>
                  <span className="text-xs transform group-hover:translate-x-1 transition-transform" style={{ color: PALETTES[active].contrast }}>&rarr;</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Visual Canvas */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 relative h-[450px]">
            <div className="col-span-8 h-full relative overflow-hidden rounded-2xl shadow-md bg-stone-300">
              <img 
                src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=700&q=80" 
                alt="Color filter dynamic master profile" 
                className="w-full h-full object-cover transition-all duration-700"
                style={{ filter: active === 1 ? 'invert(0.1) contrast(1.1) brightness(0.8)' : 'none' }}
              />
            </div>
            <div className="col-span-4 grid grid-rows-3 gap-4 h-full">
              <div className="rounded-xl transition-colors duration-500 shadow-sm" style={{ backgroundColor: PALETTES[active].contrast }} />
              <div className="rounded-xl transition-colors duration-500 shadow-sm border" style={{ backgroundColor: PALETTES[active].accent, borderColor: PALETTES[active].contrast }} />
              <div className="rounded-xl transition-colors duration-500 shadow-sm" style={{ backgroundColor: PALETTES[active].base, border: `1px solid ${PALETTES[active].contrast}` }} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}