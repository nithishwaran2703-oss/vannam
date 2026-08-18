'use client';

import React, { useState, useEffect } from 'react';
import { Save, Info, Sparkles, Heart, Shield, Award, RotateCcw } from 'lucide-react';
import { useAdminToast } from '../layout';

export default function AboutCMS() {
  const { showToast } = useAdminToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    mission: '',
    vision: '',
    values: []
  });

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/content?section=about');
      const data = await res.json();
      if (data.data) {
        setForm(data.data);
      }
    } catch {
      showToast('Failed to load About page content', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'about', data: form })
      });

      if (!res.ok) throw new Error('Save failed');
      showToast('About page & Core Values published to live site!');
    } catch {
      showToast('Failed to save about content', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading About Page Content...</div>;
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F2963] tracking-tight flex items-center gap-2">
            <Info className="w-6 h-6 text-[#00A8E8]" />
            <span>About Us & Philosophy CMS</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage school story, institutional mission, long-term vision, and core 7-Shade values.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchAboutData}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0F2963] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#0F2963] text-white text-xs font-black shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Save className="w-4 h-4 text-[#F59E0B]" />
                <span>Save & Publish</span>
              </>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Story & Headings */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h2 className="text-sm font-extrabold text-[#0F2963] uppercase tracking-wider">
            School Heritage & Story
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Section Title *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Nurturing Little Minds Since 2018"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Motto Tagline</label>
              <textarea
                rows={2}
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder="A modern child-first sanctuary..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <h2 className="text-xs font-extrabold text-[#0F2963] uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>School Mission Statement</span>
            </h2>
            <textarea
              rows={4}
              value={form.mission}
              onChange={(e) => setForm({ ...form, mission: e.target.value })}
              placeholder="Our mission is to..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
            />
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <h2 className="text-xs font-extrabold text-[#0F2963] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#00A8E8]" />
              <span>School Vision Statement</span>
            </h2>
            <textarea
              rows={4}
              value={form.vision}
              onChange={(e) => setForm({ ...form, vision: e.target.value })}
              placeholder="Our vision is to..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h2 className="text-sm font-extrabold text-[#0F2963] uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>4 Core Foundational Values</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(form.values || []).map((val, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400">Value #{idx + 1} Title</label>
                  <input
                    type="text"
                    value={val.title}
                    onChange={(e) => {
                      const newVals = [...form.values];
                      newVals[idx].title = e.target.value;
                      setForm({ ...form, values: newVals });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-[#0F2963] bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400">Description</label>
                  <textarea
                    rows={2}
                    value={val.desc}
                    onChange={(e) => {
                      const newVals = [...form.values];
                      newVals[idx].desc = e.target.value;
                      setForm({ ...form, values: newVals });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </form>
    </div>
  );
}
