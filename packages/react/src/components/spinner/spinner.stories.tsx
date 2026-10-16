import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChibiMascot } from '../mascot/mascot';
import { ChibiSpinner } from './spinner';

const meta = {
  title: 'Components/Spinner & Mascot',
  component: ChibiSpinner,
  args: { variant: 'ring', size: 'lg', label: 'Loading…' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['ring', 'mascot'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof ChibiSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ring: Story = { args: { className: 'text-chibi-accent' } };
export const Mascot: Story = { args: { variant: 'mascot', className: 'text-chibi-accent' } };

export const Moods: Story = {
  render: () => (
    <div className="flex gap-6 text-chibi-fg">
      {(['happy', 'wink', 'curious', 'worried', 'sad', 'sleepy'] as const).map((mood) => (
        <figure key={mood} className="m-0 flex flex-col items-center gap-2">
          <ChibiMascot mood={mood} className="size-14" label={`Mochi looking ${mood}`} />
          <figcaption className="text-sm text-chibi-fg-muted">{mood}</figcaption>
        </figure>
      ))}
    </div>
  ),
};
