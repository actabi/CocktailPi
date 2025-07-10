import { User } from '../models/user';
import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';

export const users: User[] = [
  { id: 1, username: 'admin', password: 'admin', role: 'ADMIN' },
];

export const recipes: Recipe[] = [];
export const ingredients: Ingredient[] = [];
