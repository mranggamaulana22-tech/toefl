// src/hooks/useQuestionManagement.ts
'use client';
import { useState } from 'react';
import { mockTOEFLQuestions, TOEFLQuestion } from '@/mocks/questionMock';

export function useQuestionManagement() {
  const [questions, setQuestions] = useState<TOEFLQuestion[]>(mockTOEFLQuestions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<TOEFLQuestion | null>(null);

  // Form State Utama
  const [section, setSection] = useState<'listening' | 'structure' | 'reading'>('structure');
  const [questionText, setQuestionText] = useState('');
  const [passageText, setPassageText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [options, setOptions] = useState({ A: '', B: '', C: '', D: '' });
  const [correctAnswer, setCorrectAnswer] = useState<'A' | 'B' | 'C' | 'D'>('A');

  const openCreateModal = () => {
    setEditingQuestion(null);
    setSection('structure');
    setQuestionText('');
    setPassageText('');
    setAudioUrl('');
    setOptions({ A: '', B: '', C: '', D: '' });
    setCorrectAnswer('A');
    setIsModalOpen(true);
  };

  const openEditModal = (q: TOEFLQuestion) => {
    setEditingQuestion(q);
    setSection(q.section);
    setQuestionText(q.question_text);
    setPassageText(q.passage_text || '');
    setAudioUrl(q.audio_url || '');
    setOptions({ ...q.options });
    setCorrectAnswer(q.correctAnswer as 'A' | 'B' | 'C' | 'D');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    const questionData = {
      id: editingQuestion ? editingQuestion.id : `QST-${Date.now()}`,
      section,
      question_text: questionText,
      options,
      correct_answer: correctAnswer,
      ...(section === 'reading' && { passage_text: passageText }),
      ...(section === 'listening' && { audio_url: audioUrl }),
    };

    if (editingQuestion) {
      // Logic Update
      setQuestions(questions.map(q => q.id === editingQuestion.id ? (questionData as TOEFLQuestion) : q));
      console.log("Mengirim data UPDATE Soal ke API Bruno:", questionData);
    } else {
      // Logic Create
      setQuestions([...questions, questionData as TOEFLQuestion]);
      console.log("Mengirim data CREATE Soal ke API Bruno:", questionData);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus soal ini dari bank ujian?")) {
      setQuestions(questions.filter(q => q.id !== id));
      console.log(`Mengirim perintah DELETE Soal ID ${id} ke API Bruno`);
    }
  };

  return {
    questions,
    isModalOpen,
    setIsModalOpen,
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
    openCreateModal,
    openEditModal,
    handleSave,
    handleDelete
  };
}