// jennifer/client/components/DesignerProfile.tsx
export default function DesignerProfile() {
  return (
    <section className="py-24 bg-white border-t border-[#E0D9CE]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Editorial Image Block */}
        <div className="lg:col-span-5 relative">
          <div className="absolute inset-0 bg-[#E0D9CE] transform translate-x-4 translate-y-4 rounded-2xl -z-10" />
          <img
            src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=600&q=80"
            alt="Designer Profile"
            className="w-full h-[500px] object-cover rounded-2xl shadow-md transition-all duration-700"
          />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#6B5E56] uppercase block">The Designer Ethos</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#332922] font-light leading-snug">
            &ldquo;Bridal couture is the physical manifestation of cultural legacy and internal grace.&rdquo;
          </h2>
          <div className="h-[1px] w-12 bg-[#332922] my-4" />
          <p className="text-sm text-[#6B5E56] leading-relaxed font-normal">
            With over a decade navigating the weaving clusters of Banaras and Kanchipuram, Jennifer founded the Atelier around a single rule: Indian fashion should be a modern architectural revival of ancient textiles.
          </p>
          <p className="text-sm text-[#6B5E56] leading-relaxed font-normal">
            By merging the structural discipline of modern silhouettes with the intricate decadence of Zardosi and Chikankari, her brides don’t just look polished—they enter spaces with an anchored, unshakeable royal aura.
          </p>
          
          <div className="pt-4 grid grid-cols-2 gap-6 text-[#332922]">
            <div>
              <h4 className="font-serif font-bold text-lg">Banaras & Kanchipuram</h4>
              <p className="text-[10px] text-[#6B5E56] uppercase tracking-wider mt-1">Handloom Sourcing Networks</p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg">Bespoke Heritage</h4>
              <p className="text-[10px] text-[#6B5E56] uppercase tracking-wider mt-1">Zero Mass Manufacture</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}