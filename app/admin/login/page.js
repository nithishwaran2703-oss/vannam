'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldCheck, ArrowRight, Sparkles, UserCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@vannam.edu');
  const [password, setPassword] = useState('Admin@Vannam2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const quickRoles = [
    { label: 'Super Admin', email: 'admin@vannam.edu', pass: 'Admin@Vannam2026', role: 'Full Control' },
    { label: 'Content Manager', email: 'content@vannam.edu', pass: 'Content@Vannam2026', role: 'CMS & Media' },
    { label: 'Enquiry Manager', email: 'admissions@vannam.edu', pass: 'Admissions@Vannam2026', role: 'Leads & Admissions' }
  ];

  const handleLogin = async (e) => {
    e?.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Store in localStorage for instant client hydration
      if (typeof window !== 'undefined') {
        localStorage.setItem('vannam_admin_user', JSON.stringify(data.user));
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1B44] via-[#0F2963] to-[#081330] text-white flex flex-col justify-center items-center p-4 sm:p-6 selection:bg-[#00A8E8] selection:text-white">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00A8E8]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-2.5 mb-4 ring-4 ring-white/5">
            <Image
              src="/logo.png"
              alt="Vannam Preschool Logo"
              width={52}
              height={52}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
            Vannam Control Center
          </h1>
          <p className="text-sm text-[#CBD8F6]/80 mt-1 font-medium">
            Centralized Remote Control & Management Hub
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          {error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs font-semibold flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#CBD8F6] mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vannam.edu"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8E8] focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#CBD8F6]">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8E8] focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm text-[#0F2963] bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] hover:from-[#FBBF24] hover:to-[#F59E0B] shadow-lg shadow-amber-500/20 active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#0F2963] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate & Enter Control Center</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* 1-Click Role Switcher Demo Bar */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/70 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                Demo Credentials (1-Click Fill)
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {quickRoles.map((r, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setEmail(r.email);
                    setPassword(r.pass);
                  }}
                  className={`text-left p-2.5 rounded-xl border transition flex items-center justify-between text-xs ${
                    email === r.email
                      ? 'bg-white/15 border-[#00A8E8] text-white shadow-sm'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <UserCheck className={`w-3.5 h-3.5 ${email === r.email ? 'text-[#00A8E8]' : 'text-white/40'}`} />
                    <span className="font-bold">{r.label}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 font-mono text-[#CBD8F6]">
                    {r.role}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Public Site Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-[#CBD8F6]/80 hover:text-white transition inline-flex items-center gap-1.5"
          >
            ← Return to Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
