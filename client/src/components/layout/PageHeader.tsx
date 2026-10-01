import type { ReactNode } from 'react';
export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="row justify-between">
      <div className="stack gap-3">
        <h1>{title}</h1>
        {description && <p className="muted-copy">{description}</p>}
      </div>
      {action}
    </div>
  );
}
