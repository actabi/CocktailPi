import { getDatabase } from '../database/database';
import { Ingredient } from '../models/ingredient';

export async function getAllIngredients(): Promise<Ingredient[]> {
  const db = getDatabase();
  return db.all('SELECT id, name FROM ingredients');
}

export async function createIngredient(ingredient: Omit<Ingredient, "id">): Promise<Ingredient> {
  const db = getDatabase();
  const result = await db.run('INSERT INTO ingredients (name) VALUES (?)', [ingredient.name]);
  const id = (result as any).lastID as number;
  return { id, ...ingredient };
}

export async function findIngredientById(id: number): Promise<Ingredient | undefined> {
  const db = getDatabase();
  return db.get('SELECT id, name FROM ingredients WHERE id = ?', [id]);
}

export async function updateIngredient(id: number, update: Partial<Ingredient>): Promise<Ingredient | undefined> {
  const db = getDatabase();
  await db.run('UPDATE ingredients SET name = COALESCE(?, name) WHERE id = ?', [update.name, id]);
  return findIngredientById(id);
}

export async function deleteIngredient(id: number): Promise<void> {
  const db = getDatabase();
  await db.run('DELETE FROM ingredients WHERE id = ?', [id]);
}
