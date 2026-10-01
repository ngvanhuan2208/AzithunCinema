import { Alert } from './Alert';
import type { ComponentProps } from 'react';
export function Banner(props: ComponentProps<typeof Alert>) {
  return <Alert {...props} />;
}
