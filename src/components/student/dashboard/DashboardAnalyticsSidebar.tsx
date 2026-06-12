// src/components/student/dashboard/DashboardAnalyticsSidebar.tsx
'use client';
import { useRouter } from 'next/navigation';

interface DashboardAnalyticsSidebarProps {
  hasTakenTest: boolean;
}

export default function DashboardAnalyticsSidebar({ hasTakenTest }: DashboardAnalyticsSidebarProps) {
  const router = useRouter();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative flex flex-col h-max overflow-hidden min-h-85">
      <h3 className="font-bold text-slate-900 text-sm">
        {hasTakenTest ? "Analytics Overview" : "Analytics Dashboard Locked"}
      </h3>
      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-medium">
        {hasTakenTest ? "Your recent performance analysis is ready." : "Complete your first assessment to unlock these features."}
      </p>

      {hasTakenTest ? (
        /* MODE UNLOCKED: Menampilkan cuplikan progres AI */
        <div className="mt-6 space-y-6">
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-slate-500">
                <span>Listening Mastery</span>
                <span className="text-red-500">48%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: '48%' }}></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-slate-500">
                <span>Structure Mastery</span>
                <span className="text-amber-500">70%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-slate-500">
                <span>Reading Mastery</span>
                <span className="text-green-500">84%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-[#effaf3] border border-green-200/60 rounded-xl p-3 flex gap-2">
            <span className="text-sm">✨</span>
            <p className="text-[10px] text-green-900 font-medium leading-relaxed">
              AI recommendation generated! Focus on Short Dialogues to boost your next score.
            </p>
          </div>

          <button
            onClick={() => router.push('/student/analytics')}
            className="w-full py-3 bg-[#0a192f] hover:bg-[#112240] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            View Full Analytics ➔
          </button>
        </div>
      ) : (
        /* MODE LOCKED: Efek Blur Gembok Khas Figma Lu */
        <>
          <div className="mt-6 space-y-6 select-none opacity-25 filter blur-[3px]">
            <div className="h-16 bg-slate-100 rounded-xl"></div>
            <div className="h-16 bg-slate-100 rounded-xl"></div>
            <div className="h-16 bg-slate-100 rounded-xl"></div>
          </div>

          <div className="absolute inset-x-0 bottom-0 top-20 bg-linear-to-t from-white via-white/95 to-transparent flex flex-col items-center justify-center p-6 text-center">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 mb-3 shadow-inner border border-slate-200">
              🔒
            </div>
            <h4 className="font-bold text-slate-800 text-xs">Unlock Full Analytics</h4>
            
            <div className="mt-4 space-y-2 text-left w-full max-w-52.5 p-1 text-[11px] font-bold text-slate-500">
              <div className="flex items-center gap-2"><span className="text-[#11b981] text-sm">✓</span> Topic Mastery Heatmap</div>
              <div className="flex items-center gap-2"><span className="text-[#11b981] text-sm">✓</span> Performance Overview</div>
              <div className="flex items-center gap-2"><span className="text-[#11b981] text-sm">✓</span> AI Recommendations</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}