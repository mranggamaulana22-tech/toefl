// src/components/student/exam/ExamTopbar.tsx
"use client";

interface ExamTopbarProps {
  sectionName: string;
  showNavigator: boolean;
  onToggleNavigator: () => void;
  formattedTime: string;
  answeredCount: number;
  totalQuestions: number;
  isSubmitting: boolean;
}

export default function ExamTopbar({
  sectionName,
  showNavigator,
  onToggleNavigator,
  formattedTime,
  answeredCount,
  totalQuestions,
  isSubmitting,
}: ExamTopbarProps) {
  return (
    <div className="bg-[#1e293b] text-white h-14 px-6 flex items-center justify-between shadow-md sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <span className="font-bold text-sm tracking-tight">TOEFL Analytics</span>
        <div className="h-4 w-px bg-slate-600" />
        <span className="text-xs font-semibold text-slate-300 capitalize flex items-center gap-1">
          📝 {sectionName} Section
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-[10px] font-bold text-slate-300 uppercase tracking-wider">
          {answeredCount}/{totalQuestions} Terjawab
        </div>

        <button
          type="button"
          onClick={onToggleNavigator}
          disabled={isSubmitting}
          className="text-xs bg-slate-700/80 hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg border border-slate-600 transition-all font-semibold"
        >
          {showNavigator ? "🙈 Sembunyikan Grid" : "👁️ Tampilkan Grid"}
        </button>

        <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-xs font-mono tracking-wider text-amber-400">
          ⏱️ {formattedTime}
        </div>
      </div>
    </div>
  );
}
