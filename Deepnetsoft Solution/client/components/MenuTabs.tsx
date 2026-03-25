'use client';
import { MenuNode } from '../lib/types';

interface Props {
  menus: MenuNode[];
  activeMenuId: string | null;
  onSelect: (id: string) => void;
}

export default function MenuTabs({ menus, activeMenuId, onSelect }: Props) {
  // Only show top-level menus in the tabs
  const topLevelMenus = menus.filter(m => !m.parentId);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {topLevelMenus.map((menu) => {
        const name = menu.name.toUpperCase();
        const isActive = activeMenuId === menu._id;
        
        let style: React.CSSProperties = {
          position: 'absolute',
          width: '114.24px',
          height: '49.98px',
          top: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          boxSizing: 'border-box',
          cursor: 'pointer',
          // Default State
          background: '#000000',
          border: '0.5px solid #C5A059',
          color: '#fff',
          fontFamily: "'Oswald', sans-serif",
          fontSize: '16px',
          letterSpacing: '0.03em',
        };

        if (name === 'FOOD') style.left = '536px';
        else if (name === 'DRINKS') style.left = '664px';
        else if (name === 'BRUNCH') style.left = '791.75px';

        return (
          <button
            key={menu._id}
            className={`tab-btn ${isActive ? 'active' : ''}`}
            style={style}
            onClick={() => onSelect(menu._id)}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}
