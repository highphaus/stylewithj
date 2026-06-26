// jennifer/client/components/BrandProcess.tsx
export default function BrandProcess() {
  const STAGES = [
    { num: '01', title: 'Anatomy & Palette Matrix', desc: 'Analyzing bone architectures and micro-undertones to determine base color harmony metrics.' },
    { num: '02', title: 'Textile Mapping', desc: 'Sourcing premium, high-density fabrics matching your everyday silhouettes and natural drape lines.' },
    { num: '03', title: 'Capsule Engineering', desc: 'Assembling cross-functional wardrobes where every item integrates into multiple variations.' },
    { num: '04', title: 'Fitting & Silhouette Review', desc: 'Precision alterations and configuration styling ensuring high-impact movement.' }
  ];

  return (
    <section id="process" className="py-24 bg-white border-t border-[#E0D9CE]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-[#E0D9CE] pb-16">
          <div className="lg:col-span-4">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#6B5E56] uppercase block mb-3">Methodology</span>
            <h2 className="text-3xl lg:text-4xl font-serif text-[#332922] font-light leading-snug">The Architectural Blueprint</h2>
          </div>
          <div className="lg:col-span-8 flex items-center">
            <p className="text-[#6B5E56] text-sm max-w-xl leading-relaxed">
              True elegance requires calculation. Our methodology eliminates fast-fashion trends, focusing instead on structural harmony, balance ratios, and custom fabric integrity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-16">
          {STAGES.map((stage, i) => (
            <div key={i} className="space-y-4 relative group">
              <div className="font-serif text-5xl font-extralight text-[#E0D9CE] group-hover:text-[#332922] transition-colors duration-300">
                {stage.num}
              </div>
              <h3 className="font-serif text-lg font-medium text-[#332922] pt-2">
                {stage.title}
              </h3>
              <p className="text-xs text-[#6B5E56] leading-relaxed font-normal">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}