import type { ReactNode } from 'react';

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-10 flex flex-col gap-3">
      {eyebrow && (
        <p className="m-0 font-chibi-display text-sm font-semibold tracking-wider text-chibi-ring uppercase">
          {eyebrow}
        </p>
      )}
      <h1 className="m-0 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
      {children && <div className="max-w-2xl text-lg text-chibi-fg-muted">{children}</div>}
    </header>
  );
}

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="prose-code mb-12 flex flex-col gap-4 leading-relaxed">
      <h2 id={id} className="m-0 text-2xl font-semibold">
        <a href={`#${id}`} className="text-inherit no-underline hover:underline">
          {title}
        </a>
      </h2>
      {children}
    </section>
  );
}
