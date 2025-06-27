export interface Supplier {
  id: number;
  name: string;
  cnpj: string;
  contact: string;
  email: string;
  services: string;
}

export const suppliers: Supplier[] = [];
