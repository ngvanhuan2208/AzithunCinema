import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, test, vi } from 'vitest';
import { Button } from './Button';
afterEach(cleanup);
test('loading prevents duplicate submission while retaining accessible label', async () => {
  const onClick = vi.fn();
  render(
    <Button loading onClick={onClick}>
      Lưu thay đổi
    </Button>,
  );
  const button = screen.getByRole('button', { name: /Lưu thay đổi/ });
  expect(button).toBeDisabled();
  expect(button).toHaveAttribute('aria-busy', 'true');
  await userEvent.click(button);
  expect(onClick).not.toHaveBeenCalled();
});
