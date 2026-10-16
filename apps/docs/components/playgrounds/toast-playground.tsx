'use client';

import { ChibiButton } from '@chibi-ui/react/button';
import { useChibiToast, type ChibiToastVariant } from '@chibi-ui/react/toast';
import { PlaygroundShell, type Control } from '../playground-shell';
import { useControls } from '../use-controls';

const controls = [
  {
    type: 'select',
    name: 'variant',
    label: 'Variant',
    options: ['success', 'info', 'warning', 'error'],
  },
  { type: 'text', name: 'title', label: 'Title' },
  { type: 'text', name: 'description', label: 'Description' },
  { type: 'boolean', name: 'action', label: 'With action' },
  { type: 'boolean', name: 'persist', label: 'Persist (no timeout)' },
] as const satisfies readonly Control[];

export function ToastPlayground() {
  const { toast, dismiss } = useChibiToast();
  const [v, onChange] = useControls({
    variant: 'success',
    title: 'Saved!',
    description: 'Your mochi is safe and sound.',
    action: false,
    persist: false,
  });
  const variant = v.variant as ChibiToastVariant;

  const options = [
    v.description && `  description: ${JSON.stringify(v.description)},`,
    v.persist && '  duration: Infinity,',
    v.action &&
      "  action: { label: 'Undo', altText: 'Undo from the history panel', onClick: undo },",
  ].filter(Boolean);

  const code = [
    `import { useChibiToast } from '@chibi-ui/react/toast';`,
    '',
    '// Somewhere under <ChibiToastProvider>:',
    'const { toast } = useChibiToast();',
    '',
    options.length
      ? `toast.${variant}(${JSON.stringify(v.title)}, {\n${options.join('\n')}\n});`
      : `toast.${variant}(${JSON.stringify(v.title)});`,
  ].join('\n');

  const show = () =>
    toast[variant](v.title || 'Hello!', {
      description: v.description || undefined,
      duration: v.persist ? Infinity : undefined,
      action: v.action
        ? {
            label: 'Undo',
            altText: 'Undo from the history panel',
            onClick: () => toast.info('Undone'),
          }
        : undefined,
    });

  return (
    <PlaygroundShell
      controls={controls}
      values={v}
      onChange={onChange}
      code={code}
      preview={
        <div className="flex flex-wrap justify-center gap-3">
          <ChibiButton onClick={show}>Show toast</ChibiButton>
          <ChibiButton variant="ghost" onClick={() => dismiss()}>
            Dismiss all
          </ChibiButton>
        </div>
      }
    />
  );
}
