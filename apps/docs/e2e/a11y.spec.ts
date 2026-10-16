import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const pages = [
  '/',
  '/docs',
  '/docs/theming',
  '/docs/button',
  '/docs/card',
  '/docs/toast',
  '/docs/dialog',
  '/docs/accordion',
  '/docs/input',
  '/docs/select',
  '/docs/switch',
];

for (const theme of ['light', 'dark'] as const) {
  test.describe(`${theme} theme`, () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript((value) => localStorage.setItem('chibi-theme', value), theme);
    });

    for (const path of pages) {
      test(`${path} has no WCAG A/AA violations (incl. real colour contrast)`, async ({ page }) => {
        await page.goto(path);
        await expect(page.locator('html')).toHaveAttribute('data-chibi-theme', theme);
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze();
        expect(
          results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`),
        ).toEqual([]);
      });
    }
  });
}

test('open dialog has no violations and traps focus', async ({ page }) => {
  await page.goto('/docs/dialog');
  await page.getByRole('button', { name: 'Adopt a cat' }).click();
  const dialog = page.getByRole('dialog', { name: 'Adopt Mochi?' });
  await expect(dialog).toBeVisible();
  const results = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
  expect(results.violations).toEqual([]);

  for (let i = 0; i < 6; i += 1) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(page.getByRole('button', { name: 'Adopt a cat' })).toBeFocused();
});

test('skip link moves focus to the main content', async ({ page }) => {
  await page.goto('/docs/button');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main#main')).toBeFocused();
});

test('reduced motion is honoured', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/docs/accordion');
  const trigger = page.getByRole('button', { name: 'Is it accessible?' }).first();
  const animation = await page
    .locator('[data-chibi="accordion-content"][data-state="open"]')
    .first()
    .evaluate((el) => getComputedStyle(el).animationName);
  expect(animation).toBe('none');
  await expect(trigger).toBeVisible();
});
