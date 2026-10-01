'use client';
import { Checkbox as Primitive } from 'radix-ui';
import { Check, Minus } from 'lucide-react';
import type { ComponentProps } from 'react';
export function Checkbox(props: ComponentProps<typeof Primitive.Root>) {
  return (
    <Primitive.Root {...props} className="check-control">
      <Primitive.Indicator>
        {props.checked === 'indeterminate' ? <Minus /> : <Check />}
      </Primitive.Indicator>
    </Primitive.Root>
  );
}
