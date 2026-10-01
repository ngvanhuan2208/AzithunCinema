let startPromise: Promise<unknown> | undefined;
export function startMocks() {
  if (
    process.env.NODE_ENV !== 'development' ||
    process.env.NEXT_PUBLIC_MSW_ENABLED !== 'true'
  )
    return Promise.resolve();
  startPromise ??= import('./browser').then(({ worker }) =>
    worker.start({ onUnhandledRequest: 'bypass' }),
  );
  return startPromise;
}
