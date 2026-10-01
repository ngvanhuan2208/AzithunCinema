'use client';
import { Slider as Primitive } from 'radix-ui';
import type { ComponentProps } from 'react';
export function Slider({
  label,
  ...props
}: ComponentProps<typeof Primitive.Root> & { label: string }) {
  return (
    <Primitive.Root defaultValue={[0]} max={100} {...props} className="slider">
      <Primitive.Track className="slider-track">
        <Primitive.Range className="slider-range" />
      </Primitive.Track>
      <Primitive.Thumb className="slider-thumb" aria-label={label} />
    </Primitive.Root>
  );
}
