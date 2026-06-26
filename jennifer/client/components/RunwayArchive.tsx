// jennifer/client/components/RunwayArchive.tsx
export default function RunwayArchive() {
  return (
    <section className="bg-[#F0EDE6] border-y border-[#E0D9CE]/60">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side: Video/Runway Image */}
        <div className="relative h-[60vh] lg:h-auto min-h-[500px] overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80" 
            alt="Runway Show" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
          />
          <div className="absolute inset-0 bg-[#5D4037]/30 flex items-center justify-center">
            <button className="w-20 h-20 rounded-full border border-white/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-white transition-colors duration-500 cursor-pointer">
              <span className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white group-hover:border-l-[#332922] border-b-[8px] border-b-transparent ml-1 transition-colors duration-500"></span>
            </button>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col justify-center p-12 lg:p-24 bg-[#E0D9CE]/30">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#6B5E56] uppercase block mb-4">India Couture Week</span>
          <h2 className="text-4xl lg:text-5xl font-serif text-[#332922] font-light mb-8 leading-tight">
            The Festive 2026<br />Runway Show
          </h2>
          <p className="text-sm text-[#6B5E56] leading-relaxed max-w-md mb-12">
            A celebration of royal heritage and intricate Zardosi. Watch the full runway presentation live from Lakmé Fashion Week in Mumbai.
          </p>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#332922] uppercase border-b border-[#332922]/10 pb-2">Past Shows</h4>
            
            <div className="group cursor-pointer flex justify-between items-center border-b border-[#332922]/10 pb-4">
              <span className="font-serif text-lg text-[#6B5E56] group-hover:text-[#332922] transition-colors">Lakmé Fashion Week 2025</span>
              <span className="text-[9px] font-mono tracking-widest text-[#6B5E56] group-hover:text-[#332922]">WATCH &rarr;</span>
            </div>
            
            <div className="group cursor-pointer flex justify-between items-center border-b border-[#332922]/10 pb-4">
              <span className="font-serif text-lg text-[#6B5E56] group-hover:text-[#332922] transition-colors">Bridal Asia 2025</span>
              <span className="text-[9px] font-mono tracking-widest text-[#6B5E56] group-hover:text-[#332922]">WATCH &rarr;</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
