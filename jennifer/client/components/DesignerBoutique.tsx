// jennifer/client/components/DesignerBoutique.tsx
export default function DesignerBoutique() {
  const products = [
    {
      name: "The 'J' Monogram Tote",
      category: "Leather Goods",
      price: "$2,450",
      img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Silk Organza Trench",
      category: "Ready to Wear",
      price: "$4,200",
      img: "https://images.unsplash.com/photo-1550614000-4b95dd2475a9?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Structural Cuff Bracelet",
      category: "Fine Jewelry",
      price: "$1,850",
      img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Leather Architectural Boots",
      category: "Footwear",
      price: "$1,450",
      img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-[#E0D9CE]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#6B5E56] uppercase block mb-3">La Boutique</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#332922] font-light">Signature Pieces</h2>
          <p className="mt-4 text-sm text-[#6B5E56] max-w-lg">
            A curated selection of our iconic silhouettes, available directly from our Parisian atelier.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="bg-[#F7F5F0] aspect-[3/4] mb-4 relative overflow-hidden flex items-center justify-center p-6 border border-[#E0D9CE]/40 group-hover:border-[#332922]/20 transition-colors">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
                  <button className="bg-[#332922] text-white text-[9px] font-bold tracking-widest uppercase px-6 py-3 w-full hover:bg-[#5D4037] transition-colors">
                    Add to Bag
                  </button>
                </div>
              </div>
              <div className="text-center">
                <span className="text-[9px] font-mono tracking-widest text-[#6B5E56] uppercase block mb-1">{item.category}</span>
                <h4 className="font-serif text-lg text-[#332922] mb-1">{item.name}</h4>
                <p className="text-xs text-[#6B5E56]">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="text-[10px] font-bold tracking-widest uppercase text-[#332922] border-b border-[#332922] pb-1 hover:text-[#6B5E56] hover:border-[#6B5E56] transition-colors">
            Shop The Full Collection &rarr;
          </button>
        </div>

      </div>
    </section>
  );
}
