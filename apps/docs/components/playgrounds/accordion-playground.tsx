'use client';

import {
  ChibiAccordion,
  ChibiAccordionContent,
  ChibiAccordionItem,
  ChibiAccordionTrigger,
} from '@chibi-ui/react/accordion';
import { jsx } from '@/lib/jsx';
import { PlaygroundShell, type Control } from '../playground-shell';
import { useControls } from '../use-controls';

const controls = [
  { type: 'select', name: 'type', label: 'Type', options: ['single', 'multiple'] },
  { type: 'select', name: 'icon', label: 'Icon', options: ['chevron', 'ears'] },
  { type: 'select', name: 'headingLevel', label: 'Heading level', options: ['2', '3', '4'] },
] as const satisfies readonly Control[];

const items = [
  ['Is it accessible?', 'Yes, every primitive is built on Radix UI and tested with axe-core.'],
  ['Can I theme it?', 'All colours are CSS variables, scoped per subtree with data-chibi-theme.'],
  [
    'Is it tree-shakable?',
    'Import from per-component entry points, e.g. @chibi-ui/react/accordion.',
  ],
] as const;

export function AccordionPlayground() {
  const [v, onChange] = useControls({ type: 'single', icon: 'ears', headingLevel: '3' });
  const icon = v.icon as 'chevron' | 'ears';
  const headingLevel = Number(v.headingLevel) as 2 | 3 | 4;

  const triggerProps = {
    icon: icon === 'chevron' ? undefined : icon,
    headingLevel: headingLevel === 3 ? undefined : headingLevel,
  };
  const code = jsx(
    'ChibiAccordion',
    { type: v.type, collapsible: v.type === 'single' },
    items
      .slice(0, 2)
      .map(([q, a], i) =>
        jsx(
          'ChibiAccordionItem',
          { value: `item-${i}` },
          `${jsx('ChibiAccordionTrigger', triggerProps, q)}\n<ChibiAccordionContent>${a}</ChibiAccordionContent>`,
        ),
      )
      .join('\n'),
  );

  const content = items.map(([q, a], i) => (
    <ChibiAccordionItem key={q} value={`item-${i}`}>
      <ChibiAccordionTrigger icon={icon} headingLevel={headingLevel}>
        {q}
      </ChibiAccordionTrigger>
      <ChibiAccordionContent>{a}</ChibiAccordionContent>
    </ChibiAccordionItem>
  ));

  return (
    <PlaygroundShell
      controls={controls}
      values={v}
      onChange={onChange}
      code={code}
      preview={
        <div className="w-full max-w-md">
          {/* Keyed so switching type remounts with a fresh value shape. */}
          {v.type === 'multiple' ? (
            <ChibiAccordion key="multiple" type="multiple" defaultValue={['item-0']}>
              {content}
            </ChibiAccordion>
          ) : (
            <ChibiAccordion key="single" type="single" collapsible defaultValue="item-0">
              {content}
            </ChibiAccordion>
          )}
        </div>
      }
    />
  );
}
