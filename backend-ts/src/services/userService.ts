import { getDatabase } from '../database/database';
import { User } from '../models/user';

export async function getAllUsers(): Promise<User[]> {
  const db = getDatabase();
  return db.all('SELECT id, username, password, role FROM users');
}

export async function createUser(user: Omit<User, "id">): Promise<User> {
  const db = getDatabase();
  const result = await db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [user.username, user.password, user.role]);
  const id = (result as any).lastID as number;
  return { id, ...user };
}

export async function findUserById(id: number): Promise<User | undefined> {
  const db = getDatabase();
  return db.get('SELECT id, username, password, role FROM users WHERE id = ?', [id]);
}

export async function findUserByUsername(username: string): Promise<User | undefined> {
  const db = getDatabase();
  return db.get('SELECT id, username, password, role FROM users WHERE username = ?', [username]);
}

export async function updateUser(id: number, update: Partial<User>): Promise<User | undefined> {
  const db = getDatabase();
  await db.run('UPDATE users SET username = COALESCE(?, username), password = COALESCE(?, password), role = COALESCE(?, role) WHERE id = ?', [update.username, update.password, update.role, id]);
  return findUserById(id);
}

export async function deleteUser(id: number): Promise<void> {
  const db = getDatabase();
  await db.run('DELETE FROM users WHERE id = ?', [id]);
}
