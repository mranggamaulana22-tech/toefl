// src/components/student/exam/ExamNavigator.tsx
'use client';
import type { StudentAnswer, TOEFLQuestion } from '@/types/exam';

interface ExamNavigatorProps {
  questions: TOEFLQuestion[];
  currentIndex: number;
  setCurrentIndex: (idx: number) => void;
  answers: StudentAnswer[];
  isSubmitting: boolean;
  onSubmit: () => void;
}

export default function ExamNavigator({ questions, currentIndex, setCurrentIndex, answers, isSubmitting, onSubmit }: ExamNavigatorProps) {
  return (
    <div className="w-full lg:w-70 bg-[#1e293b] text-white rounded-2xl p-5 shadow-lg border border-slate-700/50 flex flex-col justify-between animate-fade-in shrink-0">
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Question Navigator</h4>
        <p className="text-[10px] text-slate-500 leading-tight mb-4">Jump to any question. Reviewed questions are marked.</p>
        
        <div className="grid grid-cols-4 gap-2.5">
          {questions.map((q, idx) => {
            const isAnswered = answers.some((a) => a.question_id === q.id);
            const isCurrent = idx === currentIndex;
            
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-9 text-xs font-bold rounded-lg relative transition-all border ${
                  isCurrent 
                    ? 'bg-[#0f172a] border-white text-white scale-105 shadow-md' 
                    : isAnswered
                    ? 'bg-slate-700/40 border-slate-500 text-slate-300'
                    : 'bg-white text-slate-800 border-transparent hover:bg-slate-100'
                }`}
              >
                {idx + 1}
                {isAnswered && (
                  <span className="absolute top-1 right-1 h-1 w-1 rounded-full bg-blue-400"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-700/60 space-y-4">
        <div className="space-y-1.5 text-[10px] font-semibold text-slate-400 pl-1">
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-400"></span> Answered</div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-slate-900 border border-white"></span> Current</div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-white"></span> Unanswered</div>
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full py-3 bg-white hover:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed text-slate-900 text-xs font-extrabold rounded-xl transition-all shadow-md transform active:scale-95"
        >
          {isSubmitting ? 'Mengirim Jawaban...' : 'Selesai Ujian'}
        </button>
      </div>
    </div>
  );
}