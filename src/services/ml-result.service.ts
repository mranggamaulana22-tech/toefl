import { apiClient } from "@/services/api-client";
import type {
  MLFeatureImportanceItem,
  MLRecommendationItem,
  MLResultDetail,
  MLResultFilePaths,
  MLResultHistoryItem,
  MLTopicMasteryItem,
} from "@/types/ml-result";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function firstString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }

  return "";
}

function firstNumber(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }

  return 0;
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

function normalizeLabel(value: string) {
  const label = value.trim().toUpperCase();
  if (label === "MODERATE") return "MOD";
  return label || "-";
}

function labelToProfile(label: string) {
  const normalized = normalizeLabel(label);

  if (normalized === "STRONG") return "Strong Learner";
  if (normalized === "MOD") return "Moderate Learner";
  if (normalized === "WEAK") return "Needs Intensive Review";

  return normalized;
}

function unwrapApiData(response: unknown): unknown {
  if (isRecord(response) && "data" in response) return response.data;
  return response;
}

function unwrapDetail(value: unknown): UnknownRecord | null {
  const data = unwrapApiData(value);

  if (isRecord(data) && isRecord(data.result)) return data;
  if (isRecord(data) && isRecord(data.data) && isRecord(data.data.result)) return data.data;
  if (isRecord(value) && isRecord(value.result)) return value;

  return null;
}

function unwrapHistory(response: unknown): unknown[] {
  const data = unwrapApiData(response);

  if (Array.isArray(data)) return data;
  if (isRecord(data)) {
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.history)) return data.history;
    if (Array.isArray(data.results)) return data.results;
    if (isRecord(data.result)) return [data];
  }

  return [];
}

function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function getPayload(result: UnknownRecord) {
  return isRecord(result.result_payload) ? result.result_payload : {};
}

function getArtifacts(detail: UnknownRecord) {
  return isRecord(detail.artifacts) ? detail.artifacts : {};
}

function normalizeTopicMasteryItem(value: unknown): MLTopicMasteryItem | null {
  if (!isRecord(value)) return null;

  const section = firstString(value.section).toLowerCase();
  const topic = firstString(value.topic, value.name);

  if (!section && !topic) return null;

  return {
    section,
    topic: topic || "Unknown Topic",
    subTopic: firstString(value.sub_topic, value.subTopic),
    totalQuestion: firstNumber(value.total_question, value.totalQuestion, value.total),
    correctCount: firstNumber(value.correct_count, value.correctCount, value.correct),
    wrongCount: firstNumber(value.wrong_count, value.wrongCount, value.wrong),
    accuracy: firstNumber(value.accuracy, value.score),
    label: normalizeLabel(firstString(value.label, value.status)),
  };
}

function normalizeRecommendationItem(value: unknown): MLRecommendationItem | null {
  if (!isRecord(value)) return null;

  const recommendation = firstString(value.recommendation, value.message, value.text, value.description);
  const topic = firstString(value.topic, value.name);

  if (!recommendation && !topic) return null;

  return {
    section: firstString(value.section).toLowerCase(),
    topic: topic || "General Review",
    subTopic: firstString(value.sub_topic, value.subTopic),
    label: normalizeLabel(firstString(value.label)),
    priority: normalizeLabel(firstString(value.priority, value.recommendation_priority)) || "MEDIUM",
    accuracy: firstNumber(value.accuracy, value.recommendation_accuracy),
    totalQuestion: firstNumber(value.total_question, value.totalQuestion),
    correctCount: firstNumber(value.correct_count, value.correctCount),
    wrongCount: firstNumber(value.wrong_count, value.wrongCount, value.recommendation_wrong_count),
    recommendation: recommendation || "Review kembali topik ini menggunakan latihan bertahap.",
  };
}

function normalizeFeatureImportanceItem(value: unknown): MLFeatureImportanceItem | null {
  if (!isRecord(value)) return null;

  const feature = firstString(value.feature, value.name, value.column);
  if (!feature) return null;

  return {
    feature,
    importance: firstNumber(value.importance, value.value, value.score),
  };
}

