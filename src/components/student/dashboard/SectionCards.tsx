// src/components/student/dashboard/SectionCards.tsx
'use client';

export default function SectionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Listening */}
      <div className="bg-white border-l-4 border-l-red-500 border border-slate-200/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-red-500 text-base">🎧</span>
          <span className="font-bold text-slate-800 text-sm">Listening</span>
        </div>
        <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">📋 20 Questions</span>
          <span className="flex items-center gap-1">🕒 35 min</span>
        </div>
      </div>

      {/* Structure */}
      <div className="bg-white border-l-4 border-l-amber-500 border border-slate-200/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-amber-500 text-base">✏️</span>
          <span className="font-bold text-slate-800 text-sm">Structure</span>
        </div>
        <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">📋 20 Questions</span>
          <span className="flex items-center gap-1">🕒 25 min</span>
        </div>
      </div>

      {/* Reading */}
      <div className="bg-white border-l-4 border-l-green-500 border border-slate-200/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-green-500 text-base">📖</span>
          <span className="font-bold text-slate-800 text-sm">Reading</span>
        </div>
        <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">📋 20 Questions</span>
          <span className="flex items-center gap-1">🕒 55 min</span>
        </div>
      </div>
    </div>
  );
}