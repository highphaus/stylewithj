'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Look } from '@/lib/looks-data';
import { useLooks } from '@/lib/use-looks';
import { useSiteData } from '@/lib/use-site-data';
import { 
  ServiceItem, AudienceItem, JournalArticle, TestimonialItem, 
  TransformationItem, ResponsiveConfig, CtaBannerContent 
} from '@/lib/site-data';

type TabType = 
  | 'hero'
  | 'transformations' 
  | 'services' 
  | 'lookbook' 
  | 'about'
  | 'meet'
  | 'audiences' 
  | 'articles' 
  | 'testimonials'
  | 'contact'
  | 'cta'
  | 'responsive';

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

const EMPTY_TRANSFORMATION: Omit<TransformationItem, 'id'> = {
  client: '',
  demographic: '',
  concept: '',
  beforeImg: '',
  afterImg: '',
  beforeStory: '',
  afterStory: '',
  review: {
    rating: 5,
    quote: '',
    author: '',
    location: '',
  },
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('hero');

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
    transformations, addTransformation, updateTransformation, deleteTransformation,
    ctaBanner, updateCtaBanner,
    responsive, updateResponsive,
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
  const [transformationForm, setTransformationForm] = useState<Omit<TransformationItem, 'id'>>(EMPTY_TRANSFORMATION);

  // Section level forms
  const [tempHero, setTempHero] = useState(hero);
  const [tempAbout, setTempAbout] = useState(about);
  const [tempMeet, setTempMeet] = useState(meet);
  const [tempContact, setTempContact] = useState(contact);
  const [tempCta, setTempCta] = useState(ctaBanner);
  const [tempResponsive, setTempResponsive] = useState<ResponsiveConfig>(responsive);
  const [heroPreviewDevice, setHeroPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Live Interactive Device Simulator states
  const [simulatorDevice, setSimulatorDevice] = useState<'mobile' | 'mobile-mini' | 'tablet' | 'desktop' | 'custom'>('mobile');
  const [simulatorWidth, setSimulatorWidth] = useState<number>(390);
  const [simulatorPage, setSimulatorPage] = useState<string>('/');
  const [simulatorScale, setSimulatorScale] = useState<number>(1);
  const [simulatorIframeKey, setSimulatorIframeKey] = useState<number>(1);
  const [showDeviceSimulatorModal, setShowDeviceSimulatorModal] = useState<boolean>(false);

  const targetWidth = simulatorDevice === 'mobile' 
    ? 390 
    : simulatorDevice === 'mobile-mini' 
    ? 360 
    : simulatorDevice === 'tablet' 
    ? 768 
    : simulatorDevice === 'desktop' 
    ? 1240 
    : simulatorWidth;

  const targetHeight = simulatorDevice === 'mobile' 
    ? 740 
    : simulatorDevice === 'mobile-mini' 
    ? 660 
    : simulatorDevice === 'tablet' 
    ? 840 
    : simulatorDevice === 'desktop' 
    ? 800 
    : 740;

  useEffect(() => {
    const stored = sessionStorage.getItem('swj_admin');
    if (stored === 'true') setAuthed(true);
  }, []);

  useEffect(() => { setTempHero(hero); }, [hero]);
  useEffect(() => { setTempAbout(about); }, [about]);
  useEffect(() => { setTempMeet(meet); }, [meet]);
  useEffect(() => { setTempContact(contact); }, [contact]);
  useEffect(() => { setTempCta(ctaBanner); }, [ctaBanner]);
  useEffect(() => { setTempResponsive(responsive); }, [responsive]);

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
    setSimulatorIframeKey(k => k + 1);
    setTimeout(() => setSaved(false), 2400);
  }

  // Navigation tab list with item counts
  const tabList: { id: TabType; label: string; count?: number }[] = [
    { id: 'hero', label: '🌟 Hero Section' },
    { id: 'transformations', label: '🔄 Transformations', count: transformations.length },
    { id: 'services', label: '✦ Services', count: services.length },
    { id: 'lookbook', label: '📸 Lookbook & Gallery', count: looks.length },
    { id: 'about', label: '📖 About Section' },
    { id: 'meet', label: '👤 Meet Jennifer' },
    { id: 'audiences', label: '👥 Clientele', count: audiences.length },
    { id: 'articles', label: '📰 Journal', count: articles.length },
    { id: 'testimonials', label: '💬 Reviews', count: testimonials.length },
    { id: 'contact', label: '📍 Studio & Contact' },
    { id: 'cta', label: '📣 Makeover CTA' },
    { id: 'responsive', label: '📱 Responsive & Devices' },
  ];

  // ── LOGIN GATE ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] flex flex-col items-center justify-center p-4 sm:p-6 select-none">
        <div className="w-full max-w-md bg-[#EFECE6] border border-black/15 p-6 sm:p-10 rounded-xs shadow-[0_20px_50px_rgba(0,0,0,0.06)] text-center flex flex-col items-center gap-5 sm:gap-6">
          <div className="flex flex-col items-center gap-1.5 sm:gap-2">
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-black/50 font-bold">
              ✦ ATELIER PORTAL
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-light text-[#1A1A1A]">
              Admin Management
            </h1>
          </div>

          <div className="w-12 h-px bg-black/20" />

          <p className="font-sans text-xs text-black/75 leading-relaxed font-light">
            Private management portal for Jennifer to edit, add, or delete all text, case studies, images, and services across all devices.
          </p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-3.5 mt-1">
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAuthError('');
                }}
                placeholder="Enter password..."
                className="w-full px-4 py-3 bg-white border border-black/20 font-mono text-xs text-[#1A1A1A] placeholder:text-black/35 rounded-xs outline-none focus:border-black/60 transition-colors"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-wider text-black/40 hover:text-black transition-colors cursor-pointer select-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="flex items-center justify-between px-1 text-[9.5px] font-mono text-black/50">
              <span>Password hint: <strong className="text-black font-semibold">jennifer2026</strong></span>
              <span>Atelier Security</span>
            </div>

            {authError && (
              <p className="text-[10px] font-mono text-red-600 tracking-[0.15em] text-left">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase font-mono font-semibold hover:bg-black transition-colors rounded-xs shadow-md cursor-pointer"
            >
              Sign In to Management Portal →
            </button>
          </form>

          <div className="pt-3 border-t border-black/10 w-full flex items-center justify-between text-[9px] font-mono text-black/40">
            <span>Style with J Atelier</span>
            <Link href="/" className="hover:text-black transition-colors">
              ← Return to Live Website
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
                <option>BRIDAL</option>
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
            <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Key Deliverables (one per line)</label>
            <textarea
              value={(serviceForm.points || []).join('\n')}
              onChange={e => setServiceForm(p => ({ ...p, points: e.target.value.split('\n').filter(Boolean) }))}
              rows={4}
              placeholder="Silhouette Consultation&#10;Wardrobe Audit&#10;Color Palette Mapping"
              className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40 resize-none font-mono text-[11px]"
            />
          </div>

          <SubmitButtons isAdd={view === 'add'} onCancel={() => setView('list')} />
        </form>
      </FormWrapper>
    );
  }

  // ── ADD/EDIT FORM FOR TRANSFORMATIONS ──
  if ((view === 'add' || view === 'edit') && activeTab === 'transformations') {
    return (
      <FormWrapper title={view === 'add' ? 'Add Transformation Case Study' : 'Edit Transformation'} onBack={() => setView('list')}>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (view === 'add') addTransformation(transformationForm);
          else if (editingId) updateTransformation(editingId, transformationForm);
          showToast();
          setView('list');
        }} className="flex flex-col gap-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Client Name" value={transformationForm.client} onChange={v => setTransformationForm(p => ({ ...p, client: v }))} placeholder="e.g. Ananya R." required />
            <FormField label="Demographic / Role" value={transformationForm.demographic} onChange={v => setTransformationForm(p => ({ ...p, demographic: v }))} placeholder="e.g. Tech Founder & Speaker" required />
          </div>

          <FormField label="Transformation Concept" value={transformationForm.concept} onChange={v => setTransformationForm(p => ({ ...p, concept: v }))} placeholder="e.g. Sartorial Authority to Quiet Luxury" required />

          {/* Dual Photo Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-5 bg-[#EFECE6]/40 border border-black/10 rounded-xs">
            <div>
              <span className="font-mono text-[8.5px] uppercase tracking-wider text-black/60 font-bold block mb-2">1. BEFORE PHOTO</span>
              <ImageUploadField image={transformationForm.beforeImg} onImageChange={(img) => setTransformationForm(p => ({ ...p, beforeImg: img }))} />
            </div>
            <div>
              <span className="font-mono text-[8.5px] uppercase tracking-wider text-black/60 font-bold block mb-2">2. AFTER PHOTO</span>
              <ImageUploadField image={transformationForm.afterImg} onImageChange={(img) => setTransformationForm(p => ({ ...p, afterImg: img }))} />
            </div>
          </div>

          {/* Storytelling before and after */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Before Storytelling *</label>
              <textarea
                value={transformationForm.beforeStory}
                onChange={e => setTransformationForm(p => ({ ...p, beforeStory: e.target.value }))}
                rows={4}
                placeholder="Describe the client's wardrobe pain points, color hesitation, silhouette mismatches..."
                className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40 resize-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">After Storytelling *</label>
              <textarea
                value={transformationForm.afterStory}
                onChange={e => setTransformationForm(p => ({ ...p, afterStory: e.target.value }))}
                rows={4}
                placeholder="Describe the intentional wardrobe curation, silhouette restructuring, presence shift..."
                className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40 resize-none"
                required
              />
            </div>
          </div>

          {/* Review Card Information */}
          <div className="flex flex-col gap-4 p-4 sm:p-5 bg-white border border-black/10 rounded-xs">
            <div className="flex items-center justify-between border-b border-black/10 pb-2">
              <span className="font-mono text-[8.5px] uppercase tracking-wider text-black/60 font-bold">
                CLIENT REVIEW CARD (CONTENT ONLY)
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs">
                {'★'.repeat(transformationForm.review?.rating || 5)}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Client Review Quote *</label>
              <textarea
                value={transformationForm.review?.quote || ''}
                onChange={e => setTransformationForm(p => ({ 
                  ...p, 
                  review: { ...(p.review || { rating: 5, quote: '', author: '', location: '' }), quote: e.target.value } 
                }))}
                rows={3}
                placeholder="Quote from the client describing how they feel in their new wardrobe..."
                className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField 
                label="Author Name" 
                value={transformationForm.review?.author || ''} 
                onChange={v => setTransformationForm(p => ({ 
                  ...p, 
                  review: { ...(p.review || { rating: 5, quote: '', author: '', location: '' }), author: v } 
                }))} 
                placeholder="e.g. Ananya R." 
                required 
              />
              <FormField 
                label="Location" 
                value={transformationForm.review?.location || ''} 
                onChange={v => setTransformationForm(p => ({ 
                  ...p, 
                  review: { ...(p.review || { rating: 5, quote: '', author: '', location: '' }), location: v } 
                }))} 
                placeholder="e.g. Bangalore, India" 
                required 
              />
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Star Rating</label>
                <select
                  value={transformationForm.review?.rating || 5}
                  onChange={e => setTransformationForm(p => ({ 
                    ...p, 
                    review: { ...(p.review || { quote: '', author: '', location: '', rating: 5 }), rating: Number(e.target.value) } 
                  }))}
                  className="w-full px-4 py-2.5 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40"
                >
                  <option value={5}>★★★★★ (5 Stars)</option>
                  <option value={4}>★★★★☆ (4 Stars)</option>
                  <option value={3}>★★★☆☆ (3 Stars)</option>
                </select>
              </div>
            </div>
          </div>

          <SubmitButtons isAdd={view === 'add'} onCancel={() => setView('list')} />
        </form>
      </FormWrapper>
    );
  }

  // ── ADD/EDIT FORM FOR AUDIENCES (CLIENTELE) ──
  if ((view === 'add' || view === 'edit') && activeTab === 'audiences') {
    return (
      <FormWrapper title={view === 'add' ? 'Add Clientele Segment' : 'Edit Clientele Segment'} onBack={() => setView('list')}>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (view === 'add') addAudience(audienceForm);
          else if (editingId) updateAudience(editingId, audienceForm);
          showToast();
          setView('list');
        }} className="flex flex-col gap-6">

          <ImageUploadField image={audienceForm.image} onImageChange={(img) => setAudienceForm(p => ({ ...p, image: img }))} />

          <FormField label="Keyword / Focus" value={audienceForm.keyword} onChange={v => setAudienceForm(p => ({ ...p, keyword: v }))} placeholder="e.g. Corporate Executives" required />
          <FormField label="Full Title Headline" value={audienceForm.title} onChange={v => setAudienceForm(p => ({ ...p, title: v }))} placeholder="e.g. Leaders Stepping into Boardrooms" required />

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Segment Description *</label>
            <textarea
              value={audienceForm.desc}
              onChange={e => setAudienceForm(p => ({ ...p, desc: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40 resize-none"
              required
            />
          </div>

          <FormField label="URL Slug" value={audienceForm.slug} onChange={v => setAudienceForm(p => ({ ...p, slug: v }))} placeholder="e.g. corporate-executives" required />

          <SubmitButtons isAdd={view === 'add'} onCancel={() => setView('list')} />
        </form>
      </FormWrapper>
    );
  }

  // ── ADD/EDIT FORM FOR JOURNAL ARTICLES ──
  if ((view === 'add' || view === 'edit') && activeTab === 'articles') {
    return (
      <FormWrapper title={view === 'add' ? 'Add Journal Article' : 'Edit Journal Article'} onBack={() => setView('list')}>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (view === 'add') addArticle(articleForm);
          else if (editingId) updateArticle(editingId, articleForm);
          showToast();
          setView('list');
        }} className="flex flex-col gap-6">

          <ImageUploadField image={articleForm.image} onImageChange={(img) => setArticleForm(p => ({ ...p, image: img }))} />

          <FormField label="Article Headline" value={articleForm.title} onChange={v => setArticleForm(p => ({ ...p, title: v }))} placeholder="e.g. The Architecture of Personal Presence" required />
          <FormField label="Category Badge" value={articleForm.category} onChange={v => setArticleForm(p => ({ ...p, category: v }))} placeholder="e.g. Editorial Notes" required />

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Excerpt / Summary *</label>
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
      <FormWrapper title={view === 'add' ? 'Add Client Review' : 'Edit Client Review'} onBack={() => setView('list')}>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (view === 'add') addTestimonial(testimonialForm);
          else if (editingId) updateTestimonial(editingId, testimonialForm);
          showToast();
          setView('list');
        }} className="flex flex-col gap-6">

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
      {/* Header Bar - Fully Responsive for Mobile, Tablet & Desktop */}
      <header className="border-b border-black/10 bg-white/95 backdrop-blur-xs sticky top-0 z-50 px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div>
            <span className="font-mono text-[8px] tracking-[0.35em] uppercase text-black/40 font-bold block">STYLE WITH J</span>
            <h1 className="font-serif text-lg sm:text-xl font-light text-[#1A1A1A]">Site Management Portal</h1>
          </div>
          <div className="sm:hidden flex items-center gap-3">
            <button 
              type="button"
              onClick={() => setShowDeviceSimulatorModal(true)} 
              className="font-mono text-[8.5px] tracking-wider uppercase text-black font-semibold border-b border-black pb-0.5 cursor-pointer"
            >
              📱 Devices
            </button>
            <Link href="/" target="_blank" className="font-mono text-[8.5px] tracking-wider uppercase text-black/60 hover:text-black">
              Live Site ↗
            </Link>
            <button onClick={handleLogout} className="font-mono text-[8.5px] tracking-wider uppercase text-red-600 font-semibold cursor-pointer">
              Exit
            </button>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <button
            type="button"
            onClick={() => setShowDeviceSimulatorModal(true)}
            className="px-3 py-1.5 bg-[#1A1A1A] hover:bg-black text-white font-mono text-[9px] uppercase tracking-[0.2em] rounded-xs cursor-pointer flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <span>📱 View On Devices</span>
          </button>
          <button onClick={() => setResetModal(true)} className="font-mono text-[9px] tracking-[0.2em] uppercase text-amber-700 hover:text-amber-900 transition-colors cursor-pointer">
            Reset Seeds
          </button>
          <Link href="/" target="_blank" className="font-mono text-[9px] tracking-[0.2em] uppercase text-black/60 hover:text-black transition-colors">
            View Live Site →
          </Link>
          <button onClick={handleLogout} className="font-mono text-[9px] tracking-[0.2em] uppercase text-red-600 hover:text-red-800 transition-colors cursor-pointer">
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-10 flex flex-col gap-6 sm:gap-8">
        {/* Toast */}
        {saved && (
          <div className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 font-mono text-[10px] tracking-[0.2em] uppercase rounded-xs shadow-lg z-50 animate-bounce">
            ✓ Changes Saved Successfully
          </div>
        )}

        {/* Reset modal */}
        {resetModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 z-50">
            <div className="bg-white border border-black/15 p-6 sm:p-8 max-w-md w-full rounded-xs flex flex-col gap-4 text-center shadow-xl">
              <h3 className="font-serif text-xl text-black">Reset All Website Content?</h3>
              <p className="font-sans text-xs text-black/60 leading-relaxed">
                This will restore all Hero, About, Meet, Transformations, Services, Clientele, Journal, Testimonials, and Contact content to initial seed defaults.
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    resetAllSiteData();
                    setResetModal(false);
                    showToast();
                  }}
                  className="flex-1 py-3 bg-red-600 text-white font-mono text-[10px] uppercase tracking-wider rounded-xs cursor-pointer hover:bg-red-700"
                >
                  Yes, Reset All
                </button>
                <button
                  onClick={() => setResetModal(false)}
                  className="flex-1 py-3 border border-black/20 font-mono text-[10px] uppercase tracking-wider rounded-xs cursor-pointer hover:bg-black/5"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── FULL SCREEN LIVE DEVICE SIMULATOR MODAL ── */}
        {showDeviceSimulatorModal && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex flex-col z-50 p-2 sm:p-5 overflow-y-auto">
            <div className="max-w-6xl w-full mx-auto flex flex-col gap-3 my-auto">
              {/* Modal Top Bar */}
              <div className="bg-[#1C1C1C] text-white p-3 sm:p-4 rounded-t-xl border border-white/15 flex flex-wrap items-center justify-between gap-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/50 font-bold">
                    ✦ DEVICE SIMULATOR
                  </span>
                  <span className="font-serif text-base sm:text-lg font-light text-white">
                    Live Viewport: {targetWidth}px × {targetHeight}px
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowDeviceSimulatorModal(false)}
                  className="px-3 py-1 bg-white/10 hover:bg-white/25 text-white font-mono text-[9px] uppercase tracking-wider rounded-xs cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <span>✕ Close Simulator</span>
                </button>
              </div>

              {/* Controls bar inside modal */}
              <div className="bg-[#242424] text-white p-3 border-x border-white/15 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-mono text-[7.5px] uppercase tracking-wider text-white/40 font-bold mr-1">DEVICE:</span>
                  {[
                    { id: 'mobile', label: '📱 iPhone (390px)', w: 390, s: 1 },
                    { id: 'mobile-mini', label: '📱 Compact (360px)', w: 360, s: 1 },
                    { id: 'tablet', label: '📟 iPad (768px)', w: 768, s: 0.9 },
                    { id: 'desktop', label: '💻 Desktop (1240px)', w: 1240, s: 0.72 },
                    { id: 'custom', label: '📐 Custom', w: simulatorWidth, s: 1 },
                  ].map(dev => (
                    <button
                      key={dev.id}
                      type="button"
                      onClick={() => {
                        setSimulatorDevice(dev.id as any);
                        if (dev.id !== 'custom') {
                          setSimulatorWidth(dev.w);
                          setSimulatorScale(dev.s);
                        }
                      }}
                      className={`px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-wider rounded-xs cursor-pointer transition-all ${
                        simulatorDevice === dev.id
                          ? 'bg-white text-black font-semibold shadow-xs'
                          : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      {dev.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-mono text-[7.5px] uppercase tracking-wider text-white/40 font-bold mr-1">ZOOM:</span>
                  {[
                    { scale: 1, label: '100%' },
                    { scale: 0.85, label: '85%' },
                    { scale: 0.72, label: '72%' },
                    { scale: 0.55, label: '55%' },
                  ].map(z => (
                    <button
                      key={z.scale}
                      type="button"
                      onClick={() => setSimulatorScale(z.scale)}
                      className={`px-2 py-0.5 font-mono text-[8px] rounded-xs cursor-pointer transition-colors ${
                        simulatorScale === z.scale
                          ? 'bg-amber-400 text-black font-bold'
                          : 'bg-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      {z.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Page Selector bar */}
              <div className="bg-[#1C1C1C] text-white px-3 py-2 border-x border-white/15 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-mono text-[7.5px] uppercase tracking-wider text-white/40 font-bold mr-1">PAGE:</span>
                  {[
                    { path: '/', label: '🏠 Home' },
                    { path: '/#transformations', label: '🔄 Transformations' },
                    { path: '/#services', label: '✦ Services' },
                    { path: '/lookbook', label: '📸 Lookbook' },
                    { path: '/about', label: '📖 About' },
                    { path: '/connect', label: '📍 Connect' },
                  ].map(pg => (
                    <button
                      key={pg.path}
                      type="button"
                      onClick={() => {
                        setSimulatorPage(pg.path);
                        setSimulatorIframeKey(k => k + 1);
                      }}
                      className={`px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider rounded-xs cursor-pointer transition-colors ${
                        simulatorPage === pg.path
                          ? 'bg-amber-400 text-black font-semibold'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {pg.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSimulatorIframeKey(k => k + 1)}
                    className="px-2.5 py-1 bg-white/15 hover:bg-white/25 text-white font-mono text-[8.5px] uppercase tracking-wider rounded-xs cursor-pointer flex items-center gap-1"
                  >
                    ↻ Reload
                  </button>
                  <a
                    href={simulatorPage}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 bg-white/15 hover:bg-white/25 text-white font-mono text-[8.5px] uppercase tracking-wider rounded-xs flex items-center gap-1"
                  >
                    ↗ New Tab
                  </a>
                </div>
              </div>

              {/* Viewport Frame in Modal */}
              <div className="bg-[#0E0E0E] p-4 sm:p-6 rounded-b-xl border-x border-b border-white/15 flex justify-center overflow-x-auto min-h-[550px] shadow-2xl">
                <div className="flex flex-col items-center my-auto">
                  <div
                    style={{ width: `${Math.round(targetWidth * simulatorScale)}px` }}
                    className="bg-[#242424] text-white px-3 py-1.5 flex items-center justify-between border-t border-x border-white/15 rounded-t-xl"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
                      <span className="ml-2 font-mono text-[8px] text-white/50 tracking-wider">
                        {targetWidth}px ({Math.round(simulatorScale * 100)}%)
                      </span>
                    </div>
                    <span className="font-mono text-[8px] text-white/40 truncate max-w-[200px]">
                      stylewithj.com{simulatorPage}
                    </span>
                  </div>

                  <div
                    style={{
                      width: `${Math.round(targetWidth * simulatorScale)}px`,
                      height: `${Math.round(targetHeight * simulatorScale)}px`,
                      overflow: 'hidden',
                    }}
                    className="bg-white rounded-b-xl shadow-2xl border-b border-x border-white/15 relative"
                  >
                    <iframe
                      key={`modal-${simulatorIframeKey}`}
                      src={simulatorPage}
                      style={{
                        width: `${targetWidth}px`,
                        height: `${targetHeight}px`,
                        transform: `scale(${simulatorScale})`,
                        transformOrigin: 'top left',
                      }}
                      className="border-0 bg-[#FAF9F6] w-full h-full"
                      title="Live Website Modal Responsive Simulator"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── RESPONSIVE SECTION TABS ── */}
        <div className="flex flex-col gap-2 border-b border-black/10 pb-4">
          <div className="sm:hidden flex flex-col gap-1">
            <label className="font-mono text-[8px] uppercase tracking-[0.2em] text-black/40 font-bold">
              JUMP TO SECTION:
            </label>
            <select
              value={activeTab}
              onChange={(e) => {
                setActiveTab(e.target.value as TabType);
                setView('list');
              }}
              className="w-full px-3.5 py-2.5 bg-white border border-black/20 font-mono text-xs text-[#1A1A1A] rounded-xs outline-none shadow-2xs"
            >
              {tabList.map(tab => (
                <option key={tab.id} value={tab.id}>
                  {tab.label} {tab.count !== undefined ? `(${tab.count})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden sm:flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {tabList.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setView('list');
                }}
                className={`px-3 sm:px-4 py-2 text-[9px] sm:text-[10px] font-mono tracking-[0.15em] uppercase transition-all rounded-xs border cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-black text-white border-black font-semibold shadow-xs'
                    : 'bg-white text-black/60 border-black/10 hover:border-black/30 hover:text-black'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 text-[8px] rounded-full ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-black/5 text-black/50'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── 1. HERO SECTION EDIT FORM ── */}
        {activeTab === 'hero' && (
          <div className="flex flex-col gap-8">
            <form onSubmit={(e) => {
              e.preventDefault();
              updateHero(tempHero);
              showToast();
            }} className="bg-white border border-black/10 p-5 sm:p-8 lg:p-10 rounded-xs flex flex-col gap-6 shadow-2xs">
              <div>
                <h2 className="font-serif text-2xl font-light">Hero Section Content & Layout</h2>
                <p className="font-sans text-xs text-black/60 mt-1">
                  Customize the entrance typography, images, and alignments for both desktop and mobile viewports.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="font-mono text-[8.5px] uppercase tracking-wider text-black/60 font-bold block mb-2">DESKTOP HERO IMAGE</span>
                  <ImageUploadField image={tempHero.desktopImage || ''} onImageChange={(img) => setTempHero(p => ({ ...p, desktopImage: img }))} />
                  <div className="mt-3">
                    <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Desktop Vertical Lift (objectPosition)</label>
                    <input
                      type="text"
                      value={tempHero.desktopImagePosition || 'center 50%'}
                      onChange={e => setTempHero(p => ({ ...p, desktopImagePosition: e.target.value }))}
                      placeholder="e.g. center 50%"
                      className="w-full px-3.5 py-2 border border-black/15 bg-white font-mono text-xs rounded-xs outline-none focus:border-black/40 mt-1"
                    />
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[8.5px] uppercase tracking-wider text-black/60 font-bold block mb-2">MOBILE HERO IMAGE</span>
                  <ImageUploadField image={tempHero.mobileImage || ''} onImageChange={(img) => setTempHero(p => ({ ...p, mobileImage: img }))} />
                  <div className="mt-3">
                    <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Mobile Vertical Focus (objectPosition)</label>
                    <input
                      type="text"
                      value={tempHero.mobileImagePosition || 'center 15%'}
                      onChange={e => setTempHero(p => ({ ...p, mobileImagePosition: e.target.value }))}
                      placeholder="e.g. center 15%"
                      className="w-full px-3.5 py-2 border border-black/15 bg-white font-mono text-xs rounded-xs outline-none focus:border-black/40 mt-1"
                    />
                  </div>
                </div>
              </div>

              <FormField label="Eyebrow Subtitle" value={tempHero.eyebrow} onChange={v => setTempHero(p => ({ ...p, eyebrow: v }))} required />
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField label="Title Line 1" value={tempHero.titleLine1} onChange={v => setTempHero(p => ({ ...p, titleLine1: v }))} required />
                <FormField label="Title Line 2" value={tempHero.titleLine2} onChange={v => setTempHero(p => ({ ...p, titleLine2: v }))} required />
                <FormField label="Title Italic Accent" value={tempHero.titleItalic} onChange={v => setTempHero(p => ({ ...p, titleItalic: v }))} required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Description Line 1" value={tempHero.subtitleLine1} onChange={v => setTempHero(p => ({ ...p, subtitleLine1: v }))} required />
                <FormField label="Description Line 2" value={tempHero.subtitleLine2} onChange={v => setTempHero(p => ({ ...p, subtitleLine2: v }))} required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField label="Button Label" value={tempHero.ctaText || 'Connect'} onChange={v => setTempHero(p => ({ ...p, ctaText: v }))} required />
                <FormField label="Button Link" value={tempHero.ctaUrl || '/connect'} onChange={v => setTempHero(p => ({ ...p, ctaUrl: v }))} required />
                <FormField label="Right-side Editorial Callout" value={tempHero.sideText} onChange={v => setTempHero(p => ({ ...p, sideText: v }))} required />
              </div>

              <button type="submit" className="py-3.5 bg-black text-white font-mono text-[10px] uppercase tracking-[0.25em] rounded-xs shadow-md cursor-pointer hover:bg-black/90">
                Save Hero Section Changes →
              </button>
            </form>
          </div>
        )}

        {/* ── 2. TRANSFORMATIONS TAB ── */}
        {activeTab === 'transformations' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-light">Transformations Case Studies</h2>
                <p className="font-sans text-xs text-black/60 mt-0.5">
                  Manage before & after dual images, narrative storytelling, and review cards.
                </p>
              </div>
              <button
                onClick={() => {
                  setTransformationForm(EMPTY_TRANSFORMATION);
                  setEditingId(null);
                  setView('add');
                }}
                className="px-4 py-2.5 bg-black text-white font-mono text-[9.5px] uppercase tracking-[0.2em] rounded-xs cursor-pointer hover:bg-black/80 flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
              >
                <span>+ Add Transformation</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {transformations.map(t => (
                <div key={t.id} className="bg-white border border-black/10 p-5 rounded-xs flex flex-col gap-4 shadow-2xs">
                  {/* Before & After Dual Thumbnails */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative aspect-[3/4] bg-black/5 rounded-xs overflow-hidden border border-black/10">
                      {t.beforeImg ? (
                        <img src={t.beforeImg} alt="Before" className="w-full h-full object-cover object-top" />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-black/30 font-mono text-[8px]">No Image</div>
                      )}
                      <span className="absolute top-1.5 left-1.5 bg-black/80 text-white px-1.5 py-0.5 text-[7px] font-mono uppercase rounded-xs">Before</span>
                    </div>
                    <div className="relative aspect-[3/4] bg-black/5 rounded-xs overflow-hidden border border-black/10">
                      {t.afterImg ? (
                        <img src={t.afterImg} alt="After" className="w-full h-full object-cover object-top" />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-black/30 font-mono text-[8px]">No Image</div>
                      )}
                      <span className="absolute top-1.5 left-1.5 bg-black/80 text-white px-1.5 py-0.5 text-[7px] font-mono uppercase rounded-xs">After</span>
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-black/50 block">{t.demographic}</span>
                    <h3 className="font-serif text-lg font-light mt-0.5">{t.client}</h3>
                    <p className="font-sans text-xs text-black/70 italic mt-0.5">"{t.concept}"</p>
                  </div>

                  {t.review && t.review.quote && (
                    <div className="p-3 bg-[#FAF9F6] border border-black/10 rounded-xs text-[11px] text-black/75">
                      <div className="flex items-center justify-between font-mono text-[8px] text-black/40 mb-1">
                        <span>Review Quote</span>
                        <span className="text-amber-500">{'★'.repeat(t.review.rating || 5)}</span>
                      </div>
                      <p className="line-clamp-2">"{t.review.quote}"</p>
                      <span className="block text-[9px] font-mono text-black/50 mt-1">— {t.review.author} ({t.review.location})</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2 border-t border-black/10 mt-auto">
                    <button
                      onClick={() => {
                        setTransformationForm({
                          client: t.client,
                          demographic: t.demographic,
                          concept: t.concept,
                          beforeImg: t.beforeImg,
                          afterImg: t.afterImg,
                          beforeStory: t.beforeStory,
                          afterStory: t.afterStory,
                          review: t.review || { rating: 5, quote: '', author: '', location: '' },
                        });
                        setEditingId(t.id);
                        setView('edit');
                      }}
                      className="flex-1 py-2 border border-black/20 font-mono text-[9px] uppercase tracking-wider rounded-xs hover:bg-black/5 cursor-pointer text-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete transformation for "${t.client}"?`)) {
                          deleteTransformation(t.id);
                          showToast();
                        }
                      }}
                      className="py-2 px-3 border border-red-200 text-red-600 font-mono text-[9px] uppercase tracking-wider rounded-xs hover:bg-red-50 cursor-pointer text-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 3. SERVICES TAB ── */}
        {activeTab === 'services' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-light">Services (What We Do)</h2>
                <p className="font-sans text-xs text-black/60 mt-0.5">
                  Update service cards, dedicated detail summaries, key points, and imagery.
                </p>
              </div>
              <button
                onClick={() => {
                  setServiceForm(EMPTY_SERVICE);
                  setEditingId(null);
                  setView('add');
                }}
                className="px-4 py-2.5 bg-black text-white font-mono text-[9.5px] uppercase tracking-[0.2em] rounded-xs cursor-pointer hover:bg-black/80 flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
              >
                <span>+ Add Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(s => (
                <div key={s.id} className="bg-white border border-black/10 p-5 rounded-xs flex flex-col gap-4 shadow-2xs">
                  <div className="relative aspect-[16/10] bg-black/5 rounded-xs overflow-hidden border border-black/10">
                    {s.image ? (
                      <img src={s.image} alt={s.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-black/30 font-mono text-[8px]">No Image</div>
                    )}
                    <span className="absolute top-2 left-2 bg-black/80 text-white px-2 py-0.5 text-[7.5px] font-mono uppercase rounded-xs">
                      {s.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-light">{s.name}</h3>
                    <p className="font-sans text-xs text-black/60 line-clamp-3 mt-1">{s.desc}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-black/10 mt-auto">
                    <button
                      onClick={() => {
                        setServiceForm({
                          category: s.category,
                          name: s.name,
                          desc: s.desc,
                          image: s.image,
                          summary: s.summary || '',
                          points: s.points || [],
                        });
                        setEditingId(s.id);
                        setView('edit');
                      }}
                      className="flex-1 py-2 border border-black/20 font-mono text-[9px] uppercase tracking-wider rounded-xs hover:bg-black/5 cursor-pointer text-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete service "${s.name}"?`)) {
                          deleteService(s.id);
                          showToast();
                        }
                      }}
                      className="py-2 px-3 border border-red-200 text-red-600 font-mono text-[9px] uppercase tracking-wider rounded-xs hover:bg-red-50 cursor-pointer text-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 4. LOOKBOOK TAB ── */}
        {activeTab === 'lookbook' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-light">Lookbook & High Fashion Gallery</h2>
                <p className="font-sans text-xs text-black/60 mt-0.5">
                  Manage haute couture gallery items, story notes, fabric tags, and imagery.
                </p>
              </div>
              <button
                onClick={() => {
                  setLookForm(EMPTY_LOOK);
                  setEditingId(null);
                  setView('add');
                }}
                className="px-4 py-2.5 bg-black text-white font-mono text-[9.5px] uppercase tracking-[0.2em] rounded-xs cursor-pointer hover:bg-black/80 flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
              >
                <span>+ Add Look</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {looks.map(l => (
                <div key={l.id} className="bg-white border border-black/10 p-4 rounded-xs flex flex-col gap-3 shadow-2xs">
                  <div className="relative aspect-[3/4] bg-black/5 rounded-xs overflow-hidden border border-black/10">
                    {l.image ? (
                      <img src={l.image} alt={l.title} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-black/30 font-mono text-[8px]">No Image</div>
                    )}
                    <span className="absolute top-2 left-2 bg-black/80 text-white px-2 py-0.5 text-[7.5px] font-mono uppercase rounded-xs">
                      LOOK {l.num}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-black/50 block">{l.category}</span>
                    <h3 className="font-serif text-base font-light mt-0.5">{l.title}</h3>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-black/10 mt-auto">
                    <button
                      onClick={() => {
                        setLookForm({
                          title: l.title,
                          category: l.category,
                          tag: l.tag,
                          concept: l.concept,
                          fabric: l.fabric,
                          story: l.story,
                          occasion: l.occasion,
                          image: l.image,
                        });
                        setEditingId(l.id);
                        setView('edit');
                      }}
                      className="flex-1 py-2 border border-black/20 font-mono text-[9px] uppercase tracking-wider rounded-xs hover:bg-black/5 cursor-pointer text-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete look "${l.title}"?`)) {
                          deleteLook(l.id);
                          showToast();
                        }
                      }}
                      className="py-2 px-3 border border-red-200 text-red-600 font-mono text-[9px] uppercase tracking-wider rounded-xs hover:bg-red-50 cursor-pointer text-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 5. ABOUT SECTION TAB ── */}
        {activeTab === 'about' && (
          <form onSubmit={(e) => {
            e.preventDefault();
            updateAbout(tempAbout);
            showToast();
          }} className="bg-white border border-black/10 p-5 sm:p-8 lg:p-10 rounded-xs flex flex-col gap-6 shadow-2xs">
            <div>
              <h2 className="font-serif text-2xl font-light">About Section Content</h2>
              <p className="font-sans text-xs text-black/60 mt-1">
                Edit the studio philosophy narrative, focal portrait, and editorial statement.
              </p>
            </div>

            <ImageUploadField image={tempAbout.creativeDirectorImage || ''} onImageChange={(img) => setTempAbout(p => ({ ...p, creativeDirectorImage: img }))} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Eyebrow Kicker" value={tempAbout.eyebrow} onChange={v => setTempAbout(p => ({ ...p, eyebrow: v }))} required />
              <FormField label="Title Line 1" value={tempAbout.titleLine1} onChange={v => setTempAbout(p => ({ ...p, titleLine1: v }))} required />
              <FormField label="Title Line 2" value={tempAbout.titleLine2} onChange={v => setTempAbout(p => ({ ...p, titleLine2: v }))} required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Philosophy Quote" value={tempAbout.philosophyQuote} onChange={v => setTempAbout(p => ({ ...p, philosophyQuote: v }))} required />
              <FormField label="Goal Quote" value={tempAbout.goalQuote} onChange={v => setTempAbout(p => ({ ...p, goalQuote: v }))} required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Story Paragraph 1 *</label>
              <textarea
                value={tempAbout.storyParagraph1}
                onChange={e => setTempAbout(p => ({ ...p, storyParagraph1: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40 resize-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Story Paragraph 2 *</label>
              <textarea
                value={tempAbout.storyParagraph2}
                onChange={e => setTempAbout(p => ({ ...p, storyParagraph2: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40 resize-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Story Paragraph 3 *</label>
              <textarea
                value={tempAbout.storyParagraph3}
                onChange={e => setTempAbout(p => ({ ...p, storyParagraph3: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Director Title" value={tempAbout.creativeDirectorTitle} onChange={v => setTempAbout(p => ({ ...p, creativeDirectorTitle: v }))} required />
              <FormField label="Director Name" value={tempAbout.creativeDirectorName} onChange={v => setTempAbout(p => ({ ...p, creativeDirectorName: v }))} required />
            </div>

            <button type="submit" className="py-3.5 bg-black text-white font-mono text-[10px] uppercase tracking-[0.25em] rounded-xs shadow-md cursor-pointer hover:bg-black/90">
              Save About Section Changes →
            </button>
          </form>
        )}

        {/* ── 6. MEET JENNIFER TAB ── */}
        {activeTab === 'meet' && (
          <form onSubmit={(e) => {
            e.preventDefault();
            updateMeet(tempMeet);
            showToast();
          }} className="bg-white border border-black/10 p-5 sm:p-8 lg:p-10 rounded-xs flex flex-col gap-6 shadow-2xs">
            <div>
              <h2 className="font-serif text-2xl font-light">Meet Jennifer Section</h2>
              <p className="font-sans text-xs text-black/60 mt-1">
                Edit personal stylist introduction, portrait photo, signature, and bio paragraphs.
              </p>
            </div>

            <ImageUploadField image={tempMeet.image || ''} onImageChange={(img) => setTempMeet(p => ({ ...p, image: img }))} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Eyebrow Kicker" value={tempMeet.eyebrow} onChange={v => setTempMeet(p => ({ ...p, kicker: v, eyebrow: v }))} required />
              <FormField label="Section Title" value={tempMeet.title} onChange={v => setTempMeet(p => ({ ...p, title: v }))} required />
              <FormField label="Role / Subtitle" value={tempMeet.subtitle} onChange={v => setTempMeet(p => ({ ...p, subtitle: v }))} required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Bio Overview Text *</label>
              <textarea
                value={tempMeet.bioText}
                onChange={e => setTempMeet(p => ({ ...p, bioText: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40 resize-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Personal Quote *</label>
              <textarea
                value={tempMeet.quote}
                onChange={e => setTempMeet(p => ({ ...p, quote: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Philosophy Accent Title" value={tempMeet.accentTitle} onChange={v => setTempMeet(p => ({ ...p, accentTitle: v }))} required />
              <FormField label="Philosophy Accent Text" value={tempMeet.accentText} onChange={v => setTempMeet(p => ({ ...p, accentText: v }))} required />
            </div>

            <button type="submit" className="py-3.5 bg-black text-white font-mono text-[10px] uppercase tracking-[0.25em] rounded-xs shadow-md cursor-pointer hover:bg-black/90">
              Save Meet Jennifer Changes →
            </button>
          </form>
        )}

        {/* ── 7. CLIENTELE (AUDIENCES) TAB ── */}
        {activeTab === 'audiences' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-light">Clientele Segments (Who We Style)</h2>
                <p className="font-sans text-xs text-black/60 mt-0.5">
                  Manage audience cards for professionals, brides, public figures, and entrepreneurs.
                </p>
              </div>
              <button
                onClick={() => {
                  setAudienceForm(EMPTY_AUDIENCE);
                  setEditingId(null);
                  setView('add');
                }}
                className="px-4 py-2.5 bg-black text-white font-mono text-[9.5px] uppercase tracking-[0.2em] rounded-xs cursor-pointer hover:bg-black/80 flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
              >
                <span>+ Add Segment</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {audiences.map(a => (
                <div key={a.id} className="bg-white border border-black/10 p-5 rounded-xs flex flex-col gap-4 shadow-2xs">
                  <div className="relative aspect-[16/9] bg-black/5 rounded-xs overflow-hidden border border-black/10">
                    {a.image ? (
                      <img src={a.image} alt={a.title} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-black/30 font-mono text-[8px]">No Image</div>
                    )}
                    <span className="absolute top-2 left-2 bg-black/80 text-white px-2 py-0.5 text-[7.5px] font-mono uppercase rounded-xs">
                      {a.keyword}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-light">{a.title}</h3>
                    <p className="font-sans text-xs text-black/60 mt-1 line-clamp-3">{a.desc}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-black/10 mt-auto">
                    <button
                      onClick={() => {
                        setAudienceForm({
                          keyword: a.keyword,
                          title: a.title,
                          desc: a.desc,
                          image: a.image,
                          slug: a.slug,
                        });
                        setEditingId(a.id);
                        setView('edit');
                      }}
                      className="flex-1 py-2 border border-black/20 font-mono text-[9px] uppercase tracking-wider rounded-xs hover:bg-black/5 cursor-pointer text-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete audience segment "${a.title}"?`)) {
                          deleteAudience(a.id);
                          showToast();
                        }
                      }}
                      className="py-2 px-3 border border-red-200 text-red-600 font-mono text-[9px] uppercase tracking-wider rounded-xs hover:bg-red-50 cursor-pointer text-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 8. JOURNAL ARTICLES TAB ── */}
        {activeTab === 'articles' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-light">Journal & Style Insights</h2>
                <p className="font-sans text-xs text-black/60 mt-0.5">
                  Manage articles, headlines, categories, excerpts, and thumbnail photos.
                </p>
              </div>
              <button
                onClick={() => {
                  setArticleForm(EMPTY_ARTICLE);
                  setEditingId(null);
                  setView('add');
                }}
                className="px-4 py-2.5 bg-black text-white font-mono text-[9.5px] uppercase tracking-[0.2em] rounded-xs cursor-pointer hover:bg-black/80 flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
              >
                <span>+ Add Article</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(art => (
                <div key={art.id} className="bg-white border border-black/10 p-5 rounded-xs flex flex-col gap-4 shadow-2xs">
                  <div className="relative aspect-[16/10] bg-black/5 rounded-xs overflow-hidden border border-black/10">
                    {art.image ? (
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-black/30 font-mono text-[8px]">No Image</div>
                    )}
                    <span className="absolute top-2 left-2 bg-black/80 text-white px-2 py-0.5 text-[7.5px] font-mono uppercase rounded-xs">
                      {art.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-base font-light">{art.title}</h3>
                    <p className="font-sans text-xs text-black/60 mt-1 line-clamp-2">{art.excerpt}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-black/10 mt-auto">
                    <button
                      onClick={() => {
                        setArticleForm({
                          title: art.title,
                          category: art.category,
                          image: art.image,
                          excerpt: art.excerpt,
                        });
                        setEditingId(art.id);
                        setView('edit');
                      }}
                      className="flex-1 py-2 border border-black/20 font-mono text-[9px] uppercase tracking-wider rounded-xs hover:bg-black/5 cursor-pointer text-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete article "${art.title}"?`)) {
                          deleteArticle(art.id);
                          showToast();
                        }
                      }}
                      className="py-2 px-3 border border-red-200 text-red-600 font-mono text-[9px] uppercase tracking-wider rounded-xs hover:bg-red-50 cursor-pointer text-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 9. REVIEWS & TESTIMONIALS TAB ── */}
        {activeTab === 'testimonials' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-light">Client Testimonials & Reviews</h2>
                <p className="font-sans text-xs text-black/60 mt-0.5">
                  Manage client review quotes, authors, roles, and locations.
                </p>
              </div>
              <button
                onClick={() => {
                  setTestimonialForm(EMPTY_TESTIMONIAL);
                  setEditingId(null);
                  setView('add');
                }}
                className="px-4 py-2.5 bg-black text-white font-mono text-[9.5px] uppercase tracking-[0.2em] rounded-xs cursor-pointer hover:bg-black/80 flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
              >
                <span>+ Add Review</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map(t => (
                <div key={t.id} className="bg-white border border-black/10 p-5 rounded-xs flex flex-col gap-3 shadow-2xs">
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    ★★★★★
                  </div>
                  <p className="font-serif text-sm font-light text-black/85 italic leading-relaxed line-clamp-4">
                    "{t.text}"
                  </p>
                  <div className="pt-2 border-t border-black/10 mt-auto">
                    <h4 className="font-serif text-sm font-light">{t.name}</h4>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-black/50 block">
                      {t.role} • {t.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        setTestimonialForm({
                          name: t.name,
                          role: t.role,
                          location: t.location,
                          text: t.text,
                          avatar: t.avatar,
                        });
                        setEditingId(t.id);
                        setView('edit');
                      }}
                      className="flex-1 py-1.5 border border-black/20 font-mono text-[8.5px] uppercase tracking-wider rounded-xs hover:bg-black/5 cursor-pointer text-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete testimonial from "${t.name}"?`)) {
                          deleteTestimonial(t.id);
                          showToast();
                        }
                      }}
                      className="py-1.5 px-3 border border-red-200 text-red-600 font-mono text-[8.5px] uppercase tracking-wider rounded-xs hover:bg-red-50 cursor-pointer text-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 10. STUDIO & CONTACT TAB ── */}
        {activeTab === 'contact' && (
          <form onSubmit={(e) => {
            e.preventDefault();
            updateContact(tempContact);
            showToast();
          }} className="bg-white border border-black/10 p-5 sm:p-8 lg:p-10 rounded-xs flex flex-col gap-6 shadow-2xs">
            <div>
              <h2 className="font-serif text-2xl font-light">Studio & Atelier Contact Information</h2>
              <p className="font-sans text-xs text-black/60 mt-1">
                Update client consultation studio address, phone, direct email, hours, and social media.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Contact Heading" value={tempContact.heading} onChange={v => setTempContact(p => ({ ...p, heading: v }))} required />
              <FormField label="Studio Street Address" value={tempContact.address} onChange={v => setTempContact(p => ({ ...p, address: v }))} required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Consultation Phone" value={tempContact.phone} onChange={v => setTempContact(p => ({ ...p, phone: v }))} required />
              <FormField label="Atelier Email" value={tempContact.email} onChange={v => setTempContact(p => ({ ...p, email: v }))} required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Consultation Hours" value={tempContact.hours} onChange={v => setTempContact(p => ({ ...p, hours: v }))} required />
              <FormField label="WhatsApp Direct Phone" value={tempContact.whatsappPhone || ''} onChange={v => setTempContact(p => ({ ...p, whatsappPhone: v }))} placeholder="e.g. 918078341747" />
              <FormField label="Instagram Link" value={tempContact.instagramUrl || ''} onChange={v => setTempContact(p => ({ ...p, instagramUrl: v }))} placeholder="https://instagram.com/..." />
            </div>

            <button type="submit" className="py-3.5 bg-black text-white font-mono text-[10px] uppercase tracking-[0.25em] rounded-xs shadow-md cursor-pointer hover:bg-black/90">
              Save Contact Information Changes →
            </button>
          </form>
        )}

        {/* ── 11. MAKEOVER CTA BANNER TAB ── */}
        {activeTab === 'cta' && (
          <form onSubmit={(e) => {
            e.preventDefault();
            updateCtaBanner(tempCta);
            showToast();
          }} className="bg-white border border-black/10 p-5 sm:p-8 lg:p-10 rounded-xs flex flex-col gap-6 shadow-2xs">
            <div>
              <h2 className="font-serif text-2xl font-light">Makeover Call-To-Action Banner</h2>
              <p className="font-sans text-xs text-black/60 mt-1">
                Update the conversion banner shown at the bottom of the Home and Transformations pages.
              </p>
            </div>

            <FormField label="Eyebrow Kicker" value={tempCta.kicker} onChange={v => setTempCta(p => ({ ...p, kicker: v }))} placeholder="e.g. BESPOKE STYLING" required />
            <FormField label="Main Banner Headline" value={tempCta.title} onChange={v => setTempCta(p => ({ ...p, title: v }))} placeholder="e.g. Ready for Your Complete Style Makeover?" required />

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Banner Subtitle / Value Proposition *</label>
              <textarea
                value={tempCta.subtitle}
                onChange={e => setTempCta(p => ({ ...p, subtitle: e.target.value }))}
                rows={3}
                placeholder="e.g. Discover an intentional wardrobe designed around your silhouette and authentic presence."
                className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40 resize-none"
                required
              />
            </div>

            <FormField label="Button Label Text" value={tempCta.buttonText} onChange={v => setTempCta(p => ({ ...p, buttonText: v }))} placeholder="e.g. Book The Makeover" required />

            <div className="p-5 bg-[#1A1A1A] text-white rounded-xs flex flex-col gap-2">
              <span className="font-mono text-[8px] uppercase tracking-wider text-white/50">{tempCta.kicker || 'BESPOKE STYLING'}</span>
              <h3 className="font-serif text-lg font-light text-white">
                {tempCta.title || 'Ready for Your Complete Style Makeover?'}
              </h3>
              <p className="font-sans text-xs text-white/70 max-w-xl">
                {tempCta.subtitle || 'Discover an intentional wardrobe designed around your silhouette and authentic presence.'}
              </p>
              <div className="pt-2">
                <span className="inline-block px-5 py-2.5 bg-white text-black font-mono text-[9px] uppercase tracking-[0.2em] font-semibold rounded-xs">
                  {tempCta.buttonText || 'Book The Makeover'} →
                </span>
              </div>
            </div>

            <button type="submit" className="py-3.5 bg-black text-white font-mono text-[10px] uppercase tracking-[0.25em] rounded-xs shadow-md cursor-pointer hover:bg-black/90">
              Save Makeover CTA Changes →
            </button>
          </form>
        )}

        {/* ── 12. RESPONSIVE & DEVICE CONTROLS TAB ── */}
        {activeTab === 'responsive' && (
          <div className="flex flex-col gap-8">
            <form onSubmit={(e) => {
              e.preventDefault();
              updateResponsive(tempResponsive);
              showToast();
            }} className="bg-white border border-black/10 p-5 sm:p-8 lg:p-10 rounded-xs flex flex-col gap-8 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-6">
                <div>
                  <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-black/40 font-bold block">
                    DEVICE LAYOUT & RESPONSIVE CALIBRATION
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-light mt-1">
                    Responsive Device Engine
                  </h2>
                  <p className="font-sans text-xs text-black/60 mt-1 max-w-xl">
                    Configure viewport heights, responsive columns, image framing, typography scaling, and auto-scroll speeds for phones, tablets, and desktop screens.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowDeviceSimulatorModal(true)}
                  className="self-start sm:self-auto px-4 py-2 bg-black text-white hover:bg-black/85 font-mono text-[9px] uppercase tracking-[0.2em] rounded-xs cursor-pointer flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>⛶ Open Fullscreen Simulator</span>
                </button>
              </div>

              {/* CARD 1: HERO SECTION */}
              <div className="flex flex-col gap-5 p-5 sm:p-6 bg-[#FAF9F6] border border-black/10 rounded-xs">
                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🌟</span>
                    <h3 className="font-serif text-lg font-light">Hero Section Responsiveness</h3>
                  </div>
                  <span className="font-mono text-[8px] tracking-wider uppercase bg-black/5 text-black/60 px-2 py-0.5 rounded-xs">
                    Desktop + Mobile Framing
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[8.5px] tracking-[0.25em] uppercase text-black/60 font-bold">
                      Desktop Image Vertical Lift (objectPosition)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {['center 45%', 'center 50%', 'center 55%', 'center 60%'].map(pos => (
                        <button
                          key={pos}
                          type="button"
                          onClick={() => setTempResponsive(p => ({ ...p, heroDesktopImagePosition: pos }))}
                          className={`px-2.5 py-1 text-[9px] font-mono rounded-xs border cursor-pointer transition-colors ${
                            tempResponsive.heroDesktopImagePosition === pos
                              ? 'bg-black text-white border-black font-semibold'
                              : 'bg-white text-black/70 border-black/15 hover:border-black/40'
                          }`}
                        >
                          {pos}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={tempResponsive.heroDesktopImagePosition}
                      onChange={e => setTempResponsive(p => ({ ...p, heroDesktopImagePosition: e.target.value }))}
                      placeholder="e.g. center 50%"
                      className="mt-1 px-3.5 py-2 border border-black/15 bg-white font-mono text-xs rounded-xs outline-none focus:border-black/40"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[8.5px] tracking-[0.25em] uppercase text-black/60 font-bold">
                      Mobile Image Vertical Focus (objectPosition)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {['center 10%', 'center 15%', 'center 25%', 'center 50%'].map(pos => (
                        <button
                          key={pos}
                          type="button"
                          onClick={() => setTempResponsive(p => ({ ...p, heroMobileImagePosition: pos }))}
                          className={`px-2.5 py-1 text-[9px] font-mono rounded-xs border cursor-pointer transition-colors ${
                            tempResponsive.heroMobileImagePosition === pos
                              ? 'bg-black text-white border-black font-semibold'
                              : 'bg-white text-black/70 border-black/15 hover:border-black/40'
                          }`}
                        >
                          {pos}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={tempResponsive.heroMobileImagePosition}
                      onChange={e => setTempResponsive(p => ({ ...p, heroMobileImagePosition: e.target.value }))}
                      placeholder="e.g. center 15%"
                      className="mt-1 px-3.5 py-2 border border-black/15 bg-white font-mono text-xs rounded-xs outline-none focus:border-black/40"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[8.5px] tracking-[0.25em] uppercase text-black/60 font-bold">
                      Desktop Hero Headline Scale
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'compact', label: 'Compact', detail: '38px' },
                        { id: 'standard', label: 'Standard', detail: '44px' },
                        { id: 'editorial', label: 'Editorial', detail: '52px' },
                      ].map(item => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setTempResponsive(p => ({ ...p, heroDesktopTitleSize: item.id as any }))}
                          className={`p-2.5 flex flex-col items-center justify-center rounded-xs border text-center cursor-pointer transition-colors ${
                            tempResponsive.heroDesktopTitleSize === item.id
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-black/70 border-black/15 hover:border-black/40'
                          }`}
                        >
                          <span className="font-mono text-[9.5px] uppercase font-bold">{item.label}</span>
                          <span className="text-[8px] opacity-60 font-mono">{item.detail}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[8.5px] tracking-[0.25em] uppercase text-black/60 font-bold">
                      Mobile Hero Headline Scale
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'compact', label: 'Compact', detail: '22px' },
                        { id: 'standard', label: 'Standard', detail: '28px' },
                        { id: 'prominent', label: 'Prominent', detail: '32px' },
                      ].map(item => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setTempResponsive(p => ({ ...p, heroMobileTitleSize: item.id as any }))}
                          className={`p-2.5 flex flex-col items-center justify-center rounded-xs border text-center cursor-pointer transition-colors ${
                            tempResponsive.heroMobileTitleSize === item.id
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-black/70 border-black/15 hover:border-black/40'
                          }`}
                        >
                          <span className="font-mono text-[9.5px] uppercase font-bold">{item.label}</span>
                          <span className="text-[8px] opacity-60 font-mono">{item.detail}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: TRANSFORMATIONS */}
              <div className="flex flex-col gap-5 p-5 sm:p-6 bg-[#FAF9F6] border border-black/10 rounded-xs">
                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🔄</span>
                    <h3 className="font-serif text-lg font-light">Transformations Section Responsiveness</h3>
                  </div>
                  <span className="font-mono text-[8px] tracking-wider uppercase bg-black/5 text-black/60 px-2 py-0.5 rounded-xs">
                    Dual Stage & Auto-Cycle
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[8.5px] tracking-[0.25em] uppercase text-black/60 font-bold">
                      Desktop Dual-Image Height
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {['580px', '640px', '700px'].map(h => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setTempResponsive(p => ({ ...p, transformationsDesktopHeight: h }))}
                          className={`px-2.5 py-1 text-[9px] font-mono rounded-xs border cursor-pointer transition-colors ${
                            tempResponsive.transformationsDesktopHeight === h
                              ? 'bg-black text-white border-black font-semibold'
                              : 'bg-white text-black/70 border-black/15 hover:border-black/40'
                          }`}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={tempResponsive.transformationsDesktopHeight}
                      onChange={e => setTempResponsive(p => ({ ...p, transformationsDesktopHeight: e.target.value }))}
                      placeholder="e.g. 640px"
                      className="mt-1 px-3.5 py-2 border border-black/15 bg-white font-mono text-xs rounded-xs outline-none focus:border-black/40"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[8.5px] tracking-[0.25em] uppercase text-black/60 font-bold">
                      Mobile Stage Height (Viewport %)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {['48vh', '55vh', '65vh'].map(h => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setTempResponsive(p => ({ ...p, transformationsMobileHeight: h }))}
                          className={`px-2.5 py-1 text-[9px] font-mono rounded-xs border cursor-pointer transition-colors ${
                            tempResponsive.transformationsMobileHeight === h
                              ? 'bg-black text-white border-black font-semibold'
                              : 'bg-white text-black/70 border-black/15 hover:border-black/40'
                          }`}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={tempResponsive.transformationsMobileHeight}
                      onChange={e => setTempResponsive(p => ({ ...p, transformationsMobileHeight: e.target.value }))}
                      placeholder="e.g. 55vh"
                      className="mt-1 px-3.5 py-2 border border-black/15 bg-white font-mono text-xs rounded-xs outline-none focus:border-black/40"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[8.5px] tracking-[0.25em] uppercase text-black/60 font-bold">
                      Auto-Cycle Timer (Seconds)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { sec: 0, label: '0s (Paused)' },
                        { sec: 6, label: '6s' },
                        { sec: 9, label: '9s' },
                        { sec: 12, label: '12s' },
                      ].map(item => (
                        <button
                          key={item.sec}
                          type="button"
                          onClick={() => setTempResponsive(p => ({ ...p, transformationsCycleSpeed: item.sec }))}
                          className={`px-2 py-1 text-[9px] font-mono rounded-xs border cursor-pointer transition-colors ${
                            tempResponsive.transformationsCycleSpeed === item.sec
                              ? 'bg-black text-white border-black font-semibold'
                              : 'bg-white text-black/70 border-black/15 hover:border-black/40'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={tempResponsive.transformationsCycleSpeed}
                      onChange={e => setTempResponsive(p => ({ ...p, transformationsCycleSpeed: Number(e.target.value) }))}
                      className="mt-1 px-3.5 py-2 border border-black/15 bg-white font-mono text-xs rounded-xs outline-none focus:border-black/40"
                    />
                    <span className="font-sans text-[10px] text-black/40">Set to 0 to disable auto-rotation and use manual navigation</span>
                  </div>
                </div>
              </div>

              {/* CARD 3: SERVICES */}
              <div className="flex flex-col gap-5 p-5 sm:p-6 bg-[#FAF9F6] border border-black/10 rounded-xs">
                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">✦</span>
                    <h3 className="font-serif text-lg font-light">Services Section Responsiveness</h3>
                  </div>
                  <span className="font-mono text-[8px] tracking-wider uppercase bg-black/5 text-black/60 px-2 py-0.5 rounded-xs">
                    Mobile Auto-Scroll + Desktop Sticky
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[8.5px] tracking-[0.25em] uppercase text-black/60 font-bold">
                      Mobile Services Auto-Carousel Speed (Seconds)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { sec: 0, label: '0s (Manual Swipe)' },
                        { sec: 5, label: '5s (Fast)' },
                        { sec: 7, label: '7s (Standard)' },
                        { sec: 10, label: '10s (Relaxed)' },
                      ].map(item => (
                        <button
                          key={item.sec}
                          type="button"
                          onClick={() => setTempResponsive(p => ({ ...p, servicesMobileCarouselSpeed: item.sec }))}
                          className={`px-2.5 py-1 text-[9px] font-mono rounded-xs border cursor-pointer transition-colors ${
                            tempResponsive.servicesMobileCarouselSpeed === item.sec
                              ? 'bg-black text-white border-black font-semibold'
                              : 'bg-white text-black/70 border-black/15 hover:border-black/40'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={tempResponsive.servicesMobileCarouselSpeed}
                      onChange={e => setTempResponsive(p => ({ ...p, servicesMobileCarouselSpeed: Number(e.target.value) }))}
                      className="mt-1 px-3.5 py-2 border border-black/15 bg-white font-mono text-xs rounded-xs outline-none focus:border-black/40"
                    />
                    <span className="font-sans text-[10px] text-black/40">Set to 0 to disable auto-slide on touch screens</span>
                  </div>

                  <div className="p-4 bg-white border border-black/10 rounded-xs flex flex-col justify-center gap-1.5">
                    <span className="font-mono text-[8.5px] uppercase tracking-wider text-black/40 font-bold">DESKTOP SCROLL BEHAVIOR</span>
                    <p className="font-serif text-sm font-light text-black">
                      Scroll-Linked Sticky Viewport (Fluid Spring Physics)
                    </p>
                    <p className="font-sans text-[11px] text-black/60 leading-relaxed">
                      On desktop computers & laptops, Services automatically lock smoothly in viewport while scrolling down, cycling through all {services.length} services naturally.
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 4: LOOKBOOK & GALLERY */}
              <div className="flex flex-col gap-5 p-5 sm:p-6 bg-[#FAF9F6] border border-black/10 rounded-xs">
                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📸</span>
                    <h3 className="font-serif text-lg font-light">Lookbook & Gallery Responsiveness</h3>
                  </div>
                  <span className="font-mono text-[8px] tracking-wider uppercase bg-black/5 text-black/60 px-2 py-0.5 rounded-xs">
                    Grid Columns + Mobile Speed
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[8.5px] tracking-[0.25em] uppercase text-black/60 font-bold">
                      Desktop Grid Presentation Columns
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { cols: '2', label: '2 Columns', desc: 'Editorial Focus' },
                        { cols: '3', label: '3 Columns', desc: 'Classic Standard' },
                        { cols: '4', label: '4 Columns', desc: 'Catalog Dense' },
                      ].map(item => (
                        <button
                          key={item.cols}
                          type="button"
                          onClick={() => setTempResponsive(p => ({ ...p, lookbookDesktopColumns: Number(item.cols) }))}
                          className={`p-3 flex flex-col items-center justify-center rounded-xs border text-center cursor-pointer transition-colors ${
                            String(tempResponsive.lookbookDesktopColumns) === item.cols
                              ? 'bg-black text-white border-black font-semibold'
                              : 'bg-white text-black/70 border-black/15 hover:border-black/40'
                          }`}
                        >
                          <span className="font-mono text-[10px] uppercase font-bold">{item.label}</span>
                          <span className="text-[8px] opacity-60 font-mono mt-0.5">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[8.5px] tracking-[0.25em] uppercase text-black/60 font-bold">
                      Mobile Lookbook Auto-Carousel Speed (Seconds)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { sec: 0, label: '0s (Manual)' },
                        { sec: 3, label: '3s (Swift)' },
                        { sec: 4, label: '4s (Default)' },
                        { sec: 6, label: '6s (Slow)' },
                      ].map(item => (
                        <button
                          key={item.sec}
                          type="button"
                          onClick={() => setTempResponsive(p => ({ ...p, lookbookMobileCarouselSpeed: item.sec }))}
                          className={`px-2.5 py-1 text-[9px] font-mono rounded-xs border cursor-pointer transition-colors ${
                            tempResponsive.lookbookMobileCarouselSpeed === item.sec
                              ? 'bg-black text-white border-black font-semibold'
                              : 'bg-white text-black/70 border-black/15 hover:border-black/40'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={tempResponsive.lookbookMobileCarouselSpeed}
                      onChange={e => setTempResponsive(p => ({ ...p, lookbookMobileCarouselSpeed: Number(e.target.value) }))}
                      className="mt-1 px-3.5 py-2 border border-black/15 bg-white font-mono text-xs rounded-xs outline-none focus:border-black/40"
                    />
                    <span className="font-sans text-[10px] text-black/40">Set to 0 to disable auto-cycling on mobile touch devices</span>
                  </div>
                </div>
              </div>

              {/* REAL-TIME INTERACTIVE LIVE WEBSITE DEVICE SIMULATOR */}
              <div className="flex flex-col gap-5 p-5 sm:p-6 bg-[#181818] text-white rounded-xs border border-black/20 shadow-lg">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="font-mono text-[8.5px] tracking-[0.3em] uppercase text-white/50 font-bold block">
                      ✦ LIVE INTERACTIVE WEBSITE SIMULATOR
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-light text-white mt-0.5">
                      How Pictures & Writings Look on Every Device
                    </h3>
                    <p className="font-sans text-[11px] text-white/60 mt-0.5 max-w-xl">
                      Experience the live website exactly as your clients see it on iPhones, Android phones, iPads, and desktop monitors. Test font readability, image framing, and responsive breakpoints in real time.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowDeviceSimulatorModal(true)}
                    className="self-start lg:self-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-[9px] uppercase tracking-[0.2em] rounded-xs cursor-pointer flex items-center gap-1.5 transition-colors"
                  >
                    <span>⛶ Expand Simulator</span>
                  </button>
                </div>

                {/* Device Selector & Zoom Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/5 border border-white/10 rounded-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-white/40 font-bold mr-1">DEVICE:</span>
                    {[
                      { id: 'mobile', label: '📱 iPhone (390px)', w: 390, s: 1 },
                      { id: 'mobile-mini', label: '📱 Compact (360px)', w: 360, s: 1 },
                      { id: 'tablet', label: '📟 iPad (768px)', w: 768, s: 0.9 },
                      { id: 'desktop', label: '💻 Desktop (1240px)', w: 1240, s: 0.72 },
                      { id: 'custom', label: '📐 Custom', w: simulatorWidth, s: 1 },
                    ].map(dev => (
                      <button
                        key={dev.id}
                        type="button"
                        onClick={() => {
                          setSimulatorDevice(dev.id as any);
                          if (dev.id !== 'custom') {
                            setSimulatorWidth(dev.w);
                            setSimulatorScale(dev.s);
                          }
                        }}
                        className={`px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider rounded-xs cursor-pointer transition-all ${
                          simulatorDevice === dev.id
                            ? 'bg-white text-black font-semibold shadow-xs'
                            : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        {dev.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-white/40 font-bold mr-1">ZOOM:</span>
                    {[
                      { scale: 1, label: '100%' },
                      { scale: 0.85, label: '85%' },
                      { scale: 0.72, label: '72%' },
                      { scale: 0.55, label: '55%' },
                    ].map(z => (
                      <button
                        key={z.scale}
                        type="button"
                        onClick={() => setSimulatorScale(z.scale)}
                        className={`px-2 py-1 font-mono text-[8.5px] rounded-xs cursor-pointer transition-colors ${
                          simulatorScale === z.scale
                            ? 'bg-amber-400 text-black font-bold'
                            : 'bg-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        {z.label}
                      </button>
                    ))}
                  </div>
                </div>

                {simulatorDevice === 'custom' && (
                  <div className="flex items-center gap-4 px-3 py-2 bg-white/5 border border-white/10 rounded-xs">
                    <span className="font-mono text-[8.5px] uppercase tracking-wider text-white/60 font-bold">
                      CUSTOM VIEWPORT WIDTH: {simulatorWidth}px
                    </span>
                    <input
                      type="range"
                      min="320"
                      max="1400"
                      step="10"
                      value={simulatorWidth}
                      onChange={e => setSimulatorWidth(Number(e.target.value))}
                      className="flex-1 accent-white cursor-pointer"
                    />
                    <div className="flex gap-1">
                      {[375, 414, 768, 1024, 1280].map(px => (
                        <button
                          key={px}
                          type="button"
                          onClick={() => setSimulatorWidth(px)}
                          className="px-2 py-0.5 bg-white/10 text-[8px] font-mono text-white/80 rounded-xs hover:bg-white/20 cursor-pointer"
                        >
                          {px}px
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Page Navigation Quick Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-white/40 font-bold mr-1">PAGE:</span>
                    {[
                      { path: '/', label: '🏠 Home' },
                      { path: '/#transformations', label: '🔄 Transformations' },
                      { path: '/#services', label: '✦ Services' },
                      { path: '/lookbook', label: '📸 Lookbook' },
                      { path: '/about', label: '📖 About' },
                      { path: '/connect', label: '📍 Connect' },
                    ].map(pg => (
                      <button
                        key={pg.path}
                        type="button"
                        onClick={() => {
                          setSimulatorPage(pg.path);
                          setSimulatorIframeKey(k => k + 1);
                        }}
                        className={`px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-wider rounded-xs cursor-pointer transition-colors ${
                          simulatorPage === pg.path
                            ? 'bg-amber-400 text-black font-semibold'
                            : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        {pg.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSimulatorIframeKey(k => k + 1)}
                      className="px-2.5 py-1 bg-white/15 hover:bg-white/25 text-white font-mono text-[8.5px] uppercase tracking-wider rounded-xs cursor-pointer flex items-center gap-1 transition-colors"
                      title="Reload website in device"
                    >
                      <span>↻ Refresh Preview</span>
                    </button>
                    <a
                      href={simulatorPage}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 bg-white/15 hover:bg-white/25 text-white font-mono text-[8.5px] uppercase tracking-wider rounded-xs flex items-center gap-1 transition-colors"
                      title="Open page in a real browser tab"
                    >
                      <span>↗ Open Full Site</span>
                    </a>
                  </div>
                </div>

                {/* Device Frame Viewport Container */}
                <div className="w-full flex justify-center py-6 bg-[#0E0E0E] rounded-xs border border-white/10 overflow-x-auto min-h-[500px]">
                  <div className="flex flex-col items-center">
                    <div 
                      style={{ width: `${Math.round(targetWidth * simulatorScale)}px` }}
                      className="bg-[#242424] text-white px-3 sm:px-4 py-2 flex items-center justify-between border-t border-x border-white/15 rounded-t-xl transition-all duration-200"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
                        <span className="ml-2 font-mono text-[8.5px] text-white/50 tracking-wider">
                          {targetWidth}px × {targetHeight}px ({Math.round(simulatorScale * 100)}% zoom)
                        </span>
                      </div>
                      <div className="font-mono text-[8px] text-white/40 tracking-wider uppercase px-2 py-0.5 bg-black/40 rounded-xs truncate max-w-[220px]">
                        stylewithj.com{simulatorPage}
                      </div>
                    </div>

                    <div
                      style={{
                        width: `${Math.round(targetWidth * simulatorScale)}px`,
                        height: `${Math.round(targetHeight * simulatorScale)}px`,
                        overflow: 'hidden',
                      }}
                      className="bg-white rounded-b-xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] border-b border-x border-white/15 relative transition-all duration-200"
                    >
                      <iframe
                        key={simulatorIframeKey}
                        src={simulatorPage}
                        style={{
                          width: `${targetWidth}px`,
                          height: `${targetHeight}px`,
                          transform: `scale(${simulatorScale})`,
                          transformOrigin: 'top left',
                        }}
                        className="border-0 bg-[#FAF9F6] w-full h-full"
                        title="Live Website Device Responsive Simulator"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[9px] font-mono text-white/40 px-1">
                  <span>✦ Interacting inside the simulator: You can scroll, click buttons, and browse pages just like a client on that device.</span>
                  <span>Viewport Breakpoint: {targetWidth < 640 ? 'Mobile Screen (< 640px)' : targetWidth < 1024 ? 'Tablet Screen (640px - 1023px)' : 'Desktop Screen (≥ 1024px)'}</span>
                </div>
              </div>

              <button
                type="submit"
                className="py-3.5 bg-black text-white font-mono text-[10px] uppercase tracking-[0.25em] rounded-xs shadow-md cursor-pointer hover:bg-black/90 transition-all"
              >
                Save Responsive & Device Changes →
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

// ── REUSABLE HELPER COMPONENTS (MOBILE & DESKTOP TUNED) ──
function FormWrapper({ title, onBack, children }: { title: string; onBack: () => void; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      <header className="border-b border-black/10 bg-white/95 backdrop-blur-xs sticky top-0 z-50 px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button 
            onClick={onBack} 
            className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-black/60 hover:text-black transition-colors cursor-pointer flex items-center gap-1"
          >
            ← Back
          </button>
          <span className="font-mono text-[9px] text-black/30">|</span>
          <span className="font-serif text-base sm:text-lg font-light truncate">{title}</span>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {children}
      </div>
    </div>
  );
}

function ImageUploadField({ image, onImageChange }: { image: string; onImageChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-3 p-4 sm:p-5 bg-[#EFECE6]/60 border border-black/10 rounded-xs">
      <div className="flex items-center justify-between">
        <label className="font-mono text-[8.5px] tracking-[0.25em] uppercase text-black/60 font-bold">
          IMAGE FILE OR URL <span className="text-red-500">*</span>
        </label>
        <span className="font-sans text-[10px] text-black/50">Upload file OR paste path</span>
      </div>

      {image && (
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#D8D4CC] rounded-xs border border-black/10 shadow-sm">
          <img src={image} alt="Preview" className="w-full h-full object-cover object-top" />
          <div className="absolute top-2.5 left-2.5 bg-black/80 text-white px-2.5 py-0.5 text-[7.5px] tracking-[0.2em] font-mono uppercase rounded-xs">
            ✦ Preview
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center">
        <label className="flex-shrink-0 cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#1A1A1A] hover:bg-black text-white text-[9.5px] tracking-[0.2em] uppercase font-mono font-semibold transition-all rounded-xs shadow-sm">
          <span>📁 Choose File</span>
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
        <input
          type="text"
          value={image}
          onChange={(e) => onImageChange(e.target.value)}
          placeholder="Or paste /images/hero/photo.png or web URL..."
          className="flex-1 px-4 py-2.5 border border-black/15 bg-white font-mono text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40"
        />
      </div>
    </div>
  );
}

function FormField({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required 
}: { 
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
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] rounded-xs outline-none focus:border-black/40"
      />
    </div>
  );
}

function SubmitButtons({ isAdd, onCancel }: { isAdd: boolean; onCancel: () => void }) {
  return (
    <div className="flex items-center gap-3 pt-4 border-t border-black/10">
      <button
        type="submit"
        className="flex-1 py-3.5 bg-black text-white font-mono text-[10px] uppercase tracking-[0.25em] rounded-xs shadow-md cursor-pointer hover:bg-black/90 font-semibold"
      >
        {isAdd ? 'Create Entry →' : 'Update & Save Changes →'}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-3.5 border border-black/20 font-mono text-[10px] uppercase tracking-[0.2em] rounded-xs hover:bg-black/5 cursor-pointer"
      >
        Cancel
      </button>
    </div>
  );
}
