import { apiClient } from "@/services/api-client";
import type {
  AnswerOption,
  ExamSection,
  SubmitAnswersPayload,
  SubmitAnswersResponse,
  TOEFLQuestion,
} from "@/types/exam";

type UnknownRecord = Record<string, unknown>;

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8081/api/v1";

export const sectionOrder: ExamSection[] = ["listening", "structure", "reading"];
export const sectionLabels: Record<ExamSection, string> = {
  listening: "Listening",
  structure: "Structure",
  reading: "Reading",
};

const answerOptions: AnswerOption[] = ["A", "B", "C", "D"];

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function firstString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }

    if (typeof value === "number") {
      return String(value);
    }
  }

  return "";
}

function normalizeTranscriptKey(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function normalizePassageKey(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function normalizeMediaUrl(value: string) {
  if (!value) return "";

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:") ||
    value.startsWith("blob:")
  ) {
    return value;
  }

  const backendBaseUrl = API_BASE_URL.replace(/\/api\/v1\/?$/, "").replace(/\/$/, "");
  const cleanValue = value.replace(/^\/+/, "");

  if (cleanValue.includes("/")) {
    return `${backendBaseUrl}/${cleanValue}`;
  }

  // Backend listening biasanya mengirim audio_path berupa nama file saja,
  // misalnya "listening_simulation_499.mp3". FE arahkan ke folder static audio.
  return `${backendBaseUrl}/uploads/audios/${cleanValue}`;
}

function readOptionFromObject(options: UnknownRecord, option: AnswerOption) {
  const lower = option.toLowerCase();

  return firstString(
    options[option],
    options[lower],
    options[`option_${lower}`],
    options[`option${option}`],
    options[`option${lower}`],
    options[`answer_${lower}`],
    options[`choice_${lower}`]
  );
}

function normalizeOptions(question: UnknownRecord) {
  const rawOptions = question.options;

  if (Array.isArray(rawOptions)) {
    return {
      A: firstString(rawOptions[0]),
      B: firstString(rawOptions[1]),
      C: firstString(rawOptions[2]),
      D: firstString(rawOptions[3]),
    };
  }

  if (isRecord(rawOptions)) {
    return {
      A: readOptionFromObject(rawOptions, "A"),
      B: readOptionFromObject(rawOptions, "B"),
      C: readOptionFromObject(rawOptions, "C"),
      D: readOptionFromObject(rawOptions, "D"),
    };
  }

  return {
    A: firstString(question.option_a, question.optionA, question.answer_a, question.choice_a, question.a),
    B: firstString(question.option_b, question.optionB, question.answer_b, question.choice_b, question.b),
    C: firstString(question.option_c, question.optionC, question.answer_c, question.choice_c, question.c),
    D: firstString(question.option_d, question.optionD, question.answer_d, question.choice_d, question.d),
  };
}

function unwrapQuestionList(response: unknown, section: ExamSection): unknown[] {
  if (Array.isArray(response)) return response;

  if (!isRecord(response)) return [];

  // Backend ujian mengembalikan bentuk seperti:
  // { status, message, data: { status, message, total, data: [...] } }
  // Jadi array soal ada di response.data.data, bukan langsung di response.data.
  const candidates = [
    response.data,
    response.questions,
    response.items,
    response.results,
    response[section],
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;

    if (isRecord(candidate)) {
      const nestedCandidates = [
        candidate.data,
        candidate.questions,
        candidate.items,
        candidate.results,
        candidate[section],
      ];

      for (const nestedCandidate of nestedCandidates) {
        if (Array.isArray(nestedCandidate)) return nestedCandidate;
      }
    }
  }

  return [];
}

function normalizeQuestion(rawQuestion: unknown, section: ExamSection): TOEFLQuestion | null {
  if (!isRecord(rawQuestion)) return null;

  const id = firstString(
    rawQuestion.id,
    rawQuestion.question_id,
    rawQuestion.questionId,
    rawQuestion.questionID,
    rawQuestion.code
  );

  if (!id) return null;

  const options = normalizeOptions(rawQuestion);
  const rawAudioPath = firstString(
    rawQuestion.audio_path,
    rawQuestion.audioPath,
    rawQuestion.audio_url,
    rawQuestion.audioUrl,
    rawQuestion.audio,
    rawQuestion.file_url,
    rawQuestion.fileUrl,
    rawQuestion.sound_url,
    rawQuestion.soundUrl
  );

  return {
    id,
    section,
    part: firstString(rawQuestion.part, rawQuestion.question_part, rawQuestion.questionPart),
    question_type: firstString(
      rawQuestion.question_type,
      rawQuestion.questionType,
      rawQuestion.type,
      rawQuestion.category,
      rawQuestion.topic
    ),
    context_transcript: firstString(
      rawQuestion.context_transcript,
      rawQuestion.contextTranscript,
      rawQuestion.transcript,
      rawQuestion.conversation_transcript,
      rawQuestion.conversationTranscript,
      rawQuestion.audio_transcript,
      rawQuestion.audioTranscript
    ),
    question_text: firstString(
      rawQuestion.question_text,
      rawQuestion.questionText,
      rawQuestion.question,
      rawQuestion.text,
      rawQuestion.title
    ),
    passage_id: firstString(
      rawQuestion.passage_id,
      rawQuestion.passageId,
      rawQuestion.reading_passage_id,
      rawQuestion.readingPassageId,
      rawQuestion.paragraph_id,
      rawQuestion.paragraphId
    ),
    passage_text: firstString(
      rawQuestion.passage_text,
      rawQuestion.passageText,
      rawQuestion.passage,
      rawQuestion.reading_text,
      rawQuestion.readingText
    ),
    audio_path: rawAudioPath,
    audio_url: normalizeMediaUrl(rawAudioPath),
    options,
    correctAnswer: firstString(rawQuestion.correct_answer, rawQuestion.correctAnswer),
  };
}

function groupListeningQuestionsByTranscript(questions: TOEFLQuestion[]) {
  const groupKeys: string[] = [];
  const groups = new Map<string, TOEFLQuestion[]>();

  questions.forEach((question) => {
    const transcriptKey = normalizeTranscriptKey(question.context_transcript ?? "");
    const key = transcriptKey || `single-${question.id}`;

    if (!groups.has(key)) {
      groups.set(key, []);
      groupKeys.push(key);
    }

    groups.get(key)?.push(question);
  });

  return groupKeys.flatMap((key) => groups.get(key) ?? []);
}

function groupReadingQuestionsByPassage(questions: TOEFLQuestion[]) {
  const groupKeys: string[] = [];
  const groups = new Map<string, TOEFLQuestion[]>();

  questions.forEach((question) => {
    const passageIdKey = normalizePassageKey(question.passage_id ?? "");
    const passageTextKey = normalizePassageKey(question.passage_text ?? "");
    const key = passageIdKey || passageTextKey || `single-${question.id}`;

    if (!groups.has(key)) {
      groups.set(key, []);
      groupKeys.push(key);
    }

    groups.get(key)?.push(question);
  });

  return groupKeys.flatMap((key) => {
    const group = groups.get(key) ?? [];
    const total = group.length;

    return group.map((question, index) => ({
      ...question,
      passage_question_number: total > 1 ? index + 1 : undefined,
      passage_question_total: total > 1 ? total : undefined,
    }));
  });
}

function isExamSection(section: string): section is ExamSection {
  return sectionOrder.includes(section as ExamSection);
}

async function getQuestionsBySection(section: ExamSection, token: string) {
  const response = await apiClient<unknown>(`/exam/questions/${section}`, {
    token,
  });

  const questions = unwrapQuestionList(response, section)
    .map((item) => normalizeQuestion(item, section))
    .filter((item): item is TOEFLQuestion => item !== null);

  if (section === "listening") {
    return groupListeningQuestionsByTranscript(questions);
  }

  if (section === "reading") {
    return groupReadingQuestionsByPassage(questions);
  }

  return questions;
}

export const examService = {
  async getExamQuestions(token: string) {
    const groupedQuestions = await Promise.all(
      sectionOrder.map((section) => getQuestionsBySection(section, token))
    );

    return groupedQuestions.flat();
  },

  getQuestionsBySection,

  getNextSection(section: ExamSection) {
    const currentIndex = sectionOrder.indexOf(section);
    return sectionOrder[currentIndex + 1] ?? null;
  },

  getPreviousSection(section: ExamSection) {
    const currentIndex = sectionOrder.indexOf(section);
    return sectionOrder[currentIndex - 1] ?? null;
  },

  isExamSection,

  submitAnswers(payload: SubmitAnswersPayload, token: string) {
    return apiClient<SubmitAnswersResponse>("/answers/submit", {
      method: "POST",
      token,
      body: payload,
    });
  },

  answerOptions,
  sectionOrder,
  sectionLabels,
};
