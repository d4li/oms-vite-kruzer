import { z } from 'zod';

export const schema = z.object({
  customer: z.string().nonempty('Nome do cliente é obrigatório'),
  products: z.string(),
});

export type ValidationSchema = z.infer<typeof schema>;
