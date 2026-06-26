// jennifer/client/components/BespokeServices.tsx
export default function BespokeServices() {
  const services = [
    {
      title: "Bespoke Bridal Lehengas",
      desc: "Work directly with our master karigars to architect a one-of-a-kind royal lehenga, completely hand-embroidered with Zardosi tailored to your vision.",
      timeline: "4-8 Months",
      img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Sangeet & Trousseau",
      desc: "A collaborative journey to design your complete wedding wardrobe, from pre-wedding festive looks to your heritage heirloom trousseau trunks.",
      timeline: "3-6 Months",
      img: "https://images.unsplash.com/photo-1585933646706-79ef8826f4ba?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Red Carpet & Sarees",
      desc: "Complete visual styling and custom saree draping creations for high-profile public appearances and elite social events.",
      timeline: "4-8 Weeks",
      img: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="py-24 bg-[#1C1612] text-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#E0D9CE]/60 uppercase block mb-3">Client Commissions</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-light mb-6">Work With The Atelier</h2>
          <p className="text-sm text-[#E0D9CE]/80 leading-relaxed">
            We take on a strictly limited number of private clients each season to ensure absolute dedication to every bespoke garment. Begin the dialogue to commission your custom piece.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((svc, idx) => (
            <div key={idx} className="bg-[#2A211B] border border-[#332922] group hover:border-[#E0D9CE]/40 transition-colors flex flex-col h-full overflow-hidden">
              <div className="h-64 w-full relative overflow-hidden bg-[#1C1612]">
                <img 
                  src={svc.img} 
                  alt={svc.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-white mb-4">{svc.title}</h3>
                  <p className="text-sm text-[#E0D9CE]/70 leading-relaxed mb-6">{svc.desc}</p>
                </div>
                <div className="border-t border-[#332922] pt-4 mt-auto">
                  <span className="text-[10px] font-mono tracking-widest text-[#E0D9CE]/50 uppercase">Estimated Timeline: {svc.timeline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => {
              const modalToggle = document.getElementById('booking-toggle') as HTMLInputElement;
              if (modalToggle) modalToggle.checked = true;
              else window.dispatchEvent(new CustomEvent('open-booking-modal'));
            }}
            className="bg-[#E0D9CE] text-[#332922] hover:bg-white transition-colors duration-300 px-12 py-5 text-xs font-bold tracking-widest uppercase shadow-lg cursor-pointer inline-block"
          >
            Request Private Consultation
          </button>
        </div>

      </div>
    </section>
  );
}
