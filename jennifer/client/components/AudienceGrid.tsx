import React from 'react';

const audiences = [
  { title: "Working Professionals", desc: "Build confidence and executive presence." },
  { title: "Entrepreneurs & Founders", desc: "Create a memorable personal brand." },
  { title: "Executives & Leaders", desc: "Command respect and influence effortlessly." },
  { title: "Students & Job Seekers", desc: "Make stronger first impressions." },
  { title: "Creators & Influencers", desc: "Develop a distinctive personal image." },
  { title: "Total Transformation", desc: "Reinvent your style, confidence and self-image." }
];

export default function AudienceGrid() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: Editorial Image */}
        <div className="relative h-[600px] lg:h-[800px] w-full order-2 lg:order-1">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80" 
            alt="Fashion Editorial" 
            className="w-full h-full object-cover shadow-2xl"
          />
        </div>

        {/* Right: Typography List */}
        <div className="order-1 lg:order-2 flex flex-col justify-center">
          <span className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#5D4037]/50 block mb-6">
            I WORK WITH AMBITIOUS INDIVIDUALS WHO WANT TO
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#5D4037] mb-16 leading-tight font-medium">
            Look better, feel confident and make a lasting impression.
          </h2>

          <div className="space-y-10">
            {audiences.map((item, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <span className="font-serif text-xl italic text-[#5D4037]/40 pt-1 group-hover:text-[#5D4037] transition-colors">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-sans text-[11px] tracking-[0.2em] uppercase font-bold text-[#5D4037] mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[13px] text-[#5D4037]/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
