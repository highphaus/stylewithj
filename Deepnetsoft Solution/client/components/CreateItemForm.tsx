'use client';
import { useState } from 'react';
import { MenuNode, CreateItemPayload } from '../lib/types';

interface Props {
  menus: MenuNode[];
  selectedMenuId: string | null;
  onClose: () => void;
  onSubmit: (payload: CreateItemPayload) => void;
}

export default function CreateItemForm({ menus, selectedMenuId, onClose, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0');
  const [menuId, setMenuId] = useState(selectedMenuId || '');

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
          ADD NEW MENU ITEM
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label className="form-label">ITEM NAME</label>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input" 
              placeholder="e.g. Chocolate Cake" 
            />
          </div>
          <div>
            <label className="form-label">PRICE ($)</label>
            <input 
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-input" 
            />
          </div>
          <div>
            <label className="form-label">DESCRIPTION (OPTIONAL)</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input" 
              placeholder="Rich dark chocolate..." 
              style={{ minHeight: 60 }}
            />
          </div>
          <div>
            <label className="form-label">CATEGORY</label>
            <select 
              value={menuId}
              onChange={(e) => setMenuId(e.target.value)}
              className="form-input"
            >
              <option value="" disabled>SELECT A CATEGORY</option>
              {flattenedMenus.map(m => (
                <option key={m._id} value={m._id}>{m.name}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <button 
              className="btn-gold" 
              style={{ flex: 1 }}
              onClick={() => onSubmit({ name, description, price: parseFloat(price), menuId })}
              disabled={!name || !menuId || isNaN(parseFloat(price))}
            >
              CREATE ITEM
            </button>
            <button className="btn-ghost" style={{ flex: 1 }} onClick={onClose}>CANCEL</button>
          </div>
        </div>
      </div>
    </div>
  );
}
