// jennifer/client/components/CollectionsGrid.tsx
export default function CollectionsGrid() {
  const collections = [
    {
      title: "Bridal Couture",
      season: "The Sindoor Collection",
      img: "https://images.unsplash.com/photo-1585933646706-79ef8826f4ba?auto=format&fit=crop&w=600&q=80",
      aspect: "aspect-[3/4]"
    },
    {
      title: "Festive Prêt",
      season: "Autumn/Winter 2026",
      img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
      aspect: "aspect-square"
    },
    {
      title: "Heritage Heirloom",
      season: "The Royal Archive",
      img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
      aspect: "aspect-[4/5]"
    }
  ];

  return (
    <section className="py-32 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#6B5E56] uppercase block mb-3">House of Jennifer</span>
            <h2 className="text-4xl sm:text-5xl font-serif text-[#332922] font-light">Couture Collections</h2>
          </div>
          <button className="text-[10px] font-bold tracking-widest uppercase text-[#332922] border-b border-[#332922] pb-1 hover:text-[#6B5E56] hover:border-[#6B5E56] transition-colors whitespace-nowrap">
            View All Archives &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {collections.map((col, idx) => (
            <div key={idx} className={`relative group cursor-pointer ${idx === 1 ? 'md:-translate-y-12' : ''}`}>
              <div className={`overflow-hidden bg-[#E0D9CE] ${col.aspect}`}>
                <img 
                  src={col.img} 
                  alt={col.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-luxury"
                />
              </div>
              <div className="mt-6 text-center">
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#6B5E56] block mb-2">{col.season}</span>
                <h3 className="font-serif text-2xl text-[#332922] group-hover:italic transition-all">{col.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
