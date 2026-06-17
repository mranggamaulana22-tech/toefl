// src/components/student/analytics/AiRecommendationCard.tsx
'use client';

import type { MLRecommendationItem } from '@/types/ml-result';

interface AiRecommendationCardProps {
  recommendations: MLRecommendationItem[];
}

export default function AiRecommendationCard({ recommendations }: AiRecommendationCardProps) {
  const topRecommendations = recommendations.slice(0, 3);
  const topics = recommendations
    .map((item) => item.subTopic || item.topic)
    .filter(Boolean)
    .slice(0, 5);

  return (
    <div className="bg-[#0a192f] text-white border border-slate-800 rounded-2xl p-5 shadow-xl lg:col-span-1 flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-sm tracking-tight border-b border-slate-800 pb-3">AI Recommendation</h3>

        {topRecommendations.length > 0 ? (
          <div className="space-y-3.5 mt-4">
            {topRecommendations.map((item, index) => (
              <div key={`${item.section}-${item.topic}-${index}`} className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex items-start gap-3">
                <span className="bg-slate-800 border border-slate-700 font-mono text-[10px] font-bold text-slate-400 px-1.5 py-0.5 rounded mt-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-medium">{item.recommendation}</p>
                  <div className="mt-2 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                    {item.priority || 'MEDIUM'} • {item.section || 'general'} • {Math.round(item.accuracy)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 text-center">
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
              Rekomendasi belum tersedia. Pastikan hasil ML sudah menyimpan field recommendations.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/60">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Priority Review Topics</span>
        <div className="flex flex-wrap gap-1.5">
          {topics.length > 0 ? (
            topics.map((topic, index) => (
              <span key={`${topic}-${index}`} className="bg-slate-900 border border-slate-800 text-slate-300 text-[9px] font-bold px-2 py-1 rounded">
                {topic}
              </span>
            ))
          ) : (
            <span className="bg-slate-900 border border-slate-800 text-slate-500 text-[9px] font-bold px-2 py-1 rounded">No Topic</span>
          )}
        </div>
      </div>
    </div>
  );
}
