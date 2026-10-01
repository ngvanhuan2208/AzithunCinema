import { expect, test } from 'vitest';
import { cn } from './utils';
test('consumer utility overrides remain predictable', () => {
  expect(cn('p-4', false, 'p-8')).toBe('p-8');
});
