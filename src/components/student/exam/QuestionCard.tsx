// src/components/student/exam/QuestionCard.tsx
'use client';
import { TOEFLQuestion } from '@/mocks/questionMock';

interface QuestionCardProps {
  question: TOEFLQuestion;
  currentAnswer: string | undefined;
  onSelectAnswer: (questionId: string, answer: string, section: string) => void;
}

export default function QuestionCard({ question, currentAnswer, onSelectAnswer }: QuestionCardProps) {
  
  // Sub-Komponen Pilihan Ganda (Baris melintang vertikal dengan custom radio button bulat figma)
  const OptionsLayout = () => (
    <div className="flex flex-col gap-3.5 w-full">
      {(Object.keys(question.options) as Array<keyof typeof question.options>).map((key) => {
        const isSelected = currentAnswer === key;
        return (
          <button
            key={key}
            onClick={() => onSelectAnswer(question.id, key, question.section)}
            className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${
              isSelected
                ? 'border-[#1e293b] bg-slate-50 font-semibold ring-1 ring-[#1e293b]'
                : 'border-slate-200 hover:bg-slate-50/50 text-slate-700 bg-white'
            }`}
          >
            {/* Custom Bulatan Radio Button */}
            <span className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 ${
              isSelected ? 'border-[#1e293b] bg-white' : 'border-slate-300 bg-white'
            }`}>
              {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-[#1e293b]"></span>}
            </span>
            
            <span className="text-sm font-medium text-slate-800">
              <span className="mr-1">{key}.</span> {question.options[key]}
            </span>
          </button>
        );
      })}
    </div>
  );

  // LAYOUT 1: KONDISIONAL KHUSUS READING (Sistem Split Screen 2 Kolom - image_be1b22 / image_be811a model)
  if (question.section === 'reading') {
    return (
      <div className="flex flex-col xl:flex-row gap-6 w-full text-black items-stretch">
        {/* Kolom Kiri: Teks Paragraf Panjang (Scrollable) */}
        <div className="w-full xl:w-1/2 bg-white p-6 rounded-2xl border border-slate-200 max-h-[55vh] xl:max-h-[68vh] overflow-y-auto shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">The Rise of Teotihuacán</h2>
          <p className="text-sm text-slate-600 leading-relaxed text-justify whitespace-pre-line font-medium">
            {question.passage_text}
          </p>
        </div>

        {/* Kolom Kanan: Soal Utama & Opsi Pilihan Ganda */}
        <div className="w-full xl:w-1/2 bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm">
          <div className="mb-6">
            <span className="inline-block bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded mb-3">
              Multiple Choice
            </span>
            <h3 className="text-slate-800 font-bold text-base leading-relaxed">
              {question.question_text}
            </h3>
          </div>
          <OptionsLayout />
        </div>
      </div>
    );
  }

  // LAYOUT 2: KONDISIONAL KHUSUS LISTENING & STRUCTURE (Layout Center Ringkas)
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 w-full max-w-3xl text-black shadow-sm mx-auto">
      
      {/* Player Audio Murni Khusus Sesi Listening */}
      {question.section === 'listening' && question.audio_url && (
        <div className="mb-6 p-4 bg-slate-900 text-white rounded-xl flex items-center gap-4 shadow-inner">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">
            🔊
          </div>
          <div className="flex-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Listening Track</span>
            <audio key={question.id} controls className="w-full h-8 mt-1 accent-purple-600">
              <source src={question.audio_url} type="audio/mpeg" />
            </audio>
          </div>
        </div>
      )}

      {/* Teks Box Pertanyaan */}
      <div className="mb-6">
        <h3 className="text-slate-800 font-bold text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
          {question.question_text}
        </h3>
      </div>

      {/* Opsi Pilihan Ganda */}
      <OptionsLayout />
    </div>
  );
}