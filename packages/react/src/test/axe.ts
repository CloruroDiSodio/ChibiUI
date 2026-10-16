import axe, { type AxeResults, type Result } from 'axe-core';

const format = (violations: Result[]) =>
  violations
    .map(
      (v) =>
        `• [${v.impact ?? 'n/a'}] ${v.id}: ${v.help}\n${v.nodes
          .map((node) => `    ${node.target.join(' ')}`)
          .join('\n')}`,
    )
    .join('\n');

/**
 * Runs axe-core against a rendered container and fails with a readable report.
 * Colour contrast is verified separately (jsdom has no layout/paint), see tokens.test.ts.
 */
export async function expectNoAxeViolations(container: Element = document.body): Promise<void> {
  const results: AxeResults = await axe.run(container, {
    rules: { 'color-contrast': { enabled: false } },
  });
  if (results.violations.length > 0) {
    throw new Error(`Accessibility violations:\n${format(results.violations)}`);
  }
}
