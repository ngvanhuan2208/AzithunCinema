import { CircleAlert } from 'lucide-react';
import type { ReactNode } from 'react';
export function ErrorState({
  message,
  action,
}: {
  message: string;
  action?: ReactNode;
}) {
  return (
    <div className="state" role="alert">
      <CircleAlert aria-hidden="true" />
      <p>{message}</p>
      {action}
    </div>
  );
}
