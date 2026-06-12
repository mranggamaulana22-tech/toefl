'use client';

type QuestionHeaderProps = {
  onCreate: () => void;
};

export default function QuestionHeader({ onCreate }: QuestionHeaderProps) {
  return (
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">TOEFL Question Bank</h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Kelola seluruh bank soal ujian simulasi Listening, Structure, dan Reading.
        </p>
      </div>
      <button
        onClick={onCreate}
        className="bg-[#0a192f] hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
      >
        ➕ Tambah Soal Baru
      </button>
    </div>
  );
}