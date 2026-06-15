export type ExamSection = "listening" | "structure" | "reading";
export type AnswerOption = "A" | "B" | "C" | "D";

export type QuestionOptions = Record<AnswerOption, string>;

export interface TOEFLQuestion {
  id: string;
  section: ExamSection;
  question_text: string;
  options: QuestionOptions;
  part?: string;
  question_type?: string;
  context_transcript?: string;
  passage_id?: string;
  passage_text?: string;
  passage_question_number?: number;
  passage_question_total?: number;
  audio_url?: string;
  audio_path?: string;
  correctAnswer?: string;
}

export interface StudentAnswer {
  question_id: string;
  section: ExamSection;
  selected_answer: AnswerOption;
}

export interface SubmitAnswersPayload {
  student_id: string;
  answers: StudentAnswer[];
}

export interface SubmitAnswersResponse {
  message?: string;
  data?: unknown;
  total_score?: number;
  section_scores?: {
    listening?: number;
    structure?: number;
    reading?: number;
  };
}
