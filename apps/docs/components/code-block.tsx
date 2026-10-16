import { tokenize, type TokenType } from '@/lib/highlight';
import { CopyButton } from './copy-button';

// Pastel-on-ink palette. Every colour is >= 7:1 against the ink-950 background.
const tokenClass: Record<TokenType, string> = {
  comment: 'text-chibi-ink-400 italic',
  string: 'text-chibi-mint-300',
  keyword: 'text-chibi-lavender-300',
  tag: 'text-chibi-pink-300',
  attr: 'text-chibi-yellow-300',
  number: 'text-chibi-blue-300',
  punct: 'text-chibi-ink-300',
  plain: 'text-chibi-ink-50',
};

interface CodeBlockProps {
  code: string;
  /** Short caption, e.g. a file name or "Usage". */
  title?: string;
  className?: string;
}

/** Usable from both server and client components (it has no directive of its own). */
export function CodeBlock({ code, title = 'TSX', className = '' }: CodeBlockProps) {
  return (
    <figure
      className={`m-0 overflow-hidden rounded-chibi-lg border-2 border-chibi-ink-800 bg-chibi-ink-950 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-chibi-ink-800 py-1 pr-2 pl-4">
        <figcaption className="font-chibi-display text-xs font-semibold tracking-wide text-chibi-ink-300 uppercase">
          {title}
        </figcaption>
        <CopyButton text={code} />
      </div>
      {/* tabIndex makes the horizontally scrollable region keyboard-reachable. */}
      <pre
        tabIndex={0}
        className="m-0 overflow-x-auto p-4 text-sm leading-relaxed focus-visible:outline-offset-[-3px]"
      >
        <code>
          {tokenize(code).map((token, index) => (
            <span key={index} className={tokenClass[token.type]}>
              {token.text}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
