import { Router } from 'express';
import { departments } from '../models/department';

const router = Router();

router.get('/', (_req, res) => {
  res.json(departments);
});

export default router;
