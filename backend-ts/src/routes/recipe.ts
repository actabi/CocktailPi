import { Router } from 'express';
import { Recipe } from '../models/recipe';
import {
  getAllRecipes,
  createRecipe,
  findRecipeById,
  updateRecipe,
  deleteRecipe
} from '../services/recipeService';

const router = Router();

router.get('/', async (_req, res) => {
  const list = await getAllRecipes();
  res.json(list);
});

router.post('/', async (req, res) => {
  const recipe: Recipe = await createRecipe(req.body);
  res.status(201).json(recipe);
});

router.get('/:id', async (req, res) => {
  const recipe = await findRecipeById(Number(req.params.id));
  if (!recipe) {
    return res.status(404).end();
  }
  res.json(recipe);
});

router.put('/:id', async (req, res) => {
  const recipe = await updateRecipe(Number(req.params.id), req.body);
  if (!recipe) {
    return res.status(404).end();
  }
  res.json(recipe);
});

router.delete('/:id', async (req, res) => {
  await deleteRecipe(Number(req.params.id));
  res.status(204).end();
});

export default router;
