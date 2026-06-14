// src/app/admin/questions/page.tsx
"use client";

import { useRouter } from "next/navigation";
import QuestionHeader from "@/components/admin/questions/QuestionHeader";
import QuestionModal from "@/components/admin/questions/QuestionModal";
import QuestionTable from "@/components/admin/questions/QuestionTable";
import Navbar from "@/components/ui/Navbar";
import { useQuestionManagement } from "@/hooks/useQuestionManagement";
import { clearAuthSession } from "@/lib/auth-session";

export default function AdminQuestionsPage() {
  const router = useRouter();
  const qm = useQuestionManagement();

  const listeningCount = qm.questions.filter(
    (question) => question.section === "listening"
  ).length;
  const structureCount = qm.questions.filter(
    (question) => question.section === "structure"
  ).length;
  const readingCount = qm.questions.filter(
    (question) => question.section === "reading"
  ).length;

  const handleLogout = () => {
    clearAuthSession();
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-black pb-12">
      <Navbar onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
              Admin Dashboard
            </p>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Question Bank Management 📚
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Kelola soal TOEFL untuk Listening, Structure, dan Reading dengan tampilan yang konsisten seperti dashboard student.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl px-5 py-2.5 flex items-center gap-6 shadow-sm text-xs font-bold">
            <div>
              <span className="text-slate-400 uppercase block mb-0.5">
                Role
              </span>
              <span className="text-slate-800 text-sm">Admin</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200" />
            <div>
              <span className="text-slate-400 uppercase block mb-0.5">
                Total Soal
              </span>
              <span className="text-[#0a192f] text-sm">
                {qm.questions.length}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Listening
              </span>
              <span className="h-9 w-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-lg">
                🎧
              </span>
            </div>
            <p className="text-3xl font-black text-slate-900">
              {listeningCount}
            </p>
            <p className="text-xs text-slate-500 mt-1 font-semibold">
              Soal audio dan pemahaman listening.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Structure
              </span>
              <span className="h-9 w-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg">
                ✍️
              </span>
            </div>
            <p className="text-3xl font-black text-slate-900">
              {structureCount}
            </p>
            <p className="text-xs text-slate-500 mt-1 font-semibold">
              Soal grammar dan written expression.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Reading
              </span>
              <span className="h-9 w-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-lg">
                📖
              </span>
            </div>
            <p className="text-3xl font-black text-slate-900">
              {readingCount}
            </p>
            <p className="text-xs text-slate-500 mt-1 font-semibold">
              Soal bacaan dan pemahaman teks.
            </p>
          </div>
        </div>

        <section className="space-y-5">
          <QuestionHeader onCreate={qm.openCreateModal} />
          <QuestionTable
            questions={qm.questions}
            onEdit={qm.openEditModal}
            onDelete={qm.handleDelete}
          />
        </section>
      </div>

      <QuestionModal
        isOpen={qm.isModalOpen}
        editingQuestion={qm.editingQuestion}
        section={qm.section}
        setSection={qm.setSection}
        questionText={qm.questionText}
        setQuestionText={qm.setQuestionText}
        passageText={qm.passageText}
        setPassageText={qm.setPassageText}
        audioUrl={qm.audioUrl}
        setAudioUrl={qm.setAudioUrl}
        options={qm.options}
        setOptions={qm.setOptions}
        correctAnswer={qm.correctAnswer}
        setCorrectAnswer={qm.setCorrectAnswer}
        onSave={qm.handleSave}
        onClose={() => qm.setIsModalOpen(false)}
      />
    </div>
  );
}
