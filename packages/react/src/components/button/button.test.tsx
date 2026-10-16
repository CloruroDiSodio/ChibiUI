import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoAxeViolations } from '../../test/axe';
import { ChibiButton } from './button';

describe('ChibiButton', () => {
  it('renders a native button that does not submit forms by default', () => {
    render(<ChibiButton>Hello</ChibiButton>);
    const button = screen.getByRole('button', { name: 'Hello' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('data-variant', 'primary');
  });

  it('respects an explicit type', () => {
    render(<ChibiButton type="submit">Send</ChibiButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it.each(['primary', 'secondary', 'ghost', 'kawaii'] as const)(
    'renders the %s variant',
    (variant) => {
      render(<ChibiButton variant={variant}>{variant}</ChibiButton>);
      expect(screen.getByRole('button')).toHaveAttribute('data-variant', variant);
    },
  );

  it('fires onClick on click and keyboard activation', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<ChibiButton onClick={onClick}>Go</ChibiButton>);
    await user.click(screen.getByRole('button'));
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('uses native disabled when disabled', async () => {
    const onClick = vi.fn();
    render(
      <ChibiButton disabled onClick={onClick}>
        Nope
      </ChibiButton>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('stays focusable but inert while loading', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <ChibiButton loading loadingText="Saving…" onClick={onClick}>
        Save
      </ChibiButton>,
    );
    const button = screen.getByRole('button', { name: 'Saving…' });
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('aria-busy', 'true');

    await user.tab();
    expect(button).toHaveFocus();
    await user.keyboard('{Enter}');
    button.click();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders decorative icons hidden from assistive tech', () => {
    render(
      <ChibiButton leftIcon={<svg data-testid="left" />} rightIcon={<svg data-testid="right" />}>
        Next
      </ChibiButton>,
    );
    expect(screen.getByTestId('left').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('right').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('button')).toHaveAccessibleName('Next');
  });

  it('renders its child via asChild, keeping icons and styles', () => {
    render(
      <ChibiButton asChild variant="secondary" leftIcon={<svg data-testid="icon" />}>
        <a href="/docs">Docs</a>
      </ChibiButton>,
    );
    const link = screen.getByRole('link', { name: 'Docs' });
    expect(link).toHaveAttribute('href', '/docs');
    expect(link).not.toHaveAttribute('type');
    expect(link).toHaveAttribute('data-variant', 'secondary');
    expect(link).toContainElement(screen.getByTestId('icon'));
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('marks a disabled asChild link with aria-disabled and blocks navigation', () => {
    render(
      <ChibiButton asChild disabled>
        <a href="/docs">Docs</a>
      </ChibiButton>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    link.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('forwards refs (React 19 ref-as-prop)', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<ChibiButton ref={ref}>Ref</ChibiButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('merges consumer classes over variant classes', () => {
    render(<ChibiButton className="rounded-chibi-sm">x</ChibiButton>);
    const { className } = screen.getByRole('button');
    expect(className).toContain('rounded-chibi-sm');
    expect(className).not.toContain('rounded-chibi-full');
  });

  it('warns in development when an icon-only button has no accessible name', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<ChibiButton size="icon" leftIcon={<svg />} />);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('aria-label'));
    warn.mockRestore();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <ChibiButton>Primary</ChibiButton>
        <ChibiButton loading>Loading</ChibiButton>
        <ChibiButton size="icon" aria-label="Add" leftIcon={<svg />} />
        <ChibiButton asChild>
          <a href="/x">Link</a>
        </ChibiButton>
      </div>,
    );
    await expectNoAxeViolations(container);
  });
});
