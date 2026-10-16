import type { ReactNode } from 'react';

export type ChibiToastVariant = 'success' | 'warning' | 'error' | 'info';

export interface ChibiToastAction {
  /** Visible button label. */
  label: string;
  /**
   * Describes how to achieve the same outcome without the toast, for screen-reader users
   * who may not reach it before it times out (required by Radix Toast).
   */
  altText: string;
  onClick: () => void;
}

export interface ChibiToastOptions {
  /** Pass an existing id to update that toast in place (e.g. "Saving…" → "Saved!"). */
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  variant?: ChibiToastVariant;
  /** Milliseconds before auto-dismiss. `Infinity` keeps it until dismissed. */
  duration?: number;
  action?: ChibiToastAction;
  /** Replace the mascot illustration (e.g. with an emoji), or `false` to hide it. */
  icon?: ReactNode | false;
}

export interface ChibiToastRecord extends ChibiToastOptions {
  id: string;
  variant: ChibiToastVariant;
}

type Listener = () => void;

export interface ChibiToastStore {
  subscribe: (listener: Listener) => () => void;
  getSnapshot: () => readonly ChibiToastRecord[];
  add: (options: ChibiToastOptions) => string;
  dismiss: (id?: string) => void;
}

const EMPTY: readonly ChibiToastRecord[] = [];
export const getServerSnapshot = () => EMPTY;

let counter = 0;
const nextId = () => `chibi-toast-${(counter = (counter + 1) % Number.MAX_SAFE_INTEGER)}`;

/**
 * A tiny external store (consumed with `useSyncExternalStore`). Each provider owns its
 * own instance, so there is no module-level state leaking between SSR requests or tests.
 */
export function createToastStore(limit: number): ChibiToastStore {
  let toasts: readonly ChibiToastRecord[] = EMPTY;
  const listeners = new Set<Listener>();

  const emit = (next: readonly ChibiToastRecord[]) => {
    toasts = next;
    listeners.forEach((listener) => listener());
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot: () => toasts,
    add(options) {
      const id = options.id ?? nextId();
      const record: ChibiToastRecord = { ...options, id, variant: options.variant ?? 'info' };
      const exists = toasts.some((toast) => toast.id === id);
      const next = exists
        ? toasts.map((toast) => (toast.id === id ? record : toast))
        : [...toasts, record];
      // Drop the oldest toasts beyond the limit so the stack never floods the screen.
      emit(next.slice(-limit));
      return id;
    },
    dismiss(id) {
      emit(id === undefined ? EMPTY : toasts.filter((toast) => toast.id !== id));
    },
  };
}
