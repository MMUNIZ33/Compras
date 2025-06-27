import { Router } from 'express';
import { suppliers, Supplier } from '../models/supplier';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, (_req, res) => {
  res.json(suppliers);
});

router.post('/', authenticate, authorize(['admin', 'buyer']), (req: AuthRequest, res) => {
  const id = suppliers.length + 1;
  const supplier: Supplier = { id, ...req.body };
  suppliers.push(supplier);
  res.status(201).json(supplier);
});

export default router;
