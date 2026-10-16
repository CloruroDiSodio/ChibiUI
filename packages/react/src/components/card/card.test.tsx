import { fireEvent, render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { expectNoAxeViolations } from '../../test/axe';
import {
  ChibiCard,
  ChibiCardContent,
  ChibiCardDescription,
  ChibiCardFooter,
  ChibiCardHeader,
  ChibiCardTitle,
} from './card';

function Example(props: Partial<ComponentProps<typeof ChibiCard>>) {
  return (
    <ChibiCard data-testid="card" {...props}>
      <ChibiCardHeader>
        <ChibiCardTitle>Strawberry mochi</ChibiCardTitle>
        <ChibiCardDescription>Soft and squishy</ChibiCardDescription>
      </ChibiCardHeader>
      <ChibiCardContent>Made with love.</ChibiCardContent>
      <ChibiCardFooter>Footer</ChibiCardFooter>
    </ChibiCard>
  );
}

describe('ChibiCard', () => {
  afterEach(() => vi.restoreAllMocks());

  it('composes sub-components with an h3 title by default', () => {
    render(<Example />);
    expect(screen.getByRole('heading', { level: 3, name: 'Strawberry mochi' })).toBeInTheDocument();
    expect(screen.getByTestId('card')).toHaveAttribute('data-variant', 'elevated');
  });

  it('lets the title render any heading level via asChild', () => {
    render(
      <ChibiCard>
        <ChibiCardTitle asChild>
          <h2>Level two</h2>
        </ChibiCardTitle>
      </ChibiCard>,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Level two' })).toBeInTheDocument();
  });

  it('renders as a link with asChild for interactive cards', () => {
    render(
      <ChibiCard asChild variant="interactive">
        <a href="/recipes/mochi">Mochi recipe</a>
      </ChibiCard>,
    );
    const link = screen.getByRole('link', { name: 'Mochi recipe' });
    expect(link).toHaveAttribute('data-variant', 'interactive');
    expect(link.className).toContain('focus-visible:outline-3');
  });

  it('tilts towards the mouse and resets on leave', () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 1;
    });
    render(<Example variant="interactive" tilt />);
    const card = screen.getByTestId('card');
    vi.spyOn(card, 'getBoundingClientRect').mockReturnValue(
      DOMRect.fromRect({ x: 0, y: 0, width: 200, height: 100 }),
    );

    fireEvent.pointerMove(card, { pointerType: 'mouse', clientX: 200, clientY: 0 });
    expect(card.style.getPropertyValue('--chibi-tilt-y')).toBe('3.50deg');
    expect(card.style.getPropertyValue('--chibi-tilt-x')).toBe('3.50deg');
    expect(card).toHaveAttribute('data-tilting', 'true');

    fireEvent.pointerLeave(card);
    expect(card.style.getPropertyValue('--chibi-tilt-y')).toBe('');
    expect(card).not.toHaveAttribute('data-tilting');
  });

  it('ignores touch input and non-interactive variants for tilt', () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 1;
    });
    const { rerender } = render(<Example variant="interactive" tilt />);
    const card = screen.getByTestId('card');
    fireEvent.pointerMove(card, { pointerType: 'touch', clientX: 10, clientY: 10 });
    expect(card).not.toHaveAttribute('data-tilting');

    rerender(<Example variant="outlined" tilt />);
    fireEvent.pointerMove(card, { pointerType: 'mouse', clientX: 10, clientY: 10 });
    expect(card).not.toHaveAttribute('data-tilting');
  });

  it('calls consumer pointer handlers', () => {
    const onPointerMove = vi.fn();
    render(<Example onPointerMove={onPointerMove} />);
    fireEvent.pointerMove(screen.getByTestId('card'));
    expect(onPointerMove).toHaveBeenCalledOnce();
  });

  it('has no axe violations', async () => {
    const { container } = render(<Example variant="outlined" />);
    await expectNoAxeViolations(container);
  });
});
