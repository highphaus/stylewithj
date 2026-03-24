'use client';
import { useState } from 'react';
import { MenuNode, CreateMenuPayload } from '../lib/types';

interface Props {
  menus: MenuNode[];
  onClose: () => void;
  onSubmit: (payload: CreateMenuPayload) => void;
}

export default function CreateMenuForm({ menus, onClose, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [parentId, setParentId] = useState('');

  const flattenedMenus: { _id: string; name: string }[] = [];
  const flatten = (nodes: MenuNode[]) => {
    nodes.forEach(n => {
      flattenedMenus.push({ _id: n._id, name: n.name });
      if (n.children) flatten(n.children);
    });
  };
  flatten(menus);

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', marginBottom: 24, letterSpacing: '0.1em' }}>
          ADD NEW MENU CATEGORY
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label className="form-label">NAME</label>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input" 
              placeholder="e.g. Desserts" 
            />
          </div>
          <div>
            <label className="form-label">DESCRIPTION (OPTIONAL)</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input" 
              placeholder="Sweet treats..." 
              style={{ minHeight: 80 }}
            />
          </div>
          <div>
            <label className="form-label">PARENT CATEGORY (LEAVE EMPTY FOR ROOT)</label>
            <select 
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="form-input"
            >
              <option value="">ROOT (TOP LEVEL)</option>
              {flattenedMenus.map(m => (
                <option key={m._id} value={m._id}>{m.name}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <button 
              className="btn-gold" 
              style={{ flex: 1 }}
              onClick={() => onSubmit({ name, description, parentId: parentId || null })}
              disabled={!name}
            >
              CREATE CATEGORY
            </button>
            <button className="btn-ghost" style={{ flex: 1 }} onClick={onClose}>CANCEL</button>
          </div>
        </div>
      </div>
    </div>
  );
}
