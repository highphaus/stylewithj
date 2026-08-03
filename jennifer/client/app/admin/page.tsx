'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Look } from '@/lib/looks-data';
import { useLooks } from '@/lib/use-looks';

const ADMIN_PASSWORD = 'stylewithj2024';

const EMPTY_FORM: Omit<Look, 'id' | 'num'> = {
  title: '',
  category: '',
  tag: 'WESTERN',
  concept: '',
  fabric: '',
  story: '',
  occasion: '',
  image: '',
};

type FormData = Omit<Look, 'id' | 'num'>;

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const { looks, isLoaded, addLook, updateLook, deleteLook, resetToSeed } = useLooks();

  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('swj_admin');
    if (stored === 'true') setAuthed(true);
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('swj_admin', 'true');
      setAuthed(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password.');
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('swj_admin');
    setAuthed(false);
    setPassword('');
  }

  function openAdd() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setView('add');
  }

  function openEdit(look: Look) {
    const { id, num, ...rest } = look;
    setForm(rest);
    setEditingId(id);
    setView('edit');
  }

  function handleFormChange(key: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (view === 'add') {
      addLook(form);
    } else if (view === 'edit' && editingId) {
      updateLook(editingId, form);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setView('list');
  }

  function handleDelete(id: string) {
    deleteLook(id);
    setDeleteConfirm(null);
  }

  // ── LOGIN GATE ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center">
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-black/40 block mb-2 font-semibold">STYLE WITH J</span>
            <h1 className="font-serif text-3xl font-light text-[#1A1A1A]">Admin Panel</h1>
            <p className="font-sans text-xs text-black/50 mt-2">Enter your password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-sm text-[#1A1A1A] placeholder-black/30 rounded-xs outline-none focus:border-black/40 transition-colors"
              autoFocus
            />
            {authError && (
              <p className="text-[10px] font-mono text-red-600 tracking-[0.15em]">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase font-mono font-semibold hover:bg-black transition-colors rounded-xs"
            >
              Sign In →
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── FORM: ADD / EDIT ──
  if (view === 'add' || view === 'edit') {
    return (
      <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
        <header className="border-b border-black/10 bg-white sticky top-0 z-50 px-6 sm:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setView('list')} className="font-mono text-[9px] tracking-[0.25em] uppercase text-black/50 hover:text-black transition-colors">← Back</button>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/30">|</span>
            <span className="font-serif text-lg font-light">{view === 'add' ? 'Add New Look' : 'Edit Look'}</span>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-6 sm:px-12 py-12">
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            {/* Image Preview */}
            {form.image && (
              <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#EFECE6] rounded-xs border border-black/10">
                <img src={form.image} alt="Preview" className="w-full h-full object-cover object-top" />
              </div>
            )}

            <FormField label="Image Path or URL" value={form.image} onChange={v => handleFormChange('image', v)} placeholder="e.g. /images/includes/IMG_0267.JPG.jpeg" required />
            <FormField label="Title" value={form.title} onChange={v => handleFormChange('title', v)} placeholder="Look title" required />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Category (displayed)" value={form.category} onChange={v => handleFormChange('category', v)} placeholder="e.g. RESORT & DESTINATION" required />
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Filter Tag</label>
                <select
                  value={form.tag}
                  onChange={e => handleFormChange('tag', e.target.value)}
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
              <FormField label="Concept" value={form.concept} onChange={v => handleFormChange('concept', v)} placeholder="e.g. Monochrome Fluidity" required />
              <FormField label="Fabric & Drape" value={form.fabric} onChange={v => handleFormChange('fabric', v)} placeholder="e.g. Bias-Cut Polka Dot Silk Crepe" required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">Story & Styling Notes <span className="text-red-500">*</span></label>
              <textarea
                value={form.story}
                onChange={e => handleFormChange('story', e.target.value)}
                rows={5}
                placeholder="Write the editorial story and styling notes for this look..."
                className="w-full px-4 py-3 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] placeholder-black/30 rounded-xs outline-none focus:border-black/40 resize-none"
                required
              />
            </div>

            <FormField label="Occasion" value={form.occasion} onChange={v => handleFormChange('occasion', v)} placeholder="e.g. Vacation Edits, Coastal Resort & Romantic Dates" required />

            <div className="flex items-center gap-3 pt-4 border-t border-black/10">
              <button
                type="submit"
                className="flex-1 py-3 bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase font-mono font-semibold hover:bg-black transition-colors rounded-xs"
              >
                {view === 'add' ? 'Add Look →' : 'Save Changes →'}
              </button>
              <button
                type="button"
                onClick={() => setView('list')}
                className="px-6 py-3 border border-black/20 text-[10px] tracking-[0.25em] uppercase font-mono text-black/60 hover:text-black hover:border-black/40 transition-colors rounded-xs"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ── MAIN DASHBOARD ──
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      {/* Header */}
      <header className="border-b border-black/10 bg-white sticky top-0 z-50 px-6 sm:px-12 py-4 flex items-center justify-between">
        <div>
          <span className="font-mono text-[8px] tracking-[0.35em] uppercase text-black/40 font-bold block">STYLE WITH J</span>
          <h1 className="font-serif text-xl font-light text-[#1A1A1A]">Admin Panel</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/lookbook" className="font-mono text-[9px] tracking-[0.2em] uppercase text-black/50 hover:text-black transition-colors">
            View Site →
          </Link>
          <button onClick={handleLogout} className="font-mono text-[9px] tracking-[0.2em] uppercase text-black/40 hover:text-red-600 transition-colors">
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-10 flex flex-col gap-8">
        {/* Saved toast */}
        {saved && (
          <div className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 font-mono text-[10px] tracking-[0.2em] uppercase rounded-xs shadow-lg z-50">
            ✓ Saved successfully
          </div>
        )}

        {/* Action bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-black/10">
          <div>
            <h2 className="font-serif text-2xl font-light">Lookbook Entries</h2>
            <p className="font-sans text-xs text-black/50 mt-1">{looks.length} looks in the archive</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setResetConfirm(true)}
              className="px-4 py-2 border border-black/15 text-[9px] tracking-[0.2em] uppercase font-mono text-black/50 hover:text-red-600 hover:border-red-300 transition-colors rounded-xs"
            >
              Reset to Default
            </button>
            <button
              onClick={openAdd}
              className="px-5 py-2 bg-[#1A1A1A] text-white text-[9px] tracking-[0.2em] uppercase font-mono font-semibold hover:bg-black transition-colors rounded-xs"
            >
              + Add New Look
            </button>
          </div>
        </div>

        {/* Reset confirmation */}
        {resetConfirm && (
          <div className="bg-red-50 border border-red-200 p-5 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="font-sans text-xs text-red-800">This will reset all looks to the original seed data. All custom changes will be lost.</p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button onClick={() => { resetToSeed(); setResetConfirm(false); }} className="px-4 py-2 bg-red-600 text-white text-[9px] font-mono uppercase tracking-[0.15em] rounded-xs hover:bg-red-700 transition-colors">Confirm Reset</button>
              <button onClick={() => setResetConfirm(false)} className="px-4 py-2 border border-red-300 text-red-700 text-[9px] font-mono uppercase tracking-[0.15em] rounded-xs">Cancel</button>
            </div>
          </div>
        )}

        {/* Loading state */}
        {!isLoaded ? (
          <div className="py-20 text-center font-mono text-[9px] tracking-[0.3em] uppercase text-black/30">Loading looks…</div>
        ) : (
          /* Looks table */
          <div className="flex flex-col gap-3">
            {looks.map((look) => (
              <div key={look.id} className="bg-white border border-black/8 rounded-xs overflow-hidden">
                {/* Delete confirmation inline */}
                {deleteConfirm === look.id ? (
                  <div className="p-4 bg-red-50 border-b border-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="font-sans text-xs text-red-800">Delete <strong>{look.title}</strong>? This cannot be undone.</p>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <button onClick={() => handleDelete(look.id)} className="px-4 py-1.5 bg-red-600 text-white text-[9px] font-mono uppercase tracking-[0.15em] rounded-xs hover:bg-red-700 transition-colors">Delete</button>
                      <button onClick={() => setDeleteConfirm(null)} className="px-4 py-1.5 border border-red-300 text-red-700 text-[9px] font-mono uppercase tracking-[0.15em] rounded-xs">Cancel</button>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-center gap-4 p-4">
                  {/* Thumbnail */}
                  <div className="relative w-14 h-18 flex-shrink-0 bg-[#EFECE6] rounded-xs overflow-hidden border border-black/5" style={{ height: '72px' }}>
                    {look.image && (
                      <img src={look.image} alt={look.title} className="w-full h-full object-cover object-top" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-[8px] tracking-[0.2em] text-black/35 font-bold">/{look.num}</span>
                      <span className="px-2 py-0.5 bg-[#EFECE6] text-[7px] tracking-[0.2em] font-mono uppercase text-black/60 rounded-xs">{look.tag}</span>
                    </div>
                    <h3 className="font-serif text-base font-light text-[#1A1A1A] truncate">{look.title}</h3>
                    <p className="font-sans text-[10px] text-black/45 truncate mt-0.5">{look.category}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={`/lookbook/${look.id}`}
                      target="_blank"
                      className="px-3 py-1.5 border border-black/15 text-[9px] tracking-[0.15em] uppercase font-mono text-black/50 hover:text-black hover:border-black/30 transition-colors rounded-xs"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => openEdit(look)}
                      className="px-3 py-1.5 border border-black/15 text-[9px] tracking-[0.15em] uppercase font-mono text-black/50 hover:text-black hover:border-black/30 transition-colors rounded-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(look.id)}
                      className="px-3 py-1.5 border border-red-200 text-[9px] tracking-[0.15em] uppercase font-mono text-red-500 hover:text-red-700 hover:border-red-400 transition-colors rounded-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Images reference */}
        <div className="mt-6 p-5 bg-[#EFECE6]/50 border border-black/10 rounded-xs">
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-black/40 font-bold block mb-2">AVAILABLE IMAGES (paste path into Image field)</span>
          <div className="flex flex-wrap gap-2">
            {[
              'IMG_0263.JPG.jpeg','IMG_0267.JPG.jpeg','IMG_0269.JPG.jpeg','IMG_0270.JPG.jpeg',
              'IMG_0271.JPG.jpeg','IMG_0274.JPG.jpeg','IMG_0283.JPG.jpeg','IMG_0320.JPG.jpeg',
              'IMG_0330.JPG.jpeg','IMG_0332.JPG.jpeg','IMG_0333.JPG.jpeg','IMG_1406.JPG.jpeg',
              'IMG_1418.JPG.jpeg','IMG_1423.JPG.jpeg','IMG_1754.JPG.jpeg','IMG_1756.JPG.jpeg',
              'IMG_3112.JPG.jpeg','IMG_3119.JPG.jpeg','IMG_4485.JPG.jpeg','IMG_5314.JPG.jpeg',
              'IMG_5315.JPG.jpeg','IMG_5321.JPG.jpeg','IMG_7135.JPG.jpeg','IMG_8236.JPG.jpeg',
              'IMG_8709.JPG.jpeg','IMG_8771.JPG.jpeg','IMG_8826.JPG.jpeg','IMG_8846.JPG.jpeg',
              'IMG_8881.JPG.jpeg','IMG_9051.JPG.jpeg','IMG_9135.JPG.jpeg','IMG_9140.JPG.jpeg',
              'IMG_9560.JPG.jpeg','052F83BA-6047-49C8-9BBF-37C6FFE2C106.JPG.jpeg',
              'B4A2A5F7-FFA5-4B7A-9B0F-5EA8653D623E.JPG.jpeg',
            ].map(name => (
              <button
                key={name}
                onClick={() => navigator.clipboard?.writeText(`/images/includes/${name}`)}
                className="font-mono text-[7px] px-2 py-1 bg-white border border-black/10 text-black/50 hover:text-black hover:border-black/30 rounded-xs transition-colors"
                title={`Click to copy /images/includes/${name}`}
              >
                {name.length > 20 ? name.substring(0, 18) + '…' : name}
              </button>
            ))}
          </div>
          <p className="font-sans text-[9px] text-black/35 mt-2">Click any filename to copy its full path to clipboard.</p>
        </div>
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
        className="w-full px-4 py-2.5 border border-black/15 bg-white font-sans text-xs text-[#1A1A1A] placeholder-black/30 rounded-xs outline-none focus:border-black/40 transition-colors"
      />
    </div>
  );
}
