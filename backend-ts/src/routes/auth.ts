import { Router } from 'express';
import { findUserByUsername } from '../services/userService';

const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // return dummy token
  return res.json({ token: 'dummy-token', user: { id: user.id, username: user.username, role: user.role } });
});

export default router;
