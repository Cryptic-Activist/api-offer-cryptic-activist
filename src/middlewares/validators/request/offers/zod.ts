import { z } from 'zod';

export const IndexPagination = z.object({
  limit: z
    .string()
    .transform(Number)
    .refine((number) => number >= 0)
    .optional(),
  skip: z
    .string()
    .transform(Number)
    .refine((number) => number >= 0)
    .optional(),
  PaymentMethodType: z.string().min(3).optional(),
});
