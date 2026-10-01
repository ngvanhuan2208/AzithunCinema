'use client';
import { Avatar as Primitive } from 'radix-ui';
import { UserRound } from 'lucide-react';
export function Avatar({
  src,
  label,
  initials,
  size = 'md',
}: {
  src?: string;
  label: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}) {
  return (
    <Primitive.Root className="avatar" data-size={size}>
      <Primitive.Image src={src} alt={label} />
      <Primitive.Fallback aria-label={label}>
        {initials || <UserRound aria-hidden="true" />}
      </Primitive.Fallback>
    </Primitive.Root>
  );
}
