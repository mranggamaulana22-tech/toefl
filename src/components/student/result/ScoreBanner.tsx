// src/components/student/result/ScoreBanner.tsx
'use client';

interface ScoreBannerProps {
  totalScore: number;
}

export default function ScoreBanner({ totalScore }: ScoreBannerProps) {
  return (
    <div className="w-full bg-[#0a192f] text-white rounded-2xl p-5 mt-8 flex items-center justify-between shadow-md">
      <div className="text-left space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Total Estimated Score
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black">{totalScore}</span>
          <span className="text-xs text-slate-400 font-semibold">/ 677</span>
        </div>
      </div>
      
      <span className="bg-[#e6f4ea]/10 border border-[#137333]/30 text-[#34d399] text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-[#11b981]"></span>
        Good Performance
      </span>
    </div>
  );
}