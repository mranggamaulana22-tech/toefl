import { apiClient } from "@/services/api-client";
import type { StudentScoreHistoryItem } from "@/types/score";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function firstString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
  }

  return "";
}

function firstNumber(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }

  return 0;
}

function firstOptionalNumber(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }

  return undefined;
}

function hasScoreShape(value: unknown) {
  if (!isRecord(value)) return false;

  return (
    value.listening_score !== undefined ||
    value.structure_score !== undefined ||
    value.reading_score !== undefined ||
    value.total_score !== undefined ||
    value.listening !== undefined ||
    value.structure !== undefined ||
    value.reading !== undefined ||
    value.total !== undefined
  );
}

function unwrapScoreList(response: unknown): unknown[] {
  if (Array.isArray(response)) return response;
  if (!isRecord(response)) return [];

  const candidates = [
    response.data,
    response.scores,
    response.history,
    response.items,
    response.results,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;

    if (isRecord(candidate)) {
      const nestedCandidates = [
        candidate.data,
        candidate.scores,
        candidate.history,
        candidate.items,
        candidate.results,
      ];

      for (const nestedCandidate of nestedCandidates) {
        if (Array.isArray(nestedCandidate)) return nestedCandidate;
      }

      if (hasScoreShape(candidate)) return [candidate];
    }
  }

  if (hasScoreShape(response)) return [response];

  return [];
}

function formatDate(value?: string) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function readNestedRecord(raw: UnknownRecord, key: string) {
  const value = raw[key];
  return isRecord(value) ? value : null;
}

function normalizeStatus(value: string) {
  const normalized = value.toLowerCase();

  if (normalized === "submitted" || normalized === "verified" || normalized === "completed") {
    return "Verified";
  }

  if (normalized === "in_progress" || normalized === "progress") {
    return "In Progress";
  }

  return value || "Verified";
}

function normalizeScoreRecord(rawValue: unknown, index: number): StudentScoreHistoryItem | null {
  if (!isRecord(rawValue)) return null;

  const attempt = readNestedRecord(rawValue, "attempt");
  const score = readNestedRecord(rawValue, "score");
  const source = score ?? rawValue;

  const scoreId = firstOptionalNumber(source.id, rawValue.id, source.score_id, rawValue.score_id);
  const attemptId = firstString(
    source.attempt_id,
    rawValue.attempt_id,
    attempt?.attempt_id,
    rawValue.exam_attempt_id,
    rawValue.exam_id
  );
  const attemptNo = firstOptionalNumber(
    source.attempt_no,
    rawValue.attempt_no,
    attempt?.attempt_no,
    rawValue.exam_no,
    rawValue.exam_number
  );
  const studentId = firstString(
    source.student_id,
    rawValue.student_id,
    attempt?.student_id,
    rawValue.id_student
  );

  const submittedAt = firstString(
    source.submitted_at,
    rawValue.submitted_at,
    attempt?.submitted_at,
    source.updated_at,
    rawValue.updated_at,
    source.created_at,
    rawValue.created_at
  );
  const startedAt = firstString(source.started_at, rawValue.started_at, attempt?.started_at);
  const status = normalizeStatus(
    firstString(source.status, rawValue.status, attempt?.status, submittedAt ? "Verified" : "")
  );

  const listening = firstNumber(source.listening_score, source.listening, rawValue.listening_score, rawValue.listening);
  const structure = firstNumber(source.structure_score, source.structure, rawValue.structure_score, rawValue.structure);
  const reading = firstNumber(source.reading_score, source.reading, rawValue.reading_score, rawValue.reading);
  const total = firstNumber(source.total_score, source.total, rawValue.total_score, rawValue.total);
  const durationSeconds = firstOptionalNumber(
    source.duration_seconds,
    rawValue.duration_seconds,
    attempt?.duration_seconds
  );

  if (!studentId && !attemptId && !scoreId) return null;

  const displayId = attemptId || (scoreId ? `SCORE-${scoreId}` : `EXAM-${index + 1}`);
  const resolvedAttemptNo = attemptNo ?? index + 1;

  return {
    id: displayId,
    scoreId,
    attemptId: attemptId || undefined,
    attemptNo: resolvedAttemptNo,
    studentId,
    status,
    type: `TOEFL Simulation #${resolvedAttemptNo}`,
    date: formatDate(submittedAt),
    rawDate: submittedAt || undefined,
    submittedAt: submittedAt || undefined,
    startedAt: startedAt || undefined,
    durationSeconds,
    listening,
    structure,
    reading,
    total,
  };
}

function sortHistory(records: StudentScoreHistoryItem[]) {
  return [...records].sort((a, b) => {
    const attemptDiff = (b.attemptNo ?? 0) - (a.attemptNo ?? 0);
    if (attemptDiff !== 0) return attemptDiff;

    const dateA = a.rawDate ? new Date(a.rawDate).getTime() : 0;
    const dateB = b.rawDate ? new Date(b.rawDate).getTime() : 0;
    return dateB - dateA;
  });
}

function attachTrend(records: StudentScoreHistoryItem[]) {
  const ascending = [...records].sort((a, b) => {
    const attemptDiff = (a.attemptNo ?? 0) - (b.attemptNo ?? 0);
    if (attemptDiff !== 0) return attemptDiff;

    const dateA = a.rawDate ? new Date(a.rawDate).getTime() : 0;
    const dateB = b.rawDate ? new Date(b.rawDate).getTime() : 0;
    return dateA - dateB;
  });

  const trendById = new Map<string, StudentScoreHistoryItem["trend"]>();

  ascending.forEach((record, index) => {
    const previous = ascending[index - 1];

    if (!previous) {
      trendById.set(record.id, "neutral");
      return;
    }

    if (record.total > previous.total) trendById.set(record.id, "up");
    else if (record.total < previous.total) trendById.set(record.id, "down");
    else trendById.set(record.id, "neutral");
  });

  return records.map((record) => ({
    ...record,
    trend: trendById.get(record.id) ?? "neutral",
  }));
}

function normalizeHistoryResponse(response: unknown) {
  const normalized = unwrapScoreList(response)
    .map((item, index) => normalizeScoreRecord(item, index))
    .filter((item): item is StudentScoreHistoryItem => item !== null);

  return attachTrend(sortHistory(normalized));
}

export const scoreService = {
  async getStudentScoreHistory(studentId: string, token: string) {
    try {
      const response = await apiClient<unknown>(`/scores/student/${studentId}/history`, {
        token,
      });

      const history = normalizeHistoryResponse(response);
      if (history.length > 0) return history;
    } catch (error) {
      console.warn("History endpoint unavailable, fallback to latest score.", error);
    }

    const latestResponse = await apiClient<unknown>(`/scores/student/${studentId}`, {
      token,
    });

    return normalizeHistoryResponse(latestResponse);
  },
};
