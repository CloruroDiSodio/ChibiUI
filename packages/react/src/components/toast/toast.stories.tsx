import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChibiButton } from '../button/button';
import { ChibiToastProvider, useChibiToast } from './toast';

function Demo() {
  const { toast, dismiss } = useChibiToast();
  return (
    <div className="flex flex-wrap gap-3">
      <ChibiButton onClick={() => toast.success('Saved!', { description: 'Your mochi is safe.' })}>
        Success
      </ChibiButton>
      <ChibiButton
        variant="secondary"
        onClick={() => toast.info('New message', { description: 'Mochi sent you a sticker.' })}
      >
        Info
      </ChibiButton>
      <ChibiButton
        variant="secondary"
        onClick={() => toast.warning('Running low', { description: 'Only 2 snacks left.' })}
      >
        Warning
      </ChibiButton>
      <ChibiButton
        variant="kawaii"
        onClick={() =>
          toast.error('Upload failed', {
            description: 'The server took a nap.',
            action: {
              label: 'Retry',
              altText: 'Retry the upload from the files page',
              onClick: () => {},
            },
          })
        }
      >
        Error + action
      </ChibiButton>
      <ChibiButton
        variant="ghost"
        onClick={() => {
          const id = toast({ title: 'Saving…', icon: '⏳', duration: Infinity });
          setTimeout(() => toast.success('All saved!', { id }), 1200);
        }}
      >
        Update in place
      </ChibiButton>
      <ChibiButton variant="ghost" onClick={() => dismiss()}>
        Dismiss all
      </ChibiButton>
    </div>
  );
}

const meta = {
  title: 'Components/Toast',
  component: ChibiToastProvider,
  args: { position: 'bottom-right', duration: 5000, limit: 3, children: null },
  argTypes: {
    position: {
      control: 'select',
      options: ['top-right', 'top-center', 'bottom-right', 'bottom-center'],
    },
    children: { control: false },
  },
  parameters: { layout: 'fullscreen' },
  render: ({ children: _children, ...args }) => (
    <ChibiToastProvider {...args}>
      <div className="grid min-h-96 place-items-center p-8">
        <Demo />
      </div>
    </ChibiToastProvider>
  ),
} satisfies Meta<typeof ChibiToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const TopCenter: Story = { args: { position: 'top-center' } };
