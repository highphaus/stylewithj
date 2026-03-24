import { Router, Request, Response } from 'express';
import MenuItem from '../models/MenuItem';

const router = Router();

// ─── GET /api/menu-items?menuId=xxx ────────────────────────────────────────────
router.get('/', async (req: Request, res: Response) => {
  try {
    const filter = req.query.menuId ? { menuId: req.query.menuId } : {};
    const items = await MenuItem.find(filter).populate('menuId', 'name').lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch items', error: err });
  }
});

// ─── GET /api/menu-items/:id ──────────────────────────────────────────────────
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const item = await MenuItem.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch item', error: err });
  }
});

// ─── POST /api/menu-items ──────────────────────────────────────────────────────
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, price, menuId } = req.body;
    if (!name || price === undefined || !menuId) {
      return res.status(400).json({ message: 'name, price, and menuId are required' });
    }
    const item = new MenuItem({ name, description, price, menuId });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create item', error: err });
  }
});

// ─── PUT /api/menu-items/:id ──────────────────────────────────────────────────
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description, price, menuId } = req.body;
    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price, menuId },
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update item', error: err });
  }
});

// ─── DELETE /api/menu-items/:id ───────────────────────────────────────────────
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete item', error: err });
  }
});

export default router;
