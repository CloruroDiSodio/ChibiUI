import * as ToastPrimitive from '@radix-ui/react-toast';
import { cva } from 'class-variance-authority';
import { AnimatePresence, m } from 'motion/react';
import { createContext, use, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ChibiMotion } from '../../lib/motion';
import { focusRing } from '../../lib/styles';
import { ChibiMascot, type ChibiMascotMood } from '../mascot/mascot';
import {
  createToastStore,
  getServerSnapshot,
  type ChibiToastOptions,
  type ChibiToastRecord,
  type ChibiToastStore,
  type ChibiToastVariant,
} from './store';

const ToastStoreContext = createContext<ChibiToastStore | null>(null);

export type ChibiToastPosition = 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';

export interface ChibiToastProviderProps {
  children: ReactNode;
  /** Where the stack is anchored. */
  position?: ChibiToastPosition;
  /** Default auto-dismiss delay in ms (errors get twice as long). */
  duration?: number;
  /** Maximum number of toasts shown at once; older ones are dropped. */
  limit?: number;
  /** Landmark label announced to screen-reader users, e.g. when pressing the hotkey. */
  label?: string;
  /** Keyboard shortcut that moves focus to the notifications region. */
  hotkey?: string[];
}

const swipeDirections: Record<ChibiToastPosition, 'right' | 'up' | 'down'> = {
  'top-right': 'right',
  'bottom-right': 'right',
  'top-center': 'up',
  'bottom-center': 'down',
};

const viewportPositions: Record<ChibiToastPosition, string> = {
  'top-right': 'top-0 right-0 sm:items-end',
  'bottom-right': 'bottom-0 right-0 sm:items-end',
  'top-center': 'top-0 left-1/2 -translate-x-1/2 items-center',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 items-center',
};

/**
 * Hosts the notification region. Render it once near the root of your app, then call
 * `useChibiToast()` anywhere below it.
 */
export function ChibiToastProvider({
  children,
  position = 'bottom-right',
  duration = 5000,
  limit = 3,
  label = 'Notifications',
  hotkey = ['F8'],
}: ChibiToastProviderProps) {
  const [store] = useState(() => createToastStore(limit));

  return (
    <ToastStoreContext value={store}>
      <ToastPrimitive.Provider
        duration={duration}
        label={label}
        swipeDirection={swipeDirections[position]}
      >
        {children}
        <ChibiMotion>
          <ToastList store={store} defaultDuration={duration} />
        </ChibiMotion>
        <ToastPrimitive.Viewport
          hotkey={hotkey}
          data-chibi="toast-viewport"
          className={cn(
            'fixed z-100 m-0 flex max-h-dvh w-full list-none flex-col p-4 outline-none sm:max-w-sm',
            position.startsWith('bottom') && 'flex-col-reverse',
            viewportPositions[position],
            focusRing,
          )}
        />
      </ToastPrimitive.Provider>
    </ToastStoreContext>
  );
}

function ToastList({
  store,
  defaultDuration,
}: {
  store: ChibiToastStore;
  defaultDuration: number;
}) {
  const toasts = useSyncExternalStore(store.subscribe, store.getSnapshot, getServerSnapshot);
  return (
    <AnimatePresence initial={false}>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          defaultDuration={defaultDuration}
          onDismiss={store.dismiss}
        />
      ))}
    </AnimatePresence>
  );
}

const toastVariants = cva(
  [
    'relative flex w-full items-start gap-3 rounded-chibi-lg border-2 p-4 pr-11 shadow-chibi-lg',
    'font-chibi-body',
    // Follow the finger while swiping (Radix exposes the offset as CSS variables).
    'group-data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
    'group-data-[swipe=move]:translate-y-[var(--radix-toast-swipe-move-y)]',
    'group-data-[swipe=cancel]:translate-x-0 group-data-[swipe=cancel]:translate-y-0',
    'group-data-[swipe=cancel]:transition-[translate] group-data-[swipe=cancel]:duration-200',
  ],
  {
    variants: {
      variant: {
        success: 'border-chibi-success-border bg-chibi-success-soft text-chibi-success-fg',
        warning: 'border-chibi-warning-border bg-chibi-warning-soft text-chibi-warning-fg',
        error: 'border-chibi-danger-border bg-chibi-danger-soft text-chibi-danger-fg',
        info: 'border-chibi-info-border bg-chibi-info-soft text-chibi-info-fg',
      },
    },
  },
);

