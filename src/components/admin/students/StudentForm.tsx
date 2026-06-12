'use client';

import type { FormEvent } from 'react';
import type { StudentFormState } from '@/hooks/useStudentManagement';

type StudentFormProps = {
  isEditing: boolean;
  formState: StudentFormState;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onFieldChange: (field: keyof StudentFormState, value: string) => void;
  onCancel: () => void;
};

export default function StudentForm({
  isEditing,
  formState,
  onSubmit,
  onFieldChange,
  onCancel,
}: StudentFormProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-max">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        {isEditing ? '📝 Edit Data Siswa' : '➕ Tambah Siswa Baru'}
      </h3>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Nama Lengkap</label>
          <input
            type="text"
            value={formState.name}
            onChange={(event) => onFieldChange('name', event.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 text-sm bg-gray-50/50"
            placeholder="Contoh: Rangga Maulana"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Email Institusi</label>
          <input
            type="email"
            value={formState.email}
            onChange={(event) => onFieldChange('email', event.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 text-sm bg-gray-50/50"
            placeholder="rangga@piksi.ac.id"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Jurusan / Program Studi</label>
          <input
            type="text"
            value={formState.major}
            onChange={(event) => onFieldChange('major', event.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 text-sm bg-gray-50/50"
            placeholder="Teknik Elektro"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all"
          >
            {isEditing ? 'Simpan Perubahan' : 'Daftarkan Siswa'}
          </button>
          {isEditing ? (
            <button
              type="button"
              onClick={onCancel}
              className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-xl transition-all"
            >
              Batal
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
