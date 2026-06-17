// src/app/student/analytics/page.tsx
'use client';

import Navbar from '@/components/ui/Navbar';
import ProfileOverviewCard from '@/components/student/analytics/ProfileOverviewCard';
import TopicHeatmapCard from '@/components/student/analytics/TopicHeatmapCard';
import AiRecommendationCard from '@/components/student/analytics/AiRecommendationCard';
import ProgressMetricsGrid from '@/components/student/analytics/ProgressMetricsGrid';
import ExamHistoryDetailTable from '@/components/student/analytics/ExamHistoryDetailTable';
import AiProgressInsightBox from '@/components/student/analytics/AiProgressInsightBox';
import { useStudentAnalytics } from '@/hooks/useStudentAnalytics';

export default function StudentAnalyticsPage() {
  const sa = useStudentAnalytics();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-black pb-12">
      <Navbar onLogout={sa.handleLogout} />

      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        {sa.isLoading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-slate-200 border-t-[#0a192f] animate-spin" />
            <h3 className="font-bold text-slate-800">Mengambil Detail Analytics...</h3>
            <p className="text-sm text-slate-400 mt-2">Mohon tunggu sebentar, data ML result sedang dimuat dari server lokal.</p>
          </div>
        ) : sa.errorMessage ? (
          <div className="bg-white border border-red-100 rounded-2xl p-10 text-center shadow-sm">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-2xl mx-auto mb-4">⚠️</div>
            <h3 className="font-bold text-slate-800 text-lg">Gagal Mengambil Detail Analytics</h3>
            <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto leading-relaxed">{sa.errorMessage}</p>
            <button
              onClick={sa.refreshAnalytics}
              className="mt-6 px-5 py-2.5 bg-[#0a192f] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all"
            >
              Coba Lagi
            </button>
          </div>
        ) : sa.resultDetail ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
              <ProfileOverviewCard
                studentInfo={sa.studentInfo}
                sectionMetrics={sa.sectionMetrics}
                predictedProfile={sa.resultDetail.predictedProfile}
                predictedLabel={sa.resultDetail.predictedLabel}
              />
              <TopicHeatmapCard
                topicMastery={sa.resultDetail.topicMastery}
                onRetake={sa.handleRetake}
              />
              <AiRecommendationCard recommendations={sa.resultDetail.recommendations} />
            </div>

            <ProgressMetricsGrid currentResult={sa.resultDetail} historyData={sa.historyData} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              <ExamHistoryDetailTable
                examRecords={sa.historyData}
                onViewDetail={sa.viewHistoryDetail}
              />
              <AiProgressInsightBox
                summary={sa.resultDetail.finalSummary}
                confidence={sa.resultDetail.confidence}
                predictedLabel={sa.resultDetail.predictedLabel}
              />
            </div>
          </>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
            <div className="text-4xl mb-3">📭</div>
            <h3 className="font-bold text-slate-800">Belum Ada ML Result</h3>
            <p className="text-sm text-slate-400 mt-2">Jalankan pipeline ML terlebih dahulu agar detail analytics tampil.</p>
          </div>
        )}
      </div>
    </div>
  );
}
