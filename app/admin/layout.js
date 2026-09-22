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

  // Helper to show toasts and broadcast live sync to public website ("Nuclear Option")
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);

    if (type === 'success') {
      import('@/lib/sync').then((mod) => mod.broadcastAdminUpdate()).catch(() => {});
    }
  };

  // Check auth session with instant optimistic localStorage hydration
  useEffect(() => {
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    // Instantly hydrate user from localStorage so the admin UI renders immediately without blocking spinner!
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('vannam_admin_user');
      if (cached) {
        try {
          setUser(JSON.parse(cached));
          setLoading(false);
        } catch {}
      }
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
          const stored = typeof window !== 'undefined' ? localStorage.getItem('vannam_admin_user') : null;
          if (!stored) {
            router.push('/admin/login');
          }
        }
      } catch {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('vannam_admin_user') : null;
        if (!stored) {
          router.push('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [pathname, router]);

  // Fetch live unread counts for badges (deferred slightly so it doesn't block initial page render)
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

    const initialTimer = setTimeout(fetchBadgeCounts, 1200);
    const interval = setInterval(fetchBadgeCounts, 30000);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [pathname]);

  const userRole = (user?.role || 'ADMIN').toUpperCase();
  const isSuperAdmin = userRole === 'ADMIN' || userRole === 'SUPER_ADMIN';
  const isTeacher = userRole === 'TEACHER';
  const isContentManager = userRole === 'CONTENT_MANAGER';
  const isEnquiryManager = userRole === 'ENQUIRY_MANAGER';

  // Route protection by role (must be called before any early return)
  useEffect(() => {
    if (!user || pathname === '/admin/login') return;

    if (isSuperAdmin) return; // Full access to entire web

    if (isTeacher) {
      const allowedTeacherRoutes = ['/admin/activities', '/admin/attendance', '/admin/homework', '/admin/classes', '/admin/students', '/admin', '/admin/users'];
      if (!allowedTeacherRoutes.includes(pathname)) {
        showToast('Teacher access: Restricted to student activities & classroom operations', 'info');
        router.push('/admin/activities');
      }
    } else if (isContentManager) {
      const allowedContentRoutes = ['/admin/announcements', '/admin/teachers', '/admin/programs', '/admin/facilities', '/admin/gallery', '/admin/testimonials', '/admin/about', '/admin/homepage', '/admin', '/admin/users'];
      if (!allowedContentRoutes.includes(pathname)) {
        showToast('Content access: Restricted to Website Live CMS', 'info');
        router.push('/admin/announcements');
      }
    } else if (isEnquiryManager) {
      const allowedEnquiryRoutes = ['/admin/admissions', '/admin/enquiries', '/admin', '/admin/users'];
      if (!allowedEnquiryRoutes.includes(pathname)) {
        showToast('Enquiry Manager access: Restricted to Admissions', 'info');
        router.push('/admin/admissions');
      }
    }
  }, [user, pathname, router, isSuperAdmin, isTeacher, isContentManager, isEnquiryManager]);

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
      group: 'Parent Portal Hub',
      visible: isSuperAdmin || isTeacher,
      items: [
        { label: 'Student Activities', href: '/admin/activities', icon: Sparkles, visible: isSuperAdmin || isTeacher },
        { label: 'Daily Attendance', href: '/admin/attendance', icon: CheckCircle2, visible: isSuperAdmin || isTeacher },
        { label: 'Homework & Tasks', href: '/admin/homework', icon: FileCheck2, visible: isSuperAdmin || isTeacher },
        { label: 'Classrooms', href: '/admin/classes', icon: Users, visible: isSuperAdmin || isTeacher },
        { label: 'Students & Logins', href: '/admin/students', icon: GraduationCap, visible: isSuperAdmin || isTeacher }
      ]
    },
    {
      group: 'Website Live CMS',
      visible: isSuperAdmin || isContentManager,
      items: [
        { label: 'Announcements Ribbon', href: '/admin/announcements', icon: Megaphone, visible: isSuperAdmin || isContentManager },
        { label: 'Teachers & Faculty', href: '/admin/teachers', icon: UserCog, visible: isSuperAdmin || isContentManager },
        { label: 'Programs & Fees', href: '/admin/programs', icon: GraduationCap, visible: isSuperAdmin || isContentManager },
        { label: 'Campus Facilities', href: '/admin/facilities', icon: Sparkles, visible: isSuperAdmin || isContentManager },
        { label: 'Photo Gallery', href: '/admin/gallery', icon: ImageIcon, visible: isSuperAdmin || isContentManager },
        { label: 'Parent Reviews', href: '/admin/testimonials', icon: MessageSquareQuote, visible: isSuperAdmin || isContentManager }
      ]
    },
    {
      group: 'System & Admissions',
      visible: true,
      items: [
        {
          label: 'Admissions Queue',
          href: '/admin/admissions',
          icon: FileCheck2,
          visible: isSuperAdmin || isEnquiryManager,
          badge: (badges.newAdmissions || 0) + (badges.newEnquiries || 0) > 0 ? (badges.newAdmissions || 0) + (badges.newEnquiries || 0) : null,
          badgeColor: 'bg-amber-500 text-white'
        },
        { 
          label: 'Staff & Admin Accounts', 
          href: '/admin/users', 
          icon: UserCog, 
          visible: true,
          badge: !isSuperAdmin ? 'View Only' : null,
          badgeColor: 'bg-slate-700 text-slate-300'
        },
        { label: 'School Settings', href: '/admin/settings', icon: Settings, visible: isSuperAdmin }
      ]
    }
  ];

  const renderNavLinks = () => (
    <div className="space-y-6">
      {navSections
        .filter((section) => section.visible !== false)
        .map((section, idx) => {
          const visibleItems = section.items.filter((item) => item.visible !== false);
          if (visibleItems.length === 0) return null;

          return (
            <div key={idx}>
              <div className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-[#CBD8F6]/50 mb-2">
                {section.group}
              </div>
              <nav className="space-y-1">
                {visibleItems.map((item) => {
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
          );
        })}
    </div>
  );

  const renderSidebarFooter = () => (
    <div className="p-4 border-t border-white/10 bg-[#0A1B44]/60 shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F59E0B] to-[#FBBF24] text-[#0F2963] font-black text-xs flex items-center justify-center shadow-md shrink-0">
            {user?.name ? user.name.charAt(0) : 'A'}
          </div>
          <div className="text-left min-w-0">
            <div className="text-xs font-bold text-white truncate max-w-[110px]">
              {user?.name || 'Administrator'}
            </div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              Online
            </div>
          </div>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition shrink-0"
          title="Open Public Site in New Tab"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="h-screen flex overflow-hidden bg-[#F8FAFC] text-[#0F172A] antialiased">
        
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

        {/* Permanent Desktop Sidebar (lg and up) */}
        <aside className="hidden lg:flex lg:w-64 flex-col bg-[#0F2963] text-white shrink-0 h-full border-r border-slate-800">
          {/* Sidebar Top Header */}
          <div className="h-16 px-4 border-b border-white/10 flex items-center gap-3 shrink-0">
            <Link href="/admin" className="flex items-center gap-2.5 min-w-0 group">
              <div className="h-10 px-2.5 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-xs border border-white/20 group-hover:scale-102 transition-transform">
                <img src="/logo.png" alt="Vannam Preschool" className="h-7 w-auto object-contain" />
              </div>
              <div className="min-w-0 flex flex-col justify-center">
                <div className="font-extrabold text-xs tracking-tight text-white truncate group-hover:text-[#F59E0B] transition-colors">Vannam Admin</div>
                <div className="text-[9.5px] font-bold text-[#F59E0B] uppercase tracking-wider">
                  Control Center
                </div>
              </div>
            </Link>
          </div>

          {/* Nav Menu Items */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
            {renderNavLinks()}
          </div>

          {/* Sidebar Bottom Footer User Tile */}
          {renderSidebarFooter()}
        </aside>

        {/* Mobile / Tablet Drawer Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
            />

            {/* Slide-out Drawer */}
            <aside className="relative w-72 max-w-[85vw] bg-[#0F2963] text-white flex flex-col h-full shadow-2xl z-50 animate-in slide-in-from-left duration-200">
              {/* Drawer Top Header with Close Button */}
              <div className="h-16 px-4 border-b border-white/10 flex items-center justify-between shrink-0">
                <Link href="/admin" className="flex items-center gap-2.5 min-w-0" onClick={() => setSidebarOpen(false)}>
                  <div className="h-9 px-2 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-xs">
                    <img src="/logo.png" alt="Vannam Preschool" className="h-6 w-auto object-contain" />
                  </div>
                  <div className="min-w-0 flex flex-col justify-center">
                    <div className="font-extrabold text-xs text-white truncate">Vannam Admin</div>
                    <div className="text-[9px] font-bold text-[#F59E0B] uppercase tracking-wider">
                      Control Center
                    </div>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Nav Items */}
              <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
                {renderNavLinks()}
              </div>

              {/* Drawer Footer */}
              {renderSidebarFooter()}
            </aside>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          {/* Top Header Bar */}
          <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs z-20">
            
            <div className="flex items-center gap-3 min-w-0">
              {/* Hamburger Button for Mobile / Tablet */}
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition shrink-0"
                aria-label="Open Sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Mobile Brand Logo */}
              <Link href="/admin" className="flex items-center lg:hidden shrink-0">
                <img src="/logo.png" alt="Vannam" className="h-7 w-auto object-contain" />
              </Link>

              {/* Clean Breadcrumb Path */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400 pl-2 sm:pl-3 border-l border-slate-200 min-w-0">
                <span className="hidden sm:inline">Admin</span>
                <ChevronRight className="w-3 h-3 text-slate-300 hidden sm:inline shrink-0" />
                <span className="font-bold text-slate-800 capitalize truncate max-w-[140px] sm:max-w-none">
                  {pathname.split('/')[2] || 'Dashboard'}
                </span>
              </div>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Parent Portal Link */}
              <Link
                href="/portal"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition border border-emerald-200"
                title="Open Parent Portal in New Tab"
              >
                <span>Parent Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
              </Link>

              {/* Live Website Preview Button */}
              <button
                type="button"
                onClick={() => setPreviewModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#0F2963] bg-[#E8EEFB] hover:bg-[#D4E2F9] transition border border-[#CBD8F6]"
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
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold text-[10px]">
                          {badges.newAdmissions} New
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Pill */}
              <div className="flex items-center gap-2 sm:gap-2.5 pl-2 sm:pl-3 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-[#0F2963] text-white flex items-center justify-center text-xs font-bold ring-2 ring-[#00A8E8]/30 shrink-0">
                  {user?.name ? user.name.charAt(0) : 'A'}
                </div>
                <div className="hidden xl:block text-left">
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
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Sign Out of Admin"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

            </div>
          </header>

          {/* Dynamic Page Content Wrapper */}
          <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>

        {/* Live Preview Modal Overlay */}
        {previewModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col">
            <div className="h-14 bg-slate-900 text-white px-4 sm:px-6 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0"></span>
                <span className="font-bold text-xs sm:text-sm truncate">Live Public Website Preview</span>
                <span className="hidden sm:inline text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md font-mono">
                  Target: /
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition flex items-center gap-1.5"
                >
                  <span className="hidden sm:inline">Open in Full Browser</span>
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
