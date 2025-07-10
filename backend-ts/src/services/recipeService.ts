import { getDatabase } from '../database/database';
import { Recipe } from '../models/recipe';

export async function getAllRecipes(): Promise<Recipe[]> {
  const db = getDatabase();
  return db.all('SELECT id, name, description FROM recipes');
}

export async function createRecipe(recipe: Omit<Recipe, "id">): Promise<Recipe> {
  const db = getDatabase();
  const result = await db.run('INSERT INTO recipes (name, description) VALUES (?, ?)', [recipe.name, recipe.description]);
  const id = (result as any).lastID as number;
  return { id, ...recipe };
}

export async function findRecipeById(id: number): Promise<Recipe | undefined> {
  const db = getDatabase();
  return db.get('SELECT id, name, description FROM recipes WHERE id = ?', [id]);
}

export async function updateRecipe(id: number, update: Partial<Recipe>): Promise<Recipe | undefined> {
  const db = getDatabase();
  await db.run('UPDATE recipes SET name = COALESCE(?, name), description = COALESCE(?, description) WHERE id = ?', [update.name, update.description, id]);
  return findRecipeById(id);
}

export async function deleteRecipe(id: number): Promise<void> {
  const db = getDatabase();
  await db.run('DELETE FROM recipes WHERE id = ?', [id]);
}
