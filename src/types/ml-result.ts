export type MLMasteryLabel = "WEAK" | "MOD" | "STRONG" | string;

export interface MLTopicMasteryItem {
  section: string;
  topic: string;
  subTopic: string;
  totalQuestion: number;
  correctCount: number;
  wrongCount: number;
  accuracy: number;
  label: MLMasteryLabel;
}

export interface MLRecommendationItem {
  section: string;
  topic: string;
  subTopic: string;
  label: string;
  priority: string;
  accuracy: number;
  totalQuestion: number;
  correctCount: number;
  wrongCount: number;
  recommendation: string;
}

export interface MLFeatureImportanceItem {
  feature: string;
  importance: number;
}

export interface MLResultFilePaths {
  artifact_dir?: string;
  recommendation_json_path?: string;
  topic_mastery_csv_path?: string;
  heatmap_data_csv_path?: string;
  final_recommendation_json_path?: string;
}

export interface MLResultDetail {
  id: number;
  runId: string;
  studentId: string;
  attemptId: string;
  modelName: string;
  modelVersion: string;
  predictedLabel: string;
  predictedProfile: string;
  confidence: number;
  totalAccuracy: number;
  weakCount: number;
  modCount: number;
  strongCount: number;
  topicMastery: MLTopicMasteryItem[];
  recommendations: MLRecommendationItem[];
  featureImportance: MLFeatureImportanceItem[];
  finalSummary: string;
  createdAt?: string;
  updatedAt?: string;
  artifactErrors: string[];
  files: MLResultFilePaths;
}

export interface MLResultHistoryItem {
  id: string;
  resultId: number;
  studentId: string;
  attemptId: string;
  runId: string;
  modelVersion: string;
  predictedLabel: string;
  confidence: number;
  totalAccuracy: number;
  weakCount: number;
  modCount: number;
  strongCount: number;
  date: string;
  rawDate?: string;
  status: string;
  trend?: "up" | "down" | "neutral";
}
