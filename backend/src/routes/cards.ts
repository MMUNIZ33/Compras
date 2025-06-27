import { Router } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { cards, Card } from '../models/card';

const router = Router();

router.get('/', authenticate, (_req, res) => {
  res.json(cards);
});

router.post('/', authenticate, (req: AuthRequest, res) => {
  const id = cards.length + 1;
  const card: Card = {
    id,
    title: req.body.title,
    requesterId: req.user.id,
    phase: 'Solicitação',
  };
  cards.push(card);
  res.status(201).json(card);
});

router.put('/:id/move', authenticate, (req: AuthRequest, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).json({ message: 'Not found' });
  card.phase = req.body.phase;
  res.json(card);
});

export default router;
