// src/hooks/useStudentHistory.ts
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useStudentHistory() {
  const router = useRouter();
  const [hasHistory] = useState(true); 

  const historyData = [
    { id: "EXM-9821", date: "24 Oktober 2026", type: "Official Simulation #3", total: 530, listening: 44, structure: 56, reading: 59, status: "Verified", trend: "down" },
    { id: "EXM-9748", date: "12 Oktober 2026", type: "Official Simulation #2", total: 540, listening: 48, structure: 54, reading: 57, status: "Verified", trend: "up" },
    { id: "EXM-9611", date: "28 September 2026", type: "Diagnostic Test #1", total: 525, listening: 42, structure: 60, reading: 58, status: "Verified", trend: "neutral" }
  ];

  return {
    hasHistory,
    historyData,
    viewAnalytics: () => router.push('/student/analytics'),
    handleLogout: () => router.push('/login'),
  };
}