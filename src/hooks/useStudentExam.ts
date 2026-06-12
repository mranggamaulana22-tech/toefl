// src/hooks/useStudentExam.ts
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockTOEFLQuestions } from '@/mocks/questionMock';

interface StudentAnswer {
  question_id: string;
  section: string;
  selected_answer: string;
}

export function useStudentExam() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<StudentAnswer[]>([]);
  const [showNavigator, setShowNavigator] = useState(true);
  const [timeLeft, setTimeLeft] = useState(2700); // 45 Menit

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const currentQuestion = mockTOEFLQuestions[currentIndex];
  const currentAnswerObj = answers.find((a) => a.question_id === currentQuestion.id);
  const currentAnswer = currentAnswerObj?.selected_answer;

  const handleSelectAnswer = (questionId: string, answer: string, section: string) => {
    const filteredAnswers = answers.filter((a) => a.question_id !== questionId);
    setAnswers([
      ...filteredAnswers,
      { question_id: questionId, section, selected_answer: answer }
    ]);
  };

  const handleNext = () => {
    if (currentIndex < mockTOEFLQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmitSection = () => {
    if (confirm("Apakah anda yakin ingin mengakhiri sesi ujian ini? Seluruh lembar jawaban akan dikunci.")) {
      console.log("Mengirim lembar jawaban lengkap ke API Bruno...", answers);
      router.push('/student/result');
    }
  };

  return {
    questions: mockTOEFLQuestions,
    currentIndex,
    setCurrentIndex,
    currentQuestion,
    currentAnswer,
    answers,
    showNavigator,
    setShowNavigator,
    timeLeft,
    actions: {
      handleSelectAnswer,
      handleNext,
      handlePrev,
      handleSubmitSection
    }
  };
}