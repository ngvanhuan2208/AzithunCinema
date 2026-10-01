import { z } from 'zod';
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export async function apiGet<T extends z.ZodType>(
  path: string,
  schema: T,
  signal?: AbortSignal,
): Promise<z.infer<T>> {
  const response = await fetch(`${API_URL}${path}`, {
    signal,
    credentials: 'include',
  });
  if (!response.ok)
    throw new Error('Không tải được dữ liệu. Vui lòng thử lại.');
  return schema.parse(await response.json());
}
