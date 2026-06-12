// src/components/student/history/HistoryHeader.tsx
'use client';

interface HistoryHeaderProps {
  totalExams: number;
}

export default function HistoryHeader({ totalExams }: HistoryHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Exam History</h1>
        <p className="text-sm text-slate-500 mt-2 font-medium">
          Rekam jejak performa simulasi ujian TOEFL CBT lu secara berkala.
        </p>
      </div>

      <div className="flex gap-4">
        <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm flex flex-col items-center min-w-[120px]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Exams</span>
          <span className="text-2xl font-black text-slate-800 mt-1">{totalExams}</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm flex flex-col items-center min-w-[120px]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Best Score</span>
          <span className="text-2xl font-black text-[#11b981] mt-1">540</span>
        </div>
      </div>
    </div>
  );
}