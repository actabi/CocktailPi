import { Router } from 'express';
import { Category } from '../models/category';
import {
  getAllCategories,
  createCategory,
  findCategoryById,
  updateCategory,
  deleteCategory,
} from '../services/categoryService';

const router = Router();

router.get('/', async (_req, res) => {
  const list = await getAllCategories();
  res.json(list);
});

router.post('/', async (req, res) => {
  const category: Category = await createCategory(req.body);
  res.status(201).json(category);
});

router.get('/:id', async (req, res) => {
  const category = await findCategoryById(Number(req.params.id));
  if (!category) {
    return res.status(404).end();
  }
  res.json(category);
});

router.put('/:id', async (req, res) => {
  const category = await updateCategory(Number(req.params.id), req.body);
  if (!category) {
    return res.status(404).end();
  }
  res.json(category);
});

router.delete('/:id', async (req, res) => {
  await deleteCategory(Number(req.params.id));
  res.status(204).end();
});

export default router;
