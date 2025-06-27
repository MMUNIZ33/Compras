export interface Department {
  id: number;
  name: string;
  costCenters: string[];
}

export const departments: Department[] = [
  { id: 1, name: 'TI', costCenters: ['CC001'] },
  { id: 2, name: 'Financeiro', costCenters: ['CC002'] }
];
