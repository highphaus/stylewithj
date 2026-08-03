'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Look } from '@/lib/looks-data';
import { useLooks } from '@/lib/use-looks';
import { useSiteData } from '@/lib/use-site-data';
import { ServiceItem, AudienceItem, JournalArticle } from '@/lib/site-data';

const ADMIN_PASSWORD = 'jennifer2026';

type TabType = 'lookbook' | 'services' | 'audiences' | 'articles';

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

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('lookbook');

  // Custom Hooks
  const { looks, addLook, updateLook, deleteLook, resetToSeed: resetLooks } = useLooks();
  const { 
    services, addService, updateService, deleteService,
    audiences, addAudience, updateAudience, deleteAudience,
    articles, addArticle, updateArticle, deleteArticle,
    resetAllSiteData
  } = useSiteData();

  // Mode states
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Forms
  const [lookForm, setLookForm] = useState<Omit<Look, 'id' | 'num'>>(EMPTY_LOOK);
  const [serviceForm, setServiceForm] = useState<Omit<ServiceItem, 'id' | 'num'>>(EMPTY_SERVICE);
  const [audienceForm, setAudienceForm] = useState<Omit<AudienceItem, 'id'>>(EMPTY_AUDIENCE);
  const [articleForm, setArticleForm] = useState<Omit<JournalArticle, 'id' | 'num'>>(EMPTY_ARTICLE);

  useEffect(() => {
    const stored = sessionStorage.getItem('swj_admin');
    if (stored === 'true') setAuthed(true);
  }, []);

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
    setTimeout(() => setSaved(false), 2000);
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
            This private administration portal is reserved for Jennifer to add, edit, and curate content across all website pages.
          </p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1.5 text-left">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">
                ENTER ADMIN PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="e.g. jennifer2026"
                className="w-full px-4 py-3 border border-black/20 bg-white font-sans text-sm text-[#1A1A1A] placeholder-black/30 rounded-xs outline-none focus:border-black transition-colors"
                autoFocus
              />
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
            <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Service Description *</label>
            <textarea
              value={serviceForm.desc}
              onChange={e => setServiceForm(p => ({ ...p, desc: e.target.value }))}
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

  // ── MAIN DASHBOARD (WITH SECTION TABS) ──
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      {/* Header */}
      <header className="border-b border-black/10 bg-white sticky top-0 z-50 px-6 sm:px-12 py-4 flex items-center justify-between shadow-xs">
        <div>
          <span className="font-mono text-[8px] tracking-[0.35em] uppercase text-black/40 font-bold block">STYLE WITH J</span>
          <h1 className="font-serif text-xl font-light text-[#1A1A1A]">Admin Management Portal</h1>
        </div>
        <div className="flex items-center gap-4">
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
            ✓ Saved Successfully
          </div>
        )}

        {/* ── SECTION TABS (LOOKBOOK, SERVICES, CLIENTELE, JOURNAL) ── */}
        <div className="flex flex-wrap items-center gap-2 border-b border-black/10 pb-4">
          {[
            { id: 'lookbook', label: '📸 Lookbook & Gallery' },
            { id: 'services', label: '✦ Services (What We Do)' },
            { id: 'audiences', label: '👤 Clientele (Who We Accompany)' },
            { id: 'articles', label: '📰 Journal Articles' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as TabType);
                setView('list');
              }}
              className={`px-5 py-2.5 text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase transition-all rounded-xs border ${
                activeTab === tab.id
                  ? 'bg-black text-white border-black font-semibold shadow-xs'
                  : 'bg-white text-black/60 border-black/10 hover:border-black/30 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Action Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-black/10">
          <div>
            <h2 className="font-serif text-2xl font-light uppercase tracking-wide">
              {activeTab === 'lookbook' && 'Lookbook Archive Entries'}
              {activeTab === 'services' && 'Services (What We Do)'}
              {activeTab === 'audiences' && 'Clientele Profiles (Who We Accompany)'}
              {activeTab === 'articles' && 'Journal Articles'}
            </h2>
            <p className="font-sans text-xs text-black/50 mt-1">
              Add, edit, upload images, or delete items across this section
            </p>
          </div>
          
          <button
            onClick={() => {
              if (activeTab === 'lookbook') setLookForm(EMPTY_LOOK);
              if (activeTab === 'services') setServiceForm(EMPTY_SERVICE);
              if (activeTab === 'audiences') setAudienceForm(EMPTY_AUDIENCE);
              if (activeTab === 'articles') setArticleForm(EMPTY_ARTICLE);
              setEditingId(null);
              setView('add');
            }}
            className="px-5 py-2.5 bg-[#1A1A1A] text-white text-[9px] tracking-[0.2em] uppercase font-mono font-semibold hover:bg-black transition-colors rounded-xs shadow-md"
          >
            + Add New {activeTab === 'lookbook' ? 'Look' : activeTab === 'services' ? 'Service' : activeTab === 'audiences' ? 'Clientele Card' : 'Article'}
          </button>
        </div>

        {/* ── TAB CONTENT: LOOKBOOK ── */}
        {activeTab === 'lookbook' && (
          <div className="flex flex-col gap-3">
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

        {/* ── TAB CONTENT: SERVICES ── */}
        {activeTab === 'services' && (
          <div className="flex flex-col gap-3">
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
                  setServiceForm(rest);
                  setEditingId(id);
                  setView('edit');
                }}
                onDelete={() => deleteService(item.id)}
              />
            ))}
          </div>
        )}

        {/* ── TAB CONTENT: CLIENTELE ── */}
        {activeTab === 'audiences' && (
          <div className="flex flex-col gap-3">
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

        {/* ── TAB CONTENT: JOURNAL ── */}
        {activeTab === 'articles' && (
          <div className="flex flex-col gap-3">
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
