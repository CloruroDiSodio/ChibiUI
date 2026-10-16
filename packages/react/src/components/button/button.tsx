import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, MouseEvent, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { devWarn } from '../../lib/dev';
import { focusRing } from '../../lib/styles';
import { ChibiSpinner } from '../spinner/spinner';

const buttonVariants = cva(
  [
    'relative inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap',
    'rounded-chibi-full font-chibi-display font-semibold leading-none no-underline',
    'transition-[transform,background-color,box-shadow,color,translate,scale] duration-150 ease-chibi-out',
    'active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100',
    'disabled:pointer-events-none disabled:opacity-55',
    'aria-disabled:pointer-events-none aria-disabled:not-data-loading:opacity-55',
    '[&_svg]:pointer-events-none',
    focusRing,
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-chibi-primary text-chibi-primary-fg shadow-chibi-sm hover:bg-chibi-primary-hover hover:shadow-chibi-md',
        secondary:
          'bg-chibi-secondary text-chibi-secondary-fg shadow-chibi-sm hover:bg-chibi-secondary-hover hover:shadow-chibi-md',
        ghost: 'bg-transparent text-chibi-fg hover:bg-chibi-ghost-hover',
        kawaii: [
          'bg-linear-to-br from-chibi-kawaii-from to-chibi-kawaii-to text-chibi-kawaii-fg shadow-chibi-pop',
          // Squish on press, springy overshoot on release (bounce easing).
          'duration-300 ease-chibi-bounce hover:-translate-y-0.5',
          'active:translate-y-1 active:scale-90 active:shadow-none active:duration-75',
          'motion-reduce:hover:translate-y-0 motion-reduce:active:translate-y-0',
        ],
      },
      size: {
        sm: 'h-8 px-3.5 text-sm [&_svg]:size-4',
        md: 'h-10 px-5 text-base [&_svg]:size-5',
        lg: 'h-12 px-7 text-lg [&_svg]:size-5',
        icon: 'size-10 p-0 [&_svg]:size-5',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
);

export type ChibiButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;
export type ChibiButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;

export interface ChibiButtonProps
  extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  /**
   * Render the single child element instead of a `<button>`, merging props and
   * behaviour into it (e.g. `<a>` or a router `<Link>`).
   */
  asChild?: boolean;
  /** Shows a spinner, sets `aria-busy` and blocks activation while keeping focus. */
  loading?: boolean;
  /** Label shown while loading. Ignored with `asChild`. */
  loadingText?: string;
  /** Spinner style shown while loading. */
  spinner?: 'ring' | 'mascot';
  /** Decorative icon rendered before the label. */
  leftIcon?: ReactNode;
  /** Decorative icon rendered after the label. */
  rightIcon?: ReactNode;
}

export function ChibiButton({
  asChild = false,
  variant,
  size,
  fullWidth,
  loading = false,
  loadingText,
  spinner = 'ring',
  leftIcon,
  rightIcon,
  disabled = false,
  type,
  className,
  children,
  onClick,
  ...props
}: ChibiButtonProps) {
  const Comp = asChild ? Slot : 'button';
  const blocked = disabled || loading;
  // Native `disabled` drops focus, which would strand keyboard users mid-action, so a
  // loading button (and any non-<button> rendered via asChild) uses aria-disabled.
  const useNativeDisabled = disabled && !loading && !asChild;

  if (size === 'icon' && !props['aria-label'] && !props['aria-labelledby']) {
    devWarn(
      'button-icon-label',
      'Icon-only ChibiButton needs an `aria-label` (or `aria-labelledby`) to have an accessible name.',
    );
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (blocked) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const iconSlot = (icon: ReactNode) =>
    icon ? (
      <span aria-hidden="true" data-slot="icon" className="inline-flex">
        {icon}
      </span>
    ) : null;

  return (
    <Comp
      data-chibi="button"
      data-variant={variant ?? 'primary'}
      data-loading={loading || undefined}
      type={asChild ? undefined : (type ?? 'button')}
      disabled={useNativeDisabled || undefined}
      aria-disabled={blocked && !useNativeDisabled ? true : undefined}
      aria-busy={loading || undefined}
      onClick={handleClick}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    >
      {loading ? <ChibiSpinner decorative size="sm" variant={spinner} /> : iconSlot(leftIcon)}
      <Slottable>{loading && loadingText && !asChild ? loadingText : children}</Slottable>
      {!loading && iconSlot(rightIcon)}
    </Comp>
  );
}

export { buttonVariants };
