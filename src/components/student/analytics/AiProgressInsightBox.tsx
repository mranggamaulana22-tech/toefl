// src/components/student/analytics/AiProgressInsightBox.tsx
'use client';

interface AiProgressInsightBoxProps {
  summary: string;
  confidence: number;
  predictedLabel: string;
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return '0%';
  const display = value <= 1 ? value * 100 : value;
  return `${Math.round(display)}%`;
}

export default function AiProgressInsightBox({ summary, confidence, predictedLabel }: AiProgressInsightBoxProps) {
  return (
    <div className="bg-[#effaf3] border border-green-200/60 rounded-2xl p-5 shadow-sm lg:col-span-1 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-green-800 font-bold text-xs uppercase tracking-wider">
          <span className="text-base">✨</span> AI Progress Insight
        </div>
        <p className="text-xs text-green-950/80 leading-relaxed font-medium">
          {summary}
        </p>

        <div className="bg-white border border-green-100/80 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Model Confidence</span>
            <div className="flex gap-1">
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="h-3 w-3 rounded-full bg-slate-200" />
            </div>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-slate-900">{formatPercent(confidence)}</span>
            <span className="text-[10px] font-bold text-slate-400 block">confidence</span>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-green-700/70 italic leading-relaxed pt-4 border-t border-green-200/40 mt-4">
        Profil prediksi saat ini: <strong>{predictedLabel || '-'}</strong>. Gunakan bagian rekomendasi untuk menentukan prioritas belajar berikutnya.
      </p>
    </div>
  );
}
