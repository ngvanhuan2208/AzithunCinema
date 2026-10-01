import { http, HttpResponse } from 'msw';
import { API_URL } from '@/lib/api-client';
import type { Content } from '@/lib/contracts';
import { emptyPage } from '../factories/emptyPage';
// Placeholder endpoint for validating transport only; no seeded domain records.
export const handlers = [
  http.get(`${API_URL}/contents`, () =>
    HttpResponse.json(emptyPage<Content>()),
  ),
];
