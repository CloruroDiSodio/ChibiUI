import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoAxeViolations } from '../../test/axe';
import { ChibiSwitch } from './switch';

describe('ChibiSwitch', () => {
  it('renders a labelled switch', () => {
    render(<ChibiSwitch label="Night mode" />);
    expect(screen.getByRole('switch', { name: 'Night mode' })).toHaveAttribute(
      'aria-checked',
      'false',
    );
  });

  it('toggles by click, label click and Space', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<ChibiSwitch label="Sparkles" onCheckedChange={onCheckedChange} />);
    const control = screen.getByRole('switch');

    await user.click(control);
    expect(control).toHaveAttribute('aria-checked', 'true');
    await user.click(screen.getByText('Sparkles'));
    expect(control).toHaveAttribute('aria-checked', 'false');
    control.focus();
    await user.keyboard(' ');
    expect(control).toHaveAttribute('aria-checked', 'true');
    expect(onCheckedChange).toHaveBeenNthCalledWith(1, true);
    expect(onCheckedChange).toHaveBeenNthCalledWith(2, false);
  });

  it('places the label before the control when requested', () => {
    render(<ChibiSwitch label="Before" labelPosition="start" />);
    const label = screen.getByText('Before');
    const control = screen.getByRole('switch');
    expect(label.compareDocumentPosition(control) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('wires description and error', () => {
    render(<ChibiSwitch label="Terms" description="Required to continue" error="Please accept" />);
    const control = screen.getByRole('switch');
    expect(control).toHaveAttribute('aria-invalid', 'true');
    expect(control).toHaveAccessibleDescription('Required to continue Please accept');
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    render(<ChibiSwitch label="Locked" disabled />);
    await user.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('has no axe violations', async () => {
    const { container } = render(<ChibiSwitch label="Ok" description="desc" defaultChecked />);
    await expectNoAxeViolations(container);
  });
});
