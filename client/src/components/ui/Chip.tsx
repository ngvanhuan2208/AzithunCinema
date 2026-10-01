import { Button, type ButtonProps } from './Button';
import { cn } from '@/lib/utils';
export function Chip({
  selected = false,
  className,
  ...props
}: ButtonProps & { selected?: boolean }) {
  return (
    <Button
      variant="outline"
      size="sm"
      aria-pressed={selected}
      className={cn('chip', className)}
      {...props}
    />
  );
}
