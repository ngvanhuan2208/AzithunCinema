import { z } from 'zod';
export function paginatedSchema<T extends z.ZodType>(item: T) {
  return z.object({
    items: z.array(item),
    total: z.number().int().nonnegative(),
  });
}
export interface Paginated<T> {
  items: T[];
  total: number;
}
