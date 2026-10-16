'use client';

import {
  ChibiCard,
  ChibiCardContent,
  ChibiCardDescription,
  ChibiCardFooter,
  ChibiCardHeader,
  ChibiCardTitle,
} from '@chibi-ui/react/card';
import { ChibiButton } from '@chibi-ui/react/button';
import { jsx, jsxText } from '@/lib/jsx';
import { PlaygroundShell, type Control } from '../playground-shell';
import { useControls } from '../use-controls';

const controls = [
  {
    type: 'select',
    name: 'variant',
    label: 'Variant',
    options: ['elevated', 'outlined', 'interactive'],
  },
  { type: 'boolean', name: 'tilt', label: 'Tilt (interactive)' },
  { type: 'text', name: 'title', label: 'Title' },
  { type: 'text', name: 'description', label: 'Description' },
] as const satisfies readonly Control[];

export function CardPlayground() {
  const [v, onChange] = useControls({
    variant: 'interactive',
    tilt: true,
    title: 'Strawberry mochi',
    description: 'Soft, squishy and a little bit pink.',
  });
  const variant = v.variant as 'elevated' | 'outlined' | 'interactive';

  const inner = [
    '<ChibiCardHeader>',
    `  <ChibiCardTitle>${jsxText(v.title)}</ChibiCardTitle>`,
    `  <ChibiCardDescription>${jsxText(v.description)}</ChibiCardDescription>`,
    '</ChibiCardHeader>',
    '<ChibiCardContent>Hand-made every morning.</ChibiCardContent>',
    '<ChibiCardFooter>',
    '  <ChibiButton size="sm">Add to box</ChibiButton>',
    '</ChibiCardFooter>',
  ].join('\n');

  const code = [
    `import {\n  ChibiCard,\n  ChibiCardContent,\n  ChibiCardDescription,\n  ChibiCardFooter,\n  ChibiCardHeader,\n  ChibiCardTitle,\n} from '@chibi-ui/react/card';`,
    '',
    jsx(
      'ChibiCard',
      {
        variant: variant === 'elevated' ? undefined : variant,
        tilt: variant === 'interactive' && v.tilt,
      },
      inner,
    ),
  ].join('\n');

  return (
    <PlaygroundShell
      controls={controls}
      values={v}
      onChange={onChange}
      code={code}
      preview={
        <ChibiCard variant={variant} tilt={v.tilt} className="w-full max-w-xs">
          <ChibiCardHeader>
            <ChibiCardTitle>{v.title}</ChibiCardTitle>
            <ChibiCardDescription>{v.description}</ChibiCardDescription>
          </ChibiCardHeader>
          <ChibiCardContent>Hand-made every morning.</ChibiCardContent>
          <ChibiCardFooter>
            <ChibiButton size="sm">Add to box</ChibiButton>
          </ChibiCardFooter>
        </ChibiCard>
      }
    />
  );
}
