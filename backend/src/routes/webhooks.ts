import { Router } from 'express';

const router = Router();

router.post('/event', (req, res) => {
  console.log('Webhook received', req.body);
  res.json({ ok: true });
});

export default router;
