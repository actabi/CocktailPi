import { Router } from 'express';
import { recipes } from '../controllers/data';
import { Recipe } from '../models/recipe';

const router = Router();

router.get('/', (_req, res) => {
  res.json(recipes);
});

router.post('/', (req, res) => {
  const recipe: Recipe = { id: Date.now(), ...req.body };
  recipes.push(recipe);
  res.status(201).json(recipe);
});

router.get('/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === Number(req.params.id));
  if (!recipe) {
    return res.status(404).end();
  }
  res.json(recipe);
});

router.put('/:id', (req, res) => {
  const idx = recipes.findIndex(r => r.id === Number(req.params.id));
  if (idx === -1) {
    return res.status(404).end();
  }
  recipes[idx] = { ...recipes[idx], ...req.body };
  res.json(recipes[idx]);
});

router.delete('/:id', (req, res) => {
  const idx = recipes.findIndex(r => r.id === Number(req.params.id));
  if (idx === -1) {
    return res.status(404).end();
  }
  recipes.splice(idx, 1);
  res.status(204).end();
});

export default router;
