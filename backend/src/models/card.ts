export type Phase =
  | 'Solicitação'
  | 'Aprovação de Solicitação'
  | 'Cotação'
  | 'Aprovação de Compra'
  | 'Pedido de Compra'
  | 'Conclusão de Compra'
  | 'Recebimento de Material'
  | 'Arquivado';

export interface Card {
  id: number;
  title: string;
  requesterId: number;
  departmentId: number;
  costCenter: string;
  category: string;
  urgency: 'Baixo' | 'Médio' | 'Alto';
  justification: string;
  phase: Phase;
  approverA1Id?: number;
  approvedA1?: boolean;
  cotacao?: {
    buyerId: number;
    supplierIds: number[];
    totalValue: number;
    paymentMethodId: number;
  };
  approverA2Id?: number;
  purchaseOrder?: {
    date: string;
    files: string[];
    notes: string;
  };
  receiverId?: number;
}

export const cards: Card[] = [];
