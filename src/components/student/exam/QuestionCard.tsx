// src/components/student/exam/QuestionCard.tsx
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AnswerOption, ExamSection, TOEFLQuestion } from "@/types/exam";

interface QuestionCardProps {
  question: TOEFLQuestion;
  currentAnswer: string | undefined;
  onSelectAnswer: (questionId: string, answer: AnswerOption, section: ExamSection) => void;
}

interface OptionsLayoutProps {
  question: TOEFLQuestion;
  currentAnswer: string | undefined;
  onSelectAnswer: (questionId: string, answer: AnswerOption, section: ExamSection) => void;
}

type SpeechStage = "idle" | "context" | "question";

const spokenListeningContextKeys = new Set<string>();

function normalizeSpeechText(value: string) {
  return value
    .replace(/\r\n/g, "\n")
    .replace(/\n+/g, ". ")
    .replace(/\s+/g, " ")
    .trim();
}

function createTranscriptKey(value: string) {
  return normalizeSpeechText(value).toLowerCase();
}

function isStructureMarkerOption(value: string) {
  return /^\[[A-D]\]$/.test(value.trim());
}

function hasStructureMarkerOptions(question: TOEFLQuestion) {
  return (Object.keys(question.options) as AnswerOption[]).some((key) =>
    isStructureMarkerOption(question.options[key])
  );
}

function formatOptionText(question: TOEFLQuestion, key: AnswerOption) {
  const optionText = question.options[key];

  if (question.section === "structure" && isStructureMarkerOption(optionText)) {
    return `Bagian ${optionText}`;
  }

  return optionText;
}

function renderStructureQuestionText(text: string) {
  const parts = text.split(/(\[[A-D]\])/g);

  return parts.map((part, index) => {
    if (/^\[[A-D]\]$/.test(part)) {
      return (
        <span
          key={`${part}-${index}`}
          className="mx-1 inline-flex translate-y-[-1px] rounded-md bg-amber-100 px-1.5 py-0.5 text-xs font-black text-amber-800 ring-1 ring-amber-200"
        >
          {part}
        </span>
      );
    }

    return part;
  });
}

function StructurePrompt({ question }: { question: TOEFLQuestion }) {
  const isWrittenExpression = hasStructureMarkerOptions(question);

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="inline-block bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
          Structure Question
        </span>

        {question.question_type ? (
          <span className="inline-block bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
            {question.question_type}
          </span>
        ) : null}

        <span className="inline-block bg-white border border-slate-200 text-slate-500 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
          {isWrittenExpression ? "Written Expression" : "Sentence Completion"}
        </span>
      </div>

      <div className="mb-4 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
        <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
          {isWrittenExpression
            ? "Pilih bagian [A], [B], [C], atau [D] yang paling perlu diperbaiki pada kalimat."
            : "Pilih pilihan yang paling tepat untuk melengkapi kalimat structure berikut."}
        </p>
      </div>

      <h3 className="text-slate-800 font-bold text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
        {renderStructureQuestionText(question.question_text)}
      </h3>
    </div>
  );
}

