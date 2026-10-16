import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChibiButton } from '../button/button';
import { ChibiInput } from '../input/input';
import {
  ChibiDialog,
  ChibiDialogClose,
  ChibiDialogContent,
  ChibiDialogDescription,
  ChibiDialogFooter,
  ChibiDialogHeader,
  ChibiDialogTitle,
  ChibiDialogTrigger,
} from './dialog';

const meta = {
  title: 'Components/Dialog',
  component: ChibiDialogContent,
  args: { size: 'md', hideCloseButton: false, closeLabel: 'Close dialog' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  render: (args) => (
    <ChibiDialog>
      <ChibiDialogTrigger asChild>
        <ChibiButton variant="kawaii">Adopt a cat</ChibiButton>
      </ChibiDialogTrigger>
      <ChibiDialogContent {...args}>
        <ChibiDialogHeader>
          <ChibiDialogTitle>Adopt Mochi?</ChibiDialogTitle>
          <ChibiDialogDescription>
            She enjoys naps, snacks and sitting on keyboards. Tell us your name to continue.
          </ChibiDialogDescription>
        </ChibiDialogHeader>
        <ChibiInput label="Your name" placeholder="e.g. Hana" />
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
  ),
} satisfies Meta<typeof ChibiDialogContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Small: Story = { args: { size: 'sm' } };
