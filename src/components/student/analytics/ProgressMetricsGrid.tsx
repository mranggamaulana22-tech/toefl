// src/components/student/analytics/ProgressMetricsGrid.tsx
'use client';

import type { MLResultDetail, MLResultHistoryItem } from '@/types/ml-result';

interface ProgressMetricsGridProps {
  currentResult: MLResultDetail | null;
  historyData: MLResultHistoryItem[];
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return '0%';
  return `${Math.round(value)}%`;
}

export default function ProgressMetricsGrid({ currentResult, historyData }: ProgressMetricsGridProps) {
  const totalExams = historyData.length;
  const highestScore = historyData.length ? Math.max(...historyData.map((item) => item.totalAccuracy)) : 0;
  const averageScore = historyData.length
    ? historyData.reduce((sum, item) => sum + item.totalAccuracy, 0) / historyData.length
    : 0;
  const latestScore = currentResult?.totalAccuracy ?? historyData[0]?.totalAccuracy ?? 0;
  const trend = latestScore - highestScore;

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900 tracking-tight">Learning Progress & History</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total ML Results</span>
            <span className="text-sm">📋</span>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">{totalExams}</div>
          <span className="text-[10px] font-medium text-slate-400 mt-1 block">Jumlah hasil analisis tersimpan</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Highest Accuracy</span>
            <span className="text-sm">🎯</span>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">{formatPercent(highestScore)}</div>
          <span className="text-[10px] font-medium text-slate-400 mt-1 block">Akurasi terbaik dari history</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Average Accuracy</span>
            <span className="text-sm">📈</span>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">{formatPercent(averageScore)}</div>
          <span className="text-[10px] font-medium text-slate-400 mt-1 block">Rata-rata semua attempt</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Selected Accuracy</span>
            <span className="text-sm">⏱️</span>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">{formatPercent(latestScore)}</div>
          <span className={`text-[10px] font-bold mt-1 block ${trend < 0 ? 'text-red-500' : 'text-green-600'}`}>
            {trend < 0 ? `▼ ${formatPercent(Math.abs(trend))} from peak` : '▲ current peak'}
          </span>
        </div>
      </div>
    </div>
  );
}
