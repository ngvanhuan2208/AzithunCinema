'use client';
import { RadioGroup as Primitive } from 'radix-ui';
import type { ComponentProps } from 'react';
export function RadioGroup(props: ComponentProps<typeof Primitive.Root>) {
  return <Primitive.Root {...props} className="stack" />;
}
export function Radio(props: ComponentProps<typeof Primitive.Item>) {
  return (
    <Primitive.Item {...props} className="check-control radio-control">
      <Primitive.Indicator className="radio-dot" />
    </Primitive.Item>
  );
}
