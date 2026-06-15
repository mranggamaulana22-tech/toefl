// src/hooks/useStudentExam.ts
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  clearAuthSession,
  getAuthToken,
  getAuthUser,
  getUserFromToken,
} from "@/lib/auth-session";
import { examService } from "@/services/exam.service";
import type { AnswerOption, ExamSection, StudentAnswer, TOEFLQuestion } from "@/types/exam";

const EXAM_DRAFT_KEY = "toefl_exam_answers_draft";
const EXAM_DURATION_SECONDS = 45 * 60;

function getStudentIdFromSession(token: string | null) {
  const storedUser = getAuthUser();
  const tokenUser = getUserFromToken(token);

  return storedUser?.id_student ?? tokenUser?.id_student ?? "";
}

function readDraftAnswers(storageKey: string): StudentAnswer[] {
  if (typeof window === "undefined") return [];

  try {
    const rawDraft = localStorage.getItem(storageKey);
    if (!rawDraft) return [];

    const parsedDraft = JSON.parse(rawDraft) as StudentAnswer[];

    if (!Array.isArray(parsedDraft)) return [];

    return parsedDraft.filter((item) => {
      return (
        typeof item.question_id === "string" &&
        typeof item.section === "string" &&
        typeof item.selected_answer === "string"
      );
    });
  } catch {
    return [];
  }
}

function saveDraftAnswers(storageKey: string, answers: StudentAnswer[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(storageKey, JSON.stringify(answers));
}

function clearDraftAnswers(storageKey: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(storageKey);
}

function countAnsweredQuestions(answers: StudentAnswer[], questions: TOEFLQuestion[]) {
  const questionIds = new Set(questions.map((question) => question.id));
  const answeredQuestionIds = new Set(
    answers
      .filter((answer) => questionIds.has(answer.question_id))
      .map((answer) => answer.question_id)
  );

  return answeredQuestionIds.size;
}

export function useStudentExam(activeSection: ExamSection) {
  const router = useRouter();

  const [allQuestions, setAllQuestions] = useState<TOEFLQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<StudentAnswer[]>([]);
  const [showNavigator, setShowNavigator] = useState(true);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDraftReady, setIsDraftReady] = useState(false);

  const token = useMemo(() => getAuthToken(), []);
  const studentId = useMemo(() => getStudentIdFromSession(token), [token]);
  const draftKey = useMemo(() => `${EXAM_DRAFT_KEY}_${studentId || "unknown"}`, [studentId]);

  const sectionQuestions = useMemo(() => {
    return allQuestions.filter((question) => question.section === activeSection);
  }, [activeSection, allQuestions]);

  const currentQuestion = sectionQuestions[currentIndex];
  const nextSection = examService.getNextSection(activeSection);
  const previousSection = examService.getPreviousSection(activeSection);
  const isFinalSection = nextSection === null;
  const sectionAnsweredCount = countAnsweredQuestions(answers, sectionQuestions);
  const totalAnsweredCount = countAnsweredQuestions(answers, allQuestions);
  const unansweredCount = Math.max(allQuestions.length - totalAnsweredCount, 0);
  const isAllAnswered = allQuestions.length > 0 && totalAnsweredCount === allQuestions.length;
  const isSectionLastQuestion = currentIndex === sectionQuestions.length - 1;
  const canGoPrev = currentIndex > 0 || previousSection !== null;

  const loadQuestions = useCallback(async () => {
    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      setIsLoading(true);
      setIsDraftReady(false);
      setErrorMessage("");

      const fetchedQuestions = await examService.getExamQuestions(token);
      const questionIds = new Set(fetchedQuestions.map((question) => question.id));

      setAllQuestions(fetchedQuestions);
      setAnswers(
        readDraftAnswers(draftKey).filter((answer) =>
          questionIds.has(answer.question_id)
        )
      );
      setCurrentIndex(0);
      setIsDraftReady(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal mengambil data soal ujian.";

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, [draftKey, router, token]);

  useEffect(() => {
    // Data semua section dimuat sekali agar submit akhir tetap berisi jawaban Listening, Structure, dan Reading.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadQuestions();
  }, [loadQuestions]);

  useEffect(() => {
    // Setiap pindah path section, mulai dari soal pertama section tersebut.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentIndex(0);
  }, [activeSection]);

  useEffect(() => {
    if (!isDraftReady) return;
    saveDraftAnswers(draftKey, answers);
  }, [answers, draftKey, isDraftReady]);

  useEffect(() => {
    if (isLoading || isSubmitting) return;

    if (timeLeft <= 0) {
      void handleSubmitExam(true);
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isLoading, isSubmitting]);

  const currentAnswerObj = currentQuestion
    ? answers.find((answer) => answer.question_id === currentQuestion.id)
    : undefined;
  const currentAnswer = currentAnswerObj?.selected_answer;

  const handleSelectAnswer = (
    questionId: string,
    answer: AnswerOption,
    section: StudentAnswer["section"]
  ) => {
    setAnswers((previousAnswers) => {
      const filteredAnswers = previousAnswers.filter(
        (item) => item.question_id !== questionId
      );

      return [
        ...filteredAnswers,
        {
          question_id: questionId,
          section,
          selected_answer: answer,
        },
      ];
    });
  };

  const goToSection = (section: ExamSection) => {
    router.push(`/student/exam/${section}`);
  };

  const handleNext = () => {
    setCurrentIndex((previousIndex) => {
      if (previousIndex < sectionQuestions.length - 1) {
        return previousIndex + 1;
      }

      if (nextSection) {
        goToSection(nextSection);
      }

      return previousIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((previousIndex) => {
      if (previousIndex > 0) return previousIndex - 1;

      if (previousSection) {
        goToSection(previousSection);
      }

      return previousIndex;
    });
  };

  async function handleSubmitExam(forceSubmit = false) {
    if (!token) {
      clearAuthSession();
      router.replace("/login");
      return;
    }

    if (!studentId) {
      setErrorMessage("Student ID tidak ditemukan pada sesi login.");
      return;
    }

    if (!forceSubmit && !isAllAnswered) {
      window.alert(
        `Masih ada ${unansweredCount} soal yang belum dijawab. Jawab semua soal terlebih dahulu sebelum menyelesaikan ujian.`
      );
      return;
    }

    const shouldSubmit =
      forceSubmit ||
      window.confirm(
        "Apakah Anda yakin ingin menyelesaikan ujian? Jawaban akan dikirim dan tidak bisa diubah lagi."
      );

    if (!shouldSubmit) return;

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await examService.submitAnswers(
        {
          student_id: studentId,
          answers,
        },
        token
      );

      clearDraftAnswers(draftKey);
      router.replace("/student/dashboard");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal mengirim jawaban ujian.";

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    questions: sectionQuestions,
    allQuestions,
    activeSection,
    nextSection,
    previousSection,
    currentIndex,
    setCurrentIndex,
    currentQuestion,
    currentAnswer,
    answers,
    showNavigator,
    setShowNavigator,
    timeLeft,
    isLoading,
    isSubmitting,
    errorMessage,
    answeredCount: sectionAnsweredCount,
    totalAnsweredCount,
    unansweredCount,
    isAllAnswered,
    isFinalSection,
    isSectionLastQuestion,
    canGoPrev,
    sectionLabels: examService.sectionLabels,
    actions: {
      handleSelectAnswer,
      handleNext,
      handlePrev,
      handleSubmitExam,
      reloadQuestions: loadQuestions,
    },
  };
}
