'use client';

import { ChibiInput } from '@chibi-ui/react/input';
import { expr, jsx } from '@/lib/jsx';
import { MailIcon } from '../icons';
import { PlaygroundShell, type Control } from '../playground-shell';
import { useControls } from '../use-controls';

const controls = [
  { type: 'text', name: 'label', label: 'Label' },
  { type: 'select', name: 'labelVariant', label: 'Label variant', options: ['static', 'floating'] },
  { type: 'select', name: 'size', label: 'Size', options: ['sm', 'md', 'lg'] },
  { type: 'text', name: 'description', label: 'Description' },
  { type: 'text', name: 'error', label: 'Error' },
  { type: 'boolean', name: 'icon', label: 'Left icon' },
  { type: 'boolean', name: 'required', label: 'Required' },
  { type: 'boolean', name: 'disabled', label: 'Disabled' },
] as const satisfies readonly Control[];

export function InputPlayground() {
  const [v, onChange] = useControls({
    label: 'Email',
    labelVariant: 'floating',
    size: 'md',
    description: 'We only send cute newsletters.',
    error: '',
    icon: true,
    required: false,
    disabled: false,
  });
  const labelVariant = v.labelVariant as 'static' | 'floating';
  const size = v.size as 'sm' | 'md' | 'lg';

  const code = [
    `import { ChibiInput } from '@chibi-ui/react/input';`,
    '',
    jsx('ChibiInput', {
      label: v.label,
      type: 'email',
      labelVariant: labelVariant === 'static' ? undefined : labelVariant,
      size: size === 'md' || labelVariant === 'floating' ? undefined : size,
      description: v.description,
      error: v.error,
      leftIcon: v.icon ? expr('<MailIcon />') : undefined,
      required: v.required,
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
        <ChibiInput
          containerClassName="max-w-xs"
          type="email"
          label={v.label || undefined}
          aria-label={v.label ? undefined : 'Email'}
          labelVariant={labelVariant}
          size={size}
          description={v.description || undefined}
          error={v.error || undefined}
          leftIcon={v.icon ? <MailIcon /> : undefined}
          required={v.required}
          disabled={v.disabled}
          placeholder={labelVariant === 'static' ? 'mochi@example.com' : undefined}
        />
      }
    />
  );
}
