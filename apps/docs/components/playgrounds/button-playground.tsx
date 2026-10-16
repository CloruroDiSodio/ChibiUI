'use client';

import { ChibiButton } from '@chibi-ui/react/button';
import { expr, jsx, jsxText } from '@/lib/jsx';
import { HeartIcon } from '../icons';
import { PlaygroundShell, type Control } from '../playground-shell';
import { useControls } from '../use-controls';

const controls = [
  {
    type: 'select',
    name: 'variant',
    label: 'Variant',
    options: ['primary', 'secondary', 'ghost', 'kawaii'],
  },
  { type: 'select', name: 'size', label: 'Size', options: ['sm', 'md', 'lg'] },
  { type: 'text', name: 'label', label: 'Label' },
  { type: 'boolean', name: 'icon', label: 'Left icon' },
  { type: 'boolean', name: 'loading', label: 'Loading' },
  { type: 'select', name: 'spinner', label: 'Spinner', options: ['ring', 'mascot'] },
  { type: 'boolean', name: 'disabled', label: 'Disabled' },
] as const satisfies readonly Control[];

export function ButtonPlayground() {
  const [v, onChange] = useControls({
    variant: 'kawaii',
    size: 'md',
    label: 'Adopt Mochi',
    icon: true,
    loading: false,
    spinner: 'ring',
    disabled: false,
  });
  const variant = v.variant as 'primary' | 'secondary' | 'ghost' | 'kawaii';
  const size = v.size as 'sm' | 'md' | 'lg';
  const spinner = v.spinner as 'ring' | 'mascot';

  const code = [
    `import { ChibiButton } from '@chibi-ui/react/button';`,
    '',
    jsx(
      'ChibiButton',
      {
        variant: variant === 'primary' ? undefined : variant,
        size: size === 'md' ? undefined : size,
        leftIcon: v.icon ? expr('<HeartIcon />') : undefined,
        loading: v.loading,
        spinner: v.loading && spinner !== 'ring' ? spinner : undefined,
        disabled: v.disabled,
      },
      jsxText(v.label || ' '),
    ),
  ].join('\n');

  return (
    <PlaygroundShell
      controls={controls}
      values={v}
      onChange={onChange}
      code={code}
      preview={
        <ChibiButton
          variant={variant}
          size={size}
          leftIcon={v.icon ? <HeartIcon /> : undefined}
          loading={v.loading}
          spinner={spinner}
          disabled={v.disabled}
        >
          {v.label}
        </ChibiButton>
      }
    />
  );
}
