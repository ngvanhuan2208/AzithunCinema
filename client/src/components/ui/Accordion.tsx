'use client';
import { Accordion as Primitive } from 'radix-ui';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
export function Accordion({
  items,
}: {
  items: { title: string; content: ReactNode }[];
}) {
  return (
    <Primitive.Root type="single" collapsible>
      {items.map((item) => (
        <Primitive.Item
          key={item.title}
          value={item.title}
          className="accordion-item"
        >
          <Primitive.Header>
            <Primitive.Trigger className="accordion-trigger">
              {item.title}
              <ChevronDown aria-hidden="true" />
            </Primitive.Trigger>
          </Primitive.Header>
          <Primitive.Content className="accordion-content">
            {item.content}
          </Primitive.Content>
        </Primitive.Item>
      ))}
    </Primitive.Root>
  );
}
