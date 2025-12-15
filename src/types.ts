

export const Department = {
  DESIGN: 'Design',
  TI: 'TI',
  MARKETING: 'Marketing',
  PRODUTO: 'Produto',
} as const;

export type Department = (typeof Department)[keyof typeof Department];

export const Status = {
  ATIVO: 'Ativo',
  INATIVO: 'Inativo',
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: Department;
  status: Status;
  avatarUrl?: string;
  createdAt?: any;
}