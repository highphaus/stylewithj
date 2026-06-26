// jennifer/client/components/EditorialGrid.tsx
export default function EditorialGrid() {
  const LOOKS = [
    { tag: 'Collection 01', title: 'The Bridal Monochrome', subtitle: 'Contemporary Luxury', size: 'col-span-12 md:col-span-7 h-[650px]', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80' },
    { tag: 'Collection 02', title: 'Architectural Minimalist', subtitle: 'Capsule Curation', size: 'col-span-12 md:col-span-5 h-[450px] md:mt-32', img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80' },
    { tag: 'Collection 03', title: 'The Heritage Assembly', subtitle: 'Textile Customization', size: 'col-span-12 md:col-span-5 h-[500px]', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80' },
    { tag: 'Collection 04', title: 'Fluid Silk Fluidics', subtitle: 'Editorial Masterclass', size: 'col-span-12 md:col-span-7 h-[700px] md:-translate-y-32', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <section id="collections" className="py-24 bg-[#F0EDE6] border-t border-[#E0D9CE]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#6B5E56] uppercase block mb-3">Seasonal Edits</span>
            <h2 className="text-4xl font-serif text-[#332922] font-light">Curated Editorial Frameworks</h2>
          </div>
          <p className="text-sm text-[#6B5E56] max-w-xs font-normal leading-relaxed">
            A granular perspective highlighting garment transitions and structural textures configured by Jennifer.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8 md:gap-12">
          {LOOKS.map((look, idx) => (
            <div key={idx} className={`${look.size} group flex flex-col justify-between`}>
              <div className="relative w-full h-[88%] overflow-hidden bg-[#E0D9CE]">
                <img
                  src={look.img}
                  alt={look.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#F7F5F0] text-[#332922] font-bold text-[9px] tracking-widest uppercase px-3 py-1.5 shadow-sm">
                  {look.tag}
                </div>
              </div>
              <div className="pt-4 border-b border-[#E0D9CE] pb-3 flex justify-between items-end">
                <div>
                  <h3 className="font-serif text-xl text-[#332922] font-normal">{look.title}</h3>
                  <p className="text-xs text-[#6B5E56] mt-0.5">{look.subtitle}</p>
                </div>
                <span className="text-lg opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">&rarr;</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}