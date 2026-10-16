'use client';

import { ChibiSwitch } from '@chibi-ui/react/switch';
import { jsx } from '@/lib/jsx';
import { PlaygroundShell, type Control } from '../playground-shell';
import { useControls } from '../use-controls';

const controls = [
  { type: 'text', name: 'label', label: 'Label' },
  { type: 'select', name: 'size', label: 'Size', options: ['sm', 'md'] },
  { type: 'select', name: 'labelPosition', label: 'Label position', options: ['end', 'start'] },
  { type: 'text', name: 'description', label: 'Description' },
  { type: 'boolean', name: 'disabled', label: 'Disabled' },
] as const satisfies readonly Control[];

export function SwitchPlayground() {
  const [v, onChange] = useControls({
    label: 'Wake Mochi up',
    size: 'md',
    labelPosition: 'end',
    description: '',
    disabled: false,
  });
  const size = v.size as 'sm' | 'md';
  const labelPosition = v.labelPosition as 'start' | 'end';

  const code = [
    `import { ChibiSwitch } from '@chibi-ui/react/switch';`,
    '',
    jsx('ChibiSwitch', {
      label: v.label,
      size: size === 'md' ? undefined : size,
      labelPosition: labelPosition === 'end' ? undefined : labelPosition,
      description: v.description,
      disabled: v.disabled,
    }),
  ].join('\n');

  return (
    <PlaygroundShell
      controls={controls}
      values={v}
      onChange={onChange}
      code={code}
      preview={
        <ChibiSwitch
          label={v.label || undefined}
          aria-label={v.label ? undefined : 'Toggle'}
          size={size}
          labelPosition={labelPosition}
          description={v.description || undefined}
          disabled={v.disabled}
        />
      }
    />
  );
}
