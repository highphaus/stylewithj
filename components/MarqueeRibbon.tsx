// jennifer/client/components/MarqueeRibbon.tsx
export default function MarqueeRibbon() {
  const text = "✦ BESPOKE BRIDAL ✦ MUMBAI KARKHANA ✦ ROYAL HEIRLOOM ✦ MASTER KARIGARS ✦ ZARDOSI CRAFTSMANSHIP ✦ ";
  
  return (
    <div className="w-full bg-[#1C1612] text-[#E0D9CE] py-5 overflow-hidden flex whitespace-nowrap border-y border-[#332922] select-none">
      <div className="animate-marquee flex-shrink-0 font-sans text-xs tracking-[0.4em] uppercase">
        {text}
        {text}
      </div>
      <div className="animate-marquee flex-shrink-0 font-sans text-xs tracking-[0.4em] uppercase" aria-hidden="true">
        {text}
        {text}
      </div>
    </div>
  );
}
