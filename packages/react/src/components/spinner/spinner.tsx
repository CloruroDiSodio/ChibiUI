import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import { ChibiMascot } from '../mascot/mascot';

const spinnerVariants = cva('inline-flex shrink-0 items-center justify-center', {
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-10',
    },
  },
  defaultVariants: { size: 'md' },
});

export interface ChibiSpinnerProps
  extends Omit<ComponentProps<'span'>, 'children'>, VariantProps<typeof spinnerVariants> {
  /** `ring` is a classic spinner; `mascot` is Mochi bobbing along. */
  variant?: 'ring' | 'mascot';
  /** Text announced to assistive tech. Ignored when `decorative` is true. */
  label?: string;
  /**
   * Hide the spinner from assistive tech. Use when a parent already exposes the
   * busy state (e.g. a button with `aria-busy`).
   */
  decorative?: boolean;
}

export function ChibiSpinner({
  variant = 'ring',
  size,
  label = 'Loading…',
  decorative = false,
  className,
  ...props
}: ChibiSpinnerProps) {
  return (
    <span
      data-chibi="spinner"
      data-variant={variant}
      {...(decorative ? { 'aria-hidden': true } : { role: 'status' })}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      {variant === 'mascot' ? (
        <ChibiMascot
          mood="wink"
          className="size-full animate-chibi-bob motion-reduce:animate-none"
        />
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
          // Under reduced motion the ring keeps turning (it conveys progress) but slowly.
          className="size-full animate-chibi-spin motion-reduce:animate-chibi-spin-slow"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="3"
          />
          <path
            d="M21 12a9 9 0 0 0-9-9"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )}
      {!decorative && <span className="sr-only">{label}</span>}
    </span>
  );
}

export { spinnerVariants };
