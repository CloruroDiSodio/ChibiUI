import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { expectNoAxeViolations } from '../../test/axe';
import { ChibiButton } from '../button/button';
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

function Example({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  return (
    <ChibiDialog onOpenChange={onOpenChange}>
      <ChibiDialogTrigger asChild>
        <ChibiButton>Adopt a cat</ChibiButton>
      </ChibiDialogTrigger>
      <ChibiDialogContent>
        <ChibiDialogHeader>
          <ChibiDialogTitle>Adopt Mochi?</ChibiDialogTitle>
          <ChibiDialogDescription>She likes naps and snacks.</ChibiDialogDescription>
        </ChibiDialogHeader>
        <input aria-label="Your name" />
        <ChibiDialogFooter>
          <ChibiDialogClose asChild>
            <ChibiButton variant="ghost">Cancel</ChibiButton>
          </ChibiDialogClose>
        </ChibiDialogFooter>
      </ChibiDialogContent>
    </ChibiDialog>
  );
}

describe('ChibiDialog', () => {
  it('opens a labelled, described modal dialog and moves focus inside', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Adopt a cat' }));

    const dialog = await screen.findByRole('dialog', { name: 'Adopt Mochi?' });
    expect(dialog).toHaveAccessibleDescription('She likes naps and snacks.');
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    expect(screen.getByRole('textbox', { name: 'Your name' })).toHaveFocus();
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Example onOpenChange={onOpenChange} />);
    const trigger = screen.getByRole('button', { name: 'Adopt a cat' });
    await user.click(trigger);
    await screen.findByRole('dialog');

    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('traps focus within the dialog', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Adopt a cat' }));
    const dialog = await screen.findByRole('dialog');
    for (let i = 0; i < 5; i += 1) {
      await user.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
  });

  it('closes via the built-in close button and custom close', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Adopt a cat' }));
    await user.click(await screen.findByRole('button', { name: 'Close dialog' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: 'Adopt a cat' }));
    await user.click(await screen.findByRole('button', { name: 'Cancel' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('supports controlled usage and hiding the close button', async () => {
    function Controlled() {
      const [open, setOpen] = useState(true);
      return (
        <>
          <p>state: {open ? 'open' : 'closed'}</p>
          <ChibiDialog open={open} onOpenChange={setOpen}>
            <ChibiDialogContent hideCloseButton aria-describedby={undefined}>
              <ChibiDialogTitle>Controlled</ChibiDialogTitle>
              <ChibiDialogClose>Done</ChibiDialogClose>
            </ChibiDialogContent>
          </ChibiDialog>
        </>
      );
    }
    const user = userEvent.setup();
    render(<Controlled />);
    expect(screen.getByRole('dialog', { name: 'Controlled' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Close dialog' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Done' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(screen.getByText('state: closed')).toBeInTheDocument();
  });

  it('has no axe violations when open', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Adopt a cat' }));
    await screen.findByRole('dialog');
    await expectNoAxeViolations(document.body);
  });
});
