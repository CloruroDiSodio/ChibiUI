'use client';

import { useCallback, useState } from 'react';
import type { ControlValues } from './playground-shell';

export function useControls<V extends ControlValues>(initial: V) {
  const [values, setValues] = useState<V>(initial);
  const onChange = useCallback(
    (name: keyof V & string, value: string | boolean) =>
      setValues((prev) => ({ ...prev, [name]: value })),
    [],
  );
  return [values, onChange] as const;
}
