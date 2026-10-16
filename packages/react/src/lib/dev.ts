const warned = new Set<string>();

/** Logs a one-time warning in development builds only (stripped by consumer bundlers in prod). */
export function devWarn(key: string, message: string): void {
  if (process.env.NODE_ENV === 'production' || warned.has(key)) return;
  warned.add(key);
  console.warn(`[ChibiUI] ${message}`);
}
