'use client';
import { useId, type ReactNode } from 'react';
import { CircleAlert } from 'lucide-react';
interface FieldControlProps {
  id: string;
  'aria-describedby'?: string;
  'aria-invalid'?: true;
}
export function FormField({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: (props: FieldControlProps) => ReactNode;
}) {
  const id = useId();
  return (
    <div className="stack gap-2">
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      {children({
        id,
        'aria-describedby': error || hint ? `${id}-message` : undefined,
        'aria-invalid': error ? true : undefined,
      })}
      {(error || hint) && (
        <p
          id={`${id}-message`}
          className={error ? 'field-error' : 'muted-copy'}
          aria-live="polite"
        >
          {error && <CircleAlert aria-hidden="true" />}
          {error || hint}
        </p>
      )}
    </div>
  );
}
