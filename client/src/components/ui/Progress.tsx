'use client';
import { Progress as Primitive } from 'radix-ui';
export function Progress({ value, label }: { value?: number; label: string }) {
  const bounded =
    value === undefined ? undefined : Math.min(100, Math.max(0, value));
  return (
    <Primitive.Root
      className="progress"
      value={bounded ?? null}
      aria-label={label}
    >
      <Primitive.Indicator
        className="progress-indicator"
        style={{ transform: `translateX(-${100 - (bounded ?? 30)}%)` }}
      />
    </Primitive.Root>
  );
}
