// ─── Menu Types ───────────────────────────────────────────────────────────────
export interface MenuItemType {
  _id: string;
  name: string;
  description?: string;
  price: number;
  menuId: string;
}

export interface MenuNode {
  _id: string;
  name: string;
  description?: string;
  parentId?: string | null;
  children: MenuNode[];
  items: MenuItemType[];
}

// ─── Form payloads ────────────────────────────────────────────────────────────
export interface CreateMenuPayload {
  name: string;
  description?: string;
  parentId?: string | null;
}

export interface CreateItemPayload {
  name: string;
  description?: string;
  price: number;
  menuId: string;
}
