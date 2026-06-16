// src/app/student/history/page.tsx
'use client';

import Navbar from '@/components/ui/Navbar';
import HistoryHeader from '@/components/student/history/HistoryHeader';
import HistoryCardList from '@/components/student/history/HistoryCardList';
import HistoryEmptyState from '@/components/student/history/HistoryEmptyState';
import { useStudentHistory } from '@/hooks/useStudentHistory';

export default function StudentHistoryPage() {
  const sh = useStudentHistory();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-black pb-12">
      <Navbar onLogout={sh.handleLogout} />
      
      <div className="max-w-5xl mx-auto px-6 mt-10">
        <HistoryHeader totalExams={sh.historyData.length} bestScore={sh.bestScore} />

        {sh.isLoading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-slate-200 border-t-[#0a192f] animate-spin" />
            <h3 className="font-bold text-slate-800">Mengambil History Ujian...</h3>
            <p className="text-sm text-slate-400 mt-2">Mohon tunggu sebentar, data nilai sedang dimuat dari server.</p>
          </div>
        ) : sh.errorMessage ? (
          <div className="bg-white border border-red-100 rounded-2xl p-10 text-center shadow-sm">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-2xl mx-auto mb-4">⚠️</div>
            <h3 className="font-bold text-slate-800 text-lg">Gagal Mengambil History</h3>
            <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto leading-relaxed">{sh.errorMessage}</p>
            <button
              onClick={sh.refreshHistory}
              className="mt-6 px-5 py-2.5 bg-[#0a192f] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all"
            >
              Coba Lagi
            </button>
          </div>
        ) : sh.hasHistory ? (
          <HistoryCardList data={sh.historyData} onViewAnalytics={sh.viewAnalytics} />
        ) : (
          <HistoryEmptyState />
        )}
      </div>
    </div>
  );
}
