import { expect, test } from '@playwright/test';

test('toast playground announces and dismisses a toast', async ({ page }) => {
  await page.goto('/docs/toast');
  await page.getByRole('button', { name: 'Show toast' }).click();
  const region = page.getByRole('region', { name: /notifications/i });
  await expect(region.getByText('Saved!')).toBeVisible();
  await region.getByRole('button', { name: 'Dismiss notification' }).click();
  await expect(region.getByText('Saved!')).toBeHidden();
});

test('select is fully keyboard operable', async ({ page }) => {
  await page.goto('/docs/select');
  const preview = page.getByRole('region', { name: 'Live preview' });
  const combobox = preview.getByRole('combobox', { name: 'Favourite flavour' });
  await combobox.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('listbox')).toBeVisible();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('listbox')).toBeHidden();
  await expect(combobox).not.toHaveText('Pick a flavour');
  await expect(combobox).toBeFocused();
});

test('playground controls update the generated code', async ({ page }) => {
  await page.goto('/docs/button');
  const label = page.getByRole('textbox', { name: 'Label' });
  await label.fill('Pet the cat');
  await expect(page.getByRole('region', { name: 'Live preview' }).getByRole('button')).toHaveText(
    'Pet the cat',
  );
  await expect(page.getByRole('figure').filter({ hasText: 'Generated code' })).toContainText(
    'Pet the cat',
  );
});

test('playground escapes user input in generated code (no HTML injection)', async ({ page }) => {
  await page.goto('/docs/button');
  await page.getByRole('textbox', { name: 'Label' }).fill('<img src=x onerror=alert(1)>');
  await expect(page.locator('img[src="x"]')).toHaveCount(0);
  await expect(page.getByRole('figure').filter({ hasText: 'Generated code' })).toContainText(
    "{'<'}img src=x onerror=alert(1){'>'}",
  );
});

test('theme toggle persists across reloads', async ({ page }) => {
  await page.goto('/');
  await page
    .getByRole('group', { name: 'Colour theme' })
    .getByRole('button', { name: 'Dark' })
    .click();
  await expect(page.locator('html')).toHaveAttribute('data-chibi-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-chibi-theme', 'dark');
  await expect(page.getByRole('button', { name: 'Dark' })).toHaveAttribute('aria-pressed', 'true');
});

test('ignores tampered theme values in storage', async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem('chibi-theme', '"><script>alert(1)</script>'),
  );
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-chibi-theme', 'system');
});

test('unknown component slugs 404', async ({ page }) => {
  const response = await page.goto('/docs/does-not-exist');
  expect(response?.status()).toBe(404);
});

test('ships security headers', async ({ request }) => {
  const response = await request.get('/');
  const headers = response.headers();
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(headers['content-security-policy']).toContain("object-src 'none'");
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(headers['x-powered-by']).toBeUndefined();
});
