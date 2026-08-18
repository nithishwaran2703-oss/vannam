'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  UserCog,
  Plus,
  ShieldCheck,
  Mail,
  Lock,
  Clock,
  UserCheck,
  X,
  AlertTriangle
} from 'lucide-react';
import { useAdminToast } from '../layout';

export default function UsersManager() {
  const { showToast } = useAdminToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'content_manager',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80'
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      setUsers(data.users || []);
    } catch {
      showToast('Failed to load administrator accounts', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create user');

      showToast('Admin user created successfully!');
      setIsModalOpen(false);
      setForm({
        name: '',
        email: '',
        password: '',
        role: 'content_manager',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80'
      });
      fetchUsers();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F2963] tracking-tight flex items-center gap-2">
            <UserCog className="w-6 h-6 text-[#00A8E8]" />
            <span>Admin Staff & Role-Based Access</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage administrative personnel, assign roles (Super Admin, Content Manager, Enquiry Manager), and track logins.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0F2963] hover:bg-[#1D4ED8] text-white text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#F59E0B]" />
          <span>Add Admin User</span>
        </button>
      </div>

      {/* Role Descriptions Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span className="font-extrabold text-xs text-[#0F2963]">Super Admin</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Full root access to all website settings, user accounts, audit logs, and content publishing.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00A8E8]"></span>
            <span className="font-extrabold text-xs text-[#0F2963]">Content Manager</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Can edit homepage, programs, teachers, gallery photos, testimonials, and notice banners.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="font-extrabold text-xs text-[#0F2963]">Enquiry Manager</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Dedicated access to incoming parent contact inquiries and admissions pipeline management.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-[#0F2963]">Registered Administrators</h3>
          <span className="text-xs text-slate-400 font-medium">Total: {users.length}</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">Loading administrators...</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {users.map((u) => (
              <div key={u.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0F2963] text-white font-extrabold text-sm flex items-center justify-center ring-2 ring-[#CBD8F6]">
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-[#0F2963] flex items-center gap-2">
                      <span>{u.name}</span>
                      <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                        u.role === 'super_admin'
                          ? 'bg-rose-100 text-rose-700'
                          : u.role === 'content_manager'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {u.role.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">{u.email}</div>
                  </div>
                </div>

                <div className="text-left sm:text-right text-[11px] text-slate-400">
                  <div className="flex items-center sm:justify-end gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Last Login: {u.lastLogin ? new Date(u.lastLogin).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'Never logged in'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-[#0F2963]">Add Administrator</h3>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Shalini Sundaram"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@vannam.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-bold"
                >
                  <option value="content_manager">Content Manager (CMS & Media)</option>
                  <option value="enquiry_manager">Enquiry Manager (Leads & Admissions)</option>
                  <option value="super_admin">Super Admin (Full Root Control)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0F2963] text-white text-xs font-bold shadow-md"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
