// src/components/student/analytics/ProgressMetricsGrid.tsx
'use client';

export default function ProgressMetricsGrid() {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900 tracking-tight">Learning Progress & History</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {/* Total Exams */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Exams Taken</span>
            <span className="text-sm">📋</span>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">8</div>
          <span className="text-[10px] font-bold text-green-600 mt-1 block">▲ +2 this month</span>
        </div>

        {/* Highest Score */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Highest Score</span>
            <span className="text-sm">🎯</span>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">580</div>
          <span className="text-[10px] font-medium text-slate-400 mt-1 block">Top 12% of students</span>
        </div>

        {/* Average Score */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Average Score</span>
            <span className="text-sm">📈</span>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">545</div>
          <span className="text-[10px] font-bold text-green-600 mt-1 block">▲ +15 pts trend</span>
        </div>

        {/* Latest Score */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Latest Score</span>
            <span className="text-sm">⏱️</span>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">530</div>
          <span className="text-[10px] font-bold text-red-500 mt-1 block">▼ -10 from peak</span>
        </div>
      </div>
    </div>
  );
}