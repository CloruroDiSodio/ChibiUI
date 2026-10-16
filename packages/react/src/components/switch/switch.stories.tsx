import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChibiSwitch } from './switch';

const meta = {
  title: 'Forms/Switch',
  component: ChibiSwitch,
  args: {
    label: 'Wake Mochi up',
    description: '',
    error: '',
    size: 'md',
    labelPosition: 'end',
    disabled: false,
    defaultChecked: false,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    labelPosition: { control: 'inline-radio', options: ['start', 'end'] },
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
  },
} satisfies Meta<typeof ChibiSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const WithDescription: Story = {
  args: { label: 'Sparkle mode', description: 'Adds extra sparkles to every page.' },
};
