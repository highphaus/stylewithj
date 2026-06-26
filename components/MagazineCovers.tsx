// jennifer/client/components/MagazineCovers.tsx
export default function MagazineCovers() {
  const COVERS = [
    { title: "VOGUE", issue: "September Issue", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80", colSpan: "col-span-12 md:col-span-7", height: "h-[500px]" },
    { title: "ELLE", issue: "Summer Edit", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", colSpan: "col-span-12 md:col-span-5", height: "h-[500px]" },
    { title: "HARPER'S BAZAAR", issue: "Couture Week", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", colSpan: "col-span-12 md:col-span-4", height: "h-[400px]" },
    { title: "GQ", issue: "Men of the Year", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80", colSpan: "col-span-12 md:col-span-8", height: "h-[400px]" }
  ];

  return (
    <section className="py-24 bg-[#F0EDE6] border-t border-[#E0D9CE]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#6B5E56] uppercase block mb-3">Published Works</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#332922] font-light">Magazine Covers & Editorials</h2>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {COVERS.map((cover, idx) => (
            <div key={idx} className={`${cover.colSpan} ${cover.height} relative group overflow-hidden bg-[#E0D9CE]`}>
              <img 
                src={cover.img} 
                alt={`${cover.title} Cover`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-luxury"
              />
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-[#5D4037]/20 group-hover:bg-[#5D4037]/40 transition-colors duration-500 flex flex-col items-center justify-center text-white p-6 text-center opacity-0 group-hover:opacity-100">
                <span className="text-[10px] font-bold tracking-widest uppercase mb-2 border-b border-white pb-1">{cover.issue}</span>
                <h3 className="font-serif text-4xl tracking-[0.2em] font-light">{cover.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
