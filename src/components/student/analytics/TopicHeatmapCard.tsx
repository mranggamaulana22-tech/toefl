// src/components/student/analytics/TopicHeatmapCard.tsx
'use client';

import type { MLTopicMasteryItem } from '@/types/ml-result';

interface TopicHeatmapCardProps {
  topicMastery: MLTopicMasteryItem[];
  onRetake: () => void;
}

function titleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function masteryClass(label: string) {
  const normalized = label.toUpperCase();

  if (normalized === 'STRONG') return 'bg-green-50 border-green-200 text-green-700';
  if (normalized === 'MOD') return 'bg-amber-50 border-amber-200 text-amber-700';
  return 'bg-red-50 border-red-200 text-red-700';
}

export default function TopicHeatmapCard({ topicMastery, onRetake }: TopicHeatmapCardProps) {
  const grouped = topicMastery.reduce<Record<string, MLTopicMasteryItem[]>>((acc, item) => {
    const section = item.section || 'general';
    acc[section] = [...(acc[section] ?? []), item];
    return acc;
  }, {});

  const sectionNames = ['listening', 'structure', 'reading'].filter((section) => grouped[section]?.length);
  const hasData = topicMastery.length > 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm lg:col-span-2 flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <h3 className="font-bold text-slate-900 text-sm">Topic Mastery Heatmap</h3>
          <div className="flex items-center gap-3 text-[9px] font-bold tracking-wider uppercase text-slate-400">
            <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-400" /> Weak</div>
            <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" /> Mod</div>
            <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-green-400" /> Strong</div>
          </div>
        </div>

        {hasData ? (
          <div className="space-y-5 mt-5">
            {sectionNames.map((section) => (
              <div key={section} className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">{titleCase(section)}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {grouped[section].map((item, index) => (
                    <div key={`${section}-${item.topic}-${item.subTopic}-${index}`} className={`border rounded-xl p-3 text-xs font-bold ${masteryClass(item.label)}`}>
                      <div className="flex justify-between gap-3">
                        <span>{item.topic}{item.subTopic ? ` - ${item.subTopic}` : ''}</span>
                        <span>{Math.round(item.accuracy)}%</span>
                      </div>
                      <div className="text-[10px] opacity-70 mt-1">
                        Benar {item.correctCount}/{item.totalQuestion} • Salah {item.wrongCount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
            <div className="text-3xl mb-2">📊</div>
            <h4 className="text-sm font-bold text-slate-700">Topic mastery belum tersedia</h4>
            <p className="text-xs text-slate-400 mt-1">Jalankan pipeline ML sampai data topic_mastery tersimpan.</p>
          </div>
        )}
      </div>

      <button
        onClick={onRetake}
        className="w-full mt-6 py-3 bg-[#0a192f] hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
      >
        🔄 Retake Test / Start Exam
      </button>
    </div>
  );
}
