import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { expectNoAxeViolations } from '../../test/axe';
import {
  ChibiAccordion,
  ChibiAccordionContent,
  ChibiAccordionItem,
  ChibiAccordionTrigger,
} from './accordion';

function Example({ icon }: { icon?: 'chevron' | 'ears' }) {
  return (
    <ChibiAccordion type="single" collapsible>
      <ChibiAccordionItem value="a">
        <ChibiAccordionTrigger icon={icon}>What is ChibiUI?</ChibiAccordionTrigger>
        <ChibiAccordionContent>A cute component library.</ChibiAccordionContent>
      </ChibiAccordionItem>
      <ChibiAccordionItem value="b">
        <ChibiAccordionTrigger headingLevel={4}>Is it accessible?</ChibiAccordionTrigger>
        <ChibiAccordionContent>Very.</ChibiAccordionContent>
      </ChibiAccordionItem>
    </ChibiAccordion>
  );
}

describe('ChibiAccordion', () => {
  it('wraps triggers in headings of the requested level', () => {
    render(<Example />);
    expect(screen.getByRole('heading', { level: 3, name: 'What is ChibiUI?' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 4, name: 'Is it accessible?' }),
    ).toBeInTheDocument();
  });

  it('toggles panels with aria-expanded / region semantics', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole('button', { name: 'What is ChibiUI?' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('region', { name: 'What is ChibiUI?' })).toHaveTextContent(
      'A cute component library.',
    );

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('supports arrow-key navigation between triggers', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.tab();
    expect(screen.getByRole('button', { name: 'What is ChibiUI?' })).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('button', { name: 'Is it accessible?' })).toHaveFocus();
    await user.keyboard('{Home}');
    expect(screen.getByRole('button', { name: 'What is ChibiUI?' })).toHaveFocus();
  });

  it('renders the ears icon decoratively', () => {
    render(<Example icon="ears" />);
    const trigger = screen.getByRole('button', { name: 'What is ChibiUI?' });
    expect(trigger.querySelectorAll('[data-chibi="mascot"]')).toHaveLength(2);
  });

  it('has no axe violations', async () => {
    const user = userEvent.setup();
    const { container } = render(<Example />);
    await user.click(screen.getByRole('button', { name: 'What is ChibiUI?' }));
    await expectNoAxeViolations(container);
  });
});
