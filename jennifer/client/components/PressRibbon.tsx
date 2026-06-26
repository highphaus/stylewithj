// jennifer/client/components/PressRibbon.tsx
export default function PressRibbon() {
  const PRESS_LOGOS = ["VOGUE", "HARPER'S BAZAAR", "ELLE", "GRAZIA", "COUTURE WEEK"];

  return (
    <section className="bg-[#332922] py-8 border-y border-[#4A3B32]">
      <div className="max-w-7xl mx-auto px-6 overflow-hidden">
        <p className="text-[9px] uppercase tracking-[0.3em] text-[#E0D9CE]/50 text-center mb-4 font-bold">As Seen In & Collaborated With</p>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-40 hover:opacity-70 transition-opacity duration-500">
          {PRESS_LOGOS.map((logo, index) => (
            <span key={index} className="font-serif text-white text-xs sm:text-sm tracking-[0.4em] font-semibold">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}