import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f8fafc] text-black">
      <div className="absolute inset-x-0 top-0 h-96 bg-linear-to-b from-[#0a192f] via-[#10254b] to-transparent pointer-events-none"></div>
      <div className="absolute -top-24 -right-20 h-60 w-60 rounded-full bg-purple-500/15 blur-3xl pointer-events-none"></div>
      <div className="absolute top-56 -left-24 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none"></div>

      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/90 px-4 py-4 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0a192f] text-white shadow-md">
              ⚡
            </div>
            <div>
              <p className="text-sm font-black tracking-tight text-slate-900">TOEFL <span className="text-purple-600">CBT</span></p>
              <p className="text-xs font-medium text-slate-500">Computer Based Test and AI Learning Analytics</p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600">
            <Link href="/login" className="rounded-xl px-3 py-2 transition-colors hover:bg-slate-100 hover:text-slate-900">
              Login
            </Link>
            <Link href="/register" className="rounded-xl px-3 py-2 transition-colors hover:bg-slate-100 hover:text-slate-900">
              Register
            </Link>
            <Link href="/student/dashboard" className="rounded-xl bg-[#0a192f] px-4 py-2 text-white shadow-sm transition-colors hover:bg-slate-800">
              Open Dashboard
            </Link>
          </nav>
        </header>

        <section className="grid flex-1 items-center gap-6 py-8 lg:grid-cols-2 lg:py-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 shadow-sm">
              AI powered TOEFL practice
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-[3rem] lg:leading-tight">
              Satu tempat untuk simulasi ujian, analitik, dan progres belajar TOEFL.
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
              Desainnya diselaraskan dengan dashboard yang sudah ada: tampilan dark navy yang tegas, kartu ringkas yang bersih, dan fokus ke alur belajar yang cepat dipahami.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Status</p>
                <p className="mt-2 text-xl font-black text-slate-900">Ready</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Sections</p>
                <p className="mt-2 text-xl font-black text-slate-900">3</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Analytics</p>
                <p className="mt-2 text-xl font-black text-slate-900">AI</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-170 lg:max-w-none">
            <div className="absolute -inset-3 rounded-4xl bg-linear-to-br from-[#0a192f] via-[#13294f] to-[#1e293b] blur-xl opacity-20"></div>

            <div className="relative overflow-hidden rounded-4xl border border-slate-200 bg-white p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <p className="text-sm font-bold text-slate-900">TOEFL Analytics Preview</p>
                  <p className="text-xs text-slate-500">Dashboard snapshot</p>
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  Live
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#0a192f] p-4 text-white shadow-md sm:col-span-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Current Score</p>
                      <p className="mt-2 text-4xl font-black tracking-tight">520</p>
                      <p className="mt-2 text-xs text-slate-300 sm:text-sm">AI learning analytics after latest assessment.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-right">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target</p>
                      <p className="mt-1 text-xl font-black">600+</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Listening</p>
                  <div className="mt-3 h-2 rounded-full bg-slate-200">
                    <div className="h-2 w-[62%] rounded-full bg-red-500"></div>
                  </div>
                  <p className="mt-2.5 text-sm font-bold text-slate-800">Needs Focus</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Structure</p>
                  <div className="mt-3 h-2 rounded-full bg-slate-200">
                    <div className="h-2 w-[74%] rounded-full bg-amber-500"></div>
                  </div>
                  <p className="mt-2.5 text-sm font-bold text-slate-800">Approaching Target</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 sm:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Reading</p>
                  <div className="mt-3 h-2 rounded-full bg-slate-200">
                    <div className="h-2 w-[84%] rounded-full bg-emerald-500"></div>
                  </div>
                  <p className="mt-2.5 text-sm font-bold text-slate-800">On Track</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-3 pb-8 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-bold text-slate-900">Simulasi Ujian</p>
            <p className="mt-1.5 text-sm leading-6 text-slate-500">Alur ujian dibuat ringkas: masuk, kerjakan, lalu lihat hasil dan insight AI.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-bold text-slate-900">Analitik AI</p>
            <p className="mt-1.5 text-sm leading-6 text-slate-500">Tampilan skor, heatmap topik, dan rekomendasi belajar mengikuti pola dashboard yang sudah ada.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-bold text-slate-900">Manajemen Admin</p>
            <p className="mt-1.5 text-sm leading-6 text-slate-500">Bagian admin tetap clean dan modular setelah refactor komponen form dan tabel siswa.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
