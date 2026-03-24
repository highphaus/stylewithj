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
        display: 'flex',
        justifyContent: 'center',
        gap: 15,
        flexWrap: 'wrap',
        margin: '50px 0',
      }}
    >
      {topLevelMenus.map((menu) => (
        <button
          key={menu._id}
          className={`tab-btn ${activeMenuId === menu._id ? 'active' : ''}`}
          onClick={() => onSelect(menu._id)}
        >
          {menu.name.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
