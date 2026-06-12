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
      
      {/* GLOBAL NAVBAR COMPONENTS */}
      <Navbar />

      {/* CONTAINER FRAME UTAMA */}
      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        
        {/* ROW 1: TOP PANEL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
          <ProfileOverviewCard 
            studentInfo={sa.studentInfo} 
            sectionMetrics={sa.sectionMetrics} 
          />
          <TopicHeatmapCard 
            onRetake={sa.handleRetake} 
          />
          <AiRecommendationCard />
        </div>

        {/* ROW 2: STATS SUMMARY PROGRESS */}
        <ProgressMetricsGrid />

        {/* ROW 3: BOTTOM DATA RECORDS TABLE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <ExamHistoryDetailTable 
            examRecords={sa.examRecords} 
          />
          <AiProgressInsightBox />
        </div>

      </div>
    </div>
  );
}