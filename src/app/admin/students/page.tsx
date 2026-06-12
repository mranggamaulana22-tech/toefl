'use client';
import StudentForm from '@/components/admin/students/StudentForm';
import StudentTable from '@/components/admin/students/StudentTable';
import { useStudentManagement } from '@/hooks/useStudentManagement';

export default function StudentManagementPage() {
  const {
    students,
    isEditing,
    formState,
    handleSaveStudent,
    handleEditClick,
    handleDeleteStudent,
    resetForm,
    updateField,
  } = useStudentManagement();

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 md:px-8 text-black">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Student Management</h1>
          <p className="text-gray-500 mt-2">Kelola data peserta ujian TOEFL CBT secara real-time.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <StudentForm
            isEditing={isEditing}
            formState={formState}
            onSubmit={handleSaveStudent}
            onFieldChange={updateField}
            onCancel={resetForm}
          />

          <StudentTable
            students={students}
            onEdit={handleEditClick}
            onDelete={handleDeleteStudent}
          />

        </div>

      </div>
    </div>
  );
}