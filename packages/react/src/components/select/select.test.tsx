import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { expectNoAxeViolations } from '../../test/axe';
import {
  ChibiSelect,
  ChibiSelectGroup,
  ChibiSelectItem,
  ChibiSelectLabel,
  ChibiSelectSeparator,
} from './select';

function Example(props: Partial<ComponentProps<typeof ChibiSelect>>) {
  return (
    <ChibiSelect label="Flavour" placeholder="Pick a flavour" {...props}>
      <ChibiSelectGroup>
        <ChibiSelectLabel>Fruity</ChibiSelectLabel>
        <ChibiSelectItem value="strawberry">Strawberry</ChibiSelectItem>
        <ChibiSelectItem value="peach">Peach</ChibiSelectItem>
      </ChibiSelectGroup>
      <ChibiSelectSeparator />
      <ChibiSelectItem value="matcha">Matcha</ChibiSelectItem>
      <ChibiSelectItem value="sold-out" disabled>
        Sold out
      </ChibiSelectItem>
    </ChibiSelect>
  );
}

describe('ChibiSelect', () => {
  it('exposes a labelled combobox showing the placeholder', () => {
    render(<Example />);
    const combobox = screen.getByRole('combobox', { name: 'Flavour' });
    expect(combobox).toHaveTextContent('Pick a flavour');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens with the keyboard and selects an option', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Example onValueChange={onValueChange} />);
    const combobox = screen.getByRole('combobox', { name: 'Flavour' });
    combobox.focus();
    await user.keyboard('{Enter}');

    const listbox = await screen.findByRole('listbox');
    expect(listbox).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Sold out' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );

    await user.click(screen.getByRole('option', { name: 'Matcha' }));
    expect(onValueChange).toHaveBeenCalledWith('matcha');
    expect(combobox).toHaveTextContent('Matcha');
  });

  it('links error and description and marks invalid', () => {
    render(<Example description="Choose wisely" error="Please pick one" required />);
    const combobox = screen.getByRole('combobox', { name: 'Flavour' });
    expect(combobox).toHaveAttribute('aria-invalid', 'true');
    expect(combobox).toHaveAttribute('aria-required', 'true');
    expect(combobox).toHaveAccessibleDescription('Choose wisely Please pick one');
  });

  it('forwards the ref to the trigger', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Example ref={ref} />);
    expect(ref.current).toBe(screen.getByRole('combobox'));
  });

  it('renders a controlled value', () => {
    render(<Example value="peach" />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Peach');
  });

  it('has no axe violations', async () => {
    const { container } = render(<Example description="Help" />);
    await expectNoAxeViolations(container);
  });
});
