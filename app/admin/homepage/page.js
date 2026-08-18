'use client';

import React, { useState, useEffect } from 'react';
import { Save, Eye, Sparkles, CheckCircle2, RotateCcw, Globe, ArrowRight } from 'lucide-react';
import { useAdminToast } from '../layout';

export default function HomepageCMS() {
  const { showToast } = useAdminToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    heroBadge: '',
    heroTitle: '',
    heroSubtitle: '',
    heroHighlight: '',
    stats: [
      { label: '', value: '' },
      { label: '', value: '' },
      { label: '', value: '' },
      { label: '', value: '' }
    ],
    primaryCta: { text: '', link: '' },
    secondaryCta: { text: '', link: '' }
  });

  const fetchHomepageData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/content?section=homepage');
      const data = await res.json();
      if (data.data) {
        setForm(data.data);
      }
    } catch {
      showToast('Failed to load homepage content', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomepageData();
  }, []);

  const handleSave = async (e) => {
    e?.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'homepage', data: form })
      });

      if (!res.ok) throw new Error('Save failed');

      showToast('Homepage content published to live website!');
    } catch {
      showToast('Failed to save homepage content', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading Homepage Content Editor...</div>;
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F2963] tracking-tight flex items-center gap-2">
            <Globe className="w-6 h-6 text-[#00A8E8]" />
            <span>Homepage & Hero Section Editor</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage the hero banner, headlines, primary call-to-actions, and key statistical counters.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchHomepageData}
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
                <span>Publish to Live Site</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Content Editor Form (7 cols) */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          
          {/* Main Hero Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-[#0F2963] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>Hero Headlines & Taglines</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hero Top Badge Text
                </label>
                <input
                  type="text"
                  value={form.heroBadge || ''}
                  onChange={(e) => setForm({ ...form, heroBadge: e.target.value })}
                  placeholder="e.g. Admissions Open 2026–27"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Main Headline (H1 Title)
                </label>
                <textarea
                  rows={2}
                  value={form.heroTitle || ''}
                  onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
                  placeholder="Where Curiosity Meets Joyful Montessori Excellence"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hero Subtitle / Description
                </label>
                <textarea
                  rows={3}
                  value={form.heroSubtitle || ''}
                  onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
                  placeholder="Welcome to Vannam World Preschool..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Key Highlight Pill
                </label>
                <input
                  type="text"
                  value={form.heroHighlight || ''}
                  onChange={(e) => setForm({ ...form, heroHighlight: e.target.value })}
                  placeholder="e.g. 7-Shade Developmental Play"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Call to Actions (CTAs) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-[#0F2963] uppercase tracking-wider">
              Hero Call-to-Action Buttons
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-extrabold text-[#0F2963]">Primary CTA (Button 1)</span>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={form.primaryCta?.text || ''}
                    onChange={(e) => setForm({ ...form, primaryCta: { ...form.primaryCta, text: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Link Target</label>
                  <input
                    type="text"
                    value={form.primaryCta?.link || ''}
                    onChange={(e) => setForm({ ...form, primaryCta: { ...form.primaryCta, link: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                  />
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-extrabold text-[#0F2963]">Secondary CTA (Button 2)</span>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={form.secondaryCta?.text || ''}
                    onChange={(e) => setForm({ ...form, secondaryCta: { ...form.secondaryCta, text: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Link Target</label>
                  <input
                    type="text"
                    value={form.secondaryCta?.link || ''}
                    onChange={(e) => setForm({ ...form, secondaryCta: { ...form.secondaryCta, link: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Key Metric Stats Counter */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-[#0F2963] uppercase tracking-wider">
              Featured Stats Counter
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(form.stats || []).map((st, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">Stat Value</label>
                    <input
                      type="text"
                      value={st.value || ''}
                      onChange={(e) => {
                        const newStats = [...form.stats];
                        newStats[idx].value = e.target.value;
                        setForm({ ...form, stats: newStats });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white text-[#0F2963]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">Stat Label</label>
                    <input
                      type="text"
                      value={st.label || ''}
                      onChange={(e) => {
                        const newStats = [...form.stats];
                        newStats[idx].label = e.target.value;
                        setForm({ ...form, stats: newStats });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </form>

        {/* Right: Live Visual Preview Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-24">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-black uppercase tracking-wider text-[#0F2963] flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#00A8E8]" />
                  Live Hero Preview
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  Instant Simulation
                </span>
              </div>

              {/* Preview Box Container */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#FFFDF7] to-[#F3F7FD] border border-[#CBD8F6] space-y-4 text-center">
                
                {/* Badge */}
                {form.heroBadge && (
                  <span className="inline-block px-3 py-1 rounded-full bg-[#E8EEFB] text-[#0F2963] font-black text-[10px] uppercase tracking-wider border border-[#CBD8F6]">
                    {form.heroBadge}
                  </span>
                )}

                {/* Title */}
                <h3 className="text-lg font-black text-[#0F2963] leading-tight">
                  {form.heroTitle || 'Your Headline Here'}
                </h3>

                {/* Subtitle */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {form.heroSubtitle || 'Your subtitle here...'}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <span className="px-4 py-2 rounded-full text-xs font-bold bg-[#0F2963] text-white shadow-sm flex items-center gap-1">
                    {form.primaryCta?.text || 'Primary CTA'}
                    <ArrowRight className="w-3 h-3 text-[#F59E0B]" />
                  </span>
                  <span className="px-4 py-2 rounded-full text-xs font-bold bg-[#F59E0B] text-[#0F2963] shadow-sm">
                    {form.secondaryCta?.text || 'Secondary CTA'}
                  </span>
                </div>

                {/* Stats Grid Preview */}
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-200">
                  {(form.stats || []).map((st, i) => (
                    <div key={i} className="p-2 rounded-xl bg-white shadow-2xs">
                      <div className="font-black text-sm text-[#0F2963]">{st.value || '0'}</div>
                      <div className="text-[10px] text-slate-500">{st.label || 'Metric'}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
