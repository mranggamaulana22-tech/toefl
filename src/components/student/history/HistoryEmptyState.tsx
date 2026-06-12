// src/components/student/history/HistoryEmptyState.tsx
'use client';
import { useRouter } from 'next/navigation';

export default function HistoryEmptyState() {
  const router = useRouter();
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm">
      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-3xl mx-auto mb-4 border border-slate-100">📂</div>
      <h3 className="font-bold text-slate-800 text-lg">Belum Ada Riwayat</h3>
      <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
        Kamu belum menyelesaikan simulasi ujian apa pun. Mulai assessment pertamamu sekarang!
      </p>
      <button
        onClick={() => router.push('/student/dashboard')}
        className="mt-6 px-6 py-3 bg-[#0a192f] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-md"
      >
        Mulai Ujian 🚀
      </button>
    </div>
  );
}