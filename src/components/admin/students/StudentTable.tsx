'use client';

import type { Student } from '@/mocks/questionMock';

type StudentTableProps = {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
};

export default function StudentTable({ students, onEdit, onDelete }: StudentTableProps) {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">Daftar Mahasiswa Aktif</h3>
        <span className="text-xs font-medium bg-gray-100 px-2.5 py-1 rounded-full text-gray-600">
          Total: {students.length} Siswa
        </span>
      </div>

      {students.length === 0 ? (
        <div className="flex-1 flex items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 py-16 text-center">
          <div>
            <p className="text-sm font-semibold text-gray-700">Belum ada data siswa</p>
            <p className="text-xs text-gray-400 mt-1">Tambahkan siswa baru untuk mulai mengelola daftar peserta.</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-semibold text-xs uppercase tracking-wider">
                <th className="py-3 px-2">Nama</th>
                <th className="py-3 px-2">Jurusan</th>
                <th className="py-3 px-2 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-2">
                    <div className="font-semibold text-gray-900">{student.name}</div>
                    <div className="text-xs text-gray-400">{student.email}</div>
                  </td>
                  <td className="py-3 px-2 text-gray-600 align-middle">{student.major}</td>
                  <td className="py-3 px-2 text-right align-middle">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => onEdit(student)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(student.id)}
                        className="text-xs font-semibold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition-all"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
