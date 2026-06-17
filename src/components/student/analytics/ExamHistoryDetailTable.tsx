// src/components/student/analytics/ExamHistoryDetailTable.tsx
'use client';

import type { MLResultHistoryItem } from '@/types/ml-result';

interface ExamHistoryDetailTableProps {
  examRecords: MLResultHistoryItem[];
  onViewDetail: (attemptId?: string) => void;
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return '0%';
  return `${Math.round(value)}%`;
}

export default function ExamHistoryDetailTable({ examRecords, onViewDetail }: ExamHistoryDetailTableProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm lg:col-span-2 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
          <h3 className="font-bold text-slate-900 text-sm">ML Result History Detail</h3>
          <div className="flex gap-1.5 text-[9px] font-bold uppercase text-slate-400">
            <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded">All</span>
            <span className="px-2 py-0.5 rounded">Random Forest</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider">
                <th className="py-2">Attempt ID</th>
                <th className="py-2">Date</th>
                <th className="py-2">Label</th>
                <th className="py-2">Weak</th>
                <th className="py-2">Mod</th>
                <th className="py-2">Strong</th>
                <th className="py-2 text-right">Accuracy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-semibold text-slate-700">
              {examRecords.length > 0 ? (
                examRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => onViewDetail(record.attemptId)}>
                    <td className="py-3 text-slate-400 font-mono text-[11px] max-w-[180px] truncate">{record.attemptId}</td>
                    <td className="py-3 text-slate-900 whitespace-nowrap">{record.date}</td>
                    <td className="py-3 text-slate-700">{record.predictedLabel}</td>
                    <td className="py-3 text-red-500">{record.weakCount}</td>
                    <td className="py-3 text-amber-500">{record.modCount}</td>
                    <td className="py-3 text-green-600">{record.strongCount}</td>
                    <td className="py-3 text-right text-slate-900 font-bold">{formatPercent(record.totalAccuracy)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    History ML result belum tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={() => onViewDetail(undefined)}
        className="w-full mt-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 font-bold text-xs rounded-xl transition-all"
      >
        View Latest ML Result
      </button>
    </div>
  );
}
