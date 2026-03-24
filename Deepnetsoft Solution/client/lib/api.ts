import { MenuNode, MenuItemType, CreateMenuPayload, CreateItemPayload } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// ─── Menu ─────────────────────────────────────────────────────────────────────
export async function fetchMenuTree(): Promise<MenuNode[]> {
  const res = await fetch(`${BASE_URL}/menus/tree`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch menu tree');
  return res.json();
}

export async function fetchMenus(): Promise<MenuNode[]> {
  const res = await fetch(`${BASE_URL}/menus`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch menus');
  return res.json();
}

export async function createMenu(payload: CreateMenuPayload): Promise<MenuNode> {
  const res = await fetch(`${BASE_URL}/menus`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create menu');
  return res.json();
}

export async function deleteMenu(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/menus/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete menu');
}

// ─── Menu Items ───────────────────────────────────────────────────────────────
export async function fetchItems(menuId?: string): Promise<MenuItemType[]> {
  const url = menuId ? `${BASE_URL}/menu-items?menuId=${menuId}` : `${BASE_URL}/menu-items`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
}

export async function createItem(payload: CreateItemPayload): Promise<MenuItemType> {
  const res = await fetch(`${BASE_URL}/menu-items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create item');
  return res.json();
}

export async function deleteItem(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/menu-items/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete item');
}
