import { Router } from 'express';
import { Ingredient } from '../models/ingredient';
import {
  getAllIngredients,
  createIngredient,
  findIngredientById,
  updateIngredient,
  deleteIngredient,
} from '../services/ingredientService';

const router = Router();

router.get('/', async (_req, res) => {
  const list = await getAllIngredients();
  res.json(list);
});

router.post('/', async (req, res) => {
  const ingredient: Ingredient = await createIngredient(req.body);
  res.status(201).json(ingredient);
});

router.get('/:id', async (req, res) => {
  const ingredient = await findIngredientById(Number(req.params.id));
  if (!ingredient) {
    return res.status(404).end();
  }
  res.json(ingredient);
});

router.put('/:id', async (req, res) => {
  const ingredient = await updateIngredient(Number(req.params.id), req.body);
  if (!ingredient) {
    return res.status(404).end();
  }
  res.json(ingredient);
});

router.delete('/:id', async (req, res) => {
  await deleteIngredient(Number(req.params.id));
  res.status(204).end();
});

export default router;
