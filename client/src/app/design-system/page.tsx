import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DesignSystem } from './sections/DesignSystem';
export const metadata: Metadata = {
  title: 'Hệ thống thiết kế',
  robots: { index: false, follow: false },
};
export default function DesignSystemPage() {
  if (process.env.NODE_ENV !== 'development') notFound();
  return <DesignSystem />;
}
