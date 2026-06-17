// src/hooks/useStudentHistory.ts
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  clearAuthSession,
  getAuthRole,
  getAuthToken,
  getAuthUser,
  getUserFromToken,
} from '@/lib/auth-session';
import { mlResultService } from '@/services/ml-result.service';
import type { MLResultHistoryItem } from '@/types/ml-result';

function resolveStudentId() {
  const token = getAuthToken();
  const storedUser = getAuthUser();
  const tokenUser = getUserFromToken(token);
  const user = storedUser ?? tokenUser;

  return {
    token,
    studentId: user?.id_student ?? user?.student_id ?? '',
    role: getAuthRole(),
  };
}

export function useStudentHistory() {
  const router = useRouter();
  const [historyData, setHistoryData] = useState<MLResultHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadHistory = useCallback(async () => {
    const { token, studentId, role } = resolveStudentId();

    if (!token) {
      router.replace('/login');
      return;
    }

    if (role === 'admin') {
      router.replace('/admin/questions');
      return;
    }

    if (!studentId) {
      setHistoryData([]);
      setErrorMessage('Student ID tidak ditemukan pada session login. Silakan login ulang.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const results = await mlResultService.getHistoryByStudent(studentId, token);
      setHistoryData(results);
    } catch (error) {
      setHistoryData([]);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Gagal mengambil data history ML result dari server.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadHistory();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadHistory]);

  const bestScore = useMemo(() => {
    if (historyData.length === 0) return 0;
    return Math.max(...historyData.map((item) => item.totalAccuracy));
  }, [historyData]);

  const hasHistory = historyData.length > 0;

  return {
    hasHistory,
    historyData,
    bestScore: Math.round(bestScore),
    isLoading,
    errorMessage,
    refreshHistory: loadHistory,
    viewAnalytics: (attemptId?: string) => {
      const query = attemptId ? `?attempt_id=${encodeURIComponent(attemptId)}` : '';
      router.push(`/student/analytics${query}`);
    },
    handleLogout: () => {
      clearAuthSession();
      router.replace('/login');
    },
  };
}
