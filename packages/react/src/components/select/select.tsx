import * as SelectPrimitive from '@radix-ui/react-select';
import type { ComponentProps, FocusEventHandler, ReactNode, Ref } from 'react';
import { cn } from '../../lib/cn';
import { devWarn } from '../../lib/dev';
import { focusRing } from '../../lib/styles';
import { FieldLabel, FieldMessages, useField, type ChibiFieldProps } from '../field/field';

export interface ChibiSelectProps
  extends Omit<ComponentProps<typeof SelectPrimitive.Root>, 'children'>, ChibiFieldProps {
  /** `ChibiSelectItem`s (optionally grouped with `ChibiSelectGroup`). */
  children: ReactNode;
  /** Text shown when no value is selected. */
  placeholder?: ReactNode;
  id?: string;
  /** Forwarded to the trigger button (react-hook-form uses it to focus invalid fields). */
  ref?: Ref<HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  size?: 'sm' | 'md' | 'lg';
  /** Class for the trigger button. */
  className?: string;
  /** Class for the outer wrapper (label + trigger + messages). */
  containerClassName?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

const triggerSizes = {
  sm: 'h-9 text-sm',
  md: 'h-11 text-base',
  lg: 'h-13 text-lg',
} as const;

export function ChibiSelect({
  label,
  description,
  error,
  placeholder,
  id,
  ref,
  onBlur,
  size = 'md',
  className,
  containerClassName,
  children,
  required,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...rootProps
}: ChibiSelectProps) {
  const field = useField({ id, description, error, 'aria-describedby': ariaDescribedBy });

  if (label === undefined && !ariaLabel && !ariaLabelledBy) {
    devWarn('select-label', 'ChibiSelect needs a `label`, `aria-label` or `aria-labelledby`.');
  }

  return (
    <div data-chibi="select" className={cn('flex w-full flex-col gap-1.5', containerClassName)}>
      {label !== undefined && (
        <FieldLabel htmlFor={field.fieldId} required={required}>
          {label}
        </FieldLabel>
      )}
      <SelectPrimitive.Root required={required} {...rootProps}>
        <SelectPrimitive.Trigger
          ref={ref}
          onBlur={onBlur}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-required={required || undefined}
          {...field.controlProps}
          data-invalid={field.invalid || undefined}
          className={cn(
            'group flex w-full items-center justify-between gap-2 rounded-chibi-md border-2 px-4 text-left',
            'border-chibi-border-strong bg-chibi-surface text-chibi-fg transition-[border-color] duration-200',
            'hover:border-chibi-fg-muted data-[state=open]:border-chibi-ring',
            'data-placeholder:text-chibi-fg-muted',
            'data-invalid:border-chibi-danger-fg data-invalid:focus-visible:outline-chibi-danger-fg',
            'disabled:cursor-not-allowed disabled:opacity-55',
            triggerSizes[size],
            focusRing,
            className,
          )}
        >
          <span className="truncate">
            <SelectPrimitive.Value placeholder={placeholder} />
          </span>
          <SelectPrimitive.Icon asChild>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              className={cn(
                'size-4 shrink-0 text-chibi-fg-muted transition-[rotate] duration-300 ease-chibi-bounce',
                'group-data-[state=open]:rotate-180 motion-reduce:transition-none',
              )}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.75}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            data-chibi="select-content"
            position="popper"
            sideOffset={6}
            className={cn(
              'relative z-50 max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width)',
              'origin-(--radix-select-content-transform-origin) overflow-hidden',
              'rounded-chibi-md border-2 border-chibi-border bg-chibi-surface font-chibi-body text-chibi-fg shadow-chibi-lg',
              'data-[state=open]:animate-chibi-pop-in motion-reduce:animate-none',
            )}
          >
            <SelectPrimitive.ScrollUpButton className="flex h-6 items-center justify-center text-chibi-fg-muted">
              <ScrollChevron direction="up" />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className="p-1.5">{children}</SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className="flex h-6 items-center justify-center text-chibi-fg-muted">
              <ScrollChevron direction="down" />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      <FieldMessages field={field} description={description} error={error} />
    </div>
  );
}

function ScrollChevron({ direction }: { direction: 'up' | 'down' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === 'up' ? 'M6 15l6-6 6 6' : 'M6 9l6 6 6-6'} />
    </svg>
  );
}

export type ChibiSelectItemProps = ComponentProps<typeof SelectPrimitive.Item>;

export function ChibiSelectItem({ className, children, ...props }: ChibiSelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-chibi="select-item"
      className={cn(
        'relative flex cursor-pointer items-center rounded-chibi-sm py-2 pr-3 pl-9 select-none',
        'outline-none data-highlighted:bg-chibi-ghost-hover',
        // A real outline (not just a tint) so the active option meets non-text contrast.
        'data-highlighted:outline-2 data-highlighted:-outline-offset-2 data-highlighted:outline-solid data-highlighted:outline-chibi-ring',
        'data-[state=checked]:font-semibold',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2.5 inline-flex size-5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className="size-4 text-chibi-accent"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export type ChibiSelectGroupProps = ComponentProps<typeof SelectPrimitive.Group>;
export const ChibiSelectGroup = SelectPrimitive.Group;

export function ChibiSelectLabel({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn(
        'px-3 pt-2 pb-1 font-chibi-display text-xs font-semibold tracking-wide text-chibi-fg-muted uppercase',
        className,
      )}
      {...props}
    />
  );
}

export function ChibiSelectSeparator({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn('mx-2 my-1.5 h-0.5 rounded-full bg-chibi-border', className)}
      {...props}
    />
  );
}
