'use client';

import { useEffect, useRef, useState } from 'react';

export function CopyButton({ text }: { text: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
    } catch {
      // Clipboard API is unavailable on insecure origins or when permission is denied.
      setStatus('failed');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 font-chibi-display text-sm font-semibold text-chibi-ink-100 transition-colors hover:bg-chibi-ink-800"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {status === 'copied' ? (
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          ) : (
            <>
              <rect x="9" y="9" width="11" height="11" rx="2.5" />
              <path d="M15 9V6.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15H9" />
            </>
          )}
        </svg>
        {status === 'copied' ? 'Copied' : 'Copy'}
        <span className="sr-only"> code</span>
      </button>
      <span role="status" className="sr-only">
        {status === 'copied'
          ? 'Code copied to clipboard'
          : status === 'failed'
            ? 'Copy failed'
            : ''}
      </span>
    </>
  );
}
