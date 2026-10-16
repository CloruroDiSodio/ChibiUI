import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ChibiSelect,
  ChibiSelectGroup,
  ChibiSelectItem,
  ChibiSelectLabel,
  ChibiSelectSeparator,
} from './select';

const meta = {
  title: 'Forms/Select',
  component: ChibiSelect,
  args: {
    label: 'Favourite flavour',
    placeholder: 'Pick a flavour',
    description: '',
    error: '',
    disabled: false,
    size: 'md',
    children: null,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    children: { control: false },
  },
  decorators: [(Story) => <div className="w-80">{Story()}</div>],
  render: ({ children: _children, ...args }) => (
    <ChibiSelect {...args}>
      <ChibiSelectGroup>
        <ChibiSelectLabel>Fruity</ChibiSelectLabel>
        <ChibiSelectItem value="strawberry">🍓 Strawberry</ChibiSelectItem>
        <ChibiSelectItem value="peach">🍑 Peach</ChibiSelectItem>
      </ChibiSelectGroup>
      <ChibiSelectSeparator />
      <ChibiSelectGroup>
        <ChibiSelectLabel>Earthy</ChibiSelectLabel>
        <ChibiSelectItem value="matcha">🍵 Matcha</ChibiSelectItem>
        <ChibiSelectItem value="sesame" disabled>
          Black sesame (sold out)
        </ChibiSelectItem>
      </ChibiSelectGroup>
    </ChibiSelect>
  ),
} satisfies Meta<typeof ChibiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const WithError: Story = { args: { error: 'Please pick a flavour' } };
