// src/hooks/useStudentResult.ts
'use client';
import { useRouter } from 'next/navigation';
import { mockTOEFLResult } from '@/mocks/questionMock';

export function useStudentResult() {
  const router = useRouter();
  return {
    data: mockTOEFLResult,
    openAnalysis: () => router.push('/student/analytics'),
  };
}