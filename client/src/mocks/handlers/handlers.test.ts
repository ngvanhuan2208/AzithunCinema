import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from './index';
import { API_URL } from '@/lib/api-client';
import { ContentSchema, paginatedSchema } from '@/lib/contracts';
const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
test('mock transport returns an empty contract-valid collection', async () => {
  const response = await fetch(`${API_URL}/contents`);
  expect(paginatedSchema(ContentSchema).parse(await response.json())).toEqual({
    items: [],
    total: 0,
  });
});
