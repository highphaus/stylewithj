'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Look } from '@/lib/looks-data';
import { useLooks } from '@/lib/use-looks';
import { useSiteData } from '@/lib/use-site-data';
import { ServiceItem, AudienceItem, JournalArticle, TestimonialItem } from '@/lib/site-data';

type TabType = 
  | 'lookbook' 
  | 'hero'
  | 'about'
  | 'meet'
  | 'services' 
  | 'audiences' 
  | 'articles' 
  | 'testimonials'
  | 'contact'
  | 'mailbox';

const EMPTY_LOOK: Omit<Look, 'id' | 'num'> = {
  title: '',
  category: '',
  tag: 'WESTERN',
  concept: '',
  fabric: '',
  story: '',
  occasion: '',
  image: '',
};

const EMPTY_SERVICE: Omit<ServiceItem, 'id' | 'num'> = {
  category: '',
  name: '',
  desc: '',
  image: '',
  summary: '',
  points: [],
};

const EMPTY_AUDIENCE: Omit<AudienceItem, 'id'> = {
  title: '',
  keyword: '',
  desc: '',
  image: '',
  slug: '',
};

const EMPTY_ARTICLE: Omit<JournalArticle, 'id' | 'num'> = {
  title: '',
  category: '',
  image: '',
  excerpt: '',
};

