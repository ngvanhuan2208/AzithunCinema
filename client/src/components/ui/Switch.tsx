'use client';
import { Switch as Primitive } from 'radix-ui';
import type { ComponentProps } from 'react';
export function Switch(props: ComponentProps<typeof Primitive.Root>) {
  return (
    <Primitive.Root {...props} className="switch">
      <Primitive.Thumb className="switch-thumb" />
    </Primitive.Root>
  );
}