function getFinalRecommendationObjects(artifacts: UnknownRecord): unknown[] {
  const finalRecommendations = artifacts.final_recommendation_json;
  if (Array.isArray(finalRecommendations)) return finalRecommendations;

  const recommendationJson = artifacts.recommendation_json;
  if (Array.isArray(recommendationJson)) return recommendationJson;

  return [];
}

function pickArtifactArrays(
  result: UnknownRecord,
  payload: UnknownRecord,
  artifacts: UnknownRecord
) {
  const finalRecommendationObjects = getFinalRecommendationObjects(artifacts);
  const firstFinal = finalRecommendationObjects.find(isRecord);

  const topicMastery = [
    ...toArray(result.topic_mastery),
    ...toArray(payload.topic_mastery),
    ...(isRecord(firstFinal) ? toArray(firstFinal.topic_mastery) : []),
  ]
    .map(normalizeTopicMasteryItem)
    .filter((item): item is MLTopicMasteryItem => item !== null);

  const recommendations = [
    ...toArray(result.recommendations),
    ...toArray(payload.priority_recommendations),
    ...toArray(payload.recommendations),
    ...(isRecord(firstFinal) ? toArray(firstFinal.priority_recommendations) : []),
    ...(isRecord(firstFinal) ? toArray(firstFinal.recommendations) : []),
  ]
    .map(normalizeRecommendationItem)
    .filter((item): item is MLRecommendationItem => item !== null);

  const featureImportance = [
    ...toArray(result.feature_importance),
    ...toArray(payload.feature_importance),
  ]
    .map(normalizeFeatureImportanceItem)
    .filter((item): item is MLFeatureImportanceItem => item !== null);

  return {
    topicMastery: dedupeTopicMastery(topicMastery),
    recommendations: dedupeRecommendations(recommendations),
    featureImportance,
  };
}

function dedupeTopicMastery(items: MLTopicMasteryItem[]) {
  const map = new Map<string, MLTopicMasteryItem>();

  items.forEach((item) => {
    const key = `${item.section}|${item.topic}|${item.subTopic}`;
    if (!map.has(key)) map.set(key, item);
  });

  return Array.from(map.values());
}

function dedupeRecommendations(items: MLRecommendationItem[]) {
  const map = new Map<string, MLRecommendationItem>();

  items.forEach((item) => {
    const key = `${item.section}|${item.topic}|${item.subTopic}|${item.recommendation}`;
    if (!map.has(key)) map.set(key, item);
  });

  return Array.from(map.values());
}

function normalizeFiles(value: unknown): MLResultFilePaths {
  if (!isRecord(value)) return {};

  return {
    artifact_dir: firstString(value.artifact_dir),
    recommendation_json_path: firstString(value.recommendation_json_path),
    topic_mastery_csv_path: firstString(value.topic_mastery_csv_path),
    heatmap_data_csv_path: firstString(value.heatmap_data_csv_path),
    final_recommendation_json_path: firstString(value.final_recommendation_json_path),
  };
}

