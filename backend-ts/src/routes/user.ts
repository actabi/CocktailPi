import { Router } from 'express';
import { User } from '../models/user';
import {
  getAllUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser
} from '../services/userService';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await getAllUsers();
  res.json(users.map(u => ({ id: u.id, username: u.username, role: u.role })));
});

router.post('/', async (req, res) => {
  const newUser: User = await createUser(req.body);
  res.status(201).json({ id: newUser.id, username: newUser.username, role: newUser.role });
});

router.get('/:id', async (req, res) => {
  const user = await findUserById(Number(req.params.id));
  if (!user) return res.status(404).end();
  res.json({ id: user.id, username: user.username, role: user.role });
});

router.put('/:id', async (req, res) => {
  const user = await updateUser(Number(req.params.id), req.body);
  if (!user) return res.status(404).end();
  res.json({ id: user.id, username: user.username, role: user.role });
});

router.delete('/:id', async (req, res) => {
  await deleteUser(Number(req.params.id));
  res.status(204).end();
});

export default router;
