import { Router } from 'express';
import { users } from '../controllers/data';
import { User } from '../models/user';

const router = Router();

router.get('/', (_req, res) => {
  res.json(users.map(u => ({ id: u.id, username: u.username, role: u.role })));
});

router.post('/', (req, res) => {
  const user: User = { id: Date.now(), ...req.body };
  users.push(user);
  res.status(201).json({ id: user.id, username: user.username, role: user.role });
});

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).end();
  res.json({ id: user.id, username: user.username, role: user.role });
});

router.put('/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === Number(req.params.id));
  if (idx === -1) return res.status(404).end();
  users[idx] = { ...users[idx], ...req.body };
  res.json({ id: users[idx].id, username: users[idx].username, role: users[idx].role });
});

router.delete('/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === Number(req.params.id));
  if (idx === -1) return res.status(404).end();
  users.splice(idx, 1);
  res.status(204).end();
});

export default router;
