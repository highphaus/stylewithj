import React from 'react';

const testimonials = [
  {
    quote: "Working with Jenny was a game-changer. She helped me build a wardrobe and image that truly reflects who I am and the level I'm aiming for in my career.",
    author: "RAHUL MEHTA",
    title: "FOUNDER"
  },
  {
    quote: "Jenny doesn't just style you, she transforms the way you see yourself. I feel more confident, polished and powerful than ever.",
    author: "ANANYA SINGH",
    title: "MARKETING LEADER"
  },
  {
    quote: "From grooming to outfits to mindset, everything she guided me on made a huge difference. Highly recommend to anyone ready to level up.",
    author: "KUNAL MALHOTRA",
    title: "ENTREPRENEUR"
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 px-6 lg:px-12 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto text-center">
        <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-[#5D4037]/50 block mb-20">
          KIND WORDS FROM MY CLIENTS
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left">
          {testimonials.map((item, i) => (
            <div key={i} className="flex flex-col relative">
              <span className="font-serif text-6xl text-[#A1887F] absolute -top-8 -left-4 font-bold select-none">&ldquo;</span>
              <p className="font-sans text-[13px] text-[#5D4037]/80 leading-relaxed mb-8 relative z-10 pl-6">
                "{item.quote}"
              </p>
              <div className="pl-6">
                <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-[#5D4037] block mb-1">
                  - {item.author}
                </span>
                <span className="font-sans text-[9px] tracking-widest uppercase text-[#5D4037]/50 block">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Featured / Certified Divider */}
        <div className="mt-32 pt-16 border-t border-[#5D4037]/10 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <span className="font-sans text-[9px] tracking-widest uppercase font-bold text-[#5D4037]/50">
              FEATURED IN
            </span>
            <div className="flex items-center gap-8 opacity-60 grayscale">
              <span className="font-serif text-lg font-bold tracking-widest">VOGUE</span>
              <span className="font-serif text-lg italic font-bold">Entrepreneur</span>
              <span className="font-sans text-lg font-light tracking-widest uppercase">FEMINA</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <span className="font-sans text-[9px] tracking-widest uppercase font-bold text-[#5D4037]/50">
              CERTIFIED BY
            </span>
            <div className="flex items-center gap-4 opacity-50 grayscale">
               <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center text-[8px]">AICI</div>
               <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center text-[8px]">ISBC</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}