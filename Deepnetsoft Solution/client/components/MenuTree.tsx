'use client';
import { MenuNode } from '../lib/types';

interface Props {
  menu: MenuNode;
  selectedId: string | null;
  onSelect: (id: string, name: string) => void;
  level?: number;
}

export default function MenuTree({ menu, selectedId, onSelect, level = 0 }: Props) {
  const isSelected = selectedId === menu._id;

  return (
    <div style={{ marginBottom: 4 }}>
      <button
        onClick={() => onSelect(menu._id, menu.name)}
        style={{
          width: '100%',
          textAlign: 'left',
          background: isSelected ? 'rgba(201,168,76,0.15)' : 'transparent',
          color: isSelected ? '#c9a84c' : 'rgba(255,255,255,0.7)',
          border: 'none',
          padding: '8px 12px',
          borderRadius: 4,
          cursor: 'pointer',
          fontSize: '0.9rem',
          marginLeft: level * 16,
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ opacity: 0.5 }}>{menu.children.length > 0 ? '▼' : '○'}</span>
        {menu.name}
      </button>

      {menu.children && menu.children.length > 0 && (
        <div style={{ marginTop: 4 }}>
          {menu.children.map((child) => (
            <MenuTree
              key={child._id}
              menu={child}
              selectedId={selectedId}
              onSelect={onSelect}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
