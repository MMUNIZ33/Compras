import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { users } from '../models/user';

const secret = process.env.JWT_SECRET || 'secret';
const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, role: user.role }, secret);
  res.json({ token });
});

export default router;