function normalizeDetail(detailValue: unknown): MLResultDetail {
  const detail = unwrapDetail(detailValue);

  if (!detail || !isRecord(detail.result)) {
    throw new Error("Format data ML result tidak sesuai dari server.");
  }

  const result = detail.result;
  const payload = getPayload(result);
  const artifacts = getArtifacts(detail);
  const artifactArrays = pickArtifactArrays(result, payload, artifacts);

  const predictedLabel = normalizeLabel(firstString(result.predicted_label, payload.predicted_label));
  const createdAt = firstString(result.created_at, payload.created_at);
  const updatedAt = firstString(result.updated_at);
  const finalSummary = firstString(payload.final_summary, isRecord(artifacts) ? artifacts.final_summary : undefined);

  return {
    id: firstNumber(result.id),
    runId: firstString(result.run_id, payload.run_id),
    studentId: firstString(result.student_id, payload.student_id),
    attemptId: firstString(result.attempt_id, payload.attempt_id),
    modelName: firstString(result.model_name, payload.model_name) || "RandomForestClassifier",
    modelVersion: firstString(result.model_version, payload.model_version) || "rf_v1",
    predictedLabel,
    predictedProfile: firstString(payload.predicted_profile) || labelToProfile(predictedLabel),
    confidence: firstNumber(result.confidence, payload.confidence),
    totalAccuracy: firstNumber(result.total_accuracy, payload.total_accuracy),
    weakCount: firstNumber(result.weak_count, payload.weak_count),
    modCount: firstNumber(result.mod_count, payload.mod_count),
    strongCount: firstNumber(result.strong_count, payload.strong_count),
    topicMastery: artifactArrays.topicMastery,
    recommendations: artifactArrays.recommendations,
    featureImportance: artifactArrays.featureImportance,
    finalSummary:
      finalSummary ||
      "Belum ada ringkasan final dari model. Gunakan rekomendasi dan topic mastery sebagai acuan belajar.",
    createdAt: createdAt || undefined,
    updatedAt: updatedAt || undefined,
    artifactErrors: toArray(artifacts.errors).map((item) => firstString(item)).filter(Boolean),
    files: normalizeFiles(artifacts.files),
  };
}

function sortHistory(records: MLResultHistoryItem[]) {
  return [...records].sort((a, b) => {
    const dateA = a.rawDate ? new Date(a.rawDate).getTime() : 0;
    const dateB = b.rawDate ? new Date(b.rawDate).getTime() : 0;
    return dateB - dateA;
  });
}

function attachTrend(records: MLResultHistoryItem[]) {
  const ascending = [...records].sort((a, b) => {
    const dateA = a.rawDate ? new Date(a.rawDate).getTime() : 0;
    const dateB = b.rawDate ? new Date(b.rawDate).getTime() : 0;
    return dateA - dateB;
  });

  const trendByAttempt = new Map<string, MLResultHistoryItem["trend"]>();

  ascending.forEach((record, index) => {
    const previous = ascending[index - 1];

    if (!previous) trendByAttempt.set(record.attemptId, "neutral");
    else if (record.totalAccuracy > previous.totalAccuracy) trendByAttempt.set(record.attemptId, "up");
    else if (record.totalAccuracy < previous.totalAccuracy) trendByAttempt.set(record.attemptId, "down");
    else trendByAttempt.set(record.attemptId, "neutral");
  });

  return records.map((record) => ({
    ...record,
    trend: trendByAttempt.get(record.attemptId) ?? "neutral",
  }));
}

function detailToHistoryItem(detail: MLResultDetail): MLResultHistoryItem {
  const rawDate = detail.updatedAt ?? detail.createdAt;

  return {
    id: detail.attemptId || `ML-${detail.id}`,
    resultId: detail.id,
    studentId: detail.studentId,
    attemptId: detail.attemptId,
    runId: detail.runId,
    modelVersion: detail.modelVersion,
    predictedLabel: detail.predictedLabel,
    confidence: detail.confidence,
    totalAccuracy: detail.totalAccuracy,
    weakCount: detail.weakCount,
    modCount: detail.modCount,
    strongCount: detail.strongCount,
    date: formatDate(rawDate),
    rawDate,
    status: "ML Saved",
  };
}

function normalizeHistory(response: unknown) {
  const details = unwrapHistory(response)
    .map((item) => {
      try {
        return normalizeDetail(item);
      } catch {
        return null;
      }
    })
    .filter((item): item is MLResultDetail => item !== null);

  return attachTrend(sortHistory(details.map(detailToHistoryItem)));
}

export const mlResultService = {
  async getLatestByStudent(studentId: string, token: string) {
    const response = await apiClient<unknown>(`/ml-results/student/${studentId}`, { token });
    return normalizeDetail(response);
  },

  async getHistoryByStudent(studentId: string, token: string) {
    const response = await apiClient<unknown>(`/ml-results/student/${studentId}/history`, { token });
    return normalizeHistory(response);
  },

  async getByAttempt(attemptId: string, token: string) {
    const response = await apiClient<unknown>(`/ml-results/attempt/${attemptId}`, { token });
    return normalizeDetail(response);
  },
};
