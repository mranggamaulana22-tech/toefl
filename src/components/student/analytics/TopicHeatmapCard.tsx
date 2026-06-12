// src/components/student/analytics/TopicHeatmapCard.tsx
'use client';

interface TopicHeatmapCardProps {
  onRetake: () => void;
}

export default function TopicHeatmapCard({ onRetake }: TopicHeatmapCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm lg:col-span-2 flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <h3 className="font-bold text-slate-900 text-sm">Topic Mastery Heatmap</h3>
          <div className="flex items-center gap-3 text-[9px] font-bold tracking-wider uppercase text-slate-400">
            <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-400"></span> Weak</div>
            <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400"></span> Mod</div>
            <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-green-400"></span> Strong</div>
          </div>
        </div>

        <div className="space-y-5 mt-5">
          {/* Listening Blocks */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Listening</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs font-bold text-red-700">Short Dialogues</div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs font-bold text-amber-700">Academic Talks</div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs font-bold text-red-700">Longer Convos</div>
            </div>
          </div>

          {/* Structure Blocks */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Structure</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs font-bold text-amber-700">Structure</div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs font-bold text-green-700">Written</div>
            </div>
          </div>

          {/* Reading Blocks */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Reading</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs font-bold text-green-700">Main Idea</div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs font-bold text-green-700">Vocabulary</div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs font-bold text-red-700">Detail</div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs font-bold text-red-700">Inference</div>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={onRetake}
        className="w-full mt-6 py-3 bg-[#0a192f] hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
      >
        🔄 Retake Test / Start Exam
      </button>
    </div>
  );
}