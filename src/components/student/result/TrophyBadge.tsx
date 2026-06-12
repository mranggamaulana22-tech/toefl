// src/components/student/result/TrophyBadge.tsx
'use client';

export default function TrophyBadge() {
  return (
    <div className="relative mb-4">
      <div className="w-16 h-16 rounded-2xl bg-[#e6f4ea] flex items-center justify-center text-2xl text-[#137333]">
        🏆
      </div>
      <span className="absolute -bottom-1 -right-1 bg-[#11b981] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold border-2 border-white">
        ✓
      </span>
    </div>
  );
}