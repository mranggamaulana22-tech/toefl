// src/components/student/analytics/AiProgressInsightBox.tsx
'use client';

export default function AiProgressInsightBox() {
  return (
    <div className="bg-[#effaf3] border border-green-200/60 rounded-2xl p-5 shadow-sm lg:col-span-1 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-green-800 font-bold text-xs uppercase tracking-wider">
          <span className="text-base">✨</span> AI Progress Insight
        </div>
        <p className="text-xs text-green-950/80 leading-relaxed font-medium">
          Based on your last 3 exams, your Reading Speed has increased by <strong className="font-bold text-green-900">14%</strong>, but your accuracy in Listening Part A fluctuates.
        </p>

        <div className="bg-white border border-green-100/80 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Recommended Study Time</span>
            <div className="flex gap-1">
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
              <span className="h-3 w-3 rounded-full bg-amber-500"></span>
              <span className="h-3 w-3 rounded-full bg-slate-200"></span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-slate-900">45m</span>
            <span className="text-[10px] font-bold text-slate-400 block">/ day</span>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-green-700/70 italic leading-relaxed pt-4 border-t border-green-200/40 mt-4">
        &quot;Focusing on active listening for 20 minutes daily will likely yield a +5 point jump in the next exam.&quot;
      </p>
    </div>
  );
}