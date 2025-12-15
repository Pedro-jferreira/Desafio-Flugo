import { z } from 'zod';

export const colaboradorSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório')
  .max(100, 'O nome deve ter no máximo 100 caracteres'),
  email: z.string().min(1, 'O e-mail é obrigatório')
  .max(100, 'O e-mail deve ter no máximo 100 caracteres')
  .email('Formato de e-mail inválido'),
  active: z.boolean(),
  department: z.string().min(1, "Selecione um departamento"),
});

export type ColaboradorSchemaType = z.infer<typeof colaboradorSchema>;