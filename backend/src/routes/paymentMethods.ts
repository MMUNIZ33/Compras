import { Router } from 'express';
import { paymentMethods } from '../models/paymentMethod';

const router = Router();

router.get('/', (_req, res) => {
  res.json(paymentMethods);
});

export default router;
