'use client';
import type { CSSProperties } from 'react';
import { useCssToken } from '@/hooks/useCssToken';
export function ColorSwatch({ token }: { token: string }) {
  const value = useCssToken(`--${token}`);
  return (
    <div className="swatch-card">
      <div
        className="color-swatch"
        style={{ '--sample-color': `var(--${token})` } as CSSProperties}
      />
      <div className="token-label">
        <code>{token}</code>
        <span className="token-value">{value || ' '}</span>
      </div>
    </div>
  );
}
