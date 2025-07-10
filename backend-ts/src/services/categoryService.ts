import { getDatabase } from '../database/database';
import { Category } from '../models/category';

export async function getAllCategories(): Promise<Category[]> {
  const db = getDatabase();
  return db.all('SELECT id, name FROM categories');
}

export async function createCategory(category: Omit<Category, "id">): Promise<Category> {
  const db = getDatabase();
  const result = await db.run('INSERT INTO categories (name) VALUES (?)', [category.name]);
  const id = (result as any).lastID as number;
  return { id, ...category };
}

export async function findCategoryById(id: number): Promise<Category | undefined> {
  const db = getDatabase();
  return db.get('SELECT id, name FROM categories WHERE id = ?', [id]);
}

export async function updateCategory(id: number, update: Partial<Category>): Promise<Category | undefined> {
  const db = getDatabase();
  await db.run('UPDATE categories SET name = COALESCE(?, name) WHERE id = ?', [update.name, id]);
  return findCategoryById(id);
}

export async function deleteCategory(id: number): Promise<void> {
  const db = getDatabase();
  await db.run('DELETE FROM categories WHERE id = ?', [id]);
}
