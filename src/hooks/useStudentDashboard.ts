// src/hooks/useStudentDashboard.ts
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useStudentDashboard() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [hasTakenTest, setHasTakenTest] = useState(false);

  const handleStartExam = () => {
    if (!isReady) return;
    router.push('/student/exam');
  };

  const toggleDemoMode = () => setHasTakenTest(!hasTakenTest);
  const handleLogout = () => router.push('/login');

  return {
    isReady,
    setIsReady,
    hasTakenTest,
    toggleDemoMode,
    handleStartExam,
    handleLogout,
  };
}