import { z } from 'zod';
import { Seniority } from './types';


export const colaboradorSchema = z.object({
  name: z.string()
    .min(1, 'O nome é obrigatório')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),
    
  email: z.string()
    .min(1, 'O e-mail é obrigatório')
    .max(100, 'O e-mail deve ter no máximo 100 caracteres')
    .email('Formato de e-mail inválido'),
    
  active: z.boolean(), // Mapeia para Status (true = ATIVO, false = INATIVO)
  
  // --- Novos Campos ---
  
  departmentId: z.string()
    .min(1, "Selecione um departamento"),
    
  role: z.string()
    .min(1, "O cargo é obrigatório"),
    
  admissionDate: z.string()
    .refine((val) => !isNaN(Date.parse(val)), "Data inválida"), // Valida se é data
    
  seniority: z.nativeEnum(Seniority, {
    error: () => ({ message: "Selecione um nível hierárquico válido" })
  }),
  
  managerId: z.string().optional(), // Pode ser opcional (ex: O CEO não tem gestor, ou na criação ainda não definiu)
  
  baseSalary: z.coerce.number() 
    .min(1, "O salário deve ser maior que zero"),
});

export type ColaboradorSchemaType = z.infer<typeof colaboradorSchema>;


export const departmentSchema = z.object({
  name: z.string()
    .min(1, 'O nome do departamento é obrigatório')
    .max(50, 'O nome deve ter no máximo 50 caracteres'),
    
  managerId: z.string().optional(), 
  memberIds: z.array(z.string()).default([])
});

export type DepartmentSchemaType = z.infer<typeof departmentSchema>;