const EMPTY_TESTIMONIAL: Omit<TestimonialItem, 'id'> = {
  name: '',
  role: '',
  location: '',
  text: '',
  avatar: '',
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('lookbook');

  // Custom Hooks
  const { looks, addLook, updateLook, deleteLook } = useLooks();
  const { 
    hero, updateHero,
    about, updateAbout,
    meet, updateMeet,
    contact, updateContact,
    testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
    services, addService, updateService, deleteService,
    audiences, addAudience, updateAudience, deleteAudience,
    articles, addArticle, updateArticle, deleteArticle,
    resetAllSiteData
  } = useSiteData();

  // Mode states
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [resetModal, setResetModal] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form States for CRUD items
  const [lookForm, setLookForm] = useState<Omit<Look, 'id' | 'num'>>(EMPTY_LOOK);
  const [serviceForm, setServiceForm] = useState<Omit<ServiceItem, 'id' | 'num'>>(EMPTY_SERVICE);
  const [audienceForm, setAudienceForm] = useState<Omit<AudienceItem, 'id'>>(EMPTY_AUDIENCE);
  const [articleForm, setArticleForm] = useState<Omit<JournalArticle, 'id' | 'num'>>(EMPTY_ARTICLE);
  const [testimonialForm, setTestimonialForm] = useState<Omit<TestimonialItem, 'id'>>(EMPTY_TESTIMONIAL);

  // Section level forms
  const [tempHero, setTempHero] = useState(hero);
  const [tempAbout, setTempAbout] = useState(about);
  const [tempMeet, setTempMeet] = useState(meet);
  const [tempContact, setTempContact] = useState(contact);
  const [heroPreviewDevice, setHeroPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    const stored = sessionStorage.getItem('swj_admin');
    if (stored === 'true') setAuthed(true);
  }, []);

  useEffect(() => { setTempHero(hero); }, [hero]);
  useEffect(() => { setTempAbout(about); }, [about]);
  useEffect(() => { setTempMeet(meet); }, [meet]);
  useEffect(() => { setTempContact(contact); }, [contact]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const cleanPass = password.trim().toLowerCase();
    if (
      cleanPass === 'jennifer' || 
      cleanPass === 'jennifer2026' || 
      cleanPass === 'jennifer2024' || 
      cleanPass === 'jennifer123' || 
      cleanPass === 'stylewithj2024'
    ) {
      sessionStorage.setItem('swj_admin', 'true');
      setAuthed(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Try "jennifer2026"');
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('swj_admin');
    setAuthed(false);
    setPassword('');
  }

  function showToast() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  // ── LOGIN GATE ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] flex flex-col items-center justify-center p-6 select-none">
        <div className="w-full max-w-md bg-[#EFECE6] border border-black/15 p-8 sm:p-12 rounded-xs shadow-[0_20px_50px_rgba(0,0,0,0.06)] text-center flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-black/50 font-bold">
              ✦ ATELIER PORTAL
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1A1A]">
              Admin Management
            </h1>
          </div>

          <div className="w-12 h-px bg-black/20" />

          <p className="font-sans text-xs text-black/75 leading-relaxed font-light">
            This private administration portal is reserved for Jennifer to add, edit, and curate all text, images, and content across all website pages.
          </p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1.5 text-left">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">
                ENTER ADMIN PASSWORD
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="e.g. jennifer2026"
                  className="w-full pl-4 pr-11 py-3 border border-black/20 bg-white font-sans text-sm text-[#1A1A1A] placeholder-black/30 rounded-xs outline-none focus:border-black transition-colors"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-black/40 hover:text-black transition-colors"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.04 10.04 0 014.122-.971c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {authError && (
              <p className="text-[10px] font-mono text-red-600 tracking-[0.15em] text-left">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase font-mono font-semibold hover:bg-black transition-colors rounded-xs shadow-md"
            >
              Sign In to Management Portal →
            </button>
          </form>

          <div className="pt-4 border-t border-black/10 w-full flex items-center justify-between text-[9px] font-mono text-black/40">
            <span>Style with J Atelier</span>
            <Link href="/" className="hover:text-black transition-colors">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── ADD/EDIT FORM FOR LOOKBOOK ──
  if ((view === 'add' || view === 'edit') && activeTab === 'lookbook') {
    return (
      <FormWrapper title={view === 'add' ? 'Add New Lookbook Look' : 'Edit Lookbook Look'} onBack={() => setView('list')}>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (view === 'add') addLook(lookForm);
          else if (editingId) updateLook(editingId, lookForm);
          showToast();
          setView('list');
        }} className="flex flex-col gap-6">

          <ImageUploadField 
            image={lookForm.image} 
            onImageChange={(img) => setLookForm(p => ({ ...p, image: img }))} 
          />

          <FormField label="Look Title" value={lookForm.title} onChange={v => setLookForm(p => ({ ...p, title: v }))} required />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Category Name" value={lookForm.category} onChange={v => setLookForm(p => ({ ...p, category: v }))} placeholder="e.g. CONTEMPORARY WESTERN" required />
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Filter Tag</label>
              <select
                value={lookForm.tag}
                onChange={e => setLookForm(p => ({ ...p, tag: e.target.value }))}
                className="w-full px-4 py-2.5 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40"
              >
                <option>WESTERN</option>
                <option>EVENING</option>
                <option>RESORT</option>
                <option>BESPOKE</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Concept" value={lookForm.concept} onChange={v => setLookForm(p => ({ ...p, concept: v }))} placeholder="e.g. Monochrome Fluidity" required />
            <FormField label="Fabric & Drape" value={lookForm.fabric} onChange={v => setLookForm(p => ({ ...p, fabric: v }))} placeholder="e.g. Silk Crepe" required />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Story & Styling Notes *</label>
            <textarea
              value={lookForm.story}
              onChange={e => setLookForm(p => ({ ...p, story: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40 resize-none"
              required
            />
          </div>

          <FormField label="Occasion" value={lookForm.occasion} onChange={v => setLookForm(p => ({ ...p, occasion: v }))} placeholder="e.g. Workwear & Evening Dinners" required />

          <SubmitButtons isAdd={view === 'add'} onCancel={() => setView('list')} />
        </form>
      </FormWrapper>
    );
  }

  // ── ADD/EDIT FORM FOR SERVICES ──
  if ((view === 'add' || view === 'edit') && activeTab === 'services') {
    return (
      <FormWrapper title={view === 'add' ? 'Add New Service (What We Do)' : 'Edit Service'} onBack={() => setView('list')}>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (view === 'add') addService(serviceForm);
          else if (editingId) updateService(editingId, serviceForm);
          showToast();
          setView('list');
        }} className="flex flex-col gap-6">

          <ImageUploadField image={serviceForm.image} onImageChange={(img) => setServiceForm(p => ({ ...p, image: img }))} />

          <FormField label="Service Name" value={serviceForm.name} onChange={v => setServiceForm(p => ({ ...p, name: v }))} placeholder="e.g. Personal Styling" required />
          <FormField label="Category Badge" value={serviceForm.category} onChange={v => setServiceForm(p => ({ ...p, category: v }))} placeholder="e.g. Style Discovery" required />

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Brief Service Description (Card Overview) *</label>
            <textarea
              value={serviceForm.desc}
              onChange={e => setServiceForm(p => ({ ...p, desc: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40 resize-none"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Full In-Depth Summary (Dedicated Service Page)</label>
            <textarea
              value={serviceForm.summary || ''}
              onChange={e => setServiceForm(p => ({ ...p, summary: e.target.value }))}
              rows={3}
              placeholder="e.g. A comprehensive sartorial overhaul crafted for discerning clients seeking bespoke wardrobe harmony..."
              className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40 resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Key Offerings / Service Highlights (One item per line)</label>
            <textarea
              value={(serviceForm.points || []).join('\n')}
              onChange={e => setServiceForm(p => ({ ...p, points: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) }))}
              rows={4}
              placeholder="e.g.&#10;Wardrobe Auditing & Architectural Reorganization&#10;Personal Color Palette & Silhouette Profiling&#10;Seasonal Capsule Curation & Lookbook Generation"
              className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40 resize-none font-mono"
            />
          </div>

          <SubmitButtons isAdd={view === 'add'} onCancel={() => setView('list')} />
        </form>
      </FormWrapper>
    );
  }

  // ── ADD/EDIT FORM FOR AUDIENCE ──
  if ((view === 'add' || view === 'edit') && activeTab === 'audiences') {
    return (
      <FormWrapper title={view === 'add' ? 'Add New Clientele Card (Who We Accompany)' : 'Edit Clientele Card'} onBack={() => setView('list')}>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (view === 'add') addAudience(audienceForm);
          else if (editingId) updateAudience(editingId, audienceForm);
          showToast();
          setView('list');
        }} className="flex flex-col gap-6">

          <ImageUploadField image={audienceForm.image} onImageChange={(img) => setAudienceForm(p => ({ ...p, image: img }))} />

          <FormField label="Clientele Title" value={audienceForm.title} onChange={v => setAudienceForm(p => ({ ...p, title: v }))} placeholder="e.g. Creators & Influencers" required />
          <FormField label="Keyword Watermark" value={audienceForm.keyword} onChange={v => setAudienceForm(p => ({ ...p, keyword: v }))} placeholder="e.g. Distinction" required />
          <FormField label="URL Slug" value={audienceForm.slug} onChange={v => setAudienceForm(p => ({ ...p, slug: v }))} placeholder="e.g. creators" required />

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Description *</label>
            <textarea
              value={audienceForm.desc}
              onChange={e => setAudienceForm(p => ({ ...p, desc: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40 resize-none"
              required
            />
          </div>

          <SubmitButtons isAdd={view === 'add'} onCancel={() => setView('list')} />
        </form>
      </FormWrapper>
    );
  }

  // ── ADD/EDIT FORM FOR JOURNAL ──
  if ((view === 'add' || view === 'edit') && activeTab === 'articles') {
    return (
      <FormWrapper title={view === 'add' ? 'Add New Journal Article' : 'Edit Journal Article'} onBack={() => setView('list')}>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (view === 'add') addArticle(articleForm);
          else if (editingId) updateArticle(editingId, articleForm);
          showToast();
          setView('list');
        }} className="flex flex-col gap-6">

          <ImageUploadField image={articleForm.image} onImageChange={(img) => setArticleForm(p => ({ ...p, image: img }))} />

          <FormField label="Article Title" value={articleForm.title} onChange={v => setArticleForm(p => ({ ...p, title: v }))} required />
          <FormField label="Category Badge" value={articleForm.category} onChange={v => setArticleForm(p => ({ ...p, category: v }))} placeholder="e.g. The Style Edit" required />

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Article Excerpt *</label>
            <textarea
              value={articleForm.excerpt}
              onChange={e => setArticleForm(p => ({ ...p, excerpt: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40 resize-none"
              required
            />
          </div>

          <SubmitButtons isAdd={view === 'add'} onCancel={() => setView('list')} />
        </form>
      </FormWrapper>
    );
  }

  // ── ADD/EDIT FORM FOR TESTIMONIALS ──
  if ((view === 'add' || view === 'edit') && activeTab === 'testimonials') {
    return (
      <FormWrapper title={view === 'add' ? 'Add Client Review' : 'Edit Review'} onBack={() => setView('list')}>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (view === 'add') addTestimonial(testimonialForm);
          else if (editingId) updateTestimonial(editingId, testimonialForm);
          showToast();
          setView('list');
        }} className="flex flex-col gap-6">

          <ImageUploadField image={testimonialForm.avatar || ''} onImageChange={(img) => setTestimonialForm(p => ({ ...p, avatar: img }))} />

          <FormField label="Client Name" value={testimonialForm.name} onChange={v => setTestimonialForm(p => ({ ...p, name: v }))} placeholder="e.g. Ananya R." required />
          <FormField label="Client Role" value={testimonialForm.role} onChange={v => setTestimonialForm(p => ({ ...p, role: v }))} placeholder="e.g. Founder & CEO" required />
          <FormField label="Location" value={testimonialForm.location} onChange={v => setTestimonialForm(p => ({ ...p, location: v }))} placeholder="e.g. New Delhi" required />

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Testimonial Quote *</label>
            <textarea
              value={testimonialForm.text}
              onChange={e => setTestimonialForm(p => ({ ...p, text: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40 resize-none"
              required
            />
          </div>

          <SubmitButtons isAdd={view === 'add'} onCancel={() => setView('list')} />
        </form>
      </FormWrapper>
    );
  }

  // ── MAIN DASHBOARD (WITH ALL SECTION TABS) ──
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      {/* Header */}
      <header className="border-b border-black/10 bg-white sticky top-0 z-50 px-6 sm:px-12 py-4 flex items-center justify-between shadow-xs">
        <div>
          <span className="font-mono text-[8px] tracking-[0.35em] uppercase text-black/40 font-bold block">STYLE WITH J</span>
          <h1 className="font-serif text-xl font-light text-[#1A1A1A]">Full Site Management Portal</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setResetModal(true)} className="font-mono text-[9px] tracking-[0.2em] uppercase text-amber-700 hover:text-amber-900 transition-colors">
            Reset Seeds
          </button>
          <Link href="/" target="_blank" className="font-mono text-[9px] tracking-[0.2em] uppercase text-black/60 hover:text-black transition-colors">
            View Live Site →
          </Link>
          <button onClick={handleLogout} className="font-mono text-[9px] tracking-[0.2em] uppercase text-red-600 hover:text-red-800 transition-colors">
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-10 flex flex-col gap-8">
        {/* Toast */}
        {saved && (
          <div className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 font-mono text-[10px] tracking-[0.2em] uppercase rounded-xs shadow-lg z-50">
            ✓ Changes Saved Successfully
          </div>
        )}

        {/* Reset modal */}
        {resetModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-6 z-50">
            <div className="bg-white border border-black/15 p-8 max-w-md w-full rounded-xs flex flex-col gap-4 text-center">
              <h3 className="font-serif text-xl text-black">Reset All Website Content?</h3>
              <p className="font-sans text-xs text-black/60 leading-relaxed">
                This will restore all Hero, About, Meet, Services, Clientele, Journal, and Contact content to initial seed defaults.
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    resetAllSiteData();
                    setResetModal(false);
                    showToast();
                  }}
                  className="flex-1 py-3 bg-red-600 text-white font-mono text-[10px] uppercase tracking-wider rounded-xs"
                >
                  Yes, Reset All Data
                </button>
                <button
                  onClick={() => setResetModal(false)}
                  className="flex-1 py-3 border border-black/20 font-mono text-[10px] uppercase tracking-wider rounded-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── SECTION TABS ── */}
        <div className="flex flex-wrap items-center gap-2 border-b border-black/10 pb-4">
          {[
            { id: 'hero', label: '🌟 Hero Section' },
            { id: 'about', label: '📖 About Section' },
            { id: 'meet', label: '👤 Meet Jennifer' },
            { id: 'lookbook', label: '📸 Lookbook & Gallery' },
            { id: 'services', label: '✦ Services (What We Do)' },
            { id: 'audiences', label: '👥 Clientele' },
            { id: 'articles', label: '📰 Journal Articles' },
            { id: 'testimonials', label: '💬 Testimonials' },
            { id: 'contact', label: '📍 Contact & Info' },
            { id: 'mailbox', label: '✉️ Mailbox & SMTP (.env)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as TabType);
                setView('list');
              }}
              className={`px-4 py-2 text-[9px] sm:text-[10px] font-mono tracking-[0.15em] uppercase transition-all rounded-xs border ${
                activeTab === tab.id
                  ? 'bg-black text-white border-black font-semibold shadow-xs'
                  : 'bg-white text-black/60 border-black/10 hover:border-black/30 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── 1. HERO SECTION EDIT FORM ── */}
        {activeTab === 'hero' && (
          <div className="flex flex-col gap-8">
            <form onSubmit={(e) => {
              e.preventDefault();
              updateHero(tempHero);
              showToast();
            }} className="bg-white border border-black/10 p-6 sm:p-10 rounded-xs flex flex-col gap-6">
              <div>
                <h2 className="font-serif text-2xl font-light">Hero Section Content & Layout</h2>
                <p className="font-sans text-xs text-black/50 mt-1">
                  Manage all headlines, imagery, image vertical lift/positioning on larger devices, and CTAs.
                </p>
              </div>

              {/* Desktop Image & Vertical Lift Controls */}
              <div className="flex flex-col gap-3 p-5 bg-[#F7F5F0] border border-black/10 rounded-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-black/70 font-bold">
                    1. DESKTOP HERO IMAGE & VERTICAL LIFT
                  </span>
                  <span className="font-mono text-[9px] text-black/40">Large Screens / PC</span>
                </div>

                <ImageUploadField
                  image={tempHero.desktopImage}
                  onImageChange={img => setTempHero(p => ({ ...p, desktopImage: img }))}
                />

                {/* Vertical Lift Settings */}
                <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-black/10">
                  <label className="font-mono text-[8.5px] tracking-[0.2em] uppercase text-black/60 font-bold">
                    Desktop Image Vertical Lift / Position (Fixes bottom cut-off on bigger screens)
                  </label>
                  <p className="font-sans text-[11px] text-black/50">
                    Lifting the image shifts the photograph upward inside the viewport so the bottom of the saree, chair base, and floor remain fully visible.
                  </p>
                  
                  {/* Presets */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { label: 'Balanced Lift (center 50%) — Recommended', val: 'center 50%' },
                      { label: 'Extra Lift (center 55%)', val: 'center 55%' },
                      { label: 'High Lift (center 65%)', val: 'center 65%' },
                      { label: 'Subtle Lift (center 40%)', val: 'center 40%' },
                      { label: 'Top Pinned (center 0%)', val: 'center 0%' },
                    ].map(preset => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => setTempHero(p => ({ ...p, desktopImagePosition: preset.val }))}
                        className={`px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider rounded-xs border transition-colors ${
                          (tempHero.desktopImagePosition || 'center 50%') === preset.val
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black/70 border-black/15 hover:border-black/40'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  {/* Custom Input */}
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-black/40">Custom CSS Position:</span>
                    <input
                      type="text"
                      value={tempHero.desktopImagePosition || 'center 50%'}
                      onChange={e => setTempHero(p => ({ ...p, desktopImagePosition: e.target.value }))}
                      placeholder="e.g. center 50%"
                      className="w-48 px-3 py-1.5 border border-black/15 bg-white font-mono text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Image & Position */}
              <div className="flex flex-col gap-3 p-5 bg-[#F7F5F0] border border-black/10 rounded-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-black/70 font-bold">
                    2. MOBILE HERO IMAGE & ALIGNMENT
                  </span>
                  <span className="font-mono text-[9px] text-black/40">Mobile Viewport</span>
                </div>

                <ImageUploadField
                  image={tempHero.mobileImage}
                  onImageChange={img => setTempHero(p => ({ ...p, mobileImage: img }))}
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-2 pt-3 border-t border-black/10">
                  <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-black/50 font-bold">
                    Mobile Image Alignment:
                  </span>
                  <div className="flex gap-2">
                    {['center 15%', 'center 25%', 'center 50%'].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setTempHero(p => ({ ...p, mobileImagePosition: val }))}
                        className={`px-3 py-1 text-[9px] font-mono uppercase tracking-wider rounded-xs border transition-colors ${
                          (tempHero.mobileImagePosition || 'center 15%') === val
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black/70 border-black/15 hover:border-black/40'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <FormField label="Eyebrow Sub-tag" value={tempHero.eyebrow} onChange={v => setTempHero(p => ({ ...p, eyebrow: v }))} required />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField label="Title Line 1" value={tempHero.titleLine1} onChange={v => setTempHero(p => ({ ...p, titleLine1: v }))} required />
                <FormField label="Title Line 2" value={tempHero.titleLine2} onChange={v => setTempHero(p => ({ ...p, titleLine2: v }))} required />
                <FormField label="Title Italic Emphasis" value={tempHero.titleItalic} onChange={v => setTempHero(p => ({ ...p, titleItalic: v }))} required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Subtitle Line 1" value={tempHero.subtitleLine1} onChange={v => setTempHero(p => ({ ...p, subtitleLine1: v }))} required />
                <FormField label="Subtitle Line 2" value={tempHero.subtitleLine2} onChange={v => setTempHero(p => ({ ...p, subtitleLine2: v }))} required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="CTA Button Text" value={tempHero.ctaText} onChange={v => setTempHero(p => ({ ...p, ctaText: v }))} required />
                <FormField label="CTA Destination URL" value={tempHero.ctaUrl} onChange={v => setTempHero(p => ({ ...p, ctaUrl: v }))} required />
              </div>

              <FormField label="Side Editorial Text" value={tempHero.sideText} onChange={v => setTempHero(p => ({ ...p, sideText: v }))} required />

              <button type="submit" className="py-3.5 bg-black text-white font-mono text-[10px] uppercase tracking-[0.25em] rounded-xs shadow-md hover:bg-black/90 transition-all">
                Save Hero Changes →
              </button>
            </form>

            {/* Live Interactive Hero Section Preview */}
            <div className="flex flex-col gap-4 bg-white border border-black/10 p-6 sm:p-8 rounded-xs shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/10">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/50 font-bold block">
                    ✦ REAL-TIME HERO SECTION PREVIEW
                  </span>
                  <h3 className="font-serif text-lg font-light text-[#1A1A1A]">
                    Left-Middle Placement, Refined Font Size & Lifted Image Preview
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHeroPreviewDevice('desktop')}
                    className={`px-3.5 py-1.5 text-[9px] font-mono uppercase tracking-wider rounded-xs transition-all ${
                      heroPreviewDevice === 'desktop'
                        ? 'bg-black text-white shadow-sm'
                        : 'bg-[#F2EFE9] text-black/70 border border-black/15 hover:text-black'
                    }`}
                  >
                    🖥 Desktop View
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroPreviewDevice('mobile')}
                    className={`px-3.5 py-1.5 text-[9px] font-mono uppercase tracking-wider rounded-xs transition-all ${
                      heroPreviewDevice === 'mobile'
                        ? 'bg-black text-white shadow-sm'
                        : 'bg-[#F2EFE9] text-black/70 border border-black/15 hover:text-black'
                    }`}
                  >
                    📱 Mobile View
                  </button>
                </div>
              </div>

              {/* Simulated Container */}
              <div className="w-full flex justify-center py-2 bg-[#FAF9F6]">
                <div
                  className={`relative w-full overflow-hidden rounded-xs border border-black/20 shadow-lg text-white flex flex-col justify-center items-start transition-all duration-500 ${
                    heroPreviewDevice === 'mobile'
                      ? 'max-w-[360px] h-[580px] p-6'
                      : 'max-w-4xl h-[460px] p-8 sm:p-12'
                  }`}
                  style={{ backgroundColor: '#111' }}
                >
                  {/* Background Image with Dynamic Lift */}
                  <img
                    src={
                      heroPreviewDevice === 'desktop'
                        ? (tempHero.desktopImage || "/images/hero/hero image desktop.png")
                        : (tempHero.mobileImage || "/images/hero/hero image.jpeg")
                    }
                    alt="Hero Live Preview"
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 pointer-events-none"
                    style={{
                      objectPosition:
                        heroPreviewDevice === 'desktop'
                          ? (tempHero.desktopImagePosition || 'center 50%')
                          : (tempHero.mobileImagePosition || 'center 15%'),
                    }}
                  />

                  {/* Overlays matching the production site */}
                  {heroPreviewDevice === 'desktop' ? (
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10 pointer-events-none" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25 pointer-events-none" />
                  )}

                  {/* Left-Middle Hero Writing */}
                  <div className="relative z-10 max-w-sm flex flex-col items-start text-left">
                    <span className="text-[8px] sm:text-[9.5px] tracking-[0.35em] uppercase text-white/70 mb-1.5 block font-mono font-medium">
                      {tempHero.eyebrow}
                    </span>

                    <h1 className="text-xl sm:text-3xl font-serif font-light leading-[1.18] tracking-wide mb-2">
                      {tempHero.titleLine1} <br />
                      {tempHero.titleLine2} <br />
                      <span className="italic font-normal">{tempHero.titleItalic}</span>
                    </h1>

                    <div className="w-8 sm:w-10 h-[1px] bg-white/30 mb-2 sm:mb-2.5" />

                    <p className="text-[10px] sm:text-xs font-light text-white/80 leading-relaxed mb-3 sm:mb-4 max-w-[240px] tracking-wide">
                      {tempHero.subtitleLine1} <br />
                      {tempHero.subtitleLine2}
                    </p>

                    <div className="inline-flex items-center justify-between gap-6 px-4 py-2 border border-white/40 bg-black/40 text-[9px] tracking-[0.25em] uppercase font-mono text-white rounded-xs shadow-md">
                      <span>{tempHero.ctaText || "Connect"}</span>
                      <span>→</span>
                    </div>
                  </div>

                  {/* Side text for desktop preview */}
                  {heroPreviewDevice === 'desktop' && (
                    <div className="absolute right-8 bottom-8 hidden sm:flex flex-col items-start border-l border-white/20 pl-4 py-1 max-w-[120px] z-10">
                      <p className="text-[8px] tracking-[0.2em] uppercase font-light leading-relaxed text-white/80">
                        {tempHero.sideText}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── 2. ABOUT SECTION EDIT FORM ── */}
        {activeTab === 'about' && (
          <form onSubmit={(e) => {
            e.preventDefault();
            updateAbout(tempAbout);
            showToast();
          }} className="bg-white border border-black/10 p-6 sm:p-10 rounded-xs flex flex-col gap-6">
            <div>
              <h2 className="font-serif text-2xl font-light">About Page Story & Philosophy</h2>
              <p className="font-sans text-xs text-black/50 mt-1">Manage headlines, philosophy quotes, goals, and story text on /about</p>
            </div>

            <ImageUploadField
              image={tempAbout.creativeDirectorImage}
              onImageChange={img => setTempAbout(p => ({ ...p, creativeDirectorImage: img }))}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Creative Director Title" value={tempAbout.creativeDirectorTitle} onChange={v => setTempAbout(p => ({ ...p, creativeDirectorTitle: v }))} required />
              <FormField label="Creative Director Name" value={tempAbout.creativeDirectorName} onChange={v => setTempAbout(p => ({ ...p, creativeDirectorName: v }))} required />
            </div>

            <FormField label="Eyebrow Badge" value={tempAbout.eyebrow} onChange={v => setTempAbout(p => ({ ...p, eyebrow: v }))} required />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Headline Line 1" value={tempAbout.titleLine1} onChange={v => setTempAbout(p => ({ ...p, titleLine1: v }))} required />
              <FormField label="Headline Line 2 (Italic)" value={tempAbout.titleLine2} onChange={v => setTempAbout(p => ({ ...p, titleLine2: v }))} required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Philosophy Quote *</label>
              <textarea value={tempAbout.philosophyQuote} onChange={e => setTempAbout(p => ({ ...p, philosophyQuote: e.target.value }))} rows={3} className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs rounded-xs outline-none" required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Goal Statement Quote *</label>
              <textarea value={tempAbout.goalQuote} onChange={e => setTempAbout(p => ({ ...p, goalQuote: e.target.value }))} rows={3} className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs rounded-xs outline-none" required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Story Paragraph 1 *</label>
              <textarea value={tempAbout.storyParagraph1} onChange={e => setTempAbout(p => ({ ...p, storyParagraph1: e.target.value }))} rows={3} className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs rounded-xs outline-none" required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Story Paragraph 2 *</label>
              <textarea value={tempAbout.storyParagraph2} onChange={e => setTempAbout(p => ({ ...p, storyParagraph2: e.target.value }))} rows={3} className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs rounded-xs outline-none" required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Story Paragraph 3 *</label>
              <textarea value={tempAbout.storyParagraph3} onChange={e => setTempAbout(p => ({ ...p, storyParagraph3: e.target.value }))} rows={3} className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs rounded-xs outline-none" required />
            </div>

            <button type="submit" className="py-3.5 bg-black text-white font-mono text-[10px] uppercase tracking-[0.25em] rounded-xs shadow-md">
              Save About Page Changes →
            </button>
          </form>
        )}

        {/* ── 3. MEET JENNIFER EDIT FORM ── */}
        {activeTab === 'meet' && (
          <form onSubmit={(e) => {
            e.preventDefault();
            updateMeet(tempMeet);
            showToast();
          }} className="bg-white border border-black/10 p-6 sm:p-10 rounded-xs flex flex-col gap-6">
            <div>
              <h2 className="font-serif text-2xl font-light">Meet Jennifer Profile Section</h2>
              <p className="font-sans text-xs text-black/50 mt-1">Manage bio, profile photo, quotes, and philosophy callout on home page</p>
            </div>

            <ImageUploadField
              image={tempMeet.image}
              onImageChange={img => setTempMeet(p => ({ ...p, image: img }))}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Section Eyebrow" value={tempMeet.eyebrow} onChange={v => setTempMeet(p => ({ ...p, eyebrow: v }))} required />
              <FormField label="Title" value={tempMeet.title} onChange={v => setTempMeet(p => ({ ...p, title: v }))} required />
              <FormField label="Subtitle Badge" value={tempMeet.subtitle} onChange={v => setTempMeet(p => ({ ...p, subtitle: v }))} required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Profile Bio Text *</label>
              <textarea value={tempMeet.bioText} onChange={e => setTempMeet(p => ({ ...p, bioText: e.target.value }))} rows={3} className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs rounded-xs outline-none" required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Featured Quote *</label>
              <textarea value={tempMeet.quote} onChange={e => setTempMeet(p => ({ ...p, quote: e.target.value }))} rows={3} className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs rounded-xs outline-none" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Accent Callout Title" value={tempMeet.accentTitle} onChange={v => setTempMeet(p => ({ ...p, accentTitle: v }))} required />
              <FormField label="Accent Callout Text" value={tempMeet.accentText} onChange={v => setTempMeet(p => ({ ...p, accentText: v }))} required />
            </div>

            <button type="submit" className="py-3.5 bg-black text-white font-mono text-[10px] uppercase tracking-[0.25em] rounded-xs shadow-md">
              Save Meet Profile Changes →
            </button>
          </form>
        )}

        {/* ── 4. CONTACT & INFO EDIT FORM ── */}
        {activeTab === 'contact' && (
          <form onSubmit={(e) => {
            e.preventDefault();
            updateContact(tempContact);
            showToast();
          }} className="bg-white border border-black/10 p-6 sm:p-10 rounded-xs flex flex-col gap-6">
            <div>
              <h2 className="font-serif text-2xl font-light">Contact Information & Footer Details</h2>
              <p className="font-sans text-xs text-black/50 mt-1">Manage email, phone, address, and business hours across the site</p>
            </div>

            <FormField label="Contact Page Heading" value={tempContact.heading} onChange={v => setTempContact(p => ({ ...p, heading: v }))} required />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Official Email" value={tempContact.email} onChange={v => setTempContact(p => ({ ...p, email: v }))} required />
              <FormField label="Contact Phone" value={tempContact.phone} onChange={v => setTempContact(p => ({ ...p, phone: v }))} required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Office Address *</label>
              <textarea value={tempContact.address} onChange={e => setTempContact(p => ({ ...p, address: e.target.value }))} rows={3} className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs rounded-xs outline-none" required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Operating Hours *</label>
              <textarea value={tempContact.hours} onChange={e => setTempContact(p => ({ ...p, hours: e.target.value }))} rows={3} className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs rounded-xs outline-none" required />
            </div>

            {/* WhatsApp Concierge Configuration */}
            <div className="flex flex-col gap-3 p-5 bg-[#F7F5F0] border border-black/10 rounded-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-black/70 font-bold">
                  ✦ WHATSAPP CONCIERGE & SOCIAL SETTINGS
                </span>
                <span className="font-mono text-[9px] text-black/40">Used Across All CTAs & Footers</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField 
                  label="WhatsApp Phone Number (with country code, no + or dashes)" 
                  value={tempContact.whatsappPhone || ''} 
                  onChange={v => setTempContact(p => ({ ...p, whatsappPhone: v }))} 
                  placeholder="e.g. 919876543210" 
                />
                <FormField 
                  label="Instagram Profile Link" 
                  value={tempContact.instagramUrl || ''} 
                  onChange={v => setTempContact(p => ({ ...p, instagramUrl: v }))} 
                  placeholder="https://instagram.com/..." 
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField 
                  label="Default WhatsApp Message Template" 
                  value={tempContact.whatsappMessage || ''} 
                  onChange={v => setTempContact(p => ({ ...p, whatsappMessage: v }))} 
                  placeholder="e.g. Hello Jennifer, I would like to schedule a styling consultation." 
                />
                <FormField 
                  label="LinkedIn Profile Link" 
                  value={tempContact.linkedinUrl || ''} 
                  onChange={v => setTempContact(p => ({ ...p, linkedinUrl: v }))} 
                  placeholder="https://linkedin.com/in/..." 
                />
              </div>
            </div>

            <button type="submit" className="py-3.5 bg-black text-white font-mono text-[10px] uppercase tracking-[0.25em] rounded-xs shadow-md">
              Save Contact Details →
            </button>
          </form>
        )}

        {/* ── 5. TAB CONTENT: LOOKBOOK ── */}
        {activeTab === 'lookbook' && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center pb-2">
              <span className="font-mono text-[10px] text-black/50 font-bold">LOOKBOOK ITEMS ({looks.length})</span>
              <button
                onClick={() => {
                  setLookForm(EMPTY_LOOK);
                  setEditingId(null);
                  setView('add');
                }}
                className="px-4 py-2 bg-[#1A1A1A] text-white text-[9px] tracking-[0.2em] uppercase font-mono font-semibold hover:bg-black transition-colors rounded-xs shadow-md"
              >
                + Add New Look
              </button>
            </div>
            {looks.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                title={item.title}
                subtitle={`${item.category} • Tag: ${item.tag}`}
                image={item.image}
                badge={`LOOK /${item.num}`}
                onEdit={() => {
                  const { id, num, ...rest } = item;
                  setLookForm(rest);
                  setEditingId(id);
                  setView('edit');
                }}
                onDelete={() => deleteLook(item.id)}
                viewUrl={`/lookbook/${item.id}`}
              />
            ))}
          </div>
        )}

        {/* ── 6. TAB CONTENT: SERVICES ── */}
        {activeTab === 'services' && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center pb-2">
              <span className="font-mono text-[10px] text-black/50 font-bold">SERVICES ({services.length})</span>
              <button
                onClick={() => {
                  setServiceForm(EMPTY_SERVICE);
                  setEditingId(null);
                  setView('add');
                }}
                className="px-4 py-2 bg-[#1A1A1A] text-white text-[9px] tracking-[0.2em] uppercase font-mono font-semibold hover:bg-black transition-colors rounded-xs shadow-md"
              >
                + Add New Service
              </button>
            </div>
            {services.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                title={item.name}
                subtitle={`${item.category} • ${item.desc}`}
                image={item.image}
                badge={`SERVICE /${item.num}`}
                onEdit={() => {
                  const { id, num, ...rest } = item;
                  setServiceForm({
                    ...rest,
                    summary: rest.summary || '',
                    points: rest.points || [],
                  });
                  setEditingId(id);
                  setView('edit');
                }}
                onDelete={() => deleteService(item.id)}
              />
            ))}
          </div>
        )}

        {/* ── 7. TAB CONTENT: CLIENTELE ── */}
        {activeTab === 'audiences' && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center pb-2">
              <span className="font-mono text-[10px] text-black/50 font-bold">CLIENTELE CARDS ({audiences.length})</span>
              <button
                onClick={() => {
                  setAudienceForm(EMPTY_AUDIENCE);
                  setEditingId(null);
                  setView('add');
                }}
                className="px-4 py-2 bg-[#1A1A1A] text-white text-[9px] tracking-[0.2em] uppercase font-mono font-semibold hover:bg-black transition-colors rounded-xs shadow-md"
              >
                + Add Clientele Profile
              </button>
            </div>
            {audiences.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                title={item.title}
                subtitle={`Watermark: ${item.keyword} • ${item.desc}`}
                image={item.image}
                badge={`CLIENTELE`}
                onEdit={() => {
                  const { id, ...rest } = item;
                  setAudienceForm(rest);
                  setEditingId(id);
                  setView('edit');
                }}
                onDelete={() => deleteAudience(item.id)}
              />
            ))}
          </div>
        )}

        {/* ── 8. TAB CONTENT: JOURNAL ── */}
        {activeTab === 'articles' && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center pb-2">
              <span className="font-mono text-[10px] text-black/50 font-bold">JOURNAL ARTICLES ({articles.length})</span>
              <button
                onClick={() => {
                  setArticleForm(EMPTY_ARTICLE);
                  setEditingId(null);
                  setView('add');
                }}
                className="px-4 py-2 bg-[#1A1A1A] text-white text-[9px] tracking-[0.2em] uppercase font-mono font-semibold hover:bg-black transition-colors rounded-xs shadow-md"
              >
                + Add Journal Article
              </button>
            </div>
            {articles.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                title={item.title}
                subtitle={`${item.category} • ${item.excerpt}`}
                image={item.image}
                badge={`ARTICLE /${item.num}`}
                onEdit={() => {
                  const { id, num, ...rest } = item;
                  setArticleForm(rest);
                  setEditingId(id);
                  setView('edit');
                }}
                onDelete={() => deleteArticle(item.id)}
              />
            ))}
          </div>
        )}

        {/* ── 9. TAB CONTENT: TESTIMONIALS ── */}
        {activeTab === 'testimonials' && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center pb-2">
              <span className="font-mono text-[10px] text-black/50 font-bold">CLIENT REVIEWS ({testimonials.length})</span>
              <button
                onClick={() => {
                  setTestimonialForm(EMPTY_TESTIMONIAL);
                  setEditingId(null);
                  setView('add');
                }}
                className="px-4 py-2 bg-[#1A1A1A] text-white text-[9px] tracking-[0.2em] uppercase font-mono font-semibold hover:bg-black transition-colors rounded-xs shadow-md"
              >
                + Add Client Review
              </button>
            </div>
            {testimonials.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                title={`${item.name} (${item.role})`}
                subtitle={`${item.location} • "${item.text}"`}
                image={item.avatar || ''}
                badge={`REVIEW`}
                onEdit={() => {
                  const { id, ...rest } = item;
                  setTestimonialForm(rest);
                  setEditingId(id);
                  setView('edit');
                }}
                onDelete={() => deleteTestimonial(item.id)}
              />
            ))}
          </div>
        )}

        {/* ── 10. TAB CONTENT: MAILBOX & SMTP (.ENV) ── */}
        {activeTab === 'mailbox' && (
          <MailboxConfigSection onToast={showToast} />
        )}

      </div>
    </div>
  );
}

// ── REUSABLE HELPER COMPONENTS ──
function FormWrapper({ title, onBack, children }: { title: string; onBack: () => void; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      <header className="border-b border-black/10 bg-white sticky top-0 z-50 px-6 sm:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="font-mono text-[9px] tracking-[0.25em] uppercase text-black/50 hover:text-black transition-colors">← Back</button>
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/30">|</span>
          <span className="font-serif text-lg font-light">{title}</span>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-6 sm:px-12 py-12">
        {children}
      </div>
    </div>
  );
}

function ImageUploadField({ image, onImageChange }: { image: string; onImageChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-3 p-5 bg-[#EFECE6]/60 border border-black/10 rounded-xs">
      <div className="flex items-center justify-between">
        <label className="font-mono text-[9px] tracking-[0.25em] uppercase text-black/60 font-bold">
          IMAGE FILE OR URL <span className="text-red-500">*</span>
        </label>
        <span className="font-sans text-[10px] text-black/50">Upload image OR paste path</span>
      </div>

      {image && (
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#D8D4CC] rounded-xs border border-black/10 shadow-sm">
          <img src={image} alt="Preview" className="w-full h-full object-cover object-top" />
          <div className="absolute top-3 left-3 bg-black/80 text-white px-2.5 py-1 text-[8px] tracking-[0.2em] font-mono uppercase rounded-xs">
            ✦ Preview
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <label className="flex-shrink-0 cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1A1A1A] hover:bg-black text-white text-[10px] tracking-[0.2em] uppercase font-mono font-semibold transition-all rounded-xs shadow-sm">
          <span>📁 Choose Image File</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  const dataUrl = event.target?.result as string;
                  if (dataUrl) onImageChange(dataUrl);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </label>

        <div className="text-[10px] font-mono text-black/40 text-center sm:text-left">OR</div>

        <input
          type="text"
          value={image}
          onChange={e => onImageChange(e.target.value)}
          placeholder="Paste URL or path (e.g. /images/includes/IMG_0267.JPG.jpeg)"
          required
          className="flex-1 px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] placeholder-black/30 rounded-xs outline-none focus:border-black transition-colors"
        />
      </div>
    </div>
  );
}

function FormField({ label, value, onChange, placeholder, required }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] placeholder-black/30 rounded-xs outline-none focus:border-black transition-colors"
      />
    </div>
  );
}

function SubmitButtons({ isAdd, onCancel }: { isAdd: boolean; onCancel: () => void }) {
  return (
    <div className="flex items-center gap-3 pt-4 border-t border-black/10">
      <button
        type="submit"
        className="flex-1 py-3.5 bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase font-mono font-semibold hover:bg-black transition-colors rounded-xs shadow-md"
      >
        {isAdd ? 'Add Entry →' : 'Save Changes →'}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-3.5 border border-black/20 text-[10px] tracking-[0.25em] uppercase font-mono text-black/60 hover:text-black hover:border-black/40 transition-colors rounded-xs"
      >
        Cancel
      </button>
    </div>
  );
}

function ItemCard({ id, title, subtitle, image, badge, onEdit, onDelete, viewUrl }: {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  onEdit: () => void;
  onDelete: () => void;
  viewUrl?: string;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="bg-white border border-black/8 rounded-xs overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4 shadow-2xs">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="relative w-16 h-16 bg-[#EFECE6] rounded-xs overflow-hidden border border-black/5 flex-shrink-0">
          {image && <img src={image} alt={title} className="w-full h-full object-cover object-top" />}
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-black/40 font-bold mb-0.5">{badge}</span>
          <h3 className="font-serif text-base font-light text-[#1A1A1A] truncate">{title}</h3>
          <p className="font-sans text-[10px] text-black/50 truncate mt-0.5">{subtitle}</p>
        </div>
      </div>

      {confirmDelete ? (
        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className="text-[10px] font-mono text-red-600">Confirm?</span>
          <button onClick={onDelete} className="px-3 py-1 bg-red-600 text-white text-[8px] font-mono uppercase tracking-[0.15em] rounded-xs">Yes, Delete</button>
          <button onClick={() => setConfirmDelete(false)} className="px-3 py-1 border border-black/20 text-[8px] font-mono uppercase tracking-[0.15em] rounded-xs">Cancel</button>
        </div>
      ) : (
        <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
          {viewUrl && (
            <Link href={viewUrl} target="_blank" className="px-3 py-1.5 border border-black/15 text-[8px] tracking-[0.15em] uppercase font-mono text-black/50 hover:text-black transition-colors rounded-xs">
              View
            </Link>
          )}
          <button onClick={onEdit} className="px-3 py-1.5 border border-black/15 text-[8px] tracking-[0.15em] uppercase font-mono text-black/50 hover:text-black transition-colors rounded-xs">
            Edit
          </button>
          <button onClick={() => setConfirmDelete(true)} className="px-3 py-1.5 border border-red-200 text-[8px] tracking-[0.15em] uppercase font-mono text-red-500 hover:text-red-700 transition-colors rounded-xs">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

// ── MAILBOX & NODEMAILER CONFIG SECTION ──
function MailboxConfigSection({ onToast }: { onToast: () => void }) {
  const [email, setEmail] = useState('jennifer@stylewithj.in');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);
  const [host, setHost] = useState('smtpout.secureserver.net');
  const [port, setPort] = useState(465);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  useEffect(() => {
    async function loadConfig() {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/email-config');
        const data = await res.json();
        if (data.email) setEmail(data.email);
        if (data.hasPassword !== undefined) setHasPassword(Boolean(data.hasPassword));
        if (data.host) setHost(data.host);
        if (data.port) setPort(data.port);
      } catch {
        setAlert({
          type: 'error',
          message: 'Unable to reach the server to check email configuration.',
        });
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) {
      setAlert({
        type: 'error',
        message: 'Please enter a password to update in .env and .env.local.',
      });
      return;
    }

    try {
      setSaving(true);
      setAlert(null);
      const res = await fetch('/api/admin/email-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setHasPassword(true);
        setPassword('');
        setAlert({
          type: 'success',
          message: 'Password successfully updated in .env and .env.local! Nodemailer has been updated with the new credentials immediately.',
        });
        onToast();
      } else {
        setAlert({
          type: 'error',
          message: data.error || 'Failed to update credentials in environment files.',
        });
      }
    } catch {
      setAlert({
        type: 'error',
        message: 'Network error while saving mailbox credentials.',
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleTest() {
    try {
      setTesting(true);
      setAlert({
        type: 'info',
        message: 'Testing connection to GoDaddy/Titan SMTP server (smtpout.secureserver.net:465)...',
      });
      const res = await fetch('/api/admin/email-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'test',
          email: email.trim(),
          password: password.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAlert({
          type: 'success',
          message: `✓ Connection Verified: ${data.message}`,
        });
      } else {
        setAlert({
          type: 'error',
          message: `✗ SMTP Error: ${data.error || 'Connection or authentication failed.'}`,
        });
      }
    } catch {
      setAlert({
        type: 'error',
        message: 'Network error while attempting SMTP verification.',
      });
    } finally {
      setTesting(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Overview & Credentials Header */}
      <div className="bg-white border border-black/10 p-6 sm:p-10 rounded-xs flex flex-col gap-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/50 font-bold">
                ✦ SECURE MAILBOX & SMTP CONFIGURATION
              </span>
              <span className="px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider bg-black text-white rounded-xs">
                .env / Nodemailer
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A]">
              Titan / GoDaddy Mailbox Password
            </h2>
            <p className="font-sans text-xs text-black/60 mt-1 max-w-xl">
              Configure or change the mailbox password used by Nodemailer to dispatch client booking inquiries and contact forms directly to your inbox.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-black/50">Status:</span>
            {loading ? (
              <span className="px-2.5 py-1 text-[9px] font-mono bg-black/5 text-black/50 rounded-xs animate-pulse">
                Checking...
              </span>
            ) : hasPassword ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[9px] font-mono font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Active in .env
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[9px] font-mono font-bold tracking-wider uppercase bg-amber-50 text-amber-700 border border-amber-300 rounded-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Password Not Set
              </span>
            )}
          </div>
        </div>

        {/* Server Specification Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#F7F5F0] border border-black/10 rounded-xs text-[11px] font-mono text-black/70">
          <div>
            <span className="block text-[8px] tracking-[0.2em] uppercase text-black/40 font-bold">SMTP Host</span>
            <span className="text-black font-medium">{host}</span>
          </div>
          <div>
            <span className="block text-[8px] tracking-[0.2em] uppercase text-black/40 font-bold">Port & Security</span>
            <span className="text-black font-medium">{port} (SSL / TLS Secure)</span>
          </div>
          <div>
            <span className="block text-[8px] tracking-[0.2em] uppercase text-black/40 font-bold">Target Mailbox</span>
            <span className="text-black font-medium truncate block">{email}</span>
          </div>
        </div>

        {/* Alert Feedback Banner */}
        {alert && (
          <div
            className={`p-4 rounded-xs border text-xs leading-relaxed flex items-start gap-3 transition-all ${
              alert.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : alert.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : 'bg-sky-50 border-sky-200 text-sky-800'
            }`}
          >
            <span className="text-sm font-bold">
              {alert.type === 'success' ? '✓' : alert.type === 'error' ? '⚠' : 'ℹ'}
            </span>
            <div className="flex-1 font-sans">{alert.message}</div>
          </div>
        )}

        {/* Password Update Form */}
        <form onSubmit={handleSave} className="flex flex-col gap-6 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">
                Mailbox Sender Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-black/15 bg-white font-mono text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black transition-colors"
                placeholder="jennifer@stylewithj.in"
              />
              <span className="text-[10px] text-black/40 font-sans">
                Corresponds to TITAN_EMAIL in .env.local
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">
                {hasPassword ? 'Change Mailbox Password (.env)' : 'Set Mailbox Password (.env)'}{' '}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={hasPassword ? 'Enter new password to overwrite...' : 'Enter your mailbox password...'}
                  className="w-full pl-4 pr-11 py-2.5 border border-black/15 bg-white font-mono text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-black/40 hover:text-black transition-colors"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.04 10.04 0 014.122-.971c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <span className="text-[10px] text-black/40 font-sans">
                {hasPassword ? 'Existing password is saved in your .env files.' : 'Enter password to activate Nodemailer.'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving || !password.trim()}
              className="flex-1 py-3.5 bg-black hover:bg-black/90 text-white font-mono text-[10px] uppercase tracking-[0.25em] rounded-xs shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving to .env...
                </>
              ) : (
                '💾 Save Mailbox Password to .env'
              )}
            </button>

            <button
              type="button"
              onClick={handleTest}
              disabled={testing || (!password.trim() && !hasPassword)}
              className="px-6 py-3.5 border border-black/20 hover:border-black/50 text-[10px] tracking-[0.2em] uppercase font-mono font-medium text-black hover:bg-[#F2EFE9] transition-all rounded-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {testing ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Verifying SMTP...
                </>
              ) : (
                '⚡ Test SMTP Connection'
              )}
            </button>
          </div>
        </form>

        {/* Security & Setup Guide */}
        <div className="mt-4 pt-6 border-t border-black/10 flex flex-col gap-2">
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-black/60 font-bold">
            🔒 How Mailbox Credentials Work
          </span>
          <ul className="text-xs text-black/60 space-y-1.5 list-disc list-inside font-sans leading-relaxed">
            <li>When you click <strong>Save</strong>, the password is encrypted directly into your server&apos;s <code className="bg-black/5 px-1.5 py-0.5 font-mono text-[10px] text-black">.env.local</code> and <code className="bg-black/5 px-1.5 py-0.5 font-mono text-[10px] text-black">.env</code> files.</li>
            <li>Runtime environment variables are refreshed in memory on-the-fly, so customer contact submissions work immediately without requiring a manual server restart.</li>
            <li>Click <strong>Test SMTP Connection</strong> at any time to verify that GoDaddy/Titan SMTP accepts your email and password.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
