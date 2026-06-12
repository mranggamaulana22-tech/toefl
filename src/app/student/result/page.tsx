// src/app/student/result/page.tsx
'use client';
import ResultHeaderNavbar from '@/components/student/result/ResultHeaderNavbar';
import TrophyBadge from '@/components/student/result/TrophyBadge';
import ScoreBanner from '@/components/student/result/ScoreBanner';
import SectionScoreGrid from '@/components/student/result/SectionScoreGrid';
import AiInsightBox from '@/components/student/result/AiInsightBox';
import { useStudentResult } from '@/hooks/useStudentResult';

export default function StudentResultPage() {
  const sr = useStudentResult();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-black pb-12 flex flex-col">
      <ResultHeaderNavbar />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-100 rounded-3xl shadow-xl w-full max-w-2xl p-8 md:p-12 text-center flex flex-col items-center">
          <TrophyBadge />
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Congratulations!</h1>
          <p className="text-xs font-medium text-slate-400 mt-2">You have successfully completed the TOEFL Assessment.</p>
          
          <ScoreBanner totalScore={sr.data.total_score} />
          <SectionScoreGrid scores={sr.data.section_scores} />
          <AiInsightBox />

          <button
            onClick={sr.openAnalysis}
            className="w-full max-w-xs py-3 bg-[#0a192f] hover:bg-[#112240] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 mt-8 transform active:scale-95"
          >
            Open Analysis ➔
          </button>
        </div>
      </div>
    </div>
  );
}