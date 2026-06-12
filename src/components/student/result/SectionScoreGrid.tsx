// src/components/student/result/SectionScoreGrid.tsx
'use client';

interface SectionScoreGridProps {
  scores: { listening: number; structure: number; reading: number };
}

export default function SectionScoreGrid({ scores }: SectionScoreGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4 w-full mt-4">
      <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col items-center">
        <span className="text-lg mb-1">🎧</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Listening</span>
        <span className="text-xl font-extrabold text-slate-800 mt-2">{scores.listening}</span>
      </div>

      <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col items-center">
        <span className="text-lg mb-1">🔤</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Structure</span>
        <span className="text-xl font-extrabold text-slate-800 mt-2">{scores.structure}</span>
      </div>

      <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col items-center">
        <span className="text-lg mb-1">📖</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Reading</span>
        <span className="text-xl font-extrabold text-slate-800 mt-2">{scores.reading}</span>
      </div>
    </div>
  );
}