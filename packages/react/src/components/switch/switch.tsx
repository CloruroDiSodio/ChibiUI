import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import { devWarn } from '../../lib/dev';
import { focusRing } from '../../lib/styles';
import { ChibiMascot } from '../mascot/mascot';
import { FieldLabel, FieldMessages, useField, type ChibiFieldProps } from '../field/field';

const trackVariants = cva(
  [
    'peer relative inline-flex shrink-0 cursor-pointer items-center rounded-chibi-full border-2 p-0.5',
    // The strong border keeps the boundary at >= 3:1 in both states.
    'border-chibi-border-strong bg-chibi-surface-muted transition-colors duration-200',
    'data-[state=checked]:bg-chibi-primary',
    'data-invalid:border-chibi-danger-fg',
    'disabled:cursor-not-allowed disabled:opacity-55',
    focusRing,
  ],
  {
    variants: {
      size: {
        sm: 'h-6 w-10',
        md: 'h-8 w-14',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

const thumbVariants = cva(
  [
    'group/thumb pointer-events-none flex items-center justify-center rounded-chibi-full',
    'bg-chibi-surface text-chibi-fg shadow-chibi-sm ring-1 ring-chibi-border-strong',
    'transition-[translate] duration-300 ease-chibi-bounce motion-reduce:transition-none',
  ],
  {
    variants: {
      size: {
        sm: 'size-4 data-[state=checked]:translate-x-4',
        md: 'size-6 data-[state=checked]:translate-x-6',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export interface ChibiSwitchProps
  extends Omit<ComponentProps<typeof SwitchPrimitive.Root>, 'children'>, ChibiFieldProps {
  size?: 'sm' | 'md';
  /** Place the label before or after the switch. */
  labelPosition?: 'start' | 'end';
  /** Class for the outer wrapper (switch + label + messages). */
  containerClassName?: string;
}

export function ChibiSwitch({
  label,
  description,
  error,
  size,
  labelPosition = 'end',
  id,
  required,
  className,
  containerClassName,
  'aria-describedby': ariaDescribedBy,
  ...props
}: ChibiSwitchProps) {
  const field = useField({ id, description, error, 'aria-describedby': ariaDescribedBy });

  if (label === undefined && !props['aria-label'] && !props['aria-labelledby']) {
    devWarn('switch-label', 'ChibiSwitch needs a `label`, `aria-label` or `aria-labelledby`.');
  }

  const labelNode = label !== undefined && (
    <FieldLabel
      htmlFor={field.fieldId}
      required={required}
      className="cursor-pointer font-chibi-body text-base font-medium peer-disabled:cursor-not-allowed"
    >
      {label}
    </FieldLabel>
  );

  return (
    <div data-chibi="switch" className={cn('flex flex-col gap-1', containerClassName)}>
      <div className="inline-flex items-center gap-3">
        {labelPosition === 'start' && labelNode}
        <SwitchPrimitive.Root
          {...props}
          {...field.controlProps}
          required={required}
          data-invalid={field.invalid || undefined}
          className={cn(trackVariants({ size }), className)}
        >
          <SwitchPrimitive.Thumb className={thumbVariants({ size })}>
            <ChibiMascot
              mood="sleepy"
              className="size-full group-data-[state=checked]/thumb:hidden"
            />
            <ChibiMascot
              mood="happy"
              className="hidden size-full group-data-[state=checked]/thumb:block"
            />
          </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>
        {labelPosition === 'end' && labelNode}
      </div>
      <FieldMessages field={field} description={description} error={error} />
    </div>
  );
}
