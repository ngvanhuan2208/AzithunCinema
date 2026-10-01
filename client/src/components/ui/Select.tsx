'use client';
import { useCssToken } from '@/hooks/useCssToken';
import { Select as Primitive } from 'radix-ui';
import { Check, ChevronDown } from 'lucide-react';
export function Select({
  options,
  placeholder = 'Chọn một mục',
  label,
  id,
  disabled,
  value,
  onValueChange,
  ...props
}: {
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
  label: string;
  id?: string;
  disabled?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
}) {
  return (
    <Primitive.Root
      disabled={disabled}
      value={value}
      onValueChange={onValueChange}
    >
      <Primitive.Trigger
        id={id}
        aria-label={label}
        className="field flex items-center justify-between"
        {...props}
      >
        <Primitive.Value placeholder={placeholder} />
        <Primitive.Icon>
          <ChevronDown />
        </Primitive.Icon>
      </Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Content
          className="floating"
          position="popper"
          sideOffset={parseFloat(useCssToken('--space-1')) || 0}
        >
          <Primitive.Viewport>
            {options.map((option) => (
              <Primitive.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="menu-item"
              >
                <Primitive.ItemText>{option.label}</Primitive.ItemText>
                <Primitive.ItemIndicator>
                  <Check />
                </Primitive.ItemIndicator>
              </Primitive.Item>
            ))}
          </Primitive.Viewport>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
