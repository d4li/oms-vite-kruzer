import { z } from 'zod';

export const schema = z.object({
  title: z.string().nonempty('Nome é obrigatório'),
  description: z.string().nonempty('Descrição é obrigatório'),
  // category: z.string().optional(),
  // image: z.string().optional(),
  price: z.string().nonempty('Preço obrigatório').default('0.00'),
  // quantity: z.string().nonempty('Quantity is required'),
  // .integer('Quantity must be an integer')
  // .positive('Quantity must be a positive number'),
  // status: z.boolean(),
  // projectName: z.string().nonempty('Obrigatorio'),
});

export type ValidationSchema = z.infer<typeof schema>;
