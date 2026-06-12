// src/app/student/exam/page.tsx
'use client';
import { useStudentExam } from '@/hooks/useStudentExam';
import QuestionCard from '@/components/student/exam/QuestionCard';
import ExamTopbar from '@/components/student/exam/ExamTopbar';
import ExamNavigator from '@/components/student/exam/ExamNavigator';
import ExamControlButtons from '@/components/student/exam/ExamControlButtons';

export default function StudentExamPage() {
  const se = useStudentExam();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-black flex flex-col relative select-none">
      
      {/* 1. TOPBAR COMPONENT */}
      <ExamTopbar 
        sectionName={se.currentQuestion.section}
        showNavigator={se.showNavigator}
        onToggleNavigator={() => se.setShowNavigator(!se.showNavigator)}
        formattedTime={formatTime(se.timeLeft)}
      />

      {/* 2. MAIN ENGINE AREA */}
      <div className="flex-1 flex flex-col lg:flex-row p-6 gap-6 max-w-7xl w-full mx-auto items-stretch">
        
        {/* PANEL KIRI: SOAL & NAVIGASI BACK-NEXT */}
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
            onPrev={se.actions.handlePrev}
            onNext={se.actions.handleNext}
            onSubmit={se.actions.handleSubmitSection}
          />
        </div>

        {/* PANEL KANAN: SIDEBAR GRID NAVIGATOR */}
        {se.showNavigator && (
          <ExamNavigator 
            questions={se.questions}
            currentIndex={se.currentIndex}
            setCurrentIndex={se.setCurrentIndex}
            answers={se.answers}
            onSubmit={se.actions.handleSubmitSection}
          />
        )}

      </div>
    </div>
  );
}