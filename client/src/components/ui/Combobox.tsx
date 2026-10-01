'use client';
import { useCssToken } from '@/hooks/useCssToken';
import { useState } from 'react';
import { Command } from 'cmdk';
import { Popover as Primitive } from 'radix-ui';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from './Button';
export function Combobox({
  label,
  options,
  value,
  onChange,
  disabled,
}: {
  label: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Primitive.Root open={open} onOpenChange={setOpen}>
      <Primitive.Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={label}
          disabled={disabled}
        >
          {options.find((option) => option.value === value)?.label || label}
          <ChevronsUpDown />
        </Button>
      </Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Content
          className="floating popover"
          sideOffset={parseFloat(useCssToken('--space-1')) || 0}
        >
          <Command>
            <Command.Input
              className="field"
              aria-label="Tìm trong danh sách"
              placeholder="Tìm trong danh sách"
            />
            <Command.List className="command-list">
              <Command.Empty className="muted-copy p-3">
                Không có mục phù hợp.
              </Command.Empty>
              {options.map((option) => (
                <Command.Item
                  className="menu-item"
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  {option.value === value && <Check aria-hidden="true" />}
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
