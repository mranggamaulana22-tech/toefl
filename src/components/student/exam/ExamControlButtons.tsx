// src/components/student/exam/ExamControlButtons.tsx
'use client';

interface ExamControlButtonsProps {
  currentIndex: number;
  totalQuestions: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void; // Tambah prop baru untuk menangani fungsi submit
}

export default function ExamControlButtons({ 
  currentIndex, 
  totalQuestions, 
  onPrev, 
  onNext,
  onSubmit 
}: ExamControlButtonsProps) {
  
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="mt-6 flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm max-w-3xl w-full mx-auto">
      
      {/* TOMBOL PREVIOUS (Panah Segitiga Kiri) */}
      <button
        type="button"
        onClick={onPrev}
        disabled={currentIndex === 0}
        className="p-2.5 border border-slate-300 rounded-xl bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm flex items-center justify-center transform active:scale-95 shrink-0"
        title="Previous Question"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* INDIKATOR NOMOR SOAL TENGAH */}
      <span className="text-xs font-bold text-slate-400 font-mono">
        {currentIndex + 1} / {totalQuestions}
      </span>

      {/* KONDISIONAL TOMBOL KANAN: JIKA SOAL TERAKHIR MUNCULKAN TOMBOL SUBMIT, JIKA BUKAN MUNCULKAN PANAH NEXT */}
      {isLastQuestion ? (
        <button
          type="button"
          onClick={onSubmit}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all transform active:scale-95 animate-fade-in flex items-center gap-1.5"
        >
          <span>Submit Ujian</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="p-2.5 bg-[#1e293b] hover:bg-slate-800 text-white rounded-xl shadow-sm transition-all flex items-center justify-center transform active:scale-95"
          title="Next Question"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      )}

    </div>
  );
}