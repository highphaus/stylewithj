// jennifer/client/components/ShoppableEdits.tsx
export default function ShoppableEdits() {
  const CURRENT_TRENDS = [
    { name: "Asymmetric Structured Blazers", source: "Parisian Line", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
    { name: "Raw Linen Draped Layers", source: "Atelier Resort Look", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80" },
    { name: "Monochromatic Silk Separates", source: "Metropolitan Uniform", img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <section className="py-24 bg-white border-t border-[#E0D9CE]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#6B5E56] uppercase block mb-3">Seasonal Curations</span>
          <h2 className="text-3xl font-serif text-[#332922] font-light">The Current Trend Analysis</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CURRENT_TRENDS.map((item, idx) => (
            <div key={idx} className="group relative overflow-hidden space-y-4">
              <div className="relative h-[480px] w-full overflow-hidden bg-[#F7F5F0]">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                <div className="absolute inset-0 bg-[#5D4037]/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
              <div className="flex justify-between items-start pt-2">
                <div>
                  <h4 className="font-serif text-base text-[#332922] font-medium">{item.name}</h4>
                  <p className="text-[10px] uppercase tracking-wider text-[#6B5E56] mt-0.5">{item.source}</p>
                </div>
                <label htmlFor="booking-toggle" className="text-[10px] font-bold uppercase tracking-widest text-[#332922] border-b border-[#332922] pb-0.5 cursor-pointer hover:opacity-60">
                  Style This
                </label>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}