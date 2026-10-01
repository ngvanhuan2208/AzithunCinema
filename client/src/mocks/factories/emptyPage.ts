import type { Paginated } from '@/lib/contracts';
export function emptyPage<T>(): Paginated<T> {
  return { items: [], total: 0 };
}
