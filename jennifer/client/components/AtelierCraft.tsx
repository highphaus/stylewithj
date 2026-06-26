// jennifer/client/components/AtelierCraft.tsx
export default function AtelierCraft() {
  return (
    <section className="py-24 bg-[#1C1612] text-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 space-y-8">
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#E0D9CE]/60 block mb-4">The Mumbai Karkhana</span>
              <h2 className="font-serif text-4xl sm:text-5xl text-white font-light leading-tight">
                Heritage & <br />Master Karigars
              </h2>
            </div>
            
            <p className="text-[#E0D9CE]/80 font-light leading-relaxed max-w-md text-sm md:text-base">
              Every bridal heirloom is conceived as a piece of art. Hand-embroidered in our Mumbai studio by master karigars dedicating thousands of hours to perfection, our textiles weave stories of Indian heritage, Zardosi, and intricate handloom techniques.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-[#332922]">
              <div>
                <span className="block text-3xl font-serif text-white mb-2">3000+</span>
                <span className="text-[10px] font-mono tracking-widest text-[#E0D9CE]/60 uppercase">Hours per Lehenga</span>
              </div>
              <div>
                <span className="block text-3xl font-serif text-white mb-2">120</span>
                <span className="text-[10px] font-mono tracking-widest text-[#E0D9CE]/60 uppercase">Master Artisans</span>
              </div>
            </div>

            <div className="pt-4">
              <button className="text-[10px] font-bold tracking-widest uppercase text-white border-b border-white pb-1 hover:text-[#E0D9CE]/60 hover:border-[#E0D9CE]/60 transition-colors whitespace-nowrap">
                Discover The Process &rarr;
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative h-[500px] lg:h-[700px] w-full">
            <img 
              src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80" 
              alt="Indian Craftsmanship and Embroidery" 
              className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
