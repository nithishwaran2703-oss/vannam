'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  GraduationCap,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function TeacherLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('teacher@vannam.edu');
  const [password, setPassword] = useState('Teacher@Vannam2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, portal: 'teacher' })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('vannam_teacher_user', JSON.stringify(data.user));
      }

      router.push('/teacher/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B19] text-white flex flex-col justify-between relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00A8E8]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Bar */}
      <header className="p-6 flex items-center justify-between max-w-7xl mx-auto w-full relative z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-white/10 p-2 flex items-center justify-center border border-white/10 backdrop-blur-md">
            <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
          </div>
          <div>
            <div className="text-base font-black tracking-tight text-white group-hover:text-cyan-300 transition">
              Vannam World Preschool
            </div>
            <div className="text-[11px] font-semibold text-slate-400">
              Educator & Faculty Workspace
            </div>
          </div>
        </Link>

        <Link
          href="/admin/login"
          className="text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-xl border border-white/10 hover:bg-white/5 transition"
        >
          Administrator Login →
        </Link>
      </header>

      {/* Main Login Form Container */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00A8E8] to-[#0F2963] text-white flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Teacher Workspace
            </h1>
            <p className="text-xs text-slate-400">
              Sign in to manage classroom attendance, log daily child activities, and post homework.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Teacher Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="teacher@vannam.edu"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#00A8E8] to-[#0F2963] hover:from-cyan-400 hover:to-blue-700 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In to Classroom Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-white/10 text-center">
            <div className="text-[11px] text-slate-400 font-medium">
              Demo Credentials: <span className="text-cyan-300 font-mono">teacher@vannam.edu</span> / <span className="text-amber-300 font-mono">Teacher@Vannam2026</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-slate-500 relative z-10">
        © {new Date().getFullYear()} Vannam World Preschool. Teacher & Staff Portal.
      </footer>
    </div>
  );
}
