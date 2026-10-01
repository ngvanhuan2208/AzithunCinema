'use client';
import { Tabs as Primitive } from 'radix-ui';
import type { ReactNode } from 'react';
export function Tabs({
  label,
  items,
}: {
  label: string;
  items: {
    value: string;
    label: string;
    content: ReactNode;
    disabled?: boolean;
  }[];
}) {
  return (
    <Primitive.Root defaultValue={items[0]?.value}>
      <Primitive.List className="tabs-list" aria-label={label}>
        {items.map((item) => (
          <Primitive.Trigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className="tab"
          >
            {item.label}
          </Primitive.Trigger>
        ))}
      </Primitive.List>
      {items.map((item) => (
        <Primitive.Content
          key={item.value}
          value={item.value}
          className="tab-panel"
        >
          {item.content}
        </Primitive.Content>
      ))}
    </Primitive.Root>
  );
}
