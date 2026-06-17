// src/hooks/useStudentAnalytics.ts
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
import type { MLResultDetail, MLResultHistoryItem } from '@/types/ml-result';

export type SectionMetric = {
  name: string;
  status: string;
  score: number;
  textColor: string;
  borderColor: string;
  progress: number;
  barColor: string;
};

function resolveSession() {
  const token = getAuthToken();
  const storedUser = getAuthUser();
  const tokenUser = getUserFromToken(token);
  const user = storedUser ?? tokenUser;

  return {
    token,
    user,
    studentId: user?.id_student ?? user?.student_id ?? '',
    role: getAuthRole(),
  };
}

function getAttemptIdFromUrl() {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('attempt_id') ?? '';
}

function titleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function getStatusByAccuracy(score: number) {
  if (score >= 75) {
    return {
      status: 'Strong',
      textColor: 'text-green-500',
      borderColor: 'border-l-green-500',
      barColor: 'bg-green-500',
    };
  }

  if (score >= 50) {
    return {
      status: 'Moderate',
      textColor: 'text-amber-500',
      borderColor: 'border-l-amber-500',
      barColor: 'bg-amber-500',
    };
  }

  return {
    status: 'Needs Focus',
    textColor: 'text-red-500',
    borderColor: 'border-l-red-500',
    barColor: 'bg-red-500',
  };
}

function buildSectionMetrics(result: MLResultDetail | null): SectionMetric[] {
  const sections = ['listening', 'structure', 'reading'];

  return sections.map((section) => {
    const rows = result?.topicMastery.filter((item) => item.section === section) ?? [];
    const average = rows.length
      ? rows.reduce((sum, item) => sum + item.accuracy, 0) / rows.length
      : 0;
    const score = Math.round(average);
    const status = getStatusByAccuracy(score);

    return {
      name: titleCase(section),
      status: rows.length ? status.status : 'No Data',
      score,
      progress: Math.min(Math.max(score, 0), 100),
      textColor: rows.length ? status.textColor : 'text-slate-400',
      borderColor: rows.length ? status.borderColor : 'border-l-slate-300',
      barColor: rows.length ? status.barColor : 'bg-slate-300',
    };
  });
}

export function useStudentAnalytics() {
  const router = useRouter();
  const [resultDetail, setResultDetail] = useState<MLResultDetail | null>(null);
  const [historyData, setHistoryData] = useState<MLResultHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadAnalytics = useCallback(async () => {
    const { token, studentId, role } = resolveSession();
    const attemptId = getAttemptIdFromUrl();

    if (!token) {
      router.replace('/login');
      return;
    }

    if (role === 'admin') {
      router.replace('/admin/questions');
      return;
    }

    if (!studentId) {
      setResultDetail(null);
      setHistoryData([]);
      setErrorMessage('Student ID tidak ditemukan pada session login. Silakan login ulang.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const [detail, history] = await Promise.all([
        attemptId
          ? mlResultService.getByAttempt(attemptId, token)
          : mlResultService.getLatestByStudent(studentId, token),
        mlResultService.getHistoryByStudent(studentId, token),
      ]);

      setResultDetail(detail);
      setHistoryData(history);
    } catch (error) {
      setResultDetail(null);
      setHistoryData([]);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Gagal mengambil detail analytics dari server.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadAnalytics();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadAnalytics]);

  const session = useMemo(() => resolveSession(), []);

  const studentInfo = useMemo(() => {
    const user = session.user;
    return {
      name: user?.nama ?? user?.full_name ?? 'Student',
      id: resultDetail?.studentId ?? session.studentId,
      totalEstimatedScore: Math.round(resultDetail?.totalAccuracy ?? 0),
    };
  }, [resultDetail?.studentId, resultDetail?.totalAccuracy, session.studentId, session.user]);

  const sectionMetrics = useMemo(() => buildSectionMetrics(resultDetail), [resultDetail]);

  const handleRetake = () => {
    router.push('/student/exam/listening');
  };

  const viewHistoryDetail = (attemptId?: string) => {
    const query = attemptId ? `?attempt_id=${encodeURIComponent(attemptId)}` : '';
    router.push(`/student/analytics${query}`);
  };

  const handleLogout = () => {
    clearAuthSession();
    router.replace('/login');
  };

  return {
    resultDetail,
    historyData,
    studentInfo,
    sectionMetrics,
    isLoading,
    errorMessage,
    refreshAnalytics: loadAnalytics,
    handleRetake,
    viewHistoryDetail,
    handleLogout,
  };
}
