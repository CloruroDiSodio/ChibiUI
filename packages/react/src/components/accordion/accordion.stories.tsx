import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ChibiAccordion,
  ChibiAccordionContent,
  ChibiAccordionItem,
  ChibiAccordionTrigger,
} from './accordion';

const faq = [
  [
    'What is ChibiUI?',
    'A React component library that pairs enterprise-grade accessibility with a pastel, kawaii look.',
  ],
  [
    'Is it accessible?',
    'Yes. Every interactive primitive is built on Radix UI and tested with axe-core.',
  ],
  [
    'Can I theme it?',
    'All colours are CSS variables. Override them, or scope a theme with data-chibi-theme.',
  ],
] as const;

const meta = {
  title: 'Components/Accordion',
  component: ChibiAccordionTrigger,
  args: { icon: 'chevron', headingLevel: 3 },
  argTypes: {
    icon: { control: 'inline-radio', options: ['chevron', 'ears'] },
    headingLevel: { control: 'select', options: [2, 3, 4, 5, 6] },
  },
  render: (args) => (
    <ChibiAccordion
      type="single"
      collapsible
      defaultValue="item-0"
      className="w-[28rem] max-w-full"
    >
      {faq.map(([q, a], i) => (
        <ChibiAccordionItem key={q} value={`item-${i}`}>
          <ChibiAccordionTrigger {...args}>{q}</ChibiAccordionTrigger>
          <ChibiAccordionContent>{a}</ChibiAccordionContent>
        </ChibiAccordionItem>
      ))}
    </ChibiAccordion>
  ),
} satisfies Meta<typeof ChibiAccordionTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Chevron: Story = {};
export const TwitchingEars: Story = { args: { icon: 'ears' } };
