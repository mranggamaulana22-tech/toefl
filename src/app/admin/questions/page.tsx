// src/app/admin/questions/page.tsx
'use client';
import QuestionHeader from '@/components/admin/questions/QuestionHeader';
import QuestionModal from '@/components/admin/questions/QuestionModal';
import QuestionTable from '@/components/admin/questions/QuestionTable';
import { useQuestionManagement } from '@/hooks/useQuestionManagement';

export default function AdminQuestionsPage() {
  const qm = useQuestionManagement();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-black p-8">
      <QuestionHeader onCreate={qm.openCreateModal} />
      <QuestionTable questions={qm.questions} onEdit={qm.openEditModal} onDelete={qm.handleDelete} />
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