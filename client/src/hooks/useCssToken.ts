'use client';
import { useSyncExternalStore } from 'react';
const subscribe = (callback: () => void) => {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
};
// CSS is the source of truth, including for numeric Radix positioning props.
export function useCssToken(name: `--${string}`) {
  return useSyncExternalStore(
    subscribe,
    () =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
    () => '',
  );
}