const moods: Record<ChibiToastVariant, ChibiMascotMood> = {
  success: 'happy',
  warning: 'worried',
  error: 'sad',
  info: 'curious',
};

interface ToastItemProps {
  toast: ChibiToastRecord;
  defaultDuration: number;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, defaultDuration, onDismiss }: ToastItemProps) {
  const { id, variant, title, description, action, icon } = toast;
  const isError = variant === 'error';
  const duration = toast.duration ?? (isError ? defaultDuration * 2 : defaultDuration);

  return (
    <ToastPrimitive.Root
      asChild
      forceMount
      open
      onOpenChange={(open) => {
        if (!open) onDismiss(id);
      }}
      // Errors interrupt (assertive); everything else waits its turn (polite).
      type={isError ? 'foreground' : 'background'}
      duration={duration}
    >
      <m.li
        data-chibi="toast"
        data-variant={variant}
        className="group m-0 w-full list-none py-1.5 outline-none"
        initial={{ opacity: 0, y: 24, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        // Clip only while collapsing, so the resting shadow is never cut off.
        exit={{
          opacity: 0,
          scale: 0.9,
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          overflow: 'hidden',
        }}
        transition={{ type: 'spring', stiffness: 520, damping: 32 }}
      >
        <div className={toastVariants({ variant })}>
          {icon !== false && (
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center text-xl"
            >
              {icon ?? <ChibiMascot mood={moods[variant]} className="size-7" />}
            </span>
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <ToastPrimitive.Title className="font-chibi-display text-base leading-snug font-semibold">
              {title}
            </ToastPrimitive.Title>
            {description && (
              <ToastPrimitive.Description className="text-sm leading-relaxed opacity-90">
                {description}
              </ToastPrimitive.Description>
            )}
            {action && (
              <ToastPrimitive.Action
                altText={action.altText}
                onClick={action.onClick}
                className={cn(
                  'mt-2 inline-flex h-8 w-fit items-center rounded-chibi-full border-2 border-current px-3',
                  'font-chibi-display text-sm font-semibold transition-colors hover:bg-chibi-surface/60',
                  focusRing,
                )}
              >
                {action.label}
              </ToastPrimitive.Action>
            )}
          </div>
          <ToastPrimitive.Close
            aria-label="Dismiss notification"
            className={cn(
              'absolute top-3 right-3 inline-flex size-7 items-center justify-center rounded-chibi-full',
              'transition-colors hover:bg-chibi-surface/60',
              focusRing,
            )}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </ToastPrimitive.Close>
        </div>
      </m.li>
    </ToastPrimitive.Root>
  );
}

type ShortcutOptions = Omit<ChibiToastOptions, 'title' | 'variant'>;

export interface ChibiToastFn {
  (options: ChibiToastOptions): string;
  success: (title: ReactNode, options?: ShortcutOptions) => string;
  warning: (title: ReactNode, options?: ShortcutOptions) => string;
  error: (title: ReactNode, options?: ShortcutOptions) => string;
  info: (title: ReactNode, options?: ShortcutOptions) => string;
}

export interface UseChibiToastResult {
  /** Shows a toast and returns its id. Also exposes `.success()`, `.error()`, … shortcuts. */
  toast: ChibiToastFn;
  /** Dismisses one toast by id, or all of them when called without arguments. */
  dismiss: (id?: string) => void;
}

/** Imperative access to the nearest `ChibiToastProvider`. */
export function useChibiToast(): UseChibiToastResult {
  const store = use(ToastStoreContext);
  if (!store) {
    throw new Error('useChibiToast must be used within a <ChibiToastProvider>.');
  }

  return useMemo(() => {
    const shortcut =
      (variant: ChibiToastVariant) => (title: ReactNode, options?: ShortcutOptions) =>
        store.add({ ...options, title, variant });
    const toast = Object.assign((options: ChibiToastOptions) => store.add(options), {
      success: shortcut('success'),
      warning: shortcut('warning'),
      error: shortcut('error'),
      info: shortcut('info'),
    });
    return { toast, dismiss: store.dismiss };
  }, [store]);
}
