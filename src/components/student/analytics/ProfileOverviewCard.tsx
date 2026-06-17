// src/components/student/analytics/ProfileOverviewCard.tsx
'use client';

import type { SectionMetric } from '@/hooks/useStudentAnalytics';

interface ProfileOverviewCardProps {
  studentInfo: { name: string; id: string; totalEstimatedScore: number };
  sectionMetrics: SectionMetric[];
  predictedProfile?: string;
  predictedLabel?: string;
}

function labelBadgeClass(label?: string) {
  const normalized = label?.toUpperCase();

  if (normalized === 'STRONG') return 'bg-green-50 text-green-700 border-green-200';
  if (normalized === 'MOD') return 'bg-amber-50 text-amber-700 border-amber-200';
  if (normalized === 'WEAK') return 'bg-red-50 text-red-700 border-red-200';

  return 'bg-slate-50 text-slate-600 border-slate-200';
}

export default function ProfileOverviewCard({
  studentInfo,
  sectionMetrics,
  predictedProfile,
  predictedLabel,
}: ProfileOverviewCardProps) {
  return (
    <div className="space-y-6 lg:col-span-1 flex flex-col justify-between">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm relative">
        <div className="absolute top-4 right-4 text-slate-400 cursor-pointer">•••</div>
        <div className="font-extrabold text-lg text-slate-900">{studentInfo.name}</div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">ID: {studentInfo.id || '-'}</div>

        <div className="mt-6">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Accuracy</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-4xl font-black text-slate-900">{studentInfo.totalEstimatedScore}</span>
            <span className="text-xs text-slate-400 font-semibold">%</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className={`border px-2.5 py-1 rounded-full text-[10px] font-black ${labelBadgeClass(predictedLabel)}`}>
            {predictedLabel || 'NO LABEL'}
          </span>
          <span className="bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full text-[10px] font-bold">
            {predictedProfile || 'No profile'}
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex-1 flex flex-col justify-between mt-6 lg:mt-0">
        <div className="space-y-3">
          {sectionMetrics.map((sm, idx) => (
            <div key={idx} className={`bg-white border border-slate-100 border-l-4 ${sm.borderColor} rounded-xl p-3 flex justify-between items-center shadow-sm`}>
              <div>
                <span className="font-bold text-slate-800 text-xs block">{sm.name}</span>
                <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">{sm.status}</span>
              </div>
              <span className={`text-xl font-extrabold ${sm.textColor}`}>{sm.score}%</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-800 text-xs">Performance Overview</span>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Details</span>
          </div>
          <div className="space-y-2.5">
            {sectionMetrics.map((sm, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-500">
                  <span>{sm.name} Mastery</span>
                  <span>{sm.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full ${sm.barColor}`} style={{ width: `${sm.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
