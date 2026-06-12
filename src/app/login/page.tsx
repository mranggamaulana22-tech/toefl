// src/app/login/page.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return alert('Mohon isi Email dan Password!');
    
    console.log('Proses Login ke API:', { email, password });
    // Simulasi jika berhasil login langsung lempar ke halaman Dashboard Student
    router.push('/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 text-black">
      <div className="w-full max-w-xl space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-[#112240]"
        >
          <span aria-hidden="true">←</span>
          Kembali ke halaman utama
        </Link>

        <div className="bg-white rounded-2xl shadow-xl w-full overflow-hidden border border-gray-100">
        <div className="bg-[#112240] text-white p-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">TOEFL Analytics</h1>
          <p className="text-xs text-gray-300 mt-2 font-medium">
            Sign in to continue your TOEFL CBT practice and analytics.
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@piksi.ac.id"
              className="w-full p-2.5 border border-gray-200 rounded-md bg-gray-50/50 text-sm focus:outline-none focus:border-[#112240] transition-colors"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-gray-700 block">Password</label>
              <a href="#" className="text-xs font-semibold text-gray-600 hover:text-[#112240] hover:underline">
                Lupa Password?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 border border-gray-200 rounded-md bg-gray-50/50 text-sm focus:outline-none focus:border-[#112240] transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#0a192f] hover:bg-[#112240] text-white text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all mt-6 shadow-md"
          >
            Masuk Sekarang
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>

          <p className="text-xs text-center text-gray-500 font-medium pt-3 border-t border-gray-100">
            Belum punya akun ujian?{' '}
            <Link href="/register" className="font-bold text-gray-800 hover:underline">
              Daftar Gratis
            </Link>
          </p>
        </form>
        </div>
      </div>

    </div>
  );
}