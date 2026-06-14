// src/app/student/dashboard/page.tsx
'use client';
import Navbar from '@/components/ui/Navbar';
import SectionCards from '@/components/student/dashboard/SectionCards';
import StartAssessmentBox from '@/components/student/dashboard/StartAssessmentBox';
import DashboardAnalyticsSidebar from '@/components/student/dashboard/DashboardAnalyticsSidebar';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';

export default function StudentDashboardPage() {
  const sd = useStudentDashboard();
  const studentName = sd.user?.full_name ?? sd.user?.nama ?? "Student";
  const studentId = sd.user?.id_student ?? sd.user?.id_users ?? sd.user?.id ?? "-";

  return (
    <div className="min-h-screen bg-[#f8fafc] text-black pb-12">
      <Navbar onLogout={sd.handleLogout} toggleDemoMode={sd.toggleDemoMode} hasTakenTest={sd.hasTakenTest} isDemo />
      
      <div className="max-w-7xl mx-auto px-6 mt-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcome Back, {studentName} 👋
          </h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Track your TOEFL progress and receive AI-powered recommendations.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl px-5 py-2.5 flex items-center gap-6 shadow-sm text-xs font-bold">
            <div><span className="text-slate-400 uppercase block mb-0.5">Name</span><span className="text-slate-800 text-sm">{studentName}</span></div>
            <div className="h-8 w-[1px] bg-slate-200"></div>
            <div><span className="text-slate-400 uppercase block mb-0.5">ID</span><span className="text-[#0a192f] text-sm">{studentId}</span></div>
          </div>
        </div>

        {/* Layout Grid Kiri & Kanan */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <SectionCards />
            <StartAssessmentBox 
              isReady={sd.isReady} 
              setIsReady={sd.setIsReady} 
              onStart={sd.handleStartExam} 
              hasTakenTest={sd.hasTakenTest}
            />
          </div>
          <DashboardAnalyticsSidebar hasTakenTest={sd.hasTakenTest} />
        </div>
      </div>
    </div>
  );
}