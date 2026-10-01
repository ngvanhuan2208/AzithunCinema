'use client';
import { Dialog as Primitive } from 'radix-ui';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
export function Sheet({
  trigger,
  title,
  description,
  children,
}: {
  trigger: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <Primitive.Root>
      <Primitive.Trigger asChild>{trigger}</Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Overlay className="overlay sheet-overlay" />
        <Primitive.Content className="sheet panel stack">
          <div className="row justify-between">
            <Primitive.Title className="text-h3">{title}</Primitive.Title>
            <Primitive.Close asChild>
              <Button variant="icon" aria-label="Đóng ngăn bên">
                <X />
              </Button>
            </Primitive.Close>
          </div>
          <Primitive.Description className="muted-copy">
            {description}
          </Primitive.Description>
          {children}
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
