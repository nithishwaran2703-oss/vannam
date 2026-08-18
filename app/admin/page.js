'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  GraduationCap,
  Mail,
  FileCheck2,
  Image as ImageIcon,
  Megaphone,
  ArrowUpRight,
  Plus,
  Clock,
  Sparkles,
  TrendingUp,
  Globe,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useAdminToast } from './layout';

export default function AdminDashboard() {
  const { showToast } = useAdminToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    enquiries: [],
    admissions: [],
    programs: [],
    teachers: [],
    gallery: [],
    announcements: [],
    logs: [],
    stats: {}
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [enqRes, admRes, progRes, teachRes, galRes, annRes, logsRes] = await Promise.all([
        fetch('/api/admin/enquiries'),
        fetch('/api/admin/admissions'),
        fetch('/api/admin/programs'),
        fetch('/api/admin/teachers'),
        fetch('/api/admin/gallery'),
        fetch('/api/admin/announcements'),
        fetch('/api/admin/logs')
      ]);

      const [enq, adm, prog, teach, gal, ann, logs] = await Promise.all([
        enqRes.json(),
        admRes.json(),
        progRes.json(),
        teachRes.json(),
        galRes.json(),
        annRes.json(),
        logsRes.json()
      ]);

      setData({
        enquiries: enq.enquiries || [],
        enquiryStats: enq.stats || {},
        admissions: adm.admissions || [],
        admissionStats: adm.stats || {},
        programs: prog.programs || [],
        teachers: teach.teachers || [],
        gallery: gal.gallery || [],
        announcements: ann.announcements || [],
        logs: logs.logs || []
      });
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      showToast('Error loading dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleQuickStatusChange = async (enquiryId, newStatus) => {
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: enquiryId, status: newStatus })
      });
      if (res.ok) {
        showToast(`Enquiry marked as ${newStatus}`);
        fetchDashboardData();
      }
    } catch {
      showToast('Failed to update enquiry status', 'error');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-2xl w-1/3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-32 bg-slate-200 rounded-3xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-slate-200 rounded-3xl"></div>
          <div className="h-96 bg-slate-200 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  const kpis = [
    {
      label: 'New Enquiries',
      value: data.enquiryStats?.new || 0,
      subtext: `${data.enquiries.length} Total Received`,
      icon: Mail,
      color: 'from-rose-500 to-rose-600',
      href: '/admin/enquiries'
    },
    {
      label: 'Admissions In-Review',
      value: data.admissionStats?.under_review || data.admissionStats?.new || 0,
      subtext: `${data.admissions.length} Total Applications`,
      icon: FileCheck2,
      color: 'from-amber-500 to-amber-600',
      href: '/admin/admissions'
    },
    {
      label: 'Active Programs',
      value: data.programs.filter((p) => p.status === 'published').length,
      subtext: `${data.programs.length} Configured`,
      icon: GraduationCap,
      color: 'from-[#00A8E8] to-blue-600',
      href: '/admin/programs'
    },
    {
      label: 'Certified Faculty',
      value: data.teachers.filter((t) => t.active).length,
      subtext: 'Montessori Certified',
      icon: Users,
      color: 'from-emerald-500 to-teal-600',
      href: '/admin/teachers'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome & System Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0F2963] to-[#0A1B44] p-6 sm:p-8 rounded-3xl text-white shadow-xl shadow-blue-950/10 relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#CBD8F6] text-xs font-semibold backdrop-blur-md mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>All Systems Live & Synchronized</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Vannam Remote Control Center
          </h1>
          <p className="text-sm text-[#CBD8F6]/80 font-medium max-w-xl">
            Live overview of admissions, incoming parent inquiries, faculty roster, and public website content.
          </p>
        </div>

        {/* Quick Preview Action */}
        <div className="relative z-10 flex flex-wrap gap-2.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-2xl bg-white text-[#0F2963] font-bold text-xs hover:bg-[#CBD8F6] transition shadow-md flex items-center gap-2"
          >
            <Globe className="w-4 h-4 text-[#00A8E8]" />
            <span>Open Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Ambient glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#00A8E8]/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={i}
              href={kpi.href}
              className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${kpi.color} text-white flex items-center justify-center shadow-md shadow-slate-200 group-hover:scale-110 transition duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>

              <div className="space-y-0.5">
                <div className="text-3xl font-black text-[#0F2963]">{kpi.value}</div>
                <div className="text-xs font-bold text-slate-700">{kpi.label}</div>
                <div className="text-[11px] font-semibold text-slate-400">{kpi.subtext}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <h2 className="text-sm font-extrabold text-[#0F2963] uppercase tracking-wider">
              Fast Remote Actions
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">1-Click Content Launchers</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/admin/programs"
            className="p-3.5 rounded-2xl bg-[#F0F4FC] hover:bg-[#E8EEFB] text-[#0F2963] transition flex flex-col items-center justify-center text-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#00A8E8] shadow-xs group-hover:scale-110 transition">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold">Add Program</span>
          </Link>

          <Link
            href="/admin/teachers"
            className="p-3.5 rounded-2xl bg-[#F0F4FC] hover:bg-[#E8EEFB] text-[#0F2963] transition flex flex-col items-center justify-center text-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-emerald-600 shadow-xs group-hover:scale-110 transition">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold">Add Faculty</span>
          </Link>

          <Link
            href="/admin/announcements"
            className="p-3.5 rounded-2xl bg-[#F0F4FC] hover:bg-[#E8EEFB] text-[#0F2963] transition flex flex-col items-center justify-center text-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-amber-500 shadow-xs group-hover:scale-110 transition">
              <Megaphone className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold">Post Notice</span>
          </Link>

          <Link
            href="/admin/gallery"
            className="p-3.5 rounded-2xl bg-[#F0F4FC] hover:bg-[#E8EEFB] text-[#0F2963] transition flex flex-col items-center justify-center text-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-purple-600 shadow-xs group-hover:scale-110 transition">
              <ImageIcon className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold">Media Asset</span>
          </Link>

          <Link
            href="/admin/homepage"
            className="p-3.5 rounded-2xl bg-[#F0F4FC] hover:bg-[#E8EEFB] text-[#0F2963] transition flex flex-col items-center justify-center text-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#0F2963] shadow-xs group-hover:scale-110 transition">
              <Globe className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold">Edit Hero</span>
          </Link>

          <Link
            href="/admin/enquiries"
            className="p-3.5 rounded-2xl bg-[#F0F4FC] hover:bg-[#E8EEFB] text-[#0F2963] transition flex flex-col items-center justify-center text-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-rose-500 shadow-xs group-hover:scale-110 transition">
              <Mail className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold">All Inquiries</span>
          </Link>
        </div>
      </div>

      {/* Two-Column Core Layout: Recent Inquiries & Live Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Inquiries (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-[#0F2963] text-base">
                  Recent Parent Enquiries
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Direct submissions from the public website contact forms
                </p>
              </div>
              <Link
                href="/admin/enquiries"
                className="text-xs font-bold text-[#00A8E8] hover:text-[#0F2963] transition flex items-center gap-1"
              >
                <span>View All ({data.enquiries.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {data.enquiries.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs">
                No inquiries received yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {data.enquiries.slice(0, 4).map((enq) => (
                  <div
                    key={enq.id}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 -mx-2 px-2 rounded-2xl transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-[#0F2963]">
                          {enq.parentName}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#E8EEFB] text-[#0F2963]">
                          {enq.program}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold capitalize ${
                            enq.status === 'new'
                              ? 'bg-rose-100 text-rose-700'
                              : enq.status === 'contacted'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        &quot;{enq.message || 'Tour inquiry for toddler admission'}&quot;
                      </p>
                      <div className="text-[10px] text-slate-400 flex items-center gap-3">
                        <span>📞 {enq.phone}</span>
                        <span>✉️ {enq.email || 'No email'}</span>
                      </div>
                    </div>

                    {/* 1-Click Status Quick Actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {enq.status === 'new' && (
                        <button
                          type="button"
                          onClick={() => handleQuickStatusChange(enq.id, 'contacted')}
                          className="px-2.5 py-1 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-bold transition flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Mark Contacted</span>
                        </button>
                      )}
                      <Link
                        href={`/admin/enquiries?id=${enq.id}`}
                        className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition"
                      >
                        Inspect
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Notice Board Status */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-[#0F2963] text-base">
                  Active Notice Banners (On Public Site)
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  These banners are currently visible to visitors on the public homepage
                </p>
              </div>
              <Link
                href="/admin/announcements"
                className="text-xs font-bold text-[#00A8E8] hover:text-[#0F2963] transition flex items-center gap-1"
              >
                <span>Manage ({data.announcements.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.announcements
                .filter((a) => a.active)
                .slice(0, 2)
                .map((ann) => (
                  <div
                    key={ann.id}
                    className="p-4 rounded-2xl bg-gradient-to-br from-[#0F2963] to-[#1D4ED8] text-white space-y-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20">
                        {ann.type}
                      </span>
                      <span className="text-[10px] text-[#CBD8F6]">Active Banner</span>
                    </div>
                    <div className="font-extrabold text-xs leading-snug">{ann.title}</div>
                    <p className="text-[11px] text-[#CBD8F6]/80 line-clamp-2">{ann.message}</p>
                  </div>
                ))}
            </div>
          </div>

        </div>

        {/* Right Column: Audit Log Stream & Quick Stats (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Website Health Overview Tile */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-extrabold text-[#0F2963] text-base flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>CMS Health & Sync</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
                <span className="text-slate-600 font-medium">Published Programs</span>
                <span className="font-extrabold text-[#0F2963]">{data.programs.length} Active</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
                <span className="text-slate-600 font-medium">Faculty Profiles</span>
                <span className="font-extrabold text-[#0F2963]">{data.teachers.length} Active</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
                <span className="text-slate-600 font-medium">Media Library</span>
                <span className="font-extrabold text-[#0F2963]">{data.gallery.length} Images</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
                <span className="text-slate-600 font-medium">Live Storage Engine</span>
                <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  JSON Store
                </span>
              </div>
            </div>
          </div>

          {/* Audit Activity Feed */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-[#0F2963] text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00A8E8]" />
                <span>Audit Activity</span>
              </h3>
              <Link href="/admin/logs" className="text-[11px] font-bold text-slate-400 hover:text-slate-700">
                Full Log
              </Link>
            </div>

            <div className="space-y-3">
              {(data.logs || []).slice(0, 5).map((log) => (
                <div key={log.id} className="text-xs space-y-1 pb-2 border-b border-slate-50 last:border-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0F2963]">{log.action}</span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-1">{log.details}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
