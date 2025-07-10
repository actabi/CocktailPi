import { Router } from 'express';
import { users } from '../controllers/data';

const router = Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // return dummy token
  return res.json({ token: 'dummy-token', user: { id: user.id, username: user.username, role: user.role } });
});

export default router;
