import { ChibiButton } from '@chibi-ui/react/button';
import { ChibiMascot } from '@chibi-ui/react/mascot';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center outline-none"
    >
      <ChibiMascot mood="sad" className="size-24 text-chibi-accent" />
      <h1 className="m-0 text-4xl font-semibold">Page not found</h1>
      <p className="m-0 text-chibi-fg-muted">Mochi looked everywhere, even under the sofa.</p>
      <ChibiButton asChild>
        <Link href="/">Back home</Link>
      </ChibiButton>
    </main>
  );
}
