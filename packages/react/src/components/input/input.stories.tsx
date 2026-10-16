import type { Meta, StoryObj } from '@storybook/react-vite';
import { MailIcon, SearchIcon } from '../../stories/icons';
import { ChibiInput } from './input';

const meta = {
  title: 'Forms/Input',
  component: ChibiInput,
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'mochi@example.com',
    labelVariant: 'static',
    size: 'md',
    description: '',
    error: '',
    disabled: false,
    required: false,
  },
  argTypes: {
    labelVariant: { control: 'inline-radio', options: ['static', 'floating'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
  decorators: [(Story) => <div className="w-80">{Story()}</div>],
} satisfies Meta<typeof ChibiInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Floating: Story = { args: { labelVariant: 'floating' } };
export const WithDescription: Story = { args: { description: 'We only send cute newsletters.' } };
export const WithError: Story = { args: { error: 'Please enter a valid email address' } };
export const WithIcon: Story = { args: { leftIcon: <MailIcon /> } };
export const Search: Story = {
  args: { label: 'Search', type: 'search', placeholder: 'Find snacks…', leftIcon: <SearchIcon /> },
};
