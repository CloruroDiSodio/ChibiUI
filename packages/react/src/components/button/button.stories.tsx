import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ArrowRightIcon, HeartIcon, SparkleIcon } from '../../stories/icons';
import { ChibiButton } from './button';

const meta = {
  title: 'Components/Button',
  component: ChibiButton,
  args: {
    children: 'Adopt Mochi',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'kawaii'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'icon'] },
    spinner: { control: 'inline-radio', options: ['ring', 'mascot'] },
    leftIcon: { control: false },
    rightIcon: { control: false },
    asChild: { control: false },
  },
} satisfies Meta<typeof ChibiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <ChibiButton {...args} variant="primary">
        Primary
      </ChibiButton>
      <ChibiButton {...args} variant="secondary">
        Secondary
      </ChibiButton>
      <ChibiButton {...args} variant="ghost">
        Ghost
      </ChibiButton>
      <ChibiButton {...args} variant="kawaii" leftIcon={<SparkleIcon />}>
        Kawaii
      </ChibiButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <ChibiButton {...args} size="sm">
        Small
      </ChibiButton>
      <ChibiButton {...args} size="md">
        Medium
      </ChibiButton>
      <ChibiButton {...args} size="lg">
        Large
      </ChibiButton>
      <ChibiButton {...args} size="icon" aria-label="Favourite" leftIcon={<HeartIcon />}>
        {null}
      </ChibiButton>
    </div>
  ),
};

export const WithIcons: Story = {
  args: { leftIcon: <HeartIcon />, rightIcon: <ArrowRightIcon />, children: 'Continue' },
};

export const Loading: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <ChibiButton {...args} loading loadingText="Saving…">
        Save
      </ChibiButton>
      <ChibiButton {...args} loading spinner="mascot" variant="kawaii">
        Fetching treats
      </ChibiButton>
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

export const AsLink: Story = {
  name: 'Polymorphic (asChild)',
  render: (args) => (
    <ChibiButton {...args} asChild variant="secondary" rightIcon={<ArrowRightIcon />}>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        Read the docs
      </a>
    </ChibiButton>
  ),
};
