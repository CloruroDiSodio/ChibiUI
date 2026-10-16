import { useCallback, useState } from 'react';

interface UseControllableStateParams<T> {
  prop?: T | undefined;
  defaultProp: T;
  onChange?: ((value: T) => void) | undefined;
}

/**
 * Supports both controlled (`prop` + `onChange`) and uncontrolled (`defaultProp`) usage,
 * mirroring the Radix primitives this library wraps.
 */
export function useControllableState<T>({
  prop,
  defaultProp,
  onChange,
}: UseControllableStateParams<T>): [T, (next: T) => void] {
  const [uncontrolled, setUncontrolled] = useState<T>(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolled;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next);
      if (!Object.is(next, value)) onChange?.(next);
    },
    [isControlled, value, onChange],
  );

  return [value, setValue];
}
