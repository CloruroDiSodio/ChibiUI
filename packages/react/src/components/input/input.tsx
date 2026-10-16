import { cva } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { devWarn } from '../../lib/dev';
import { FieldLabel, FieldMessages, useField, type ChibiFieldProps } from '../field/field';

const controlVariants = cva(
  [
    'relative flex w-full items-center rounded-chibi-md border-2 bg-chibi-surface text-chibi-fg',
    'transition-[border-color,box-shadow] duration-200',
    'border-chibi-border-strong hover:border-chibi-fg-muted',
    // The wrapper draws the focus ring for the inner <input>.
    'outline-offset-2 focus-within:border-chibi-ring focus-within:outline-3 focus-within:outline-solid focus-within:outline-chibi-ring',
    'data-invalid:border-chibi-danger-fg data-invalid:focus-within:outline-chibi-danger-fg',
    'has-disabled:cursor-not-allowed has-disabled:opacity-55',
  ],
  {
    variants: {
      size: {
        sm: 'h-9 text-sm',
        md: 'h-11 text-base',
        lg: 'h-13 text-lg',
      },
      floating: {
        true: 'h-14 text-base',
        false: '',
      },
    },
    defaultVariants: { size: 'md', floating: false },
  },
);

export interface ChibiInputProps extends Omit<ComponentProps<'input'>, 'size'>, ChibiFieldProps {
  /**
   * `static` renders the label above the control. `floating` renders it inside and
   * animates it up on focus / when filled (the label is always visible, never a placeholder).
   */
  labelVariant?: 'static' | 'floating';
  size?: 'sm' | 'md' | 'lg';
  /** Decorative adornment before the text. */
  leftIcon?: ReactNode;
  /** Decorative adornment after the text. */
  rightIcon?: ReactNode;
  /** Class for the outer wrapper (label + control + messages). */
  containerClassName?: string;
}

export function ChibiInput({
  label,
  description,
  error,
  labelVariant = 'static',
  size,
  leftIcon,
  rightIcon,
  id,
  required,
  disabled,
  placeholder,
  className,
  containerClassName,
  'aria-describedby': ariaDescribedBy,
  ...props
}: ChibiInputProps) {
  const field = useField({ id, description, error, 'aria-describedby': ariaDescribedBy });
  const floating = labelVariant === 'floating' && label !== undefined;

  if (label === undefined && !props['aria-label'] && !props['aria-labelledby']) {
    devWarn('input-label', 'ChibiInput needs a `label`, `aria-label` or `aria-labelledby`.');
  }

  return (
    <div data-chibi="input" className={cn('flex w-full flex-col gap-1.5', containerClassName)}>
      {label !== undefined && !floating && (
        <FieldLabel htmlFor={field.fieldId} required={required}>
          {label}
        </FieldLabel>
      )}
      <div
        data-slot="control"
        data-invalid={field.invalid || undefined}
        className={controlVariants({ size: floating ? undefined : size, floating })}
      >
        {leftIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none flex pl-3.5 text-chibi-fg-muted [&_svg]:size-5"
          >
            {leftIcon}
          </span>
        )}
        <input
          {...props}
          {...field.controlProps}
          required={required}
          disabled={disabled}
          // `:placeholder-shown` drives the floating label, so a blank placeholder is required.
          placeholder={floating ? ' ' : placeholder}
          className={cn(
            'peer h-full w-full min-w-0 flex-1 rounded-[inherit] bg-transparent px-4 outline-none',
            'placeholder:text-chibi-fg-muted disabled:cursor-not-allowed',
            leftIcon && 'pl-2.5',
            rightIcon && 'pr-2.5',
            floating && 'pt-5 pb-1.5',
            className,
          )}
        />
        {floating && (
          <FieldLabel
            htmlFor={field.fieldId}
            required={required}
            className={cn(
              'pointer-events-none absolute top-2 origin-left text-xs font-semibold text-chibi-fg-muted',
              'transition-[top,font-size,translate] duration-200 ease-chibi-out motion-reduce:transition-none',
              'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium',
              'peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-chibi-fg',
              leftIcon ? 'left-11' : 'left-4',
            )}
          >
            {label}
          </FieldLabel>
        )}
        {rightIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none flex pr-3.5 text-chibi-fg-muted [&_svg]:size-5"
          >
            {rightIcon}
          </span>
        )}
      </div>
      <FieldMessages field={field} description={description} error={error} />
    </div>
  );
}
