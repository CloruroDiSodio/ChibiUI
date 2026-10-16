import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ComponentProps,
  type PointerEvent,
} from 'react';
import { cn } from '../../lib/cn';
import { composeRefs } from '../../lib/compose';
import { focusRing } from '../../lib/styles';

const cardVariants = cva(
  [
    'relative isolate flex flex-col gap-4 overflow-hidden rounded-chibi-lg bg-chibi-surface p-6',
    'font-chibi-body text-chibi-fg',
  ],
  {
    variants: {
      variant: {
        elevated: 'shadow-chibi-md',
        outlined: 'border-2 border-chibi-border',
        interactive: [
          'border-2 border-chibi-border shadow-chibi-sm',
          'transition-[translate,box-shadow,border-color,transform] duration-300 ease-chibi-out',
          'hover:-translate-y-1 hover:border-chibi-primary hover:shadow-chibi-lg',
          'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
          focusRing,
        ],
      },
    },
    defaultVariants: { variant: 'elevated' },
  },
);

const MAX_TILT_DEG = 7;

export interface ChibiCardProps extends ComponentProps<'div'>, VariantProps<typeof cardVariants> {
  /** Render the single child element (e.g. `<a>` or `<article>`) with card styling. */
  asChild?: boolean;
  /**
   * Adds a subtle 3D tilt + glare following the mouse. Only applies to the
   * `interactive` variant and is disabled for touch input and reduced-motion users.
   */
  tilt?: boolean;
}

export function ChibiCard({
  asChild = false,
  variant,
  tilt = false,
  className,
  ref,
  onPointerMove,
  onPointerLeave,
  ...props
}: ChibiCardProps) {
  const Comp = asChild ? Slot : 'div';
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const frame = useRef(0);
  const tiltEnabled = tilt && variant === 'interactive';

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const handleMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      onPointerMove?.(event);
      const node = nodeRef.current;
      if (event.defaultPrevented || !tiltEnabled || !node || event.pointerType !== 'mouse') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { clientX, clientY } = event;
      // One style write per frame, straight to the DOM: no React re-render on pointer move.
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const x = (clientX - rect.left) / rect.width;
        const y = (clientY - rect.top) / rect.height;
        node.style.setProperty('--chibi-tilt-x', `${((0.5 - y) * MAX_TILT_DEG).toFixed(2)}deg`);
        node.style.setProperty('--chibi-tilt-y', `${((x - 0.5) * MAX_TILT_DEG).toFixed(2)}deg`);
        node.style.setProperty('--chibi-glare-x', `${(x * 100).toFixed(1)}%`);
        node.style.setProperty('--chibi-glare-y', `${(y * 100).toFixed(1)}%`);
        node.dataset.tilting = 'true';
      });
    },
    [tiltEnabled, onPointerMove],
  );

  const handleLeave = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      onPointerLeave?.(event);
      const node = nodeRef.current;
      if (!node) return;
      cancelAnimationFrame(frame.current);
      node.style.removeProperty('--chibi-tilt-x');
      node.style.removeProperty('--chibi-tilt-y');
      delete node.dataset.tilting;
    },
    [onPointerLeave],
  );

  const composedRef = useMemo(() => composeRefs(ref, nodeRef), [ref]);

  return (
    <Comp
      ref={composedRef}
      data-chibi="card"
      data-variant={variant ?? 'elevated'}
      className={cn(
        cardVariants({ variant }),
        tiltEnabled && [
          '[transform:perspective(900px)_rotateX(var(--chibi-tilt-x,0deg))_rotateY(var(--chibi-tilt-y,0deg))]',
          'data-tilting:will-change-transform',
          // Soft glare that follows the cursor.
          'before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-0',
          'before:bg-[radial-gradient(circle_at_var(--chibi-glare-x,50%)_var(--chibi-glare-y,50%),var(--chibi-glare),transparent_60%)]',
          'before:transition-opacity before:duration-300 data-tilting:before:opacity-70',
        ],
        className,
      )}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...props}
    />
  );
}

export function ChibiCardHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-chibi="card-header" className={cn('flex flex-col gap-1.5', className)} {...props} />
  );
}

export interface ChibiCardTitleProps extends ComponentProps<'h3'> {
  /** Render your own heading level, e.g. `<ChibiCardTitle asChild><h2>…</h2></ChibiCardTitle>`. */
  asChild?: boolean;
}

export function ChibiCardTitle({ asChild = false, className, ...props }: ChibiCardTitleProps) {
  const Comp = asChild ? Slot : 'h3';
  return (
    <Comp
      data-chibi="card-title"
      className={cn(
        'm-0 font-chibi-display text-xl leading-tight font-semibold tracking-tight text-chibi-fg',
        className,
      )}
      {...props}
    />
  );
}

export function ChibiCardDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-chibi="card-description"
      className={cn('m-0 text-sm leading-relaxed text-chibi-fg-muted', className)}
      {...props}
    />
  );
}

export function ChibiCardContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-chibi="card-content"
      className={cn('text-base leading-relaxed', className)}
      {...props}
    />
  );
}

export function ChibiCardFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-chibi="card-footer"
      className={cn('mt-auto flex flex-wrap items-center gap-3 pt-2', className)}
      {...props}
    />
  );
}

export { cardVariants };
