import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type ChibiMascotMood = 'happy' | 'sad' | 'worried' | 'curious' | 'sleepy' | 'wink';

export interface ChibiMascotProps extends Omit<ComponentProps<'svg'>, 'children'> {
  /** Facial expression of Mochi, the ChibiUI cat. */
  mood?: ChibiMascotMood;
  /** Draws cat ears on top of the head. */
  ears?: boolean;
  /**
   * Accessible label. When omitted the illustration is treated as decorative
   * (`aria-hidden`), which is the right call when adjacent text conveys the meaning.
   */
  label?: string;
}

const dot = (cx: number) => <circle cx={cx} cy={12.5} r={1.25} fill="currentColor" stroke="none" />;

const eyes: Record<ChibiMascotMood, ReactNode> = {
  happy: (
    <>
      <path d="M7.4 13 q1.1 -1.6 2.2 0" />
      <path d="M14.4 13 q1.1 -1.6 2.2 0" />
    </>
  ),
  sad: (
    <>
      <path d="M7.3 11.6 l2.2 1.1 l-2.2 1.1" />
      <path d="M16.7 11.6 l-2.2 1.1 l2.2 1.1" />
    </>
  ),
  worried: (
    <>
      {dot(8.5)}
      {dot(15.5)}
    </>
  ),
  curious: (
    <>
      {dot(8.5)}
      {dot(15.5)}
    </>
  ),
  sleepy: (
    <>
      <path d="M7.4 12.4 q1.1 1.4 2.2 0" />
      <path d="M14.4 12.4 q1.1 1.4 2.2 0" />
    </>
  ),
  wink: (
    <>
      {dot(8.5)}
      <path d="M14.4 13 q1.1 -1.6 2.2 0" />
    </>
  ),
};

const mouths: Record<ChibiMascotMood, ReactNode> = {
  happy: <path d="M10.4 15.6 q1.6 1.8 3.2 0" />,
  sad: <path d="M10.4 17 q1.6 -1.6 3.2 0" />,
  worried: <ellipse cx={12} cy={16.4} rx={1} ry={1.2} />,
  curious: <path d="M10.8 16.2 h2.4" />,
  sleepy: <ellipse cx={12} cy={16.4} rx={0.8} ry={0.9} />,
  wink: <path d="M10.4 15.6 q0.8 1 1.6 0 q0.8 1 1.6 0" />,
};

/** Mochi — a tiny vector cat used for toasts, loaders and empty states. */
export function ChibiMascot({
  mood = 'happy',
  ears = true,
  label,
  className,
  ...props
}: ChibiMascotProps) {
  const decorative = label === undefined;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      data-chibi="mascot"
      data-mood={mood}
      className={cn('size-6 shrink-0', className)}
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': label })}
      focusable="false"
      {...props}
    >
      {ears && (
        <g fill="currentColor" fillOpacity={0.16}>
          <path d="M4.6 9.2 L5.2 3.4 L9.6 6.2" />
          <path d="M19.4 9.2 L18.8 3.4 L14.4 6.2" />
        </g>
      )}
      <ellipse cx={12} cy={13.4} rx={8.6} ry={7.6} fill="currentColor" fillOpacity={0.12} />
      <g className="fill-chibi-pink-300" fillOpacity={0.75} stroke="none">
        <ellipse cx={6.6} cy={15} rx={1.4} ry={0.9} />
        <ellipse cx={17.4} cy={15} rx={1.4} ry={0.9} />
      </g>
      {eyes[mood]}
      {mouths[mood]}
    </svg>
  );
}
