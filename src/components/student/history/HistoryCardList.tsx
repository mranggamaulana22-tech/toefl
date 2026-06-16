// src/components/student/history/HistoryCardList.tsx
'use client';

import type { StudentScoreHistoryItem } from '@/types/score';

interface HistoryCardListProps {
  data: StudentScoreHistoryItem[];
  onViewAnalytics: (attemptId?: string) => void;
}

function formatDuration(seconds?: number) {
  if (!seconds || seconds <= 0) return null;

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const restSeconds = seconds % 60;

  if (hours > 0) return `${hours}j ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${restSeconds}d`;
  return `${restSeconds}d`;
}

export default function HistoryCardList({ data, onViewAnalytics }: HistoryCardListProps) {
  return (
    <div className="space-y-5">
      {data.map((exam) => {
        const duration = formatDuration(exam.durationSeconds);

        return (
          <div 
            key={exam.id} 
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0a192f]"></div>

            <div className="pl-2 min-w-[240px]">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-bold text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded">
                  {exam.attemptId ?? exam.id}
                </span>
                <span className="text-[10px] font-bold text-[#11b981] uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#11b981]"></span> {exam.status}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg">{exam.type}</h3>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Diselesaikan pada: {exam.date}</p>
              <div className="flex flex-wrap gap-2 mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {exam.studentId ? <span>Student: {exam.studentId}</span> : null}
                {duration ? <span>• Durasi: {duration}</span> : null}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {(['listening', 'structure', 'reading'] as const).map((sec) => (
                <div key={sec} className="bg-slate-50 border border-slate-100 rounded-lg px-4 py-2 text-center min-w-[80px]">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 capitalize">{sec}</span>
                  <span className="text-sm font-black text-slate-700">{exam[sec]}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
              <div className="text-center md:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Total Score</span>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black text-[#0a192f]">{exam.total}</span>
                  {exam.trend === 'up' && <span className="text-green-500 text-sm">▲</span>}
                  {exam.trend === 'down' && <span className="text-red-500 text-sm">▼</span>}
                  {exam.trend === 'neutral' && <span className="text-slate-300 text-sm">●</span>}
                </div>
              </div>

              <button
                onClick={() => onViewAnalytics(exam.attemptId)}
                className="bg-white border border-[#0a192f] hover:bg-[#0a192f] text-[#0a192f] hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shrink-0"
              >
                View Analytics ➔
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
