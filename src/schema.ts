import { z } from 'zod';

export const colaboradorSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().min(1, 'O e-mail é obrigatório').email('Formato de e-mail inválido'),
  active: z.boolean(),
  // FIX: Validamos apenas como string não vazia.
  // Isso resolve o erro de tipagem do Resolver.
  department: z.string().min(1, "Selecione um departamento"),
});

export type ColaboradorSchemaType = z.infer<typeof colaboradorSchema>;