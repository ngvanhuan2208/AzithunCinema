import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Tone } from './Badge';
export function Alert({
  tone = 'info',
  title,
  children,
}: {
  tone?: Exclude<Tone, 'neutral'>;
  title: string;
  children?: ReactNode;
}) {
  const Icon = {
    info: Info,
    success: CircleCheck,
    warning: TriangleAlert,
    danger: CircleAlert,
  }[tone];
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={`alert tone-${tone}`}
    >
      <Icon aria-hidden="true" />
      <div className="stack gap-1">
        <strong>{title}</strong>
        {children && <div className="text-body-sm">{children}</div>}
      </div>
    </div>
  );
}
