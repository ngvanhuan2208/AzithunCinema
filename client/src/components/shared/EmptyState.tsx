import { Inbox } from 'lucide-react';
import type { ReactNode } from 'react';
export function EmptyState({
  message,
  action,
}: {
  message: string;
  action?: ReactNode;
}) {
  return (
    <div className="state">
      <Inbox aria-hidden="true" />
      <p>{message}</p>
      {action}
    </div>
  );
}
