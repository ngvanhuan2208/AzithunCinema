'use client';
import { Separator as Primitive } from 'radix-ui';
import type { ComponentProps } from 'react';
export function Separator(props: ComponentProps<typeof Primitive.Root>) {
  return <Primitive.Root decorative {...props} className="separator" />;
}
