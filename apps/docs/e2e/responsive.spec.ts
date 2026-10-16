import { expect, test } from '@playwright/test';

for (const path of ['/', '/docs', '/docs/button', '/docs/theming']) {
  test(`${path} has no horizontal overflow on small screens`, async ({ page }) => {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test('docs menu is a keyboard-operable disclosure on mobile', async ({ page }) => {
  await page.goto('/docs');
  const summary = page.locator('summary', { hasText: 'Menu' });
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('navigation', { name: 'Documentation' }).first()).toBeVisible();
});
