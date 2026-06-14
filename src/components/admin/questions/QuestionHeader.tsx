"use client";

type QuestionHeaderProps = {
  onCreate: () => void;
};

export default function QuestionHeader({ onCreate }: QuestionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">
          TOEFL Question Bank
        </h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Kelola seluruh bank soal ujian simulasi Listening, Structure, dan Reading.
        </p>
      </div>
      <button
        onClick={onCreate}
        className="bg-[#0a192f] hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5"
      >
        ➕ Tambah Soal Baru
      </button>
    </div>
  );
}
