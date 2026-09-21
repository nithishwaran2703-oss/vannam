'use client';

import React, { useState, useEffect } from 'react';
import {
  UserCog,
  Plus,
  ShieldCheck,
  Mail,
  Lock,
  Clock,
  UserCheck,
  X,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  AlertTriangle,
  GraduationCap,
  Users as UsersIcon,
  CheckCircle2,
  Key
} from 'lucide-react';
import { useAdminToast } from '../layout';

export default function UsersManager() {
  const { showToast } = useAdminToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('staff'); // 'staff' | 'parents'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ADMIN',
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

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setSelectedUser(null);
    setForm({
      name: '',
      email: '',
      password: '',
      role: activeTab === 'parents' ? 'PARENT' : 'ADMIN',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setIsEditMode(true);
    setSelectedUser(user);
    setForm({
      name: user.name || '',
      email: user.email || '',
      password: user.password || '',
      role: user.role || 'ADMIN',
      avatar: user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode && selectedUser) {
        // Update user
        const res = await fetch('/api/admin/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: selectedUser.id,
            name: form.name,
            email: form.email,
            password: form.password,
            role: form.role,
            avatar: form.avatar
          })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update user');

        showToast(`Credentials for ${form.name} updated successfully in Neon DB & store!`);
      } else {
        // Create user
        const res = await fetch('/api/admin/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to create user');

        showToast(`New ${form.role} account created successfully!`);
      }

      setIsModalOpen(false);
      fetchUsers();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteUser = async (user) => {
    if (user.role === 'ADMIN' && users.filter(u => u.role === 'ADMIN' || u.role === 'super_admin').length <= 1) {
      showToast('Cannot delete the last administrator account!', 'error');
      return;
    }

    if (!confirm(`Are you sure you want to delete credentials for "${user.name}" (${user.email})? This will immediately remove access from Neon DB.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users?id=${user.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete user');

      showToast(`Account for ${user.name} removed successfully.`);
      fetchUsers();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const staffUsers = users.filter(u => u.role !== 'PARENT');
  const parentUsers = users.filter(u => u.role === 'PARENT');
  const displayedUsers = activeTab === 'staff' ? staffUsers : parentUsers;

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F2963] tracking-tight flex items-center gap-2">
            <UserCog className="w-6 h-6 text-[#00A8E8]" />
            <span>Accounts & Credentials Manager</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage emails, passwords, and access PINs for Admins, Teachers, and Parents with instant Neon PostgreSQL synchronization.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-[#0F2963] hover:bg-[#1D4ED8] text-white text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#F59E0B]" />
          <span>{activeTab === 'staff' ? 'Add Staff / Admin' : 'Add Parent Account'}</span>
        </button>
      </div>

      {/* Tabs Switcher: Staff vs Parents */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('staff')}
          className={`px-4 py-2.5 text-xs font-extrabold flex items-center gap-2 border-b-2 transition ${
            activeTab === 'staff'
              ? 'border-[#0F2963] text-[#0F2963]'
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#00A8E8]" />
          <span>School Staff & Admins ({staffUsers.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('parents')}
          className={`px-4 py-2.5 text-xs font-extrabold flex items-center gap-2 border-b-2 transition ${
            activeTab === 'parents'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          <UsersIcon className="w-4 h-4 text-emerald-600" />
          <span>Parent Portal Accounts ({parentUsers.length})</span>
        </button>
      </div>

      {/* Role Explanations Banner */}
      {activeTab === 'staff' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span className="font-extrabold text-xs text-[#0F2963]">Super Admin (ADMIN)</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Full control over all settings, accounts, students, parent logins, and Neon database backups.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-extrabold text-xs text-[#0F2963]">Educator / Teacher (TEACHER)</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Access to `/teacher/dashboard` for classroom attendance, daily activities, and homework.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00A8E8]"></span>
              <span className="font-extrabold text-xs text-[#0F2963]">Content Manager</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Can update the live homepage, announcements ribbon, gallery photos, and testimonials.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
          <Key className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold">Parent Portal Authentication:</span>
            <p className="text-[11px] text-emerald-700 leading-relaxed">
              Parents sign in at <code className="bg-white/80 px-1.5 py-0.5 rounded font-mono text-emerald-900 font-bold">/portal</code> using their Email Address or Student ID with their 4-digit PIN (default <span className="font-bold font-mono">2026</span>). You can edit their email, change their PIN, or delete their access below.
            </p>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-[#0F2963]">
            {activeTab === 'staff' ? 'Registered Staff & Admins' : 'Registered Parent Accounts'}
          </h3>
          <span className="text-xs text-slate-400 font-medium">Count: {displayedUsers.length}</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">Loading user credentials...</div>
        ) : displayedUsers.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">No accounts registered in this category.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {displayedUsers.map((u) => {
              const isPasswordVisible = visiblePasswords[u.id];
              return (
                <div key={u.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0F2963] text-white font-extrabold text-sm flex items-center justify-center ring-2 ring-[#CBD8F6]">
                      {u.name ? u.name.charAt(0) : 'U'}
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-[#0F2963] flex items-center gap-2">
                        <span>{u.name}</span>
                        <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                          u.role === 'ADMIN' || u.role === 'super_admin'
                            ? 'bg-rose-100 text-rose-700'
                            : u.role === 'TEACHER'
                            ? 'bg-emerald-100 text-emerald-700'
                            : u.role === 'PARENT'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {u.role.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5 flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{u.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Password / PIN & Actions */}
                  <div className="flex items-center gap-3 sm:gap-4 self-end sm:self-center">
                    
                    {/* Password Box */}
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-700">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-bold min-w-[70px]">
                        {isPasswordVisible ? (u.password || '2026') : '••••••••'}
                      </span>
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(u.id)}
                        className="p-1 hover:text-[#00A8E8] text-slate-400 transition"
                        title={isPasswordVisible ? 'Hide Password' : 'Show Password'}
                      >
                        {isPasswordVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Edit Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(u)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-[#E8EEFB] text-slate-600 hover:text-[#0F2963] transition flex items-center gap-1 text-xs font-bold"
                      title="Edit Email, Password, or Name"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-[#00A8E8]" />
                      <span className="hidden md:inline">Edit</span>
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteUser(u)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"
                      title="Delete User Credentials"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-[#0F2963]">
                {isEditMode ? `Edit Credentials: ${selectedUser?.name}` : 'Create New Credentials'}
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Dr. Gayathri / Teacher Sarah / Parent Name"
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
                  placeholder="e.g. admin@vannam.edu or parent@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {form.role === 'PARENT' ? 'Access PIN / Password *' : 'Account Password *'}
                </label>
                <input
                  type="text"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder={form.role === 'PARENT' ? 'e.g. 2026' : 'e.g. Admin@Vannam2026'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none font-mono font-bold"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  {form.role === 'PARENT'
                    ? 'Default PIN for parents is 2026. You can customize it anytime.'
                    : 'Use a strong password for staff and administrator accounts.'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Role Type</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white font-bold"
                >
                  <option value="ADMIN">Super Admin (Full Root Control)</option>
                  <option value="TEACHER">Teacher / Educator (Teacher Dashboard)</option>
                  <option value="PARENT">Parent (Parent Portal Access)</option>
                  <option value="content_manager">Content Manager (CMS & Media)</option>
                  <option value="enquiry_manager">Enquiry Manager (Admissions & Leads)</option>
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
                  className="px-5 py-2.5 rounded-xl bg-[#0F2963] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-md transition"
                >
                  {isEditMode ? 'Save Changes' : 'Create Credential'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
