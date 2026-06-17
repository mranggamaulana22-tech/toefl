// src/components/student/history/HistoryCardList.tsx
'use client';

import type { MLResultHistoryItem } from '@/types/ml-result';

interface HistoryCardListProps {
  data: MLResultHistoryItem[];
  onViewAnalytics: (attemptId?: string) => void;
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return '0%';
  return `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;
}

function labelBadgeClass(label: string) {
  const normalized = label.toUpperCase();

  if (normalized === 'STRONG') return 'bg-green-50 text-green-700 border-green-200';
  if (normalized === 'MOD') return 'bg-amber-50 text-amber-700 border-amber-200';
  if (normalized === 'WEAK') return 'bg-red-50 text-red-700 border-red-200';

  return 'bg-slate-50 text-slate-700 border-slate-200';
}

export default function HistoryCardList({ data, onViewAnalytics }: HistoryCardListProps) {
  return (
    <div className="space-y-5">
      {data.map((exam) => (
        <div
          key={exam.id}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0a192f]" />

          <div className="pl-2 min-w-[250px]">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded">
                {exam.attemptId || exam.id}
              </span>
              <span className="text-[10px] font-bold text-[#11b981] uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#11b981]" /> {exam.status}
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-lg">TOEFL ML Analysis</h3>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Disimpan pada: {exam.date}</p>

            <div className="flex flex-wrap gap-2 mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {exam.studentId ? <span>Student: {exam.studentId}</span> : null}
              {exam.modelVersion ? <span>• Model: {exam.modelVersion}</span> : null}
              {exam.runId ? <span>• Run: {exam.runId}</span> : null}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-2 text-center min-w-[80px]">
              <span className="text-[9px] font-bold uppercase tracking-wider text-red-400 block mb-0.5">Weak</span>
              <span className="text-sm font-black text-red-600">{exam.weakCount}</span>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-2 text-center min-w-[80px]">
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 block mb-0.5">Mod</span>
              <span className="text-sm font-black text-amber-600">{exam.modCount}</span>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-2 text-center min-w-[80px]">
              <span className="text-[9px] font-bold uppercase tracking-wider text-green-400 block mb-0.5">Strong</span>
              <span className="text-sm font-black text-green-600">{exam.strongCount}</span>
            </div>
          </div>

          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
            <div className="text-center md:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Total Accuracy</span>
              <div className="flex items-center justify-end gap-2">
                <span className="text-3xl font-black text-[#0a192f]">{formatPercent(exam.totalAccuracy)}</span>
                {exam.trend === 'up' && <span className="text-green-500 text-sm">▲</span>}
                {exam.trend === 'down' && <span className="text-red-500 text-sm">▼</span>}
                {exam.trend === 'neutral' && <span className="text-slate-300 text-sm">●</span>}
              </div>
              <span className={`mt-1 inline-flex border px-2 py-0.5 rounded-full text-[10px] font-black ${labelBadgeClass(exam.predictedLabel)}`}>
                {exam.predictedLabel}
              </span>
            </div>

            <button
              onClick={() => onViewAnalytics(exam.attemptId)}
              className="bg-white border border-[#0a192f] hover:bg-[#0a192f] text-[#0a192f] hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shrink-0"
            >
              Detail Analytics ➔
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
