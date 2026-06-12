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
        <HistoryHeader totalExams={sh.historyData.length} />
        
        {sh.hasHistory ? (
          <HistoryCardList data={sh.historyData} onViewAnalytics={sh.viewAnalytics} />
        ) : (
          <HistoryEmptyState />
        )}
      </div>
    </div>
  );
}