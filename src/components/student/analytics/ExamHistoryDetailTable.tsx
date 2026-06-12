// src/components/student/analytics/ExamHistoryDetailTable.tsx
'use client';

interface ExamHistoryDetailTableProps {
  examRecords: any[];
}

export default function ExamHistoryDetailTable({ examRecords }: ExamHistoryDetailTableProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm lg:col-span-2 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
          <h3 className="font-bold text-slate-900 text-sm">Exam History Detail</h3>
          <div className="flex gap-1.5 text-[9px] font-bold uppercase text-slate-400">
            <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded cursor-pointer">All</span>
            <span className="px-2 py-0.5 rounded cursor-pointer hover:bg-slate-50">Listening</span>
            <span className="px-2 py-0.5 rounded cursor-pointer hover:bg-slate-50">Reading</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider">
                <th className="py-2">Exam ID</th>
                <th className="py-2">Date</th>
                <th className="py-2">Listening</th>
                <th className="py-2">Structure</th>
                <th className="py-2">Reading</th>
                <th className="py-2 text-right">Total Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-semibold text-slate-700">
              {examRecords.map((record, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 text-slate-400 font-mono text-[11px]">{record.id}</td>
                  <td className="py-3 text-slate-900">{record.date}</td>
                  <td className="py-3 text-red-500">{record.listening}</td>
                  <td className="py-3 text-amber-500">{record.structure}</td>
                  <td className="py-3 text-green-600">{record.reading}</td>
                  <td className="py-3 text-right text-slate-900 font-bold">{record.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button className="w-full mt-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 font-bold text-xs rounded-xl transition-all">
        View All Exam Records
      </button>
    </div>
  );
}