/**
 * Renders a static inline script that runs during HTML parsing (before first paint).
 * On the client the type flips to text/plain so React doesn't warn about (or re-run) it.
 * Only ever pass trusted, build-time strings here.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
