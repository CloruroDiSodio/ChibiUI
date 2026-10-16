import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChibiButton } from '../button/button';
import {
  ChibiCard,
  ChibiCardContent,
  ChibiCardDescription,
  ChibiCardFooter,
  ChibiCardHeader,
  ChibiCardTitle,
} from './card';

const meta = {
  title: 'Components/Card',
  component: ChibiCard,
  args: { variant: 'elevated', tilt: false },
  argTypes: {
    variant: { control: 'inline-radio', options: ['elevated', 'outlined', 'interactive'] },
    asChild: { control: false },
  },
  render: (args) => (
    <ChibiCard {...args} className="w-80">
      <ChibiCardHeader>
        <ChibiCardTitle>Strawberry mochi</ChibiCardTitle>
        <ChibiCardDescription>Soft, squishy and a little bit pink.</ChibiCardDescription>
      </ChibiCardHeader>
      <ChibiCardContent>
        Hand-made every morning with organic rice flour and fresh strawberries.
      </ChibiCardContent>
      <ChibiCardFooter>
        <ChibiButton size="sm">Add to box</ChibiButton>
        <ChibiButton size="sm" variant="ghost">
          Details
        </ChibiButton>
      </ChibiCardFooter>
    </ChibiCard>
  ),
} satisfies Meta<typeof ChibiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Elevated: Story = {};
export const Outlined: Story = { args: { variant: 'outlined' } };

export const InteractiveLink: Story = {
  name: 'Interactive (link + tilt)',
  args: { variant: 'interactive', tilt: true },
  render: (args) => (
    <ChibiCard {...args} asChild className="w-80 no-underline">
      <a href="#recipe">
        <ChibiCardHeader>
          <ChibiCardTitle>Matcha latte recipe</ChibiCardTitle>
          <ChibiCardDescription>Hover me with a mouse ✨</ChibiCardDescription>
        </ChibiCardHeader>
        <ChibiCardContent>The whole card is one link, so it is a single tab stop.</ChibiCardContent>
      </a>
    </ChibiCard>
  ),
};
