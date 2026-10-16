import * as AccordionPrimitive from '@radix-ui/react-accordion';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import { focusRing } from '../../lib/styles';
import type { HeadingLevel } from '../../lib/types';
import { ChibiMascot } from '../mascot/mascot';

/** `type="single"` (optionally `collapsible`) or `type="multiple"`. */
export type ChibiAccordionProps = ComponentProps<typeof AccordionPrimitive.Root>;

export function ChibiAccordion({ className, ...props }: ChibiAccordionProps) {
  return (
    <AccordionPrimitive.Root
      data-chibi="accordion"
      className={cn('flex w-full flex-col gap-3 font-chibi-body', className)}
      {...props}
    />
  );
}

export type ChibiAccordionItemProps = ComponentProps<typeof AccordionPrimitive.Item>;

export function ChibiAccordionItem({ className, ...props }: ChibiAccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      data-chibi="accordion-item"
      className={cn(
        'rounded-chibi-lg border-2 border-chibi-border bg-chibi-surface text-chibi-fg',
        'transition-[border-color,box-shadow] duration-300',
        'data-[state=open]:border-chibi-primary data-[state=open]:shadow-chibi-sm',
        className,
      )}
      {...props}
    />
  );
}

export interface ChibiAccordionTriggerProps extends ComponentProps<
  typeof AccordionPrimitive.Trigger
> {
  /** Heading level wrapping the trigger, so it fits your document outline. */
  headingLevel?: Exclude<HeadingLevel, 1>;
  /** `chevron` rotates; `ears` shows Mochi waking up and twitching when opened. */
  icon?: 'chevron' | 'ears';
}

export function ChibiAccordionTrigger({
  headingLevel = 3,
  icon = 'chevron',
  className,
  children,
  ...props
}: ChibiAccordionTriggerProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <AccordionPrimitive.Header asChild>
      <Heading className="m-0 flex font-[inherit] text-[length:inherit]">
        <AccordionPrimitive.Trigger
          data-chibi="accordion-trigger"
          className={cn(
            'group flex flex-1 items-center justify-between gap-4 rounded-[calc(var(--chibi-radius-lg)-2px)]',
            'px-5 py-4 text-left font-chibi-display text-lg font-semibold',
            'transition-colors hover:bg-chibi-ghost-hover',
            'disabled:cursor-not-allowed disabled:opacity-55',
            focusRing,
            className,
          )}
          {...props}
        >
          {children}
          {icon === 'ears' ? <EarsIcon /> : <ChevronIcon />}
        </AccordionPrimitive.Trigger>
      </Heading>
    </AccordionPrimitive.Header>
  );
}

function ChevronIcon() {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex size-8 shrink-0 items-center justify-center rounded-chibi-full bg-chibi-surface-muted',
        'transition-[rotate,background-color] duration-300 ease-chibi-bounce',
        'group-data-[state=open]:rotate-180 group-data-[state=open]:bg-chibi-primary',
        'group-data-[state=open]:text-chibi-primary-fg motion-reduce:transition-none',
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </span>
  );
}

function EarsIcon() {
  return (
    <span aria-hidden="true" className="inline-flex size-8 shrink-0 items-center justify-center">
      <ChibiMascot mood="sleepy" className="size-8 group-data-[state=open]:hidden" />
      <ChibiMascot
        mood="happy"
        className={cn(
          'hidden size-8 text-chibi-accent group-data-[state=open]:block',
          'group-data-[state=open]:animate-chibi-wiggle motion-reduce:animate-none',
        )}
      />
    </span>
  );
}

export type ChibiAccordionContentProps = ComponentProps<typeof AccordionPrimitive.Content>;

export function ChibiAccordionContent({
  className,
  children,
  ...props
}: ChibiAccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      data-chibi="accordion-content"
      className={cn(
        'overflow-hidden',
        'data-[state=open]:animate-chibi-accordion-down data-[state=closed]:animate-chibi-accordion-up',
        'motion-reduce:animate-none',
      )}
      {...props}
    >
      <div className={cn('px-5 pb-5 leading-relaxed text-chibi-fg-muted', className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
