// src/components/student/analytics/AiRecommendationCard.tsx
'use client';

export default function AiRecommendationCard() {
  return (
    <div className="bg-[#0a192f] text-white border border-slate-800 rounded-2xl p-5 shadow-xl lg:col-span-1 flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-sm tracking-tight border-b border-slate-800 pb-3">AI Recommendation</h3>
        
        <div className="space-y-3.5 mt-4">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex items-start gap-3">
            <span className="bg-slate-800 border border-slate-700 font-mono text-[10px] font-bold text-slate-400 px-1.5 py-0.5 rounded mt-0.5">01</span>
            <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
              Focus Intensively on Short Dialogues and Longer Conversations to boost your lowest section score.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex items-start gap-3">
            <span className="bg-slate-800 border border-slate-700 font-mono text-[10px] font-bold text-slate-400 px-1.5 py-0.5 rounded mt-0.5">02</span>
            <p className="text-[11px] text-slate-300 line-height-relaxed font-medium">
              Improve Reading Inference and Detail comprehension through targeted practice sets.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex items-start gap-3">
            <span className="bg-slate-800 border border-slate-700 font-mono text-[10px] font-bold text-slate-400 px-1.5 py-0.5 rounded mt-0.5">03</span>
            <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
              Maintain consistent Structure performance while shifting study time to weaker areas.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/60">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Priority Review Topics</span>
        <div className="flex flex-wrap gap-1.5">
          <span className="bg-slate-900 border border-slate-800 text-slate-300 text-[9px] font-bold px-2 py-1 rounded">Short Dialogues</span>
          <span className="bg-slate-900 border border-slate-800 text-slate-300 text-[9px] font-bold px-2 py-1 rounded">Inference</span>
          <span className="bg-slate-900 border border-slate-800 text-slate-300 text-[9px] font-bold px-2 py-1 rounded">Detail</span>
        </div>
      </div>
    </div>
  );
}