'use client';

import { useState } from 'react';
import { mockStudents, Student } from '@/mocks/questionMock';

export type StudentFormState = {
  name: string;
  email: string;
  major: string;
};

const emptyFormState: StudentFormState = {
  name: '',
  email: '',
  major: '',
};

function generateStudentId(students: Student[]) {
  const numbers = students
    .map((student) => Number.parseInt(student.id.replace(/\D/g, ''), 10))
    .filter((value) => Number.isFinite(value));

  const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
  return `STUD${String(nextNumber).padStart(3, '0')}`;
}

export function useStudentManagement() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formState, setFormState] = useState<StudentFormState>(emptyFormState);

  const updateField = (field: keyof StudentFormState, value: string) => {
    setFormState((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormState(emptyFormState);
  };

  const handleSaveStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formState.name || !formState.email || !formState.major) {
      alert('Mohon isi semua field!');
      return;
    }

    if (isEditing && currentId) {
      const updatedStudents = students.map((student) =>
        student.id === currentId
          ? {
              ...student,
              name: formState.name,
              email: formState.email,
              major: formState.major,
            }
          : student,
      );

      setStudents(updatedStudents);
      console.log(`Mengirim pembaruan data ke PUT /api/v1/student/${currentId}`);
      resetForm();
      return;
    }

    const newStudent: Student = {
      id: generateStudentId(students),
      name: formState.name,
      email: formState.email,
      major: formState.major,
      joined_date: new Date().toISOString().split('T')[0],
    };

    setStudents((previous) => [...previous, newStudent]);
    console.log('Mengirim data siswa baru ke POST /api/v1/student');
    resetForm();
  };

  const handleEditClick = (student: Student) => {
    setIsEditing(true);
    setCurrentId(student.id);
    setFormState({
      name: student.name,
      email: student.email,
      major: student.major,
    });
    console.log(`Mengambil detail data lewat GET /api/v1/student/${student.id}`);
  };

  const handleDeleteStudent = (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus siswa ini?')) {
      return;
    }

    setStudents((previous) => previous.filter((student) => student.id !== id));
    console.log(`Mengirim perintah hapus ke DELETE /api/v1/student/${id}`);
  };

  return {
    students,
    isEditing,
    formState,
    handleSaveStudent,
    handleEditClick,
    handleDeleteStudent,
    resetForm,
    updateField,
  };
}
