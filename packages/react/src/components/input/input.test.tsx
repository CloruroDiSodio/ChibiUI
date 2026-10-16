import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoAxeViolations } from '../../test/axe';
import { ChibiInput } from './input';

describe('ChibiInput', () => {
  it('associates the label with the input', () => {
    render(<ChibiInput label="Email" type="email" />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('type', 'email');
  });

  it('links description and error via aria-describedby and marks invalid', () => {
    render(<ChibiInput label="Email" description="We never spam." error="Email is required" />);
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('We never spam. Email is required');
  });

  it('keeps consumer aria-describedby ids', () => {
    render(
      <>
        <span id="hint">Extra hint</span>
        <ChibiInput label="Name" aria-describedby="hint" description="Your nickname" />
      </>,
    );
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Extra hint Your nickname');
  });

  it('renders the error region as a polite live region', () => {
    const { rerender } = render(<ChibiInput label="Name" />);
    const textbox = screen.getByRole('textbox');
    expect(textbox).not.toHaveAttribute('aria-invalid');
    expect(textbox).not.toHaveAttribute('aria-describedby');

    rerender(<ChibiInput label="Name" error="Too short" />);
    const message = screen.getByText('Too short').closest('p');
    expect(message).toHaveAttribute('aria-live', 'polite');
  });

  it('treats error={true} as invalid without a message', () => {
    render(<ChibiInput label="Name" error />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).not.toHaveAttribute('aria-describedby');
  });

  it('supports a floating label that remains the accessible name', async () => {
    const user = userEvent.setup();
    render(<ChibiInput label="Username" labelVariant="floating" placeholder="ignored" />);
    const input = screen.getByRole('textbox', { name: 'Username' });
    expect(input).toHaveAttribute('placeholder', ' ');
    await user.type(input, 'mochi');
    expect(input).toHaveValue('mochi');
  });

  it('marks required fields natively', () => {
    render(<ChibiInput label="Name" required />);
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeRequired();
  });

  it('honours a custom id and forwards refs', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<ChibiInput label="Name" id="custom" ref={ref} />);
    expect(ref.current).toHaveAttribute('id', 'custom');
  });

  it('warns when it has no accessible name', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<ChibiInput />);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('ChibiInput needs'));
    warn.mockRestore();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <ChibiInput label="Static" description="Help" error="Nope" />
        <ChibiInput label="Floating" labelVariant="floating" leftIcon={<svg />} />
      </div>,
    );
    await expectNoAxeViolations(container);
  });
});
