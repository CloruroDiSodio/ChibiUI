import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { AnimatePresence, m } from 'motion/react';
import { createContext, use, type ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import { ChibiMotion } from '../../lib/motion';
import { focusRing } from '../../lib/styles';
import { useControllableState } from '../../lib/use-controllable-state';

const DialogOpenContext = createContext(false);

export type ChibiDialogProps = ComponentProps<typeof DialogPrimitive.Root>;

/**
 * Root of a modal dialog. Supports controlled (`open` + `onOpenChange`) and
 * uncontrolled (`defaultOpen`) usage.
 */
export function ChibiDialog({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: ChibiDialogProps) {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <DialogOpenContext value={open}>
      <DialogPrimitive.Root open={open} onOpenChange={setOpen} {...props} />
    </DialogOpenContext>
  );
}

/** Opens the dialog. Use `asChild` to turn a `ChibiButton` into the trigger. */
export const ChibiDialogTrigger = DialogPrimitive.Trigger;
export type ChibiDialogTriggerProps = ComponentProps<typeof DialogPrimitive.Trigger>;

/** Closes the dialog. Use `asChild` to render your own button. */
export const ChibiDialogClose = DialogPrimitive.Close;
export type ChibiDialogCloseProps = ComponentProps<typeof DialogPrimitive.Close>;

const contentVariants = cva(
  [
    'pointer-events-auto relative w-full max-h-[calc(100dvh-2rem)] overflow-y-auto',
    'rounded-chibi-lg border-2 border-chibi-border bg-chibi-surface p-6 sm:p-8 shadow-chibi-lg',
    'font-chibi-body text-chibi-fg outline-none',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export interface ChibiDialogContentProps
  extends
    Omit<ComponentProps<typeof DialogPrimitive.Content>, 'forceMount' | 'asChild'>,
    VariantProps<typeof contentVariants> {
  /** Hide the built-in top-right close button (provide your own `ChibiDialogClose`). */
  hideCloseButton?: boolean;
  /** Accessible label of the built-in close button. */
  closeLabel?: string;
  /** Portal container. Defaults to `document.body`. */
  container?: HTMLElement | null;
}

const popIn = {
  initial: { opacity: 0, scale: 0.85, y: 24 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 420, damping: 22, mass: 0.9 },
  },
  exit: { opacity: 0, scale: 0.94, y: 8, transition: { duration: 0.15, ease: 'easeIn' } },
} as const;

export function ChibiDialogContent({
  size,
  hideCloseButton = false,
  closeLabel = 'Close dialog',
  container,
  className,
  children,
  ...props
}: ChibiDialogContentProps) {
  const open = use(DialogOpenContext);

  return (
    <ChibiMotion>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal key="chibi-dialog" forceMount container={container}>
            <DialogPrimitive.Overlay forceMount asChild>
              <m.div
                data-chibi="dialog-overlay"
                className={cn(
                  'fixed inset-0 z-50 bg-chibi-overlay backdrop-blur-md backdrop-saturate-150',
                  // Pastel glass, unless the user asked for less transparency.
                  'reduce-transparency:bg-chibi-bg/95 reduce-transparency:backdrop-blur-none',
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </DialogPrimitive.Overlay>
            {/* Grid centring keeps `transform` free for the pop-in animation. */}
            <div className="pointer-events-none fixed inset-0 z-50 grid place-items-center p-4">
              <DialogPrimitive.Content forceMount asChild {...props}>
                <m.div
                  data-chibi="dialog-content"
                  className={cn(contentVariants({ size }), className)}
                  {...popIn}
                >
                  {children}
                  {!hideCloseButton && (
                    <DialogPrimitive.Close
                      aria-label={closeLabel}
                      className={cn(
                        'absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-chibi-full',
                        'text-chibi-fg-muted transition-[background-color,color,rotate] duration-200 ease-chibi-bounce',
                        'hover:rotate-90 hover:bg-chibi-ghost-hover hover:text-chibi-fg motion-reduce:hover:rotate-0',
                        focusRing,
                      )}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                        className="size-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                      >
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </DialogPrimitive.Close>
                  )}
                </m.div>
              </DialogPrimitive.Content>
            </div>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </ChibiMotion>
  );
}

export function ChibiDialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-chibi="dialog-header"
      className={cn('mb-4 flex flex-col gap-1.5 pr-10', className)}
      {...props}
    />
  );
}

export function ChibiDialogTitle({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-chibi="dialog-title"
      className={cn('m-0 font-chibi-display text-2xl leading-tight font-semibold', className)}
      {...props}
    />
  );
}

export function ChibiDialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-chibi="dialog-description"
      className={cn('m-0 text-sm leading-relaxed text-chibi-fg-muted', className)}
      {...props}
    />
  );
}

export function ChibiDialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-chibi="dialog-footer"
      className={cn('mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  );
}
