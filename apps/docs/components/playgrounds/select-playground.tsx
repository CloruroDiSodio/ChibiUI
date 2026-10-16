'use client';

import {
  ChibiSelect,
  ChibiSelectGroup,
  ChibiSelectItem,
  ChibiSelectLabel,
  ChibiSelectSeparator,
} from '@chibi-ui/react/select';
import { jsx } from '@/lib/jsx';
import { PlaygroundShell, type Control } from '../playground-shell';
import { useControls } from '../use-controls';

const controls = [
  { type: 'text', name: 'label', label: 'Label' },
  { type: 'text', name: 'placeholder', label: 'Placeholder' },
  { type: 'select', name: 'size', label: 'Size', options: ['sm', 'md', 'lg'] },
  { type: 'text', name: 'error', label: 'Error' },
  { type: 'boolean', name: 'disabled', label: 'Disabled' },
] as const satisfies readonly Control[];

export function SelectPlayground() {
  const [v, onChange] = useControls({
    label: 'Favourite flavour',
    placeholder: 'Pick a flavour',
    size: 'md',
    error: '',
    disabled: false,
  });
  const size = v.size as 'sm' | 'md' | 'lg';

  const code = [
    `import { ChibiSelect, ChibiSelectItem } from '@chibi-ui/react/select';`,
    '',
    jsx(
      'ChibiSelect',
      {
        label: v.label,
        placeholder: v.placeholder,
        size: size === 'md' ? undefined : size,
        error: v.error,
        disabled: v.disabled,
      },
      [
        '<ChibiSelectItem value="strawberry">Strawberry</ChibiSelectItem>',
        '<ChibiSelectItem value="peach">Peach</ChibiSelectItem>',
        '<ChibiSelectItem value="matcha">Matcha</ChibiSelectItem>',
      ].join('\n'),
    ),
  ].join('\n');

  return (
    <PlaygroundShell
      controls={controls}
      values={v}
      onChange={onChange}
      code={code}
      preview={
        <ChibiSelect
          containerClassName="max-w-xs"
          label={v.label || undefined}
          aria-label={v.label ? undefined : 'Flavour'}
          placeholder={v.placeholder}
          size={size}
          error={v.error || undefined}
          disabled={v.disabled}
        >
          <ChibiSelectGroup>
            <ChibiSelectLabel>Fruity</ChibiSelectLabel>
            <ChibiSelectItem value="strawberry">Strawberry</ChibiSelectItem>
            <ChibiSelectItem value="peach">Peach</ChibiSelectItem>
          </ChibiSelectGroup>
          <ChibiSelectSeparator />
          <ChibiSelectItem value="matcha">Matcha</ChibiSelectItem>
          <ChibiSelectItem value="sesame" disabled>
            Black sesame (sold out)
          </ChibiSelectItem>
        </ChibiSelect>
      }
    />
  );
}
