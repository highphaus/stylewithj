// jennifer/client/components/StyleQuiz.tsx
'use client';
import { useState } from 'react';

const QUIZ_STEPS = [
  {
    question: "Select your primary silhouette framework:",
    options: [
      { label: "Structured & Tailored", note: "Strong shoulder matrices, sharp lines, commanding presence." },
      { label: "Fluid & Asymmetric", note: "Soft drapes, organic movement, effortless drape forms." },
      { label: "Minimalist Capsule", note: "Strict geometric functionalism, high versatility metrics." }
    ]
  },
  {
    question: "Identify your immediate objective:",
    options: [
      { label: "Milestone Wedding / Trousseau", note: "Complete celebration architecture mapping." },
      { label: "Executive / Signature Rebrand", note: "Professional identity contour realignment." },
      { label: "High-Fashion Editorial Portfolio", note: "Avant-garde visual conceptualization." }
    ]
  }
];

export default function StyleQuiz() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (label: string) => {
    const updated = [...selections, label];
    setSelections(updated);
    if (step + 1 < QUIZ_STEPS.length) {
      setStep(step + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setStep(0);
    setSelections([]);
    setCompleted(false);
  };

  return (
    <section className="py-24 bg-[#F0EDE6] border-t border-[#E0D9CE]/60">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-[#F7F5F0] p-8 md:p-16 rounded-[32px] border border-[#E0D9CE] shadow-sm">
          
          {!completed ? (
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b border-[#E0D9CE] pb-4">
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#6B5E56] uppercase">Interactive Identity Mapping</span>
                <span className="text-xs font-serif italic text-[#332922]">Step 0{step + 1} / 0{QUIZ_STEPS.length}</span>
              </div>
              
              <h3 className="font-serif text-2xl text-[#332922] font-light leading-tight">
                {QUIZ_STEPS[step].question}
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {QUIZ_STEPS[step].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt.label)}
                    className="w-full text-left p-6 bg-white border border-[#E0D9CE]/60 hover:border-[#332922] transition-all duration-300 rounded-xl group"
                  >
                    <div className="font-medium text-sm text-[#332922] flex justify-between items-center">
                      {opt.label}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs tracking-widest uppercase font-bold text-[#6B5E56]">Select &rarr;</span>
                    </div>
                    <p className="text-xs text-[#6B5E56] mt-2 font-normal leading-relaxed">{opt.note}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6 py-4">
              <span className="text-3xl font-serif">✨</span>
              <h3 className="font-serif text-3xl text-[#332922] font-light">Architecture Profile Complete</h3>
              <p className="text-sm text-[#6B5E56] max-w-md mx-auto leading-relaxed">
                Your preference for <strong className="text-[#332922] font-medium">&ldquo;{selections[0]}&rdquo;</strong> paired with <strong className="text-[#332922] font-medium">&ldquo;{selections[1]}&rdquo;</strong> matches Jennifer&apos;s Signature Tier Framework.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <label htmlFor="booking-toggle" className="bg-[#332922] text-[#F7F5F0] hover:bg-[#4A3B32] transition-colors px-8 py-4 text-xs font-bold tracking-widest uppercase cursor-pointer rounded-full shadow-sm inline-block">
                  Request Priority Briefing
                </label>
                <button onClick={handleReset} className="text-xs font-bold tracking-widest text-[#6B5E56] uppercase hover:text-[#332922] transition-colors py-4 px-6">
                  Reset Metrics
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}