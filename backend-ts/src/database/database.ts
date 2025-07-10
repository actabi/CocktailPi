import sqlite3 from 'sqlite3';
import path from 'path';
import { promisify } from 'util';

export class DB {
  private db: sqlite3.Database;
  run: (sql: string, params?: any[]) => Promise<sqlite3.RunResult>;
  get: (sql: string, params?: any[]) => Promise<any>;
  all: (sql: string, params?: any[]) => Promise<any[]>;

  constructor(filename: string) {
    sqlite3.verbose();
    this.db = new sqlite3.Database(filename);
    this.run = promisify(this.db.run.bind(this.db));
    this.get = promisify(this.db.get.bind(this.db));
    this.all = promisify(this.db.all.bind(this.db));
  }
}

let db: DB | undefined;

export function initDatabase(file?: string): DB {
  if (!db) {
    const dbFile = file || path.resolve(__dirname, '../../../cocktailpi-data.db');
    db = new DB(dbFile);
  }
  return db;
}

export function getDatabase(): DB {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}

export async function setupSchema() {
  const database = getDatabase();
  await database.run(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL, role TEXT NOT NULL)`
  );
  await database.run(
    `CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, description TEXT)`
  );
  await database.run(
    `CREATE TABLE IF NOT EXISTS ingredients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)`
  );
  await database.run(
    `CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)`
  );
}
