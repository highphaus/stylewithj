import React from 'react';

const steps = [
  {
    title: "Discover",
    desc: "Understanding your goals, lifestyle, challenges, and aspirations.",
    number: "01"
  },
  {
    title: "Assess",
    desc: "Evaluating your current wardrobe, style, grooming, and personal image.",
    number: "02"
  },
  {
    title: "Strategize",
    desc: "Creating a personalized styling and image transformation roadmap.",
    number: "03"
  },
  {
    title: "Transform",
    desc: "Implementing wardrobe, grooming, and styling recommendations.",
    number: "04"
  },
  {
    title: "Elevate",
    desc: "Building confidence and maintaining a polished personal presence.",
    number: "05"
  }
];

export default function ProcessSection() {
  return (
    <section className="py-32 px-6 lg:px-12 bg-[#F9F7F6]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#5D4037]/50 block mb-6">
            HOW THE PROCESS WORKS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#5D4037] font-medium">
            The Transformation Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col relative group">
              {/* Connector line for desktop */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-[1px] bg-[#5D4037]/20 -ml-4 z-0"></div>
              )}
              
              <div className="relative z-10 bg-[#FFFFFF] w-16 h-16 rounded-full border border-[#5D4037]/20 flex items-center justify-center mb-8 group-hover:border-[#5D4037] group-hover:bg-[#5D4037] group-hover:text-[#FFFFFF] transition-all duration-300 mx-auto md:mx-0">
                <span className="font-serif text-xl italic">{step.number}</span>
              </div>
              
              <div className="text-center md:text-left">
                <h3 className="font-sans text-[12px] tracking-[0.15em] uppercase font-bold text-[#5D4037] mb-4">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-[#5D4037]/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
