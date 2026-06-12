'use client';

import type { TOEFLQuestion } from '@/mocks/questionMock';

type QuestionSection = TOEFLQuestion['section'];
type QuestionAnswer = 'A' | 'B' | 'C' | 'D';
type QuestionOptions = Record<QuestionAnswer, string>;

type QuestionModalProps = {
  isOpen: boolean;
  editingQuestion: TOEFLQuestion | null;
  section: QuestionSection;
  setSection: (section: QuestionSection) => void;
  questionText: string;
  setQuestionText: (value: string) => void;
  passageText: string;
  setPassageText: (value: string) => void;
  audioUrl: string;
  setAudioUrl: (value: string) => void;
  options: QuestionOptions;
  setOptions: (options: QuestionOptions) => void;
  correctAnswer: QuestionAnswer;
  setCorrectAnswer: (value: QuestionAnswer) => void;
  onSave: (e: React.FormEvent) => void;
  onClose: () => void;
};

export default function QuestionModal({
  isOpen,
  editingQuestion,
  section,
  setSection,
  questionText,
  setQuestionText,
  passageText,
  setPassageText,
  audioUrl,
  setAudioUrl,
  options,
  setOptions,
  correctAnswer,
  setCorrectAnswer,
  onSave,
  onClose,
}: QuestionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl border border-slate-100 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl">
        <h2 className="text-lg font-black text-slate-900 mb-4">
          {editingQuestion ? '📝 Edit Soal TOEFL' : '✨ Tambah Soal TOEFL Baru'}
        </h2>

        <form onSubmit={onSave} className="space-y-4 text-xs font-semibold text-slate-700">
          <div>
            <label className="block mb-1.5 text-slate-500 uppercase tracking-wide">Pilih Section Ujian</label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value as QuestionSection)}
              className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none"
            >
              <option value="listening">Listening Section</option>
              <option value="structure">Structure & Written Expression</option>
              <option value="reading">Reading Comprehension</option>
            </select>
          </div>

          {section === 'reading' && (
            <div className="animate-fade-in">
              <label className="block mb-1.5 text-slate-500 uppercase tracking-wide">Teks Bacaan (Passage Text)</label>
              <textarea
                value={passageText}
                onChange={(e) => setPassageText(e.target.value)}
                rows={4}
                className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-normal"
                placeholder="Masukkan paragraf bacaan di sini..."
              />
            </div>
          )}

          {section === 'listening' && (
            <div className="animate-fade-in">
              <label className="block mb-1.5 text-slate-500 uppercase tracking-wide">Jalur URL Audio / Mock File (.mp3)</label>
              <input
                type="text"
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-normal"
                placeholder="https://example.com/audio/track-1.mp3"
              />
            </div>
          )}

          <div>
            <label className="block mb-1.5 text-slate-500 uppercase tracking-wide">Pertanyaan Ujian</label>
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-normal"
              placeholder="Masukkan kalimat soal..."
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['A', 'B', 'C', 'D'].map((optionKey) => (
              <div key={optionKey}>
                <label className="block mb-1 text-slate-400 font-bold">Pilihan {optionKey}</label>
                <input
                  type="text"
                  value={options[optionKey as QuestionAnswer]}
                  onChange={(e) => setOptions({ ...options, [optionKey]: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-normal"
                  placeholder={`Isi opsi ${optionKey}`}
                  required
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block mb-1.5 text-slate-500 uppercase tracking-wide">Kunci Jawaban Benar</label>
            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value as QuestionAnswer)}
              className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 font-bold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0a192f] text-white rounded-xl font-bold shadow-md"
            >
              Simpan Soal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}