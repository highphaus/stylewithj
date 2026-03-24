import { Router, Request, Response } from 'express';
import Menu, { IMenu } from '../models/Menu';
import MenuItem from '../models/MenuItem';

const router = Router();

// ─── Recursive tree builder ───────────────────────────────────────────────────
interface MenuNode {
  _id: string;
  name: string;
  description?: string;
  parentId?: string | null;
  children: MenuNode[];
  items: Array<{ _id: string; name: string; description?: string; price: number }>;
}

function buildTree(menus: IMenu[], itemsMap: Map<string, MenuNode['items']>): MenuNode[] {
  const map = new Map<string, MenuNode>();

  // Initialise every node
  for (const m of menus) {
    map.set(m._id.toString(), {
      _id: m._id.toString(),
      name: m.name,
      description: m.description,
      parentId: m.parentId ? m.parentId.toString() : null,
      children: [],
      items: itemsMap.get(m._id.toString()) ?? [],
    });
  }

  const roots: MenuNode[] = [];

  for (const node of map.values()) {
    if (node.parentId && map.has(node.parentId)) {
      map.get(node.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

// ─── GET /api/menus/tree ─────────────────────────────────────────────────────
router.get('/tree', async (_req: Request, res: Response) => {
  try {
    const [menus, items] = await Promise.all([
      Menu.find().lean(),
      MenuItem.find().lean(),
    ]);

    // Group items by menuId
    const itemsMap = new Map<string, MenuNode['items']>();
    for (const item of items) {
      const key = item.menuId.toString();
      if (!itemsMap.has(key)) itemsMap.set(key, []);
      itemsMap.get(key)!.push({
        _id: item._id.toString(),
        name: item.name,
        description: item.description,
        price: item.price,
      });
    }

    const tree = buildTree(menus as unknown as IMenu[], itemsMap);
    res.json(tree);
  } catch (err) {
    res.status(500).json({ message: 'Failed to build tree', error: err });
  }
});

// ─── GET /api/menus ───────────────────────────────────────────────────────────
router.get('/', async (_req: Request, res: Response) => {
  try {
    const menus = await Menu.find().populate('parentId', 'name').lean();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch menus', error: err });
  }
});

// ─── GET /api/menus/:id ───────────────────────────────────────────────────────
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const menu = await Menu.findById(req.params.id).lean();
    if (!menu) return res.status(404).json({ message: 'Menu not found' });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch menu', error: err });
  }
});

// ─── POST /api/menus ─────────────────────────────────────────────────────────
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, parentId } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const menu = new Menu({ name, description, parentId: parentId || null });
    await menu.save();
    res.status(201).json(menu);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create menu', error: err });
  }
});

// ─── PUT /api/menus/:id ───────────────────────────────────────────────────────
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description, parentId } = req.body;
    const menu = await Menu.findByIdAndUpdate(
      req.params.id,
      { name, description, parentId: parentId || null },
      { new: true, runValidators: true }
    );
    if (!menu) return res.status(404).json({ message: 'Menu not found' });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update menu', error: err });
  }
});

// ─── DELETE /api/menus/:id ────────────────────────────────────────────────────
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Menu not found' });
    // Cascade: remove children and items
    await Menu.deleteMany({ parentId: req.params.id });
    await MenuItem.deleteMany({ menuId: req.params.id });
    res.json({ message: 'Menu deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete menu', error: err });
  }
});

export default router;
