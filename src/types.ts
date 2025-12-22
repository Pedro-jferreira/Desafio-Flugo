export const Status = {
  ATIVO: 'Ativo',
  INATIVO: 'Inativo',
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export const Seniority = {
  JUNIOR: 'Júnior',
  PLENO: 'Pleno',
  SENIOR: 'Sênior',
  GESTOR: 'Gestor',
} as const;

export type Seniority = (typeof Seniority)[keyof typeof Seniority];

export interface Department {
  id: string;
  name: string;
  managerId?: string; 
  createdAt?: any;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  status: Status;
  avatarUrl?: string;
  createdAt?: any;
  
  departmentId: string; 
  role: string;       
  admissionDate: string; 
  seniority: Seniority; 
  managerId?: string;  
  baseSalary: number;  
}