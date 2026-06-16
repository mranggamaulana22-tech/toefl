export interface StudentScoreHistoryItem {
  id: string;
  scoreId?: number;
  attemptId?: string;
  attemptNo?: number;
  studentId: string;
  status: string;
  type: string;
  date: string;
  rawDate?: string;
  submittedAt?: string;
  startedAt?: string;
  durationSeconds?: number;
  listening: number;
  structure: number;
  reading: number;
  total: number;
  trend?: "up" | "down" | "neutral";
}
