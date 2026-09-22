'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Lock, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  Eye, 
  EyeOff,
  KeyRound,
  CheckCircle2,
  RefreshCw,
  ArrowLeft,
  Check,
  Phone
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  
  // Normal Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginSuccessNotice, setLoginSuccessNotice] = useState('');

  // Forgot Password / Phone OTP State
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1 = Request Code, 2 = Enter Code & Reset, 3 = Success
  const [forgotPhone, setForgotPhone] = useState('');
  const [resolvedEmail, setResolvedEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  const handleLogin = async (e) => {
    e?.preventDefault();
    setError('');
    setLoginSuccessNotice('');
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

  // Step 1: Send OTP to Super Admin Mobile
  const handleSendOtp = async (e) => {
    e?.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    setForgotLoading(true);

    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send-otp', phone: forgotPhone })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch confirmation code.');
      }

      setForgotSuccess(data.message || `Verification code sent to ${forgotPhone}`);
      if (data.otpCode) {
        setOtpCode(data.otpCode);
      }
      setForgotStep(2);
    } catch (err) {
      setForgotError(err.message || 'Could not send verification code. Please check the phone number.');
    } finally {
      setForgotLoading(false);
    }
  };

  // Step 2: Verify OTP and Reset Password
  const handleVerifyAndReset = async (e) => {
    e?.preventDefault();
    setForgotError('');

    if (newPassword !== confirmPassword) {
      setForgotError('New passwords do not match. Please retype carefully.');
      return;
    }

    if (newPassword.length < 6) {
      setForgotError('Password must be at least 6 characters long.');
      return;
    }

    setForgotLoading(true);

    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify-and-reset',
          phone: forgotPhone,
          otp,
          newPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Verification or password reset failed.');
      }

      const emailToUse = data.userEmail || 'admin@vannam.edu';
      setResolvedEmail(emailToUse);
      setEmail(emailToUse);
      setPassword(newPassword);
      setForgotStep(3);
    } catch (err) {
      setForgotError(err.message || 'Invalid verification code or reset failed.');
    } finally {
      setForgotLoading(false);
    }
  };

  const returnToLogin = () => {
    setIsForgotMode(false);
    setForgotStep(1);
    setForgotError('');
    setForgotSuccess('');
    setForgotPhone('');
    setOtp('');
    setOtpCode('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1B44] via-[#0F2963] to-[#081330] text-white flex flex-col justify-center items-center p-4 sm:p-6 selection:bg-[#00A8E8] selection:text-white">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00A8E8]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl mb-4">
            <img 
              src="/logo.png" 
              alt="Vannam Preschool Logo" 
              className="h-10 w-auto object-contain"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
            Vannam Control Center
          </h1>
          <p className="text-sm text-[#CBD8F6]/80 mt-1 font-medium">
            Centralized Remote Control & Management Hub
          </p>
        </div>

        {/* MAIN CARD: Toggle between Login & Forgot Password Mode */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-300">
          
          {/* ========================================================= */}
          {/* MODE A: NORMAL LOGIN FORM                                  */}
          {/* ========================================================= */}
          {!isForgotMode && (
            <>
              {error && (
                <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{error}</span>
                </div>
              )}

              {loginSuccessNotice && (
                <div className="mb-6 p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{loginSuccessNotice}</span>
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
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotMode(true);
                        setForgotStep(1);
                        setForgotPhone('');
                        setForgotError('');
                        setForgotSuccess('');
                        setOtp('');
                        setNewPassword('');
                        setConfirmPassword('');
                      }}
                      className="text-xs font-bold text-[#F59E0B] hover:text-[#FBBF24] transition hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <KeyRound className="w-3 h-3" />
                      <span>Forgot Password?</span>
                    </button>
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
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition cursor-pointer"
                      aria-label="Toggle password visibility"
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
            </>
          )}

          {/* ========================================================= */}
          {/* MODE B: FORGOT PASSWORD / MOBILE VERIFICATION FLOW         */}
          {/* ========================================================= */}
          {isForgotMode && (
            <div className="animate-in fade-in duration-200">
              {/* Recovery Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#00A8E8]/20 border border-[#00A8E8]/40 flex items-center justify-center text-[#00A8E8]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Reset Super Admin Password</h2>
                    <p className="text-[11px] text-[#CBD8F6]/80">Phone Verification & Security OTP</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={returnToLogin}
                  className="text-xs text-[#CBD8F6] hover:text-white flex items-center gap-1 transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              </div>

              {forgotError && (
                <div className="mb-4 p-3 rounded-2xl bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs font-semibold flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{forgotError}</span>
                </div>
              )}

              {/* STEP 1: Enter Phone Number */}
              {forgotStep === 1 && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <p className="text-xs text-[#CBD8F6]/90 leading-relaxed">
                    Enter your registered Super Admin mobile phone number. We will send a secure 6-digit confirmation code directly to your phone.
                  </p>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#CBD8F6] mb-1.5">
                      Super Admin Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#00A8E8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        value={forgotPhone}
                        onChange={(e) => setForgotPhone(e.target.value)}
                        placeholder="e.g. 98401 23456 or +91 78100 87310"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8E8] transition font-mono"
                      />
                    </div>
                    <p className="text-[10px] text-white/50 mt-1">
                      Enter your 10-digit mobile number or standard country format (+91).
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading || !forgotPhone}
                    className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm text-[#0F2963] bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] hover:from-[#FBBF24] hover:to-[#F59E0B] shadow-lg shadow-amber-500/20 active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {forgotLoading ? (
                      <div className="w-5 h-5 border-2 border-[#0F2963] border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Send 6-Digit Verification Code</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={returnToLogin}
                      className="text-xs text-[#CBD8F6]/80 hover:text-white transition cursor-pointer"
                    >
                      Remembered your password? Return to login
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: Enter OTP & Set New Password */}
              {forgotStep === 2 && (
                <form onSubmit={handleVerifyAndReset} className="space-y-4">
                  {/* Notice of dispatched OTP with Auto Fill button */}
                  <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-100 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
                      <span>Code Sent to: {forgotPhone}</span>
                    </div>
                    <p className="text-[11px] text-amber-200/80 leading-snug">
                      Please enter the 6-digit verification code below (Valid for 10 minutes).
                    </p>

                    {otpCode && (
                      <div className="pt-2 flex items-center justify-between border-t border-amber-400/20 mt-1">
                        <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                          <span>Verification Code:</span>
                          <strong className="font-mono text-white text-xs tracking-widest bg-black/40 px-2 py-0.5 rounded border border-amber-400/30">
                            {otpCode}
                          </strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => setOtp(otpCode)}
                          className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 hover:text-white border border-amber-400/40 transition cursor-pointer"
                        >
                          Auto Fill Code
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 6-Digit OTP Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#CBD8F6] mb-1.5">
                      6-Digit Verification Code (OTP)
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="123456"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-base font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition"
                      />
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#CBD8F6] mb-1.5">
                      New Super Admin Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        required
                        minLength={6}
                        className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition cursor-pointer"
                        aria-label="Toggle password visibility"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#CBD8F6] mb-1.5">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Retype new password"
                        required
                        minLength={6}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={forgotLoading}
                      className="px-3 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                      title="Resend code"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Resend</span>
                    </button>

                    <button
                      type="submit"
                      disabled={forgotLoading || !otp || !newPassword}
                      className="flex-1 py-3 px-4 rounded-xl font-extrabold text-sm text-[#0F2963] bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] hover:from-[#FBBF24] hover:to-[#F59E0B] shadow-lg shadow-amber-500/20 active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {forgotLoading ? (
                        <div className="w-5 h-5 border-2 border-[#0F2963] border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Verify OTP & Save Password</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: Password Successfully Reset Confirmation */}
              {forgotStep === 3 && (
                <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400/40 text-emerald-300 flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-white">
                      Password Reset Successfully!
                    </h3>
                    <p className="text-xs text-[#CBD8F6]/80 max-w-xs mx-auto leading-relaxed">
                      Your Super Admin credentials have been securely updated. You can now log in to the Vannam Control Center.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-left space-y-1 font-mono text-xs">
                    <div className="text-[#CBD8F6]/60 text-[10px] uppercase font-sans font-bold">Updated Account:</div>
                    <div className="text-white"><span className="text-[#CBD8F6]/60 font-sans">Email:</span> {resolvedEmail || 'admin@vannam.edu'}</div>
                    <div className="text-emerald-300"><span className="text-[#CBD8F6]/60 font-sans">Status:</span> New Password Active</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      returnToLogin();
                      setLoginSuccessNotice('Password reset successfully! Authenticate below.');
                    }}
                    className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm text-[#0F2963] bg-gradient-to-r from-[#10B981] to-[#34D399] hover:from-[#34D399] hover:to-[#10B981] shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-[#CBD8F6]/60">
          Vannam Montessori Preschool & Daycare • Secure Remote Administration
        </div>

      </div>
    </div>
  );
}