function OptionsLayout({ question, currentAnswer, onSelectAnswer }: OptionsLayoutProps) {
  return (
    <div className="flex flex-col gap-3.5 w-full">
      {(Object.keys(question.options) as AnswerOption[]).map((key) => {
        const isSelected = currentAnswer === key;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onSelectAnswer(question.id, key, question.section)}
            className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${
              isSelected
                ? "border-[#1e293b] bg-slate-50 font-semibold ring-1 ring-[#1e293b]"
                : "border-slate-200 hover:bg-slate-50/50 text-slate-700 bg-white"
            }`}
          >
            <span
              className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 ${
                isSelected ? "border-[#1e293b] bg-white" : "border-slate-300 bg-white"
              }`}
            >
              {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-[#1e293b]" />}
            </span>

            <span className="text-sm font-medium text-slate-800">
              <span className="mr-1">{key}.</span> {formatOptionText(question, key)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ListeningPrompt({ question }: { question: TOEFLQuestion }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechStage, setSpeechStage] = useState<SpeechStage>("idle");
  const [autoSpeakEnabled, setAutoSpeakEnabled] = useState(false);
  const [, setContextReadVersion] = useState(0);
  const speechRunIdRef = useRef(0);

  const contextTranscript = useMemo(
    () => normalizeSpeechText(question.context_transcript ?? ""),
    [question.context_transcript]
  );
  const readableQuestionText = useMemo(
    () => normalizeSpeechText(question.question_text),
    [question.question_text]
  );
  const contextKey = useMemo(
    () => (contextTranscript ? createTranscriptKey(contextTranscript) : ""),
    [contextTranscript]
  );
  const hasContextTranscript = contextTranscript.length > 0;
  const hasQuestionText = readableQuestionText.length > 0;
  const hasContextBeenRead = contextKey ? spokenListeningContextKeys.has(contextKey) : false;
  const hasReadableText = hasContextTranscript || hasQuestionText;
  const isSpeechSupported =
    typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

  const stopSpeech = useCallback(() => {
    speechRunIdRef.current += 1;

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
    setSpeechStage("idle");
  }, []);

  const speakListeningSequence = useCallback(
    (forceReadContext = false) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      const queue: Array<{ stage: Exclude<SpeechStage, "idle">; text: string }> = [];
      const shouldReadContext =
        hasContextTranscript && (forceReadContext || !hasContextBeenRead);

      if (shouldReadContext) {
        queue.push({ stage: "context", text: contextTranscript });
      }

      if (hasQuestionText) {
        queue.push({ stage: "question", text: readableQuestionText });
      }

      if (queue.length === 0) {
        setIsSpeaking(false);
        setSpeechStage("idle");
        return;
      }

      const runId = speechRunIdRef.current + 1;
      speechRunIdRef.current = runId;
      window.speechSynthesis.cancel();
      setIsSpeaking(true);

      const speakAt = (index: number) => {
        if (speechRunIdRef.current !== runId) return;

        const item = queue[index];

        if (!item) {
          setIsSpeaking(false);
          setSpeechStage("idle");
          return;
        }

        const utterance = new SpeechSynthesisUtterance(item.text);
        utterance.lang = "en-US";
        utterance.rate = 0.88;
        utterance.pitch = 1;

        utterance.onstart = () => {
          if (speechRunIdRef.current !== runId) return;
          setIsSpeaking(true);
          setSpeechStage(item.stage);
        };

        utterance.onend = () => {
          if (speechRunIdRef.current !== runId) return;

          if (item.stage === "context" && contextKey) {
            spokenListeningContextKeys.add(contextKey);
            setContextReadVersion((previousVersion) => previousVersion + 1);
          }

          speakAt(index + 1);
        };

        utterance.onerror = () => {
          if (speechRunIdRef.current !== runId) return;
          setIsSpeaking(false);
          setSpeechStage("idle");
        };

        window.speechSynthesis.speak(utterance);
      };

      speakAt(0);
    },
    [
      contextKey,
      contextTranscript,
      hasContextBeenRead,
      hasContextTranscript,
      hasQuestionText,
      readableQuestionText,
    ]
  );

  useEffect(() => {
    if (!autoSpeakEnabled) return;

    const timeout = window.setTimeout(() => {
      speakListeningSequence(false);
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [autoSpeakEnabled, question.id, speakListeningSequence]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleStartSpeech = () => {
    setAutoSpeakEnabled(true);
    speakListeningSequence(false);
  };

  const handleRepeatContextAndQuestion = () => {
    setAutoSpeakEnabled(true);
    speakListeningSequence(true);
  };

  const handleStopAndDisableAuto = () => {
    setAutoSpeakEnabled(false);
    stopSpeech();
  };

  const speechButtonLabel = (() => {
    if (isSpeaking && speechStage === "context") return "Membacakan context...";
    if (isSpeaking && speechStage === "question") return "Membacakan soal...";
    if (hasContextTranscript && !hasContextBeenRead) return "Mulai Bacakan Context & Soal";
    return "Bacakan Soal";
  })();

  return (
    <div className="mb-6 p-5 bg-slate-900 text-white rounded-2xl shadow-inner border border-slate-800">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl shrink-0">
          🔊
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">
              Listening Question
            </span>
            {question.part ? (
              <span className="text-[10px] bg-white/10 border border-white/10 text-slate-200 font-extrabold px-2 py-0.5 rounded-full">
                {question.part}
              </span>
            ) : null}
          </div>

          <h3 className="text-base font-extrabold text-white mt-1">
            Dengarkan audio/context, lalu pilih jawaban yang paling tepat.
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed font-medium">
            Teks context dan teks soal tetap disembunyikan. Jika beberapa soal memakai context transcript yang sama, context hanya dibacakan satu kali di awal, lalu sistem membacakan pertanyaan berikutnya.
          </p>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                Status Context
              </p>
              <p className="text-xs font-bold text-slate-200 mt-1">
                {!hasContextTranscript
                  ? "Context transcript belum tersedia"
                  : hasContextBeenRead
                  ? "Context transcript sudah dibacakan"
                  : "Context transcript akan dibacakan sebelum soal ini"}
              </p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                Auto Reading
              </p>
              <p className="text-xs font-bold text-slate-200 mt-1">
                {autoSpeakEnabled
                  ? "Aktif, soal berikutnya akan otomatis dibacakan"
                  : "Belum aktif, klik tombol mulai untuk menjalankan"}
              </p>
            </div>
          </div>

          {question.audio_url ? (
            <div className="mt-4">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">
                Audio Backend
              </p>
              <audio key={question.id} controls className="w-full h-9 accent-purple-600">
                <source src={question.audio_url} type="audio/mpeg" />
                Browser Anda tidak mendukung audio player.
              </audio>
            </div>
          ) : null}

          {hasReadableText ? (
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                type="button"
                onClick={handleStartSpeech}
                disabled={!isSpeechSupported || isSpeaking}
                className="px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-extrabold transition-all"
              >
                {speechButtonLabel}
              </button>

              {hasContextTranscript ? (
                <button
                  type="button"
                  onClick={handleRepeatContextAndQuestion}
                  disabled={!isSpeechSupported || isSpeaking}
                  className="px-4 py-2 rounded-xl bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-extrabold transition-all"
                >
                  Ulangi Context & Soal
                </button>
              ) : null}

              {isSpeaking || autoSpeakEnabled ? (
                <button
                  type="button"
                  onClick={handleStopAndDisableAuto}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 text-xs font-extrabold transition-all"
                >
                  Stop / Matikan Auto
                </button>
              ) : null}
            </div>
          ) : null}

          {!isSpeechSupported ? (
            <div className="mt-4 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-xs font-bold text-amber-800">
              Browser belum mendukung Speech Synthesis. Gunakan Chrome/Edge terbaru untuk pembacaan otomatis.
            </div>
          ) : null}

          {!question.audio_url && !hasReadableText ? (
            <div className="mt-4 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-xs font-bold text-amber-800">
              Audio, context transcript, dan teks pembacaan soal belum tersedia dari backend.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function QuestionCard({ question, currentAnswer, onSelectAnswer }: QuestionCardProps) {
  if (question.section === "reading") {
    const passageProgressLabel =
      question.passage_question_number && question.passage_question_total
        ? `Soal ${question.passage_question_number} dari ${question.passage_question_total} untuk passage ini`
        : "1 soal untuk passage ini";

    return (
      <div className="flex flex-col xl:flex-row gap-6 w-full text-black items-stretch">
        <div className="w-full xl:w-1/2 bg-white p-6 rounded-2xl border border-slate-200 max-h-[55vh] xl:max-h-[68vh] overflow-y-auto shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <span className="inline-block bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded mb-2">
                Reading Passage
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {question.passage_id || "Passage"}
              </h2>
            </div>

            <span className="text-[10px] bg-blue-50 border border-blue-100 text-blue-700 font-extrabold px-3 py-1 rounded-full">
              {passageProgressLabel}
            </span>
          </div>

          <div className="mb-4 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
            <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
              Soal dengan <span className="font-black text-slate-700">passage_id</span> atau isi passage yang sama sudah diurutkan berdekatan, jadi peserta membaca passage yang sama lalu menjawab pertanyaan-pertanyaannya secara berurutan.
            </p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed text-justify whitespace-pre-line font-medium">
            {question.passage_text || "Passage belum tersedia untuk soal ini."}
          </p>
        </div>

        <div className="w-full xl:w-1/2 bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm">
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-block bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
                Reading Question
              </span>
              {question.passage_id ? (
                <span className="inline-block bg-white border border-slate-200 text-slate-500 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
                  {question.passage_id}
                </span>
              ) : null}
            </div>

            <h3 className="text-slate-800 font-bold text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {question.question_text}
            </h3>
          </div>

          <OptionsLayout
            question={question}
            currentAnswer={currentAnswer}
            onSelectAnswer={onSelectAnswer}
          />
        </div>
      </div>
    );
  }

  if (question.section === "listening") {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 w-full max-w-3xl text-black shadow-sm mx-auto">
        <ListeningPrompt key={question.id} question={question} />

        <OptionsLayout
          question={question}
          currentAnswer={currentAnswer}
          onSelectAnswer={onSelectAnswer}
        />
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 w-full max-w-3xl text-black shadow-sm mx-auto">
      <StructurePrompt question={question} />

      <OptionsLayout
        question={question}
        currentAnswer={currentAnswer}
        onSelectAnswer={onSelectAnswer}
      />
    </div>
  );
}
