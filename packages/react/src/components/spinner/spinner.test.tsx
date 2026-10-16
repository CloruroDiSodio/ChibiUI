import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoAxeViolations } from '../../test/axe';
import { ChibiMascot } from '../mascot/mascot';
import { ChibiSpinner } from './spinner';

describe('ChibiSpinner', () => {
  it('announces a status with a default label', () => {
    render(<ChibiSpinner />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading…');
  });

  it('accepts a custom label and the mascot variant', () => {
    render(<ChibiSpinner variant="mascot" label="Fetching treats" />);
    const status = screen.getByRole('status');
    expect(status).toHaveTextContent('Fetching treats');
    expect(status).toHaveAttribute('data-variant', 'mascot');
  });

  it('can be decorative', () => {
    const { container } = render(<ChibiSpinner decorative />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('has no axe violations', async () => {
    const { container } = render(<ChibiSpinner />);
    await expectNoAxeViolations(container);
  });
});

describe('ChibiMascot', () => {
  it('is decorative by default', () => {
    const { container } = render(<ChibiMascot />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('exposes an image role when labelled', () => {
    render(<ChibiMascot mood="sad" label="Sad cat" />);
    expect(screen.getByRole('img', { name: 'Sad cat' })).toHaveAttribute('data-mood', 'sad');
  });
});
