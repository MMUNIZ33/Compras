import { Router } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { cards, Card, Phase } from '../models/card';
import { suppliers } from '../models/supplier';

const router = Router();

router.get('/', authenticate, (_req, res) => {
  res.json(cards);
});

router.post('/', authenticate, (req: AuthRequest, res) => {
  const id = cards.length + 1;
  const {
    title,
    departmentId,
    costCenter,
    category,
    urgency,
    justification
  } = req.body;
  const card: Card = {
    id,
    title,
    requesterId: req.user.id,
    departmentId,
    costCenter,
    category,
    urgency,
    justification,
    phase: 'Solicitação'
  };
  cards.push(card);
  res.status(201).json(card);
});

router.put('/:id/phase', authenticate, (req: AuthRequest, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).json({ message: 'Not found' });
  const next: Phase = req.body.phase;
  card.phase = next;
  res.json(card);
});

router.post('/:id/cotacao', authenticate, authorize(['buyer']), (req: AuthRequest, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).json({ message: 'Not found' });
  card.cotacao = {
    buyerId: req.user.id,
    supplierIds: req.body.supplierIds,
    totalValue: req.body.totalValue,
    paymentMethodId: req.body.paymentMethodId
  };
  card.phase = 'Aprovação de Compra';
  res.json(card);
});

router.post('/:id/approveA1', authenticate, authorize(['approverA1']), (req: AuthRequest, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).json({ message: 'Not found' });
  card.approverA1Id = req.user.id;
  card.approvedA1 = req.body.approved;
  card.phase = req.body.approved ? 'Cotação' : 'Arquivado';
  res.json(card);
});

export default router;

router.post('/:id/approveA2', authenticate, authorize(['approverA2']), (req: AuthRequest, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).json({ message: 'Not found' });
  card.approverA2Id = req.user.id;
  card.phase = 'Pedido de Compra';
  res.json(card);
});

router.post('/:id/pedido', authenticate, authorize(['buyer']), (req: AuthRequest, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).json({ message: 'Not found' });
  card.purchaseOrder = req.body;
  card.phase = 'Conclusão de Compra';
  res.json(card);
});

router.post('/:id/recebimento', authenticate, (req: AuthRequest, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).json({ message: 'Not found' });
  card.receiverId = req.user.id;
  card.phase = 'Arquivado';
  res.json(card);
});

export default router;
