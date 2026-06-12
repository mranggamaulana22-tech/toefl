// src/components/student/result/AiInsightBox.tsx
'use client';

export default function AiInsightBox() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200/60 rounded-xl p-4 mt-6 flex gap-3 text-left">
      <span className="text-base text-slate-700 mt-0.5">✨</span>
      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
        Your performance data has been analyzed by our AI learning model. Open the Analytics Dashboard to discover your strengths, weaknesses, and personalized learning recommendations.
      </p>
    </div>
  );
}