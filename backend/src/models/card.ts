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
  phase: Phase;
}

export const cards: Card[] = [];
