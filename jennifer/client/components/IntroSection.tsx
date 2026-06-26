import React from 'react';

const steps = [
  {
    title: "LET'S TALK",
    desc: "HAVE A QUICK CHAT WITH OUR TEAM TO SHARE YOUR GOALS AND FIND THE RIGHT PLAN FOR YOU",
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=600&q=80" // Placeholder for blue blazer
  },
  {
    title: "STYLE PLAN",
    desc: "WE BUILD A CUSTOM WARDROBE THAT FITS PERFECTLY WITH YOUR BODY SHAPE AND LIFESTYLE",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" // Placeholder for white top
  },
  {
    title: "FEEL AMAZING",
    desc: "LEARN HOW TO DRESS BETTER AND FEEL COMPLETELY CONFIDENT IN YOUR CLOTHES EVERY DAY",
    image: "https://images.unsplash.com/photo-1550614000-4b95d4ed79ea?auto=format&fit=crop&w=600&q=80" // Placeholder for pink top
  }
];

export default function IntroSection() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Content */}
        <div className="text-center mb-16">
          <h2 className="font-sans text-2xl md:text-3xl text-[#5D4037] mb-6 font-bold uppercase tracking-widest">
            Begin Your Personal Evolution
          </h2>
          <p className="font-sans text-sm md:text-base text-[#5D4037]/80 leading-relaxed font-light max-w-3xl mx-auto">
            Partner with our elite styling team to refine your personal aesthetic, build unwavering confidence, and curate a wardrobe that speaks for you.
          </p>
        </div>

        {/* 3 Image Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative h-[500px] w-full flex flex-col justify-end overflow-hidden group">
              {/* Background Image */}
              <img 
                src={step.image} 
                alt={step.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay Blocks */}
              <div className="relative z-10 w-[90%] mx-auto mb-8">
                {/* White Block (Title) */}
                <div className="bg-[#FFFFFF] py-3 px-4 text-center">
                  <h3 className="font-sans text-lg md:text-xl font-bold text-[#5D4037] uppercase tracking-wider">
                    {step.title}
                  </h3>
                </div>
                {/* Brown Block (Description) */}
                <div className="bg-[#5D4037] py-4 px-6 text-center h-[100px] flex items-center justify-center">
                  <p className="font-sans text-[10px] md:text-[11px] font-bold text-[#FFFFFF] uppercase tracking-widest leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
