'use client';

import { ChibiButton } from '@chibi-ui/react/button';
import {
  ChibiDialog,
  ChibiDialogClose,
  ChibiDialogContent,
  ChibiDialogDescription,
  ChibiDialogFooter,
  ChibiDialogHeader,
  ChibiDialogTitle,
  ChibiDialogTrigger,
} from '@chibi-ui/react/dialog';
import { ChibiInput } from '@chibi-ui/react/input';
import { jsx, jsxText } from '@/lib/jsx';
import { PlaygroundShell, type Control } from '../playground-shell';
import { useControls } from '../use-controls';

const controls = [
  { type: 'select', name: 'size', label: 'Size', options: ['sm', 'md', 'lg'] },
  { type: 'text', name: 'title', label: 'Title' },
  { type: 'boolean', name: 'hideCloseButton', label: 'Hide close button' },
] as const satisfies readonly Control[];

export function DialogPlayground() {
  const [v, onChange] = useControls({ size: 'md', title: 'Adopt Mochi?', hideCloseButton: false });
  const size = v.size as 'sm' | 'md' | 'lg';

  const body = [
    '<ChibiDialogHeader>',
    `  <ChibiDialogTitle>${jsxText(v.title)}</ChibiDialogTitle>`,
    '  <ChibiDialogDescription>She enjoys naps and snacks.</ChibiDialogDescription>',
    '</ChibiDialogHeader>',
    '<ChibiInput label="Your name" />',
    '<ChibiDialogFooter>',
    '  <ChibiDialogClose asChild>',
    '    <ChibiButton variant="ghost">Maybe later</ChibiButton>',
    '  </ChibiDialogClose>',
    '  <ChibiButton>Yes, adopt!</ChibiButton>',
    '</ChibiDialogFooter>',
  ].join('\n');

  const code = [
    '<ChibiDialog>',
    '  <ChibiDialogTrigger asChild>',
    '    <ChibiButton>Adopt a cat</ChibiButton>',
    '  </ChibiDialogTrigger>',
    jsx(
      'ChibiDialogContent',
      { size: size === 'md' ? undefined : size, hideCloseButton: v.hideCloseButton },
      body,
      '  ',
    ).replace(/^/, '  '),
    '</ChibiDialog>',
  ].join('\n');

  return (
    <PlaygroundShell
      controls={controls}
      values={v}
      onChange={onChange}
      code={code}
      preview={
        <ChibiDialog>
          <ChibiDialogTrigger asChild>
            <ChibiButton variant="kawaii">Adopt a cat</ChibiButton>
          </ChibiDialogTrigger>
          <ChibiDialogContent size={size} hideCloseButton={v.hideCloseButton}>
            <ChibiDialogHeader>
              <ChibiDialogTitle>{v.title || 'Untitled'}</ChibiDialogTitle>
              <ChibiDialogDescription>She enjoys naps and snacks.</ChibiDialogDescription>
            </ChibiDialogHeader>
            <ChibiInput label="Your name" />
            <ChibiDialogFooter>
              <ChibiDialogClose asChild>
                <ChibiButton variant="ghost">Maybe later</ChibiButton>
              </ChibiDialogClose>
              <ChibiDialogClose asChild>
                <ChibiButton>Yes, adopt!</ChibiButton>
              </ChibiDialogClose>
            </ChibiDialogFooter>
          </ChibiDialogContent>
        </ChibiDialog>
      }
    />
  );
}
