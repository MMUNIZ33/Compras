export interface PaymentMethod {
  id: number;
  name: string;
}

export const paymentMethods: PaymentMethod[] = [
  { id: 1, name: 'Boleto' },
  { id: 2, name: 'Cheque' },
  { id: 3, name: 'Transferência Bancária' },
  { id: 4, name: 'Cartão de Crédito' },
  { id: 5, name: 'Dinheiro' },
  { id: 6, name: 'Pix' }
];
