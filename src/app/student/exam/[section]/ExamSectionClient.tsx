// src/app/student/exam/[section]/ExamSectionClient.tsx
"use client";

import { useStudentExam } from "@/hooks/useStudentExam";
import type { ExamSection } from "@/types/exam";
import QuestionCard from "@/components/student/exam/QuestionCard";
import ExamTopbar from "@/components/student/exam/ExamTopbar";
import ExamNavigator from "@/components/student/exam/ExamNavigator";
import ExamControlButtons from "@/components/student/exam/ExamControlButtons";

type Props = {
  section: ExamSection;
};

export default function ExamSectionClient({ section }: Props) {
  const activeSection = section;
  const se = useStudentExam(activeSection);

  const sectionLabel = se.sectionLabels[activeSection];
  const nextSectionLabel = se.nextSection ? se.sectionLabels[se.nextSection] : undefined;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (se.isLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-black flex items-center justify-center px-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center max-w-md w-full">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-[#1e293b] rounded-full animate-spin mx-auto mb-5" />
          <h1 className="text-lg font-black text-slate-900">
            Menyiapkan Ujian {sectionLabel}
          </h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Sedang mengambil soal Listening, Structure, dan Reading dari server.
          </p>
        </div>
      </div>
    );
  }

  if (se.errorMessage || !se.currentQuestion) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-black flex items-center justify-center px-6">
        <div className="bg-white border border-red-100 rounded-2xl p-8 shadow-sm text-center max-w-lg w-full">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-2xl mx-auto mb-5">
            ⚠️
          </div>
          <h1 className="text-lg font-black text-slate-900">
            Soal {sectionLabel} Tidak Tersedia
          </h1>
          <p className="text-sm text-slate-500 mt-2 font-medium leading-relaxed">
            {se.errorMessage ||
              "Data soal kosong. Pastikan endpoint soal sudah aktif dan token login masih valid."}
          </p>
          <button
            type="button"
            onClick={se.actions.reloadQuestions}
            className="mt-6 px-5 py-2.5 bg-[#1e293b] hover:bg-slate-800 text-white text-xs font-extrabold rounded-xl transition-all shadow-sm"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-black flex flex-col relative select-none">
      <ExamTopbar
        sectionName={sectionLabel}
        showNavigator={se.showNavigator}
        onToggleNavigator={() => se.setShowNavigator(!se.showNavigator)}
        formattedTime={formatTime(se.timeLeft)}
        answeredCount={se.answeredCount}
        totalQuestions={se.questions.length}
        isSubmitting={se.isSubmitting}
      />

      {se.errorMessage ? (
        <div className="max-w-7xl w-full mx-auto px-6 mt-4">
          <div className="bg-red-50 border border-red-100 text-red-700 rounded-xl px-4 py-3 text-xs font-bold">
            {se.errorMessage}
          </div>
        </div>
      ) : null}

      <div className="max-w-7xl w-full mx-auto px-6 mt-4">
        <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Path Ujian Aktif
            </p>
            <h2 className="text-sm font-black text-slate-900">
              /student/exam/{activeSection}
            </h2>
          </div>
          <p className="text-xs font-semibold text-slate-500">
            Progress total: {se.totalAnsweredCount} / {se.allQuestions.length} soal terjawab
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row p-6 gap-6 max-w-7xl w-full mx-auto items-stretch">
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center">
            <QuestionCard
              question={se.currentQuestion}
              currentAnswer={se.currentAnswer}
              onSelectAnswer={se.actions.handleSelectAnswer}
            />
          </div>

          <ExamControlButtons
            currentIndex={se.currentIndex}
            totalQuestions={se.questions.length}
            isSubmitting={se.isSubmitting}
            isAllAnswered={se.isAllAnswered}
            canGoPrev={se.canGoPrev}
            nextSectionLabel={nextSectionLabel}
            onPrev={se.actions.handlePrev}
            onNext={se.actions.handleNext}
            onSubmit={() => se.actions.handleSubmitExam(false)}
          />
        </div>

        {se.showNavigator && (
          <ExamNavigator
            questions={se.questions}
            currentIndex={se.currentIndex}
            setCurrentIndex={se.setCurrentIndex}
            answers={se.answers}
            isSubmitting={se.isSubmitting}
            onSubmit={() => se.actions.handleSubmitExam(false)}
          />
        )}
      </div>
    </div>
  );
}