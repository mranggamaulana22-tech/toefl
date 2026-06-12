'use client';

import type { TOEFLQuestion } from '@/mocks/questionMock';

type QuestionTableProps = {
  questions: TOEFLQuestion[];
  onEdit: (question: TOEFLQuestion) => void;
  onDelete: (id: string) => void;
};

export default function QuestionTable({ questions, onEdit, onDelete }: QuestionTableProps) {
  return (
    <div className="max-w-6xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-medium">
          <thead>
            <tr className="bg-slate-50 text-slate-400 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider">
              <th className="p-4">ID</th>
              <th className="p-4">Section</th>
              <th className="p-4">Pertanyaan / Cuplikan Bacaan</th>
              <th className="p-4 text-center">Kunci</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {questions.map((question) => (
              <tr key={question.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 text-slate-400 font-mono text-[11px]">{question.id}</td>
                <td className="p-4">
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      question.section === 'listening'
                        ? 'bg-red-50 text-red-600'
                        : question.section === 'structure'
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-green-50 text-green-600'
                    }`}
                  >
                    {question.section}
                  </span>
                </td>
                <td className="p-4 max-w-md truncate text-slate-800">
                  {question.question_text}
                </td>
                <td className="p-4 text-center text-slate-900 font-extrabold">{question.correct_answer}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => onEdit(question)} className="text-xs font-bold text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button onClick={() => onDelete(question.id)} className="text-xs font-bold text-red-500 hover:underline">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}