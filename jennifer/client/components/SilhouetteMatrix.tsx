// jennifer/client/components/SilhouetteMatrix.tsx
export default function SilhouetteMatrix() {
  const MATRIX_ITEMS = [
    { label: "Shoulder Axis Balance", formula: "S = A * 1.618", desc: "Aligning formal garment structure grids cleanly with the native bone clavicle profile." },
    { label: "Drape Cascade Angle", formula: "D = 45° Drop", desc: "Calculating raw textile velocity to guarantee beautiful movement dynamics during events." },
    { label: "Contrast Field Index", formula: "C = 70:30 Split", desc: "Balancing foundational monochromatic blocks against high-impact designer statement accessories." }
  ];

  return (
    <section className="py-24 bg-white border-t border-[#E0D9CE]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="max-w-2xl mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#6B5E56] uppercase block mb-3">Mathematical Alignment</span>
          <h2 className="text-4xl font-serif font-light text-[#332922] leading-tight">
            The Mathematical Balance Ratios
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MATRIX_ITEMS.map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-[#F7F5F0] border border-[#E0D9CE]/40 hover:bg-[#332922] hover:text-[#F7F5F0] group transition-all duration-500 ease-luxury">
              <div className="font-serif text-sm italic tracking-wide text-[#6B5E56] group-hover:text-[#E0D9CE] mb-4">
                {item.formula}
              </div>
              <h3 className="text-lg font-serif font-normal text-[#332922] group-hover:text-white mb-2">
                {item.label}
              </h3>
              <p className="text-xs text-[#6B5E56] group-hover:text-[#F7F5F0]/80 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}