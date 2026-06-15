// src/components/student/exam/ExamControlButtons.tsx
"use client";

interface ExamControlButtonsProps {
  currentIndex: number;
  totalQuestions: number;
  isSubmitting: boolean;
  isAllAnswered: boolean;
  canGoPrev: boolean;
  nextSectionLabel?: string;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function ExamControlButtons({
  currentIndex,
  totalQuestions,
  isSubmitting,
  isAllAnswered,
  canGoPrev,
  nextSectionLabel,
  onPrev,
  onNext,
  onSubmit,
}: ExamControlButtonsProps) {
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const shouldMoveToNextSection = isLastQuestion && Boolean(nextSectionLabel);

  return (
    <div className="mt-6 flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm max-w-3xl w-full mx-auto">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canGoPrev || isSubmitting}
        className="p-2.5 border border-slate-300 rounded-xl bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center transform active:scale-95 shrink-0"
        title="Previous Question"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div className="text-center">
        <span className="text-xs font-bold text-slate-400 font-mono block">
          {currentIndex + 1} / {totalQuestions}
        </span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          {isAllAnswered ? "Semua soal terjawab" : "Jawaban disimpan sementara"}
        </span>
      </div>

      {isLastQuestion && !shouldMoveToNextSection ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold text-xs rounded-xl shadow-md transition-all transform active:scale-95 animate-fade-in flex items-center gap-1.5"
        >
          <span>{isSubmitting ? "Mengirim..." : "Selesai Ujian"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-3.5 h-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          className="px-4 py-2.5 bg-[#1e293b] hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 transform active:scale-95 text-xs font-extrabold"
          title={shouldMoveToNextSection ? `Lanjut ke ${nextSectionLabel}` : "Next Question"}
        >
          {shouldMoveToNextSection ? <span>Lanjut {nextSectionLabel}</span> : null}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      )}
    </div>
  );
}
