'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  Palette,
  Phone,
  Share2,
  Search,
  Compass,
  RotateCcw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useAdminToast } from '../layout';

export default function SettingsManager() {
  const { showToast } = useAdminToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('branding');

  const [settings, setSettings] = useState({
    branding: {
      siteName: '',
      tagline: '',
      logoUrl: '',
      primaryColor: '#0F2963',
      secondaryColor: '#F59E0B',
      accentColor: '#00A8E8',
      supportPhone: '',
      supportEmail: ''
    },
    contact: {
      phone: '',
      email: '',
      address: '',
      mapsUrl: '',
      whatsapp: '',
      hours: ''
    },
    social: {
      instagram: '',
      facebook: '',
      youtube: '',
      linkedin: ''
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: '',
      ogImage: ''
    },
    navigation: [],
    footer: {
      copyright: '',
      description: ''
    }
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
      }
    } catch {
      showToast('Failed to load settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e?.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings })
      });

      if (!res.ok) throw new Error('Failed to save settings');
      showToast('Website settings saved and applied to live site!');
    } catch {
      showToast('Error saving settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-400 text-xs">Loading website settings...</div>;
  }

  const tabs = [
    { id: 'branding', label: 'Branding & Theme', icon: Palette },
    { id: 'contact', label: 'Contact Info', icon: Phone },
    { id: 'social', label: 'Social Profiles', icon: Share2 },
    { id: 'seo', label: 'SEO & Meta Tags', icon: Search },
    { id: 'navigation', label: 'Navigation & Menu', icon: Compass }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F2963] tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#00A8E8]" />
            <span>Centralized Website Settings</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage global school branding, contact information, social links, SEO tags, and navigation menus.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchSettings}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-[#0F2963] hover:bg-[#1D4ED8] text-white text-xs font-black shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Save className="w-4 h-4 text-[#F59E0B]" />
                <span>Save All Settings</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center gap-2 ${
                isActive
                  ? 'bg-[#0F2963] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#00A8E8]' : 'text-slate-400'}`} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* 1. Branding & Theme Tab */}
        {activeTab === 'branding' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-sm font-extrabold text-[#0F2963] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>Identity & Color Tokens</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">School / Site Name</label>
                <input
                  type="text"
                  value={settings.branding?.siteName || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      branding: { ...settings.branding, siteName: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Signature Motto Tagline</label>
                <input
                  type="text"
                  value={settings.branding?.tagline || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      branding: { ...settings.branding, tagline: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-xs font-bold text-[#0F2963]">Primary Deep Navy</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.branding?.primaryColor || '#0F2963'}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        branding: { ...settings.branding, primaryColor: e.target.value }
                      })
                    }
                    className="w-9 h-9 rounded-xl border-0 cursor-pointer"
                  />
                  <span className="text-xs font-mono font-bold text-slate-700">
                    {settings.branding?.primaryColor}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-xs font-bold text-[#0F2963]">Secondary Warm Orange</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.branding?.secondaryColor || '#F59E0B'}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        branding: { ...settings.branding, secondaryColor: e.target.value }
                      })
                    }
                    className="w-9 h-9 rounded-xl border-0 cursor-pointer"
                  />
                  <span className="text-xs font-mono font-bold text-slate-700">
                    {settings.branding?.secondaryColor}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-xs font-bold text-[#0F2963]">Vibrant Cyan Accent</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.branding?.accentColor || '#00A8E8'}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        branding: { ...settings.branding, accentColor: e.target.value }
                      })
                    }
                    className="w-9 h-9 rounded-xl border-0 cursor-pointer"
                  />
                  <span className="text-xs font-mono font-bold text-slate-700">
                    {settings.branding?.accentColor}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Contact Info Tab */}
        {activeTab === 'contact' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-[#0F2963] uppercase tracking-wider">
              School Contact & Campus Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Admissions Hotline(s)</label>
                <input
                  type="text"
                  value={settings.contact?.phone || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, phone: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Email Address</label>
                <input
                  type="email"
                  value={settings.contact?.email || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, email: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Campus Physical Address</label>
              <textarea
                rows={2}
                value={settings.contact?.address || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, address: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Fast Contact</label>
                <input
                  type="text"
                  value={settings.contact?.whatsapp || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, whatsapp: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">School Working Hours</label>
                <input
                  type="text"
                  value={settings.contact?.hours || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, hours: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. Social Profiles Tab */}
        {activeTab === 'social' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-[#0F2963] uppercase tracking-wider">
              Official Social Handles & Channels
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Instagram Profile URL</label>
                <input
                  type="url"
                  value={settings.social?.instagram || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      social: { ...settings.social, instagram: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Facebook Page URL</label>
                <input
                  type="url"
                  value={settings.social?.facebook || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      social: { ...settings.social, facebook: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">YouTube Channel URL</label>
                <input
                  type="url"
                  value={settings.social?.youtube || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      social: { ...settings.social, youtube: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn Page URL</label>
                <input
                  type="url"
                  value={settings.social?.linkedin || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      social: { ...settings.social, linkedin: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. SEO & Meta Tags Tab */}
        {activeTab === 'seo' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-[#0F2963] uppercase tracking-wider">
              Search Engine Optimization (SEO)
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Meta Browser Title</label>
              <input
                type="text"
                value={settings.seo?.metaTitle || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo, metaTitle: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Meta Description</label>
              <textarea
                rows={3}
                value={settings.seo?.metaDescription || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo, metaDescription: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Keywords</label>
              <input
                type="text"
                value={settings.seo?.keywords || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo, keywords: e.target.value }
                  })
                }
                placeholder="preschool, montessori, admission, chennai"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          </div>
        )}

        {/* 5. Navigation Menu Tab */}
        {activeTab === 'navigation' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-[#0F2963] uppercase tracking-wider">
              Public Website Navigation Links
            </h2>

            <div className="space-y-3">
              {(settings.navigation || []).map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => {
                        const newNav = [...settings.navigation];
                        newNav[idx].label = e.target.value;
                        setSettings({ ...settings, navigation: newNav });
                      }}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-bold"
                    />
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => {
                        const newNav = [...settings.navigation];
                        newNav[idx].href = e.target.value;
                        setSettings({ ...settings, navigation: newNav });
                      }}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const newNav = [...settings.navigation];
                        newNav[idx].active = !newNav[idx].active;
                        setSettings({ ...settings, navigation: newNav });
                      }}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        item.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {item.active ? 'Visible' : 'Hidden'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
