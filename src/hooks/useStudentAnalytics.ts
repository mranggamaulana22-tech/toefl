// src/hooks/useStudentAnalytics.ts
'use client';
import { useRouter } from 'next/navigation';

export function useStudentAnalytics() {
  const router = useRouter();

  const studentInfo = { name: "Budi", id: "STUD001", totalEstimatedScore: 530 };
  
  const sectionMetrics = [
    { name: "Listening", status: "Needs Focus", score: 44, textColor: "text-red-500", borderColor: "border-l-red-500", progress: 48, barColor: "bg-red-500" },
    { name: "Structure", status: "Approaching Target", score: 56, textColor: "text-amber-500", borderColor: "border-l-amber-500", progress: 70, barColor: "bg-amber-500" },
    { name: "Reading", status: "On Track", score: 59, textColor: "text-green-500", borderColor: "border-l-green-500", progress: 84, barColor: "bg-green-500" }
  ];

  const examRecords = [
    { id: "EXM-9821", date: "Oct 24, 2023", listening: 44, structure: 56, reading: 59, total: 530 },
    { id: "EXM-9748", date: "Oct 12, 2023", listening: 48, structure: 54, reading: 57, total: 540 },
    { id: "EXM-9611", date: "Sep 28, 2023", listening: 42, structure: 60, reading: 58, total: 525 }
  ];

  const handleRetake = () => {
    router.push('/student/exam');
  };

  return {
    studentInfo,
    sectionMetrics,
    examRecords,
    handleRetake
  };
}