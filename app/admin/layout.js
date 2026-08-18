'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  Home,
  Info,
  GraduationCap,
  Sparkles,
  Users,
  MessageSquareQuote,
  Image as ImageIcon,
  Megaphone,
  Mail,
  FileCheck2,
  Settings,
  ShieldAlert,
  UserCog,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info as InfoIcon,
  ChevronRight
} from 'lucide-react';

// Toast Context for all Admin sub-pages
const ToastContext = createContext({
  showToast: () => {}
});

export const useAdminToast = () => useContext(ToastContext);

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [badges, setBadges] = useState({ newEnquiries: 0, newAdmissions: 0 });
  const [toasts, setToasts] = useState([]);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  // Helper to show toasts
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Check auth session
  useEffect(() => {
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    const checkSession = async () => {
      try {
        const res = await fetch('/api/admin/auth');
        const data = await res.json();

        if (res.ok && data.authenticated) {
          setUser(data.user);
          if (typeof window !== 'undefined') {
            localStorage.setItem('vannam_admin_user', JSON.stringify(data.user));
          }
        } else {
          // Fallback to local storage
          const stored = typeof window !== 'undefined' ? localStorage.getItem('vannam_admin_user') : null;
          if (stored) {
            setUser(JSON.parse(stored));
          } else {
            router.push('/admin/login');
          }
        }
      } catch {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [pathname, router]);

  // Fetch live unread counts for badges
  useEffect(() => {
    if (pathname === '/admin/login') return;

    const fetchBadgeCounts = async () => {
      try {
        const [enqRes, admRes] = await Promise.all([
          fetch('/api/admin/enquiries'),
          fetch('/api/admin/admissions')
        ]);
        if (enqRes.ok) {
          const enqData = await enqRes.json();
          setBadges((prev) => ({ ...prev, newEnquiries: enqData.stats?.new || 0 }));
        }
        if (admRes.ok) {
          const admData = await admRes.json();
          setBadges((prev) => ({ ...prev, newAdmissions: admData.stats?.new || 0 }));
        }
      } catch (err) {
        console.error("Error updating badges:", err);
      }
    };

    fetchBadgeCounts();
    const interval = setInterval(fetchBadgeCounts, 30000);
    return () => clearInterval(interval);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('vannam_admin_user');
      }
      router.push('/admin/login');
    } catch {
      router.push('/admin/login');
    }
  };

  // If on the login page, render bare without the admin shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1B44] flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-[#00A8E8] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-semibold tracking-wide text-[#CBD8F6]">
          Loading Vannam Control Center...
        </p>
      </div>
    );
  }

  const navSections = [
    {
      group: 'Overview',
      items: [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard }
      ]
    },
    {
      group: 'Website Content',
      items: [
        { label: 'Homepage & Hero', href: '/admin/homepage', icon: Home },
        { label: 'About & Values', href: '/admin/about', icon: Info },
        { label: 'Programs & Fees', href: '/admin/programs', icon: GraduationCap },
        { label: 'Facilities', href: '/admin/facilities', icon: Sparkles },
        { label: 'Teachers / Faculty', href: '/admin/teachers', icon: Users },
        { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
        { label: 'Gallery & Media', href: '/admin/gallery', icon: ImageIcon },
        { label: 'Announcements', href: '/admin/announcements', icon: Megaphone }
      ]
    },
    {
      group: 'Leads & Admissions',
      items: [
        {
          label: 'Contact Enquiries',
          href: '/admin/enquiries',
          icon: Mail,
          badge: badges.newEnquiries > 0 ? badges.newEnquiries : null,
          badgeColor: 'bg-rose-500 text-white'
        },
        {
          label: 'Admissions Pipeline',
          href: '/admin/admissions',
          icon: FileCheck2,
          badge: badges.newAdmissions > 0 ? badges.newAdmissions : null,
          badgeColor: 'bg-amber-500 text-white'
        }
      ]
    },
    {
      group: 'System & Settings',
      items: [
        { label: 'Website Settings', href: '/admin/settings', icon: Settings },
        { label: 'Activity Logs', href: '/admin/logs', icon: ShieldAlert },
        { label: 'Admin Users', href: '/admin/users', icon: UserCog, restricted: user?.role !== 'super_admin' }
      ]
    }
  ];

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col antialiased">
        
        {/* Top Floating Toast Notification Stack */}
        <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`pointer-events-auto p-4 rounded-2xl shadow-xl border backdrop-blur-xl flex items-start gap-3 transform transition-all duration-300 animate-in slide-in-from-top-2 ${
                toast.type === 'success'
                  ? 'bg-emerald-900/90 text-white border-emerald-500/30'
                  : toast.type === 'error'
                  ? 'bg-rose-900/90 text-white border-rose-500/30'
                  : 'bg-[#0F2963]/95 text-white border-white/20'
              }`}
            >
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
              {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
              {toast.type === 'info' && <InfoIcon className="w-5 h-5 text-[#00A8E8] shrink-0 mt-0.5" />}
              <div className="text-xs font-medium leading-relaxed">{toast.message}</div>
            </div>
          ))}
        </div>

        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shadow-2xs">
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
              aria-label="Toggle Sidebar"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo in Header (Mobile/Tablet) */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F2963] p-1 flex items-center justify-center">
                <Image src="/logo.png" alt="Logo" width={24} height={24} className="object-contain" />
              </div>
              <span className="font-extrabold text-sm text-[#0F2963] tracking-tight hidden sm:inline-block">
                Vannam Control Center
              </span>
            </div>

            {/* Breadcrumb Path */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 pl-4 border-l border-slate-200">
              <span>Admin</span>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="font-semibold text-slate-700 capitalize">
                {pathname.split('/')[2] || 'Dashboard'}
              </span>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            
            {/* Live Website Preview Button */}
            <button
              type="button"
              onClick={() => setPreviewModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0F2963] bg-[#E8EEFB] hover:bg-[#D4E2F9] transition border border-[#CBD8F6]"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#00A8E8]" />
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {(badges.newEnquiries > 0 || badges.newAdmissions > 0) && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                )}
              </button>

              {/* Notifications Dropdown Popover */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-800">Recent Alerts</span>
                    <span className="text-[10px] text-slate-400">Real-Time Sync</span>
                  </div>
                  <div className="space-y-2">
                    <Link
                      href="/admin/enquiries"
                      onClick={() => setNotificationsOpen(false)}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#E8EEFB] transition flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#00A8E8]" />
                        <span className="font-semibold text-slate-700">New Contact Leads</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold text-[10px]">
                        {badges.newEnquiries} New
                      </span>
                    </Link>
                    <Link
                      href="/admin/admissions"
                      onClick={() => setNotificationsOpen(false)}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#E8EEFB] transition flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FileCheck2 className="w-4 h-4 text-amber-500" />
                        <span className="font-semibold text-slate-700">Admissions Queue</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                        {badges.newAdmissions} Pending
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#0F2963] text-white flex items-center justify-center text-xs font-bold ring-2 ring-[#00A8E8]/30">
                {user?.name ? user.name.charAt(0) : 'A'}
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-extrabold text-[#0F2963] leading-tight truncate max-w-[120px]">
                  {user?.name || 'Administrator'}
                </div>
                <div className="text-[10px] font-semibold text-slate-400 capitalize">
                  {user?.role?.replace('_', ' ') || 'Admin'}
                </div>
              </div>

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition ml-1"
                title="Sign Out of Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>
        </header>

        {/* Main Body Area (Sidebar + Page Content) */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Sidebar Navigation */}
          <aside
            className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0F2963] text-white flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 pt-16 lg:pt-0 ${
              sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
            }`}
          >
            {/* Sidebar Top Header */}
            <div className="p-5 border-b border-white/10 hidden lg:flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 p-1.5 flex items-center justify-center ring-2 ring-white/10">
                <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
              </div>
              <div>
                <div className="font-extrabold text-sm tracking-tight text-white">Vannam Preschool</div>
                <div className="text-[10px] font-semibold text-[#CBD8F6]/70 uppercase tracking-wider">
                  Control Center
                </div>
              </div>
            </div>

            {/* Nav Menu Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
              {navSections.map((section, idx) => (
                <div key={idx}>
                  <div className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-[#CBD8F6]/50 mb-2">
                    {section.group}
                  </div>
                  <nav className="space-y-1">
                    {section.items
                      .filter((item) => !item.restricted)
                      .map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition group ${
                              isActive
                                ? 'bg-white/15 text-white shadow-sm ring-1 ring-white/20 font-bold'
                                : 'text-[#CBD8F6]/80 hover:bg-white/8 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon
                                className={`w-4 h-4 transition ${
                                  isActive ? 'text-[#00A8E8]' : 'text-[#CBD8F6]/60 group-hover:text-white'
                                }`}
                              />
                              <span>{item.label}</span>
                            </div>

                            {item.badge && (
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  item.badgeColor || 'bg-[#00A8E8] text-white'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                  </nav>
                </div>
              ))}
            </div>

            {/* Sidebar Bottom Footer User Tile */}
            <div className="p-4 border-t border-white/10 bg-[#0A1B44]/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F59E0B] to-[#FBBF24] text-[#0F2963] font-black text-xs flex items-center justify-center shadow-md">
                    {user?.name ? user.name.charAt(0) : 'A'}
                  </div>
                  <div className="text-left overflow-hidden">
                    <div className="text-xs font-bold text-white truncate max-w-[110px]">
                      {user?.name || 'Administrator'}
                    </div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Online
                    </div>
                  </div>
                </div>

                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                  title="Open Public Site in New Tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </aside>

          {/* Sidebar Mobile Backdrop */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-30 lg:hidden"
            ></div>
          )}

          {/* Dynamic Page Content Wrapper */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>

        {/* Live Preview Modal Overlay */}
        {previewModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col">
            <div className="h-14 bg-slate-900 text-white px-6 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="font-bold text-sm">Live Public Website Preview</span>
                <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md font-mono">
                  Target: /
                </span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition flex items-center gap-1.5"
                >
                  <span>Open in Full Browser</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#00A8E8]" />
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-white">
              <iframe
                src="/"
                title="Live Website Preview"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        )}

      </div>
    </ToastContext.Provider>
  );
}
